// # Chunked resumable render: splitting, crash-resume via hash cache, frame-count validation, concat, audio mix
import { existsSync, mkdtempSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import { duration, ff, loudness, tone } from '../../agent/audio'
import { artFingerprint, autoSfx, chunkKeys, concatList, countFrames, freePort, mixAudio, pruneChunks, renderChunks, splitChunks } from '../../agent/render'
import { createServer } from 'node:net'

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

// # Two renders (or a render + a thumbnail) at once used to clash on a fixed port
test('freePort skips a port that is already taken', async () => {
  const busy = createServer()
  await new Promise<void>((r) => busy.listen(39177, '127.0.0.1', r))
  const p = await freePort(39177)
  expect(p).not.toBe(39177)
  expect(p).toBeGreaterThan(39177)
  busy.close()
})

// # Art-aware cache: fixing one scene's drawing re-renders only the chunks that show it
describe('chunk keys follow the art each chunk uses', () => {
  const shot = (from: number, to: number, scene: string, props: string[] = []) =>
    ({ from, to, shot: { id: `${scene}${from}`, kind: 'scene', scene, start: from, props: props.map((id) => ({ id, anchor: 'prop1', at: from })) } })
  const tl = { fps: 30, durationInFrames: 600, sfx: [], shots: [shot(0, 300, 'shop-street', ['cash-stack']), shot(300, 600, 'vault-room')] } as any
  const chunks = [{ from: 0, to: 280 }, { from: 340, to: 600 }] // # past the 0→300 shot's outgoing transition
  const fp = (over: Record<string, string> = {}, base = 'core1') => ({ base, idFile: { 'shop-street': 'street1', 'vault-room': 'street1', 'cash-stack': 'money1', ...over } })

  test('changing a file only re-keys chunks that use something from it', () => {
    const a = chunkKeys(tl, chunks, fp())
    const b = chunkKeys(tl, chunks, fp({ 'cash-stack': 'money2' }))
    expect(b[0].key).not.toBe(a[0].key)
    expect(b[1].key).toBe(a[1].key)
  })
  test('changing shared core code re-keys everything', () => {
    const a = chunkKeys(tl, chunks, fp())
    const b = chunkKeys(tl, chunks, fp({}, 'core2'))
    expect(b.map((c) => c.key)).not.toEqual(expect.arrayContaining([a[0].key, a[1].key]))
  })
  test('an id the fingerprint does not know is refused (never a stale cache)', () => {
    const t2 = { ...tl, shots: [shot(0, 600, 'mystery-scene')] }
    expect(() => chunkKeys(t2, [{ from: 0, to: 600 }], fp())).toThrow(/mystery-scene/)
  })
  test('the real art library maps every scene and prop id to its file', async () => {
    const { SCENES } = await import('../../art/scenes/registry')
    const { PROPS } = await import('../../art/props/registry')
    const f = artFingerprint()
    for (const s of SCENES) expect(f.idFile[s.id], s.id).toBeTruthy()
    for (const p of PROPS) expect(f.idFile[p.id], p.id).toBeTruthy()
    const { VIGNETTES } = await import('../../art/vignettes/registry')
    for (const v of VIGNETTES) expect(f.idFile[v.id], v.id).toBeTruthy()
    expect(f.base).toMatch(/^[0-9a-f]{12}$/)
  }, 30_000) // # loads the whole art library; slow under a parallel suite
})

// # Old chunks from earlier plan/art versions pile up (~1 GB a video); prune keeps only the current ones
test('pruneChunks deletes chunk files that are not in the current render', async () => {
  const { writeFileSync } = await import('node:fs')
  const d = mkdtempSync(join(tmpdir(), 'cc-'))
  for (const f of ['chunk_000000_000900_aaa.mp4', 'chunk_000000_000900_old.mp4', 'chunk_000900_001800_bbb.mp4', 'audio.wav']) writeFileSync(join(d, f), 'x')
  const removed = pruneChunks(d, [join(d, 'chunk_000000_000900_aaa.mp4'), join(d, 'chunk_000900_001800_bbb.mp4')])
  expect(removed).toEqual(['chunk_000000_000900_old.mp4'])
  expect(readdirSync(d).sort()).toEqual(['audio.wav', 'chunk_000000_000900_aaa.mp4', 'chunk_000900_001800_bbb.mp4'])
})
