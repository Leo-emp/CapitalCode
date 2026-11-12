// ---------------------------------------------------------------- s31–s45: step three, how the check is worked out.
// A) a pigeon-hole rack of year envelopes: the best 35 light up and lift with wage growth → one envelope ≈ $4,333 A MONTH.
// B) the brass sorting machine: Rosa's monthly income is one tall bar to scale; dashed lines at $1,340 and $8,077 split it;
//    slice 1 shrinks to 90% ($1,206) and slice 2 to 32% (≈$958) and both slide right to stack into her check ≈ $2,164.
// C) the same for a $150,000 earner (≈3× pay) → ≈ $4,025 (<2× the check): kinder to lower earners. D) a check envelope
//    grows +3.6% (2027); Rosa's online statement; then a clock: when she starts.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PostWorld, Vig, Stamp, Envelope, Tube, Life, FLOOR, TXT, CREAM, INK, RED, NAVY, BRASS, BRASS2, GREEN, GOLD, DEEPT, PLUM, WOOD2, SKY } from './kit'

const PX = 0.06                                       // px per dollar of monthly income: $8,077 = 485 px
const B1 = 1340, B2 = 8077

const Formula: React.FC<PieceProps> = ({ f, c }) => {
  const d35 = c('s31:35'), most = c('s31:most'), wages = c('s31:wages')
  const average = c('s32:average'), simple = c('s32:simple')
  const d52 = c('s33:52000'), d4333 = c('s33:4333')
  const formula = c('s34:formula'), slices = c('s34:slices')
  const d2027 = c('s35:2027'), d90 = c('s35:90'), d1340 = c('s35:1340'), d1206 = c('s35:1206')
  const d32 = c('s36:32'), d8077 = c('s36:8077'), d958 = c('s36:958')
  const d15 = c('s37:15'), reach = c('s37:reach')
  const add = c('s38:add'), d2164 = c('s38:2164'), terms = c('s38:terms')
  const grow = c('s39:grow'), bigger = c('s39:bigger')
  const compare = c('s40:compare'), d150 = c('s40:150000'), three = c('s40:three')
  const d4025 = c('s41:4025'), twice = c('s41:twice')
  const purpose = c('s42:purpose'), lower = c('s42:lower')
  const prices = c('s43:prices'), d36 = c('s43:36')
  const numbers = c('s44:numbers'), statement = c('s44:statement'), estimate = c('s44:estimate')
  const choice = c('s45:choice'), starts = c('s45:starts')

  const A = 1 - on(f, formula - 10, 8), B = win(f, formula - 2, compare - 2, 8), Cc = win(f, compare - 2, prices - 2, 8), D = on(f, prices - 2, 8)
  const rosa: Beat[] = [[d35, 'present', 'smiling'], [d4333, 'pointUp', 'smiling'], [prices, 'idle', 'smiling'], [numbers, 'read', 'thinking'], [choice, 'think', 'thinking']]
  const BASE = 860
  // # one income bar (x), split into slices, the kept parts sliding right into the check bar (x + 420)
  const Bar: React.FC<{ x: number; aime: number; t1: number; t2: number; t3: number; done: number; name: string; o?: number }> = ({ x, aime, t1, t2, t3, done, name, o = 1 }) => {
    const s1 = Math.min(aime, B1), s2 = Math.max(0, Math.min(aime, B2) - B1), s3 = Math.max(0, aime - B2)
    const k1 = lerp(1, 0.9, t1), k2 = lerp(1, 0.32, t2), k3 = lerp(1, 0.15, t3)
    const mv = (t: number) => 420 * on(f, done, 24) * (t > 0.99 ? 1 : 0)
    const y1 = BASE - s1 * PX * k1, y2 = y1 - s2 * PX * k2, y3 = y2 - s3 * PX * k3
    const total = 0.9 * s1 + 0.32 * s2 + 0.15 * s3
    return <g opacity={o}>
      <text x={x} y={BASE + 50} textAnchor="middle" fill={INK} style={TXT(36)}>{name}</text>
      {/* ghost of the full income */}
      <rect x={x - 70} y={BASE - aime * PX} width={140} height={aime * PX} fill="none" stroke={INK} strokeWidth={3} strokeDasharray="10 8" opacity={0.5} />
      <g transform={`translate(${mv(t1)} 0)`}><rect x={x - 70} y={y1} width={140} height={s1 * PX * k1} fill={GREEN} /></g>
      {s2 > 0 && <g transform={`translate(${mv(t2)} 0)`}><rect x={x - 70} y={y2} width={140} height={s2 * PX * k2} fill={BRASS} /></g>}
      {s3 > 0 && <g transform={`translate(${mv(t3)} 0)`}><rect x={x - 70} y={y3} width={140} height={s3 * PX * k3} fill={PLUM} /></g>}
      <g opacity={on(f, done + 20, 8)}><text x={x + 420} y={y3 - 20} textAnchor="middle" fill={INK} style={TXT(48)}>{`≈ $${Math.round(total).toLocaleString('en-US')}`}</text></g>
    </g>
  }

  return (
    <g>
      <PostWorld f={f} id="ss-formula" tone="day" />
      {/* # A) the best 35 years → one monthly number */}
      {A > 0.001 && <g opacity={A}>
        <Person f={f} who="investorF" beats={rosa} x={300} y={FLOOR + 60} s={0.74} />
        <g transform="translate(500 330)">
          <rect x={-20} y={-20} width={1120} height={500} rx={12} fill={WOOD2} />
          {Array.from({ length: 40 }, (_, k) => { const col = k % 10, row = Math.floor(k / 10), best = k !== 3 && k !== 17 && k !== 22 && k !== 36 && k !== 39
            const lit = best ? on(f, most + k * 0.8, 6) : 0, lift = best ? 12 * on(f, wages + k * 0.5, 10) : 0
            return <g key={k} transform={`translate(${col * 110} ${row * 120})`}><rect x={0} y={0} width={100} height={110} fill="#4A2E1D" /><Envelope x={50} y={70 - lift} s={0.6} col={lit > 0.5 ? GOLD : CREAM} /></g> })}
        </g>
        <g opacity={on(f, d35, 8)}><Stamp x={1120} y={300} t={f >= wages ? 'BEST 35 YEARS · RAISED WITH WAGES' : 'BEST 35 YEARS'} size={44} col={GOLD} /></g>
        <g opacity={on(f, average, 8)} transform={`translate(1120 ${lerp(560, 900, on(f, average, 20))}) scale(${pop(f, average, 12)})`}><Envelope x={0} y={0} s={1.4} t={f >= d4333 ? '$4,333/MO' : 'MONTHLY'} /></g>
        <g opacity={on(f, simple, 8)}><Stamp x={1120} y={1010} t="SIMPLE CASE: SAME PAY EVERY YEAR" size={36} col={CREAM} /></g>
      </g>}
      {/* # B) the three-slice formula, Rosa */}
      {B > 0.001 && <g opacity={B}>
        {/* the brass machine frame */}
        <rect x={400} y={330} width={1000} height={560} rx={20} fill={CREAM} stroke={BRASS2} strokeWidth={10} />
        <g opacity={on(f, d1340, 8)}><line x1={420} y1={BASE - B1 * PX} x2={1380} y2={BASE - B1 * PX} stroke={INK} strokeWidth={4} strokeDasharray="16 10" /><text x={300} y={BASE - B1 * PX + 14} textAnchor="middle" fill={INK} style={TXT(34)}>$1,340</text></g>
        <g opacity={on(f, d8077, 8)}><line x1={420} y1={BASE - B2 * PX} x2={1380} y2={BASE - B2 * PX} stroke={INK} strokeWidth={4} strokeDasharray="16 10" /><text x={300} y={BASE - B2 * PX + 14} textAnchor="middle" fill={INK} style={TXT(34)}>$8,077</text></g>
        <Bar x={640} aime={52000 / 12} t1={on(f, d90, 16)} t2={on(f, d32, 16)} t3={0} done={add} name="ROSA: $4,333/MO" o={on(f, slices, 8)} />
        <g opacity={on(f, add, 8)}><text x={1060} y={BASE + 50} textAnchor="middle" fill={INK} style={TXT(36)}>HER CHECK</text></g>
        {/* slice labels */}
        <g opacity={on(f, d90, 8)}><Stamp x={1640} y={760} t={f >= d1206 ? '90% → $1,206' : '90% OF FIRST $1,340'} size={38} col={GREEN} tc={CREAM} /></g>
        <g opacity={on(f, d32, 8)}><Stamp x={1640} y={640} t={f >= d958 ? '32% → ≈ $958' : '32% UP TO $8,077'} size={38} col={BRASS} /></g>
        <g opacity={on(f, d15, 8)}><Stamp x={1640} y={520} t={f >= reach ? '15% ABOVE · NOT REACHED' : '15% ABOVE $8,077'} size={38} col={PLUM} tc={CREAM} /></g>
        <g opacity={on(f, d2027, 8) * (1 - on(f, add, 8))}><Stamp x={960} y={300} t="2027 FORMULA" size={44} col={NAVY} tc={CREAM} /></g>
        <g opacity={on(f, d2164, 8)}><Stamp x={960} y={300} t={f >= terms ? '≈ $2,164 A MONTH · TODAY’S TERMS' : '≈ $2,164 A MONTH'} size={46} col={GOLD} /></g>
        <g opacity={on(f, grow, 8)}>{[0, 1, 2].map((k) => <path key={k} d={`M${1700 + k * 60} 420 l0 -80 l-18 22 m18 -22 l18 22`} stroke={GREEN} strokeWidth={8} fill="none" opacity={0.5 + 0.5 * Math.sin(f / 6 + k)} />)}<Stamp x={1640} y={300} t="GROWS WITH WAGES" size={36} col={CREAM} /></g>
      </g>}
      {/* # C) the $150,000 earner, on a smaller scale so both fit: income bar (dashed) → check bar (solid) */}
      {Cc > 0.001 && <g opacity={Cc}>
        {[[52000 / 12, 2163.87, 'ROSA $52K', 560, compare, GREEN], [12500, 4025.29, '$150K', 1160, d150, NAVY]].map(([aime, pia, name, x, at, col], k) => {
          const A0 = aime as number, P0 = pia as number, X0 = x as number, t = on(f, at as number, 20), g = on(f, (k ? d4025 : compare + 10), 24)
          return <g key={k} opacity={on(f, at as number, 8)}>
            <rect x={X0 - 80} y={BASE - A0 * 0.04 * t} width={160} height={A0 * 0.04 * t} fill="none" stroke={INK} strokeWidth={4} strokeDasharray="10 8" />
            <text x={X0} y={BASE - A0 * 0.04 - 16} textAnchor="middle" fill={INK} style={TXT(36)}>{`PAY $${Math.round(A0).toLocaleString('en-US')}/MO`}</text>
            <rect x={X0 + 120} y={BASE - P0 * 0.04 * g} width={160} height={P0 * 0.04 * g} fill={col as string} />
            <g opacity={g}><text x={X0 + 200} y={BASE - P0 * 0.04 - 16} textAnchor="middle" fill={INK} style={TXT(40)}>{`CHECK ≈ $${Math.round(P0).toLocaleString('en-US')}`}</text></g>
            <text x={X0 + 100} y={BASE + 50} textAnchor="middle" fill={INK} style={TXT(40)}>{name as string}</text>
          </g> })}
        <g opacity={on(f, three, 8)}><Stamp x={1640} y={300} t="≈ 3× ROSA’S PAY" size={44} col={CREAM} /></g>
        <g opacity={on(f, twice, 8)}><Stamp x={1640} y={400} t="< 2× HER CHECK" size={50} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, lower, 8)}><Stamp x={1640} y={520} t="KINDER TO LOWER EARNERS" size={36} col={GREEN} tc={CREAM} /></g>
      </g>}
      {/* # D) COLA, the statement, the choice */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={1 - on(f, numbers - 10, 8)}>
          <Envelope x={760} y={600} s={lerp(2.2, 2.28, on(f, d36, 20))} t={f >= d36 ? '+3.6%' : 'PRICES ↑'} />
          <g opacity={on(f, d36, 8)}><Stamp x={1300} y={420} t="COST-OF-LIVING RAISE: 3.6%" size={44} col={GOLD} /></g>
        </g>
        <g opacity={on(f, numbers - 2, 8) * (1 - on(f, choice - 10, 8))}>
          <Person f={f} who="investorF" beats={rosa} x={480} y={FLOOR + 60} s={0.74} />
          <g transform="translate(1100 600)">
            <rect x={-240} y={-260} width={480} height={360} rx={18} fill={INK} /><rect x={-220} y={-240} width={440} height={300} rx={8} fill={CREAM} />
            <text y={-196} textAnchor="middle" fill={NAVY} style={TXT(40)}>YOUR STATEMENT</text>
            {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-190} y={-170 + k * 34} width={k % 2 ? 240 : 320} height={14} rx={7} fill="#B9AE98" opacity={on(f, statement + k * 3, 6)} />)}
            <g opacity={on(f, estimate, 8)}><rect x={-190} y={30} width={380} height={24} rx={6} fill={GOLD} /></g>
            <rect x={-280} y={100} width={560} height={26} rx={10} fill="#5A616C" />
          </g>
          <g opacity={on(f, statement, 8)}><Stamp x={1100} y={300} t="EARNINGS RECORD + ESTIMATE" size={42} col={CREAM} /></g>
        </g>
        <g opacity={on(f, choice - 2, 8)} transform="translate(960 560)">
          <circle r={220} fill={CREAM} stroke={BRASS2} strokeWidth={14} />
          {Array.from({ length: 12 }, (_, k) => <line key={k} x1={0} y1={-190} x2={0} y2={-165} stroke={INK} strokeWidth={6} transform={`rotate(${k * 30})`} />)}
          <line x1={0} y1={0} x2={0} y2={-150} stroke={INK} strokeWidth={10} strokeLinecap="round" transform={`rotate(${f * 2})`} /><circle r={16} fill={INK} />
          <g opacity={on(f, starts, 8)}><Stamp x={0} y={330} t="WHEN SHE STARTS" size={50} col={NAVY} tc={CREAM} /></g>
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={d52} x={1120} y={700} kind="glint" />
        <Life f={f} at={bigger} x={1640} y={420} kind="glint" />
        <Life f={f} at={purpose} x={1060} y={600} kind="glint" />
        <Life f={f} at={c("s31:year")} x={1040} y={560} kind="glint" />
        <Life f={f} at={c("s32:then")} x={1040} y={560} kind="glint" />
        <Life f={f} at={c("s32:let's")} x={1040} y={560} kind="glint" />
        <Life f={f} at={c("s32:after")} x={1040} y={560} kind="glint" />
        <Life f={f} at={c("s32:earns")} x={1040} y={560} kind="glint" />
        <Life f={f} at={c("s33:month")} x={1040} y={560} kind="glint" />
        <Life f={f} at={c("s35:people")} x={640} y={700} kind="glint" />
        <Life f={f} at={c("s36:1340")} x={640} y={700} kind="glint" />
        <Life f={f} at={c("s37:8077")} x={640} y={700} kind="glint" />
        <Life f={f} at={c("s38:at")} x={640} y={700} kind="glint" />
        <Life f={f} at={c("s39:because")} x={640} y={700} kind="glint" />
        <Life f={f} at={c("s39:so")} x={640} y={700} kind="glint" />
        <Life f={f} at={c("s39:step")} x={640} y={700} kind="glint" />
        <Life f={f} at={c("s39:keeping")} x={640} y={700} kind="glint" />
        <Life f={f} at={c("s41:the")} x={1160} y={600} kind="glint" />
        <Life f={f} at={c("s42:back")} x={1160} y={600} kind="glint" />
        <Life f={f} at={c("s43:start")} x={760} y={600} kind="glint" />
        <Life f={f} at={c("s43:2027")} x={760} y={600} kind="glint" />
        <Life f={f} at={c("s44:her#2")} x={1100} y={600} kind="glint" />
        <Life f={f} at={c("s44:earnings")} x={1100} y={600} kind="glint" />
        <Life f={f} at={c("s45:actually")} x={1100} y={600} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="ss-formula" />
      <Headline f={f} lines={[[d35, 'HOW THE CHECK IS WORKED OUT', INK, 84], [formula, 'A FORMULA WITH THREE SLICES', INK, 88], [compare, 'COMPARE A HIGH EARNER', INK, 92], [prices, 'AFTER THE CHECKS START', INK, 92]]} />
    </g>
  )
}

