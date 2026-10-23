// # Tests for the voice step: chapter caching, word→sentence mapping, offsets, stress, loudness
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import { duration, lufs, tone } from '../../agent/audio'
import { newJob } from '../../agent/jobs'
import type { ScriptDoc } from '../../agent/schema'
import { type Synth, stressFilter, voiceJob } from '../../agent/voice'

// # Fake Azure: 0.4 s per word, word events with text offsets, a quiet tone as audio
const fakeSynth = (calls: string[]): Synth => async (text, outWav) => {
  calls.push(text)
  const words: { w: string; s: number; e: number; offset: number }[] = []
  const re = /\S+/g
  let m: RegExpExecArray | null
  let t = 0.2
  while ((m = re.exec(text))) {
    const w = m[0].replace(/[.,!?;:]+$/, '')
    words.push({ w, s: t, e: t + 0.32, offset: m.index })
    t += 0.4
  }
  await tone(outWav, t + 0.2, -30)
  return { words }
}

const script = (): ScriptDoc => ({
  title: 't', area: 'business', format: 'explainer', thesis: 'Buyers pay for the future, not the past.',
  chapters: [
    { title: 'A', sentences: [{ id: 's1', text: 'Why would anyone pay a million?' }, { id: 's2', text: 'Buyers do not pay for the past.', stress: 'past' }] },
    { title: 'B', sentences: [{ id: 's3', text: 'They pay for what comes next.' }] },
  ],
})

const job = () => {
  const dir = newJob('voice test', { root: mkdtempSync(join(tmpdir(), 'ccvoice-')) })
  writeFileSync(join(dir, 'script.json'), JSON.stringify(script()))
  return dir
}

describe('voiceJob', () => {
  test('voices each chapter, maps every word to its sentence, offsets chapter 2 after chapter 1 + gap', async () => {
    const calls: string[] = []
    const dir = job()
    const r = await voiceJob(dir, { synth: fakeSynth(calls), gap: 0.6 })
    expect(calls.length).toBe(2)
    expect(r.words.map((w) => w.sid)).toEqual(['s1', 's1', 's1', 's1', 's1', 's1', 's2', 's2', 's2', 's2', 's2', 's2', 's2', 's3', 's3', 's3', 's3', 's3', 's3'])
    const ch1End = duration(join(dir, 'voice', r.chapters[0].file))
    const firstOf2 = r.words.find((w) => w.sid === 's3')!
    expect(firstOf2.s).toBeCloseTo(ch1End + 0.6 + 0.2, 1)
    expect(Math.abs(duration(join(dir, 'voice.wav')) - r.duration)).toBeLessThan(0.1)
  }, 120_000)

  test('a second run reuses cached chapters (never pays twice)', async () => {
    const dir = job()
    const calls: string[] = []
    await voiceJob(dir, { synth: fakeSynth(calls) })
    await voiceJob(dir, { synth: fakeSynth(calls) })
    expect(calls.length).toBe(2)
  }, 120_000)

  test('final voice is −14 LUFS ± 1', async () => {
    const dir = job()
    await voiceJob(dir, { synth: fakeSynth([]) })
    expect(Math.abs(lufs(join(dir, 'voice.wav')) + 14)).toBeLessThanOrEqual(1)
  }, 120_000)
})

test('stress filter lifts only the stressed words, with soft ramps', () => {
  const f = stressFilter([{ s: 1.0, e: 1.4 }, { s: 5.0, e: 5.3 }], 3)
  expect(f).toContain("between(t,1,1.4)")
  expect(f).toContain("between(t,5,5.3)")
  expect(f).toMatch(/volume=/)
})

void mkdirSync
