// ============================================================
// ROOM KIT — solid "night flat" interiors (owner 2026-10-25:
// "redraw, improve and build more variety for scenes").
// Every piece is filled shapes with a lit face and a shade face —
// no thin outlines. Colours come from the scene's world (night /
// teal) and an optional room mood (variant containing "warm").
// ============================================================
import React from 'react'
import { WORLDS, type World } from '../tokens'
import { rnd, useWorld } from './kit'

// ------------------------------------------------------------ room palette
export type Tone = { wall: string; wallLo: string; wallHi: string; floor: string; floorHi: string; trim: string; wood: string; woodDark: string; glow: string; screen: string; screenHi: string; metal: string; metalDark: string; shadow: string }
export const roomTone = (w: World, variant?: string): Tone => {
  if (variant?.includes('warm'))
    return { wall: '#3B3152', wallLo: '#2C2440', wallHi: '#4A3D63', floor: '#5E4232', floorHi: '#70503D', trim: '#9A7350', wood: '#A0704A', woodDark: '#6F4B31', glow: '#FFC982', screen: '#24507F', screenHi: '#3F7FC0', metal: '#B9A68C', metalDark: '#7D6C58', shadow: '#1E1626' }
  const teal = w === WORLDS.teal
  return {
    wall: w.wall, wallLo: w.bodyShade, wallHi: w.body, floor: w.floor, floorHi: w.body, trim: w.solidShade,
    wood: teal ? '#7E6A55' : '#8C6A4A', woodDark: teal ? '#5B4C3D' : '#644A33', glow: w.glow,
    screen: teal ? '#145E70' : '#1D4A80', screenHi: teal ? '#2B97AC' : '#3B7FD0', metal: teal ? '#9FC4C8' : '#A9BCD6', metalDark: teal ? '#5E8A90' : '#6A82A6', shadow: w.shadow,
  }
}
// # the tone for the current scene (helpers read it from the world + the room mood they are given)
export const useTone = (variant?: string) => roomTone(useWorld(), variant)

// ------------------------------------------------------------ the room shell
// # back wall with a lighter wash in the middle, ceiling band, wainscot panels, skirting, a planked floor in perspective
export const Room: React.FC<{ variant?: string; floorY?: number; wainscot?: boolean; planks?: boolean; u: (n: string) => string }> = ({ variant, floorY = 900, wainscot = true, planks = true, u }) => {
  const t = useTone(variant)
  return (
    <g>
      <defs>
        <radialGradient id={u('wash')} cx="0.5" cy="0.4" r="0.55"><stop offset="0%" stopColor={t.wallHi} stopOpacity={0.7} /><stop offset="100%" stopColor={t.wallHi} stopOpacity={0} /></radialGradient>
        <linearGradient id={u('flr')} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.floor} /><stop offset="100%" stopColor={t.wallLo} /></linearGradient>
      </defs>
      <rect width={1920} height={floorY} fill={t.wall} /><rect width={1920} height={floorY} fill={`url(#${u('wash')})`} />
      <rect width={1920} height={70} fill={t.wallLo} />
      <rect y={70} width={1920} height={10} fill={t.trim} opacity={0.6} />
      {wainscot && <g>
        <rect y={floorY - 230} width={1920} height={230} fill={t.wallLo} />
        <rect y={floorY - 236} width={1920} height={12} fill={t.trim} />
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={30 + i * 160} y={floorY - 205} width={130} height={170} rx={6} fill={t.wall} opacity={0.55} />)}
      </g>}
      <rect y={floorY - 18} width={1920} height={18} fill={t.trim} />
      <rect y={floorY} width={1920} height={1080 - floorY} fill={`url(#${u('flr')})`} />
      {planks && Array.from({ length: 13 }, (_, i) => {
        // # planks converge toward the middle of the room
        const xb = -200 + i * 190, xt = 960 + (xb - 960) * 0.55
        return <path key={i} d={`M${xt} ${floorY} L${xt + 5} ${floorY} L${xb + 9} 1080 L${xb} 1080 Z`} fill={t.wallLo} opacity={0.35} />
      })}
      <ellipse cx={960} cy={floorY + 60} rx={700} ry={50} fill={t.glow} opacity={0.06} />
    </g>
  )
}

