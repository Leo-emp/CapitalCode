// ---------------------------------------------------------------- s67–s77: the real bill — interest.
// A) Rows of IOUs each drop their interest coin into one big pot; a counter climbs to $1.05 TRILLION (FY2026); a single
//    calendar day holds a $2.9 BILLION pile.
// B) Bars to scale (Treasury, FY2026): interest $1,052B vs military $965B; last year's interest $970B (+$81B); Medicare $1,073B.
// C) The loop: short → borrow → bigger pile → more interest → short again (four nodes, arrows chasing round).
// D) Rates: the rate dial nudges up one point; a bar: about +$328B a year once all the debt has rolled over (rough sum).
// E) Where the interest goes: coins flow to a pension fund and a saver's piggy bank (mostly inside the US) — while a road and
//    a school fade: money that can't be spent on them.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, win, Coin } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Calendar } from '../charts'
import { RateDial, Road, School } from '../econ/kit'
import { IOU, Piggy, TXT, INK, RED, GREEN, GOLD } from './kit'

const GROUND = 930
const W = '#FFFFFF'

const Interest: React.FC<PieceProps> = ({ f, c }) => {
  const remember = c('s67:remember'), d40 = c('s67:40'), add = c('s67:add')
  const y2026 = c('s68:2026'), d105 = c('s68:105'), trillion = c('s68:trillion')
  const d29 = c('s69:29'), day = c('s69:day')
  const military = c('s70:military'), d965 = c('s70:965'), bigger = c('s70:bigger')
  const d970 = c('s71:970'), d81 = c('s71:81')
  const league = c('s72:league'), d107 = c('s72:107')
  const loop = c('s73:loop'), short = c('s73:short'), borrows = c('s73:borrows'), bigger73 = c('s73:bigger'), next = c('s73:next')
  const rates = c('s74:rates'), old = c('s74:old')
  const rough = c('s75:rough'), point = c('s75:point'), d328 = c('s75:328#2'), rolled = c('s75:rolled')
  const holds = c('s76:holds'), pension = c('s76:pension'), savers = c('s76:savers'), inside = c('s76:inside')
  const lenders = c('s77:lenders'), roads = c('s77:roads'), schools = c('s77:schools')

  const A = win(f, 0, military - 4), B = win(f, military - 4, loop - 4), Cw = win(f, loop - 4, rates - 4), D = win(f, rates - 4, holds - 4), E = on(f, holds - 4, 10)
  const counter = lerp(0, 1.05, on(f, add, Math.max(20, d105 - add)))
  const U = 1.0 // px per billion
  const bar = (y: number, v: number, at: number, col: string, t: string, o = 1) => <g opacity={on(f, at, 8) * o}>
    <rect x={460} y={y} width={v * U * on(f, at, 24)} height={70} rx={12} fill={col} />
    <text x={440} y={y + 50} textAnchor="end" fill={W} style={TXT(48)}>{t}</text>
    <text x={470 + v * U * on(f, at, 24)} y={y + 50} fill={W} style={TXT(48)}>{`$${v.toLocaleString('en-US')}B`}</text>
  </g>
  const loopT = (f - loop) / 30
  return (
    <g>
      <Stage id="nd-interest" frame={f} tint="teal" />
      <Headline f={f} lines={[[remember, 'THE INTEREST ON EVERY IOU', W, 90], [military, 'FY2026, TO SCALE (TREASURY)', W, 72], [loop, 'THE LOOP', P.gold, 100], [rates, 'WHEN RATES RISE', W, 96], [holds, 'WHERE THE INTEREST GOES', W, 90]]} />
      <Ground y={GROUND} dark />

      {/* # A) every IOU's interest, added up */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, d29 - 14, 8)}>
          {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, add + (k % 6) * 3, 6)}><IOU x={260 + (k % 6) * 280} y={330 + Math.floor(k / 6) * 140} s={0.4} t="IOU" />{f > add + 10 && <Coin x={260 + (k % 6) * 280 + lerp(0, 960 - (260 + (k % 6) * 280), ((f - add - k * 2) / 30) % 1)} y={400 + Math.floor(k / 6) * 140 + 300 * (((f - add - k * 2) / 30) % 1)} s={0.6} o={0.9 * (1 - on(f, y2026, 8))} />}</g>)}
          <g opacity={on(f, d40, 8) * (1 - on(f, add, 8))}><IOU x={960} y={560} s={1.2} t="$1,000 NOTE" kind="$40 A YEAR" /></g>
          <g opacity={on(f, add, 8)}><path d="M760 760 L1160 760 L1080 920 L840 920 Z" fill={GOLD} stroke="#B88A2E" strokeWidth={6} /></g>
          <g opacity={on(f, y2026, 8)}><text x={960} y={720} textAnchor="middle" fill={W} style={TXT(110)}>{`$${counter.toFixed(2)} TRILLION`}</text></g>
          <g opacity={on(f, trillion, 8)}><Label x={960} y={GROUND + 60} text="NET INTEREST, FY2026" size={44} font="Bebas Neue" color={W} /></g>
        </g>
        <g opacity={on(f, d29 - 6, 8)}>
          <Calendar x={620} y={560} text="1 DAY" s={1.6} />
          {Array.from({ length: Math.round(12 * on(f, d29, 24)) }, (_, k) => <Coin key={k} x={1180 + (k % 4) * 80} y={GROUND - 40 - Math.floor(k / 4) * 70} s={1.1} />)}
          <g opacity={on(f, day, 8)}><Label x={1300} y={500} text="$2.9 BILLION A DAY" size={70} font="Bebas Neue" color={P.gold} /></g>
        </g>
      </g>}

      {/* # B) the bars */}
      {B > 0 && <g opacity={B}>
        {bar(330, 1052, military - 2, RED, 'INTEREST')}
        {bar(450, 965, d965, '#8BA0BF', 'MILITARY')}
        {bar(570, 970, d970, '#E5A99E', 'INTEREST 2025', 0.9)}
        {bar(690, 1073, d107, '#3FA39B', 'MEDICARE')}
        <g opacity={win(f, bigger, d970, 6)}><Label x={960} y={860} text="INTEREST WAS BIGGER" size={56} font="Bebas Neue" color={P.gold} /></g>
        <g opacity={on(f, d81, 8)} transform={`translate(1720 ${610}) scale(${pop(f, d81, 12)})`}><rect x={-100} y={-44} width={200} height={80} rx={12} fill={RED} /><text y={16} textAnchor="middle" fill={W} style={TXT(56)}>+$81B</text></g>
        <g opacity={on(f, league, 8)}><Label x={960} y={860} text="SAME LEAGUE AS MEDICARE" size={56} font="Bebas Neue" color={W} /></g>
      </g>}

      {/* # C) the loop */}
      {Cw > 0 && <g opacity={Cw}>
        {([[short, 'SHORT OF MONEY', 960, 330, RED], [borrows, 'BORROW MORE', 1420, 600, GOLD], [bigger73, 'BIGGER PILE', 960, 850, '#E5A99E'], [next, 'MORE INTEREST', 500, 600, RED]] as [number, string, number, number, string][]).map(([at, t, x, y, col], k) => <g key={k} opacity={on(f, Math.min(at, loop + k * 8), 8)} transform={`translate(${x} ${y}) scale(${pop(f, Math.min(at, loop + k * 8), 12)})`}>
          <rect x={-180} y={-56} width={360} height={100} rx={50} fill={col} /><text y={16} textAnchor="middle" fill={k === 1 ? INK : W} style={TXT(52)}>{t}</text>
        </g>)}
        {f > loop && [0, 1, 2, 3].map((k) => { const a = ((loopT + k / 4) % 1) * Math.PI * 2 - Math.PI / 2; return <circle key={k} cx={960 + 460 * Math.cos(a)} cy={590 + 260 * Math.sin(a)} r={16} fill={P.gold} opacity={0.9} /> })}
      </g>}

      {/* # D) a rate rise */}
      {D > 0 && <g opacity={D}>
        <RateDial x={560} y={540} s={1.2} v={(3.6 + on(f, point, 20)) / 6} t={f >= point ? '+1 POINT' : 'AVERAGE ~3.6%'} />
        <g opacity={on(f, old, 8) * (1 - on(f, rough, 8))}><Label x={1300} y={520} text="OLD IOUs OUT, NEW RATES IN" size={56} font="Bebas Neue" color={W} /></g>
        <g opacity={on(f, rough, 8)}>
          <Label x={1300} y={420} text="ROUGH SUM" size={50} font="Bebas Neue" color={P.gold} />
          <Label x={1300} y={500} text="1% × $32.8T" size={70} font="Bebas Neue" color={W} />
          <rect x={1060} y={560} width={480 * on(f, d328, 24)} height={90} rx={14} fill={RED} />
          <g opacity={on(f, d328, 8)}><text x={1300} y={622} textAnchor="middle" fill={W} style={TXT(60)}>+$328B A YEAR</text></g>
          <g opacity={on(f, rolled, 8)}><Label x={1300} y={720} text="ONCE IT HAS ALL ROLLED OVER" size={40} font="Bebas Neue" color={W} /></g>
        </g>
      </g>}

      {/* # E) where the interest goes, and what it can't buy */}
      {E > 0 && <g opacity={E}>
        <g opacity={1 - on(f, lenders - 4, 10)}>
          <IOU x={960} y={420} s={0.8} t="IOU" />
          <g opacity={on(f, pension, 8)}><rect x={360} y={GROUND - 200} width={240} height={200} rx={12} fill="#E6DCC4" /><text x={480} y={GROUND - 90} textAnchor="middle" fill={INK} style={TXT(44)}>PENSION</text></g>
          <g opacity={on(f, savers, 8)}><Piggy x={1440} y={GROUND} s={1.2} /></g>
          {f > pension && [0, 1, 2].map((k) => { const t = ((f - pension) / 30 + k / 3) % 1; return <Coin key={k} x={lerp(960, k % 2 ? 1440 : 480, t)} y={lerp(480, GROUND - 230, t) - 80 * Math.sin(Math.PI * t)} s={0.9} o={Math.sin(Math.PI * t)} /> })}
          <g opacity={on(f, inside, 8)}><Label x={960} y={GROUND + 60} text="MOSTLY STAYS INSIDE THE US" size={50} font="Bebas Neue" color={GREEN} /></g>
        </g>
        <g opacity={on(f, lenders - 4, 10)}>
          <g opacity={on(f, roads, 8)}><Road x={600} y={GROUND - 60} s={1.2} o={1 - 0.6 * on(f, roads + 12, 16)} /></g>
          <g opacity={on(f, schools, 8)}><School x={1320} y={GROUND - 60} s={1.1} dim={on(f, schools + 10, 16)} /></g>
          <g opacity={on(f, lenders, 8)}><Label x={960} y={330} text="PAID TO LENDERS, NOT SPENT ON…" size={60} font="Bebas Neue" color={W} /></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s67:madeup")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s67:iou")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s68:net")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s68:105")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s69:billion")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s70:billion")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s70:interest")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s71:earlier")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s71:so")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s71:interest#2")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s72:that")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s72:puts")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s72:the#2")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s72:americans")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s72:trillion")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s73:government")} x={960} y={590} rx={230} ry={200} />
        <Spot f={f} at={c("s73:too")} x={960} y={590} rx={230} ry={200} />
        <Spot f={f} at={c("s74:as")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s74:new")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s74:rates#2")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s75:one")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s75:trillion")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s75:by")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s75:a#2")} x={900} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s76:interest")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s76:ious")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s76:so")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s77:but")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s77:it")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s77:cannot")} x={960} y={700} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="nd-interest" />
    </g>
  )
}

