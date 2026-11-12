// ============================================================
// LONG VIDEO — "How Casinos Win Even When You Win" — objects for this
// story: the Strip's casino towers, the roulette wheel (38 real pockets
// in American order), the felt table, chips, the house chip tray, the
// chip loop with the house toll, a slot machine and the comps (drink,
// meal, room key). The shared cast, headline, camera and money helpers
// come from ../aimoney/common. One file per scene in this folder.
// ============================================================
import React from 'react'
import { lerp, P, rnd } from '../kit'
import { Label } from '../charts'

// ------------------------------------------------------------ the Strip
// # a casino tower with a neon sign; lit 0–1 switches its windows and sign on
export const CasinoTower: React.FC<{ x: number; y: number; w: number; h: number; sign: string; color: string; lit: number; seed: number; f: number }> = ({ x, y, w, h, sign, color, lit, seed, f }) => {
  const rows = Math.floor((h - 120) / 34), cols = Math.max(2, Math.floor((w - 30) / 34))
  const flick = 0.85 + 0.15 * Math.sin(f / 7 + seed)
  return (
    <g>
      <ellipse cx={x} cy={y + 6} rx={w * 0.7} ry={14} fill={P.shadow} opacity={0.25} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} rx={10} fill={P.navy2} />
      <rect x={x + w * 0.18} y={y - h} width={w * 0.32} height={h} rx={8} fill="#000" opacity={0.18} />
      {Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => {
        const on = rnd(seed * 31 + r * 7 + c) < 0.62
        return <rect key={`${r}-${c}`} x={x - w / 2 + 18 + c * 34} y={y - h + 100 + r * 34} width={18} height={18} rx={3} fill={on ? P.gold : P.navy3} opacity={on ? 0.25 + 0.7 * lit : 0.6} />
      }))}
      {/* # the neon sign on the roof */}
      <rect x={x - w / 2 - 14} y={y - h - 64} width={w + 28} height={70} rx={16} fill={P.navy0} stroke={color} strokeWidth={5} strokeOpacity={0.25 + 0.75 * lit * flick} />
      <text x={x} y={y - h - 13} textAnchor="middle" fill={color} opacity={0.25 + 0.75 * lit * flick} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 4 }}>{sign}</text>
      {lit > 0 && <ellipse cx={x} cy={y - h - 30} rx={w * 0.9} ry={60} fill={color} opacity={0.12 * lit} />}
      {/* # the entrance */}
      <rect x={x - 46} y={y - 90} width={92} height={90} rx={10} fill={P.gold} opacity={0.3 + 0.6 * lit} />
      <rect x={x - 2} y={y - 90} width={4} height={90} fill={P.navy0} opacity={0.6} />
    </g>
  )
}

// ------------------------------------------------------------ chips
export const CHIP = { red: '#D9483A', black: '#2A3448', green: '#2FA36B', gold: '#E9C25A', blue: '#3A6EA8' }
// # one chip seen at an angle
export const Chip: React.FC<{ x: number; y: number; s?: number; color?: string; o?: number; label?: string }> = ({ x, y, s = 1, color = CHIP.red, o = 1, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={44} ry={20} fill="#000" opacity={0.22} />
    <ellipse cx={0} cy={4} rx={44} ry={20} fill={color} /><ellipse cx={0} cy={0} rx={44} ry={20} fill={color} />
    <ellipse cx={0} cy={0} rx={44} ry={20} fill="none" stroke="#FFFFFF" strokeWidth={6} strokeDasharray="10 12" />
    <ellipse cx={0} cy={0} rx={28} ry={12} fill="#FFFFFF" opacity={0.18} />
    {label && <text x={0} y={7} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 22px "Bebas Neue"' }}>{label}</text>}
  </g>
)
// # a stack of n chips (grows upward from y)
export const Stack: React.FC<{ x: number; y: number; n: number; s?: number; color?: string; o?: number }> = ({ x, y, n, s = 1, color = CHIP.red, o = 1 }) => {
  const k = Math.max(0, Math.round(n))
  return <g opacity={o}>{Array.from({ length: k }, (_, i) => <Chip key={i} x={x} y={y - i * 9 * s} s={s} color={color} />)}</g>
}
// # the house's chip tray: rows of gold chips; fill 0–1 adds rows
export const Tray: React.FC<{ x: number; y: number; fill: number; s?: number; o?: number; label?: string }> = ({ x, y, fill, s = 1, o = 1, label }) => {
  const rows = 6, n = Math.round(Math.max(0, Math.min(1, fill)) * rows * 9)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-200} y={-30} width={400} height={92} rx={16} fill="#5A3A22" />
      <rect x={-188} y={-22} width={376} height={70} rx={10} fill="#3B2616" />
      {Array.from({ length: n }, (_, i) => { const c = i % 9, r = Math.floor(i / 9); return <rect key={i} x={-176 + c * 40} y={-14 - r * 14} width={34} height={58} rx={8} fill={r % 2 ? CHIP.gold : '#F2D27A'} /> })}
      {label && <Label x={0} y={130} text={label} size={64} font="Bebas Neue" color={P.ink} />}
    </g>
  )
}

