// # Tests for the code-generated SFX set (scripts/make-sfx.sh → public/sfx/cc/)
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'vitest'

const DIR = join(import.meta.dirname, '..', '..', 'public', 'sfx', 'cc')
const SFX_NAMES = ['whoosh', 'swish', 'tick', 'pop', 'impact', 'riser', 'cash', 'glitch', 'thud', 'ding']

// # ffprobe duration (s) and ffmpeg volumedetect peak (dBFS, read from stderr)
const duration = (f: string) =>
  Number(spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }).stdout.trim())
const peak = (f: string) => {
  const err = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', f, '-af', 'volumedetect', '-f', 'null', '-'], { encoding: 'utf8' }).stderr
  const m = /max_volume:\s*(-?[\d.]+) dB/.exec(err)
  return m ? Number(m[1]) : NaN
}

test('all 10 sound effects exist and are 0.03–3 s long', () => {
  for (const n of SFX_NAMES) {
    const f = join(DIR, `${n}.wav`)
    expect(existsSync(f), n).toBe(true)
    const d = duration(f)
    expect(d, n).toBeGreaterThanOrEqual(0.03)
    expect(d, n).toBeLessThanOrEqual(3)
  }
}, 120_000)

test('no sound effect peaks above -1 dBFS', () => {
  for (const n of SFX_NAMES) expect(peak(join(DIR, `${n}.wav`)), n).toBeLessThanOrEqual(-1)
}, 120_000)
