// ============================================================
// LONG VIDEO — "Your Free Stock App Gets Paid Every Time You Trade" —
// objects for this story: the trading app on a phone with a big BUY
// button, the order slip that leaves the phone and travels, the stock
// exchange (a public market hall with a ticker), the market maker's
// trading tower (screens, a dish), the two-price ladder (ask above, bid
// below, the spread as the gap between them), price tags, auction
// paddles. Cast, headline and money helpers come from ../aimoney/common.
// One file per scene. No camera moves (owner r56).
// ============================================================
import React from 'react'
import { clamp01, lerp, P } from '../kit'

// ------------------------------------------------------------ the app: a phone with a stock line and a big green BUY button
// # press 0–1 pushes the button in; zero 0–1 shows a "$0 COMMISSION" ribbon
export const AppPhone: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; press?: number; zero?: number; shares?: string }> = ({ x, y, s = 1, r = 0, o = 1, press = 0, zero = 0, shares }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-230} width={240} height={460} rx={36} fill="#000" opacity={0.15} transform="translate(10 12)" />
    <rect x={-120} y={-230} width={240} height={460} rx={36} fill="#111A2E" />
    <rect x={-104} y={-206} width={208} height={412} rx={24} fill="#F7FAFF" />
    <rect x={-30} y={-220} width={60} height={8} rx={4} fill="#2A3550" />
    {/* # the stock line */}
    <path d="M-80 -60 L-50 -90 L-20 -70 L10 -120 L40 -100 L80 -150" fill="none" stroke={P.mint} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={-80} y={-180} width={110} height={18} rx={9} fill="#C9D3E1" />
    {shares && <text x={0} y={10} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>{shares}</text>}
    {/* # the buy button */}
    <g transform={`translate(0 ${120 + 6 * clamp01(press)})`}>
      <rect x={-84} y={-36} width={168} height={72} rx={36} fill={P.mint} />
      <rect x={-84} y={-36} width={168} height={72} rx={36} fill="#000" opacity={0.12 * clamp01(press)} />
      <text x={0} y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 4 }}>BUY</text>
    </g>
    {zero > 0 && <g opacity={zero} transform="translate(0 50) rotate(-8)"><rect x={-110} y={-30} width={220} height={60} rx={12} fill={P.gold} /><text x={0} y={14} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>$0 COMMISSION</text></g>}
  </g>
)

// ------------------------------------------------------------ the order slip: a paper ticket that travels (BUY 100)
export const Slip: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string; tag?: number }> = ({ x, y, s = 1, r = 0, o = 1, text = 'BUY 100', tag = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-90} y={-56} width={180} height={112} rx={10} fill="#000" opacity={0.14} transform="translate(5 7)" />
    <path d="M-90 -56 L90 -56 L90 56 L-90 56 Z" fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <rect x={-90} y={-56} width={180} height={30} rx={6} fill={P.mint} />
    <text x={0} y={-34} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 24px "Bebas Neue"', letterSpacing: 3 }}>ORDER</text>
    <text x={0} y={22} textAnchor="middle" fill={P.navy0} style={{ font: '400 44px "Bebas Neue"' }}>{text}</text>
    {/* # a price tag hung on it once it is sold */}
    {tag > 0 && <g opacity={tag} transform="translate(86 -40) rotate(18)"><path d="M0 0 L70 0 L90 22 L70 44 L0 44 Z" fill={P.gold} /><circle cx={14} cy={22} r={6} fill={P.paper} /><text x={50} y={32} textAnchor="middle" fill={P.navy0} style={{ font: '400 28px "Bebas Neue"' }}>$</text></g>}
  </g>
)