// ------------------------------------------------------------ the roulette wheel (American order, 0 and 00 green)
export const ORDER = ['0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2']
const REDS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])
export const pocketColor = (n: string) => (n === '0' || n === '00' ? 'green' : REDS.has(+n) ? 'red' : 'black')
const FILL = { red: '#D9483A', black: '#232B3B', green: '#2FA36B' }
// # top view squashed to an ellipse (tilt = ry/rx). shown: how many pockets are drawn (count-up), rot: spin (deg),
// # ball: pocket index the ball sits in (or -1), dim: fade colour groups, glow: highlight a colour group
export const Wheel: React.FC<{ cx: number; cy: number; r: number; tilt?: number; rot?: number; shown?: number; ball?: number; ballA?: number; dimRed?: number; dimBlack?: number; dimGreen?: number; glowGreen?: number; glowRed?: number; numbers?: boolean; o?: number; europe?: boolean }> = ({ cx, cy, r, tilt = 0.62, rot = 0, shown = 38, ball = -1, ballA, dimRed = 0, dimBlack = 0, dimGreen = 0, glowGreen = 0, glowRed = 0, numbers = true, o = 1, europe = false }) => {
  const colOf = (num: string) => (europe && num === '00' ? 'black' : pocketColor(num))
  const n = 38, ri = r * 0.68
  const pt = (a: number, rr: number) => [Math.cos((a * Math.PI) / 180) * rr, Math.sin((a * Math.PI) / 180) * rr]
  return (
    <g opacity={o}>
      <ellipse cx={cx} cy={cy + r * tilt * 0.22} rx={r * 1.12} ry={r * tilt * 1.12} fill="#000" opacity={0.25} />
      <g transform={`translate(${cx} ${cy}) scale(1 ${tilt})`}>
        <circle r={r * 1.1} fill="#6B4426" /><circle r={r * 1.03} fill="#8A5A34" />
        {ORDER.map((num, i) => {
          if (i >= shown) return null
          const a0 = rot + (i * 360) / n - 90, a1 = a0 + 360 / n, col = colOf(num)
          const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r), [x2, y2] = pt(a1, ri), [x3, y3] = pt(a0, ri)
          const dim = col === 'red' ? dimRed : col === 'black' ? dimBlack : dimGreen
          return <path key={i} d={`M${x0} ${y0} L${x1} ${y1} L${x2} ${y2} L${x3} ${y3} Z`} fill={FILL[col]} opacity={1 - 0.8 * dim} stroke="#C9A25C" strokeWidth={1.5} />
        })}
        {glowGreen > 0 && ORDER.map((num, i) => colOf(num) !== 'green' ? null : (() => { const a = rot + ((i + 0.5) * 360) / n - 90, [gx, gy] = pt(a, (r + ri) / 2); return <circle key={i} cx={gx} cy={gy} r={r * 0.16} fill={FILL.green} opacity={0.5 * glowGreen} /> })())}
        {glowRed > 0 && ORDER.map((num, i) => pocketColor(num) !== 'red' ? null : (() => { const a = rot + ((i + 0.5) * 360) / n - 90, [gx, gy] = pt(a, (r + ri) / 2); return <circle key={i} cx={gx} cy={gy} r={r * 0.09} fill="#FF9C8F" opacity={0.55 * glowRed} /> })())}
        <circle r={ri} fill="#7A4E2C" /><circle r={ri * 0.8} fill="#9A6A3E" />
        {/* # the centre turret */}
        <circle r={ri * 0.28} fill="#C9A25C" /><circle r={ri * 0.12} fill="#F2D27A" />
        {[0, 90, 180, 270].map((a) => { const [hx, hy] = pt(a + rot * 1.0, ri * 0.55); return <line key={a} x1={0} y1={0} x2={hx} y2={hy} stroke="#C9A25C" strokeWidth={r * 0.05} strokeLinecap="round" /> })}
        {/* # the ball */}
        {(ball >= 0 || ballA !== undefined) && (() => { const a = ballA ?? rot + ((ball + 0.5) * 360) / n - 90, [bx, by] = pt(a, ballA !== undefined ? r * 1.04 : (r + ri) / 2); return <circle cx={bx} cy={by} r={r * 0.055} fill="#FFFFFF" stroke="#C8D0DC" strokeWidth={2} /> })()}
      </g>
      {/* # numbers on the big wheel only, upright (not squashed) */}
      {numbers && r > 200 && ORDER.map((num, i) => {
        if (i >= shown) return null
        const a = rot + ((i + 0.5) * 360) / n - 90, rr = (r + ri) / 2
        const nx = cx + Math.cos((a * Math.PI) / 180) * rr, ny = cy + Math.sin((a * Math.PI) / 180) * rr * tilt
        return <text key={i} x={nx} y={ny + 9} textAnchor="middle" fill="#FFFFFF" style={{ font: `400 ${Math.round(r * 0.075)}px "Bebas Neue"` }}>{num}</text>
      })}
    </g>
  )
}
// # the pocket index of a given number (for landing the ball)
export const pocketOf = (num: string) => ORDER.indexOf(num)

