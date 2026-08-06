// # Upload worker — processes approved videos and publishes to platforms
// # Called from API route or cron job after human approval
import { getVideosByStatus, getVideoById } from '@/db/repo/videos'
import { getScriptsByVideoId } from '@/db/repo/videos'
import { getRenderByVideoId } from '@/db/repo/renders'
import { createUpload, updateUploadStatus } from '@/db/repo/uploads'
import { getToken, isTokenExpired, upsertToken } from '@/db/repo/tokens'
import { uploadToYouTube, uploadThumbnail, buildUploadBody, refreshYouTubeToken } from './youtube'
import { initTikTokUpload, uploadToTikTok, buildTikTokCaption, refreshTikTokToken } from './tiktok'
import { uploadToInstagram, buildInstagramCaption, refreshInstagramToken } from './instagram'
import { buildYouTubeMetadata, buildShortMetadata } from './metadata'
import { sendAlert } from '@/lib/alert'
import { envOr } from '@/lib/env'
import { updateVideoStatus } from '@/db/repo/videos'

// # Platform configs — which platforms each video type uploads to
const PLATFORM_MAP: Record<string, string[]> = {
  long_form: ['youtube'],
  short_explainer: ['youtube_short', 'tiktok', 'instagram'],
  short_data_reveal: ['youtube_short', 'tiktok', 'instagram'],
}

// # Process all approved videos
export async function processApprovedVideos(): Promise<{ processed: number; errors: number }> {
  const approved = await getVideosByStatus('approved')
  let processed = 0
  let errors = 0

  for (const video of approved) {
    try {
      await processVideo(video.id)
      processed++
    } catch (err) {
      errors++
      console.error(`[Upload] Failed to process ${video.id}: ${err}`)
      await sendAlert('UPLOAD_FAIL', `Video ${video.id} upload failed: ${err}`)
    }
  }

  return { processed, errors }
}

// # Process a single video — create upload records and publish
async function processVideo(videoId: string) {
  const video = await getVideoById(videoId)
  if (!video || video.status !== 'approved') return

  const renderRows = await getRenderByVideoId(videoId)
  const scriptRows = await getScriptsByVideoId(videoId)
  if (!renderRows.length || !scriptRows.length) {
    throw new Error('Missing render or script')
  }

  const render = renderRows[0]
  const script = scriptRows[0]
  const platforms = PLATFORM_MAP[video.type] ?? []

  await updateVideoStatus(videoId, 'uploading')

  for (const platform of platforms) {
    const uploadId = crypto.randomUUID()

    // # Create upload record
    const meta = video.type === 'long_form'
      ? buildYouTubeMetadata(video, script)
      : buildShortMetadata(video, script)

    await createUpload({
      id: uploadId,
      videoId,
      renderId: render.id,
      platform,
      title: meta.title,
      description: meta.description,
      tags: JSON.stringify(meta.tags),
      hashtags: JSON.stringify(meta.hashtags),
    })

    try {
      await uploadToPlatform(platform, video, script, render, uploadId)
    } catch (err) {
      await updateUploadStatus(uploadId, 'failed', {
        error: String(err),
      })
      // # Don't stop other platforms
    }
  }

  // # Check if all uploads succeeded
  const { getUploadsByVideoId } = await import('@/db/repo/uploads')
  const allUploads = await getUploadsByVideoId(videoId)
  const allPublished = allUploads.every((u) => u.status === 'published')
  const anyFailed = allUploads.some((u) => u.status === 'failed')

  if (allPublished) {
    await updateVideoStatus(videoId, 'published', { publishedAt: Math.floor(Date.now() / 1000) })
    await sendAlert('PUBLISHED', `Video ${videoId} published to ${platforms.join(', ')}`)
  } else if (anyFailed) {
    await sendAlert('PARTIAL_UPLOAD', `Video ${videoId}: some platforms failed`)
  }
}

