// ============================================================
// LONG VIDEO — "If I Had 1 Million Dollars to Invest Today" — objects.
// The running metaphor: Leo's million becomes a MONEY MACHINE that pays
// him a yearly paycheck (about $40,000). Around it: the three places the
// money can go (a Treasury counter, a bond certificate, a city of 500
// companies inside a glass fund box), a pile of cash bricks (1 brick =
// $100,000), the market escalator, a fee tap, a grid of 69 "Leos".
// No camera moves (owner r56). Every label sits on the thing it names.
// ============================================================
import React from 'react'
import { clamp01, lerp, P, rnd } from '../kit'
import { CashBrick } from '../bank/kit'

const TXT = (size: number) => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 1 })

// ------------------------------------------------------------ the money machine
// # run 0–1: gears spin + lights; fill 0–1: cash bricks in the glass hopper; broken 0–1: smoke, red bulb, tilt;
// # leak 0–1: a small tap on the left side opens; lit: how many of the four choice sockets glow (0–4)
export const Machine: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; run?: number; fill?: number; broken?: number; leak?: number; lit?: number; plate?: string; tap?: string }> = ({ x, y, s = 1, o = 1, f, run = 1, fill = 1, broken = 0, leak = 0, lit = 0, plate = '$1,000,000', tap }) => {
  const b = clamp01(broken), spin = f * 3 * run * (1 - b)
  const bricks = Math.round(8 * clamp01(fill))
  const Gear = ({ cx, cy, r, dir }: { cx: number; cy: number; r: number; dir: number }) => (
    <g transform={`translate(${cx} ${cy}) rotate(${spin * dir})`}>
      {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-r * 0.14} y={-r - 12} width={r * 0.28} height={24} rx={4} fill={P.goldD} transform={`rotate(${k * 36})`} />)}
      <circle r={r} fill={P.gold} stroke={P.goldD} strokeWidth={5} /><circle r={r * 0.35} fill={P.goldD} />
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) rotate(${-4 * b}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={8} rx={330} ry={22} fill="#000" opacity={0.16} />
      {/* legs */}
      {[-230, 230].map((lx) => <rect key={lx} x={lx - 26} y={-40} width={52} height={48} rx={10} fill="#22385C" />)}
      {/* glass hopper with the cash bricks */}
      <path d="M-200 -560 L200 -560 L150 -440 L-150 -440 Z" fill="#DDEBF7" opacity={0.55} stroke="#A9C4DE" strokeWidth={6} />
      {Array.from({ length: bricks }, (_, k) => <CashBrick key={k} x={-110 + (k % 4) * 74} y={-452 - Math.floor(k / 4) * 36} s={0.62} />)}
      <rect x={-216} y={-578} width={432} height={26} rx={10} fill="#22385C" />
      {/* body */}
      <rect x={-290} y={-450} width={580} height={420} rx={46} fill="#2E6F8E" />
      <rect x={-290} y={-450} width={580} height={70} rx={40} fill="#3C86A8" />
      {/* the bulb on top-right */}
      <g transform="translate(232 -470)"><rect x={-14} y={-10} width={28} height={22} fill="#22385C" />
        <circle cy={-30} r={26} fill={b > 0.4 ? P.coral : P.gold} opacity={0.6 + 0.4 * Math.abs(Math.sin(f / 8)) * run} /></g>
      {/* gear window */}
      <rect x={-250} y={-360} width={300} height={220} rx={26} fill="#173049" />
      <Gear cx={-160} cy={-260} r={62} dir={1} /><Gear cx={-40} cy={-200} r={46} dir={-1.35} />
      {/* name plate */}
      <rect x={-250} y={-118} width={300} height={70} rx={14} fill="#F7FAFF" />
      <text x={-100} y={-66} textAnchor="middle" fill="#16294A" style={TXT(52)}>{plate}</text>
      {/* four choice sockets on the right */}
      {[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(${120 + (k % 2) * 110} ${-320 + Math.floor(k / 2) * 110})`}>
        <circle r={40} fill="#173049" /><circle r={30} fill={k < lit ? P.gold : '#2B4A78'} />
        {k < lit && <circle r={46} fill={P.gold} opacity={0.25} />}</g>)}
      {/* the paycheck chute at bottom right */}
      <path d="M180 -110 L300 -110 L330 -40 L210 -40 Z" fill="#22385C" />
      {/* the fee tap on the left side */}
      {leak > 0 && <g transform="translate(-290 -170)" opacity={clamp01(leak * 3)}>
        <rect x={-70} y={-16} width={70} height={32} rx={8} fill="#8B97A8" /><rect x={-86} y={-16} width={22} height={58} rx={6} fill="#8B97A8" />
        <rect x={-50} y={-44} width={14} height={30} rx={4} fill="#5D6878" /><rect x={-66} y={-52} width={46} height={14} rx={6} fill={P.coral} />
        {tap && <g transform="translate(-36 -86)"><rect x={-58} y={-30} width={116} height={52} rx={12} fill={P.coral} /><text y={12} textAnchor="middle" fill="#FFFFFF" style={TXT(42)}>{tap}</text></g>}
      </g>}
      {/* smoke when broken */}
      {b > 0 && [0, 1, 2].map((k) => { const t = ((f / 40 + k / 3) % 1); return <circle key={k} cx={-60 + 50 * k + 20 * Math.sin(f / 12 + k)} cy={-600 - 160 * t} r={(30 + 40 * t) * b} fill="#8B97A8" opacity={0.55 * (1 - t) * b} /> })}
    </g>
  )
}

// ------------------------------------------------------------ a paycheck envelope with an amount; split 0–1 cuts away its right quarter
export const Paycheck: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; amt: string; split?: number; sub?: string }> = ({ x, y, s = 1, o = 1, r = 0, amt, split = 0, sub = 'PAYCHECK' }) => {
  const k = clamp01(split)
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <rect x={-180} y={-100} width={360} height={200} rx={16} fill="#FFFDF8" stroke="#CDB58C" strokeWidth={5} />
      <path d="M-180 -100 L0 10 L180 -100" fill="none" stroke="#E2D3B0" strokeWidth={5} />
      <text y={-34} textAnchor="middle" fill="#5C6F8E" style={TXT(sub.length > 12 ? 38 : 44)}>{sub}</text>
      <text y={64} textAnchor="middle" fill="#1E9A63" style={TXT(84)}>{amt}</text>
      {/* the cut line of a quarter */}
      {k > 0 && <line x1={90} y1={-104} x2={90} y2={104} stroke={P.coralD} strokeWidth={6} strokeDasharray="14 10" opacity={k} />}
    </g>
  )
}

// ------------------------------------------------------------ a big phone showing a balance (text sized to fit)
export const BigPhone: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; amount: string; sub?: string; pulse?: number }> = ({ x, y, s = 1, o = 1, r = 0, amount, sub = 'BALANCE', pulse = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-160} y={-270} width={320} height={540} rx={40} fill="#0D1424" /><rect x={-144} y={-246} width={288} height={492} rx={26} fill="#F7FAFF" />
    <rect x={-144} y={-246} width={288} height={96} rx={26} fill="#2E5C9A" /><rect x={-144} y={-180} width={288} height={30} fill="#2E5C9A" />
    <text y={-180} textAnchor="middle" fill="#FFFFFF" style={TXT(40)}>MY BANK</text>
    <text y={-90} textAnchor="middle" fill="#5C6F8E" style={TXT(40)}>{sub}</text>
    {pulse > 0 && <ellipse cy={-24} rx={140} ry={60} fill={P.gold} opacity={0.25 * pulse} />}
    <text y={0} textAnchor="middle" fill="#16294A" style={TXT(Math.min(80, 470 / Math.max(4, amount.length) * 1.5))}>{amount}</text>
    {[0, 1, 2].map((k) => <g key={k}><rect x={-114} y={60 + k * 56} width={228} height={40} rx={10} fill="#E8EEF6" /><circle cx={-88} cy={80 + k * 56} r={11} fill={k === 0 ? '#2FAE6B' : '#B9C6D8'} /></g>)}
  </g>
)

// ------------------------------------------------------------ a nightstand with an alarm clock and a lamp (bedroom decor)
export const Nightstand: React.FC<{ x: number; y: number; s?: number; f: number; ring?: number }> = ({ x, y, s = 1, f, ring = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-150} width={180} height={150} rx={12} fill="#B9845C" /><rect x={-80} y={-110} width={160} height={50} rx={8} fill="#C99366" /><rect x={-16} y={-92} width={32} height={10} rx={5} fill="#6E4F33" />
    <g transform={`translate(-30 -150) rotate(${ring * 6 * Math.sin(f * 1.6)})`}><circle cy={-40} r={36} fill="#F06B5B" /><circle cy={-40} r={27} fill="#FFFFFF" /><line x1={0} y1={-40} x2={0} y2={-58} stroke="#16294A" strokeWidth={4} /><line x1={0} y1={-40} x2={12} y2={-40} stroke="#16294A" strokeWidth={4} /></g>
    <g transform="translate(46 -150)"><rect x={-6} y={-90} width={12} height={90} fill="#8E5B3A" /><path d="M-44 -90 L44 -90 L28 -150 L-28 -150 Z" fill="#F4D58D" /></g>
  </g>
)

// ------------------------------------------------------------ a pile of cash bricks (1 brick = $100,000), n may be fractional; 4 per row
export const BrickPile: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; col?: 'cash' | 'gold' | 'blue'; per?: number }> = ({ x, y, n, s = 1, o = 1, col = 'cash', per = 4 }) => {
  const full = Math.floor(n + 1e-6), part = n - full
  const fill = col === 'gold' ? [P.gold, P.goldD] : col === 'blue' ? ['#6FA8DC', '#2E5C9A'] : ['#7FC495', '#4E9A68']
  const Brick = ({ bx, by, w = 1 }: { bx: number; by: number; w?: number }) => (
    <g transform={`translate(${bx} ${by})`}>
      <rect x={-60} y={-40} width={120 * w} height={40} rx={6} fill={fill[0]} stroke={fill[1]} strokeWidth={4} />
      {w > 0.3 && <rect x={-60 + 120 * w * 0.42} y={-40} width={Math.min(24, 120 * w * 0.2)} height={40} fill="#F2E6CC" opacity={col === 'cash' ? 1 : 0.5} />}
    </g>
  )
  const pos = (k: number) => [(k % per - (per - 1) / 2) * 128, -Math.floor(k / per) * 44] as const
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={6} rx={per * 70} ry={14} fill="#000" opacity={0.13} />
      {Array.from({ length: full }, (_, k) => { const [bx, by] = pos(k); return <Brick key={k} bx={bx} by={by} /> })}
      {part > 0.02 && (() => { const [bx, by] = pos(full); return <Brick bx={bx} by={by} w={part} /> })()}
    </g>
  )
}

// ------------------------------------------------------------ the US Treasury counter (cash = 3-month loans): a columned front with a window
export const Treasury: React.FC<{ x: number; y: number; s?: number; o?: number; name?: string; glow?: number }> = ({ x, y, s = 1, o = 1, name = 'US TREASURY', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={300} ry={18} fill="#000" opacity={0.13} />
    {glow > 0 && <ellipse cx={0} cy={-200} rx={320} ry={240} fill={P.gold} opacity={0.15 * glow} />}
    <rect x={-270} y={-40} width={540} height={40} fill="#D8CBB0" /><rect x={-250} y={-80} width={500} height={40} fill="#E6DAC0" />
    {[-200, -100, 100, 200].map((cx) => <rect key={cx} x={cx - 22} y={-330} width={44} height={250} fill="#F3EBDA" stroke="#D8CBB0" strokeWidth={4} />)}
    <rect x={-60} y={-260} width={120} height={180} rx={10} fill="#16294A" /><rect x={-50} y={-250} width={100} height={110} rx={6} fill="#BFE4FF" />
    <rect x={-80} y={-150} width={160} height={20} rx={6} fill="#A9875C" />
    <path d="M-290 -330 L0 -460 L290 -330 Z" fill="#E6DAC0" stroke="#D8CBB0" strokeWidth={6} />
    <rect x={-290} y={-345} width={580} height={24} fill="#D8CBB0" />
    <text y={-360} textAnchor="middle" fill="#7A5A1E" style={TXT(46)}>{name}</text>
  </g>
)

// ------------------------------------------------------------ the S&P 500 fund: a glass box holding a tiny city of company buildings
export const CityBox: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; grow?: number; slump?: number; label?: string }> = ({ x, y, s = 1, o = 1, f, grow = 0, slump = 0, label = 'S&P 500 FUND' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={300} ry={18} fill="#000" opacity={0.13} />
    <rect x={-270} y={-400} width={540} height={400} rx={26} fill="#DDEBF7" opacity={0.45} stroke="#A9C4DE" strokeWidth={6} />
    {Array.from({ length: 26 }, (_, k) => {
      const cx = -235 + (k % 13) * 39 + (k >= 13 ? 18 : 0), row = k >= 13 ? 1 : 0
      const h0 = 70 + rnd(k * 3.1) * 140, h = h0 * (1 + 0.45 * grow * (0.6 + rnd(k)) - 0.4 * slump * (0.5 + rnd(k * 7)))
      const col = ['#3A6EA8', '#5BCBFF', '#E9C25A', '#7FB77E', '#F06B5B', '#8E7CC3'][k % 6]
      return <g key={k} opacity={row ? 0.8 : 1}>
        <rect x={cx - 16} y={-14 - row * 20 - h} width={32} height={h} rx={4} fill={col} />
        {Array.from({ length: Math.floor(h / 30) }, (_, w) => <rect key={w} x={cx - 8} y={-30 - row * 20 - h + 14 + w * 30} width={16} height={10} rx={2} fill="#FFFFFF" opacity={0.25 + 0.35 * ((Math.floor(f / 20) + w + k) % 3 === 0 ? 1 : 0)} />)}
      </g>
    })}
    <rect x={-200} y={-460} width={400} height={66} rx={16} fill="#16294A" />
    <text y={-414} textAnchor="middle" fill="#FFFFFF" style={TXT(46)}>{label}</text>
  </g>
)

// ------------------------------------------------------------ a ten-year bond ribbon: a certificate on a track of 10 year-marks; coupons drop on each mark
export const BondTrack: React.FC<{ x: number; y: number; w?: number; t: number; o?: number }> = ({ x, y, w = 600, t, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2} y={-8} width={w} height={16} rx={8} fill="#CDB58C" />
    {Array.from({ length: 11 }, (_, k) => <g key={k}><rect x={-w / 2 + (k * w) / 10 - 3} y={-22} width={6} height={44} rx={3} fill="#A9875C" />
      {k > 0 && t * 10 >= k && <g transform={`translate(${-w / 2 + (k * w) / 10} ${-60})`}><circle r={22} fill={P.gold} stroke={P.goldD} strokeWidth={4} /><text y={9} textAnchor="middle" fill="#7A5A1E" style={TXT(26)}>$</text></g>}</g>)}
    <text x={-w / 2} y={62} textAnchor="middle" fill="var(--cc-ink2, #5C6F8E)" style={TXT(40)}>YEAR 0</text>
    <text x={w / 2} y={62} textAnchor="middle" fill="var(--cc-ink2, #5C6F8E)" style={TXT(40)}>YEAR 10</text>
  </g>
)

// ------------------------------------------------------------ a thought bubble (dream) with a hammock between two palms
export const Dream: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={-250} cy={250} r={18} fill="#FFFFFF" /><circle cx={-200} cy={200} r={28} fill="#FFFFFF" />
    <ellipse rx={300} ry={190} fill="#FFFFFF" />
    <ellipse cx={0} cy={110} rx={240} ry={34} fill="#F4D58D" />
    <circle cx={150} cy={-90} r={46} fill="#F4C95D" />
    {[-150, 150].map((px, k) => <g key={k}><path d={`M${px} 100 Q${px + (k ? -14 : 14)} 0 ${px + (k ? -6 : 6)} -80`} stroke="#8E5B3A" strokeWidth={14} fill="none" />
      {[0, 1, 2, 3].map((l) => <path key={l} d={`M${px + (k ? -6 : 6)} -80 q${[-60, 60, -40, 40][l]} ${[-10, -10, 30, 30][l]} ${[-100, 100, -80, 80][l]} ${[30, 30, 70, 70][l]}`} stroke="#5DAE5B" strokeWidth={14} fill="none" strokeLinecap="round" />)}</g>)}
    <path d={`M-140 10 Q0 ${70 + 6 * Math.sin(f / 14)} 140 10`} stroke="#E14B3B" strokeWidth={18} fill="none" />
  </g>
)

// ------------------------------------------------------------ a grid of 69 little start-year figures (index 0 = 1928, 23 per row)
// # glow(k) 0–1: 1 = this start year's money lasted (gold, holding cash), 0 = ran out (grey); shown = how many are drawn;
// # mark: indexes that get a red ring
export const gridPos = (k: number): [number, number] => [(k % 23 - 11) * 66, Math.floor(k / 23) * 130]
// # bump: a soft 0→1→0 swell over d frames after each cue (an emphasis on a spoken word)
export const bump = (f: number, at: number[], d = 16) => Math.max(0, ...at.map((a) => { const t = (f - a) / d; return t > 0 && t < 1 ? Math.sin(t * Math.PI) : 0 }))
export const LeoGrid: React.FC<{ x: number; y: number; glow: (k: number) => number; shown?: number; o?: number; f: number; mark?: number[]; markO?: number; jump?: number }> = ({ x, y, glow, shown = 69, o = 1, f, mark = [], markO = 0, jump = 0 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: Math.min(69, Math.round(shown)) }, (_, k) => {
      const [cx, cy] = gridPos(k), g = clamp01(glow(k))
      const bob = 3 * g * Math.sin(f / 10 + k) - (g > 0.5 ? 22 * jump : 0)
      const skin = g > 0.5 ? '#F2C9A0' : '#B9C0CA'
      return <g key={k} transform={`translate(${cx} ${cy + bob})`}>
        {g > 0.5 && <circle cy={-40} r={34} fill={P.gold} opacity={0.18 * g} />}
        <circle cy={-62} r={17} fill={skin} />
        <path d="M-20 -40 Q0 -48 20 -40 L24 0 L-24 0 Z" fill={g > 0.5 ? '#E9C25A' : '#8B97A8'} />
        <rect x={-11} y={-28} width={22} height={14} rx={3} fill="#7FC495" opacity={g} />
      </g>
    })}
    {markO > 0 && mark.map((k) => { const [cx, cy] = gridPos(k); return <circle key={k} cx={cx} cy={cy - 36} r={33} fill="none" stroke={P.coral} strokeWidth={6} opacity={markO} /> })}
  </g>
)
// ------------------------------------------------------------ an up escalator (the market): steps climb; dip 0–1 bends the first stretch down
export const Escalator: React.FC<{ x: number; y: number; f: number; o?: number; dip?: number; label?: string }> = ({ x, y, f, o = 1, dip = 0, label = 'THE MARKET' }) => {
  const pts = Array.from({ length: 21 }, (_, k) => { const t = k / 20; return [t * 1100, -t * 520 + dip * 180 * Math.sin(Math.min(1, t / 0.45) * Math.PI) * (t < 0.45 ? 1 : 0)] as const })
  const d = pts.map(([px, py], k) => `${k ? 'L' : 'M'}${px} ${py}`).join(' ')
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <path d={`${d} L1100 40 L0 40 Z`} fill="#C9D3DF" opacity={0.55} />
      <path d={d} stroke="#5C6F8E" strokeWidth={20} fill="none" strokeLinejoin="round" />
      {Array.from({ length: 14 }, (_, k) => { const t = ((k + f / 30) % 14) / 14, i = Math.min(19, Math.floor(t * 20)), [px, py] = pts[i]; return <rect key={k} x={px - 20} y={py - 16} width={40} height={10} rx={3} fill="#8B97A8" /> })}
      <path d={d} stroke="#2E5C9A" strokeWidth={8} fill="none" transform="translate(0 -70)" opacity={0.85} strokeLinejoin="round" />
      <g transform="translate(900 -250)"><rect x={-150} y={-36} width={300} height={62} rx={14} fill="#2E5C9A" /><text y={14} textAnchor="middle" fill="#FFFFFF" style={TXT(44)}>{label}</text></g>
    </g>
  )
}
// # a point on the escalator (t 0–1), same curve as above
export const escAt = (x: number, y: number, t: number, dip = 0): [number, number] => { const k = clamp01(t); return [x + k * 1100, y - k * 520 + dip * 180 * Math.sin(Math.min(1, k / 0.45) * Math.PI) * (k < 0.45 ? 1 : 0)] }

// ------------------------------------------------------------ a money bag with a short label
export const MoneyBag: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; r?: number }> = ({ x, y, s = 1, o = 1, t, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={64} ry={10} fill="#000" opacity={0.14} />
    <path d="M-30 -112 Q0 -96 30 -112 L18 -84 Q76 -60 70 -20 Q66 4 0 4 Q-66 4 -70 -20 Q-76 -60 -18 -84 Z" fill="#D9B26A" stroke="#A9813E" strokeWidth={5} />
    <rect x={-24} y={-92} width={48} height={12} rx={6} fill="#A9813E" />
    <text y={-22} textAnchor="middle" fill="#6E4F1E" style={TXT(t && t.length > 3 ? 36 : 54)}>{t ?? '$'}</text>
  </g>
)

// ------------------------------------------------------------ a stocks↔bonds slider (0 = all bonds, 1 = all stocks)
export const MixSlider: React.FC<{ x: number; y: number; t: number; o?: number; w?: number }> = ({ x, y, t, o = 1, w = 760 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2} y={-14} width={w} height={28} rx={14} fill="#C9D3DF" />
    <rect x={-w / 2} y={-14} width={w * clamp01(t)} height={28} rx={14} fill={P.gold} />
    <circle cx={-w / 2 + w * clamp01(t)} r={34} fill="#FFFFFF" stroke="#16294A" strokeWidth={6} />
    <text x={-w / 2 - 30} y={16} textAnchor="end" fill="#2E5C9A" style={TXT(50)}>BONDS</text>
    <text x={w / 2 + 30} y={16} textAnchor="start" fill="#B4821C" style={TXT(50)}>STOCKS</text>
  </g>
)

// ------------------------------------------------------------ a hilly path: amp = how deep the dips are, climb = how high it ends
export const Terrain: React.FC<{ x: number; y: number; w: number; amp: number; climb: number; o?: number; f: number; col?: string }> = ({ x, y, w, amp, climb, o = 1, f, col = '#7FB77E' }) => {
  const pts = Array.from({ length: 41 }, (_, k) => { const t = k / 40; return [t * w, -climb * t - amp * Math.sin(t * Math.PI * 3.2) * (0.6 + 0.4 * Math.sin(t * 7))] as const })
  const d = pts.map(([px, py], k) => `${k ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join(' ')
  const ci = Math.floor(((f / 3) % 40)), [cx, cy] = pts[ci]
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <path d={`${d} L${w} 60 L0 60 Z`} fill={col} opacity={0.55} />
      <path d={d} stroke="#4E7F4D" strokeWidth={8} fill="none" strokeLinejoin="round" />
      <g transform={`translate(${cx} ${cy - 22})`}><rect x={-30} y={-20} width={60} height={30} rx={8} fill={P.coral} /><circle cx={-16} cy={12} r={9} fill="#16294A" /><circle cx={16} cy={12} r={9} fill="#16294A" /></g>
    </g>
  )
}

// ------------------------------------------------------------ a fog bank over a road (the unknown future)
export const FogRoad: React.FC<{ x: number; y: number; o?: number; f: number }> = ({ x, y, o = 1, f }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d="M-120 0 L120 0 L40 -380 L-40 -380 Z" fill="#8B97A8" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-6} y={-60 - k * 90} width={12} height={40 - k * 6} fill="#FFFFFF" />)}
    {[0, 1, 2].map((k) => <ellipse key={k} cx={30 * Math.sin(f / 30 + k)} cy={-330 + k * 50} rx={260 - k * 40} ry={60} fill="#FFFFFF" opacity={0.75 - k * 0.15} />)}
  </g>
)

