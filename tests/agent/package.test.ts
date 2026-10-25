// # Packaging: captions, chapters, folder name, metadata checks, sources
import { expect, test } from 'vitest'
import { captionsSrt, checkMeta, chapterLines, folderName, sourcesTxt } from '../../agent/package'
import type { FactsDoc, MetaDoc, ScriptDoc, TimedWord } from '../../agent/schema'

const words: TimedWord[] = 'Why would anyone pay a million dollars for a corner shop? Because buyers price the future.'.split(' ')
  .map((w, i) => ({ w: w.replace(/[?.]$/, ''), s: i * 0.5, e: i * 0.5 + 0.4, sid: i < 11 ? 's1' : 's2' }))
const script: ScriptDoc = { title: 't', area: 'business', format: 'explainer', thesis: 'x',
  chapters: [{ title: 'The question', sentences: [{ id: 's1', text: 'Why would anyone pay a million dollars for a corner shop?' }] },
    { title: 'The answer', sentences: [{ id: 's2', text: 'Because buyers price the future.' }] }] }

test('captions come from the script text (with punctuation), ≤ 42 chars a line, SRT timestamps', () => {
  const srt = captionsSrt(words, script)
  expect(srt.startsWith('1\n00:00:00,000 --> ')).toBe(true)
  expect(srt).toContain('corner shop?')
  expect(srt).toContain('Because buyers price the future.')
  for (const line of srt.split('\n').filter((l) => /[a-z]/i.test(l))) expect(line.length).toBeLessThanOrEqual(42)
})

test('chapter lines start at 0:00 with each chapter at its first spoken word', () => {
  expect(chapterLines(words, script)).toEqual(['0:00 The question', '0:05 The answer'])
})

test('folder name = safe title + date + time', () => {
  expect(folderName('Why Buyers Pay $1M: For a "Corner Shop"?', new Date(2026, 9, 24, 9, 5))).toBe('Why Buyers Pay $1M For a Corner Shop_2026-10-24_09-05')
})

const meta = (): MetaDoc => ({
  titles: ['Why a Corner Shop Sells for $1 Million', 'The Hidden Math of Selling a Business', 'Buyers Do Not Pay for the Past'],
  description: 'A corner shop that earns $350,000 a year can sell for over a million. '.repeat(4),
  tags: ['business valuation', 'small business', 'selling a business'],
  thumbnails: [
    { layout: 'hero-left', words: 'WHO GETS THE $1M?', accent: [3], tone: 'green', character: { pose: 'think', expression: 'shocked' }, prop: 'cash-stack' },
    { layout: 'object-center', words: '3× PROFIT', prop: 'shop-mini' },
    { layout: 'split', words: 'PAST VS FUTURE', scene: 'shop-street' },
  ],
})

test('good metadata passes', () => expect(checkMeta(meta())).toEqual([]))

test('metadata problems are caught: count, length, thumbnail words, unknown ids, hype', () => {
  const m = meta()
  m.titles = ['Get rich quick: this shop is GUARANTEED to make you a millionaire overnight and forever more']
  m.thumbnails[0].words = 'THIS IS FAR TOO MANY WORDS FOR A THUMB'
  m.thumbnails[1].prop = 'ufo'
  m.thumbnails[2].scene = 'moon'
  const out = checkMeta(m).join('\n')
  for (const w of ['3 titles', 'over 70', 'guaranteed', 'too many words', 'ufo', 'moon']) expect(out.toLowerCase()).toContain(w.toLowerCase())
})

test('sources list is deduplicated by url', () => {
  const facts: FactsDoc = { facts: [
    { id: 'f1', value: 3, asOf: '2025', source: 'BizBuySell', url: 'https://a' },
    { id: 'f2', value: 4, asOf: '2025', source: 'BizBuySell', url: 'https://a' },
    { id: 'f3', value: 5, asOf: '2024', source: 'Fed', url: 'https://b', note: 'rates' },
  ] }
  expect(sourcesTxt(facts)).toBe('Sources\n- BizBuySell (2025): https://a\n- Fed (2024): https://b — rates\n')
})

test('a Short needs no thumbnails (the cover frame is picked in the app); a long video still needs 3', () => {
  const m = { ...meta(), thumbnails: [] }
  expect(checkMeta(m, { short: true })).toEqual([])
  expect(checkMeta(m)).toContain('need 3 thumbnails (got 0)')
})
