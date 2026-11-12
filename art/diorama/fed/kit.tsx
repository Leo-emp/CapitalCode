// ============================================================
// LONG VIDEO — "How the Federal Reserve Actually Works"
// Art direction: "THE ENGINE ROOM" — the Fed as a calm marble building
// that runs the country's money through copper pipes and glass tanks.
// Warm marble cream (main world), slate blue, copper, teal water for
// bank reserves, coral for rising costs. Settings change by chapter:
// the committee room, the marble hall, a tug-of-war field, the tank
// room under the Fed, Sam's kitchen, a city chain, the print shop,
// Congress steps. Depth: marble veins, soft shadows, glass highlights,
// paper grain + vignette. Owner rules: cream main (r57), one picture
// group at a time, scenes dip (never two at once), no zooms, labels
// stuck to their part. Only engine helpers are shared (Person, Headline).
// ============================================================
import React from 'react'
import { clamp01, lerp } from '../kit'

export const F = {
  ink: '#24324A', inkSoft: '#5A6880', inkL: '#9AA6B8',
  marble: '#F6F1E7', marbleD: '#E6DDCB', marbleDD: '#CFC2A8', marbleL: '#FFFCF5', vein: '#D9CFBD',
  copper: '#C7793E', copperD: '#8E5226', copperL: '#EDBB8E',
  teal: '#2E8C8C', tealD: '#1D6464', tealL: '#BFE3E0', water: '#5FB7C2',
  coral: '#E0644F', coralD: '#A8402F', coralL: '#F6C4B8',
  green: '#3E9B6A', greenD: '#2A6E4A', greenL: '#CDEBD9',
  slate: '#2E3D58', slateL: '#4B5D80', sky: '#BBD7E6', gold: '#E8BE4F', goldD: '#A9822A',
  white: '#FFFFFF',
}
export const FONT = { big: '"Bebas Neue"', body: 'Inter' }

export const cues = <T extends Record<string, string>>(c: (k: string) => number, K: T) => Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as { [P in keyof T]: number }
// # scenes dip (old gone by b, next starts at b) — never two pictures at once
export const fadeIn = (f: number, a: number, d = 8) => (a <= 0 ? 1 : clamp01((f - a) / d))
export const scene = (f: number, a: number, b: number, d = 8) => (f >= b ? 0 : fadeIn(f, a, d) * (1 - clamp01((f - (b - d)) / d)))
export const FLOOR = 900

export const FDefs: React.FC = () => (
  <>
    <rect width={1920} height={1080} fill={F.marble} />
    <defs>
      <linearGradient id="fed-marble" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={F.marbleL} /><stop offset="1" stopColor={F.marble} /></linearGradient>
      <linearGradient id="fed-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FBF6EC" /><stop offset="1" stopColor="#ECE2CF" /></linearGradient>
      <linearGradient id="fed-col" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={F.marbleDD} /><stop offset="0.4" stopColor={F.marbleL} /><stop offset="1" stopColor={F.marbleD} /></linearGradient>
      <linearGradient id="fed-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CDBF9F" /><stop offset="1" stopColor="#A9997A" /></linearGradient>
      <linearGradient id="fed-slate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#22304A" /><stop offset="1" stopColor="#3A4C6E" /></linearGradient>
      <linearGradient id="fed-copper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={F.copperL} /><stop offset="1" stopColor={F.copperD} /></linearGradient>
      <linearGradient id="fed-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8FD3DA" /><stop offset="1" stopColor={F.teal} /></linearGradient>
      <linearGradient id="fed-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0.55" /><stop offset="0.3" stopColor="#fff" stopOpacity="0.1" /><stop offset="1" stopColor="#fff" stopOpacity="0.3" /></linearGradient>
      <linearGradient id="fed-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A9CFE2" /><stop offset="1" stopColor="#F7EAD2" /></linearGradient>
      <radialGradient id="fed-vig" cx="0.5" cy="0.45" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#2A2010" stopOpacity="0.22" /></radialGradient>
      <filter id="fed-grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" /><feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.22  0 0 0 0 0.18  0 0 0 0.07 0" /></filter>
    </defs>
  </>
)
export const FGrain: React.FC = () => <><rect width={1920} height={1080} filter="url(#fed-grain)" pointerEvents="none" /><rect width={1920} height={1080} fill="url(#fed-vig)" pointerEvents="none" /></>

