// # YouTube uploader — resumable upload via YouTube Data API v3
import { getToken, isTokenExpired } from '@/db/repo/tokens'
import { updateUploadStatus } from '@/db/repo/uploads'
import { buildYouTubeMetadata, buildShortMetadata } from './metadata'
import type { Video, Script, Render } from '@/db/schema'

const API_BASE = 'https://www.googleapis.com/upload/youtube/v3/videos'
const METADATA_API = 'https://www.googleapis.com/youtube/v3/videos'
const THUMBNAIL_API = 'https://www.googleapis.com/upload/youtube/v3/thumbnails/set'

// # Refresh YouTube OAuth token using refresh_token
export async function refreshYouTubeToken(refreshToken: string, clientId: string, clientSecret: string) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!res.ok) throw new Error(`YouTube token refresh failed: ${res.status}`)
  return res.json() as Promise<{ access_token: string; expires_in: number }>
}

// # Build YouTube API upload metadata JSON
export function buildUploadBody(
  video: Video,
  script: Script,
  isShort: boolean
) {
  const meta = isShort ? buildShortMetadata(video, script) : buildYouTubeMetadata(video, script)

  return {
    snippet: {
      title: meta.title,
      description: meta.description,
      tags: meta.tags,
      categoryId: '22', // # "People & Blogs" — safe default for finance
    },
    status: {
      privacyStatus: 'private', // # Always upload as private first
      selfDeclaredMadeForKids: false,
    },
  }
}

// # Upload video to YouTube using resumable upload protocol
export async function uploadToYouTube(
  accessToken: string,
  videoBuffer: Buffer,
  metadata: ReturnType<typeof buildUploadBody>,
  contentType = 'video/mp4'
): Promise<string> {
  // # Step 1: Initiate resumable upload
  const initRes = await fetch(`${API_BASE}?uploadType=resumable&part=snippet,status`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Upload-Content-Type': contentType,
      'X-Upload-Content-Length': String(videoBuffer.length),
    },
    body: JSON.stringify(metadata),
  })

  if (!initRes.ok) {
    const err = await initRes.text()
    throw new Error(`YouTube upload init failed: ${initRes.status} ${err}`)
  }

  const uploadUrl = initRes.headers.get('location')
  if (!uploadUrl) throw new Error('No upload URL returned from YouTube')

  // # Step 2: Upload the video data
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(videoBuffer.length),
    },
    body: new Uint8Array(videoBuffer),
  })

  if (!uploadRes.ok) {
    const err = await uploadRes.text()
    throw new Error(`YouTube upload failed: ${uploadRes.status} ${err}`)
  }

  const result = await uploadRes.json() as { id: string }
  return result.id // # YouTube video ID
}

// # Upload thumbnail for a YouTube video
export async function uploadThumbnail(
  accessToken: string,
  videoId: string,
  thumbnailBuffer: Buffer
): Promise<void> {
  const res = await fetch(`${THUMBNAIL_API}?videoId=${videoId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'image/png',
    },
    body: new Uint8Array(thumbnailBuffer),
  })

  if (!res.ok) {
    console.warn(`[YouTube] Thumbnail upload failed: ${res.status}`)
  }
}
