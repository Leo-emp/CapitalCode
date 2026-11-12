// # Tests for re-timing words from the real audio (owner rule r27: nothing appears before it is spoken)
import { describe, expect, test } from 'vitest'
import { realign, snapToOnsets } from '../../agent/align'
import type { TimedWord } from '../../agent/schema'

const ours = (list: [string, number][]): TimedWord[] => list.map(([w, s]) => ({ w, s, e: s + 0.3, sid: 's1' }))

describe('realign', () => {
  test('a list of names timed ~1 s early by the synth lands on when each name is really heard', () => {
    const words = ours([['General', 20.95], ['Electric', 21.91], ['Exxon', 22.39], ['Pfizer', 23.03], ['Cisco', 23.83]])
    const heard = [{ w: 'General', s: 21.95, e: 22.3 }, { w: 'Electric', s: 22.35, e: 22.86 }, { w: 'Exxon', s: 23.05, e: 23.58 }, { w: 'Pfizer.', s: 23.82, e: 24.29 }, { w: 'Cisco', s: 24.54, e: 25.11 }]
    const r = realign(words, heard)
    expect(r.matched).toBe(5)
    expect(r.words.map((w) => w.s)).toEqual([21.95, 22.35, 23.05, 23.82, 24.54])
    expect(r.words[3].sid).toBe('s1')
  })

  test('words heard differently (numbers said as words) sit between their heard neighbours, in order', () => {
    const words = ours([['from', 1], ['1926', 1.3], ['to', 1.6], ['2016', 1.9], ['he', 2.2]])
    const heard = [{ w: 'from', s: 2, e: 2.2 }, { w: 'nineteen', s: 2.25, e: 2.5 }, { w: 'twenty-six', s: 2.5, e: 2.9 }, { w: 'to', s: 3, e: 3.1 }, { w: 'twenty', s: 3.15, e: 3.4 }, { w: 'sixteen', s: 3.4, e: 3.8 }, { w: 'he', s: 4, e: 4.2 }]
    const r = realign(words, heard)
    expect(r.matched).toBe(3)
    expect(r.words[0].s).toBe(2)
    expect(r.words[1].s).toBeGreaterThanOrEqual(2.2)
    expect(r.words[1].e).toBeLessThanOrEqual(3)
    expect(r.words[3].s).toBeGreaterThanOrEqual(3.1)
    expect(r.words[3].e).toBeLessThanOrEqual(4)
    for (let i = 1; i < r.words.length; i++) expect(r.words[i].s).toBeGreaterThanOrEqual(r.words[i - 1].s)
  })

  test('similar spellings still match (start-ups / startups), extra heard words are skipped', () => {
    const r = realign(ours([['little', 1], ['start-ups', 1.4]]), [{ w: 'uh', s: 0.9, e: 1 }, { w: 'little', s: 1.2, e: 1.5 }, { w: 'startups.', s: 1.55, e: 2 }])
    expect(r.matched).toBe(2)
    expect(r.words.map((w) => w.s)).toEqual([1.2, 1.55])
  })
})

describe('snapToOnsets', () => {
  test('a word heard a little early moves to where speech really starts after the pause', () => {
    const r = snapToOnsets(ours([['Electric', 22.26], ['Exxon', 22.64], ['Pfizer', 23.78]]), [23.05, 23.82])
    expect(r.map((w) => w.s)).toEqual([22.26, 23.05, 23.82])
  })
  test('never moves a word earlier (late is fine, early is not)', () => {
    const r = snapToOnsets(ours([['Walmart', 26.26], ['Microsoft', 27.5]]), [27.0])
    expect(r[1].s).toBe(27.5)
  })
  test('an onset goes to the closest word, not to the word before it', () => {
    const r = snapToOnsets(ours([['the', 10.0], ['giants', 10.6]]), [10.4])
    expect(r.map((w) => w.s)).toEqual([10.0, 10.6])
  })
})

describe('realign safety', () => {
  test('a word "heard" far from where the synth put it is a mishearing and is ignored', () => {
    // # the listener invented "debt" at 2.0 s; the real one is at 33 s
    const words = ours([['the', 1], ['debt', 33]])
    const r = realign(words, [{ w: 'the', s: 1.1, e: 1.3 }, { w: 'debt', s: 2, e: 2.3 }])
    expect(r.words[1].s).toBeGreaterThan(30)
  })
})
