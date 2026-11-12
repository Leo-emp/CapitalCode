// ============================================================
// LONG VIDEO — "Tesla's Side Hustle: Selling to Its Rivals" —
// objects for this story: an electric car (no exhaust, a plug bolt), a gas
// car (exhaust pipe that puffs grey smoke), a carmaker's factory with a sign,
// the "limit meter" (a tall gauge in grams with a dashed limit line), a fine
// bill, a credit certificate, a pool ring that encloses cars, a coin.
// One file per scene. No camera moves (owner r56). No real logos.
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

// ------------------------------------------------------------ an electric car: sleek, no exhaust, a lightning bolt badge
export const EVCar: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; color?: string; flip?: boolean; glow?: number }> = ({ x, y, s = 1, o = 1, f = 0, color = '#E9EEF5', flip, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={14} fill={P.shadow} opacity={0.2} />
    {glow > 0 && <ellipse cx={0} cy={-80} rx={240} ry={120} fill={P.mint} opacity={0.18 * clamp01(glow)} />}
    <path d="M-196 -36 Q-196 -76 -160 -86 L-70 -100 Q-30 -158 30 -160 L80 -160 Q130 -158 168 -104 L190 -96 Q208 -86 208 -50 L208 -34 Q208 -20 194 -20 L-182 -20 Q-196 -20 -196 -34 Z" fill={color} stroke="#9AA8BC" strokeWidth={4} />
    <path d="M-50 -104 Q-20 -146 30 -148 L40 -148 L40 -104 Z" fill="#2B3A55" /><path d="M54 -148 L80 -148 Q118 -146 148 -104 L54 -104 Z" fill="#2B3A55" />
    <path d="M-14 -70 L-30 -44 L-16 -44 L-24 -20 L4 -54 L-10 -54 L0 -70 Z" fill={P.mint} />
    {[-118, 132].map((cx) => <g key={cx} transform={`translate(${cx} -20) rotate(${(f * 9) % 360})`}><circle r={34} fill="#1B1B22" /><circle r={18} fill="#C9D3E1" /><rect x={-3} y={-18} width={6} height={36} fill="#1B1B22" /></g>)}
  </g>
)

// ------------------------------------------------------------ a gas car: boxier, a darker body, an exhaust pipe that puffs grey smoke
export const GasCar: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; color?: string; puff?: number }> = ({ x, y, s = 1, o = 1, f = 0, color = '#B5523E', puff = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={14} fill={P.shadow} opacity={0.2} />
    <path d="M-190 -34 L-190 -90 Q-190 -104 -176 -106 L-110 -110 L-70 -170 Q-62 -180 -48 -180 L90 -180 Q104 -180 112 -170 L150 -112 L186 -106 Q204 -102 204 -84 L204 -34 Q204 -20 190 -20 L-176 -20 Q-190 -20 -190 -34 Z" fill={color} />
    <path d="M-60 -166 L4 -166 L4 -114 L-96 -114 Z" fill="#BFE3FF" /><path d="M18 -166 L92 -166 L126 -114 L18 -114 Z" fill="#BFE3FF" />
    <rect x={-212} y={-44} width={30} height={12} rx={5} fill="#5A6680" />
    {[0, 1, 2].map((k) => { const t = ((f / 24 + k / 3) % 1); return <circle key={k} cx={-226 - t * 120} cy={-40 - t * 50} r={14 + t * 26} fill="#8A8F99" opacity={(1 - t) * 0.55 * clamp01(puff)} /> })}
    {[-112, 128].map((cx) => <g key={cx} transform={`translate(${cx} -20) rotate(${(f * 9) % 360})`}><circle r={34} fill="#1B1B22" /><circle r={16} fill="#8A97AA" /><rect x={-3} y={-16} width={6} height={32} fill="#1B1B22" /></g>)}
  </g>
)

// ------------------------------------------------------------ a carmaker's factory with a name sign
export const Factory: React.FC<{ x: number; y: number; s?: number; o?: number; name: string; color?: string; f?: number; smoke?: boolean }> = ({ x, y, s = 1, o = 1, name, color = '#5A6680', f = 0, smoke }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-200 0 L-200 -170 L-120 -220 L-120 -170 L-40 -220 L-40 -170 L40 -220 L40 -170 L200 -170 L200 0 Z" fill={color} />
    <rect x={120} y={-300} width={44} height={140} fill={color} />
    {smoke && [0, 1, 2].map((k) => { const t = ((f / 30 + k / 3) % 1); return <circle key={k} cx={142 + t * 40} cy={-310 - t * 90} r={16 + t * 24} fill="#9AA0AA" opacity={(1 - t) * 0.5} /> })}
    {[-160, -80, 0, 80].map((wx) => <rect key={wx} x={wx} y={-120} width={50} height={40} rx={4} fill="#EEF3FA" opacity={0.8} />)}
    <rect x={-140} y={-60} width={280} height={52} rx={10} fill={P.paper} /><text x={0} y={-22} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{name}</text>
  </g>
)

// ------------------------------------------------------------ the limit meter: a tall gauge in grams; value bar, dashed limit line
// # value and limit in grams; px per gram = scale; the bar turns red above the limit
export const LimitMeter: React.FC<{ x: number; y: number; value: number; limit?: number; o?: number; scale?: number; label?: string; showLimit?: number }> = ({ x, y, value, limit = 100, o = 1, scale = 3.6, label, showLimit = 1 }) => {
  const h = Math.max(0, value) * scale, ly = -limit * scale, over = value > limit
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-80} y={-130 * scale} width={160} height={130 * scale} rx={18} fill={P.card} stroke={P.edge} strokeWidth={4} />
    <rect x={-56} y={-h} width={112} height={h} rx={10} fill={over ? P.coral : P.mint} />
    <g opacity={showLimit}><line x1={-110} y1={ly} x2={110} y2={ly} stroke={P.ink} strokeWidth={6} strokeDasharray="16 10" />
      <text x={122} y={ly + 12} fill={P.ink} style={{ font: '400 38px "Bebas Neue"' }}>LIMIT</text></g>
    <text x={0} y={-h - 18} textAnchor="middle" fill={over ? P.coralInk : P.mintInk} style={{ font: '400 46px "Bebas Neue"' }}>{`${Math.round(value * 2) / 2} G`}</text>
    {label && <text x={0} y={56} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>{label}</text>}
  </g>
}

