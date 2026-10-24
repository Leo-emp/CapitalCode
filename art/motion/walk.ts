// ============================================================
// WALK — a character crossing the scene between spots (living
// film spec §5). Front-facing walk cycle with sideways travel.
// Pure functions of the absolute frame: a render cut into chunks
// at any frame gives the same position (no jump at a seam).
// ============================================================

import { mixPose, POSES, type Pose } from '../rig/pose'

type P = { x: number; y: number }
export type Leg = { at: number; to: P }
export type WalkState = { x: number; y: number; walking: boolean; facing: 1 | -1 }

// # Where the walker is at a frame. Each leg starts on its cue — or on arrival, if the previous leg
// # is still under way — and moves at `speed` px per frame in a straight line.
export const walkAt = (frame: number, start: P, legs: Leg[], speed = 6): WalkState => {
  let pos = { ...start }, t = -Infinity, facing: 1 | -1 = 1
  for (const leg of [...legs].sort((a, b) => a.at - b.at)) {
    const go = Math.max(leg.at, t)
    if (frame < go) break
    const dx = leg.to.x - pos.x, dy = leg.to.y - pos.y, dist = Math.hypot(dx, dy)
    const dur = dist / speed
    if (dx !== 0) facing = dx > 0 ? 1 : -1
    if (frame < go + dur) {
      const k = (frame - go) / dur
      return { x: pos.x + dx * k, y: pos.y + dy * k, walking: true, facing }
    }
    pos = { ...leg.to }; t = go + dur
  }
  return { ...pos, walking: false, facing }
}

// # The walk cycle: legs and arms swing between walkA and walkB, one step every 9 frames
export const walkPose = (frame: number): Pose => mixPose(POSES.walkA, POSES.walkB, 0.5 + 0.5 * Math.sin((Math.PI * frame) / 9))
