// # TikTok uploader — Content Posting API (direct post)
import type { Video, Script } from '@/db/schema'
import { buildShortMetadata } from './metadata'

const API_BASE = 'https://open.tiktokapis.com/v2'

// # Refresh TikTok OAuth token
export async function refreshTikTokToken(refreshToken: string, clientKey: string, clientSecret: string) {
  const res = await fetch(`${API_BASE}/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_key: clientKey,
      client_secret: clientSecret,
    }),
  })

  if (!res.ok) throw new Error(`TikTok token refresh failed: ${res.status}`)
  return res.json() as Promise<{ access_token: string; expires_in: number; refresh_token: string }>
}

// # Initialize a TikTok video upload — returns upload URL
export async function initTikTokUpload(
  accessToken: string,
  videoSize: number
): Promise<{ uploadUrl: string; publishId: string }> {
  const res = await fetch(`${API_BASE}/post/publish/video/init/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post_info: {
        title: '', // # Set in finalize step
        privacy_level: 'SELF_ONLY', // # Upload as private first
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
      },
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: videoSize,
        chunk_size: videoSize, // # Single chunk upload
        total_chunk_count: 1,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`TikTok upload init failed: ${res.status} ${err}`)
  }

  const data = await res.json() as { data: { upload_url: string; publish_id: string } }
  return { uploadUrl: data.data.upload_url, publishId: data.data.publish_id }
}

// # Upload video data to TikTok's upload URL
export async function uploadToTikTok(
  uploadUrl: string,
  videoBuffer: Buffer
): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Range': `bytes 0-${videoBuffer.length - 1}/${videoBuffer.length}`,
    },
    body: new Uint8Array(videoBuffer),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`TikTok upload failed: ${res.status} ${err}`)
  }
}

// # Build TikTok caption from video metadata
export function buildTikTokCaption(video: Video, script: Script): string {
  const meta = buildShortMetadata(video, script)
  // # TikTok caption limit is ~2200 chars
  const caption = `${meta.title}\n\n${meta.hashtags.join(' ')}`
  return caption.slice(0, 2200)
}
