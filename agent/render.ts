// ============================================================
// RENDER — Remotion bundle (once per process) + stills. Chunked
// resumable video render and the ffmpeg audio mix live here too.
// ============================================================
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { bundle } from '@remotion/bundler'
import { renderStill, selectComposition } from '@remotion/renderer'
import { PUBLIC_DIR, ROOT } from './paths'

export const TIMEOUT = 120_000
export const PORT = 3177 // # port 3000 is often taken by a Next dev server
let served: Promise<string> | null = null
export const serveUrl = () => (served ??= bundle({ entryPoint: join(ROOT, 'art', 'index.tsx'), publicDir: PUBLIC_DIR }))

export const composition = async (id: string, inputProps: Record<string, unknown>) =>
  selectComposition({ serveUrl: await serveUrl(), id, inputProps, timeoutInMilliseconds: TIMEOUT, port: PORT })

// # PNG stills of chosen frames (review sheets, thumbnails, QA)
export const renderStills = async (id: string, inputProps: Record<string, unknown>, frames: number[], outDir: string, prefix = 'f') => {
  mkdirSync(outDir, { recursive: true })
  const comp = await composition(id, inputProps)
  const files: string[] = []
  for (const frame of frames) {
    const output = join(outDir, `${prefix}_${String(frame).padStart(6, '0')}.png`)
    await renderStill({ serveUrl: await serveUrl(), composition: comp, inputProps, frame, output, timeoutInMilliseconds: TIMEOUT, port: PORT })
    files.push(output)
  }
  return files
}
