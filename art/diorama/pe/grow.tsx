// ---------------------------------------------------------------- s40–s59: step three, grow it, then sell it.
// A) Sunny Pizza glows; a few calendar pages; four ways to grow the profits, one at a time on the right: new shops pop
//    up, scissors cut a cost bill, the menu price tag flips up, a small rival shop slides in and joins the chain.
// B) Five years; a buyer pays $150M (one tall column). The blue $70M top slides off to the lenders; $80M stays for the
//    fund; five small $3M coins (one per year) add $15M; IN $30M vs BACK $95M — more than 3×.
// C) Side by side, WITH LOAN (30 → 95) and NO LOAN: $100M in, five $10M coins of profit, the same $150M sale → $200M, 2×.
// D) Debt is a magnifying glass: a gold pile grows under it; then a red loss arrow grows too.
// E) The bad case, same two panels: the sale is only $70M. With the loan all of it goes to the lenders and the fund keeps
//    $15M of $30M (half lost); with no loan $70M + $50M = $120M of $100M, still ahead.
// F) Winners bigger, losers worse — and the firm itself? Its tower with a question coin.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { NoMark, Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { DEBT, DEBT_D, EQ, EQ_D, FirmHQ, Glass, Lender, MiniShop, MoneyColumn, PizzaShop, PriceTag, YearStrip } from './kit'

const GROUND = 930
const GREEN = '#3DBE84', GREEN_D = '#23935F', RED = '#E5634F', RED_D = '#B7402F'

