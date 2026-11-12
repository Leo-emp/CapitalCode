// ============================================================
// LONG VIDEO — "Airlines Are Secretly Credit Card Companies" (≈ 4:40,
// s1–s49), eleven wide diorama pieces between chapter cards.
// Sourced: Delta 2025 results (Amex remuneration $8.2B, +11%; GAAP
// pre-tax income $6.2B; revenue $63.4B; 1M+ new cards); Delta 2019
// results ($4.1B in 2019); United 8-K June 2020 (MileagePlus ≈ $21.9B,
// loan up to $5B); our maths: UAL ≈ 290.4M shares × $39.66 = $11.5B;
// Delta Sept 2020: $9B raised against SkyMiles.
// House rules (owner r22/r26/r27): every word and number shows ON its
// spoken word, never before; one headline slot whose lines hand over
// without overlapping; text ≥ 44 px; nothing under the corner logo.
// ============================================================
import React from 'react'
import { Emblem } from '../logo/Emblem'
import { getProp } from '../props/registry'
import { Mini } from '../rig/Mini'
import { Calendar, Label } from './charts'
import { clamp01, easeInOut, easeOut, lerp, on, P, Pedestal, pop, rnd, span, Stage, Vignette } from './kit'
import { makePiece, type PieceProps } from './registry'

