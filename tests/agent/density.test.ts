// # Living film density (spec §7, §12.1, §12.6): something shown every ≤ 2 s, every sentence shown,
// # text (slides + slams + kinetic text) ≤ 25% of runtime — and old plans still load without a crash
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { gatePlan } from '../../agent/gates/plan'
import { PACE } from '../../agent/commands/plan'
import type { PlanDoc, TimedWord } from '../../agent/schema'

// # 15 sentences × 10 words × 0.4 s = 60 s; word 5 is "money" (+1.6 s), word 8 is "s<i>w8" (+2.8 s)
const words: TimedWord[] = []
for (let i = 1; i <= 15; i++) for (let j = 1; j <= 10; j++) {
  const t = (i - 1) * 4 + (j - 1) * 0.4
  words.push({ w: j === 5 ? 'money' : `s${i}w${j}`, s: +t.toFixed(2), e: +(t + 0.35).toFixed(2), sid: `s${i}` })
}
const DUR = 60.5
const SCENES = ['shop-street', 'bank-interior', 'vault-room', 'mansion']

// # A dense plan: one scene per two sentences; each sentence shows a prop on its first word and the camera
// # goes to the hero on "money" (1.2×) and on word 8 (1.35×)
const dense = (): PlanDoc => ({
  shots: Array.from({ length: 8 }, (_, k) => {
    const ss = [2 * k + 1, 2 * k + 2].filter((n) => n <= 15)
    return {
      id: `sh${k}`, kind: 'scene' as const, start: { sentence: `s${ss[0]}` }, scene: SCENES[k % 4],
      actors: [{ who: 'hero', anchor: 'stand', track: [{ at: { sentence: `s${ss[0]}` }, pose: 'idle' }] }],
      props: ss.map((n) => ({ id: 'cash-stack', anchor: 'prop1', at: { sentence: `s${n}` } })),
      camera: ss.flatMap((n) => [{ at: { sentence: `s${n}`, word: 'money' }, to: 'stand', zoom: 1.2 }, { at: { sentence: `s${n}`, word: `s${n}w8` }, to: 'stand' }]),
    }
  }),
})
const opts = { duration: DUR, history: [], ...PACE.long }

describe('living film density', () => {
  test('a dense plan passes the long-video pace', () => {
    expect(gatePlan(dense(), words, opts).problems).toEqual([])
  })

  test('camera moves to named spots count as shown events (without them: gaps)', () => {
    const p = dense()
    for (const s of p.shots as any[]) s.camera = []
    expect(gatePlan(p, words, opts).problems.join('\n')).toMatch(/no illustration for 4\.\d s/)
  })

  test('a 2.4-second gap is refused', () => {
    const p = dense()
    ;(p.shots[0] as any).camera = (p.shots[0] as any).camera.filter((c: any) => c.at.word !== 's1w8')
    expect(gatePlan(p, words, opts).problems.join('\n')).toMatch(/no illustration for 2\.4 s from 1\.6 s \(max 2 s\)/)
  })

  test('every sentence needs its own shown event', () => {
    const p = dense()
    const s = p.shots[1] as any // # sentences s3, s4
    s.props = s.props.filter((x: any) => x.at.sentence !== 's4'); s.camera = s.camera.filter((c: any) => c.at.sentence !== 's4')
    expect(gatePlan(p, words, opts).problems.join('\n')).toMatch(/1 of 15 sentences have nothing on screen .*s4/)
  })

  test('text share: slides + slams + kinetic text over 25% of runtime is refused', () => {
    const p = dense()
    const slide = (id: string, n: number) => ({ id, kind: 'slide' as const, start: { sentence: `s${n}` }, slide: 'bars', heading: 'H', data: { bars: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }] },
      at: [{ sentence: `s${n}` }, { sentence: `s${n}`, word: 'money' }] })
    p.shots[1] = slide('t1', 3) as any; p.shots[3] = slide('t2', 7) as any
    expect(gatePlan(p, words, opts).problems.join('\n')).toMatch(/text 26% of runtime \(max 25%\)/)
  })

  test('kinetic text counts toward the text share (1.5 s each) and as a shown event', () => {
    const p = dense()
    ;(p.shots[0] as any).camera = (p.shots[0] as any).camera.filter((c: any) => c.at.word !== 's1w8')
    ;(p.shots[0] as any).text = [{ words: 'Only 10', at: { sentence: 's1', word: 's1w8' }, style: 'pop' }]
    const r = gatePlan(p, words, opts)
    expect(r.problems).toEqual([])
    expect(r.stats!.textShare).toBeCloseTo(1.5 / DUR, 3)
  })

  test('the real v3 index-fund plan still loads: only density/text problems, never a crash', () => {
    const plan = JSON.parse(readFileSync('tests/fixtures/indexfund/plan_v3.json', 'utf8'))
    const w = JSON.parse(readFileSync('tests/fixtures/indexfund/words.json', 'utf8'))
    const dur = w[w.length - 1].e + 0.5
    const r = gatePlan(plan, w, { duration: dur, history: [], ...PACE.long })
    for (const x of r.problems) expect(x).toMatch(/no illustration|sentences have nothing|text \d+% of runtime|median shot|shot is/)
    expect(r.problems.length).toBeGreaterThan(0)
  })
})

test('every gap over the limit is named (up to 8), so a director can fix them in one pass', () => {
  const p = dense()
  for (const k of [0, 2]) (p.shots[k] as any).camera = (p.shots[k] as any).camera.filter((c: any) => !/w8/.test(c.at.word ?? ''))
  const gaps = gatePlan(p, words, opts).problems.filter((x) => /no illustration/.test(x))
  expect(gaps.length).toBeGreaterThanOrEqual(3)
})
