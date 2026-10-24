// ============================================================
// SHORT — the vertical 1080×1920 cut of a long video (or a
// standalone Short). Same art and timeline as the Episode, laid out
// for a phone:
//   top     hook line (the reason to keep watching), big type
//   middle  the 16:9 shot REFRAMED into a 1080×1080 box — scenes fill
//           it centred on their people/props, vignettes zoom a little,
//           slides fit the width so no text is cut off
//   bottom  big word-by-word captions, the spoken word in champagne
//   end     "Full video on CapitalCode" card for the last ~2.5 s
// ============================================================
import React from 'react'
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from 'remotion'
import { GrainOverlay } from '../GrainOverlay'
import { Emblem } from '../logo/Emblem'
import { getScene } from '../scenes/registry'
import { COLORS, fontFaces, FPS, PANEL_BG } from '../tokens'
import { EpisodeFrame, type EpisodeTimeline } from './Episode'

export const SW = 1080, SH = 1920
const BOX = { x: 0, y: 380, w: 1080, h: 1080 }

export type ShortCaption = { s: number; e: number; words: { text: string; s: number; e: number }[] }
export type ShortProps = { timeline: EpisodeTimeline; captions: ShortCaption[]; hook: string; voice?: string; endCard?: string }

const clampN = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

// # How the 1920×1080 frame sits in the content box for this shot (scale + offset in box pixels)
export const reframe = (shot: { kind: string; scene?: string; actors?: { anchor: string }[]; props?: { anchor: string }[] }, box = { w: BOX.w, h: BOX.h }) => {
  if (shot.kind === 'scene' && shot.scene) {
    const a = getScene(shot.scene).anchors
    // # centre on the people first (they carry the scene), then the props, else the scene's focus
    const xs = [...(shot.actors ?? []).map((x) => a[x.anchor]?.x), ...(shot.props ?? []).map((p) => a[p.anchor]?.x)].filter((v): v is number => typeof v === 'number')
    const people = (shot.actors ?? []).map((x) => a[x.anchor]?.x).filter((v): v is number => typeof v === 'number')
    const cx = people.length ? (Math.min(...people) + Math.max(...people)) / 2 + (xs.length > people.length ? 120 : 0) : (a.focus?.x ?? 960)
    const scale = box.h / 1080
    return { scale, x: clampN(box.w / 2 - cx * scale, box.w - 1920 * scale, 0), y: 0 }
  }
  // # a diorama piece is a full-width illustration: fit the width so nothing is cut off
  if (shot.kind === 'piece') {
    const scale = box.w / 1920
    return { scale, x: 0, y: (box.h - 1080 * scale) / 2 }
  }
  if (shot.kind === 'vignette' || shot.kind === 'chapter' || shot.kind === 'brand') {
    const scale = 0.75
    return { scale, x: (box.w - 1920 * scale) / 2, y: (box.h - 1080 * scale) / 2 }
  }
  // # slides: a slight zoom that still keeps the heading (x 150) and the right-most card (x 1770) in view
  const scale = 0.62
  return { scale, x: (box.w - 1920 * scale) / 2, y: (box.h - 1080 * scale) / 2 }
}

// # Which caption card is up, and which of its words is being spoken (time in seconds)
export const captionAt = (caps: ShortCaption[], t: number) => {
  const c = caps.find((x, i) => t >= x.s && t < (caps[i + 1]?.s ?? x.e + 0.6))
  return c ? { card: c, word: c.words.findIndex((w) => t >= w.s && t < w.e) } : null
}

export const Short: React.FC<ShortProps> = ({ timeline, captions, hook, voice, endCard = 'Full video on CapitalCode' }) => {
  const f = useCurrentFrame()
  const t = f / FPS
  const current = timeline.shots.find((x) => f >= x.from && f < x.to)?.shot as { kind: string } | undefined
  const r = reframe((current ?? { kind: 'slide' }) as never)
  const cap = captionAt(captions, t)
  const endAt = timeline.durationInFrames - Math.round(2.5 * FPS)
  const end = interpolate(f, [endAt, endAt + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const hookIn = interpolate(f, [0, 6], [0, 1], { extrapolateRight: 'clamp' })
  return (
    <AbsoluteFill style={{ background: PANEL_BG }}>
      <style>{fontFaces()}</style>
      {voice && <Audio src={staticFile(voice)} />}
      {/* # hook line: on screen from the first frame */}
      <div style={{ position: 'absolute', left: 60, right: 60, top: 120, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        fontFamily: 'Bebas Neue', fontSize: 104, lineHeight: 0.95, color: COLORS.champagneLight, opacity: hookIn, transform: `translateY(${(1 - hookIn) * 20}px)` }}>{hook}</div>
      {/* # the long video's shot, reframed into the square box */}
      <div style={{ position: 'absolute', left: BOX.x, top: BOX.y, width: BOX.w, height: BOX.h, overflow: 'hidden', borderRadius: 24, background: PANEL_BG }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(${r.x}px, ${r.y}px) scale(${r.scale})` }}>
          <EpisodeFrame timeline={timeline} f={f} />
        </div>
      </div>
      {/* # word-by-word captions */}
      {cap && end < 1 && (
        <div style={{ position: 'absolute', left: 40, right: 40, top: 1520, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22,
          fontFamily: 'Bebas Neue', fontSize: 118, letterSpacing: 1, textShadow: '0 6px 24px rgba(0,0,0,0.6)' }}>
          {cap.card.words.map((w, i) => (
            <span key={i} style={{ color: i === cap.word ? COLORS.champagne : '#FFFFFF', transform: `scale(${i === cap.word ? 1.08 : 1})` }}>{w.text}</span>
          ))}
        </div>
      )}
      {/* # end card */}
      {end > 0 && (
        <AbsoluteFill style={{ background: PANEL_BG, opacity: end, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 40 }}>
          <svg width={220} height={220}><Emblem size={220} /></svg>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 110, color: COLORS.champagneLight, textAlign: 'center', lineHeight: 1 }}>{endCard}</div>
        </AbsoluteFill>
      )}
      <svg width={64} height={64} style={{ position: 'absolute', left: 48, top: 40, opacity: 0.85 }}><Emblem size={64} /></svg>
      <GrainOverlay frame={f} />
    </AbsoluteFill>
  )
}
