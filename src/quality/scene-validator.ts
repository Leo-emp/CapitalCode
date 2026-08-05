// # Scene plan validator — takes raw AI-generated scene directives
// # and fixes timing, variety, transitions, SFX density, and total duration
// # Returns a clean, render-ready scene plan

import { TIMING_RULES, clampDuration, framesToSeconds } from './timing-rules'
import { isValidSceneForSegment, pickSceneType } from './segment-scene-map'

// # A single scene directive in the render plan
export interface SceneDirective {
  sceneType: string             // # Which Remotion component to render
  segmentId: string             // # Links back to the script segment
  segmentType: string           // # hook | data | context | etc.
  startFrame: number            // # When this scene begins (absolute)
  durationFrames: number        // # How long this scene lasts
  transition: string            // # How to transition INTO this scene
  props: Record<string, any>   // # Component-specific props (chart data, text, etc.)
  sfxCues: Array<{ frame: number; type: string }>  // # Sound effects within this scene
  sourceCitation?: string       // # Data source attribution
}

// # Result of validation — includes the fixed plan and a log of what changed
export interface SceneValidationResult {
  valid: boolean       // # true if no fixes were needed
  fixes: string[]      // # Human-readable list of every adjustment made
  scenes: SceneDirective[]  // # The corrected scene plan
}

// # Ordered transition cycle for variety enforcement
// # When we detect 3+ consecutive same transition, we rotate to the next one
const TRANSITION_CYCLE = ['fade', 'wipe', 'zoom', 'morph', 'parallax'] as const

// # Maximum SFX density: 1 cue per this many frames (60 = 2 seconds)
const SFX_MIN_GAP = 60

// # How close total frames can be to audio length before we adjust (±30 frames = ±1 second)
const TOTAL_FRAME_TOLERANCE = 30

// # ── Fix 1: Clamp all scene durations to min/max ──────────────────────
function fixDurations(scenes: SceneDirective[]): string[] {
  const fixes: string[] = []

  for (const scene of scenes) {
    const clamped = clampDuration(scene.durationFrames, scene.segmentType)

    if (clamped !== scene.durationFrames) {
      const direction = clamped > scene.durationFrames ? 'extended' : 'trimmed'
      fixes.push(
        `${direction} scene ${scene.segmentId} (${scene.segmentType}) from ` +
        `${framesToSeconds(scene.durationFrames)}s to ${framesToSeconds(clamped)}s`
      )
      scene.durationFrames = clamped
    }
  }

  return fixes
}

// # ── Fix 2: Break up 3+ consecutive same scene type ──────────────────
// # When 3 scenes in a row use the same component, swap the middle one
// # to the next valid alternative for its segment type
function fixConsecutiveSceneTypes(scenes: SceneDirective[]): string[] {
  const fixes: string[] = []
  const maxRun = TIMING_RULES.maxConsecutiveSameType

  for (let i = maxRun; i < scenes.length; i++) {
    // # Check if the last (maxRun + 1) scenes all share the same type
    const window = scenes.slice(i - maxRun, i + 1)
    const allSame = window.every((s) => s.sceneType === window[0].sceneType)

    if (allSame) {
      // # Swap the current scene (index i) to break the run
      const recent = scenes.slice(Math.max(0, i - maxRun), i).map((s) => s.sceneType)
      const newType = pickSceneType(scenes[i].segmentType, recent)

      if (newType !== scenes[i].sceneType) {
        fixes.push(
          `swapped scene ${scenes[i].segmentId} from ${scenes[i].sceneType} to ${newType} ` +
          `(broke ${maxRun + 1}x consecutive ${scenes[i].sceneType})`
        )
        scenes[i].sceneType = newType
      }
    }
  }

  return fixes
}

// # ── Fix 3: Break up 3+ consecutive same transition ──────────────────
// # Rotates to the next transition in the cycle
function fixConsecutiveTransitions(scenes: SceneDirective[]): string[] {
  const fixes: string[] = []
  const maxRun = TIMING_RULES.maxConsecutiveSameTransition

  for (let i = maxRun; i < scenes.length; i++) {
    // # Check if the last (maxRun + 1) scenes all use the same transition
    const window = scenes.slice(i - maxRun, i + 1)
    const allSame = window.every((s) => s.transition === window[0].transition)

    if (allSame) {
      // # Find current transition in the cycle and rotate to next
      const currentIdx = TRANSITION_CYCLE.indexOf(
        scenes[i].transition as typeof TRANSITION_CYCLE[number]
      )
      // # If not in cycle, start from the beginning; otherwise advance by 1
      const nextIdx = currentIdx >= 0
        ? (currentIdx + 1) % TRANSITION_CYCLE.length
        : 0
      const newTransition = TRANSITION_CYCLE[nextIdx]

      fixes.push(
        `rotated transition on scene ${scenes[i].segmentId} from ` +
        `${scenes[i].transition} to ${newTransition} ` +
        `(broke ${maxRun + 1}x consecutive ${scenes[i].transition})`
      )
      scenes[i].transition = newTransition
    }
  }

  return fixes
}