// ------------------------------------------------------------ windows, walls, light
// # a big window onto the lit city (or plain sky), solid frame, mullions, sill and a glass shine
export const CityWindow: React.FC<{ x: number; y: number; w: number; h: number; variant?: string; seed?: number; frame?: number; panes?: number; u: (n: string) => string }> = ({ x, y, w, h, variant, seed = 1, frame = 0, panes = 2, u }) => {
  const t = useTone(variant), W = useWorld()
  const towers = Array.from({ length: Math.ceil(w / 60) }, (_, i) => ({ x: x + i * 60 - 10, h: h * (0.3 + rnd(seed + i) * 0.55), w: 44 + rnd(seed * 3 + i) * 24 }))
  return (
    <g>
      <defs><linearGradient id={u(`cw${x}`)} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={W.sky[0]} /><stop offset="100%" stopColor={W.sky[1]} /></linearGradient>
        <clipPath id={u(`cc${x}`)}><rect x={x} y={y} width={w} height={h} /></clipPath></defs>
      <rect x={x - 16} y={y - 16} width={w + 32} height={h + 32} rx={6} fill={t.trim} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${u(`cw${x}`)})`} />
      <g clipPath={`url(#${u(`cc${x}`)})`}>
        <circle cx={x + w * 0.78} cy={y + h * 0.22} r={Math.min(w, h) * 0.08} fill={W.solid} opacity={0.85} />
        {towers.map((tw, i) => (
          <g key={i}>
            <rect x={tw.x} y={y + h - tw.h} width={tw.w} height={tw.h} fill={i % 2 ? W.body : W.bodyShade} />
            {Array.from({ length: Math.floor(tw.h / 34) * 2 }, (_, k) => rnd(seed * 7 + i * 13 + k) > 0.5 &&
              <rect key={k} x={tw.x + 8 + (k % 2) * (tw.w / 2 - 2)} y={y + h - tw.h + 12 + Math.floor(k / 2) * 34} width={tw.w / 2 - 14} height={16} fill={W.glow} opacity={0.75 + 0.2 * Math.sin(frame / 25 + k)} />)}
          </g>
        ))}
      </g>
      {Array.from({ length: panes - 1 }, (_, i) => <rect key={i} x={x + ((i + 1) * w) / panes - 6} y={y} width={12} height={h} fill={t.trim} />)}
      <rect x={x} y={y + h * 0.42} width={w} height={10} fill={t.trim} />
      <path d={`M${x + 20} ${y + 12} L${x + w * 0.28} ${y + 12} L${x + 50} ${y + h - 20} L${x + 20} ${y + h - 20} Z`} fill="#FFFFFF" opacity={0.07} />
      <rect x={x - 26} y={y + h + 14} width={w + 52} height={16} rx={4} fill={t.trim} />
    </g>
  )
}

// # a column: lit half + shaded half, capital and base blocks
export const Column: React.FC<{ x: number; top: number; bottom: number; w?: number; variant?: string }> = ({ x, top, bottom, w = 90, variant }) => {
  const t = useTone(variant)
  return (
    <g>
      <rect x={x - w / 2} y={top} width={w} height={bottom - top} fill={t.metal} />
      <rect x={x} y={top} width={w / 2} height={bottom - top} fill={t.metalDark} />
      {[0.25, 0.5, 0.75].map((f) => <rect key={f} x={x - w / 2 + w * f - 3} y={top + 30} width={6} height={bottom - top - 60} fill={t.metalDark} opacity={0.35} />)}
      <rect x={x - w / 2 - 18} y={top - 30} width={w + 36} height={34} fill={t.metal} /><rect x={x - w / 2 - 18} y={top - 4} width={w + 36} height={8} fill={t.metalDark} />
      <rect x={x - w / 2 - 14} y={bottom - 6} width={w + 28} height={30} fill={t.metal} /><rect x={x} y={bottom - 6} width={w / 2 + 14} height={30} fill={t.metalDark} />
    </g>
  )
}

