// ---------------------------------------------------------------- s67–s75: is this real? — the SEC's own example.
// A) Our twins' jars, small, then the SEC's building rises with its comparison board.
// B) The SEC's example: one $100,000 bag (one lump, not monthly coins) grows 4% a year for 20 years into two jars — 0.25%
//    ends ≈ $208,000, 1% ends nearly $30,000 lower (a coral bracket).
// C) Side by side: the SEC's gap and ours (shorter, slower — yet the same shape of curve). Two donuts: after 20 years the
//    1% fee has taken ≈ 10% of Twin A's money, after 40 years ≈ 22%; a time arrow — the longer, the more it costs.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, win } from '../aimoney/common'
import { Donut } from '../charts'
import { Ground } from '../power/kit2'
import { GovBuilding, SaverJar, Spot } from './kit'

const GROUND = 920
const Bag: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = '$100,000' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={130} ry={16} fill="#000" opacity={0.12} />
    <path d="M-120 0 Q-140 -200 0 -220 Q140 -200 120 0 Q100 40 0 40 Q-100 40 -120 0 Z" fill="#B9864C" />
    <path d="M-50 -216 L0 -260 L50 -216" fill="none" stroke="#8E6232" strokeWidth={14} />
    <text y={-70} textAnchor="middle" fill="#FFF6E2" style={{ font: '400 60px "Bebas Neue"' }}>{text}</text>
  </g>
)

