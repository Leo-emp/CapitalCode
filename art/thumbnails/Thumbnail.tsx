// ============================================================
// THUMBNAIL — rules from the 2026-10-23 study of 65 thumbnails:
// one big emotional subject, 2–4 huge words that add tension,
// one stake object, high contrast + rim glow, the emblem in the
// same corner every time. Drawn on a 1920×1080 canvas and scaled
// to the composition (1280×720 for YouTube).
// ============================================================

import React from 'react'
import { AbsoluteFill } from 'remotion'
import { Emblem } from '../logo/Emblem'
import { getProp } from '../props/registry'
import { Character } from '../rig/Character'
import { LOOKS } from '../rig/looks'
import { type ExpressionId, type PoseId, POSES } from '../rig/pose'
import { getScene } from '../scenes/registry'
import { COLORS, fontFaces } from '../tokens'
import { fitText } from './fitText'
import { GrainOverlay } from '../GrainOverlay'

export type ThumbTone = 'champagne' | 'green' | 'red' | 'white'
export type ThumbProps = {
  layout: 'hero-left' | 'object-center' | 'split'
  words: string                    // # 2–4 words, e.g. "WHO GETS THE $1M?"
  accent?: number[]                // # indexes of words drawn in the accent tone
  tone?: ThumbTone
  character?: { pose: PoseId; expression: ExpressionId; look?: string }
  prop?: string                    // # stake object id
  scene?: string                   // # optional darkened background scene
  bright?: boolean                 // # Alux-style bright cyan variant
  width?: number                   // # output width (height = 9/16)
}

const TONES: Record<ThumbTone, string> = { champagne: COLORS.champagneLight, green: COLORS.green, red: COLORS.red, white: '#FFFFFF' }

// # Big condensed words with outline + shadow; accent words coloured
const Words: React.FC<{ text: string; accent: number[]; tone: ThumbTone; box: { x: number; y: number; w: number; h: number }; align?: 'left' | 'center' }> = ({
  text, accent, tone, box, align = 'left',
}) => {
  const fit = fitText(text, { w: box.w, h: box.h }, { min: 90, max: 320, lineHeight: 0.92 })
  let idx = 0
  return (
    <div data-overflow={fit.overflow ? 'yes' : 'no'} style={{ position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: align === 'center' ? 'center' : 'flex-start', fontFamily: 'Bebas Neue', fontSize: fit.size, lineHeight: 0.92 }}>
      {fit.lines.map((line, li) => (
        <div key={li} style={{ whiteSpace: 'nowrap' }}>
          {line.split(' ').map((w, wi) => {
            const isAccent = accent.includes(idx++)
            return <span key={wi} style={{ color: isAccent ? TONES[tone] : '#FFFFFF', WebkitTextStroke: '10px #05070C', paintOrder: 'stroke fill',
              textShadow: isAccent ? `0 0 40px ${TONES[tone]}99, 0 8px 0 #05070C` : '0 8px 0 #05070C', marginRight: '0.18em' }}>{w}</span>
          })}
        </div>
      ))}
    </div>
  )
}

const Glow: React.FC<{ x: number; y: number; r: number; color: string }> = ({ x, y, r, color }) => (
  <div style={{ position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: `radial-gradient(circle, ${color} 0%, transparent 65%)` }} />
)

export const Thumbnail: React.FC<ThumbProps> = ({ layout, words, accent = [], tone = 'champagne', character, prop, scene, bright = false, width = 1280 }) => {
  const S = width / 1920
  const Scene = scene ? getScene(scene).Component : null
  const Prop = prop ? getProp(prop).Component : null
  const pose = character ? { ...POSES[character.pose], expression: character.expression } : null
  const look = character?.look ? LOOKS[character.look] : undefined
  const glow = bright ? 'rgba(255,255,255,0.55)' : 'rgba(42,168,242,0.45)'
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <style>{fontFaces()}</style>
      <div style={{ position: 'absolute', width: 1920, height: 1080, transform: `scale(${S})`, transformOrigin: '0 0', overflow: 'hidden',
        background: bright ? 'linear-gradient(135deg, #2FB8F5 0%, #1580D0 55%, #0B4F8F 100%)' : 'radial-gradient(ellipse at 35% 45%, #0E2038 0%, #05070C 70%)' }}>
        {Scene && !bright && <div style={{ position: 'absolute', inset: 0, filter: 'blur(6px) brightness(0.45)' }}><Scene t={0.3} frame={20} /></div>}

        {layout === 'hero-left' && pose && (
          <>
            <Glow x={560} y={520} r={520} color={glow} />
            <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
              <g transform="translate(560 1520) scale(1.75)"><Character pose={pose} look={look} breathe={false} /></g>
            </svg>
            {Prop && <div style={{ position: 'absolute', left: 60, top: 660 }}><svg width={340} height={340}><Prop size={340} /></svg></div>}
            <Words text={words} accent={accent} tone={tone} box={{ x: 1010, y: 90, w: 840, h: 900 }} />
          </>
        )}

        {layout === 'object-center' && Prop && (
          <>
            <Glow x={960} y={600} r={560} color={glow} />
            <div style={{ position: 'absolute', left: 960 - 330, top: 330 }}><svg width={660} height={660}><Prop size={660} /></svg></div>
            <Words text={words} accent={accent} tone={tone} box={{ x: 80, y: 30, w: 1760, h: 330 }} align="center" />
          </>
        )}

        {layout === 'split' && (
          <>
            <div style={{ position: 'absolute', left: 960, top: 0, width: 960, height: 1080, background: bright ? 'rgba(5,7,12,0.18)' : 'rgba(240,69,75,0.10)' }} />
            {pose && <><Glow x={480} y={560} r={460} color={glow} />
              <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}><g transform="translate(480 1480) scale(1.6)"><Character pose={pose} look={look} breathe={false} /></g></svg></>}
            {Prop && <><Glow x={1440} y={640} r={420} color={bright ? glow : 'rgba(240,69,75,0.4)'} />
              <div style={{ position: 'absolute', left: 1440 - 280, top: 380 }}><svg width={560} height={560}><Prop size={560} /></svg></div></>}
            <div style={{ position: 'absolute', left: 952, top: 0, width: 16, height: 1080, background: '#05070C' }} />
            <Words text={words} accent={accent} tone={tone} box={{ x: 990, y: 30, w: 880, h: 440 }} />
          </>
        )}

        <GrainOverlay frame={0} opacity={0.07} />
        {/* # Brand badge: same corner every time */}
        <div style={{ position: 'absolute', left: 46, bottom: 40, width: 150, height: 150, borderRadius: 18, background: 'rgba(5,7,12,0.82)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(0,0,0,0.6)' }}>
          <svg width={112} height={110} overflow="visible"><Emblem size={112} /></svg>
        </div>
      </div>
    </AbsoluteFill>
  )
}
