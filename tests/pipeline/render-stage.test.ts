// # Tests for render stage — composition IDs, resolution, command building
import { describe, it, expect } from 'vitest'
import { getCompositionId, getResolution, buildRenderArgs } from '../../src/pipeline/render-stage'

describe('getCompositionId', () => {
  it('maps long_form to landscape composition', () => {
    expect(getCompositionId('long_form')).toBe('CapitalCode-Landscape')
  })

  it('maps short_explainer to portrait composition', () => {
    expect(getCompositionId('short_explainer')).toBe('CapitalCode-Portrait')
  })

  it('maps short_data_reveal to portrait composition', () => {
    expect(getCompositionId('short_data_reveal')).toBe('CapitalCode-Portrait')
  })

  it('defaults to landscape for unknown types', () => {
    expect(getCompositionId('whatever')).toBe('CapitalCode-Landscape')
  })
})

describe('getResolution', () => {
  it('returns 1920x1080 for landscape', () => {
    expect(getResolution('landscape')).toEqual({ width: 1920, height: 1080 })
  })

  it('returns 1080x1920 for portrait', () => {
    expect(getResolution('portrait')).toEqual({ width: 1080, height: 1920 })
  })
})

describe('buildRenderArgs', () => {
  it('includes composition ID and output path', () => {
    const args = buildRenderArgs('CapitalCode-Landscape', '/tmp/out.mp4', 300)
    expect(args).toContain('CapitalCode-Landscape')
    expect(args).toContain('/tmp/out.mp4')
  })

  it('includes CRF 18 for quality', () => {
    const args = buildRenderArgs('CapitalCode-Landscape', '/tmp/out.mp4', 300)
    expect(args).toContain('--crf=18')
  })

  it('sets correct frame range', () => {
    const args = buildRenderArgs('CapitalCode-Landscape', '/tmp/out.mp4', 450)
    expect(args).toContain('--frames=0-449')
  })

  it('includes H.264 codec', () => {
    const args = buildRenderArgs('CapitalCode-Landscape', '/tmp/out.mp4', 300)
    expect(args).toContain('--codec=h264')
  })

  it('includes props path when provided', () => {
    const args = buildRenderArgs('CapitalCode-Landscape', '/tmp/out.mp4', 300, '/tmp/props.json')
    expect(args).toContain('--props=/tmp/props.json')
  })

  it('omits props when not provided', () => {
    const args = buildRenderArgs('CapitalCode-Landscape', '/tmp/out.mp4', 300)
    expect(args.some(a => a.includes('--props'))).toBe(false)
  })

  it('uses npx remotion render command structure', () => {
    const args = buildRenderArgs('CapitalCode-Landscape', '/tmp/out.mp4', 300)
    expect(args[0]).toBe('remotion')
    expect(args[1]).toBe('render')
    expect(args[2]).toBe('src/remotion/Root.tsx')
  })
})
