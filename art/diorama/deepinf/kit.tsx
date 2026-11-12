// ============================================================
// LONG VIDEO — "How Inflation Actually Works: The Deep Dive" (dd- pieces)
// This video's own world (owner rules r82/r83, drawn fresh): "Paper Market".
// Everything is cut from coloured paper and printed like a risograph poster:
// flat paper layers stacked with soft offset shadows (real depth), halftone
// dot shading, slightly misregistered ink outlines and paper grain.
// The hero object is YOUR DOLLAR, a paper banknote that physically shrinks
// as it loses buying power, next to YOUR BASKET of shopping and a big paper
// THERMOMETER that reads the inflation rate. Places change by chapter:
// grocery street, the statistics office, the bread market, an oil dock,
// a hall of mirrors (expectations), the 1930s, a wheelbarrow street, the
// central bank's lever room, a seesaw park and your kitchen table.
// Only engine helpers are shared (timing, Person rig, Headline, camera).
// ============================================================
import React from 'react'
import { clamp01, lerp, rnd } from '../kit'

export const C = {
  paper: '#F3EBDD', paperD: '#E3D6C1', ink: '#23304A', inkSoft: '#56607A', coral: '#F06C5B', coralD: '#B9443A', teal: '#2BA39A', tealD: '#1C6F69',
  mustard: '#F2B33D', mustardD: '#B8811F', pink: '#F4A7B9', sky: '#8CC7E8', skyD: '#5A9CC4', green: '#5BAE6A', greenD: '#3A7E49', cream: '#FFF8EA',
  bill: '#B9DDB0', billD: '#6FA066', brown: '#9C6B45', brownD: '#6B4429', night: '#2A3554', plum: '#6F5A8E', grey: '#A9A39A',
}
export const FONT = { big: '"Bebas Neue"', body: 'Inter' }
export const big = (size: number) => ({ font: `400 ${size}px ${FONT.big}` })
export const fadeIn = (f: number, a: number, d = 10) => (f < a - 2 ? 0 : Math.min(1, (f - (a - 2)) / d))
export const scene = (f: number, a: number, b: number, d = 10) => (f >= b + d + 2 ? 0 : fadeIn(f, a, d))

// ------------------------------------------------------------ paper textures: halftone dots + grain
export const Defs: React.FC = () => (
  <defs>
    <pattern id="dd-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="2.6" fill="#000" opacity="0.16" /></pattern>
    <pattern id="dd-dotsL" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.6" fill="#fff" opacity="0.35" /></pattern>
    <pattern id="dd-lines" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="5" height="12" fill="#000" opacity="0.09" /></pattern>
    <filter id="dd-shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="7" dy="9" stdDeviation="2" floodColor="#2A1F10" floodOpacity="0.28" /></filter>
    <filter id="dd-grain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="1" seed="3" /><feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.09 0" /></filter>
    <radialGradient id="dd-vig" cx="0.5" cy="0.5" r="0.75"><stop offset="0.62" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#3A2A15" stopOpacity="0.3" /></radialGradient>
    <radialGradient id="dd-glow"><stop offset="0" stopColor="#FFF3C0" stopOpacity="0.95" /><stop offset="1" stopColor="#FFF3C0" stopOpacity="0" /></radialGradient>
  </defs>
)
export const Grain: React.FC = () => <g pointerEvents="none"><rect width={1920} height={1080} filter="url(#dd-grain)" /><rect width={1920} height={1080} fill="url(#dd-vig)" /></g>
// # a paper cut-out: fill + halftone shading + misregistered ink outline + drop shadow
export const Cut: React.FC<{ d: string; fill: string; shade?: boolean; o?: number; ink?: string }> = ({ d, fill, shade = true, o = 1, ink = C.ink }) => (
  <g opacity={o}><path d={d} fill="#2A1F10" opacity={0.26} transform="translate(7 9)" /><path d={d} fill={fill} />{shade && <path d={d} fill="url(#dd-dots)" />}<path d={d} fill="none" stroke={ink} strokeWidth={3} transform="translate(2 -2)" opacity={0.55} /></g>
)
const rr = (x: number, y: number, w: number, h: number, r = 10) => `M${x + r} ${y} h${w - 2 * r} a${r} ${r} 0 0 1 ${r} ${r} v${h - 2 * r} a${r} ${r} 0 0 1 ${-r} ${r} h${-(w - 2 * r)} a${r} ${r} 0 0 1 ${-r} ${-r} v${-(h - 2 * r)} a${r} ${r} 0 0 1 ${r} ${-r} Z`
export const box = rr

