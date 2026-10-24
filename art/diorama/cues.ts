// ============================================================
// CUE MAP — every spoken word as a frame number, by name, so a
// diorama piece can say "on s3:38 the towers rise". Keys:
//   "s3"          the sentence's first word
//   "s3:money"    the first time "money" is said in s3 (normalised)
//   "s3:money#2"  the second time
// Pure; the timeline builds it once and every piece reads it.
// ============================================================
import { normaliseWord } from '../timing'

export type CueMap = Record<string, number>

export const cueMap = (words: { w: string; s: number; sid: string }[], fps = 30): CueMap => {
  const m: CueMap = {}, seen: Record<string, number> = {}
  for (const w of words) {
    const fr = Math.round(w.s * fps)
    if (m[w.sid] === undefined) m[w.sid] = fr
    const k = `${w.sid}:${normaliseWord(w.w)}`
    const n = (seen[k] = (seen[k] ?? 0) + 1)
    if (n === 1) m[k] = fr
    m[`${k}#${n}`] = fr
  }
  return m
}

// # a cue reader that fails loudly (a missing cue is a planning bug, never "frame 0")
export const reader = (m: CueMap, who: string) => (k: string) => {
  const v = m[k]
  if (v === undefined) throw new Error(`${who}: no cue "${k}"`)
  return v
}