// ------------------------------------------------------------ the felt table (front view, slight perspective)
export const Table: React.FC<{ x: number; y: number; w: number; d?: number; o?: number; red?: number; black?: number }> = ({ x, y, w, d = 260, o = 1, red = 0, black = 0 }) => (
  <g opacity={o}>
    <ellipse cx={x} cy={y + d * 0.5 + 40} rx={w * 0.55} ry={40} fill={P.shadow} opacity={0.25} />
    <rect x={x - w / 2} y={y} width={w} height={d} rx={d / 2} fill="#6B4426" />
    <rect x={x - w / 2 + 22} y={y + 16} width={w - 44} height={d - 40} rx={(d - 40) / 2} fill="#1F7A52" />
    <rect x={x - w / 2 + 22} y={y + 16} width={w - 44} height={(d - 40) * 0.35} rx={(d - 40) * 0.17} fill="#FFFFFF" opacity={0.06} />
    {/* # the RED and BLACK betting boxes */}
    <rect x={x - 230} y={y + d * 0.42} width={200} height={84} rx={12} fill="#D9483A" stroke="#F2E6CC" strokeWidth={4} opacity={0.8 + 0.2 * red} />
    <rect x={x + 30} y={y + d * 0.42} width={200} height={84} rx={12} fill="#232B3B" stroke="#F2E6CC" strokeWidth={4} opacity={0.8 + 0.2 * black} />
    <text x={x - 130} y={y + d * 0.42 + 58} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>RED</text>
    <text x={x + 130} y={y + d * 0.42 + 58} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>BLACK</text>
    {red > 0 && <rect x={x - 236} y={y + d * 0.42 - 6} width={212} height={96} rx={16} fill="none" stroke={P.gold} strokeWidth={6} opacity={red} />}
    <rect x={x - w / 2} y={y + d - 30} width={w} height={60} rx={20} fill="#4E311B" />
  </g>
)

