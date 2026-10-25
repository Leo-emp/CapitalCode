// # Shorts made from scratch (spec 2026-10-25-capitalcode-shorts): a tall 1080×1920 canvas, diorama pieces
// # drawn for a phone, word-by-word captions, 2–3 minutes
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { PACE } from '../../agent/commands/plan'
import { SHORT_WORDS } from '../../agent/commands/script'
import { gatePlan } from '../../agent/gates/plan'
import { gateScript } from '../../agent/gates/script'
import type { PlanDoc, ScriptDoc, TimedWord } from '../../agent/schema'
import { buildTimeline } from '../../agent/timeline'
import { captionAt } from '../../art/episode/Captions'
import { makePiece, registerPiece } from '../../art/diorama/registry'

const words: TimedWord[] = []
for (let i = 1; i <= 6; i++) for (let j = 1; j <= 10; j++) {
  const t = (i - 1) * 4 + (j - 1) * 0.4
  words.push({ w: `s${i}w${j}`, s: +t.toFixed(2), e: +(t + 0.35).toFixed(2), sid: `s${i}` })
}
const DUR = 24.5
const beats = Array.from({ length: 6 }, (_, k) => Array.from({ length: 10 }, (_, j) => `s${k + 1}:s${k + 1}w${j + 1}`)).flat()
registerPiece(makePiece('test-tall', 'Tall', { canvas: 'tall', beats, sfx: [], Component: () => <rect width={1080} height={1920} /> }))
registerPiece(makePiece('test-wide', 'Wide', { beats, sfx: [], Component: () => <rect width={1920} height={1080} /> }))
const plan = (piece = 'test-tall', canvas: 'tall' | 'wide' | 'none' = 'tall'): PlanDoc => ({ ...(canvas === 'none' ? {} : { canvas }), shots: [{ id: 'a', kind: 'piece', start: { sentence: 's1' }, piece }] as any })

test('a Short plan: tall canvas and tall pieces pass', () => {
  expect(gatePlan(plan(), words, { duration: DUR, history: [], ...PACE.short }).problems).toEqual([])
})

test('a Short refuses a wide plan, a wide piece and anything that is not a piece', () => {
  expect(gatePlan(plan('test-tall', 'none'), words, { duration: DUR, history: [], ...PACE.short }).problems).toContain('plan.canvas must be "tall"')
  expect(gatePlan(plan('test-wide'), words, { duration: DUR, history: [], ...PACE.short }).problems).toContain('a: piece test-wide is drawn for a wide canvas, this video is tall')
  const p = plan()
  p.shots.push({ id: 'b', kind: 'brand', start: { sentence: 's5' } } as any)
  expect(gatePlan(p, words, { duration: DUR, history: [], ...PACE.short }).problems).toContain('b: a Short uses diorama pieces only (got "brand")')
})

test('a long video still refuses a tall piece', () => {
  expect(gatePlan(plan('test-tall', 'none'), words, { duration: DUR, history: [], ...PACE.long }).problems).toContain('a: piece test-tall is drawn for a tall canvas, this video is wide')
})

test('the timeline of a Short is tall and carries its captions; the Episode draws it 1080×1920 with captions', async () => {
  const caps = [{ s: 0, e: 0.75, words: [{ text: 'Ten', s: 0, e: 0.35 }, { text: 'companies', s: 0.4, e: 0.75 }] }]
  const tl = buildTimeline(plan(), words, DUR, undefined, caps)
  expect(tl.canvas).toBe('tall')
  expect(tl.captions).toEqual(caps)
  expect(buildTimeline(plan('test-wide', 'none'), words, DUR).canvas).toBeUndefined()
  const { Episode } = await import('../../art/episode/Episode')
  expect(captionAt(caps, 0.5)).toEqual({ card: caps[0], word: 1 })
  const { EpisodeFrame } = await import('../../art/episode/Episode')
  const html = renderToStaticMarkup(<EpisodeFrame timeline={tl as any} f={10} />)
  expect(html).toContain('viewBox="0 0 1080 1920"')
  expect(Episode).toBeDefined()
})

test('a Short script is 360–530 words (2:00–2:58 at ~182 words/min)', () => {
  expect(SHORT_WORDS).toEqual([360, 530])
  const script: ScriptDoc = { title: 't', area: 'investing', format: 'explainer', thesis: 'ten companies carry most of your index fund', chapters: [{ title: 'c', sentences: [{ id: 's1', text: 'Why does this matter so much to you?' }] }] }
  const r = gateScript(script, { facts: [] }, { sources: [], minWords: 360, maxWords: 530, label: 'a 2–3 min Short' })
  expect(r.problems).toContain('script has 8 words; needs 360–530 for a 2–3 min Short')
})
