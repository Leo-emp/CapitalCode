// # Shorts: pick the strongest 30–58 s moments of a long video, slice its timeline, word-by-word captions
import { expect, test } from 'vitest'
import { captionChunks, pickClips, sliceTimeline, type SentenceInfo } from '../../agent/shorts'

// # 40 sentences × 5 s = 200 s; a few hooks (numbers / questions / contrasts) and two vignettes
const sents: SentenceInfo[] = Array.from({ length: 40 }, (_, i) => ({
  id: `s${i + 1}`, s: i * 5, e: i * 5 + 4.6,
  text: i === 4 ? 'Why do 10 companies own 38 percent?' : i === 20 ? 'But the price is the real risk.' : `Plain sentence ${i + 1} about money.`,
  chapter: Math.floor(i / 10), stress: i === 6 || i === 22, visual: i % 2 === 0 ? 'vignette' : 'scene',
}))

test('clips are 30–58 s, never overlap, and start on a hook sentence', () => {
  const clips = pickClips(sents, { n: 3 })
  expect(clips.length).toBe(3)
  for (const c of clips) {
    expect(c.t1 - c.t0).toBeGreaterThanOrEqual(30)
    expect(c.t1 - c.t0).toBeLessThanOrEqual(58)
  }
  const sorted = [...clips].sort((a, b) => a.t0 - b.t0)
  for (let i = 1; i < sorted.length; i++) expect(sorted[i].t0).toBeGreaterThanOrEqual(sorted[i - 1].t1)
  // # the best clip opens on the strongest hook (number + question)
  expect(clips[0].first).toBe('s5')
})

test('a clip starts at its first sentence and ends at a sentence end', () => {
  const [c] = pickClips(sents, { n: 1 })
  const first = sents.find((s) => s.id === c.first)!, last = sents.find((s) => s.id === c.last)!
  expect(c.t0).toBe(first.s)
  expect(c.t1).toBeCloseTo(last.e + 0.4, 5) // # a short breath after the last word
})

test('sliceTimeline shifts shots, cues and sfx into the clip and trims the rest', () => {
  const tl = { fps: 30, durationInFrames: 600, sfx: [{ name: 'ding', t: 9, volume: 1 }, { name: 'pop', t: 1, volume: 1 }], shots: [
    { from: 0, to: 240, shot: { id: 'a', kind: 'scene', start: 0, props: [{ id: 'coin', anchor: 'prop1', at: 200 }], actors: [{ who: 'hero', anchor: 'stand', track: [{ at: 0, pose: 'idle' }, { at: 230, pose: 'point' }] }] } },
    { from: 240, to: 600, shot: { id: 'b', kind: 'slide', start: 240, slide: 'bars', at: [250, 400] } },
  ] } as any
  const out = sliceTimeline(tl, 6, 12) as any // # frames 180–360
  expect(out.durationInFrames).toBe(180)
  expect(out.shots.map((s: any) => [s.shot.id, s.from, s.to])).toEqual([['a', 0, 60], ['b', 60, 180]])
  expect(out.shots[0].shot.props[0].at).toBe(20)
  expect(out.shots[0].shot.actors[0].track.map((k: any) => k.at)).toEqual([-180, 50])
  expect(out.shots[1].shot.at).toEqual([70, 220])
  expect(out.sfx).toEqual([{ name: 'ding', t: 3, volume: 1 }])
})

test('captions come in short word groups with the speaking word marked', () => {
  const toks = [
    { text: 'Your', s: 10, e: 10.3 }, { text: 'index', s: 10.3, e: 10.7 }, { text: 'fund', s: 10.7, e: 11 },
    { text: 'is', s: 11, e: 11.2 }, { text: 'less', s: 11.2, e: 11.5 }, { text: 'diversified', s: 11.5, e: 12.3 },
  ]
  const chunks = captionChunks(toks, 10)
  expect(chunks.map((c) => c.words.map((w) => w.text).join(' '))).toEqual(['Your index fund', 'is less', 'diversified'])
  expect(chunks[0].s).toBeCloseTo(0, 5)
  expect(chunks.every((c) => c.words.map((w) => w.text).join(' ').length <= 18)).toBe(true)
})

test('the hook line is the opening sentence, cut to fit the big headline', async () => {
  const { hookFor } = await import('../../agent/shorts')
  expect(hookFor('Why do 10 companies own 38 percent?')).toBe('Why do 10 companies own 38 percent?')
  const long = hookFor('So the fund that was sold to you as the safe, spread-out choice is quietly one of the most concentrated bets ever.')
  expect(long.length).toBeLessThanOrEqual(42)
  expect(long.endsWith('…')).toBe(true)
})
