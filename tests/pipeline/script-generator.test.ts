import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/gemini', () => ({
  geminiJson: vi.fn().mockResolvedValue({
    title: 'How Banks Make Billions',
    hook: 'Banks profit from a system most people ignore.',
    segments: [
      {
        id: 'seg_1',
        type: 'hook',
        text: 'Every time you deposit money, your bank starts making money off it.',
        duration_hint: 10,
        emphasis_words: ['deposit', 'money'],
        visual_hint: 'big_stat',
      },
      {
        id: 'seg_2',
        type: 'context',
        text: 'The Federal Reserve allows banks to lend out 90% of deposits.',
        duration_hint: 15,
        emphasis_words: ['90%'],
        visual_hint: 'chart',
        source_citation: 'Federal Reserve, 2025',
        data_needs: ['fed_funds_rate'],
      },
    ],
    cta: 'Subscribe for more.',
    tags: ['banking', 'finance'],
    word_count: 30,
    estimated_duration: 25,
  }),
}))

vi.mock('@/db/repo/videos', () => ({
  createScript: vi.fn().mockResolvedValue({ id: 'script_test' }),
}))

describe('generateScript', () => {
  beforeEach(() => vi.clearAllMocks())

  it('generates a structured script with normalized segments', async () => {
    const { generateScript } = await import('@/pipeline/script-generator')
    const script = await generateScript('How Banks Make Billions', 'youtube_long')

    expect(script.title).toBe('How Banks Make Billions')
    expect(script.segments).toHaveLength(2)
    expect(script.segments[0].emphasisWords).toEqual(['deposit', 'money'])
    expect(script.segments[0].visualHint).toBe('big_stat')
    expect(script.segments[1].dataNeeds).toEqual(['fed_funds_rate'])
    expect(script.segments[1].sourceCitation).toBe('Federal Reserve, 2025')
  })

  it('handles missing optional fields gracefully', async () => {
    const { geminiJson } = await import('@/lib/gemini')
    vi.mocked(geminiJson).mockResolvedValueOnce({
      title: 'Test',
      hook: 'Hook',
      segments: [{ text: 'Just text, no other fields' }],
      cta: 'Sub',
      tags: [],
    })

    const { generateScript } = await import('@/pipeline/script-generator')
    const script = await generateScript('test', 'tiktok')

    // # Missing fields should get safe defaults
    expect(script.segments[0].id).toBe('seg_1')
    expect(script.segments[0].type).toBe('context')
    expect(script.segments[0].emphasisWords).toEqual([])
    expect(script.segments[0].visualHint).toBe('text_overlay')
  })

  it('throws on empty segments array', async () => {
    const { geminiJson } = await import('@/lib/gemini')
    vi.mocked(geminiJson).mockResolvedValueOnce({
      title: 'Empty', hook: '', segments: [], cta: '', tags: [],
    })

    const { generateScript } = await import('@/pipeline/script-generator')
    await expect(generateScript('empty', 'youtube_long')).rejects.toThrow('0 segments')
  })
})

describe('scriptGeneratorStage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('generates one script for long_form, persists to DB', async () => {
    const { createScript } = await import('@/db/repo/videos')
    const { scriptGeneratorStage } = await import('@/pipeline/script-generator')

    const ctx = await scriptGeneratorStage({
      videoId: 'vid_1', topic: 'Banks', videoType: 'long_form',
    })

    expect(ctx.scripts).toHaveLength(1)
    expect(createScript).toHaveBeenCalledTimes(1)
    expect(ctx.primaryScript.title).toBe('How Banks Make Billions')
  })

  it('generates three scripts for short_explainer (tiktok + instagram + youtube_short)', async () => {
    const { createScript } = await import('@/db/repo/videos')
    const { scriptGeneratorStage } = await import('@/pipeline/script-generator')

    const ctx = await scriptGeneratorStage({
      videoId: 'vid_2', topic: 'Banks', videoType: 'short_explainer',
    })

    expect(ctx.scripts).toHaveLength(3)
    expect(createScript).toHaveBeenCalledTimes(3)
  })
})
