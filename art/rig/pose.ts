// ============================================================
// POSES — the character's joints as angles (degrees).
// Front view. A limb at angle 0 hangs straight down; a positive
// angle swings its end toward the viewer's LEFT (−x).
// `up`/`fo` (arms) and `up`/`lo` (legs) are length scales that fake
// a limb coming toward the camera (foreshortening).
// Pure functions only — no React — so the engine and tests share them.
// ============================================================

import { spring } from 'remotion'

export type HandShape = 'rest' | 'chin' | 'point' | 'fist' | 'open' | 'hold'
export type ExpressionId = 'neutral' | 'thinking' | 'shocked' | 'worried' | 'smiling' | 'smug' | 'angry'
export type ArmPose = { sh: number; el: number; up: number; fo: number; hand: HandShape }
export type LegPose = { hip: number; knee: number; up: number; lo: number }
export type Pose = { r: ArmPose; l: ArmPose; rl: LegPose; ll: LegPose; head: number; lean: number; bob: number; expression: ExpressionId }

// # Skeleton (neck-origin coordinates, same as the approved spike drawing)
export const SKELETON = {
  shoulderR: { x: 90, y: 52 }, shoulderL: { x: -90, y: 52 },
  hipR: { x: 38, y: 262 }, hipL: { x: -38, y: 262 }, hipCentre: { x: 0, y: 262 },
  upperArm: 125, foreArm: 150, handOffset: 14,
  thigh: 140, shin: 140, foot: 14,
}

const arm = (sh: number, el: number, hand: HandShape, up = 1, fo = 1): ArmPose => ({ sh, el, up, fo, hand })
const leg = (hip = 0, knee = 0, up = 1, lo = 1): LegPose => ({ hip, knee, up, lo })
const STAND = { rl: leg(-3, 1), ll: leg(3, -1) }

export const POSES = {
  idle: { head: 0, lean: 0, bob: 0, expression: 'neutral', r: arm(-6, 4, 'rest'), l: arm(6, -4, 'rest'), ...STAND },
  think: { head: -4, lean: 0, bob: 0, expression: 'thinking', r: arm(22.8, 147, 'chin', 0.87, 1.22), l: arm(0, -93, 'fist', 0.88, 1.08), ...STAND },
  point: { head: 4, lean: 2, bob: 0, expression: 'neutral', r: arm(-86, -4, 'point'), l: arm(6, -4, 'rest'), ...STAND },
  shrug: { head: -8, lean: 0, bob: -4, expression: 'worried', r: arm(-30, -118, 'open', 0.95, 0.9), l: arm(30, 118, 'open', 0.95, 0.9), ...STAND },
  present: { head: 6, lean: 1, bob: 0, expression: 'smiling', r: arm(-58, -38, 'open'), l: arm(6, -4, 'rest'), ...STAND },
  type: { head: 6, lean: 0, bob: 0, expression: 'neutral', r: arm(10, 62, 'rest', 0.9, 0.55), l: arm(-10, -62, 'rest', 0.9, 0.55), ...STAND },
  walkA: { head: 0, lean: 0, bob: -3, expression: 'neutral', r: arm(-10, -6, 'rest'), l: arm(-8, 6, 'rest'), rl: leg(-7, 16, 0.96, 0.92), ll: leg(5, -2) },
  walkB: { head: 0, lean: 0, bob: -3, expression: 'neutral', r: arm(8, -6, 'rest'), l: arm(10, 6, 'rest'), rl: leg(-5, 2), ll: leg(7, -16, 0.96, 0.92) },
  celebrate: { head: -6, lean: 0, bob: -16, expression: 'smiling', r: arm(-158, -12, 'fist'), l: arm(158, 12, 'fist'), rl: leg(-8, 4), ll: leg(8, -4) },
  facepalm: { head: 8, lean: 0, bob: 0, expression: 'worried', r: arm(30, 152, 'open', 0.85, 1.28), l: arm(6, -4, 'rest'), ...STAND },
  armsCrossed: { head: -3, lean: 0, bob: 0, expression: 'smug', r: arm(16, 104, 'fist', 0.85, 0.8), l: arm(-16, -104, 'fist', 0.85, 0.8), ...STAND },
  hold: { head: 4, lean: 0, bob: 0, expression: 'neutral', r: arm(-18, -72, 'hold', 0.92, 0.8), l: arm(6, -4, 'rest'), ...STAND },
  sit: { head: 2, lean: 0, bob: 0, expression: 'neutral', r: arm(4, -40, 'rest', 0.9, 0.75), l: arm(-4, 40, 'rest', 0.9, 0.75), rl: leg(-14, 14, 0.38, 1), ll: leg(14, -14, 0.38, 1) },
} satisfies Record<string, Pose>

