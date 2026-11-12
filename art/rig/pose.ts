// ============================================================
// POSES — the character's joints as angles (degrees).
// Front view. A limb at angle 0 hangs straight down; a positive
// angle swings its end toward the viewer's LEFT (−x).
// `up`/`fo` (arms) and `up`/`lo` (legs) are length scales that fake
// a limb coming toward the camera (foreshortening).
// Pure functions only — no React — so the engine and tests share them.
// ============================================================

import { spring } from 'remotion'

export type HandShape = 'rest' | 'chin' | 'point' | 'fist' | 'open' | 'hold' | 'pocket' | 'thumb'
export type ExpressionId = 'neutral' | 'thinking' | 'shocked' | 'worried' | 'smiling' | 'smug' | 'angry'
export type ArmPose = { sh: number; el: number; up: number; fo: number; hand: HandShape }
export type LegPose = { hip: number; knee: number; up: number; lo: number }
export type Pose = { r: ArmPose; l: ArmPose; rl: LegPose; ll: LegPose; head: number; lean: number; bob: number; expression: ExpressionId }

// # Skeleton (neck-origin coordinates, same as the approved spike drawing)
export type Skeleton = typeof SKELETON
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
  think: { head: -4, lean: 0, bob: 0, expression: 'thinking', r: arm(22.8, 147, 'chin', 0.87, 0.94), l: arm(0, -93, 'fist', 0.88, 1.08), ...STAND },
  point: { head: 4, lean: 2, bob: 0, expression: 'neutral', r: arm(-86, -4, 'point'), l: arm(6, -4, 'rest'), ...STAND },
  shrug: { head: -8, lean: 0, bob: -4, expression: 'worried', r: arm(-30, -118, 'open', 0.95, 0.9), l: arm(30, 118, 'open', 0.95, 0.9), ...STAND },
  present: { head: 6, lean: 1, bob: 0, expression: 'smiling', r: arm(-25, -134, 'open', 1, 0.79), l: arm(6, -4, 'rest'), ...STAND },
  holdChest: { head: 3, lean: 0, bob: 0, expression: 'smiling', r: arm(-3.5, 113.5, 'hold', 1, 0.57), l: arm(8, -34.6, 'pocket', 1, 0.55), ...STAND },
  type: { head: 6, lean: 0, bob: 0, expression: 'neutral', r: arm(10, 62, 'rest', 0.9, 0.55), l: arm(-10, -62, 'rest', 0.9, 0.55), ...STAND },
  walkA: { head: 0, lean: 0, bob: -3, expression: 'neutral', r: arm(-10, -6, 'rest'), l: arm(-8, 6, 'rest'), rl: leg(-7, 16, 0.96, 0.92), ll: leg(5, -2) },
  walkB: { head: 0, lean: 0, bob: -3, expression: 'neutral', r: arm(8, -6, 'rest'), l: arm(10, 6, 'rest'), rl: leg(-5, 2), ll: leg(7, -16, 0.96, 0.92) },
  celebrate: { head: -6, lean: 0, bob: -16, expression: 'smiling', r: arm(-158, -12, 'fist'), l: arm(158, 12, 'fist'), rl: leg(-8, 4), ll: leg(8, -4) },
  facepalm: { head: 8, lean: 0, bob: 0, expression: 'worried', r: arm(30, 152, 'open', 0.85, 1.28), l: arm(6, -4, 'rest'), ...STAND },
  armsCrossed: { head: -3, lean: 0, bob: 0, expression: 'smug', r: arm(16, 104, 'fist', 0.85, 0.8), l: arm(-16, -104, 'fist', 0.85, 0.8), ...STAND },
  hold: { head: 4, lean: 0, bob: 0, expression: 'neutral', r: arm(-18, -72, 'hold', 0.92, 0.8), l: arm(6, -4, 'rest'), ...STAND },
  pockets: { head: 3, lean: 0, bob: 0, expression: 'smiling', r: arm(-8, 34.6, 'pocket', 1, 0.55), l: arm(8, -34.6, 'pocket', 1, 0.55), rl: leg(-4, 1), ll: leg(5, -1) },
  // # two-person moments: an arm out to shake hands; an open-hand talking gesture
  handshake: { head: 4, lean: 3, bob: 0, expression: 'smiling', r: arm(-62, -18, 'open', 1, 0.95), l: arm(6, -4, 'rest'), ...STAND },
  talk: { head: 5, lean: 1, bob: 0, expression: 'neutral', r: arm(-30, -88, 'open', 0.95, 0.8), l: arm(10, 30, 'rest', 1, 0.8), ...STAND },
  sit: { head: 2, lean: 0, bob: 0, expression: 'neutral', r: arm(4, -40, 'rest', 0.9, 0.75), l: arm(-4, 40, 'rest', 0.9, 0.75), rl: leg(-14, 14, 0.38, 1), ll: leg(14, -14, 0.38, 1) },
  // ---------------------------------------------------------- ACTING LIBRARY (owner 2026-10-29: "make our future videos more polished and alive")
  // # Pairs ending in A/B are two halves of a loop — play them with cyclePose() (running, clapping, waving, signing…)
  // # money actions
  signA: { head: 9, lean: 2, bob: 0, expression: 'neutral', r: arm(-4, 62, 'hold', 0.9, 0.55), l: arm(-4, -72, 'open', 0.9, 0.5), ...STAND },
  signB: { head: 9, lean: 2, bob: 0, expression: 'neutral', r: arm(-12, 52, 'hold', 0.9, 0.58), l: arm(-4, -72, 'open', 0.9, 0.5), ...STAND },
  countA: { head: 8, lean: 0, bob: 0, expression: 'neutral', r: arm(2, 98, 'hold', 0.85, 0.6), l: arm(-2, -98, 'hold', 0.85, 0.6), ...STAND },
  countB: { head: 8, lean: 0, bob: 0, expression: 'neutral', r: arm(-8, 84, 'hold', 0.85, 0.6), l: arm(-2, -98, 'hold', 0.85, 0.6), ...STAND },
  phone: { head: 9, lean: 0, bob: 0, expression: 'neutral', r: arm(2, 122, 'hold', 0.84, 0.66), l: arm(10, 40, 'rest', 0.95, 0.85), ...STAND },
  offer: { head: 5, lean: 3, bob: 0, expression: 'neutral', r: arm(-54, -30, 'hold', 1, 0.9), l: arm(6, -4, 'rest'), ...STAND },
  receive: { head: 6, lean: 0, bob: 0, expression: 'smiling', r: arm(-20, -40, 'open', 0.95, 0.7), l: arm(20, 40, 'open', 0.95, 0.7), ...STAND },
  hug: { head: 6, lean: 0, bob: 0, expression: 'smiling', r: arm(8, 108, 'open', 0.9, 0.74), l: arm(-8, -108, 'open', 0.9, 0.74), ...STAND },
  carry: { head: 4, lean: 0, bob: 0, expression: 'neutral', r: arm(-8, 74, 'hold', 0.88, 0.56), l: arm(8, -74, 'hold', 0.88, 0.56), ...STAND },
  carryHeavy: { head: 10, lean: 0, bob: 10, expression: 'worried', r: arm(-10, 66, 'hold', 0.9, 0.56), l: arm(10, -66, 'hold', 0.9, 0.56), rl: leg(-12, 18, 0.95, 0.95), ll: leg(12, -18, 0.95, 0.95) },
  nozzle: { head: 4, lean: 1, bob: 0, expression: 'neutral', r: arm(-58, -18, 'fist', 1, 0.92), l: arm(8, -6, 'rest'), ...STAND },
  drive: { head: 0, lean: 0, bob: 0, expression: 'smiling', r: arm(2, 96, 'fist', 0.82, 0.56), l: arm(-2, -96, 'fist', 0.82, 0.56), rl: leg(-14, 14, 0.38, 1), ll: leg(14, -14, 0.38, 1) },
  typeSit: { head: 6, lean: 0, bob: 0, expression: 'neutral', r: arm(10, 62, 'rest', 0.9, 0.55), l: arm(-10, -62, 'rest', 0.9, 0.55), rl: leg(-14, 14, 0.38, 1), ll: leg(14, -14, 0.38, 1) },
  read: { head: 7, lean: 0, bob: 0, expression: 'neutral', r: arm(-6, 106, 'hold', 0.85, 0.62), l: arm(6, -106, 'hold', 0.85, 0.62), ...STAND },
  emptyPockets: { head: 6, lean: 0, bob: 2, expression: 'worried', r: arm(-24, -36, 'open', 1, 0.62), l: arm(24, 36, 'open', 1, 0.62), ...STAND },
  reachDown: { head: 12, lean: 6, bob: 8, expression: 'neutral', r: arm(-22, -8, 'hold', 1, 1), l: arm(16, -6, 'rest'), rl: leg(-10, 22, 0.9, 0.9), ll: leg(8, -8) },
  // # feelings
  thumbsUp: { head: 4, lean: 0, bob: 0, expression: 'smiling', r: arm(-34, -118, 'thumb', 0.95, 0.85), l: arm(6, -4, 'rest'), ...STAND },
  fistPump: { head: -6, lean: 0, bob: -8, expression: 'smiling', r: arm(-152, -24, 'fist'), l: arm(14, 40, 'fist', 0.95, 0.8), ...STAND },
  shock: { head: -6, lean: 0, bob: -6, expression: 'shocked', r: arm(-34, -138, 'open', 0.92, 0.85), l: arm(34, 138, 'open', 0.92, 0.85), rl: leg(-6, 3), ll: leg(6, -3) },
  despair: { head: 12, lean: 0, bob: 6, expression: 'worried', r: arm(24, 150, 'open', 0.85, 1.12), l: arm(-24, -150, 'open', 0.85, 1.12), ...STAND },
  slump: { head: 14, lean: 0, bob: 10, expression: 'worried', r: arm(-2, 4, 'rest'), l: arm(2, -4, 'rest'), ...STAND },
  nervous: { head: 6, lean: 0, bob: 2, expression: 'worried', r: arm(14, 62, 'fist', 0.95, 0.6), l: arm(-14, -62, 'fist', 0.95, 0.6), rl: leg(-1, 1), ll: leg(1, -1) },
  oops: { head: 6, lean: 0, bob: 0, expression: 'shocked', r: arm(18, 148, 'open', 0.85, 1.14), l: arm(6, -4, 'rest'), ...STAND },
  angry: { head: 4, lean: 0, bob: 2, expression: 'angry', r: arm(-16, 14, 'fist'), l: arm(16, -14, 'fist'), rl: leg(-7, 2), ll: leg(7, -2) },
  confident: { head: -3, lean: 0, bob: 0, expression: 'smug', r: arm(-34, 72, 'fist', 1, 0.8), l: arm(34, -72, 'fist', 1, 0.8), rl: leg(-7, 2), ll: leg(7, -2) },
  scratchHead: { head: -6, lean: 0, bob: 0, expression: 'thinking', r: arm(-132, -104, 'open', 0.9, 0.86), l: arm(6, -4, 'rest'), ...STAND },
  lookFar: { head: -4, lean: 0, bob: 0, expression: 'thinking', r: arm(-118, -128, 'open', 0.86, 0.86), l: arm(6, -4, 'rest'), ...STAND },
  relief: { head: -10, lean: 0, bob: 2, expression: 'smiling', r: arm(10, 120, 'open', 0.85, 0.8), l: arm(6, -4, 'rest'), ...STAND },
  // # presenting and explaining
  pitch: { head: -5, lean: -2, bob: -2, expression: 'smug', r: arm(-128, -14, 'open', 1, 0.95), l: arm(14, 40, 'open', 0.95, 0.8), ...STAND },
  explain: { head: 4, lean: 0, bob: 0, expression: 'neutral', r: arm(-30, -40, 'open', 0.92, 0.7), l: arm(30, 40, 'open', 0.92, 0.7), ...STAND },
  measure: { head: 0, lean: 0, bob: 0, expression: 'neutral', r: arm(-82, -8, 'open'), l: arm(82, 8, 'open'), ...STAND },
  weighA: { head: 6, lean: 0, bob: 0, expression: 'thinking', r: arm(-34, -62, 'open', 0.92, 0.62), l: arm(34, 22, 'open', 0.92, 0.62), ...STAND },
  weighB: { head: -6, lean: 0, bob: 0, expression: 'thinking', r: arm(-34, -22, 'open', 0.92, 0.62), l: arm(34, 62, 'open', 0.92, 0.62), ...STAND },
  stop: { head: -2, lean: -1, bob: 0, expression: 'neutral', r: arm(-74, -62, 'open', 0.95, 0.8), l: arm(6, -4, 'rest'), ...STAND },
  // # "no": forearms crossed in an X in front of the chest; loop crossNoA ↔ crossNoB to shake the head (tilt only, front-facing)
  crossNoA: { head: -9, lean: 0, bob: 0, expression: 'neutral', r: arm(-40, 146, 'open', 1, 1.6), l: arm(40, -146, 'open', 1, 1.6), ...STAND },
  crossNoB: { head: 9, lean: 0, bob: 0, expression: 'neutral', r: arm(-40, 146, 'open', 1, 1.6), l: arm(40, -146, 'open', 1, 1.6), ...STAND },
  pointUp: { head: -8, lean: 0, bob: 0, expression: 'neutral', r: arm(-168, -4, 'point'), l: arm(6, -4, 'rest'), ...STAND },
  pointDown: { head: 10, lean: 0, bob: 0, expression: 'neutral', r: arm(-36, 6, 'point'), l: arm(6, -4, 'rest'), ...STAND },
  countOne: { head: 2, lean: 0, bob: 0, expression: 'neutral', r: arm(-30, -140, 'point', 0.95, 0.86), l: arm(6, -4, 'rest'), ...STAND },
  taDa: { head: -4, lean: 0, bob: -4, expression: 'smiling', r: arm(-62, -22, 'open'), l: arm(62, 22, 'open'), rl: leg(-8, 3), ll: leg(8, -3) },
  holdUp: { head: -8, lean: 0, bob: 0, expression: 'smiling', r: arm(-150, -60, 'hold', 0.95, 0.8), l: arm(150, 60, 'hold', 0.95, 0.8), ...STAND },
  // # moving
  runA: { head: 2, lean: 4, bob: -6, expression: 'neutral', r: arm(-32, -84, 'fist', 0.95, 0.8), l: arm(-22, 70, 'fist', 0.95, 0.8), rl: leg(-28, 46, 0.9, 0.86), ll: leg(18, -6) },
  runB: { head: 2, lean: 4, bob: -6, expression: 'neutral', r: arm(22, -70, 'fist', 0.95, 0.8), l: arm(32, 84, 'fist', 0.95, 0.8), rl: leg(-18, 6), ll: leg(28, -46, 0.9, 0.86) },
  jump: { head: -8, lean: 0, bob: -48, expression: 'smiling', r: arm(-142, -14, 'open'), l: arm(142, 14, 'open'), rl: leg(-18, 40, 0.82, 0.82), ll: leg(18, -40, 0.82, 0.82) },
  push: { head: 6, lean: -8, bob: 4, expression: 'angry', r: arm(-82, -26, 'open', 0.9, 0.74), l: arm(-64, -46, 'open', 0.9, 0.74), rl: leg(-4, 6), ll: leg(22, -10) },
  pull: { head: 4, lean: 8, bob: 4, expression: 'angry', r: arm(-70, -10, 'fist', 0.9, 0.85), l: arm(-80, -6, 'fist', 0.9, 0.85), rl: leg(-22, 10), ll: leg(4, -6) },
  reachUp: { head: -12, lean: 0, bob: -10, expression: 'neutral', r: arm(-172, -4, 'open'), l: arm(10, -10, 'rest'), rl: leg(-3, 1), ll: leg(3, -1) },
  // # everyday
  waveA: { head: 4, lean: 0, bob: 0, expression: 'smiling', r: arm(-120, -38, 'open', 0.95, 0.9), l: arm(6, -4, 'rest'), ...STAND },
  waveB: { head: 4, lean: 0, bob: 0, expression: 'smiling', r: arm(-104, -12, 'open', 0.95, 0.9), l: arm(6, -4, 'rest'), ...STAND },
  clapA: { head: 2, lean: 0, bob: 0, expression: 'smiling', r: arm(-14, 100, 'open', 0.88, 0.62), l: arm(14, -100, 'open', 0.88, 0.62), ...STAND },
  clapB: { head: 2, lean: 0, bob: -2, expression: 'smiling', r: arm(-2, 112, 'open', 0.88, 0.6), l: arm(2, -112, 'open', 0.88, 0.6), ...STAND },
  nodA: { head: 2, lean: 0, bob: 0, expression: 'smiling', r: arm(-6, 4, 'rest'), l: arm(6, -4, 'rest'), ...STAND },
  nodB: { head: 12, lean: 0, bob: 2, expression: 'smiling', r: arm(-6, 4, 'rest'), l: arm(6, -4, 'rest'), ...STAND },
  relax: { head: -4, lean: 0, bob: 0, expression: 'smiling', r: arm(-150, -112, 'open', 0.85, 0.9), l: arm(150, 112, 'open', 0.85, 0.9), rl: leg(-14, 14, 0.38, 1), ll: leg(14, -14, 0.38, 1) },
  leanBack: { head: -3, lean: 5, bob: 0, expression: 'smug', r: arm(16, 104, 'fist', 0.85, 0.8), l: arm(-16, -104, 'fist', 0.85, 0.8), rl: leg(4, -2), ll: leg(-12, 3) },
} satisfies Record<string, Pose>

