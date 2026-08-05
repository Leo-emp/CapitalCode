// # Timing constants and enforcement for scene durations
// # All values in frames at 30fps unless noted otherwise

import { FPS } from '@/remotion/design/animations'

// # Hard timing constraints — every scene plan must respect these
export const TIMING_RULES = {
  // # No scene shorter than 2.5 seconds (75 frames)
  minSceneDuration: 75,

  // # No scene longer than 25 seconds (750 frames)
  maxSceneDuration: 750,

  // # Hold time for big stat reveals — 2 seconds (60 frames)
  statRevealHold: 60,

  // # Minimum chart drawing animation — 1.5 seconds (45 frames)
  chartDrawMin: 45,

  // # Scene-to-scene transition overlay — 0.5 seconds (15 frames)
  transitionDuration: 15,

  // # Minimum gap between dense SFX cues — 0.2 seconds (6 frames)
  breathingRoom: 6,

  // # Variety enforcement — no more than 2 consecutive same scene type
  maxConsecutiveSameType: 2,

  // # Variety enforcement — no more than 2 consecutive same transition
  maxConsecutiveSameTransition: 2,

  // # Hook segment hard cap — 5 seconds (150 frames)
  hookMaxDuration: 150,

  // # CTA segment hard cap — 4 seconds (120 frames)
  ctaMaxDuration: 120,
} as const

// # Clamp a duration to the allowed range
// # Respects segment-specific caps for hooks and CTAs
export function clampDuration(
  durationFrames: number,
  segmentType?: string
): number {
  // # Start with the global min/max
  let min = TIMING_RULES.minSceneDuration
  let max = TIMING_RULES.maxSceneDuration

  // # Hooks have a tighter max — they need to grab attention fast
  if (segmentType === 'hook') {
    max = TIMING_RULES.hookMaxDuration
  }

  // # CTAs have a tighter max — short and punchy
  if (segmentType === 'cta') {
    max = TIMING_RULES.ctaMaxDuration
  }

  // # Clamp: at least min, at most max
  return Math.max(min, Math.min(max, durationFrames))
}

// # Convert seconds to frames using the project's FPS constant
export function secondsToFrames(seconds: number): number {
  return Math.round(seconds * FPS)
}

// # Convert frames to seconds for human-readable output
export function framesToSeconds(frames: number): number {
  return Math.round((frames / FPS) * 100) / 100
}

// # Enforce timing rules on a single scene duration
// # Returns the fixed duration and a list of adjustments made
export function enforceTimingRules(
  durationFrames: number,
  segmentType: string
): { durationFrames: number; fixes: string[] } {
  const fixes: string[] = []

  // # Step 1: clamp to allowed range
  const clamped = clampDuration(durationFrames, segmentType)

  if (clamped !== durationFrames) {
    const direction = clamped > durationFrames ? 'extended' : 'trimmed'
    fixes.push(
      `${direction} ${segmentType} scene from ${framesToSeconds(durationFrames)}s to ${framesToSeconds(clamped)}s`
    )
  }

  return { durationFrames: clamped, fixes }
}
