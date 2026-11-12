// ============================================================
// SHORT THUMBNAIL — a 1080×1920 cover, from the 2026-10-30 study
// of illustrated channels' Shorts (Kurzgesagt's most-viewed covers
// are drawn covers, never video frames):
//   · a sticker title in the top third — key words huge, small
//     joining words small, a thick coloured ring around dark ink
//   · ONE stake object in the middle, cut from the Short's own art
//     (a frozen frame region, captions off) on a soft glow
//   · a cast close-up with a strong expression rising from below
//   · a plain saturated background, the emblem in the same place
// ============================================================

import React from 'react'
import { AbsoluteFill } from 'remotion'
import { EpisodeFrame, type EpisodeTimeline } from '../episode/Episode'
import { GrainOverlay } from '../GrainOverlay'
import { Emblem } from '../logo/Emblem'
import { Actor } from '../rig/Actor'
import { type ExpressionId, type PoseId, POSES } from '../rig/pose'
import { fontFaces } from '../tokens'

export const SHORT_W = 1080, SHORT_H = 1920

export type TitleLine = { t: string; size: 's' | 'm' | 'l'; accent?: boolean }
export type ShortBg = 'navy' | 'black' | 'gold' | 'cream'
export type ShortThumbProps = {
  timeline: EpisodeTimeline
  title: TitleLine[]                                      // # 2–4 lines, 2–6 words in all
  bg?: ShortBg
  crop?: { frame: number; x: number; y: number; w: number; h: number }   // # the stake object: a region of one video frame
  character?: { look?: string; pose: PoseId; expression: ExpressionId }
}

const BG: Record<ShortBg, { fill: string; glow: string; ring: string; accent: string }> = {
  navy: { fill: 'radial-gradient(ellipse at 50% 55%, #2B4A78 0%, #16294A 55%, #0B1426 100%)', glow: 'rgba(233,194,90,0.38)', ring: '#E9C25A', accent: '#E9C25A' },
  black: { fill: 'radial-gradient(ellipse at 50% 55%, #1C2433 0%, #07090E 70%)', glow: 'rgba(91,203,255,0.32)', ring: '#5BCBFF', accent: '#E9C25A' },
  gold: { fill: 'radial-gradient(ellipse at 50% 50%, #FFD978 0%, #E9C25A 50%, #B88A2E 100%)', glow: 'rgba(255,255,255,0.55)', ring: '#16294A', accent: '#F06B5B' },
  cream: { fill: 'radial-gradient(ellipse at 50% 50%, #FFF8E8 0%, #F2E6CC 60%, #DCC9A3 100%)', glow: 'rgba(233,194,90,0.45)', ring: '#16294A', accent: '#C94A3E' },
}
const SIZE = { s: 92, m: 150, l: 230 }

// # one sticker line: dark ink inside a thick coloured ring, with a drop shadow (the Kurzgesagt cover look, in our type)
const Sticker: React.FC<{ line: TitleLine; ring: string; accent: string }> = ({ line, ring, accent }) => {
  const px = SIZE[line.size]
  const ink = line.accent ? accent : '#FFFFFF'
  return (
    <div style={{ position: 'relative', fontFamily: 'Bebas Neue', fontSize: px, lineHeight: 0.9, whiteSpace: 'nowrap', textAlign: 'center' }}>
      {/* # outer ring, then the dark outline, then the fill */}
      <div style={{ position: 'absolute', inset: 0, color: ring, WebkitTextStroke: `${Math.round(px * 0.2)}px ${ring}`, filter: 'drop-shadow(0 12px 0 rgba(5,7,12,0.55))' }}>{line.t}</div>
      <div style={{ position: 'absolute', inset: 0, color: '#05070C', WebkitTextStroke: `${Math.round(px * 0.1)}px #05070C` }}>{line.t}</div>
      <div style={{ position: 'relative', color: ink }}>{line.t}</div>
    </div>
  )
}

export const ThumbShort: React.FC<ShortThumbProps> = ({ timeline, title, bg = 'navy', crop, character }) => {
  const b = BG[bg]
  const tl: EpisodeTimeline = { ...timeline, captions: undefined }
  // # the object block: a framed card up to 940 × 700, centred between the title and the close-up
  const k = crop ? Math.min(940 / crop.w, 600 / crop.h) : 1
  const ow = crop ? crop.w * k : 0, oh = crop ? crop.h * k : 0
  const oy = character ? 960 : 1080 // # the card ends ≥ 100 px above the close-up's hair
  const pose = character ? { ...POSES[character.pose], expression: character.expression } : null
  return (
    <AbsoluteFill style={{ background: b.fill, overflow: 'hidden' }}>
      <style>{fontFaces()}</style>
      {/* # the stake object on a glow */}
      {crop && <>
        <div style={{ position: 'absolute', left: 540 - 520, top: oy - 520, width: 1040, height: 1040, borderRadius: '50%', background: `radial-gradient(circle, ${b.glow} 0%, transparent 65%)` }} />
        {/* # a sticker card: the brand ring as its border, a deep shadow, a slight counter-tilt to the title */}
        <div style={{ position: 'absolute', left: 540 - ow / 2, top: oy - oh / 2, width: ow, height: oh, overflow: 'hidden', borderRadius: 40,
          border: `10px solid ${b.ring}`, boxShadow: '0 28px 70px rgba(5,7,12,0.55), 0 0 0 4px rgba(5,7,12,0.6)', transform: 'rotate(2deg)', boxSizing: 'content-box' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: SHORT_W, height: SHORT_H, transform: `scale(${k}) translate(${-crop.x}px, ${-crop.y}px)`, transformOrigin: '0 0' }}>
            <EpisodeFrame timeline={tl} f={crop.frame} />
          </div>
        </div>
      </>}
      {/* # the cast close-up rising from the bottom edge */}
      {pose && <svg width={SHORT_W} height={SHORT_H} style={{ position: 'absolute', inset: 0 }}>
        <Actor who={character!.look ?? 'hero'} pose={pose} x={540} y={2610} scale={2.15} breathe={false} />
      </svg>}
      {/* # the sticker title, top third */}
      <div style={{ position: 'absolute', left: 30, right: 30, top: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transform: 'rotate(-3deg)' }}>
        {title.map((line, i) => <Sticker key={i} line={line} ring={b.ring} accent={b.accent} />)}
      </div>
      <GrainOverlay frame={0} opacity={0.05} />
      {/* # the emblem: top-left, same place on every Short cover */}
      <div style={{ position: 'absolute', left: 40, top: 40, width: 96, height: 96, borderRadius: 16, background: 'rgba(5,7,12,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={74} height={72} overflow="visible"><Emblem size={74} /></svg>
      </div>
    </AbsoluteFill>
  )
}
