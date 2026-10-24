// ============================================================
// SCENE KIT — reusable pieces in the approved style: night sky +
// city towers with lit windows (exteriors), thin blue line-art
// rooms with one warm lit focal area (interiors, Alux dark style).
// Every piece takes plain numbers; ids come from the scene's `u`.
// ============================================================

import React from 'react'
import { Emblem } from '../logo/Emblem'
import type { ArtEntry } from '../registry'
import { COLORS } from '../tokens'
import { useUid } from '../uid'

export const L = { line: COLORS.line, dim: COLORS.lineDim, ink: '#0A1220', cream: '#F4E9D8', warm: COLORS.warm }

export type Anchor = { x: number; y: number; scale: number; layer: 'back' | 'mid' | 'front' }
// # actors: characters/props the engine places, drawn BETWEEN the scenery layers
// # (back actors stand behind the mid scenery, e.g. behind a counter).
// # Anchors are in 1920x1080 scene pixels: stand/sit = the point between the feet,
// # prop*/screen/sign/door/counter = the centre of where the item goes.
// # Variety (owner 2026-10-24): the same place in 4 times/weathers × 4 colour
// # moods × 3 camera framings, so a returning scene never repeats the same shot.
export type SceneTime = 'night' | 'dusk' | 'rain' | 'fog'
export type SceneTone = 'none' | 'blue' | 'gold' | 'red' | 'green'
export type SceneFraming = 'wide' | 'medium' | 'close'
export type SceneProps = {
  t?: number; lightsOn?: number; frame?: number; variant?: string
  actors?: { back?: React.ReactNode; mid?: React.ReactNode; front?: React.ReactNode }
  time?: SceneTime; tone?: SceneTone; framing?: SceneFraming
}

const TONES: Record<Exclude<SceneTone, 'none'>, string> = { blue: '#2A8FE0', gold: '#E9B949', red: '#F0454B', green: '#3DDC97' }
const ZOOM: Record<SceneFraming, number> = { wide: 1, medium: 1.18, close: 1.45 }

// # Camera: zoom toward the focal point, never showing outside the 1920×1080 canvas
export const cameraFor = (framing: SceneFraming, focus: { x: number; y: number }) => {
  const k = ZOOM[framing]
  const clampT = (v: number, size: number) => Math.min(0, Math.max(size * (1 - k), v))
  return { k, tx: clampT(960 - focus.x * k, 1920), ty: clampT(540 - focus.y * k, 1080) }
}

// # Weather / time-of-day overlays (no SVG filters — just shapes and gradients)
const Weather: React.FC<{ time: SceneTime; frame: number; u: (n: string) => string }> = ({ time, frame, u }) => {
  if (time === 'dusk') return (
    <g data-weather="dusk">
      <defs><linearGradient id={u('dusk')} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF8A4C" stopOpacity={0.35} /><stop offset="55%" stopColor="#B04A7A" stopOpacity={0.12} /><stop offset="100%" stopColor="#000" stopOpacity={0} /></linearGradient></defs>
      <rect width={1920} height={1080} fill={`url(#${u('dusk')})`} style={{ mixBlendMode: 'screen' }} />
    </g>)
  if (time === 'rain') return (
    <g data-weather="rain">
      <rect width={1920} height={1080} fill="#02060E" opacity={0.18} />
      {Array.from({ length: 90 }, (_, i) => {
        const x = (rnd(i) * 2100 + frame * 6) % 2100 - 90, y = (rnd(i + 50) * 1200 + frame * 38) % 1200 - 100
        return <line key={i} x1={x} y1={y} x2={x - 10} y2={y + 46} stroke="#9FC4E8" strokeWidth={1.6} opacity={0.35} />
      })}
    </g>)
  if (time === 'fog') return (
    <g data-weather="fog">
      <defs><linearGradient id={u('fog')} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8C8DC" stopOpacity={0} /><stop offset="60%" stopColor="#B8C8DC" stopOpacity={0.14} /><stop offset="100%" stopColor="#B8C8DC" stopOpacity={0.26} /></linearGradient></defs>
      <rect width={1920} height={1080} fill={`url(#${u('fog')})`} />
      {[0, 1, 2].map((k) => <ellipse key={k} cx={((k * 700 + frame * (0.6 + k * 0.2)) % 2600) - 340} cy={760 + k * 90} rx={620} ry={70} fill="#C8D6E6" opacity={0.08} />)}
    </g>)
  return null
}
export type SceneEntry = ArtEntry<SceneProps> & { anchors: Record<string, Anchor> }
export type Layers = { back?: React.ReactNode; mid?: React.ReactNode; front?: React.ReactNode }
export type SceneDraw = (a: { u: (n: string) => string; frame: number; t: number; lightsOn: number; variant?: string }) => Layers

