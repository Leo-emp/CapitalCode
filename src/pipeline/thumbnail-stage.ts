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
    'CapitalCode-Thumbnail', // # Dedicated thumbnail composition
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

  // # Build thumbnail props from AI Director's thumbnailProps
  // # Uses dedicated ThumbnailComposition for maximum YouTube feed impact
  const thumbData = ctx.scenePlan.thumbnailProps ?? {}
  const thumbnailProps = {
    stat: thumbData.stat ?? '',
    line1: thumbData.line1 ?? ctx.primaryScript?.title ?? '',
    line2: thumbData.line2 ?? '',
    backgroundSrc: ctx.scenePlan.scenes[0]?.props?.footagePath ?? '',
    trendDirection: 'neutral',
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
