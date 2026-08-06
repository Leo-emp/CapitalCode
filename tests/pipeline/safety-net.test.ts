// # Tests for safety net — prompt building and response parsing
import { describe, it, expect } from 'vitest'
import { buildSafetyPrompt, parseSafetyResponse } from '../../src/pipeline/safety-net'

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
