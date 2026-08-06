// # Tests for thumbnail stage — still render args
import { describe, it, expect } from 'vitest'
import { buildStillArgs } from '../../src/pipeline/thumbnail-stage'

describe('buildStillArgs', () => {
  it('uses remotion still command', () => {
    const args = buildStillArgs('/tmp/thumb.png', '/tmp/props.json')
    expect(args[0]).toBe('remotion')
    expect(args[1]).toBe('still')
  })

  it('uses dedicated thumbnail composition', () => {
    const args = buildStillArgs('/tmp/thumb.png', '/tmp/props.json')
    expect(args).toContain('CapitalCode-Thumbnail')
  })

  it('includes output path', () => {
    const args = buildStillArgs('/tmp/thumb.png', '/tmp/props.json')
    expect(args).toContain('/tmp/thumb.png')
  })

  it('includes props path', () => {
    const args = buildStillArgs('/tmp/thumb.png', '/tmp/props.json')
    expect(args).toContain('--props=/tmp/props.json')
  })
})
