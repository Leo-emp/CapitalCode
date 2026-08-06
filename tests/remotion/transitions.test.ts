// # Tests for cinematic transition system

import { describe, it, expect } from 'vitest'
import { TRANSITION_FRAMES, getTransitionComponent, CrossDissolve, ZoomThrough, WipeRight } from '../../src/remotion/transitions'

describe('transitions', () => {
  it('TRANSITION_FRAMES is 15 (0.5s at 30fps)', () => {
    expect(TRANSITION_FRAMES).toBe(15)
  })

  it('getTransitionComponent returns CrossDissolve for cross_dissolve', () => {
    const C = getTransitionComponent('cross_dissolve')
    expect(C).toBeDefined()
    expect(C.displayName).toBe('CrossDissolve')
  })

  it('getTransitionComponent returns ZoomThrough for zoom_through', () => {
    const C = getTransitionComponent('zoom_through')
    expect(C).toBeDefined()
    expect(C.displayName).toBe('ZoomThrough')
  })

  it('getTransitionComponent returns WipeRight for wipe_right', () => {
    const C = getTransitionComponent('wipe_right')
    expect(C).toBeDefined()
    expect(C.displayName).toBe('WipeRight')
  })

  it('getTransitionComponent returns CrossDissolve for unknown type', () => {
    const C = getTransitionComponent('unknown_transition')
    expect(C).toBe(CrossDissolve)
  })

  it('getTransitionComponent maps legacy "fade" to CrossDissolve', () => {
    const C = getTransitionComponent('fade')
    expect(C).toBe(CrossDissolve)
  })

  it('getTransitionComponent maps legacy "zoom" to ZoomThrough', () => {
    const C = getTransitionComponent('zoom')
    expect(C).toBe(ZoomThrough)
  })

  it('getTransitionComponent maps legacy "wipe" to WipeRight', () => {
    const C = getTransitionComponent('wipe')
    expect(C).toBe(WipeRight)
  })

  it('all transition components have displayName set', () => {
    expect(CrossDissolve.displayName).toBe('CrossDissolve')
    expect(ZoomThrough.displayName).toBe('ZoomThrough')
    expect(WipeRight.displayName).toBe('WipeRight')
  })
})