// ------------------------------------------------------------ backdrops
// # a marble hall: veined walls, two arches far back, stone floor
export const Hall: React.FC = () => (
  <g>
    <rect width={1920} height={FLOOR} fill="url(#fed-wall)" />
    {[[140, 220, 520, 180], [900, 120, 1400, 260], [1500, 300, 1900, 160]].map(([a, b, c2, d], k) => <path key={k} d={`M${a} ${b} Q${(a + c2) / 2} ${b + 90} ${c2} ${d}`} stroke={F.vein} strokeWidth={3} fill="none" />)}
    {[420, 1500].map((x) => <g key={x}><path d={`M${x - 170} ${FLOOR - 40} L${x - 170} 420 Q${x - 170} 250 ${x} 250 Q${x + 170} 250 ${x + 170} 420 L${x + 170} ${FLOOR - 40} Z`} fill={F.marbleD} /><path d={`M${x - 130} ${FLOOR - 40} L${x - 130} 430 Q${x - 130} 290 ${x} 290 Q${x + 130} 290 ${x + 130} 430 L${x + 130} ${FLOOR - 40} Z`} fill="#E9DEC8" /></g>)}
    <rect y={FLOOR - 40} width={1920} height={40} fill={F.marbleDD} />
    <rect y={FLOOR} width={1920} height={180} fill="url(#fed-floor)" />
    {Array.from({ length: 10 }, (_, k) => <rect key={k} x={k * 200} y={FLOOR} width={98} height={180} fill="#fff" opacity={0.08} />)}
  </g>
)
// # a deep-slate control room (risk and mechanism scenes)
export const Engine: React.FC = () => (
  <g>
    <rect width={1920} height={1080} fill="url(#fed-slate)" />
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={0} y={130 + k * 150} width={1920} height={2} fill="#fff" opacity={0.05} />)}
    {[160, 1760].map((x) => <g key={x}><rect x={x - 18} y={0} width={36} height={1080} fill="url(#fed-copper)" opacity={0.55} /><rect x={x - 30} y={300} width={60} height={24} rx={6} fill={F.copperD} opacity={0.7} /><rect x={x - 30} y={700} width={60} height={24} rx={6} fill={F.copperD} opacity={0.7} /></g>)}
    <rect y={FLOOR} width={1920} height={180} fill="#1B2638" />
  </g>
)
// # an outdoor street with sky (Sam's world and the chain)
export const Street: React.FC = () => (
  <g>
    <rect width={1920} height={FLOOR} fill="url(#fed-sky)" />
    {[[0, 360, '#E9D7C0'], [280, 460, '#D7E4EA'], [1480, 420, '#E8D3C9'], [1720, 340, '#DCE7D9']].map(([x, h, col], k) => (
      <g key={k}><rect x={x as number} y={FLOOR - (h as number)} width={240} height={h as number} fill={col as string} />{Array.from({ length: 4 }, (_, j) => <rect key={j} x={(x as number) + 34 + (j % 2) * 100} y={FLOOR - (h as number) + 40 + Math.floor(j / 2) * 110} width={70} height={74} rx={6} fill="#fff" opacity={0.6} />)}</g>))}
    <rect y={FLOOR} width={1920} height={60} fill="#C9BCA6" /><rect y={FLOOR + 60} width={1920} height={120} fill="#8A8F98" />
  </g>
)
// # Sam's kitchen: warm wall, a window, a counter
export const Kitchen: React.FC = () => (
  <g>
    <rect width={1920} height={FLOOR} fill="#F4E6CF" />
    {Array.from({ length: 14 }, (_, k) => <rect key={k} x={k * 140} y={520} width={136} height={80} fill="#fff" opacity={0.25} />)}
    <g transform="translate(1440 220)"><rect x={-12} y={-12} width={344} height={284} rx={8} fill="#D9C6A4" /><rect width={320} height={260} fill="url(#fed-sky)" /><rect x={155} width={10} height={260} fill="#D9C6A4" /></g>
    <rect y={FLOOR - 24} width={1920} height={24} fill="#C9B08A" />
    <rect y={FLOOR} width={1920} height={180} fill="#B48D62" />
  </g>
)

