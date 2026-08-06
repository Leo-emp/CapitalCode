// # Tests for background music mixer

import { describe, it, expect } from 'vitest'
import { buildMusicMixArgs, buildDuckingFilter } from '../../src/pipeline/music-mixer'

describe('music-mixer', () => {
  it('buildMusicMixArgs includes voice and music inputs', () => {
    const args = buildMusicMixArgs('/tmp/voice.mp3', '/tmp/music.mp3', '/tmp/out.mp3', 120)
    // # Both input files should be in the args
    expect(args).toContain('/tmp/voice.mp3')
    expect(args).toContain('/tmp/music.mp3')
  })

  it('buildMusicMixArgs includes filter_complex for mixing', () => {
    const args = buildMusicMixArgs('/tmp/voice.mp3', '/tmp/music.mp3', '/tmp/out.mp3', 120)
    expect(args.join(' ')).toContain('-filter_complex')
  })

  it('buildDuckingFilter sets music to -18dB (0.125 linear)', () => {
    const filter = buildDuckingFilter(120, [])
    // # -18dB ≈ 0.125 in linear scale
    expect(filter).toContain('volume=0.125')
  })

  it('buildMusicMixArgs limits output to voice duration', () => {
    const args = buildMusicMixArgs('/tmp/voice.mp3', '/tmp/music.mp3', '/tmp/out.mp3', 120)
    // # -t flag limits output duration
    expect(args).toContain('-t')
    expect(args).toContain('120')
  })

  it('buildMusicMixArgs includes overwrite flag', () => {
    const args = buildMusicMixArgs('/tmp/voice.mp3', '/tmp/music.mp3', '/tmp/out.mp3', 60)
    // # -y allows overwriting output file
    expect(args).toContain('-y')
  })

  it('buildMusicMixArgs has amix with duration=first', () => {
    const args = buildMusicMixArgs('/tmp/voice.mp3', '/tmp/music.mp3', '/tmp/out.mp3', 60)
    const filterStr = args[args.indexOf('-filter_complex') + 1]
    // # duration=first means music stops when voice ends
    expect(filterStr).toContain('duration=first')
  })
})
