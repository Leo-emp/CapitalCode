// # Diorama engine (spec 2026-10-25): a "piece" shot is a choreographed illustration that animates on named cue
// # words ("s3:38"), declares its own sound effects, and counts every beat as a shown event
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { gatePlan } from '../../agent/gates/plan'
import { PACE } from '../../agent/commands/plan'
import { buildTimeline } from '../../agent/timeline'
import type { PlanDoc, TimedWord } from '../../agent/schema'
import { cueMap } from '../../art/diorama/cues'
import { makePiece, registerPiece } from '../../art/diorama/registry'

// # 15 sentences × 10 words × 0.4 s; word 5 of each is "money"
const words: TimedWord[] = []
for (let i = 1; i <= 15; i++) for (let j = 1; j <= 10; j++) {
  const t = (i - 1) * 4 + (j - 1) * 0.4
  words.push({ w: j === 5 ? 'Money,' : `s${i}w${j}`, s: +t.toFixed(2), e: +(t + 0.35).toFixed(2), sid: `s${i}` })
}
words.push({ w: 'money', s: 59.7, e: 59.9, sid: 's15' })
const DUR = 60.5

// # a test piece: a beat on the start and on "money" (and word 8) of every sentence it covers
const beatsFor = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, k) => [`s${from + k}`, `s${from + k}:money`, `s${from + k}:s${from + k}w8`]).flat()
registerPiece(makePiece('test-a', 'Test A', { beats: beatsFor(1, 8), sfx: [['s1:money', 'coin'], ['s2', 'whoosh', 0.5]], Component: ({ f, c }) => <circle r={f >= c('s1:money') ? 10 : 0} /> }))
registerPiece(makePiece('test-b', 'Test B', { beats: beatsFor(9, 15), sfx: [], Component: () => <rect width={10} height={10} /> }))

test('cueMap: sentence start, first spoken word (normalised), and the nth repeat', () => {
  const m = cueMap(words, 30)
  expect(m.s3).toBe(Math.round(8 * 30))
  expect(m['s3:money']).toBe(Math.round(9.6 * 30))
  expect(m['s15:money#2']).toBe(Math.round(59.7 * 30))
  expect(m['s3:nothing']).toBeUndefined()
})

const plan = (): PlanDoc => ({ shots: [{ id: 'a', kind: 'piece', start: { sentence: 's1' }, piece: 'test-a' }, { id: 'b', kind: 'piece', start: { sentence: 's9' }, piece: 'test-b' }] as any })

test('the timeline carries the cue map and each piece adds its sound effects', () => {
  const tl = buildTimeline(plan(), words, DUR)
  expect(tl.cues!['s1:money']).toBe(48)
  expect(tl.sfx).toEqual(expect.arrayContaining([{ name: 'coin', t: 1.6, volume: 1 }, { name: 'whoosh', t: 4, volume: 0.5 }]))
})

test('a plan made of pieces passes the living-film density rules (every beat is a shown event)', () => {
  const r = gatePlan(plan(), words, { duration: DUR, history: [], ...PACE.long })
  expect(r.problems).toEqual([])
})

test('unknown pieces and beats on words that are never spoken are refused by name', () => {
  const p = plan()
  ;(p.shots[1] as any).piece = 'nope'
  expect(gatePlan(p, words, { duration: DUR, history: [], ...PACE.long }).problems).toContain('b: unknown piece "nope"')
  registerPiece(makePiece('test-bad', 'Bad', { beats: ['s2:banana'], sfx: [['s2:pear', 'pop']], Component: () => null }))
  ;(p.shots[1] as any).piece = 'test-bad'
  const probs = gatePlan(p, words, { duration: DUR, history: [], ...PACE.long }).problems
  expect(probs).toContain('b: piece test-bad: cue "s2:banana" is not spoken')
  expect(probs).toContain('b: piece test-bad: cue "s2:pear" is not spoken')
})

test('Episode draws a piece shot with the cue map', async () => {
  const { EpisodeFrame } = await import('../../art/episode/Episode')
  const tl = buildTimeline(plan(), words, DUR)
  const html = renderToStaticMarkup(<EpisodeFrame timeline={tl as any} f={60} />)
  expect(html).toContain('<circle r="10"')
})
