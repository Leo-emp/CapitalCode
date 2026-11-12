// ---------------------------------------------------------------- s18–s26: the two jobs, and why they pull apart
// A) s18–21  two goal flags planted on a green field: MAXIMUM EMPLOYMENT (a row of workers fills in) and STABLE PRICES
//            (a price tag that creeps up slowly); a 2% badge pins to the price flag.
// B) s22–24  the same two teams in a tug of war over one rope, with the Fed's lever in the middle: lever up (dearer
//            borrowing) → the prices team is pulled back but a worker drops out; lever down → workers return, the price
//            tag climbs.
// C) s25     September 2026: the statement card — SOLID ECONOMY · INFLATION STILL TOO HIGH — and the lever goes up.
// D) s26     a question: the committee room's door with a big lever behind it.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Arrow, F, FDefs, FGrain, FLOOR, FedBuilding, Hall, Lever, Mark, Seat, Street, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  congress18: 's18:congress', two18: 's18:two',
  first19: 's19:first', employment19: 's19:employment', working19: 's19:working',
  second20: 's20:second', stable20: 's20:stable', slowly20: 's20:slowly',
  number21: 's21:number', two21: 's21:two',
  tricky22: 's22:tricky', pull22: 's22:pull',
  fight23: 's23:fight', expensive23: 's23:expensive', cost23: 's23:cost',
  protect24: 's24:protect', cheaper24: 's24:cheaper', push24: 's24:push',
  september25: 's25:september', solid25: 's25:solid', inflation25: 's25:inflation', raised25: 's25:raised',
  committee26: 's26:committee', raise26: 's26:raise',
}
const PriceTagF: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; color?: string }> = ({ x, y, text, s = 1, o = 1, color = F.coral }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-120 -60 L80 -60 L130 0 L80 60 L-120 60 Z" fill={color} stroke={F.coralD} strokeWidth={5} /><circle cx={84} cy={0} r={12} fill="#fff" />
    <text x={-20} y={22} textAnchor="middle" fill="#fff" style={{ font: `400 64px ${FONT.big}` }}>{text}</text>
  </g>
)

