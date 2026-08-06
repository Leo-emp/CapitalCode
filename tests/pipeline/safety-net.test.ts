// # Tests for safety net — prompt building, response parsing, frame extraction
import { describe, it, expect } from 'vitest'
import { buildSafetyPrompt, parseSafetyResponse, extractFrameArgs } from '../../src/pipeline/safety-net'

describe('buildSafetyPrompt', () => {
  it('includes pass/fail instruction', () => {
    const prompt = buildSafetyPrompt()
    expect(prompt).toContain('pass')
    expect(prompt).toContain('fail')
  })

  it('includes quality criteria', () => {
    const prompt = buildSafetyPrompt()
    expect(prompt).toContain('unreadable')
    expect(prompt).toContain('amateur')
  })

  it('mentions CapitalCode brand', () => {
    const prompt = buildSafetyPrompt()
    expect(prompt).toContain('CapitalCode')
  })

  it('requests JSON response format', () => {
    const prompt = buildSafetyPrompt()
    expect(prompt).toContain('JSON')
  })
})

describe('parseSafetyResponse', () => {
  it('returns pass when response says pass', () => {
    const result = parseSafetyResponse({ pass: true, reason: 'Looks professional' })
    expect(result.pass).toBe(true)
    expect(result.reason).toBe('Looks professional')
  })

  it('returns fail when response says fail', () => {
    const result = parseSafetyResponse({ pass: false, reason: 'Text overlaps edge' })
    expect(result.pass).toBe(false)
    expect(result.reason).toBe('Text overlaps edge')
  })

  it('defaults to fail on malformed response', () => {
    const result = parseSafetyResponse({})
    expect(result.pass).toBe(false)
  })

  it('provides default reason when none given', () => {
    const result = parseSafetyResponse({ pass: false })
    expect(result.reason).toBe('No reason provided')
  })

  it('treats string "true" as fail (strict boolean check)', () => {
    const result = parseSafetyResponse({ pass: 'true', reason: 'test' })
    expect(result.pass).toBe(false)
  })
})

describe('extractFrameArgs', () => {
  it('returns 3 sets of ffmpeg args', () => {
    const args = extractFrameArgs('/tmp/video.mp4', '/tmp/frames', 900)
    expect(args).toHaveLength(3)
  })

  it('extracts at 10%, 40%, 80% of video', () => {
    const args = extractFrameArgs('/tmp/video.mp4', '/tmp/frames', 900)
    // # 900 frames at 30fps = 30s video
    // # 10% = 3s, 40% = 12s, 80% = 24s
    expect(args[0]).toContain('3.00')
    expect(args[1]).toContain('12.00')
    expect(args[2]).toContain('24.00')
  })

  it('outputs numbered frame files', () => {
    const args = extractFrameArgs('/tmp/video.mp4', '/tmp/frames', 300)
    expect(args[0].some(a => a.includes('frame-0.jpg'))).toBe(true)
    expect(args[1].some(a => a.includes('frame-1.jpg'))).toBe(true)
    expect(args[2].some(a => a.includes('frame-2.jpg'))).toBe(true)
  })

  it('includes input video path', () => {
    const args = extractFrameArgs('/tmp/video.mp4', '/tmp/frames', 300)
    expect(args[0]).toContain('/tmp/video.mp4')
  })

  it('extracts single frame per position', () => {
    const args = extractFrameArgs('/tmp/video.mp4', '/tmp/frames', 300)
    // # -frames:v 1 = extract exactly 1 frame
    const framesIdx = args[0].indexOf('-frames:v')
    expect(args[0][framesIdx + 1]).toBe('1')
  })
})
