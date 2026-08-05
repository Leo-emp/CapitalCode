import { describe, it, expect } from 'vitest'
import {
  TIMING_RULES,
  clampDuration,
  secondsToFrames,
  framesToSeconds,
  enforceTimingRules,
} from '@/quality/timing-rules'

describe('TIMING_RULES constants', () => {
  it('minSceneDuration is 75 frames (2.5s at 30fps)', () => {
    expect(TIMING_RULES.minSceneDuration).toBe(75)
  })

  it('maxSceneDuration is 750 frames (25s at 30fps)', () => {
    expect(TIMING_RULES.maxSceneDuration).toBe(750)
  })

  it('hookMaxDuration is 150 frames (5s)', () => {
    expect(TIMING_RULES.hookMaxDuration).toBe(150)
  })

  it('ctaMaxDuration is 120 frames (4s)', () => {
    expect(TIMING_RULES.ctaMaxDuration).toBe(120)
  })

  it('transitionDuration is 15 frames (0.5s)', () => {
    expect(TIMING_RULES.transitionDuration).toBe(15)
  })

  it('statRevealHold is 60 frames (2s)', () => {
    expect(TIMING_RULES.statRevealHold).toBe(60)
  })

  it('chartDrawMin is 45 frames (1.5s)', () => {
    expect(TIMING_RULES.chartDrawMin).toBe(45)
  })

  it('breathingRoom is 6 frames (0.2s)', () => {
    expect(TIMING_RULES.breathingRoom).toBe(6)
  })

  it('maxConsecutiveSameType is 2', () => {
    expect(TIMING_RULES.maxConsecutiveSameType).toBe(2)
  })

  it('maxConsecutiveSameTransition is 2', () => {
    expect(TIMING_RULES.maxConsecutiveSameTransition).toBe(2)
  })
})

describe('clampDuration', () => {
  it('returns value unchanged when within range', () => {
    // # 100 frames is between 75 (min) and 750 (max)
    expect(clampDuration(100)).toBe(100)
  })

  it('clamps up to minimum for short durations', () => {
    // # 30 frames is below 75 min → should be raised to 75
    expect(clampDuration(30)).toBe(75)
  })

  it('clamps down to maximum for long durations', () => {
    // # 900 frames is above 750 max → should be lowered to 750
    expect(clampDuration(900)).toBe(750)
  })

  it('enforces hook max of 150 frames', () => {
    // # 200 frames for a hook → clamped to 150
    expect(clampDuration(200, 'hook')).toBe(150)
  })

  it('enforces cta max of 120 frames', () => {
    // # 200 frames for a CTA → clamped to 120
    expect(clampDuration(200, 'cta')).toBe(120)
  })

  it('still enforces minimum for hooks', () => {
    // # 50 frames for a hook → clamped UP to 75 (global min)
    expect(clampDuration(50, 'hook')).toBe(75)
  })

  it('does not apply hook/cta cap to regular segments', () => {
    // # 200 frames for a data segment → fine, under 750 max
    expect(clampDuration(200, 'data')).toBe(200)
  })
})

describe('secondsToFrames', () => {
  it('converts whole seconds', () => {
    expect(secondsToFrames(1)).toBe(30)
    expect(secondsToFrames(5)).toBe(150)
  })

  it('converts fractional seconds with rounding', () => {
    expect(secondsToFrames(2.5)).toBe(75)
    expect(secondsToFrames(0.5)).toBe(15)
  })

  it('handles zero', () => {
    expect(secondsToFrames(0)).toBe(0)
  })
})

describe('framesToSeconds', () => {
  it('converts frames to seconds with 2 decimal places', () => {
    expect(framesToSeconds(30)).toBe(1)
    expect(framesToSeconds(75)).toBe(2.5)
    expect(framesToSeconds(15)).toBe(0.5)
  })

  it('handles zero', () => {
    expect(framesToSeconds(0)).toBe(0)
  })
})

describe('enforceTimingRules', () => {
  it('returns no fixes when duration is valid', () => {
    const result = enforceTimingRules(100, 'data')
    expect(result.durationFrames).toBe(100)
    expect(result.fixes).toHaveLength(0)
  })

  it('extends short scenes and logs a fix', () => {
    const result = enforceTimingRules(30, 'data')
    expect(result.durationFrames).toBe(75)
    expect(result.fixes).toHaveLength(1)
    expect(result.fixes[0]).toContain('extended')
  })

  it('trims long scenes and logs a fix', () => {
    const result = enforceTimingRules(900, 'data')
    expect(result.durationFrames).toBe(750)
    expect(result.fixes).toHaveLength(1)
    expect(result.fixes[0]).toContain('trimmed')
  })

  it('applies segment-specific caps', () => {
    const result = enforceTimingRules(200, 'hook')
    expect(result.durationFrames).toBe(150)
    expect(result.fixes[0]).toContain('trimmed')
    expect(result.fixes[0]).toContain('hook')
  })
})
