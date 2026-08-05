// # Audio processor — runs ffmpeg broadcast-quality chain on raw ElevenLabs audio
// # Runs on GitHub Actions runner where ffmpeg is pre-installed

import { execFileSync } from 'node:child_process'
import { writeFileSync, readFileSync, mkdirSync, unlinkSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { uploadToR2 } from '@/storage/r2'
import type { PipelineContext } from './orchestrator'

// # ffmpeg audio filter chain — broadcast-quality processing
// # highpass: removes low rumble below 80Hz
// # acompressor: evens out volume peaks (ratio 3:1 at -18dB threshold)
// # equalizer 3kHz: slight presence boost for voice clarity
// # equalizer 6kHz: de-ess by cutting harsh sibilance
// # loudnorm: EBU R128 loudness normalization to -16 LUFS (YouTube standard)
const AUDIO_FILTER = [
  'highpass=f=80',
  'acompressor=threshold=-18dB:ratio=3:attack=10:release=200',
  'equalizer=f=3000:width_type=o:width=1.5:g=2',
  'equalizer=f=6000:width_type=o:width=2:g=-2',
  'loudnorm=I=-16:LRA=11:TP=-1.5',
].join(',')

// # Build ffmpeg argument array — exported for testing
export function buildFfmpegArgs(inputPath: string, outputPath: string): string[] {
  return [
    '-i', inputPath,
    '-af', AUDIO_FILTER,
    '-ar', '48000',       // # 48kHz sample rate
    '-b:a', '192k',       // # 192kbps bitrate
    '-y',                 // # overwrite output
    outputPath,
  ]
}

// # Build complete ffmpeg command string
export function buildFfmpegCommand(inputPath: string, outputPath: string): string {
  return `ffmpeg ${buildFfmpegArgs(inputPath, outputPath).map((a) => `"${a}"`).join(' ')}`
}

// # Download a URL to a local file
async function downloadToFile(url: string, filePath: string): Promise<void> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Download failed: ${response.status} ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  writeFileSync(filePath, buffer)
}

// # Pipeline stage — processes raw ElevenLabs audio through ffmpeg
export async function audioProcessorStage(ctx: PipelineContext): Promise<PipelineContext> {
  if (!ctx.voice?.audioUrl) {
    throw new Error('No audio URL in context — run voiceGeneratorStage first')
  }

  // # Create temp directory for processing
  const workDir = join(tmpdir(), `capitalcode-audio-${ctx.videoId}`)
  if (!existsSync(workDir)) mkdirSync(workDir, { recursive: true })

  const rawPath = join(workDir, 'raw.mp3')
  const processedPath = join(workDir, 'processed.mp3')

  try {
    // # 1. Download raw audio from R2
    await downloadToFile(ctx.voice.audioUrl, rawPath)

    // # 2. Run ffmpeg processing — execFileSync avoids shell injection
    const args = buildFfmpegArgs(rawPath, processedPath)
    execFileSync('ffmpeg', args, { stdio: 'pipe', timeout: 60_000 })

    // # 3. Upload processed audio to R2
    const processedBuffer = readFileSync(processedPath)
    const r2Key = `audio/${ctx.videoId}/processed.mp3`
    const processedUrl = await uploadToR2(r2Key, processedBuffer, 'audio/mpeg')

    return {
      ...ctx,
      processedAudio: { url: processedUrl, localPath: processedPath },
    }
  } catch (err) {
    // # Cleanup on failure
    try { unlinkSync(rawPath) } catch {}
    try { unlinkSync(processedPath) } catch {}
    throw err
  }
}