export type PoseId = keyof typeof POSES
export const POSE_IDS = Object.keys(POSES) as PoseId[]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const mixArm = (a: ArmPose, b: ArmPose, t: number): ArmPose => ({
  sh: lerp(a.sh, b.sh, t), el: lerp(a.el, b.el, t), up: lerp(a.up, b.up, t), fo: lerp(a.fo, b.fo, t), hand: t < 0.5 ? a.hand : b.hand,
})
const mixLeg = (a: LegPose, b: LegPose, t: number): LegPose => ({
  hip: lerp(a.hip, b.hip, t), knee: lerp(a.knee, b.knee, t), up: lerp(a.up, b.up, t), lo: lerp(a.lo, b.lo, t),
})

// # Blend two poses; discrete parts (hand shape, expression) switch at halfway
export const mixPose = (a: Pose, b: Pose, t: number): Pose => {
  if (t <= 0) return a
  if (t >= 1) return b
  return {
    r: mixArm(a.r, b.r, t), l: mixArm(a.l, b.l, t), rl: mixLeg(a.rl, b.rl, t), ll: mixLeg(a.ll, b.ll, t),
    head: lerp(a.head, b.head, t), lean: lerp(a.lean, b.lean, t), bob: lerp(a.bob, b.bob, t),
    expression: t < 0.5 ? a.expression : b.expression,
  }
}

// # Pose track: [frame, poseId][] (any order). Springs from pose to pose on each key.
export const poseAt = (frame: number, fps: number, track: [number, PoseId][], config = { damping: 15, stiffness: 130 }): Pose => {
  if (track.length === 0) throw new Error('poseAt: empty pose track')
  const keys = [...track].sort((a, b) => a[0] - b[0])
  let cur: Pose = POSES[keys[0][1]]
  for (let i = 1; i < keys.length; i++) {
    const [at, id] = keys[i]
    if (frame < at) break
    cur = mixPose(cur, POSES[id], spring({ frame: frame - at, fps, config }))
  }
  return cur
}

// ------------------------------------------------------------
// FORWARD KINEMATICS — where the joints land (feet-origin coords)
// ------------------------------------------------------------
const vec = (deg: number, len: number) => {
  const r = (deg * Math.PI) / 180
  return { x: -len * Math.sin(r), y: len * Math.cos(r) }
}
const rotateAbout = (p: { x: number; y: number }, c: { x: number; y: number }, deg: number) => {
  const r = (deg * Math.PI) / 180, dx = p.x - c.x, dy = p.y - c.y
  return { x: c.x + dx * Math.cos(r) - dy * Math.sin(r), y: c.y + dx * Math.sin(r) + dy * Math.cos(r) }
}

// # Lowest foot below the neck → how far to shift so the feet stand on y = 0
export const footDrop = (p: Pose): number => {
  const S = SKELETON
  const end = (g: LegPose, hy: number) => hy + vec(g.hip, S.thigh * g.up).y + vec(g.hip + g.knee, S.shin * g.lo).y + S.foot
  return Math.max(end(p.rl, S.hipR.y), end(p.ll, S.hipL.y))
}

// # Centre of a hand, relative to the character origin (between the feet, y up = negative)
export const handPosition = (p: Pose, side: 'r' | 'l'): { x: number; y: number } => {
  const S = SKELETON
  const a = side === 'r' ? p.r : p.l
  const sh = rotateAbout(side === 'r' ? S.shoulderR : S.shoulderL, S.hipCentre, p.lean)
  const ang = a.sh + p.lean
  const elbow = vec(ang, S.upperArm * a.up)
  const fore = vec(ang + a.el, S.foreArm * a.fo + S.handOffset)
  return { x: sh.x + elbow.x + fore.x, y: sh.y + elbow.y + fore.y - footDrop(p) + p.bob }
}
