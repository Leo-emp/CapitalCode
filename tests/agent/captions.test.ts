// # Shorts captions: short word groups, timed to the voice
import { expect, test } from 'vitest'
import { captionChunks } from '../../agent/captions'

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

test('a pause starts a new caption card', () => {
  const chunks = captionChunks([{ text: 'Wait.', s: 0, e: 0.4 }, { text: 'Then', s: 1.2, e: 1.4 }])
  expect(chunks.length).toBe(2)
})
