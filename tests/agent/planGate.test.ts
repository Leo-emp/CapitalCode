// # Plan gate + timeline: every cue resolves, ids exist, coverage, pace, slide share, variety
import { describe, expect, test } from 'vitest'
import { gatePlan, type History } from '../../agent/gates/plan'
import { buildTimeline, resolveCue } from '../../agent/timeline'
import type { PlanDoc, TimedWord } from '../../agent/schema'

// # 15 sentences × 10 words × 0.4 s = 60 s of voice; words are "s<i>w<j>", plus a real word per sentence
const words: TimedWord[] = []
for (let i = 1; i <= 15; i++) for (let j = 1; j <= 10; j++) {
  const t = (i - 1) * 4 + (j - 1) * 0.4
  words.push({ w: j === 5 ? 'money' : `s${i}w${j}`, s: +t.toFixed(2), e: +(t + 0.35).toFixed(2), sid: `s${i}` })
}
const DUR = 60.5

const scene = (id: string, at: number, sceneId: string) => ({
  id, kind: 'scene' as const, start: { sentence: `s${at}` }, scene: sceneId,
  actors: [{ who: 'hero', anchor: 'stand', track: [{ at: { sentence: `s${at}` }, pose: 'idle' }, { at: { sentence: `s${at}`, word: 'money' }, pose: 'point', expression: 'shocked' }] }],
  props: [{ id: 'cash-stack', anchor: 'prop1', at: { sentence: `s${at}`, word: 'money' } }],
})
const slide = (id: string, at: number) => ({
  id, kind: 'slide' as const, start: { sentence: `s${at}` }, slide: 'bars', heading: 'H',
  data: { bars: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }] }, at: [{ sentence: `s${at}`, word: 'money' }],
})
// # shots every 2 sentences (8 s): scene/slide alternate → 50% slides, median 8 s
const good = (): PlanDoc => ({
  shots: [
    scene('a', 1, 'shop-street'), slide('b', 3), scene('c', 5, 'bank-interior'), slide('d', 7),
    scene('e', 9, 'vault-room'), slide('f', 11), scene('g', 13, 'mansion'),
  ],
  sfx: [{ at: { sentence: 's3' }, name: 'whoosh' }],
})
const opts = (history: History = []) => ({ duration: DUR, history })

describe('gatePlan', () => {
  test('a good plan passes with its stats', () => {
    const r = gatePlan(good(), words, opts())
    expect(r.problems).toEqual([])
    expect(r.ok).toBe(true)
    expect(r.stats!.slideShare).toBeGreaterThan(0.35)
    expect(r.stats!.medianShot).toBeCloseTo(8, 0)
  })

  test('an unresolved cue is refused with the nearest words of that sentence', () => {
    const p = good()
    ;(p.shots[0] as any).props[0].at.word = 'mony'
    const r = gatePlan(p, words, opts())
    expect(r.ok).toBe(false)
    expect(r.problems.join('\n')).toMatch(/mony.*money/)
  })

  test('unknown scene, anchor, actor, pose, prop, slide kind and sfx are all caught', () => {
    const p = good()
    ;(p.shots[0] as any).scene = 'moon-base'
    ;(p.shots[2] as any).actors[0].anchor = 'roof'
    ;(p.shots[2] as any).actors[0].who = 'alien'
    ;(p.shots[4] as any).actors[0].track[1].pose = 'dab'
    ;(p.shots[4] as any).props[0].id = 'ufo'
    ;(p.shots[1] as any).slide = 'pie'
    p.sfx![0].name = 'airhorn'
    const out = gatePlan(p, words, opts()).problems.join('\n')
    for (const w of ['moon-base', 'roof', 'alien', 'dab', 'ufo', 'pie', 'airhorn']) expect(out).toContain(w)
  })

  test('slide data is checked per kind (bars need label+value)', () => {
    const p = good()
    ;(p.shots[1] as any).data = { bars: [{ label: 'A' }] }
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/b: bars/)
  })

  test('a slide icon must be a known prop', () => {
    const p = good()
    ;(p.shots[1] as any).data.icon = 'ufo-icon'
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/b: unknown icon prop "ufo-icon"/)
  })

  test('an actor the camera framing crops out is refused', () => {
    const p = good()
    ;(p.shots[4] as any).framing = 'close'
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/e: actor hero at "stand" is out of frame with close framing/)
    ;(p.shots[4] as any).framing = 'wide'
    expect(gatePlan(p, words, opts()).problems.join('\n')).not.toMatch(/out of frame/)
  })

  test('the first shot must start on the first sentence; shots must move forward in time', () => {
    const p = good()
    p.shots[0].start = { sentence: 's2' }
    p.shots[3].start = { sentence: 's2' }
    const out = gatePlan(p, words, opts()).problems.join('\n')
    expect(out).toMatch(/first shot/)
    expect(out).toMatch(/d: starts before/)
  })

  test('the same scene twice in a row is refused', () => {
    const p = good()
    p.shots.splice(1, 1)
    ;(p.shots[1] as any).scene = 'shop-street'
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/same scene twice in a row/)
  })

  test('slide share outside 35–65% is refused', () => {
    const p = good()
    p.shots = p.shots.filter((s) => s.kind === 'scene')
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/slide share/)
  })

  test('median shot length outside 6–14 s is refused', () => {
    const p = good()
    p.shots = [p.shots[0], { ...p.shots[1], start: { sentence: 's8' } }]
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/median shot/)
  })

  test('reusing the scene set of a recent video is refused (variety)', () => {
    const hist: History = [{ job: 'old', scenes: ['shop-street', 'bank-interior', 'vault-room', 'mansion'], slides: ['bars'] }]
    expect(gatePlan(good(), words, opts(hist)).problems.join('\n')).toMatch(/variety/)
  })
})