// ------------------------------------------------------------ the Fed and other buildings
export const FedBuilding: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string }> = ({ x, y, s = 1, o = 1, sign = 'FEDERAL RESERVE' }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={380} ry={22} fill="#000" opacity={0.14} />
    <rect x={-360} y={-50} width={720} height={50} fill={F.marbleDD} />
    <rect x={-330} y={-360} width={660} height={310} fill={F.marbleL} stroke={F.marbleDD} strokeWidth={4} />
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-290 + k * 112} y={-340} width={44} height={290} fill="url(#fed-col)" />)}
    <rect x={-350} y={-400} width={700} height={44} fill={F.marbleD} stroke={F.marbleDD} strokeWidth={4} />
    <path d="M-360 -400 L0 -520 L360 -400 Z" fill={F.marbleD} stroke={F.marbleDD} strokeWidth={5} />
    <text x={0} y={-370} textAnchor="middle" fill={F.inkSoft} style={{ font: `400 34px ${FONT.big}`, letterSpacing: 10 }}>{sign}</text>
    <rect x={-50} y={-210} width={100} height={160} rx={8} fill={F.slate} />
  </g>
)
export const MiniBank: React.FC<{ x: number; y: number; s?: number; o?: number; name?: string; color?: string }> = ({ x, y, s = 1, o = 1, name = 'BANK', color = F.teal }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={170} ry={14} fill="#000" opacity={0.14} />
    <rect x={-150} y={-190} width={300} height={190} fill="#fff" stroke={color} strokeWidth={5} />
    {[-100, -35, 35, 100].map((d) => <rect key={d} x={d - 14} y={-176} width={28} height={160} fill={F.marbleD} />)}
    <path d="M-170 -190 L0 -260 L170 -190 Z" fill={color} />
    <rect x={-80} y={-232} width={160} height={30} rx={6} fill="#fff" opacity={0.9} /><text x={0} y={-208} textAnchor="middle" fill={color} style={{ font: `400 28px ${FONT.big}`, letterSpacing: 4 }}>{name}</text>
  </g>
)
export const Capitol: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={300} ry={20} fill="#000" opacity={0.14} />
    <rect x={-280} y={-150} width={560} height={150} fill="#fff" stroke={F.marbleDD} strokeWidth={5} />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-250 + k * 68} y={-140} width={26} height={130} fill={F.marbleD} />)}
    <rect x={-120} y={-210} width={240} height={60} fill="#fff" stroke={F.marbleDD} strokeWidth={5} />
    <path d="M-110 -210 Q-110 -350 0 -360 Q110 -350 110 -210 Z" fill="#fff" stroke={F.marbleDD} strokeWidth={5} />
    <rect x={-8} y={-398} width={16} height={40} fill={F.marbleDD} />
  </g>
)

