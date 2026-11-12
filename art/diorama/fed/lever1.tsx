// ---------------------------------------------------------------- s27–s33: the lever, part 1 — reserves and the floor
// A) s27–28  two banks at night-ish slate, one lends to the other across a copper bridge under a moon: OVERNIGHT.
//            The bridge reads FEDERAL FUNDS RATE. The Fed sits above with no hand on either bank: it steers.
// B) s29–31  under the Fed: each bank's glass tank (its reserve account at the Fed); water (reserves) flows between
//            tanks when banks pay each other; then gold drops fall into the tanks: the Fed pays 3.9%; one tank tagged
//            $100 MILLION earns a coin labelled $10,000+ for one night.
// C) s32–33  a bank with spare cash weighs two doors: LEND TO A BANK BELOW 3.9% (crossed) vs KEEP IT AT THE FED: 3.9%;
//            a copper floor plate slides in under a rate ball: THE FLOOR.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline } from '../aimoney/common'
import { Arrow, Coin, Cross, Engine, F, FDefs, FGrain, FLOOR, FedBuilding, Mark, MiniBank, Tag, Tank, cues, fadeIn, scene, FONT } from './kit'

const K = {
  federal27: 's27:federal', funds27: 's27:funds', banks27: 's27:banks', overnight27: 's27:overnight',
  surprise28: 's28:surprise', order28: 's28:order', steers28: 's28:steers', step28: 's28:step',
  one29: 's29:one', account29: 's29:account', checking29: 's29:checking', reserves29: 's29:reserves', pay29: 's29:pay',
  two30: 's30:two', interest30: 's30:interest', three30: 's30:three',
  real31: 's31:real', hundred31: 's31:hundred', night31: 's31:night', ten31: 's31:ten',
  three32: 's32:three', spare32: 's32:spare', lend32: 's32:lend', less32: 's32:less', nothing32: 's32:nothing',
  wouldnt33: "s33:wouldn't", sliding33: 's33:sliding', floor33: 's33:floor',
}