// ------------------------------------------------------------ the chip loop with the house toll
// # an oval track; n chips ride it (speed = laps per second); each pass under the toll gate drops a gold sliver to the house
export const loopPoint = (cx: number, cy: number, rx: number, ry: number, u: number) => ({ x: cx + Math.cos(u * Math.PI * 2 - Math.PI / 2) * rx, y: cy + Math.sin(u * Math.PI * 2 - Math.PI / 2) * ry })
export const ChipLoop: React.FC<{ cx: number; cy: number; rx: number; ry: number; f: number; start: number; n: number; lap?: number; o?: number; toll?: number; color?: string }> = ({ cx, cy, rx, ry, f, start, n, lap = 60, o = 1, toll = 0, color = CHIP.red }) => {
  const t = Math.max(0, f - start)
  return (
    <g opacity={o}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={P.ink2} strokeWidth={6} strokeDasharray="4 18" strokeLinecap="round" opacity={0.6} />
      {/* # arrows show the direction */}
      {[0.12, 0.62].map((u) => { const a = loopPoint(cx, cy, rx, ry, u), b = loopPoint(cx, cy, rx, ry, u + 0.02); const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI; return <path key={u} d="M-16 -14 L14 0 L-16 14" fill="none" stroke={P.ink2} strokeWidth={6} strokeLinecap="round" transform={`translate(${a.x} ${a.y}) rotate(${ang})`} opacity={0.7} /> })}
      {/* # the toll gate at the bottom of the loop */}
      {toll > 0 && (() => { const g = loopPoint(cx, cy, rx, ry, 0.5); return <g opacity={toll}><rect x={g.x - 22} y={g.y - 90} width={44} height={180} rx={12} fill={P.gold} /><rect x={g.x - 90} y={g.y - 124} width={180} height={52} rx={12} fill={P.goldD} /><text x={g.x} y={g.y - 85} textAnchor="middle" fill={P.navy0} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>HOUSE</text></g> })()}
      {Array.from({ length: n }, (_, k) => {
        const u = ((t / lap) + k / n) % 1, p = loopPoint(cx, cy, rx, ry, u)
        return <Chip key={k} x={p.x} y={p.y} s={1} color={color} />
      })}
      {/* # slivers falling from the toll into the house below */}
      {toll > 0 && Array.from({ length: 3 }, (_, k) => { const ph = ((t / (lap / n)) + k / 3) % 1, g = loopPoint(cx, cy, rx, ry, 0.5); return <rect key={k} x={g.x - 10} y={g.y + 30 + ph * 120} width={20} height={10} rx={3} fill={P.gold} opacity={toll * (1 - ph)} /> })}
    </g>
  )
}

