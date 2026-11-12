// ============================================================
// db-payoff (s99–s104, cream): what 1835 teaches. The 1835 Treasury and its
// year page; the last bond stamped PAID (it can be done); tight spending (a
// VETO print) and a flood of money from the tariff ship and the land office;
// the boom ends — a CLOSED bank, the pile back by 1843; today's tower beside the
// 1835 sheet (more than a billion times bigger); last image: the stopwatch and
// a $33,000 sack every second ≈ the whole 1835 debt.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { fly, Headline, win } from '../aimoney/common'
import { Bank, Bond, BondPile, bump, C, Coin, Column, Defs, LandOffice, Sack, Ship, Stopwatch, Street, Treasury, VetoPrint, YearPage , Backdrop , Scroll } from './kit'

const GROUND = 880
const Payoff: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const y1835 = c('s99:1835'), teach = c('s99:teach')
  const country = c('s100:country'), pay100 = c('s100:pay'), debt100 = c('s100:debt')
  const once = c('s101:once'), tight = c('s101:tight'), flood = c('s101:flood'), tariffs = c('s101:tariffs'), land101 = c('s101:land')
  const boom102 = c('s102:boom'), crash = c('s102:crash'), eight = c('s102:eight'), back102 = c('s102:back')
  const today103 = c('s103:today'), billion = c('s103:billion'), bigger = c('s103:bigger'), left103 = c('s103:left')
  const second104 = c('s104:second'), interest104 = c('s104:interest'), whole104 = c('s104:whole'), did104 = c('s104:did')
  const A = win(f, c('s99') - 20, today103), B = win(f, today103, c('s104:and')), D = on(f, c('s104:and'), 8)
  return (
    <g>
      <Defs />
      <Stage id="db-payoff" frame={f} />
      <Headline f={f} lines={[[y1835, 'WHAT 1835 TEACHES', P.ink, 110], [country, 'IT CAN BE DONE', C.forest, 120], [tight, 'TIGHT SPENDING + A FLOOD OF MONEY', P.ink, 88],
        [boom102, 'THE BOOM ENDED IN A CRASH', C.brick, 104], [today103, 'TODAY', C.brick, 120], [billion, 'TODAY: OVER A BILLION TIMES BIGGER', C.brick, 92], [second104, 'EVERY SECOND ≈ THE WHOLE 1835 DEBT', P.ink, 90]]} />

      {/* # A) the 1835 lesson */}
      {A > 0 && <g opacity={A}>
        <Backdrop kind="town" f={f} />
        <Street y={GROUND} />
        <Treasury x={480} y={GROUND} s={0.8 * bump(f, teach, 0.04) * bump(f, c('s101:america'), 0.05)} door={on(f, flood, 10)} />
        <g opacity={on(f, y1835, 8) * (1 - on(f, country, 8))}><YearPage x={1200} y={520} s={1.1 * pop(f, y1835)} year="1835" top="JANUARY" /></g>
        <g opacity={on(f, country + 8, 8) * (1 - on(f, tight, 8))}><Bond x={1200} y={540} s={1.3 * pop(f, country + 8) * bump(f, c('s100:debt'), 0.05)} amount="$33,733" paid={on(f, pay100, 8)} /></g>
        <g opacity={on(f, tight, 8) * (1 - on(f, boom102, 8))}><Scroll x={900} y={560} s={0.75 * pop(f, tight)} title="SPENDING BILL" /><VetoPrint x={900} y={608} o={on(f, tight + 6, 8)} /></g>
        <g opacity={on(f, tariffs, 8) * (1 - on(f, boom102, 8))}><Ship x={1180} y={GROUND - 20} s={0.6} f={f} /></g>
        <g opacity={on(f, land101, 8) * (1 - on(f, boom102, 8))}><LandOffice x={1640} y={GROUND} s={0.6} /></g>
        {f >= flood && f < boom102 && [0, 1, 2].map((k) => { const t0 = flood + k * 8 + Math.floor((f - flood) / 24) * 24, from: [number, number] = k % 2 ? [1640, 640] : [1180, 640], fl = fly(f, t0, from, [560, 700], 20, 90); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={22} o={fl.o} /> : null })}
        {/* # the crash: a closed bank, the pile back by 1843 */}
        <g opacity={on(f, crash, 8)}><Bank x={1000} y={GROUND} s={0.6 * pop(f, crash)} fill={0} shut={1} cut={false} name="BANK" /></g>
        <g opacity={on(f, eight, 8)}><g transform={`translate(1450 ${GROUND}) scale(${bump(f, back102, 0.08)})`}><BondPile x={0} y={0} n={Math.round(1 + on(f, eight, 24) * 14)} /></g>
          <YearPage x={1450} y={360} s={0.7} year="1843" top="BY" /></g>
      </g>}

      {/* # B) today's tower beside the 1835 sheet */}
      {B > 0 && <g opacity={B}>
        <Backdrop kind="modern" f={f} />
        <Street y={GROUND} />
        <g opacity={on(f, left103, 8)}><BondPile x={560} y={GROUND} n={1} /><Label x={560} y={GROUND + 64} text="1835: $33,733" size={44} font="Bebas Neue" color={C.sepia} /></g>
        <Column x={1300} y={GROUND - 10} h={on(f, today103, 24) * 600 * bump(f, bigger, 0.03)} w={260} color="#4A6FA5" />
        <g opacity={on(f, today103 + 10, 8)}><Label x={1300} y={GROUND + 64} text="TODAY: $40.6T" size={48} font="Bebas Neue" color={C.brick} /></g>
        <g opacity={on(f, billion, 8)}><Label x={900} y={560} text="× 1.2 BILLION" size={72} font="Bebas Neue" color={C.brick} /></g>
      </g>}

      {/* # D) the last image: one second of interest ≈ the whole 1835 debt */}
      {D > 0 && <g opacity={D}>
        <Backdrop kind="modern" f={f} />
        <Street y={GROUND} />
        <Stopwatch x={520} y={520} s={1.2 * pop(f, c('s104:and')) * bump(f, c('s104:every'), 0.04) * bump(f, second104, 0.05)} t={((f - second104) % 30) / 30} />
        <g opacity={on(f, interest104, 8)}><Sack x={1000} y={GROUND - 60} s={1.15 * pop(f, interest104)} label="$33,000" /></g>
        <g opacity={on(f, whole104, 8)}><Label x={1220} y={680} text="≈" size={110} font="Bebas Neue" color={P.ink} />
          <Bond x={1500} y={640} s={1.1 * pop(f, whole104) * bump(f, did104, 0.05)} amount="$33,733" r={-4} />
          <Label x={1500} y={GROUND} text="ALL OF 1835" size={44} font="Bebas Neue" color={C.sepia} /></g>
      </g>}
      <Vignette id="db-payoff" />
    </g>
  )
}

const BEATS = ["s99:1835", "s99:teach", "s100:country", "s100:pay", "s101:once", "s101:tight", "s101:flood", "s101:tariffs", "s101:land", "s102:boom", "s102:crash", "s102:eight", "s102:back", "s103:today", "s103:billion", "s103:bigger", "s103:left", "s104:second", "s104:interest", "s104:whole", "s104:did", "s99", "s104:and", "s101:america", "s100:debt", "s104:every"]
export const DB_PAYOFF = makePiece('db-payoff', 'Debt 1835 payoff: 1835 Treasury and page; last bond stamped PAID; VETO print, tariff ship and land office pour coins in; closed bank, pile back by 1843; today’s $40.6T tower beside the 1835 sheet (×1.2 billion); stopwatch + $33,000 sack ≈ the whole 1835 debt', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s100:pay', 'click', 0.2], ['s102:crash', 'thud', 0.25], ['s104:second', 'coin', 0.2]],
})
