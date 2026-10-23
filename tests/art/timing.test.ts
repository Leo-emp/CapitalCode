// # Tests for art/timing.ts — cue words → frames
import { describe, expect, test } from 'vitest'
import { cueFrame, normaliseWord, type Word } from '../../art/timing'

const W: Word[] = [
  { w: 'Buyers', s: 2.74, e: 3.2 },
  { w: "don't.", s: 3.27, e: 3.6 },
  { w: 'three', s: 5.68, e: 5.9 },
  { w: 'three', s: 9.53, e: 9.8 },
]

describe('normaliseWord', () => {
  test('lower-cases and strips punctuation but keeps apostrophes', () => {
    expect(normaliseWord("Don't.")).toBe("don't")
    expect(normaliseWord('“Million,”')).toBe('million')
  })
  test('curly apostrophe counts as a straight one', () => {
    expect(normaliseWord('don’t')).toBe("don't")
  })
})

describe('cueFrame', () => {
  test('frame of the first match at 30 fps', () => {
    expect(cueFrame(W, 'Buyers')).toBe(82)
  })
  test('nth occurrence', () => {
    expect(cueFrame(W, 'three', 2)).toBe(286)
  })
  test('cue with punctuation matches the spoken word', () => {
    expect(cueFrame(W, "don't")).toBe(98)
  })
  test('missing cue throws and names the nearest words', () => {
    expect(() => cueFrame(W, 'sellers')).toThrow(/sellers.*buyers/i)
  })
  test('nth beyond the count throws', () => {
    expect(() => cueFrame(W, 'three', 3)).toThrow(/three.*2/i)
  })
})
