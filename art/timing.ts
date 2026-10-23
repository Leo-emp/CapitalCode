// ============================================================
// CUE TIMING
// Every animation that reacts to speech starts on a cue word.
// Word times come from the voice (Azure word-boundary events).
// ============================================================

import { FPS } from './tokens'

// # One spoken word: text + start/end time in seconds
export type Word = { w: string; s: number; e: number }

// # "Don't." / "don’t" / "DON'T" all become "don't"
export const normaliseWord = (w: string): string =>
  w.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9']/g, '').replace(/^'+|'+$/g, '')

// # Edit distance, used only to suggest the nearest words in errors
const distance = (a: string, b: string): number => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}

// # Frame where the nth occurrence of `word` starts.
// # Throws with the nearest spoken words instead of silently using frame 0.
export const cueFrame = (words: Word[], word: string, nth = 1, fps = FPS): number => {
  const want = normaliseWord(word)
  const hits = words.filter((x) => normaliseWord(x.w) === want)
  if (hits.length >= nth) return Math.round(hits[nth - 1].s * fps)
  if (hits.length > 0) throw new Error(`cue "${word}" #${nth} not found: "${want}" is spoken only ${hits.length} time(s)`)
  const near = [...new Set(words.map((x) => normaliseWord(x.w)))]
    .sort((a, b) => distance(want, a) - distance(want, b))
    .slice(0, 3)
  throw new Error(`cue "${word}" not found in the voice; nearest spoken words: ${near.join(', ')}`)
}
