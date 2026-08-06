// # Tests for SFX mixer — timing, density capping, ffmpeg args

import { describe, it, expect } from 'vitest'
import { buildSfxArgs, calculateDelayMs, capSfxDensity } from '../../src/pipeline/sfx-mixer'

describe('sfx-mixer', () => {
  it('calculateDelayMs converts frames to milliseconds at 30fps', () => {
    // # 30 frames = 1 second = 1000ms
    expect(calculateDelayMs(30)).toBe(1000)
    // # 15 frames = 0.5 seconds = 500ms
    expect(calculateDelayMs(15)).toBe(500)
    // # 0 frames = 0ms
    expect(calculateDelayMs(0)).toBe(0)
  })

  it('calculateDelayMs handles non-round frame counts', () => {
    // # 45 frames = 1.5 seconds = 1500ms
    expect(calculateDelayMs(45)).toBe(1500)
  })

  it('buildSfxArgs includes adelay for each SFX cue', () => {
    const cues = [
      { frame: 30, type: 'whoosh', path: '/sfx/whoosh.mp3' },
      { frame: 90, type: 'impact', path: '/sfx/impact.mp3' },
    ]
    const args = buildSfxArgs('/tmp/voice.mp3', cues, '/tmp/out.mp3')
    const filterStr = args.join(' ')
    // # Each cue should have an adelay filter
    expect(filterStr).toContain('adelay')
    // # Both SFX files should be inputs
    expect(args).toContain('/sfx/whoosh.mp3')
    expect(args).toContain('/sfx/impact.mp3')
  })

  it('buildSfxArgs with no cues just copies audio', () => {
    const args = buildSfxArgs('/tmp/voice.mp3', [], '/tmp/out.mp3')
    // # No filter_complex when no SFX — just copy through
    expect(args).toContain('-c')
    expect(args).toContain('copy')
  })

  it('capSfxDensity removes cues closer than 60 frames', () => {
    const cues = [
      { frame: 0, type: 'tick' },
      { frame: 10, type: 'tick' },    // # Too close to frame 0
      { frame: 20, type: 'tick' },    // # Too close to frame 0
      { frame: 90, type: 'impact' },  // # Far enough
    ]
    const capped = capSfxDensity(cues)
    // # Should keep frame 0 and frame 90 only
    expect(capped).toHaveLength(2)
    expect(capped[0].frame).toBe(0)
    expect(capped[1].frame).toBe(90)
  })

  it('capSfxDensity keeps cues >= 60 frames apart', () => {
    const cues = [
      { frame: 0, type: 'tick' },
      { frame: 60, type: 'whoosh' },
      { frame: 120, type: 'impact' },
    ]
    const capped = capSfxDensity(cues)
    // # All three are exactly 60 frames apart — all should stay
    expect(capped).toHaveLength(3)
  })

  it('capSfxDensity handles single cue', () => {
    const cues = [{ frame: 42, type: 'whoosh' }]
    expect(capSfxDensity(cues)).toHaveLength(1)
  })

  it('capSfxDensity handles empty array', () => {
    expect(capSfxDensity([])).toHaveLength(0)
  })

  it('buildSfxArgs sets volume to -12dB (0.25) for each SFX', () => {
    const cues = [{ frame: 30, type: 'whoosh', path: '/sfx/whoosh.mp3' }]
    const args = buildSfxArgs('/tmp/voice.mp3', cues, '/tmp/out.mp3')
    const filterStr = args[args.indexOf('-filter_complex') + 1]
    // # SFX should be at -12dB (0.25 linear)
    expect(filterStr).toContain('volume=0.25')
  })
})
