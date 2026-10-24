// ============================================================
// RENDER — Remotion bundle (once per process), stills, and the
// chunked resumable video render: ≤900-frame chunks cut at shot
// boundaries, each cached by content hash and frame-count checked,
// so a crash or reboot resumes from the last finished chunk.
// Audio (voice + SFX) is mixed once by ffmpeg and muxed at the end.
// ============================================================
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { cpus } from 'node:os'
import { join, resolve } from 'node:path'
import { bundle } from '@remotion/bundler'
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer'
import { ff, normalize } from './audio'
import { PUBLIC_DIR, ROOT } from './paths'
import type { Timeline } from './timeline'

export const TIMEOUT = 120_000
export const PORT = 3177 // # port 3000 is often taken by a Next dev server
export const CHUNK = 900 // # 30 s at 30 fps
export const TRANSITION = 8 // # must match art/episode/Episode.tsx

let served: Promise<string> | null = null
export const serveUrl = () => (served ??= bundle({ entryPoint: join(ROOT, 'art', 'index.tsx'), publicDir: PUBLIC_DIR }))

export const composition = async (id: string, inputProps: Record<string, unknown>) =>
  selectComposition({ serveUrl: await serveUrl(), id, inputProps, timeoutInMilliseconds: TIMEOUT, port: PORT })

// # PNG stills of chosen frames (pre-flight, review sheets, thumbnails)
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

// ---------------------------------------------------------------- chunks
export type Range = { from: number; to: number }

// # Greedy: whole shots per chunk up to `max` frames; a longer shot is cut inside
export const splitChunks = (shots: Range[], total: number, max = CHUNK): Range[] => {
  const out: Range[] = []
  let start = 0
  for (const s of shots) {
    if (s.to - start > max && s.from > start) { out.push({ from: start, to: s.from }); start = s.from }
    while (s.to - start > max) { out.push({ from: start, to: start + max }); start += max }
  }
  if (start < total) out.push({ from: start, to: total })
  return out
}

// # Hash of everything that changes how frames look (art code, fonts, textures)
const hashTree = (dir: string, h: ReturnType<typeof createHash>) => {
  if (!existsSync(dir)) return
  for (const f of readdirSync(dir).sort()) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) hashTree(p, h)
    else { h.update(p.slice(ROOT.length)); h.update(readFileSync(p)) }
  }
}
export const artHash = () => {
  const h = createHash('sha256')
  for (const d of [join(ROOT, 'art'), join(PUBLIC_DIR, 'fonts'), join(PUBLIC_DIR, 'textures')]) hashTree(d, h)
  return h.digest('hex').slice(0, 12)
}

// # A chunk's key: its range + every shot visible in it (incl. the outgoing transition) + art version
export const chunkKeys = (tl: Timeline, chunks: Range[], art: string) =>
  chunks.map((c) => ({
    ...c,
    key: createHash('sha256').update(JSON.stringify({ art, c, w: tl.shots.filter((s) => s.to + TRANSITION > c.from && s.from < c.to) })).digest('hex').slice(0, 12),
  }))

export const countFrames = (file: string): number => {
  const p = spawnSync('ffprobe', ['-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', file], { encoding: 'utf8' })
  return Number((p.stdout || '').replace(/[^0-9]/g, '')) || 0
}

export type RenderRange = (from: number, to: number, out: string) => Promise<void>

// # Render missing chunks; finished ones (right name + right frame count) are reused
export const renderChunks = async (chunks: (Range & { key: string })[], dir: string, render: RenderRange, opts: { retries?: number; log?: (s: string) => void } = {}) => {
  mkdirSync(dir, { recursive: true })
  const files: string[] = []
  for (const [i, c] of chunks.entries()) {
    const file = join(dir, `chunk_${String(c.from).padStart(6, '0')}_${String(c.to).padStart(6, '0')}_${c.key}.mp4`)
    const want = c.to - c.from
    if (existsSync(file) && countFrames(file) === want) { files.push(file); continue }
    const part = file.replace(/\.mp4$/, '.part.mp4')
    const tries = opts.retries ?? 2
    for (let k = 1; ; k++) {
      try {
        const t0 = Date.now()
        await render(c.from, c.to, part)
        const n = countFrames(part)
        if (n !== want) throw new Error(`chunk ${c.from}-${c.to}: ${n} frames, expected ${want}`)
        renameSync(part, file)
        opts.log?.(`chunk ${i + 1}/${chunks.length} (${c.from}-${c.to}) ${((Date.now() - t0) / want).toFixed(0)} ms/frame`)
        break
      } catch (e) {
        rmSync(part, { force: true })
        if (k >= tries) throw e
        opts.log?.(`chunk ${c.from}-${c.to} failed (${(e as Error).message.split('\n')[0]}) — retry ${k + 1}/${tries}`)
      }
    }
    files.push(file)
  }
  return files
}