// ------------------------------------------------------------ a scoreboard with three slots, each a winner badge
export const Score: React.FC<{ x: number; y: number; o?: number; wins: number[]; title?: string }> = ({ x, y, o = 1, wins, title = 'WHO CAME OUT AHEAD' }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-420} y={-210} width={840} height={400} rx={30} fill="#16294A" />
    <text y={-140} textAnchor="middle" fill="#F7FAFF" style={TXT(50)}>{title}</text>
    {[0, 1, 2].map((k) => { const w = wins[k] ?? 0, gold = k < 2; return <g key={k} transform={`translate(${(k - 1) * 260} 30)`} opacity={w}>
      <circle r={90} fill={gold ? P.gold : '#6FA8DC'} /><text y={-8} textAnchor="middle" fill="#16294A" style={TXT(38)}>{gold ? 'ALL AT' : 'BIT BY'}</text>
      <text y={34} textAnchor="middle" fill="#16294A" style={TXT(38)}>{gold ? 'ONCE' : 'BIT'}</text></g> })}
  </g>
)

// ------------------------------------------------------------ a grid of 98 year squares: up = gold arrow, down = coral; shown = how many are drawn
export const YearGrid: React.FC<{ x: number; y: number; ups: boolean[]; shown: number; o?: number }> = ({ x, y, ups, shown, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {ups.map((u, k) => k < shown ? <g key={k} transform={`translate(${(k % 14 - 6.5) * 62} ${Math.floor(k / 14) * 62})`}>
      <rect x={-26} y={-26} width={52} height={52} rx={10} fill={u ? '#F4D58D' : '#F7B8AE'} />
      <path d={u ? 'M0 -16 L14 4 L5 4 L5 16 L-5 16 L-5 4 L-14 4 Z' : 'M0 16 L14 -4 L5 -4 L5 -16 L-5 -16 L-5 -4 L-14 -4 Z'} fill={u ? '#B4821C' : '#C94A3E'} />
    </g> : null)}
  </g>
)

// ------------------------------------------------------------ a university front (for the Trinity study)
export const College: React.FC<{ x: number; y: number; s?: number; o?: number; name?: string }> = ({ x, y, s = 1, o = 1, name = 'TRINITY UNIVERSITY' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={320} ry={18} fill="#000" opacity={0.13} />
    <rect x={-280} y={-260} width={560} height={260} fill="#C9805E" />
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-240 + k * 84} y={-220} width={50} height={80} rx={24} fill="#F3EBDA" />)}
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-240 + k * 84} y={-110} width={50} height={70} rx={6} fill="#F3EBDA" />)}
    <rect x={-60} y={-480} width={120} height={230} fill="#B66F50" /><path d="M-80 -480 L0 -560 L80 -480 Z" fill="#8E5B3A" />
    <circle cy={-400} r={36} fill="#F3EBDA" /><line x1={0} y1={-400} x2={0} y2={-426} stroke="#16294A" strokeWidth={5} /><line x1={0} y1={-400} x2={18} y2={-400} stroke="#16294A" strokeWidth={5} />
    <rect x={-250} y={-40} width={500} height={40} fill="#E6DAC0" />
    <text y={-14} textAnchor="middle" fill="#7A5A1E" style={TXT(34)}>{name}</text>
  </g>
)

