// # Background music mixer pipeline stage
// # Fetches music: Storyblocks → Pixabay → skip
// # Mixes under voiceover at -18dB using ffmpeg amix

import { execFileSync } from 'node:child_process'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { searchStoryblocksMusic, downloadFile } from '@/lib/storyblocks'
import { envOr } from '@/lib/env'
import type { PipelineContext } from './orchestrator'

// # ffmpeg filter for music volume
// # -18dB ≈ 0.125 linear — music sits under voice, barely noticeable
// # Can be extended with sidechaincompress for dynamic ducking
export function buildDuckingFilter(
  _durationSec: number,
  _punchPoints: Array<{ frame: number; word: string; type: string }>
): string {
  // # Constant volume for now — keeps mix predictable
  return 'volume=0.125'
}

// # Build ffmpeg args to mix voice + music into a single audio track
// # Voice at full volume, music at -18dB, limited to voice duration
export function buildMusicMixArgs(
  voicePath: string,
  musicPath: string,
  outputPath: string,
  durationSec: number
): string[] {
  return [
    '-i', voicePath,
    '-i', musicPath,
    '-filter_complex',
    // # [1:a] = music track, apply volume reduction, then amix with voice
    `[1:a]${buildDuckingFilter(durationSec, [])}[music];[0:a][music]amix=inputs=2:duration=first:weights=1 0.125[out]`,
    '-map', '[out]',
    '-t', String(durationSec),
    '-y',
    outputPath,
  ]
}

// # Search Pixabay for background music (free fallback)
async function searchPixabayMusic(mood: string): Promise<{ url: string } | null> {
  const key = envOr('PIXABAY_API_KEY', '')
  if (!key) return null

  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(mood + ' background')}&category=music&per_page=3`
    )
    if (!res.ok) return null
    const data = await res.json() as { hits?: Array<{ previewURL?: string }> }
    const hit = data.hits?.[0]
    return hit?.previewURL ? { url: hit.previewURL } : null
  } catch {
    return null
  }
}

// # Pipeline stage — fetch background music and mix with voice
export async function musicMixerStage(ctx: PipelineContext): Promise<PipelineContext> {
  // # Need processed audio (voice) to mix with
  if (!ctx.processedAudio?.url && !ctx.processedAudio?.localPath) {
    throw new Error('No processed audio in context — run audioProcessorStage first')
  }

  const workDir = join(tmpdir(), `capitalcode-music-${ctx.videoId}`)
  if (!existsSync(workDir)) mkdirSync(workDir, { recursive: true })

  // # Use mood from AI Director to search for matching music
  const mood = ctx.scenePlan?.mood ?? 'neutral'
  const durationSec = Math.ceil((ctx.scenePlan?.totalFrames ?? 0) / 30)

  // # Search for a background track: Storyblocks → Pixabay → skip
  let musicBuffer: Buffer | null = null

  // # 1. Try Storyblocks Music (premium)
  const sbTracks = await searchStoryblocksMusic(mood)
  if (sbTracks.length > 0) {
    try {
      musicBuffer = await downloadFile(sbTracks[0].download_url ?? sbTracks[0].preview_url)
    } catch { /* fall through to next source */ }
  }

  // # 2. Try Pixabay Music (free)
  if (!musicBuffer) {
    const pbTrack = await searchPixabayMusic(mood)
    if (pbTrack) {
      try { musicBuffer = await downloadFile(pbTrack.url) } catch { /* skip music entirely */ }
    }
  }

  // # No music found — return context unchanged (voice-only is fine)
  if (!musicBuffer) return ctx

  // # Write music file to temp dir
  const musicPath = join(workDir, 'music.mp3')
  writeFileSync(musicPath, musicBuffer)

  // # Get voice track path — download if only URL available
  const voicePath = ctx.processedAudio.localPath ?? join(workDir, 'voice.mp3')
  if (!ctx.processedAudio.localPath) {
    const voiceBuffer = await downloadFile(ctx.processedAudio.url)
    writeFileSync(voicePath, voiceBuffer)
  }

  // # Mix voice + music via ffmpeg
  const mixedPath = join(workDir, 'mixed.mp3')
  const mixArgs = buildMusicMixArgs(voicePath, musicPath, mixedPath, durationSec)

  try {
    execFileSync('ffmpeg', mixArgs, { stdio: 'pipe', timeout: 60_000 })
    return {
      ...ctx,
      processedAudio: { ...ctx.processedAudio, localPath: mixedPath, hasBgMusic: true },
    }
  } catch {
    // # Mix failed — voice-only is better than no audio
    return ctx
  }
}
