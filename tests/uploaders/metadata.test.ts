// # Tests for video metadata builder
import { describe, it, expect } from 'vitest'
import { buildYouTubeMetadata, buildShortMetadata } from '../../src/uploaders/metadata'

const mockVideo = {
  id: 'v1', topic: 'Federal Reserve Rate Decision', type: 'long_form' as const,
  status: 'approved' as const, template: 'Explainer', createdAt: 1000,
} as any

const mockScript = {
  id: 's1', videoId: 'v1', platform: 'youtube_long', title: 'Why The Fed Just Changed Everything',
  hook: 'The Federal Reserve just made a decision that affects every American.',
  body: 'Full script body here', wordCount: 800, estimatedDuration: 300,
  segments: JSON.stringify([
    { type: 'hook', text: 'hook text', duration: 5 },
    { type: 'context', text: 'context text', duration: 30 },
    { type: 'data', text: 'data text', duration: 45 },
    { type: 'insight', text: 'insight text', duration: 30 },
    { type: 'takeaway', text: 'takeaway text', duration: 20 },
    { type: 'cta', text: 'cta text', duration: 10 },
  ]),
  createdAt: 1000,
} as any

describe('buildYouTubeMetadata', () => {
  const meta = buildYouTubeMetadata(mockVideo, mockScript)

  it('uses script title', () => {
    expect(meta.title).toBe('Why The Fed Just Changed Everything')
  })

  it('includes hook in description', () => {
    expect(meta.description).toContain('The Federal Reserve just made a decision')
  })

  it('includes chapters', () => {
    expect(meta.chapters).toContain('00:00 Introduction')
    expect(meta.chapters).toContain('Background')
  })

  it('has finance-related tags', () => {
    expect(meta.tags).toContain('finance')
    expect(meta.tags).toContain('investing')
  })

  it('includes hashtags', () => {
    expect(meta.hashtags.length).toBeGreaterThan(0)
    expect(meta.hashtags[0]).toMatch(/^#/)
  })

  it('truncates title to 100 chars max', () => {
    const longScript = { ...mockScript, title: 'A'.repeat(150) } as any
    const longMeta = buildYouTubeMetadata(mockVideo, longScript)
    expect(longMeta.title.length).toBeLessThanOrEqual(100)
  })
})

describe('buildShortMetadata', () => {
  const meta = buildShortMetadata(mockVideo, mockScript)

  it('uses script title', () => {
    expect(meta.title).toBe('Why The Fed Just Changed Everything')
  })

  it('includes hashtags in description', () => {
    expect(meta.description).toContain('#finance')
  })

  it('has tags array', () => {
    expect(meta.tags.length).toBeGreaterThan(0)
  })
})