// ------------------------------------------------------------ backdrop: a paper sky, a halftone sun, layered paper hills and a street at y=G
export type Sky = 'day' | 'warm' | 'dusk' | 'night' | 'grey' | 'sepia' | 'mint'
const SKY: Record<Sky, [string, string]> = { day: ['#9FD3EE', '#CFE9F5'], warm: ['#F7C9A0', '#FBE3C8'], dusk: ['#8E7BB0', '#F2B6A0'], night: ['#2A3554', '#46557A'], grey: ['#AEB4BC', '#D5D8DB'], sepia: ['#CDB892', '#E8DAC0'], mint: ['#A8DCCB', '#DDF1E9'] }
export const Back: React.FC<{ sky: Sky; f: number; G?: number; sun?: [number, number] | null; street?: boolean }> = ({ sky, f, G = 900, sun = [1580, 250], street = true }) => {
  const [a, b] = SKY[sky]
  return (
    <g>
      <rect width={1920} height={1080} fill={b} /><rect width={1920} height={G - 260} fill={a} /><rect width={1920} height={1080} fill="url(#dd-lines)" opacity={0.25} />
      {sun && <g><circle cx={sun[0]} cy={sun[1]} r={120} fill={sky === 'night' ? '#F4EBC8' : C.mustard} /><circle cx={sun[0]} cy={sun[1]} r={120} fill="url(#dd-dotsL)" /></g>}
      {[0, 1, 2].map((k) => { const x = ((k * 700 + f * (0.3 + 0.1 * k)) % 2400) - 300; return <Cut key={k} d={`M${x} ${200 + k * 70} q 40 -60 100 -20 q 40 -50 100 0 q 60 -10 60 40 Z`} fill={sky === 'night' ? '#5B678A' : '#FFFFFF'} shade={false} /> })}
      <Cut d={`M0 ${G - 210} C 300 ${G - 320} 600 ${G - 190} 900 ${G - 250} S 1500 ${G - 330} 1920 ${G - 230} V${G} H0 Z`} fill={sky === 'night' ? '#3B4A6A' : sky === 'sepia' ? '#B9A57E' : '#B7D7A8'} />
      <Cut d={`M0 ${G - 110} C 400 ${G - 170} 900 ${G - 90} 1300 ${G - 130} S 1800 ${G - 120} 1920 ${G - 120} V${G} H0 Z`} fill={sky === 'night' ? '#2F3D5A' : sky === 'sepia' ? '#A68F66' : '#8CC383'} />
      {street ? <g><rect x={0} y={G} width={1920} height={1080 - G} fill={sky === 'night' ? '#39415A' : '#C9BBA4'} /><rect x={0} y={G} width={1920} height={1080 - G} fill="url(#dd-dots)" /><rect x={0} y={G} width={1920} height={8} fill={C.ink} opacity={0.25} /></g>
        : <rect x={0} y={G} width={1920} height={1080 - G} fill={sky === 'night' ? '#2F3D5A' : '#8CC383'} />}
    </g>
  )
}
// ------------------------------------------------------------ YOUR DOLLAR: a paper banknote; power 1 = full size, shrinks as buying power falls
export const Dollar: React.FC<{ x: number; y: number; s?: number; power?: number; o?: number; rot?: number; v?: string }> = ({ x, y, s = 1, power = 1, o = 1, rot = 0, v = '$1' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * power})`} opacity={o}>
    <Cut d={rr(-150, -70, 300, 140, 12)} fill={C.bill} />
    <rect x={-132} y={-54} width={264} height={108} rx={8} fill="none" stroke={C.billD} strokeWidth={4} />
    <ellipse cx={0} cy={0} rx={44} ry={44} fill={C.cream} stroke={C.billD} strokeWidth={4} />
    <text y={18} textAnchor="middle" fill={C.billD} style={big(52)}>{v}</text>
    <text x={-104} y={-24} fill={C.billD} style={big(30)}>1</text><text x={92} y={44} fill={C.billD} style={big(30)}>1</text>
  </g>
)
// # YOUR BASKET: wicker basket with bread, eggs, coffee; `tag` = price shown on a tied tag
export const Basket: React.FC<{ x: number; y: number; s?: number; tag?: string; o?: number; tagCol?: string }> = ({ x, y, s = 1, tag, o = 1, tagCol = C.cream }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-120 -90 Q 0 -230 120 -90" fill="none" stroke={C.brownD} strokeWidth={12} />
    <Cut d="M-80 -150 q 80 -60 150 -10 l -10 60 l -140 0 Z" fill={C.mustard} />
    <Cut d={rr(-110, -170, 60, 110, 12)} fill={C.coral} /><Cut d="M20 -130 a 28 34 0 1 1 1 0 Z M70 -120 a 26 32 0 1 1 1 0 Z" fill={C.cream} />
    <Cut d="M-140 -100 H140 L110 30 H-110 Z" fill={C.brown} />
    {[0, 1, 2, 3].map((k) => <line key={k} x1={-130 + k * 6} y1={-70 + k * 26} x2={130 - k * 6} y2={-70 + k * 26} stroke={C.brownD} strokeWidth={4} />)}
    {tag && <g transform="translate(140 -60) rotate(8)"><line x1={-30} y1={-10} x2={0} y2={0} stroke={C.ink} strokeWidth={3} /><Tag x={70} y={10} text={tag} size={40} color={tagCol} /></g>}
  </g>
)
// # a price tag label (this video's label shape): a tag with a punched hole
export const Tag: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; color?: string; ink?: string; rot?: number }> = ({ x, y, text, o = 1, size = 40, color = C.cream, ink = C.ink, rot = 0 }) => {
  if (o <= 0.01) return null
  const W = Math.max(120, text.length * size * 0.5 + 70), H = size + 26
  return (
    <g opacity={o} transform={`translate(${x} ${y}) rotate(${rot})`}>
      <Cut d={`M${-W / 2} ${-H / 2 + 14} L${-W / 2 + 18} ${-H / 2} H${W / 2} V${H / 2} H${-W / 2 + 18} L${-W / 2} ${H / 2 - 14} Z`} fill={color} shade={false} />
      <circle cx={-W / 2 + 22} cy={0} r={6} fill={C.paperD} stroke={C.ink} strokeWidth={2} />
      <text x={10} y={size * 0.36} textAnchor="middle" fill={ink} style={big(size)}>{text}</text>
    </g>
  )
}
// # the paper THERMOMETER: reading v (percent) on a 0..max scale
export const Thermo: React.FC<{ x: number; y: number; v: number; max?: number; s?: number; o?: number; label?: string; ink?: string }> = ({ x, y, v, max = 16, s = 1, o = 1, label, ink = C.ink }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Cut d={`${rr(-34, -420, 68, 400, 34)} M0 40 m-60 0 a60 60 0 1 0 120 0 a60 60 0 1 0 -120 0`} fill={C.cream} />
    <rect x={-16} y={-400 + 380 * (1 - clamp01(v / max))} width={32} height={380 * clamp01(v / max) + 20} rx={16} fill={C.coral} />
    <circle cx={0} cy={40} r={44} fill={C.coral} />
    {[0, 4, 8, 12, 16].filter((t) => t <= max).map((t) => <g key={t}><line x1={34} y1={-20 - 380 * t / max} x2={58} y2={-20 - 380 * t / max} stroke={C.ink} strokeWidth={4} /><text x={66} y={-10 - 380 * t / max} fill={ink} style={big(30)}>{t}%</text></g>)}
    <text y={160} textAnchor="middle" fill={ink} style={big(56)}>{label ?? `${v.toFixed(1)}%`}</text>
  </g>
)
// # a paper storefront with a striped awning
export const Shop: React.FC<{ x: number; y: number; s?: number; name?: string; col?: string; o?: number }> = ({ x, y, s = 1, name = 'GROCER', col = C.teal, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Cut d={rr(-220, -330, 440, 330, 6)} fill={C.cream} />
    <Cut d="M-240 -330 H240 L220 -260 H-220 Z" fill={col} />
    {[...Array(8)].map((_, k) => <path key={k} d={`M${-240 + k * 60} -330 h30 l-4 70 h-30 Z`} fill={C.cream} opacity={0.85} />)}
    <rect x={-180} y={-230} width={170} height={140} fill={C.sky} stroke={C.ink} strokeWidth={4} /><rect x={30} y={-230} width={150} height={230} fill={C.brown} stroke={C.ink} strokeWidth={4} />
    <rect x={-140} y={-380} width={280} height={50} rx={8} fill={C.ink} /><text y={-343} textAnchor="middle" fill={C.cream} style={big(40)}>{name}</text>
  </g>
)
export const Loaf: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><Cut d="M-50 0 Q -56 -50 0 -54 Q 56 -50 50 0 Z" fill={C.mustard} />{[-20, 0, 20].map((k) => <path key={k} d={`M${k - 8} -40 l 14 18`} stroke={C.mustardD} strokeWidth={5} />)}</g>
)
export const Barrel: React.FC<{ x: number; y: number; s?: number; o?: number; v?: string }> = ({ x, y, s = 1, o = 1, v }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><Cut d={rr(-70, -200, 140, 200, 24)} fill={C.ink} />{[-150, -50].map((yy) => <rect key={yy} x={-72} y={yy} width={144} height={14} fill={C.grey} />)}
    {v && <text y={-90} textAnchor="middle" fill={C.mustard} style={big(48)}>{v}</text>}</g>
)
export const Calendar: React.FC<{ x: number; y: number; s?: number; o?: number; text: string; col?: string }> = ({ x, y, s = 1, o = 1, text, col = C.coral }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><Cut d={rr(-90, -90, 180, 180, 12)} fill={C.cream} /><rect x={-90} y={-90} width={180} height={46} rx={10} fill={col} /><text y={50} textAnchor="middle" fill={C.ink} style={big(62)}>{text}</text></g>
)
export const House: React.FC<{ x: number; y: number; s?: number; o?: number; col?: string }> = ({ x, y, s = 1, o = 1, col = C.pink }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><Cut d="M-90 0 V-120 L0 -200 L90 -120 V0 Z" fill={col} /><rect x={-20} y={-70} width={40} height={70} fill={C.brownD} /><rect x={-70} y={-110} width={36} height={32} fill={C.sky} stroke={C.ink} strokeWidth={3} /></g>
)
// # stacked paper bills (a pile of cash); n bundles
export const Cash: React.FC<{ x: number; y: number; n: number; s?: number; o?: number }> = ({ x, y, n, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>{[...Array(Math.max(0, Math.round(n)))].map((_, k) => <g key={k} transform={`translate(${(rnd(k) - 0.5) * 16} ${-k * 22})`}><Cut d={rr(-80, -20, 160, 40, 6)} fill={C.bill} shade={false} /><rect x={-20} y={-20} width={40} height={40} fill={C.billD} opacity={0.5} /></g>)}</g>
)
export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; o?: number; col?: string; w?: number }> = ({ x1, y1, x2, y2, o = 1, col = C.ink, w = 10 }) => {
  if (o <= 0.01) return null
  const a = Math.atan2(y2 - y1, x2 - x1), h = 26
  return <g opacity={o}><line x1={x1} y1={y1} x2={x2 - Math.cos(a) * h * 0.6} y2={y2 - Math.sin(a) * h * 0.6} stroke={col} strokeWidth={w} strokeLinecap="round" />
    <path d={`M${x2} ${y2} L${x2 - h * Math.cos(a - 0.5)} ${y2 - h * Math.sin(a - 0.5)} L${x2 - h * Math.cos(a + 0.5)} ${y2 - h * Math.sin(a + 0.5)} Z`} fill={col} /></g>
}
export const Strike: React.FC<{ x: number; y: number; w: number; t: number }> = ({ x, y, w, t }) => t <= 0.01 ? null : <line x1={x - w / 2} y1={y + 10} x2={x - w / 2 + w * t} y2={y - 10} stroke={C.coral} strokeWidth={12} strokeLinecap="round" />
export { lerp }
