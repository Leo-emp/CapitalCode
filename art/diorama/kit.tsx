// ============================================================
// DIORAMA KIT — the pieces of the "continuous transforming
// illustration" style (spec 2026-10-25-capitalcode-diorama-style):
// a soft stage, objects that are built on the words and then act,
// premium easing. Clean, polished, coherent: generous space, soft
// gradients, soft shadows, gentle highlights, no harsh outlines.
// Pure functions of the frame, deterministic.
// ============================================================
import React from 'react'
import { COLORS } from '../tokens'

// ------------------------------------------------------------ timing + easing
export const clamp01 = (t: number) => Math.max(0, Math.min(1, t))
// # progress 0→1 between two frames
export const span = (f: number, a: number, b: number) => clamp01((f - a) / Math.max(1, b - a))
export const easeInOut = (t: number) => { const x = clamp01(t); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 }
export const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3)
// # premium "settle": a small overshoot (≈ 6%) then rest
export const settle = (t: number) => { const x = clamp01(t), c = 1.2; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2) }
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const rnd = (seed: number) => { const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

// ------------------------------------------------------------ palette (ours)
export const P = {
  navy0: '#0E1B33', navy1: '#16294A', navy2: '#1E3A63', navy3: '#2B4A78', navy4: '#3A5F93',
  teal0: '#0B3640', teal1: '#11505F', teal2: '#1A6B7C',
  champ: COLORS.champagne, champL: COLORS.champagneLight, gold: '#E9C25A', goldD: '#B88A2E',
  sky: '#5BCBFF', skyD: '#2A8FD0', coral: '#F06B5B', coralD: '#C94A3E', mint: '#3DDC97', cream: '#F2E6CC', white: '#F7FAFF',
  // # mood-aware colours (set by the piece's mood, see THEMES): words and lines drawn on the stage, and soft shadows
  ink: 'var(--cc-ink, #F0EAE1)', ink2: 'var(--cc-ink2, #C2B9B1)', shadow: 'var(--cc-shadow, #000)',
  // # a soft panel/medallion on the stage, and coloured words that stay readable on cream (darker by day)
  card: 'var(--cc-card, #16294A)', goldInk: 'var(--cc-gold, #E9C25A)', skyInk: 'var(--cc-sky, #5BCBFF)', mintInk: 'var(--cc-mint, #3DDC97)', coralInk: 'var(--cc-coral, #F06B5B)',
  // # paper objects (tags, calendars, cards, sails): cream at night, white with a soft edge by day so they stand off the cream stage
  paper: 'var(--cc-paper, #F2E6CC)', edge: 'var(--cc-edge, none)',
}

// ------------------------------------------------------------ moods: light (cream/beige paper) and dark (navy night)
// # A piece is drawn once; its mood only changes the stage and the ink. Light = explaining, good news, the answer;
// # dark = risk, bubbles, warnings. bg = the main stage, alt = the second stage a piece cuts to (teal at night, sand by day).
export type Mood = 'light' | 'dark'
type Theme = { bg: [string, string]; alt: [string, string]; ink: string; ink2: string; shadow: string; speck: string; vignette: number; card: string; gold: string; sky: string; mint: string; coral: string; paper: string; edge: string }
export const THEMES: Record<Mood, Theme> = {
  dark: { bg: [P.navy3, P.navy0], alt: [P.teal2, P.teal0], ink: COLORS.champagneLight, ink2: COLORS.champagne, shadow: '#000', speck: COLORS.champagneLight, vignette: 0.35,
    card: P.navy1, gold: P.gold, sky: P.sky, mint: P.mint, coral: P.coral, paper: P.cream, edge: 'none' },
  light: { bg: ['#F8EFDF', '#E6D5B8'], alt: ['#F2E4CA', '#DAC39E'], ink: '#16294A', ink2: '#5C6F8E', shadow: '#5A4426', speck: '#B79E78', vignette: 0.12,
    card: '#FFFDF8', gold: '#B4821C', sky: '#1F7FC0', mint: '#1E9A63', coral: '#D9483A', paper: '#FFFFFF', edge: '#CDB58C' },
}
// # the CSS variables a piece's <g> carries so every colour below follows its mood
export const themeStyle = (m: Mood): React.CSSProperties => {
  const t = THEMES[m]
  return { '--cc-bg0': t.bg[0], '--cc-bg1': t.bg[1], '--cc-alt0': t.alt[0], '--cc-alt1': t.alt[1], '--cc-ink': t.ink, '--cc-ink2': t.ink2, '--cc-shadow': t.shadow, '--cc-speck': t.speck, '--cc-vg': String(t.vignette), '--cc-card': t.card, '--cc-gold': t.gold, '--cc-sky': t.sky, '--cc-mint': t.mint, '--cc-coral': t.coral, '--cc-paper': t.paper, '--cc-edge': t.edge } as React.CSSProperties
}

// ------------------------------------------------------------ stage: soft lit background, vignette, drifting specks
// # w/h: the canvas (1920×1080 for long videos, 1080×1920 for Shorts)
export const Stage: React.FC<{ id: string; tint?: 'navy' | 'teal'; frame: number; w?: number; h?: number }> = ({ id, tint = 'navy', frame, w = 1920, h = 1080 }) => {
  const [c0, c1] = tint === 'teal' ? ['var(--cc-alt0, #1A6B7C)', 'var(--cc-alt1, #0B3640)'] : ['var(--cc-bg0, #2B4A78)', 'var(--cc-bg1, #0E1B33)']
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.5" cy="0.42" r="0.75"><stop offset="0%" stopColor={c0} /><stop offset="100%" stopColor={c1} /></radialGradient>
        <radialGradient id={`${id}-vg`} cx="0.5" cy="0.5" r="0.72"><stop offset="70%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor={P.shadow} stopOpacity={'var(--cc-vg, 0.35)' as unknown as number} /></radialGradient>
      </defs>
      <rect x={-2000} y={-2000} width={6000} height={5000} fill={`url(#${id}-bg)`} />
      {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={((rnd(i) * w + frame * (0.2 + rnd(i + 3) * 0.4)) % (w + 80)) - 40} cy={rnd(i + 9) * h - Math.sin(frame / 60 + i) * 6} r={1.5 + rnd(i + 5) * 2.5} fill="var(--cc-speck, #F0EAE1)" opacity={0.08 + rnd(i + 7) * 0.12} />)}
    </g>
  )
}
export const Vignette: React.FC<{ id: string; w?: number; h?: number }> = ({ id, w = 1920, h = 1080 }) => <rect width={w} height={h} fill={`url(#${id}-vg)`} pointerEvents="none" />

