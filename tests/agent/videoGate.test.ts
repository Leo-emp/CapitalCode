// # Video QA: duration, loudness, true peak, one-frame flicker scan (cuts excused), frame sheets
import { existsSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { expect, test } from 'vitest'
import { ff } from '../../agent/audio'
import { brightness, findFlicker, frameDiffs, gateVideo, frameSheets, shotFrames } from '../../agent/gates/video'

// # 4 s gray clip, a one-frame white flash at frame 30, a hard cut to blue at frame 75; a −14 LUFS-ish tone
const clip = (dir: string, flash = true) => {
  const out = join(dir, 'v.mp4')
  const v = `color=c=gray:s=320x180:r=30:d=4[a];color=c=white:s=320x180:r=30:d=4[w];color=c=blue:s=320x180:r=30:d=4[b];` +
    `[a][w]overlay=enable='${flash ? 'eq(n,30)' : '0'}'[aw];[aw][b]overlay=enable='gte(n,75)'[v]`
  ff(['-f', 'lavfi', '-i', 'nullsrc', '-f', 'lavfi', '-i', 'sine=f=440:d=4', '-filter_complex', `${v};[1:a]volume=-9dB[s]`, '-map', '[v]', '-map', '[s]',
    '-t', '4', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', out])
  return out
}

test('frameDiffs + findFlicker flag the one-frame flash, not the planned cut', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ccqa-'))
  const d = frameDiffs(clip(dir))
  expect(d.length).toBeGreaterThan(110)
  const flags = findFlicker(d, [75])
  expect(flags).toEqual([30])
}, 120_000)

test('no flash → no flags', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ccqa-'))
  expect(findFlicker(frameDiffs(clip(dir, false)), [75])).toEqual([])
}, 120_000)

test('gateVideo refuses a wrong duration and reports loudness; sheets are written', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ccqa-'))
  const file = clip(dir)
  const r = gateVideo(file, { expectSeconds: 6, cuts: [75], lufs: [-30, 0] })
  expect(r.ok).toBe(false)
  expect(r.problems.join('\n')).toMatch(/duration 4.0 s, expected 6.0/)
  expect(r.flags).toEqual([30])
  const sheets = frameSheets(file, join(dir, 'qa'), 1)
  expect(sheets.length).toBe(1)
  expect(existsSync(sheets[0])).toBe(true)
}, 120_000)

test('plannedMotion = every cut + every slam cue (scene slams and slam slides)', async () => {
  const { plannedMotion } = await import('../../agent/gates/video')
  const tl = { fps: 30, durationInFrames: 900, sfx: [], shots: [
    { from: 0, to: 300, shot: { kind: 'scene', slam: { words: [], at: [100, 120] } } },
    { from: 300, to: 600, shot: { kind: 'slide', slide: 'slam', at: [400, 410] } },
    { from: 600, to: 900, shot: { kind: 'slide', slide: 'bars', at: [650] } },
  ] }
  expect(plannedMotion(tl as any)).toEqual([100, 120, 300, 400, 410, 600])
})

// # The Critic sees every shot as built (one frame near the end of each shot, from the final video)
test('shotFrames writes one numbered frame per shot', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ccqa-'))
  const file = clip(dir)
  const files = shotFrames(file, { fps: 30, shots: [{ from: 0, to: 60 }, { from: 60, to: 120 }] }, join(dir, 'qa', 'shots'))
  expect(files.map((f) => basename(f))).toEqual(['shot_01.jpg', 'shot_02.jpg'])
  expect(files.every((f) => existsSync(f))).toBe(true)
}, 120_000)

// # Owner review: our video averaged 6.9% brightness vs 16% for the reference — measured, then enforced
test('brightness is measured and, when a band is given, enforced', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ccqa-'))
  const file = clip(dir, false)
  const b = brightness(file)
  expect(b).toBeGreaterThan(20)
  const r = gateVideo(file, { expectSeconds: 4, cuts: [75], lufs: [-60, 0], brightness: [12, 20] })
  expect(r.stats.brightness).toBeCloseTo(b, 0)
  expect(r.problems.join('\n')).toMatch(/brightness .* \(want 12–20%\)/)
}, 120_000)