export type PoseId = keyof typeof POSES
export const POSE_IDS = Object.keys(POSES) as PoseId[]

// # Engine-facing lookup: ids come from LLM-written plans, so fail loudly on typos
export const getPose = (id: string): Pose => {
  const p = (POSES as Record<string, Pose>)[id]
  if (!p) throw new Error(`unknown pose "${id}" (known: ${POSE_IDS.join(', ')})`)
  return p
}

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

// # A two-pose loop (run, clap, wave, sign, count, nod, weigh): eases A → B → A every `period` frames
export const cyclePose = (frame: number, a: PoseId, b: PoseId, period = 16, phase = 0): Pose => {
  const t = 0.5 - 0.5 * Math.cos(((frame + phase) / period) * Math.PI * 2)
  return mixPose(POSES[a], POSES[b], t)
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
export const footDrop = (p: Pose, S: Skeleton = SKELETON): number => {
  const end = (g: LegPose, hy: number) => hy + vec(g.hip, S.thigh * g.up).y + vec(g.hip + g.knee, S.shin * g.lo).y + S.foot
  return Math.max(end(p.rl, S.hipR.y), end(p.ll, S.hipL.y))
}

// # Centre of a hand, relative to the character origin (between the feet, y up = negative)
export const handPosition = (p: Pose, side: 'r' | 'l', S: Skeleton = SKELETON): { x: number; y: number } => {
  const a = side === 'r' ? p.r : p.l
  const sh = rotateAbout(side === 'r' ? S.shoulderR : S.shoulderL, S.hipCentre, p.lean)
  const ang = a.sh + p.lean
  const elbow = vec(ang, S.upperArm * a.up)
  const fore = vec(ang + a.el, S.foreArm * a.fo + S.handOffset)
  return { x: sh.x + elbow.x + fore.x, y: sh.y + elbow.y + fore.y - footDrop(p, S) + p.bob }
}
