// # Render stage — calls Remotion to produce final MP4 from scene plan
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync, mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { uploadToR2 } from '@/storage/r2'
import { createRender } from '@/db/repo/renders'
import type { PipelineContext } from './orchestrator'

// # Map video type to Remotion composition ID
export function getCompositionId(videoType: string): string {
  switch (videoType) {
    case 'long_form': return 'CapitalCode-Landscape'
    case 'short_explainer': return 'CapitalCode-Portrait'
    case 'short_data_reveal': return 'CapitalCode-Portrait'
    default: return 'CapitalCode-Landscape'
  }
}

// # Resolution by aspect ratio
export function getResolution(aspectRatio: string): { width: number; height: number } {
  return aspectRatio === 'portrait'
    ? { width: 1080, height: 1920 }
    : { width: 1920, height: 1080 }
}

// # Build Remotion render CLI args as array (execFileSync-safe, no shell injection)
export function buildRenderArgs(
  compositionId: string,
  outputPath: string,
  durationFrames: number,
  propsPath?: string
): string[] {
  const args = [
    'remotion', 'render',
    'src/remotion/Root.tsx',
    compositionId,
    outputPath,
    `--frames=0-${durationFrames - 1}`,
    '--codec=h264',
    '--crf=18',
    '--fps=30',
    '--log=error',
  ]
  if (propsPath) args.push(`--props=${propsPath}`)
  return args
}

// # Pipeline stage — renders video via Remotion CLI
export async function renderStage(ctx: PipelineContext): Promise<PipelineContext> {
  if (!ctx.scenePlan) {
    throw new Error('No scene plan in context — run aiDirectorStage first')
  }
  if (!ctx.processedAudio) {
    throw new Error('No processed audio in context — run audioProcessorStage first')
  }

  const compositionId = getCompositionId(ctx.videoType)
  const workDir = join(tmpdir(), `capitalcode-render-${ctx.videoId}`)
  if (!existsSync(workDir)) mkdirSync(workDir, { recursive: true })

  const outputPath = join(workDir, 'output.mp4')

  // # Write scene plan + audio as input props JSON for Remotion
  const inputProps = {
    scenes: ctx.scenePlan.scenes,
    audioSrc: ctx.processedAudio.localPath ?? ctx.processedAudio.url,
    subtitleSrc: ctx.subtitles?.srtContent ?? '',
    aspect: ctx.scenePlan.aspectRatio === 'portrait' ? 'portrait' : 'landscape',
    showGrain: true,
    showWatermark: true,
  }

  const propsPath = join(workDir, 'props.json')
  writeFileSync(propsPath, JSON.stringify(inputProps))

  // # Run Remotion render via npx
  const renderArgs = buildRenderArgs(compositionId, outputPath, ctx.scenePlan.totalFrames, propsPath)
  const startTime = Date.now()
  execFileSync('npx', renderArgs, {
    stdio: 'pipe',
    timeout: 30 * 60 * 1000, // # 30 minute timeout for long renders
    cwd: process.cwd(),
  })
  const renderTime = Math.floor((Date.now() - startTime) / 1000)

  // # Get file stats
  const stats = statSync(outputPath)
  const durationSeconds = Math.round(ctx.scenePlan.totalFrames / 30)

  // # Upload to R2
  const videoBuffer = readFileSync(outputPath)
  const r2Key = `videos/${ctx.videoId}/${compositionId}.mp4`
  const r2Url = await uploadToR2(r2Key, videoBuffer, 'video/mp4')

  // # Store in database
  const renderId = crypto.randomUUID()
  await createRender({
    id: renderId,
    videoId: ctx.videoId,
    scenePlanId: ctx.scenePlan.id,
    aspectRatio: ctx.scenePlan.aspectRatio,
    r2Url,
    duration: durationSeconds,
    fileSize: stats.size,
    renderTime,
    createdAt: Math.floor(Date.now() / 1000),
  })

  return {
    ...ctx,
    render: { id: renderId, r2Url, duration: durationSeconds, fileSize: stats.size, renderTime },
  }
}
