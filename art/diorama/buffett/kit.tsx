// ============================================================
// LONG VIDEO — "Why Warren Buffett Buys When Everyone Is Scared" — objects
// for this story: a bank with columns (cracks when scared), a giant cheque,
// a coupon (the warrant), a bike with a price tag, a briefcase of cash, a
// storm cloud, a newspaper, a shareholder letter, a falling chart, a
// fear–greed dial, a balance and a crown. Plus `Stages`, a small block that
// slides each new picture in on its spoken word while the last one slides
// away (a big, quick change on every beat). Cast, headline and coins come
// from ../aimoney/common; notes and small figures from ../gift/kit.
// ============================================================
import React from 'react'
import { clamp01, easeInOut, easeOut, lerp, P, span } from '../kit'

// ------------------------------------------------------------ stages: one picture per beat
// # each stage starts on its cue; it slides in from the right (and up a little) in 9 frames and the previous one
// # slides out to the left. draw(t) gets the frames since the stage began, so it can animate inside itself.
export type Stage = [at: number, draw: (t: number) => React.ReactNode]
export const Stages: React.FC<{ f: number; list: Stage[]; until?: number; dx?: number }> = ({ f, list, until = 9e9, dx = 700 }) => {
  const st = [...list].sort((a, b) => a[0] - b[0])
  return <g>{st.map(([at, draw], k) => {
    const next = k + 1 < st.length ? st[k + 1][0] : until
    if (f < at - 1 || f > next + 10) return null
    const inn = easeOut(span(f, at + 5, at + 13)), out = easeInOut(span(f, next, next + 6))
    const x = lerp(dx, 0, inn) - dx * out, o = clamp01(inn * 1.4) * (1 - out)
    return o > 0.001 ? <g key={k} opacity={o} transform={`translate(${x} ${lerp(40, 0, inn)})`}>{draw(f - at)}</g> : null
  })}</g>
}
// # 0→1 over d frames from t (inside a stage)
export const go = (t: number, a: number, d = 10) => easeOut(clamp01((t - a) / d))

