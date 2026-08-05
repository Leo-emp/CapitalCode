import { describe, it, expect } from 'vitest'
import { validateScenePlan } from '@/quality/scene-validator'
import type { SceneDirective } from '@/quality/scene-validator'

// # Helper to create a minimal valid scene directive
function makeScene(overrides: Partial<SceneDirective> = {}): SceneDirective {
  return {
    sceneType: 'TextOverlay',
    segmentId: 'seg_1',
    segmentType: 'context',
    startFrame: 0,
    durationFrames: 150,       // # 5 seconds — comfortably within range
    transition: 'fade',
    props: {},
    sfxCues: [],
    sourceCitation: undefined,
    ...overrides,
  }
}

describe('validateScenePlan', () => {
  describe('duration clamping', () => {
    it('returns valid=true when no fixes needed', () => {
      const scenes = [makeScene()]
      const result = validateScenePlan(scenes)

      expect(result.valid).toBe(true)
      expect(result.fixes).toHaveLength(0)
      expect(result.scenes).toHaveLength(1)
    })

    it('clamps scenes shorter than 75 frames', () => {
      const scenes = [makeScene({ durationFrames: 30 })]
      const result = validateScenePlan(scenes)

      expect(result.scenes[0].durationFrames).toBe(75)
      expect(result.fixes.some((f) => f.includes('extended'))).toBe(true)
    })

    it('clamps scenes longer than 750 frames', () => {
      const scenes = [makeScene({ durationFrames: 900, segmentType: 'data' })]
      const result = validateScenePlan(scenes)

      expect(result.scenes[0].durationFrames).toBe(750)
      expect(result.fixes.some((f) => f.includes('trimmed'))).toBe(true)
    })

    it('enforces hook max of 150 frames', () => {
      const scenes = [makeScene({ durationFrames: 200, segmentType: 'hook' })]
      const result = validateScenePlan(scenes)

      expect(result.scenes[0].durationFrames).toBe(150)
    })

    it('enforces cta max of 120 frames', () => {
      const scenes = [makeScene({ durationFrames: 200, segmentType: 'cta' })]
      const result = validateScenePlan(scenes)

      expect(result.scenes[0].durationFrames).toBe(120)
    })
  })

  describe('consecutive scene type variety', () => {
    it('swaps 3rd consecutive same scene type', () => {
      // # Three TextOverlay in a row for context segments → should swap the 3rd
      const scenes = [
        makeScene({ segmentId: 'seg_1', sceneType: 'TextOverlay', segmentType: 'context' }),
        makeScene({ segmentId: 'seg_2', sceneType: 'TextOverlay', segmentType: 'context' }),
        makeScene({ segmentId: 'seg_3', sceneType: 'TextOverlay', segmentType: 'context' }),
      ]
      const result = validateScenePlan(scenes)

      // # At least one scene should have been swapped
      const sceneTypes = result.scenes.map((s) => s.sceneType)
      // # Check that we don't have 3 consecutive identical types
      for (let i = 2; i < sceneTypes.length; i++) {
        const allThreeSame = sceneTypes[i] === sceneTypes[i - 1] && sceneTypes[i - 1] === sceneTypes[i - 2]
        expect(allThreeSame, 'should not have 3 consecutive same scene type').toBe(false)
      }
      expect(result.fixes.some((f) => f.includes('swapped'))).toBe(true)
    })

    it('allows 2 consecutive same type', () => {
      const scenes = [
        makeScene({ segmentId: 'seg_1', sceneType: 'TextOverlay', segmentType: 'context' }),
        makeScene({ segmentId: 'seg_2', sceneType: 'TextOverlay', segmentType: 'context' }),
      ]
      const result = validateScenePlan(scenes)

      // # No scene type swap should happen
      expect(result.fixes.some((f) => f.includes('swapped'))).toBe(false)
    })
  })

  describe('consecutive transition variety', () => {
    it('rotates 3rd consecutive same transition', () => {
      // # Three fade transitions in a row → 3rd should become wipe
      const scenes = [
        makeScene({ segmentId: 'seg_1', transition: 'fade' }),
        makeScene({ segmentId: 'seg_2', transition: 'fade' }),
        makeScene({ segmentId: 'seg_3', transition: 'fade' }),
      ]
      const result = validateScenePlan(scenes)

      // # The 3rd scene should have been rotated from fade to wipe
      expect(result.scenes[2].transition).toBe('wipe')
      expect(result.fixes.some((f) => f.includes('rotated'))).toBe(true)
    })

    it('rotates through the full transition cycle', () => {
      // # 3 wipe in a row → should rotate to zoom (wipe→zoom in cycle)
      const scenes = [
        makeScene({ segmentId: 'seg_1', transition: 'wipe' }),
        makeScene({ segmentId: 'seg_2', transition: 'wipe' }),
        makeScene({ segmentId: 'seg_3', transition: 'wipe' }),
      ]
      const result = validateScenePlan(scenes)

      // # wipe → zoom in cycle: fade, wipe, zoom, morph, parallax
      expect(result.scenes[2].transition).toBe('zoom')
    })

    it('wraps around transition cycle', () => {
      // # 3 parallax in a row → should rotate to fade (wraps around)
      const scenes = [
        makeScene({ segmentId: 'seg_1', transition: 'parallax' }),
        makeScene({ segmentId: 'seg_2', transition: 'parallax' }),
        makeScene({ segmentId: 'seg_3', transition: 'parallax' }),
      ]
      const result = validateScenePlan(scenes)

      // # parallax is last in cycle → wraps to fade
      expect(result.scenes[2].transition).toBe('fade')
    })

    it('allows 2 consecutive same transition', () => {
      const scenes = [
        makeScene({ segmentId: 'seg_1', transition: 'fade' }),
        makeScene({ segmentId: 'seg_2', transition: 'fade' }),
      ]
      const result = validateScenePlan(scenes)

      expect(result.fixes.some((f) => f.includes('rotated'))).toBe(false)
    })
  })

  describe('total frames adjustment', () => {
    it('stretches last scene when plan is too short for audio', () => {
      // # Two scenes totaling 300 frames, audio is 500 frames → diff is 200 (>30 tolerance)
      const scenes = [
        makeScene({ segmentId: 'seg_1', durationFrames: 150 }),
        makeScene({ segmentId: 'seg_2', durationFrames: 150, segmentType: 'data' }),
      ]
      const result = validateScenePlan(scenes, 500)

      // # Last scene should be extended: 150 + 200 = 350
      expect(result.scenes[1].durationFrames).toBe(350)
      expect(result.fixes.some((f) => f.includes('adjusted last scene'))).toBe(true)
    })

    it('shrinks last scene when plan is too long for audio', () => {
      // # Two scenes totaling 600 frames, audio is 400 frames → diff is -200
      const scenes = [
        makeScene({ segmentId: 'seg_1', durationFrames: 300 }),
        makeScene({ segmentId: 'seg_2', durationFrames: 300, segmentType: 'data' }),
      ]
      const result = validateScenePlan(scenes, 400)

      // # Last scene: 300 + (-200) = 100, which is above min (75)
      expect(result.scenes[1].durationFrames).toBe(100)
    })

    it('skips adjustment when within ±30 frame tolerance', () => {
      const scenes = [makeScene({ durationFrames: 150 })]
      // # Audio is 165 frames → diff is 15, within ±30 tolerance
      const result = validateScenePlan(scenes, 165)

      expect(result.fixes.some((f) => f.includes('adjusted last scene'))).toBe(false)
    })

    it('respects min duration when shrinking last scene', () => {
      // # Total is 200, audio is 90 → wants to shrink last to 150 + (-110) = 40
      // # But min is 75, so it should clamp to 75
      const scenes = [
        makeScene({ segmentId: 'seg_1', durationFrames: 100 }),
        makeScene({ segmentId: 'seg_2', durationFrames: 100, segmentType: 'data' }),
      ]
      const result = validateScenePlan(scenes, 90)

      // # Last scene shrunk: 100 + (90-200) = -10 → clamped to 75
      expect(result.scenes[1].durationFrames).toBe(75)
    })
  })

  describe('SFX density capping', () => {
    it('removes SFX cues closer than 60 frames apart', () => {
      const scenes = [makeScene({
        sfxCues: [
          { frame: 0, type: 'tick' },
          { frame: 20, type: 'bass_hit' },  // # Only 20 frames after first — too close
          { frame: 40, type: 'whoosh' },     // # Only 40 frames after first — too close
          { frame: 80, type: 'tick' },       // # 80 frames after first, 60 after last kept → ok
        ],
      })]
      const result = validateScenePlan(scenes)

      // # Should keep frame 0 and frame 80 (60+ apart), remove frames 20 and 40
      expect(result.scenes[0].sfxCues).toHaveLength(2)
      expect(result.scenes[0].sfxCues[0].frame).toBe(0)
      expect(result.scenes[0].sfxCues[1].frame).toBe(80)
      expect(result.fixes.some((f) => f.includes('removed 2 SFX'))).toBe(true)
    })

    it('keeps all cues when properly spaced', () => {
      const scenes = [makeScene({
        sfxCues: [
          { frame: 0, type: 'tick' },
          { frame: 60, type: 'bass_hit' },   // # Exactly 60 frames apart — ok
          { frame: 120, type: 'whoosh' },     // # 60 frames after previous — ok
        ],
      })]
      const result = validateScenePlan(scenes)

      expect(result.scenes[0].sfxCues).toHaveLength(3)
      expect(result.fixes.some((f) => f.includes('SFX'))).toBe(false)
    })

    it('leaves single SFX cues alone', () => {
      const scenes = [makeScene({
        sfxCues: [{ frame: 10, type: 'tick' }],
      })]
      const result = validateScenePlan(scenes)

      expect(result.scenes[0].sfxCues).toHaveLength(1)
    })
  })

  describe('startFrame recalculation', () => {
    it('chains startFrames sequentially', () => {
      const scenes = [
        makeScene({ segmentId: 'seg_1', durationFrames: 100, startFrame: 999 }),
        makeScene({ segmentId: 'seg_2', durationFrames: 200, startFrame: 999 }),
        makeScene({ segmentId: 'seg_3', durationFrames: 150, startFrame: 999 }),
      ]
      const result = validateScenePlan(scenes)

      // # startFrames should be 0, 100, 300 regardless of input
      expect(result.scenes[0].startFrame).toBe(0)
      expect(result.scenes[1].startFrame).toBe(100)
      expect(result.scenes[2].startFrame).toBe(300)
    })
  })

  describe('does not mutate input', () => {
    it('returns new objects without modifying originals', () => {
      const original: SceneDirective = makeScene({ durationFrames: 30 })
      const originalDuration = original.durationFrames

      validateScenePlan([original])

      // # Original should be untouched
      expect(original.durationFrames).toBe(originalDuration)
    })
  })

  describe('empty input', () => {
    it('handles empty scene array', () => {
      const result = validateScenePlan([])

      expect(result.valid).toBe(true)
      expect(result.fixes).toHaveLength(0)
      expect(result.scenes).toHaveLength(0)
    })
  })
})
