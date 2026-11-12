// ---------------------------------------------------------------- s35–s40: way 5, sell your skill on the side (late noon street).
// Leo cycles along a street of three neighbours' houses carrying a laptop; at each door a laptop opens and wifi waves
// light up over the roof (6 HOURS A WEEK · $35 AN HOUR). Fifty little week-coins fill a 10×5 grid → $10,500 A YEAR,
// BEFORE TAX. Then a clock chained to the coins: he is only paid for his own hours. Four streams (no card interest, the
// match, the raise, the side money) pour into one big jar: $1,000 EVERY MONTH. The coins hop onto a waiting train.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, WayBadge, Bike, Home, Coin, Train, Life, TXT, CREAM, ORANGE, RED, GOLD, MINT, INK, DEEP, TEAL, SAND, PLUM, SKYB, RUST } from './kit'

const GY = 960

const Laptop: React.FC<{ x: number; y: number; open: number; s?: number }> = ({ x, y, open, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-8} width={140} height={14} rx={4} fill="#8E949C" />
    <g transform={`scale(1 ${0.15 + 0.85 * open})`}><rect x={-60} y={-90} width={120} height={84} rx={6} fill={INK} /><rect x={-52} y={-82} width={104} height={68} rx={4} fill={open > 0.5 ? SKYB : INK} /></g>
  </g>
)
const Wifi: React.FC<{ x: number; y: number; o: number; f: number }> = ({ x, y, o, f }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>{[1, 2, 3].map((k) => <path key={k} d={`M${-26 * k} ${-14 * k} Q0 ${-40 * k} ${26 * k} ${-14 * k}`} stroke={TEAL} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.5 + 0.5 * Math.sin(f / 6 - k)} />)}<circle r={9} fill={TEAL} /></g>
)

