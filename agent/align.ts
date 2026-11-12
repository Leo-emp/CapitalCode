// ============================================================
// ALIGN — move every word's time to when it is REALLY heard in the
// finished voiceover (owner rule r27: nothing appears before it is
// spoken). Azure's word events drift up to ~1 s in fast lists of
// names; faster-whisper listens to voice.wav and we line its words
// up with ours (sequence alignment on normalised text). Words it
// did not hear the same way (e.g. "1926" vs "nineteen twenty-six")
// are placed between their heard neighbours.
// ============================================================
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { normaliseWord } from '../art/timing'
import { ROOT } from './paths'
import type { TimedWord } from './schema'

export type Heard = { w: string; s: number; e: number }
export type Aligner = (wav: string) => Heard[]

// # two spellings of the same spoken word? (exact, or a long shared start like "start-ups" / "startups")
const sameWord = (a: string, b: string) => !!a && !!b && (a === b || (a.length >= 4 && b.length >= 4 && (a.startsWith(b) || b.startsWith(a))))

// # Line our words up with the heard words; return our words with heard times where they match
// # maxShift: a heard time further than this from the synth's own time is a mishearing, not drift (drift measured ≤ ~1.2 s)
export const realign = (words: TimedWord[], heard: Heard[], maxShift = 2): { words: TimedWord[]; matched: number } => {
  const A = words.map((w) => normaliseWord(w.w)), B = heard.map((h) => normaliseWord(h.w))
  const n = A.length, m = B.length
  const same = (i: number, j: number) => sameWord(A[i], B[j]) && Math.abs(heard[j].s - words[i].s) <= maxShift
  // # longest common subsequence table (sizes are a few hundred words, so n×m is small)
  const L = Array.from({ length: n + 1 }, () => new Int32Array(m + 1))
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = same(i, j) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1])
  const hit: (Heard | null)[] = Array(n).fill(null)
  for (let i = 0, j = 0; i < n && j < m;) {
    if (same(i, j) && L[i][j] === L[i + 1][j + 1] + 1) { hit[i] = heard[j]; i++; j++ }
    else if (L[i + 1][j] >= L[i][j + 1]) i++
    else j++
  }
  // # unmatched words: spread across the gap between the heard neighbours, keeping their original proportions
  const out = words.map((w) => ({ ...w }))
  let k = 0
  while (k < n) {
    if (hit[k]) { out[k].s = hit[k]!.s; out[k].e = hit[k]!.e; k++; continue }
    let j = k
    while (j < n && !hit[j]) j++
    // # a gap at the very start or end has no heard word on one side: keep the synth's own times there
    if (k === 0 || j === n) { for (let i = k; i < j; i++) { out[i].s = words[i].s; out[i].e = words[i].e } k = j; continue }
    const lo = out[k - 1].e, hi = hit[j]!.s
    const a0 = words[k].s, a1 = words[j - 1].e, span = Math.max(1e-6, a1 - a0)
    for (let i = k; i < j; i++) {
      out[i].s = lo + ((words[i].s - a0) / span) * (hi - lo)
      out[i].e = lo + ((words[i].e - a0) / span) * (hi - lo)
    }
    k = j
  }
  // # times only ever move forward, 3 decimals like the rest of words.json
  for (let i = 0; i < n; i++) {
    if (i > 0 && out[i].s < out[i - 1].s) out[i].s = out[i - 1].s
    if (out[i].e < out[i].s) out[i].e = out[i].s
    out[i].s = +out[i].s.toFixed(3); out[i].e = +out[i].e.toFixed(3)
  }
  return { words: out, matched: hit.filter(Boolean).length }
}

// # The real listener: agent/align.py (faster-whisper small.en on the CPU)
export const whisperAligner: Aligner = (wav) => {
  const p = spawnSync('python', [join(ROOT, 'agent', 'align.py'), wav], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  if (p.status !== 0) throw new Error(`align: faster-whisper failed — ${(p.stderr || '').trim().split('\n').pop()}`)
  return JSON.parse(p.stdout.trim().split('\n').pop()!) as Heard[]
}

// # Where speech starts again after a pause (≥ 0.1 s under −35 dB), in seconds
export const speechOnsets = (wav: string): number[] => {
  const p = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', wav, '-af', 'silencedetect=noise=-35dB:d=0.1', '-f', 'null', '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  return [...(p.stderr || '').matchAll(/silence_end:\s*([\d.]+)/g)].map((m) => +m[1])
}

// # Fine-tune: each onset belongs to the word that starts closest to it (within 0.5 s); that word moves
// # to the onset only if this makes it LATER — a word may show a moment late, never before it is said
export const snapToOnsets = (words: TimedWord[], onsets: number[], reach = 0.5): TimedWord[] => {
  const out = words.map((w) => ({ ...w }))
  for (const t of onsets) {
    let best = -1
    for (let i = 0; i < out.length; i++) if (Math.abs(out[i].s - t) <= reach && (best < 0 || Math.abs(out[i].s - t) < Math.abs(out[best].s - t))) best = i
    if (best >= 0 && t > out[best].s && (best === out.length - 1 || t < out[best + 1].e)) {
      out[best].s = +t.toFixed(3)
      if (out[best].e < out[best].s) out[best].e = out[best].s
    }
  }
  for (let i = 1; i < out.length; i++) if (out[i].s < out[i - 1].s) out[i].s = out[i - 1].s
  return out
}
