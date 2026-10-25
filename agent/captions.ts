// ============================================================
// CAPTIONS — big word-by-word captions for Shorts: 1–3 words per
// card, the word being spoken highlighted (times in seconds)
// ============================================================
export type CaptionWord = { text: string; s: number; e: number }
export type CaptionChunk = { s: number; e: number; words: CaptionWord[] }

// # 1–3 words per caption card, ≤ 18 characters, a new card after a pause; times relative to t0
export const captionChunks = (toks: CaptionWord[], t0 = 0, maxWords = 3, maxChars = 18): CaptionChunk[] => {
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
