import { describe, it, expect } from 'vitest'
import { buildDirectorPrompt, parseDirectorResponse, constrainSceneTypes } from '@/pipeline/ai-director'
import type { Segment } from '@/pipeline/script-generator'
import type { PacingData } from '@/pipeline/pacing-engine'

const mockSegments: Segment[] = [
  { id: 'seg_1', type: 'hook', text: 'Banks hold $1.8 trillion', durationHint: 5,
    emphasisWords: ['$1.8'], visualHint: 'big_stat' },
  { id: 'seg_2', type: 'context', text: 'Your savings earn almost nothing', durationHint: 10,
    emphasisWords: [], visualHint: 'text_overlay' },
  { id: 'seg_3', type: 'data', text: 'Net interest margin has risen 40%', durationHint: 10,
    emphasisWords: ['40%'], visualHint: 'chart', sourceCitation: 'Federal Reserve, 2024' },
]

const mockPacing: PacingData = {
  segments: [
    { segmentId: 'seg_1', words: [], pauses: [], punches: [], sfxCues: [] },
    { segmentId: 'seg_2', words: [], pauses: [], punches: [], sfxCues: [] },
    { segmentId: 'seg_3', words: [], pauses: [], punches: [], sfxCues: [] },
  ],
  totalFrames: 750,
}

describe('buildDirectorPrompt', () => {
  it('includes segment-scene map constraints', () => {
    const prompt = buildDirectorPrompt(mockSegments, mockPacing, 'landscape')
    expect(prompt).toContain('BigStatReveal')
    expect(prompt).toContain('ALLOWED scene types')
  })

  it('includes few-shot examples', () => {
    const prompt = buildDirectorPrompt(mockSegments, mockPacing, 'landscape')
    expect(prompt).toContain('EXAMPLE 1: LONG-FORM SCENE PLAN')
  })

  it('includes timing rules', () => {
    const prompt = buildDirectorPrompt(mockSegments, mockPacing, 'landscape')
    expect(prompt).toContain('75')
    expect(prompt).toContain('750')
  })

  it('includes aspect ratio', () => {
    const prompt = buildDirectorPrompt(mockSegments, mockPacing, 'portrait')
    expect(prompt).toContain('portrait')
    expect(prompt).toContain('1080×1920')
  })
})

describe('constrainSceneTypes', () => {
  it('replaces invalid scene types with allowed alternatives', () => {
    const rawScenes = [
      { sceneType: 'InvalidScene', segmentId: 'seg_1', segmentType: 'hook',
        startFrame: 0, durationFrames: 120, transition: 'fade', props: {}, sfxCues: [] },
    ]
    const constrained = constrainSceneTypes(rawScenes)
    // # Should pick first allowed for hook: BigStatReveal
    expect(['BigStatReveal', 'KineticTitle']).toContain(constrained[0].sceneType)
  })

  it('keeps valid scene types unchanged', () => {
    const rawScenes = [
      { sceneType: 'BigStatReveal', segmentId: 'seg_1', segmentType: 'hook',
        startFrame: 0, durationFrames: 120, transition: 'fade', props: {}, sfxCues: [] },
    ]
    const constrained = constrainSceneTypes(rawScenes)
    expect(constrained[0].sceneType).toBe('BigStatReveal')
  })
})

describe('parseDirectorResponse', () => {
  it('parses valid JSON response into scenes', () => {
    const raw = {
      scenes: [
        { scene_type: 'BigStatReveal', segment_id: 'seg_1', duration_frames: 120,
          transition: 'fade', props: { stat: '$1.8T' }, sfx_cues: [] },
      ],
      thumbnail: { stat: '$1.8T', line1: 'How Banks Profit', line2: 'From Your Deposits' },
    }
    const result = parseDirectorResponse(raw, mockSegments)
    expect(result.scenes).toHaveLength(1)
    expect(result.scenes[0].sceneType).toBe('BigStatReveal')
    expect(result.thumbnailProps.stat).toBe('$1.8T')
  })

  it('normalizes snake_case to camelCase', () => {
    const raw = {
      scenes: [
        { scene_type: 'TextOverlay', segment_id: 'seg_2', duration_frames: 200,
          transition: 'wipe', props: {}, sfx_cues: [{ frame: 10, type: 'tick' }],
          source_citation: 'FDIC' },
      ],
      thumbnail: { stat: 'X', line1: 'A', line2: 'B' },
    }
    const result = parseDirectorResponse(raw, mockSegments)
    expect(result.scenes[0].segmentId).toBe('seg_2')
    expect(result.scenes[0].durationFrames).toBe(200)
    expect(result.scenes[0].sfxCues[0].type).toBe('tick')
    expect(result.scenes[0].sourceCitation).toBe('FDIC')
  })

  it('pulls source citation from matched segment if missing', () => {
    const raw = {
      scenes: [
        { scene_type: 'LineChartDraw', segment_id: 'seg_3', duration_frames: 300,
          transition: 'morph', props: {}, sfx_cues: [] },
      ],
      thumbnail: { stat: '', line1: '', line2: '' },
    }
    const result = parseDirectorResponse(raw, mockSegments)
    expect(result.scenes[0].sourceCitation).toBe('Federal Reserve, 2024')
  })

  it('handles empty scenes array', () => {
    const raw = { scenes: [], thumbnail: { stat: '', line1: '', line2: '' } }
    const result = parseDirectorResponse(raw, mockSegments)
    expect(result.scenes).toHaveLength(0)
  })
})