export const SS_FORMULA = makePiece('ss-formula', 'Step three: a wooden pigeon-hole rack of forty year envelopes; the best 35 light gold and lift as wages grow (BEST 35 YEARS · RAISED WITH WAGES) and become one envelope ≈ $4,333 A MONTH (SIMPLE CASE: SAME PAY EVERY YEAR); then a brass sorting frame with dashed lines at $1,340 and $8,077: Rosa\'s monthly income is one tall bar to scale whose green first slice shrinks to 90% (90% → $1,206) and brass second slice to 32% (32% → ≈ $958), the purple 15% slice not reached; the kept slices slide right and stack into HER CHECK ≈ $2,164 A MONTH · TODAY\'S TERMS with green arrows (GROWS WITH WAGES); a $150K earner\'s bar drawn at half size shrinks into ≈ $4,025 (≈ 3× ROSA\'S PAY, < 2× HER CHECK, KINDER TO LOWER EARNERS); a big check envelope grows (+3.6% IN 2027, COST-OF-LIVING RAISE: 3.6%); Rosa reads her online statement (EARNINGS RECORD + ESTIMATE); and a big brass clock spins: WHEN SHE STARTS.', {
  mood: 'light', Component: Formula,
  beats: ["s31:35", "s31:most", "s31:wages", "s32:average", "s32:simple", "s33:52000", "s33:4333", "s34:formula", "s34:slices", "s35:2027", "s35:90", "s35:1340", "s35:1206", "s36:32", "s36:8077", "s36:958", "s37:15", "s37:reach", "s38:add", "s38:2164", "s38:terms", "s39:grow", "s39:bigger", "s40:compare", "s40:150000", "s40:three", "s41:4025", "s41:twice", "s42:purpose", "s42:lower", "s43:prices", "s43:36", "s44:numbers", "s44:statement", "s44:estimate", "s45:choice", "s45:starts", "s31:year", "s32:then", "s32:let's", "s32:after", "s32:earns", "s33:month", "s35:people", "s36:1340", "s37:8077", "s38:at", "s39:because", "s39:so", "s39:step", "s39:keeping", "s41:the", "s42:back", "s43:start", "s43:2027", "s44:her#2", "s44:earnings", "s45:actually"],
  sfx: [['s35:90', 'pop', 0.08], ['s36:32', 'pop', 0.08], ['s38:2164', 'chime', 0.08], ['s41:4025', 'pop', 0.08]] })
