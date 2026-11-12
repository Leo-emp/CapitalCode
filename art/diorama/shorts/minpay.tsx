// ============================================================
// SHORT — "The minimum payment trap" (s1–s29, ≈ 2:10), eight tall
// pieces. Sourced: Fed G.19 (Aug 2026) 22.36% APR on cards assessed
// interest; a big US bank's filed card agreement (CFPB database):
// minimum = larger of $40 or 1% of the balance + interest; Reg Z
// 1026.7(b)(12) minimum payment warning (since 2010). Our maths:
// $5,000 at 22.36%/12, no new spending → 184 months, $7,596 interest,
// $12,596 paid; held at the first $143.17 → 57 months, $3,158.
// House rules for this Short (owner r22/r26/r27): every word and number
// appears ON its spoken word, never before; one headline slot whose
// lines hand over without overlapping; everything inside x 60–940,
// y 220–1270 (captions sit below), text ≥ 40 px.
// ============================================================
import React from 'react'
import { Emblem } from '../../logo/Emblem'
import { Mini } from '../../rig/Mini'
import { Calendar, Label } from '../charts'
import { clamp01, easeInOut, easeOut, lerp, on, P, pop, rnd, span, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { pour, Prop, TallStage, W, H } from './tall'

// # the content column: centred a little left of the frame centre so nothing reaches the right-hand buttons
const CX = 500

// ------------------------------------------------------------ our calculation (same as facts.json)
// # month by month: interest = balance × 22.36% ÷ 12; minimum = larger of $40 or 1% of balance + interest
const R = 0.2236 / 12
const simulate = (fixed?: number) => {
  const bal: number[] = [5000], pay: number[] = []
  let b = 5000
  while (b > 0.005) {
    const i = +(b * R).toFixed(2)
    let p = fixed ?? Math.max(40, +(0.01 * b + i).toFixed(2))
    if (b + i < p) p = +(b + i).toFixed(2)
    b = +(b + i - p).toFixed(2)
    pay.push(p); bal.push(Math.max(0, b))
  }
  return { bal, pay }
}
const MIN = simulate(), FIX = simulate(143.17)

// ------------------------------------------------------------ small helpers
// # one headline slot: each line shows from its cue until the next line's cue (fades out just BEFORE it,
// # so two lines are never on screen together)
type Head = [at: number, text: string, color?: string, size?: number]
const Headline: React.FC<{ f: number; lines: Head[]; until: number; y?: number }> = ({ f, lines, until, y = 330 }) => (
  <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
    return o > 0.001 ? <g key={k} transform={`translate(${CX} ${y}) scale(${0.94 + 0.06 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 104} font="Bebas Neue" color={color ?? P.ink} o={o} /></g> : null
  })}</g>
)
// # visible from a to b with clean fades (b exclusive: gone by b)
const win = (f: number, a: number, b: number, d = 6) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))

// # the credit card, drawn big: navy body, gold chip, and its balance written on it
const Card: React.FC<{ x: number; y: number; s?: number; r?: number; balance?: string; bo?: number; lock?: number }> = ({ x, y, s = 1, r = 0, balance, bo = 1, lock = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <defs><linearGradient id="mp-card" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3A5F93" /><stop offset="100%" stopColor="#16294A" /></linearGradient></defs>
    <rect x={-270} y={-160} width={540} height={330} rx={34} fill="#000" opacity={0.18} transform="translate(10 14)" />
    <rect x={-270} y={-170} width={540} height={330} rx={34} fill="url(#mp-card)" stroke="#5B7FB5" strokeWidth={3} />
    <path d="M-270 -60 Q0 -130 270 -40 L270 -10 Q0 -100 -270 -30 Z" fill="#FFFFFF" opacity={0.07} />
    <rect x={-210} y={-110} width={86} height={64} rx={12} fill={P.gold} /><path d="M-210 -78 H-124 M-167 -110 V-46" stroke={P.goldD} strokeWidth={4} />
    <circle cx={170} cy={-80} r={34} fill={P.coral} opacity={0.9} /><circle cx={210} cy={-80} r={34} fill={P.gold} opacity={0.85} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-210 + k * 110} y={10} width={86} height={18} rx={9} fill="#FFFFFF" opacity={0.25} />)}
    {balance && <g opacity={bo}><text x={-210} y={110} fill="#C2D3EE" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>BALANCE</text>
      <text x={210} y={118} textAnchor="end" fill="#FFFFFF" style={{ font: '400 92px "Bebas Neue"' }}>{balance}</text></g>}
    {lock > 0 && <g transform={`translate(0 -10) scale(${lock})`}><circle r={92} fill={P.navy0} opacity={0.55} /><Prop id="padlock" x={0} y={0} size={150} f={0} /></g>}
  </g>
)
// # a bold down arrow
const Down: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = P.coral }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-22 -60 H22 V0 H52 L0 60 L-52 0 H-22 Z" fill={color} /></g>
)
// # a label on a soft pill so a chart line never runs through it
const Pill: React.FC<{ x: number; y: number; text: string; size?: number; anchor?: 'start' | 'end'; o?: number; color?: string }> = ({ x, y, text, size = 58, anchor = 'start', o = 1, color = P.ink }) => {
  const w = text.length * size * 0.42 + 36, x0 = anchor === 'start' ? x - 18 : x - w + 18
  return <g opacity={o}><rect x={x0} y={y - size * 0.85} width={w} height={size * 1.15} rx={size * 0.3} fill={P.card} opacity={0.92} /><Label x={x} y={y} text={text} size={size} font="Bebas Neue" color={color} anchor={anchor} /></g>
}
// # a horizontal money bar with a label inside or above
const Bar: React.FC<{ x: number; y: number; w: number; h?: number; color: string; o?: number }> = ({ x, y, w, h = 110, color, o = 1 }) => (
  <g opacity={o}><rect x={x} y={y + 8} width={Math.max(0, w)} height={h} rx={18} fill="#000" opacity={0.12} /><rect x={x} y={y} width={Math.max(0, w)} height={h} rx={18} fill={color} /></g>
)
// # a pile of coins (n coins) standing at x, y
const Pile: React.FC<{ x: number; y: number; n: number; s?: number; seed?: number }> = ({ x, y, n, s = 1, seed = 1 }) => (
  <g>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => {
    const col = i % 5, row = Math.floor(i / 5), dx = (col - 2) * 54 * s + (row % 2) * 27 * s + (rnd(seed + i) - 0.5) * 6
    return <g key={i}><ellipse cx={x + dx} cy={y - row * 14 * s} rx={26 * s} ry={9 * s} fill={P.goldD} /><ellipse cx={x + dx} cy={y - row * 14 * s - 4 * s} rx={26 * s} ry={9 * s} fill={P.gold} /></g>
  })}</g>
)

// ---------------------------------------------------------------- s1–s5: $5,000, minimum only → over 15 years, $7,600 interest
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const owe = c('s1:owe'), d5000 = c('s1:5000'), pay = c('s1:pay'), minimum = c('s1:minimum'), y15 = c('s1:15'), clear = c('s1:clear')
  const along = c('s2:along'), hand = c('s2:hand'), bank = c('s2:bank'), i7600 = c('s2:7600'), interest = c('s2:interest')
  const more = c('s3:more'), debt = c('s3:debt'), itself = c('s3:itself')
  const here = c('s4:here'), small = c('s4:small'), turns = c('s4:turns'), h15 = c('s4:15'), habit = c('s4:habit')
  const say = c('s5:say'), stop = c('s5:stop'), rate = c('s5:rate'), never = c('s5:never')
  // # scene windows: A card + years, B paying the bank, C the scale, D a small coin → long chain, E the example's rules
  const A = win(f, owe, along), B = win(f, along, more), C = win(f, more, here), D = win(f, here, say), E = on(f, say, 8)
  return (
    <g>
      <TallStage id="mh" f={f} />
      <Headline f={f} until={9e9} lines={[[pay, 'PAY ONLY THE MINIMUM…'], [y15, 'OVER 15 YEARS', P.coralInk, 132], [i7600, '$7,600 IN INTEREST', P.coralInk], [more, 'MORE THAN THE DEBT', P.coralInk],
        [h15, 'A 15-YEAR HABIT'], [stop, 'EXAMPLE: NO NEW SPENDING', P.ink, 84], [rate, 'EXAMPLE: THE RATE STAYS PUT', P.ink, 84]]} />
      {/* # A: the card with its $5,000 balance; a tiny minimum coin drops in; an hourglass turns over for the years */}
      <g opacity={A}>
        <Card x={CX} y={lerp(820, 640, on(f, y15, 20))} s={pop(f, owe) * lerp(1.3, 0.95, on(f, y15, 20))} r={-4} balance="$5,000" bo={on(f, d5000, 6)} />
        <g opacity={on(f, minimum, 6) * (1 - on(f, y15, 10))} transform={`translate(${CX + 230} ${lerp(420, 640, easeInOut(span(f, minimum, minimum + 18)))}) scale(1.3)`}>
          <circle r={50} fill={P.gold} /><circle r={38} fill="none" stroke={P.goldD} strokeWidth={5} /><text y={14} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>MIN</text></g>
        <g opacity={on(f, y15, 8)} transform={`translate(${CX} 1060) rotate(${180 * easeInOut(span(f, y15, y15 + 20)) + 180 * easeInOut(span(f, clear, clear + 20))}) scale(${pop(f, y15)})`}><Prop id="hourglass" x={0} y={0} size={330} f={f} /></g>
      </g>
      {/* # B: coins stream from your wallet to the bank — the interest */}
      <g opacity={B}>
        <g transform={`translate(230 820) scale(${pop(f, along)})`}><Prop id="wallet" x={0} y={0} size={330} f={f} /><Label x={0} y={230} text="YOU" size={68} font="Bebas Neue" color={P.ink} /></g>
        <g transform={`translate(760 760) scale(${pop(f, bank)})`}><Prop id="bank" x={0} y={0} size={360} f={f} /><Label x={0} y={260} text="THE BANK" size={68} font="Bebas Neue" color={P.ink} /></g>
        {Array.from({ length: 10 }, (_, i) => { const ph = ((f - hand) / 26 + i / 10) % 1; if (f < hand + (i / 10) * 26 || f > interest + 30) return null; const q = { x: lerp(280, 740, ph), y: lerp(720, 660, ph) - Math.sin(ph * Math.PI) * 260 }; return <g key={i} transform={`translate(${q.x} ${q.y})`}><ellipse rx={30} ry={30 * Math.abs(Math.cos(ph * 6)) + 4} fill={P.gold} stroke={P.goldD} strokeWidth={5} /></g> })}
        <g opacity={on(f, i7600, 8)} transform={`translate(760 1170) scale(${pop(f, i7600)})`}><Pile x={0} y={0} n={lerp(5, 20, on(f, interest, 24))} s={1.1} seed={4} /></g>
      </g>
      {/* # C: a balance — the $5,000 debt on one pan, the $7,600 of interest on the other, and the interest wins */}
      <g opacity={C} transform={`translate(${CX} 820) scale(1.25) translate(${-CX} -820)`}>
        <g transform={`rotate(${lerp(0, 9, easeOut(span(f, debt, debt + 22)))} ${CX} 760)`}>
          <rect x={CX - 370} y={752} width={740} height={18} rx={9} fill={P.champ} />
          <g transform={`translate(${CX - 260} 700)`}><Card x={0} y={-30} s={0.42} balance="$5,000" /><Label x={0} y={130} text="THE DEBT" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g transform={`translate(${CX + 260} 740)`}><Pile x={0} y={-10} n={15} s={0.85} seed={9} /><Label x={0} y={90} text="THE INTEREST" size={50} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <path d={`M${CX - 50} 1000 L${CX} 770 L${CX + 50} 1000 Z`} fill={P.champ} />
        <Label x={CX} y={1120} text="$7,600 > $5,000" size={76} font="Bebas Neue" color={P.goldInk} o={on(f, itself, 8)} />
      </g>
      {/* # D: a small coin starts rolling a chain of 15 links — one a year */}
      <g opacity={D}>
        <g transform={`translate(${lerp(CX, 150, on(f, turns, 16))} ${lerp(820, 640, on(f, turns, 16))}) scale(${pop(f, here) * lerp(1.6, 0.85, on(f, turns, 16)) * (1 + 0.25 * on(f, small, 8) * (1 - on(f, turns, 8)))})`}><circle r={60} fill={P.gold} /><circle r={46} fill="none" stroke={P.goldD} strokeWidth={6} /><text y={16} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>$</text></g>
        {Array.from({ length: 15 }, (_, k) => {
          const x = 230 + (k % 5) * 160, y = 640 + Math.floor(k / 5) * 190
          const at = turns + (k * (h15 - turns + 4)) / 15
          return <g key={k} opacity={on(f, at, 4)} transform={`translate(${Math.floor(k / 5) % 2 ? 230 + 640 - (k % 5) * 160 : x} ${y}) scale(${pop(f, at, 8) * 1.25})`}>
            <rect x={-56} y={-30} width={112} height={60} rx={30} fill="none" stroke={P.ink2} strokeWidth={14} />
          </g>
        })}
        <Label x={CX} y={1180} text="ONE LINK A YEAR" size={64} font="Bebas Neue" color={P.ink2} o={on(f, habit, 8)} />
      </g>
      {/* # E: the example's two rules — the card is locked, the rate is pinned */}
      <g opacity={E}>
        <Card x={CX} y={700} s={1.2 * pop(f, say)} r={-3} balance="$5,000" lock={pop(f, stop)} />
        <g opacity={on(f, rate, 8)} transform={`translate(${CX} 1120) scale(${pop(f, rate) * 1.35})`}>
          <rect x={-250} y={-60} width={500} height={120} rx={60} fill={P.card} stroke={P.champ} strokeWidth={4} />
          <Label x={-40} y={18} text="RATE" size={60} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, never, 6)}><Prop id="lock" x={120} y={0} size={86} f={f} /></g>
        </g>
      </g>
      <Vignette id="mh" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s6–s8: ~22% a year → just under 2% a month → $93 on $5,000
const Rate: React.FC<PieceProps> = ({ f, c }) => {
  const average = c('s6:average'), charges = c('s6:charges'), p22 = c('s6:22'), year = c('s6:year')
  const split = c('s7:split'), m12 = c('s7:12'), p2 = c('s7:2'), balance = c('s7:balance'), every = c('s7:every'), month = c('s7:month')
  const on5000 = c('s8:5000'), first = c('s8:first'), interest = c('s8:interest'), d93 = c('s8:93')
  const A = win(f, average, on5000), B = on(f, on5000, 8)
  const burst = easeInOut(span(f, split, split + 20)), slide = easeInOut(span(f, p2, p2 + 18))
  return (
    <g>
      <TallStage id="mr" f={f} />
      <Headline f={f} until={9e9} lines={[[charges, 'CARDS THAT CHARGE INTEREST', P.ink, 84], [p22, '≈ 22% A YEAR', P.coralInk, 132], [m12, '÷ 12 MONTHS'], [p2, 'JUST UNDER 2% A MONTH', P.coralInk], [on5000, 'ON $5,000…'], [first, 'FIRST MONTH\'S INTEREST', P.ink, 92], [d93, '$93', P.coralInk, 170]]} />
      <g opacity={A}>
        {/* # a fan of credit cards: the average card */}
        <g opacity={1 - on(f, p22, 10)}>
          {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, average + k * 3, 8)}><Card x={CX + (k - 2) * 70} y={820 - Math.abs(k - 2) * 14} s={0.85} r={(k - 2) * 9} /></g>)}
        </g>
        {/* # the year as a ring: 22% of it is interest; then the ring splits into 12 months and one slides out */}
        <g opacity={on(f, p22, 8)} transform={`translate(${CX} 820) scale(1.22)`}>
          {Array.from({ length: 12 }, (_, k) => {
            const a0 = (k / 12) * Math.PI * 2 - Math.PI / 2, a1 = ((k + 1) / 12) * Math.PI * 2 - Math.PI / 2, mid = (a0 + a1) / 2, gap = 0.035 * burst
            const out = 26 * burst, r0 = 150, r1 = 290
            const pt = (a: number, r: number) => `${(Math.cos(a) * r + Math.cos(mid) * out).toFixed(1)} ${(Math.sin(a) * r + Math.sin(mid) * out).toFixed(1)}`
            // # the coral share = 22.36% of the ring, coloured slice by slice
            const coral = clamp01((0.2236 - k / 12) * 12)
            const lit = k === 0 ? slide : 0
            return <g key={k} opacity={k === 0 ? 1 : 1 - slide * 0.55} transform={k === 0 ? `translate(${slide * 230} ${slide * 140}) scale(${1 + slide * 0.25})` : ''}>
              <path d={`M${pt(a0 + gap, r1)} A${r1} ${r1} 0 0 1 ${pt(a1 - gap, r1)} L${pt(a1 - gap, r0)} A${r0} ${r0} 0 0 0 ${pt(a0 + gap, r0)} Z`} fill={coral > 0 && burst < 0.5 ? P.coral : lit > 0 ? P.coral : P.navy4} opacity={coral > 0 && coral < 1 && burst < 0.5 ? 0.6 : 1} />
            </g>
          })}
          <Label x={0} y={30} text={f < split ? '1 YEAR' : '12'} size={f < split ? 80 : 110} font="Bebas Neue" color={P.ink} o={1 - slide} />
          {/* # every single month: the twelve slices blink once each in turn */}
          {Array.from({ length: 12 }, (_, k) => {
            const a = ((k + 0.5) / 12) * Math.PI * 2 - Math.PI / 2, at = every + (k * (month + 10 - every)) / 12
            return <circle key={k} cx={Math.cos(a) * 340} cy={Math.sin(a) * 340} r={14} fill={P.coral} opacity={on(f, at, 4) * (1 - on(f, at + 10, 10)) + on(f, month + 10, 8) * 0.8} />
          })}
        </g>
        <Label x={CX} y={1250} text="22.36% ÷ 12 = 1.86%" size={60} font="Bebas Neue" color={P.ink2} o={on(f, balance, 8)} />
      </g>
      {/* # B: a $5,000 stack; the month's interest lifts off its top as a coral slice */}
      <g opacity={B}>
        <g transform={`translate(${CX} 1160) scale(${pop(f, on5000)})`}>
          {Array.from({ length: 16 }, (_, k) => <rect key={k} x={-260} y={-44 - k * 34} width={520} height={38} rx={8} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={3} />)}
          {/* # the month's interest: a coral block lifted off the top of the pile */}
          <g opacity={on(f, interest, 6)} transform={`translate(${easeInOut(span(f, interest, interest + 18)) * 150} ${-610 - easeInOut(span(f, interest, interest + 18)) * 90})`}>
            <rect x={-150} y={-70} width={300} height={70} rx={10} fill={P.coral} stroke={P.coralD} strokeWidth={4} /></g>
          <Label x={0} y={70} text="$5,000 OWED" size={64} font="Bebas Neue" color={P.ink} />
        </g>
        <Label x={CX} y={1270} text="5,000 × 1.86% ≈ $93" size={58} font="Bebas Neue" color={P.ink2} o={on(f, d93, 8)} />
      </g>
      <Vignette id="mr" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s9–s13: the formula → $143, of which $93 interest and $50 debt
const Formula: React.FC<PieceProps> = ({ f, c }) => {
  const s9 = c('s9'), bank = c('s9:bank'), works = c('s9:works'), minimum = c('s9:minimum')
  const one = c('s10:1'), owe = c('s10:owe'), plus = c('s10:plus'), interest = c('s10:interest'), never = c('s10:never'), d40 = c('s10:40')
  const first = c('s11:first'), d143 = c('s11:143'), d93 = c('s12:93'), int2 = c('s12:interest'), only = c('s13:only'), d50 = c('s13:50'), pays = c('s13:pays'), debt = c('s13:debt')
  const A = win(f, s9, first), B = on(f, first, 8)
  const lines: [number, string, string][] = [[one, '1% OF WHAT YOU OWE', P.ink], [plus, '+ THIS MONTH\'S INTEREST', P.coralInk], [never, 'NEVER LESS THAN', P.ink]]
  // # the $143 payment bar: 93/143 coral (interest), 50/143 mint (debt)
  const BX = 90, BW = 820, split = BW * (93.17 / 143.17)
  const fly = easeInOut(span(f, pays, debt + 10))
  return (
    <g>
      <TallStage id="mf" f={f} />
      <Headline f={f} until={9e9} lines={[[s9, 'HOW IT IS WORKED OUT', P.ink, 92], [bank, 'ONE BIG US BANK', P.ink, 100], [minimum, 'YOUR MINIMUM PAYMENT =', P.ink, 92], [first, 'FIRST MINIMUM'], [d143, '$143', P.goldInk, 150], [d93, '$93 IS INTEREST', P.coralInk], [d50, 'ONLY $50 PAYS THE DEBT', P.mintInk, 96]]} />
      <g opacity={A}>
        <g opacity={1 - on(f, one - 6, 8)} transform={`translate(${CX} 800) scale(${pop(f, s9)})`}><Prop id="bank" x={0} y={0} size={440} f={f} /></g>
        <g opacity={on(f, works, 8) * (1 - on(f, one - 6, 8))} transform={`translate(${CX + 250} 1000) scale(${pop(f, works)})`}><Prop id="calculator" x={0} y={0} size={240} f={f} /></g>
        {/* # the formula card: each line arrives on its own words */}
        <g opacity={on(f, one, 8)}>
          <rect x={70} y={560} width={860} height={560} rx={36} fill={P.card} opacity={0.95} />
          {lines.map(([at, t, col], k) => <g key={k} opacity={on(f, at, 6)} transform={`translate(${120 + (1 - on(f, at, 10)) * 30} ${700 + k * 160})`}><Label x={0} y={0} text={t} size={80} font="Bebas Neue" color={col} anchor="start" /></g>)}
          <g opacity={on(f, d40, 6)} transform={`translate(${120 + 480} ${700 + 2 * 160}) scale(${pop(f, d40)})`}><Label x={0} y={0} text="$40" size={100} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <rect x={120} y={730} width={500} height={8} rx={4} fill={P.ink2} opacity={on(f, owe, 8) * 0.5} />
          <rect x={120} y={890} width={520} height={8} rx={4} fill={P.coral} opacity={on(f, interest, 8) * 0.6} />
        </g>
      </g>
      {/* # B: the first payment as a bar that splits into interest and debt; the debt bar loses a sliver */}
      <g opacity={B}>
        <g opacity={on(f, first, 6) * (1 - on(f, d143, 6))}><rect x={BX} y={560} width={BW} height={150} rx={18} fill="none" stroke={P.goldInk} strokeWidth={6} strokeDasharray="20 14" /><Label x={BX + BW / 2} y={660} text="?" size={90} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, d143, 6)} transform={`translate(0 ${(1 - on(f, d143, 12)) * 40})`}>
          <Bar x={BX} y={560} w={f < d93 ? BW : split - 8} h={150} color={f < d93 ? P.gold : P.coral} />
          <g opacity={on(f, d93, 6)}><Label x={BX + split / 2} y={660} text="$93 INTEREST" size={70} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, d50, 6) * (1 - fly)} transform={`translate(0 ${fly * 300})`}><Bar x={BX + split} y={560} w={BW - split} h={150} color={P.mint} /><Label x={BX + split + (BW - split) / 2} y={660} text="$50" size={70} font="Bebas Neue" color={P.navy0} /></g>
          {/* # the interest part flows off to the bank */}
          <g opacity={on(f, int2, 8) * (1 - on(f, only, 8))} transform={`translate(260 900) scale(${pop(f, int2)})`}><Prop id="bank" x={0} y={0} size={230} f={f} /></g>
          {pour(f, int2, only - 10, 7, { x: BX + split / 2, y: 720 }, (i) => ({ x: 250 + (i % 2) * 14, y: 860 }), 'mf-c', true, 60)}
        </g>
        {/* # the debt: a long bar that a $50 sliver barely dents */}
        <g opacity={on(f, only, 8)}>
          <Label x={BX} y={990} text="THE DEBT" size={64} font="Bebas Neue" color={P.ink} anchor="start" />
          <Bar x={BX} y={1020} w={BW * (1 - 0.012 * on(f, debt, 12))} h={130} color={P.navy4} />
          <rect x={BX + BW * 0.988 - 4} y={1006} width={BW * 0.012 + 8} height={158} rx={4} fill={P.mint} opacity={on(f, pays, 8) * (1 - on(f, debt + 40, 20))} />
          <Down x={BX + BW - 8} y={920} s={0.9} o={on(f, pays, 8) * (1 - on(f, debt + 40, 20))} color={P.mint} />
        </g>
      </g>
      <Vignette id="mf" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s14–s16: the minimum shrinks with the debt → only ~1% a month
const Shrink: React.FC<PieceProps> = ({ f, c }) => {
  const next = c('s14:next'), less = c('s14:less'), asks = c('s14:asks'), less2 = c('s14:less#2')
  const shrinks = c('s15:shrinks'), debt = c('s15:debt'), shrinks2 = c('s15:shrinks#2')
  const kind = c('s16:kind'), but = c('s16:but'), years = c('s16:years'), one = c('s16:1')
  const A = win(f, next, but), B = on(f, but, 8)
  // # months ticking by while the two bars shrink together (month index 0 → 1 → … from s14 to s15's end)
  const m = f < less ? 0 : f < shrinks ? 1 : 1 + Math.floor(clamp01((f - shrinks) / (shrinks2 + 30 - shrinks)) * 23)
  const owe = MIN.bal[m], pay = MIN.pay[m]
  return (
    <g>
      <TallStage id="ms" f={f} />
      <Headline f={f} until={9e9} lines={[[next, 'NEXT MONTH'], [less, 'YOU OWE A LITTLE LESS'], [asks, 'THE BANK ASKS FOR LESS'], [shrinks, 'THE MINIMUM SHRINKS', P.goldInk], [kind, 'SOUNDS KIND…'], [but, 'BUT…', P.coralInk, 120], [one, 'ONLY ~1% OF THE DEBT A MONTH', P.coralInk, 84]]} />
      <g opacity={A}>
        <g transform={`translate(${CX} 560) scale(${pop(f, next)})`}><Calendar x={0} y={0} text={`${m + 1}`} s={0.95} /><Label x={0} y={130} text="MONTH" size={48} font="Bebas Neue" color={P.ink2} /></g>
        {/* # two bars: what you owe (sky) and the minimum (gold), both scaled from month 0 */}
        {([['YOU OWE', owe / 5000, P.sky, 310], ['MINIMUM', pay / 143.17, P.gold, 690]] as const).map(([t, k, col, x]) => (
          <g key={t} opacity={on(f, t === 'YOU OWE' ? next : asks - 10, 8)}>
            <rect x={x - 120} y={1180 - 460 * k} width={240} height={460 * k} rx={18} fill={col} />
            <Label x={x} y={1250} text={t} size={64} font="Bebas Neue" color={P.ink} />
          </g>
        ))}
        <Down x={CX} y={980} s={1.1} o={on(f, debt, 8) * (1 - on(f, kind - 8, 6))} />
      </g>
      {/* # B: the debt as 100 tiles; each month only ONE tile (1%) leaves */}
      <g opacity={B}>
        {Array.from({ length: 100 }, (_, k) => {
          const leave = k === 99 ? on(f, one, 14) : k === 98 ? on(f, one + 18, 14) : k === 97 ? on(f, one + 36, 14) : 0
          const x = 110 + (k % 10) * 80, y = 500 + Math.floor(k / 10) * 70
          return <rect key={k} x={x + leave * 300} y={y - leave * 200} width={70} height={60} rx={8} fill={leave > 0 ? P.mint : P.navy4} opacity={on(f, but + (k % 10) + Math.floor(k / 10), 6) * (1 - leave)} />
        })}
        <Label x={CX} y={1250} text="1 TILE = 1% OF WHAT YOU OWE" size={58} font="Bebas Neue" color={P.ink2} o={on(f, years, 8)} />
      </g>
      <Vignette id="ms" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s17–s20: the slow road down — 1 year $4,430 · 10 years $1,500 · $40 floor · 15 y 4 m, $12,600
const Years: React.FC<PieceProps> = ({ f, c }) => {
  const after = c('s17:after'), d4430 = c('s17:4430'), y10 = c('s18:10'), d1500 = c('s18:1500')
  const sinks = c('s19:sinks'), floor = c('s19:floor'), last = c('s19:last'), five = c('s19:5'), years5 = c('s19:years')
  const total = c('s20:total'), y15 = c('s20:15'), m4 = c('s20:4'), d12600 = c('s20:12600'), d5000 = c('s20:5000')
  // # the chart: balance over 184 months, drawn in step with the voice (month m reached on its cue)
  const keys: [number, number][] = [[after, 0], [d4430, 12], [y10, 120], [floor, 128], [y15, 184]]
  let month = 0
  for (let k = 0; k < keys.length - 1; k++) if (f >= keys[k][0]) month = lerp(keys[k][1], keys[k + 1][1], easeInOut(span(f, keys[k][0], keys[k + 1][0])))
  const X0 = 110, X1 = 880, Y0 = 600, Y1 = 1100, xm = (m: number) => X0 + (m / 184) * (X1 - X0), yb = (b: number) => Y1 - (b / 5000) * (Y1 - Y0)
  const pts = Array.from({ length: Math.floor(month) + 1 }, (_, m) => `${m ? 'L' : 'M'}${xm(m).toFixed(1)} ${yb(MIN.bal[m]).toFixed(1)}`).join(' ')
  const head = { x: xm(Math.floor(month)), y: yb(MIN.bal[Math.floor(month)]) }
  const A = win(f, after, d12600), B = on(f, d12600, 8)
  const marker = (m: number, at: number, text: string, dy: number) => (
    <g opacity={on(f, at, 6)}><circle cx={xm(m)} cy={yb(MIN.bal[m])} r={16} fill={P.goldInk} />
      <g transform={`translate(${xm(m) + (m > 100 ? -20 : 30)} ${yb(MIN.bal[m]) + dy}) scale(${pop(f, at)})`}><Pill x={0} y={0} text={text} size={60} anchor={m > 100 ? 'end' : 'start'} /></g></g>
  )
  return (
    <g>
      <TallStage id="my" f={f} />
      <Headline f={f} until={9e9} lines={[[after, 'WHAT YOU STILL OWE'], [sinks, 'THE PAYMENT SINKS TO $40', P.goldInk, 92], [y15, '15 YEARS…', P.coralInk, 130], [m4, '15 YEARS 4 MONTHS', P.coralInk, 120], [d12600, '$12,600 PAID', P.goldInk, 132], [d5000, 'FOR A $5,000 DEBT', P.ink, 110]]} />
      <g opacity={A}>
        <rect x={X0} y={Y1} width={X1 - X0} height={4} rx={2} fill={P.ink2} opacity={0.6} />
        {[0, 5, 10, 15].map((y) => <Label key={y} x={xm(y * 12)} y={Y1 + 60} text={`${y}`} size={46} font="Bebas Neue" color={P.ink2} />)}
        <Label x={X1} y={Y1 + 115} text="YEARS" size={44} font="Bebas Neue" color={P.ink2} anchor="end" />
        <Label x={X0 - 10} y={Y0 + 20} text="$5,000" size={48} font="Bebas Neue" color={P.ink2} anchor="end" o={0} />
        <path d={`${pts} L${head.x} ${Y1} L${X0} ${Y1} Z`} fill={P.sky} opacity={0.15} />
        <path d={pts} stroke={P.sky} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={head.x} cy={head.y} r={16} fill={P.white} />
        {marker(12, d4430, '1 YEAR: $4,430', 90)}
        {marker(120, d1500, '10 YEARS: $1,500', -90)}
        {/* # the $40 floor: a coin drops to a floor line under the curve */}
        <g opacity={on(f, floor, 8) * (1 - on(f, last - 6, 6))} transform={`translate(${xm(128)} ${yb(MIN.bal[128]) - 150}) scale(${pop(f, floor)})`}>
          <circle r={62} fill={P.gold} stroke={P.goldD} strokeWidth={6} /><Label x={0} y={20} text="$40" size={56} font="Bebas Neue" color={P.navy0} />
          <path d="M0 64 L0 120" stroke={P.goldD} strokeWidth={6} /></g>
        {/* # the last stretch: a bracket from year 10 to the end */}
        <g opacity={on(f, last, 8)}><path d={`M${xm(120)} ${Y0 - 30} V${Y0 - 50} H${xm(184)} V${Y0 - 30}`} stroke={P.coralInk} strokeWidth={8} fill="none" strokeLinejoin="round" />
          <Label x={(xm(120) + xm(184)) / 2} y={Y0 - 70} text="5+ MORE YEARS" size={50} font="Bebas Neue" color={P.coralInk} o={on(f, five, 6)} /></g>
        {/* # the end of the road: 15 years 4 months */}
        <g opacity={on(f, y15, 6)}><circle cx={xm(184)} cy={Y1} r={18} fill={P.coralInk} /></g>
      </g>
      {/* # B: what you paid against what you borrowed — two stacks */}
      <g opacity={B}>
        <g opacity={on(f, d12600, 6)} transform={`translate(${CX + 200} 1180)`}>{Array.from({ length: Math.round(25 * easeOut(span(f, d12600, d12600 + 16))) }, (_, k) => <rect key={k} x={-160} y={-30 - k * 26} width={320} height={24} rx={6} fill={P.gold} stroke={P.goldD} strokeWidth={3} />)}
          <Label x={0} y={75} text="PAID" size={68} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, d5000, 6)} transform={`translate(${CX - 210} 1180)`}>{Array.from({ length: Math.round(10 * easeOut(span(f, d5000, d5000 + 12))) }, (_, k) => <rect key={k} x={-160} y={-30 - k * 26} width={320} height={24} rx={6} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={3} />)}
          <Label x={0} y={75} text="BORROWED" size={68} font="Bebas Neue" color={P.ink} /></g>
      </g>
      <Vignette id="my" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s21–s22: the law knows — the minimum payment warning (since 2010)
const Warning: React.FC<PieceProps> = ({ f, c }) => {
  const law = c('s21:law'), since = c('s22:since'), statements = c('s22:statements'), warning = c('s22:warning'), showing = c('s22:showing'), long = c('s22:long'), take = c('s22:take')
  const y2010 = since + 10
  const slam = easeInOut(span(f, law - 8, law + 2))
  return (
    <g>
      <TallStage id="mw" f={f} />
      <Headline f={f} until={9e9} lines={[[law, 'THE LAW KNOWS'], [y2010, 'SINCE 2010'], [warning, 'MINIMUM PAYMENT WARNING', P.goldInk, 84]]} />
      {/* # the gavel strikes on "law" */}
      <g opacity={1 - on(f, statements - 8, 8)} transform={`translate(${CX} 760) rotate(${lerp(-40, 0, slam)} 80 60) scale(${pop(f, law - 8)})`}><Prop id="gavel" x={0} y={0} size={460} f={f} /></g>
      <g opacity={on(f, y2010, 6) * (1 - on(f, statements - 8, 8))} transform={`translate(${CX + 250} 1080) scale(${pop(f, y2010)})`}><Calendar x={0} y={0} text="2010" s={1.1} /></g>
      {/* # a card statement slides up; its warning box lights, the magnifier reads it */}
      <g opacity={on(f, statements, 8)} transform={`translate(0 ${(1 - easeOut(span(f, statements, statements + 18))) * 500})`}>
        <rect x={80} y={470} width={840} height={800} rx={20} fill={P.paper} stroke={P.edge} strokeWidth={3} />
        <rect x={80} y={470} width={840} height={90} rx={20} fill={P.navy2} /><text x={120} y={530} fill="#F2E6CC" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>CARD STATEMENT</text>
        {[0, 1, 2].map((k) => <rect key={k} x={150} y={600 + k * 48} width={[520, 420, 470][k]} height={20} rx={10} fill={P.navy0} opacity={0.15} />)}
        <g opacity={on(f, warning, 6)}>
          <rect x={110} y={760} width={780} height={480} rx={18} fill="none" stroke={P.coral} strokeWidth={8} />
          <text x={140} y={835} fill={P.coralD} style={{ font: '400 62px "Bebas Neue"' }}>MINIMUM PAYMENT WARNING</text>
          <text x={140} y={905} fill={P.navy0} style={{ font: '600 42px "Inter"' }}>If you make only the minimum</text>
          <text x={140} y={958} fill={P.navy0} style={{ font: '600 42px "Inter"' }}>payment, you will pay more in</text>
          <text x={140} y={1011} fill={P.navy0} style={{ font: '600 42px "Inter"' }}>interest and take longer to pay.</text>
        </g>
        <g opacity={on(f, long, 6)}>
          <rect x={140} y={1050} width={720} height={160} rx={14} fill={P.navy0} opacity={0.08} />
          <text x={170} y={1110} fill={P.navy0} style={{ font: '400 52px "Bebas Neue"' }}>ONLY THE MINIMUM:</text>
          <text x={830} y={1180} textAnchor="end" fill={P.coralD} style={{ font: '400 72px "Bebas Neue"' }}>{f >= take ? 'OVER 15 YEARS' : ''}</text>
        </g>
      </g>
      <g opacity={on(f, showing, 8)} transform={`translate(${lerp(980, 830, easeInOut(span(f, showing, long)))} ${lerp(640, 770, easeInOut(span(f, showing, long)))}) rotate(-20)`}><Prop id="magnifier" x={0} y={0} size={150} f={f} /></g>
      <Vignette id="mw" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s23–s27: the way out — keep paying $143 → under 5 years, $3,200, $4,400 kept
const WayOut: React.FC<PieceProps> = ({ f, c }) => {
  const s23 = c('s23'), simple = c('s23:simple'), way = c('s23:way'), keep = c('s24:keep'), d143 = c('s24:143'), every = c('s24:every'), even = c('s24:even'), minimum = c('s24:minimum'), falls = c('s24:falls')
  const same = c('s25:same'), gone = c('s25:gone'), five = c('s25:5'), interest = c('s26:interest'), d7600 = c('s26:7600'), d3200 = c('s26:3200')
  const d4400 = c('s27:4400'), kept = c('s27:kept'), refusing = c('s27:refusing'), less = c('s27:less')
  const A = win(f, s23, same), B = win(f, same, interest), C = win(f, interest, d4400), D = on(f, d4400, 8)
  // # payment chart: $143 held flat (gold) vs the minimum falling to $40 (grey), first 60 months
  const X0 = 110, X1 = 880, Y0 = 640, Y1 = 1120, xm = (m: number) => X0 + (m / 60) * (X1 - X0), yp = (p: number) => Y1 - (p / 160) * (Y1 - Y0)
  const flat = clamp01((f - d143) / Math.max(1, even - d143)), fall = clamp01((f - minimum + 4) / Math.max(1, same - minimum))
  const minPath = Array.from({ length: Math.floor(60 * fall) + 1 }, (_, m) => `${m ? 'L' : 'M'}${xm(m).toFixed(1)} ${yp(MIN.pay[m]).toFixed(1)}`).join(' ')
  // # interest pile: 7,600 → 3,200 (coins scale with dollars)
  const coins = f < d3200 ? 38 : lerp(38, 16, easeInOut(span(f, d3200, d3200 + 16)))
  return (
    <g>
      <TallStage id="mo" f={f} />
      <Headline f={f} until={9e9} lines={[[simple, 'A SIMPLE WAY OUT', P.mintInk, 110], [d143, 'KEEP PAYING $143', P.goldInk, 120], [falls, 'EVEN AS THE MINIMUM FALLS', P.ink, 84], [five, 'GONE IN UNDER 5 YEARS', P.mintInk, 104],
        [d7600, 'INTEREST: $7,600', P.coralInk, 112], [d3200, 'INTEREST: $3,200', P.mintInk, 112], [d4400, '$4,400 KEPT', P.mintInk, 140], [refusing, 'JUST BY NOT PAYING LESS', P.ink, 88]]} />
      {/* # A: an open door glows on "way out", then the payment chart */}
      <g opacity={A}>
        <g opacity={1 - on(f, keep, 10)} transform={`translate(${CX} 830) scale(${pop(f, s23) * 1.5})`}>
          <rect x={-130} y={-230} width={260} height={440} rx={14} fill={P.navy3} /><rect x={-110} y={-210} width={220} height={400} rx={10} fill={P.gold} opacity={0.25 + 0.5 * on(f, way, 16)} />
          <path d={`M-110 -210 L${lerp(-110, -20, on(f, way, 18))} -180 L${lerp(-110, -20, on(f, way, 18))} 160 L-110 190 Z`} fill={P.navy4} />
        </g>
        <g opacity={on(f, keep, 8)}>
          <rect x={X0} y={Y1} width={X1 - X0} height={4} rx={2} fill={P.ink2} opacity={0.6} />
          {[0, 1, 2, 3, 4, 5].map((y) => <Label key={y} x={xm(y * 12)} y={Y1 + 56} text={`${y}`} size={44} font="Bebas Neue" color={P.ink2} />)}
          <Label x={X1} y={Y1 + 110} text="YEARS" size={44} font="Bebas Neue" color={P.ink2} anchor="end" />
          <path d={`M${X0} ${yp(143.17)} L${lerp(X0, X1, flat)} ${yp(143.17)}`} stroke={P.gold} strokeWidth={14} strokeLinecap="round" opacity={f >= d143 ? 1 : 0} />
          <Label x={X0} y={yp(143.17) - 34} text="$143 EVERY MONTH" size={52} font="Bebas Neue" color={P.goldInk} anchor="start" o={on(f, every, 6)} />
          {f >= minimum - 4 && <path d={minPath} stroke={P.ink2} strokeWidth={10} fill="none" strokeDasharray="22 16" strokeLinecap="round" />}
          <Label x={X1} y={yp(MIN.pay[60]) - 30} text="THE MINIMUM" size={56} font="Bebas Neue" color={P.ink2} anchor="end" o={on(f, falls, 6)} />
        </g>
      </g>
      {/* # B: two progress bars — minimum only vs $143 held */}
      <g opacity={B}>
        <Label x={100} y={700} text="MINIMUM ONLY" size={64} font="Bebas Neue" color={P.ink} anchor="start" />
        <Bar x={100} y={730} w={800 * on(f, same, 20)} h={130} color={P.coral} />
        <Label x={870} y={818} text="15 Y 4 M" size={70} font="Bebas Neue" color={P.navy0} anchor="end" o={on(f, same + 14, 6)} />
        <Label x={100} y={980} text="$143 EVERY MONTH" size={64} font="Bebas Neue" color={P.ink} anchor="start" o={on(f, gone, 6)} />
        <Bar x={100} y={1010} w={800 * (57 / 184) * easeOut(span(f, gone, five))} h={130} color={P.mint} o={on(f, gone, 6)} />
        <Label x={100 + 800 * (57 / 184) + 24} y={1098} text="UNDER 5 YEARS" size={66} font="Bebas Neue" color={P.mintInk} anchor="start" o={on(f, five, 6)} />
      </g>
      {/* # C: the interest pile shrinks from $7,600 to $3,200 */}
      <g opacity={C}>
        <g opacity={on(f, interest, 6)} transform={`translate(${CX} 1040) scale(1.6) translate(${-CX} -1040)`}><Pile x={CX} y={1040} n={f < d7600 ? lerp(4, 38, on(f, interest, 18)) : coins} s={1} seed={21} /></g>
        <Label x={CX} y={1210} text="INTEREST PAID" size={62} font="Bebas Neue" color={P.ink2} o={on(f, interest, 6)} />
      </g>
      {/* # D: the money you keep goes into a piggy bank; a "pay less" arrow gets crossed out */}
      <g opacity={D}>
        <g transform={`translate(${CX} 900) scale(${pop(f, d4400)})`}><Prop id="piggy-bank" x={0} y={0} size={560} f={f} /></g>
        {Array.from({ length: 6 }, (_, i) => { const ph = ((f - d4400) / 22 + i / 6) % 1; if (f < d4400 + (i / 6) * 22 || f > kept + 20) return null; return <g key={i} transform={`translate(${CX + 10} ${lerp(470, 700, ph)})`} opacity={1 - ph * 0.3}><ellipse rx={34} ry={12 + 22 * Math.abs(Math.cos(ph * 5))} fill={P.gold} stroke={P.goldD} strokeWidth={5} /></g> })}
        <g opacity={on(f, refusing, 6)} transform={`translate(${CX} 1190) scale(${pop(f, refusing)})`}><rect x={-260} y={-60} width={520} height={120} rx={60} fill={P.card} stroke={P.coral} strokeWidth={5} /><Label x={0} y={22} text="PAY LESS" size={64} font="Bebas Neue" color={P.coralInk} />
          <path d="M-230 0 L230 0" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, less, 6)} /></g>
      </g>
      <Vignette id="mo" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s28–s29: good standing, but slow — $5,000 can follow you for 15+ years
const Loop: React.FC<PieceProps> = ({ f, c, to }) => {
  const s28 = c('s28'), keeps = c('s28:keeps'), good = c('s28:good'), but = c('s28:but'), clears = c('s28:clears'), slowly = c('s28:slowly')
  const pay = c('s29:pay'), d5000 = c('s29:5000'), follow = c('s29:follow'), y15 = c('s29:15')
  const end = on(f, to - 54, 14)
  const A = win(f, s28, pay), B = on(f, pay, 8) * (1 - end)
  // # the walker: you stroll right, the card follows a step behind
  const walk = easeInOut(span(f, pay, to - 54))
  return (
    <g>
      <TallStage id="ml" f={f} />
      <Headline f={f} until={to - 54} lines={[[good, 'IN GOOD STANDING', P.mintInk, 110], [clears, 'BUT IT CLEARS DEBT…', P.ink, 100], [slowly, 'VERY SLOWLY', P.coralInk, 140], [pay, 'PAY ONLY THE MINIMUM…'], [follow, '…AND IT FOLLOWS YOU', P.coralInk, 110], [y15, 'FOR OVER 15 YEARS', P.coralInk, 120]]} />
      <g opacity={A}>
        <g transform={`translate(${CX} 760) scale(${pop(f, s28) * 1.25})`}><rect x={-260} y={-280} width={520} height={560} rx={20} fill={P.paper} stroke={P.edge} strokeWidth={3} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-200} y={-200 + k * 60} width={[380, 300, 340, 260][k]} height={22} rx={11} fill={P.navy0} opacity={0.15} />)}
          <g opacity={on(f, good, 6)} transform={`translate(0 110) scale(${pop(f, good)})`}><circle r={86} fill={P.mint} /><path d="M-38 0 l26 26 l52 -58" stroke={P.white} strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g></g>
        {/* # a progress bar that barely moves */}
        <g opacity={on(f, clears, 6)}><rect x={110} y={1180} width={780} height={64} rx={32} fill={P.navy4} />
          <rect x={110} y={1180} width={780 * (0.03 + 0.03 * span(f, clears, pay))} height={64} rx={32} fill={P.mint} /></g>
      </g>
      <g opacity={B}>
        <rect x={60} y={1160} width={880} height={10} rx={5} fill={P.ink2} opacity={0.4} />
        <Mini look="hero" x={lerp(560, 760, walk)} y={1160} scale={2.6} frame={f} seed={3} mood={f >= follow ? 'sad' : 'neutral'} />
        <g opacity={on(f, d5000, 6)} transform={`translate(${lerp(260, 430, walk)} ${800 + Math.sin(f / 9) * 14}) scale(${pop(f, d5000) * 0.62}) rotate(-8)`}><Card x={0} y={0} balance="$5,000" /></g>
        <g opacity={on(f, y15, 6)} transform={`translate(${CX - 280} 560) scale(${pop(f, y15)})`}><Prop id="hourglass" x={0} y={0} size={240} f={f} /></g>
      </g>
      <g opacity={end}><svg x={W / 2 - 80} y={600} width={160} height={160}><Emblem size={160} /></svg>
        <Label x={W / 2} y={850} text="CAPITALCODE" size={80} font="Bebas Neue" color={P.ink} /></g>
      <Vignette id="ml" w={W} h={H} />
    </g>
  )
}

const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const MINPAY = [
  makePiece('mp-hook', 'Short: $5,000 at the minimum → over 15 years, $7,600 interest (more than the debt)', { canvas: 'tall', mood: 'dark', Component: Hook,
    beats: [...beat('s1', ['owe', '5000', 'credit', 'pay', 'minimum', '15', 'clear']), ...beat('s2', ['along', 'hand', 'bank', '7600', 'interest']), ...beat('s3', ['more', 'debt', 'itself']),
      ...beat('s4', ['here', 'small', 'turns', '15', 'habit']), ...beat('s5', ['say', 'stop', 'card', 'rate', 'never'])],
    sfx: [['s1:5000', 'pop', 0.5], ['s1:minimum', 'coin', 0.5], ['s1:15', 'whoosh', 0.5], ['s2:hand', 'cash', 0.5], ['s2:7600', 'impact', 0.5], ['s3:debt', 'thud', 0.6], ['s4:turns', 'flutter', 0.4], ['s5:stop', 'click', 0.6], ['s5:never', 'click', 0.5]] }),
  makePiece('mp-rate', 'Short: about 22% a year → just under 2% a month → $93 on $5,000', { canvas: 'tall', mood: 'light', Component: Rate,
    beats: [...beat('s6', ['average', 'credit', 'charges', '22', 'year']), ...beat('s7', ['split', '12', 'months', '2', 'balance', 'every', 'month']), ...beat('s8', ['5000', 'first', 'interest', '93'])],
    sfx: [['s6:average', 'flutter', 0.4], ['s6:22', 'pop', 0.5], ['s7:split', 'crack', 0.4], ['s7:2', 'swish', 0.5], ['s8:5000', 'cash', 0.4], ['s8:interest', 'whoosh', 0.4], ['s8:93', 'ding', 0.5]] }),
  makePiece('mp-formula', 'Short: the minimum = 1% + interest (≥ $40) → $143: $93 interest, $50 debt', { canvas: 'tall', mood: 'light', Component: Formula,
    beats: [...beat('s9', ['', 'look', 'big', 'bank', 'works', 'minimum']), ...beat('s10', ['1', 'owe', 'plus', 'interest', 'never', '40']), ...beat('s11', ['', 'first', 'minimum', '143']),
      ...beat('s12', ['', '93', 'dollars', 'interest']), ...beat('s13', ['only', '50', 'pays', 'debt'])],
    sfx: [['s9:bank', 'pop', 0.5], ['s9:works', 'click', 0.4], ['s10:1', 'tick', 0.4], ['s10:plus', 'tick', 0.4], ['s10:40', 'pop', 0.5], ['s11:143', 'cash', 0.5], ['s12:93', 'crack', 0.5], ['s12:interest', 'coin', 0.4], ['s13:50', 'ding', 0.5], ['s13:debt', 'softpop', 0.4]] }),
  makePiece('mp-shrink', 'Short: the minimum shrinks with the debt → only ~1% of it a month', { canvas: 'tall', mood: 'dark', Component: Shrink,
    beats: [...beat('s14', ['next', 'month', 'owe', 'less', 'bank', 'asks', 'less#2']), ...beat('s15', ['', 'minimum', 'shrinks', 'debt', 'shrinks#2']), ...beat('s16', ['', 'kind', 'but', 'years', '1', 'month'])],
    sfx: [['s14:next', 'flutter', 0.4], ['s14:less', 'tick', 0.4], ['s14:less#2', 'tick', 0.4], ['s15:shrinks', 'whoosh', 0.4], ['s16:kind', 'chime', 0.4], ['s16:but', 'glitch', 0.4], ['s16:1', 'pop', 0.5]] }),
  makePiece('mp-years', 'Short: 1 year $4,430 · 10 years $1,500 · $40 floor · 15 y 4 m, $12,600 for $5,000', { canvas: 'tall', mood: 'light', Component: Years,
    beats: [...beat('s17', ['after', 'whole', 'year', 'payments', 'still', '4430']), ...beat('s18', ['after', '10', 'still', '1500']), ...beat('s19', ['from', 'payment', 'sinks', '40', 'floor', 'last', 'debt', '5', 'years']),
      ...beat('s20', ['', 'total', '15', '4', 'months', '12600', 'paid', '5000', 'debt'])],
    sfx: [['s17:4430', 'pop', 0.5], ['s18:1500', 'pop', 0.5], ['s19:floor', 'thud', 0.5], ['s19:5', 'tick', 0.4], ['s20:15', 'impact', 0.5], ['s20:12600', 'cash', 0.6], ['s20:5000', 'softpop', 0.4]] }),
  makePiece('mp-warning', 'Short: the law knows — the minimum payment warning on every statement since 2010', { canvas: 'tall', mood: 'dark', Component: Warning,
    beats: [...beat('s21', ['', 'law', 'knows', 'happens']), ...beat('s22', ['since', 'card', 'statements', 'carry', 'minimum', 'warning', 'showing', 'long', 'only', 'take'])],
    sfx: [['s21:law', 'impact', 0.6], ['s22:since', 'flutter', 0.4], ['s22:statements', 'swish', 0.4], ['s22:warning', 'ding', 0.5], ['s22:showing', 'whoosh', 0.3]] }),
  makePiece('mp-wayout', 'Short: keep paying $143 → under 5 years, interest $7,600 → $3,200, $4,400 kept', { canvas: 'tall', mood: 'light', Component: WayOut,
    beats: [...beat('s23', ['', 'numbers', 'simple', 'way']), ...beat('s24', ['keep', 'paying', '143', 'every', 'month', 'even', 'minimum', 'falls']), ...beat('s25', ['', 'same', 'debt', 'gone', '5']),
      ...beat('s26', ['', 'interest', 'drops', '7600', '3200']), ...beat('s27', ['', 'roughly', '4400', 'kept', 'refusing', 'less'])],
    sfx: [['s23:way', 'chime', 0.5], ['s24:143', 'cash', 0.5], ['s24:falls', 'whoosh', 0.4], ['s25:5', 'ding', 0.5], ['s26:7600', 'thud', 0.4], ['s26:3200', 'pop', 0.5], ['s27:4400', 'coin', 0.6], ['s27:refusing', 'click', 0.4]] }),
  makePiece('mp-loop', 'Short: good standing, but very slow — $5,000 can follow you for 15+ years', { canvas: 'tall', mood: 'dark', Component: Loop,
    beats: [...beat('s28', ['', 'keeps', 'account', 'good', 'but', 'clears', 'slowly']), ...beat('s29', ['pay', 'only', '5000', 'follow', '15'])],
    sfx: [['s28:good', 'ding', 0.5], ['s28:slowly', 'tick', 0.4], ['s29:5000', 'pop', 0.4], ['s29:follow', 'flutter', 0.4], ['s29:15', 'impact', 0.5]] }),
]