const Real: React.FC<PieceProps> = ({ f, c }) => {
  const check = c('s67:check'), official = c('s67:official')
  const regulator = c('s68:regulator'), sec = c('s68:sec'), comparison = c('s68:comparison')
  const d100k = c('s69:100000'), d4 = c('s69:4'), d20 = c('s69:20')
  const lump = c('s70:lump'), monthly = c('s70:monthly'), same70 = c('s70:same')
  const d025 = c('s71:025'), d208 = c('s71:208000')
  const d1 = c('s72:1'), d30 = c('s72:30000'), lower = c('s72:lower')
  const gap73 = c('s73:gap'), ours = c('s73:ours'), shorter = c('s73:shorter'), slowly = c('s73:slowly'), pattern = c('s73:pattern')
  const y20 = c('s74:20'), d10 = c('s74:10'), y40 = c('s74:40'), d22 = c('s74:22')
  const longer = c('s75:longer'), years75 = c('s75:years'), costs75 = c('s75:costs')
  const AB = d100k - 4, BC = gap73 - 4
  const A = win(f, check, AB), B = win(f, AB, BC), C = on(f, BC, 8)
  return (
    <g>
      <Stage id="fe-real" frame={f} />
      <Spot f={f} at={c("s74:what")} x={1300} y={560} rx={240} ry={240} />
      <Spot f={f} at={c("s68:stock")} x={1240} y={700} rx={320} ry={260} />
      <Spot f={f} at={c("s74:example")} x={620} y={560} rx={240} ry={240} />
      <Spot f={f} at={c("s74:cost")} x={620} y={560} rx={240} ry={240} />
      <Spot f={f} at={c("s74:after")} x={1300} y={560} rx={240} ry={240} />
      <Headline f={f} lines={[[official, 'CHECK IT AGAINST AN OFFICIAL ONE', P.ink, 92], [sec, 'THE SEC', P.ink, 116], [d100k, '', P.ink], [d4, '$100,000 · 4% A YEAR', P.ink, 100], [d20, '$100,000 · 4% A YEAR · 20 YEARS', P.ink, 92], [lump, 'ONE LUMP OF MONEY', P.ink, 100], [d025, '', P.ink], [d30, 'NEARLY $30,000 LOWER', P.coralInk, 104], [gap73, '', P.ink], [pattern, 'THE PATTERN IS THE SAME', P.ink, 100], [y20, '', P.ink], [longer, 'THE LONGER YOU INVEST…', P.ink, 100], [costs75, '…THE MORE IT COSTS', P.coralInk, 104]]} />

      {/* # A) our example, then the regulator's building */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, regulator, 10) * 0.5}>
          <SaverJar x={300} y={GROUND} w={200} h={340} fill={0.9} label="A" />
          <SaverJar x={540} y={GROUND} w={200} h={270} fill={0.9} label="B" />
          <Label x={420} y={GROUND + 72} text="OUR EXAMPLE" size={52} font="Bebas Neue" color={P.ink2} />
        </g>
        <g opacity={on(f, regulator, 10)} transform={`translate(0 ${lerp(60, 0, on(f, regulator, 16))})`}>
          <GovBuilding x={1240} y={GROUND} s={1.05} />
          <g opacity={on(f, sec, 8)}><rect x={1140} y={GROUND - 240} width={200} height={70} rx={14} fill={P.navy3} /><text x={1240} y={GROUND - 190} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"', letterSpacing: 8 }}>SEC</text></g>
        </g>
        <g opacity={on(f, comparison, 8)} transform="translate(1690 560)"><rect x={-110} y={-130} width={220} height={260} rx={16} fill={P.card} stroke={P.edge} strokeWidth={3} />
          <rect x={-70} y={-20} width={50} height={110} rx={8} fill={P.gold} /><rect x={20} y={10} width={50} height={80} rx={8} fill={P.gold} /></g>
      </g>}

      {/* # B) the SEC example: one lump, 4% for 20 years, 0.25% vs 1% */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, d025, 10)}>
          <Bag x={560} y={GROUND} s={1.3} o={on(f, d100k, 8)} />
          <g opacity={on(f, d4, 8)}>{[-60, 0, 60].map((dx, k) => <path key={k} d={`M${560 + dx} ${GROUND - 380} l0 -${50 + 16 * Math.sin(f / 8 + k)} m-16 16 l16 -16 l16 16`} fill="none" stroke={P.mint} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />)}</g>
          {/* # not monthly coins: faint falling coins fade away beside the lump */}
          <g opacity={on(f, monthly, 8) * (1 - on(f, same70, 10)) * 0.5}>{[0, 1, 2].map((k) => <Coin key={k} x={1100 + k * 120} y={GROUND - 300 + ((f / 2 + k * 30) % 200)} s={0.6} />)}</g>
          <g opacity={on(f, monthly, 8) * (1 - on(f, same70, 10))}><Label x={1220} y={GROUND + 72} text="MONTHLY SAVINGS" size={48} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, d025, 10)}>
          <SaverJar x={660} y={GROUND} w={300} h={lerp(260, 560, on(f, d208, 20))} fill={0.92} label="0.25% FEE" />
          <g opacity={on(f, d208, 8)}><Label x={660} y={GROUND + 72} text="≈ $208,000" size={64} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, d1, 8)}>
            <SaverJar x={1200} y={GROUND} w={300} h={lerp(260, 560 * 0.856, on(f, d30 - 10, 20))} fill={0.92} label="1% FEE" />
            <g opacity={on(f, lower, 8)}><line x1={820} y1={GROUND - 560} x2={1380} y2={GROUND - 560} stroke={P.coral} strokeWidth={5} strokeDasharray="12 8" /><line x1={1380} y1={GROUND - 560} x2={1380} y2={GROUND - 560 * 0.856} stroke={P.coral} strokeWidth={10} /></g>
          </g>
        </g>
      </g>}

      {/* # C) theirs vs ours, then the two donuts and the time arrow */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, y20, 10)}>
          {[[560, 'SEC: $30,000', 0.25, gap73], [1320, 'OURS: $268,000', 1, ours]].map(([x, t, h, at], k) => <g key={k} opacity={on(f, at as number, 8)}>
            <rect x={(x as number) - 110} y={GROUND - 520 * (h as number) - 20} width={220} height={520 * (h as number)} rx={14} fill={P.coral} />
            <Label x={x as number} y={GROUND + 72} text={t as string} size={56} font="Bebas Neue" color={P.coralInk} />
          </g>)}
          <g opacity={on(f, shorter, 8)}><Label x={560} y={GROUND - 300} text="20 YEARS" size={52} font="Bebas Neue" color={P.ink} /><Label x={1320} y={260} text="40 YEARS" size={52} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, slowly, 8)}><Label x={560} y={GROUND - 240} text="4% A YEAR" size={52} font="Bebas Neue" color={P.ink2} /><Label x={1320} y={320} text="7% A YEAR" size={52} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, y20, 10)}>
          <Donut cx={620} cy={560} r={200} part={10.2} p={on(f, d10, 18)} color={P.coral} rest={P.gold} thick={90} />
          <Label x={620} y={GROUND + 60} text="20 YEARS · ≈ 10%" size={60} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, y40, 8)}>
            <Donut cx={1300} cy={560} r={200} part={21.9} p={on(f, d22, 18)} color={P.coral} rest={P.gold} thick={90} />
            <Label x={1300} y={GROUND + 60} text="40 YEARS · ≈ 22%" size={60} font="Bebas Neue" color={P.ink} />
          </g>
          <g opacity={on(f, years75, 8)}><path d={`M760 300 L${lerp(760, 1160, on(f, years75, 16))} 300`} stroke={P.ink2} strokeWidth={10} strokeLinecap="round" /><path d={`M${lerp(760, 1160, on(f, years75, 16)) - 26} 280 L${lerp(760, 1160, on(f, years75, 16))} 300 L${lerp(760, 1160, on(f, years75, 16)) - 26} 320`} fill="none" stroke={P.ink2} strokeWidth={10} strokeLinecap="round" /></g>
        </g>
      </g>}
      <Vignette id="fe-real" />
    </g>
  )
}

const BEATS = ['s67:check', 's67:official', 's68:regulator', 's68:sec', 's68:comparison', 's69:100000', 's69:4', 's69:20', 's70:lump', 's70:monthly', 's70:same', 's71:025', 's71:208000', 's72:1', 's72:30000', 's72:lower', 's73:gap', 's73:ours', 's73:shorter', 's73:slowly', 's73:pattern', 's74:20', 's74:10', 's74:40', 's74:22', 's75:longer', 's75:years', 's75:costs', "s68:stock", "s74:example", "s74:cost", "s74:after", "s74:what"]
export const FE_REAL = makePiece('fe-real', 'Fee long reality check: the SEC example — $100,000 at 4% for 20 years, 0.25% ends ~$208,000, 1% nearly $30,000 lower; theirs vs ours (shorter, slower, same pattern); after 20 years ~10%, after 40 ~22%; the longer, the more it costs', {
  mood: 'light', Component: Real, beats: BEATS,
  sfx: [['s68:sec', 'pop', 0.25], ['s69:100000', 'cash', 0.3], ['s71:208000', 'ding', 0.25], ['s72:30000', 'thud', 0.3], ['s73:pattern', 'swish', 0.25], ['s74:22', 'thud', 0.3]] })
