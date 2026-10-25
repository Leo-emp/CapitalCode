// ============================================================
// TALL KIT — shared helpers for Shorts pieces (1080×1920): the
// tall stage, a slow camera, the headline number, money streams,
// props and labelled company towers. Safe areas: nothing important
// above y 220, below y 1500 or right of x 940; captions y 1290–1490.
// ============================================================
import React from 'react'
import { getProp } from '../../props/registry'
import { Label } from '../charts'
import { arc, easeInOut, lerp, P, Sliver, span, Stage, Tower } from '../kit'

export const W = 1080, H = 1920
export const Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number }> = ({ id, x, y, size, f }) => {
  const C = getProp(id).Component
  return <C size={size} x={x - size / 2} y={y - size / 2} frame={f} />
}
export const TallStage: React.FC<{ id: string; f: number; tint?: 'navy' | 'teal' }> = ({ id, f, tint }) => <Stage id={id} frame={f} w={W} h={H} tint={tint} />
// # a slow camera: eased moves between [frame, centre x, centre y, zoom] keys plus a gentle drift
export const camAt = (f: number, keys: [number, number, number, number][]) => {
  let x = keys[0][1], y = keys[0][2], z = keys[0][3]
  for (const k of keys.slice(1)) {
    if (f < k[0]) break
    const t = easeInOut(span(f, k[0], k[0] + 26))
    x = lerp(x, k[1], t); y = lerp(y, k[2], t); z = lerp(z, k[3], t)
  }
  return `translate(${W / 2} ${H / 2}) scale(${z * (1 + 0.004 * Math.sin(f / 110))}) translate(${-(x + Math.sin(f / 70) * 4)} ${-(y + Math.sin(f / 90) * 3)})`
}
// # a big key number or line in the headline spot (y ≈ 330)
export const Big: React.FC<{ text: string; o: number; y?: number; size?: number; color?: string }> = ({ text, o, y = 330, size = 120, color = P.ink }) => (
  <Label x={W / 2} y={y} text={text} size={size} font="Bebas Neue" color={color} o={o} />
)
// # a stream of slivers from a point to targets (money flowing) between frames [from, to]
export const pour = (f: number, from: number, to: number, n: number, src: { x: number; y: number }, target: (i: number) => { x: number; y: number }, key: string, gold = false, lift = 90) => {
  const out: React.ReactNode[] = []
  if (f < from || f > to + 24) return out
  for (let i = 0; i < n; i++) {
    const ph = ((f - from) / 24 + i / n) % 1, born = from + (i / n) * 24
    if (f < born || f > to + ph * 24) continue
    const p = arc(src, target(i), easeInOut(ph), lift)
    out.push(<Sliver key={`${key}${i}`} x={p.x} y={p.y} r={ph * 300 + i * 41} s={0.8} gold={gold} />)
  }
  return out
}
// # a company: a tower with its icon floating above and its name below
export const Company: React.FC<{ id: string; i: number; x: number; y: number; h: number; name: string; icon: string; f: number; w?: number; glow?: number; o?: number; nameSize?: number }> = ({ id, i, x, y, h, name, icon, f, w = 70, glow = 0, o = 1, nameSize = 26 }) => (
  <g opacity={o}>
    <Tower id={id} i={i} x={x} y={y} h={h} w={w} glow={glow} />
    {h > 20 && <Prop id={icon} x={x} y={y - h - w * 0.45 - 46} size={64} f={f} />}
    <Label x={x} y={y + 40} text={name} size={nameSize} color={P.ink} />
  </g>
)
