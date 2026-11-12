// ============================================================
// LONG THUMBNAIL — 1280×720, from the 2026-11-01 study of 48
// thumbnails by illustrated channels (Kurzgesagt, TED-Ed, Sprouts,
// Business Casual, Economics Explained):
//   · the WORDS say the topic or the point in plain language,
//     readable on their own (TED-Ed "THE BEST WAY TO USE A CREDIT
//     CARD", Sprouts "PRINTING MONEY") — never a fragment that only
//     makes sense after watching (owner rule r73)
//   · the PICTURE shows the topic itself, cut from the video's own
//     drawings (a frozen frame region), never a stock scene
//   · words + picture tell ONE story; 2–6 big words, one key word
//     in the accent colour; the emblem in the same corner
// Three styles:
//   panel  — TED-Ed: a flat colour panel left with big dark words,
//            the picture fills the right side
//   banner — Kurzgesagt: the picture fills the frame, huge white
//            words across the top on a dark fade
//   stack  — Business Casual / EE: the picture fills the frame,
//            two-tone words on dark tape strips at the left,
//            an optional cast close-up on the right
// ============================================================

import React from 'react'
import { AbsoluteFill } from 'remotion'
import { EpisodeFrame, type EpisodeTimeline } from '../episode/Episode'
import { GrainOverlay } from '../GrainOverlay'
import { Emblem } from '../logo/Emblem'
import { Actor } from '../rig/Actor'
import { type ExpressionId, type PoseId, POSES } from '../rig/pose'
import { fontFaces } from '../tokens'
import { fitText } from './fitText'

export type LongStyle = 'panel' | 'banner' | 'stack'
export type LongPanel = 'cream' | 'yellow' | 'sky' | 'coral'
export type Crop = { frame: number; x: number; y: number; w: number; h: number }
export type LongThumbProps = {
  timeline: EpisodeTimeline
  style: LongStyle
  words: string                     // # 2–6 words that state the point, e.g. "WHY GYMS WANT YOU TO SKIP"
  accent?: number[]                 // # indexes of the key word(s), drawn in the accent colour
  panel?: LongPanel                 // # the panel colour (style "panel")
  crop: Crop                        // # the picture: a region of one 1920×1080 video frame
  character?: { look?: string; pose: PoseId; expression: ExpressionId }
  width?: number
}

const PANELS: Record<LongPanel, { fill: string; ink: string; accent: string }> = {
  cream: { fill: '#F8EFDF', ink: '#16294A', accent: '#D9483A' },
  yellow: { fill: '#FFD95A', ink: '#16294A', accent: '#C2361F' },
  sky: { fill: '#8FD8FF', ink: '#0E1B33', accent: '#C2361F' },
  coral: { fill: '#FF8A73', ink: '#0E1B33', accent: '#FFFFFF' },
}
const GOLD = '#F5C54B'

// # one frame region placed in a box at scale k, centred
const Frame: React.FC<{ tl: EpisodeTimeline; crop: Crop; box: { w: number; h: number }; k: number }> = ({ tl, crop, box, k }) => {
  const ox = (box.w - crop.w * k) / 2 - crop.x * k, oy = (box.h - crop.h * k) / 2 - crop.y * k
  return <div style={{ position: 'absolute', left: ox, top: oy, width: 1920, height: 1080, transform: `scale(${k})`, transformOrigin: '0 0' }}><EpisodeFrame timeline={tl} f={crop.frame} /></div>
}
// # the picture: COVER fills the box (no bars); CONTAIN keeps the whole region and sits on a soft blurred copy of
// # itself when the shapes differ, so the subject is never chopped in half
const Picture: React.FC<{ tl: EpisodeTimeline; crop: Crop; box: { x: number; y: number; w: number; h: number }; dim?: number; fit?: 'cover' | 'contain' }> = ({ tl, crop, box, dim = 0, fit = 'cover' }) => {
  const cover = Math.max(box.w / crop.w, box.h / crop.h), contain = Math.min(box.w / crop.w, box.h / crop.h)
  return (
    <div style={{ position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, overflow: 'hidden' }}>
      {fit === 'contain' ? <>
        <div style={{ position: 'absolute', inset: 0, filter: 'blur(28px) brightness(0.92)' }}><Frame tl={tl} crop={crop} box={box} k={cover} /></div>
        {/* # the sharp region, clipped to exactly the crop so nothing outside it shows */}
        <div style={{ position: 'absolute', left: (box.w - crop.w * contain) / 2, top: (box.h - crop.h * contain) / 2, width: crop.w * contain, height: crop.h * contain, overflow: 'hidden', boxShadow: '0 20px 60px rgba(5,7,12,0.35)' }}>
          <Frame tl={tl} crop={crop} box={{ w: crop.w * contain, h: crop.h * contain }} k={contain} />
        </div>
      </> :<Frame tl={tl} crop={crop} box={box} k={cover} />}
      {dim > 0 && <div style={{ position: 'absolute', inset: 0, background: `rgba(5,7,12,${dim})` }} />}
    </div>
  )
}

