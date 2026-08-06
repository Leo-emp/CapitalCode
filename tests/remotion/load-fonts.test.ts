// # Tests for font loading — verifies all 3 families are declared
import { describe, it, expect } from 'vitest'
import { getFontFaces } from '../../src/remotion/design/load-fonts'

describe('getFontFaces', () => {
  const css = getFontFaces()

  it('declares Bebas Neue font family', () => {
    expect(css).toContain("font-family: 'Bebas Neue'")
    expect(css).toContain('BebasNeue-Regular.ttf')
  })

  it('declares Inter font family', () => {
    expect(css).toContain("font-family: 'Inter'")
    expect(css).toContain('Inter-Variable.ttf')
  })

  it('declares JetBrains Mono with regular and bold', () => {
    expect(css).toContain("font-family: 'JetBrains Mono'")
    expect(css).toContain('JetBrainsMono-Regular.ttf')
    expect(css).toContain('JetBrainsMono-Bold.ttf')
  })

  it('uses block font-display to prevent FOIT in renders', () => {
    const blockCount = (css.match(/font-display: block/g) || []).length
    expect(blockCount).toBe(4) // # 4 @font-face declarations
  })
})
