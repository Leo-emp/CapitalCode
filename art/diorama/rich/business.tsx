// ---------------------------------------------------------------- s57–s64: way 8, start a business (golden afternoon, Leo's van).
// LEO TECH: a poster van, two technicians and a customer's house. Every hour the customer's $100 coin splits on the
// spoken numbers: $65 to the technician (pay, travel, tools), $35 to Leo — even while Leo is elsewhere. Two hour-counters
// run to 1,800 each → ≈ $126,000 PROFIT · BEFORE LEO'S TAXES. The technicians get steady pay; Leo carries a heavy RISK box.
// Then the risk: twenty shops that opened in 2013 — after 1 year 16 still lit (≈80%), after 5 years 10 (≈half), after 10
// years 7 (≈35%). The one that survived grows a WORTH MORE tag.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, WayBadge, Home, Coin, Building, Life, TXT, CREAM, ORANGE, RED, GOLD, GOLD2, MINT, INK, DEEP, TEAL, SAND, PLUM, SKYB, RUST } from './kit'

const GY = 960

const Van: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={20} cy={6} rx={260} ry={20} fill="rgba(30,20,30,0.22)" />
    <path d="M-240 -40 L-240 -250 L120 -250 L200 -160 L250 -150 L250 -40 Z" fill={TEAL} />
    <path d="M130 -236 L190 -164 L130 -164 Z" fill={SKYB} />
    <rect x={-240} y={-250} width={360} height={30} fill="#FFFFFF" opacity={0.15} />
    <text x={-60} y={-130} textAnchor="middle" fill={CREAM} style={TXT(62)}>LEO TECH</text>
    {[-140, 160].map((cx) => <g key={cx}><circle cx={cx} cy={-30} r={40} fill={INK} /><circle cx={cx} cy={-30} r={16} fill="#C9CED6" /></g>)}
  </g>
)
// # the order of the 20 shops' closing: which shop numbers are closed after 1, 5 and 10 years
const CLOSE1 = [3, 9, 14, 18], CLOSE5 = [0, 6, 11, 16, 19, 7], CLOSE10 = [2, 12, 15]

