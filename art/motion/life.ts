// ============================================================
// LIFE — what keeps a character from ever looking frozen
// (living film spec §5). Pure functions of the absolute frame, so a
// render cut into chunks looks exactly like one uncut render.
//   idleLife    blink, breathing, small head turns, weight sway
//   talkGesture flowing hand gestures while the voice is speaking
// Neither counts as a "visual event" (spec §12.1): they are life,
// not illustration. Cued actions in the plan always win.
// ============================================================

import { mixPose, poseAt, POSES, type ArmPose, type Pose, type PoseId } from '../rig/pose'

// # Seeded pseudo-random in [0, 1)
const rnd = (seed: number) => { const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }
// # 0→1 ease with zero speed at both ends (max slope 1.5)
const smooth = (t: number) => { const x = Math.max(0, Math.min(1, t)); return x * x * (3 - 2 * x) }

// ------------------------------------------------------------ idle life
// # Lid closing over the 5 frames of one blink (≥0.9 = closed for the middle 3)
const BLINK = [0.6, 1, 1, 1, 0.6]

export type Life = { blink: number; breath: number; headTurn: number; sway: number }

export const idleLife = (frame: number, seed: number): Life => {
  // # blink schedule: first one early, then every 120–200 frames
  let start = 40 + Math.floor(rnd(seed) * 80), k = 0, blink = 0
  while (start <= frame) {
    const o = frame - start
    if (o < BLINK.length) { blink = BLINK[o]; break }
    start += 120 + Math.floor(rnd(seed * 31 + k++) * 81)
  }
  const period = 50 + rnd(seed + 0.5) * 20
  return {
    blink,
    breath: Math.sin((2 * Math.PI * frame) / period + rnd(seed + 2) * 6.28),
    headTurn: 2.2 * Math.sin(frame / 53 + seed) + 1.2 * Math.sin(frame / 29 + seed * 2.3),
    sway: 3 * Math.sin(frame / 71 + seed * 1.7),
  }
}

// ------------------------------------------------------------ talk gestures
const arm = (sh: number, el: number, hand: ArmPose['hand'], up = 1, fo = 1): ArmPose => ({ sh, el, up, fo, hand })
// # Moderate gestures only — big swings (shrug, celebrate) are cued actions, not talk
const GESTURES: Pose[] = [
  { ...POSES.idle, head: 3, r: arm(-30, -88, 'open', 0.95, 0.8), l: arm(10, 30, 'rest', 1, 0.8) },     // # one hand explains
  { ...POSES.idle, head: -2, r: arm(-22, -70, 'open', 0.95, 0.85), l: arm(22, 70, 'open', 0.95, 0.85) }, // # both hands open
  { ...POSES.idle, head: 5, lean: 1, r: arm(-25, -100, 'open', 1, 0.8), l: arm(6, -4, 'rest') },       // # presenting
  { ...POSES.idle, head: -3, r: arm(-12, -40, 'rest', 0.95, 0.9), l: arm(16, 52, 'open', 0.95, 0.85) }, // # other hand
  { ...POSES.idle, head: 1 },                                                                         // # a beat of rest
]
const BLEND = 28 // # frames to flow from one gesture to the next

// # Which gesture is held in each beat of a spoken range (beats of 36–56 frames), never the same twice in a row
const gestureAt = (frame: number, range: [number, number], ri: number, seed: number): Pose => {
  let s = range[0], seg = 0, prev = GESTURES.length - 1, cur = prev
  for (;;) {
    let g = Math.floor(rnd(seed * 13 + ri * 7 + seg) * GESTURES.length)
    if (g === prev) g = (g + 1) % GESTURES.length
    cur = g
    const len = 36 + Math.floor(rnd(seed * 17 + ri * 5 + seg) * 21)
    if (frame < s + len) return mixPose(GESTURES[prev], GESTURES[cur], smooth((frame - s) / BLEND))
    s += len; prev = cur; seg++
  }
}

// # A gesture to mix into the actor's pose while a sentence is spoken (null when silent).
// # weight eases in/out over the first/last 12 frames of the spoken range.
export const talkGesture = (frame: number, speech: [number, number][], seed: number): { pose: Pose; weight: number } | null => {
  const ri = speech.findIndex(([s, e]) => frame >= s && frame < e)
  if (ri < 0) return null
  const [s, e] = speech[ri]
  const weight = smooth(Math.min((frame - s) / 12, (e - frame) / 12, 1))
  return { pose: gestureAt(frame, speech[ri], ri, seed), weight }
}

// # Poses a character can talk over (free arms); anything else is a cued action that stays as keyed
export const GESTURE_OK = new Set(['idle', 'talk', 'present', 'hold'])

// # The pose an actor actually shows: its keyed track (cued actions), with talk gestures mixed in at
// # 35% while the voice speaks — only over a free-arm pose and never within 8 frames of a key
export const actedPose = (frame: number, keys: [number, PoseId][], speech: [number, number][], seed: number, fps = 30): Pose => {
  const base = poseAt(frame, fps, keys)
  if (keys.some(([at]) => Math.abs(frame - at) <= 8)) return base
  const cur = [...keys].sort((a, b) => a[0] - b[0]).filter(([at]) => at <= frame).pop()?.[1] ?? keys[0][1]
  if (!GESTURE_OK.has(cur)) return base
  const g = talkGesture(frame, speech, seed)
  return g ? mixPose(base, g.pose, 0.35 * g.weight) : base
}
