// ---------------------------------------------------------------- s104–s109: the payoff.
// A) The four steps again, as the route from the hook, each station lighting as it is said: real dollars in → lent to
//    the government → interest comes in → the holder gets back just the dollar (Maya with one coin, a gold coin turning
//    away from her).
// B) The callback: the coin company beside the burger shop, its profit stack taller.
// C) Her digital dollar works all day long: in the vault it sprouts interest coins while the sun crosses to the moon;
//    "for someone else": the coins drift to the coin company, Maya shrugs. Small closing line: not investment advice.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { GovBuilding, Stack } from '../fee/kit'
import { BurgerShop, CoinHQ, Dollar, Route, SCoin, Sprouts, Vault } from './kit'

const GROUND = 920
const Gold: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 16, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={P.gold} /><circle r={r * 0.7} fill="none" stroke={P.goldD} strokeWidth={3} /></g>

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const remember = c('s104:remember'), four = c('s104:four')
  const real = c('s105:real'), lends = c('s105:lends'), interest = c('s105:interest'), holder = c('s105:holder'), dollar105 = c('s105:dollar')
  const s106 = c('s106'), sells = c('s106:sells'), profit = c('s106:profit'), mcd = c("s106:mcdonald's")
  const digital = c('s107:digital'), working = c('s107:working'), day = c('s107:day'), long = c('s107:long')
  const someone = c('s108:someone'), else108 = c('s108:else')
  const money109 = c('s109:money'), advice = c('s109:advice')
  const AB = s106 - 4, BC = digital - 6
  const A = win(f, remember - 20, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const xs = [560, 960, 1360, 1760]
  return (
    <g>
      <Stage id="sc-payoff" frame={f} />
      <Headline f={f} lines={[[four, 'THE FOUR STEPS', P.ink, 108], [s106, '', P.ink], [profit, "MORE PROFIT THAN McDONALD'S", P.ink, 92], [working, 'WORKING ALL DAY LONG…', P.ink, 100], [someone, '…FOR SOMEONE ELSE', P.coralInk, 108]]} />

      {/* # A) the route, each station lighting as it is said */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Route pts={[[180, GROUND - 120], [560, GROUND - 120], [960, GROUND - 120], [1360, GROUND - 120], [1760, GROUND - 120]]} p={span(f, four, dollar105 + 10)} />
        {([[real, 'REAL DOLLARS IN'], [lends, 'LENT TO THE GOVERNMENT'], [interest, 'INTEREST COMES IN'], [holder, 'HOLDER: JUST $1']] as [number, string][]).map(([at, t], k) => {
          const x = xs[k], lit = on(f, at, 8)
          return <g key={k} opacity={0.25 + 0.75 * lit} transform={`translate(${x} ${GROUND - 120 - 16 * pop(f, at, 14)})`}>
            {k === 0 && <Vault x={0} y={-30} s={0.42} fill={0.5} />}
            {k === 1 && <GovBuilding x={0} y={-30} s={0.5} />}
            {k === 2 && <Stack x={0} y={-36} n={7} w={110} />}
            {k === 3 && <g><SCoin x={0} y={-110} s={1.2} /></g>}
            <circle cx={0} cy={60} r={36} fill={[P.sky, P.navy3, P.gold, P.coral][k]} />
            <text x={0} y={78} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{k + 1}</text>
            <Label x={0} y={150} text={t} size={k === 1 ? 38 : 44} font="Bebas Neue" color={P.ink} />
          </g>
        })}
        {(() => { const t = span(f, real, dollar105), i = Math.min(3, Math.floor(t * 4)), u = t * 4 - i, pts = [180, ...xs]
          return <Dollar x={lerp(pts[i], pts[i + 1], u)} y={GROUND - 340 - Math.sin(u * Math.PI) * 40} s={0.7} o={on(f, real, 8)} /> })()}
      </g>}

      {/* # B) the callback: more profit than the burger shop */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${-16 * pop(f, sells, 12) * (1 - on(f, sells + 14, 8))})`}><CoinHQ x={560} y={GROUND} s={0.95} sign="TETHER" /></g>
        <Stack x={900} y={GROUND - 10} n={Math.round(lerp(4, 22, on(f, profit, 24)))} w={150} />
        <g opacity={on(f, s106, 10)}><BurgerShop x={1400} y={GROUND} s={0.9} /></g>
        <g opacity={on(f, mcd, 8)}><Label x={1400} y={GROUND + 70} text="McDONALD'S" size={52} font="Bebas Neue" color={P.ink} /></g>
        <Label x={560} y={GROUND + 70} text="TETHER" size={52} font="Bebas Neue" color={P.ink} />
        <g opacity={on(f, s106, 10)}><Stack x={1690} y={GROUND - 10} n={Math.round(lerp(4, 17, on(f, mcd, 24)))} w={150} /></g>
      </g>}

      {/* # C) working all day long — for someone else */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[0, 'hold', 'smiling'], [someone, 'shrug', 'neutral']]} x={300} y={GROUND} s={0.82} />
        <SCoin x={300 + 110} y={GROUND - 420} s={0.6} />
        <Vault x={900} y={GROUND} s={0.85} door={1} fill={0.18} />
        <g opacity={on(f, working, 8)}><Sprouts x={900} y={GROUND - 110} n={6} t={(f - working) / 40} spread={180} /></g>
        {/* # the sun crosses, the moon rises: all day long */}
        <g opacity={on(f, day, 8)}>
          {(() => { const t = span(f, day, long + 30); return <g>
            <circle cx={lerp(700, 1200, t)} cy={330 - Math.sin(t * Math.PI) * 60} r={44} fill={P.gold} opacity={1 - on(f, long + 10, 12)} />
            <path d="M1180 300 a50 50 0 1 0 42 74 a40 40 0 1 1 -42 -74 Z" fill="#9AA9C8" opacity={on(f, long + 10, 12)} />
          </g> })()}
        </g>
        <g opacity={on(f, someone, 10)}><CoinHQ x={1560} y={GROUND} s={0.75} sign="COIN COMPANY" /></g>
        {f >= else108 && [0, 1, 2, 3].map((k) => { const fl = fly(f, else108 + k * 6, [900, GROUND - 300], [1560, GROUND - 340], 22, 120); return fl.t < 1 ? <Gold key={k} x={fl.x} y={fl.y} r={22} o={fl.o} /> : null })}
        <g opacity={on(f, money109, 8)}><Label x={960} y={GROUND + 80} text="HOW THE MONEY WORKS · NOT INVESTMENT ADVICE" size={40} font="Bebas Neue" color={P.ink2} /></g>
      </g>}
      <Vignette id="sc-payoff" />
    </g>
  )
}

const BEATS = ['s104:remember', 's104:four', 's105:real', 's105:lends', 's105:interest', 's105:holder', 's105:dollar', 's106', 's106:sells', 's106:profit', "s106:mcdonald's", 's107:digital', 's107:working', 's107:day', 's107:long', 's108:someone', 's108:else', 's109:money', 's109:advice']
export const SC_PAYOFF = makePiece('sc-payoff', 'Stablecoin long payoff: the four-step route lights station by station (real dollars in, lent to the government, interest comes in, holder gets just $1); the coin company out-earns the burger shop; her digital dollar sprouts interest all day and night — and the coins drift to the coin company', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s105:real', 'pop', 0.2], ['s105:holder', 'pop', 0.2], ['s106:profit', 'cash', 0.25], ['s107:working', 'ding', 0.2], ['s108:else', 'swish', 0.25]] })
