// ---------------------------------------------------------------- s80–s86: the payoff — back to the twelve
// A) s80–81  the round table again with its twelve seats; in front of it the floor and ceiling plates with the rate
//            ball between them: WHAT IT PAYS BANKS / WHAT IT CHARGES THEM.
// B) s82–83  Sam's kitchen: the prime block lifts his card (fast); his piggy bank's tap still drips (slowly).
// C) s84     the two flags from chapter two, JOBS and STEADY PRICES, with the lever between them.
// D) s85–86  the copper chain again, its links lighting one after another from the plates to a wallet.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Coin, CreditCard, F, FDefs, FGrain, FLOOR, Hall, Kitchen, Lever, Mark, Piggy, Seat, Street, Tag, cues, fadeIn, scene, FONT } from './kit'
import { Wallet } from './hook'

const K = {
  twelve80: 's80:twelve',
  rate81: 's81:rate', pays81: 's81:pays', charges81: 's81:charges',
  prime82: 's82:prime', card82: 's82:card', soon82: 's82:soon',
  savings83: 's83:savings', slowly83: 's83:slowly', better83: 's83:better',
  aimed84: 's84:aimed', jobs84: 's84:jobs', steady84: 's84:steady',
  raised85: 's85:raised', floor85: 's85:floor', ceiling85: 's85:ceiling', chain85: 's85:chain', moving85: 's85:moving',
  tiny86: 's86:tiny', link86: 's86:link', wallet86: 's86:wallet',
}

