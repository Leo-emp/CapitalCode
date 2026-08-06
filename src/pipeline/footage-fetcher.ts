// # Stock footage fetcher pipeline stage
// # Fallback chain: Storyblocks → Pexels → Pixabay → skip (gradient bg)
// # Downloads clips, trims to scene duration, applies cinematic color grade

import { execFileSync } from 'node:child_process'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { envOr } from '@/lib/env'
import { searchStoryblocksVideo, downloadFile } from '@/lib/storyblocks'
import type { PipelineContext } from './orchestrator'

// # Build Storyblocks search URL (exported for testing)
export function buildStoryblocksUrl(query: string, orientation: string): string {
  const q = query.replace(/\s+/g, '+')
  return `https://api.storyblocks.com/api/v2/videos/search?keywords=${q}&orientation=${orientation}`
}

// # Build Pexels video search URL
export function buildPexelsUrl(query: string, orientation: string): string {
  const q = query.replace(/\s+/g, '+')
  return `https://api.pexels.com/videos/search?query=${q}&orientation=${orientation}&size=large&per_page=5`
}

// # Build Pixabay video search URL
export function buildPixabayUrl(query: string): string {
  const q = query.replace(/\s+/g, '+')
  const key = envOr('PIXABAY_API_KEY', '')
  return `https://pixabay.com/api/videos/?key=${key}&q=${q}&video_type=film&per_page=5`
}

// # Build ffmpeg args to trim, scale, and apply cinematic color grade
// # Darkens (-0.15 brightness) and desaturates (0.8) footage to sit behind text
export function buildColorGradeArgs(
  inputPath: string,
  outputPath: string,
  width: number,
  height: number,
  durationSec?: number
): string[] {
  // # Scale to exact resolution, crop to fill, apply cinematic grade
  const filters = [
    `scale=${width}:${height}:force_original_aspect_ratio=increase`,
    `crop=${width}:${height}`,
    'eq=brightness=-0.15:saturation=0.8',
  ].join(',')

  const args = ['-i', inputPath, '-vf', filters, '-an', '-y']
  if (durationSec) args.push('-t', String(durationSec))
  args.push(outputPath)
  return args
}

// # Clip shape used for deduplication across scenes
interface ClipResult { id: string; url: string }

// # Remove already-used clips to avoid repeating footage across scenes
export function deduplicateClips(clips: ClipResult[], usedIds: Set<string>): ClipResult[] {
  return clips.filter((c) => !usedIds.has(c.id))
}

// # Search Pexels for video clips
async function searchPexels(query: string, orientation: string): Promise<ClipResult[]> {
  const apiKey = envOr('PEXELS_API_KEY', '')
  if (!apiKey) return []

  const url = buildPexelsUrl(query, orientation)
  const res = await fetch(url, {
    headers: { Authorization: apiKey },
  })

  if (!res.ok) return []
  const data = await res.json() as {
    videos?: Array<{
      id: number
      video_files: Array<{ link: string; width: number; quality: string }>
    }>
  }

  // # Pick highest-resolution file from each video result
  return (data.videos ?? []).map((v) => {
    const best = v.video_files.sort((a, b) => b.width - a.width)[0]
    return { id: String(v.id), url: best?.link ?? '' }
  }).filter((c) => c.url)
}

// # Search Pixabay for video clips
async function searchPixabay(query: string): Promise<ClipResult[]> {
  const apiKey = envOr('PIXABAY_API_KEY', '')
  if (!apiKey) return []

  const url = buildPixabayUrl(query)
  const res = await fetch(url)

  if (!res.ok) return []
  const data = await res.json() as {
    hits?: Array<{ id: number; videos: { large?: { url: string } } }>
  }

  return (data.hits ?? []).map((h) => ({
    id: String(h.id),
    url: h.videos?.large?.url ?? '',
  })).filter((c) => c.url)
}

// # Pipeline stage — fetches footage for each scene with AI Director-provided queries
export async function footageFetcherStage(ctx: PipelineContext): Promise<PipelineContext> {
  if (!ctx.scenePlan?.scenes) {
    throw new Error('No scene plan in context — run aiDirectorStage first')
  }

  // # Create working directory for downloaded/graded footage
  const workDir = join(tmpdir(), `capitalcode-footage-${ctx.videoId}`)
  if (!existsSync(workDir)) mkdirSync(workDir, { recursive: true })

  // # Determine orientation from aspect ratio
  const orientation = ctx.scenePlan.aspectRatio === 'portrait' ? 'portrait' : 'landscape'
  const resolution = orientation === 'portrait'
    ? { width: 1080, height: 1920 }
    : { width: 1920, height: 1080 }

  // # Track used clip IDs to avoid repetition across scenes
  const usedIds = new Set<string>()
  const scenes = [...ctx.scenePlan.scenes]

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i]
    // # AI Director provides footage_query on scenes that want B-roll
    const query = scene.props?.footageQuery ?? scene.props?.footage_query ?? ''

    // # Skip scenes that already have an illustration or no query
    if (scene.props?.backgroundType === 'illustration') continue
    if (!query) continue

    const durationSec = Math.ceil(scene.durationFrames / 30)

    // # Fallback chain: Storyblocks → Pexels → Pixabay → skip
    let clip: ClipResult | null = null

    // # 1. Try Storyblocks (premium, best quality)
    const sbResults = await searchStoryblocksVideo(query, orientation)
    const sbCandidates = deduplicateClips(
      sbResults.map((r) => ({ id: r.id, url: r.download_url ?? r.preview_url })),
      usedIds
    )
    if (sbCandidates.length > 0) clip = sbCandidates[0]

    // # 2. Try Pexels (free, good quality)
    if (!clip) {
      const pxResults = await searchPexels(query, orientation)
      const pxCandidates = deduplicateClips(pxResults, usedIds)
      if (pxCandidates.length > 0) clip = pxCandidates[0]
    }

    // # 3. Try Pixabay (free, decent quality)
    if (!clip) {
      const pbResults = await searchPixabay(query)
      const pbCandidates = deduplicateClips(pbResults, usedIds)
      if (pbCandidates.length > 0) clip = pbCandidates[0]
    }

    // # No footage found — scene uses gradient background (the default)
    if (!clip) continue

    usedIds.add(clip.id)

    // # Download raw clip, then apply cinematic color grade via ffmpeg
    try {
      const rawPath = join(workDir, `raw-${i}.mp4`)
      const gradedPath = join(workDir, `graded-${i}.mp4`)

      const buffer = await downloadFile(clip.url)
      writeFileSync(rawPath, buffer)

      // # Trim + scale + color grade
      const gradeArgs = buildColorGradeArgs(rawPath, gradedPath, resolution.width, resolution.height, durationSec)
      execFileSync('ffmpeg', gradeArgs, { stdio: 'pipe', timeout: 60_000 })

      // # Attach graded footage path to the scene for MasterComposition
      scenes[i] = { ...scene, props: { ...scene.props, footagePath: gradedPath, backgroundType: 'footage' } }
    } catch (err) {
      // # Footage failed — skip silently, scene falls back to gradient bg
      console.warn(`[footage-fetcher] Scene ${i} footage failed: ${err}`)
    }
  }

  return { ...ctx, scenePlan: { ...ctx.scenePlan, scenes } }
}
