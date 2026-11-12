// ---------------------------------------------------------------- s61–s65: 2022 — the year safe bonds broke (navy night)
// A) s61     a shopping basket whose price tag climbs; the Federal Reserve's building with a big brass lever that
//            is pushed up on "pushing interest rates up".
// B) s62     the Fed's rate dial: MARCH 2022 barely above zero → DECEMBER over 4%.
// C) s63     a stack of older bonds paying the old, low rates sits on the bond end of a seesaw; rates go up,
//            the stack goes down, just like Nina's.
// D) s64–65  nearly a century of real data: one bar per year 1928–2025 for 10-year US Treasury bonds (Damodaran);
//            2022's bar drops to −17.8%, the lowest of all; then stocks' 2022 bar (−18%) stands beside it.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline } from '../aimoney/common'
import { Arrow, B, BDefs, BGrain, Basket, Capitol, Certificate, Dial, FLOOR, Flourish, Seesaw, Skyline, Tag, cues, fadeIn, scene, FONT } from './kit'
import { TBOND, YEAR0 } from './data'

const K = {
  early61: 's61:early', everyday61: 's61:everyday', rising61: 's61:rising', federal61: 's61:federal', pushing61: 's61:pushing', slow61: 's61:slow',
  march62: 's62:march', barely62: 's62:barely', zero62: 's62:zero', december62: 's62:december', four62: 's62:four',
  bonds63: 's63:bonds', owned63: 's63:owned', old63: 's63:old', low63: 's63:low', ninas63: "s63:nina's", fell63: 's63:fell',
  ten64: 's64:ten', lost64: 's64:lost', eighteen64: 's64:eighteen',
  worst65: 's65:worst', too65: 's65:too', century65: 's65:century', stocks65: 's65:stocks', eighteen65: 's65:eighteen',
}