// # Seeded pseudo-random, so drawings are identical every frame
export const rnd = (seed: number) => { const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

// # Wrap a drawing as a scene: 3 parallax layers with actor slots between them,
// # vignette on top. No SVG filters (they tore text during camera moves and cost
// # most of each frame); grain is one static texture overlay over the whole video.
// # A second standing spot for two-person moments (handshake, talk): 520 px from `stand`, on the
// # side with more room, same ground line and scale. Scenes may define their own `stand2`.
export const withStand2 = (anchors: Record<string, Anchor>): Record<string, Anchor> => {
  if (anchors.stand2 || !anchors.stand) return anchors
  const s = anchors.stand
  const x = s.x < 960 ? Math.min(1720, s.x + 520) : Math.max(200, s.x - 520)
  return { ...anchors, stand2: { ...s, x } }
}

export const makeScene = (id: string, title: string, tags: string[], rawAnchors: Record<string, Anchor>, draw: SceneDraw): SceneEntry => {
  const anchors = withStand2(rawAnchors)
  const Component: React.FC<SceneProps> = ({ t = 0, lightsOn = 1, frame = 0, variant, actors = {}, time = 'night', tone = 'none', framing = 'wide' }) => {
    const base = useUid(id)
    const u = (n: string) => `${base}-${n}`
    const layers = draw({ u, frame, t, lightsOn, variant })
    const focus = anchors.focus ?? anchors.prop1 ?? { x: 960, y: 540 }
    const cam = cameraFor(framing, focus)
    return (
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
        <rect width={1920} height={1080} fill={COLORS.bg} />
        <g data-camera={cam.k} transform={`translate(${cam.tx} ${cam.ty}) scale(${cam.k})`}>
        <g transform={`translate(${-12 * t} 0)`}>{layers.back}</g>
        {actors.back && <g transform={`translate(${-36 * t} 0)`}>{actors.back}</g>}
        <g transform={`translate(${-36 * t} 0)`}>{layers.mid}</g>
        {actors.mid && <g transform={`translate(${-36 * t} 0)`}>{actors.mid}</g>}
        <g transform={`translate(${-70 * t} 0)`}>{layers.front}</g>
        {actors.front && <g transform={`translate(${-70 * t} 0)`}>{actors.front}</g>}
        </g>
        <Weather time={time} frame={frame} u={u} />
        {tone !== 'none' && <rect data-tone={tone} width={1920} height={1080} fill={TONES[tone]} opacity={0.22} style={{ mixBlendMode: 'soft-light' }} />}
        <defs><radialGradient id={u('vig')} cx="0.5" cy="0.5" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.5} /></radialGradient></defs>
        <rect width={1920} height={1080} fill={`url(#${u('vig')})`} pointerEvents="none" />
      </svg>
    )
  }
  Component.displayName = `Scene(${id})`
  return { id, title, tags, anchors, Component }
}

// ------------------------------------------------------------
// EXTERIOR PIECES
// ------------------------------------------------------------
export const NightSky: React.FC<{ u: (n: string) => string; stars?: number }> = ({ u, stars = 40 }) => (
  <g>
    <defs><linearGradient id={u('sky')} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#02040A" /><stop offset="100%" stopColor="#0A1526" /></linearGradient></defs>
    <rect width={1920} height={1080} fill={`url(#${u('sky')})`} />
    {Array.from({ length: stars }, (_, i) => <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 99) * 420} r={rnd(i + 7) * 1.6 + 0.4} fill="#BFD6F0" opacity={0.25 + rnd(i + 3) * 0.5} />)}
  </g>
)

