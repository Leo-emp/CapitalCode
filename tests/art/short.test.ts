// # Vertical Shorts: each 16:9 shot is reframed into the 1080×1080 content box, not blindly cropped
import { expect, test } from 'vitest'
import { reframe } from '../../art/episode/Short'

const box = { w: 1080, h: 1080 }

test('a scene fills the box, centred on where its people and props are', () => {
  const r = reframe({ kind: 'scene', scene: 'wall-street', actors: [{ anchor: 'stand' }], props: [] } as any, box)
  expect(r.scale).toBeCloseTo(1, 5)
  // # the hero (stand x 330) must be inside the box
  const heroX = 330 * r.scale + r.x
  expect(heroX).toBeGreaterThan(80)
  expect(heroX).toBeLessThan(1000)
  // # never shows past the frame edge
  expect(r.x).toBeLessThanOrEqual(0)
  expect(r.x).toBeGreaterThanOrEqual(1080 - 1920)
})

test('a slide zooms a little but keeps its heading (x 150) and right edge (x 1770) in view; a vignette zooms more', () => {
  const s = reframe({ kind: 'slide' } as any, box)
  expect(1920 * s.scale).toBeGreaterThan(1080)
  expect(150 * s.scale + s.x).toBeGreaterThanOrEqual(20)
  expect(1770 * s.scale + s.x).toBeLessThanOrEqual(1060)
  const v = reframe({ kind: 'vignette' } as any, box)
  expect(v.scale).toBeGreaterThan(s.scale)
  expect(1920 * v.scale + 2 * v.x).toBeCloseTo(1080, 5) // # centred
})