// ------------------------------------------------------------ people-ish shapes for crowds (simple seat figures)
export const Seat: React.FC<{ x: number; y: number; s?: number; color?: string; o?: number; lit?: number }> = ({ x, y, s = 1, color = F.slate, o = 1, lit = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    {lit > 0.01 && <circle cx={0} cy={-70} r={70} fill={F.gold} opacity={0.35 * lit} />}
    <rect x={-46} y={-40} width={92} height={60} rx={14} fill={F.copperD} />
    <circle cx={0} cy={-92} r={28} fill={color} /><path d="M-40 -20 Q-40 -64 0 -64 Q40 -64 40 -20 Z" fill={color} />
  </g>
)

// ------------------------------------------------------------ money things
export const Coin: React.FC<{ x: number; y: number; r?: number; o?: number; label?: string }> = ({ x, y, r = 40, o = 1, label = '$' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r} fill={F.gold} stroke={F.goldD} strokeWidth={r * 0.12} /><circle r={r * 0.7} fill="none" stroke={F.goldD} strokeWidth={r * 0.05} opacity={0.6} />
    <text y={r * 0.3} textAnchor="middle" fill={F.goldD} style={{ font: `400 ${r * (label.length > 3 ? 0.5 : label.length > 1 ? 0.7 : 0.9)}px ${FONT.big}` }}>{label}</text>
  </g>
)
export const CoinPile: React.FC<{ x: number; y: number; n: number; o?: number }> = ({ x, y, n, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o}>{Array.from({ length: Math.round(n) }, (_, k) => { const row = Math.floor(Math.sqrt(k * 2)); return <g key={k}><ellipse cx={x + ((k * 53) % 7 - 3) * 22} cy={y - k * 9} rx={48} ry={15} fill={F.goldD} /><ellipse cx={x + ((k * 53) % 7 - 3) * 22} cy={y - k * 9 - 6} rx={48} ry={15} fill={F.gold} />{row < 0 && null}</g> })}</g>
)
export const CreditCard: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string }> = ({ x, y, s = 1, r = 0, o = 1, text }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-170} y={-105} width={340} height={210} rx={22} fill="#000" opacity={0.18} transform="translate(8 10)" />
    <rect x={-170} y={-105} width={340} height={210} rx={22} fill={F.slate} />
    <rect x={-170} y={-60} width={340} height={38} fill={F.copper} opacity={0.8} />
    <rect x={-130} y={0} width={60} height={44} rx={8} fill={F.gold} />
    {text && <text x={130} y={78} textAnchor="end" fill="#fff" style={{ font: `400 52px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>}
  </g>
)
export const Piggy: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={160} ry={14} fill="#000" opacity={0.14} />
    <ellipse cx={0} cy={-110} rx={150} ry={110} fill="#F2A7A0" /><circle cx={130} cy={-130} r={46} fill="#F2A7A0" /><ellipse cx={160} cy={-125} rx={20} ry={16} fill="#E58B84" />
    <path d="M-60 -210 L-30 -260 L0 -215 Z" fill="#E58B84" /><circle cx={110} cy={-150} r={8} fill={F.ink} />
    {[-90, -30, 40, 100].map((d) => <rect key={d} x={d - 16} y={-30} width={32} height={34} rx={8} fill="#E58B84" />)}
    <rect x={-40} y={-222} width={80} height={12} rx={6} fill={F.coralD} />
  </g>
)
export const LoanPaper: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; title?: string }> = ({ x, y, s = 1, r = 0, o = 1, title = 'LOAN' }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-130} y={-170} width={260} height={340} rx={12} fill="#000" opacity={0.14} transform="translate(8 10)" />
    <rect x={-130} y={-170} width={260} height={340} rx={12} fill="#fff" stroke={F.marbleDD} strokeWidth={4} />
    <rect x={-130} y={-170} width={260} height={70} rx={12} fill={F.teal} /><text y={-122} textAnchor="middle" fill="#fff" style={{ font: `400 46px ${FONT.big}`, letterSpacing: 4 }}>{title}</text>
    {[0, 1, 2].map((k) => <rect key={k} x={-90} y={-60 + k * 44} width={180 - k * 40} height={14} rx={7} fill={F.marbleD} />)}
    <path d="M40 110 Q70 80 100 110" stroke={F.ink} strokeWidth={5} fill="none" />
  </g>
)

// ------------------------------------------------------------ the tank (a bank's reserve account at the Fed)
export const Tank: React.FC<{ x: number; y: number; level: number; o?: number; label?: string; w?: number; h?: number; drip?: number }> = ({ x, y, level, o = 1, label, w = 220, h = 300, drip = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={6} rx={w * 0.6} ry={14} fill="#000" opacity={0.16} />
    <rect x={-w / 2 - 12} y={-h - 12} width={w + 24} height={h + 12} rx={18} fill="url(#fed-copper)" />
    <rect x={-w / 2} y={-h} width={w} height={h} rx={10} fill="#E8F3F3" />
    <rect x={-w / 2} y={-h * level} width={w} height={h * level} rx={10} fill="url(#fed-water)" />
    <rect x={-w / 2} y={-h} width={w} height={h} rx={10} fill="url(#fed-glass)" />
    {drip > 0.01 && [0, 1].map((k) => { const p = (drip + k / 2) % 1; return <circle key={k} cx={0} cy={-h - 80 + p * (80 + h * (1 - level))} r={10} fill={F.gold} opacity={1 - p * 0.3} /> })}
    {label && <g><rect x={-w / 2} y={8} width={w} height={44} rx={8} fill={F.tealD} /><text x={0} y={40} textAnchor="middle" fill="#fff" style={{ font: `400 30px ${FONT.big}`, letterSpacing: 3 }}>{label}</text></g>}
  </g>
)

// ------------------------------------------------------------ labels and marks
export const Tag: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; bg?: string; ink?: string }> = ({ x, y, text, o = 1, size = 40, bg = F.ink, ink = '#fff' }) => {
  if (o <= 0.01) return null
  const w = text.length * size * 0.5 + size * 1.1
  return <g opacity={o}><rect x={x - w / 2} y={y - size * 0.82} width={w} height={size * 1.28} rx={size * 0.64} fill={bg} /><text x={x} y={y + size * 0.22} textAnchor="middle" fill={ink} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text></g>
}
export const Big: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; o?: number }> = ({ x, y, text, size = 90, color = F.ink, o = 1 }) => o <= 0.01 ? null : (
  <text x={x} y={y} textAnchor="middle" fill={color} opacity={o} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>
)
export const Cross: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 100, p }) => {
  if (p <= 0.01) return null
  const a = clamp01(p * 2), b = clamp01(p * 2 - 1)
  return <g strokeLinecap="round" stroke={F.coral} strokeWidth={r * 0.17}>
    <line x1={x - r} y1={y - r} x2={x - r + 2 * r * a} y2={y - r + 2 * r * a} />
    {b > 0 && <line x1={x + r} y1={y - r} x2={x + r - 2 * r * b} y2={y - r + 2 * r * b} />}
  </g>
}
export const Tick: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 50, p }) => p <= 0.01 ? null : (
  <g opacity={clamp01(p * 1.5)}><circle cx={x} cy={y} r={r} fill={F.green} /><path d={`M${x - r * 0.45} ${y} L${x - r * 0.1} ${y + r * 0.35} L${x + r * 0.5} ${y - r * 0.35}`} stroke="#fff" strokeWidth={r * 0.18} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
)
export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; p?: number; color?: string; w?: number; dash?: boolean }> = ({ x1, y1, x2, y2, p = 1, color = F.ink, w = 12, dash }) => {
  if (p <= 0.01) return null
  const x = lerp(x1, x2, p), y = lerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1)
  return <g><line x1={x1} y1={y1} x2={x - Math.cos(a) * w * 1.6} y2={y - Math.sin(a) * w * 1.6} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash ? `${w * 2} ${w * 1.6}` : undefined} />
    <path d={`M${x} ${y} L${x - Math.cos(a - 0.5) * w * 3.4} ${y - Math.sin(a - 0.5) * w * 3.4} L${x - Math.cos(a + 0.5) * w * 3.4} ${y - Math.sin(a + 0.5) * w * 3.4} Z`} fill={color} /></g>
}
// # a big lever on a base: v from -1 (down) to 1 (up)
export const Lever: React.FC<{ x: number; y: number; v: number; o?: number; s?: number }> = ({ x, y, v, o = 1, s = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-60} width={180} height={60} rx={14} fill={F.copperD} /><rect x={-70} y={-80} width={140} height={30} rx={10} fill="url(#fed-copper)" />
    <g transform={`translate(0 -70) rotate(${-50 * v})`}><rect x={-12} y={-280} width={24} height={280} rx={10} fill={F.marbleDD} /><circle cy={-290} r={38} fill={F.coral} stroke={F.coralD} strokeWidth={5} /></g>
  </g>
)
// # a calendar page
export const CalPage: React.FC<{ x: number; y: number; top: string; big: string; o?: number; s?: number; color?: string }> = ({ x, y, top, big, o = 1, s = 1, color = F.copper }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-170} width={300} height={340} rx={16} fill="#000" opacity={0.12} transform="translate(8 10)" />
    <rect x={-150} y={-170} width={300} height={340} rx={16} fill="#fff" />
    <rect x={-150} y={-170} width={300} height={90} rx={16} fill={color} /><rect x={-150} y={-100} width={300} height={20} fill={color} />
    <text y={-108} textAnchor="middle" fill="#fff" style={{ font: `400 50px ${FONT.big}`, letterSpacing: 4 }}>{top}</text>
    <text y={90} textAnchor="middle" fill={F.ink} style={{ font: `400 ${big.length > 3 ? 110 : 150}px ${FONT.big}` }}>{big}</text>
  </g>
)
// # a copper underline that marks a spoken key word (gap filler, this video's own)
export const Mark: React.FC<{ f: number; at: number[]; y?: number; w?: number }> = ({ f, at, y = 214, w = 420 }) => {
  const a = at.filter((t) => f >= t && f < t + 26).pop()
  if (a === undefined) return null
  const p = clamp01((f - a) / 10), o = 1 - clamp01((f - a - 14) / 12), x0 = 960 - w / 2
  return <g opacity={o}><rect x={x0} y={y - 4} width={w * p} height={8} rx={4} fill={F.copper} /><rect x={x0 + w * p - 6} y={y - 10} width={12} height={20} rx={4} fill={F.copperD} /></g>
}
