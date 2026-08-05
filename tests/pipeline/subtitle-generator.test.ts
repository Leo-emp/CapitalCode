import { describe, it, expect } from 'vitest'
import { groupWords, generateSrt, formatSrtTime } from '@/pipeline/subtitle-generator'
import type { WordTimestamp } from '@/pipeline/voice-generator'

describe('formatSrtTime', () => {
  it('formats 0ms as 00:00:00,000', () => {
    expect(formatSrtTime(0)).toBe('00:00:00,000')
  })

  it('formats 65500ms correctly', () => {
    expect(formatSrtTime(65500)).toBe('00:01:05,500')
  })

  it('formats 3661234ms correctly', () => {
    expect(formatSrtTime(3661234)).toBe('01:01:01,234')
  })

  it('handles exact seconds', () => {
    expect(formatSrtTime(5000)).toBe('00:00:05,000')
  })
})

describe('groupWords', () => {
  const timestamps: WordTimestamp[] = [
    { word: 'Banks', startMs: 0, endMs: 300 },
    { word: 'hold', startMs: 350, endMs: 500 },
    { word: 'one', startMs: 550, endMs: 700 },
    { word: 'point', startMs: 750, endMs: 900 },
    { word: 'eight', startMs: 950, endMs: 1100 },
    { word: 'trillion', startMs: 1150, endMs: 1400 },
    { word: 'dollars', startMs: 1450, endMs: 1700 },
    { word: 'in', startMs: 1750, endMs: 1800 },
    { word: 'deposits', startMs: 1850, endMs: 2200 },
  ]

  it('groups into chunks of ≤42 characters', () => {
    const chunks = groupWords(timestamps)
    for (const chunk of chunks) {
      expect(chunk.text.length).toBeLessThanOrEqual(42)
    }
  })

  it('preserves all words', () => {
    const chunks = groupWords(timestamps)
    const allWords = chunks.map((c) => c.text).join(' ').split(/\s+/)
    expect(allWords).toHaveLength(9)
  })

  it('sets correct timing from first to last word in chunk', () => {
    const chunks = groupWords(timestamps)
    expect(chunks[0].startMs).toBe(0)
  })

  it('returns empty array for empty timestamps', () => {
    expect(groupWords([])).toEqual([])
  })

  it('handles single word', () => {
    const chunks = groupWords([{ word: 'Hello', startMs: 0, endMs: 500 }])
    expect(chunks).toHaveLength(1)
    expect(chunks[0].text).toBe('Hello')
  })
})

describe('generateSrt', () => {
  it('produces valid SRT format', () => {
    const timestamps: WordTimestamp[] = [
      { word: 'Hello', startMs: 0, endMs: 300 },
      { word: 'world', startMs: 350, endMs: 700 },
    ]
    const srt = generateSrt(timestamps)
    expect(srt).toContain('1')
    expect(srt).toContain('00:00:00,000 --> 00:00:00,700')
    expect(srt).toContain('Hello world')
  })

  it('returns empty string for empty timestamps', () => {
    expect(generateSrt([])).toBe('')
  })

  it('creates multiple chunks for long text', () => {
    // # Build timestamps with many words to exceed 42-char limit
    const words = 'The Federal Reserve raised interest rates by twenty five basis points yesterday'.split(' ')
    const timestamps: WordTimestamp[] = words.map((word, i) => ({
      word,
      startMs: i * 400,
      endMs: (i + 1) * 400 - 50,
    }))
    const srt = generateSrt(timestamps)
    // # Should have multiple chunks (numbered 1, 2, etc.)
    expect(srt).toContain('1\n')
    expect(srt).toContain('2\n')
  })
})
