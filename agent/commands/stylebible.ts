// # CLI: stylebible — rebuild output/style-bible (v2, living film): archive the old pages, render the
// # static sheets and the living pages (Episode still strips tiled into one page each)
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { register } from '../cli'
import { ROOT } from '../paths'
import { renderStills } from '../render'
import { result } from '../result'
import { archiveName, LIVING_PAGES, STATIC_PAGES } from '../stylebible'

register('stylebible', 'stylebible  — rebuild the style bible pages (old ones → output/style-bible/archive/)', async () => {
  const out = join(ROOT, 'output', 'style-bible')
  mkdirSync(out, { recursive: true })
  // # 1. archive the current pages (never delete them: the owner compares old and new)
  const old = readdirSync(out).filter((f) => /^page_.*\.png$/.test(f))
  let arch = join(out, archiveName(new Date().toISOString().slice(0, 10)))
  for (let n = 2; existsSync(arch); n++) arch = join(out, `${archiveName(new Date().toISOString().slice(0, 10))}-${n}`)
  if (old.length) { mkdirSync(arch, { recursive: true }); for (const f of old) renameSync(join(out, f), join(arch, f)) }
  const tmp = join(ROOT, 'temp', 'stylebible')
  rmSync(tmp, { recursive: true, force: true })
  // # 2. static sheets: one still each
  for (const p of STATIC_PAGES) {
    const [file] = await renderStills(p.composition, {}, [0], join(tmp, p.name))
    renameSync(file, join(out, `${p.name}.png`))
  }
  // # 3. living pages: a tiny timeline per page, its frames tiled cols × rows
  for (const p of LIVING_PAGES) {
    const end = Math.max(...p.shots.map((s) => s.to))
    const tl = { fps: 30, durationInFrames: end, shots: p.shots, sfx: [], speech: p.speech ?? [] }
    const files = await renderStills('Episode', { timeline: tl }, p.frames, join(tmp, p.name))
    const inputs = files.flatMap((f) => ['-i', f])
    const filter = `${files.map((_, i) => `[${i}:v]scale=${Math.round(1920 / p.cols)}:-2[v${i}]`).join(';')};${files.map((_, i) => `[v${i}]`).join('')}xstack=inputs=${files.length}:layout=${files.map((_, i) => `${(i % p.cols) === 0 ? '0' : Array.from({ length: i % p.cols }, () => 'w0').join('+')}_${Math.floor(i / p.cols) === 0 ? '0' : Array.from({ length: Math.floor(i / p.cols) }, () => 'h0').join('+')}`).join('|')}:fill=black`
    const r = spawnSync('ffmpeg', ['-v', 'error', '-y', ...inputs, '-filter_complex', filter, '-frames:v', '1', join(out, `${p.name}.png`)], { encoding: 'utf8' })
    if (r.status !== 0) throw new Error(`stylebible: tiling ${p.name} failed: ${r.stderr}`)
  }
  result({ ok: true, pages: STATIC_PAGES.length + LIVING_PAGES.length, archived: old.length ? arch : null, dir: out })
})