const W = 1920, H = 1080
const Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number }> = ({ id, x, y, size, f }) => {
  const C = getProp(id).Component
  return <C size={size} x={x - size / 2} y={y - size / 2} frame={f} />
}
// # visible from a to b with clean fades (gone by b)
const win = (f: number, a: number, b: number, d = 8) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
// # the headline slot: each line from its cue until the next line's cue — never two at once
type Head = [at: number, text: string, color?: string, size?: number]
const Headline: React.FC<{ f: number; lines: Head[]; until: number; y?: number }> = ({ f, lines, until, y = 150 }) => (
  <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
    return o > 0.001 ? <g key={k} transform={`translate(960 ${y}) scale(${0.95 + 0.05 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 96} font="Bebas Neue" color={color ?? P.ink} o={o} /></g> : null
  })}</g>
)
// # a coin with a label (a "mile")
const Mile: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <circle r={46} fill={P.sky} stroke={P.skyD} strokeWidth={6} /><circle r={34} fill="none" stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={4} />
    <path d="M-20 6 L0 -18 L20 6 L8 6 L8 18 L-8 18 L-8 6 Z" fill="#FFFFFF" />
  </g>
)
// # a big credit card (bank card): navy, gold chip, optional label
const Card: React.FC<{ x: number; y: number; s?: number; r?: number; label?: string; tint?: string }> = ({ x, y, s = 1, r = 0, label, tint = '#3A5F93' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-250} y={-150} width={500} height={310} rx={32} fill="#000" opacity={0.18} transform="translate(10 14)" />
    <rect x={-250} y={-160} width={500} height={310} rx={32} fill={tint} stroke="#FFFFFF" strokeOpacity={0.25} strokeWidth={3} />
    <path d="M-250 -60 Q0 -130 250 -40 L250 -10 Q0 -100 -250 -30 Z" fill="#FFFFFF" opacity={0.08} />
    <rect x={-195} y={-105} width={80} height={60} rx={12} fill={P.gold} /><path d="M-195 -75 H-115 M-155 -105 V-45" stroke={P.goldD} strokeWidth={4} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-195 + k * 102} y={10} width={80} height={16} rx={8} fill="#FFFFFF" opacity={0.3} />)}
    {label && <text x={195} y={110} textAnchor="end" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>}
  </g>
)
// # a side-view airliner (flat, house colours)
const Plane: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M-300 0 Q-300 -44 -240 -44 L230 -44 Q300 -44 330 0 Q300 30 230 30 L-240 30 Q-300 30 -300 0 Z" fill="#F2F5FA" />
    <path d="M-300 0 Q-300 -44 -240 -44 L-150 -44 L-150 30 L-240 30 Q-300 30 -300 0 Z" fill={P.navy2} opacity={0.12} />
    <path d="M-230 -44 L-290 -150 L-215 -150 L-150 -44 Z" fill={P.navy2} />
    <path d="M-40 10 L-160 150 L-90 150 L60 10 Z" fill="#D8DFEA" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-110 + k * 26} y={-22} width={14} height={16} rx={5} fill={P.navy3} />)}
    <path d="M255 -30 Q300 -26 318 -6 L262 -6 Z" fill={P.navy3} />
    <rect x={-300} y={2} width={630} height={8} fill={P.coral} opacity={0.8} />
  </g>
)
// # a bank building with a name plate
const BankB: React.FC<{ x: number; y: number; s?: number; name?: string }> = ({ x, y, s = 1, name }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Prop id="bank" x={0} y={0} size={380} f={0} />
    {name && <Label x={0} y={240} text={name} size={60} font="Bebas Neue" color={P.ink} />}
  </g>
)
// # a horizontal value bar with a label and a value at its end
const HBar: React.FC<{ x: number; y: number; w: number; h?: number; color: string; label: string; value?: string; vo?: number; o?: number; ink?: string }> = ({ x, y, w, h = 110, color, label, value, vo = 1, o = 1, ink }) => (
  <g opacity={o}>
    <Label x={x} y={y - 22} text={label} size={52} font="Bebas Neue" color={ink ?? P.ink} anchor="start" />
    <rect x={x} y={y + 8} width={Math.max(0, w)} height={h} rx={18} fill="#000" opacity={0.12} />
    <rect x={x} y={y} width={Math.max(0, w)} height={h} rx={18} fill={color} />
    {value && <Label x={x + w + 24} y={y + h / 2 + 24} text={value} size={76} font="Bebas Neue" color={ink ?? P.ink} anchor="start" o={vo} />}
  </g>
)
// # a flowing stream of objects along an arc between two points, phase from frame a to b
const stream = (f: number, a: number, b: number, n: number, from: { x: number; y: number }, to: { x: number; y: number }, lift: number, draw: (k: number) => React.ReactNode, key: string) => {
  if (f < a || f > b + 20) return null
  return Array.from({ length: n }, (_, k) => {
    const born = a + (k / n) * 24
    if (f < born) return null
    const ph = ((f - a) / 24 + k / n) % 1
    if (f > b && ph > 0.9) return null
    const t = easeInOut(ph), x = lerp(from.x, to.x, t), y = lerp(from.y, to.y, t) - Math.sin(t * Math.PI) * lift
    return <g key={`${key}${k}`} transform={`translate(${x} ${y})`}>{draw(k)}</g>
  })
}

// ---------------------------------------------------------------- s1–s4: $8.2B from Amex, not for flights — for miles; $2B more than profit; what is an airline selling?
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const amex = c('s1:american'), paid = c('s1:paid'), delta = c('s1:delta'), d82 = c('s1:82')
  const not = c('s2:not'), flights = c('s2:flights'), miles = c('s2:miles')
  const about = c('s3:about'), more = c('s3:more'), profit = c('s3:profit'), year = c('s3:year')
  const so = c('s4:so'), airline = c('s4:airline'), selling = c('s4:selling')
  const A = win(f, amex, about), B = win(f, about, so), C = on(f, so, 8)
  return (
    <g>
      <Stage id="ah" frame={f} />
      <Headline f={f} until={9e9} lines={[[d82, '$8.2 BILLION', P.goldInk, 150], [not, 'NOT FOR FLIGHTS…'], [miles, '…FOR MILES', P.skyInk, 130], [more, '$2 BILLION MORE THAN', P.coralInk], [profit, 'DELTA\'S PRE-TAX PROFIT', P.coralInk], [selling, 'WHAT IS AN AIRLINE REALLY SELLING?', P.ink, 84]]} />
      {/* # A: the Amex card pays the airline — money flows to the plane; then the plane is crossed out and miles pour instead */}
      <g opacity={A}>
        <g transform={`translate(470 600) scale(${pop(f, amex)})`}><Card x={0} y={0} s={0.9} r={-6} label="AMEX" tint="#2A6FB0" /></g>
        <g transform={`translate(1420 600) scale(${pop(f, delta)})`}><Plane x={0} y={0} s={1.05} o={1 - 0.6 * on(f, not, 8)} /><Label x={0} y={230} text="DELTA" size={70} font="Bebas Neue" color={P.ink} /></g>
        {stream(f, paid, not, 8, { x: 700, y: 560 }, { x: 1250, y: 560 }, 160, () => <g><rect x={-46} y={-26} width={92} height={52} rx={8} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={4} /><text y={14} textAnchor="middle" fill="#1F5A2E" style={{ font: '400 38px "Bebas Neue"' }}>$</text></g>, 'hc')}
        <g opacity={on(f, flights, 6)}><path d="M1220 470 L1620 730 M1620 470 L1220 730" stroke={P.coral} strokeWidth={22} strokeLinecap="round" opacity={1 - on(f, miles, 8)} /></g>
        {stream(f, miles, about + 10, 9, { x: 700, y: 560 }, { x: 1300, y: 600 }, 200, () => <Mile x={0} y={0} s={0.9} />, 'hm')}
      </g>
      {/* # B: two bars — what Amex paid vs Delta's whole-year pre-tax profit */}
      <g opacity={B}>
        <HBar x={260} y={420} w={1100 * on(f, about, 16)} color={P.sky} label="AMEX PAID DELTA" value="$8.2B" vo={on(f, about, 6)} />
        <HBar x={260} y={700} w={(1100 * 6.2 / 8.2) * on(f, profit, 16)} color={P.gold} label="DELTA'S PRE-TAX PROFIT (2025)" value="$6.2B" vo={on(f, profit, 6)} o={on(f, profit - 4, 6)} />
        {/* # the gap: $2B more */}
        <g opacity={on(f, year, 8)}><path d={`M${260 + 1100 * 6.2 / 8.2} 690 V560 M${260 + 1100} 560 V540`} stroke={P.coralInk} strokeWidth={6} strokeDasharray="14 10" />
          <rect x={260 + 1100 * 6.2 / 8.2} y={545} width={1100 * 2 / 8.2} height={14} rx={7} fill={P.coral} /></g>
      </g>
      {/* # C: the question — a plane on one side, a card on the other, a big question mark between */}
      <g opacity={C}>
        <g transform={`translate(560 620) scale(${pop(f, airline) * 0.9})`}><Plane x={0} y={0} /></g>
        <g transform={`translate(1380 620) scale(${pop(f, so) * 0.8})`}><Card x={0} y={0} r={8} tint="#2A6FB0" /></g>
        <g transform={`translate(960 620) scale(${pop(f, selling)})`}><circle r={110} fill={P.card} /><Label x={0} y={52} text="?" size={160} font="Bebas Neue" color={P.goldInk} /></g>
      </g>
      <Vignette id="ah" />
    </g>
  )
}

// ---------------------------------------------------------------- s5–s9: the wallet → card → miles; the bank bought them from Delta; you trade them for a seat
const Chain: React.FC<PieceProps> = ({ f, c }) => {
  const wallet = c('s5:wallet'), card = c('s5:card'), pay = c('s6:pay'), collect = c('s6:collect'), miles6 = c('s6:miles')
  const bank = c('s7:bank'), make = c('s7:make'), air = c('s7:air'), bought = c('s7:bought')
  const sells = c('s8:sells'), amex = c('s8:american'), passes = c('s8:passes'), reward = c('s8:reward')
  const months = c('s9:months'), trade = c('s9:trade'), seat = c('s9:seat'), fly = c('s9:fly')
  // # the three players on one line: DELTA — AMEX — YOU
  const XD = 330, XA = 960, XY = 1590, Y = 600
  const line = on(f, bank, 14)
  return (
    <g>
      <Stage id="ac" frame={f} />
      <Headline f={f} until={9e9} lines={[[collect, 'EVERY TAP EARNS MILES', P.skyInk], [bank, 'WHO MADE THOSE MILES?'], [bought, 'THE BANK BOUGHT THEM', P.goldInk, 104], [sells, 'DELTA SELLS MILES TO AMEX'], [passes, 'AMEX GIVES THEM TO YOU'], [trade, 'MILES → A SEAT', P.skyInk, 110], [fly, 'DELTA HAS TO FLY YOU', P.coralInk]]} />
      {/* # you, with your wallet and card, on the right */}
      <g transform={`translate(${lerp(960, XY, line)} ${lerp(640, Y, line)}) scale(${lerp(1.3, 1, line)})`}>
        <g opacity={on(f, wallet - 10, 8)}><Pedestal x={0} y={210} r={110} /><Mini look="hero" x={0} y={210} scale={1.7} frame={f} seed={2} mood={f >= reward ? 'happy' : 'neutral'} /></g>
        <g opacity={on(f, wallet, 6) * (1 - on(f, card, 8))} transform={`translate(160 40) scale(${pop(f, wallet)})`}><Prop id="wallet" x={0} y={0} size={170} f={f} /></g>
        <g opacity={on(f, card, 6)} transform={`translate(170 30) rotate(${-12 + 18 * Math.sin(span(f, pay, pay + 12) * Math.PI)}) scale(${pop(f, card) * 0.36})`}><Card x={0} y={0} tint="#2A6FB0" /></g>
        {/* # each tap: a mile pops out above you */}
        {[collect, collect + 8, miles6].map((a, k) => <Mile key={k} x={-120 + k * 120} y={-200 - 40 * on(f, a, 12)} s={pop(f, a) * 0.9} o={on(f, a, 6) * (1 - on(f, bank, 10))} />)}
        <Label x={0} y={330} text="YOU" size={60} font="Bebas Neue" color={P.ink} o={line} />
      </g>
      {/* # the bank in the middle — "out of thin air"? no: a stamp says BOUGHT */}
      <g opacity={line}>
        <g transform={`translate(${XA} ${Y - 30}) scale(${pop(f, bank)})`}><BankB x={0} y={0} s={1} name="AMERICAN EXPRESS" /></g>
        <g opacity={on(f, make, 8) * (1 - on(f, bought, 8))} transform={`translate(${XA + 190} ${Y - 200})`}><Prop id="question" x={0} y={0} size={120} f={f} /></g>
        <g opacity={on(f, bought, 6) * (1 - on(f, sells - 6, 8))} transform={`translate(${XA} ${Y + 330}) rotate(-6) scale(${pop(f, bought)})`}><rect x={-120} y={-44} width={240} height={88} rx={12} fill="none" stroke={P.goldInk} strokeWidth={8} /><Label x={0} y={22} text="BOUGHT" size={64} font="Bebas Neue" color={P.goldInk} /></g>
        {/* # Delta on the left */}
        <g opacity={on(f, sells - 8, 8)} transform={`translate(${XD} ${Y - 40}) scale(${pop(f, sells - 8) * 0.75})`}><Plane x={0} y={0} /><Label x={0} y={230} text="DELTA" size={96} font="Bebas Neue" color={P.ink} /></g>
        {/* # miles flow Delta → Amex, cash flows back */}
        {stream(f, sells, passes + 10, 6, { x: XD + 120, y: Y - 60 }, { x: XA - 140, y: Y - 60 }, 120, () => <Mile x={0} y={0} s={0.65} />, 'cm')}
        {stream(f, amex, passes + 10, 5, { x: XA - 140, y: Y + 110 }, { x: XD + 120, y: Y + 110 }, -60, () => <g><rect x={-38} y={-22} width={76} height={44} rx={7} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={4} /></g>, 'cc')}
        {/* # Amex → you */}
        {stream(f, passes, trade, 6, { x: XA + 140, y: Y - 60 }, { x: XY - 60, y: Y - 120 }, 120, () => <Mile x={0} y={0} s={0.65} />, 'cy')}
        <g opacity={on(f, reward, 6) * (1 - on(f, months, 8))} transform={`translate(${XY - 200} ${Y - 260}) scale(${pop(f, reward)})`}><Prop id="trophy" x={0} y={0} size={130} f={f} /></g>
      </g>
      {/* # months later: a calendar flips; miles travel back to Delta and become a seat */}
      <g opacity={on(f, months, 8)} transform={`translate(${XY + 230} ${Y - 260}) scale(${pop(f, months) * 0.9})`}><Calendar x={0} y={0} text="LATER" flip={span(f, months, months + 14)} /></g>
      {stream(f, trade, fly, 6, { x: XY - 60, y: Y - 120 }, { x: XD + 60, y: Y - 120 }, 220, () => <Mile x={0} y={0} s={0.7} />, 'ct')}
      <g opacity={on(f, seat, 6)} transform={`translate(${XD} ${Y + 210}) scale(${pop(f, seat)})`}>
        <rect x={-150} y={-60} width={300} height={120} rx={20} fill={P.paper} stroke={P.edge} strokeWidth={3} /><Label x={0} y={20} text="1 SEAT" size={64} font="Bebas Neue" color={P.navy0} /></g>
      <Vignette id="ac" />
    </g>
  )
}

// ---------------------------------------------------------------- s10–s11b: a mile is a promise — the bank pays now, the airline delivers later
const Promise: React.FC<PieceProps> = ({ f, c }) => {
  const mile = c('s10:mile'), promise = c('s10:promise'), small = c('s10:small'), future = c('s10:future'), sold = c('s10:sold'), today = c('s10:today'), cash = c('s10:cash')
  const pays = c('s11:pays'), now = c('s11:now'), delivers = c('s11:delivers'), later = c('s11:later')
  const bank11a = c('s11a:bank'), marketing = c('s11a:marketing'), airline11a = c('s11a:airline'), advance = c('s11a:advance')
  const points = c('s11b:points'), statement = c('s11b:statement'), product = c('s11b:product'), billion = c('s11b:billion')
  const A = win(f, mile, bank11a), B = win(f, bank11a, points), C = on(f, points, 8)
  return (
    <g>
      <Stage id="ap" frame={f} />
      <Headline f={f} until={9e9} lines={[[promise, 'A MILE IS A PROMISE', P.goldInk, 120], [future, 'A PIECE OF A FUTURE FLIGHT'], [cash, 'SOLD TODAY, FOR CASH', P.mintInk], [now, 'THE BANK PAYS NOW'], [later, 'THE AIRLINE DELIVERS LATER'], [bank11a, 'ONE MILE, TWO VIEWS', P.ink, 104], [marketing, 'FOR THE BANK: MARKETING', P.ink, 92], [advance, 'FOR THE AIRLINE: CASH UP FRONT', P.mintInk, 92], [billion, 'SOLD BY THE BILLION', P.goldInk, 120]]} />
      {/* # A: the mile coin becomes a boarding pass (a promise); a timeline: today (cash) → later (flight) */}
      <g opacity={A}>
        <g opacity={1 - on(f, promise, 10)}><Mile x={960} y={560} s={pop(f, mile) * 2.6} /></g>
        <g opacity={on(f, promise, 8)} transform={`translate(960 500) scale(${pop(f, promise) * (1 - 0.35 * on(f, pays - 20, 20))}) translate(-960 -500)`}>
          <rect x={660} y={380} width={600} height={240} rx={26} fill={P.paper} stroke={P.edge} strokeWidth={3} />
          <path d="M1080 380 V620" stroke={P.navy0} strokeOpacity={0.25} strokeWidth={4} strokeDasharray="12 10" />
          <text x={700} y={450} fill={P.navy0} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>BOARDING PASS</text>
          <text x={700} y={540} fill={P.navy0} style={{ font: '400 84px "Bebas Neue"' }}>SEAT: ?</text>
          <g opacity={on(f, small, 6)}><Plane x={1170} y={500} s={0.18} /></g>
          <text x={700} y={595} fill={P.coralD} style={{ font: '600 32px "Inter"' }}>{f >= future ? 'valid for a future flight' : ''}</text>
        </g>
        {/* # the timeline */}
        <g opacity={on(f, sold, 8)}>
          <rect x={300} y={830} width={1320} height={10} rx={5} fill={P.ink2} opacity={0.5} />
          <g transform={`translate(420 835) scale(${pop(f, today)})`}><circle r={26} fill={P.mint} /><Label x={0} y={-50} text="TODAY" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, cash, 6)} transform={`translate(420 920) scale(${pop(f, cash)})`}><rect x={-80} y={-34} width={160} height={68} rx={10} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={4} /><Label x={0} y={18} text="CASH" size={46} font="Bebas Neue" color="#1F5A2E" /></g>
          <g opacity={on(f, now, 6)}><Label x={420} y={1010} text="THE BANK PAYS" size={48} font="Bebas Neue" color={P.ink2} /></g>
          <g transform={`translate(1500 835) scale(${pop(f, delivers)})`}><circle r={26} fill={P.sky} /><Label x={0} y={-50} text="LATER" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, delivers, 6)} transform={`translate(${lerp(560, 1500, easeInOut(span(f, delivers, later + 10)))} 920) scale(0.3)`}><Plane x={0} y={0} /></g>
          <g opacity={on(f, later, 6)}><Label x={1500} y={1010} text="THE AIRLINE FLIES YOU" size={48} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>
      {/* # B: two views of the same mile — a cost for the bank (megaphone/marketing), cash in advance for the airline */}
      <g opacity={B}>
        <g transform={`translate(560 600) scale(${pop(f, bank11a)})`}><circle r={250} fill={P.card} /><BankB x={0} y={-30} s={0.8} /><Label x={0} y={170} text="A MARKETING COST" size={60} font="Bebas Neue" color={P.coralInk} o={on(f, marketing, 6)} /></g>
        <g transform={`translate(1360 600) scale(${pop(f, airline11a)})`}><circle r={250} fill={P.card} /><Plane x={0} y={-40} s={0.55} />
          <g opacity={on(f, advance, 6)}><rect x={-120} y={30} width={240} height={90} rx={12} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={4} /><Label x={0} y={92} text="CASH FIRST" size={56} font="Bebas Neue" color="#1F5A2E" /></g></g>
        <Mile x={960} y={600} s={pop(f, bank11a + 10) * 1.2} />
      </g>
      {/* # C: you see a few points; the airline sees crates of miles going out by the billion */}
      <g opacity={C}>
        <g transform={`translate(520 620) scale(${pop(f, points)})`}><rect x={-230} y={-200} width={460} height={400} rx={18} fill={P.paper} stroke={P.edge} strokeWidth={3} />
          <text x={-190} y={-130} fill={P.navy0} style={{ font: '400 44px "Bebas Neue"' }}>{f >= statement ? 'CARD STATEMENT' : ''}</text>
          {[0, 1, 2].map((k) => <rect key={k} x={-190} y={-90 + k * 50} width={[300, 240, 280][k]} height={18} rx={9} fill={P.navy0} opacity={0.15} />)}
          <g transform="translate(0 120)"><Mile x={0} y={0} s={0.8} /></g></g>
        {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, product + k * 4, 6)} transform={`translate(${1150 + (k % 3) * 210} ${700 - Math.floor(k / 3) * 190}) scale(${pop(f, product + k * 4)})`}>
          <rect x={-90} y={-80} width={180} height={160} rx={14} fill={P.navy4} stroke={P.champ} strokeWidth={4} /><Mile x={0} y={0} s={0.9} /></g>)}
        <Label x={1360} y={900} text="SOLD BY THE BILLION" size={60} font="Bebas Neue" color={P.goldInk} o={on(f, billion, 6)} />
      </g>
      <Vignette id="ap" />
    </g>
  )
}

// ---------------------------------------------------------------- s12–s13c: $8.2B (+11%) · $22M a day · $4.1B in 2019 → doubled
const Billions: React.FC<PieceProps> = ({ f, c }) => {
  const big = c('s12:that'), become = c('s12:become'), money = c('s13:money'), grew = c('s13:grew'), p11 = c('s13:11'), d82 = c('s13:82')
  const d22 = c('s13a:22'), single = c('s13a:single'), day = c('s13a:day')
  const back = c('s13b:back'), partnership = c('s13b:partnership'), d41 = c('s13b:41'), six = c('s13c:six'), doubled = c('s13c:doubled')
  const A = win(f, big, d22), B = win(f, d22, back), C = on(f, back, 8)
  return (
    <g>
      <Stage id="ab" frame={f} />
      <Headline f={f} until={9e9} lines={[[big, 'HOW BIG IS THE PROMISE?', P.ink, 100], [money, 'PAID BY AMEX IN 2025', P.ink, 100], [grew, 'UP 11% IN A YEAR', P.mintInk, 110], [d82, '$8.2 BILLION', P.goldInk, 150], [d22, '≈ $22 MILLION', P.goldInk, 140], [day, '…EVERY SINGLE DAY', P.ink, 110], [d41, '2019: $4.1 BILLION', P.ink, 120], [doubled, 'ROUGHLY DOUBLED', P.mintInk, 130]]} />
      {/* # A: a growing mountain of cash crates with a card on top; +11% arrow */}
      <g opacity={A}>
        {Array.from({ length: 21 }, (_, k) => {
          const row = k < 6 ? 0 : k < 11 ? 1 : k < 15 ? 2 : k < 18 ? 3 : k < 20 ? 4 : 5, i = [0, 6, 11, 15, 18, 20][row], n = [6, 5, 4, 3, 2, 1][row]
          const x = 960 + (k - i - (n - 1) / 2) * 150, y = 900 - row * 92, at = become + k * 3
          return <g key={k} opacity={on(f, at, 6)} transform={`translate(${x} ${y - (1 - easeOut(span(f, at, at + 10))) * 60})`}><rect x={-68} y={-40} width={136} height={80} rx={10} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={5} /><text y={16} textAnchor="middle" fill="#1F5A2E" style={{ font: '400 46px "Bebas Neue"' }}>$</text></g>
        })}
        <g opacity={on(f, grew, 6)} transform={`translate(1520 ${lerp(760, 560, on(f, p11, 18))}) scale(${pop(f, p11)})`}><Prop id="arrow-up" x={0} y={0} size={180} f={f} /><Label x={0} y={150} text="+11%" size={80} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, big, 6)} transform={`translate(400 520) scale(${pop(f, big) * 0.42}) rotate(-10)`}><Card x={0} y={0} label="AMEX" tint="#2A6FB0" /></g>
      </g>
      {/* # B: one calendar day, and $22 million dropping into it */}
      <g opacity={B}>
        <g transform={`translate(700 600) scale(${pop(f, d22) * 2.4})`}><Calendar x={0} y={0} text="1 DAY" /></g>
        {stream(f, d22, day + 30, 8, { x: 1500, y: 300 }, { x: 760, y: 600 }, 60, () => <g><rect x={-46} y={-26} width={92} height={52} rx={8} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={4} /></g>, 'bd')}
        <Label x={1350} y={760} text="$22,000,000" size={110} font="Bebas Neue" color={P.goldInk} o={on(f, d22, 6)} />
        <Label x={1350} y={850} text="EVERY DAY OF 2025" size={56} font="Bebas Neue" color={P.ink2} o={on(f, single, 6)} />
      </g>
      {/* # C: 2019 vs 2025 bars */}
      <g opacity={C}>
        <g transform="translate(0 0)">
          <rect x={500} y={300} width={300} height={600} rx={16} fill="none" stroke={P.ink2} strokeWidth={4} strokeDasharray="16 12" opacity={0.5 * on(f, back, 8)} />
          <rect x={1120} y={300} width={300} height={600} rx={16} fill="none" stroke={P.ink2} strokeWidth={4} strokeDasharray="16 12" opacity={0.5 * on(f, back, 8)} />
          <rect x={500} y={900 - 300 * on(f, d41, 16)} width={300} height={300 * on(f, d41, 16)} rx={16} fill={P.navy4} />
          <Label x={650} y={970} text="2019" size={72} font="Bebas Neue" color={P.ink} o={on(f, back, 6)} />
          <Label x={650} y={880 - 300 * on(f, d41, 16)} text="$4.1B" size={84} font="Bebas Neue" color={P.ink} o={on(f, d41, 6)} />
          <rect x={1120} y={900 - 600 * on(f, six, 20)} width={300} height={600 * on(f, six, 20)} rx={16} fill={P.gold} />
          <Label x={1270} y={970} text="2025" size={72} font="Bebas Neue" color={P.ink} o={on(f, back, 6)} />
          <Label x={1270} y={880 - 600 * on(f, six, 20)} text="$8.2B" size={84} font="Bebas Neue" color={P.goldInk} o={on(f, six + 14, 6)} />
          <g opacity={on(f, doubled, 6)} transform={`translate(960 ${520}) scale(${pop(f, doubled)})`}><Label x={0} y={0} text="× 2" size={120} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>
      <Vignette id="ab" />
    </g>
  )
}

// ---------------------------------------------------------------- s14–s19: 13¢ of every revenue dollar · 1M+ new cards · bigger than profit by $2B
const Share: React.FC<PieceProps> = ({ f, c }) => {
  const total = c("s14:total"), revenue = c("s14:revenue"), d634 = c('s14:634'), card = c('s15:card'), d13 = c('s15:13'), dollar = c('s15:dollar')
  const brought = c('s15:brought'), million = c('s16:million'), signed = c('s16:signed'), fourth = c('s16:fourth'), row = c('s16:row')
  const put = c('s17:put'), profit17 = c('s17:profit'), profit = c('s18:profit'), entire = c('s18:entire'), d62 = c('s18:62')
  const payments = c('s19:payments'), bigger = c('s19:bigger'), d2 = c('s19:2')
  const A = win(f, total, million), B = win(f, million, put), C = on(f, put, 8)
  // # the revenue dollar: a big coin cut into a 13% gold slice
  const sweep = on(f, d13, 18)
  const arc = (p: number, r: number) => { const a = -Math.PI / 2 + p * Math.PI * 2; return `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}` }
  return (
    <g>
      <Stage id="as" frame={f} />
      <Headline f={f} until={9e9} lines={[[revenue, 'DELTA\'S REVENUE: $63.4B', P.ink, 104], [d13, '≈ 13¢ OF EVERY DOLLAR', P.goldInk, 120], [million, '1,000,000+ NEW CARDS', P.skyInk, 116], [fourth, '4TH YEAR IN A ROW'], [profit17, 'NOW, THE PROFIT'], [d62, 'PRE-TAX PROFIT: $6.2B', P.ink, 104], [d2, '$2B BIGGER THAN PROFIT', P.coralInk, 110]]} />
      {/* # A: the revenue dollar with a 13% slice */}
      <g opacity={A}>
        <g transform={`translate(960 600) scale(${pop(f, total)})`}>
          <circle r={300} fill={P.navy4} stroke={P.champ} strokeWidth={8} /><circle r={318} fill="none" stroke={P.gold} strokeWidth={10} opacity={on(f, brought, 8) * (1 - on(f, million - 10, 8))} />
          <Label x={0} y={30} text={f >= d634 ? '$63.4B' : 'REVENUE'} size={110} font="Bebas Neue" color={P.ink} o={1 - 0.6 * sweep} />
          {sweep > 0 && <path d={`M0 0 L${arc(0, 300)} A300 300 0 0 1 ${arc(0.129 * sweep, 300)} Z`} fill={P.gold} transform={`translate(${30 * sweep} ${-30 * sweep})`} />}
          <g opacity={on(f, card, 6)} transform="translate(420 -170)"><Card x={0} y={0} s={0.42} r={8} label="AMEX" tint="#2A6FB0" /></g>
          <g opacity={on(f, dollar, 6)}><Label x={-420} y={-140} text="13¢" size={120} font="Bebas Neue" color={P.goldInk} /><Label x={-420} y={-60} text="OF EVERY $1" size={52} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>
      {/* # B: a crowd of new cardholders on pedestals, four rows filling in (one per year) */}
      <g opacity={B}>
        {Array.from({ length: 4 }, (_, y) => Array.from({ length: 9 }, (_, k) => {
          const at = million + y * 10 + k * 1.6, x = 300 + k * 165 + (y % 2) * 40, yy = 500 + y * 140
          return <g key={`${y}-${k}`} opacity={on(f, at, 6) * (y === 3 ? 1 : 0.55 + 0.45 * (1 - on(f, fourth, 8)))}><Mini look={['hero', 'owner', 'investor'][(k + y) % 3]} x={x} y={yy} scale={0.75} frame={f} seed={k + y * 9} mood="happy" /></g>
        }))}
        <Label x={960} y={1050} text="EACH ROW: 1 MILLION+ NEW DELTA AMEX CARDS" size={50} font="Bebas Neue" color={P.ink2} o={on(f, row, 6)} />
      </g>
      {/* # C: the profit bar next to the card money */}
      <g opacity={C}>
        <rect x={260} y={420} width={1100 * 6.2 / 8.2} height={110} rx={18} fill="none" stroke={P.goldInk} strokeWidth={5} strokeDasharray="18 12" opacity={on(f, put, 8) * (1 - on(f, d62, 8))} />
        <rect x={260} y={720} width={1100} height={110} rx={18} fill="none" stroke={P.skyInk} strokeWidth={5} strokeDasharray="18 12" opacity={on(f, put, 8) * (1 - on(f, payments, 8))} />
        <Label x={260} y={398} text="PROFIT" size={52} font="Bebas Neue" color={P.ink} anchor="start" o={on(f, put, 6) * (1 - on(f, profit, 6))} />
        <Label x={260} y={698} text="CARD MONEY" size={52} font="Bebas Neue" color={P.ink} anchor="start" o={on(f, put, 6) * (1 - on(f, payments, 6))} />
        <HBar x={260} y={420} w={(1100 * 6.2 / 8.2) * on(f, d62, 16)} color={P.gold} label="DELTA'S PRE-TAX PROFIT, ALL OF 2025" value="$6.2B" vo={on(f, d62, 6)} o={on(f, profit, 6)} />
        <HBar x={260} y={720} w={1100 * on(f, payments, 16)} color={P.sky} label="PAID BY ONE CARD PARTNER" value="$8.2B" vo={on(f, payments, 6)} o={on(f, payments - 4, 6)} />
        <g opacity={on(f, bigger, 8)}><rect x={260 + 1100 * 6.2 / 8.2} y={720} width={1100 * 2 / 8.2} height={110} rx={18} fill={P.coral} opacity={0.85} />
          <Label x={260 + 1100 * 7.2 / 8.2} y={880} text="+$2B" size={70} font="Bebas Neue" color={P.coralInk} o={on(f, d2, 6)} /></g>
      </g>
      <Vignette id="as" />
    </g>
  )
}

// ---------------------------------------------------------------- s20–s26a: why the bank pays — more spending, swipe fees, annual fees, interest
const WhyBank: React.FC<PieceProps> = ({ f, c }) => {
  const hand = c('s20:much'), miles20 = c('s20:miles'), s21 = c('s21'), change = c('s21:change'), pay21 = c('s21:pay')
  const chasing = c('s22:chasing'), free = c('s22:free'), everyday = c('s22:everyday'), one = c('s22:one')
  const tap = c('s23:tap'), shop = c('s23:shop'), fee = c('s23:fee'), part = c('s23:part'), bank23 = c('s23:bank')
  const holders = c('s24:cardholders'), annual = c('s24:annual'), carry = c('s24:carry'), interest = c('s24:interest')
  const bring = c('s25:bring'), customers = c('s25:customers'), spending = c('s25:spending'), fees = c('s25:fees'), interest25 = c('s25:interest'), after = c('s25:after')
  const bank26a = c('s26:bank'), expects = c('s26:expects'), worth = c('s26:worth'), cost = c('s26:cost')
  const gets = c('s26a:gets'), delta = c('s26a:delta'), bank26 = c('s26a:bank'), card = c('s26a:card')
  const A = win(f, hand, chasing), B = win(f, chasing, bring), C = win(f, bring, bank26a), D = win(f, bank26a, gets), E = on(f, gets, 8)
  return (
    <g>
      <Stage id="aw" frame={f} tint="teal" />
      <Headline f={f} until={9e9} lines={[[hand, 'WHY PAY THAT MUCH FOR MILES?', P.ink, 96], [change, 'MILES CHANGE HOW PEOPLE PAY', P.skyInk, 96], [chasing, 'ONE CARD FOR EVERYTHING'], [tap, 'EVERY TAP: A FEE'], [part, 'PART OF IT GOES TO THE BANK', P.goldInk, 96], [annual, '+ ANNUAL FEES'], [interest, '+ INTEREST', P.coralInk, 110],
        [bring, 'MILES BRING CUSTOMERS IN', P.skyInk, 96], [after, 'THE BANK IS AFTER THE REST', P.goldInk, 96], [worth, 'WORTH MORE THAN THE MILES', P.mintInk, 100], [gets, 'BOTH SIDES WIN A LOYAL CUSTOMER', P.ink, 92]]} />
      {/* # A: a bank holding out cash for a pile of miles; a person's spending shifts to one card */}
      <g opacity={A}>
        <g transform={`translate(560 600) scale(${pop(f, hand)})`}><BankB x={0} y={0} s={1.1} /></g>
        {stream(f, hand, chasing, 6, { x: 700, y: 560 }, { x: 1260, y: 560 }, 140, () => <rect x={-40} y={-24} width={80} height={48} rx={7} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={4} />, 'wa')}
        <g transform={`translate(1380 620)`}>{Array.from({ length: 9 }, (_, k) => <Mile key={k} x={(k % 3 - 1) * 90} y={-Math.floor(k / 3) * 80} s={pop(f, miles20 + k * 2) * 0.9} />)}</g>
        <g opacity={on(f, pay21, 6)} transform={`translate(1380 860) scale(${pop(f, pay21)})`}><Label x={0} y={0} text="HOW PEOPLE PAY" size={56} font="Bebas Neue" color={P.skyInk} /></g>
      </g>
      {/* # B: everyday spending (groceries, fuel, coffee) all flows onto ONE card → shop pays a fee → part goes to the bank; annual fee; interest */}
      <g opacity={B}>
        {['grocery-basket', 'gas-pump', 'coffee-cup', 'shopping-bag'].map((id, k) => <g key={id} opacity={on(f, everyday + k * 3, 6)} transform={`translate(${260 + k * 0} ${330 + k * 170}) scale(${pop(f, everyday + k * 3)})`}><Prop id={id} x={0} y={0} size={130} f={f} /></g>)}
        {[0, 1, 2, 3].map((k) => <path key={k} d={`M330 ${330 + k * 170} C500 ${330 + k * 170} 520 600 640 600`} stroke={P.skyInk} strokeWidth={6} fill="none" strokeDasharray="14 10" opacity={on(f, one, 8) * 0.8} />)}
        <g transform={`translate(780 600) scale(${pop(f, free) * 0.5}) rotate(-8)`}><Card x={0} y={0} label="DELTA AMEX" tint="#2A6FB0" /></g>
        {/* # the shop and its fee */}
        <g opacity={on(f, shop, 6)} transform={`translate(1150 470) scale(${pop(f, shop)})`}><Prop id="shop-mini" x={0} y={0} size={220} f={f} /></g>
        <g opacity={on(f, fee, 6)} transform={`translate(1150 640) scale(${pop(f, fee)})`}><rect x={-80} y={-36} width={160} height={72} rx={36} fill={P.coral} /><Label x={0} y={18} text="FEE" size={52} font="Bebas Neue" color={P.navy0} /></g>
        {stream(f, part, annual + 20, 5, { x: 1230, y: 640 }, { x: 1560, y: 560 }, 90, () => <circle r={18} fill={P.gold} stroke={P.goldD} strokeWidth={4} />, 'wf')}
        <g opacity={on(f, bank23, 6)} transform={`translate(1600 520) scale(${pop(f, bank23) * 0.9})`}><BankB x={0} y={0} s={0.8} name="THE BANK" /></g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, holders + k * 3, 6) * (1 - on(f, bring - 8, 8))}><Mini look={['hero', 'owner', 'investor'][k]} x={700 + k * 110} y={960} scale={0.7} frame={f} seed={60 + k} mood="happy" /></g>)}
        <g opacity={on(f, annual, 6)} transform={`translate(1600 800) scale(${pop(f, annual)})`}><rect x={-150} y={-44} width={300} height={88} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={3} /><Label x={0} y={18} text="ANNUAL FEE" size={52} font="Bebas Neue" color={P.navy0} /></g>
        <g opacity={on(f, carry, 6)} transform={`translate(1600 930) scale(${pop(f, interest)})`}><rect x={-150} y={-44} width={300} height={88} rx={14} fill={P.coral} /><Label x={0} y={18} text="INTEREST" size={52} font="Bebas Neue" color={P.navy0} /></g>
      </g>
      {/* # C: a magnet (miles) pulls customers in; behind them, spending, fees and interest pour into the bank */}
      <g opacity={C}>
        <g transform={`translate(420 600) rotate(90) scale(${pop(f, bring)})`}><Prop id="magnet" x={0} y={0} size={260} f={f} /></g>
        {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, customers + k * 3, 6)} transform={`translate(${lerp(980, 700 + k * 70, easeOut(span(f, customers + k * 3, customers + k * 3 + 20)))} ${640 + (k % 2) * 30})`}><Mini look={['hero', 'owner', 'investor'][k % 3]} x={0} y={120} scale={0.9} frame={f} seed={40 + k} mood="happy" /></g>)}
        <g transform={`translate(1580 560) scale(${pop(f, spending)})`}><Prop id="vault-door" x={0} y={0} size={300} f={f} /></g>
        {[[spending, 'SPENDING', P.sky], [fees, 'FEES', P.coral], [interest25, 'INTEREST', P.gold]].map(([a, t, col], k) => (
          <g key={k} opacity={on(f, a as number, 6)} transform={`translate(${lerp(1100, 1380, on(f, (a as number) + 6, 18))} ${380 + k * 120}) scale(${pop(f, a as number)})`}><rect x={-120} y={-38} width={240} height={76} rx={38} fill={col as string} /><Label x={0} y={18} text={t as string} size={48} font="Bebas Neue" color={P.navy0} /></g>
        ))}
      </g>
      {/* # D: a balance — the miles on one pan, all that business on the other, outweighing it */}
      <g opacity={D}>
        <g transform={`rotate(${lerp(0, -8, on(f, worth, 22))} 960 560)`}>
          <rect x={460} y={552} width={1000} height={20} rx={10} fill={P.champ} />
          <g transform="translate(620 500)">{Array.from({ length: 3 }, (_, k) => <Mile key={k} x={(k - 1) * 80} y={-30} s={0.8} />)}<Label x={0} y={130} text="WHAT THE MILES COST" size={50} font="Bebas Neue" color={P.ink} o={on(f, cost, 6)} /></g>
          <g transform="translate(1300 470)">{['SPENDING', 'FEES', 'INTEREST'].map((t, k) => <g key={t}><rect x={-120} y={-30 - k * 70} width={240} height={60} rx={30} fill={[P.sky, P.coral, P.gold][k]} /><Label x={0} y={12 - k * 70} text={t} size={42} font="Bebas Neue" color={P.navy0} /></g>)}</g>
        </g>
        <path d="M910 860 L960 580 L1010 860 Z" fill={P.champ} />
      </g>
      {/* # E: the loop — Delta keeps a flyer, the bank keeps a card customer */}
      <g opacity={E}>
        <g transform={`translate(480 560) scale(${pop(f, delta) * 0.5})`}><Plane x={0} y={0} /></g>
        <g transform={`translate(960 600) scale(${pop(f, gets)})`}><Pedestal x={0} y={170} r={110} /><Mini look="hero" x={0} y={170} scale={1.6} frame={f} seed={7} mood="happy" /></g>
        <g transform={`translate(1440 560) scale(${pop(f, bank26) * 0.38}) rotate(6)`}><Card x={0} y={0} label="AMEX" tint="#2A6FB0" /></g>
        <path d="M640 520 Q800 420 880 500" stroke={P.skyInk} strokeWidth={8} fill="none" opacity={on(f, delta, 8)} /><path d="M1040 500 Q1120 420 1280 520" stroke={P.goldInk} strokeWidth={8} fill="none" opacity={on(f, card, 8)} />
      </g>
      <Vignette id="aw" />
    </g>
  )
}

// ---------------------------------------------------------------- s27–s33: the airline sets the price · dynamic pricing · breakage
const Price: React.FC<PieceProps> = ({ f, c }) => {
  const attractive = c('s27:attractive'), decides = c('s28:decides'), seat28 = c('s28:seat'), costs = c('s28:costs')
  const prices = c('s29:prices'), dynamically = c('s29:dynamically'), flight = c('s29:flight'), different = c('s29:different'), next = c('s29:next')
  const see = c('s29a'), exchange = c('s29a:exchange'), negotiate = c('s29a:negotiate')
  const needs = c('s30:needs'), holding = c('s30:holding'), quietly = c('s30:quietly'), less = c('s30:less')
  const never = c('s31:never'), used = c('s31:used'), forgotten = c('s32:forgotten'), keeps = c('s32:keeps'), cash32 = c('s32:cash'), anyone = c('s32:anyone'), breakage = c('s33:breakage')
  const A = win(f, attractive, see), B = win(f, see, never), C = on(f, never, 8)
  // # the dial: how many miles this seat costs — the needle swings with the day
  const swing = f < dynamically ? 0 : Math.sin((f - dynamically) / 9) * 0.6 + Math.sin((f - dynamically) / 23) * 0.3
  return (
    <g>
      <Stage id="ar" frame={f} />
      <Headline f={f} until={9e9} lines={[[attractive, 'ANOTHER REASON IT PAYS', P.ink, 100], [seat28, 'THE AIRLINE SETS THE PRICE'], [dynamically, 'PRICED DYNAMICALLY', P.skyInk, 110], [different, 'SAME FLIGHT, DIFFERENT MILES', P.ink, 96], [exchange, 'NO FIXED EXCHANGE RATE'], [needs, 'MORE MILES PER SEAT…'], [less, '…EACH MILE BUYS LESS', P.coralInk, 110],
        [never, 'SOME MILES ARE NEVER USED'], [cash32, 'THE AIRLINE KEEPS THE CASH', P.goldInk, 100], [breakage, '"BREAKAGE"', P.goldInk, 150]]} />
      {/* # A: a seat with a dial on top — the needle swings day to day */}
      <g opacity={A}>
        <g transform={`translate(640 600) scale(${pop(f, attractive) * 1.35})`}>
          <rect x={-130} y={-230} width={260} height={360} rx={60} fill={P.navy4} /><rect x={-95} y={-300} width={190} height={90} rx={36} fill={P.navy3} /><rect x={-110} y={-200} width={220} height={140} rx={30} fill={P.sky} opacity={0.25} />
          <rect x={-170} y={120} width={340} height={90} rx={30} fill={P.navy3} /><rect x={-190} y={60} width={50} height={120} rx={20} fill={P.navy2} /><rect x={140} y={60} width={50} height={120} rx={20} fill={P.navy2} /><rect x={-20} y={210} width={40} height={60} fill={P.navy2} />
        </g>
        <g opacity={on(f, costs, 6)} transform={`translate(1200 600) scale(${pop(f, costs)})`}>
          <path d="M-260 0 A260 260 0 0 1 260 0" stroke={P.navy4} strokeWidth={40} fill="none" />
          <path d="M-260 0 A260 260 0 0 1 -130 -225" stroke={P.mint} strokeWidth={40} fill="none" /><path d="M130 -225 A260 260 0 0 1 260 0" stroke={P.coral} strokeWidth={40} fill="none" />
          <g transform={`rotate(${swing * 75})`}><path d="M-12 0 L0 -220 L12 0 Z" fill={P.ink} /></g><circle r={26} fill={P.ink} />
          <Label x={0} y={90} text="MILES FOR THIS SEAT" size={52} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, flight, 6)} transform={`translate(400 300)`}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, flight + k * 6, 6)}><Calendar x={k * 150} y={0} text={['MON', 'TUE', 'WED'][k]} s={0.7} /></g>)}</g>
      </g>
      {/* # B: a currency board with no rate ("?"), then a mile coin shrinking as seats need more of them */}
      <g opacity={B}>
        <g opacity={1 - on(f, needs, 10)} transform={`translate(960 600) scale(${pop(f, see)})`}><rect x={-420} y={-180} width={840} height={360} rx={24} fill={P.navy0} stroke={P.champ} strokeWidth={6} />
          <Label x={-200} y={30} text="1 MILE =" size={100} font="Bebas Neue" color="#F2E6CC" /><Label x={180} y={50} text="?" size={180} font="Bebas Neue" color={P.gold} />
          <g opacity={on(f, negotiate, 6)}><path d="M-380 -150 L380 150" stroke={P.coral} strokeWidth={12} opacity={0} /></g></g>
        <g opacity={on(f, needs, 8)}>
          <g transform={`translate(${lerp(960, 760, on(f, holding, 16))} 620)`}>{Array.from({ length: 6 }, (_, k) => <Mile key={k} x={(k % 3 - 1) * 110} y={-Math.floor(k / 3) * 100} s={lerp(1.2, 0.75, on(f, quietly, 30))} />)}</g>
          <g opacity={on(f, holding, 8)} transform={`translate(1350 560) scale(${pop(f, holding) * 0.55})`}><rect x={-230} y={-120} width={460} height={240} rx={26} fill={P.paper} /><Label x={0} y={30} text="1 SEAT" size={130} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, less, 6)}><Prop id="arrow-down" x={760} y={870} size={140} f={f} /></g>
        </g>
      </g>
      {/* # C: miles gathering dust in a drawer; the cash stays in the airline's vault; BREAKAGE */}
      <g opacity={C}>
        <g transform={`translate(560 640) scale(${pop(f, never)})`}><rect x={-260} y={-150} width={520} height={300} rx={20} fill={P.navy3} /><rect x={-230} y={-120} width={460} height={240} rx={14} fill={P.navy1} />
          {Array.from({ length: 5 }, (_, k) => <Mile key={k} x={-150 + k * 75} y={40 - (k % 2) * 30} s={0.7} o={1 - 0.45 * on(f, forgotten, 30)} />)}
          {Array.from({ length: 18 }, (_, k) => <circle key={k} cx={-220 + rnd(k) * 440} cy={-100 + rnd(k + 9) * 200} r={3 + rnd(k + 3) * 4} fill="#C2B9B1" opacity={0.6 * on(f, forgotten + k, 20)} />)}
          <Label x={0} y={210} text="UNUSED MILES" size={56} font="Bebas Neue" color={P.ink} o={on(f, used, 6)} /></g>
        <g opacity={on(f, keeps, 6)} transform={`translate(1360 600) scale(${pop(f, keeps)})`}><Prop id="vault-door" x={0} y={0} size={320} f={f} />
          <g opacity={on(f, cash32, 6)}><rect x={-110} y={190} width={220} height={80} rx={12} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={5} /><Label x={0} y={246} text="CASH KEPT" size={52} font="Bebas Neue" color="#1F5A2E" /></g></g>
        <g opacity={on(f, anyone, 6) * (1 - on(f, breakage, 6))} transform={`translate(960 380) scale(0.3)`}><Plane x={0} y={0} o={0.5} /></g>
      </g>
      <Vignette id="ar" />
    </g>
  )
}

// ---------------------------------------------------------------- s34–s40a: 2020 — MileagePlus $21.9B vs all of United $11.5B; Delta raised $9B on SkyMiles
const Worth: React.FC<PieceProps> = ({ f, c }) => {
  const came = c('s34:came'), y2020 = c('s34:in'), when = c('s34:when'), planes = c('s34:planes'), parked = c('s34:parked'), collapsed = c('s34:collapsed')
  const united = c('s35:united'), cash = c('s35:cash'), borrowed = c('s35:borrowed'), mp = c('s35:mileageplus')
  const filing = c('s36:filing'), valued = c('s36:valued'), d219 = c('s36:219')
  const stock = c('s37:stock'), all = c('s37:all'), planes37 = c('s37:planes'), d115 = c('s37:115')
  const own = c("s38:own"), loyalty38 = c('s38:loyalty'), twice = c('s38:twice'), entire = c('s38:entire')
  const lenders = c('s39:lenders'), seriously = c('s39:seriously'), delta = c('s40:delta'), d9 = c('s40:9'), skymiles = c('s40:skymiles')
  const loans = c('s40a:loans'), believe = c('s40a:believe'), years = c('s40a:years')
  const A = win(f, came, filing), B = win(f, filing, lenders), C = on(f, lenders, 8)
  return (
    <g>
      <Stage id="ao" frame={f} />
      <Headline f={f} until={9e9} lines={[[y2020, '2020', P.ink, 130], [parked, 'PLANES PARKED', P.coralInk, 120], [borrowed, 'UNITED BORROWS AGAINST MILES'], [d219, 'MILEAGEPLUS: $21.9B', P.goldInk, 120], [d115, 'ALL OF UNITED: $11.5B', P.skyInk, 120], [twice, 'ALMOST TWICE', P.goldInk, 150], [seriously, 'LENDERS TOOK IT SERIOUSLY'], [d9, 'DELTA RAISES $9B', P.mintInk, 130], [believe, 'BACKED BY FUTURE MILES', P.ink, 104]]} />
      {/* # A: a row of parked planes; a falling ticket-sales line; United takes a loan with the MileagePlus vault as collateral */}
      <g opacity={A}>
        <g opacity={on(f, came, 6) * (1 - on(f, planes - 6, 8))} transform={`translate(960 600) scale(${pop(f, came) * 1.8})`}><Calendar x={0} y={0} text={f >= y2020 ? '2020' : ''} /></g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, planes + k * 4, 6) * (1 - on(f, united - 6, 8))}><Plane x={420 + k * 540} y={560 + k * 10} s={0.62} /><rect x={240 + k * 540} y={620 + k * 10} width={360} height={10} rx={5} fill={P.ink2} opacity={0.4} /></g>)}
        <g opacity={on(f, collapsed, 6) * (1 - on(f, united - 6, 8))}><path d={`M300 820 L700 840 L1000 ${lerp(860, 1010, on(f, collapsed, 14))}`} stroke={P.coral} strokeWidth={14} fill="none" strokeLinecap="round" /><Label x={1060} y={1000} text="TICKET SALES" size={50} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
        <g opacity={on(f, united, 6)} transform={`translate(560 600) scale(${pop(f, united) * 0.75})`}><Plane x={0} y={0} /><Label x={0} y={220} text="UNITED" size={110} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, cash, 6)} transform={`translate(560 360) scale(${pop(f, cash)})`}><Prop id="money-bag" x={0} y={0} size={170} f={f} /></g>
        <g opacity={on(f, mp, 6)} transform={`translate(1360 600) scale(${pop(f, mp)})`}><Prop id="vault-door" x={0} y={0} size={340} f={f} /><Label x={0} y={240} text="MILEAGEPLUS" size={72} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, borrowed, 6)}><path d="M800 600 L1140 600" stroke={P.goldInk} strokeWidth={10} strokeDasharray="20 14" /><Prop id="key" x={970} y={540} size={110} f={f} /></g>
      </g>
      {/* # B: a giant balance — the loyalty program vs the whole airline */}
      <g opacity={B}>
        <g transform={`rotate(${lerp(0, 10, on(f, twice, 24)) - lerp(0, 0, 0)} 960 600)`}>
          <rect x={360} y={592} width={1200} height={22} rx={11} fill={P.champ} />
          <g opacity={on(f, valued, 6)} transform={`translate(1360 470) scale(${pop(f, valued) * (1 + 0.1 * on(f, loyalty38, 8) * (1 - on(f, twice, 10)))})`}><circle r={150} fill={P.gold} opacity={0.22 * on(f, loyalty38, 8)} /><Prop id="vault-door" x={0} y={0} size={240} f={f} /><Label x={0} y={-150} text="$21.9B" size={96} font="Bebas Neue" color={P.goldInk} o={on(f, d219, 6)} /><Label x={0} y={230} text="MILEAGEPLUS" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, stock, 6)} transform={`translate(560 500) scale(${pop(f, stock)})`}><Plane x={0} y={0} s={0.55} /><Prop id="skyscraper" x={-130} y={-30} size={130} f={f} /><Label x={0} y={-130} text="$11.5B" size={96} font="Bebas Neue" color={P.skyInk} o={on(f, d115, 6)} /><Label x={0} y={200} text={f >= planes37 ? 'ALL OF UNITED, PLANES AND ALL' : 'ALL OF UNITED'} size={52} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <path d="M900 900 L960 620 L1020 900 Z" fill={P.champ} />
        <Label x={960} y={1010} text="UNITED'S OWN ESTIMATE vs. THE STOCK MARKET (JUNE 2020)" size={46} font="Bebas Neue" color={P.ink2} o={on(f, own, 6)} />
      </g>
      {/* # C: lenders hand Delta $9B, with SkyMiles as the collateral */}
      <g opacity={C}>
        <g transform={`translate(460 600) scale(${pop(f, lenders)})`}><BankB x={0} y={0} s={1} name="LENDERS" /></g>
        <g opacity={on(f, delta, 6)} transform={`translate(1460 560) scale(${pop(f, delta) * 0.7})`}><Plane x={0} y={0} /><Label x={0} y={220} text="DELTA" size={110} font="Bebas Neue" color={P.ink} /></g>
        {stream(f, d9, years, 9, { x: 640, y: 560 }, { x: 1300, y: 560 }, 160, () => <rect x={-46} y={-26} width={92} height={52} rx={8} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={4} />, 'od')}
        <g opacity={on(f, skymiles, 6)} transform={`translate(960 860) scale(${pop(f, skymiles)})`}><rect x={-230} y={-55} width={460} height={110} rx={55} fill={P.card} stroke={P.skyInk} strokeWidth={5} /><Mile x={-160} y={0} s={0.7} /><Label x={40} y={20} text="SKYMILES" size={64} font="Bebas Neue" color={P.skyInk} /></g>
        <g opacity={on(f, loans, 6) * (1 - on(f, believe, 8))} transform={`translate(960 400) rotate(-8) scale(${pop(f, loans)})`}><rect x={-140} y={-50} width={280} height={100} rx={12} fill="none" stroke={P.goldInk} strokeWidth={8} /><Label x={0} y={24} text="LOAN" size={72} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, years, 6)} transform="translate(960 380)">{[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, years + k * 3, 6)}><Calendar x={(k - 1.5) * 150} y={0} text={`${2021 + k}`} s={0.6} /></g>)}</g>
      </g>
      <Vignette id="ao" />
    </g>
  )
}

// ---------------------------------------------------------------- s41–s46: the catch — flying still matters; planes and miles feed each other; picture it half & half
const Catch: React.FC<PieceProps> = ({ f, c }) => {
  const not1 = c('s41:matter'), notAll = c('s41:not#2')
  const part42 = c('s42:part'), pays42 = c('s42:pays'), advance = c('s42:advance'), seats = c('s42:seats'), fly42 = c('s42:fly')
  const card43 = c('s43:card'), keeps = c('s43:keeps'), want = c('s43:want'), fly43 = c('s43:fly')
  const s43a = c('s43a'), costs = c('s43a:costs'), risks = c('s43a:risks'), fuel = c('s43a:fuel'), crews = c('s43a:crews'), planes = c('s43a:planes'), delay = c('s43a:delay')
  const feed = c('s44:feed'), stopped = c('s44a:stopped'), flying44 = c('s44a:flying'), miles44 = c('s44a:miles'), pull = c('s44a:pull'), less = c('s44a:less')
  const change = c('s45:change'), picture = c('s45:picture'), airline45 = c('s45:airline'), transport = c('s46:transport'), business46 = c('s46:business'), sells = c('s46:sells'), promises = c('s46:promises'), bank46 = c('s46:bank')
  const A = win(f, not1, s43a), B = win(f, s43a, feed), C = win(f, feed, change), D = on(f, change, 8)
  const spin = (f - feed) / 40
  return (
    <g>
      <Stage id="ak" frame={f} tint="teal" />
      <Headline f={f} until={9e9} lines={[[not1, 'DOES FLYING MATTER?', P.ink, 110], [notAll, 'FLYING STILL MATTERS', P.mintInk, 120], [advance, 'PART OF THE CASH IS AN ADVANCE', P.ink, 92], [keeps, 'IT ONLY LASTS IF PEOPLE FLY DELTA', P.ink, 88], [risks, 'THE COSTS & RISKS ARE IN FLYING', P.coralInk, 92],
        [feed, 'THEY FEED EACH OTHER', P.goldInk, 110], [pull, 'NO PULL → LESS FROM THE BANK', P.coralInk, 92], [picture, 'SO PICTURE AN AIRLINE AS…'], [transport, 'PART TRANSPORT COMPANY', P.skyInk, 104], [sells, 'PART PROMISE SELLER', P.goldInk, 110]]} />
      {/* # A: an IOU seat — Amex money arrives with a seat still to fly attached */}
      <g opacity={A}>
        <g transform={`translate(560 620) scale(${pop(f, not1) * 0.75 * (1 + 0.08 * on(f, fly43, 8))})`}><Plane x={0} y={0} /></g>
        <ellipse cx={560} cy={640} rx={300} ry={90} fill={P.sky} opacity={0.18 * on(f, fly43, 8)} />
        <g opacity={on(f, part42, 6)} transform={`translate(1320 520) scale(${pop(f, part42) * 0.36}) rotate(6)`}><Card x={0} y={0} label="AMEX" tint="#2A6FB0" /></g>
        {stream(f, pays42, seats + 30, 5, { x: 1200, y: 600 }, { x: 760, y: 600 }, 100, () => <rect x={-40} y={-24} width={80} height={48} rx={7} fill="#6FBF7A" stroke="#3E8A4E" strokeWidth={4} />, 'ka')}
        <g opacity={on(f, seats, 6)} transform={`translate(960 840) scale(${pop(f, seats)})`}><rect x={-230} y={-55} width={460} height={110} rx={18} fill={P.paper} stroke={P.edge} strokeWidth={3} /><Label x={0} y={20} text="SEATS STILL TO FLY" size={56} font="Bebas Neue" color={P.navy0} /></g>
        <g opacity={on(f, card43, 6) * on(f, want, 6)} transform="translate(560 860)"><Prop id="family" x={0} y={0} size={170} f={f} /></g>
      </g>
      {/* # B: the cost side — fuel, crews, planes, delays — each on its word */}
      <g opacity={B}>
        {[[Math.min(fuel, s43a + 20), 'gas-pump', 'FUEL'], [crews, 'family', 'CREWS'], [planes, 'airplane', 'PLANES'], [delay, 'clock', 'DELAYS']].map(([a, id, t], k) => (
          <g key={k} opacity={on(f, a as number, 6)} transform={`translate(${360 + k * 400} 600) scale(${pop(f, a as number)})`}>
            <circle r={150} fill={P.card} /><Prop id={id as string} x={0} y={-10} size={170} f={f} /><Label x={0} y={210} text={t as string} size={64} font="Bebas Neue" color={P.ink} /></g>
        ))}
      </g>
      {/* # C: two gears — planes and miles — turning each other; if the planes stop, the miles gear slows */}
      <g opacity={C}>
        {[[760, 620, 1, 'PLANES', P.sky], [1160, 620, -1, 'MILES', P.gold]].map(([x, y, d, t, col], k) => {
          const slow = f >= stopped ? 1 - 0.85 * on(f, stopped, 30) : 1
          return <g key={k} transform={`translate(${x} ${y})`}>
            <g transform={`rotate(${(d as number) * spin * 57 * slow + k * 15})`}>{Array.from({ length: 12 }, (_, i) => <rect key={i} x={-26} y={-230} width={52} height={70} rx={8} fill={col as string} transform={`rotate(${i * 30})`} />)}<circle r={180} fill={col as string} /><circle r={60} fill={P.navy0} /></g>
            <Label x={0} y={330} text={t as string} size={64} font="Bebas Neue" color={k === 0 && f >= flying44 && f < miles44 ? P.coralInk : k === 1 && f >= miles44 ? P.goldInk : P.ink} /></g>
        })}
        <g opacity={on(f, less, 6)} transform="translate(1560 420)"><Prop id="arrow-down" x={0} y={0} size={140} f={f} /><Label x={0} y={120} text="BANK PAYS LESS" size={48} font="Bebas Neue" color={P.coralInk} /></g>
      </g>
      {/* # D: the airline drawn in two halves — a plane (transport) and a bank card (promises) */}
      <g opacity={D}>
        <g transform={`translate(${lerp(960, 600, on(f, transport, 18))} 600) scale(${pop(f, change) * 0.8})`}><Plane x={0} y={0} /></g>
        <g opacity={on(f, airline45, 6) * (1 - on(f, transport, 8))} transform="translate(960 860)"><Prop id="magnifier" x={0} y={0} size={140} f={f} /></g>
        <g opacity={on(f, business46, 6)} transform={`translate(1360 600) scale(${pop(f, business46) * 0.5}) rotate(6)`}><Card x={0} y={0} tint="#2A6FB0" /></g>
        <g opacity={on(f, promises, 6)} transform="translate(1360 820)">{[0, 1, 2, 3, 4].map((k) => <Mile key={k} x={(k - 2) * 70} y={0} s={0.6} />)}</g>
        <g opacity={on(f, bank46, 6)} transform="translate(1720 560)"><Prop id="bank" x={0} y={0} size={140} f={f} /></g>
      </g>
      <Vignette id="ak" />
    </g>
  )
}

// ---------------------------------------------------------------- s47–s49 + end card: who bought your mile first · $8.2B > profit · the business behind the seat
const Payoff: React.FC<PieceProps> = ({ f, c, to }) => {
  const earn = c('s47:earn'), mile = c('s47:mile'), remember = c('s47:remember'), bought = c('s47:bought'), first = c('s47:first')
  const partnership = c('s48:partnership'), d82 = c('s48:82'), delta = c('s48:delta'), more = c('s48:more'), profit = c('s48:profit')
  const business = c('s49:business'), hiding = c('s49:hiding'), seat = c('s49:seat')
  const end = on(f, to - 70, 16)
  const A = win(f, earn, partnership), B = win(f, partnership, business), C = on(f, business, 8) * (1 - end)
  return (
    <g>
      <Stage id="ay" frame={f} />
      <Headline f={f} until={to - 70} lines={[[mile, 'YOUR NEXT MILE…', P.skyInk, 120], [bought, '…WAS BOUGHT BY A BANK FIRST', P.goldInk, 100], [d82, '$8.2 BILLION', P.goldInk, 150], [more, 'MORE THAN DELTA\'S PRE-TAX PROFIT', P.coralInk, 92], [hiding, 'THE BUSINESS BEHIND YOUR SEAT', P.ink, 100]]} />
      <g opacity={A}>
        <g transform={`translate(700 620) scale(${pop(f, earn) * 0.8}) rotate(-8)`}><Card x={0} y={0} label="DELTA AMEX" tint="#2A6FB0" /></g>
        <Mile x={lerp(960, 1220, on(f, mile, 20)) + lerp(0, 280, on(f, bought, 18))} y={lerp(560, 420, on(f, mile, 20))} s={pop(f, mile) * 2.2} />
        <g opacity={on(f, remember, 6)} transform={`translate(1500 640) scale(${pop(f, bought)})`}><BankB x={0} y={0} s={0.9} name={f >= first ? 'BOUGHT IT FIRST' : ''} /></g>
      </g>
      <g opacity={B}>
        <HBar x={260} y={420} w={1100 * on(f, d82, 16)} color={P.sky} label="AMEX → DELTA, 2025" value="$8.2B" vo={on(f, d82, 6)} o={on(f, partnership, 6)} />
        <HBar x={260} y={720} w={(1100 * 6.2 / 8.2) * on(f, profit, 16)} color={P.gold} label="DELTA'S PRE-TAX PROFIT, 2025" value="$6.2B" vo={on(f, profit, 6)} o={on(f, more, 6)} />
      </g>
      {/* # the seat in front of you: a seat back with a card pocket holding a Delta Amex card */}
      <g opacity={C}>
        <g transform={`translate(960 640) scale(${pop(f, business)})`}>
          <rect x={-260} y={-330} width={520} height={600} rx={70} fill={P.navy4} /><rect x={-210} y={-280} width={420} height={260} rx={24} fill={P.navy0} opacity={0.7} />
          <rect x={-200} y={60} width={400} height={170} rx={20} fill={P.navy3} />
          <g opacity={on(f, seat, 6)} transform="translate(0 40) scale(0.4) rotate(-4)"><Card x={0} y={0} label="DELTA AMEX" tint="#2A6FB0" /></g>
        </g>
      </g>
      <g opacity={end}><g transform={`translate(960 470) scale(${pop(f, to - 70, 16)}) translate(-960 -470)`}><svg x={860} y={370} width={200} height={200}><Emblem size={200} /></svg></g>
        <Label x={960} y={660} text="CAPITALCODE" size={72} font="Bebas Neue" color={P.ink} /><Label x={960} y={730} text="how the money actually works" size={44} weight={500} color={P.ink2} /></g>
      <Vignette id="ay" />
    </g>
  )
}

const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const AIRLINE = [
  makePiece('air-hook', 'Long: Amex paid Delta $8.2B — not for flights, for miles; $2B more than profit; what is an airline selling?', { mood: 'dark', Component: Hook,
    beats: [...beat('s1', ['american', 'paid', 'delta', '82']), ...beat('s2', ['not', 'flights', 'miles']), ...beat('s3', ['about', '2', 'more', 'profit', 'year']), ...beat('s4', ['so', 'airline', 'selling'])],
    sfx: [['s1:american', 'pop', 0.5], ['s1:82', 'impact', 0.6], ['s2:flights', 'crack', 0.4], ['s2:miles', 'chime', 0.5], ['s3:about', 'swish', 0.4], ['s3:profit', 'thud', 0.5], ['s4:selling', 'softpop', 0.5]] }),
  makePiece('air-chain', 'Long: wallet → card → miles; the bank bought them from Delta; miles → a seat', { mood: 'light', Component: Chain,
    beats: [...beat('s5', ['wallet', 'card']), ...beat('s6', ['pay', 'collect', 'miles']), ...beat('s7', ['bank', 'make', 'air', 'bought']), ...beat('s8', ['delta', 'sells', 'american', 'passes', 'reward']), ...beat('s9', ['months', 'trade', 'seat', 'fly'])],
    sfx: [['s5:card', 'pop', 0.4], ['s6:collect', 'coin', 0.5], ['s7:bank', 'whoosh', 0.4], ['s7:bought', 'impact', 0.5], ['s8:sells', 'cash', 0.4], ['s8:reward', 'chime', 0.4], ['s9:months', 'flutter', 0.4], ['s9:seat', 'ding', 0.5]] }),
  makePiece('air-promise', 'Long: a mile is a promise — paid now, flown later; marketing cost vs cash in advance; sold by the billion', { mood: 'light', Component: Promise,
    beats: [...beat('s10', ['mile', 'promise', 'small', 'future', 'sold', 'today', 'cash']), ...beat('s11', ['bank', 'pays', 'now', 'delivers', 'later']), ...beat('s11a', ['bank', 'marketing', 'airline', 'advance']), ...beat('s11b', ['points', 'statement', 'product', 'sell', 'billion'])],
    sfx: [['s10:promise', 'chime', 0.5], ['s10:cash', 'cash', 0.5], ['s11:later', 'whoosh', 0.4], ['s11a:marketing', 'pop', 0.4], ['s11a:advance', 'coin', 0.5], ['s11b:billion', 'impact', 0.5]] }),
  makePiece('air-billions', 'Long: $8.2B (+11%) · $22M a day · $4.1B in 2019 → roughly doubled', { mood: 'dark', Component: Billions,
    beats: [...beat('s12', ['that', 'become']), ...beat('s13', ['', 'money', 'delta', 'grew', '11', '82']), ...beat('s13a', ['22', 'single', 'day']), ...beat('s13b', ['back', 'partnership', '41']), ...beat('s13c', ['six', 'doubled'])],
    sfx: [['s13:money', 'cash', 0.5], ['s13:11', 'pop', 0.5], ['s13:82', 'impact', 0.6], ['s13a:22', 'coin', 0.5], ['s13b:41', 'tick', 0.4], ['s13c:doubled', 'riser', 0.5]] }),
  makePiece('air-share', 'Long: 13¢ of every revenue dollar · 1M+ new cards · $2B bigger than profit', { mood: 'light', Component: Share,
    beats: [...beat('s14', ['total', 'revenue', '634']), ...beat('s15', ['card', '13', 'dollar', 'brought']), ...beat('s16', ['million', 'signed', 'fourth', 'row']), ...beat('s17', ['put', 'profit']), ...beat('s18', ['profit', 'entire', '62']), ...beat('s19', ['payments', 'bigger', '2'])],
    sfx: [['s14:634', 'pop', 0.4], ['s15:13', 'swish', 0.5], ['s16:million', 'flutter', 0.5], ['s18:62', 'thud', 0.5], ['s19:2', 'impact', 0.6]] }),
  makePiece('air-whybank', 'Long: why the bank pays — one card for everything, swipe fees, annual fees, interest; both sides keep a customer', { mood: 'dark', Component: WhyBank,
    beats: [...beat('s20', ['much', 'miles']), ...beat('s21', ['', 'change', 'pay']), ...beat('s22', ['chasing', 'free', 'everyday', 'one']), ...beat('s23', ['tap', 'shop', 'fee', 'part', 'bank']), ...beat('s24', ['cardholders', 'annual', 'carry', 'interest']),
      ...beat('s25', ['bring', 'customers', 'spending', 'fees', 'interest', 'after']), ...beat('s26', ['bank', 'expects', 'worth', 'cost']), ...beat('s26a', ['gets', 'delta', 'bank', 'card'])],
    sfx: [['s21:change', 'softpop', 0.4], ['s22:one', 'whoosh', 0.4], ['s23:fee', 'pop', 0.5], ['s23:bank', 'coin', 0.5], ['s24:annual', 'tick', 0.4], ['s24:interest', 'tick', 0.4], ['s25:bring', 'swish', 0.4], ['s26:worth', 'thud', 0.5], ['s26a:card', 'chime', 0.4]] }),
  makePiece('air-price', 'Long: the airline sets the price — dynamic award pricing, no exchange rate, breakage', { mood: 'light', Component: Price,
    beats: [...beat('s27', ['attractive']), ...beat('s28', ['', 'decides', 'seat', 'costs']), ...beat('s29', ['prices', 'dynamically', 'flight', 'different', 'next']), ...beat('s29a', ['', 'exchange', 'negotiate']),
      ...beat('s30', ['needs', 'holding', 'quietly', 'less']), ...beat('s31', ['never', 'used']), ...beat('s32', ['forgotten', 'keeps', 'cash', 'anyone']), ...beat('s33', ['name', 'breakage'])],
    sfx: [['s28:decides', 'click', 0.5], ['s29:dynamically', 'glitch', 0.4], ['s29a:exchange', 'softpop', 0.4], ['s30:less', 'whoosh', 0.4], ['s31:never', 'tick', 0.4], ['s32:cash', 'cash', 0.4], ['s33:breakage', 'crack', 0.6]] }),
  makePiece('air-worth', 'Long: 2020 — MileagePlus $21.9B vs all of United $11.5B; Delta raises $9B on SkyMiles', { mood: 'dark', Component: Worth,
    beats: [...beat('s34', ['came', 'in', 'when', 'planes', 'parked', 'collapsed']), ...beat('s35', ['united', 'cash', 'borrowed', 'mileageplus']), ...beat('s36', ['filing', 'valued', '219']), ...beat('s37', ['stock', 'all', 'planes', '115']),
      ...beat('s38', ['own', 'loyalty', 'twice', 'entire']), ...beat('s39', ['lenders', 'seriously']), ...beat('s40', ['delta', '9', 'skymiles']), ...beat('s40a', ['loans', 'believe', 'years'])],
    sfx: [['s34:parked', 'thud', 0.5], ['s34:collapsed', 'whoosh', 0.4], ['s35:borrowed', 'click', 0.5], ['s36:219', 'impact', 0.6], ['s37:115', 'pop', 0.5], ['s38:twice', 'riser', 0.5], ['s40:9', 'cash', 0.6]] }),
  makePiece('air-catch', 'Long: the catch — flying still matters; the costs; planes and miles feed each other; part transport, part promise seller', { mood: 'light', Component: Catch,
    beats: [...beat('s41', ['matter', 'not#2']), ...beat('s42', ['part', 'pays', 'advance', 'seats', 'fly']), ...beat('s43', ['card', 'keeps', 'want', 'fly']), ...beat('s43a', ['', 'costs', 'risks', 'fuel', 'crews', 'planes', 'delay']),
      ...beat('s44', ['feed']), ...beat('s44a', ['stopped', 'flying', 'miles', 'pull', 'less']), ...beat('s45', ['change', 'picture', 'airline']), ...beat('s46', ['transport', 'business', 'sells', 'promises', 'bank'])],
    sfx: [['s41:not#2', 'ding', 0.5], ['s42:seats', 'pop', 0.4], ['s43a:fuel', 'tick', 0.4], ['s43a:delay', 'tick', 0.4], ['s44:feed', 'chime', 0.4], ['s44a:less', 'thud', 0.4], ['s46:transport', 'swish', 0.4], ['s46:promises', 'softpop', 0.5]] }),
  makePiece('air-payoff', 'Long: who bought your mile first · $8.2B > Delta\'s pre-tax profit · the business behind your seat', { mood: 'dark', Component: Payoff,
    beats: [...beat('s47', ['earn', 'mile', 'remember', 'bought', 'first']), ...beat('s48', ['partnership', '82', 'delta', 'more', 'profit']), ...beat('s49', ['business', 'hiding', 'seat'])],
    sfx: [['s47:mile', 'coin', 0.5], ['s47:first', 'pop', 0.5], ['s48:82', 'impact', 0.6], ['s48:profit', 'thud', 0.5], ['s49:seat', 'chime', 0.5]] }),
]