// # warm pendant lamp with a soft light cone (gradient, no filter)
export const Pendant: React.FC<{ x: number; y: number; len?: number; frame?: number; variant?: string; u: (n: string) => string; cone?: number }> = ({ x, y, len = 160, frame = 0, variant, u, cone = 520 }) => {
  const t = useTone(variant)
  const sway = Math.sin(frame / 50 + x) * 1.5
  return (
    <g transform={`rotate(${sway} ${x} ${y})`}>
      <defs><linearGradient id={u(`pl${x}`)} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.glow} stopOpacity={0.35} /><stop offset="100%" stopColor={t.glow} stopOpacity={0} /></linearGradient></defs>
      <path d={`M${x - 40} ${y + len + 36} L${x - cone / 2} ${y + len + 36 + cone} L${x + cone / 2} ${y + len + 36 + cone} L${x + 40} ${y + len + 36} Z`} fill={`url(#${u(`pl${x}`)})`} />
      <rect x={x - 2} y={y} width={4} height={len} fill={t.wallLo} />
      <path d={`M${x - 46} ${y + len + 38} Q${x} ${y + len - 22} ${x + 46} ${y + len + 38} Z`} fill={t.metal} />
      <path d={`M${x} ${y + len - 7} Q${x + 30} ${y + len + 5} ${x + 46} ${y + len + 38} L${x} ${y + len + 38} Z`} fill={t.metalDark} />
      <ellipse cx={x} cy={y + len + 38} rx={24} ry={7} fill={t.glow} />
    </g>
  )
}

// # a framed picture with simple flat art (hills + sun, or blocks), different per seed
export const Painting: React.FC<{ x: number; y: number; w: number; h: number; seed?: number; variant?: string }> = ({ x, y, w, h, seed = 1, variant }) => {
  const t = useTone(variant)
  const pal = [['#E9B949', '#F06B5B', '#2FC4B2'], ['#5BCBFF', '#E8D9B5', '#F06B5B'], ['#2FC4B2', '#E9B949', '#A07CFF']][seed % 3]
  return (
    <g>
      <rect x={x - 10} y={y - 10} width={w + 20} height={h + 20} fill={t.wood} /><rect x={x + w} y={y - 10} width={10} height={h + 20} fill={t.woodDark} />
      <rect x={x} y={y} width={w} height={h} fill="#F2E6CC" />
      {seed % 2 ? (<g>
        <circle cx={x + w * 0.7} cy={y + h * 0.35} r={h * 0.16} fill={pal[0]} />
        <path d={`M${x} ${y + h} L${x + w * 0.35} ${y + h * 0.45} L${x + w * 0.65} ${y + h} Z`} fill={pal[2]} />
        <path d={`M${x + w * 0.4} ${y + h} L${x + w * 0.75} ${y + h * 0.58} L${x + w} ${y + h * 0.85} L${x + w} ${y + h} Z`} fill={pal[1]} />
      </g>) : (<g>
        <rect x={x + w * 0.1} y={y + h * 0.15} width={w * 0.35} height={h * 0.45} fill={pal[0]} />
        <rect x={x + w * 0.5} y={y + h * 0.3} width={w * 0.38} height={h * 0.55} fill={pal[1]} />
        <circle cx={x + w * 0.3} cy={y + h * 0.75} r={h * 0.12} fill={pal[2]} />
      </g>)}
    </g>
  )
}

// ------------------------------------------------------------ furniture
// # a solid counter: top slab, front with inset panels, kick plate, ground shadow
export const Counter: React.FC<{ x: number; y: number; w: number; h: number; variant?: string; front?: string }> = ({ x, y, w, h, variant, front }) => {
  const t = useTone(variant)
  const n = Math.max(2, Math.round(w / 180))
  return (
    <g>
      <ellipse cx={x + w / 2} cy={y + h + 6} rx={w / 2 + 30} ry={14} fill={t.shadow} opacity={0.5} />
      <rect x={x} y={y} width={w} height={h} fill={front ?? t.wood} />
      {Array.from({ length: n }, (_, i) => <rect key={i} x={x + 20 + (i * (w - 40)) / n} y={y + 34} width={(w - 40) / n - 20} height={h - 70} rx={4} fill={t.woodDark} opacity={0.55} />)}
      <rect x={x} y={y + h - 18} width={w} height={18} fill={t.woodDark} />
      <rect x={x - 16} y={y - 22} width={w + 32} height={26} rx={4} fill={t.metal} />
      <rect x={x - 16} y={y - 4} width={w + 32} height={8} fill={t.metalDark} />
    </g>
  )
}

