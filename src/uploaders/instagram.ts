// # Instagram uploader — Graph API (Reels via container workflow)
import type { Video, Script } from '@/db/schema'
import { buildShortMetadata } from './metadata'

const API_BASE = 'https://graph.facebook.com/v21.0'

// # Refresh Instagram token (uses Facebook long-lived token exchange)
// # Sends credentials in POST body, not query string, to avoid logging secrets
export async function refreshInstagramToken(currentToken: string) {
  const res = await fetch(`${API_BASE}/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'fb_exchange_token',
      client_id: process.env.FB_APP_ID!,
      client_secret: process.env.FB_APP_SECRET!,
      fb_exchange_token: currentToken,
    }),
  })

  if (!res.ok) throw new Error(`Instagram token refresh failed: ${res.status}`)
  return res.json() as Promise<{ access_token: string; expires_in: number }>
}

// # Upload a Reel to Instagram (two-step: create container, then publish)
// # Video must be hosted at a public URL (R2 URL)
export async function uploadToInstagram(
  accessToken: string,
  igUserId: string,
  videoUrl: string,
  caption: string
): Promise<string> {
  // # Step 1: Create media container (token in header, not body)
  const containerRes = await fetch(`${API_BASE}/${igUserId}/media`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      media_type: 'REELS',
      video_url: videoUrl,
      caption,
    }),
  })

  if (!containerRes.ok) {
    const err = await containerRes.text()
    throw new Error(`Instagram container creation failed: ${containerRes.status} ${err}`)
  }

  const { id: containerId } = await containerRes.json() as { id: string }

  // # Step 2: Wait for processing (poll status)
  await waitForProcessing(accessToken, containerId)

  // # Step 3: Publish the container (token in header, not body)
  const publishRes = await fetch(`${API_BASE}/${igUserId}/media_publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      creation_id: containerId,
    }),
  })

  if (!publishRes.ok) {
    const err = await publishRes.text()
    throw new Error(`Instagram publish failed: ${publishRes.status} ${err}`)
  }

  const { id: mediaId } = await publishRes.json() as { id: string }
  return mediaId
}

// # Poll container status until FINISHED
async function waitForProcessing(accessToken: string, containerId: string, maxWait = 120_000) {
  const start = Date.now()
  while (Date.now() - start < maxWait) {
    // # Send token as Bearer header instead of query string
    const res = await fetch(
      `${API_BASE}/${containerId}?fields=status_code`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    const data = await res.json() as { status_code: string }

    if (data.status_code === 'FINISHED') return
    if (data.status_code === 'ERROR') throw new Error('Instagram processing failed')

    // # Wait 5 seconds before polling again
    await new Promise((r) => setTimeout(r, 5000))
  }
  throw new Error('Instagram processing timeout')
}

// # Build Instagram caption from video metadata
export function buildInstagramCaption(video: Video, script: Script): string {
  const meta = buildShortMetadata(video, script)
  return `${meta.title}\n\n${meta.description}\n\n${meta.hashtags.join(' ')}`.slice(0, 2200)
}
