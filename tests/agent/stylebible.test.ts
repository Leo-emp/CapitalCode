// # Style bible v2 (living film spec §10): the old pages are archived, new pages show the worlds,
// # the animated cast, the camera, metaphors and crowds — every page made from real engine parts
import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'
import { archiveName, LIVING_PAGES, STATIC_PAGES } from '../../agent/stylebible'
import { getScene } from '../../art/scenes/registry'
import { getVignette } from '../../art/vignettes/registry'

test('the command is registered', async () => {
  const { COMMANDS } = await import('../../agent/cli')
  await import('../../agent/commands/stylebible')
  expect(COMMANDS.stylebible).toBeDefined()
})

test('static pages are real compositions', () => {
  const comps = readFileSync('art/compositions.tsx', 'utf8')
  for (const p of STATIC_PAGES) expect(comps, p.composition).toContain(`Composition id="${p.composition}"`)
})

test('living pages cover the spec: worlds, walk, gestures, hand-over, expressions, camera, zoom-into, metaphors, crowds, kinetic text', () => {
  const names = LIVING_PAGES.map((p) => p.name)
  for (const n of ['Worlds', 'Walk', 'Gestures', 'HandOver', 'Expressions', 'Camera', 'ZoomInto', 'Metaphors', 'Crowds', 'Kinetic']) expect(names.some((x) => x.includes(n)), n).toBe(true)
})

test('every living page uses real scenes, anchors and vignettes, and frames inside its timeline', () => {
  for (const p of LIVING_PAGES) {
    const end = Math.max(...p.shots.map((s) => s.to))
    for (const f of p.frames) { expect(f, p.name).toBeGreaterThanOrEqual(0); expect(f, p.name).toBeLessThan(end) }
    for (const { shot } of p.shots as { shot: any }[]) {
      if (shot.kind === 'scene') {
        const a = getScene(shot.scene).anchors
        for (const x of shot.actors ?? []) { expect(a[x.anchor], `${p.name} ${x.anchor}`).toBeDefined(); for (const l of x.path ?? []) expect(a[l.to], `${p.name} ${l.to}`).toBeDefined() }
        for (const c of shot.camera ?? []) if (typeof c.to === 'string') expect(a[c.to], `${p.name} ${c.to}`).toBeDefined()
      }
      if (shot.kind === 'vignette') expect(getVignette(shot.vignette).check(shot.data), p.name).toBeNull()
    }
  }
})

test('old pages go to a dated archive folder', () => {
  expect(archiveName('2026-10-24')).toBe('archive/v1-2026-10-24')
})
