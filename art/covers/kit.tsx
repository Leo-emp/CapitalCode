// ============================================================
// COVER KIT — tools for custom drawn thumbnails (owner 2026-11-08):
// a drawn scene, a hero whose expression fits the video, visible
// words. Shorts 1080×1920, long 1920×1080. No fixed layout: each
// cover file places these parts freely. Every part reports its box
// to the cover gate (agent/gates/cover.ts).
// ============================================================
import React, { createContext, useContext } from 'react'
import { fontFaces } from '../tokens'
import { Emblem } from '../logo/Emblem'

export type Canvas = 'tall' | 'wide'
export const SIZE: Record<Canvas, { w: number; h: number }> = { tall: { w: 1080, h: 1920 }, wide: { w: 1920, h: 1080 } }

// # box kinds: text · hero · face · object (main thing) · extra (support) · scenery (never checked)
export type BoxKind = 'text' | 'hero' | 'face' | 'object' | 'extra' | 'scenery'
export type Box = { name: string; kind: BoxKind; x: number; y: number; w: number; h: number; touches?: string[]; info?: Record<string, unknown> }
export type Collector = { boxes: Box[]; canvas?: Canvas }
const BoxCtx = createContext<Collector | null>(null)
export const BoxProvider = BoxCtx.Provider
export const useReport = () => {
  const c = useContext(BoxCtx)
  return (b: Box) => { if (c) c.boxes.push(b) }
}

// # the root: one SVG, fonts, light grain, the emblem in a chosen corner
export const CoverCanvas: React.FC<{ canvas: Canvas; children: React.ReactNode; emblem?: 'tl' | 'tr' | 'bl' | 'br' | 'none' }> = ({ canvas, children, emblem = 'tl' }) => {
  const { w, h } = SIZE[canvas]
  const c = useContext(BoxCtx)
  if (c) c.canvas = canvas
  const es = canvas === 'tall' ? 96 : 86, m = 36
  const ex = emblem.endsWith('l') ? m : w - m - es, ey = emblem.startsWith('t') ? m : h - m - es
  return (
    <div style={{ position: 'absolute', inset: 0, width: w, height: h, overflow: 'hidden' }}>
      <style>{fontFaces()}</style>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: 'absolute', inset: 0 }}>
        <defs><filter id="cv-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={7} /><feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.06 0" /></filter></defs>
        {children}
        <rect width={w} height={h} filter="url(#cv-grain)" />
        {emblem !== 'none' && <g transform={`translate(${ex} ${ey})`}>
          <rect width={es} height={es} rx={16} fill="rgba(5,7,12,0.82)" />
          <g transform={`translate(${(es - 74) / 2} ${(es - 72) / 2})`}><Emblem size={74} /></g>
        </g>}
      </svg>
    </div>
  )
}

// ------------------------------------------------------------ backdrops (scenery)
export const Sky: React.FC<{ canvas: Canvas; top: string; bottom: string; id?: string }> = ({ canvas, top, bottom, id = 'sky' }) => {
  const { w, h } = SIZE[canvas]
  return <g><defs><linearGradient id={`cv-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient></defs>
    <rect width={w} height={h} fill={`url(#cv-${id})`} /></g>
}
// # sunburst rays from a point
export const Burst: React.FC<{ canvas: Canvas; cx: number; cy: number; color: string; rays?: number; opacity?: number; spin?: number }> = ({ canvas, cx, cy, color, rays = 18, opacity = 0.22, spin = 0 }) => {
  const { w, h } = SIZE[canvas], R = Math.hypot(w, h)
  return <g opacity={opacity}>{Array.from({ length: rays }, (_, i) => {
    const a0 = (i / rays) * Math.PI * 2 + spin, a1 = a0 + Math.PI / rays
    return <path key={i} d={`M${cx} ${cy} L${cx + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} L${cx + Math.cos(a1) * R} ${cy + Math.sin(a1) * R} Z`} fill={color} />
  })}</g>
}
export const Glow: React.FC<{ id: string; x: number; y: number; r: number; color: string; opacity?: number }> = ({ id, x, y, r, color, opacity = 0.7 }) => (
  <g><defs><radialGradient id={`cv-g-${id}`}><stop offset="0" stopColor={color} stopOpacity={opacity} /><stop offset="1" stopColor={color} stopOpacity={0} /></radialGradient></defs>
    <circle cx={x} cy={y} r={r} fill={`url(#cv-g-${id})`} /></g>
)
// # the floor: flat, or rolling hills when wave > 0
export const Ground: React.FC<{ canvas: Canvas; y: number; color: string; edge?: string; wave?: number }> = ({ canvas, y, color, edge, wave = 0 }) => {
  const { w, h } = SIZE[canvas]
  const top = wave ? Array.from({ length: 8 }, (_, i) => `Q${(i + 0.5) * w / 8} ${y - (i % 2 ? wave : -wave * 0.4)} ${(i + 1) * w / 8} ${y}`).join(' ') : `L${w} ${y}`
  return <g><path d={`M0 ${y} ${top} L${w} ${h} L0 ${h} Z`} fill={color} />{edge && <path d={`M0 ${y} ${top}`} fill="none" stroke={edge} strokeWidth={6} opacity={0.6} />}</g>
}
export const Shadow: React.FC<{ x: number; y: number; w: number; o?: number }> = ({ x, y, w, o = 0.28 }) => <ellipse cx={x} cy={y} rx={w / 2} ry={w * 0.09} fill="#05070C" opacity={o} />