// # a sofa: back, seat, two arms, cushions and short legs
export const Sofa: React.FC<{ x: number; y: number; w: number; color?: string; variant?: string }> = ({ x, y, w, color = '#3E7CC9', variant }) => {
  const t = useTone(variant)
  const dark = '#2C5C99'
  return (
    <g>
      <ellipse cx={x + w / 2} cy={y + 8} rx={w / 2 + 20} ry={14} fill={t.shadow} opacity={0.55} />
      <rect x={x + 30} y={y - 200} width={w - 60} height={130} rx={30} fill={dark} />
      {[0, 1].map((i) => <rect key={i} x={x + 50 + (i * (w - 100)) / 2} y={y - 186} width={(w - 100) / 2 - 10} height={100} rx={24} fill={color} />)}
      <rect x={x + 20} y={y - 96} width={w - 40} height={60} rx={20} fill={color} />
      <rect x={x} y={y - 140} width={60} height={110} rx={26} fill={dark} /><rect x={x + w - 60} y={y - 140} width={60} height={110} rx={26} fill={dark} />
      <rect x={x + 10} y={y - 40} width={w - 20} height={30} fill={dark} />
      {[x + 30, x + w - 46].map((lx) => <rect key={lx} x={lx} y={y - 12} width={16} height={14} fill={t.woodDark} />)}
    </g>
  )
}

// # bookcase full of colourful books, solid sides and shelves
const BOOKS = ['#E9B949', '#2AA8F2', '#F06B5B', '#2FC4B2', '#E8D9B5', '#A07CFF', '#5BBF85']
export const Bookcase: React.FC<{ x: number; y: number; w: number; h: number; seed?: number; variant?: string }> = ({ x, y, w, h, seed = 1, variant }) => {
  const t = useTone(variant)
  const rows = Math.max(2, Math.floor(h / 110))
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={t.woodDark} />
      <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} fill={t.wallLo} />
      {Array.from({ length: rows }, (_, r) => {
        const sy = y + 14 + ((r + 1) * (h - 28)) / rows
        let bx = x + 20
        const books: React.ReactNode[] = []
        for (let i = 0; bx < x + w - 40; i++) {
          const bw = 16 + rnd(seed * 11 + r * 31 + i) * 16, bh = (h - 28) / rows - 18 - rnd(seed + r * 7 + i) * 26
          const lean = rnd(seed * 3 + r + i * 5) > 0.88
          books.push(<rect key={i} x={bx} y={sy - bh - 8} width={bw} height={bh} rx={2} fill={BOOKS[(i + r * 3 + seed) % BOOKS.length]} transform={lean ? `rotate(-12 ${bx} ${sy - 8})` : undefined} />)
          bx += bw + 3 + (lean ? 10 : 0)
        }
        return <g key={r}>{books}<rect x={x + 14} y={sy - 8} width={w - 28} height={12} fill={t.wood} /></g>
      })}
    </g>
  )
}

// # meeting table seen from the front, with chairs behind it
export const MeetingTable: React.FC<{ x: number; y: number; w: number; chairs?: number; variant?: string }> = ({ x, y, w, chairs = 5, variant }) => {
  const t = useTone(variant)
  return (
    <g>
      {Array.from({ length: chairs }, (_, i) => {
        const cx = x + 60 + (i * (w - 120)) / Math.max(1, chairs - 1)
        return <g key={i}><rect x={cx - 42} y={y - 130} width={84} height={120} rx={20} fill={t.metalDark} /><rect x={cx} y={y - 130} width={42} height={120} rx={18} fill={t.wallLo} opacity={0.45} /></g>
      })}
      <ellipse cx={x + w / 2} cy={y + 150} rx={w / 2 + 40} ry={20} fill={t.shadow} opacity={0.55} />
      <path d={`M${x} ${y} L${x + w} ${y} L${x + w + 60} ${y + 50} L${x - 60} ${y + 50} Z`} fill={t.wood} />
      <rect x={x - 60} y={y + 50} width={w + 120} height={18} fill={t.woodDark} />
      <rect x={x + 40} y={y + 68} width={26} height={90} fill={t.woodDark} /><rect x={x + w - 66} y={y + 68} width={26} height={90} fill={t.woodDark} />
    </g>
  )
}

