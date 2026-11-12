// ---------------------------------------------------------------- s34–s38: the lever, part 2 — the ceiling, then lift both
// A) s34     a bank short of cash borrows from the Fed through a copper pipe at 4%: a ceiling plate lowers over the ball.
// B) s35–36  the full gauge: a tall glass column marked 3.5% … 4.25%; the target band 3.75–4% glows; the floor plate at
//            about 3.9% and the ceiling at 4%; the rate ball floats between them. No bank is told: a crossed order paper.
// C) s37     both plates rise together with the band, from 3.5–3.75% to 3.75–4% (September).
// D) s38     the ball's rise pushes coins along a pipe out of the frame toward a street: YOU.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline } from '../aimoney/common'
import { Arrow, Coin, Cross, Engine, F, FDefs, FGrain, FLOOR, FedBuilding, LoanPaper, Mark, MiniBank, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  four34: 's34:four', needs34: 's34:needs', borrow34: 's34:borrow', more34: 's34:more', ceiling34: 's34:ceiling',
  floor35: 's35:floor', target35: 's35:target', three35: 's35:three', four35: 's35:four',
  told36: 's36:told', worse36: 's36:worse',
  higher37: 's37:higher', lifts37: 's37:lifts', together37: 's37:together', september37: 's37:september',
  pay38: 's38:pay', come38: 's38:come',
}
// # gauge: y for a rate (3.25% … 4.5%)
const GY = (r: number) => lerp(940, 300, (r - 3.25) / 1.25)

