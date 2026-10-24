// # Every diorama piece of the index-fund film renders at its start, middle and end with the real voice timings,
// # and every cue it animates or sounds on is a spoken word (so a long render can never crash mid-way on a piece)
import React from 'react'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { cueMap, reader } from '../../art/diorama/cues'
import { PIECES } from '../../art/diorama/registry'
import '../../art/diorama/pieces'

const words = JSON.parse(readFileSync('tests/fixtures/indexfund/words.json', 'utf8'))
const cues = cueMap(words, 30)

test('the film has its 24 pieces', () => {
  expect(PIECES.length).toBeGreaterThanOrEqual(24)
})

test('every beat and sound cue of every piece is spoken', () => {
  for (const p of PIECES) for (const k of [...p.beats, ...p.sfx.map((x) => x[0])]) expect(cues[k], `${p.id}: ${k}`).toBeDefined()
})

test('every piece renders across its whole span', () => {
  for (const p of PIECES) {
    const fr = p.beats.map((k) => cues[k])
    const a = Math.min(...fr) - 20, b = Math.max(...fr) + 60
    for (const f of [a, Math.round((a + b) / 2), b, b + 90]) {
      const html = renderToStaticMarkup(<svg><p.Component f={f} c={reader(cues, p.id)} from={a} to={b} /></svg>)
      expect(html.length, `${p.id} @${f}`).toBeGreaterThan(200)
      expect(html, `${p.id} @${f}`).not.toMatch(/NaN|undefined|Infinity/)
    }
  }
}, 120_000)
