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
  props: [{ id: 'cash-stack', anchor: 'prop1', at: { sentence: `s${at}`, word: 'money' } }, { id: 'coin', anchor: 'prop2', at: { sentence: `s${at + 1}`, word: 'money' } }],
})
const slide = (id: string, at: number) => ({
  id, kind: 'slide' as const, start: { sentence: `s${at}` }, slide: 'bars', heading: 'H',
  data: { bars: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }] }, at: [{ sentence: `s${at}` }, { sentence: `s${at + 1}`, word: 'money' }], // # first bar on the cut, second in the next sentence
})
// # shots every 2 sentences (8 s): scene/slide alternate → 50% slides, median 8 s
const good = (): PlanDoc => ({
  shots: [
    scene('a', 1, 'shop-street'), slide('b', 3), scene('c', 5, 'bank-interior'), slide('d', 7),
    scene('e', 9, 'vault-room'), slide('f', 11),
    { ...scene('g', 13, 'mansion'), props: [...scene('g', 13, 'mansion').props, { id: 'house', anchor: 'prop1', at: { sentence: 's15', word: 'money' } }] },
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

  test('buildTimeline lists when the voice is speaking: one frame range per sentence', () => {
    const t = buildTimeline(good(), words, DUR)
    const sids = [...new Set(words.map((w) => w.sid))]
    expect(t.speech!.length).toBe(sids.length)
    const s2 = words.filter((w) => w.sid === 's2')
    expect(t.speech![1]).toEqual([Math.round(s2[0].s * 30), Math.round(s2.at(-1)!.e * 30)])
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
      data: { cards: [{ title: 'Average of the other 490', value: '0.13%', lines: ['62.1% ÷ 490', 'of your money each'] }, { title: 'Difference', value: '≈ 60×', lines: ['7.52 ÷ 0.13'] }] } })).not.toMatch(/chars \(max|cards \(max|lines \(max/)
  })
})

// # Scenes whose decoration shows made-up figures (prices, %, tickers) could pass as real data
describe('decoration with made-up figures', () => {
  test('a scene with baked-in figures is refused unless the shot says decorOk', () => {
    const p = good()
    ;(p.shots[0] as any).scene = 'crypto-exchange'
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/a: scene crypto-exchange shows made-up figures/)
    ;(p.shots[0] as any).decorOk = true
    expect(gatePlan(p, words, opts()).problems.join('\n')).not.toMatch(/made-up figures/)
  })
  test('every listed scene exists', async () => {
    const { DECOR_FIGURES } = await import('../../agent/catalog')
    const { SCENES } = await import('../../art/scenes/registry')
    for (const id of DECOR_FIGURES) expect(SCENES.some((s) => s.id === id), id).toBe(true)
  })
})

// # Owner review 2026-10-24: slides sat heading-only for seconds; 11 slams; brand at 0:34
describe('pace of what is on screen', () => {
  test('a slide whose first item lands > 1 s after the cut is refused, naming the late word', () => {
    const p = good()
    ;(p.shots[1] as any).at = [{ sentence: 's3', word: 'money' }]
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/b: slide is empty for 1\.6 s after the cut/)
  })
  test('more than 3 slams in a long video are refused', () => {
    const p = good()
    const slam = { words: [{ text: 'X' }], at: [{ sentence: 's1' }] }
    for (const i of [0, 2, 4, 6]) (p.shots[i] as any).slam = { ...slam, at: [{ sentence: `s${i * 2 + 1}` }] }
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/4 slams \(max 3\)/)
  })
  test('the brand card must start by 25 s', () => {
    const p = good()
    p.shots.splice(5, 0, { id: 'br', kind: 'brand', start: { sentence: 's12' } } as any)
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/br: brand card at 44\.0 s \(max 25 s\)/)
  })
})

