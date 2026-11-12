// ============================================================
// LONG VIDEO — "Where Your Spotify Money Actually Goes" — objects:
// a music phone (play bar, album square), a euro coin, a stack of coins that
// can be eaten from the top, plan cards, a record-label building with a vinyl
// sign, a publisher's songbook, a guitar (the artist), an ad banner, a
// contract, a pipe the money flows through. No logos. No camera moves.
// ============================================================
import React from 'react'
import { clamp01, P } from '../kit'

export const GREEN = '#1DB954'

// ------------------------------------------------------------ a phone playing music
export const MusicPhone: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; playing?: number; ad?: number; title?: string }> = ({ x, y, s = 1, o = 1, f = 0, playing = 0, ad = 0, title = 'NOW PLAYING' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-230} width={240} height={460} rx={36} fill="#111A2E" /><rect x={-104} y={-206} width={208} height={412} rx={24} fill="#191F2E" />
    <rect x={-80} y={-170} width={160} height={160} rx={14} fill={ad > 0.5 ? P.gold : '#3E5A9A'} />
    {ad > 0.5 ? <text x={0} y={-80} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>AD</text> : <g>{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-56 + k * 24} y={-90 - 30 * Math.abs(Math.sin(f / 6 + k)) * clamp01(playing)} width={14} height={20 + 30 * Math.abs(Math.sin(f / 6 + k)) * clamp01(playing)} rx={4} fill="#FFFFFF" opacity={0.8} />)}</g>}
    <text x={0} y={30} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 26px "Bebas Neue"', letterSpacing: 2 }}>{title}</text>
    <rect x={-80} y={56} width={160} height={6} rx={3} fill="#3E4A61" /><rect x={-80} y={56} width={160 * ((f / 300) % 1) * clamp01(playing)} height={6} rx={3} fill={GREEN} />
    <circle cx={0} cy={130} r={36} fill={GREEN} /><path d="M-10 114 L16 130 L-10 146 Z" fill="#FFFFFF" />
  </g>
)

// ------------------------------------------------------------ a euro coin
export const Euro: React.FC<{ x: number; y: number; r?: number; o?: number; t?: string }> = ({ x, y, r = 22, o = 1, t = '€' }) => (
  <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={P.gold} /><circle r={r * 0.72} fill="none" stroke={P.goldD} strokeWidth={3} />
    <text y={r * 0.38} textAnchor="middle" fill={P.goldD} style={{ font: `400 ${Math.round(r * (t.length > 2 ? 0.7 : 1.05))}px "Bebas Neue"` }}>{t}</text></g>
)

// ------------------------------------------------------------ a stack of n coins; `left` (0–1) of it remains, the rest fades from the top
export const Stack: React.FC<{ x: number; y: number; n?: number; left?: number; o?: number; w?: number }> = ({ x, y, n = 12, left = 1, o = 1, w = 120 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: n }, (_, k) => <ellipse key={k} cx={0} cy={-k * 22} rx={w / 2} ry={14} fill={P.gold} stroke={P.goldD} strokeWidth={3} opacity={k < Math.round(n * clamp01(left)) ? 1 : 0.12} />)}
  </g>
)

// ------------------------------------------------------------ a plan card
export const PlanCard: React.FC<{ x: number; y: number; t: string; people: number; o?: number; s?: number; col?: string }> = ({ x, y, t, people, o = 1, s = 1, col = GREEN }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-80} width={220} height={160} rx={18} fill="#FFFFFF" stroke={col} strokeWidth={6} />
    <text y={-30} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>{t}</text>
    {Array.from({ length: people }, (_, k) => <g key={k} transform={`translate(${(k - (people - 1) / 2) * 30} 30)`}><circle cy={-12} r={9} fill={col} /><rect x={-10} y={-2} width={20} height={20} rx={8} fill={col} /></g>)}
  </g>
)

// ------------------------------------------------------------ a record label building with a vinyl sign
export const LabelHQ: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; t?: string }> = ({ x, y, s = 1, o = 1, f = 0, t = 'RECORD LABEL' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-260} width={260} height={260} rx={10} fill="#3E4A61" />{[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-100 + c * 74} y={-220 + r * 60} width={50} height={36} rx={4} fill="#BFE3FF" opacity={0.8} />))}
    <g transform={`translate(0 -310) rotate(${(f * 3) % 360})`}><circle r={46} fill="#111A2E" /><circle r={30} fill="none" stroke="#3E4A61" strokeWidth={3} /><circle r={12} fill={P.coral} /></g>
    <rect x={-120} y={-40} width={240} height={40} rx={6} fill={P.paper} /><text y={-12} textAnchor="middle" fill={P.navy0} style={{ font: '400 28px "Bebas Neue"' }}>{t}</text>
  </g>
)

// ------------------------------------------------------------ a songbook (music publisher)
export const SongBook: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-100} width={160} height={200} rx={10} fill="#9D7FD0" /><rect x={-64} y={-84} width={128} height={168} rx={6} fill="#FFFFFF" />
    {[0, 1, 2, 3].map((k) => <line key={k} x1={-50} y1={-60 + k * 14} x2={50} y2={-60 + k * 14} stroke={P.ink2} strokeWidth={2} />)}
    <circle cx={-20} cy={-36} r={7} fill={P.ink} /><line x1={-13} y1={-36} x2={-13} y2={-70} stroke={P.ink} strokeWidth={3} />
    <circle cx={20} cy={-46} r={7} fill={P.ink} /><line x1={27} y1={-46} x2={27} y2={-80} stroke={P.ink} strokeWidth={3} />
  </g>
)

// ------------------------------------------------------------ a guitar (the artist's)
export const Guitar: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = -20 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-8} y={-180} width={16} height={130} rx={4} fill="#8E5B3A" /><rect x={-14} y={-200} width={28} height={30} rx={6} fill="#5A3E1E" />
    <ellipse cx={0} cy={-20} rx={50} ry={42} fill="#C98F5A" /><ellipse cx={0} cy={30} rx={60} ry={50} fill="#C98F5A" /><circle cx={0} cy={0} r={14} fill="#5A3E1E" />
  </g>
)

// ------------------------------------------------------------ a contract with lines and a signature
export const Contract: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; sign?: number }> = ({ x, y, s = 1, o = 1, t = 'DEAL', sign = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-100} y={-130} width={200} height={260} rx={8} fill={P.paper} stroke={P.edge} strokeWidth={4} />
    <text y={-80} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>{t}</text>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-70} y={-50 + k * 26} width={140} height={8} rx={4} fill="#D9DFE8" />)}
    <path d="M-60 90 q15 -24 30 0 t30 0 t30 0" fill="none" stroke={P.skyD} strokeWidth={4} strokeDasharray="200" strokeDashoffset={200 * (1 - clamp01(sign))} />
  </g>
)

// ------------------------------------------------------------ a soft spotlight that snaps on its word and fades
export const SSpot: React.FC<{ f: number; at: number; x: number; y: number; rx?: number; ry?: number }> = ({ f, at, x, y, rx = 200, ry = 160 }) => {
  const t = f - at
  if (t < 0 || t > 30) return null
  const o = t < 3 ? t / 3 : 1 - (t - 3) / 27
  return <ellipse cx={x} cy={y} rx={Math.min(rx, 230)} ry={Math.min(ry, 210)} fill={P.gold} opacity={0.18 * o} />
}
