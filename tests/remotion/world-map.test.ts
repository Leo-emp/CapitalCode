// # Tests for WorldMap scene component helpers

import { describe, it, expect } from 'vitest'
import { getCountryCentroid, buildFlowPath, COUNTRY_CENTROIDS } from '../../src/remotion/scenes/WorldMap'

describe('WorldMap', () => {
  it('COUNTRY_CENTROIDS has entries for major economies', () => {
    // # Must have US, China, UK at minimum for finance content
    expect(COUNTRY_CENTROIDS['US']).toBeDefined()
    expect(COUNTRY_CENTROIDS['CN']).toBeDefined()
    expect(COUNTRY_CENTROIDS['GB']).toBeDefined()
  })

  it('COUNTRY_CENTROIDS has at least 20 countries', () => {
    // # Good coverage for global finance topics
    expect(Object.keys(COUNTRY_CENTROIDS).length).toBeGreaterThanOrEqual(20)
  })

  it('getCountryCentroid returns coordinates for known country', () => {
    const pos = getCountryCentroid('US')
    // # US should be in the left half of the map
    expect(pos.x).toBeGreaterThan(0)
    expect(pos.y).toBeGreaterThan(0)
  })

  it('getCountryCentroid returns map center for unknown country', () => {
    // # Unknown codes should fallback to center (500, 300)
    const pos = getCountryCentroid('XX')
    expect(pos.x).toBe(500)
    expect(pos.y).toBe(300)
  })

  it('buildFlowPath creates SVG path between two countries', () => {
    const path = buildFlowPath('US', 'CN')
    // # Path should start with M (moveTo)
    expect(path).toMatch(/^M /)
    // # Should contain Q (quadratic Bezier curve)
    expect(path).toContain('Q')
  })

  it('buildFlowPath handles unknown countries gracefully', () => {
    // # Should not throw — uses fallback centroids
    const path = buildFlowPath('XX', 'YY')
    expect(path).toMatch(/^M /)
    expect(path).toContain('Q')
  })

  it('buildFlowPath creates different paths for different routes', () => {
    const usToChina = buildFlowPath('US', 'CN')
    const ukToJapan = buildFlowPath('GB', 'JP')
    // # Different country pairs should produce different paths
    expect(usToChina).not.toBe(ukToJapan)
  })
})