const Y2022: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s62') - 4, BC = c('s63') - 4, CD = c('s64') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = fadeIn(f, CD)
  const lever = easeInOut(span(f, t.pushing61, t.pushing61 + 16))
  const rate = lerp(0, 0.375, on(f, t.march62, 10)) + lerp(0, 4.0, easeInOut(span(f, t.december62 - 2, t.four62 + 10)))
  const tilt = 14 * on(f, t.low63, 14)
  // # D: bars, 0 at y 640, 10 px per %
  const grow = span(f, t.ten64 - 4, t.lost64 + 10)
  const BX = 230, BW = 13.6, Y0 = 620, PX = 11
  return (
    <g>
      <BDefs />
      <Skyline night />
      {/* ---------------- A) prices rising, the Fed pushes rates up ---------------- */}
      {A > 0 && <g opacity={A}>
        <Basket x={520} y={FLOOR} s={1.3} o={on(f, t.everyday61 - 2, 8)} />
        <g opacity={on(f, t.rising61 - 2, 8)}>
          <Tag x={520} y={480} text="PRICES RISING" size={52} bg={B.brassD} />
          <Arrow x1={760} y1={700} x2={760} y2={420} p={on(f, t.rising61, 14)} color={B.coral} />
        </g>
        <Capitol x={1360} y={FLOOR} s={0.78} o={on(f, t.federal61 - 2, 8)} color="#D3DBEA" />
        <Tag x={1360} y={FLOOR + 74} text="FEDERAL RESERVE" size={40} bg={B.navyL} o={on(f, t.federal61, 8)} />
        <g opacity={on(f, t.federal61, 8)} transform={`translate(1720 ${FLOOR - 40})`}>
          <rect x={-40} y={-30} width={80} height={60} rx={10} fill={B.brassD} />
          <g transform={`rotate(${lerp(40, -40, lever)})`}><rect x={-10} y={-260} width={20} height={260} rx={8} fill={B.brass} /><circle cy={-270} r={30} fill={B.ox} /></g>
          <Tag x={0} y={-330} text="RATES UP" size={40} bg={B.ox} o={on(f, t.pushing61 + 6, 8)} />
        </g>
      </g>}

      {/* ---------------- B) the rate dial, March → December 2022 ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Dial x={960} y={760} v={rate} max={5} r={300} text="THE FED'S KEY RATE" ink="#E6ECF5" />
        <Tag x={520} y={420} text="MARCH 2022" size={46} bg={B.navyL} o={on(f, t.march62, 8)} />
        <Tag x={520} y={500} text="BARELY ABOVE ZERO" size={36} bg={B.inkSoft} o={on(f, t.zero62, 8)} />
        <Tag x={1400} y={420} text="DECEMBER 2022" size={46} bg={B.ox} o={on(f, t.december62, 8)} />
        <Tag x={1400} y={500} text="OVER 4%" size={46} bg={B.oxD} o={on(f, t.four62, 8)} />
      </g>}

      {/* ---------------- C) the old bonds fall, like Nina's ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Seesaw x={960} y={FLOOR} w={1300} tilt={tilt}
          left={<g><rect x={-130} y={-130} width={260} height={130} rx={16} fill={B.ox} /><text y={-48} textAnchor="middle" fill="#fff" style={{ font: `400 64px ${FONT.big}` }}>RATES</text></g>}
          right={<g opacity={on(f, t.bonds63 - 2, 8)}>{[0, 1, 2, 3].map((k) => <Certificate key={k} x={(k % 2) * 30 - 15} y={-60 - k * 56} s={0.3} n={0} seal={false} amount="" title="OLDER BOND" />)}</g>} />
        <Tag x={1520} y={260} text="PAYING OLD, LOW RATES" size={40} bg={B.green} o={on(f, t.old63, 8)} />
        <Tag x={1520} y={340} text="PRICES FELL" size={46} bg={B.ox} o={on(f, t.fell63, 8)} />
      </g>}

      {/* ---------------- D) nearly a century of data ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <line x1={BX - 20} x2={BX + 98 * BW + 20} y1={Y0} y2={Y0} stroke="#8E9BB7" strokeWidth={3} />
        {TBOND.map((v, k) => { const is22 = YEAR0 + k === 2022; const h = v * PX * (is22 ? span(f, t.lost64 - 2, t.eighteen64 + 6) : grow)
          return <rect key={k} x={BX + k * BW} y={h > 0 ? Y0 - h : Y0} width={BW - 3} height={Math.abs(h)} fill={is22 ? B.coral : v < 0 ? '#8C98B8' : B.mint} opacity={is22 ? 1 : 0.9} stroke={is22 ? '#FFE3D6' : 'none'} strokeWidth={is22 ? 6 * on(f, t.too65 - 2, 6) : 0} /> })}
        <text x={BX} y={Y0 + 260} fill="#B9C3D6" style={{ font: `400 34px ${FONT.big}` }}>1928</text>
        <text x={BX + 98 * BW} y={Y0 + 260} textAnchor="end" fill="#B9C3D6" style={{ font: `400 34px ${FONT.big}` }}>2025</text>
        <Tag x={BX + 94 * BW} y={Y0 + 17.83 * PX + 50} text="2022: −17.8%" size={46} bg={B.ox} o={on(f, t.eighteen64, 8)} />
        <Tag x={1500} y={300} text="10-YEAR US TREASURY BONDS, EACH YEAR" size={34} bg={B.navyL} o={on(f, t.ten64, 8)} />
        <Tag x={1100} y={Y0 + 17.83 * PX + 50} text="WORST YEAR SINCE 1928" size={40} bg={B.oxD} o={on(f, t.worst65, 8)} />
        {on(f, t.stocks65 - 2, 8) > 0.01 && <g opacity={on(f, t.stocks65 - 2, 8)}>
          <rect x={1660} y={Y0} width={80} height={18.04 * PX * span(f, t.stocks65, t.eighteen65 + 4)} fill={B.blue} />
          <Tag x={1700} y={950} text="STOCKS −18%" size={40} bg={B.blueD} o={on(f, t.eighteen65, 8)} />
          <Tag x={1700} y={Y0 - 40} text="2022" size={34} bg={B.navyL} />
        </g>}
        <Tag x={960} y={1050} text="SOURCE: DAMODARAN, NYU (TOTAL RETURNS)" size={24} bg={B.navyL} o={on(f, t.century65, 8)} />
      </g>}

      <Headline f={f} lines={[[t.early61, '2022: PRICES RISE', B.coral, 112], [t.march62, 'RATES SHOOT UP', B.coral, 116], [t.bonds63, 'OLD BONDS FALL', B.coral, 116], [t.ten64, 'THE WORST YEAR', B.coral, 116]]} />
      <Flourish f={f} at={(EXTRA['bd-2022'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_2022 = makePiece('bd-2022', "2022 at night: a shopping basket's price tag climbs and the Federal Reserve's brass lever is pushed to RATES UP; the Fed's key-rate dial swings from barely above zero in March 2022 to over 4% in December; a stack of older bonds paying old, low rates sinks on the seesaw as rates go up; one real bar per year 1928–2025 for 10-year US Treasury bonds, 2022 drops to −17.8%, the worst since 1928, and stocks' 2022 bar of −18% stands beside it", {
  mood: 'dark', Component: Y2022, beats: [...Object.values(K), ...(EXTRA['bd-2022'] ?? [])],
  sfx: [['s61:pushing', 'click', 0.12], ['s62:four', 'riser', 0.08], ['s63:fell', 'thud', 0.1], ['s64:eighteen', 'impact', 0.12]] })
