// # Tests for design system extensions: effects, parallax, morph

import { describe, it, expect } from 'vitest'
import { goldGlow, textMaskStyle, shimmerKeyframes } from '../../src/remotion/design/effects'
import { parallaxStyle } from '../../src/remotion/design/parallax'
import { normalizePath, interpolatePaths, pointsToSvgPath } from '../../src/remotion/design/morph'
import { transform3dEntry } from '../../src/remotion/design/animations'
import { animatedGradientBg } from '../../src/remotion/design/backgrounds'

describe('effects', () => {
  it('goldGlow returns text-shadow with gold RGB values', () => {
    const glow = goldGlow()
    // # Should contain the gold accent RGB (212, 168, 83)
    expect(glow.textShadow).toContain('212,168,83')
  })

  it('goldGlow accepts custom intensity', () => {
    const glow = goldGlow(0.8)
    // # Higher intensity should appear in the shadow string
    expect(glow.textShadow).toContain('0.8')
  })

  it('goldGlow defaults to 0.4 intensity', () => {
    const glow = goldGlow()
    expect(glow.textShadow).toContain('0.4')
  })

  it('textMaskStyle returns background-clip text for gradient wipe', () => {
    const style = textMaskStyle(0.5)
    expect(style.backgroundClip).toBe('text')
    expect(style.WebkitBackgroundClip).toBe('text')
  })

  it('textMaskStyle sets color to transparent for mask effect', () => {
    const style = textMaskStyle(0.5)
    expect(style.color).toBe('transparent')
  })

  it('shimmerKeyframes generates valid CSS @keyframes', () => {
    const css = shimmerKeyframes('shimmer1')
    expect(css).toContain('@keyframes shimmer1')
    expect(css).toContain('background-position')
  })
})

describe('parallax', () => {
  it('background layer moves slower than foreground', () => {
    const bg = parallaxStyle('background', 30, 150)
    const fg = parallaxStyle('foreground', 30, 150)
    // # Extract translateX values
    const bgX = parseFloat(String(bg.transform).match(/translateX\((.+?)px/)?.[1] ?? '0')
    const fgX = parseFloat(String(fg.transform).match(/translateX\((.+?)px/)?.[1] ?? '0')
    // # Background should have smaller absolute offset
    expect(Math.abs(bgX)).toBeLessThan(Math.abs(fgX))
  })

  it('returns transform with translateX', () => {
    const style = parallaxStyle('midground', 15, 100)
    expect(String(style.transform)).toContain('translateX')
  })

  it('at frame 0 layers start with negative offset (leftward)', () => {
    const bg = parallaxStyle('background', 0, 100)
    const bgX = parseFloat(String(bg.transform).match(/translateX\((.+?)px/)?.[1] ?? '0')
    // # At frame 0, progress=0, offset = (0-0.5)*drift = negative
    expect(bgX).toBeLessThanOrEqual(0)
  })

  it('at midpoint frame layers are centered (near zero)', () => {
    const mid = parallaxStyle('foreground', 50, 100)
    const midX = parseFloat(String(mid.transform).match(/translateX\((.+?)px/)?.[1] ?? '999')
    expect(Math.abs(midX)).toBeLessThan(1)
  })
})

describe('morph', () => {
  it('normalizePath outputs exact point count', () => {
    const path = [{ x: 0, y: 0 }, { x: 100, y: 50 }, { x: 200, y: 100 }]
    const normalized = normalizePath(path, 5)
    expect(normalized).toHaveLength(5)
  })

  it('normalizePath handles empty path', () => {
    const normalized = normalizePath([], 3)
    expect(normalized).toHaveLength(3)
    expect(normalized[0]).toEqual({ x: 0, y: 0 })
  })

  it('normalizePath handles single point', () => {
    const normalized = normalizePath([{ x: 42, y: 99 }], 4)
    expect(normalized).toHaveLength(4)
    // # All points should be copies of the single input
    normalized.forEach((p) => {
      expect(p.x).toBe(42)
      expect(p.y).toBe(99)
    })
  })

  it('interpolatePaths at progress 0 returns pathA', () => {
    const a = [{ x: 0, y: 0 }, { x: 10, y: 10 }]
    const b = [{ x: 100, y: 100 }, { x: 110, y: 110 }]
    const result = interpolatePaths(a, b, 0)
    expect(result[0].x).toBe(0)
    expect(result[0].y).toBe(0)
  })

  it('interpolatePaths at progress 1 returns pathB', () => {
    const a = [{ x: 0, y: 0 }, { x: 10, y: 10 }]
    const b = [{ x: 100, y: 100 }, { x: 110, y: 110 }]
    const result = interpolatePaths(a, b, 1)
    expect(result[0].x).toBe(100)
    expect(result[0].y).toBe(100)
  })

  it('interpolatePaths at progress 0.5 returns midpoint', () => {
    const a = [{ x: 0, y: 0 }]
    const b = [{ x: 100, y: 200 }]
    const result = interpolatePaths(a, b, 0.5)
    expect(result[0].x).toBe(50)
    expect(result[0].y).toBe(100)
  })

  it('pointsToSvgPath creates valid SVG d attribute', () => {
    const points = [{ x: 0, y: 0 }, { x: 50, y: 25 }, { x: 100, y: 50 }]
    const d = pointsToSvgPath(points)
    expect(d).toMatch(/^M /)
    expect(d).toContain('L ')
    expect(d).toContain('50.0')
  })

  it('pointsToSvgPath handles empty array', () => {
    expect(pointsToSvgPath([])).toBe('')
  })
})

describe('transform3dEntry', () => {
  it('at progress 0 applies full tilt and scale', () => {
    const t = transform3dEntry(0)
    expect(t).toContain('perspective(1000px)')
    expect(t).toContain('rotateX(-5deg)')
    expect(t).toContain('scale(0.85)')
  })

  it('at progress 1 has zero tilt and full scale', () => {
    const t = transform3dEntry(1)
    expect(t).toContain('rotateX(0deg)')
    expect(t).toContain('scale(1)')
  })

  it('accepts custom tilt angle', () => {
    const t = transform3dEntry(0, -10)
    expect(t).toContain('rotateX(-10deg)')
  })
})

describe('animatedGradientBg', () => {
  it('at progress 0 uses 135deg angle', () => {
    const bg = animatedGradientBg(0)
    expect(bg.background).toContain('135deg')
  })

  it('at progress 1 uses 180deg angle', () => {
    const bg = animatedGradientBg(1)
    expect(bg.background).toContain('180deg')
  })

  it('returns absolute positioning', () => {
    const bg = animatedGradientBg(0.5)
    expect(bg.position).toBe('absolute')
    expect(bg.width).toBe('100%')
    expect(bg.height).toBe('100%')
  })
})
