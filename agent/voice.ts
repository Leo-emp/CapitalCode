// ============================================================
// VOICE — Azure Andrew HD per chapter (cached by content hash so a
// chapter is never paid for twice), word timings mapped to sentence
// ids by character offset, chapters joined with short pauses,
// natural stress (+3 dB on the few marked words), −14 LUFS.
// ============================================================
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, renameSync } from 'node:fs'
import { join } from 'node:path'
import { concatWavs, duration, normalize } from './audio'
import { readJson, writeJson } from './jobs'
import type { ScriptDoc, TimedWord } from './schema'

export const VOICE = 'en-US-Andrew:DragonHDLatestNeural'

// # A synthesiser writes `outWav` and returns word timings (seconds) with the
// # character offset of each word inside `text`
export type SynthWord = { w: string; s: number; e: number; offset: number }
export type Synth = (text: string, outWav: string) => Promise<{ words: SynthWord[] }>

const norm = (w: string) => w.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9'$%.]/g, '')

// # ffmpeg volume expression: +db on each window with 30 ms ramps
export const stressFilter = (windows: { s: number; e: number }[], db = 3): string => {
  if (!windows.length) return ''
  const k = (10 ** (db / 20) - 1).toFixed(4)
  const terms = windows.map(({ s, e }) => `between(t,${+s.toFixed(3)},${+e.toFixed(3)})*min(1,min((t-${+s.toFixed(3)})/0.03,(${+e.toFixed(3)}-t)/0.03))`)
  return `volume='1+${k}*(${terms.join('+')})':eval=frame`
}

export type VoiceResult = { words: TimedWord[]; chapters: { file: string; duration: number }[]; duration: number }

export const voiceJob = async (dir: string, opts: { synth: Synth; gap?: number; voice?: string }): Promise<VoiceResult> => {
  const gap = opts.gap ?? 0.6
  const script = readJson<ScriptDoc>(join(dir, 'script.json'))
  const vdir = join(dir, 'voice')
  mkdirSync(vdir, { recursive: true })

  const chapters: VoiceResult['chapters'] = []
  const all: TimedWord[] = []
  let t0 = 0
  for (const [ci, ch] of script.chapters.entries()) {
    // # chapter text + each sentence's character range
    let text = ''
    const ranges: { sid: string; a: number; b: number }[] = []
    for (const s of ch.sentences) {
      if (text) text += ' '
      ranges.push({ sid: s.id, a: text.length, b: text.length + s.text.length })
      text += s.text
    }
    const hash = createHash('sha256').update(`${opts.voice ?? VOICE}\n${text}`).digest('hex').slice(0, 16)
    const wav = `ch_${ci}_${hash}.wav`, meta = join(vdir, `ch_${ci}_${hash}.json`)
    let words: SynthWord[]
    if (existsSync(join(vdir, wav)) && existsSync(meta)) words = readJson<{ words: SynthWord[] }>(meta).words
    else {
      // # temp name keeps a .wav extension so ffmpeg-based synths can infer the format
      const part = join(vdir, wav.replace(/\.wav$/, '.part.wav'))
      const r = await opts.synth(text, part)
      // # rename only after success, so a crash never leaves a "cached" half file
      renameSync(part, join(vdir, wav))
      writeJson(meta, { text, words: r.words })
      words = r.words
    }
    const d = duration(join(vdir, wav))
    chapters.push({ file: wav, duration: d })
    for (const w of words) {
      const r = ranges.find((x) => w.offset >= x.a && w.offset < x.b) ?? ranges.reduce((p, x) => (w.offset >= x.a ? x : p), ranges[0])
      all.push({ w: w.w, s: +(w.s + t0).toFixed(3), e: +(w.e + t0).toFixed(3), sid: r.sid })
    }
    t0 += d + (ci < script.chapters.length - 1 ? gap : 0)
  }

  // # every sentence must have voiced words (catches offset mismatches)
  for (const s of script.chapters.flatMap((c) => c.sentences))
    if (!all.some((w) => w.sid === s.id)) throw new Error(`voice: no words mapped to sentence ${s.id} — word offsets do not match the text`)

  // # join chapters, then stress + loudness in one pass
  const raw = join(vdir, 'raw.wav')
  concatWavs(chapters.map((c) => join(vdir, c.file)), gap, raw)
  const windows = script.chapters.flatMap((c) => c.sentences).filter((s) => s.stress).flatMap((s) => {
    const hit = all.find((w) => w.sid === s.id && norm(w.w) === norm(s.stress!))
    return hit ? [{ s: hit.s, e: hit.e }] : []
  })
  normalize(raw, join(dir, 'voice.wav'), -14, stressFilter(windows))
  writeJson(join(dir, 'words.json'), all)
  return { words: all, chapters, duration: duration(join(dir, 'voice.wav')) }
}
