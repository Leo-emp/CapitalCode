// ============================================================
// VIGNETTE KIT — shared pieces for the animated mini-scenes that
// SHOW what the voice says (money flowing, bubbles, rankings…).
// A vignette is data-driven: the Visual Director gives it data
// + one cue per step; it draws itself in the house style on a
// 1920×1080 SVG. Deterministic (no randomness) so renders match.
// ============================================================
import React from 'react'
import { interpolate, spring } from 'remotion'
import { COLORS, FPS, MOTION } from '../tokens'

export type VignetteProps = { frame: number; data: any; cues: number[] }
export type VignetteEntry = {
  id: string; title: string; tags: string[]
  // # how many cue-able steps the data has, and a data check (null = ok)
  items: (d: any) => number; check: (d: any) => string | null
  hint: string; Component: React.FC<VignetteProps>
}

export const makeVignette = (id: string, title: string, tags: string[], spec: Omit<VignetteEntry, 'id' | 'title' | 'tags'>): VignetteEntry =>
  ({ id, title, tags, ...spec })

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const
// # 0 → 1 settle from a cue (soft), or a bouncy pop
export const settle = (frame: number, cue: number | undefined, pop = false) =>
  cue === undefined ? 0 : spring({ frame: frame - cue, fps: FPS, config: pop ? MOTION.pop : MOTION.settle })
// # 0 → 1 linear over n frames from a cue
export const ramp = (frame: number, cue: number | undefined, n: number) =>
  cue === undefined ? 0 : interpolate(frame, [cue, cue + n], [0, 1], clamp)

export const T = { blue: COLORS.blue, green: COLORS.green, red: COLORS.red, champagne: COLORS.champagne, text: COLORS.text } as const
export type Tone = keyof typeof T
export const tone = (t?: string) => T[(t as Tone) ?? 'blue'] ?? T.blue

// # Text in the house style (Inter, phone-readable)
export const Label: React.FC<{ x: number; y: number; size?: number; weight?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; opacity?: number; children: React.ReactNode }> = ({
  x, y, size = 36, weight = 700, color = COLORS.text, anchor = 'middle', opacity = 1, children,
}) => (
  <text x={x} y={y} textAnchor={anchor} fill={color} opacity={opacity} style={{ font: `${weight} ${size}px Inter` }}>{children}</text>
)

// # A gold coin with an optional short label on its face
export const Coin: React.FC<{ x: number; y: number; r?: number; label?: string; opacity?: number; dim?: boolean }> = ({ x, y, r = 22, label, opacity = 1, dim }) => (
  <g opacity={opacity} transform={`translate(${x} ${y})`}>
    <circle r={r} fill={dim ? '#5A5650' : '#E2B85C'} stroke={dim ? '#3A3834' : '#FFE3A0'} strokeWidth={Math.max(2, r * 0.08)} />
    <circle r={r * 0.72} fill="none" stroke={dim ? '#46433E' : '#B88A2E'} strokeWidth={Math.max(1.5, r * 0.05)} />
    {label && <text y={r * 0.13} textAnchor="middle" fill={dim ? '#2A2724' : '#5B3F0A'} style={{ font: `800 ${Math.max(28, Math.round(r * 0.42))}px Inter` }} dominantBaseline="middle">{label}</text>}
  </g>
)

// # Soft radial glow behind a focal point (keeps frames bright like the reference)
export const Glow: React.FC<{ x: number; y: number; r: number; color?: string; opacity?: number; id: string }> = ({ x, y, r, color = COLORS.blue, opacity = 0.35, id }) => (
  <>
    <defs><radialGradient id={id}><stop offset="0%" stopColor={color} stopOpacity={opacity} /><stop offset="100%" stopColor={color} stopOpacity={0} /></radialGradient></defs>
    <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
  </>
)

// # Ground line the scene stands on
export const Ground: React.FC<{ y: number; opacity?: number }> = ({ y, opacity = 1 }) => (
  <line x1={120} x2={1800} y1={y} y2={y} stroke={COLORS.line} strokeWidth={3} opacity={0.6 * opacity} />
)

// # Deterministic 0..1 noise from an index (stable across renders)
export const hash01 = (i: number, salt = 0) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

export const num = (v: unknown) => typeof v === 'number' && Number.isFinite(v)
export const list = (d: any, key: string, min = 1): string | null =>
  Array.isArray(d?.[key]) && d[key].length >= min ? null : `needs a "${key}" list with at least ${min} item(s)`
