// # Spring configs — all smooth, zero bounce (corporate/finance aesthetic)
// # Duration constants in frames at 30fps

export const springs = {
  smooth: { damping: 200, stiffness: 100, mass: 1 },    // # Default: corporate, subtle
  snappy: { damping: 20, stiffness: 200, mass: 0.5 },   // # Text reveals, UI elements
  elegant: { damping: 15, stiffness: 50, mass: 2 },     // # Slow cinematic reveals
} as const

export const durations = {
  textEntry: 12,           // # 400ms — text sliding/fading in
  chartDraw: 30,           // # 1000ms — line/bar chart drawing
  counterRoll: 45,         // # 1500ms — number counting animation
  sceneTransition: 15,     // # 500ms — between scenes
  staggerDelay: 3,         // # 100ms — between sibling elements
  citationFade: 8,         // # 267ms — source citation fade in/out
} as const

export const FPS = 30

// # Convert seconds to frames
export function secondsToFrames(s: number): number {
  return Math.round(s * FPS)
}

// # Convert milliseconds to frames
export function msToFrames(ms: number): number {
  return Math.round((ms / 1000) * FPS)
}

// # 3D perspective entry transform — tilted/scaled → flat/full-size
// # progress: 0→1 (spring output), tiltDeg: initial tilt angle
// # Returns a CSS transform string for perspective depth effect
export function transform3dEntry(progress: number, tiltDeg = -5): string {
  // # Tilt decreases to 0 as progress → 1
  const tilt = tiltDeg * (1 - progress)
  // # Scale from 85% to 100% as progress → 1
  const scale = 0.85 + 0.15 * progress
  return `perspective(1000px) rotateX(${tilt}deg) scale(${scale})`
}
