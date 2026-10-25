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
import { createServer } from 'node:net'
import { cpus, freemem } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { bundle } from '@remotion/bundler'
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer'
import { ff, normalize } from './audio'
import { PUBLIC_DIR, ROOT } from './paths'
import type { Timeline } from './timeline'

export const TIMEOUT = 120_000
export const PORT = 3177 // # first port tried (3000 is often taken by a Next dev server)

// # First free local port from `start` up — a second render or a thumbnail job never clashes
export const freePort = async (start = PORT): Promise<number> => {
  for (let p = start; p < start + 200; p++) {
    const ok = await new Promise<boolean>((res) => {
      const srv = createServer().once("error", () => res(false)).once("listening", () => srv.close(() => res(true)))
      srv.listen(p, "127.0.0.1")
    })
    if (ok) return p
  }
  throw new Error(`no free port in ${start}–${start + 199}`)
}
let portP: Promise<number> | null = null
const port = () => (portP ??= freePort())
export const CHUNK = 900 // # 30 s at 30 fps
export const TRANSITION = 8 // # must match art/episode/Episode.tsx

let served: Promise<string> | null = null
// # The webpack bundle is cached on disk per art version: later commands (render, stills,
// # thumbnails) reuse it instead of re-bundling; older bundles are removed.
export const BUNDLES = join(ROOT, 'temp', 'bundles')
const cachedBundle = async () => {
  const dir = join(BUNDLES, artHash())
  if (existsSync(join(dir, 'index.html'))) return dir
  if (existsSync(BUNDLES)) for (const old of readdirSync(BUNDLES)) rmSync(join(BUNDLES, old), { recursive: true, force: true })
  return bundle({ entryPoint: join(ROOT, 'art', 'index.tsx'), publicDir: PUBLIC_DIR, outDir: dir })
}
export const serveUrl = () => (served ??= cachedBundle())

export const composition = async (id: string, inputProps: Record<string, unknown>) =>
  selectComposition({ serveUrl: await serveUrl(), id, inputProps, timeoutInMilliseconds: TIMEOUT, port: await port() })

// # PNG stills of chosen frames (pre-flight, review sheets, thumbnails)
export const renderStills = async (id: string, inputProps: Record<string, unknown>, frames: number[], outDir: string, prefix = 'f') => {
  mkdirSync(outDir, { recursive: true })
  const comp = await composition(id, inputProps)
  const files: string[] = []
  for (const frame of frames) {
    const output = join(outDir, `${prefix}_${String(frame).padStart(6, '0')}.png`)
    await renderStill({ serveUrl: await serveUrl(), composition: comp, inputProps, frame, output, timeoutInMilliseconds: TIMEOUT, port: await port() })
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

// ---------------------------------------------------------------- art fingerprint
// # Which art a chunk depends on. `base` = every file the Episode imports (plus fonts and
// # textures) except the scene/prop library files; `idFile` = each scene/prop id → a hash of
// # the library file that draws it (and everything that file imports). Fixing one drawing
// # then re-renders only the chunks that show it.
export type ArtFingerprint = { base: string; idFile: Record<string, string> }

const EXT = ['.tsx', '.ts', '/index.tsx', '/index.ts']
const importsOf = (file: string): string[] => {
  const src = readFileSync(file, 'utf8')
  return [...src.matchAll(/(?:from|import)\s+'(\.{1,2}\/[^']+)'/g)].flatMap(([, rel]) => {
    const p = resolve(dirname(file), rel)
    const hit = [p, ...EXT.map((e) => p + e)].find((x) => existsSync(x) && statSync(x).isFile())
    return hit ? [hit] : []
  })
}
const reach = (entry: string, seen = new Set<string>()) => {
  if (seen.has(entry)) return seen
  seen.add(entry)
  for (const f of importsOf(entry)) reach(f, seen)
  return seen
}
const hashFiles = (files: Iterable<string>, extra: string[] = []) => {
  const h = createHash('sha256')
  for (const f of [...files].sort()) { h.update(f.slice(ROOT.length)); h.update(stripPieceList(readFileSync(f, 'utf8'))) }
  for (const d of extra) hashTree(d, h)
  return h.digest('hex').slice(0, 12)
}