const Jobs: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s22') - 4, BC = c('s25') - 4, CD = c('s26') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = fadeIn(f, CD)
  const workers = Math.floor(lerp(0, 6, span(f, t.employment19, t.working19 + 12)) + 0.001)
  // # B: lever up on "expensive", down on "cheaper"
  const lv = on(f, t.expensive23 - 2, 12) - 2 * on(f, t.cheaper24 - 2, 12)
  const lost = on(f, t.cost23 - 2, 10) * (1 - on(f, t.protect24, 10))
  const rope = 60 * lv
  const priceUp = on(f, t.push24, 14)
  return (
    <g>
      <FDefs />
      {/* ---------------- A) two goals ---------------- */}
      {A > 0 && <g opacity={A}>
        <Street />
        {[[480, F.teal, 'MAXIMUM EMPLOYMENT', t.first19], [1440, F.coral, 'STABLE PRICES', t.second20]].map(([x, col, txt, at], k) => { const o = on(f, (at as number) - 2, 8); return o > 0.01 && <g key={k} opacity={o}>
          <rect x={(x as number) - 8} y={300} width={16} height={FLOOR - 300} fill={F.copperD} />
          <path d={`M${(x as number) + 8} 310 L${(x as number) + 300} 360 L${(x as number) + 8} 410 Z`} fill={col as string} />
          <Tag x={x as number} y={FLOOR + 74} text={txt as string} size={40} bg={col as string} />
        </g> })}
        {Array.from({ length: workers }, (_, k) => <Seat key={k} x={600 + k * 92} y={FLOOR - 10} s={0.8} color={F.tealD} />)}
        <PriceTagF x={1270} y={lerp(760, 690, on(f, t.slowly20, 30))} text="$" s={0.9} o={on(f, t.stable20, 8)} />
        <g opacity={on(f, t.two21 - 2, 8)} transform="translate(1600 560)"><circle r={78} fill={F.gold} stroke={F.goldD} strokeWidth={8} /><text y={24} textAnchor="middle" fill={F.goldD} style={{ font: `400 72px ${FONT.big}` }}>2%</text></g>
        <Tag x={1600} y={680} text="A YEAR" size={34} bg={F.goldD} o={on(f, t.two21, 8)} />
      </g>}

      {/* ---------------- B) the tug of war ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Street />
        <line x1={300 + rope} x2={1620 + rope} y1={760} y2={760} stroke="#A07B4E" strokeWidth={14} />
        <rect x={950 + rope} y={740} width={20} height={40} fill={F.coral} />
        {Array.from({ length: 4 }, (_, k) => <g key={k} opacity={k === 3 ? 1 - lost : 1}><Seat x={300 + k * 95 + rope} y={FLOOR - 10} s={0.9} color={F.tealD} /></g>)}
        {lost > 0.01 && <Seat x={200} y={FLOOR - 10 + 40 * lost} s={0.9} color={F.tealD} o={lost * 0.6} />}
        <Tag x={460} y={FLOOR + 74} text="JOBS" size={44} bg={F.teal} />
        {Array.from({ length: 4 }, (_, k) => <Seat key={k} x={1330 + k * 95 + rope} y={FLOOR - 10} s={0.9} color={F.coralD} />)}
        <Tag x={1480} y={FLOOR + 74} text="PRICES" size={44} bg={F.coral} />
        <PriceTagF x={1480} y={lerp(560, 440, priceUp)} text="$" s={0.8} />
        <Lever x={960} y={600} v={lv} s={0.8} o={on(f, t.fight23 - 6, 8)} />
        <Tag x={960} y={300} text={lv > 0.3 ? 'BORROWING DEARER' : lv < -0.3 ? 'BORROWING CHEAPER' : 'ONE LEVER'} size={44} bg={lv < -0.3 ? F.teal : F.coralD} o={on(f, t.fight23 - 4, 8)} />
        <Tag x={460} y={560} text="CAN COST JOBS" size={36} bg={F.slate} o={on(f, t.cost23, 8) * (1 - on(f, t.protect24 - 2, 8))} />
        <Tag x={1480} y={320} text="PRICES PUSHED UP" size={36} bg={F.coralD} o={on(f, t.push24, 8)} />
      </g>}

      {/* ---------------- C) September ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Hall />
        <g opacity={on(f, t.september25 - 4, 8)} transform="translate(640 600)">
          <rect x={-320} y={-260} width={640} height={520} rx={18} fill="#000" opacity={0.12} transform="translate(10 12)" />
          <rect x={-320} y={-260} width={640} height={520} rx={18} fill="#fff" />
          <rect x={-320} y={-260} width={640} height={90} rx={18} fill={F.slate} /><text y={-200} textAnchor="middle" fill="#fff" style={{ font: `400 44px ${FONT.big}`, letterSpacing: 4 }}>FED STATEMENT · SEPT 16, 2026</text>
          <g opacity={on(f, t.solid25, 8)}><rect x={-260} y={-120} width={520} height={90} rx={14} fill={F.greenL} /><text y={-60} textAnchor="middle" fill={F.greenD} style={{ font: `400 50px ${FONT.big}` }}>ECONOMY: SOLID</text></g>
          <g opacity={on(f, t.inflation25, 8)}><rect x={-260} y={10} width={520} height={90} rx={14} fill={F.coralL} /><text y={70} textAnchor="middle" fill={F.coralD} style={{ font: `400 50px ${FONT.big}` }}>INFLATION: TOO HIGH</text></g>
        </g>
        <Lever x={1400} y={FLOOR} v={on(f, t.raised25 - 2, 12)} s={1.1} />
        <Tag x={1400} y={FLOOR + 74} text="RATES UP" size={44} bg={F.coral} o={on(f, t.raised25, 8)} />
      </g>}

      {/* ---------------- D) how? ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Hall />
        <FedBuilding x={760} y={FLOOR} s={0.85} />
        <Lever x={1480} y={FLOOR} v={0.2 * Math.sin(f / 10)} s={1} o={on(f, t.raise26 - 4, 8)} />
        <Arrow x1={1100} y1={600} x2={1300} y2={600} p={on(f, t.raise26, 10)} color={F.copperD} />
      </g>}

      <Headline f={f} lines={[[t.congress18, 'TWO JOBS', F.ink, 120], [t.tricky22, 'THEY PULL AGAINST EACH OTHER', F.ink, 98], [t.september25, 'SEPTEMBER: RATES UP', F.coral, 108], [t.committee26, 'BUT HOW?', F.ink, 120]]} />
      <Mark f={f} at={(EXTRA['fed-jobs'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_JOBS = makePiece('fed-jobs', "Two jobs: a MAXIMUM EMPLOYMENT flag with a row of workers filling in and a STABLE PRICES flag with a price tag creeping slowly, a 2% a year badge; a tug of war between JOBS and PRICES with the Fed's lever in the middle — lever up makes borrowing dearer, the prices team is pulled back but a worker drops out; lever down, workers return and the price tag climbs; the September 16, 2026 statement card, economy solid, inflation too high, and the lever goes up; the Fed building beside its lever", {
  mood: 'light', Component: Jobs, beats: [...Object.values(K), ...(EXTRA['fed-jobs'] ?? [])],
  sfx: [['s21:two', 'ding', 0.08], ['s23:expensive', 'click', 0.1], ['s24:cheaper', 'click', 0.1], ['s25:raised', 'click', 0.12]] })
