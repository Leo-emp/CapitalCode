// # Tests for YouTube uploader — metadata building, upload body
import { describe, it, expect } from 'vitest'
import { buildUploadBody } from '../../src/uploaders/youtube'

const mockVideo = {
  id: 'v1', topic: 'S&P 500 Analysis', type: 'long_form' as const,
  status: 'approved' as const, template: 'Explainer', createdAt: 1000,
} as any

const mockScript = {
  id: 's1', videoId: 'v1', platform: 'youtube_long', title: 'S&P 500 Just Hit a Record High',
  hook: 'The S&P 500 just broke all-time records.',
  body: 'body', wordCount: 500, estimatedDuration: 180,
  segments: JSON.stringify([{ type: 'hook', text: 'hook', duration: 5 }]),
  createdAt: 1000,
} as any

describe('buildUploadBody', () => {
  it('sets privacy to private for safety', () => {
    const body = buildUploadBody(mockVideo, mockScript, false)
    expect(body.status.privacyStatus).toBe('private')
  })

  it('marks as not made for kids', () => {
    const body = buildUploadBody(mockVideo, mockScript, false)
    expect(body.status.selfDeclaredMadeForKids).toBe(false)
  })

  it('includes title in snippet', () => {
    const body = buildUploadBody(mockVideo, mockScript, false)
    expect(body.snippet.title).toBe('S&P 500 Just Hit a Record High')
  })

  it('includes tags in snippet', () => {
    const body = buildUploadBody(mockVideo, mockScript, false)
    expect(body.snippet.tags.length).toBeGreaterThan(0)
    expect(body.snippet.tags).toContain('finance')
  })

  it('sets category to People & Blogs', () => {
    const body = buildUploadBody(mockVideo, mockScript, false)
    expect(body.snippet.categoryId).toBe('22')
  })

  it('works for short-form too', () => {
    const body = buildUploadBody(mockVideo, mockScript, true)
    expect(body.snippet.title).toBeDefined()
    expect(body.status.privacyStatus).toBe('private')
  })
})
