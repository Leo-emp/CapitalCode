// ============================================================
// LONG VIDEO — "Your Cheap Uber Rides Were Paid For by Investors" —
// objects for this story: the ride car (a little city car with a roof
// light), the rider's phone with a map and a moving pin, the $20 fare as
// one bill that splits into the driver's share and the app's slice, the
// app's cost blocks (engineers, offices, insurance, support, ads,
// discounts, bonuses), the investors' money bags, the "running total"
// gauge that sinks below zero, a year bar row, and a road with buildings.
// One file per scene. No camera moves (owner r56).
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

// ------------------------------------------------------------ the ride car: side view, a roof light, wheels that turn while it moves
export const RideCar: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; color?: string; flip?: boolean; rider?: boolean }> = ({ x, y, s = 1, o = 1, f = 0, color = '#2F2F3A', flip, rider }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={14} fill={P.shadow} opacity={0.2} />
    <path d="M-190 -40 Q-190 -90 -150 -96 L-80 -104 L-40 -160 Q-26 -176 0 -176 L90 -176 Q112 -176 126 -158 L166 -104 L186 -98 Q206 -90 206 -50 L206 -34 Q206 -20 192 -20 L-178 -20 Q-190 -20 -190 -34 Z" fill={color} />
    <path d="M-30 -150 L10 -150 L10 -106 L-62 -106 Z" fill="#BFE3FF" /><path d="M24 -150 L92 -150 Q104 -150 112 -140 L140 -106 L24 -106 Z" fill="#BFE3FF" />
    {rider && <g><circle cx={60} cy={-128} r={14} fill="#1F2B4A" /><rect x={48} y={-116} width={24} height={14} rx={6} fill={P.coral} /></g>}
    <circle cx={-20} cy={-128} r={12} fill="#1F2B4A" />
    {/* # roof light */}
    <rect x={8} y={-196} width={66} height={22} rx={8} fill={P.gold} /><text x={41} y={-180} textAnchor="middle" fill={P.navy0} style={{ font: '400 18px "Bebas Neue"' }}>RIDE</text>
    {[-110, 130].map((cx) => <g key={cx} transform={`translate(${cx} -20) rotate(${(f * 9) % 360})`}><circle r={34} fill="#1B1B22" /><circle r={16} fill="#8A97AA" /><rect x={-3} y={-16} width={6} height={32} fill="#1B1B22" /></g>)}
    <rect x={190} y={-70} width={16} height={12} rx={4} fill="#FFE08A" />
  </g>
)

// ------------------------------------------------------------ the rider's phone: a mini map, a pin, a price line and a button
export const MapPhone: React.FC<{ x: number; y: number; s?: number; o?: number; price?: string; pin?: number; press?: number; status?: string }> = ({ x, y, s = 1, o = 1, price, pin = 0, press = 0, status }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-230} width={240} height={460} rx={36} fill="#000" opacity={0.15} transform="translate(10 12)" />
    <rect x={-120} y={-230} width={240} height={460} rx={36} fill="#111A2E" />
    <rect x={-104} y={-206} width={208} height={412} rx={24} fill="#EEF3FA" />
    {/* # the map: streets and blocks */}
    <rect x={-104} y={-206} width={208} height={230} rx={24} fill="#DDE7F2" />
    {[-60, 0, 60].map((v) => <rect key={v} x={-104} y={-120 + v} width={208} height={10} fill="#FFFFFF" />)}
    {[-40, 30].map((v) => <rect key={v} x={v} y={-206} width={10} height={230} fill="#FFFFFF" />)}
    <path d={`M-70 -10 L-70 -60 L35 -60 L35 ${lerp(-130, -160, clamp01(pin))}`} fill="none" stroke={P.skyD} strokeWidth={6} strokeDasharray="10 8" />
    <g transform={`translate(${lerp(-70, 35, clamp01(pin))} ${lerp(-10, -160, clamp01(pin))})`}><path d="M0 0 C-18 -20 -18 -40 0 -44 C18 -40 18 -20 0 0 Z" fill={P.coral} /><circle cx={0} cy={-28} r={7} fill="#FFFFFF" /></g>
    {price && <text x={0} y={80} textAnchor="middle" fill={P.navy0} style={{ font: '400 56px "Bebas Neue"' }}>{price}</text>}
    {status && <text x={0} y={120} textAnchor="middle" fill="#5C6F8E" style={{ font: '400 30px "Bebas Neue"' }}>{status}</text>}
    <g transform={`translate(0 ${160 + 5 * clamp01(press)})`}><rect x={-84} y={-30} width={168} height={60} rx={30} fill="#111A2E" /><text x={0} y={12} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"', letterSpacing: 3 }}>BOOK</text></g>
  </g>
)

