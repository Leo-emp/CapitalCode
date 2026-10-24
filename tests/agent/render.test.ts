// # Chunked resumable render: splitting, crash-resume via hash cache, frame-count validation, concat, audio mix
import { existsSync, mkdtempSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import { duration, ff, loudness, tone } from '../../agent/audio'
import { autoSfx, concatList, countFrames, mixAudio, renderChunks, splitChunks } from '../../agent/render'

// # A fake renderer: a solid-colour clip with exactly (to - from) frames at 30 fps
const fakeRender = (calls: string[], opts: { crashAt?: number; shortBy?: number } = {}) =>
  async (from: number, to: number, out: string) => {
    calls.push(`${from}-${to}`)
    if (opts.crashAt === from) throw new Error('simulated crash')
    const n = to - from - (opts.shortBy ?? 0)
    ff(['-f', 'lavfi', '-i', `color=c=gray:s=64x36:r=30`, '-frames:v', String(n), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', out])
  }

describe('splitChunks', () => {
  test('cuts at shot boundaries, never over the max, covering every frame', () => {
    const shots = [{ from: 0, to: 300 }, { from: 300, to: 700 }, { from: 700, to: 1000 }, { from: 1000, to: 1200 }]
    expect(splitChunks(shots, 1200, 900)).toEqual([{ from: 0, to: 700 }, { from: 700, to: 1200 }])
  })
  test('a single shot longer than the max is split inside', () => {
    expect(splitChunks([{ from: 0, to: 2000 }], 2000, 900)).toEqual([{ from: 0, to: 900 }, { from: 900, to: 1800 }, { from: 1800, to: 2000 }])
  })
})

describe('renderChunks', () => {
  const chunks = [{ from: 0, to: 30, key: 'a' }, { from: 30, to: 60, key: 'b' }, { from: 60, to: 90, key: 'c' }]

  test('after a crash, a re-run renders only the unfinished chunks', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'ccrender-'))
    const calls: string[] = []
    await expect(renderChunks(chunks, dir, fakeRender(calls, { crashAt: 30 }))).rejects.toThrow(/simulated crash/)
    expect(readdirSync(dir).filter((f) => f.endsWith('.part.mp4'))).toEqual([])
    const calls2: string[] = []
    const files = await renderChunks(chunks, dir, fakeRender(calls2))
    expect(calls2).toEqual(['30-60', '60-90'])
    expect(files.length).toBe(3)
  }, 120_000)

  test('a chunk with the wrong frame count is retried, then refused', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'ccrender-'))
    const calls: string[] = []
    await expect(renderChunks(chunks.slice(0, 1), dir, fakeRender(calls, { shortBy: 3 }), { retries: 2 })).rejects.toThrow(/27 frames, expected 30/)
    expect(calls.length).toBe(2)
  }, 120_000)

  test('concat list quotes paths safely and the joined video has every frame', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'ccrender-'))
    const files = await renderChunks(chunks, dir, fakeRender([]))
    expect(concatList(["C:\\a b\\it's.mp4"])).toBe("file 'C:/a b/it'\\''s.mp4'\n")
    const out = join(dir, 'video.mp4')
    const { concatVideos } = await import('../../agent/render')
    concatVideos(files, out)
    expect(countFrames(out)).toBe(90)
  }, 120_000)
})

describe('audio', () => {
  test('autoSfx adds a soft whoosh at each cut unless a planned sound is already there', () => {
    const tl = { fps: 30, durationInFrames: 900, shots: [{ from: 0, to: 300 }, { from: 300, to: 600 }, { from: 600, to: 900 }], sfx: [{ name: 'impact', t: 20.1, volume: 1 }] }
    expect(autoSfx(tl as any)).toEqual([{ name: 'impact', t: 20.1, volume: 1 }, { name: 'whoosh', t: 9.85, volume: 0.22 }])
  })

  test('mix = voice + delayed sfx, at −14 LUFS, as long as the video', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'ccmix-'))
    const voice = join(dir, 'voice.wav')
    await tone(voice, 6, -20)
    const out = join(dir, 'mix.wav')
    mixAudio(voice, [{ name: 'impact', t: 2, volume: 1 }, { name: 'whoosh', t: 4, volume: 0.5 }, { name: 'impact', t: 5, volume: 1 }], 7, out)
    expect(existsSync(out)).toBe(true)
    expect(Math.abs(duration(out) - 7)).toBeLessThan(0.05)
    const l = loudness(out)
    expect(Math.abs(l.lufs + 14)).toBeLessThanOrEqual(1)
    expect(l.peak).toBeLessThanOrEqual(-0.9)
  }, 120_000)
})
