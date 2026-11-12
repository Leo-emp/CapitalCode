// ---------------------------------------------------------------- s25–s31: who borrows, and the risk of not being paid
// A) s25–s28 a skyline with three borrowers in a row, lit one at a time: the domed government (Nina's note), a
//            city hall that grows a school, a road and a hospital around it, a factory that gets a new machine.
// B) s29     Nina holds her certificate; coins come along a dotted path from a borrower… then stop: the coin
//            falls, the path breaks, a red DEFAULT stamp lands on the certificate.
// C) s30–31  the safest borrower on a deep stone base vs a small shop on thin stilts with a shaky profit line;
//            the shop wobbles and gets a cross.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { B, BDefs, BGrain, Capitol, Certificate, CityHall, Coin, Cross, Factory, FLOOR, Flourish, Parchment, Skyline, Tag, Tick, cues, fadeIn, scene, FONT } from './kit'

const K = {
  three25: 's25:three', borrowers25: 's25:borrowers',
  gov26: 's26:governments', treasury26: 's26:treasury',
  cities27: 's27:cities', states27: 's27:states', schools27: 's27:schools', roads27: 's27:roads', hospitals27: 's27:hospitals',
  companies28: 's28:companies', factories28: 's28:factories', equipment28: 's28:equipment', older28: 's28:older',
  risk29: 's29:risk', lender29: 's29:lender', not29: 's29:not', pay29: 's29:pay', default29: 's29:default',
  gov30: 's30:government', safest30: 's30:safest', world30: 's30:world',
  small31: 's31:small', shaky31: 's31:shaky', not31: 's31:not',
}

const MiniBuilding: React.FC<{ x: number; o: number; kind: 'school' | 'hospital' }> = ({ x, o, kind }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${FLOOR}) scale(${0.6 + 0.4 * o})`}>
    <ellipse cx={0} cy={4} rx={110} ry={10} fill="#000" opacity={0.14} />
    <rect x={-90} y={-150} width={180} height={150} fill={kind === 'school' ? B.brassL : '#FFFFFF'} stroke={kind === 'school' ? B.brassD : B.blueD} strokeWidth={5} />
    {kind === 'school' ? <><path d="M-105 -150 L0 -220 L105 -150 Z" fill={B.brassD} /><circle cx={0} cy={-175} r={14} fill="#fff" /></> :
      <><rect x={-90} y={-180} width={180} height={34} fill={B.blueD} /><rect x={-12} y={-130} width={24} height={64} fill={B.ox} /><rect x={-32} y={-110} width={64} height={24} fill={B.ox} /></>}
    <rect x={-24} y={-60} width={48} height={60} fill={kind === 'school' ? B.brassD : B.blueD} />
  </g>
)
const Gear: React.FC<{ x: number; y: number; o: number; a: number }> = ({ x, y, o, a }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${a})`}>
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-14} y={-70} width={28} height={30} rx={4} fill={B.inkSoft} transform={`rotate(${k * 45})`} />)}
    <circle r={50} fill={B.inkSoft} /><circle r={18} fill={B.parch} />
  </g>
)
// # a small shop on thin stilts (a shaky borrower)
const Shop: React.FC<{ x: number; y: number; o: number; wob: number }> = ({ x, y, o, wob }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={4} rx={180} ry={14} fill="#000" opacity={0.14} />
    <g transform={`rotate(${wob * 5} 0 0)`}>
      {[-120, -40, 40, 120].map((d, k) => <line key={k} x1={d} y1={0} x2={d + (k % 2 ? 10 : -10)} y2={-200} stroke="#8F7350" strokeWidth={10} />)}
      <rect x={-160} y={-400} width={320} height={200} fill={B.oxL} stroke={B.ox} strokeWidth={5} />
      <path d="M-180 -400 L180 -400 L160 -450 L-160 -450 Z" fill={B.ox} />
      {[-120, -40, 40, 120].map((d) => <path key={d} d={`M${d - 40} -400 Q${d} -370 ${d + 40} -400`} fill={B.ox} />)}
      <rect x={-110} y={-350} width={110} height={90} rx={6} fill="#fff" opacity={0.8} /><rect x={40} y={-340} width={70} height={140} fill={B.ox} />
    </g>
  </g>
)