export const ND_INTEREST = makePiece('nd-interest', 'The real bill: rows of IOUs each drop an interest coin into one gold pot while a counter climbs to $1.05 TRILLION (net interest, FY2026); a single calendar day holding a pile of coins — $2.9 BILLION A DAY; bars to scale from Treasury data — interest $1,052B, military $965B, last year\'s interest $970B (+$81B), Medicare $1,073B; the loop of four pills (short of money → borrow more → bigger pile → more interest) with gold dots chasing round; a rate dial nudging up one point beside a rough sum, 1% × $32.8T = +$328B a year once it has all rolled over; interest coins flowing to a pension fund and a piggy bank (mostly stays inside the US); a road and a school fading — paid to lenders, not spent on them.', {
  mood: 'dark', Component: Interest,
  beats: ["s67:remember", "s67:40", "s67:add", "s68:2026", "s68:105", "s68:trillion", "s69:29", "s69:day", "s70:military", "s70:965", "s70:bigger", "s71:970", "s71:81", "s72:league", "s72:107", "s73:loop", "s73:short", "s73:borrows", "s73:bigger", "s73:next", "s74:rates", "s74:old", "s75:rough", "s75:point", "s75:328#2", "s75:rolled", "s76:holds", "s76:pension", "s76:savers", "s76:inside", "s77:lenders", "s77:roads", "s77:schools", "s67:madeup", "s67:iou", "s68:net", "s69:billion", "s70:billion", "s70:interest", "s71:earlier", "s71:so", "s71:interest#2", "s72:that", "s72:puts", "s72:the#2", "s72:americans", "s72:trillion", "s73:government", "s73:too", "s74:as", "s74:new", "s74:rates#2", "s75:one", "s75:trillion", "s75:by", "s75:a#2", "s76:interest", "s76:ious", "s76:so", "s77:but", "s77:it", "s77:cannot"],
  sfx: [['s68:105', 'riser', 0.12], ['s70:military', 'thud', 0.1], ['s71:81', 'pop', 0.1], ['s75:328#2', 'impact', 0.12]] })
