// ---------------------------------------------------------------- s7–s13: way 1, stop paying 22 percent (dawn trail).
// Leo stands by his backpack at the foot of the trail. The purple card is clipped on the pack and the pack has a torn
// corner: coins drip out on every month said (112 a month → about 1,340 a year piles up and is gone). One coin loses a
// 22¢ chip each year. A shield: 22% WITH NO RISK. Leo cuts the card in two, the patch is sewn on, and the coins stay in.
import React from 'react'
import { on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, WayBadge, Pack, Card, Coin, Life, TXT, CREAM, ORANGE, RED, GOLD, MINT, INK, DEEP, TEAL, PLUM } from './kit'

const GY = 930

const Leak: React.FC<PieceProps> = ({ f, c }) => {
  const stop = c('s7:stop'), d22 = c('s7:22')
  const third = c('s8:third'), card8 = c('s8:card'), d2236 = c('s8:2236'), year8 = c('s8:year')
  const d6000 = c('s9:6000'), d112 = c('s9:112'), month = c('s9:month'), d1340 = c('s9:1340'), nothing = c('s9:nothing')
  const dollar = c('s10:dollar'), costing = c('s10:costing'), cents = c('s10:cents')
  const earning = c('s11:earning'), risk = c('s11:risk'), almost = c('s11:almost')
  const pays = c('s12:pays'), first = c('s12:first'), d112b = c('s12:112'), keep = c('s12:keep')
  const stops = c('s13:stops'), leak = c('s13:leak'), table = c('s13:table')

  const leo: Beat[] = [[stop, 'stop', 'thinking'], [d2236, 'shock', 'shocked'], [d112, 'despair', 'worried'], [dollar, 'explain', 'thinking'], [earning, 'pointUp', 'smiling'], [pays, 'signA', 'thinking', 'signB', 8], [keep, 'thumbsUp', 'smiling'], [table, 'point', 'smiling']]
  const drip = win(f, d112 - 4, dollar - 6, 10)          // coins dripping from the torn corner
  const patched = on(f, pays + 20, 14)
  const B = win(f, dollar - 2, pays - 2, 8)             // the 22-cent coin and the shield
  const P = Math.max(1 - on(f, dollar - 10, 8), on(f, pays - 2, 8))                                // pack group dims while B shows
  const fall = (k: number, t0: number) => { const t = ((f - t0 - k * 9) % 36) / 36; return t < 0 ? -1 : t }

  return (
    <g>
      <PosterWorld f={f} id="rh-leak" tone="dawn" sunX={1520} sunY={460} />
      <g opacity={on(f, stop - 4, 10)}><WayBadge x={200} y={320} n={1} s={pop(f, stop, 12)} col={MINT} /></g>
      <g opacity={P}>
        <Person f={f} who="worker" beats={leo} x={560} y={GY + 40} s={0.8} />
        <Pack x={960} y={GY} s={1.25} leak={on(f, d6000, 8) * (1 - patched)} patch={patched} />
        {/* the card clipped to the pack, until it is cut in two */}
        <g opacity={on(f, card8, 8) * (1 - on(f, first + 10, 10))}><Card x={960} y={GY - 230} s={0.5} r={-8} t={f >= d6000 ? '−$6,000' : undefined} /></g>
        {f >= first && <g opacity={1 - on(f, first + 22, 10)}>
          <g transform={`translate(${-40 * on(f, first, 12)} ${30 * on(f, first, 12)}) rotate(${-20 * on(f, first, 12)} 900 700)`}><clipPath id="rh-cutL"><rect x={810} y={560} width={150} height={200} /></clipPath><g clipPath="url(#rh-cutL)"><Card x={960} y={GY - 230} s={0.5} r={-8} /></g></g>
          <g transform={`translate(${40 * on(f, first, 12)} ${30 * on(f, first, 12)}) rotate(${20 * on(f, first, 12)} 1020 700)`}><clipPath id="rh-cutR"><rect x={960} y={560} width={150} height={200} /></clipPath><g clipPath="url(#rh-cutR)"><Card x={960} y={GY - 230} s={0.5} r={-8} /></g></g>
        </g>}
        {/* the rate on the card */}
        <g opacity={win(f, d22, d6000, 8)}><Ticket x={1340} y={470} t={f >= d2236 ? '22.36% A YEAR' : '22%'} size={64} col={RED} tc={CREAM} /></g>
        <g opacity={win(f, third, d6000, 8)}><Ticket x={1340} y={590} t="CARD ACCOUNTS PAYING INTEREST · Q3 2026" size={30} col={CREAM} /></g>
        {/* coins drip out of the torn corner */}
        {drip > 0.001 && <g opacity={drip}>{[0, 1, 2, 3].map((k) => { const t = fall(k, d112); return t < 0 ? null : <Coin key={k} x={1060 + 20 * t} y={GY - 22 + 120 * t * t} s={0.7} o={1 - t} r={200 * t} /> })}</g>}
        <g opacity={win(f, d112, dollar, 8)}><Ticket x={1340} y={470} t="$112 INTEREST A MONTH" size={54} col={RED} tc={CREAM} /></g>
        {/* the monthly coins pile up into a year, then are gone for nothing */}
        <g opacity={win(f, d1340, dollar, 8) * (1 - 0.8 * on(f, nothing, 12))}>
          {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, d1340 + k * 1.5, 4)}><Coin x={1220 + (k % 6) * 62} y={GY - 10 - Math.floor(k / 6) * 50} s={0.8} /></g>)}
          <Ticket x={1380} y={750} t="≈ $1,340 A YEAR" size={52} col={GOLD} />
        </g>
        {/* after the payoff: coins stay in */}
        <g opacity={on(f, d112b, 10)}><Ticket x={1340} y={470} t="$112 A MONTH KEPT" size={58} col={MINT} tc={CREAM} /></g>
        <g opacity={on(f, leak, 8)}><Life f={f} at={leak} x={1058} y={GY - 22} kind="spark" /></g>
        {/* the table with money lying on it (way 2 is next) */}
        <g opacity={on(f, table, 10)} transform="translate(1520 930)">
          <rect x={-150} y={-150} width={300} height={24} rx={6} fill="#8A5A3C" /><rect x={-130} y={-126} width={18} height={126} fill="#6E4630" /><rect x={112} y={-126} width={18} height={126} fill="#6E4630" />
          {[0, 1, 2].map((k) => <Coin key={k} x={-60 + k * 60} y={-176} s={0.75} o={on(f, table + 4 + k * 3, 6)} />)}
        </g>
      </g>
      {/* # B) one dollar loses 22 cents a year; the no-risk shield */}
      {B > 0.001 && <g opacity={B}>
        <g transform="translate(700 600)">
          <circle r={190} fill={GOLD} /><circle r={150} fill="none" stroke="#FFE3A0" strokeWidth={8} /><text y={50} textAnchor="middle" fill="#B27A12" style={TXT(160)}>$1</text>
          <g opacity={on(f, costing, 8)} transform={`translate(${190 + 140 * on(f, costing, 20)} ${-60 + 120 * on(f, costing, 20)})`}><path d="M-40 -60 L50 -10 L0 60 Z" fill={GOLD} stroke={INK} strokeWidth={4} /><text x={8} y={10} textAnchor="middle" fill={INK} style={TXT(38)}>22¢</text></g>
          <g opacity={on(f, cents, 8)}><Ticket x={140} y={320} t="22 CENTS A YEAR, PER DOLLAR" size={44} col={RED} tc={CREAM} /></g>
        </g>
        <g opacity={on(f, earning, 10)} transform={`translate(1380 560) scale(${pop(f, earning, 12)})`}>
          <path d="M0 -230 L190 -160 Q190 80 0 210 Q-190 80 -190 -160 Z" fill={MINT} /><path d="M0 -190 L150 -134 Q150 60 0 166 Q-150 60 -150 -134 Z" fill="none" stroke={CREAM} strokeWidth={8} />
          <text y={-10} textAnchor="middle" fill={CREAM} style={TXT(120)}>22%</text>
          <g opacity={on(f, risk, 8)}><text y={70} textAnchor="middle" fill={CREAM} style={TXT(46)}>NO RISK</text></g>
        </g>
        <g opacity={on(f, almost, 8)}><Ticket x={1380} y={890} t="ALMOST NO INVESTMENT CAN OFFER THAT" size={36} col={CREAM} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={year8} x={1340} y={400} kind="glint" />
        <Life f={f} at={stops} x={1058} y={820} kind="glint" />
        <Life f={f} at={c("s9:on")} x={1340} y={400} kind="glint" />
        <Life f={f} at={c("s11:that")} x={700} y={600} kind="glint" />
        <Life f={f} at={c("s13:up")} x={1520} y={760} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-leak" />
      <Headline f={f} lines={[[stop, 'STOP PAYING 22%', INK, 92], [dollar, 'EVERY DOLLAR PAID OFF', INK, 88], [pays, 'PAY OFF THE CARD FIRST', INK, 88]]} />
    </g>
  )
}