const Risk1: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s29') - 4, BC = c('s30') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = fadeIn(f, BC)
  // # A: which borrower is lit
  const lit = (a: number, b: number) => 0.35 + 0.65 * Math.max(on(f, a - 2, 8) * (1 - on(f, b - 2, 8)), f < t.gov26 - 2 ? 1 : 0)
  // # B: coins travel until "not", then the last one drops
  const stop = on(f, t.not29, 6)
  return (
    <g>
      <BDefs />
      {/* ---------------- A) three kinds of borrowers ---------------- */}
      {A > 0 && <g opacity={A}>
        <Skyline />
        <g opacity={lit(t.gov26, t.cities27)}><Capitol x={330} y={FLOOR} s={0.62} /></g>
        <Tag x={330} y={FLOOR + 74} text="GOVERNMENTS" size={38} bg={B.greenD} o={on(f, t.gov26 - 2, 8)} />
        <Certificate x={330} y={420} s={0.36} n={0} o={on(f, t.treasury26, 8) * (1 - on(f, t.cities27 - 2, 8))} />
        <g opacity={lit(t.cities27, t.companies28)}>
          <CityHall x={960} y={FLOOR} s={0.66} />
          <MiniBuilding x={690} o={on(f, t.schools27 - 2, 10)} kind="school" />
          <MiniBuilding x={1230} o={on(f, t.hospitals27 - 2, 10)} kind="hospital" />
          {on(f, t.roads27 - 2, 10) > 0.01 && <g opacity={on(f, t.roads27 - 2, 10)}><path d={`M${960 - 330 * on(f, t.roads27, 14)} ${FLOOR + 60} L${960 + 330 * on(f, t.roads27, 14)} ${FLOOR + 60}`} stroke="#6E6E6E" strokeWidth={40} />
            <path d={`M${960 - 300 * on(f, t.roads27, 14)} ${FLOOR + 60} L${960 + 300 * on(f, t.roads27, 14)} ${FLOOR + 60}`} stroke="#F2E6C8" strokeWidth={6} strokeDasharray="24 20" /></g>}
        </g>
        <Tag x={960} y={FLOOR + 130} text="CITIES AND STATES" size={38} bg={B.ox} o={on(f, t.cities27 - 2, 8)} />
        <g opacity={lit(t.companies28, 99999)}>
          <Factory x={1560} y={FLOOR} s={0.72} smoke={on(f, t.factories28, 6) * ((f / 50) % 1)} />
          <Gear x={1830} y={760} o={on(f, t.equipment28 - 2, 8)} a={f * 3} />
        </g>
        <Tag x={1560} y={FLOOR + 74} text="COMPANIES" size={38} bg={B.blueD} o={on(f, t.companies28 - 2, 8)} />
      </g>}

      {/* ---------------- B) default ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Parchment />
        <Person f={f} who="investorF" beats={[[0, 'hold', 'smiling'], [t.not29, 'shock', 'shocked'], [t.default29, 'despair', 'worried']]} x={280} y={1060} s={0.8} />
        <Certificate x={760} y={560} s={0.6} n={0} title="COMPANY BOND" rate="" />
        {on(f, t.default29 - 2, 6) > 0.01 && <g opacity={on(f, t.default29 - 2, 6)} transform={`translate(760 600) rotate(-12) scale(${lerp(1.5, 1, on(f, t.default29 - 2, 8))})`}>
          <rect x={-170} y={-50} width={340} height={100} rx={12} fill="none" stroke={B.ox} strokeWidth={10} /><text y={32} textAnchor="middle" fill={B.ox} style={{ font: `400 84px ${FONT.big}`, letterSpacing: 8 }}>DEFAULT</text></g>}
        <Factory x={1560} y={FLOOR} s={0.8} />
        <path d="M1380 640 Q1200 540 1060 600" stroke={B.brassD} strokeWidth={6} strokeDasharray="14 12" fill="none" opacity={on(f, t.risk29, 8) * (1 - 0.6 * stop)} />
        {f > t.risk29 && f < t.not29 + 4 && [0, 1].map((k) => { const p = ((f - t.risk29) / 24 + k / 2) % 1; return <Coin key={k} x={lerp(1380, 1060, p)} y={lerp(640, 600, p) - Math.sin(Math.PI * p) * 80} r={30} /> })}
        {stop > 0.01 && <Coin x={1240} y={lerp(560, FLOOR - 30, span(f, t.not29, t.not29 + 14))} r={30} o={1 - on(f, t.default29, 8)} />}
        <Cross x={1220} y={560} r={60} p={on(f, t.pay29, 10)} />
        <Tag x={760} y={300} text="THE LENDER'S RISK" size={40} bg={B.ink} o={on(f, t.lender29, 8) * (1 - on(f, t.default29 - 2, 6))} />
      </g>}

      {/* ---------------- C) safe vs shaky ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Skyline />
        <rect x={250} y={FLOOR - 60} width={560} height={70} rx={8} fill={B.stoneD} opacity={on(f, t.gov30 - 4, 8)} />
        <rect x={270} y={FLOOR - 40} width={520} height={18} fill={B.stone} opacity={on(f, t.gov30 - 4, 8)} />
        <g opacity={on(f, t.gov30 - 4, 8)}><Capitol x={530} y={FLOOR - 60} s={0.78} /></g>
        <Tick x={530} y={300} r={46} p={on(f, t.safest30, 8)} />
        <Tag x={530} y={FLOOR + 74} text="US GOVERNMENT" size={40} bg={B.greenD} o={on(f, t.gov30 - 2, 8)} />
        <Shop x={1400} y={FLOOR} o={on(f, t.small31 - 2, 8)} wob={on(f, t.shaky31, 6) * Math.sin(f / 3.5)} />
        {on(f, t.shaky31 - 2, 8) > 0.01 && <path d="M1600 330 L1640 380 L1680 340 L1720 420 L1760 400 L1800 470" stroke={B.ox} strokeWidth={8} fill="none" strokeLinejoin="round" opacity={on(f, t.shaky31 - 2, 8)} />}
        <Tag x={1725} y={530} text="SHAKY PROFITS" size={34} bg={B.ox} o={on(f, t.shaky31, 8)} />
        <Tag x={1400} y={FLOOR + 74} text="SMALL COMPANY" size={40} bg={B.ox} o={on(f, t.small31, 8)} />
        <Cross x={1400} y={600} r={80} p={on(f, t.not31, 10)} />
      </g>}

      <Headline f={f} lines={[[t.three25, 'WHO BORROWS', B.ink, 116], [t.risk29, 'THE ONE BIG RISK', B.ox, 112], [t.gov30, 'SAFE VS SHAKY', B.ink, 116]]} />
      <Flourish f={f} at={(EXTRA['bd-risk1'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_RISK1 = makePiece('bd-risk1', "Who borrows: a skyline of three borrowers lit one at a time — the domed government (Nina's note), a city hall that grows a school, a road and a hospital, a factory that gets a new machine; Nina holds a company bond while coins come along a dotted path from a factory, then stop, the coin falls, a cross, a red DEFAULT stamp; the US government on a deep stone base with a tick vs a small shop on thin stilts with a shaky profit line that wobbles and is crossed out", {
  mood: 'light', Component: Risk1, beats: [...Object.values(K), ...(EXTRA['bd-risk1'] ?? [])],
  sfx: [['s29:not', 'thud', 0.1], ['s29:default', 'impact', 0.12], ['s31:not', 'pop', 0.1]] })
