// # Shared drawings for "How the US National Debt Actually Works".
// Every prop is drawn around its own origin (bottom centre for things that stand, centre for flat things).
import React from 'react'
import { P } from '../kit'

export const TXT = (size: number, w = 400): React.CSSProperties => ({ font: `${w} ${size}px "Bebas Neue"`, letterSpacing: 1 })
export const RED = '#E5634F', GREEN = '#3DBE84', GOLD = '#E9C25A', BLUE = '#4F78AA', INK = '#16294A', CREAM = '#FFF6E2', PAPER = '#FFFDF5'

// ---------------------------------------------------------------- a domed government building (generic capitol)
export const Capitol: React.FC<{ x: number; y: number; s?: number; o?: number; glow?: number }> = ({ x, y, s = 1, o = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse cx={0} cy={-260} rx={380} ry={300} fill={P.gold} opacity={0.22 * glow} />}
    <rect x={-330} y={-40} width={660} height={40} fill="#D9CDB3" />
    <rect x={-300} y={-200} width={600} height={160} fill="#F3EAD8" stroke="#D9CDB3" strokeWidth={4} />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-270 + k * 66} y={-190} width={22} height={140} fill="#E6DCC4" />)}
    <rect x={-120} y={-260} width={240} height={60} fill="#F3EAD8" stroke="#D9CDB3" strokeWidth={4} />
    <path d="M-110 -260 Q-110 -420 0 -430 Q110 -420 110 -260 Z" fill="#F3EAD8" stroke="#D9CDB3" strokeWidth={4} />
    {[-70, -30, 10, 50].map((dx) => <rect key={dx} x={dx} y={-380} width={16} height={110} rx={6} fill="#E6DCC4" />)}
    <rect x={-8} y={-480} width={16} height={56} fill="#D9CDB3" /><circle cy={-488} r={14} fill={GOLD} />
  </g>
)

// ---------------------------------------------------------------- an IOU (a Treasury security): paper certificate with an amount and a ribbon colour by kind
export const IOU: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string; kind?: string; col?: string }> = ({ x, y, s = 1, o = 1, r = 0, t = 'IOU', kind, col = BLUE }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-90} width={300} height={180} rx={12} fill={PAPER} stroke="#CDB58C" strokeWidth={4} />
    <rect x={-136} y={-76} width={272} height={152} rx={8} fill="none" stroke={col} strokeWidth={3} strokeDasharray="6 6" />
    <text y={-20} textAnchor="middle" fill={INK} style={TXT(58)}>{t}</text>
    {kind && <text y={36} textAnchor="middle" fill={col} style={TXT(36)}>{kind}</text>}
    <circle cx={110} cy={52} r={22} fill={col} opacity={0.85} /><path d="M100 70 l-8 26 l18 -10 l18 10 l-8 -26" fill={col} opacity={0.85} />
  </g>
)

// ---------------------------------------------------------------- a stack of money blocks (one block per unit), with an optional label above
export const Blocks: React.FC<{ x: number; y: number; n: number; w?: number; h?: number; o?: number; col?: string; label?: string; size?: number }> = ({ x, y, n, w = 220, h = 14, o = 1, col = '#7FC495', label, size = 56 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: Math.floor(n) }, (_, k) => <rect key={k} x={-w / 2 + (k % 2) * 4} y={-(k + 1) * (h + 2)} width={w} height={h} rx={3} fill={col} stroke="#4E9A6A" strokeWidth={1.5} />)}
    {label && <text x={0} y={-Math.floor(n) * (h + 2) - 22} textAnchor="middle" fill={INK} style={TXT(size)}>{label}</text>}
  </g>
)

// ---------------------------------------------------------------- a shield (defense)
export const Shield: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 -120 L90 -90 Q90 20 0 70 Q-90 20 -90 -90 Z" fill="#5C6F8E" stroke="#3E4E69" strokeWidth={6} />
    <path d="M0 -60 l14 30 l32 4 l-24 22 l7 32 l-29 -16 l-29 16 l7 -32 l-24 -22 l32 -4 z" fill="#FFFFFF" />
  </g>
)

// ---------------------------------------------------------------- simple flags for the biggest foreign holders
export const Flag: React.FC<{ x: number; y: number; s?: number; o?: number; c: 'jp' | 'uk' | 'cn' }> = ({ x, y, s = 1, o = 1, c }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-6} y={-200} width={12} height={200} fill="#8E7A5A" />
    <g transform="translate(6 -200)">
      {c === 'jp' && <><rect width={150} height={100} fill="#FFFFFF" stroke="#D6C7A6" strokeWidth={3} /><circle cx={75} cy={50} r={30} fill="#BC002D" /></>}
      {c === 'uk' && <><rect width={150} height={100} fill="#012169" /><path d="M0 0 L150 100 M150 0 L0 100" stroke="#FFFFFF" strokeWidth={18} /><path d="M0 0 L150 100 M150 0 L0 100" stroke="#C8102E" strokeWidth={6} /><path d="M75 0 V100 M0 50 H150" stroke="#FFFFFF" strokeWidth={26} /><path d="M75 0 V100 M0 50 H150" stroke="#C8102E" strokeWidth={14} /></>}
      {c === 'cn' && <><rect width={150} height={100} fill="#DE2910" /><path d="M30 18 l6 18 l19 0 l-15 11 l6 18 l-16 -11 l-16 11 l6 -18 l-15 -11 l19 0 z" fill="#FFDE00" /></>}
    </g>
  </g>
)

