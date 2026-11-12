// ---------------------------------------------------------------- s35–s44: step three — money taken can't grow.
// A) The scoop lifts the year-one $60 coin out of the jar into the collector's bag; it turns grey (it can never grow
//    again). "If it had stayed": a dotted ghost pile rises from that coin for 39 years (a year counter runs) to $840 by
//    retirement. "Instead, it is gone": the coin drops into the bag and the ghost pile cracks and fades.
// B) It happens every year: a row of fee coins (year 2, 3, … later ones bigger), each with the ghost growth it takes.
// C) The fee costs twice: the coin (once, when it is taken) and the ghost pile (again, the growth it never makes); then
//    the recap — a scoop, a ringed jar, a ghost pile: a small cut, from everything you have, that can never grow back.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { GhostPile, SaverJar, Scoop, YearFlag, Spot } from './kit'

const GROUND = 920
// # the collector's sack
const Sack: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number }> = ({ x, y, s = 1, o = 1, fill = 0.4 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={110} ry={14} fill="#000" opacity={0.12} />
    <path d={`M-100 0 Q-120 ${-160 - 60 * fill} 0 ${-180 - 60 * fill} Q120 ${-160 - 60 * fill} 100 0 Z`} fill="#B9864C" />
    <path d={`M-40 ${-176 - 60 * fill} L0 ${-210 - 60 * fill} L40 ${-176 - 60 * fill}`} fill="none" stroke="#8E6232" strokeWidth={12} />
    <text x={0} y={-60} textAnchor="middle" fill="#5A3A22" style={{ font: '400 56px "Bebas Neue"' }}>FEES</text>
  </g>
)

const Step3: React.FC<PieceProps> = ({ f, c }) => {
  const money35 = c('s35:money'), takes35 = c('s35:takes'), never35 = c('s35:never'), again35 = c('s35:again')
  const think = c('s36:think'), d60 = c('s36:60'), took = c('s36:took'), year36 = c('s36:year')
  const stayed = c('s37:stayed'), growing37 = c('s37:growing'), d39 = c('s37:39'), years37 = c('s37:years')
  const seven = c('s38:7'), d60b = c('s38:60'), d840 = c('s38:840'), retirement = c('s38:retirement')
  const instead = c('s39:instead'), gone = c('s39:gone'), everything39 = c('s39:everything'), grown = c('s39:grown')
  const same40 = c('s40:same'), two40 = c('s40:two'), three40 = c('s40:three'), every40 = c('s40:every'), after40 = c('s40:after')
  const later = c('s41:later'), bigger = c('s41:bigger'), growth41 = c('s41:growth'), away = c('s41:away'), bigger2 = c('s41:bigger#2')
  const costs42 = c('s42:costs'), twice = c('s42:twice')
  const once = c('s43:once'), taken43 = c('s43:taken'), again43 = c('s43:again'), growth43 = c('s43:growth'), never43 = c('s43:never')
  const far44 = c('s44:far'), small44 = c('s44:small'), cut44 = c('s44:cut'), everything44 = c('s44:everything'), never44 = c('s44:never'), back44 = c('s44:back')
  const AB = same40 - 4, BC = costs42 - 4
  const A = win(f, money35, AB), B = win(f, AB, BC), C = on(f, BC, 8)
  // # A: the coin's trip — scooped out (takes), held (never grow: grey), then dropped in the sack (gone)
  const coinX = f < think ? lerp(620, 1060, on(f, takes35, 18)) : f < instead ? 1200 : lerp(1200, 1600, on(f, gone - 10, 16))
  const coinY = f < think ? lerp(GROUND - 380, GROUND - 520, on(f, takes35, 18)) : f < instead ? GROUND - 120 : lerp(GROUND - 120, GROUND - 200, on(f, gone - 10, 16))
  const ghostN = f < stayed ? 0 : 1 + Math.round(17 * span(f, growing37, d840))
  const col: Beat[] = [[0, 'idle', 'smug'], [takes35, 'reachUp', 'smug'], [never35, 'hold', 'smug'], [gone, 'reachDown', 'smug']]
  return (
    <g>
      <Stage id="fe-step3" frame={f} />
      <Spot f={f} at={c("s38:those")} x={1200} y={740} rx={160} ry={160} />
      <Headline f={f} lines={[[never35, 'IT CAN NEVER GROW AGAIN', P.coralInk, 100], [think, '', P.ink], [d60, '$60 IN YEAR 1', P.ink, 110], [d39, '+39 YEARS OF GROWTH', P.mintInk, 104], [d840, '$60 → ≈ $840', P.goldInk, 116], [instead, '', P.ink], [gone, 'GONE', P.coralInk, 120], [same40, '', P.ink], [later, 'LATER FEES ARE BIGGER', P.coralInk, 100], [costs42, 'THE FEE COSTS YOU TWICE', P.coralInk, 104], [far44, '', P.ink]]} />

      {/* # A) the year-one coin: scooped, grey, the ghost of its 39 years, then gone */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, think, 10)}>
          <SaverJar x={560} y={GROUND} w={260} h={300} fill={0.4} label="YEAR 1" cut={on(f, takes35, 8)} />
          <Person f={f} who="owner" beats={col} x={1240} y={GROUND} s={0.78} />
          <Scoop x={1040} y={GROUND - 520} s={0.8} r={-20} full={on(f, takes35 + 10, 8) * (1 - on(f, think, 6))} />
        </g>
        {/* # the coin itself, greyed on "never grow" */}
        <g opacity={1 - on(f, gone + 2, 6)} transform={`translate(${coinX} ${coinY - (f < think ? 0 : 60)}) scale(${f < think ? 0.8 : lerp(2.8, 1.4, on(f, gone - 10, 14))})`}>
          <circle r={34} fill={f >= never35 ? '#C9CFD8' : P.gold} stroke={f >= never35 ? '#9AA5B5' : P.goldD} strokeWidth={5} />
          <text y={13} textAnchor="middle" fill={f >= never35 ? '#7A8698' : P.goldD} style={{ font: '400 36px "Bebas Neue"' }}>$60</text>
        </g>
        {/* # the ghost pile: what the $60 would have grown into, year by year */}
        <g opacity={on(f, stayed, 10) * (1 - on(f, everything39, 14))} transform={`translate(${on(f, grown, 8) * 6 * Math.sin(f * 2)} ${on(f, everything39, 14) * 40})`}>
          <GhostPile x={760} y={GROUND - 20} n={ghostN} w={240} />
          <g opacity={on(f, growing37, 8)}><YearFlag x={360} y={GROUND} text="YEAR 1" s={1.0} o={1 - on(f, retirement, 8)} /><g opacity={on(f, retirement, 8)}><Label x={420} y={GROUND - 170} text="RETIREMENT" size={60} font="Bebas Neue" color={P.ink} /></g></g>
          <g opacity={on(f, d840, 8)}><Label x={760} y={GROUND - 60 - ghostN * 22} text="≈ $840" size={80} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        <g opacity={on(f, seven, 8) * (1 - on(f, instead, 8))}><Label x={760} y={GROUND + 72} text="7% A YEAR" size={52} font="Bebas Neue" color={P.mintInk} /></g>
        {/* # the collector's sack swallows it */}
        <g opacity={on(f, instead, 10)}><Sack x={1560} y={GROUND} s={1.1} fill={on(f, gone, 10)} /></g>
      </g>}

      {/* # B) every year after: each fee coin with the ghost growth it takes — later fees bigger */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const at = [same40, two40, three40, every40, every40 + 8, after40][k], x = 200 + k * 250, sz = 1.6 + 0.2 * k * on(f, later, 14)
          const gn = Math.round(6 + (11 - k * 1.4) * on(f, growth41 + k * 3, 14) * (1 + 0.4 * on(f, bigger2, 14) * (k / 5)))
          return <g key={k} opacity={on(f, at, 8)}>
            <GhostPile x={x} y={GROUND - 20} n={gn} w={220} />
            <g transform={`translate(${x} ${GROUND - 60}) scale(${sz})`}><circle r={40} fill="#C9CFD8" stroke="#9AA5B5" strokeWidth={5} /><text y={14} textAnchor="middle" fill="#7A8698" style={{ font: '400 34px "Bebas Neue"' }}>FEE</text></g>
            {k < 3 && <Label x={x} y={GROUND + 72} text={`YEAR ${k + 1}`} size={44} font="Bebas Neue" color={P.ink2} />}
          </g>
        })}
        {/* # where every fee coin comes from: the saver's jar, scooped each year */}
        <g opacity={on(f, same40, 10)}><SaverJar x={1720} y={GROUND} w={260} h={440} fill={0.7} cut={1} /><Scoop x={1690} y={GROUND - 520 - 30 * Math.abs(Math.sin(f / 18))} s={0.9} r={-20} full={1} /></g>
        <g opacity={on(f, away, 8)}><Label x={960} y={300} text="THE GROWTH THEY TAKE AWAY" size={60} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}

      {/* # C) twice: the coin and the ghost; then the three-part recap */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, far44, 10)}>
          <g opacity={on(f, costs42, 8)} transform={`translate(620 ${GROUND - 160}) scale(${1 + 0.1 * on(f, taken43, 6) * (1 - on(f, taken43 + 14, 8))})`}>
            <circle r={110} fill="#C9CFD8" stroke="#9AA5B5" strokeWidth={8} /><text y={30} textAnchor="middle" fill="#7A8698" style={{ font: '400 90px "Bebas Neue"' }}>FEE</text>
          </g>
          <g opacity={on(f, once, 8)}><Label x={620} y={GROUND + 72} text="1 · WHEN IT'S TAKEN" size={52} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={0.35 * on(f, costs42, 10) + 0.65 * on(f, twice, 10)}><GhostPile x={1300} y={GROUND - 20} n={Math.round(6 + 12 * on(f, growth43, 20))} w={200} />
            <Label x={1300} y={GROUND + 72} o={on(f, again43, 8)} text="2 · THE GROWTH IT NEVER MAKES" size={52} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        <g opacity={on(f, far44, 10)}>
          <g opacity={on(f, small44, 8)}><Scoop x={420} y={540} s={1.5} r={-10} full={1} /><Label x={460} y={GROUND - 120} text="A SMALL CUT" size={60} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, everything44, 8)}><SaverJar x={960} y={GROUND - 200} w={240} h={320} fill={0.8} /><rect x={960 - 160} y={GROUND - 560} width={320} height={390} rx={40} fill="none" stroke={P.coral} strokeWidth={8} strokeDasharray="18 12" /><Label x={960} y={GROUND - 120} text="FROM EVERYTHING" size={60} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, never44, 8)}><GhostPile x={1460} y={GROUND - 200} n={12} w={170} /><Label x={1460} y={GROUND - 120} text="NEVER GROWS BACK" size={60} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}
      <Vignette id="fe-step3" />
    </g>
  )
}