// ------------------------------------------------------------ the stock exchange: a columned hall with a ticker band
export const Exchange: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; dim?: number }> = ({ x, y, s = 1, o = 1, f = 0, dim = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={290} ry={18} fill={P.shadow} opacity={0.18} />
    <rect x={-270} y={-40} width={540} height={40} rx={4} fill="#D9DFE8" />
    {[-200, -120, -40, 40, 120, 200].map((cx) => <rect key={cx} x={cx - 22} y={-300} width={44} height={260} rx={6} fill="#F2F5FA" stroke="#C9D3E1" strokeWidth={3} />)}
    <rect x={-270} y={-344} width={540} height={44} rx={4} fill="#E9EEF5" />
    {/* # ticker band */}
    <rect x={-250} y={-336} width={500} height={28} rx={4} fill="#0E1B33" />
    <clipPath id="tick"><rect x={-250} y={-336} width={500} height={28} /></clipPath>
    <g clipPath="url(#tick)"><text x={250 - ((f * 4) % 900)} y={-315} fill={P.mint} style={{ font: '400 24px "Bebas Neue"', letterSpacing: 3 }}>ABC ▲ 0.42   XYZ ▼ 0.10   QRS ▲ 1.05   LMN ▲ 0.08   ABC ▲ 0.42</text></g>
    <path d="M-290 -344 L0 -450 L290 -344 Z" fill="#E9EEF5" stroke="#C9D3E1" strokeWidth={4} />
    <text x={0} y={-370} textAnchor="middle" fill={P.navy2} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 6 }}>EXCHANGE</text>
    {dim > 0 && <rect x={-300} y={-460} width={600} height={470} fill="#F2E6CC" opacity={0.55 * dim} />}
  </g>
)

// ------------------------------------------------------------ the market maker: a dark glass trading tower with screens and a dish
export const Tower: React.FC<{ x: number; y: number; s?: number; o?: number; f?: number; sign?: string; glow?: number }> = ({ x, y, s = 1, o = 1, f = 0, sign = 'MARKET MAKER', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={190} ry={16} fill={P.shadow} opacity={0.2} />
    {glow > 0 && <ellipse cx={0} cy={-260} rx={230} ry={300} fill={P.gold} opacity={0.18 * glow} />}
    <rect x={-160} y={-480} width={320} height={480} rx={12} fill="#24324F" />
    <rect x={40} y={-480} width={120} height={480} rx={12} fill="#000" opacity={0.15} />
    {/* # trading screens: little green/red lines that move */}
    {Array.from({ length: 5 }, (_, r) => [0, 1, 2].map((c) => {
      const up = (r + c + Math.floor(f / 20)) % 3 !== 0
      return <g key={`${r}${c}`} transform={`translate(${-120 + c * 84} ${-410 + r * 72})`}>
        <rect x={0} y={0} width={66} height={46} rx={5} fill="#0E1B33" />
        <path d={up ? 'M8 34 L22 26 L36 30 L58 12' : 'M8 12 L22 22 L36 18 L58 36'} fill="none" stroke={up ? P.mint : P.coral} strokeWidth={4} strokeLinecap="round" />
      </g>
    }))}
    <rect x={-40} y={-60} width={80} height={60} rx={6} fill="#5A6680" />
    {/* # dish on the roof */}
    <path d="M60 -480 L60 -520" stroke="#8A97AA" strokeWidth={8} /><path d="M20 -540 Q60 -500 100 -540" fill="none" stroke="#C9D3E1" strokeWidth={10} strokeLinecap="round" />
    <rect x={-150} y={-472} width={300} height={0} />
    <g transform="translate(0 -560)"><rect x={-150} y={-30} width={300} height={56} rx={12} fill={P.gold} /><text x={0} y={12} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>{sign}</text></g>
  </g>
)

// ------------------------------------------------------------ the two-price ladder: ASK above, BID below, the spread is the gap
// # gap px between the two bars; mid 0–1 shows the market maker's fill line in the gap; labels show the prices
export const Ladder: React.FC<{ x: number; y: number; o?: number; gap?: number; ask?: string; bid?: string; fill?: string; mid?: number; spread?: number; buyO?: number; sellO?: number }> = ({ x, y, o = 1, gap = 220, ask = '$100.04', bid = '$100.00', fill, mid = 0, spread = 0, buyO = 1, sellO = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {/* # the ask: cheapest seller */}
    <g opacity={sellO}><rect x={-230} y={-gap / 2 - 70} width={460} height={70} rx={14} fill={P.coral} />
      <text x={-200} y={-gap / 2 - 22} fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>CHEAPEST SELLER</text>
      <text x={200} y={-gap / 2 - 22} textAnchor="end" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>{ask}</text></g>
    {/* # the bid: best buyer */}
    <g opacity={buyO}><rect x={-230} y={gap / 2} width={460} height={70} rx={14} fill={P.skyD} />
      <text x={-200} y={gap / 2 + 48} fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>BEST BUYER</text>
      <text x={200} y={gap / 2 + 48} textAnchor="end" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>{bid}</text></g>
    {/* # the spread: a gold bracket in the gap */}
    {spread > 0 && <g opacity={spread}><path d={`M260 ${-gap / 2} L290 ${-gap / 2} L290 ${gap / 2} L260 ${gap / 2}`} fill="none" stroke={P.goldD} strokeWidth={8} />
      <rect x={-230} y={-gap / 2 + 8} width={460} height={gap - 16} rx={10} fill={P.gold} opacity={0.18} />
      <text x={310} y={10} fill={P.goldInk} style={{ font: '400 48px "Bebas Neue"' }}>SPREAD</text></g>}
    {mid > 0 && fill && <g opacity={mid}><line x1={-230} y1={-gap / 6} x2={230} y2={-gap / 6} stroke={P.navy3} strokeWidth={6} strokeDasharray="14 8" />
      <text x={0} y={-gap / 6 - 14} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>{fill}</text></g>}
  </g>
)

// ------------------------------------------------------------ an auction paddle with a number
export const Paddle: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; n?: string; color?: string }> = ({ x, y, s = 1, r = 0, o = 1, n = '1', color = P.coral }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-8} y={0} width={16} height={110} rx={6} fill="#8E6232" />
    <circle cx={0} cy={-40} r={58} fill={color} /><circle cx={0} cy={-40} r={44} fill="#FFFFFF" />
    <text x={0} y={-24} textAnchor="middle" fill={P.navy0} style={{ font: '400 48px "Bebas Neue"' }}>{n}</text>
  </g>
)