// # Vignettes: checked like slides, counted as illustration (not slide share)
describe('vignette shots', () => {
  const vig = (patch: Record<string, unknown> = {}) => {
    const p = good()
    p.shots[1] = { id: 'b', kind: 'vignette', start: { sentence: 's3' }, vignette: 'lottery', data: { tickets: 40, winners: 2 },
      at: [{ sentence: 's3' }, { sentence: 's4', word: 'money' }], ...patch } as any
    return gatePlan(p, words, opts())
  }
  test('a valid vignette passes and counts as illustration', () => {
    const r = vig()
    expect(r.problems.filter((x) => !/slide share/.test(x))).toEqual([])
    expect(r.stats!.slideShare).toBeLessThan(0.4)
  })
  test('unknown vignette, bad data and too many cues are refused', () => {
    expect(vig({ vignette: 'ufo' }).problems.join('\n')).toMatch(/b: unknown vignette "ufo"/)
    expect(vig({ data: { tickets: 5, winners: 9 } }).problems.join('\n')).toMatch(/b: lottery winners/)
    expect(vig({ at: [{ sentence: 's3' }, { sentence: 's3' }, { sentence: 's3' }, { sentence: 's3' }] }).problems.join('\n')).toMatch(/b: more cues than lottery steps/)
  })
})

// # Owner 2026-10-24: "show more illustrations of what the voiceover is speaking"
describe('show what is said', () => {
  test('a plan whose scenes only change poses / show generic icons is refused', () => {
    const p = good()
    for (const i of [0, 2, 4, 6]) {
      const s = p.shots[i] as any
      s.props = [{ id: 'question', anchor: 'prop1', at: { sentence: s.start.sentence, word: 'money' } }]
    }
    const msg = gatePlan(p, words, opts()).problems.join('\n')
    expect(msg).toMatch(/sentences have nothing on screen that shows what is said/)
    expect(msg).toMatch(/generic icons and pose changes do not count/)
  })
  test('long gaps without an illustrative event are refused', () => {
    const p = good()
    for (const i of [0, 2, 4, 6]) (p.shots[i] as any).props = []
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/no illustration for \d+\.\d s/)
  })
})

// # Acting: held props need an actor to hold them; floor/hand are the only placements
describe('props in hands or on the floor', () => {
  test('a held prop is fine with an actor, refused without one or with a bad placement', () => {
    const p = good()
    ;(p.shots[0] as any).props[0] = { id: 'cash-stack', anchor: 'stand', on: 'hand', at: { sentence: 's1', word: 'money' } }
    expect(gatePlan(p, words, opts()).problems.join('\n')).not.toMatch(/a: .*hand/)
    ;(p.shots[0] as any).props[0].actor = 3
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/a: prop cash-stack is held by actor 3, but the shot has 1 actor/)
    ;(p.shots[0] as any).props[0] = { id: 'cash-stack', anchor: 'prop1', on: 'shelf', at: { sentence: 's1' } }
    expect(gatePlan(p, words, opts()).problems.join('\n')).toMatch(/a: prop cash-stack: on must be "hand" or "floor"/)
  })
})

test('a chapter card shows its own opening sentence (its title is the visual)', () => {
  const p = good()
  p.shots.splice(1, 0, { id: 'ch', kind: 'chapter', start: { sentence: 's2' }, n: 1, title: 'T' } as any)
  ;(p.shots[0] as any).props = (p.shots[0] as any).props.filter((x: any) => x.at.sentence !== 's2')
  // # with a zero budget every bare sentence is listed — s2 must not be among them
  const msg = gatePlan(p, words, { ...opts(), maxBare: 0 }).problems.find((x) => /nothing on screen/.test(x)) ?? ''
  expect(msg).not.toMatch(/\bs2\b/)
})

test('a vignette counts half toward slide share (data + illustration in one)', () => {
  const p = good()
  const base = gatePlan(p, words, opts()).stats!.slideShare
  for (const i of [1, 3, 5]) p.shots[i] = { ...(p.shots[i] as any), kind: 'vignette', vignette: 'lottery', data: { tickets: 20, winners: 2 } } as any
  expect(gatePlan(p, words, opts()).stats!.slideShare).toBeCloseTo(base / 2, 2)
})

// # Living film: walks between scene spots
describe('walk paths', () => {
  test('a walk to a known spot passes; an unknown spot is refused by name', () => {
    const p = good()
    const a = p.shots[0] as any
    a.actors[0].path = [{ at: { sentence: 's1', word: 'money' }, to: 'stand2' }]
    expect(gatePlan(p, words, opts()).problems.filter((x) => /path/.test(x))).toEqual([])
    a.actors[0].path = [{ at: { sentence: 's1', word: 'money' }, to: 'nowhere' }]
    expect(gatePlan(p, words, opts()).problems).toContain('a: path anchor "nowhere" not in scene shop-street')
  })
})
