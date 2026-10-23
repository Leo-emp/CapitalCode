// # Azure word offsets drift around entities/numbers — snapWords pins each event to the real token
import { expect, test } from 'vitest'
import { escapeWithMap, snapWords } from '../../agent/azure'

const text = 'earns $80,000 a year? Because buyers & sellers price the future.'

test('snaps drifting offsets to the nearest real token, in order, without punctuation', () => {
  const ev = [0, 6, 14, 16, 22, 30, 37, 37, 45, 51, 56].map((at) => ({ at, s: at / 10, e: at / 10 + 0.1 }))
  const w = snapWords(text, ev)
  expect(w.map((x) => x.w)).toEqual(['earns', '$80,000', 'a', 'year', 'Because', 'buyers', '&', 'sellers', 'price', 'the', 'future'])
  expect(w.map((x) => x.offset)).toEqual([0, 6, 14, 16, 22, 30, 37, 39, 47, 53, 57])
})

test('never moves backwards even when two events report the same offset', () => {
  const w = snapWords('a b c', [{ at: 0, s: 0, e: 1 }, { at: 0, s: 1, e: 2 }, { at: 4, s: 2, e: 3 }])
  expect(w.map((x) => x.offset)).toEqual([0, 2, 4])
})

test('escapeWithMap escapes SSML specials', () => {
  expect(escapeWithMap('a & <b>').xml).toBe('a &amp; &lt;b&gt;')
})