// # Row of dark line-art towers; some windows lit, a few flicker
export const Skyline: React.FC<{ x0?: number; x1?: number; ground?: number; seed?: number; frame: number; tall?: number }> = ({ x0 = 0, x1 = 1920, ground = 900, seed = 1, frame, tall = 1 }) => {
  const towers: React.ReactNode[] = []
  let x = x0, i = 0
  while (x < x1) {
    const w = 110 + rnd(seed + i) * 120, h = (260 + rnd(seed + i + 50) * 420) * tall, y = ground - h
    const cols = Math.floor((w - 24) / 34), rows = Math.floor((h - 40) / 62)
    towers.push(
      <g key={i}>
        <rect x={x} y={y} width={w} height={h} fill="#070B14" stroke={L.dim} strokeWidth={2} />
        {Array.from({ length: cols * rows }, (_, k) => {
          const c = k % cols, r = Math.floor(k / cols), on = rnd(seed * 31 + i * 17 + k) > 0.72
          const flick = on && rnd(i * 5 + k) > 0.9 ? 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.2 + k)) : 1
          return <rect key={k} x={x + 14 + c * 34} y={y + 24 + r * 62} width={20} height={34} fill={on ? `rgba(255,213,138,${0.38 * flick})` : 'none'} stroke={L.dim} strokeWidth={1.5} />
        })}
      </g>,
    )
    x += w + 16 + rnd(seed + i + 9) * 40; i++
  }
  return <g>{towers}</g>
}

export const StreetLamp: React.FC<{ x: number; ground: number; frame: number; u: (n: string) => string }> = ({ x, ground, frame, u }) => {
  const flick = 0.85 + 0.15 * Math.abs(Math.sin(frame * 0.7) * Math.sin(frame * 0.23))
  return (
    <g>
      <defs><radialGradient id={u(`lamp${x}`)}><stop offset="0%" stopColor={L.warm} stopOpacity={0.5 * flick} /><stop offset="100%" stopColor={L.warm} stopOpacity={0} /></radialGradient></defs>
      <path d={`M${x} ${ground} L${x} ${ground - 620} Q${x} ${ground - 660} ${x - 40} ${ground - 660} L${x - 80} ${ground - 660}`} stroke="#1A2A40" strokeWidth={12} fill="none" />
      <path d={`M${x - 105} ${ground - 664} L${x - 55} ${ground - 664} L${x - 65} ${ground - 640} L${x - 95} ${ground - 640} Z`} fill="#1A2A40" />
      <circle cx={x - 80} cy={ground - 620} r={170} fill={`url(#${u(`lamp${x}`)})`} />
    </g>
  )
}

export const Pavement: React.FC<{ y: number; u: (n: string) => string; spill?: { cx: number; rx: number; o: number } }> = ({ y, u, spill }) => (
  <g>
    <defs><radialGradient id={u('spill')} cx="0.5" cy="0"><stop offset="0%" stopColor={L.warm} stopOpacity={0.35} /><stop offset="100%" stopColor={L.warm} stopOpacity={0} /></radialGradient></defs>
    <rect x={0} y={y} width={1920} height={1080 - y} fill="#0A0F18" />
    <line x1={0} x2={1920} y1={y + 40} y2={y + 40} stroke={L.dim} strokeWidth={3} />
    {spill && <ellipse cx={spill.cx} cy={y + 14} rx={spill.rx} ry={56} fill={`url(#${u('spill')})`} opacity={spill.o} />}
  </g>
)

// ------------------------------------------------------------
// INTERIOR PIECES (thin blue line art on near-black)
// ------------------------------------------------------------
export const RoomShell: React.FC<{ floor?: number; panels?: boolean }> = ({ floor = 880, panels = true }) => (
  <g>
    <rect width={1920} height={1080} fill="#0B1524" />
    <line x1={0} x2={1920} y1={floor} y2={floor} stroke={L.dim} strokeWidth={2} />
    <line x1={0} x2={1920} y1={floor - 18} y2={floor - 18} stroke={L.dim} strokeWidth={1} opacity={0.6} />
    {panels && Array.from({ length: 8 }, (_, i) => <rect key={i} x={40 + i * 240} y={90} width={200} height={floor - 150} fill="none" stroke={L.dim} strokeWidth={1} opacity={0.35} />)}
  </g>
)

