// ============================================================
// FIT TEXT — the largest font size at which the words fit a box,
// wrapping on spaces. Reports overflow instead of silently
// spilling out (thumbnail words must stay readable).
// ============================================================

export type Measure = (text: string, size: number) => number
export type FitResult = { size: number; lines: string[]; overflow: boolean }

// # Bebas Neue width estimate (em per character) — no canvas needed
const NARROW = new Set([...'IJ1.,:;!|\'"'])
const WIDE = new Set([...'MW%&@'])
export const approxMeasure: Measure = (text, size) =>
  [...text].reduce((w, ch) => w + (ch === ' ' ? 0.22 : NARROW.has(ch) ? 0.2 : WIDE.has(ch) ? 0.58 : 0.42), 0) * size

// # Greedy word wrap at a given size
const wrap = (words: string[], size: number, maxW: number, measure: Measure): string[] | null => {
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    if (measure(w, size) > maxW) return null
    const next = cur ? `${cur} ${w}` : w
    if (measure(next, size) <= maxW) cur = next
    else { lines.push(cur); cur = w }
  }
  if (cur) lines.push(cur)
  return lines
}

export const fitText = (
  text: string, box: { w: number; h: number }, font: { min: number; max: number; lineHeight?: number }, measure: Measure = approxMeasure,
): FitResult => {
  const words = text.trim().split(/\s+/)
  const lh = font.lineHeight ?? 0.95
  for (let size = font.max; size >= font.min; size -= 2) {
    const lines = wrap(words, size, box.w, measure)
    if (lines && lines.length * size * lh <= box.h) return { size, lines, overflow: false }
  }
  // # Even the minimum size does not fit: one word per line, flagged
  return { size: font.min, lines: words, overflow: true }
}
