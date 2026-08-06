// # Tests for AI illustration generator

import { describe, it, expect } from 'vitest'
import { buildStylePrompt, STYLE_GUIDE } from '../../src/pipeline/illustration-generator'

describe('illustration-generator', () => {
  it('STYLE_GUIDE contains brand primary color', () => {
    expect(STYLE_GUIDE).toContain('#0A1628')
  })

  it('STYLE_GUIDE contains brand gold accent', () => {
    expect(STYLE_GUIDE).toContain('#D4A853')
  })

  it('buildStylePrompt includes scene-specific description', () => {
    const prompt = buildStylePrompt('busy trading floor with multiple monitors')
    // # The scene description should appear at the start
    expect(prompt).toContain('busy trading floor')
    // # Style guide should be appended
    expect(prompt).toContain(STYLE_GUIDE)
  })

  it('buildStylePrompt includes no-text instruction', () => {
    // # AI-generated images with text look terrible — always ban it
    const prompt = buildStylePrompt('anything')
    expect(prompt.toLowerCase()).toContain('no text')
  })

  it('STYLE_GUIDE enforces flat vector style', () => {
    expect(STYLE_GUIDE).toContain('flat vector')
  })

  it('buildStylePrompt format is description + Style: guide', () => {
    const prompt = buildStylePrompt('abstract money flow')
    // # Should follow the exact format pattern
    expect(prompt).toMatch(/^abstract money flow\. Style: /)
  })
})
