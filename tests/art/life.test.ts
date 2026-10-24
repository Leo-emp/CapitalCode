// # Tests for idle life + automatic talk gestures (living film spec §5)
import { expect, test } from 'vitest'
import { idleLife, talkGesture } from '../../art/motion/life'
import type { Pose } from '../../art/rig/pose'

test('blinks: closed for 3–5 frames, every 120–200 frames, never two within 60 frames', () => {
  const closed = Array.from({ length: 3000 }, (_, f) => idleLife(f, 7).blink > 0.9)
  const runs: { start: number; len: number }[] = []
  closed.forEach((c, f) => { if (c && !closed[f - 1]) runs.push({ start: f, len: 0 }); if (c) runs[runs.length - 1].len++ })
  expect(runs.length).toBeGreaterThan(10)
  for (const r of runs) { expect(r.len).toBeGreaterThanOrEqual(3); expect(r.len).toBeLessThanOrEqual(5) }
  for (let i = 1; i < runs.length; i++) {
    const gap = runs[i].start - runs[i - 1].start
    expect(gap).toBeGreaterThanOrEqual(120); expect(gap).toBeLessThanOrEqual(200)
  }
})

test('idle life is deterministic per seed and differs between seeds', () => {
  expect(idleLife(437, 3)).toEqual(idleLife(437, 3))
  expect(idleLife(437, 3).headTurn).not.toBe(idleLife(437, 4).headTurn)
})

test('breathing has a 50–70 frame period', () => {
  const b = Array.from({ length: 400 }, (_, f) => idleLife(f, 11).breath)
  const ups = b.map((v, f) => (f && b[f - 1] < 0 && v >= 0 ? f : -1)).filter((f) => f >= 0)
  const period = (ups[ups.length - 1] - ups[0]) / (ups.length - 1)
  expect(period).toBeGreaterThanOrEqual(50); expect(period).toBeLessThanOrEqual(70)
})

const joints = (p: Pose) => [p.r.sh, p.r.el, p.l.sh, p.l.el, p.head, p.lean]
const speech: [number, number][] = [[30, 200], [260, 400]]

test('talk gestures only while the voice speaks', () => {
  expect(talkGesture(10, speech, 1)).toBeNull()
  expect(talkGesture(230, speech, 1)).toBeNull()
  expect(talkGesture(100, speech, 1)).not.toBeNull()
})

test('talk gestures flow: no joint moves 6° or more between frames, and weight eases in/out', () => {
  for (let f = 30; f < 400; f++) {
    const a = talkGesture(f, speech, 5), b = talkGesture(f + 1, speech, 5)
    if (!a || !b) continue
    joints(a.pose).forEach((v, i) => expect(Math.abs(joints(b.pose)[i] - v), `frame ${f} joint ${i}`).toBeLessThan(6))
    expect(Math.abs(b.weight - a.weight)).toBeLessThan(0.15)
  }
  expect(talkGesture(30, speech, 5)!.weight).toBeLessThan(0.15)
})

test('two actors with different seeds do not gesture in sync', () => {
  const diff = Array.from({ length: 160 }, (_, i) => Math.abs(talkGesture(35 + i, speech, 1)!.pose.r.el - talkGesture(35 + i, speech, 2)!.pose.r.el))
  expect(Math.max(...diff)).toBeGreaterThan(10)
})

test('actedPose: cued keys win, gestures only over free-arm poses while speaking', async () => {
  const { actedPose } = await import('../../art/motion/life')
  const { poseAt } = await import('../../art/rig/pose')
  const keys: [number, any][] = [[0, 'idle'], [150, 'sit']]
  // # silent: exactly the keyed pose
  expect(actedPose(10, keys, [], 1)).toEqual(poseAt(10, 30, keys))
  // # speaking over idle (no key near): the arms move away from the keyed pose
  expect(actedPose(100, keys, speech, 1).r.el).not.toBeCloseTo(poseAt(100, 30, keys).r.el, 1)
  // # a key within 8 frames: the cued action plays untouched
  expect(actedPose(146, keys, speech, 1)).toEqual(poseAt(146, 30, keys))
  // # sitting is not a talk pose
  expect(actedPose(180, keys, speech, 1)).toEqual(poseAt(180, 30, keys))
})
