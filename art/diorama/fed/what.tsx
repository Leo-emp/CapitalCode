// ---------------------------------------------------------------- s8–s17: what the Fed is
// A) s8–s10  the marble Fed building, 1913 stamped on its step; a shopper walks to its door and is turned away (cross);
//            copper pipes run from it to three small banks and to the Capitol (bank for banks and for the
//            government); then a row of small banks with cracks steadied by the Fed's pipes (after bank panics).
// B) s11–s13 the three parts, one at a time: a row of seven governor seats (each 14 YEARS); a strip of twelve regional
//            bank pins from BOSTON to SAN FRANCISCO.
// C) s14–16  the committee table: 7 governor seats + the New York seat + 4 rotating seats that light in turn;
//            a ring of eight meeting dots; one rate dial in the middle.
// D) s17     an archery target: what they're aiming for.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Capitol, CalPage, Cross, F, FDefs, FGrain, FLOOR, FedBuilding, Hall, Mark, MiniBank, Seat, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  reserve8: 's8:reserve', central8: 's8:central', congress8: 's8:congress', thirteen8: 's8:thirteen',
  walk9: 's9:walk', banks9: 's9:banks', government9: 's9:government',
  panics10: 's10:panics', steady10: 's10:steady', trouble10: 's10:trouble',
  three11: 's11:three',
  washington12: 's12:washington', seven12: 's12:seven', president12: 's12:president', senate12: 's12:senate', fourteen12: 's12:fourteen',
  country13: 's13:country', twelve13: 's13:twelve', boston13: 's13:boston', san13: 's13:san',
  group14: 's14:group', committee14: 's14:committee',
  votes15: 's15:votes', governors15: 's15:governors', york15: 's15:york', four15: 's15:four', turns15: 's15:turns',
  eight16: 's16:eight', meeting16: 's16:meeting', single16: 's16:single', rate16: 's16:rate',
  aiming17: 's17:aiming',
}
const CITIES = ['BOSTON', 'NEW YORK', 'PHILADELPHIA', 'CLEVELAND', 'RICHMOND', 'ATLANTA', 'CHICAGO', 'ST. LOUIS', 'MINNEAPOLIS', 'KANSAS CITY', 'DALLAS', 'SAN FRANCISCO']