export const BlindsWindow: React.FC<{ x: number; y: number; w: number; h: number; city?: boolean; frame?: number }> = ({ x, y, w, h, city = false, frame = 0 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={city ? '#081222' : 'none'} stroke={L.line} strokeWidth={2} />
    {city && Array.from({ length: Math.floor(w / 40) }, (_, i) => <rect key={i} x={x + 10 + i * 40} y={y + h - 40 - rnd(i + x) * (h * 0.6)} width={26} height={h} fill="#0B1830" stroke={L.dim} strokeWidth={1} />)}
    {Array.from({ length: Math.floor(h / 22) }, (_, i) => <line key={i} x1={x} x2={x + w} y1={y + 12 + i * 22} y2={y + 12 + i * 22} stroke={L.line} strokeWidth={1} opacity={city ? 0.35 : 0.7} />)}
    {city && <rect x={x} y={y} width={w} height={h} fill="#4FB5E8" opacity={0.03 + 0.02 * Math.sin(frame / 20)} />}
  </g>
)

export const Desk: React.FC<{ x: number; y: number; w: number; drawers?: boolean }> = ({ x, y, w, drawers = true }) => (
  <g>
    <rect x={x} y={y} width={w} height={20} fill={L.ink} stroke={L.line} strokeWidth={2} />
    <line x1={x + 30} x2={x + 30} y1={y + 20} y2={y + 200} stroke={L.line} strokeWidth={2} />
    {drawers ? (
      <g><rect x={x + w - 230} y={y + 20} width={200} height={170} fill="none" stroke={L.line} strokeWidth={2} />
        <line x1={x + w - 230} x2={x + w - 30} y1={y + 105} y2={y + 105} stroke={L.line} strokeWidth={2} />
        <circle cx={x + w - 130} cy={y + 62} r={4} fill={L.line} /><circle cx={x + w - 130} cy={y + 148} r={4} fill={L.line} /></g>
    ) : <line x1={x + w - 30} x2={x + w - 30} y1={y + 20} y2={y + 200} stroke={L.line} strokeWidth={2} />}
  </g>
)

export const DeskLamp: React.FC<{ x: number; y: number; frame: number; u: (n: string) => string; on?: number }> = ({ x, y, frame, u, on = 1 }) => {
  const flick = 0.85 + 0.15 * Math.abs(Math.sin(frame * 0.9) * Math.sin(frame * 0.37))
  return (
    <g>
      <defs><radialGradient id={u(`dl${x}`)} cx="0.5" cy="0" r="1"><stop offset="0%" stopColor="#FFE7A8" stopOpacity={0.55 * flick * on} /><stop offset="100%" stopColor="#FFE7A8" stopOpacity={0} /></radialGradient></defs>
      <path d={`M${x} ${y} L${x} ${y - 140} L${x + 60} ${y - 200}`} stroke={L.line} strokeWidth={3} fill="none" />
      <path d={`M${x + 40} ${y - 220} L${x + 100} ${y - 220} L${x + 90} ${y - 185} L${x + 50} ${y - 185} Z`} fill={L.ink} stroke={L.line} strokeWidth={2} />
      <path d={`M${x + 50} ${y - 185} L${x - 40} ${y + 60} L${x + 260} ${y + 60} L${x + 90} ${y - 185} Z`} fill={`url(#${u(`dl${x}`)})`} />
      <ellipse cx={x} cy={y + 2} rx={40} ry={8} fill="none" stroke={L.line} strokeWidth={2} />
    </g>
  )
}

export const Plant: React.FC<{ x: number; y: number; frame: number; s?: number }> = ({ x, y, frame, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-40, -110], [-10, -140], [20, -120], [45, -95], [-55, -80]].map(([dx, dy], k) => (
      <path key={k} d={`M0 0 Q${dx / 2} ${dy / 2} ${dx} ${dy}`} stroke={k % 2 ? '#3BAA6E' : '#5BBF85'} strokeWidth={7} strokeLinecap="round" fill="none" transform={`rotate(${Math.sin(frame / 30 + k) * 2.5})`} />
    ))}
    <path d="M-25 0 L25 0 L18 36 L-18 36 Z" fill={L.ink} stroke={L.line} strokeWidth={2} />
  </g>
)

