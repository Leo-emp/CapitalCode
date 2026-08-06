// # Tests for TikTok uploader — caption building
import { describe, it, expect } from 'vitest'
import { buildTikTokCaption } from '../../src/uploaders/tiktok'

const mockVideo = {
  id: 'v1', topic: 'Why Gold Prices Are Surging', type: 'short_data_reveal' as const,
  status: 'approved' as const, template: 'ShortDataReveal', createdAt: 1000,
} as any

const mockScript = {
  id: 's1', videoId: 'v1', platform: 'tiktok', title: 'Gold Prices Are SURGING — Here\'s Why',
  hook: 'Gold just hit $3,000 per ounce.',
  body: 'body', wordCount: 150, estimatedDuration: 45,
  segments: JSON.stringify([{ type: 'hook', text: 'hook', duration: 3 }]),
  createdAt: 1000,
} as any

describe('buildTikTokCaption', () => {
  it('includes the video title', () => {
    const caption = buildTikTokCaption(mockVideo, mockScript)
    expect(caption).toContain('Gold Prices Are SURGING')
  })

  it('includes hashtags', () => {
    const caption = buildTikTokCaption(mockVideo, mockScript)
    expect(caption).toContain('#finance')
  })

  it('stays under 2200 char limit', () => {
    const caption = buildTikTokCaption(mockVideo, mockScript)
    expect(caption.length).toBeLessThanOrEqual(2200)
  })
})