// # Route to platform-specific uploader
async function uploadToPlatform(
  platform: string,
  video: any,
  script: any,
  render: any,
  uploadId: string
) {
  // # Fetch video buffer from R2 URL
  const videoRes = await fetch(render.r2Url)
  if (!videoRes.ok) throw new Error(`Failed to download render: ${videoRes.status}`)
  const videoBuffer = Buffer.from(await videoRes.arrayBuffer())

  switch (platform) {
    case 'youtube':
    case 'youtube_short': {
      const token = await getValidToken('youtube')
      const isShort = platform === 'youtube_short'
      const metadata = buildUploadBody(video, script, isShort)
      const ytVideoId = await uploadToYouTube(token, videoBuffer, metadata)

      // # Upload thumbnail if available
      if (render.thumbnailUrl) {
        try {
          const thumbRes = await fetch(render.thumbnailUrl)
          const thumbBuf = Buffer.from(await thumbRes.arrayBuffer())
          await uploadThumbnail(token, ytVideoId, thumbBuf)
        } catch {
          console.warn('[Upload] Thumbnail upload failed')
        }
      }

      await updateUploadStatus(uploadId, 'published', {
        platformId: ytVideoId,
        platformUrl: isShort
          ? `https://youtube.com/shorts/${ytVideoId}`
          : `https://youtube.com/watch?v=${ytVideoId}`,
        uploadedAt: Math.floor(Date.now() / 1000),
      })
      break
    }

    case 'tiktok': {
      const token = await getValidToken('tiktok')
      const { uploadUrl, publishId } = await initTikTokUpload(token, videoBuffer.length)
      await uploadToTikTok(uploadUrl, videoBuffer)

      await updateUploadStatus(uploadId, 'published', {
        platformId: publishId,
        uploadedAt: Math.floor(Date.now() / 1000),
      })
      break
    }

    case 'instagram': {
      const token = await getValidToken('instagram')
      const igUserId = envOr('INSTAGRAM_USER_ID', '')
      if (!igUserId) throw new Error('INSTAGRAM_USER_ID not set')
      const caption = buildInstagramCaption(video, script)
      const mediaId = await uploadToInstagram(token, igUserId, render.r2Url, caption)

      await updateUploadStatus(uploadId, 'published', {
        platformId: mediaId,
        uploadedAt: Math.floor(Date.now() / 1000),
      })
      break
    }
  }
}

// # Get a valid (non-expired) access token for a platform, refreshing if needed
async function getValidToken(platform: string): Promise<string> {
  const tokenRecord = await getToken(platform)
  if (!tokenRecord) throw new Error(`No ${platform} token found — complete OAuth setup first`)

  if (!isTokenExpired(tokenRecord.expiresAt)) {
    return tokenRecord.accessToken
  }

  if (!tokenRecord.refreshToken) {
    throw new Error(`${platform} token expired and no refresh token available`)
  }

  // # Refresh the token
  let newToken: { access_token: string; expires_in: number; refresh_token?: string }

  switch (platform) {
    case 'youtube':
      newToken = await refreshYouTubeToken(
        tokenRecord.refreshToken,
        envOr('YOUTUBE_CLIENT_ID', ''),
        envOr('YOUTUBE_CLIENT_SECRET', '')
      )
      break
    case 'tiktok':
      newToken = await refreshTikTokToken(
        tokenRecord.refreshToken,
        envOr('TIKTOK_CLIENT_KEY', ''),
        envOr('TIKTOK_CLIENT_SECRET', '')
      )
      break
    case 'instagram':
      newToken = await refreshInstagramToken(tokenRecord.accessToken)
      break
    default:
      throw new Error(`Unknown platform: ${platform}`)
  }

  // # Store the refreshed token
  await upsertToken({
    id: tokenRecord.id,
    platform,
    accessToken: newToken.access_token,
    refreshToken: newToken.refresh_token ?? tokenRecord.refreshToken,
    expiresAt: Math.floor(Date.now() / 1000) + (newToken.expires_in ?? 3600),
    updatedAt: Math.floor(Date.now() / 1000),
  })

  return newToken.access_token
}