// ---------------------------------------------------------------- a piggy bank (ordinary savers)
export const Piggy: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={-70} rx={110} ry={74} fill="#F4B6C2" />
    <circle cx={90} cy={-90} r={34} fill="#F4B6C2" /><ellipse cx={118} cy={-86} rx={16} ry={12} fill="#E895A6" />
    <path d="M40 -140 l20 -30 l10 34 z" fill="#E895A6" />
    {[-60, -20, 30, 70].map((dx) => <rect key={dx} x={dx - 10} y={-20} width={20} height={22} rx={4} fill="#E895A6" />)}
    <rect x={-20} y={-148} width={44} height={10} rx={5} fill="#B86A7A" /><circle cx={84} cy={-98} r={5} fill={INK} />
  </g>
)

// ---------------------------------------------------------------- an auction podium with a gavel; `bang` 0–1 brings the gavel down
export const Podium: React.FC<{ x: number; y: number; s?: number; o?: number; bang?: number; label?: string }> = ({ x, y, s = 1, o = 1, bang = 0, label = 'AUCTION' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-110 0 L-90 -220 L90 -220 L110 0 Z" fill="#8E5B3A" /><rect x={-130} y={-240} width={260} height={30} rx={8} fill="#6E4A2E" />
    <text y={-120} textAnchor="middle" fill="#FFE9B0" style={TXT(46)}>{label}</text>
    <g transform={`translate(80 -250) rotate(${-40 + 40 * bang})`}><rect x={-6} y={-90} width={12} height={90} rx={5} fill="#5B3820" /><rect x={-40} y={-120} width={80} height={36} rx={10} fill="#8E5B3A" /></g>
  </g>
)

// ---------------------------------------------------------------- a TV screen with a ticker line
export const TV: React.FC<{ x: number; y: number; s?: number; o?: number; t: string; v?: string; f?: number }> = ({ x, y, s = 1, o = 1, t, v, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-220} y={-300} width={440} height={260} rx={18} fill="#1D2A44" /><rect x={-200} y={-282} width={400} height={224} rx={10} fill="#2F4E7A" />
    <path d={`M-180 -110 ${Array.from({ length: 9 }, (_, k) => `L${-180 + k * 45} ${-110 - 40 * Math.sin((k + f / 20) * 0.9) - k * 6}`).join(' ')}`} fill="none" stroke="#7DF0B0" strokeWidth={6} />
    <rect x={-200} y={-282} width={400} height={56} fill="#C94A3E" /><text x={0} y={-240} textAnchor="middle" fill="#FFFFFF" style={TXT(40)}>{t}</text>
    {v && <text x={150} y={-140} textAnchor="end" fill="#FFFFFF" style={TXT(48)}>{v}</text>}
    <rect x={-30} y={-40} width={60} height={30} fill="#3E4E69" /><rect x={-110} y={-14} width={220} height={14} rx={6} fill="#3E4E69" />
  </g>
)

// ---------------------------------------------------------------- a family at a kitchen table
export const Table: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-220} y={-180} width={440} height={26} rx={8} fill="#B9814E" /><rect x={-200} y={-154} width={20} height={154} fill="#8E5B3A" /><rect x={180} y={-154} width={20} height={154} fill="#8E5B3A" />
  </g>
)

// ---------------------------------------------------------------- an envelope bill
export const Bill: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string; col?: string }> = ({ x, y, s = 1, o = 1, r = 0, t = 'BILL', col = RED }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-100} y={-62} width={200} height={124} rx={10} fill={PAPER} stroke="#CDB58C" strokeWidth={3} />
    <path d="M-100 -62 L0 10 L100 -62" fill="none" stroke="#CDB58C" strokeWidth={4} />
    <rect x={-70} y={20} width={140} height={34} rx={8} fill={col} /><text y={46} textAnchor="middle" fill="#FFFFFF" style={TXT(30)}>{t}</text>
  </g>
)

// ---------------------------------------------------------------- a ceiling line (the debt limit)
export const Ceiling: React.FC<{ x1: number; x2: number; y: number; o?: number; label?: string }> = ({ x1, x2, y, o = 1, label = 'DEBT LIMIT' }) => (
  <g opacity={o}>
    <line x1={x1} y1={y} x2={x2} y2={y} stroke={RED} strokeWidth={10} strokeDasharray="28 16" strokeLinecap="round" />
    <text x={x2} y={y - 18} textAnchor="end" fill={RED} style={TXT(48)}>{label}</text>
  </g>
)
