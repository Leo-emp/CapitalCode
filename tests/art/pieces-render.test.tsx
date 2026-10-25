// # Every diorama piece of the index-fund film renders at its start, middle and end with the real voice timings,
// # and every cue it animates or sounds on is a spoken word (so a long render can never crash mid-way on a piece)
import React from 'react'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { cueMap, reader } from '../../art/diorama/cues'
import { PIECES } from '../../art/diorama/registry'
import '../../art/diorama/pieces'

const cuesOf = (file: string) => cueMap(JSON.parse(readFileSync(file, 'utf8')), 30)
// # each film's pieces with the real voice timings of that film (long video: wide; Shorts: tall, by id prefix)
const FILMS = [
  { name: 'index fund (long)', cues: cuesOf('tests/fixtures/indexfund/words.json'), pieces: PIECES.filter((p) => (p.canvas ?? 'wide') === 'wide') },
  { name: 'where your $100 goes (Short)', cues: cuesOf('tests/fixtures/where100/words.json'), pieces: PIECES.filter((p) => p.id.startsWith('w100-')) },
  { name: 'the giants of 2000 (Short)', cues: cuesOf('tests/fixtures/giants2000/words.json'), pieces: PIECES.filter((p) => p.id.startsWith('g2k-')) },
]

test('the long film has its 24 pieces and the first Short its 7, all tall', () => {
  expect(FILMS[0].pieces.length).toBeGreaterThanOrEqual(24)
  expect(FILMS[1].pieces.length).toBe(7)
  expect(FILMS[2].pieces.length).toBe(7)
  for (const film of FILMS.slice(1)) expect(film.pieces.every((p) => p.canvas === 'tall')).toBe(true)
})

test.each(FILMS)('$name: every beat and sound cue of every piece is spoken', ({ cues, pieces }) => {
  for (const p of pieces) for (const k of [...p.beats, ...p.sfx.map((x) => x[0])]) expect(cues[k], `${p.id}: ${k}`).toBeDefined()
})

test.each(FILMS)('$name: every piece renders across its whole span', ({ cues, pieces }) => {
  for (const p of pieces) {
    const fr = p.beats.map((k) => cues[k])
    const a = Math.min(...fr) - 20, b = Math.max(...fr) + 60
    for (const f of [a, Math.round((a + b) / 2), b, b + 90]) {
      const html = renderToStaticMarkup(<svg><p.Component f={f} c={reader(cues, p.id)} from={a} to={b} /></svg>)
      expect(html.length, `${p.id} @${f}`).toBeGreaterThan(200)
      expect(html, `${p.id} @${f}`).not.toMatch(/NaN|undefined|Infinity/)
    }
  }
}, 120_000)