// ------------------------------------------------------------ the bank
// # a classic bank: steps, four columns, a pediment and a name band; crack 0–1 splits it, shake 0–1 wobbles it
export const Bank: React.FC<{ x: number; y: number; s?: number; name?: string; crack?: number; shake?: number; f?: number; color?: string; o?: number }> = ({ x, y, s = 1, name = 'BANK', crack = 0, shake = 0, f = 0, color = '#DDE6F2', o = 1 }) => (
  <g transform={`translate(${x + Math.sin(f * 1.7) * 10 * shake} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={12} rx={300} ry={26} fill="#000" opacity={0.15} />
    <rect x={-280} y={-30} width={560} height={30} rx={6} fill="#B8C4D6" /><rect x={-250} y={-60} width={500} height={30} rx={6} fill="#C9D3E2" />
    {[-180, -60, 60, 180].map((cx) => <rect key={cx} x={cx - 30} y={-300} width={60} height={240} rx={8} fill={color} />)}
    <rect x={-240} y={-330} width={480} height={36} rx={6} fill="#C9D3E2" />
    <path d="M-270 -330 L0 -460 L270 -330 Z" fill={color} />
    <rect x={-170} y={-404} width={340} height={58} rx={10} fill={P.navy2} />
    <text x={0} y={-360} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 4 }}>{name}</text>
    {crack > 0 && <path d={`M-20 -460 L${-40 + 20 * crack} -330 L10 -220 L-30 -100 L0 0`} fill="none" stroke="#3A2A20" strokeWidth={10 * crack} strokeLinejoin="round" />}
  </g>
)

// ------------------------------------------------------------ money things
// # a giant cheque: payee and amount; signed 0–1 draws a signature
export const Cheque: React.FC<{ x: number; y: number; s?: number; r?: number; to: string; amount: string; signed?: number; o?: number }> = ({ x, y, s = 1, r = 0, to, amount, signed = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-330} y={-150} width={660} height={300} rx={20} fill="#000" opacity={0.16} transform="translate(10 12)" />
    <rect x={-330} y={-150} width={660} height={300} rx={20} fill="#EAF6EE" stroke="#7FBF95" strokeWidth={6} />
    <text x={-290} y={-92} fill="#2E6B47" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>PAY TO</text>
    <text x={-170} y={-92} fill={P.navy1} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 2 }}>{to}</text>
    <rect x={-290} y={-70} width={580} height={4} fill="#7FBF95" />
    <rect x={60} y={-30} width={240} height={80} rx={12} fill="#FFFFFF" stroke="#7FBF95" strokeWidth={4} />
    <text x={180} y={28} textAnchor="middle" fill={P.navy1} style={{ font: '400 64px "Bebas Neue"' }}>{amount}</text>
    <rect x={-290} y={100} width={300} height={4} fill="#7FBF95" />
    <path d="M-280 92 q30 -50 60 -10 t60 -10 t60 0 t60 -14" fill="none" stroke={P.navy2} strokeWidth={6} strokeLinecap="round" strokeDasharray="400" strokeDashoffset={400 * (1 - signed)} />
  </g>
)
// # a coupon (the warrant): dashed edge, a stub, BUY AT price; used 0–1 punches a hole and greys it
export const Coupon: React.FC<{ x: number; y: number; s?: number; r?: number; price: string; name?: string; used?: number; o?: number; glow?: number }> = ({ x, y, s = 1, r = 0, price, name = 'COUPON', used = 0, o = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-250} y={-130} width={500} height={260} rx={30} fill={P.gold} opacity={0.35 * glow} />}
    <rect x={-230} y={-110} width={460} height={220} rx={18} fill="#000" opacity={0.15} transform="translate(8 10)" />
    <rect x={-230} y={-110} width={460} height={220} rx={18} fill="#FFF3C9" />
    <rect x={-216} y={-96} width={432} height={192} rx={12} fill="none" stroke={P.goldD} strokeWidth={5} strokeDasharray="16 10" />
    <path d="M90 -110 L90 110" stroke={P.goldD} strokeWidth={4} strokeDasharray="10 8" />
    <text x={-70} y={-30} textAnchor="middle" fill={P.goldD} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>{name}</text>
    <text x={-70} y={40} textAnchor="middle" fill={P.navy1} style={{ font: '400 70px "Bebas Neue"' }}>BUY AT {price}</text>
    <circle cx={160} cy={0} r={34} fill={P.coral} opacity={0.85} />
    {used > 0 && <g opacity={used}><rect x={-230} y={-110} width={460} height={220} rx={18} fill="#9AA4B2" opacity={0.5} /><circle cx={160} cy={0} r={40} fill={P.navy0} /></g>}
  </g>
)
// # a briefcase that opens to show bundles of cash
export const Briefcase: React.FC<{ x: number; y: number; s?: number; open?: number; o?: number }> = ({ x, y, s = 1, open = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-200} width={120} height={50} rx={18} fill="none" stroke="#5A3A22" strokeWidth={16} />
    <rect x={-220} y={-160} width={440} height={240} rx={26} fill="#7A4E2C" />
    {open > 0 && <g transform={`translate(0 ${-80 * open})`}>{[0, 1, 2, 3].map((k) => <rect key={k} x={-180 + k * 92} y={-150} width={80} height={110} rx={8} fill="#5FBF7F" stroke="#2E8B57" strokeWidth={4} />)}</g>}
    <rect x={-220} y={-160} width={440} height={60} rx={26} fill="#8E5E36" />
    <rect x={-30} y={-110} width={60} height={34} rx={8} fill={P.gold} />
  </g>
)

// ------------------------------------------------------------ the bike example
export const Bike: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = P.coral }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={110} rx={260} ry={18} fill="#000" opacity={0.15} />
    {[-150, 150].map((cx) => <g key={cx}><circle cx={cx} cy={20} r={90} fill="none" stroke="#2A3448" strokeWidth={18} /><circle cx={cx} cy={20} r={10} fill="#2A3448" /></g>)}
    <path d="M-150 20 L-40 -110 L110 -110 L150 20 M-40 -110 L0 20 L110 -110 M0 20 L-150 20" fill="none" stroke={color} strokeWidth={16} strokeLinejoin="round" />
    <rect x={-80} y={-140} width={90} height={22} rx={10} fill="#2A3448" /><path d="M110 -110 L90 -170 L140 -170" fill="none" stroke="#2A3448" strokeWidth={12} strokeLinecap="round" />
  </g>
)

// ------------------------------------------------------------ fear
// # a dark storm cloud with rain and a lightning bolt (bolt 0–1)
export const Storm: React.FC<{ x: number; y: number; s?: number; f: number; bolt?: number; o?: number }> = ({ x, y, s = 1, f, bolt = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: 9 }, (_, k) => <path key={k} d={`M${-200 + k * 50} ${60 + ((f * 9 + k * 37) % 120)} l-14 40`} stroke="#9FB4D6" strokeWidth={6} strokeLinecap="round" />)}
    <ellipse cx={-120} cy={0} rx={150} ry={90} fill="#4A5670" /><ellipse cx={60} cy={-40} rx={180} ry={120} fill="#56627C" /><ellipse cx={200} cy={10} rx={130} ry={80} fill="#4A5670" />
    <rect x={-270} y={0} width={540} height={80} rx={40} fill="#4A5670" />
    {bolt > 0 && <path d="M40 60 L-10 170 L40 170 L0 290 L110 140 L50 140 L90 60 Z" fill={P.gold} opacity={bolt} />}
  </g>
)
// # a fear ↔ greed dial: v from -1 (fear) to +1 (greed)
export const Dial: React.FC<{ x: number; y: number; s?: number; v: number; o?: number }> = ({ x, y, s = 1, v, o = 1 }) => {
  const a = -90 + 90 * Math.max(-1, Math.min(1, v))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d="M-260 0 A260 260 0 0 1 0 -260 L0 -170 A170 170 0 0 0 -170 0 Z" fill={P.coral} />
      <path d="M0 -260 A260 260 0 0 1 260 0 L170 0 A170 170 0 0 0 0 -170 Z" fill={P.mint} />
      <text x={-150} y={60} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>FEAR</text>
      <text x={150} y={60} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>GREED</text>
      <g transform={`rotate(${a + 90})`}><path d="M-12 0 L0 -230 L12 0 Z" fill={P.navy1} /></g>
      <circle r={28} fill={P.navy1} />
    </g>
  )
}
// # a line chart that draws itself (t 0–1) along given points (0..1 space), inside w×h
export const LineChart: React.FC<{ x: number; y: number; w: number; h: number; pts: [number, number][]; t: number; color?: string; o?: number }> = ({ x, y, w, h, pts, t, color = P.coral, o = 1 }) => {
  const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${x + px * w} ${y + h - py * h}`).join(' ')
  const tip = pts[Math.min(pts.length - 1, Math.floor(t * (pts.length - 1)))]
  return (
    <g opacity={o}>
      <rect x={x} y={y + h} width={w} height={6} rx={3} fill={P.ink2} opacity={0.5} />
      <path d={d} fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - t} />
      {t > 0 && <circle cx={x + tip[0] * w} cy={y + h - tip[1] * h} r={20} fill={color} />}
    </g>
  )
}