// ------------------------------------------------------------ the island the city stands on
export const Platform: React.FC<{ id: string; cx: number; cy: number; rx: number; ry: number }> = ({ id, cx, cy, rx, ry }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={P.navy4} /><stop offset="100%" stopColor={P.navy3} /></linearGradient>
      <linearGradient id={`${id}-side`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={P.navy2} /><stop offset="100%" stopColor={P.navy1} /></linearGradient>
    </defs>
    <ellipse cx={cx} cy={cy + 70} rx={rx * 1.02} ry={ry * 0.9} fill={P.shadow} opacity={0.22} />
    <path d={`M${cx - rx} ${cy} L${cx - rx} ${cy + 46} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + 46} L${cx + rx} ${cy} Z`} fill={`url(#${id}-side)`} />
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id}-top)`} />
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={P.champL} strokeOpacity={0.18} strokeWidth={3} />
  </g>
)

// ------------------------------------------------------------ a small company building (lit face + shade face + roof)
const BODY = [P.sky, P.coral, P.cream, '#7FC8D8', '#E8B4C8', P.champ]
export const Building: React.FC<{ x: number; y: number; s: number; seed: number; glow?: number; dim?: number }> = ({ x, y, s, seed, glow = 0, dim = 0 }) => {
  const w = (26 + rnd(seed) * 18) * s, h = (34 + rnd(seed + 1) * 46) * s, c = BODY[Math.floor(rnd(seed + 2) * BODY.length)]
  return (
    <g opacity={1 - dim * 0.55}>
      <ellipse cx={x} cy={y} rx={w * 0.75} ry={w * 0.18} fill={P.shadow} opacity={0.18} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill={c} />
      <rect x={x + w * 0.12} y={y - h} width={w * 0.38} height={h} fill="#0E1B33" opacity={0.22} />
      <rect x={x - w / 2 - 2 * s} y={y - h - 4 * s} width={w + 4 * s} height={5 * s} fill={P.white} opacity={0.85} />
      {h > 50 * s && <rect x={x - w * 0.3} y={y - h * 0.7} width={w * 0.24} height={h * 0.18} fill={P.navy2} opacity={0.55} />}
      {glow > 0 && <rect x={x - w / 2} y={y - h} width={w} height={h} fill={P.gold} opacity={0.55 * glow} />}
    </g>
  )
}

// ------------------------------------------------------------ a giant tower (the top 10): glass body, gold crown
export const Tower: React.FC<{ id: string; x: number; y: number; h: number; w?: number; glow?: number; i: number }> = ({ id, x, y, h, w = 74, glow = 0, i }) => (
  <g>
    <defs><linearGradient id={`${id}-t${i}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9FDCFF" /><stop offset="55%" stopColor={P.sky} /><stop offset="100%" stopColor={P.skyD} /></linearGradient></defs>
    <ellipse cx={x} cy={y} rx={w * 0.8} ry={w * 0.2} fill={P.shadow} opacity={0.2} />
    <rect x={x - w / 2} y={y - h} width={w} height={h} rx={6} fill={`url(#${id}-t${i})`} />
    {Array.from({ length: Math.max(0, Math.floor(h / 26)) }, (_, k) => <rect key={k} x={x - w / 2 + 8} y={y - h + 14 + k * 26} width={w - 16} height={4} rx={2} fill={P.white} opacity={0.35} />)}
    <path d={`M${x - w / 2 - 4} ${y - h} L${x} ${y - h - w * 0.45} L${x + w / 2 + 4} ${y - h} Z`} fill={P.gold} />
    <rect x={x - w / 2} y={y - h} width={w} height={h} rx={6} fill={P.gold} opacity={0.35 * glow} />
    {glow > 0 && <ellipse cx={x} cy={y - h - w * 0.2} rx={w * 1.2} ry={w * 0.5} fill={P.gold} opacity={0.18 * glow} />}
  </g>
)