describe('timeline', () => {
  test('resolveCue finds a word inside its sentence; nth picks repeats; no word → sentence start', () => {
    expect(resolveCue(words, { sentence: 's2', word: 'money' })).toBeCloseTo(5.6)
    expect(resolveCue(words, { sentence: 's2' })).toBeCloseTo(4)
    expect(() => resolveCue(words, { sentence: 's2', word: 'money', nth: 2 })).toThrow(/only 1/)
    expect(() => resolveCue(words, { sentence: 's99' })).toThrow(/s99/)
  })

  test('buildTimeline gives back-to-back frame ranges to the end, resolves every cue to frames, pads slide cues', () => {
    const t = buildTimeline(good(), words, DUR)
    expect(t.fps).toBe(30)
    expect(t.shots[0].from).toBe(0)
    expect(t.shots[1].from).toBe(240)
    expect(t.shots[0].to).toBe(240)
    expect(t.shots.at(-1)!.to).toBe(t.durationInFrames)
    expect(t.durationInFrames).toBe(Math.ceil(DUR * 30))
    const a = t.shots[0].shot as any
    expect(a.actors[0].track[1].at).toBe(Math.round(1.6 * 30))
    const b = t.shots[1].shot as any
    expect(b.at.length).toBe(2)
    expect(b.at[1]).toBeGreaterThan(b.at[0])
    expect(t.sfx).toEqual([{ name: 'whoosh', t: 8, volume: 1 }])
  })
})

// # Layout budgets: text and item counts that overflow the 1920×1080 frame are refused at planning time
describe('layout budgets', () => {
  const withSlide = (patch: Record<string, unknown>) => {
    const p = good()
    Object.assign(p.shots[1] as any, patch)
    return gatePlan(p, words, opts()).problems.join('\n')
  }
  test('too many bars, long bar labels, long headings are refused with the limit', () => {
    const bars = Array.from({ length: 13 }, (_, i) => ({ label: `B${i}`, value: i + 1 }))
    expect(withSlide({ data: { bars } })).toMatch(/b: .*13 bars.*max 12/)
    expect(withSlide({ data: { bars: [{ label: 'A very very long company label', value: 1 }] } })).toMatch(/b: .*label.*max 22/)
    expect(withSlide({ heading: 'A heading that is far too long to sit on one line of the slide' })).toMatch(/b: heading.*max 48/)
  })
  test('compare cards: at most 3, short values and lines', () => {
    const card = { title: 'T', value: '1', lines: ['x'] }
    expect(withSlide({ slide: 'compare', data: { cards: [card, card, card, card] }, at: [] })).toMatch(/b: .*4 cards.*max 3/)
    expect(withSlide({ slide: 'compare', data: { cards: [{ ...card, value: '1,234,567,890' }] }, at: [] })).toMatch(/b: .*value.*max 9/)
  })
  test('a scene slam longer than 32 characters is refused', () => {
    const p = good()
    ;(p.shots[0] as any).slam = { words: [{ text: 'THIS SLAM IS FAR TOO LONG' }, { text: 'TO READ AT A GLANCE' }], at: [{ sentence: 's1' }] }
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/a: slam.*max 32/)
  })
  test('the first long video plan stays within budget', () => {
    expect(withSlide({ heading: 'One slice vs the average slice', slide: 'compare', at: [],
      data: { cards: [{ title: 'Average of the other 490', value: '0.13%', lines: ['62.1% ÷ 490', 'of your money each'] }, { title: 'Difference', value: '≈ 60×', lines: ['7.52 ÷ 0.13'] }] } })).toBe('')
  })
})