const Side: React.FC<PieceProps> = ({ f, c }) => {
  const sell = c('s35:sell'), side = c('s35:side')
  const madeup = c('s36:madeup'), computers = c('s36:computers'), laptops = c('s36:laptops'), wifi = c('s36:wifi'), neighbors = c('s36:neighbors'), d6 = c('s36:6'), d35 = c('s36:35')
  const weeks = c('s37:weeks'), d10500 = c('s37:10500'), tax = c('s37:tax')
  const real = c('s38:real'), limit = c('s38:limit'), hours = c('s38:hours')
  const add = c('s39:add'), card = c('s39:card'), match = c('s39:match'), paycheck = c('s39:paycheck'), money = c('s39:money'), d1000 = c('s39:1000')
  const faster = c('s40:faster'), working = c('s40:working')

  const leo: Beat[] = [[sell, 'push', 'smiling'], [laptops, 'type', 'smiling'], [d35, 'thumbsUp', 'smiling'], [weeks, 'countA', 'thinking', 'countB', 10], [limit, 'scratchHead', 'thinking'], [add, 'present', 'smiling'], [d1000, 'celebrate', 'smiling'], [working, 'point', 'smiling']]
  const A = 1 - on(f, weeks - 10, 8), B = win(f, weeks - 2, add - 2, 8), Cc = on(f, add - 2, 8)
  const ride = on(f, sell, 50)
  const visit = [laptops, wifi, neighbors]
  const tick = Math.floor(on(f, limit, 1) * (f - limit) / 6)

  return (
    <g>
      <PosterWorld f={f} id="rh-side" tone="noon" sunX={1560} sunY={360} ground="#D9C79A" />
      <g opacity={on(f, c('s35:number') - 4, 10)}><WayBadge x={200} y={320} n={5} s={pop(f, c('s35:number'), 12)} col={GOLD} /></g>
      {/* # A) the street of neighbours */}
      {A > 0.001 && <g opacity={A}>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, side + k * 4, 8)}>
          <Home x={620 + k * 460} y={GY} s={0.8} col={[CREAM, SAND, '#F6D2C2'][k]} roof={[RUST, TEAL, PLUM][k]} />
          <Wifi x={620 + k * 460} y={GY - 300} o={on(f, visit[k] + 8, 8)} f={f} />
          <Laptop x={620 + k * 460 + 150} y={GY - 4} open={on(f, visit[k], 10)} s={0.8} />
        </g>)}
        <g transform={`translate(${lerp(240, 330, ride)} 0)`}>
          <Bike x={0} y={1000} s={0.6} spin={f * 4 * (1 - ride)} />
          <Person f={f} who="worker" beats={leo} x={-140} y={1010} s={0.5} />
        </g>
        <g opacity={win(f, madeup, d6, 8)}><Ticket x={1080} y={330} t={f >= computers ? 'MADE-UP EXAMPLE · GOOD WITH COMPUTERS' : 'MADE-UP EXAMPLE'} size={44} col={CREAM} /></g>
        <g opacity={on(f, d6, 8)}><Ticket x={1080} y={330} t={f >= d35 ? '6 HOURS A WEEK · $35 AN HOUR' : '6 HOURS A WEEK'} size={50} col={GOLD} /></g>
      </g>}
      {/* # B) fifty weeks of coins, then the limit: paid only for his own hours */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={1 - on(f, real - 10, 8)}>
          {Array.from({ length: 50 }, (_, k) => <g key={k} opacity={on(f, weeks + k * 0.6, 3)}><Coin x={560 + (k % 10) * 90} y={460 + Math.floor(k / 10) * 90} s={0.72} /></g>)}
          <g opacity={on(f, weeks, 8)}><Ticket x={960} y={360} t="50 WEEKS" size={48} col={CREAM} /></g>
          <g opacity={on(f, d10500, 8)} transform={`translate(960 960) scale(${pop(f, d10500, 12)})`}><Ticket x={0} y={0} t={f >= tax ? '$10,500 A YEAR · BEFORE TAX' : '$10,500 A YEAR'} size={60} col={GOLD} /></g>
        </g>
        <g opacity={on(f, real - 2, 8)}>
          <Person f={f} who="worker" beats={leo} x={560} y={GY + 40} s={0.8} />
          <g transform="translate(1200 620)">
            <circle r={170} fill={CREAM} stroke={INK} strokeWidth={12} />
            {Array.from({ length: 12 }, (_, k) => <line key={k} x1={0} y1={-140} x2={0} y2={-122} stroke={INK} strokeWidth={6} transform={`rotate(${k * 30})`} />)}
            <line x1={0} y1={0} x2={0} y2={-110} stroke={ORANGE} strokeWidth={10} strokeLinecap="round" transform={`rotate(${tick * 30})`} /><circle r={14} fill={INK} />
          </g>
          {/* a chain from the clock to the coins: one hour, one payment */}
          <g opacity={on(f, hours, 8)}>
            <path d="M1370 620 L1500 620" stroke="#8E949C" strokeWidth={10} strokeDasharray="22 10" />
            <Coin x={1560} y={620} s={1.3} t="$35" />
            <Ticket x={1200} y={880} t="PAID ONLY FOR HIS OWN HOURS" size={46} col={CREAM} />
          </g>
          <g opacity={on(f, limit, 8)}><Ticket x={1200} y={380} t="THE LIMIT" size={50} col={RED} tc={CREAM} /></g>
        </g>
      </g>}
      {/* # C) four streams pour into one jar: 1,000 a month, and the money boards a train */}
      {Cc > 0.001 && <g opacity={Cc}>
        {[[card, 'NO CARD INTEREST', 380], [match, 'THE MATCH', 760], [paycheck, 'BIGGER PAYCHECK', 1160], [money, 'SIDE MONEY', 1540]].map(([at, t, x], k) => {
          const a = at as number, xx = x as number
          return <g key={k} opacity={on(f, a, 8) * (1 - on(f, faster, 10))}>
            <Ticket x={xx} y={360} t={t as string} size={40} col={CREAM} />
            {[0, 1, 2].map((i) => { const p = ((f - a + i * 10) % 30) / 30; return <Coin key={i} x={lerp(xx, 960, p)} y={lerp(420, 760, p)} s={0.6} o={on(f, a, 6) * (1 - on(f, d1000 + 20, 10))} /> })}
          </g>
        })}
        <g>
          <ellipse cx={974} cy={GY + 6} rx={180} ry={20} fill="rgba(30,20,30,0.22)" />
          <rect x={810} y={GY - 260} width={300} height={260} rx={40} fill={SKYB} opacity={0.4} />
          {Array.from({ length: Math.round(on(f, add, 60) * 12) }, (_, k) => <Coin key={k} x={850 + (k % 4) * 70} y={GY - 40 - Math.floor(k / 4) * 60} s={0.8} />)}
          <rect x={810} y={GY - 260} width={300} height={260} rx={40} fill="none" stroke="#FFFFFF" strokeWidth={10} />
          <g opacity={on(f, d1000, 8)}><Ticket x={960} y={GY - 300} t="INVESTS $1,000 EVERY MONTH" size={46} col={GOLD} /></g>
        </g>
        <g opacity={on(f, faster, 10)}><Train x={lerp(2000, 1200, on(f, faster, 40))} y={GY} s={0.8} cars={2} label="INVEST" /></g>
        <g opacity={on(f, working, 8)}>{[0, 1, 2].map((i) => { const p = on(f, working + i * 5, 18); return <Coin key={i} x={lerp(960, 1520 + i * 80, p)} y={GY - 200 - 160 * Math.sin(Math.PI * p)} s={0.7} /> })}</g>
        <Person f={f} who="worker" beats={leo} x={300} y={GY + 40} s={0.72} />
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c('s38:works')} x={1200} y={460} kind="glint" />
        <Life f={f} at={c("s39:month")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s40:that")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s41:six")} x={960} y={760} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-side" />
      <Headline f={f} lines={[[sell, 'SELL YOUR SKILL ON THE SIDE', INK, 88], [add, 'ADD IT ALL UP', INK, 88]]} />
    </g>
  )
}

export const RH_SIDE = makePiece('rh-side', 'Way 5 on a noon street: Leo cycles past three neighbours\' houses (MADE-UP EXAMPLE · GOOD WITH COMPUTERS); at each one a laptop opens and wifi waves light up over the roof — 6 HOURS A WEEK · $35 AN HOUR; fifty coins fill a 10×5 grid (50 WEEKS → $10,500 A YEAR · BEFORE TAX); then a big clock ticks hour by hour, chained to a $35 coin: THE LIMIT, PAID ONLY FOR HIS OWN HOURS; four streams of coins (NO CARD INTEREST, THE MATCH, BIGGER PAYCHECK, SIDE MONEY) pour into one glass jar — INVESTS $1,000 EVERY MONTH — and a red poster train marked INVEST rolls in as the coins hop aboard.', {
  mood: 'light', Component: Side,
  beats: ["s35:sell", "s35:side", "s36:madeup", "s36:computers", "s36:laptops", "s36:wifi", "s36:neighbors", "s36:6", "s36:35", "s37:weeks", "s37:10500", "s37:tax", "s38:real", "s38:limit", "s38:hours", "s39:add", "s39:card", "s39:match", "s39:paycheck", "s39:money", "s39:1000", "s40:faster", "s40:working", "s35:number", "s38:works", "s39:month", "s40:that", "s41:six"],
  sfx: [['s37:10500', 'coin', 0.1], ['s38:limit', 'tick', 0.1], ['s39:1000', 'chime', 0.08]] })