// ------------------------------------------------------------ the fund: a polished box with a slot and a small chart badge
export const FundBox: React.FC<{ id: string; x: number; y: number; s?: number; open?: number; label?: string }> = ({ id, x, y, s = 1, open = 0, label = 'S&P 500' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><linearGradient id={`${id}-box`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={P.navy4} /><stop offset="100%" stopColor={P.navy2} /></linearGradient></defs>
    <ellipse cx={0} cy={118} rx={190} ry={22} fill={P.shadow} opacity={0.25} />
    <rect x={-160} y={-100} width={320} height={216} rx={22} fill={`url(#${id}-box)`} />
    <rect x={-160} y={-100} width={320} height={216} rx={22} fill="none" stroke={P.champ} strokeWidth={4} />
    <rect x={-140} y={-80} width={280} height={8} rx={4} fill={P.white} opacity={0.12} />
    {/* # lid lifts open */}
    <g transform={`translate(0 ${-100 - open * 40}) rotate(${-open * 18} -160 0)`}>
      <rect x={-170} y={-26} width={340} height={30} rx={10} fill={P.champ} />
      <rect x={-70} y={-16} width={140} height={10} rx={5} fill={P.navy0} />
    </g>
    <text x={0} y={30} textAnchor="middle" fill={P.champL} style={{ font: '700 54px Inter', letterSpacing: 2 }}>{label}</text>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-46 + k * 24} y={86 - (12 + k * 8)} width={16} height={12 + k * 8} rx={3} fill={k === 3 ? P.mint : P.sky} />)}
  </g>
)

// ------------------------------------------------------------ banknote and the slivers it splits into
export const Bill: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-90} y={-46} width={180} height={92} rx={10} fill="#5FBF7F" />
    <rect x={-80} y={-36} width={160} height={72} rx={6} fill="none" stroke="#2E8B57" strokeWidth={3} />
    <circle cx={0} cy={0} r={24} fill="#2E8B57" opacity={0.35} />
    <text x={0} y={12} textAnchor="middle" fill="#1F5A3E" style={{ font: '800 34px Inter' }}>100</text>
    <rect x={-90} y={-46} width={180} height={20} rx={10} fill={P.white} opacity={0.12} />
  </g>
)
export const Sliver: React.FC<{ x: number; y: number; r?: number; s?: number; o?: number; gold?: boolean }> = ({ x, y, r = 0, s = 1, o = 1, gold }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-9} y={-5} width={18} height={10} rx={2} fill={gold ? P.gold : '#5FBF7F'} />
    <rect x={-9} y={-5} width={18} height={3} rx={1.5} fill={P.white} opacity={0.3} />
  </g>
)
// # a point along a soft arc from a to b (t 0→1), the arc lifting by `lift` px at the middle
export const arc = (a: { x: number; y: number }, b: { x: number; y: number }, t: number, lift = 120) => ({
  x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) - Math.sin(Math.PI * t) * lift,
})

// ------------------------------------------------------------ the hero's hand + sleeve (our cast colours)
export const Hand: React.FC<{ x: number; y: number; r?: number; s?: number; open?: number }> = ({ x, y, r = 0, s = 1, open = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-700} y={-46} width={640} height={92} rx={40} fill="#2B8FE0" />
    <rect x={-700} y={-46} width={640} height={30} rx={20} fill="#5CC6FF" opacity={0.5} />
    <rect x={-84} y={-50} width={34} height={100} rx={10} fill="#EEF3FA" />
    <ellipse cx={-6} cy={0} rx={60} ry={44} fill="#1E2F55" />
    {/* # fingers curl around the bill, then open to let go */}
    {[0, 1, 2, 3].map((k) => <rect key={k} x={30} y={-36 + k * 22} width={48 - open * 14} height={18} rx={9} fill="#2A3F6E" transform={`rotate(${open * 18} 30 ${-27 + k * 22})`} />)}
    <rect x={-30} y={-58} width={60} height={20} rx={10} fill="#2A3F6E" transform="rotate(-30 0 -48)" />
  </g>
)

