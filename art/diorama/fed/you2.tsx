// ---------------------------------------------------------------- s47–s52: the other side — Sam's savings, other loans
// A) s47–50  two taps side by side: the FED → BANKS tap pours a thick gold stream (3.9%) into a bank's tank; the BANK →
//            SAM'S SAVINGS tap only drips into Sam's piggy bank (0.38%); Sam looks along a street of bank signs (shops
//            around).
// B) s51     a new car with a loan tag: about 7.5% for a 5-year bank loan.
// C) s52     Sam between his card (coral, up) and his piggy bank (teal): both sides of his money.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Coin, CreditCard, F, FDefs, FGrain, FLOOR, Kitchen, Mark, MiniBank, Piggy, Street, Tag, Tank, cues, fadeIn, scene, FONT } from './kit'

const K = {
  other47: 's47:other', savings47: "s47:sam's",
  pays48: 's48:pays', three48: 's48:three', reserves48: 's48:reserves',
  average49: 's49:average', zero49: 's49:zero', eight49: 's49:eight',
  slowly50: 's50:slowly', shop50: 's50:shop', better50: 's50:better',
  loans51: 's51:loans', car51: 's51:car', seven51: 's51:seven',
  sides52: 's52:sides', slow52: 's52:slow',
}
const Tap: React.FC<{ x: number; y: number; o?: number; flow: number; thick: number; f: number }> = ({ x, y, o = 1, flow, thick, f }) => o <= 0.01 ? null : (
  <g opacity={o}>
    <rect x={x - 160} y={y - 30} width={180} height={50} rx={12} fill="url(#fed-copper)" />
    <rect x={x - 10} y={y - 30} width={50} height={90} rx={10} fill="url(#fed-copper)" />
    <rect x={x - 20} y={y - 70} width={70} height={24} rx={8} fill={F.copperD} />
    {flow > 0.01 && (thick > 0.5
      ? <rect x={x + 2} y={y + 60} width={26} height={260 * flow} rx={10} fill={F.gold} opacity={0.9} />
      : [0, 1].map((k) => { const p = ((f / 40) + k / 2) % 1; return <circle key={k} cx={x + 15} cy={y + 70 + p * 240} r={8} fill={F.gold} opacity={flow * (1 - p * 0.4)} /> }))}
  </g>
)
const Car: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={6} rx={300} ry={18} fill="#000" opacity={0.16} />
    <path d="M-280 -40 L-260 -120 Q-240 -150 -200 -150 L-120 -150 L-60 -230 L140 -230 L220 -150 L270 -140 Q290 -130 290 -100 L290 -40 Z" fill={F.teal} />
    <path d="M-40 -215 L130 -215 L190 -155 L-90 -155 Z" fill={F.sky} />
    {[-170, 170].map((d) => <g key={d}><circle cx={d} cy={-30} r={56} fill={F.ink} /><circle cx={d} cy={-30} r={24} fill={F.marbleDD} /></g>)}
  </g>
)

const You2: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s51') - 4, BC = c('s52') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = fadeIn(f, BC)
  return (
    <g>
      <FDefs />
      {/* ---------------- A) two taps ---------------- */}
      {A > 0 && <g opacity={A}>
        <Kitchen />
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [t.zero49, 'facepalm', 'worried'], [t.shop50, 'lookFar', 'thinking']]} x={1680} y={1060} s={0.78} />
        <Tap x={520} y={300} f={f} o={on(f, c('s47') + 2, 8)} flow={on(f, t.pays48, 14)} thick={1} />
        <Tank x={535} y={FLOOR} level={lerp(0.3, 0.75, on(f, t.three48, 40))} w={240} h={300} />
        <Tag x={535} y={FLOOR + 74} text="FED → BANKS: 3.9%" size={40} bg={F.goldD} o={on(f, t.three48, 8)} />
        <Tap x={1100} y={300} f={f} o={on(f, t.savings47 - 2, 8)} flow={on(f, t.average49, 10)} thick={0} />
        <Piggy x={1115} y={FLOOR} s={0.8} o={on(f, t.savings47 - 2, 8)} />
        <Tag x={1115} y={FLOOR + 74} text="AVERAGE SAVINGS: 0.38%" size={40} bg={F.coralD} o={on(f, t.zero49 + 6, 8)} />
        <Tag x={830} y={230} text="SAVINGS RATES FOLLOW SLOWLY" size={36} bg={F.slate} o={on(f, t.slowly50 - 2, 8)} />
        <Tag x={1520} y={420} text="SHOP AROUND" size={38} bg={F.teal} o={on(f, t.shop50, 8)} />
      </g>}

      {/* ---------------- B) other loans ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Street />
        <Car x={960} y={FLOOR} o={on(f, AB, 8)} />
        <g opacity={on(f, t.car51 - 2, 8)} transform="translate(1320 520)">
          <line x1={-80} y1={80} x2={0} y2={0} stroke={F.ink} strokeWidth={4} />
          <path d="M0 -60 L260 -60 L300 0 L260 60 L0 60 Z" fill="#fff" stroke={F.ink} strokeWidth={4} />
          <text x={140} y={20} textAnchor="middle" fill={F.ink} style={{ font: `400 56px ${FONT.big}` }}>≈ 7.5%</text>
        </g>
        <Tag x={960} y={FLOOR + 74} text="NEW 5-YEAR CAR LOAN, AT A BANK" size={36} bg={F.teal} o={on(f, t.seven51 - 2, 8)} />
      </g>}

      {/* ---------------- C) both sides ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Kitchen />
        <Person f={f} who="investor" beats={[[0, 'present', 'thinking'], [t.slow52, 'think', 'thinking']]} x={960} y={1060} s={0.8} />
        <CreditCard x={480} y={560} s={0.75} r={-8} text="UP FAST" />
        <Piggy x={1460} y={FLOOR - 120} s={0.8} />
        <Tag x={1460} y={FLOOR - 30} text="UP SLOWLY" size={40} bg={F.teal} />
      </g>}

      <Headline f={f} lines={[[c('s47'), "SAM'S SAVINGS", F.ink, 116], [t.loans51, 'OTHER LOANS', F.ink, 116], [t.sides52, 'BOTH SIDES OF SAM', F.ink, 112]]} />
      <Mark f={f} at={(EXTRA['fed-you2'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_YOU2 = makePiece('fed-you2', "The other side: a copper tap pours a thick gold stream from the Fed into a bank's tank (3.9%) while the bank's tap only drips into Sam's piggy bank (average savings 0.38%); savings rates follow slowly, shop around; a new car with a loan tag about 7.5% for a 5-year bank loan; Sam between his card going up fast and his piggy bank going up slowly", {
  mood: 'light', Component: You2, beats: [...Object.values(K), ...(EXTRA['fed-you2'] ?? [])],
  sfx: [['s48:three', 'coin', 0.08], ['s49:eight', 'pop', 0.08]] })
