// ---------------------------------------------------------------- s20–s24: the three parts, and why both sides agree
// A) s20–21  Nina's certificate large in the middle; FACE VALUE, COUPON and MATURITY tags each draw a leader line to
//            their part (the amount, the 4% seal, the end date) as they are named; the named part gets a brass ring.
// B) s22     the government's money: a TAXES IN column of coins next to a taller SPENDING column; on "borrows the
//            difference" green bond papers stack on the taxes column until it reaches the spending line.
// C) s23     Nina and her payment calendar: a row of dated $20 payments, a padlock FIXED snaps shut over it.
// D) s24     a skyline of borrowers: the government first, then a city hall and a factory slide in; the factory wobbles.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { B, BDefs, BGrain, Capitol, Certificate, CityHall, Coin, CoinStack, Factory, FLOOR, Flourish, Parchment, Skyline, Study, Tag, Tick, cues, fadeIn, scene, FONT } from './kit'

const K = {
  three20: 's20:three', names20: 's20:names',
  amount21: 's21:amount', face21: 's21:face', interest21: 's21:interest', coupon21: 's21:coupon', end21: 's21:end', maturity21: 's21:maturity',
  gov22: 's22:government', spends22: 's22:spends', collects22: 's22:collects', taxes22: 's22:taxes', borrows22: 's22:borrows', diff22: 's22:difference', nina22: 's22:nina',
  nina23: 's23:nina', fixed23: 's23:fixed', advance23: 's23:advance', exactly23: 's23:exactly', when23: 's23:when',
  only24: 's24:only', borrows24: 's24:borrows', not24: 's24:not', safe24: 's24:safe',
}

// # a leader line from a tag to a point, drawn on p
const Leader: React.FC<{ x1: number; y1: number; x2: number; y2: number; p: number; color: string }> = ({ x1, y1, x2, y2, p, color }) => p <= 0.01 ? null : (
  <g><line x1={x1} y1={y1} x2={lerp(x1, x2, p)} y2={lerp(y1, y2, p)} stroke={color} strokeWidth={6} strokeLinecap="round" />{p > 0.95 && <circle cx={x2} cy={y2} r={10} fill={color} />}</g>
)
const Ring: React.FC<{ x: number; y: number; rx: number; ry: number; o: number }> = ({ x, y, rx, ry, o }) => o <= 0.01 ? null : <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={B.brass} strokeWidth={8} opacity={o} />

