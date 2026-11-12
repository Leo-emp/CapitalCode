// ---------------------------------------------------------------- s48–s53: how we got here, year by year.
// A paper hill road that climbs and dips with the 30-year mortgage rate, with a signpost at each sourced week
// (Freddie Mac PMMS): JAN 2021 2.65% (record low: little houses pop up with gold padlocks — bought or refinanced while
// money was cheap), EARLY 2022 (65% of loans below 4%), OCT 2023 7.79% (highest since 2000), FEB 2026 5.98%, then
// FALL 2026 7%+. A little paper car drives the road as each year is said. Finally a recent buyer (≈7%) shakes hands
// with the owner she bought from (≈3%).
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { DayWorld, House, Signpost, Padlock, Tag, Coin, Paper, Vig, TXT, INK, CORAL, MINT, MUSTARD, PAPER, ROOFS, WALLS, SLATE, Life } from './kit'

// # road points: x and the rate at that week (height ∝ rate)
const PTS: [number, number][] = [[180, 2.65], [560, 3.22], [980, 7.79], [1380, 5.98], [1740, 7.4]]
const ry = (r: number) => 980 - (r - 2) * 85
const road = PTS.map(([x, r], i) => `${i ? 'L' : 'M'}${x} ${ry(r)}`).join(' ')

const Car: React.FC<{ x: number; y: number; a: number }> = ({ x, y, a }) => (
  <g transform={`translate(${x} ${y}) rotate(${a})`}>
    <Paper d="M-60 -20 L-50 -46 L30 -46 L52 -20 L64 -20 L64 6 L-64 6 L-64 -20 Z" fill={CORAL} dx={3} dy={4} />
    <rect x={-40} y={-40} width={30} height={18} rx={3} fill="#BFE3F0" /><rect x={-4} y={-40} width={30} height={18} rx={3} fill="#BFE3F0" />
    <circle cx={-36} cy={8} r={13} fill={SLATE} /><circle cx={38} cy={8} r={13} fill={SLATE} />
  </g>
)

