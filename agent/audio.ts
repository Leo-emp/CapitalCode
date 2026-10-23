// ============================================================
// AUDIO HELPERS — ffmpeg/ffprobe wrappers. Every call checks the
// exit code and throws with ffmpeg's own message (never silent).
// ============================================================
import { spawnSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

export const ff = (args: string[], what = 'ffmpeg'): string => {
  const p = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-y', ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  if (p.status !== 0) throw new Error(`${what} failed: ${(p.stderr || '').split('\n').slice(-6).join(' | ')}`)
  return p.stderr
}

export const duration = (file: string): number => {
  const p = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' })
  const d = Number(p.stdout.trim())
  if (!Number.isFinite(d)) throw new Error(`ffprobe could not read duration of ${file}`)
  return d
}

// # Integrated loudness (LUFS) and true peak (dBTP) via ebur128
export const loudness = (file: string): { lufs: number; peak: number } => {
  const p = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', file, '-af', 'ebur128=peak=true', '-f', 'null', '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  const i = [...p.stderr.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1)
  const tp = [...p.stderr.matchAll(/Peak:\s+(-?[\d.]+) dBFS/g)].at(-1)
  if (!i) throw new Error(`could not measure loudness of ${file}`)
  return { lufs: Number(i[1]), peak: tp ? Number(tp[1]) : 0 }
}
export const lufs = (file: string) => loudness(file).lufs

// # Test helper: a sine tone of given length and level
export const tone = async (out: string, seconds: number, dbfs: number) => {
  ff(['-f', 'lavfi', '-i', `sine=f=220:d=${seconds.toFixed(3)}`, '-af', `volume=${dbfs}dB`, '-ar', '24000', '-ac', '1', out], 'tone')
}

// # Join wav files with silence gaps → one wav (24 kHz mono)
export const concatWavs = (files: string[], gap: number, out: string) => {
  const inputs = files.flatMap((f) => ['-i', f])
  const parts: string[] = []
  files.forEach((_, i) => {
    parts.push(`[${i}:a]aresample=24000,aformat=channel_layouts=mono[a${i}]`)
  })
  const chain = files.map((_, i) => (i < files.length - 1 && gap > 0 ? `[a${i}]apad=pad_dur=${gap}[p${i}]` : `[a${i}]anull[p${i}]`))
  const concat = `${files.map((_, i) => `[p${i}]`).join('')}concat=n=${files.length}:v=0:a=1[out]`
  ff([...inputs, '-filter_complex', [...parts, ...chain, concat].join(';'), '-map', '[out]', '-ar', '24000', '-ac', '1', out], 'concat')
}

// # Bring a file to target LUFS with a limiter (measure → gain → limit → re-measure)
export const normalize = (input: string, out: string, target = -14, extraFilter = '') => {
  let gain = 0
  let level = lufs(input)
  for (let k = 0; k < 4; k++) {
    gain += target - level
    const chain = [extraFilter, `volume=${gain.toFixed(2)}dB`, 'alimiter=limit=0.89:level=false'].filter(Boolean).join(',')
    ff(['-i', input, '-af', chain, '-ar', '48000', out], 'normalize')
    level = lufs(out)
    if (Math.abs(level - target) <= 0.5) break
  }
  return level
}

export const writeText = (file: string, text: string) => writeFileSync(file, text)