const Business: React.FC<PieceProps> = ({ f, c }) => {
  const start = c('s57:start'), business = c('s57:business')
  const madeup = c('s58:madeup'), grows = c('s58:grows'), hires = c('s58:hires'), two = c('s58:two')
  const customers = c('s59:customers'), d100 = c('s59:100'), d65 = c('s59:65'), tools = c('s59:tools')
  const keeps = c('s60:keeps'), d35 = c('s60:35'), isnt = c("s60:isn't"), himself = c('s60:himself')
  const d1800 = c('s61:1800'), d126 = c('s61:126000'), taxes = c('s61:taxes')
  const why = c('s62:why'), steady = c('s62:steady'), carries = c('s62:carries'), left = c("s62:what's")
  const risk = c('s63:risk'), y2013 = c('s63:2013'), d80 = c('s63:80'), half = c('s63:half'), d35b = c('s63:35'), ten = c('s63:ten')
  const survives = c('s64:survives'), worth = c('s64:worth'), profit = c('s64:profit')

  const leo: Beat[] = [[start, 'confident', 'smiling'], [hires, 'handshake', 'smiling'], [d35, 'receive', 'smiling'], [isnt, 'relax', 'smiling'], [d126, 'celebrate', 'smiling'], [carries, 'carryHeavy', 'worried'], [risk, 'nervous', 'worried'], [survives, 'confident', 'smiling']]
  const tech: Beat[] = [[two, 'waveA', 'smiling', 'waveB', 10], [customers, 'type', 'neutral'], [steady, 'thumbsUp', 'smiling'], [carries, 'idle', 'smiling']]
  const A = 1 - on(f, risk - 10, 8), B = on(f, risk - 2, 8)
  const split = on(f, d65, 18)
  const hrs = Math.round(1800 * on(f, d1800 - 20, 30))
  const leoAway = on(f, isnt, 20) * (1 - on(f, why, 12))
  const lh = hand(f, leo, 300 + lerp(0, -140, leoAway), GY + 40, 0.72)
  const closed = (k: number) => (CLOSE1.includes(k) ? on(f, d80, 10) : 0) || (CLOSE5.includes(k) ? on(f, half, 10) : 0) || (CLOSE10.includes(k) ? on(f, d35b, 10) : 0)

  return (
    <g>
      <PosterWorld f={f} id="rh-biz" tone="golden" sunX={1560} sunY={360} />
      <g opacity={on(f, c('s57:number') - 4, 10)}><WayBadge x={200} y={320} n={8} s={pop(f, c('s57:number'), 12)} col={ORANGE} /></g>
      {/* # A) the business and the split of each hour */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, business, 10)}><Van x={700} y={GY} s={0.95} /></g>
        <g opacity={on(f, customers, 10)}><Home x={1640} y={GY} s={0.75} col={SAND} roof={PLUM} /></g>
        <g opacity={on(f, two, 8)}><Person f={f} who="buyer" beats={tech} x={1060} y={GY + 40} s={0.6} /></g>
        <g opacity={on(f, two + 4, 8)}><Person f={f} who="investorF" beats={tech} x={1240} y={GY + 40} s={0.6} flip /></g>
        <g transform={`translate(${lerp(0, -140, leoAway)} 0)`}><Person f={f} who="worker" beats={leo} x={300} y={GY + 40} s={0.72} /></g>
        <g opacity={win(f, madeup, customers, 8)}><Ticket x={1060} y={330} t={f >= grows ? 'MADE-UP · THE SIDE WORK GROWS' : 'MADE-UP EXAMPLE'} size={46} col={CREAM} /></g>
        {/* the customer's $100 coin splits: 65 to the technician, 35 to Leo */}
        <g opacity={win(f, d100, d1800 - 10, 8)}>
          <g opacity={1 - on(f, d65, 6)}><Coin x={1400} y={500} s={2.4} t="$100" /></g>
          <g opacity={on(f, d65, 6)}><Coin x={lerp(1400, 1150, split)} y={lerp(500, 520, split)} s={2.1} t="$65" /></g>
          <g opacity={on(f, d65, 6)}><Coin x={lerp(1400, 640, on(f, d35, 20))} y={lerp(500, 520, on(f, d35, 20))} s={lerp(1.6, 1.9, on(f, d35, 20))} t="$35" /></g>
          <g opacity={on(f, tools, 8) * (1 - on(f, d35, 8))}><Ticket x={1150} y={390} t="PAY · TRAVEL · TOOLS" size={40} col={CREAM} /></g>
          <g opacity={on(f, d35, 8)}><Ticket x={640} y={390} t="LEO KEEPS $35 AN HOUR" size={44} col={GOLD} /></g>
          <g opacity={on(f, himself, 8)}><Ticket x={1150} y={390} t="EVEN WHILE HE’S AWAY" size={40} col={CREAM} /></g>
        </g>
        <g opacity={win(f, d1800 - 20, why, 8)} transform="translate(1150 540)">
          {[0, 1].map((k) => <g key={k} transform={`translate(${(k - 0.5) * 280} 0)`}><rect x={-120} y={-44} width={240} height={88} rx={16} fill={INK} /><text y={18} textAnchor="middle" fill={GOLD} style={TXT(54)}>{`${hrs.toLocaleString('en-US')} H`}</text></g>)}
        </g>
        <g opacity={win(f, d126, why, 8)}><Ticket x={640} y={390} t={f >= taxes ? '≈ $126,000 PROFIT · BEFORE HIS TAXES' : '≈ $126,000 PROFIT'} size={46} col={GOLD} /></g>
        {/* steady pay vs the risk box */}
        <g opacity={on(f, steady, 8)}><Ticket x={1150} y={390} t="STEADY PAY, NO RISK" size={44} col={MINT} tc={CREAM} /></g>
        <g opacity={on(f, carries, 10)} transform={`translate(${lh.x} ${lh.y})`}><rect x={-80} y={-60} width={160} height={120} rx={12} fill={RED} /><text y={18} textAnchor="middle" fill={CREAM} style={TXT(58)}>RISK</text></g>
        <g opacity={on(f, left, 8)}><Ticket x={640} y={390} t="LEO KEEPS WHAT’S LEFT" size={44} col={GOLD} /></g>
      </g>}
      {/* # B) twenty shops born in 2013, closing over the years */}
      {B > 0.001 && <g opacity={B}>
        {Array.from({ length: 20 }, (_, k) => { const col = k % 10, row = Math.floor(k / 10), s = closed(k)
          const big = k === 4 ? on(f, worth, 16) : 0
          return <g key={k} opacity={on(f, y2013 + k, 6) * (k === 4 ? 1 : 1 - on(f, survives, 10))}>
            <Building x={240 + col * 160} y={row ? GY : GY - 300} w={130} h={170 + 40 * big} s={1 + 0.25 * big} col={[SAND, CREAM, '#F6D2C2', '#CFE3E0'][k % 4]} shut={s} lit={1 - s} />
          </g> })}
        <g opacity={on(f, y2013, 8)}><Ticket x={960} y={330} t={f >= d35b ? 'AFTER 10 YEARS: ≈35% OPEN' : f >= half ? 'AFTER 5 YEARS: ≈ HALF OPEN' : f >= d80 ? 'AFTER 1 YEAR: ≈80% OPEN' : 'BUSINESSES OPENED IN 2013'} size={54} col={f >= d80 ? RED : CREAM} tc={f >= d80 ? CREAM : INK} o={1 - on(f, survives, 8)} /></g>
        <g opacity={on(f, worth, 8)}><Ticket x={960} y={330} t="WORTH MORE THAN ONE YEAR OF PROFIT" size={50} col={GOLD} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c('s59:hour')} x={1400} y={420} kind="glint" />
        <Life f={f} at={c('s62:risk')} x={300} y={500} kind="glint" />
        <Life f={f} at={ten} x={960} y={600} kind="glint" />
        <Life f={f} at={profit} x={880} y={500} kind="spark" />
        <Life f={f} at={c("s58:leo's")} x={620} y={780} kind="glint" />
        <Life f={f} at={c("s59:pay#2")} x={620} y={780} kind="glint" />
        <Life f={f} at={c("s60:work")} x={620} y={780} kind="glint" />
        <Life f={f} at={c("s61:each")} x={1150} y={660} kind="glint" />
        <Life f={f} at={c("s61:before")} x={1150} y={660} kind="glint" />
        <Life f={f} at={c("s63:american")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s63:a")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s63:years")} x={960} y={600} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-biz" />
      <Headline f={f} lines={[[start, 'START A BUSINESS', INK, 92], [risk, 'THE RISK IS REAL', INK, 92]]} />
    </g>
  )
}

