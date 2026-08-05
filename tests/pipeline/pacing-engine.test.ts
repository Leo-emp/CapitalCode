import { describe, it, expect } from 'vitest'
import { analyzePacing } from '@/pipeline/pacing-engine'
import type { WordTimestamp } from '@/pipeline/voice-generator'
import type { Segment } from '@/pipeline/script-generator'

describe('analyzePacing', () => {
  const timestamps: WordTimestamp[] = [
    { word: 'Banks', startMs: 0, endMs: 300 },
    { word: 'profit', startMs: 350, endMs: 700 },    // # 50ms gap — normal
    { word: 'from', startMs: 1500, endMs: 1700 },    // # 800ms gap — dramatic pause
    { word: 'deposits', startMs: 1750, endMs: 2200 },
  ]

  const segments: Segment[] = [
    {
      id: 'seg_1',
      type: 'hook',
      text: 'Banks profit from deposits',
      durationHint: 10,
      emphasisWords: ['profit', 'deposits'],
      visualHint: 'big_stat',
    },
  ]

  it('converts ms timestamps to frame numbers', () => {
    const pacing = analyzePacing(timestamps, segments)

    expect(pacing.segments).toHaveLength(1)
    // # 0ms at 30fps = frame 0
    expect(pacing.segments[0].words[0].frameStart).toBe(0)
    // # 300ms at 30fps = frame 9
    expect(pacing.segments[0].words[0].frameEnd).toBe(9)
  })

  it('detects dramatic pauses (>500ms gaps)', () => {
    const pacing = analyzePacing(timestamps, segments)
    const pauses = pacing.segments[0].pauses

    // # 800ms gap between "profit" (end 700) and "from" (start 1500) → natural_pause (>500ms but <1000ms)
    expect(pauses.length).toBeGreaterThanOrEqual(1)
    expect(pauses.some((p) => p.type === 'natural_pause')).toBe(true)
  })

  it('marks emphasis words as punch points', () => {
    const pacing = analyzePacing(timestamps, segments)
    const punches = pacing.segments[0].punches

    expect(punches.some((p) => p.word === 'profit')).toBe(true)
    expect(punches.some((p) => p.word === 'deposits')).toBe(true)
  })

  it('generates SFX cues for emphasis words', () => {
    const pacing = analyzePacing(timestamps, segments)
    const sfx = pacing.segments[0].sfxCues

    // # hook segment → bass_hit type SFX
    expect(sfx.length).toBeGreaterThanOrEqual(1)
    expect(sfx.some((s) => s.type === 'bass_hit')).toBe(true)
  })

  it('detects strong emphasis on words after pauses', () => {
    const pacing = analyzePacing(timestamps, segments)

    // # "from" comes after an 800ms gap — should be strong emphasis
    const fromWord = pacing.segments[0].words.find((w) => w.word === 'from')
    expect(fromWord?.emphasis).toBe('strong')
  })

  it('returns empty pacing for empty timestamps', () => {
    const pacing = analyzePacing([], segments)
    expect(pacing.totalFrames).toBe(0)
    expect(pacing.segments).toEqual([])
  })

  it('calculates total frames from last word', () => {
    const pacing = analyzePacing(timestamps, segments)
    // # Last word ends at 2200ms → 2200/1000 * 30 = 66 frames
    expect(pacing.totalFrames).toBe(66)
  })
})