// # a big wall screen: bezel, lit screen, and a picture — bars, a line, code or a globe (no numbers)
export const WallScreen: React.FC<{ x: number; y: number; w: number; h: number; kind?: 'bars' | 'line' | 'code' | 'globe' | 'candles'; frame?: number; variant?: string; trend?: number }> = ({ x, y, w, h, kind = 'bars', frame = 0, variant, trend = 1 }) => {
  const t = useTone(variant)
  const inner = { x: x + 14, y: y + 14, w: w - 28, h: h - 28 }
  let pic: React.ReactNode = null
  if (kind === 'bars') pic = Array.from({ length: 7 }, (_, i) => {
    const v = 0.25 + 0.6 * rnd(i + w) + (trend > 0 ? i * 0.04 : -i * 0.04)
    const bh = Math.max(0.1, Math.min(0.9, v)) * inner.h * (0.92 + 0.08 * Math.sin(frame / 15 + i))
    return <rect key={i} x={inner.x + 20 + (i * (inner.w - 40)) / 7} y={inner.y + inner.h - bh - 10} width={(inner.w - 40) / 7 - 14} height={bh} rx={4} fill={i % 3 === 2 ? '#E9B949' : '#5BCBFF'} />
  })
  if (kind === 'line') {
    const pts = Array.from({ length: 12 }, (_, i) => `${i ? 'L' : 'M'}${inner.x + 20 + (i * (inner.w - 40)) / 11} ${inner.y + inner.h * (0.75 - trend * i * 0.045 + 0.08 * Math.sin(i * 1.7 + frame / 30))}`).join(' ')
    pic = <g><path d={`${pts} L${inner.x + inner.w - 20} ${inner.y + inner.h - 10} L${inner.x + 20} ${inner.y + inner.h - 10} Z`} fill={trend > 0 ? '#3DDC97' : '#F0454B'} opacity={0.25} /><path d={pts} stroke={trend > 0 ? '#3DDC97' : '#F0454B'} strokeWidth={8} fill="none" strokeLinejoin="round" strokeLinecap="round" /></g>
  }
  if (kind === 'candles') pic = Array.from({ length: 14 }, (_, i) => {
    const up = rnd(i * 3 + w) > (trend > 0 ? 0.3 : 0.7), mid = inner.y + inner.h * (0.6 - trend * i * 0.025 + (rnd(i) - 0.5) * 0.15), bh = 20 + rnd(i + 9) * 50
    const cx = inner.x + 26 + (i * (inner.w - 52)) / 13
    return <g key={i}><rect x={cx - 2} y={mid - bh * 0.9} width={4} height={bh * 1.8} fill={up ? '#3DDC97' : '#F0454B'} /><rect x={cx - 10} y={mid - bh / 2} width={20} height={bh} fill={up ? '#3DDC97' : '#F0454B'} /></g>
  })
  if (kind === 'code') pic = Array.from({ length: Math.floor(inner.h / 34) }, (_, r) => {
    let cx = inner.x + 24 + (rnd(r) > 0.6 ? 40 : 0)
    return <g key={r}>{Array.from({ length: 2 + Math.floor(rnd(r + 5) * 4) }, (_, k) => {
      const ww = 30 + rnd(r * 9 + k) * 120, el = <rect key={k} x={cx} y={inner.y + 18 + r * 34} width={ww} height={14} rx={7} fill={['#5BCBFF', '#E9B949', '#A07CFF', '#3DDC97', '#E8D9B5'][(r + k) % 5]} opacity={(frame / 4 + r) % 30 > 2 ? 1 : 0.4} />
      cx += ww + 16; return cx < inner.x + inner.w - 20 ? el : null
    })}</g>
  })
  if (kind === 'globe') { const r = Math.min(inner.w, inner.h) * 0.36, cx = inner.x + inner.w / 2, cy = inner.y + inner.h / 2
    pic = <g><circle cx={cx} cy={cy} r={r} fill="#2B6CB0" /><path d={`M${cx - r * 0.6} ${cy - r * 0.3} q${r * 0.3} ${-r * 0.4} ${r * 0.6} ${-r * 0.1} q${r * 0.2} ${r * 0.4} ${-r * 0.1} ${r * 0.5} Z M${cx + r * 0.1} ${cy + r * 0.1} q${r * 0.4} ${-r * 0.2} ${r * 0.6} ${r * 0.2} q${-r * 0.2} ${r * 0.4} ${-r * 0.5} ${r * 0.2} Z`} fill="#3DDC97" />
      <ellipse cx={cx} cy={cy} rx={r * 1.25} ry={r * 0.32} fill="none" stroke="#E9B949" strokeWidth={6} transform={`rotate(${-18 + Math.sin(frame / 40) * 4} ${cx} ${cy})`} /></g> }
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={t.metalDark} />
      <rect x={inner.x} y={inner.y} width={inner.w} height={inner.h} rx={6} fill={t.screen} />
      <rect x={inner.x} y={inner.y} width={inner.w} height={inner.h * 0.5} rx={6} fill={t.screenHi} opacity={0.18} />
      {pic}
    </g>
  )
}

