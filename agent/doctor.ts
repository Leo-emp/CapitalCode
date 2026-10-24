// ============================================================
// DOCTOR — every precondition of a run, checked in seconds before
// anything slow or paid starts: secrets, tools, fonts, sound
// effects, disk space, Node version. Each failure names its fix.
// Secrets are only checked for presence, never printed.
// ============================================================
import { spawnSync } from 'node:child_process'
import { existsSync, statfsSync } from 'node:fs'
import { join } from 'node:path'
import { FONT_FILES } from '../art/fonts'
import { readEnv } from './azure'
import { PUBLIC_DIR, ROOT } from './paths'

export const SFX_NAMES = ['cash', 'ding', 'glitch', 'impact', 'pop', 'riser', 'swish', 'thud', 'tick', 'whoosh']
// # a long render keeps ~22 chunks + preflight stills + mixes on disk (~3 GB); keep headroom
export const MIN_FREE_GB = 10

export type Deps = { env: Record<string, string | undefined>; has: (file: string) => boolean; tool: (name: string) => boolean; freeGB: () => number; nodeMajor: number }
export type Check = { name: string; ok: boolean; fix?: string }

export const doctor = (d: Deps) => {
  const checks: Check[] = []
  const add = (name: string, ok: boolean, fix: string) => checks.push(ok ? { name, ok } : { name, ok, fix })

  add('azure key', !!d.env.AZURE_SPEECH_KEY, 'add AZURE_SPEECH_KEY to capitalcode/.env.local')
  add('azure region', !!d.env.AZURE_SPEECH_REGION, 'add AZURE_SPEECH_REGION to capitalcode/.env.local')
  for (const t of ['ffmpeg', 'ffprobe']) add(t, d.tool(t), `install ${t} and put it on PATH (winget install Gyan.FFmpeg)`)
  const fonts = FONT_FILES.filter((f) => !d.has(join(PUBLIC_DIR, f.file))).map((f) => f.file)
  add('fonts', fonts.length === 0, `missing in public/: ${fonts.join(', ')}`)
  const sfx = SFX_NAMES.filter((n) => !d.has(join(PUBLIC_DIR, 'sfx', 'cc', `${n}.wav`)))
  add('sound effects', sfx.length === 0, `missing public/sfx/cc/: ${sfx.join(', ')}`)
  const gb = d.freeGB()
  add('disk space', gb >= MIN_FREE_GB, `only ${gb.toFixed(1)} GB free; free ${MIN_FREE_GB} GB (old temp/jobs/*/render folders can go)`)
  add('node', d.nodeMajor >= 20, `Node ${d.nodeMajor} is too old; install Node 20+`)

  return { ok: checks.every((c) => c.ok), checks }
}

// # The real machine
export const realDeps = (): Deps => ({
  env: { ...readEnv(), ...process.env },
  has: existsSync,
  tool: (name) => spawnSync(name, ['-version'], { stdio: 'ignore' }).status === 0,
  freeGB: () => { const s = statfsSync(ROOT); return (s.bavail * s.bsize) / 1e9 },
  nodeMajor: Number(process.versions.node.split('.')[0]),
})