export const RH_BUSINESS = makePiece('rh-business', 'Way 8 on a golden afternoon: a teal LEO TECH van, two technicians waving and a customer\'s house (MADE-UP · THE SIDE WORK GROWS); the customer\'s big $100 coin splits into a $65 coin for the technician (PAY · TRAVEL · TOOLS) and a $35 coin that flies to Leo (LEO KEEPS $35 AN HOUR, EVEN WHILE HE\'S AWAY as Leo steps aside); two hour counters run to 1,800 H each — ≈ $126,000 PROFIT · BEFORE HIS TAXES; the technicians give a thumbs up (STEADY PAY, NO RISK) while Leo lifts a heavy red RISK box (LEO KEEPS WHAT\'S LEFT); then twenty little shops that opened in 2013 go dark one by one with CLOSED signs — AFTER 1 YEAR ≈80% OPEN, AFTER 5 YEARS ≈ HALF OPEN, AFTER 10 YEARS ≈35% OPEN — and one surviving shop grows taller: WORTH MORE THAN ONE YEAR OF PROFIT.', {
  mood: 'light', Component: Business,
  beats: ["s57:start", "s57:business", "s58:madeup", "s58:grows", "s58:hires", "s58:two", "s59:customers", "s59:100", "s59:65", "s59:tools", "s60:keeps", "s60:35", "s60:isn't", "s60:himself", "s61:1800", "s61:126000", "s61:taxes", "s62:why", "s62:steady", "s62:carries", "s62:what's", "s63:risk", "s63:2013", "s63:80", "s63:half", "s63:35", "s63:ten", "s64:survives", "s64:worth", "s64:profit", "s57:number", "s59:hour", "s62:risk", "s58:leo's", "s59:pay#2", "s60:work", "s61:each", "s61:before", "s63:american", "s63:a", "s63:years"],
  sfx: [['s59:65', 'coin', 0.1], ['s61:126000', 'chime', 0.08], ['s63:80', 'thud', 0.08], ['s63:half', 'thud', 0.08]] })