// ------------------------------------------------------------ a fine: a red-topped bill with an amount
export const FineBill: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; amount: string; title?: string }> = ({ x, y, s = 1, o = 1, r = 0, amount, title = 'FINE' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-100} width={300} height={200} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={4} />
    <rect x={-150} y={-100} width={300} height={56} rx={14} fill={P.coral} /><rect x={-150} y={-60} width={300} height={16} fill={P.coral} />
    <text x={0} y={-60} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>
    <text x={0} y={40} textAnchor="middle" fill={P.navy0} style={{ font: `400 ${amount.length > 8 ? 54 : 70}px "Bebas Neue"` }}>{amount}</text>
  </g>
)

// ------------------------------------------------------------ a credit certificate (the thing Tesla sells)
export const CreditCert: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-80} width={240} height={160} rx={12} fill="#F4FBF6" stroke={P.mintInk} strokeWidth={5} />
    <rect x={-104} y={-64} width={208} height={128} rx={8} fill="none" stroke={P.mint} strokeWidth={3} strokeDasharray="8 6" />
    <text x={0} y={-14} textAnchor="middle" fill={P.mintInk} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 4 }}>CREDIT</text>
    <circle cx={64} cy={36} r={22} fill={P.gold} /><path d="M54 36 L62 44 L76 28" fill="none" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" />
    {[-70, -40].map((lx) => <rect key={lx} x={lx - 20} y={30 + (lx + 70) / 3} width={70} height={8} rx={4} fill="#CFE8D7" />)}
  </g>
)

// ------------------------------------------------------------ a pool ring: a dashed rounded rectangle that draws on (p 0–1) around a group
export const PoolRing: React.FC<{ x: number; y: number; w: number; h: number; p: number; label?: string; color?: string }> = ({ x, y, w, h, p, label, color = P.skyD }) => {
  const per = 2 * (w + h)
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={40} fill={color} fillOpacity={0.06 * clamp01(p)} stroke={color} strokeWidth={8} strokeDasharray={`${per * clamp01(p)} ${per}`} />
    {label && <text x={x + w / 2} y={y - 18} textAnchor="middle" fill={color} opacity={clamp01(p * 2 - 1)} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>}
  </g>
}

// ------------------------------------------------------------ a soft spotlight that snaps on its word and fades
export const TSpot: React.FC<{ f: number; at: number; x: number; y: number; rx?: number; ry?: number }> = ({ f, at, x, y, rx = 200, ry = 160 }) => {
  const t = f - at
  if (t < 0 || t > 30) return null
  const o = t < 3 ? t / 3 : 1 - (t - 3) / 27
  return <ellipse cx={x} cy={y} rx={Math.min(rx, 230)} ry={Math.min(ry, 210)} fill={P.gold} opacity={0.18 * o} />
}

export const lerpN = lerp