// # words fitted to a box; accent words coloured; outline + hard shadow when on a picture
const Words: React.FC<{ text: string; accent: number[]; box: { x: number; y: number; w: number; h: number }; ink: string; accentInk: string; outline?: boolean; align?: 'left' | 'center'; max?: number }> = ({
  text, accent, box, ink, accentInk, outline = false, align = 'left', max = 260,
}) => {
  const fit = fitText(text, { w: box.w, h: box.h }, { min: 80, max, lineHeight: 0.9 })
  let idx = 0
  return (
    <div data-overflow={fit.overflow ? 'yes' : 'no'} style={{ position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: align === 'center' ? 'center' : 'flex-start', fontFamily: 'Bebas Neue', fontSize: fit.size, lineHeight: 0.9, letterSpacing: '0.01em' }}>
      {fit.lines.map((line, li) => (
        <div key={li} style={{ whiteSpace: 'nowrap' }}>
          {line.split(' ').map((w, wi) => {
            const isAccent = accent.includes(idx++)
            return <span key={wi} style={{ color: isAccent ? accentInk : ink, marginRight: '0.16em',
              ...(outline ? { WebkitTextStroke: `${Math.round(fit.size * 0.07)}px #05070C`, paintOrder: 'stroke fill', textShadow: `0 ${Math.round(fit.size * 0.05)}px 0 #05070C` } : {}) }}>{w}</span>
          })}
        </div>
      ))}
    </div>
  )
}

// # tape strips (Business Casual / EE): each line of words on its own dark strip
const Tape: React.FC<{ text: string; accent: number[]; x: number; y: number; w: number; h: number }> = ({ text, accent, x, y, w, h }) => {
  const fit = fitText(text, { w: w - 60, h }, { min: 80, max: 210, lineHeight: 1.12 })
  let idx = 0
  return (
    <div data-overflow={fit.overflow ? 'yes' : 'no'} style={{ position: 'absolute', left: x, top: y, width: w, height: h, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: fit.size * 0.1 }}>
      {fit.lines.map((line, li) => (
        <div key={li} style={{ background: '#0B0F18', padding: `${fit.size * 0.02}px ${fit.size * 0.14}px`, transform: `rotate(${li % 2 ? 0.8 : -1.2}deg)`, boxShadow: '0 10px 0 rgba(0,0,0,0.35)',
          fontFamily: 'Bebas Neue', fontSize: fit.size, lineHeight: 1, whiteSpace: 'nowrap' }}>
          {line.split(' ').map((wd, wi) => { const a = accent.includes(idx++); return <span key={wi} style={{ color: a ? GOLD : '#FFFFFF', marginRight: '0.16em' }}>{wd}</span> })}
        </div>
      ))}
    </div>
  )
}

export const ThumbLong: React.FC<LongThumbProps> = ({ timeline, style, words, accent = [], panel = 'cream', crop, character, width = 1280 }) => {
  const S = width / 1920
  const tl: EpisodeTimeline = { ...timeline, captions: undefined }
  const pose = character ? { ...POSES[character.pose], expression: character.expression } : null
  const P = PANELS[panel]
  return (
    <AbsoluteFill style={{ background: '#05070C', overflow: 'hidden' }}>
      <style>{fontFaces()}</style>
      <div style={{ position: 'absolute', width: 1920, height: 1080, transform: `scale(${S})`, transformOrigin: '0 0', overflow: 'hidden' }}>
        {style === 'panel' && <>
          <Picture tl={tl} crop={crop} box={{ x: 820, y: 0, w: 1100, h: 1080 }} fit="contain" />
          <div style={{ position: 'absolute', left: 0, top: 0, width: 860, height: 1080, background: P.fill, boxShadow: '12px 0 0 #05070C' }} />
          <Words text={words} accent={accent} box={{ x: 70, y: 60, w: 740, h: 820 }} ink={P.ink} accentInk={P.accent} />
        </>}
        {style === 'banner' && <>
          <Picture tl={tl} crop={crop} box={{ x: 0, y: 0, w: 1920, h: 1080 }} />
          <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 520, background: 'linear-gradient(180deg, rgba(5,7,12,0.78) 0%, rgba(5,7,12,0.45) 60%, rgba(5,7,12,0) 100%)' }} />
          <Words text={words} accent={accent} box={{ x: 60, y: 24, w: 1800, h: 380 }} ink="#FFFFFF" accentInk={GOLD} outline align="center" max={240} />
        </>}
        {style === 'stack' && <>
          {/* # the picture owns the right side (never hidden under the words); the left is a deep brand panel */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, #1E3A63 0%, #0B1426 75%)' }} />
          <Picture tl={tl} crop={crop} box={{ x: pose ? 760 : 700, y: 0, w: pose ? 1160 : 1220, h: 1080 }} fit="contain" />
          <div style={{ position: 'absolute', left: pose ? 760 : 700, top: 0, width: 160, height: 1080, background: 'linear-gradient(90deg, #0B1426 0%, rgba(11,20,38,0) 100%)' }} />
          <Tape text={words} accent={accent} x={60} y={140} w={pose ? 760 : 720} h={800} />
          {pose && <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
            <Actor who={character!.look ?? 'hero'} pose={pose} x={1650} y={1540} scale={1.7} breathe={false} />
          </svg>}
        </>}
        <GrainOverlay frame={0} opacity={0.05} />
        {/* # the emblem: bottom-left, same place on every long thumbnail */}
        <div style={{ position: 'absolute', left: 40, bottom: 36, width: 130, height: 130, borderRadius: 18, background: 'rgba(5,7,12,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={98} height={96} overflow="visible"><Emblem size={98} /></svg>
        </div>
      </div>
    </AbsoluteFill>
  )
}
