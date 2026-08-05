import { describe, it, expect } from 'vitest'
import {
  SEGMENT_SCENE_MAP,
  pickSceneType,
  isValidSceneForSegment,
} from '@/quality/segment-scene-map'

describe('SEGMENT_SCENE_MAP', () => {
  it('maps all 9 segment types', () => {
    const types = Object.keys(SEGMENT_SCENE_MAP)
    expect(types).toEqual([
      'hook', 'context', 'data', 'insight',
      'comparison', 'counter', 'prediction', 'implication', 'cta',
    ])
  })

  it('hook allows BigStatReveal and KineticTitle', () => {
    expect(SEGMENT_SCENE_MAP.hook).toEqual(['BigStatReveal', 'KineticTitle'])
  })

  it('data has 8 chart/counter components', () => {
    expect(SEGMENT_SCENE_MAP.data).toHaveLength(8)
    // # Every data scene should be a chart or counter type
    expect(SEGMENT_SCENE_MAP.data).toContain('LineChartDraw')
    expect(SEGMENT_SCENE_MAP.data).toContain('CandlestickChart')
    expect(SEGMENT_SCENE_MAP.data).toContain('WaterfallChart')
  })

  it('cta maps to exactly one component', () => {
    expect(SEGMENT_SCENE_MAP.cta).toEqual(['CallToAction'])
  })

  it('every allowed list has at least one component', () => {
    for (const [type, allowed] of Object.entries(SEGMENT_SCENE_MAP)) {
      expect(allowed.length, `${type} should have at least 1 component`).toBeGreaterThanOrEqual(1)
    }
  })
})

describe('pickSceneType', () => {
  it('returns first allowed component with no recent history', () => {
    // # hook with empty history → BigStatReveal (first in list)
    expect(pickSceneType('hook')).toBe('BigStatReveal')
  })

  it('returns first allowed when recent scenes are varied', () => {
    // # Two different recent scenes → no constraint triggered
    expect(pickSceneType('data', ['LineChartDraw', 'BarChartGrow'])).toBe('LineChartDraw')
  })

  it('avoids 3 consecutive same scene type', () => {
    // # Two consecutive BigStatReveal → must NOT pick BigStatReveal again
    const result = pickSceneType('hook', ['BigStatReveal', 'BigStatReveal'])
    expect(result).not.toBe('BigStatReveal')
    // # Should pick KineticTitle (the other hook option)
    expect(result).toBe('KineticTitle')
  })

  it('allows 2 consecutive same type (only blocks at 3)', () => {
    // # Only 1 recent BigStatReveal → still allowed to pick BigStatReveal
    expect(pickSceneType('hook', ['BigStatReveal'])).toBe('BigStatReveal')
  })

  it('falls back to TextOverlay for unknown segment types', () => {
    expect(pickSceneType('unknown_type')).toBe('TextOverlay')
    expect(pickSceneType('')).toBe('TextOverlay')
  })

  it('returns the only option for cta even if repeated', () => {
    // # CTA only has CallToAction — can't avoid it
    expect(pickSceneType('cta', ['CallToAction', 'CallToAction'])).toBe('CallToAction')
  })

  it('handles empty recentScenes array', () => {
    expect(pickSceneType('context', [])).toBe('TextOverlay')
  })

  it('picks alternative for data segments with repeated charts', () => {
    // # Two consecutive LineChartDraw → should pick something else from the 8 data options
    const result = pickSceneType('data', ['LineChartDraw', 'LineChartDraw'])
    expect(result).not.toBe('LineChartDraw')
    // # Should be one of the other data chart types
    expect(SEGMENT_SCENE_MAP.data).toContain(result)
  })
})

describe('isValidSceneForSegment', () => {
  it('returns true for valid pairings', () => {
    expect(isValidSceneForSegment('BigStatReveal', 'hook')).toBe(true)
    expect(isValidSceneForSegment('LineChartDraw', 'data')).toBe(true)
    expect(isValidSceneForSegment('CallToAction', 'cta')).toBe(true)
  })

  it('returns false for invalid pairings', () => {
    // # CallToAction is NOT valid for data segments
    expect(isValidSceneForSegment('CallToAction', 'data')).toBe(false)
    // # BigStatReveal is NOT valid for cta segments
    expect(isValidSceneForSegment('BigStatReveal', 'cta')).toBe(false)
  })

  it('returns false for unknown segment types', () => {
    expect(isValidSceneForSegment('TextOverlay', 'nonexistent')).toBe(false)
  })

  it('returns false for unknown scene types', () => {
    expect(isValidSceneForSegment('FakeComponent', 'hook')).toBe(false)
  })
})