const Lever1: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s29') - 4, BC = c('s32') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = fadeIn(f, BC)
  const cross = easeInOut(span(f, t.overnight27 - 6, t.overnight27 + 20))
  const flow = on(f, t.pay29 - 2, 8) * (1 - on(f, t.two30 - 2, 8))
  const drip = on(f, t.interest30 - 2, 8) ? ((f - t.interest30) / 26) % 1 : 0
  const plate = on(f, t.floor33 - 6, 12)
  return (
    <g>
      <FDefs />
      <Engine />
      {/* ---------------- A) banks lend to each other overnight ---------------- */}
      {A > 0 && <g opacity={A}>
        <circle cx={1660} cy={220} r={60} fill="#F4E9C8" opacity={on(f, t.overnight27 - 4, 10)} />
        <MiniBank x={420} y={FLOOR} s={1} name="BANK A" o={on(f, c('s27'), 8)} />
        <MiniBank x={1500} y={FLOOR} s={1} name="BANK B" color={F.copperD} o={on(f, c('s27') + 6, 8)} />
        <path d="M580 720 Q960 560 1340 720" stroke="url(#fed-copper)" strokeWidth={26} fill="none" opacity={on(f, t.funds27 - 4, 10)} />
        <Coin x={lerp(600, 1320, cross)} y={720 - Math.sin(Math.PI * cross) * 210} r={44} o={on(f, t.overnight27 - 8, 6)} />
        <Tag x={960} y={520} text="FEDERAL FUNDS RATE" size={44} bg={F.copperD} o={on(f, t.funds27, 8)} />
        <Tag x={960} y={830} text="OVERNIGHT LOANS BETWEEN BANKS" size={34} bg={F.slateL} o={on(f, t.overnight27, 8)} />
        <g opacity={on(f, t.surprise28 - 2, 8)}>
          <FedBuilding x={960} y={420} s={0.36} sign="THE FED" />
          <Cross x={960} y={330} r={46} p={on(f, t.order28, 10) * (1 - on(f, t.steers28, 8))} />
          <Tag x={960} y={460} text="IT STEERS" size={36} bg={F.teal} o={on(f, t.steers28, 8)} />
        </g>
      </g>}

      {/* ---------------- B) reserve tanks at the Fed ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <FedBuilding x={960} y={500} s={0.55} sign="THE FED" o={on(f, t.account29 - 4, 8)} />
        <rect x={380} y={560} width={1160} height={20} rx={10} fill="url(#fed-copper)" opacity={on(f, t.account29, 8)} />
        <Tank x={560} y={FLOOR} level={lerp(0.6, 0.45, flow * 0.99)} label="BANK A'S ACCOUNT" o={on(f, t.account29, 8)} drip={drip} />
        <Tank x={1360} y={FLOOR} level={lerp(0.4, 0.55, flow * 0.99)} label="BANK B'S ACCOUNT" o={on(f, t.account29 + 4, 8)} drip={drip} />
        <Tag x={960} y={700} text="= RESERVES" size={48} bg={F.teal} o={on(f, t.reserves29, 8) * (1 - on(f, t.two30 - 2, 8))} />
        {flow > 0.01 && <Arrow x1={720} y1={760} x2={1200} y2={760} p={flow} color={F.water} />}
        <Tag x={960} y={700} text="FED PAYS 3.9%" size={52} bg={F.goldD} o={on(f, t.three30, 8) * (1 - on(f, t.hundred31 - 2, 8))} />
        <g opacity={on(f, t.hundred31 - 2, 8)}>
          <Tag x={960} y={700} text="$100 MILLION × ONE NIGHT" size={40} bg={F.slateL} />
          <Coin x={960} y={820} r={70} label="$10,000+" o={on(f, t.ten31 - 2, 8)} />
        </g>
      </g>}

      {/* ---------------- C) why lend for less? the floor ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <MiniBank x={300} y={FLOOR} s={0.9} name="SPARE CASH" />
        <g opacity={on(f, t.lend32 - 2, 8)}>
          <rect x={620} y={360} width={480} height={300} rx={20} fill={F.slateL} />
          <text x={860} y={440} textAnchor="middle" fill="#fff" style={{ font: `400 48px ${FONT.big}` }}>LEND TO A BANK</text>
          <text x={860} y={540} textAnchor="middle" fill={F.coralL} style={{ font: `400 64px ${FONT.big}` }}>LESS THAN 3.9%</text>
          <Cross x={860} y={510} r={110} p={on(f, t.wouldnt33, 10)} />
        </g>
        <g opacity={on(f, t.nothing32 - 6, 8)}>
          <rect x={1200} y={360} width={480} height={300} rx={20} fill={F.tealD} />
          <text x={1440} y={440} textAnchor="middle" fill="#fff" style={{ font: `400 48px ${FONT.big}` }}>KEEP IT AT THE FED</text>
          <text x={1440} y={540} textAnchor="middle" fill={F.tealL} style={{ font: `400 72px ${FONT.big}` }}>3.9%</text>
          <text x={1440} y={610} textAnchor="middle" fill="#fff" style={{ font: `400 34px ${FONT.big}` }}>FOR DOING NOTHING</text>
        </g>
        <g opacity={plate}>
          <rect x={lerp(-1000, 620, plate)} y={820} width={1060} height={36} rx={10} fill="url(#fed-copper)" />
          <circle cx={1150} cy={lerp(1000, 790, on(f, t.floor33 - 2, 12))} r={30} fill={F.coral} stroke="#fff" strokeWidth={5} />
          <Tag x={1150} y={920} text="THE FLOOR: ABOUT 3.9%" size={40} bg={F.copperD} o={on(f, t.floor33, 8)} />
        </g>
      </g>}

      <Headline f={f} lines={[[t.federal27, 'THE FEDERAL FUNDS RATE', F.white, 106], [t.one29, 'STEP 1: RESERVES', F.white, 112], [t.two30, 'STEP 2: THE FED PAYS 3.9%', F.gold, 104], [t.three32, 'STEP 3: A FLOOR', F.white, 112]]} />
      <Mark f={f} at={(EXTRA['fed-lever1'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_LEVER1 = makePiece('fed-lever1', "The lever, part 1: Bank A lends to Bank B overnight across a copper bridge under the moon, the federal funds rate; the Fed above crosses out ordering and steers; under the Fed each bank's glass tank is its reserve account, water (reserves) flows between them as banks pay each other; gold drops fall in as the Fed pays 3.9%, $100 million for one night earns $10,000+; a bank with spare cash compares lending to a bank for less than 3.9% (crossed) with keeping it at the Fed for 3.9% for doing nothing; a copper floor plate slides under the rate ball, the floor about 3.9%", {
  mood: 'dark', Component: Lever1, beats: [...Object.values(K), ...(EXTRA['fed-lever1'] ?? [])],
  sfx: [['s27:overnight', 'swish', 0.08], ['s30:three', 'coin', 0.1], ['s33:wouldn\'t', 'pop', 0.08], ['s33:floor', 'thud', 0.1]] })
