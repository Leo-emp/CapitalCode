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
