// ============================================================
// CAPTIONS — big word-by-word captions on a Short (1080×1920):
// 1–3 words at a time in a band just above YouTube's bottom
// controls, the spoken word in gold. White with a navy outline so
// they read on both moods (cream day, navy night).
// ============================================================
import React from 'react'
import type { CaptionChunk } from '../../agent/captions'

// # the caption band: clear of the bottom 420 px (YouTube title + buttons) and the right 140 px
export const CAPTION_BAND = { top: 1290, height: 200, left: 60, right: 160 }

// # Which caption card is up, and which of its words is being spoken (time in seconds)
export const captionAt = (caps: CaptionChunk[], t: number) => {
  const c = caps.find((x, i) => t >= x.s && t < Math.min(caps[i + 1]?.s ?? Infinity, x.e + 0.6))
  return c ? { card: c, word: c.words.findIndex((w) => t >= w.s && t < w.e) } : null
}

export const Captions: React.FC<{ caps: CaptionChunk[]; t: number }> = ({ caps, t }) => {
  const cap = captionAt(caps, t)
  if (!cap) return null
  // # each card pops in over 0.12 s
  const k = Math.min(1, (t - cap.card.s) / 0.12)
  return (
    <div style={{ position: 'absolute', top: CAPTION_BAND.top, height: CAPTION_BAND.height, left: CAPTION_BAND.left, right: CAPTION_BAND.right,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0 26px', textAlign: 'center',
      fontFamily: 'Bebas Neue', fontSize: 112, lineHeight: 1, letterSpacing: 1, transform: `scale(${0.92 + 0.08 * k})`, opacity: 0.4 + 0.6 * k }}>
      {cap.card.words.map((w, i) => (
        <span key={i} style={{ color: i === cap.word ? '#F2C14E' : '#FFFFFF', WebkitTextStroke: '10px #0E1B33', paintOrder: 'stroke fill',
          textShadow: '0 8px 22px rgba(14,27,51,0.45)', display: 'inline-block', transform: `scale(${i === cap.word ? 1.08 : 1})` }}>{w.text}</span>
      ))}
    </div>
  )
}