const End: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s82') - 4, BC = c('s84') - 4, CD = c('s85') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = fadeIn(f, CD)
  const lift = 20 * on(f, t.card82 - 2, 12)
  const lights = Math.floor(lerp(0, 5, span(f, t.chain85 - 4, t.wallet86 + 4)) + 0.001)
  return (
    <g>
      <FDefs />
      {/* ---------------- A) the twelve and their two rates ---------------- */}
      {A > 0 && <g opacity={A}>
        <Hall />
        {Array.from({ length: 12 }, (_, k) => { const a = Math.PI * (k / 11); return <Seat key={k} x={960 - Math.cos(a) * 470} y={440 - Math.sin(a) * 60} s={0.7} color={k < 7 ? F.slate : F.tealD} /> })}
        <ellipse cx={960} cy={500} rx={430} ry={90} fill={F.copperD} /><ellipse cx={960} cy={488} rx={410} ry={78} fill="url(#fed-copper)" />
        <g opacity={on(f, t.rate81 - 2, 8)}>
          <rect x={560} y={680} width={800} height={30} rx={10} fill={F.copperD} />
          <rect x={560} y={850} width={800} height={30} rx={10} fill={F.copper} />
          <circle cx={960} cy={780} r={30} fill={F.coral} stroke="#fff" strokeWidth={5} />
          <Tag x={1600} y={865} text="WHAT IT PAYS BANKS" size={36} bg={F.copper} o={on(f, t.pays81, 8)} />
          <Tag x={1600} y={695} text="WHAT IT CHARGES THEM" size={36} bg={F.copperD} o={on(f, t.charges81, 8)} />
        </g>
      </g>}

      {/* ---------------- B) card fast, savings slow ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Kitchen />
        <Person f={f} who="investor" beats={[[0, 'present', 'neutral'], [t.card82, 'shock', 'worried'], [t.savings83, 'think', 'thinking'], [t.better83, 'lookFar', 'smiling']]} x={960} y={1060} s={0.8} />
        <g transform={`translate(0 ${-lift})`}>
          <rect x={310} y={FLOOR - 140 + lift} width={360} height={140} rx={14} fill={F.copperD} />
          <text x={490} y={FLOOR - 56 + lift} textAnchor="middle" fill="#fff" style={{ font: `400 52px ${FONT.big}` }}>PRIME</text>
          <CreditCard x={490} y={FLOOR - 280} s={0.7} r={-6} o={on(f, t.card82 - 4, 8)} />
        </g>
        <Tag x={490} y={300} text="SOON AFTER" size={40} bg={F.coral} o={on(f, t.soon82, 8)} />
        <Piggy x={1500} y={FLOOR} s={0.8} o={on(f, t.savings83 - 2, 8)} />
        {f > t.savings83 && [0, 1].map((k) => { const p = ((f / 40) + k / 2) % 1; return <circle key={k} cx={1515} cy={480 + p * 200} r={8} fill={F.gold} opacity={1 - p * 0.4} /> })}
        <Tag x={1500} y={300} text="SAVINGS: MORE SLOWLY" size={38} bg={F.teal} o={on(f, t.slowly83, 8)} />
      </g>}

      {/* ---------------- C) two jobs ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Street />
        {[[420, F.teal, 'JOBS', t.jobs84], [1500, F.coral, 'STEADY PRICES', t.steady84]].map(([x, col, txt, at], k) => <g key={k} opacity={on(f, (at as number) - 4, 8)}>
          <rect x={(x as number) - 8} y={340} width={16} height={FLOOR - 340} fill={F.copperD} /><path d={`M${(x as number) + 8} 350 L${(x as number) + 260} 400 L${(x as number) + 8} 450 Z`} fill={col as string} />
          <Tag x={x as number} y={FLOOR + 74} text={txt as string} size={44} bg={col as string} /></g>)}
        <Lever x={960} y={FLOOR} v={Math.sin(f / 14) * 0.6} s={1} o={on(f, t.aimed84 - 2, 8)} />
      </g>}

      {/* ---------------- D) the chain to your wallet ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Street />
        {['FLOOR + CEILING', 'PRIME', 'YOUR CARD', 'YOUR SAVINGS'].map((txt, k) => <g key={k} transform={`translate(${260 + k * 340} 520)`}>
          <rect x={-140} y={-74} width={280} height={148} rx={74} fill="none" stroke={k < lights ? F.copper : F.marbleDD} strokeWidth={28} />
          <text y={12} textAnchor="middle" fill={k < lights ? F.copperD : F.inkL} style={{ font: `400 ${txt.length > 12 ? 30 : 38}px ${FONT.big}` }}>{txt}</text>
        </g>)}
        <Wallet x={1620} y={580} s={0.9} o={on(f, t.wallet86 - 6, 8)} open={on(f, t.wallet86, 10)} />
        <Coin x={1620} y={lerp(300, 470, on(f, t.wallet86, 14))} r={40} label="0.25%" o={on(f, t.tiny86 - 2, 8) * (1 - on(f, t.wallet86 + 14, 6))} />
        <Tag x={960} y={820} text="THE FIRST LINK OF A CHAIN" size={44} bg={F.ink} o={on(f, t.link86, 8)} />
      </g>}

      <Headline f={f} lines={[[c('s80'), 'BACK TO THE TWELVE', F.ink, 112], [t.prime82, 'TO YOUR CARD, THEN SAVINGS', F.ink, 100], [t.aimed84, 'TWO JOBS', F.ink, 120], [t.raised85, 'WHEN THE FED RAISES RATES', F.ink, 102]]} />
      <Mark f={f} at={(EXTRA['fed-end'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_END = makePiece('fed-end', "Payoff: the round table of twelve with the floor and ceiling plates in front, what the Fed pays banks and what it charges them; in Sam's kitchen the prime block lifts his card soon after while his piggy bank's tap still drips more slowly; the JOBS and STEADY PRICES flags with the lever between them; a chain of links lighting from floor and ceiling to prime, your card and your savings, and a 0.25% coin dropping into a wallet — the first link of a chain", {
  mood: 'light', Component: End, beats: [...Object.values(K), ...(EXTRA['fed-end'] ?? [])],
  sfx: [['s82:card', 'riser', 0.06], ['s86:wallet', 'coin', 0.1]] })