const Lever2: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s35') - 4
  const A = scene(f, -20, AB), Bs = fadeIn(f, AB)
  const lift = easeInOut(span(f, t.lifts37 - 2, t.together37 + 16)) * 0.25
  const lo = 3.5 + lift, hi = 3.75 + lift, iorb = 3.65 + lift, ceil = 3.75 + lift
  // # before the lift the picture shows today's numbers? no: s35 shows today (3.75–4), s37 replays the September lift
  const replay = on(f, t.higher37 - 4, 8)
  const L = replay > 0.5 ? lo : 3.75, H = replay > 0.5 ? hi : 4.0, FL = replay > 0.5 ? iorb : 3.9, CE = replay > 0.5 ? ceil : 4.0
  const ball = (FL + CE) / 2 - 0.02 + Math.sin(f / 16) * 0.015
  const out = span(f, t.pay38, t.come38 + 20)
  return (
    <g>
      <FDefs />
      <Engine />
      {/* ---------------- A) the ceiling ---------------- */}
      {A > 0 && <g opacity={A}>
        <MiniBank x={360} y={FLOOR} s={0.9} name="SHORT OF CASH" color={F.coralD} o={on(f, t.needs34 - 4, 8)} />
        <FedBuilding x={1440} y={FLOOR} s={0.7} sign="THE FED" />
        <path d="M560 760 L1200 760" stroke="url(#fed-copper)" strokeWidth={26} opacity={on(f, t.borrow34 - 2, 8)} />
        {f > t.borrow34 && [0, 1].map((k) => { const p = ((f - t.borrow34) / 30 + k / 2) % 1; return <Coin key={k} x={lerp(1200, 560, p)} y={720} r={30} /> })}
        <Tag x={880} y={680} text="BORROW FROM THE FED: 4%" size={40} bg={F.copperD} o={on(f, t.four34 - 2, 8)} />
        <g opacity={on(f, t.ceiling34 - 6, 8)}>
          <rect x={560} y={lerp(160, 360, on(f, t.ceiling34 - 4, 12))} width={760} height={36} rx={10} fill="url(#fed-copper)" />
          <circle cx={940} cy={460} r={30} fill={F.coral} stroke="#fff" strokeWidth={5} />
          <Tag x={940} y={560} text="THE CEILING: 4%" size={40} bg={F.copperD} o={on(f, t.ceiling34, 8)} />
        </g>
      </g>}

      {/* ---------------- B–D) the gauge ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <g opacity={1 - on(f, t.pay38 - 2, 10)}>
          <rect x={760} y={260} width={400} height={720} rx={30} fill="#E8F3F3" opacity={0.92} />
          {[3.5, 3.75, 4.0, 4.25].map((r) => <g key={r}><line x1={760} x2={790} y1={GY(r)} y2={GY(r)} stroke={F.ink} strokeWidth={4} /><text x={740} y={GY(r) + 12} textAnchor="end" fill="#DDE4EE" style={{ font: `400 36px ${FONT.big}` }}>{r.toFixed(2)}%</text></g>)}
          <rect x={790} y={GY(H)} width={340} height={GY(L) - GY(H)} fill={F.tealL} opacity={0.9} />
          <rect x={780} y={GY(FL) - 8} width={360} height={16} rx={6} fill={F.copper} />
          <rect x={780} y={GY(CE) - 8} width={360} height={16} rx={6} fill={F.copperD} />
          <circle cx={960} cy={GY(ball) } r={22} fill={F.coral} stroke="#fff" strokeWidth={4} />
          <Tag x={1450} y={GY(CE)} text={replay > 0.5 ? 'CEILING' : 'CEILING 4%'} size={36} bg={F.copperD} />
          <Tag x={1450} y={GY(FL) + 40} text={replay > 0.5 ? 'FLOOR' : 'FLOOR ≈ 3.9%'} size={36} bg={F.copper} />
          <Tag x={460} y={GY((L + H) / 2)} text={`TARGET ${L.toFixed(2)}–${H.toFixed(2)}%`} size={36} bg={F.teal} o={on(f, t.target35 - 2, 8)} />
          <g opacity={on(f, t.told36 - 2, 8) * (1 - on(f, t.higher37 - 4, 8))}>
            <LoanPaper x={1600} y={880} s={0.5} title="ORDER" />
            <Cross x={1600} y={880} r={80} p={on(f, t.told36 + 4, 10)} />
          </g>
          <Tag x={1450} y={880} text="SEPTEMBER: BOTH UP 0.25" size={34} bg={F.coral} o={on(f, t.september37, 8)} />
        </g>
        {out > 0.01 && <g opacity={on(f, t.pay38 - 2, 8)}>
          <path d="M300 640 L1700 640" stroke="url(#fed-copper)" strokeWidth={30} />
          {[0, 1, 2].map((k) => { const p = ((out * 2 + k / 3)) % 1; return <Coin key={k} x={lerp(320, 1700, p)} y={600} r={34} /> })}
          <Tag x={960} y={520} text="BANKS PAY MORE FOR MONEY" size={42} bg={F.coralD} />
          <Tag x={1660} y={760} text="→ YOU" size={52} bg={F.teal} o={on(f, t.come38, 8)} />
        </g>}
      </g>}

      <Headline f={f} lines={[[t.four34, 'STEP 4: A CEILING', F.white, 112], [t.floor35, 'FLOOR AND CEILING', F.white, 112], [t.higher37, 'TO RAISE RATES: LIFT BOTH', F.gold, 104], [t.pay38, 'AND THEN, YOU', F.white, 112]]} />
      <Mark f={f} at={(EXTRA['fed-lever2'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_LEVER2 = makePiece('fed-lever2', "The lever, part 2: a bank short of cash borrows from the Fed through a copper pipe at 4% and a ceiling plate lowers over the rate ball; a tall glass gauge from 3.5% to 4.25% with the target band 3.75–4% glowing, the floor plate near 3.9% and the ceiling at 4%, the ball floating between them; an order paper crossed out (no bank is told what to charge); replaying September, both plates and the band lift 0.25 together; coins push along a pipe toward you, banks pay more for money", {
  mood: 'dark', Component: Lever2, beats: [...Object.values(K), ...(EXTRA['fed-lever2'] ?? [])],
  sfx: [['s34:ceiling', 'thud', 0.1], ['s37:lifts', 'riser', 0.08], ['s38:come', 'chime', 0.08]] })
