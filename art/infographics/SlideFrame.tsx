// ============================================================
// SLIDE FRAME — the Alux-style infographic page: dark panel,
// small heading top-left with a short accent rule, optional
// source line bottom-left. Every infographic sits inside one.
// ============================================================

import React from 'react'
import { AbsoluteFill, interpolate, spring } from 'remotion'
import { COLORS, fontFaces, FPS, MOTION } from '../tokens'

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

// # 0 → 1 settle starting at a cue frame
export const build = (frame: number, cue: number, soft = true) =>
  spring({ frame: frame - cue, fps: FPS, config: soft ? MOTION.soft : MOTION.pop, durationInFrames: soft ? 16 : undefined })

// # Fade + rise for any element appearing on a cue
export const rise = (v: number, px = 22) => ({ opacity: Math.min(1, v * 1.4), transform: `translateY(${(1 - Math.min(1, v)) * px}px)` })

export const TONE = { blue: COLORS.blue, green: COLORS.green, red: COLORS.red, champagne: COLORS.champagne, text: COLORS.text } as const
export type Tone = keyof typeof TONE

export const SlideFrame: React.FC<{ frame: number; heading?: string; kicker?: string; source?: string; headCue?: number; children: React.ReactNode }> = ({
  frame, heading, kicker, source, headCue = 0, children,
}) => {
  const h = build(frame, headCue)
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${COLORS.bgPanel} 0%, #060A11 100%)`, fontFamily: 'Inter', color: COLORS.text }}>
      <style>{fontFaces()}</style>
      {heading && (
        <div style={{ position: 'absolute', left: 150, top: 140, ...rise(h) }}>
          {kicker && <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 5, color: COLORS.blue, marginBottom: 14 }}>{kicker.toUpperCase()}</div>}
          <div style={{ width: 70, height: 3, background: COLORS.champagne, marginBottom: 22, transform: `scaleX(${h})`, transformOrigin: 'left' }} />
          <div style={{ fontSize: 46, fontWeight: 700 }}>{heading}</div>
        </div>
      )}
      {children}
      {source && <div style={{ position: 'absolute', left: 150, bottom: 56, fontSize: 20, color: COLORS.dim, opacity: interpolate(frame, [headCue, headCue + 12], [0, 0.9], clamp) }}>{source}</div>}
    </AbsoluteFill>
  )
}
