// # Tests for safe zone helpers and design token constraints
import { describe, it, expect } from 'vitest'
import { SAFE_ZONE, snap, safeZoneStyle, truncate } from '../../src/remotion/design/safe-zones'
import { colors } from '../../src/remotion/design/colors'
import { fonts, fontSize } from '../../src/remotion/design/fonts'
import { springs, durations, FPS, secondsToFrames, msToFrames } from '../../src/remotion/design/animations'
import { SCENE_REGISTRY } from '../../src/remotion/scene-registry'
import type { SceneComponent } from '../../src/quality/segment-scene-map'

// # ===== Safe zones =====
describe('SAFE_ZONE', () => {
  it('is exactly 80px', () => {
    expect(SAFE_ZONE).toBe(80)
  })
})

describe('snap', () => {
  it('snaps to 8px grid', () => {
    expect(snap(13)).toBe(16) // # Rounds up
    expect(snap(12)).toBe(16) // # Rounds to nearest
    expect(snap(8)).toBe(8)   // # Already on grid
    expect(snap(0)).toBe(0)
  })
})

describe('safeZoneStyle', () => {
  it('has 80px padding on all sides', () => {
    expect(safeZoneStyle.top).toBe(80)
    expect(safeZoneStyle.left).toBe(80)
    expect(safeZoneStyle.right).toBe(80)
    expect(safeZoneStyle.bottom).toBe(80)
  })

  it('is absolute positioned flex container', () => {
    expect(safeZoneStyle.position).toBe('absolute')
    expect(safeZoneStyle.display).toBe('flex')
    expect(safeZoneStyle.flexDirection).toBe('column')
  })
})

describe('truncate', () => {
  it('leaves short text unchanged', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('truncates with ellipsis', () => {
    expect(truncate('this is a very long string', 15)).toBe('this is a ve...')
  })

  it('handles exact length', () => {
    expect(truncate('12345', 5)).toBe('12345')
  })
})

// # ===== Color palette =====
describe('colors', () => {
  it('has navy primary background', () => {
    expect(colors.bg.primary).toBe('#0A1628')
  })

  it('has gold accent', () => {
    expect(colors.accent.gold).toBe('#D4A853')
  })

  it('has semantic colors for data visualization', () => {
    expect(colors.semantic.positive).toBeDefined()
    expect(colors.semantic.negative).toBeDefined()
    expect(colors.semantic.neutral).toBeDefined()
  })

  it('has 6 chart colors for multi-series', () => {
    expect(colors.chart).toHaveLength(6)
  })
})

// # ===== Fonts =====
describe('fonts', () => {
  it('uses Bebas Neue for headlines', () => {
    expect(fonts.headline.family).toBe('Bebas Neue')
  })

  it('uses Inter for body text', () => {
    expect(fonts.body.family).toBe('Inter')
  })

  it('uses JetBrains Mono for data', () => {
    expect(fonts.data.family).toBe('JetBrains Mono')
  })
})

describe('fontSize', () => {
  it('returns landscape sizes', () => {
    expect(fontSize('headline', 'hero', 'landscape')).toBe(96)
    expect(fontSize('body', 'large', 'landscape')).toBe(36)
  })

  it('returns smaller portrait sizes', () => {
    expect(fontSize('headline', 'hero', 'portrait')).toBe(72)
    expect(fontSize('body', 'large', 'portrait')).toBe(28)
  })

  it('falls back to 28 for unknown size', () => {
    expect(fontSize('body', 'nonexistent', 'landscape')).toBe(28)
  })
})

// # ===== Animation constants =====
describe('animations', () => {
  it('runs at 30fps', () => {
    expect(FPS).toBe(30)
  })

  it('has 3 spring configs', () => {
    expect(springs.smooth).toBeDefined()
    expect(springs.snappy).toBeDefined()
    expect(springs.elegant).toBeDefined()
  })

  it('converts seconds to frames', () => {
    expect(secondsToFrames(1)).toBe(30)
    expect(secondsToFrames(0.5)).toBe(15)
  })

  it('converts milliseconds to frames', () => {
    expect(msToFrames(1000)).toBe(30)
    expect(msToFrames(500)).toBe(15)
  })
})

// # ===== Scene registry =====
describe('SCENE_REGISTRY', () => {
  it('has all 21 scene components registered', () => {
    // # Must match SceneComponent union from segment-scene-map.ts
    const expectedScenes: SceneComponent[] = [
      'BigStatReveal', 'KineticTitle', 'TextOverlay', 'FlowDiagram',
      'ProcessSteps', 'LineChartDraw', 'BarChartGrow', 'AreaChartFill',
      'CandlestickChart', 'CounterAnimation', 'BarChartRace', 'StackedBar',
      'WaterfallChart', 'QuoteCard', 'ComparisonSplit', 'BeforeAfter',
      'GaugeChart', 'TimelineSequence', 'IconGrid', 'CallToAction',
    ]

    for (const scene of expectedScenes) {
      expect(SCENE_REGISTRY[scene], `Missing: ${scene}`).toBeDefined()
      expect(typeof SCENE_REGISTRY[scene]).toBe('function')
    }
  })

  it('also has HormoziCaption for subtitles', () => {
    expect(SCENE_REGISTRY.HormoziCaption).toBeDefined()
  })

  it('returns undefined for unknown scene types', () => {
    expect(SCENE_REGISTRY['NonexistentScene']).toBeUndefined()
  })
})