const History: React.FC<PieceProps> = ({ f, c }) => {
  const stuck = c('s48:stuck'), year48 = c('s48:year')
  const jan = c('s49:january'), d265 = c('s49:265'), bought = c('s49:bought'), refin = c('s49:refinanced'), cheap = c('s49:cheap')
  const early = c('s50:early'), d65 = c('s50:65'), below = c('s50:below')
  const climbed = c('s51:climbed'), oct = c('s51:october'), d779 = c('s51:779'), highest = c('s51:highest'), y2000 = c('s51:2000')
  const y2026 = c('s52:2026'), dipped = c('s52:dipped'), feb = c('s52:february'), back = c('s52:back'), fall = c('s52:fall')
  const recent = c('s53:recent'), higher = c('s53:higher'), owners = c('s53:owners'), paid = c('s53:paid')

  // # the car's progress along the road: one leg per milestone
  const legs = [jan, early, climbed, dipped, back]
  let seg = 0, t = 0
  for (let i = 0; i < PTS.length - 1; i++) { const p = on(f, legs[i + 1], 30); if (p > 0) { seg = i; t = p } }
  const [x0, r0] = PTS[seg], [x1, r1] = PTS[seg + 1]
  const cx = lerp(x0, x1, t), cy = lerp(ry(r0), ry(r1), t), ang = (Math.atan2(ry(r1) - ry(r0), x1 - x0) * 180) / Math.PI
  const fin = on(f, recent - 6, 12)
  const buyer: Beat[] = [[recent, 'idle', 'smiling'], [higher, 'handshake', 'smiling']]
  const seller: Beat[] = [[recent, 'idle', 'smiling'], [higher, 'handshake', 'smiling'], [paid, 'thumbsUp', 'smiling']]

  return (
    <g>
      <DayWorld f={f} id="re-history" />
      {/* # the road */}
      <g opacity={(1 - 0.75 * fin) * on(f, stuck - 6, 12)}>
        <path d={road + ` L1860 ${ry(7.18)} L1860 1120 L80 1120 L80 ${ry(2.65)} Z`} fill="#8FBF8F" opacity={0.6} />
        <path d={road} fill="none" stroke="#6D6A72" strokeWidth={46} strokeLinejoin="round" strokeLinecap="round" />
        <path d={road} fill="none" stroke="#F2E7C9" strokeWidth={5} strokeDasharray="30 24" strokeLinejoin="round" />
        {/* signposts at each sourced week */}
        <g opacity={on(f, jan, 8)}><Signpost x={180} y={ry(2.65) - 30} t="JAN 2021" sub={f >= d265 ? '2.65%' : undefined} s={0.9} col={MINT} /></g>
        <g opacity={on(f, early, 8)}><Signpost x={560} y={ry(3.22) - 30} t="EARLY 2022" sub={f >= d65 ? '65% < 4%' : undefined} s={0.9} /></g>
        <g opacity={on(f, oct, 8)}><Signpost x={980} y={ry(7.79) - 30} t="OCT 2023" sub={f >= d779 ? '7.79%' : undefined} s={0.9} col={CORAL} /></g>
        <g opacity={on(f, feb, 8)}><Signpost x={1380} y={ry(5.98) - 30} t="FEB 2026" sub="5.98%" s={0.9} /></g>
        <g opacity={on(f, fall, 8)}><Signpost x={1740} y={ry(7.4) - 30} t="FALL 2026" sub="7%+" s={0.9} col={CORAL} /></g>
        {/* 2021: houses bought or refinanced while money was cheap */}
        <g opacity={win(f, bought, early + 30, 8)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, bought + k * 4, 6)}>
          <House x={330 + k * 120} y={ry(2.65) + 120} s={0.24} roof={ROOFS[k]} wall={WALLS[k + 2]} />
          <g opacity={on(f, refin + k * 3, 6)}><Padlock x={330 + k * 120} y={ry(2.65) - 10} s={0.36} /></g>
        </g>)}</g>
        <g opacity={win(f, cheap, early, 6)}>{[0, 1, 2].map((k) => <Coin key={k} x={300 + k * 70} y={ry(2.65) - 170 - 20 * Math.sin(f / 6 + k)} s={0.8} />)}</g>
        <g opacity={win(f, highest, y2026, 8)}><Tag x={1480} y={330} t={f >= y2000 ? 'HIGHEST SINCE 2000' : 'HIGHEST IN YEARS'} size={44} col={CORAL} tc="#FFFFFF" /></g>
        <Car x={cx} y={cy - 26} a={ang} />
      </g>
      {/* # recent buyer meets the owner she bought from */}
      <g opacity={fin}>
        <Person f={f} who="investorF" beats={buyer} x={1100} y={1000} s={0.85} flip />
        <Person f={f} who="worker" beats={seller} x={820} y={1000} s={0.85} />
        <g opacity={on(f, higher, 8)}><Padlock x={1270} y={520} s={0.8} t="≈7%" col={CORAL} /></g>
        <g opacity={on(f, owners, 8)}><Padlock x={650} y={520} s={0.8} t="≈3%" col={MINT} /></g>
        <g opacity={on(f, paid, 8)}><Tag x={960} y={330} t="NEW BUYERS PAY FAR HIGHER RATES" size={48} /></g>
      </g>
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s49:rates")} x={560} y={700} kind="glint" />
        <Life f={f} at={c("s50:in")} x={560} y={700} kind="glint" />
        <Life f={f} at={c("s50:percent#2")} x={560} y={700} kind="glint" />
        <Life f={f} at={c("s51:average")} x={980} y={500} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="re-history" />
      <Headline f={f} lines={[[stuck, 'HOW THE STREET GOT STUCK', INK, 88], [year48, 'THE 30-YEAR RATE, YEAR BY YEAR', INK, 80]]} />
    </g>
  )
}

export const RE_HISTORY = makePiece('re-history', 'How we got here: a paper hill road that climbs and dips with the 30-year mortgage rate, with signposts at sourced weeks — JAN 2021 2.65% (little houses pop up and get gold padlocks: bought or refinanced while money was cheap, coins bouncing), EARLY 2022 65% < 4%, OCT 2023 7.79% (HIGHEST SINCE 2000), FEB 2026 5.98%, FALL 2026 7%+ — while a little red paper car drives each leg as the year is said; then a recent buyer with a ≈7% padlock shakes hands with the owner she bought from, whose padlock reads ≈3%: NEW BUYERS PAY FAR HIGHER RATES.', {
  mood: 'light', Component: History,
  beats: ["s48:stuck", "s49:january", "s49:265", "s49:bought", "s49:refinanced", "s49:cheap", "s50:early", "s50:65", "s50:below", "s51:climbed", "s51:october", "s51:779", "s51:highest", "s51:2000", "s52:2026", "s52:dipped", "s52:february", "s52:back", "s52:fall", "s53:recent", "s53:higher", "s53:owners", "s53:paid", "s49:rates", "s50:in", "s50:percent#2", "s51:average"],
  sfx: [['s49:265', 'pop', 0.08], ['s51:779', 'thud', 0.12], ['s52:fall', 'pop', 0.08]] })
