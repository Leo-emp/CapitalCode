// ---------------------------------------------------------------- s32–s39: ratings, and why risk costs more interest
// A) s32–33  a brass ladder of grades: AAA at the top down to D; a grader reads it; the BB-and-below rungs turn
//            oxblood with a bracket HIGH YIELD = JUNK.
// B) s34     a riskier borrower (the small shop) must pile up more interest coins; Nina says no until it does.
// C) s35–38  nearly a century, 1928 → 2025: two coin columns per year of return — US Treasury bonds ≈ 4.5% vs
//            company bonds just above junk ≈ 6.5%; a bracket marks the extra 2% = the price of the risk.
// D) s39     even the safest bond sits on a seesaw: when interest rates change, it rocks.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { B, BDefs, BGrain, Capitol, Certificate, CoinStack, FLOOR, Flourish, Parchment, Seesaw, Skyline, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  rating32: 's32:rating', grade32: 's32:grade', triple32: 's32:triple', top32: 's32:top', d32: 's32:d', defaulted32: 's32:defaulted',
  double33: 's33:double', lower33: 's33:lower', high33: 's33:high', junk33: 's33:junk',
  key34: "s34:here's", riskier34: 's34:riskier', more34: 's34:more', interest34: 's34:interest', nobody34: 's34:nobody',
  century35: 's35:century', data35: 's35:data',
  nineteen36: 's36:nineteen', treasury36: 's36:treasury', four36: 's36:four', half36: 's36:half',
  companies37: 's37:companies', junk37: 's37:junk', six37: 's37:six',
  extra38: 's38:extra', two38: 's38:two', price38: 's38:price', risk38: 's38:risk',
  safest39: 's39:safest', second39: 's39:second', nothing39: 's39:nothing', interest39: 's39:interest', change39: 's39:change',
}
const GRADES = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'D']

const Shop: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={180} ry={14} fill="#000" opacity={0.14} />
    <rect x={-160} y={-220} width={320} height={220} fill={B.oxL} stroke={B.ox} strokeWidth={5} />
    <path d="M-180 -220 L180 -220 L160 -270 L-160 -270 Z" fill={B.ox} />
    <rect x={-110} y={-170} width={110} height={90} rx={6} fill="#fff" opacity={0.8} /><rect x={40} y={-150} width={70} height={150} fill={B.ox} />
  </g>
)

