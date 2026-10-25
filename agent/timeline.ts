// ============================================================
// TIMELINE — turns plan.json + words.json into frame ranges.
// Pure: every cue {sentence, word?, nth?} becomes an absolute frame,
// shots run back-to-back to the end of the voice, slide cues are
// padded so every item has one, SFX get times in seconds.
// ============================================================
import { cueFrame } from '../art/timing'
import { FPS } from '../art/tokens'
import type { Cue, PlanDoc, Shot, TimedWord } from './schema'
import { SLIDE_SPECS } from './slides'
import { VIGNETTES } from '../art/vignettes/registry'
import { cueMap, type CueMap } from '../art/diorama/cues'
import { findPiece } from '../art/diorama/registry'
import type { CaptionChunk } from './captions'
import '../art/diorama/pieces'

// # Seconds where a cue's word starts — searched only inside its own sentence
export const resolveCue = (words: TimedWord[], cue: Cue): number => {
  const inS = words.filter((w) => w.sid === cue.sentence)
  if (!inS.length) throw new Error(`sentence "${cue.sentence}" has no voiced words`)
  if (!cue.word) return inS[0].s
  try {
    return cueFrame(inS, cue.word, cue.nth ?? 1, 1000) / 1000
  } catch (e) {
    throw new Error(`${cue.sentence}: ${(e as Error).message}`)
  }
}

// # Cue → frame number, everywhere inside a shot
export type Resolved<T> = T extends Cue ? number : T extends (infer U)[] ? Resolved<U>[] : T extends object ? { [K in keyof T]: Resolved<T[K]> } : T
const isCue = (x: any): x is Cue => x && typeof x === 'object' && !Array.isArray(x) && typeof x.sentence === 'string' && Object.keys(x).every((k) => ['sentence', 'word', 'nth'].includes(k))
const mapCues = (x: any, f: (c: Cue) => number): any =>
  isCue(x) ? f(x) : Array.isArray(x) ? x.map((y) => mapCues(y, f)) : x && typeof x === 'object' ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, mapCues(v, f)])) : x

export const STAGGER = 12 // # frames between padded slide cues
export type TimedShot = { shot: Resolved<Shot>; from: number; to: number }
// # speech: [from, to] frames of each spoken sentence — characters talk-gesture inside these (living film §5)
export type Timeline = { fps: number; durationInFrames: number; shots: TimedShot[]; sfx: { name: string; t: number; volume: number }[]; speech?: [number, number][]; cues?: CueMap
  canvas?: 'wide' | 'tall'; captions?: CaptionChunk[] }

// # captions: word-by-word captions for a Short (seconds)
export const buildTimeline = (plan: PlanDoc, words: TimedWord[], duration: number, fps = FPS, captions?: CaptionChunk[]): Timeline => {
  const frame = (c: Cue) => Math.round(resolveCue(words, c) * fps)
  const total = Math.ceil(duration * fps)
  const starts = plan.shots.map((s, i) => (i === 0 ? 0 : frame(s.start)))
  const shots = plan.shots.map((s, i) => {
    const r = mapCues(s, frame)
    const spec = s.kind === 'slide' ? SLIDE_SPECS[s.slide] : s.kind === 'vignette' ? VIGNETTES.find((v) => v.id === s.vignette) : undefined
    if ((s.kind === 'slide' || s.kind === 'vignette') && spec) {
      const need = spec.items(s.data)
      const at: number[] = r.at.length ? r.at : [starts[i]]
      while (at.length < need) at.push(at[at.length - 1] + STAGGER)
      r.at = at
    }
    return { shot: r, from: starts[i], to: i + 1 < starts.length ? starts[i + 1] : total }
  })
  const sfx = (plan.sfx ?? []).map((x) => ({ name: x.name, t: +resolveCue(words, x.at).toFixed(3), volume: x.volume ?? 1 }))
  // # every named cue word as a frame, for diorama pieces; each piece adds its own sound effects
  const cues = cueMap(words, fps)
  for (const s of plan.shots) {
    if (s.kind !== 'piece') continue
    for (const [k, name, volume] of findPiece(s.piece)?.sfx ?? []) if (cues[k] !== undefined) sfx.push({ name, t: +(cues[k] / fps).toFixed(3), volume: volume ?? 1 })
  }
  const speech: [number, number][] = []
  for (const sid of [...new Set(words.map((w) => w.sid))]) {
    const ws = words.filter((w) => w.sid === sid)
    speech.push([Math.round(ws[0].s * fps), Math.round(ws[ws.length - 1].e * fps)])
  }
  return { fps, durationInFrames: total, shots, sfx, speech, cues, ...(plan.canvas === 'tall' ? { canvas: 'tall' as const } : {}), ...(captions ? { captions } : {}) }
}
