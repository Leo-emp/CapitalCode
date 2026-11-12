// ---------------------------------------------------------------- s29–s43: step two — the market maker earns the gap.
// A) The trading tower with Leo's order slip; "why would it pay?" — the slip goes in and coins come out ("makes
//    money filling it").
// B) One big two-price ladder (one object, owner r42): on "two prices" two bars appear — the cheapest seller above,
//    the best buyer below. Made-up round numbers: $100.04 and $100.00. The gap between them glows: the spread.
// C) The market maker slides into the gap. A line at $100.03 (where it sells to Leo, one cent under the seller's
//    price): price improvement, Leo saves $1 on 100 shares. A gavel: brokers' legal duty to seek the best price. A
//    second line at $100.01 (where it buys from sellers); the gold bracket between the lines: 2¢ a share = $2 on
//    Leo's order. A clock spins: over and over, all day.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { HSpot as Spot } from './kit'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground, Gavel } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Cent, Ladder, Slip, Tower } from './kit'

const GROUND = 920
const CX = 960, CY = 520, GAP = 320          // # the ladder: ask bar above CY-GAP/2, bid bar below CY+GAP/2
const yOf = (cents: number) => CY + GAP / 2 - (cents / 4) * GAP   // # a price between $100.00 and $100.04 → y in the gap

