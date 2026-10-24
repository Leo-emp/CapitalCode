// # Scene slams: nothing in the scene may read through the words (Critic, rounds 1–2: shop sign, brain "?")
import { expect, test } from 'vitest'
import { slamLayers } from '../../art/episode/Episode'

test('before a slam the scene is untouched', () => {
  expect(slamLayers(100, 130)).toEqual({ dim: 0, band: 0, props: true })
  expect(slamLayers(100, undefined)).toEqual({ dim: 0, band: 0, props: true })
})

test('during a slam: dark scene, near-solid band behind the words, props hidden', () => {
  const l = slamLayers(140, 130)
  expect(l.dim).toBeGreaterThanOrEqual(0.86)
  expect(l.band).toBeGreaterThanOrEqual(0.95)
  expect(l.props).toBe(false)
})

// # Persistent small logo (Alux keeps theirs on every frame); hidden on the brand card itself
test('the corner logo shows on every shot except the brand card', async () => {
  const { cornerLogo } = await import('../../art/episode/Episode')
  expect(cornerLogo('scene')).toBe(true)
  expect(cornerLogo('slide')).toBe(true)
  expect(cornerLogo('chapter')).toBe(true)
  expect(cornerLogo('brand')).toBe(false)
})

test('zoom-into keeps the previous shot on screen for the whole 18-frame fly-in', async () => {
  const { visibleShots, enterPoint } = await import('../../art/episode/Episode')
  const sc = (id: string, enter?: unknown) => ({ id, kind: 'scene', start: 0, scene: 'shop-street', ...(enter ? { enter } : {}) })
  const tl = { fps: 30, durationInFrames: 300, sfx: [], shots: [{ shot: sc('a'), from: 0, to: 100 }, { shot: sc('b', { zoomInto: 'door' }), from: 100, to: 300 }] } as any
  expect(visibleShots(tl, 115).map((x: any) => x.shot.id)).toEqual(['a', 'b'])
  expect(visibleShots(tl, 118).map((x: any) => x.shot.id)).toEqual(['b'])
  // # the named spot is found on screen through the previous shot's camera (inside the frame)
  const p = enterPoint(tl.shots[0], 'door', 100)
  expect(p.x).toBeGreaterThan(1200); expect(p.x).toBeLessThanOrEqual(1920)
  expect(p.y).toBeGreaterThan(600); expect(p.y).toBeLessThanOrEqual(1080)
  expect(enterPoint(tl.shots[0], { x: 300, y: 200 }, 100)).toEqual({ x: 300, y: 200 })
})
