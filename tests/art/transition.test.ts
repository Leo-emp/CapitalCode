// # Tests for zoom-into transitions (living film spec §6): the next shot grows out of a point of this one
import { expect, test } from 'vitest'
import { ZOOM_INTO, zoomIntoAt } from '../../art/motion/transition'

const corners = (p: { x: number; y: number }) => Math.max(...[[0, 0], [1920, 0], [0, 1080], [1920, 1080]].map(([x, y]) => Math.hypot(x - p.x, y - p.y)))

test('starts untouched: outgoing at rest, incoming a point', () => {
  const z = zoomIntoAt(0, { x: 700, y: 400 })
  expect(z.outgoing).toEqual({ k: 1, tx: 0, ty: 0 })
  expect(z.incoming.r).toBe(0)
  expect(z.incoming.cx).toBe(700); expect(z.incoming.cy).toBe(400)
})

test('ends with the incoming shot covering the whole frame, even from a point near the edge', () => {
  for (const pt of [{ x: 700, y: 400 }, { x: 1850, y: 300 }, { x: 40, y: 1050 }]) {
    const z = zoomIntoAt(1, pt)
    expect(z.incoming.r).toBeGreaterThanOrEqual(corners(pt))
    expect(z.incoming).toMatchObject({ k: 1, tx: 0, ty: 0 })
  }
})

test('a point outside the frame is clamped into it', () => {
  const z = zoomIntoAt(0.5, { x: 2400, y: -50 })
  expect(z.incoming.cx).toBeLessThanOrEqual(1920); expect(z.incoming.cy).toBeGreaterThanOrEqual(0)
})

test('monotonic: the outgoing zooms in steadily while the circle grows', () => {
  let k = 0, r = -1
  for (let i = 0; i <= ZOOM_INTO; i++) {
    const z = zoomIntoAt(i / ZOOM_INTO, { x: 1000, y: 500 })
    expect(z.outgoing.k).toBeGreaterThanOrEqual(k); expect(z.incoming.r).toBeGreaterThanOrEqual(r)
    k = z.outgoing.k; r = z.incoming.r
  }
  // # the zoom keeps the chosen point where it is on screen
  const z = zoomIntoAt(0.6, { x: 1000, y: 500 })
  expect(1000 * z.outgoing.k + z.outgoing.tx).toBeCloseTo(1000); expect(500 * z.outgoing.k + z.outgoing.ty).toBeCloseTo(500)
})