const Step2: React.FC<PieceProps> = ({ f, c }) => {
  const why = c('s29:why'), firm29 = c('s29:firm'), pay29 = c('s29:pay'), order29 = c('s29:order')
  const because = c('s30:because'), money30 = c('s30:money'), filling = c('s30:filling')
  const every31 = c('s31:every'), two = c('s31:two'), prices31 = c('s31:prices')
  const lowest = c('s32:lowest'), selling = c('s32:selling'), highest = c('s32:highest'), pay32 = c('s32:pay')
  const madeup = c('s33:madeup'), round = c('s33:round')
  const seller34 = c('s34:seller'), d4 = c('s34:4'), buyer34 = c('s34:buyer'), flat = c('s34:flat')
  const gap35 = c('s35:gap'), spread35 = c('s35:spread')
  const lives = c('s36:lives'), inside = c('s36:inside')
  const sells37 = c('s37:sells'), d3 = c('s37:3'), cent37 = c('s37:cent'), cheaper = c('s37:cheaper'), screen37 = c('s37:screen')
  const improvement = c('s38:improvement'), saves = c('s38:saves'), d1 = c('s38:1')
  const legal = c('s39:legal'), duty = c('s39:duty'), best39 = c('s39:best'), compete = c('s39:compete'), improvement39 = c('s39:improvement')
  const buys = c('s40:buys'), people = c('s40:people'), sell40 = c('s40:sell'), d1b = c('s40:1')
  const buying = c('s41:buying'), selling41 = c('s41:selling'), leaves = c('s41:leaves'), d2 = c('s41:2'), order41 = c("s41:order")
  const tiny = c('s42:tiny'), over = c('s42:over'), day = c('s42:day')
  const step43 = c('s43:step'), earns = c('s43:earns'), slice = c('s43:slice'), better43 = c('s43:better')
  const AB = every31 - 4
  const A = win(f, why - 30, AB), B = on(f, AB, 10)
  const mm = on(f, lives, 16)                  // # the market maker icon inside the gap
  return (
    <g>
      <Stage id="hd-step2" frame={f} />
      <Spot f={f} at={c("s31:every")} x={960} y={520} rx={320} ry={260} />
      <Spot f={f} at={c("s37:shares")} x={960} y={440} rx={300} ry={90} />
      <Spot f={f} at={c("s39:reasonably")} x={1650} y={800} rx={220} ry={160} />
      <Spot f={f} at={c("s41:buying")} x={960} y={600} rx={300} ry={90} />
      <Spot f={f} at={c("s41:share")} x={1220} y={520} rx={160} ry={160} />
      <Spot f={f} at={c("s43:leo")} x={250} y={700} rx={180} ry={260} />
      <Spot f={f} at={c("s32:selling")} x={960} y={300} rx={300} ry={80} />
      <Spot f={f} at={c("s32:pay")} x={960} y={720} rx={300} ry={80} />
      <Spot f={f} at={c("s33:round")} x={960} y={520} rx={320} ry={260} />
      <Spot f={f} at={c("s34:seller")} x={960} y={300} rx={300} ry={80} />
      <Spot f={f} at={c("s34:buyer")} x={960} y={720} rx={300} ry={80} />
      <Spot f={f} at={c("s37:leo")} x={960} y={440} rx={300} ry={90} />
      <Spot f={f} at={c("s37:screen")} x={960} y={300} rx={300} ry={80} />
      <Spot f={f} at={c("s39:better")} x={960} y={440} rx={300} ry={90} />
      <Spot f={f} at={c("s39:customers")} x={1650} y={800} rx={220} ry={160} />
      <Spot f={f} at={c("s39:improvement")} x={1260} y={400} rx={120} ry={120} />
      <Spot f={f} at={c("s40:sell")} x={1660} y={760} rx={160} ry={220} />
      <Spot f={f} at={c("s40:1")} x={960} y={600} rx={300} ry={90} />
      <Spot f={f} at={c("s41:selling")} x={960} y={440} rx={300} ry={90} />
      <Spot f={f} at={c("s41:order")} x={1220} y={520} rx={160} ry={160} />
      <Spot f={f} at={c("s43:slice")} x={1220} y={520} rx={160} ry={160} />
      <Spot f={f} at={c("s43:screen")} x={250} y={700} rx={180} ry={260} />
      <Headline f={f} lines={[[why, 'STEP 2: WHY PAY FOR YOUR ORDER?', P.ink, 92], [filling, 'IT EARNS MONEY FILLING IT', P.ink, 96], [two, 'EVERY STOCK HAS TWO PRICES', P.ink, 96], [madeup, 'MADE-UP ROUND NUMBERS', P.ink2, 88], [spread35, 'THE SPREAD: 4¢', P.goldInk, 104], [lives, '', P.ink], [improvement, 'PRICE IMPROVEMENT: LEO SAVES $1', P.ink, 92], [legal, 'A LEGAL DUTY: THE BEST PRICE', P.ink, 92], [buys, '', P.ink], [d2, 'IT KEEPS 2¢ A SHARE = $2', P.goldInk, 96], [over, 'OVER AND OVER, ALL DAY', P.ink, 96], [earns, 'A SLICE OF THE SPREAD', P.goldInk, 100]]} />

      {/* # A) why pay? because it earns filling the order */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Tower x={1100} y={GROUND} s={1.0} f={f} sign="MARKET MAKER" glow={on(f, money30, 8)} />
        {(() => { const fl = fly(f, order29 - 10, [420, 480], [1100, GROUND - 120], 26, 140); return <Slip x={fl.x} y={fl.y} s={0.8} o={1 - on(f, filling, 8)} /> })()}
        <g opacity={on(f, pay29, 8) * (1 - on(f, because, 8))}><text x={760} y={420} textAnchor="middle" fill={P.ink} style={{ font: '400 160px "Bebas Neue"' }}>?</text></g>
        {f >= money30 && [0, 1, 2].map((k) => { const fl = fly(f, money30 + k * 6, [1100, GROUND - 300], [1480 + k * 60, GROUND - 60], 20, 120); return <Cent key={k} x={fl.x} y={fl.y} r={28} t="$" /> })}
      </g>}

      {/* # B + C) the ladder: two prices, the spread, the market maker inside it */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <Ladder x={CX} y={CY} gap={GAP} sellO={0.3 * on(f, every31, 8) + 0.7 * on(f, two, 10)} buyO={0.3 * on(f, every31, 8) + 0.7 * on(f, two + 4, 10)} ask={f >= d4 ? '$100.04' : ''} bid={f >= flat ? '$100.00' : ''} spread={on(f, spread35, 10) * (1 - on(f, leaves, 8))} />
        {/* # the market maker lives in the gap (a small tower on the left of it) */}
        <g opacity={mm} transform={`translate(${lerp(1900, 1700, mm)} 0)`}><Tower x={0} y={GROUND} s={0.8} f={f} sign="MARKET MAKER" /></g>
        {/* # the hand-over: the market maker gives Leo 100 shares; Leo's money goes to the market maker */}
        {f >= sells37 && (() => { const fl = fly(f, sells37, [1640, GROUND - 240], [360, GROUND - 300], 24, 160); return <Slip x={fl.x} y={fl.y} s={1.0} text="100 SHARES" o={1 - on(f, d3 + 40, 10)} /> })()}
        {f >= d3 && [0, 1, 2].map((k) => { const fl = fly(f, d3 + k * 5, [330, GROUND - 300], [1640, GROUND - 260], 24, 160); return fl.t < 1 ? <Cent key={k} x={fl.x} y={fl.y} r={34} t="$" /> : null })}
        {/* # $100.03: where it sells to Leo */}
        <g opacity={on(f, d3, 8)}>
          <line x1={CX - 230} y1={yOf(3)} x2={CX + 230} y2={yOf(3)} stroke={P.coralD} strokeWidth={6} strokeDasharray="14 8" />
          <Label x={CX - 250} y={yOf(3) + 14} text="SELLS TO LEO $100.03" size={46} font="Bebas Neue" color={P.ink} anchor="end" />
        </g>
        {/* # one cent under the seller's price: the price improvement */}
        <g opacity={on(f, cent37, 8)}><path d={`M${CX + 250} ${yOf(4)} L${CX + 250} ${yOf(3)}`} stroke={P.mintInk} strokeWidth={8} /><Cent x={CX + 300} y={(yOf(4) + yOf(3)) / 2} r={26} t="1¢" /></g>
        {/* # Leo, getting his dollar back */}
        <g opacity={on(f, sells37 - 6, 10)}>
          <Person f={f} who="buyer" beats={[[0, 'idle', 'smiling'], [d3, 'receive', 'smiling'], [d3 + 14, 'offer', 'smiling'], [saves, 'receive', 'smiling']]} x={250} y={GROUND} s={0.7} />
          <Label x={250} y={GROUND + 60} text="LEO" size={40} font="Bebas Neue" color={P.ink2} />
          {f >= d1 && (() => { const fl = fly(f, d1, [CX + 300, (yOf(4) + yOf(3)) / 2], [390, GROUND - 260], 20, 120); return <Cent x={fl.x} y={fl.y} r={30} t="$1" /> })()}
        </g>
        {/* # the legal duty: a gavel */}
        <g opacity={on(f, legal, 8) * (1 - on(f, buys, 8))}><g transform={`translate(1380 ${CY + 120}) rotate(${lerp(-40, 10, on(f, duty, 6))})`}><Gavel x={0} y={0} s={1.2} /></g>
          <g transform={`translate(1380 ${CY + 290})`}><rect x={-130} y={-30} width={260} height={56} rx={12} fill={P.navy3} /><text x={0} y={10} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"' }}>BEST-PRICE DUTY</text></g></g>
        {/* # $100.01: where it buys from sellers */}
        <g opacity={on(f, buys, 8)}>
          <line x1={CX - 230} y1={yOf(1)} x2={CX + 230} y2={yOf(1)} stroke={P.skyD} strokeWidth={6} strokeDasharray="14 8" />
          <Label x={CX - 250} y={yOf(1) + 14} text="BUYS FROM SELLERS $100.01" size={46} font="Bebas Neue" color={P.ink} anchor="end" />
          <g opacity={on(f, people, 8)}><Mini look="worker" x={600} y={GROUND} scale={1.15} frame={f} seed={33} mood="happy" /><Label x={600} y={GROUND + 60} text="SELLER" size={36} font="Bebas Neue" color={P.ink2} /></g>
          {f >= sell40 && (() => { const fl = fly(f, sell40, [620, GROUND - 260], [1640, GROUND - 240], 24, 120); return fl.t < 1 ? <Slip x={fl.x} y={fl.y} s={0.8} text="SHARES" /> : null })()}
          {f >= d1b && (() => { const fl = fly(f, d1b, [1640, GROUND - 300], [620, GROUND - 300], 24, 120); return fl.t < 1 ? <Cent x={fl.x} y={fl.y} r={34} t="$" /> : null })()}
        </g>
        {/* # the 2-cent slice it keeps */}
        <g opacity={on(f, leaves, 8)}>
          <rect x={CX + 240} y={yOf(3)} width={40} height={yOf(1) - yOf(3)} rx={8} fill={P.gold} />
          <Label x={CX + 300} y={(yOf(1) + yOf(3)) / 2 + 16} text={f >= d2 ? '2¢ × 100 = $2' : '2¢'} size={46} font="Bebas Neue" color={P.goldInk} anchor="start" />
        </g>
        {/* # over and over, all day: a clock and a stream of cents into the market maker */}
        <g opacity={on(f, tiny, 8) * (1 - on(f, step43, 10))}>
          {[0, 1, 2, 3].map((k) => { const t = ((f - tiny + k * 10) % 40) / 40; return <Slip key={k} x={lerp(1880, 1500, t)} y={lerp(260 + k * 40, CY + 200, t)} s={0.35} o={Math.min(1, t * 6) * (1 - Math.max(0, t - 0.85) * 6)} /> })}
          {[0, 1, 2, 3].map((k) => { const t = ((f - over + k * 8) % 32) / 32; return f >= over ? <Cent key={k} x={lerp(CX + 260, 1700, t)} y={lerp((yOf(1) + yOf(3)) / 2, CY + 300, t)} r={14} o={Math.min(1, t * 5) * (1 - Math.max(0, t - 0.8) * 5)} /> : null })}
        </g>
      </g>}
      <Vignette id="hd-step2" />
    </g>
  )
}

