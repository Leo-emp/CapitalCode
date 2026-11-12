// ---------------------------------------------------------------- s64–s73: does the Fed print money?
// A) s64     two workshops: the TREASURY's press printing bills and the MINT stamping coins; the Fed's own press gets a cross.
// B) s65–67  a dealer hands a government bond to the Fed; in return a keyboard key is pressed and water (new reserves)
//            fills the bank's tank at the Fed from nothing: NEW RESERVES, CREATED WITH A KEYSTROKE.
// C) s68–70  the Fed's pile of assets as a tower of bond papers: it grows in 2020 to ≈ $8.9 TRILLION (2022), then shrinks
//            to ≈ $6.5 TRILLION (2025).
// D) s71–72  today's pile split in two: TREASURIES ≈ $4.6T and MORTGAGE BONDS ≈ $1.9T; the tank can drain back too.
// E) s73     Congress's dome and the Fed side by side: who keeps it in check.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Arrow, Capitol, Coin, Cross, F, FDefs, FGrain, FLOOR, FedBuilding, Hall, LoanPaper, Mark, Tag, Tank, cues, fadeIn, scene, FONT } from './kit'
import { Press } from './hook'

const K = {
  paper64: 's64:paper', treasury64: 's64:treasury', coins64: 's64:coins',
  different65: 's65:different', reserves65: 's65:reserves',
  buys66: 's66:buys', bond66: 's66:bond', dealer66: 's66:dealer', adding66: 's66:adding', account66: 's66:account',
  exist67: 's67:exist', keystrokes67: 's67:keystrokes',
  bad68: 's68:bad', twenty68: 's68:twenty', bought68: 's68:bought', long68: 's68:long', credit68: 's68:credit',
  pile69: 's69:pile', eight69: 's69:eight', twenty69: 's69:twenty',
  shrank70: 's70:shrank', six70: 's70:six',
  today71: 's71:today', four71: 's71:four', treasury71: 's71:treasury', one71: 's71:one', mortgage71: 's71:mortgage',
  creates72: 's72:creates', reserves72: 's72:reserves', back72: 's72:back',
  check73: 's73:check',
}
const Key: React.FC<{ x: number; y: number; press: number; o?: number }> = ({ x, y, press, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <rect x={-140} y={-40} width={280} height={80} rx={14} fill={F.slate} />
    <rect x={-60} y={-70 + 16 * press} width={120} height={70} rx={12} fill={F.marbleL} stroke={F.inkL} strokeWidth={4} />
    <text y={-24 + 16 * press} textAnchor="middle" fill={F.ink} style={{ font: `400 34px ${FONT.big}` }}>ENTER</text>
  </g>
)
const Mint: React.FC<{ x: number; y: number; s?: number; hit: number }> = ({ x, y, s = 1, hit }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={160} ry={14} fill="#000" opacity={0.15} />
    <rect x={-120} y={-80} width={240} height={80} rx={12} fill={F.slateL} />
    <rect x={-20} y={-320} width={40} height={180} fill={F.marbleDD} />
    <rect x={-70} y={-160 + 40 * hit} width={140} height={60} rx={8} fill={F.copperD} />
    <ellipse cx={0} cy={-90} rx={46} ry={14} fill={F.gold} />
  </g>
)

const Print: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s65') - 4, BC = c('s68') - 4, CD = c('s71') - 4, DE = c('s73') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = scene(f, CD, DE), Es = fadeIn(f, DE)
  const hand = easeInOut(span(f, t.bond66 - 2, t.bond66 + 20))
  const press = on(f, t.keystrokes67 - 4, 4) * (1 - on(f, t.keystrokes67 + 6, 6))
  const fill = on(f, t.adding66, 30)
  // # C: tower height = trillions × 70 px
  const grow = lerp(4.2, 8.9, easeInOut(span(f, t.bought68, t.eight69 + 10)))
  const tr = lerp(grow, 6.5, easeInOut(span(f, t.shrank70, t.six70 + 10)))
  const drain = on(f, t.back72 - 2, 20)
  return (
    <g>
      <FDefs />
      {/* ---------------- A) not the paper kind ---------------- */}
      {A > 0 && <g opacity={A}>
        <Hall />
        <g opacity={0.9}><Press x={360} y={FLOOR} s={0.8} run={0} /><Cross x={360} y={760} r={90} p={on(f, t.paper64, 10)} /><Tag x={360} y={FLOOR + 74} text="THE FED" size={38} bg={F.slate} /></g>
        <g opacity={on(f, t.treasury64 - 2, 8)}><Press x={960} y={FLOOR} s={0.8} run={f / 40} /><Tag x={960} y={FLOOR + 74} text="TREASURY: BILLS" size={38} bg={F.green} /></g>
        <g opacity={on(f, t.coins64 - 2, 8)}><Mint x={1560} y={FLOOR} hit={Math.abs(Math.sin(f / 8))} /><Tag x={1560} y={FLOOR + 74} text="THE MINT: COINS" size={38} bg={F.goldD} /></g>
      </g>}

      {/* ---------------- B) creating reserves ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Hall />
        <FedBuilding x={1380} y={FLOOR} s={0.62} sign="THE FED" />
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [t.bond66, 'offer', 'smiling']]} x={260} y={1060} s={0.75} o={on(f, t.buys66 - 4, 8)} />
        <Tag x={260} y={FLOOR + 120} text="BIG BANK / DEALER" size={32} bg={F.slate} o={on(f, t.dealer66, 8)} />
        <LoanPaper x={lerp(460, 1180, hand)} y={lerp(640, 560, hand) - Math.sin(Math.PI * hand) * 80} s={0.4} title="BOND" o={on(f, t.bond66 - 2, 8) * (1 - on(f, t.adding66 + 6, 8))} />
        <Tank x={760} y={FLOOR} level={lerp(0.15, 0.8, fill)} label="BANK'S ACCOUNT AT THE FED" w={260} h={320} o={on(f, t.reserves65 - 2, 8)} />
        <Tag x={760} y={480} text="NEW RESERVES" size={42} bg={F.teal} o={on(f, t.adding66, 8)} />
        <Key x={1080} y={380} press={press} o={on(f, t.exist67 - 4, 8)} />
        <Tag x={1080} y={300} text="CREATED WITH A KEYSTROKE" size={36} bg={F.copperD} o={on(f, t.keystrokes67, 8)} />
      </g>}

      {/* ---------------- C) the pile of assets ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Hall />
        <g>{Array.from({ length: Math.round(tr * 10) }, (_, k) => <rect key={k} x={760 + (k % 2) * 10} y={FLOOR - 7 * (k + 1)} width={400} height={6} rx={2} fill={k % 2 ? '#FFF6E0' : '#E9DDBF'} />)}</g>
        <Tag x={960} y={FLOOR + 74} text="THE FED'S ASSETS" size={40} bg={F.slate} />
        <Tag x={1450} y={FLOOR - 8.9 * 70} text="≈ $8.9 TRILLION · 2022" size={40} bg={F.coral} o={on(f, t.eight69, 8)} />
        <Tag x={470} y={FLOOR - 6.5 * 70} text="≈ $6.5 TRILLION · 2025" size={40} bg={F.teal} o={on(f, t.six70, 8)} />
        <Tag x={470} y={340} text="2020: BUYING BONDS" size={38} bg={F.copperD} o={on(f, t.twenty68, 8) * (1 - on(f, t.shrank70 - 2, 8))} />
      </g>}

      {/* ---------------- D) what it holds today ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Hall />
        <g>{Array.from({ length: 46 }, (_, k) => <rect key={k} x={460 + (k % 2) * 10} y={FLOOR - 9 * (k + 1)} width={380} height={8} rx={2} fill={k % 2 ? '#FFF6E0' : '#E9DDBF'} opacity={on(f, t.four71 - 2, 10)} />)}</g>
        <Tag x={650} y={FLOOR + 74} text="TREASURIES ≈ $4.6T" size={40} bg={F.green} o={on(f, t.treasury71, 8)} />
        <g>{Array.from({ length: 19 }, (_, k) => <rect key={k} x={1080 + (k % 2) * 10} y={FLOOR - 9 * (k + 1)} width={380} height={8} rx={2} fill={k % 2 ? '#E3EEF4' : '#CFDDE6'} opacity={on(f, t.one71 - 2, 10)} />)}</g>
        <Tag x={1270} y={FLOOR + 74} text="MORTGAGE BONDS ≈ $1.9T" size={40} bg={F.slateL} o={on(f, t.mortgage71, 8)} />
        <Tank x={1640} y={FLOOR - 40} level={lerp(0.75, 0.35, drain)} w={180} h={240} o={on(f, t.reserves72 - 2, 8)} label="RESERVES" />
        <Tag x={1640} y={520} text="CAN DRAIN BACK" size={34} bg={F.teal} o={on(f, t.back72, 8)} />
      </g>}

      {/* ---------------- E) who keeps it in check ---------------- */}
      {Es > 0 && <g opacity={Es}>
        <Hall />
        <Capitol x={560} y={FLOOR} s={0.85} />
        <FedBuilding x={1400} y={FLOOR} s={0.62} sign="THE FED" />
        <Arrow x1={900} y1={640} x2={1100} y2={640} p={on(f, t.check73 - 4, 12)} color={F.copperD} />
      </g>}

      <Headline f={f} lines={[[c('s64'), 'NOT THE PAPER KIND', F.ink, 112], [t.different65, 'A DIFFERENT KIND OF MONEY', F.ink, 102], [t.bad68, 'BIG PURCHASES, THEN BACK', F.ink, 102], [t.today71, 'WHAT IT HOLDS TODAY', F.ink, 110], [t.check73, 'WHO KEEPS IT IN CHECK?', F.ink, 106]]} />
      <Mark f={f} at={(EXTRA['fed-print'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_PRINT = makePiece('fed-print', "Does the Fed print money: the Fed's press crossed out, the Treasury's press printing bills and the Mint stamping coins; a dealer hands a government bond to the Fed and, with one keystroke, water (new reserves) fills the bank's tank at the Fed from nothing; the Fed's pile of assets grows from 2020 to about $8.9 trillion in 2022, then shrinks to about $6.5 trillion in 2025; today's holdings split into Treasuries about $4.6 trillion and mortgage bonds about $1.9 trillion, and the reserves tank can drain back; Congress's dome and the Fed side by side", {
  mood: 'light', Component: Print, beats: [...Object.values(K), ...(EXTRA['fed-print'] ?? [])],
  sfx: [['s64:paper', 'pop', 0.08], ['s67:keystrokes', 'click', 0.12], ['s69:eight', 'riser', 0.08], ['s70:six', 'swish', 0.08]] })
