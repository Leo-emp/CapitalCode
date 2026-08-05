import { describe, it, expect } from 'vitest'
import { buildFfmpegArgs, buildFfmpegCommand } from '@/pipeline/audio-processor'

describe('buildFfmpegArgs', () => {
  it('includes highpass filter at 80Hz', () => {
    const args = buildFfmpegArgs('/tmp/input.mp3', '/tmp/output.mp3')
    const filterArg = args.find((a) => a.includes('highpass'))
    expect(filterArg).toBeDefined()
    expect(filterArg).toContain('f=80')
  })

  it('includes compressor with -18dB threshold', () => {
    const args = buildFfmpegArgs('/tmp/input.mp3', '/tmp/output.mp3')
    const filterArg = args.find((a) => a.includes('acompressor'))
    expect(filterArg).toBeDefined()
    expect(filterArg).toContain('threshold=-18dB')
  })

  it('includes loudnorm at -16 LUFS', () => {
    const args = buildFfmpegArgs('/tmp/input.mp3', '/tmp/output.mp3')
    const filterArg = args.find((a) => a.includes('loudnorm'))
    expect(filterArg).toBeDefined()
    expect(filterArg).toContain('I=-16')
  })

  it('outputs at 48kHz 192k bitrate', () => {
    const args = buildFfmpegArgs('/tmp/input.mp3', '/tmp/output.mp3')
    expect(args).toContain('-ar')
    expect(args).toContain('48000')
    expect(args).toContain('-b:a')
    expect(args).toContain('192k')
  })

  it('sets input and output paths', () => {
    const args = buildFfmpegArgs('/tmp/input.mp3', '/tmp/output.mp3')
    expect(args[1]).toBe('/tmp/input.mp3')
    expect(args[args.length - 1]).toBe('/tmp/output.mp3')
  })

  it('includes de-ess EQ cut at 6kHz', () => {
    const args = buildFfmpegArgs('/tmp/in.mp3', '/tmp/out.mp3')
    const filterArg = args.find((a) => a.includes('6000'))
    expect(filterArg).toBeDefined()
    expect(filterArg).toContain('g=-2')
  })
})

describe('buildFfmpegCommand', () => {
  it('returns a complete command string', () => {
    const cmd = buildFfmpegCommand('/tmp/in.mp3', '/tmp/out.mp3')
    expect(cmd).toContain('ffmpeg')
    expect(cmd).toContain('/tmp/in.mp3')
    expect(cmd).toContain('/tmp/out.mp3')
  })
})
