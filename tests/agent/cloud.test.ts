// # Cloud render: target choice, GitHub part split, Lambda sizing, the pool helper
import { describe, expect, test } from 'vitest'
import { framesPerLambda, GH_MAX_PARTS, GH_MIN_PART, ghParts, pickTarget, pool } from '../../agent/cloud'

describe('pickTarget', () => {
  test('flag beats env, env beats the laptop default', () => {
    expect(pickTarget([], {})).toBe('laptop')
    expect(pickTarget([], { CC_RENDER_ON: 'aws' })).toBe('aws')
    expect(pickTarget(['--on=github'], { CC_RENDER_ON: 'aws' })).toBe('github')
  })
  test('an unknown target is refused', () => {
    expect(() => pickTarget(['--on=azure'], {})).toThrow(/one of/)
  })
})

describe('ghParts', () => {
  const covers = (frames: number) => {
    const p = ghParts(frames)
    expect(p[0][0]).toBe(0)
    expect(p.at(-1)![1]).toBe(frames)
    for (let i = 1; i < p.length; i++) expect(p[i][0]).toBe(p[i - 1][1])
    return p
  }
  test('a Short runs on few runners, every frame exactly once', () => {
    expect(covers(3720).length).toBe(Math.floor(3720 / GH_MIN_PART))
  })
  test('a long video is capped at the runner limit', () => {
    expect(covers(15513).length).toBe(GH_MAX_PARTS)
  })
  test('a tiny video is one part', () => {
    expect(covers(300)).toEqual([[0, 300]])
  })
})

test('framesPerLambda keeps the lambda count under the cap and each lambda ≥ 20 frames', () => {
  expect(Math.ceil(15513 / framesPerLambda(15513, 150))).toBeLessThanOrEqual(150)
  expect(Math.ceil(15513 / framesPerLambda(15513, 9))).toBeLessThanOrEqual(9)
  expect(framesPerLambda(100, 150)).toBe(20)
})

test('pool never runs more than n at once and runs everything', async () => {
  let now = 0, peak = 0
  const seen: number[] = []
  await pool([1, 2, 3, 4, 5, 6, 7], 3, async (x) => { now++; peak = Math.max(peak, now); await new Promise((r) => setTimeout(r, 5)); seen.push(x); now-- })
  expect(peak).toBe(3)
  expect(seen.sort()).toEqual([1, 2, 3, 4, 5, 6, 7])
})