const Loan2: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s22') - 4, BC = c('s23') - 4, CD = c('s24') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = fadeIn(f, CD)
  const face = on(f, t.face21 - 2, 12), coupon = on(f, t.coupon21 - 2, 12), mat = on(f, t.maturity21 - 2, 12)
  // # B: columns (coins)
  const taxes = 18, spending = 28
  const borrowed = Math.round(lerp(0, spending - taxes, span(f, t.borrows22, t.diff22 + 14)))

  return (
    <g>
      <BDefs />
      {/* ---------------- A) the three parts ---------------- */}
      {A > 0 && <g opacity={A}>
        <Parchment />
        <Certificate x={1060} y={540} s={1.05} n={10} coupons={10} years="MATURES IN 10 YEARS" />
        <Ring x={1018} y={530} rx={200} ry={80} o={face * (1 - coupon)} />
        <Ring x={1260} y={540} rx={84} ry={84} o={coupon * (1 - mat)} />
        <Ring x={1018} y={640} rx={250} ry={40} o={mat} />
        <Tag x={330} y={470} text="FACE VALUE" size={46} bg={B.green} o={face} /><Leader x1={470} y1={470} x2={800} y2={510} p={face} color={B.green} />
        <Tag x={1690} y={330} text="COUPON" size={46} bg={B.brassD} o={coupon} /><Leader x1={1540} y1={404} x2={1310} y2={500} p={coupon} color={B.brassD} />
        <Tag x={330} y={720} text="MATURITY" size={46} bg={B.ink} o={mat} /><Leader x1={450} y1={712} x2={780} y2={645} p={mat} color={B.ink} />
        <Tag x={330} y={540} text="AMOUNT BORROWED" size={30} bg={B.inkSoft} o={face} />
        <Tag x={1690} y={400} text="THE INTEREST RATE" size={30} bg={B.inkSoft} o={coupon} />
        <Tag x={330} y={790} text="THE END DATE" size={30} bg={B.inkSoft} o={mat} />
      </g>}

      {/* ---------------- B) why the government borrows ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Parchment />
        <Capitol x={560} y={FLOOR} s={0.85} />
        <Certificate x={lerp(1200, 620, on(f, AB + 10, 30))} y={lerp(480, 640, on(f, AB + 10, 30))} s={0.4} n={0} o={1 - on(f, t.spends22 - 4, 8)} />
        <Tag x={560} y={FLOOR + 74} text="US GOVERNMENT" size={40} bg={B.greenD} />
        {/* spending line */}
        <g opacity={on(f, t.spends22, 10)}>
          <CoinStack x={1500} y={FLOOR} h={Math.round(spending * on(f, t.spends22, 18))} r={70} />
          <Tag x={1500} y={FLOOR + 74} text="SPENDS" size={40} bg={B.ox} />
          <line x1={1100} x2={1600} y1={FLOOR - spending * 16 - 20} y2={FLOOR - spending * 16 - 20} stroke={B.ox} strokeWidth={4} strokeDasharray="14 10" />
        </g>
        <g opacity={on(f, t.collects22, 10)}>
          <CoinStack x={1180} y={FLOOR} h={Math.round(taxes * on(f, t.taxes22 - 4, 16))} r={70} />
          <Tag x={1180} y={FLOOR + 74} text="TAXES IN" size={40} bg={B.green} />
          {Array.from({ length: borrowed }, (_, k) => <rect key={k} x={1180 - 76} y={FLOOR - (taxes + k + 1) * 16 - 14} width={152} height={18} rx={4} fill="url(#bd-cert)" stroke={B.green} strokeWidth={3} />)}
          <Tag x={1180} y={FLOOR - spending * 16 - 80} text="BORROWED FROM PEOPLE LIKE NINA" size={34} bg={B.green} o={on(f, t.nina22, 8)} />
        </g>
      </g>}

      {/* ---------------- C) fixed in advance ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Study />
        <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [t.fixed23, 'confident', 'smiling'], [t.exactly23, 'thumbsUp', 'smiling']]} x={300} y={1060} s={0.82} />
        <rect x={620} y={520} width={1160} height={300} rx={20} fill={B.parchL} stroke={B.parchDD} strokeWidth={5} opacity={on(f, t.nina23, 8)} />
        {['JAN', 'JUL', 'JAN', 'JUL', 'JAN', 'JUL'].map((m, k) => { const o = on(f, t.nina23 + 4 + k * 3, 8); return o > 0.01 && <g key={k} opacity={o} transform={`translate(${710 + k * 186} 640)`}>
          <rect x={-74} y={-60} width={148} height={170} rx={10} fill="#fff" stroke={B.inkL} strokeWidth={3} /><rect x={-74} y={-60} width={148} height={40} rx={10} fill={B.green} />
          <text y={-30} textAnchor="middle" fill="#fff" style={{ font: `400 30px ${FONT.big}`, letterSpacing: 3 }}>{m}</text>
          <Coin x={0} y={50} r={42} label="$20" />
        </g> })}
        <g opacity={on(f, t.fixed23, 8)} transform={`translate(1200 ${lerp(380, 470, on(f, t.fixed23, 10))})`}>
          <path d="M-46 -10 L-46 -60 Q-46 -110 0 -110 Q46 -110 46 -60 L46 -10" stroke={B.ink} strokeWidth={16} fill="none" />
          <rect x={-74} y={-20} width={148} height={110} rx={16} fill={B.brass} stroke={B.brassD} strokeWidth={6} /><circle cx={0} cy={30} r={14} fill={B.ink} />
        </g>
        <Tag x={1200} y={905} text="FIXED IN ADVANCE" size={44} bg={B.greenD} o={on(f, t.advance23, 8)} />
      </g>}

      {/* ---------------- D) other borrowers ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Skyline />
        <Capitol x={420} y={FLOOR} s={0.72} />
        <CityHall x={1010} y={FLOOR} s={0.78} o={on(f, t.only24, 10)} />
        <Factory x={1560} y={FLOOR} s={0.85} o={on(f, t.borrows24 - 2, 10)} smoke={(f / 60) % 1} shaky={on(f, t.not24, 6) * Math.sin(f / 3)} />
        <Tick x={420} y={420} r={44} p={on(f, t.safe24 - 4, 8)} />
      </g>}

      <Headline f={f} lines={[[t.three20, 'THREE PARTS', B.ink, 116], [t.gov22, 'WHY THE GOVERNMENT BORROWS', B.ink, 100], [t.nina23, 'WHY NINA LENDS', B.ink, 110], [t.only24, 'OTHER BORROWERS', B.ink, 110]]} />
      <Flourish f={f} at={(EXTRA['bd-loan2'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_LOAN2 = makePiece('bd-loan2', "The three parts: Nina's certificate large in the middle, FACE VALUE (amount borrowed), COUPON (the interest rate) and MATURITY (the end date) tags draw leader lines to the amount, the 4% seal and the end date; the government's TAXES IN coin column is shorter than its SPENDS column and green bond papers fill the gap, borrowed from people like Nina; Nina's calendar of $20 payments every January and July with a FIXED padlock snapping shut; a skyline where a city hall and a factory join the government as borrowers and the factory wobbles", {
  mood: 'light', Component: Loan2, beats: [...Object.values(K), ...(EXTRA['bd-loan2'] ?? [])],
  sfx: [['s21:face', 'softpop', 0.08], ['s21:coupon', 'softpop', 0.08], ['s21:maturity', 'softpop', 0.08], ['s23:fixed', 'click', 0.12]] })
