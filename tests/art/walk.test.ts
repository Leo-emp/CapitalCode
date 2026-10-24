// # Tests for walking between scene spots (living film spec §5 locomotion)
import { expect, test } from 'vitest'
import { walkAt, walkPose } from '../../art/motion/walk'

const start = { x: 400, y: 1000 }
const legs = [{ at: 30, to: { x: 1000, y: 1000 } }, { at: 200, to: { x: 700, y: 980 } }]

test('stands at the start until the first leg is cued', () => {
  expect(walkAt(0, start, legs)).toEqual({ x: 400, y: 1000, walking: false, facing: 1 })
  expect(walkAt(29, start, legs).x).toBe(400)
})

test('walks at the given speed, arrives and stops', () => {
  const mid = walkAt(80, start, legs)
  expect(mid.walking).toBe(true)
  expect(mid.x).toBeCloseTo(400 + 50 * 6, 0)
  // # 600 px at 6 px/frame = 100 frames → arrives at frame 130
  expect(walkAt(131, start, legs)).toEqual({ x: 1000, y: 1000, walking: false, facing: 1 })
})

test('faces the way it travels, and a later leg starts from where it stopped', () => {
  const back = walkAt(220, start, legs)
  expect(back.facing).toBe(-1)
  expect(back.x).toBeLessThan(1000)
  expect(walkAt(400, start, legs)).toMatchObject({ x: 700, y: 980, walking: false })
})

test('a leg cued before the previous one arrives waits for the arrival (no teleport)', () => {
  const l2 = [{ at: 30, to: { x: 1000, y: 1000 } }, { at: 60, to: { x: 400, y: 1000 } }]
  // # still heading right at frame 100 (first leg ends at 130)
  expect(walkAt(100, start, l2).facing).toBe(1)
  for (let f = 0; f < 300; f++) expect(Math.abs(walkAt(f + 1, start, l2).x - walkAt(f, start, l2).x)).toBeLessThanOrEqual(6.01)
})

test('walk cycle swings legs smoothly and is a pure function of the frame (chunk seams)', () => {
  const a = walkPose(100), b = walkPose(101)
  expect(Math.abs(a.rl.hip - b.rl.hip)).toBeLessThan(4)
  expect(walkPose(100)).toEqual(walkPose(100))
  expect(walkPose(100).rl.knee).not.toBeCloseTo(walkPose(109).rl.knee, 1)
})
