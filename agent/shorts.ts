// ============================================================
// SHORTS — turn a finished long video into 3–5 vertical Shorts:
//   pickClips      the strongest self-contained 30–58 s moments,
//                  each opening on a hook sentence (number, question,
//                  contrast, stressed word); never overlapping
//   sliceTimeline  the long video's timeline cut to one clip, every
//                  cue frame shifted (the art is reused, not redrawn)
//   captionChunks  big word-by-word captions: 1–3 words per card,
//                  the word being spoken highlighted
// ============================================================
import type { ScriptDoc, TimedWord } from './schema'
import type { Timeline } from './timeline'

export type SentenceInfo = { id: string; s: number; e: number; text: string; chapter: number; stress?: boolean; visual?: 'vignette' | 'slide' | 'scene' | 'other' }
export type Clip = { first: string; last: string; ids: string[]; t0: number; t1: number; score: number }

const CONTRAST = /\b(but|why|how|never|only|nobody|secret|mistake|lost|lose|record|bubble|risk|truth)\b/i
// # How strongly a sentence grabs attention as an opening line
export const hookScore = (s: SentenceInfo) =>
  (/\d/.test(s.text) ? 2 : 0) + (/\?/.test(s.text) ? 2 : 0) + (CONTRAST.test(s.text) ? 1.5 : 0) + (s.stress ? 1 : 0)

export const pickClips = (sents: SentenceInfo[], o: { n?: number; min?: number; max?: number; breath?: number; avoid?: [number, number][] } = {}): Clip[] => {
  const n = o.n ?? 3, min = o.min ?? 30, max = o.max ?? 58, breath = o.breath ?? 0.4
  const cands: Clip[] = []
  sents.forEach((first, i) => {
    const h = hookScore(first)
    if (h <= 0) return
    // # the fullest clip that still fits: more story, ends on a sentence boundary
    let j = i
    while (j + 1 < sents.length && sents[j + 1].e + breath - first.s <= max) j++
    const t1 = sents[j].e + breath
    if (t1 - first.s < min) return
    // # never across the brand card (or any other range to avoid)
    if ((o.avoid ?? []).some(([a, b]) => first.s < b && t1 > a)) return
    const body = sents.slice(i, j + 1)
    const score = 3 * h + body.reduce((a, s) => a + hookScore(s) + (s.visual === 'vignette' ? 0.5 : 0), 0) / body.length * 4
    cands.push({ first: first.id, last: sents[j].id, ids: body.map((s) => s.id), t0: first.s, t1, score: +score.toFixed(3) })
  })
  const chosen: Clip[] = []
  for (const c of cands.sort((a, b) => b.score - a.score)) {
    if (chosen.length >= n) break
    if (chosen.every((x) => c.t1 <= x.t0 || c.t0 >= x.t1)) chosen.push(c)
  }
  return chosen
}

// # Cue frames live under these keys in a resolved shot (start, at, track[].at, props[].at, slam.at)
const shiftCues = (x: any, d: number): any => {
  if (Array.isArray(x)) return x.map((y) => shiftCues(y, d))
  if (x && typeof x === 'object') return Object.fromEntries(Object.entries(x).map(([k, v]) =>
    [k, (k === 'at' || k === 'start') ? (typeof v === 'number' ? v - d : Array.isArray(v) ? v.map((y) => (typeof y === 'number' ? y - d : shiftCues(y, d))) : shiftCues(v, d)) : shiftCues(v, d)]))
  return x
}

export const sliceTimeline = (tl: Timeline, t0: number, t1: number): Timeline => {
  const f0 = Math.round(t0 * tl.fps), f1 = Math.round(t1 * tl.fps)
  const shots = tl.shots.filter((s) => s.to > f0 && s.from < f1).map((s) => ({
    shot: shiftCues(s.shot, f0), from: Math.max(s.from, f0) - f0, to: Math.min(s.to, f1) - f0,
  }))
  const sfx = tl.sfx.filter((x) => x.t >= t0 && x.t < t1).map((x) => ({ ...x, t: +(x.t - t0).toFixed(3) }))
  return { fps: tl.fps, durationInFrames: f1 - f0, shots, sfx }
}

export type CaptionWord = { text: string; s: number; e: number }
export type CaptionChunk = { s: number; e: number; words: CaptionWord[] }

// # 1–3 words per caption card, ≤ 18 characters, a new card after a pause; times relative to the clip start
export const captionChunks = (toks: CaptionWord[], t0: number, maxWords = 3, maxChars = 18): CaptionChunk[] => {
  const out: CaptionChunk[] = []
  let cur: CaptionWord[] = []
  const flush = () => { if (cur.length) out.push({ s: cur[0].s - t0, e: cur[cur.length - 1].e - t0, words: cur.map((w) => ({ ...w, s: w.s - t0, e: w.e - t0 })) }); cur = [] }
  for (const t of toks) {
    const text = [...cur, t].map((w) => w.text).join(' ')
    const pause = cur.length ? t.s - cur[cur.length - 1].e > 0.35 : false
    if (cur.length && (cur.length >= maxWords || text.length > maxChars || pause)) flush()
    cur.push(t)
  }
  flush()
  return out
}

// # Sentence list of a long job, with what is on screen when each sentence starts
export const sentenceInfo = (script: ScriptDoc, words: TimedWord[], tl: Timeline): SentenceInfo[] =>
  script.chapters.flatMap((c, ci) => c.sentences.map((s) => {
    const ws = words.filter((w) => w.sid === s.id)
    const t = ws[0]?.s ?? 0
    const shot = tl.shots.find((x) => x.from <= t * tl.fps && x.to > t * tl.fps)?.shot as { kind?: string } | undefined
    const kind = shot?.kind === 'vignette' || shot?.kind === 'slide' || shot?.kind === 'scene' ? shot.kind : 'other'
    return { id: s.id, s: t, e: ws[ws.length - 1]?.e ?? t, text: s.text, chapter: ci, stress: !!s.stress, visual: kind }
  }))

// # Headline for the top of the Short: the opening sentence if it fits, else its first words + "…"
export const hookFor = (text: string, max = 42) => {
  const t = text.trim()
  if (t.length <= max) return t
  let out = ''
  for (const w of t.split(/\s+/)) { if ((out ? out + ' ' + w : w).length + 1 > max) break; out = out ? out + ' ' + w : w }
  return out.replace(/[,;:]$/, '') + '…'
}