// ------------------------------------------------------------ a glass dome (the "safe" promise) that can crack
export const Dome: React.FC<{ id: string; cx: number; cy: number; rx: number; ry: number; show: number; crack: number; shatter: number }> = ({ id, cx, cy, rx, ry, show, crack, shatter }) => {
  if (show <= 0) return null
  const lines = [[0.48, 0.1, 0.4, 0.45, 0.46, 0.7], [0.52, 0.1, 0.6, 0.4, 0.55, 0.65], [0.3, 0.3, 0.38, 0.55], [0.7, 0.3, 0.64, 0.6]]
  return (
    <g opacity={show * (1 - shatter)} transform={`translate(0 ${shatter * 30})`}>
      <defs><linearGradient id={`${id}-dome`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#CFEFFF" stopOpacity={0.35} /><stop offset="100%" stopColor="#5BCBFF" stopOpacity={0.08} /></linearGradient></defs>
      <path d={`M${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy} Z`} fill={`url(#${id}-dome)`} />
      <path d={`M${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`} fill="none" stroke="#CFEFFF" strokeOpacity={0.6} strokeWidth={4} />
      <path d={`M${cx - rx * 0.7} ${cy - ry * 0.5} A${rx * 0.75} ${ry * 0.8} 0 0 1 ${cx - rx * 0.1} ${cy - ry * 0.93}`} fill="none" stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={10} strokeLinecap="round" />
      {crack > 0 && lines.map((l, k) => {
        const pts: string[] = []
        for (let j = 0; j < l.length; j += 2) pts.push(`${j ? 'L' : 'M'}${cx - rx + l[j] * 2 * rx} ${cy - ry + l[j + 1] * ry}`)
        return <path key={k} d={pts.join(' ')} fill="none" stroke="#FFFFFF" strokeWidth={4} strokeDasharray="2000" strokeDashoffset={2000 * (1 - crack)} strokeLinejoin="round" />
      })}
    </g>
  )
}

// ------------------------------------------------------------ zig-zag paper wipe (the reference's drawn transition)
// # p 0→1 sweeps a zig-zag paper edge from right to left. 'cover' fills behind the edge (the old picture
// # disappears); 'reveal' fills ahead of it (the new picture appears behind it). Swap scenes between the two.
export const ZigZagWipe: React.FC<{ p: number; color: string; mode: 'cover' | 'reveal'; w?: number; h?: number }> = ({ p, color, mode, w = 1920, h = 1080 }) => {
  if (p <= 0 || p >= 1) return null
  const x = lerp(w + 180, -300, easeInOut(p)), n = Math.ceil(h / 50) + 2, teeth = Array.from({ length: n }, (_, i) => `L${x + (i % 2 ? 40 : 0)} ${i * 50}`).join(' ')
  const far = mode === 'cover' ? w + 480 : -400, bottom = (n - 1) * 50
  return <path d={`M${x} 0 ${teeth} L${x} ${bottom} L${far} ${bottom} L${far} 0 Z`} fill={color} />
}

// ------------------------------------------------------------ shorthand used by every piece
// # eased 0→1 from cue frame a over d frames; pop = the same with the small premium overshoot
export const on = (f: number, a: number, d = 14) => easeOut(span(f, a, a + d))
export const pop = (f: number, a: number, d = 12) => settle(span(f, a, a + d))
// # 1 while f is inside [a, b), fading in/out over 8 frames — for things that come and go
export const between = (f: number, a: number, b: number) => Math.min(easeOut(span(f, a - 2, a + 8)), 1 - easeOut(span(f, b - 8, b)))

// # a round pedestal a small figure or an object stands on
export const Pedestal: React.FC<{ x: number; y: number; r?: number; color?: string }> = ({ x, y, r = 70, color = P.navy4 }) => (
  <g>
    <ellipse cx={x} cy={y + 18} rx={r * 1.05} ry={r * 0.3} fill={P.shadow} opacity={0.2} />
    <path d={`M${x - r} ${y} L${x - r} ${y + 14} A${r} ${r * 0.28} 0 0 0 ${x + r} ${y + 14} L${x + r} ${y} Z`} fill={P.navy2} />
    <ellipse cx={x} cy={y} rx={r} ry={r * 0.28} fill={color} />
  </g>
)
