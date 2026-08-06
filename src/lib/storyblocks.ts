// # Storyblocks API client — video search + music search + download
// # Docs: https://documentation.storyblocks.com/
// # Falls back gracefully when API key is not set

import { envOr } from './env'

const VIDEO_API = 'https://api.storyblocks.com/api/v2/videos/search'
const MUSIC_API = 'https://api.storyblocks.com/api/v2/audio/search'

// # Search result shape from Storyblocks Video API
export interface StoryblocksClip {
  id: string
  title: string
  preview_url: string       // # Low-res preview for testing
  download_url: string      // # Full-res download (requires auth)
  duration: number           // # Duration in seconds
  width: number
  height: number
}

// # Search result shape from Storyblocks Audio API
export interface StoryblocksTrack {
  id: string
  title: string
  preview_url: string
  download_url: string
  duration: number
  genre: string
  mood: string
}

// # Search for stock video clips matching a query
// # Returns empty array if no API key is set (graceful skip)
export async function searchStoryblocksVideo(
  query: string,
  orientation: 'landscape' | 'portrait' = 'landscape',
  perPage = 5
): Promise<StoryblocksClip[]> {
  const apiKey = envOr('STORYBLOCKS_API_KEY', '')
  if (!apiKey) return [] // # No key = skip Storyblocks

  const params = new URLSearchParams({
    project_id: envOr('STORYBLOCKS_PROJECT_ID', ''),
    user_id: 'capitalcode',
    keywords: query,
    page: '1',
    num_results: String(perPage),
    content_type: 'footage',
    orientation,
  })

  const res = await fetch(`${VIDEO_API}?${params}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })

  if (!res.ok) return []
  const data = await res.json() as { results?: StoryblocksClip[] }
  return data.results ?? []
}

// # Search for background music tracks by mood/genre
export async function searchStoryblocksMusic(
  mood: string,
  genre = 'corporate',
  perPage = 3
): Promise<StoryblocksTrack[]> {
  const apiKey = envOr('STORYBLOCKS_API_KEY', '')
  if (!apiKey) return []

  const params = new URLSearchParams({
    project_id: envOr('STORYBLOCKS_PROJECT_ID', ''),
    user_id: 'capitalcode',
    keywords: `${mood} ${genre}`,
    page: '1',
    num_results: String(perPage),
  })

  const res = await fetch(`${MUSIC_API}?${params}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })

  if (!res.ok) return []
  const data = await res.json() as { results?: StoryblocksTrack[] }
  return data.results ?? []
}

// # Download a file from URL to Buffer
export async function downloadFile(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${url}`)
  return Buffer.from(await res.arrayBuffer())
}
