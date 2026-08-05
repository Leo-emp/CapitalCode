import { describe, it, expect } from 'vitest'
import {
  cleanScriptText,
  extractWordTimestamps,
  findLongPauses,
  type WordTimestamp,
} from '@/pipeline/voice-generator'

describe('cleanScriptText', () => {
  it('replaces ellipsis with period', () => {
    expect(cleanScriptText('Wait... what?')).toBe('Wait. what?')
  })

  it('replaces em dashes with comma-space', () => {
    expect(cleanScriptText('Banks—they profit')).toBe('Banks, they profit')
  })

  it('replaces double dashes with comma-space', () => {
    // # -- → ", " then whitespace normalization collapses double space
    expect(cleanScriptText('Banks -- they profit')).toBe('Banks , they profit')
  })

  it('replaces smart quotes with ASCII', () => {
    expect(cleanScriptText('“Hello”')).toBe('"Hello"')
    expect(cleanScriptText('‘world’')).toBe("'world'")
  })

  it('normalizes whitespace', () => {
    expect(cleanScriptText('too   many    spaces')).toBe('too many spaces')
  })
})

describe('extractWordTimestamps', () => {
  it('converts character-level alignment to word-level timestamps', () => {
    // # "Hi there" — 8 characters including space
    const alignment = {
      characters: ['H', 'i', ' ', 't', 'h', 'e', 'r', 'e'],
      character_start_times_seconds: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
      character_end_times_seconds: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    }

    const words = extractWordTimestamps(alignment)

    expect(words).toHaveLength(2)
    expect(words[0]).toEqual({ word: 'Hi', startMs: 0, endMs: 200 })
    expect(words[1]).toEqual({ word: 'there', startMs: 300, endMs: 800 })
  })

  it('handles single word', () => {
    const alignment = {
      characters: ['O', 'k'],
      character_start_times_seconds: [0.0, 0.1],
      character_end_times_seconds: [0.1, 0.2],
    }

    const words = extractWordTimestamps(alignment)
    expect(words).toHaveLength(1)
    expect(words[0].word).toBe('Ok')
  })
})

describe('findLongPauses', () => {
  it('detects pauses longer than threshold', () => {
    const timestamps: WordTimestamp[] = [
      { word: 'First', startMs: 0, endMs: 500 },
      { word: 'Second', startMs: 2500, endMs: 3000 },  // # 2000ms gap — long pause
      { word: 'Third', startMs: 3200, endMs: 3700 },   // # 200ms gap — normal
    ]

    const pauses = findLongPauses(timestamps, 1500)

    expect(pauses).toHaveLength(1)
    expect(pauses[0].durationMs).toBe(2000)
    expect(pauses[0].afterWordIndex).toBe(0)
  })

  it('returns empty array when no long pauses', () => {
    const timestamps: WordTimestamp[] = [
      { word: 'Fast', startMs: 0, endMs: 200 },
      { word: 'speech', startMs: 300, endMs: 500 },
    ]

    expect(findLongPauses(timestamps)).toEqual([])
  })
})
