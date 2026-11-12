// ---------------------------------------------------------------- s53–s63: why higher rates cool prices — the chain
// A) s53–58  a copper chain of five big links across a street; each link lights as its step is said: RATES UP →
//            SAM BORROWS LESS (Sam leaves the car lot, the card goes in his pocket) → BUSINESSES BUILD LESS (a crane
//            stops) → FEWER BUYERS (a shop's price tag stops climbing) → PRICES COOL, HIRING COOLS.
// B) s59     the same chain, arrows flipped: cheaper loans, more spending, more hiring, more pressure on prices.
// C) s60–61  a big ship at sea turns slowly while its wheel spins: steering with a delay.
// D) s62–63  a printing press with a split badge: HALF TRUE.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Arrow, F, FDefs, FGrain, FLOOR, Hall, Mark, Street, Tag, cues, fadeIn, scene, FONT } from './kit'
import { Press } from './hook'

const K = {
  chain53: 's53:chain', link53: 's53:link',
  costs54: 's54:costs', borrow54: 's54:borrow', spend54: 's54:spend',
  waits55: 's55:waits', car55: 's55:car', trip55: 's55:trip', card55: 's55:card',
  businesses56: 's56:businesses', build56: 's56:build',
  fewer57: 's57:fewer', prices57: 's57:prices', hire57: 's57:hire',
  inflation58: 's58:inflation', jobs58: 's58:jobs', trade58: 's58:tradeoff',
  cut59: 's59:cut', cheaper59: 's59:cheaper', spending59: 's59:spending', hiring59: 's59:hiring', pressure59: 's59:pressure',
  slow60: 's60:slow', immediate60: 's60:immediate',
  delay61: 's61:delay', ship61: 's61:ship',
  prints62: 's62:prints', half63: 's63:half', true63: 's63:true',
}
const LINKS = [['RATES UP', F.coral], ['BORROW LESS', F.copper], ['BUILD LESS', F.slateL], ['FEWER BUYERS', F.teal], ['PRICES + HIRING COOL', F.tealD]] as const
const Link: React.FC<{ x: number; y: number; lit: number; text: string; color: string }> = ({ x, y, lit, text, color }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-80} width={300} height={160} rx={80} fill="none" stroke={lit > 0.5 ? color : F.marbleDD} strokeWidth={30} />
    <text x={0} y={14} textAnchor="middle" fill={lit > 0.5 ? color : F.inkL} style={{ font: `400 ${text.length > 14 ? 32 : 40}px ${FONT.big}` }}>{text}</text>
  </g>
)
const Crane: React.FC<{ x: number; y: number; a: number }> = ({ x, y, a }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-10} y={-360} width={20} height={360} fill={F.gold} /><g transform={`translate(0 -350) rotate(${a})`}><rect x={-40} y={-10} width={260} height={18} fill={F.gold} /><line x1={200} y1={8} x2={200} y2={120} stroke={F.ink} strokeWidth={3} /><rect x={184} y={120} width={32} height={30} fill={F.copperD} /></g>
  </g>
)