const BEATS = ["s31:every", "s37:shares", "s39:reasonably", "s41:buying", "s41:share", "s43:leo", "s32:selling", "s32:pay", "s33:round", "s34:seller", "s34:buyer", "s37:leo", "s37:screen", "s39:better", "s39:customers", "s39:improvement", "s40:sell", "s40:1", "s41:selling", "s41:order", "s43:slice", "s43:screen", 's29:why', 's29:firm', 's29:pay', 's29:order', 's30:because', 's30:money', 's30:filling', 's31:two', 's32:lowest', 's32:highest', 's33:madeup', 's34:4', 's34:flat', 's35:gap', 's35:spread', 's36:lives', 's37:sells', 's37:3', 's37:cent', 's38:improvement', 's38:saves', 's38:1', 's39:legal', 's39:duty', 's39:compete', 's40:buys', 's40:people', 's41:leaves', 's41:2', 's42:tiny', 's42:over', 's43:step', 's43:earns']
export const HD_STEP2 = makePiece('hd-step2', 'PFOF long step 2: the market maker takes Leo\'s order and earns filling it; one big two-price ladder — cheapest seller $100.04 above, best buyer $100.00 below (made-up numbers), the 4¢ spread glows; the market maker in the gap sells to Leo at $100.03 (1¢ price improvement, Leo saves $1), a gavel for the legal duty to seek the best price, buys from sellers at $100.01, keeps 2¢ a share = $2; a clock: over and over, all day', {
  mood: 'light', Component: Step2, beats: BEATS,
  sfx: [['s30:money', 'coin', 0.25], ['s31:two', 'pop', 0.2], ['s35:spread', 'ding', 0.25], ['s37:3', 'pop', 0.2], ['s38:1', 'coin', 0.25], ['s39:duty', 'thud', 0.25], ['s41:2', 'cash', 0.25]] })