// # ── Fix 4: Adjust total frames to match audio duration ──────────────
// # If total scene frames differ from audio by more than ±30, stretch/shrink the last scene
function fixTotalFrames(
  scenes: SceneDirective[],
  audioDurationFrames: number
): string[] {
  const fixes: string[] = []

  if (scenes.length === 0 || audioDurationFrames <= 0) return fixes

  // # Calculate current total
  const currentTotal = scenes.reduce((sum, s) => sum + s.durationFrames, 0)
  const diff = audioDurationFrames - currentTotal

  // # Only adjust if the difference exceeds tolerance
  if (Math.abs(diff) > TOTAL_FRAME_TOLERANCE) {
    const lastScene = scenes[scenes.length - 1]
    const newDuration = lastScene.durationFrames + diff

    // # Clamp the adjusted duration so it doesn't violate min/max
    const clamped = clampDuration(newDuration, lastScene.segmentType)

    if (clamped !== lastScene.durationFrames) {
      fixes.push(
        `adjusted last scene ${lastScene.segmentId} duration from ` +
        `${framesToSeconds(lastScene.durationFrames)}s to ${framesToSeconds(clamped)}s ` +
        `to match audio (${framesToSeconds(audioDurationFrames)}s total)`
      )
      lastScene.durationFrames = clamped
    }
  }

  return fixes
}

// # ── Fix 5: Cap SFX density ──────────────────────────────────────────
// # No more than 1 SFX cue per 60 frames (2 seconds) within a scene
function fixSfxDensity(scenes: SceneDirective[]): string[] {
  const fixes: string[] = []

  for (const scene of scenes) {
    if (scene.sfxCues.length <= 1) continue

    // # Sort cues by frame within this scene
    scene.sfxCues.sort((a, b) => a.frame - b.frame)

    // # Keep first cue, then only keep subsequent cues that are far enough apart
    const filtered: Array<{ frame: number; type: string }> = [scene.sfxCues[0]]

    for (let i = 1; i < scene.sfxCues.length; i++) {
      const lastKept = filtered[filtered.length - 1]
      if (scene.sfxCues[i].frame - lastKept.frame >= SFX_MIN_GAP) {
        filtered.push(scene.sfxCues[i])
      }
    }

    const removed = scene.sfxCues.length - filtered.length
    if (removed > 0) {
      fixes.push(
        `removed ${removed} SFX cue(s) from scene ${scene.segmentId} ` +
        `(density cap: 1 per ${framesToSeconds(SFX_MIN_GAP)}s)`
      )
      scene.sfxCues = filtered
    }
  }

  return fixes
}

// # ── Fix 6: Recalculate startFrames sequentially ─────────────────────
// # After all duration adjustments, ensure startFrames chain correctly
function recalculateStartFrames(scenes: SceneDirective[]): void {
  let currentFrame = 0

  for (const scene of scenes) {
    scene.startFrame = currentFrame
    currentFrame += scene.durationFrames
  }
}

// # ── Main validator entry point ──────────────────────────────────────
// # Takes a raw scene plan (from AI Director) and an audio duration,
// # applies all fixes in order, returns a clean plan ready to render
export function validateScenePlan(
  scenes: SceneDirective[],
  audioDurationFrames: number = 0
): SceneValidationResult {
  // # Deep clone so we don't mutate the caller's data
  const fixed: SceneDirective[] = scenes.map((s) => ({
    ...s,
    props: { ...s.props },
    sfxCues: s.sfxCues.map((c) => ({ ...c })),
  }))

  const allFixes: string[] = []

  // # Fix 1: clamp durations to allowed ranges
  allFixes.push(...fixDurations(fixed))

  // # Fix 2: break consecutive same scene types
  allFixes.push(...fixConsecutiveSceneTypes(fixed))

  // # Fix 3: break consecutive same transitions
  allFixes.push(...fixConsecutiveTransitions(fixed))

  // # Fix 4: adjust total frames to match audio length
  allFixes.push(...fixTotalFrames(fixed, audioDurationFrames))

  // # Fix 5: cap SFX density
  allFixes.push(...fixSfxDensity(fixed))

  // # Fix 6: recalculate start frames after all duration changes
  recalculateStartFrames(fixed)

  return {
    valid: allFixes.length === 0,
    fixes: allFixes,
    scenes: fixed,
  }
}
