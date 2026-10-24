// # Vignettes: animated mini-scenes that SHOW what the voice says (owner review 2026-10-24)
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { getVignette, VIGNETTES } from '../../art/vignettes/registry'
import { SAMPLES } from '../../art/vignettes/samples'


test('there is a sample for every vignette and every vignette has one', () => {
  expect(Object.keys(SAMPLES).sort()).toEqual(VIGNETTES.map((v) => v.id).sort())
})

test('every vignette renders before, during and after its build', () => {
  for (const v of VIGNETTES) {
    const data = SAMPLES[v.id]
    expect(v.check(data), v.id).toBeNull()
    const n = v.items(data)
    const cues = Array.from({ length: n }, (_, i) => 10 + i * 15)
    for (const f of [0, 20, 200]) expect(() => renderToStaticMarkup(<svg>{React.createElement(v.Component, { frame: f, data, cues })}</svg>), v.id).not.toThrow()
  }
})

test('bad data is refused with a reason', () => {
  expect(getVignette('money-flow').check({ groups: [] })).toMatch(/groups/)
  expect(getVignette('leaderboard').check({ before: ['a', 'b'], after: [] })).toMatch(/after/)
  expect(getVignette('lottery').check({ tickets: 10, winners: 20 })).toMatch(/winners/)
  expect(getVignette('pie').check({ slices: [{ label: 'x' }, { label: 'y', value: 1 }] })).toMatch(/value/)
  expect(() => getVignette('nope')).toThrow(/unknown vignette/)
})

test('vignette text is phone-readable (no font below 28 px)', async () => {
  const { readFileSync, readdirSync } = await import('node:fs')
  const dir = 'art/vignettes'
  const small = readdirSync(dir).filter((f) => f.endsWith('.tsx')).flatMap((f) =>
    [...readFileSync(`${dir}/${f}`, 'utf8').matchAll(/fontSize[:=]\s*\{?\s*(\d+)|font: '[^']*?(\d+)px/g)]
      .filter((m) => Number(m[1] ?? m[2]) < 28).map((m) => `${f}: ${m[0]}`))
  expect(small).toEqual([])
})

test('leaderboard takes 10 rows and marks the names that survive', () => {
  const v = getVignette('leaderboard')
  expect(v.check(SAMPLES.leaderboard)).toBeNull()
  const html = renderToStaticMarkup(<svg>{React.createElement(v.Component, { frame: 300, data: SAMPLES.leaderboard, cues: [0, 100] })}</svg>)
  expect(html).toMatch(/data-survivor="Microsoft"/)
})

test('loop nodes sit on a wide oval, clear of the centre label', async () => {
  const { loopPoint } = await import('../../art/vignettes/story')
  for (let i = 0; i < 4; i++) {
    const p = loopPoint(i, 4)
    const dx = Math.abs(p.x - 960), dy = Math.abs(p.y - 580)
    // # side nodes far enough out for a 440 px pill + a 360 px centre label; top/bottom clear vertically
    expect(dx > 400 || dy > 220, `node ${i}`).toBe(true)
  }
})

test('leaderboard shows which ranking is on screen (e.g. 2000 → 2026)', () => {
  const v = getVignette('leaderboard')
  const data = { ...SAMPLES.leaderboard, fromLabel: '2000', toLabel: '2026' }
  const at = (f: number) => renderToStaticMarkup(<svg>{React.createElement(v.Component, { frame: f, data, cues: [0, 100] })}</svg>)
  expect(at(50)).toContain('>2000<')
  expect(at(300)).toContain('>2026<')
})

// ------------------------------------------------------------ living film: crowds, grids, circles
test('crowd: up to 60 people on pedestals, all inside the frame', async () => {
  const { crowdLayout } = await import('../../art/vignettes/layouts')
  for (const n of [1, 5, 12, 30, 60]) {
    const spots = crowdLayout(n)
    expect(spots.length).toBe(n)
    for (const s of spots) {
      expect(s.x - 60 * s.scale).toBeGreaterThanOrEqual(120); expect(s.x + 60 * s.scale).toBeLessThanOrEqual(1800)
      expect(s.y - 200 * s.scale).toBeGreaterThanOrEqual(200); expect(s.y + 20 * s.scale).toBeLessThanOrEqual(980)
    }
  }
  expect(getVignette('crowd').check({ people: Array.from({ length: 61 }, () => ({ look: 'hero', share: 1 })) })).toMatch(/60/)
  expect(getVignette('crowd').check({ people: [{ look: 'ghost', share: 1 }] })).toMatch(/ghost/)
})

test('grid takes 4–6 panels, circles 3–5', () => {
  const panel = { prop: 'coin', label: 'A' }
  expect(getVignette('grid').check({ panels: Array(3).fill(panel) })).toMatch(/4–6/)
  expect(getVignette('grid').check({ panels: Array(7).fill(panel) })).toMatch(/4–6/)
  expect(getVignette('grid').check({ panels: Array(4).fill(panel) })).toBeNull()
  expect(getVignette('grid').check({ panels: [...Array(3).fill(panel), { prop: 'nope', label: 'x' }] })).toMatch(/nope/)
  expect(getVignette('circles').check({ items: Array(2).fill(panel) })).toMatch(/3–5/)
  expect(getVignette('circles').check({ items: Array(5).fill(panel) })).toBeNull()
})

test('the mini cast: small people in the cast looks, alive (they blink and breathe)', async () => {
  const { Mini } = await import('../../art/rig/Mini')
  const at = (f: number) => renderToStaticMarkup(<svg><Mini look="hero" x={500} y={800} scale={1} frame={f} seed={3} /></svg>)
  expect(at(10)).toContain('#2B8FE0') // # hero blazer blue
  expect(new Set(Array.from({ length: 60 }, (_, f) => at(f))).size).toBeGreaterThan(5)
})