// ------------------------------------------------------------ paper
export const Newspaper: React.FC<{ x: number; y: number; s?: number; r?: number; head: string; o?: number }> = ({ x, y, s = 1, r = 0, head, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-300} y={-380} width={600} height={760} rx={10} fill="#000" opacity={0.15} transform="translate(10 12)" />
    <rect x={-300} y={-380} width={600} height={760} rx={10} fill="#F4F1EA" />
    <text x={0} y={-310} textAnchor="middle" fill="#222" style={{ font: '400 58px "Bebas Neue"', letterSpacing: 6 }}>THE DAILY PAPER</text>
    <rect x={-260} y={-290} width={520} height={6} fill="#222" />
    <text x={0} y={-200} textAnchor="middle" fill="#111" style={{ font: '400 84px "Bebas Neue"' }}>{head}</text>
    <rect x={-260} y={-160} width={250} height={180} rx={6} fill="#C9C3B6" />
    {Array.from({ length: 10 }, (_, k) => <rect key={k} x={k < 5 ? 20 : -260} y={-160 + (k % 5) * 40 + (k < 5 ? 0 : 220)} width={k < 5 ? 240 : 520} height={14} rx={7} fill="#BDB6A6" />)}
  </g>
)
export const Letter: React.FC<{ x: number; y: number; s?: number; r?: number; year: string; o?: number; hi?: number }> = ({ x, y, s = 1, r = 0, year, o = 1, hi = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-210} y={-280} width={420} height={560} rx={14} fill="#000" opacity={0.15} transform="translate(8 10)" />
    <rect x={-210} y={-280} width={420} height={560} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={3} />
    <text x={0} y={-210} textAnchor="middle" fill={P.navy2} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>LETTER TO SHAREHOLDERS</text>
    <text x={0} y={-150} textAnchor="middle" fill={P.coralD} style={{ font: '400 64px "Bebas Neue"' }}>{year}</text>
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-170} y={-100 + k * 44} width={340 - (k % 3) * 50} height={14} rx={7} fill="#C8B994" />)}
    {hi > 0 && <rect x={-180} y={-14} width={360} height={60} rx={8} fill={P.gold} opacity={0.45 * hi} />}
  </g>
)
// # a simple balance; tilt in degrees (positive = right side down)
export const Balance: React.FC<{ x: number; y: number; s?: number; tilt?: number; left?: React.ReactNode; right?: React.ReactNode; o?: number }> = ({ x, y, s = 1, tilt = 0, left, right, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-12} y={-300} width={24} height={300} fill={P.ink2} /><path d="M-120 0 L120 0 L0 -40 Z" fill={P.ink2} />
    <g transform={`rotate(${tilt} 0 -300)`}>
      <rect x={-320} y={-310} width={640} height={20} rx={10} fill={P.navy3} />
      {[-300, 300].map((cx, i) => <g key={cx} transform={`translate(${cx} -300) rotate(${-tilt})`}>
        <path d="M0 0 L-90 160 M0 0 L90 160" stroke={P.ink2} strokeWidth={5} /><path d="M-110 160 L110 160 L80 200 L-80 200 Z" fill={P.navy3} />
        <g transform="translate(0 150)">{i ? right : left}</g>
      </g>)}
    </g>
  </g>
)
export const Crown: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-110 50 L-110 -50 L-55 0 L0 -75 L55 0 L110 -50 L110 50 Z" fill={P.gold} stroke={P.goldD} strokeWidth={8} /></g>
)
// # a big hand-drawn arrow (dir: 1 up, -1 down)
export const BigArrow: React.FC<{ x: number; y: number; s?: number; dir?: 1 | -1; color?: string; t?: number }> = ({ x, y, s = 1, dir = 1, color = P.mint, t = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s} ${s * dir * lerp(0.2, 1, t)})`}><path d="M-40 120 L-40 -40 L-100 -40 L0 -160 L100 -40 L40 -40 L40 120 Z" fill={color} /></g>
)

// ------------------------------------------------------------ extras: one small, relevant thing on a spoken word
// # [cue, until cue (or null), kind, x, y, label?]: a coin, a calendar, a tag, a tick, a ring, a question mark, a
// # figure, an arrow or a cross pops in on its word and leaves when the picture it belongs to leaves.
export type Extra = [cue: string, until: string | null, kind: 'coin' | 'cal' | 'tag' | 'tick' | 'ring' | 'q' | 'fig' | 'up' | 'down' | 'cross' | 'click', x: number, y: number, label?: string]
export const Extras: React.FC<{ f: number; c: (k: string) => number; list: Extra[]; scale?: number }> = ({ f, c, list, scale = 1 }) => (
  <g>{list.map(([cue, until, kind, x, y, label], k) => {
    const a = c(cue), b = until ? c(until) : 9e9, o = clamp01((f - a) / 3) * (1 - clamp01((f - b) / 6))
    if (o <= 0.001) return null
    const p = scale * (1 + 0.25 * Math.max(0, 1 - (f - a) / 8))
    const body = kind === 'coin' ? <g><circle r={70} fill={P.goldD} transform="translate(0 8)" /><circle r={70} fill={P.gold} /><circle r={52} fill="none" stroke={P.goldD} strokeWidth={6} /><text y={18} textAnchor="middle" fill={P.goldD} style={{ font: `400 ${label && label.length > 3 ? 44 : 64}px "Bebas Neue"` }}>{label ?? '$'}</text></g>
      : kind === 'cal' ? <g><rect x={-90} y={-100} width={180} height={200} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={3} /><rect x={-90} y={-100} width={180} height={50} rx={16} fill={P.coral} /><text y={56} textAnchor="middle" fill={P.navy0} style={{ font: `400 ${label && label.length > 4 ? 46 : 72}px "Bebas Neue"` }}>{label}</text></g>
      : kind === 'tag' ? <g><path d={`M${-30 - (label?.length ?? 4) * 17} -48 L${(label?.length ?? 4) * 17} -48 L${(label?.length ?? 4) * 17 + 40} 0 L${(label?.length ?? 4) * 17} 48 L${-30 - (label?.length ?? 4) * 17} 48 Z`} fill={P.gold} /><text x={-10} y={18} textAnchor="middle" fill="#0E1B33" style={{ font: '400 54px "Bebas Neue"' }}>{label}</text></g>
      : kind === 'click' ? <g><circle r={30 + 70 * Math.min(1, (f - a) / 10)} fill="none" stroke="#1A73E8" strokeWidth={8} opacity={Math.max(0, 1 - (f - a) / 10)} /><path d="M0 0 L0 96 L26 72 L44 112 L62 104 L44 64 L80 64 Z" fill="#FFFFFF" stroke="#202124" strokeWidth={6} strokeLinejoin="round" transform="translate(-30 -50)" /></g>
      : kind === 'tick' ? <g><circle r={56} fill={P.mint} /><path d="M-26 0 l18 18 l36 -40" stroke="#FFFFFF" strokeWidth={14} fill="none" strokeLinecap="round" /></g>
      : kind === 'ring' ? <circle r={150 + 10 * Math.sin((f - a) / 3)} fill="none" stroke={P.goldInk} strokeWidth={18 / scale} />
      : kind === 'q' ? <text y={60} textAnchor="middle" fill={P.goldInk} style={{ font: '400 200px "Bebas Neue"' }}>?</text>
      : kind === 'fig' ? <g>{[0, 1, 2].map((i) => <g key={i} transform={`translate(${(i - 1) * 90} 0)`}><ellipse cx={0} cy={6} rx={40} ry={10} fill={P.shadow} opacity={0.2} /><path d="M-34 0 Q-34 -70 0 -72 Q34 -70 34 0 Z" fill={P.navy4} /><circle cx={0} cy={-96} r={26} fill={P.navy4} /></g>)}</g>
      : kind === 'up' || kind === 'down' ? <g transform={`scale(1 ${kind === 'up' ? 1 : -1})`}><path d="M-30 90 L-30 -20 L-80 -20 L0 -110 L80 -20 L30 -20 L30 90 Z" fill={kind === 'up' ? P.mint : P.coral} /></g>
      : <path d="M-80 -80 L80 80 M80 -80 L-80 80" stroke={P.coral} strokeWidth={22} strokeLinecap="round" />
    // # keep clear of the headline band (top 230 px) once scaled
    const half = ({ cal: 100, coin: 78, tag: 48, tick: 56, click: 90, q: 110, fig: 130, up: 110, down: 110, ring: 160, cross: 90 } as Record<string, number>)[kind] * scale
    const yy = Math.max(y, 230 + half)
    return <g key={k} opacity={o} transform={`translate(${x} ${yy}) scale(${p})`}>{body}</g>
  })}</g>
)