// # Remotion renderer for one frame range of the Episode, video only
export const remotionRange = async (inputProps: Record<string, unknown>): Promise<RenderRange> => {
  const comp = await composition('Episode', inputProps)
  return async (from, to, out) => {
    await renderMedia({
      serveUrl: await serveUrl(), composition: comp, inputProps, codec: 'h264', crf: 18, pixelFormat: 'yuv420p', imageFormat: 'jpeg', jpegQuality: 92,
      frameRange: [from, to - 1], outputLocation: out, muted: true, timeoutInMilliseconds: TIMEOUT, port: PORT, concurrency: Math.max(2, Math.floor(cpus().length / 2)),
    })
  }
}

// # ffmpeg concat-demuxer list; single quotes inside a path are closed, escaped, reopened
export const concatList = (files: string[]) => files.map((f) => `file '${f.replace(/\\/g, '/').split("'").join("'\\''")}'\n`).join('')
export const concatVideos = (files: string[], out: string) => {
  const list = `${out}.txt`
  writeFileSync(list, concatList(files.map((f) => resolve(f)))) // # list entries resolve against the list's folder
  ff(['-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', out], 'concat video')
  rmSync(list, { force: true })
}

// ---------------------------------------------------------------- audio
export type Sfx = { name: string; t: number; volume: number }
export const WHOOSH = { volume: 0.22, lead: 0.15 }

// # A soft whoosh just before each cut, unless a planned sound sits within 0.3 s of it
export const autoSfx = (tl: Pick<Timeline, 'fps' | 'shots' | 'sfx'>): Sfx[] => {
  const cuts = tl.shots.slice(1).map((s) => s.from / tl.fps)
  const extra = cuts.filter((c) => !tl.sfx.some((x) => Math.abs(x.t - c) < 0.3)).map((c) => ({ name: 'whoosh', t: +(c - WHOOSH.lead).toFixed(3), volume: WHOOSH.volume }))
  return [...tl.sfx, ...extra]
}

// # voice + every SFX at its time → exactly `seconds` long → −14 LUFS.
// # The filter graph goes in a script file (Windows command lines cap at 32k chars).
export const mixAudio = (voice: string, sfx: Sfx[], seconds: number, out: string, sfxDir = join(PUBLIC_DIR, 'sfx', 'cc')) => {
  const names = [...new Set(sfx.map((x) => x.name))]
  const inputs = ['-i', voice, ...names.flatMap((n) => ['-i', join(sfxDir, `${n}.wav`)])]
  const lines: string[] = [`[0:a]aformat=sample_rates=48000:channel_layouts=mono,apad,atrim=0:${seconds.toFixed(3)}[v]`]
  const labels: string[] = ['[v]']
  names.forEach((n, ni) => {
    const uses = sfx.filter((x) => x.name === n)
    lines.push(`[${ni + 1}:a]aformat=sample_rates=48000:channel_layouts=mono,asplit=${uses.length}${uses.map((_, k) => `[i${ni}_${k}]`).join('')}`)
    uses.forEach((x, k) => {
      lines.push(`[i${ni}_${k}]adelay=${Math.max(0, Math.round(x.t * 1000))}:all=1,volume=${x.volume.toFixed(3)}[s${ni}_${k}]`)
      labels.push(`[s${ni}_${k}]`)
    })
  })
  lines.push(`${labels.join('')}amix=inputs=${labels.length}:normalize=0:duration=first[out]`)
  const script = `${out}.filter.txt`
  writeFileSync(script, lines.join(';\n'))
  const pre = out.replace(/\.wav$/, '.pre.wav')
  ff([...inputs, '-/filter_complex', script, '-map', '[out]', '-ar', '48000', '-ac', '1', pre], 'mix audio')
  normalize(pre, out, -14)
  rmSync(script, { force: true })
  rmSync(pre, { force: true })
}

// # Video (no audio) + mixed audio → final mp4 (AAC 192k stereo, fast start)
export const mux = (video: string, audio: string, out: string) =>
  ff(['-i', video, '-i', audio, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ac', '2', '-shortest', '-movflags', '+faststart', out], 'mux')