const Risk2: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s34') - 4, BC = c('s35') - 4, CD = c('s39') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = fadeIn(f, CD)
  // # A: rungs appear from the top (on "triple A") down to D (on "D")
  const shown = lerp(0, GRADES.length, span(f, t.triple32 - 4, t.d32 + 2))
  const junk = on(f, t.double33, 10)
  // # C: coin columns (one coin per 0.5%)
  const tre = Math.round(9 * on(f, t.four36, 16)), cor = Math.round(13 * on(f, t.six37 - 2, 16))
  return (
    <g>
      <BDefs />
      {/* ---------------- A) the grade ladder ---------------- */}
      {A > 0 && <g opacity={A}>
        <Parchment />
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [t.grade32, 'read', 'thinking'], [t.double33, 'point', 'neutral']]} x={330} y={1060} s={0.8} />
        <g opacity={on(f, t.rating32 - 4, 8)}>
          <rect x={890} y={250} width={22} height={760} rx={8} fill="url(#bd-brass)" /><rect x={1270} y={250} width={22} height={760} rx={8} fill="url(#bd-brass)" />
        </g>
        {GRADES.map((g, k) => { const o = Math.min(1, Math.max(0, shown - k)); const bad = k >= 4; return o > 0.01 && <g key={g} opacity={o}>
          <rect x={900} y={290 + k * 88} width={382} height={56} rx={10} fill={bad ? lerp(0, 1, junk) > 0.5 ? B.ox : B.green : B.green} stroke={B.greenD} strokeWidth={3} />
          <text x={1091} y={332 + k * 88} textAnchor="middle" fill="#fff" style={{ font: `400 46px ${FONT.big}`, letterSpacing: 6 }}>{g}</text>
        </g> })}
        <Tag x={1520} y={318} text="TOP" size={40} bg={B.greenD} o={on(f, t.top32, 8)} />
        <Tag x={1520} y={934} text="ALREADY DEFAULTED" size={36} bg={B.ox} o={on(f, t.defaulted32, 8) * (1 - junk)} />
        {junk > 0.01 && <g opacity={junk}>
          <path d="M1310 640 L1350 640 L1350 960 L1310 960" stroke={B.ox} strokeWidth={8} fill="none" />
          <Tag x={1560} y={780} text="HIGH YIELD" size={46} bg={B.ox} o={on(f, t.high33, 8)} />
          <Tag x={1560} y={860} text="= JUNK" size={46} bg={B.oxD} o={on(f, t.junk33, 8)} />
        </g>}
      </g>}

      {/* ---------------- B) riskier pays more ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Skyline />
        <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [t.more34 + 18, 'nodA', 'smiling'], [t.nobody34, 'crossNoA', 'neutral']]} x={300} y={1060} s={0.8} />
        <Shop x={1180} y={FLOOR} s={1.1} />
        <Tag x={1180} y={FLOOR + 74} text="RISKIER BORROWER" size={40} bg={B.ox} o={on(f, t.riskier34, 8)} />
        <CoinStack x={1560} y={FLOOR} h={Math.round(lerp(4, 14, on(f, t.more34, 18)))} r={70} />
        <Tag x={1560} y={FLOOR + 74} text="MORE INTEREST" size={40} bg={B.brassD} o={on(f, t.interest34 - 2, 8)} />
      </g>}

      {/* ---------------- C) nearly a century of data ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Parchment />
        <g opacity={on(f, BC, 8)}>
          <rect x={360} y={970} width={1200} height={14} rx={7} fill={B.parchDD} />
          {Array.from({ length: 98 }, (_, k) => <circle key={k} cx={372 + k * 12.1} cy={940} r={4.5} fill={B.green} opacity={on(f, BC + 4 + k * 0.4, 4)} />)}
          <Tag x={360} y={1000} text="1928" size={38} bg={B.ink} o={on(f, t.nineteen36, 8)} /><Tag x={1560} y={1000} text="2025" size={38} bg={B.ink} o={on(f, t.nineteen36 + 10, 8)} />
        </g>
        <Certificate x={640} y={470} s={0.5} n={0} title="US TREASURY" rate="" amount="10-YEAR" o={on(f, t.treasury36 - 2, 8)} />
        <CoinStack x={640} y={FLOOR} h={tre} r={84} o={on(f, t.treasury36, 8)} />
        <Tag x={640} y={FLOOR - 9 * 16 - 90} text="≈ 4.5% A YEAR" size={46} bg={B.green} o={on(f, t.half36 - 2, 8)} />
        <Certificate x={1280} y={400} s={0.5} n={0} title="COMPANY BONDS" rate="" amount="BAA" color={B.ox} o={on(f, t.companies37 - 2, 8)} />
        <CoinStack x={1280} y={FLOOR} h={cor} r={84} o={on(f, t.companies37, 8)} />
        <Tag x={1280} y={FLOOR - 13 * 16 - 90} text="≈ 6.5% A YEAR" size={46} bg={B.ox} o={on(f, t.six37, 8)} />
        <Tag x={1280} y={240} text="JUST ABOVE JUNK" size={34} bg={B.inkSoft} o={on(f, t.junk37, 8) * (1 - on(f, t.extra38 - 2, 8))} />
        {on(f, t.extra38 - 2, 8) > 0.01 && <g opacity={on(f, t.extra38 - 2, 8)}>
          <path d={`M1400 ${FLOOR - 9 * 16 - 14} L1440 ${FLOOR - 9 * 16 - 14} L1440 ${FLOOR - 13 * 16 - 14} L1400 ${FLOOR - 13 * 16 - 14}`} stroke={B.brassD} strokeWidth={8} fill="none" />
          <Tag x={1620} y={FLOOR - 11 * 16 - 0} text="+2%" size={56} bg={B.brassD} o={on(f, t.two38, 8)} />
          <Tag x={1620} y={FLOOR - 11 * 16 + 80} text="PRICE OF THE RISK" size={34} bg={B.ink} o={on(f, t.price38, 8)} />
        </g>}
        <Tag x={960} y={1046} text="DAMODARAN, NYU · 1928–2025" size={24} bg={B.inkSoft} o={on(f, t.data35, 8)} />
      </g>}

      {/* ---------------- D) the second risk ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Skyline />
        <Seesaw x={960} y={FLOOR} w={1200} tilt={on(f, t.change39 - 4, 10) * Math.sin((f - t.change39) / 9) * 9}
          right={<Certificate x={0} y={-150} s={0.42} n={0} o={on(f, t.safest39 - 2, 8)} />}
          left={<g opacity={on(f, t.interest39 - 2, 8)}><rect x={-110} y={-120} width={220} height={120} rx={14} fill={B.ox} /><text y={-44} textAnchor="middle" fill="#fff" style={{ font: `400 56px ${FONT.big}` }}>RATES</text></g>} />
        <Tag x={960} y={FLOOR + 80} text="NOTHING TO DO WITH WHO BORROWED" size={34} bg={B.inkSoft} o={on(f, t.nothing39, 8)} />
      </g>}

      <Headline f={f} lines={[[t.rating32, 'GRADES FOR BORROWERS', B.ink, 108], [t.key34, 'RISK COSTS MORE INTEREST', B.ink, 104], [c('s35'), 'NEARLY A CENTURY OF DATA', B.ink, 104], [t.safest39, 'A SECOND RISK', B.ox, 116]]} />
      <Flourish f={f} at={(EXTRA['bd-risk2'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_RISK2 = makePiece('bd-risk2', "Ratings: a brass ladder of grades from AAA at the top down to D (already defaulted), the BB-and-below rungs turn oxblood with a bracket HIGH YIELD = JUNK; a riskier small shop must pile up more interest coins before Nina lends; 1928 to 2025 coin columns, US Treasury 10-year bonds about 4.5% a year vs company bonds just above junk about 6.5%, a bracket +2% = the price of the risk; the safest bond on a seesaw opposite RATES starts rocking", {
  mood: 'light', Component: Risk2, beats: [...Object.values(K), ...(EXTRA['bd-risk2'] ?? [])],
  sfx: [['s33:junk', 'thud', 0.1], ['s34:more', 'coin', 0.1], ['s38:two', 'ding', 0.1], ['s39:change', 'swish', 0.1]] })