// ------------------------------------------------------------ a small gold coin (cent-sized payments)
export const Cent: React.FC<{ x: number; y: number; r?: number; o?: number; t?: string }> = ({ x, y, r = 18, o = 1, t }) => (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <circle r={r} fill={P.gold} /><circle r={r * 0.72} fill="none" stroke={P.goldD} strokeWidth={3} />
    {t && <text y={r * 0.38} textAnchor="middle" fill={P.goldD} style={{ font: `400 ${Math.round(r * 1.05)}px "Bebas Neue"` }}>{t}</text>}
  </g>
)

// ------------------------------------------------------------ a soft cross for "not …" (owner r68)
export const XMark: React.FC<{ x: number; y: number; o: number; size?: number }> = ({ x, y, o, size = 60 }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * o})`}>
    <path d={`M${-size} ${-size} L${size} ${size} M${size} ${-size} L${-size} ${size}`} stroke="#FFFFFF" strokeWidth={size * 0.36} strokeLinecap="round" opacity={0.9} />
    <path d={`M${-size} ${-size} L${size} ${size} M${size} ${-size} L${-size} ${size}`} stroke={P.coral} strokeWidth={size * 0.24} strokeLinecap="round" />
  </g>
)

// ------------------------------------------------------------ a dashed path drawn up to fraction p
export const Path: React.FC<{ pts: [number, number][]; p: number; o?: number; color?: string }> = ({ pts, p, o = 1, color = P.ink2 }) => {
  const seg = pts.slice(1).map((b, k) => { const a = pts[k]; return { a, b, l: Math.hypot(b[0] - a[0], b[1] - a[1]) } })
  const total = seg.reduce((s, q) => s + q.l, 0)
  let left = clamp01(p) * total, d = `M${pts[0][0]} ${pts[0][1]}`
  for (const q of seg) { if (left <= 0) break; const t = Math.min(1, left / q.l); d += ` L${lerp(q.a[0], q.b[0], t)} ${lerp(q.a[1], q.b[1], t)}`; left -= q.l }
  return <path d={d} fill="none" stroke={color} strokeWidth={8} strokeDasharray="16 14" strokeLinecap="round" opacity={o} />
}

// ------------------------------------------------------------ a spotlight on the thing being named, for this video
// # snaps on in 3 frames on its word (so the eye jumps to it), then fades over ~1 s; a soft gold glow, never a zoom
export const HSpot: React.FC<{ f: number; at: number; x: number; y: number; rx?: number; ry?: number }> = ({ f, at, x, y, rx = 220, ry = 160 }) => {
  const t = f - at
  if (t < 0 || t > 32) return null
  const o = t < 3 ? t / 3 : 1 - (t - 3) / 29
  // # kept to the object's size (never a big blob over the stage)
  const ax = Math.min(rx, 240), ay = Math.min(ry, 220)
  return <g opacity={o}><ellipse cx={x} cy={y} rx={ax} ry={ay} fill={P.gold} opacity={0.2} /></g>
}