// # a server rack: solid body, slots, blinking lights
export const Rack: React.FC<{ x: number; y: number; w: number; h: number; frame?: number; variant?: string; seed?: number }> = ({ x, y, w, h, frame = 0, variant, seed = 1 }) => {
  const t = useTone(variant)
  const slots = Math.floor((h - 30) / 46)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={t.metalDark} />
      <rect x={x + w - 18} y={y} width={18} height={h} rx={4} fill={t.wallLo} opacity={0.6} />
      {Array.from({ length: slots }, (_, i) => (
        <g key={i}>
          <rect x={x + 12} y={y + 16 + i * 46} width={w - 42} height={34} rx={4} fill={t.wallLo} />
          {[0, 1, 2].map((k) => <circle key={k} cx={x + 30 + k * 18} cy={y + 33 + i * 46} r={5} fill={(frame + i * 3 + k * 5 + seed) % 11 < 6 ? '#3DDC97' : '#5BCBFF'} />)}
          <rect x={x + w - 90} y={y + 28 + i * 46} width={44} height={8} rx={4} fill={t.metal} opacity={0.6} />
        </g>
      ))}
    </g>
  )
}

// # a lectern / podium with a small emblem disc
export const Podium: React.FC<{ x: number; y: number; variant?: string }> = ({ x, y, variant }) => {
  const t = useTone(variant)
  return (
    <g>
      <ellipse cx={x} cy={y + 4} rx={120} ry={14} fill={t.shadow} opacity={0.55} />
      <path d={`M${x - 90} ${y - 230} L${x + 90} ${y - 230} L${x + 70} ${y} L${x - 70} ${y} Z`} fill={t.wood} />
      <path d={`M${x} ${y - 230} L${x + 90} ${y - 230} L${x + 70} ${y} L${x} ${y} Z`} fill={t.woodDark} />
      <rect x={x - 110} y={y - 252} width={220} height={26} rx={6} fill={t.metal} />
      <circle cx={x} cy={y - 140} r={34} fill={t.metal} /><circle cx={x} cy={y - 140} r={20} fill={t.glow} />
    </g>
  )
}

// # stage curtains: solid folds
export const Curtain: React.FC<{ x: number; w: number; h: number; side: 1 | -1; color?: string }> = ({ x, w, h, side, color = '#B5344A' }) => (
  <g>
    <rect x={x} y={0} width={w} height={h} fill={color} />
    {Array.from({ length: Math.floor(w / 40) }, (_, i) => <rect key={i} x={x + i * 40 + 10} y={0} width={14} height={h} fill="#7E2034" opacity={0.6} />)}
    <path d={`M${side > 0 ? x + w : x} 0 Q${side > 0 ? x + w - 60 : x + 60} ${h * 0.5} ${side > 0 ? x + w : x} ${h} L${side > 0 ? x + w - 20 : x + 20} ${h} L${side > 0 ? x + w - 20 : x + 20} 0 Z`} fill="#7E2034" />
  </g>
)

// # a rug on the floor (flat ellipse with a border)
export const Rug: React.FC<{ cx: number; cy: number; rx: number; ry: number; color?: string; border?: string }> = ({ cx, cy, rx, ry, color = '#B5577A', border = '#E9B949' }) => (
  <g><ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={border} /><ellipse cx={cx} cy={cy} rx={rx - 14} ry={ry - 6} fill={color} /><ellipse cx={cx} cy={cy} rx={rx * 0.6} ry={ry * 0.55} fill={border} opacity={0.5} /></g>
)

// # a floor lamp with a warm glow
export const FloorLamp: React.FC<{ x: number; y: number; variant?: string; u: (n: string) => string }> = ({ x, y, variant, u }) => {
  const t = useTone(variant)
  return (
    <g>
      <defs><radialGradient id={u(`fl${x}`)}><stop offset="0%" stopColor={t.glow} stopOpacity={0.45} /><stop offset="100%" stopColor={t.glow} stopOpacity={0} /></radialGradient></defs>
      <circle cx={x} cy={y - 380} r={260} fill={`url(#${u(`fl${x}`)})`} />
      <rect x={x - 4} y={y - 360} width={8} height={360} fill={t.metalDark} />
      <ellipse cx={x} cy={y} rx={50} ry={10} fill={t.metalDark} />
      <path d={`M${x - 70} ${y - 330} L${x + 70} ${y - 330} L${x + 46} ${y - 430} L${x - 46} ${y - 430} Z`} fill={t.glow} />
      <path d={`M${x} ${y - 330} L${x + 70} ${y - 330} L${x + 46} ${y - 430} L${x} ${y - 430} Z`} fill={t.trim} opacity={0.45} />
    </g>
  )
}