export const Shelf: React.FC<{ x: number; y: number; w: number; rows?: number; seed?: number }> = ({ x, y, w, rows = 2, seed = 1 }) => (
  <g>{Array.from({ length: rows }, (_, r) => (
    <g key={r}><line x1={x} x2={x + w} y1={y + r * 80} y2={y + r * 80} stroke={L.line} strokeWidth={2} />
      {Array.from({ length: Math.floor(w / 30) }, (_, i) => rnd(seed + r * 9 + i) > 0.35 &&
        <rect key={i} x={x + 6 + i * 30} y={y + r * 80 - 34 - rnd(seed + i) * 18} width={20} height={34 + rnd(seed + i) * 18} fill="none" stroke={L.line} strokeWidth={1.5} />)}</g>))}</g>
)

// # Monitor with a glowing chart that ticks along
export const Monitor: React.FC<{ x: number; y: number; w: number; h: number; frame: number; trend?: 'up' | 'down' | 'mixed'; stand?: boolean }> = ({ x, y, w, h, frame, trend = 'mixed', stand = true }) => {
  const pts = Array.from({ length: 14 }, (_, i) => {
    const base = trend === 'up' ? 0.85 - i * 0.05 : trend === 'down' ? 0.2 + i * 0.05 : 0.5 + 0.25 * Math.sin(i * 0.9 + frame / 25)
    return `${i ? 'L' : 'M'}${x + 14 + (i * (w - 28)) / 13} ${y + 14 + (h - 28) * Math.min(0.92, Math.max(0.08, base + (rnd(i + w) - 0.5) * 0.12))}`
  }).join(' ')
  const col = trend === 'down' ? COLORS.red : trend === 'up' ? COLORS.green : '#4FB5E8'
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="#071526" stroke={L.line} strokeWidth={2} />
      <rect x={x} y={y} width={w} height={h} rx={6} fill="#4FB5E8" opacity={0.05 + 0.03 * Math.sin(frame / 9)} />
      <path d={pts} stroke={col} strokeWidth={3} fill="none" />
      {stand && <path d={`M${x + w / 2 - 10} ${y + h} L${x + w / 2 - 20} ${y + h + 40} L${x + w / 2 + 20} ${y + h + 40} L${x + w / 2 + 10} ${y + h} Z`} fill={L.ink} stroke={L.line} strokeWidth={2} />}
    </g>
  )
}

export const OfficeChair: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g fill="none" stroke={L.line} strokeWidth={2}>
    <rect x={x - 60} y={y - 200} width={120} height={140} rx={20} fill="#0B1424" />
    <rect x={x - 70} y={y - 60} width={140} height={22} rx={8} fill="#0B1424" />
    <line x1={x} x2={x} y1={y - 38} y2={y + 30} /><path d={`M${x - 60} ${y + 40} L${x + 60} ${y + 40}`} />
  </g>
)

export const Door: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({ x, y, w = 160, h = 300 }) => (
  <g fill="none" stroke={L.line} strokeWidth={2}><rect x={x} y={y - h} width={w} height={h} /><rect x={x + 20} y={y - h + 20} width={w - 40} height={h * 0.45} opacity={0.6} /><circle cx={x + w - 24} cy={y - h / 2} r={6} fill={L.line} /></g>
)

export const BrandPoster: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect width={170} height={220} fill="#0A1220" stroke={COLORS.champagne} strokeWidth={3} />
    <Emblem size={110} x={30} y={40} />
    <text x={85} y={196} textAnchor="middle" fill={COLORS.champagne} style={{ font: '700 18px Inter', letterSpacing: 3 }}>CAPITALCODE</text>
  </g>
)

// # Warm pool of light on a focal area
export const LightPool: React.FC<{ cx: number; cy: number; rx: number; ry: number; u: (n: string) => string; color?: string; o?: number; k: string }> = ({ cx, cy, rx, ry, u, color = L.warm, o = 0.3, k }) => (
  <g><defs><radialGradient id={u(`pool${k}`)}><stop offset="0%" stopColor={color} stopOpacity={o} /><stop offset="100%" stopColor={color} stopOpacity={0} /></radialGradient></defs>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${u(`pool${k}`)})`} /></g>
)

// # Line-art person silhouette for crowds/backgrounds (not the rig)
export const Extra: React.FC<{ x: number; y: number; s?: number; c?: string }> = ({ x, y, s = 1, c = L.line }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#0B1424" stroke={c} strokeWidth={2}>
    <circle cx={0} cy={-150} r={26} /><path d="M-44 0 L-40 -100 Q0 -124 40 -100 L44 0 Z" />
  </g>
)