const BEATS = ['s35:money', 's35:takes', 's35:never', 's35:again', 's36:think', 's36:60', 's36:took', 's36:year', 's37:stayed', 's37:growing', 's37:39', 's37:years', 's38:7', 's38:840', 's38:retirement', 's39:instead', 's39:gone', 's39:everything', 's39:grown', 's40:same', 's40:two', 's40:three', 's40:every', 's40:after', 's41:later', 's41:bigger', 's41:growth', 's41:away', 's41:bigger#2', 's42:costs', 's42:twice', 's43:once', 's43:taken', 's43:again', 's43:growth', 's43:never', 's44:far', 's44:small', 's44:cut', 's44:everything', 's44:never', 's44:back', "s38:those"]
export const FE_STEP3 = makePiece('fe-step3', 'Fee long step three: the year-one $60 is scooped out and greys (can never grow); its ghost pile grows 39 years to ~$840; gone into the fees sack; every year after, later fees bigger, the growth they take; the fee costs twice; recap', {
  mood: 'light', Component: Step3, beats: BEATS,
  sfx: [['s35:takes', 'swish', 0.3], ['s35:never', 'thud', 0.25], ['s37:growing', 'riser', 0.25], ['s38:840', 'ding', 0.3], ['s39:gone', 'coin', 0.35], ['s41:later', 'pop', 0.25], ['s42:twice', 'thud', 0.3], ['s44:back', 'ding', 0.25]] })