const Chain: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s59') - 4, BC = c('s60') - 4, CD = c('s62') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = fadeIn(f, CD)
  const litAt = [c('s53') + 6, t.costs54, t.businesses56, t.fewer57, t.inflation58]
  const turn = span(f, BC, CD)
  return (
    <g>
      <FDefs />
      {/* ---------------- A) the chain ---------------- */}
      {A > 0 && <g opacity={A}>
        <Street />
        {LINKS.map(([txt, col], k) => <Link key={k} x={260 + k * 350} y={340} lit={on(f, litAt[k] - 2, 6)} text={txt} color={col} />)}
        {/* below the chain, the picture of the lit step */}
        <g opacity={on(f, t.costs54 - 2, 8) * (1 - on(f, t.businesses56 - 4, 8))}>
          <Person f={f} who="investor" beats={[[0, 'idle', 'thinking'], [t.borrow54, 'crossNoA', 'neutral'], [t.car55, 'pockets', 'neutral']]} x={620} y={1060} s={0.72} />
          <Tag x={1200} y={700} text="WAITS ON THE NEW CAR" size={36} bg={F.copperD} o={on(f, t.car55, 8)} />
          <Tag x={1200} y={780} text="THE TRIP GOES ON HOLD" size={36} bg={F.copperD} o={on(f, t.trip55, 8)} />
        </g>
        <g opacity={on(f, t.businesses56 - 2, 8) * (1 - on(f, t.fewer57 - 4, 8))}>
          <Crane x={1050} y={FLOOR} a={-10 + 10 * on(f, t.build56, 20) + (1 - on(f, t.build56, 20)) * Math.sin(f / 10) * 8} />
          <rect x={1200} y={FLOOR - 160} width={280} height={160} fill={F.marbleDD} /><rect x={1200} y={FLOOR - 200} width={280} height={40} fill={F.marbleD} opacity={0.5} />
          <Tag x={1050} y={FLOOR + 74} text="BUSINESSES BUILD LESS" size={36} bg={F.slateL} />
        </g>
        <g opacity={on(f, t.fewer57 - 2, 8) * (1 - on(f, t.inflation58 - 4, 8))}>
          <rect x={880} y={FLOOR - 300} width={420} height={300} fill="#F3D9C4" stroke={F.coral} strokeWidth={5} /><path d="M860 600 L1320 600 L1290 560 L890 560 Z" fill={F.coral} />
          <g transform="translate(1420 640)"><path d="M-80 -40 L60 -40 L90 0 L60 40 L-80 40 Z" fill={F.gold} /><text x={-10} y={14} textAnchor="middle" fill={F.ink} style={{ font: `400 40px ${FONT.big}` }}>$</text></g>
          <Arrow x1={1560} y1={700} x2={1560} y2={700 - 120 * (1 - on(f, t.prices57, 20))} p={1 - on(f, t.prices57, 20) > 0.1 ? 1 : 0} color={F.coral} />
          <Tag x={1090} y={FLOOR + 74} text="HARDER TO RAISE PRICES · HARDER TO HIRE" size={32} bg={F.teal} o={on(f, t.hire57, 8)} />
        </g>
        <g opacity={on(f, t.inflation58 - 2, 8)}>
          <Tag x={620} y={680} text="INFLATION COOLS" size={48} bg={F.teal} />
          <Tag x={1300} y={680} text="JOBS CAN COOL TOO" size={48} bg={F.slate} o={on(f, t.jobs58, 8)} />
          <Tag x={960} y={820} text="THE TRADE-OFF" size={40} bg={F.coralD} o={on(f, t.trade58, 8)} />
        </g>
      </g>}

      {/* ---------------- B) the chain in reverse ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Street />
        {['RATES DOWN', 'CHEAPER LOANS', 'MORE SPENDING', 'MORE HIRING', 'PRICES PUSHED UP'].map((txt, k) => <Link key={k} x={260 + k * 350} y={480} lit={on(f, [t.cut59, t.cheaper59, t.spending59, t.hiring59, t.pressure59][k] - 2, 6)} text={txt} color={k === 4 ? F.coral : F.teal} />)}
        {[0, 1, 2, 3].map((k) => <Arrow key={k} x1={410 + k * 350} y1={640} x2={460 + k * 350} y2={640} p={on(f, [t.cheaper59, t.spending59, t.hiring59, t.pressure59][k] - 2, 6)} color={F.copperD} w={10} />)}
      </g>}

      {/* ---------------- C) a big ship ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <rect width={1920} height={700} fill="url(#fed-sky)" /><rect y={700} width={1920} height={380} fill={F.teal} />
        {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${k * 260} ${760 + (k % 3) * 80} q50 -16 100 0 q50 16 100 0`} stroke="#fff" strokeWidth={4} fill="none" opacity={0.5} />)}
        <g transform={`translate(${lerp(1300, 1100, turn)} 720) rotate(${-8 * turn})`}>
          <path d="M-420 0 L420 0 L360 120 L-340 120 Z" fill={F.slate} /><rect x={-260} y={-160} width={420} height={160} fill="#fff" /><rect x={-200} y={-260} width={200} height={100} fill="#fff" /><rect x={40} y={-280} width={50} height={120} fill={F.coral} />
        </g>
        <g transform="translate(420 760)"><circle r={130} fill="none" stroke={F.copperD} strokeWidth={22} />{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-8} y={-170} width={16} height={340} fill={F.copperD} transform={`rotate(${k * 22.5 + f * 2})`} />)}<circle r={30} fill={F.copper} /></g>
        <Tag x={960} y={300} text="NOT DIRECT OR IMMEDIATE" size={44} bg={F.slate} o={on(f, t.immediate60 - 2, 8)} />
        <Tag x={960} y={380} text="STEERING WITH A DELAY" size={44} bg={F.teal} o={on(f, t.delay61, 8)} />
      </g>}

      {/* ---------------- D) does it print money? ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Hall />
        <Press x={960} y={FLOOR} s={1.3} run={f / 50} />
        <g opacity={on(f, t.half63 - 2, 8)} transform="translate(1520 420)"><circle r={110} fill={F.marbleL} stroke={F.ink} strokeWidth={6} /><path d="M0 -110 A110 110 0 0 1 0 110 Z" fill={F.teal} /><text y={14} textAnchor="middle" fill={F.ink} style={{ font: `400 40px ${FONT.big}` }}>HALF</text></g>
        <Tag x={1520} y={590} text="HALF TRUE" size={44} bg={F.ink} o={on(f, t.true63 - 2, 8)} />
      </g>}

      <Headline f={f} lines={[[c('s53'), 'A CHAIN, LINK BY LINK', F.ink, 106], [t.cut59, 'CUT RATES: IT RUNS BACK', F.ink, 104], [t.slow60, 'AND IT IS SLOW', F.ink, 116], [t.prints62, 'DOES THE FED PRINT MONEY?', F.ink, 102]]} />
      <Mark f={f} at={(EXTRA['fed-chain'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_CHAIN = makePiece('fed-chain', "Why higher rates cool prices: a copper chain of five links lights step by step — rates up, Sam borrows less (he waits on the new car, the trip goes on hold), businesses build less (a crane stops), fewer buyers (a shop's price tag stops climbing), prices and hiring cool — inflation cools, jobs can cool too, the trade-off; the chain in reverse when rates are cut: cheaper loans, more spending, more hiring, prices pushed up; a big ship turning slowly as its wheel spins, steering with a delay; a printing press with a HALF TRUE badge", {
  mood: 'light', Component: Chain, beats: [...Object.values(K), ...(EXTRA['fed-chain'] ?? [])],
  sfx: [['s54:costs', 'click', 0.08], ['s58:inflation', 'chime', 0.08], ['s63:half', 'pop', 0.08]] })