export const RH_LEAK = makePiece('rh-leak', 'Way 1 at dawn on the trail: Leo stands by his teal backpack with a purple credit card clipped on it (−$6,000) and a torn corner; 22.36% A YEAR, CARD ACCOUNTS PAYING INTEREST · Q3 2026; coins drip out of the hole — $112 INTEREST A MONTH — and twelve coins pile up (≈ $1,340 A YEAR) and fade for nothing; a big $1 coin loses a 22¢ chip (22 CENTS A YEAR, PER DOLLAR) beside a mint shield 22% NO RISK — ALMOST NO INVESTMENT CAN OFFER THAT; Leo cuts the card in two, an orange patch is sewn over the hole ($112 A MONTH KEPT), thumbs up, and points at a table with coins lying on it.', {
  mood: 'light', Component: Leak,
  beats: ["s7:stop", "s7:22", "s8:third", "s8:card", "s8:2236", "s8:year", "s9:6000", "s9:112", "s9:month", "s9:1340", "s9:nothing", "s10:dollar", "s10:costing", "s10:cents", "s11:earning", "s11:risk", "s11:almost", "s12:pays", "s12:first", "s12:112", "s12:keep", "s13:stops", "s13:leak", "s13:table", "s9:on", "s11:that", "s13:up"],
  sfx: [['s9:112', 'coin', 0.1], ['s12:first', 'crack', 0.1], ['s11:earning', 'chime', 0.08]] })
