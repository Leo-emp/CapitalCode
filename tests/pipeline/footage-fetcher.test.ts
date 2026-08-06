// # Tests for stock footage fetcher — URL building, color grading, dedup

import { describe, it, expect } from 'vitest'
import {
  buildStoryblocksUrl,
  buildPexelsUrl,
  buildPixabayUrl,
  buildColorGradeArgs,
  deduplicateClips,
} from '../../src/pipeline/footage-fetcher'

describe('footage-fetcher', () => {
  it('buildStoryblocksUrl includes query and orientation', () => {
    const url = buildStoryblocksUrl('trading floor', 'landscape')
    // # Spaces converted to +
    expect(url).toContain('trading+floor')
    expect(url).toContain('landscape')
  })

  it('buildPexelsUrl includes query and orientation params', () => {
    const url = buildPexelsUrl('city skyline', 'landscape')
    expect(url).toContain('query=city+skyline')
    expect(url).toContain('orientation=landscape')
  })

  it('buildPixabayUrl includes query and video_type=film', () => {
    const url = buildPixabayUrl('stock market')
    expect(url).toContain('q=stock+market')
    expect(url).toContain('video_type=film')
  })

  it('buildColorGradeArgs includes brightness and scale filters', () => {
    const args = buildColorGradeArgs('/tmp/in.mp4', '/tmp/out.mp4', 1920, 1080)
    // # Should have a -vf flag
    expect(args).toContain('-vf')
    const vfIdx = args.indexOf('-vf')
    const filterStr = args[vfIdx + 1]
    // # Cinematic grade: darken + desaturate
    expect(filterStr).toContain('eq=brightness')
    // # Scale to target resolution
    expect(filterStr).toContain('scale=1920:1080')
  })

  it('buildColorGradeArgs includes duration when provided', () => {
    const args = buildColorGradeArgs('/tmp/in.mp4', '/tmp/out.mp4', 1920, 1080, 5)
    expect(args).toContain('-t')
    expect(args).toContain('5')
  })

  it('buildColorGradeArgs strips audio with -an', () => {
    const args = buildColorGradeArgs('/tmp/in.mp4', '/tmp/out.mp4', 1920, 1080)
    // # We don't want audio from stock footage
    expect(args).toContain('-an')
  })

  it('deduplicateClips removes already-used IDs', () => {
    const clips = [
      { id: '1', url: 'a.mp4' },
      { id: '2', url: 'b.mp4' },
      { id: '3', url: 'c.mp4' },
    ]
    const used = new Set(['2'])
    const result = deduplicateClips(clips, used)
    // # Clip 2 should be filtered out
    expect(result).toHaveLength(2)
    expect(result.map((c) => c.id)).not.toContain('2')
  })

  it('deduplicateClips returns empty when all are used', () => {
    const clips = [{ id: '1', url: 'a.mp4' }]
    const used = new Set(['1'])
    expect(deduplicateClips(clips, used)).toHaveLength(0)
  })

  it('deduplicateClips returns all when none are used', () => {
    const clips = [
      { id: '1', url: 'a.mp4' },
      { id: '2', url: 'b.mp4' },
    ]
    const used = new Set<string>()
    expect(deduplicateClips(clips, used)).toHaveLength(2)
  })
})
