// # Thumbnail stage — renders a still PNG via Remotion for YouTube/social
import { execFileSync } from 'node:child_process'
import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { uploadToR2 } from '@/storage/r2'
import type { PipelineContext } from './orchestrator'

// # Build args for Remotion still render
export function buildStillArgs(outputPath: string, propsPath: string): string[] {
  return [
    'remotion', 'still',
    'src/remotion/Root.tsx',
    'CapitalCode-Landscape', // # Thumbnails always landscape
    outputPath,
    `--props=${propsPath}`,
    '--log=error',
  ]
}

// # Pipeline stage — renders thumbnail still image
export async function thumbnailStage(ctx: PipelineContext): Promise<PipelineContext> {
  if (!ctx.scenePlan) {
    throw new Error('No scene plan in context — run aiDirectorStage first')
  }

  const workDir = join(tmpdir(), `capitalcode-thumb-${ctx.videoId}`)
  if (!existsSync(workDir)) mkdirSync(workDir, { recursive: true })

  const outputPath = join(workDir, 'thumbnail.png')
  const propsPath = join(workDir, 'thumb-props.json')

  // # Use the first scene from the plan as thumbnail content
  // # AI Director can optionally set ctx.scenePlan.thumbnailProps
  const thumbnailProps = ctx.scenePlan.thumbnailProps ?? {
    scenes: ctx.scenePlan.scenes.slice(0, 1),
    audioSrc: '',
    subtitleSrc: '',
    aspect: 'landscape',
    showGrain: false,
    showWatermark: true,
  }

  writeFileSync(propsPath, JSON.stringify(thumbnailProps))

  const args = buildStillArgs(outputPath, propsPath)
  execFileSync('npx', args, {
    stdio: 'pipe',
    timeout: 60_000,
    cwd: process.cwd(),
  })

  // # Upload to R2
  const thumbBuffer = readFileSync(outputPath)
  const r2Key = `thumbnails/${ctx.videoId}/thumbnail.png`
  const thumbnailUrl = await uploadToR2(r2Key, thumbBuffer, 'image/png')

  return { ...ctx, thumbnail: { url: thumbnailUrl } }
}
