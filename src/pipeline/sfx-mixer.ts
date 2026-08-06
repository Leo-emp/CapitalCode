// # Sound effects mixer pipeline stage
// # Positions SFX (whoosh, impact, riser, tick, bass_hit) at precise frame timestamps
// # Uses ffmpeg adelay for millisecond-accurate positioning

import { execFileSync } from 'node:child_process'
import { mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import type { PipelineContext } from './orchestrator'

// # SFX files directory (relative to project root)
const SFX_DIR = join(process.cwd(), 'public', 'sfx')

// # Minimum gap between SFX cues: 60 frames = 2 seconds at 30fps
// # Prevents overlapping sounds that create audio mud
const MIN_SFX_GAP = 60

// # Convert frame number to milliseconds at 30fps
// # Used for ffmpeg adelay filter which takes milliseconds
export function calculateDelayMs(frame: number): number {
  return Math.round((frame / 30) * 1000)
}

// # Remove SFX cues that are too close together
// # Keeps the first cue in each cluster, drops the rest
export function capSfxDensity(
  cues: Array<{ frame: number; type: string }>
): Array<{ frame: number; type: string }> {
  if (cues.length <= 1) return cues

  // # Sort by frame to process in temporal order
  const sorted = [...cues].sort((a, b) => a.frame - b.frame)
  const kept = [sorted[0]]

  for (let i = 1; i < sorted.length; i++) {
    // # Only keep if far enough from the last kept cue
    if (sorted[i].frame - kept[kept.length - 1].frame >= MIN_SFX_GAP) {
      kept.push(sorted[i])
    }
  }

  return kept
}

// # Map SFX type name to filename in public/sfx/
function sfxPath(type: string): string {
  const fileMap: Record<string, string> = {
    whoosh: 'whoosh.mp3',
    impact: 'impact.mp3',
    riser: 'riser.mp3',
    tick: 'tick.mp3',
    bass_hit: 'bass_hit.mp3',
    subtle_whoosh: 'subtle_whoosh.mp3',
  }
  return join(SFX_DIR, fileMap[type] ?? 'whoosh.mp3')
}

// # Build ffmpeg args to mix SFX into the voice+music track
// # Each SFX is adelay'd to its exact frame position, then amixed together
export function buildSfxArgs(
  audioPath: string,
  sfxCues: Array<{ frame: number; type: string; path: string }>,
  outputPath: string
): string[] {
  // # No SFX — just copy the audio through
  if (sfxCues.length === 0) return ['-i', audioPath, '-c', 'copy', '-y', outputPath]

  // # Build input list: voice+music first, then each SFX file
  const inputs: string[] = ['-i', audioPath]
  sfxCues.forEach((cue) => {
    inputs.push('-i', cue.path)
  })

  // # Build filter chain: delay each SFX, reduce volume, then mix all
  const filters: string[] = []
  const mixInputs: string[] = ['[0:a]']

  sfxCues.forEach((cue, i) => {
    const delayMs = calculateDelayMs(cue.frame)
    const label = `sfx${i}`
    // # adelay: position in time, volume: -12dB (0.25 linear)
    filters.push(`[${i + 1}:a]adelay=${delayMs}|${delayMs},volume=0.25[${label}]`)
    mixInputs.push(`[${label}]`)
  })

  // # amix: combine voice/music + all positioned SFX
  const amixCount = sfxCues.length + 1
  filters.push(`${mixInputs.join('')}amix=inputs=${amixCount}:duration=first[out]`)

  return [
    ...inputs,
    '-filter_complex', filters.join(';'),
    '-map', '[out]',
    '-y',
    outputPath,
  ]
}

// # Pipeline stage — collects SFX cues from all scenes and mixes into audio
export async function sfxMixerStage(ctx: PipelineContext): Promise<PipelineContext> {
  // # Need a local audio file to mix SFX into
  if (!ctx.processedAudio?.localPath) return ctx
  if (!ctx.scenePlan?.scenes) return ctx

  // # Collect all SFX cues from all scenes, converting to absolute frame positions
  const allCues: Array<{ frame: number; type: string }> = []
  for (const scene of ctx.scenePlan.scenes) {
    if (!scene.sfxCues) continue
    for (const cue of scene.sfxCues) {
      // # Add scene start frame to get absolute position in video
      allCues.push({
        frame: scene.startFrame + cue.frame,
        type: cue.type,
      })
    }
  }

  // # Cap density and resolve file paths
  const capped = capSfxDensity(allCues)
  if (capped.length === 0) return ctx

  const resolvedCues = capped.map((c) => ({
    ...c,
    path: sfxPath(c.type),
  }))

  // # Create work directory for output
  const workDir = join(tmpdir(), `capitalcode-sfx-${ctx.videoId}`)
  if (!existsSync(workDir)) mkdirSync(workDir, { recursive: true })

  const outputPath = join(workDir, 'with-sfx.mp3')
  const args = buildSfxArgs(ctx.processedAudio.localPath, resolvedCues, outputPath)

  try {
    execFileSync('ffmpeg', args, { stdio: 'pipe', timeout: 120_000 })
    return {
      ...ctx,
      processedAudio: { ...ctx.processedAudio, localPath: outputPath, hasSfx: true },
    }
  } catch {
    // # SFX mixing failed — return voice+music only (still a good video)
    return ctx
  }
}
