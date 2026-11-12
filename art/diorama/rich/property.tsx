// ---------------------------------------------------------------- s49–s56: way 7, buy property with borrowed money (golden suburb).
// One poster house ($417,500) stands on a plinth made of two blocks, to scale: Leo's small orange block (10%, $41,750)
// and the bank's big teal block ($375,750). The price rises 5%: a gold slab grows on the roof line (+$20,875), then slides
// down beside Leo's block — exactly half its height: +50% on his money, before costs. Then the reverse: the slab is cut
// out of Leo's block — he loses half, on paper. A dripping tap on the bank block: interest, 7.18%. Finally a see-saw:
// bigger result, good or bad.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, WayBadge, Home, Coin, Life, TXT, CREAM, ORANGE, RED, GOLD, GOLD2, MINT, INK, DEEP, TEAL, SAND, PLUM } from './kit'

const GY = 960
const W = 900, X0 = 960 - W / 2, BH = 150              // the plinth: 900 px = 417,500; block height 150
const LW = W * 0.1                                     // Leo's block: 10% = 90 px wide
const BANKX = 1250                                     // the bank, standing beside the plinth

const Property: React.FC<PieceProps> = ({ f, c }) => {
  const buy = c('s49:buy'), borrowed = c('s49:borrowed')
  const typical = c('s50:typical'), home = c('s50:home'), d4175 = c('s50:417500')
  const down = c('s51:down'), puts = c('s51:puts'), d41750 = c('s51:41750'), bank = c('s51:bank'), rest = c('s51:rest')
  const rises = c('s52:rises'), d5 = c('s52:5'), d20875 = c('s52:20875')
  const half = c('s53:half'), own = c('s53:own'), costs = c('s53:costs'), grew = c('s53:grew')
  const both = c('s54:both'), falls = c('s54:falls'), loses = c('s54:loses'), paper = c('s54:paper'), fast = c('s54:fast')
  const interest = c('s55:interest'), november = c('s55:november'), d718 = c('s55:718')
  const bigger = c('s56:bigger'), good = c('s56:good'), bad = c('s56:bad'), earns = c('s56:earns')

  const leo: Beat[] = [[buy, 'think', 'thinking'], [puts, 'offer', 'smiling'], [rises, 'pointUp', 'smiling'], [half, 'celebrate', 'smiling'], [falls, 'shock', 'shocked'], [loses, 'despair', 'worried'], [interest, 'scratchHead', 'worried'], [bigger, 'explain', 'thinking']]
  const A = 1 - on(f, bigger - 10, 8)
  const slab = win(f, rises, both, 10), slabUp = on(f, d5, 16)
  const slide = on(f, half, 24)                         // the gain slab slides down beside Leo's block
  const cut = on(f, loses, 18) * (1 - on(f, interest, 10))
  const lean = Math.sin(f / 14) * 12 * on(f, bigger, 12)

  return (
    <g>
      <PosterWorld f={f} id="rh-prop" tone="golden" sunX={340} sunY={360} />
      <g opacity={on(f, c('s49:number') - 4, 10)}><WayBadge x={200} y={320} n={7} s={pop(f, c('s49:number'), 12)} col={ORANGE} /></g>
      {A > 0.001 && <g opacity={A}>
        {/* the house on its plinth */}
        <g opacity={on(f, home, 10)}>
          <Home x={960} y={GY - BH} s={1.35} />
          <g opacity={on(f, d4175, 8)}><Ticket x={960} y={330} t="TYPICAL US HOME · $417,500" size={52} col={CREAM} /></g>
        </g>
        {/* the two blocks: Leo 10%, bank 90% */}
        <g opacity={on(f, down, 10)}>
          <rect x={X0 + 6} y={GY - BH + 8} width={W} height={BH} fill="rgba(30,20,30,0.22)" />
          <rect x={X0} y={GY - BH + BH * 0.5 * cut} width={LW} height={BH * (1 - 0.5 * cut)} fill={ORANGE} />
          {cut > 0 && <rect x={X0} y={GY - BH} width={LW} height={BH * 0.5 * cut} fill={RED} opacity={0.35 * (1 - 0.6 * cut)} />}
          <g opacity={on(f, bank, 10)}><rect x={X0 + LW} y={GY - BH} width={W - LW} height={BH} fill={TEAL} /><text x={X0 + LW + (W - LW) / 2} y={GY - BH / 2 + 18} textAnchor="middle" fill={CREAM} style={TXT(56)}>{f >= rest ? 'BANK LOAN · $375,750' : 'BANK'}</text></g>
          <text x={X0 + LW / 2} y={GY - BH - 16} textAnchor="middle" fill={ORANGE} style={TXT(40)}>LEO</text>
        </g>
        <g opacity={win(f, d41750, rises, 8)}><Ticket x={440} y={470} t="LEO PUTS IN $41,750" size={46} col={ORANGE} tc={CREAM} /></g>
        <g opacity={win(f, down, d41750, 8)}><Ticket x={440} y={470} t="10% DOWN" size={50} col={ORANGE} tc={CREAM} /></g>
        {/* +5%: a gold slab on the whole plinth, then it slides down beside Leo's block */}
        {slab > 0.001 && <g opacity={slab}>
          <rect x={lerp(X0, X0 - LW - 20, slide)} y={lerp(GY - BH - 20 - 22 * slabUp, GY - BH * 0.5, slide)} width={lerp(W, LW, slide)} height={lerp(22 * slabUp, BH * 0.5, slide)} fill={GOLD} stroke={GOLD2} strokeWidth={3} />
          <g opacity={win(f, d20875, half, 8)}><Ticket x={1560} y={560} t="PRICE +5% = +$20,875" size={48} col={GOLD} /></g>
          <g opacity={on(f, half, 8)}><Ticket x={440} y={470} t="+50% OF LEO’S MONEY" size={50} col={GOLD} /></g>
          <g opacity={on(f, costs, 8)}><Ticket x={480} y={560} t="BEFORE ANY COSTS" size={40} col={CREAM} /></g>
          <g opacity={on(f, grew, 8)}><Ticket x={1560} y={560} t="THE BANK’S PART GREW FOR HIM" size={40} col={CREAM} /></g>
        </g>}
        {/* −5%: half of Leo's block is cut away */}
        <g opacity={win(f, falls, interest, 8)}><Ticket x={1560} y={560} t="PRICE −5% = −$20,875" size={48} col={RED} tc={CREAM} /></g>
        <g opacity={win(f, loses, interest, 8)}><Ticket x={440} y={470} t={f >= paper ? 'LEO LOSES HALF · ON PAPER' : 'LEO LOSES HALF'} size={48} col={RED} tc={CREAM} /></g>
        {/* interest drips from the bank part the whole time */}
        <g opacity={on(f, interest, 10)}>
          <g transform={`translate(${X0 + W - 60} ${GY - BH - 10})`}><rect x={-14} y={-60} width={28} height={60} fill="#8E949C" /><rect x={-50} y={-80} width={100} height={26} rx={10} fill="#8E949C" /><path d="M14 -40 L60 -40 L60 -10" stroke="#8E949C" strokeWidth={22} fill="none" /></g>
          {[0, 1].map((k) => { const p = ((f - interest + k * 15) % 30) / 30; return <Coin key={k} x={X0 + W} y={GY - BH + 10 + 120 * p} s={0.5} o={1 - p} /> })}
          <g opacity={on(f, d718, 8)}><Ticket x={1560} y={560} t={f >= november ? '30-YEAR RATE 7.18% · NOV 2026' : 'INTEREST'} size={44} col={CREAM} /></g>
        </g>
        <Person f={f} who="worker" beats={leo} x={210} y={GY + 40} s={0.7} />
      </g>}
      {/* # the see-saw: bigger result, good or bad */}
      <g opacity={on(f, bigger - 2, 8)}>
        <Person f={f} who="worker" beats={leo} x={420} y={GY + 40} s={0.78} />
        <g transform={`translate(1100 ${GY})`}>
          <path d="M-60 0 L0 -110 L60 0 Z" fill={DEEP} />
          <g transform={`translate(0 -110) rotate(${lean})`}>
            <rect x={-420} y={-20} width={840} height={30} rx={10} fill="#8A5A3C" />
            <g opacity={on(f, good, 8)}><Ticket x={-300} y={-40} t="GOOD" size={60} col={MINT} tc={CREAM} /></g>
            <g opacity={on(f, bad, 8)}><Ticket x={300} y={-40} t="BAD" size={60} col={RED} tc={CREAM} /></g>
          </g>
        </g>
        <g opacity={on(f, bigger, 8)}><Ticket x={1100} y={420} t="BORROWING MAKES IT BIGGER" size={50} col={CREAM} /></g>
        <g opacity={on(f, earns, 8)}><Life f={f} at={earns} x={1100} y={600} kind="spark" /></g>
      </g>
      {/* # life:begin */}
      <g>
        <Life f={f} at={typical} x={960} y={540} kind="glint" />
        <Life f={f} at={own} x={X0 - 50} y={GY - 80} kind="glint" />
        <Life f={f} at={fast} x={X0 + 40} y={GY - 120} kind="glint" />
        <Life f={f} at={c("s50:2026")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s51:10")} x={960} y={880} kind="glint" />
        <Life f={f} at={c("s51:with")} x={960} y={880} kind="glint" />
        <Life f={f} at={c("s51:and")} x={960} y={880} kind="glint" />
        <Life f={f} at={c("s52:more")} x={960} y={880} kind="glint" />
        <Life f={f} at={c("s55:time")} x={1350} y={760} kind="glint" />
        <Life f={f} at={c("s55:30year")} x={1350} y={760} kind="glint" />
        <Life f={f} at={c("s56:borrowing")} x={1100} y={700} kind="glint" />
        <Life f={f} at={c("s56:owner")} x={1100} y={700} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-prop" />
      <Headline f={f} lines={[[buy, 'BUY PROPERTY WITH BORROWED MONEY', INK, 84], [bigger, 'GOOD OR BAD, BIGGER', INK, 88]]} />
    </g>
  )
}

export const RH_PROPERTY = makePiece('rh-property', 'Way 7 in a golden suburb: one poster house (TYPICAL US HOME · $417,500) stands on a plinth of two blocks to scale — Leo\'s small orange 10% block (10% DOWN, LEO PUTS IN $41,750) and the bank\'s big teal block (BANK LOAN · $375,750); the price rises 5% and a gold slab grows along the whole plinth (PRICE +5% = +$20,875), then slides down beside Leo\'s block, exactly half its height (+50% OF LEO\'S MONEY, BEFORE ANY COSTS, THE BANK\'S PART GREW FOR HIM); then half of Leo\'s block is cut away (PRICE −5% = −$20,875, LEO LOSES HALF · ON PAPER); a tap on the bank block drips coins (30-YEAR RATE 7.18% · NOV 2026); finally a see-saw rocks between GOOD and BAD: BORROWING MAKES IT BIGGER.', {
  mood: 'light', Component: Property,
  beats: ["s49:buy", "s49:borrowed", "s50:typical", "s50:home", "s50:417500", "s51:down", "s51:puts", "s51:41750", "s51:bank", "s51:rest", "s52:rises", "s52:5", "s52:20875", "s53:half", "s53:own", "s53:costs", "s53:grew", "s54:both", "s54:falls", "s54:loses", "s54:paper", "s54:fast", "s55:interest", "s55:november", "s55:718", "s56:bigger", "s56:good", "s56:bad", "s56:earns", "s49:number", "s50:2026", "s51:10", "s51:with", "s51:and", "s52:more", "s55:time", "s55:30year", "s56:borrowing", "s56:owner"],
  sfx: [['s52:20875', 'coin', 0.1], ['s54:loses', 'thud', 0.1]] })