// ------------------------------------------------------------ the fare: one long bill that splits into the driver's share and the app's slice
// # split 0–1 pulls the slice away to the right; slice is the fraction (0.21)
export const FareBill: React.FC<{ x: number; y: number; w?: number; o?: number; split?: number; slice?: number; text?: string; driverLabel?: string; sliceLabel?: string }> = ({ x, y, w = 760, o = 1, split = 0, slice = 0.214, text = '$20', driverLabel, sliceLabel }) => {
  const sw = w * slice, dw = w - sw, gap = 120 * clamp01(split)
  return <g transform={`translate(${x - w / 2} ${y})`} opacity={o}>
    <rect x={8} y={10} width={w} height={200} rx={18} fill="#000" opacity={0.12} />
    <g><rect x={0} y={0} width={dw} height={200} rx={18} fill="#7FC98F" /><rect x={14} y={14} width={dw - 28} height={172} rx={12} fill="none" stroke="#3E8E5A" strokeWidth={5} />
      {split < 0.5 && <text x={w / 2} y={128} textAnchor="middle" fill="#245C3A" style={{ font: '400 110px "Bebas Neue"' }}>{text}</text>}
      {driverLabel && split >= 0.5 && <text x={dw / 2} y={124} textAnchor="middle" fill="#245C3A" style={{ font: '400 60px "Bebas Neue"' }}>{driverLabel}</text>}</g>
    <g transform={`translate(${dw + gap} ${-40 * clamp01(split)})`}><rect x={0} y={0} width={sw} height={200} rx={18} fill={split > 0.05 ? P.navy3 : '#7FC98F'} />
      {sliceLabel && split >= 0.5 && <text x={sw / 2} y={124} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{sliceLabel}</text>}</g>
  </g>
}

// ------------------------------------------------------------ a cost block: an icon on a coloured tile (what the slice has to pay for)
export type CostKind = 'engineers' | 'offices' | 'insurance' | 'support' | 'ads' | 'discounts' | 'bonuses'
export const CostTile: React.FC<{ x: number; y: number; kind: CostKind; s?: number; o?: number; label?: boolean }> = ({ x, y, kind, s = 1, o = 1, label = true }) => {
  const col = { engineers: P.sky, offices: '#9D7FD0', insurance: P.mint, support: P.gold, ads: P.coral, discounts: '#F2A7B5', bonuses: P.goldD }[kind]
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-80} width={160} height={160} rx={24} fill={col} />
    <g fill="#FFFFFF" stroke="#FFFFFF">
      {kind === 'engineers' && <g><rect x={-46} y={-34} width={92} height={56} rx={6} fill="none" strokeWidth={8} /><rect x={-56} y={24} width={112} height={10} rx={5} stroke="none" /><path d="M-14 -16 L-26 -4 L-14 8 M14 -16 L26 -4 L14 8" fill="none" strokeWidth={6} strokeLinecap="round" /></g>}
      {kind === 'offices' && <g stroke="none"><rect x={-40} y={-50} width={80} height={100} rx={6} />{[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={-26 + c * 32} y={-36 + r * 28} width={20} height={16} rx={3} fill={col} />))}</g>}
      {kind === 'insurance' && <path d="M0 -50 L44 -32 Q44 24 0 50 Q-44 24 -44 -32 Z" stroke="none" />}
      {kind === 'support' && <g><path d="M-40 10 Q-40 -46 0 -46 Q40 -46 40 10" fill="none" strokeWidth={10} /><rect x={-50} y={0} width={22} height={36} rx={8} stroke="none" /><rect x={28} y={0} width={22} height={36} rx={8} stroke="none" /></g>}
      {kind === 'ads' && <g stroke="none"><path d="M-44 -16 L10 -40 L10 40 L-44 16 Z" /><rect x={-56} y={-16} width={16} height={32} rx={4} /><path d="M24 -20 Q40 0 24 20" fill="none" stroke="#FFFFFF" strokeWidth={6} /></g>}
      {kind === 'discounts' && <g stroke="none"><path d="M-50 -30 L50 -30 L50 -10 Q38 0 50 10 L50 30 L-50 30 L-50 10 Q-38 0 -50 -10 Z" /><text x={0} y={14} textAnchor="middle" fill={col} style={{ font: '400 40px "Bebas Neue"' }}>% OFF</text></g>}
      {kind === 'bonuses' && <g stroke="none"><rect x={-46} y={-30} width={92} height={60} rx={8} /><text x={0} y={14} textAnchor="middle" fill={col} style={{ font: '400 40px "Bebas Neue"' }}>+$</text></g>}
    </g>
    {label && <text x={0} y={118} textAnchor="middle" fill={P.ink} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 1 }}>{kind.toUpperCase()}</text>}
  </g>
}