const What: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s11') - 4, BC = c('s14') - 4, CD = c('s17') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = fadeIn(f, CD)
  const shop = span(f, t.walk9 - 20, t.walk9 + 6)
  const panic = on(f, t.panics10 - 2, 10), steady = on(f, t.steady10, 14)
  const rot = Math.floor(Math.max(0, f - t.turns15) / 20) % 4
  return (
    <g>
      <FDefs />
      {/* ---------------- A) America's central bank ---------------- */}
      {A > 0 && <g opacity={A}>
        <Hall />
        <FedBuilding x={960} y={FLOOR} s={0.95} o={on(f, t.reserve8 - 6, 10)} />
        <Tag x={960} y={FLOOR + 80} text="CREATED 1913" size={44} bg={F.copperD} o={on(f, t.thirteen8, 8)} />
        <Tag x={960} y={290} text="AMERICA'S CENTRAL BANK" size={40} bg={F.slate} o={on(f, t.central8, 8) * (1 - on(f, t.walk9 - 4, 8))} />
        {/* a shopper is turned away */}
        <g opacity={on(f, t.walk9 - 22, 8) * (1 - on(f, t.banks9 - 4, 8))}>
          <Person f={f} who="worker" beats={[[0, 'walkA', 'neutral', 'walkB', 10], [t.walk9 + 4, 'shrug', 'thinking']]} x={lerp(240, 720, shop)} y={1060} s={0.7} />
          <Cross x={960} y={720} r={70} p={on(f, t.walk9 + 4, 10)} />
        </g>
        <g opacity={on(f, t.banks9 - 2, 8) * (1 - panic)}>
          <path d="M590 760 L260 760" stroke="url(#fed-copper)" strokeWidth={22} /><MiniBank x={260} y={FLOOR} s={0.75} name="BANKS" />
          <g opacity={on(f, t.government9 - 2, 8)}><path d="M1330 760 L1660 760" stroke="url(#fed-copper)" strokeWidth={22} /><Capitol x={1660} y={FLOOR} s={0.5} /><Tag x={1660} y={FLOOR + 74} text="GOVERNMENT" size={34} bg={F.slate} /></g>
        </g>
        <g opacity={panic}>
          {[260, 1660].map((x, k) => <g key={k}><MiniBank x={x} y={FLOOR} s={0.75} color={steady > 0.5 ? F.teal : F.coral} />
            {steady < 0.5 && <path d={`M${x + 20} ${FLOOR - 190} L${x - 5} ${FLOOR - 120} L${x + 25} ${FLOOR - 60}`} stroke={F.coralD} strokeWidth={6} fill="none" />}
            <path d={`M${k ? 1330 : 590} 760 L${x} 760`} stroke="url(#fed-copper)" strokeWidth={22} opacity={steady} /></g>)}
          <Tag x={260} y={560} text="BANK PANICS" size={38} bg={F.coral} o={1 - steady} />
          <Tag x={960} y={290} text="A STEADY SYSTEM" size={44} bg={F.teal} o={steady} />
        </g>
      </g>}

      {/* ---------------- B) three parts ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Hall />
        {/* s11: three numbered plinths, one per part */}
        <g opacity={on(f, AB, 8) * (1 - on(f, t.washington12 - 4, 8))}>{[1, 2, 3].map((n, k) => <g key={n} opacity={on(f, t.three11 + k * 5, 6)}><rect x={520 + k * 440 - 120} y={FLOOR - 160} width={240} height={160} rx={16} fill={F.marbleDD} /><circle cx={520 + k * 440} cy={FLOOR - 250} r={70} fill={[F.slate, F.teal, F.copperD][k]} /><text x={520 + k * 440} y={FLOOR - 225} textAnchor="middle" fill="#fff" style={{ font: `400 80px ${FONT.big}` }}>{n}</text></g>)}</g>
        <Tag x={960} y={300} text="1 · BOARD OF GOVERNORS, WASHINGTON" size={38} bg={F.slate} o={on(f, t.washington12 - 2, 8) * (1 - on(f, t.country13 - 4, 8))} />
        <g opacity={on(f, t.seven12 - 2, 8) * (1 - on(f, t.country13 - 4, 8))}>
          {Array.from({ length: 7 }, (_, k) => <Seat key={k} x={420 + k * 180} y={640} s={1.1} o={on(f, t.seven12 + k * 2, 6)} />)}
          <Tag x={600} y={780} text="PICKED BY THE PRESIDENT" size={32} bg={F.inkSoft} o={on(f, t.president12, 8)} />
          <Tag x={1000} y={840} text="APPROVED BY THE SENATE" size={32} bg={F.inkSoft} o={on(f, t.senate12, 8)} />
          <Tag x={1420} y={780} text="14-YEAR TERMS" size={38} bg={F.copperD} o={on(f, t.fourteen12, 8)} />
        </g>
        <g opacity={on(f, t.country13 - 2, 8)}>
          <Tag x={960} y={300} text="2 · TWELVE REGIONAL FED BANKS" size={38} bg={F.teal} />
          <rect x={160} y={640} width={1600} height={14} rx={7} fill={F.copper} />
          {CITIES.map((n, k) => { const x = 1760 - k * (1600 / 11), o = on(f, t.twelve13 + k * 2, 6); return o > 0.01 && <g key={n} opacity={o}>
            <circle cx={x} cy={647} r={22} fill={F.teal} stroke="#fff" strokeWidth={5} />
            <text x={x} y={k % 2 ? 720 : 600} textAnchor="middle" fill={F.inkSoft} style={{ font: `400 ${k === 0 || k === 11 ? 34 : 26}px ${FONT.big}` }}>{n}</text>
          </g> })}
        </g>
      </g>}

      {/* ---------------- C) the committee ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Hall />
        <Tag x={960} y={290} text="3 · THE FEDERAL OPEN MARKET COMMITTEE" size={38} bg={F.copperD} o={on(f, t.committee14 - 2, 8)} />
        {Array.from({ length: 12 }, (_, k) => {
          const x = 260 + k * 127, kind = k < 7 ? 'gov' : k === 7 ? 'ny' : 'rot'
          const o = kind === 'gov' ? on(f, t.governors15 - 2, 8) : kind === 'ny' ? on(f, t.york15 - 2, 8) : on(f, t.four15 - 2 + (k - 8) * 3, 8)
          return <Seat key={k} x={x} y={620} s={0.95} o={Math.max(on(f, BC + k, 8) * 0.35, o)} color={kind === 'gov' ? F.slate : kind === 'ny' ? F.copper : F.teal} lit={kind === 'rot' && f > t.turns15 && (k - 8) === rot ? 1 : 0} />
        })}
        <Tag x={640} y={730} text="7 GOVERNORS" size={34} bg={F.slate} o={on(f, t.governors15, 8)} />
        <Tag x={1150} y={730} text="NEW YORK" size={30} bg={F.copperD} o={on(f, t.york15, 8)} />
        <Tag x={1530} y={730} text="4 TAKE TURNS" size={34} bg={F.teal} o={on(f, t.turns15 - 4, 8)} />
        <g opacity={on(f, t.eight16 - 2, 8)}>
          {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={560 + k * 115} cy={880} r={26} fill={k <= Math.floor(span(f, t.eight16, t.meeting16 + 10) * 7.99) ? F.copper : F.marbleDD} />)}
          <Tag x={1520} y={880} text="8 MEETINGS A YEAR" size={36} bg={F.ink} />
        </g>
        <Tag x={960} y={980} text="ONE DECISION: ONE INTEREST RATE" size={40} bg={F.coral} o={on(f, t.single16, 8)} />
      </g>}

      {/* ---------------- D) what are they aiming for ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Hall />
        {[200, 150, 100, 50].map((r, k) => <circle key={r} cx={960} cy={560} r={r} fill={k % 2 ? '#fff' : F.coral} opacity={on(f, c('s17') - 2 + k * 2, 8)} />)}
        <g opacity={on(f, t.aiming17 - 2, 8)} transform={`translate(${lerp(1500, 1000, on(f, t.aiming17, 12))} ${lerp(420, 540, on(f, t.aiming17, 12))}) rotate(160)`}><rect x={0} y={-6} width={260} height={12} fill={F.copperD} /><path d="M260 -24 L300 0 L260 24 Z" fill={F.slate} /></g>
      </g>}

      <Headline f={f} lines={[[t.reserve8, 'THE FEDERAL RESERVE', F.ink, 110], [t.three11, 'THREE PARTS', F.ink, 116], [t.group14, 'THE BIG DECISION', F.ink, 116], [t.aiming17, 'BUT AIMING FOR WHAT?', F.ink, 110]]} />
      <Mark f={f} at={(EXTRA['fed-what'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_WHAT = makePiece('fed-what', "What the Fed is: the marble Fed building, created 1913, America's central bank; a shopper walking to its door is turned away; copper pipes link it to banks and the Capitol (the bank for banks and for the government); banks with cracks during bank panics steadied by the pipes; three parts — seven governor seats picked by the President, approved by the Senate, 14-year terms; twelve regional Fed bank pins from Boston to San Francisco; the FOMC row of twelve seats, 7 governors, New York, and 4 rotating seats lighting in turn, 8 meetings a year, one decision, one interest rate; a target", {
  mood: 'light', Component: What, beats: [...Object.values(K), ...(EXTRA['fed-what'] ?? [])],
  sfx: [['s8:thirteen', 'softpop', 0.08], ['s9:walk', 'thud', 0.08], ['s16:single', 'ding', 0.1]] })