// ------------------------------------------------------------ a slot machine
const SYM = ['7', 'BAR', '$', '7', 'BAR']
export const Slot: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; spinAt?: number; spinFor?: number; credits?: string; lit?: number; showInside?: number; reels?: [number, number, number] }> = ({ x, y, s = 1, o = 1, f, spinAt = -999, spinFor = 30, credits, lit = 1, showInside = 0, reels = [0, 1, 2] }) => {
  const spinning = f >= spinAt && f < spinAt + spinFor
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={10} rx={230} ry={24} fill={P.shadow} opacity={0.25} />
      <rect x={-200} y={-640} width={400} height={640} rx={36} fill="#B23A2F" />
      <rect x={-200} y={-640} width={400} height={640} rx={36} fill="none" stroke={P.gold} strokeWidth={8} />
      <rect x={60} y={-640} width={140} height={640} rx={30} fill="#000" opacity={0.15} />
      {/* # top light box */}
      <rect x={-170} y={-610} width={340} height={110} rx={22} fill={P.navy0} />
      <text x={0} y={-536} textAnchor="middle" fill={P.gold} opacity={0.4 + 0.6 * lit * (0.85 + 0.15 * Math.sin(f / 5))} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 6 }}>JACKPOT</text>
      {/* # reel window */}
      <rect x={-170} y={-470} width={340} height={170} rx={18} fill="#F7FAFF" />
      {[0, 1, 2].map((k) => {
        const sym = spinning ? SYM[Math.floor(f / 2 + k * 3) % SYM.length] : SYM[reels[k] % SYM.length]
        return <g key={k}><rect x={-160 + k * 110} y={-460} width={100} height={150} rx={10} fill={spinning ? '#E8EEF5' : '#FFFFFF'} />
          <text x={-110 + k * 110} y={-360 + (spinning ? ((f * 9 + k * 40) % 60) - 30 : 0)} textAnchor="middle" fill="#B23A2F" style={{ font: '400 74px "Bebas Neue"' }}>{sym}</text></g>
      })}
      {/* # the inside: a computer chip that decides each spin (shown through a glass panel) */}
      {showInside > 0 && <g opacity={showInside}><rect x={-170} y={-280} width={340} height={150} rx={18} fill={P.navy1} /><rect x={-60} y={-250} width={120} height={90} rx={10} fill="#2A3F6E" stroke={P.sky} strokeWidth={4} />
        {[-40, -15, 10, 35].map((dx) => <g key={dx}><rect x={dx - 3} y={-268} width={6} height={18} fill={P.sky} /><rect x={dx - 3} y={-160} width={6} height={18} fill={P.sky} /></g>)}
        <text x={0} y={-192} textAnchor="middle" fill={P.sky} style={{ font: '400 34px "Bebas Neue"' }}>RNG</text></g>}
      {/* # credit meter */}
      <rect x={-170} y={-110} width={340} height={70} rx={14} fill={P.navy0} />
      {credits !== undefined && <text x={0} y={-58} textAnchor="middle" fill={P.mint} style={{ font: '400 50px "JetBrains Mono"' }}>{credits}</text>}
      {/* # the lever */}
      <rect x={200} y={-420} width={22} height={200} rx={10} fill="#8A97AA" /><circle cx={211} cy={-430} r={30} fill="#D9483A" />
    </g>
  )
}

// ------------------------------------------------------------ comps
export const Cocktail: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={60} ry={12} fill="#000" opacity={0.2} />
    <ellipse cx={0} cy={0} rx={50} ry={10} fill="#CFEFFF" /><rect x={-5} y={-120} width={10} height={120} fill="#CFEFFF" />
    <path d="M-90 -230 L90 -230 L0 -120 Z" fill="#CFEFFF" opacity={0.7} /><path d="M-70 -206 L70 -206 L0 -130 Z" fill="#F06B9B" />
    <circle cx={60} cy={-226} r={18} fill={P.gold} /><path d="M20 -280 L-10 -170" stroke="#F7FAFF" strokeWidth={6} />
  </g>
)
export const Meal: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={150} ry={34} fill="#000" opacity={0.18} />
    <ellipse cx={0} cy={0} rx={150} ry={40} fill="#F7FAFF" /><ellipse cx={0} cy={-4} rx={110} ry={28} fill="#E8EEF5" />
    <path d="M-120 -10 Q0 -170 120 -10 Z" fill="#C9D3E1" /><circle cx={0} cy={-104} r={12} fill="#8A97AA" />
  </g>
)
export const RoomKey: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; gold?: boolean }> = ({ x, y, s = 1, o = 1, r = -8, gold }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-75} width={240} height={150} rx={18} fill="#000" opacity={0.2} transform="translate(8 8)" />
    <rect x={-120} y={-75} width={240} height={150} rx={18} fill={gold ? '#1B2233' : '#F7FAFF'} stroke={gold ? P.gold : '#CDB58C'} strokeWidth={4} />
    <rect x={-120} y={-75} width={240} height={46} rx={18} fill={gold ? P.gold : P.skyD} /><rect x={-120} y={-45} width={240} height={16} fill={gold ? P.gold : P.skyD} />
    <text x={0} y={-40} textAnchor="middle" fill={gold ? '#1B2233' : '#FFFFFF'} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 3 }}>{gold ? 'SUITE' : 'ROOM'}</text>
    <rect x={-90} y={10} width={70} height={46} rx={8} fill={P.gold} /><rect x={0} y={20} width={90} height={12} rx={6} fill="#C9D3E1" />
  </g>
)