// # The piece index lists every piece file between "pieces:begin" and "pieces:end"; adding a new Short's file
// # there must not re-render every other video, so that block is left out of the shared hash
export const stripPieceList = (src: string) => src.replace(/\/\/ # pieces:begin[\s\S]*?\/\/ # pieces:end/g, '')

export const artFingerprint = (entry = join(ROOT, 'art', 'episode', 'Episode.tsx')): ArtFingerprint => {
  const all = reach(resolve(entry))
  // # library files (scenes, props, vignettes, diorama pieces) are hashed per id: a video re-renders only what it uses
  const lib = [...all].filter((f) => /make(Scene|Prop|Vignette|Piece)\('[\w-]+'/.test(readFileSync(f, 'utf8')))
  const idFile: Record<string, string> = {}
  for (const f of lib) {
    const h = hashFiles(reach(f))
    for (const [, id] of readFileSync(f, 'utf8').matchAll(/make(?:Scene|Prop|Vignette|Piece)\('([\w-]+)'/g)) idFile[id] = h
  }
  const base = hashFiles([...all].filter((f) => !lib.includes(f)), [join(PUBLIC_DIR, 'fonts'), join(PUBLIC_DIR, 'textures')])
  return { base, idFile }
}

// # Scene + prop ids a shot draws
const artIds = (s: Timeline['shots'][number]['shot']): string[] => {
  const x = s as { kind: string; scene?: string; vignette?: string; piece?: string; props?: { id: string }[]; data?: { icon?: string } }
  return [...(x.kind === 'scene' && x.scene ? [x.scene] : []), ...(x.kind === 'piece' && x.piece ? [x.piece] : []), ...(x.kind === 'vignette' && x.vignette ? [x.vignette] : []), ...(x.props ?? []).map((p) => p.id), ...(x.data?.icon ? [x.data.icon] : [])]
}

// # A chunk's key: its range + every shot visible in it (incl. the outgoing transition) + the art it uses
export const chunkKeys = (tl: Timeline, chunks: Range[], art: string | ArtFingerprint) =>
  chunks.map((c) => {
    const w = tl.shots.filter((s) => s.to + TRANSITION > c.from && s.from < c.to)
    let a: unknown = art
    if (typeof art !== 'string') {
      const ids = [...new Set(w.flatMap((s) => artIds(s.shot)))].sort()
      const unknown = ids.filter((id) => !art.idFile[id])
      if (unknown.length) throw new Error(`art fingerprint has no file for: ${unknown.join(', ')}`)
      a = { base: art.base, lib: ids.map((id) => `${id}:${art.idFile[id]}`) }
    }
    return { ...c, key: createHash('sha256').update(JSON.stringify({ art: a, c, w })).digest('hex').slice(0, 12) }
  })

export const countFrames = (file: string): number => {
  const p = spawnSync('ffprobe', ['-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', file], { encoding: 'utf8' })
  return Number((p.stdout || '').replace(/[^0-9]/g, '')) || 0
}

export type RenderRange = (from: number, to: number, out: string) => Promise<void>

// # Render missing chunks; finished ones (right name + right frame count) are reused. A chunk that still fails after
// # its retries is rendered as two halves and joined (a long chunk can wear out the browser tab on a busy machine),
// # down to `minSplit` frames
export const renderChunks = async (chunks: (Range & { key: string })[], dir: string, render: RenderRange, opts: { retries?: number; log?: (s: string) => void; minSplit?: number } = {}) => {
  mkdirSync(dir, { recursive: true })
  const tries = opts.retries ?? 2, minSplit = opts.minSplit ?? 120
  // # one frame range into `out`, checked frame by frame count
  const span = async (from: number, to: number, out: string): Promise<void> => {
    const want = to - from, part = out.replace(/\.mp4$/, '.part.mp4')
    for (let k = 1; ; k++) {
      try {
        await render(from, to, part)
        const n = countFrames(part)
        if (n !== want) throw new Error(`chunk ${from}-${to}: ${n} frames, expected ${want}`)
        renameSync(part, out)
        return
      } catch (e) {
        rmSync(part, { force: true })
        if (k < tries) { opts.log?.(`chunk ${from}-${to} failed (${(e as Error).message.split('\n')[0]}) — retry ${k + 1}/${tries}`); continue }
        if (want < 2 * minSplit) throw e
        const mid = from + Math.floor(want / 2), a = out.replace(/\.mp4$/, '.a.mp4'), b = out.replace(/\.mp4$/, '.b.mp4')
        opts.log?.(`chunk ${from}-${to} still failing — rendering it as two halves (${from}-${mid}, ${mid}-${to})`)
        await span(from, mid, a)
        await span(mid, to, b)
        concatVideos([a, b], out)
        rmSync(a, { force: true }); rmSync(b, { force: true })
        if (countFrames(out) !== want) throw new Error(`chunk ${from}-${to}: joined halves have ${countFrames(out)} frames, expected ${want}`)
        return
      }
    }
  }
  const files: string[] = []
  for (const [i, c] of chunks.entries()) {
    const file = join(dir, `chunk_${String(c.from).padStart(6, '0')}_${String(c.to).padStart(6, '0')}_${c.key}.mp4`)
    const want = c.to - c.from
    if (existsSync(file) && countFrames(file) === want) { files.push(file); continue }
    const t0 = Date.now()
    await span(c.from, c.to, file)
    opts.log?.(`chunk ${i + 1}/${chunks.length} (${c.from}-${c.to}) ${((Date.now() - t0) / want).toFixed(0)} ms/frame`)
    files.push(file)
  }
  return files
}

// # Delete chunk files (and half-written parts) that the current render no longer uses
export const pruneChunks = (dir: string, keep: string[]) => {
  const names = new Set(keep.map((f) => resolve(f)))
  const old = readdirSync(dir).filter((f) => /^chunk_.*\.mp4$/.test(f) && !names.has(resolve(join(dir, f))))
  for (const f of old) rmSync(join(dir, f), { force: true })
  return old
}

// # Remotion renderer for one frame range of the Episode, video only
export const remotionRange = async (inputProps: Record<string, unknown>, id = 'Episode'): Promise<RenderRange> => {
  const comp = await composition(id, inputProps)
  return async (from, to, out) => {
    await renderMedia({
      serveUrl: await serveUrl(), composition: comp, inputProps, codec: 'h264', crf: 18, pixelFormat: 'yuv420p', imageFormat: 'jpeg', jpegQuality: 92,
      frameRange: [from, to - 1], outputLocation: out, muted: true, timeoutInMilliseconds: TIMEOUT, port: await port(), concurrency: renderConcurrency(freemem() / 1e9, cpus().length), // # re-checked every chunk
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
// # The voiceover loudness the owner approved for every video: louder master, voice about 2 dB further above the SFX
export const MIX = { long: { lufs: -11, sfxGain: 0.8 }, short: { lufs: -11, sfxGain: 0.8 } } // # owner approved 2026-10-26 (≈ −12 LUFS measured)
export const mixAudio = (voice: string, sfx: Sfx[], seconds: number, out: string, sfxDir = join(PUBLIC_DIR, 'sfx', 'cc'), o: { lufs: number; sfxGain: number } = MIX.long) => {
  const names = [...new Set(sfx.map((x) => x.name))]
  const inputs = ['-i', voice, ...names.flatMap((n) => ['-i', join(sfxDir, `${n}.wav`)])]
  const lines: string[] = [`[0:a]aformat=sample_rates=48000:channel_layouts=mono,apad,atrim=0:${seconds.toFixed(3)}[v]`]
  const labels: string[] = ['[v]']
  names.forEach((n, ni) => {
    const uses = sfx.filter((x) => x.name === n)
    lines.push(`[${ni + 1}:a]aformat=sample_rates=48000:channel_layouts=mono,asplit=${uses.length}${uses.map((_, k) => `[i${ni}_${k}]`).join('')}`)
    uses.forEach((x, k) => {
      lines.push(`[i${ni}_${k}]adelay=${Math.max(0, Math.round(x.t * 1000))}:all=1,volume=${(x.volume * o.sfxGain).toFixed(3)}[s${ni}_${k}]`)
      labels.push(`[s${ni}_${k}]`)
    })
  })
  lines.push(`${labels.join('')}amix=inputs=${labels.length}:normalize=0:duration=first[out]`)
  const script = `${out}.filter.txt`
  writeFileSync(script, lines.join(';\n'))
  const pre = out.replace(/\.wav$/, '.pre.wav')
  ff([...inputs, '-/filter_complex', script, '-map', '[out]', '-ar', '48000', '-ac', '1', pre], 'mix audio')
  normalize(pre, out, o.lufs)
  rmSync(script, { force: true })
  rmSync(pre, { force: true })
}

// # Video (no audio) + mixed audio → final mp4 (AAC 192k stereo, fast start)
export const mux = (video: string, audio: string, out: string) =>
  ff(['-i', video, '-i', audio, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ac', '2', '-shortest', '-movflags', '+faststart', out], 'mux')

// # Browser tabs for one chunk: half the cores at most, and only as many as free memory allows
// # (≈ 0.7 GB per tab, 3 GB kept for the system — measured: 0.45/2 still got renders killed) — a render on a busy PC slows down instead of being killed
// # CC_RENDER_WORKERS (optional) caps it further on a PC where renders keep getting stopped for low memory
export const renderConcurrency = (freeGB: number, cores: number) => {
  const cap = Number(process.env.CC_RENDER_WORKERS) || Infinity
  return Math.max(1, Math.min(cap, Math.max(1, Math.floor(cores / 2)), Math.floor((freeGB - 3) / 0.7)))
}
