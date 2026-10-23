// # Tests for art/rig/pose.ts — pose blending, pose tracks, hand positions
import { describe, expect, test } from 'vitest'
import { handPosition, mixPose, POSE_IDS, poseAt, POSES } from '../../art/rig/pose'

describe('POSES', () => {
  test('all 13 planned poses exist', () => {
    for (const id of ['idle', 'think', 'point', 'shrug', 'present', 'type', 'walkA', 'walkB', 'celebrate', 'facepalm', 'armsCrossed', 'hold', 'sit'])
      expect(POSE_IDS).toContain(id)
  })
})

describe('mixPose', () => {
  const a = POSES.idle, b = POSES.point
  test('t=0 is a, t=1 is b', () => {
    expect(mixPose(a, b, 0)).toEqual(a)
    expect(mixPose(a, b, 1)).toEqual(b)
  })
  test('angles blend linearly', () => {
    expect(mixPose(a, b, 0.5).r.sh).toBeCloseTo((a.r.sh + b.r.sh) / 2)
  })
  test('hand shape and expression switch at the halfway point', () => {
    expect(mixPose(POSES.idle, POSES.think, 0.49).r.hand).toBe('rest')
    expect(mixPose(POSES.idle, POSES.think, 0.5).r.hand).toBe('chin')
    expect(mixPose(POSES.idle, POSES.think, 0.5).expression).toBe(POSES.think.expression)
  })
})

describe('poseAt', () => {
  test('before the first key returns the first pose', () => {
    expect(poseAt(-5, 30, [[10, 'think'], [0, 'idle']])).toEqual(POSES.idle)
  })
  test('keys are sorted, and long after the last key the last pose is reached', () => {
    const p = poseAt(500, 30, [[60, 'point'], [0, 'idle'], [30, 'think']])
    expect(p.r.sh).toBeCloseTo(POSES.point.r.sh, 1)
    expect(p.r.hand).toBe('point')
  })
  test('empty track is refused', () => {
    expect(() => poseAt(0, 30, [])).toThrow(/empty/i)
  })
})

describe('handPosition', () => {
  test('idle right hand hangs at the right side below the shoulder', () => {
    const h = handPosition(POSES.idle, 'r')
    expect(h.x).toBeGreaterThan(60)
    expect(h.y).toBeGreaterThan(-520)   // # below the shoulders (origin = feet, up = negative)
  })
  test('pointing hand reaches far to the right', () => {
    expect(handPosition(POSES.point, 'r').x).toBeGreaterThan(300)
  })
  test('thinking hand is near the chin', () => {
    const h = handPosition(POSES.think, 'r')
    expect(Math.abs(h.x)).toBeLessThan(60)
    expect(h.y).toBeLessThan(handPosition(POSES.idle, 'r').y - 250)
  })
})