// # scissors (cut costs)
const Scissors: React.FC<{ x: number; y: number; s?: number; open?: number }> = ({ x, y, s = 1, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${-12 - 14 * open})`}><rect x={0} y={-10} width={170} height={20} rx={10} fill="#C9D3E0" /><circle cx={-40} cy={0} r={34} fill="none" stroke="#E5634F" strokeWidth={14} /></g>
    <g transform={`rotate(${12 + 14 * open})`}><rect x={0} y={-10} width={170} height={20} rx={10} fill="#AEB9C8" /><circle cx={-40} cy={0} r={34} fill="none" stroke="#E5634F" strokeWidth={14} /></g>
    <circle r={9} fill="#5C6F8E" />
  </g>
)
// # a bill of costs that gets snipped in two
const CostBill: React.FC<{ x: number; y: number; cut?: number }> = ({ x, y, cut = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <g transform={`translate(${-30 * cut} ${40 * cut}) rotate(${-8 * cut})`}><rect x={-160} y={-110} width={160} height={220} rx={8} fill="var(--cc-paper, #FFFFFF)" stroke="#CDB58C" strokeWidth={3} />{[0, 1, 2, 3].map((k) => <rect key={k} x={-140} y={-80 + k * 44} width={110} height={12} rx={6} fill="#C9B79A" />)}</g>
    <g transform={`translate(${30 * cut} ${60 * cut}) rotate(${10 * cut})`}><rect x={0} y={-110} width={160} height={220} rx={8} fill="var(--cc-paper, #FFFFFF)" stroke="#CDB58C" strokeWidth={3} />{[0, 1, 2, 3].map((k) => <rect key={k} x={20} y={-80 + k * 44} width={110} height={12} rx={6} fill="#C9B79A" />)}</g>
    <text y={-130} textAnchor="middle" fill="var(--cc-coral, #D9483A)" style={{ font: '400 50px "Bebas Neue"' }}>COSTS</text>
  </g>
)
// # a row of small coins (one per year) with a value on each
const YearCoins: React.FC<{ x: number; y: number; n: number; shown: number; t: string; gap?: number; s?: number }> = ({ x, y, n, shown, t, gap = 84, s = 0.85 }) => (
  <g>{Array.from({ length: n }, (_, k) => { const o = Math.max(0, Math.min(1, shown - k)); return o > 0 ? <g key={k} opacity={o} transform={`translate(${x + k * gap} ${y - 20 * (1 - o)})`}><Coin x={0} y={0} s={s} text="" /><text y={12} textAnchor="middle" fill="#16294A" style={{ font: '400 34px "Bebas Neue"' }}>{t}</text></g> : null })}</g>
)
// # a result badge
const Badge: React.FC<{ x: number; y: number; t: string; col: string; o?: number; s?: number }> = ({ x, y, t, col, o = 1, s = 1 }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><rect x={-Math.max(150, t.length * 17 + 40)} y={-52} width={2 * Math.max(150, t.length * 17 + 40)} height={104} rx={52} fill={col} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 66px "Bebas Neue"' }}>{t}</text></g>
)

const Grow: React.FC<PieceProps> = ({ f, c }) => {
  const make40 = c('s40:make'), worth40 = c('s40:worth'), sell40 = c('s40:sell')
  const plans = c('s41:plans'), few = c('s41:few'), years41 = c('s41:years')
  const grow42 = c('s42:grow'), open42 = c('s42:open'), cut = c('s42:cut'), raise = c('s42:raise'), prices = c('s42:prices'), buy42 = c('s42:buy'), rivals = c('s42:rivals'), join = c('s42:join')
  const back43 = c('s43:back'), opens43 = c('s43:opens'), five43 = c('s43:five'), later43 = c('s43:later'), sells43 = c('s43:sells'), d150 = c('s43:150')
  const comes44 = c('s44:comes'), step44 = c('s44:step')
  const d70 = c('s45:70'), paid45 = c('s45:paid'), lenders45 = c('s45:lenders')
  const leaves = c('s46:leaves'), d80 = c('s46:80'), fund46 = c('s46:fund')
  const add47 = c('s47:add'), d3 = c('s47:3'), each47 = c('s47:each'), five47 = c('s47:five'), d15 = c('s47:15')
  const put48 = c('s48:put'), d30 = c('s48:30'), d95 = c('s48:95'), three48 = c('s48:three')
  const picture = c('s49:picture'), noloan49 = c('s49:no')
  const full50 = c('s50:full'), d100 = c('s50:100')
  const noint = c('s51:no'), keeps = c('s51:keeps'), d10 = c('s51:10'), d50 = c('s51:50')
  const sells52 = c('s52:sells'), d150b = c('s52:150'), total52 = c('s52:total'), d200 = c('s52:200'), two52 = c('s52:two')
  const same53 = c('s53:same'), loan53 = c('s53:loan'), two53 = c('s53:two'), three53 = c('s53:three')
  const engine = c('s54:engine'), debt54 = c('s54:debt'), winners54 = c('s54:winners'), bigger54 = c('s54:bigger')
  const magnifying = c('s55:magnifying'), losses = c('s55:losses'), bigger55 = c('s55:bigger')
  const struggles = c('s56:struggles'), five56 = c('s56:five'), only56 = c('s56:only'), d70c = c('s56:70')
  const loan57 = c('s57:loan'), d70d = c('s57:70'), lenders57 = c('s57:lenders'), keeps57 = c('s57:keeps'), d15b = c('s57:15'), lost = c('s57:lost'), half = c('s57:half')
  const noloan58 = c('s58:no'), d70e = c('s58:70'), d50b = c('s58:50'), d120 = c('s58:120'), ahead = c('s58:ahead')
  const winners59 = c('s59:winners'), losers59 = c('s59:losers'), question = c('s59:question'), firm59 = c('s59:firm'), paid59 = c('s59:paid')

  const AB = back43 - 8, BC = picture - 8, CD = engine - 8, DE = struggles - 8, EF = winners59 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = on(f, EF, 10)

  // # B) the sale column: 80 gold + 70 blue on top; on "70 … paid back" the blue part slides to the lenders
  const toLenders = on(f, paid45, 24)
  const result = on(f, put48, 16)          // # B transforms into IN vs BACK
  const UE = 3.6                           // # px per $1M in the bad-case panels
  const U = 2.3                            // # px per $1M in the side-by-side panels
  return (
    <g>
      <Stage id="pe-grow" frame={f} />
      <Headline f={f} lines={[[make40, 'MAKE IT WORTH MORE, THEN SELL', P.ink, 98], [grow42, 'GROW THE PROFITS', P.ink, 106], [back43, 'SUNNY PIZZA, FIVE YEARS ON', P.ink, 100], [comes44, 'HOW THE MONEY COMES BACK', P.ink, 100], [put48, 'MORE THAN 3× THE MONEY', P.mintInk, 104], [picture, 'NOW: NO LOAN AT ALL', P.ink, 104], [same53, 'SAME CHAIN, SAME SALE', P.ink, 104], [engine, 'DEBT MAKES WINNERS BIGGER', P.ink, 100], [losses, '…AND LOSSES BIGGER', P.coralInk, 104], [struggles, 'IF IT SELLS FOR ONLY $70M', P.coralInk, 100], [winners59, 'WHO GETS PAID?', P.ink, 106]]} />
      <Ground y={GROUND} />

      {/* # A) grow the profits */}
      {A > 0 && <g opacity={A}>
        <PizzaShop x={560} y={GROUND} s={0.9} f={f} glow={0.6 + 0.4 * on(f, worth40, 12)} />
        <g opacity={win(f, worth40, grow42, 8)}><PriceTag x={140} y={420} t={f >= sell40 ? 'FOR SALE LATER' : 'WORTH MORE'} s={0.9} r={-4} /></g>
        <g opacity={win(f, plans, grow42, 8)}><YearStrip x={1380} y={520} n={4} shown={lerp(0, 4, span(f, few, years41 + 16))} label={() => ''} gap={110} /></g>
        {/* 1. new shops */}
        <g opacity={win(f, open42, cut, 8)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, open42 + k * 4, 8)} transform={`translate(0 ${30 * (1 - pop(f, open42 + k * 4, 12))})`}><MiniShop x={1130 + k * 260} y={GROUND} s={1.3} /></g>)}</g>
        {/* 2. cut costs */}
        <g opacity={win(f, cut, raise, 8)}><CostBill x={1400} y={640} cut={on(f, cut + 6, 10)} /><g transform={`translate(${1400 - 40} ${640 - 160 + 80 * on(f, cut, 8)})`}><Scissors x={0} y={0} s={1.0} open={1 - on(f, cut + 6, 6)} /></g></g>
        {/* 3. raise prices: a menu tag flips from $12 to $13 */}
        <g opacity={win(f, raise, buy42, 8)}><PriceTag x={1180} y={600} t={f >= prices ? 'PIZZA $13' : 'PIZZA $12'} s={1.2} r={-6} col={f >= prices ? '#F4C95D' : '#FFFFFF'} />
          <g opacity={on(f, prices, 8)}><path d="M1700 680 l0 -120 l-36 36 M1700 560 l36 36" stroke={GREEN} strokeWidth={16} fill="none" strokeLinecap="round" /></g></g>
        {/* 4. buy a smaller rival and join it to the chain */}
        <g opacity={on(f, buy42, 8)} transform={`translate(${lerp(1600, 1100, on(f, join, 20))} 0)`}>
          <g transform={`translate(0 ${GROUND})`}><MiniShop x={0} y={0} s={1.25} /></g>
          <g opacity={1 - on(f, join, 12)}><Label x={0} y={GROUND + 70} text="RIVAL" size={46} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, join + 16, 8)}><Label x={880} y={GROUND + 70} text="ONE BIGGER CHAIN" size={46} font="Bebas Neue" color={P.mintInk} /></g>
      </g>}

      {/* # B) five years later, the sale, and how the money comes back */}
      {B > 0 && <g opacity={B}>
        {/* the chain, small on the left, until the money talk */}
        <g opacity={1 - on(f, comes44, 12)}>
          <PizzaShop x={440} y={GROUND} s={0.75} f={f} />
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, opens43 + k * 4, 8)}><MiniShop x={760 + k * 190} y={GROUND} s={0.9} /></g>)}
          <g opacity={on(f, five43, 6)}><YearStrip x={900} y={330} n={5} shown={lerp(0, 5, span(f, five43, later43 + 10))} gap={100} label={(i) => `Y${i + 1}`} /></g>
        </g>
        {/* the buyer pays $150M */}
        <g opacity={on(f, sells43, 10) * (1 - on(f, comes44, 10))}>
          <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [sells43, 'offer', 'smiling'], [comes44, 'idle', 'neutral']]} x={1770} y={GROUND} s={0.85} flip />
        </g>
        <g opacity={on(f, d150, 8)}>
          <MoneyColumn x={lerp(1450, 960, on(f, comes44, 18))} y={GROUND - 10} w={240} unit={2.9} grow={on(f, d150, 18)} labelSide="in" size={52}
            segs={[{ v: 80, col: EQ, colD: EQ_D, label: f >= d80 ? '$80M FUND' : '', lo: on(f, d80, 8), o: 1 - result },
              { v: 70, col: DEBT, colD: DEBT_D, label: f >= d70 ? '$70M LOAN' : '', lo: on(f, d70, 8), dx: 420 * toLenders, dy: 80 * 2.9 * toLenders, o: 1 - on(f, d80 + 10, 10) }]} />
          <g opacity={on(f, d150, 8) * (1 - on(f, d70, 8))}><Label x={lerp(1450, 960, on(f, comes44, 18))} y={GROUND - 150 * 2.9 - 50} text="$150M SALE" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* "one step at a time": a dashed cut line across the column where the loan part begins */}
        <g opacity={win(f, step44, d70 + 10, 8)}><line x1={800} x2={1120} y1={GROUND - 10 - 80 * 2.9} y2={GROUND - 10 - 80 * 2.9} stroke="#C94A3E" strokeWidth={8} strokeDasharray="20 12" /><Label x={1140} y={GROUND - 10 - 80 * 2.9 + 16} text="1" size={56} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
        <g opacity={on(f, lenders45, 10) * (1 - on(f, d80 + 10, 10))}><Lender x={1720} y={GROUND} s={0.7} /></g>
        {/* five $3M coins, one per year */}
        <g opacity={on(f, d3, 8) * (1 - result)}>
          <YearCoins x={1280} y={GROUND - 80 * 2.9 + 40} n={5} shown={lerp(0, 5, span(f, each47, five47 + 20))} t="$3M" />
          <g opacity={on(f, d15, 8)}><Label x={1450} y={GROUND - 80 * 2.9 - 50} text="+ $15M" size={56} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        {/* IN vs BACK */}
        <g opacity={result}>
          <MoneyColumn x={620} y={GROUND - 10} w={230} unit={4} labelSide="in" size={50} segs={[{ v: 30, col: EQ, colD: EQ_D, label: '$30M' }]} />
          <Label x={620} y={GROUND + 64} text="PUT IN" size={46} font="Bebas Neue" color={P.ink} />
          <MoneyColumn x={1180} y={GROUND - 10} w={230} unit={4} grow={on(f, d95, 18)} labelSide="in" size={50} segs={[{ v: 95, col: GREEN, colD: GREEN_D, label: '$95M' }]} />
          <Label x={1180} y={GROUND + 64} text="GOT BACK" size={46} font="Bebas Neue" color={P.ink} />
          <Badge x={1560} y={560} t="3× +" col={GREEN} o={on(f, three48, 8)} s={pop(f, three48, 12)} />
        </g>
      </g>}

      {/* # C) with a loan vs with no loan */}
      {Cw > 0 && <g opacity={Cw}>
        <rect x={956} y={300} width={8} height={GROUND - 300} rx={4} fill={P.ink2} opacity={0.35} />
        <Label x={480} y={270} text="WITH THE LOAN" size={56} font="Bebas Neue" color={P.ink} />
        <g opacity={on(f, noloan49, 8)}><Label x={1440} y={270} text="NO LOAN" size={56} font="Bebas Neue" color={P.ink} /></g>
        {/* left: 30 → 95 */}
        <MoneyColumn x={330} y={GROUND - 10} w={190} unit={U} labelSide="in" size={44} segs={[{ v: 30, col: EQ, colD: EQ_D, label: '$30M' }]} />
        <MoneyColumn x={630} y={GROUND - 10} w={190} unit={U} labelSide="in" size={44} segs={[{ v: 95, col: GREEN, colD: GREEN_D, label: '$95M' }]} />
        <Label x={330} y={GROUND + 64} text="IN" size={44} font="Bebas Neue" color={P.ink2} /><Label x={630} y={GROUND + 64} text="BACK" size={44} font="Bebas Neue" color={P.ink2} />
        <Badge x={330} y={380} t="3× +" col={GREEN} s={0.85 + 0.12 * win(f, three53, three53 + 30, 6)} />
        {/* right: 100 in; +50 profits; +150 sale = 200 */}
        <g opacity={on(f, d100, 8)}><MoneyColumn x={1290} y={GROUND - 10} w={190} unit={U} grow={on(f, d100, 16)} labelSide="in" size={44} segs={[{ v: 100, col: EQ, colD: EQ_D, label: '$100M' }]} /><Label x={1290} y={GROUND + 64} text="IN" size={44} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, keeps, 8)}>
          <MoneyColumn x={1600} y={GROUND - 10} w={190} unit={U} labelSide="in" size={44}
            segs={[{ v: 50, col: '#F4D58A', colD: EQ_D, label: f >= d50 ? '$50M' : '', lo: on(f, d50, 8), o: on(f, d10, 8) }, { v: 150, col: GREEN, colD: GREEN_D, label: '$150M SALE', o: on(f, d150b, 8), dy: -40 * (1 - on(f, d150b, 14)) }]} />
          <g opacity={win(f, d10, sells52, 8)}><YearCoins x={1430} y={GROUND - 190} n={5} shown={[d10, c('s51:million'), c('s51:year'), c('s51:is'), d50].filter((a) => f >= a).length} t="$10M" gap={80} s={0.8} /></g>
          <Label x={1600} y={GROUND + 64} text="BACK" size={44} font="Bebas Neue" color={P.ink2} />
          {/* "in total it gets back": a bracket runs up the whole column */}
          <g opacity={win(f, total52, two52 + 20, 6)}><path d={`M1715 ${GROUND - 10} h20 V${GROUND - 10 - 200 * U * on(f, total52, 20)} h-20`} fill="none" stroke={P.goldInk} strokeWidth={8} strokeLinejoin="round" /></g>
          {[0, 1, 2].map((k) => { const fl = fly(f, c('s52:gets') + k * 5, [1800, 380], [1600, GROUND - 10 - 200 * U], 16, 60); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.6} /> : null })}
          <g opacity={on(f, d200, 8)}><Label x={1600} y={GROUND - 200 * U - 34} text="$200M" size={56} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        {/* "with no interest to pay": the interest coin, crossed */}
        <g opacity={win(f, noint, d10 + 10, 8)}><Coin x={1445} y={560} s={1.4} /><Label x={1445} y={660} text="INTEREST" size={44} font="Bebas Neue" color={P.ink} /><NoMark x={1445} y={560} o={on(f, noint + 6, 8)} r={70} /></g>
        {/* "same chain, same sale price": both sales glow; the loan turns 2× into 3×+ */}
        <g opacity={win(f, same53, picture + 9999, 8) * (f >= same53 ? 1 : 0)}>
          <g opacity={win(f, c('s53:chain'), loan53, 6)}><MiniShop x={480} y={660} s={0.6} /><MiniShop x={1445} y={660} s={0.6} /></g>
          <rect x={525} y={GROUND - 10 - 95 * U - 14} width={210} height={95 * U + 18} rx={18} fill="none" stroke={P.gold} strokeWidth={8} opacity={win(f, c('s53:price'), loan53, 6)} />
          <rect x={1495} y={GROUND - 10 - 200 * U - 14} width={210} height={150 * U + 18} rx={18} fill="none" stroke={P.gold} strokeWidth={8} opacity={win(f, c('s53:price'), loan53, 6)} />
          <g opacity={on(f, loan53, 8)}><path d={`M1160 380 Q900 ${300 - 40 * on(f, loan53, 14)} 520 380`} fill="none" stroke={P.goldInk} strokeWidth={10} strokeDasharray="900" strokeDashoffset={900 * (1 - on(f, loan53, 24))} strokeLinecap="round" /></g>
        </g>
        <Badge x={1290} y={380} t="2×" col="#5C7FB0" o={on(f, two52, 8)} s={(0.85 + 0.12 * win(f, two53, two53 + 30, 6)) * pop(f, two52, 12)} />
      </g>}

      {/* # D) the magnifying glass: winners bigger, then losses bigger */}
      {D > 0 && <g opacity={D}>
        {(() => { const gx = lerp(560, 1360, on(f, magnifying, 24)), up = on(f, bigger54, 20), down = on(f, bigger55, 20)
          return <>
            <g transform={`translate(560 ${GROUND - 20}) scale(${1 + 0.6 * up})`}><path d="M-200 0 Q0 -260 200 0 Z" fill={EQ} stroke={EQ_D} strokeWidth={6} /><path d="M0 -150 l0 -110 l-34 34 M0 -260 l34 34" stroke={GREEN} strokeWidth={14} fill="none" strokeLinecap="round" opacity={on(f, winners54, 8)} /></g>
            <g opacity={on(f, losses, 8)} transform={`translate(1360 ${GROUND - 20}) scale(${1 + 0.6 * down})`}><path d="M-200 0 Q0 -200 200 0 Z" fill={RED} stroke={RED_D} strokeWidth={6} /><path d="M0 -260 l0 110 l-34 -34 M0 -150 l34 -34" stroke={RED_D} strokeWidth={14} fill="none" strokeLinecap="round" /></g>
            <g opacity={on(f, debt54, 8)}><Glass x={gx} y={430 + 12 * Math.sin(f / 10)} s={1.1} /><Label x={gx} y={260} text="DEBT" size={56} font="Bebas Neue" color={P.skyInk} /></g>
            <g opacity={on(f, winners54, 8)}><Label x={560} y={GROUND + 64} text="WINNERS" size={48} font="Bebas Neue" color={P.mintInk} /></g>
            <g opacity={on(f, losses, 8)}><Label x={1360} y={GROUND + 64} text="LOSERS" size={48} font="Bebas Neue" color={P.coralInk} /></g>
          </> })()}
      </g>}

      {/* # E) the bad case */}
      {E > 0 && <g opacity={E}>
        <g opacity={win(f, DE, loan57, 10)}>
          <PizzaShop x={960} y={GROUND} s={0.9} f={f} glow={0.2} />
          {/* a rain cloud over the shop */}
          <g transform={`translate(960 ${260 + 6 * Math.sin(f / 14)})`}><ellipse cx={-60} cy={0} rx={110} ry={60} fill="#8A97AA" /><ellipse cx={60} cy={-20} rx={120} ry={74} fill="#9DA9BA" />
            {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-120 + k * 48} y={60 + ((f * 6 + k * 23) % 70)} width={6} height={26} rx={3} fill="#5BCBFF" opacity={0.8} />)}</g>
          <g opacity={on(f, d70c, 8)}><PriceTag x={1330} y={560} t="SOLD: $70M" s={1.0} col="#F6B8AE" /></g>
        </g>
        <g opacity={on(f, loan57, 10)}>
          <rect x={956} y={300} width={8} height={GROUND - 300} rx={4} fill={P.ink2} opacity={0.35} />
          <Label x={480} y={270} text="WITH THE LOAN" size={56} font="Bebas Neue" color={P.ink} />
          {/* left: 70 → lenders; 15 left of 30 */}
          <MoneyColumn x={330} y={GROUND - 10} w={190} unit={UE} labelSide="in" size={44} segs={[{ v: 70, col: DEBT, colD: DEBT_D, label: '$70M', dx: lerp(0, -400, on(f, lenders57, 20)), o: 1 - on(f, lenders57 + 14, 8) }]} />
          <g opacity={on(f, keeps57, 8)}><MoneyColumn x={330} y={GROUND - 10} w={190} unit={UE} labelSide="in" size={44} segs={[{ v: 30, col: '#E8DCC2', colD: '#CDB58C', label: '$30M' }]} /><Label x={330} y={GROUND + 64} text="PUT IN" size={44} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, d15b, 8)}><MoneyColumn x={630} y={GROUND - 10} w={190} unit={UE} labelSide="in" size={44} segs={[{ v: 15, col: EQ, colD: EQ_D }]} /><Label x={630} y={GROUND - 15 * UE - 34} text="$15M" size={52} font="Bebas Neue" color={P.goldInk} /><Label x={630} y={GROUND + 64} text="KEPT" size={44} font="Bebas Neue" color={P.ink2} /></g>
          <Badge x={480} y={380} t="HALF LOST" col={RED} o={on(f, half, 8)} s={pop(f, half, 12)} />
          {/* right: 70 + 50 = 120 of 100 */}
          <g opacity={on(f, noloan58, 8)}>
            <Label x={1440} y={270} text="NO LOAN" size={56} font="Bebas Neue" color={P.ink} />
            <MoneyColumn x={1290} y={GROUND - 10} w={190} unit={UE} labelSide="in" size={44} segs={[{ v: 100, col: '#E8DCC2', colD: '#CDB58C', label: '$100M' }]} /><Label x={1290} y={GROUND + 64} text="PUT IN" size={44} font="Bebas Neue" color={P.ink2} /><Label x={1600} y={GROUND + 64} text="GOT BACK" size={44} font="Bebas Neue" color={P.ink2} />
            <MoneyColumn x={1600} y={GROUND - 10} w={190} unit={UE} labelSide="in" size={44}
              segs={[{ v: 70, col: GREEN, colD: GREEN_D, label: '$70M', o: on(f, d70e, 8) }, { v: 50, col: '#F4D58A', colD: EQ_D, label: '$50M', o: on(f, d50b, 8), dy: -30 * (1 - on(f, d50b, 12)) }]} />
            <g opacity={on(f, d120, 8)}><Label x={1600} y={GROUND - 120 * UE - 34} text="$120M" size={56} font="Bebas Neue" color={P.mintInk} /></g>
            <Badge x={1290} y={380} t="STILL AHEAD" col={GREEN} o={on(f, ahead, 8)} s={pop(f, ahead, 12)} />
          </g>
        </g>
        <g opacity={on(f, lenders57, 10) * (1 - on(f, keeps57, 10))}><Lender x={150} y={GROUND} s={0.5} /></g>
      </g>}

      {/* # F) winners bigger, losers worse; and the firm? */}
      {F > 0 && <g opacity={F}>
        <g opacity={1 - on(f, question, 12)}>
          <g transform={`translate(560 ${GROUND - 20}) scale(1.4)`}><path d="M-200 0 Q0 -260 200 0 Z" fill={EQ} stroke={EQ_D} strokeWidth={6} /></g>
          <g opacity={on(f, losers59, 8)} transform={`translate(1360 ${GROUND - 20}) scale(1.4)`}><path d="M-200 0 Q0 -200 200 0 Z" fill={RED} stroke={RED_D} strokeWidth={6} /></g>
        </g>
        <g opacity={on(f, question, 10)}>
          <FirmHQ x={760} y={GROUND} s={1.0} lit={0.8} />
          <g transform={`translate(1240 ${600 - 16 * pop(f, paid59, 12)})`}><circle r={90} fill={P.gold} stroke={P.goldD} strokeWidth={8} /><Label x={0} y={34} text="?" size={110} font="Bebas Neue" color="#16294A" /></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s41:years")} x={1380} y={520} rx={230} ry={70} />
        <Spot f={f} at={c("s42:tries")} x={560} y={760} rx={230} ry={170} />
        <Spot f={f} at={c("s43:say")} x={440} y={780} rx={200} ry={150} />
        <Spot f={f} at={c("s43:dollars")} x={1450} y={600} rx={150} ry={230} />
        <Spot f={f} at={c("s44:money")} x={960} y={600} rx={150} ry={230} />
        <Spot f={f} at={c("s44:time")} x={960} y={600} rx={150} ry={230} />
        <Spot f={f} at={c("s45:sale")} x={960} y={800} rx={150} ry={120} />
        <Spot f={f} at={c("s46:dollars")} x={960} y={800} rx={150} ry={120} />
        <Spot f={f} at={c("s46:fund")} x={960} y={800} rx={150} ry={120} />
        <Spot f={f} at={c("s47:that")} x={1450} y={700} rx={220} ry={80} />
        <Spot f={f} at={c("s48:so")} x={620} y={860} rx={140} ry={80} />
        <Spot f={f} at={c("s48:got")} x={1180} y={760} rx={140} ry={190} />
        <Spot f={f} at={c("s48:money")} x={1560} y={560} rx={160} ry={70} />
        <Spot f={f} at={c("s49:very")} x={480} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s49:all")} x={1440} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s50:full")} x={1290} y={800} rx={120} ry={140} />
        <Spot f={f} at={c("s50:itself")} x={1290} y={800} rx={120} ry={140} />
        <Spot f={f} at={c("s51:profit")} x={1600} y={740} rx={230} ry={70} />
        <Spot f={f} at={c("s51:each")} x={1600} y={740} rx={230} ry={70} />
        <Spot f={f} at={c("s51:five")} x={1600} y={850} rx={120} ry={80} />
        <Spot f={f} at={c("s52:then")} x={1600} y={600} rx={120} ry={200} />
        <Spot f={f} at={c("s52:million")} x={1600} y={600} rx={120} ry={200} />
        <Spot f={f} at={c("s52:dollars")} x={1600} y={500} rx={120} ry={120} />
        <Spot f={f} at={c("s53:money")} x={330} y={380} rx={160} ry={70} />
        <Spot f={f} at={c("s53:more")} x={330} y={380} rx={160} ry={70} />
        <Spot f={f} at={c("s54:real")} x={560} y={800} rx={230} ry={160} />
        <Spot f={f} at={c("s54:private")} x={560} y={800} rx={230} ry={160} />
        <Spot f={f} at={c("s55:works")} x={960} y={430} rx={160} ry={160} />
        <Spot f={f} at={c("s55:glass")} x={960} y={430} rx={160} ry={160} />
        <Spot f={f} at={c("s55:too")} x={1360} y={800} rx={230} ry={160} />
        <Spot f={f} at={c("s56:imagine")} x={960} y={760} rx={230} ry={170} />
        <Spot f={f} at={c("s56:five")} x={960} y={300} rx={230} ry={120} />
        <Spot f={f} at={c("s56:later")} x={960} y={300} rx={230} ry={120} />
        <Spot f={f} at={c("s56:million")} x={1330} y={560} rx={200} ry={80} />
        <Spot f={f} at={c("s57:all")} x={330} y={800} rx={140} ry={160} />
        <Spot f={f} at={c("s57:goes")} x={330} y={800} rx={140} ry={160} />
        <Spot f={f} at={c("s57:yearly")} x={630} y={860} rx={140} ry={80} />
        <Spot f={f} at={c("s57:leftovers")} x={630} y={860} rx={140} ry={80} />
        <Spot f={f} at={c("s58:profits")} x={1600} y={780} rx={130} ry={160} />
        <Spot f={f} at={c("s58:still")} x={1290} y={380} rx={200} ry={70} />
        <Spot f={f} at={c("s59:worse")} x={1360} y={800} rx={230} ry={160} />
        <Spot f={f} at={c("s59:raises")} x={960} y={600} rx={230} ry={160} />
        <Spot f={f} at={c("s59:itself")} x={760} y={700} rx={180} ry={230} />
      </g>
      {/* # spots:end */}
      <Vignette id="pe-grow" />
    </g>
  )
}

export const PE_GROW = makePiece('pe-grow', 'Step three: Sunny Pizza glows (worth more, sell later); four ways to grow profits one at a time — three new shops pop up, scissors snip a COSTS bill, the menu tag flips $12 → $13, a smaller rival shop slides in and joins (one bigger chain). Five years on: a buyer pays $150M (one tall column); the $70M blue top slides to the lenders, $80M stays for the fund, five $3M coins (one per year) add $15M; PUT IN $30M vs GOT BACK $95M, 3×+. Side by side: with the loan 30 → 95; no loan $100M in, five $10M coins ($50M) + the $150M sale = $200M, 2×. Debt is a magnifying glass: a gold winners pile grows, a red losers pile grows. Bad case: rain over the shop, SOLD $70M; with the loan the $70M slides to the lenders and $15M of $30M is left (HALF LOST); no loan $70M + $50M = $120M of $100M (STILL AHEAD). Then the firm tower and a question coin: who gets paid?', {
  mood: 'light', Component: Grow,
  beats: ["s40:worth", "s40:sell", "s41:plans", "s41:few", "s41:years", "s42:grow", "s42:open", "s42:cut", "s42:raise", "s42:prices", "s42:buy", "s42:rivals", "s42:join", "s43:back", "s43:opens", "s43:five", "s43:later", "s43:sells", "s43:150", "s44:comes", "s44:step", "s45:70", "s45:paid", "s45:lenders", "s46:leaves", "s46:80", "s47:3", "s47:each", "s47:five", "s47:15", "s48:put", "s48:95", "s48:three", "s49:picture", "s49:no", "s50:100", "s51:no", "s51:keeps", "s51:10", "s51:50", "s52:sells", "s52:150", "s52:total", "s52:200", "s52:two", "s53:same", "s53:loan", "s53:two", "s53:three", "s54:engine", "s54:debt", "s54:winners", "s54:bigger", "s55:magnifying", "s55:losses", "s55:bigger", "s56:struggles", "s56:70", "s57:loan", "s57:lenders", "s57:keeps", "s57:15", "s57:lost", "s57:half", "s58:no", "s58:70", "s58:50", "s58:120", "s58:ahead", "s59:winners", "s59:losers", "s59:question", "s59:paid", "s51:million", "s51:year", "s51:is", "s52:gets", "s53:chain", "s53:price", "s42:tries", "s43:say", "s43:dollars", "s44:money", "s44:time", "s45:sale", "s46:dollars", "s46:fund", "s47:that", "s48:so", "s48:got", "s48:money", "s49:very", "s49:all", "s50:full", "s50:itself", "s51:profit", "s51:each", "s51:five", "s52:then", "s52:million", "s52:dollars", "s53:money", "s53:more", "s54:real", "s54:private", "s55:works", "s55:glass", "s55:too", "s56:imagine", "s56:five", "s56:later", "s56:million", "s57:all", "s57:goes", "s57:yearly", "s57:leftovers", "s58:profits", "s58:still", "s59:worse", "s59:raises", "s59:itself"],
  sfx: [['s42:open', 'pop', 0.2], ['s42:cut', 'swish', 0.2], ['s42:prices', 'ding', 0.15], ['s42:join', 'whoosh', 0.2], ['s43:150', 'cash', 0.2], ['s45:paid', 'whoosh', 0.2], ['s48:three', 'chime', 0.2], ['s52:two', 'pop', 0.2], ['s55:losses', 'thud', 0.2], ['s57:half', 'thud', 0.25], ['s58:ahead', 'pop', 0.2]] })
