// # Tests for the camera (living film spec §6): cue-keyed eased moves, constant drift, never outside the world
import { expect, test } from 'vitest'
import { cameraAt, framed, layerCam } from '../../art/motion/camera'

const base = { at: 0, x: 960, y: 540, zoom: 1 }
const keys = [base, { at: 60, x: 1400, y: 500, zoom: 1.6 }]
const still = (f: number) => cameraAt(f, keys, 0, 0) // # drift off

test('holds the opening framing until the first move', () => {
  expect(still(30)).toEqual({ x: 960, y: 540, zoom: 1 })
})

test('moves are eased: no speed at the start and end of a move, arriving after 24 frames', () => {
  expect(still(61).x - still(60).x).toBeLessThan(3)
  expect(still(72).x - still(71).x).toBeGreaterThan(15)
  expect(still(84)).toEqual({ x: 1400, y: 500, zoom: 1.6 })
  expect(still(84).x - still(83).x).toBeLessThan(3)
})

test('a move cued mid-move starts from where the camera is (no jump)', () => {
  const k = [base, { at: 60, x: 1400, y: 540, zoom: 1.5 }, { at: 70, x: 600, y: 540, zoom: 1.5 }]
  expect(Math.abs(cameraAt(70, k, 0, 0).x - cameraAt(69, k, 0, 0).x)).toBeLessThan(40)
})

test('drift: the camera is never perfectly still over any 30-frame window', () => {
  for (let f0 = 0; f0 < 900; f0 += 30) {
    const xs = Array.from({ length: 30 }, (_, i) => cameraAt(f0 + i, [base], 3).x)
    expect(Math.max(...xs) - Math.min(...xs), `window ${f0}`).toBeGreaterThan(0.5)
  }
  // # but gentle: within 6 px and 0.6% zoom of the target
  for (let f = 0; f < 900; f += 7) {
    const c = cameraAt(f, [base], 3)
    expect(Math.abs(c.x - 960)).toBeLessThanOrEqual(6); expect(Math.abs(c.zoom - 1)).toBeLessThanOrEqual(0.006 + 1e-9)
  }
})

test('framed never shows outside the 1920×1080 world, at any zoom and any target', () => {
  for (const zoom of [1, 1.3, 2, 2.5]) for (const x of [0, 300, 960, 1850, 1920]) for (const y of [0, 540, 1080]) {
    const v = framed({ x, y, zoom })
    expect(v.k).toBeGreaterThanOrEqual(1)
    expect(v.tx).toBeLessThanOrEqual(0); expect(v.tx).toBeGreaterThanOrEqual(1920 * (1 - v.k) - 1e-6)
    expect(v.ty).toBeLessThanOrEqual(0); expect(v.ty).toBeGreaterThanOrEqual(1080 * (1 - v.k) - 1e-6)
  }
  // # a zoom below 1 would show past the edges: held at 1
  expect(framed({ x: 960, y: 540, zoom: 0.8 }).k).toBe(1)
})

test('parallax: the back layer moves less than the middle, the front more', () => {
  const cam = { x: 1300, y: 540, zoom: 1.4 }
  const shift = (d: number) => framed(layerCam(cam, d)).tx - framed(layerCam({ x: 960, y: 540, zoom: 1.4 }, d)).tx
  expect(Math.abs(shift(0.4))).toBeLessThan(Math.abs(shift(1)))
  expect(Math.abs(shift(1.35))).toBeGreaterThanOrEqual(Math.abs(shift(1)))
})

test('plan camera keys: a named spot becomes a target (people framed at the chest), zoom carries over', async () => {
  const { camKeys } = await import('../../art/motion/camera')
  const anchors = { stand: { x: 400, y: 1000, scale: 1, layer: 'front' as const }, prop1: { x: 1300, y: 300, scale: 1, layer: 'mid' as const } }
  const base = { x: 960, y: 540, zoom: 1 }
  const ks = camKeys(10, base, [{ at: 50, to: 'prop1', zoom: 1.8 }, { at: 90, to: 'stand' }, { at: 120, to: { x: 700, y: 500 } }], anchors)
  expect(ks[0]).toEqual({ at: 10, ...base })
  expect(ks[1]).toEqual({ at: 50, x: 1300, y: 300, zoom: 1.8 })
  // # at 1.8× a full body no longer fits: framed from the head down (head room first)
  expect(ks[2]).toEqual({ at: 90, x: 400, y: 1000 - 600 + 360 / 1.8, zoom: 1.8 })
  expect(ks[3]).toEqual({ at: 120, x: 700, y: 500, zoom: 1.8 })
  // # first move with no zoom given: a gentle push-in
  expect(camKeys(0, base, [{ at: 20, to: 'prop1' }], anchors)[1].zoom).toBe(1.35)
})

test('a close zoom on a person keeps the head in frame (head room first, feet may leave)', async () => {
  const { camKeys, framed, layerCam, DEPTH } = await import('../../art/motion/camera')
  const stand = { x: 420, y: 1011, scale: 1, layer: 'front' as const }
  for (const zoom of [1.35, 1.6, 1.9, 2.5]) {
    const k = camKeys(0, { x: 960, y: 540, zoom: 1 }, [{ at: 1, to: 'stand', zoom }], { stand })[1]
    const v = framed(layerCam({ ...k, zoom: k.zoom * 1.04 }, DEPTH.front))
    const headTop = (stand.y - 580 * stand.scale) * v.k + v.ty // # top of the hair on screen
    expect(headTop, `zoom ${zoom}`).toBeGreaterThanOrEqual(30)
  }
})