// ------------------------------------------------------------ an investor's money bag
export const MoneyBag: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string; r?: number }> = ({ x, y, s = 1, o = 1, text = '$', r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={90} ry={12} fill={P.shadow} opacity={0.2} />
    <path d="M-80 0 Q-100 -130 0 -140 Q100 -130 80 0 Q60 20 0 20 Q-60 20 -80 0 Z" fill="#C9A15A" />
    <path d="M-36 -136 L0 -176 L36 -136" fill="none" stroke="#8E6A2E" strokeWidth={12} strokeLinejoin="round" />
    <rect x={-40} y={-150} width={80} height={16} rx={8} fill="#8E6A2E" />
    <text x={0} y={-46} textAnchor="middle" fill="#FFF6E2" style={{ font: `400 ${text.length > 2 ? 44 : 70}px "Bebas Neue"` }}>{text}</text>
  </g>
)

// ------------------------------------------------------------ the running total: a tall gauge with a zero line; red below zero, green above
// # value in billions (negative = in the red); scale px per billion
export const TotalGauge: React.FC<{ x: number; y: number; value: number; o?: number; scale?: number; label?: string }> = ({ x, y, value, o = 1, scale = 14, label }) => {
  const h = Math.abs(value) * scale
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-70} y={-140} width={140} height={140 + 36 * scale} rx={20} fill={P.card} stroke={P.edge} strokeWidth={4} />
    <line x1={-110} y1={0} x2={110} y2={0} stroke={P.ink} strokeWidth={5} />
    <text x={-120} y={12} textAnchor="end" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>$0</text>
    {value < 0 ? <rect x={-50} y={0} width={100} height={h} rx={10} fill={P.coral} /> : <rect x={-50} y={-h} width={100} height={h} rx={10} fill={P.mint} />}
    {label && <text x={0} y={-160} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>{label}</text>}
  </g>
}

// ------------------------------------------------------------ a city road strip with a few buildings behind it
export const CityRoad: React.FC<{ y: number; o?: number; f?: number }> = ({ y, o = 1, f = 0 }) => (
  <g opacity={o}>
    {[[120, 260, '#C9D3E1'], [330, 380, '#B8C6D9'], [560, 300, '#D9DFE8'], [1380, 340, '#C9D3E1'], [1600, 420, '#B8C6D9'], [1820, 280, '#D9DFE8']].map(([x, h, c], k) => (
      <g key={k}><rect x={(x as number) - 90} y={y - 60 - (h as number)} width={180} height={h as number} rx={8} fill={c as string} />
        {Array.from({ length: Math.floor((h as number) / 70) }, (_, r) => [0, 1].map((cc) => <rect key={`${r}${cc}`} x={(x as number) - 60 + cc * 70} y={y - 40 - (h as number) + r * 70} width={50} height={36} rx={4} fill="#EEF3FA" opacity={0.8} />))}</g>))}
    <rect x={0} y={y - 60} width={1920} height={70} fill="#5A6680" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={((k * 180 - f * 6) % 2160) - 120} y={y - 30} width={90} height={10} rx={5} fill="#F2E6CC" />)}
  </g>
)

// ------------------------------------------------------------ a small gold coin
export const Coin2: React.FC<{ x: number; y: number; r?: number; o?: number; t?: string }> = ({ x, y, r = 18, o = 1, t }) => (
  <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={P.gold} /><circle r={r * 0.72} fill="none" stroke={P.goldD} strokeWidth={3} />
    {t && <text y={r * 0.38} textAnchor="middle" fill={P.goldD} style={{ font: `400 ${Math.round(r * 1.05)}px "Bebas Neue"` }}>{t}</text>}</g>
)

// ------------------------------------------------------------ a soft spotlight that snaps on its word and fades (kept to object size)
export const USpot: React.FC<{ f: number; at: number; x: number; y: number; rx?: number; ry?: number }> = ({ f, at, x, y, rx = 200, ry = 160 }) => {
  const t = f - at
  if (t < 0 || t > 32) return null
  const o = t < 3 ? t / 3 : 1 - (t - 3) / 29
  return <ellipse cx={x} cy={y} rx={Math.min(rx, 240)} ry={Math.min(ry, 220)} fill={P.gold} opacity={0.2 * o} />
}