// ------------------------------------------------------------ a manager's bucket that catches coins
export const FeeBucket: React.FC<{ x: number; y: number; s?: number; o?: number; fill: number; t?: string }> = ({ x, y, s = 1, o = 1, fill, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={110} ry={14} fill="#000" opacity={0.14} />
    <path d="M-100 -170 L100 -170 L80 0 L-80 0 Z" fill="#8B97A8" stroke="#5D6878" strokeWidth={6} />
    <clipPath id="fb-clip"><path d="M-100 -170 L100 -170 L80 0 L-80 0 Z" /></clipPath>
    <g clipPath="url(#fb-clip)"><rect x={-110} y={-170 * clamp01(fill)} width={220} height={170} fill={P.gold} />
      {Array.from({ length: Math.floor(clamp01(fill) * 8) }, (_, k) => <ellipse key={k} cx={-60 + (k % 4) * 40} cy={-10 - Math.floor(k / 4) * 30} rx={18} ry={7} fill={P.goldD} opacity={0.7} />)}</g>
    <path d="M-100 -170 Q0 -260 100 -170" stroke="#5D6878" strokeWidth={8} fill="none" />
    {t && <g transform="translate(0 -84)"><rect x={-90} y={-34} width={180} height={60} rx={14} fill="#FFFDF8" /><text y={14} textAnchor="middle" fill="#16294A" style={TXT(48)}>{t}</text></g>}
  </g>
)

// ------------------------------------------------------------ a falling coin (drip) between two points
export const Drip: React.FC<{ x: number; y: number; t: number; d?: number; o?: number }> = ({ x, y, t, d = 160, o = 1 }) => {
  const k = t % 1
  return <g opacity={o * (k < 0.9 ? 1 : (1 - k) * 10)} transform={`translate(${x} ${y + d * k * k})`}><ellipse rx={18} ry={18} fill={P.gold} stroke={P.goldD} strokeWidth={4} /></g>
}

// ------------------------------------------------------------ a simple sun / storm cloud weather icon (good years / bad years)
export const Weather: React.FC<{ x: number; y: number; kind: 'sun' | 'storm'; s?: number; o?: number; f: number }> = ({ x, y, kind, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {kind === 'sun' ? <g><g transform={`rotate(${f})`}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-6} y={-78} width={12} height={26} rx={6} fill="#F4C95D" transform={`rotate(${k * 45})`} />)}</g><circle r={44} fill="#F4C95D" /></g>
      : <g><ellipse cx={-30} cy={0} rx={60} ry={40} fill="#5D6878" /><ellipse cx={30} cy={-10} rx={70} ry={50} fill="#6E7A8B" /><path d="M0 30 L-20 80 L4 76 L-10 120 L30 62 L8 64 L22 30 Z" fill="#F4C95D" /></g>}
  </g>
)
export const lerpPt = (a: [number, number], b: [number, number], t: number): [number, number] => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]