// ------------------------------------------------------------ a balance: tilt −1 (left down) … 1 (right down)
export const Balance: React.FC<{ x: number; y: number; tilt: number; left?: React.ReactNode; right?: React.ReactNode; s?: number; o?: number }> = ({ x, y, tilt, left, right, s = 1, o = 1 }) => {
  const a = tilt * 12, rad = (a * Math.PI) / 180, L = 300
  const lx = -Math.cos(rad) * L, ly = -Math.sin(rad) * L, rx2 = Math.cos(rad) * L, ry2 = Math.sin(rad) * L
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={330} rx={160} ry={22} fill={P.shadow} opacity={0.2} />
      <rect x={-12} y={0} width={24} height={330} rx={10} fill={P.goldD} /><rect x={-110} y={316} width={220} height={26} rx={12} fill={P.goldD} />
      <line x1={lx} y1={ly} x2={rx2} y2={ry2} stroke={P.gold} strokeWidth={18} strokeLinecap="round" /><circle r={22} fill={P.gold} />
      {[[lx, ly, left], [rx2, ry2, right]].map(([px, py, kid], k) => (
        <g key={k} transform={`translate(${px as number} ${py as number})`}>
          <line x1={-110} y1={150} x2={0} y2={0} stroke={P.ink2} strokeWidth={4} /><line x1={110} y1={150} x2={0} y2={0} stroke={P.ink2} strokeWidth={4} />
          <path d="M-130 150 Q0 220 130 150 Z" fill={P.gold} />
          <g transform="translate(0 140)">{kid as React.ReactNode}</g>
        </g>
      ))}
    </g>
  )
}

// ------------------------------------------------------------ a $100 bill that can split into a kept part and a lost part
// # lost 0–1 = share that slides away to the right; t 0–1 = how far it has slid
export const SplitBill: React.FC<{ x: number; y: number; s?: number; lost: number; t: number; o?: number; dx?: number; dy?: number; text?: string }> = ({ x, y, s = 1, lost, t, o = 1, dx = 360, dy = 0, text = '100' }) => {
  const W = 420, H = 200, cut = W * (1 - lost)
  const body = (clipX: number, clipW: number, ox: number, oy: number, k: number) => (
    <g transform={`translate(${ox} ${oy})`} clipPath={`url(#sb-${k}-${Math.round(x)})`}>
      <defs><clipPath id={`sb-${k}-${Math.round(x)}`}><rect x={clipX} y={-H / 2 - 4} width={clipW} height={H + 8} /></clipPath></defs>
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={16} fill="#5FBF7F" />
      <rect x={-W / 2 + 14} y={-H / 2 + 14} width={W - 28} height={H - 28} rx={10} fill="none" stroke="#2E8B57" strokeWidth={5} />
      <circle cx={0} cy={0} r={52} fill="#2E8B57" opacity={0.35} />
      <text x={0} y={22} textAnchor="middle" fill="#1F5A3E" style={{ font: '800 72px Inter' }}>{text}</text>
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={H / 2 + 20} rx={W * 0.55} ry={18} fill={P.shadow} opacity={0.2} />
      {body(-W / 2, cut, 0, 0, 0)}
      {lost > 0 && body(-W / 2 + cut, W - cut, lerp(0, dx, t), lerp(0, dy, t), 1)}
      {lost > 0 && t < 0.05 && <line x1={-W / 2 + cut} y1={-H / 2} x2={-W / 2 + cut} y2={H / 2} stroke="#FFFFFF" strokeWidth={4} strokeDasharray="10 8" />}
    </g>
  )
}
