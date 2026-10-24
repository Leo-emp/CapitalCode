// ============================================================
// VIDEO QA GATE — the finished file must match the voice length,
// sit at −14 LUFS with true peak ≤ −1 dBTP, and pass a flicker scan:
// a one-frame flash (frame i jumps away, frame i+1 jumps back) that
// is not at a planned cut is flagged for the Critic with a sheet.
// ============================================================
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { duration, ff, loudness } from '../audio'

// # d[i] = mean absolute luma difference between frame i-1 and frame i (0–255), d[0] = 0
export const frameDiffs = (file: string): number[] => {
  const work = mkdtempSync(join(tmpdir(), 'ccdiff-'))
  // # metadata file is written relative to cwd (Windows drive colons break filter arguments)
  const p = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', resolve(file), '-an', '-vf',
    'scale=160:90,format=gray,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=diffs.txt', '-f', 'null', '-'],
  { cwd: work, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  if (p.status !== 0) throw new Error(`flicker scan failed: ${(p.stderr || '').split('\n').slice(-4).join(' | ')}`)
  const vals = [...readFileSync(join(work, 'diffs.txt'), 'utf8').matchAll(/YAVG=([\d.]+)/g)].map((m) => Number(m[1]))
  rmSync(work, { recursive: true, force: true })
  return [0, ...vals]
}

const median = (xs: number[]) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)] ?? 0 }

// # Flag frames where the picture jumps away and straight back (a 1-frame glitch).
// # Frames near a planned cut (incl. its transition) are excused.
export const findFlicker = (d: number[], cuts: number[], opts: { transition?: number; min?: number } = {}): number[] => {
  const T = Math.max(opts.min ?? 6, 4 * median(d))
  const tr = opts.transition ?? 8
  const nearCut = (i: number) => cuts.some((c) => i >= c - 3 && i <= c + tr + 4)
  const flags: number[] = []
  for (let i = 1; i + 1 < d.length; i++) {
    const out = d[i], back = d[i + 1]
    if (out > T && back > T && Math.min(out, back) / Math.max(out, back) > 0.5 && !nearCut(i) && flags.at(-1) !== i - 1) flags.push(i)
  }
  return flags
}

export type VideoGate = { ok: boolean; problems: string[]; flags: number[]; stats: { seconds: number; lufs: number; peak: number; brightness: number } }

// # Mean picture brightness in % (luma, one frame per second). Alux reference ≈ 16%.
export const brightness = (file: string): number => {
  const p = spawnSync('ffmpeg', ['-v', 'error', '-i', file, '-an', '-vf', 'fps=1,scale=320:-2,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-', '-f', 'null', '-'], { encoding: 'utf8', maxBuffer: 64 << 20 })
  const ys = [...p.stdout.matchAll(/YAVG=([\d.]+)/g)].map((m) => Number(m[1]))
  if (!ys.length) throw new Error(`brightness: no frames measured in ${file}`)
  return +(ys.reduce((a, b) => a + b, 0) / ys.length / 255 * 100).toFixed(1)
}

export const gateVideo = (file: string, o: { expectSeconds: number; cuts: number[]; lufs?: [number, number]; peakMax?: number; brightness?: [number, number] }): VideoGate => {
  const problems: string[] = []
  const seconds = duration(file)
  if (Math.abs(seconds - o.expectSeconds) > 0.5) problems.push(`duration ${seconds.toFixed(1)} s, expected ${o.expectSeconds.toFixed(1)} s`)
  const l = loudness(file)
  const [lo, hi] = o.lufs ?? [-15, -13]
  if (l.lufs < lo || l.lufs > hi) problems.push(`loudness ${l.lufs} LUFS (want ${lo}…${hi})`)
  if (l.peak > (o.peakMax ?? -1)) problems.push(`true peak ${l.peak} dBTP (max ${o.peakMax ?? -1})`)
  const flags = findFlicker(frameDiffs(file), o.cuts)
  const b = brightness(file)
  if (o.brightness && (b < o.brightness[0] || b > o.brightness[1])) problems.push(`brightness ${b}% (want ${o.brightness[0]}–${o.brightness[1]}%)`)
  return { ok: problems.length === 0, problems, flags, stats: { seconds: +seconds.toFixed(2), lufs: l.lufs, peak: l.peak, brightness: b } }
}

// # Contact sheets for the Critic: one frame every N seconds, 4×3 per sheet
export const frameSheets = (file: string, outDir: string, every = 10, prefix = 'sheet'): string[] => {
  mkdirSync(outDir, { recursive: true })
  for (const f of readdirSync(outDir)) if (f.startsWith(`${prefix}_`)) rmSync(join(outDir, f))
  ff(['-i', file, '-an', '-vf', `fps=1/${every},scale=480:-2,tile=4x3:padding=4:color=white`, '-q:v', '3', join(outDir, `${prefix}_%02d.jpg`)], 'frame sheets')
  return readdirSync(outDir).filter((f) => f.startsWith(`${prefix}_`)).sort().map((f) => join(outDir, f))
}

// # One frame near the end of every shot (95%), from the final video: the Critic sees each
// # build finished — overflow, overlap, covered faces, empty screens — not just 10 s samples
export const shotFrames = (file: string, tl: { fps: number; shots: { from: number; to: number }[] }, outDir: string): string[] => {
  mkdirSync(outDir, { recursive: true })
  for (const f of readdirSync(outDir)) if (f.startsWith('shot_')) rmSync(join(outDir, f))
  return tl.shots.map((s, i) => {
    const out = join(outDir, `shot_${String(i + 1).padStart(2, '0')}.jpg`)
    ff(['-ss', ((s.from + (s.to - s.from) * 0.95) / tl.fps).toFixed(3), '-i', file, '-an', '-frames:v', '1', '-vf', 'scale=960:-2', '-q:v', '3', out], 'shot frame')
    return out
  })
}

// # Close-up sheet around each flagged frame (f-2 … f+2) so the Critic can judge it
export const flagSheets = (file: string, flags: number[], fps: number, outDir: string): string[] =>
  flags.slice(0, 12).map((f, k) => {
    const out = join(outDir, `flag_${String(k + 1).padStart(2, '0')}_f${f}.jpg`)
    ff(['-ss', Math.max(0, (f - 2) / fps).toFixed(3), '-i', file, '-an', '-frames:v', '1', '-vf', 'scale=480:-2,tile=5x1:padding=4:color=red', out], 'flag sheet')
    return out
  })

// # Frames where a big change is planned: every cut and every slam hit (pop + impact shake)
export const plannedMotion = (tl: { shots: { from: number; shot: any }[] }): number[] => {
  const out = new Set<number>()
  tl.shots.forEach((s, i) => {
    if (i) out.add(s.from)
    if (s.shot.kind === 'scene' && s.shot.slam) for (const c of s.shot.slam.at) out.add(c)
    if (s.shot.kind === 'slide' && s.shot.slide === 'slam') for (const c of s.shot.at) out.add(c)
  })
  return [...out].sort((a, b) => a - b)
}
