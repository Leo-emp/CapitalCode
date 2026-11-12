// ---------------------------------------------------------------- s29–s34: way 4, learn a skill that pays more (noon, a building site).
// Two pay towers on a building site: ALL JOBS $50,980 and ELECTRICIANS $63,190 (heights to scale), a coiled cable and a
// lit bulb on the electricians' tower. Then three stepping stones: a diploma cap, an apprentice's wrench (4–5 YEARS) and a
// coin (PAID WHILE LEARNING). Leo's own tower ($54,000) rises to the median: +$9,190. Ten little electricians stand
// along a median line — five below it. Then paychecks rise year after year, and more customers than one boss appear.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, WayBadge, Tower, Coin, Home, Life, TXT, CREAM, ORANGE, RED, GOLD, GOLD2, MINT, INK, DEEP, TEAL, SAND, PLUM } from './kit'

const GY = 960
const H = (v: number) => v / 54000 * 22               // coins per dollar: $54,000 = 22 coins

const Bulb: React.FC<{ x: number; y: number; lit: number; s?: number }> = ({ x, y, lit, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {lit > 0 && <circle cy={-60} r={90} fill={GOLD} opacity={0.3 * lit} />}
    <path d="M-40 -60 A40 40 0 1 1 40 -60 Q30 -30 22 -10 L-22 -10 Q-30 -30 -40 -60 Z" fill={lit > 0.5 ? '#FFE9A0' : CREAM} stroke={INK} strokeWidth={5} />
    <rect x={-20} y={-10} width={40} height={24} rx={5} fill="#8E949C" />
    <path d="M-14 -40 L-6 -60 L6 -40 L14 -60" stroke={INK} strokeWidth={4} fill="none" />
  </g>
)

const Skill: React.FC<PieceProps> = ({ f, c }) => {
  const learn = c('s29:learn'), pays = c('s29:pays')
  const elec = c('s30:electricians'), may = c('s30:may'), d63 = c('s30:63190'), d50 = c('s30:50980'), all = c('s30:all')
  const path = c('s31:path'), diploma = c('s31:diploma'), five = c('s31:five'), appr = c('s31:apprenticeship'), paid = c('s31:paid')
  const reached = c('s32:reached'), d9190 = c('s32:9190'), today = c('s32:today')
  const quick = c('s33:quick'), half = c('s33:half'), less = c('s33:less'), better = c('s33:better'), lifts = c('s33:lifts'), after = c('s33:after')
  const skills = c('s34:skills'), boss = c('s34:boss')

  const leo: Beat[] = [[learn, 'think', 'thinking'], [elec, 'point', 'smiling'], [path, 'walkA', 'smiling', 'walkB', 12], [reached, 'pointUp', 'smiling'], [d9190, 'celebrate', 'smiling'], [quick, 'shrug', 'neutral'], [lifts, 'confident', 'smiling'], [boss, 'present', 'smiling']]
  const A = 1 - on(f, path - 10, 8), B = win(f, path - 2, reached - 2, 8), Cc = win(f, reached - 2, half - 2, 8), D = win(f, half - 2, skills - 2, 8), E = on(f, skills - 2, 8)
  const step = [diploma, appr, paid]
  const grow = on(f, d9190, 24)

  return (
    <g>
      <PosterWorld f={f} id="rh-skill" tone="noon" sunX={300} sunY={320} ground="#D9C79A" />
      <g opacity={on(f, c('s29:number') - 4, 10)}><WayBadge x={200} y={320} n={4} s={pop(f, c('s29:number'), 12)} col={GOLD} /></g>
      {/* # A) two pay towers */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, d50, 8)}><Tower x={760} y={GY} n={on(f, d50, 20) * H(50980)} s={1.3} col="#C9D3D6" edge="#8E9AA0" /><Ticket x={760} y={GY - H(50980) * 18 - 70} t="ALL JOBS $50,980" size={44} col={CREAM} /></g>
        <g opacity={on(f, elec, 8)}>
          <Tower x={1260} y={GY} n={on(f, d63, 20) * H(63190)} s={1.3} />
          <g opacity={on(f, d63, 8)}><Ticket x={1260} y={GY - H(63190) * 18 - 70} t="ELECTRICIANS $63,190" size={44} col={GOLD} /></g>
          <Bulb x={1520} y={GY} lit={on(f, pays + 4, 10)} s={1.4} />
        </g>
        <g opacity={on(f, may, 8)}><Ticket x={1000} y={330} t="MEDIAN PAY · MAY 2025" size={44} col={CREAM} /></g>
        <Person f={f} who="worker" beats={leo} x={380} y={GY + 40} s={0.78} />
      </g>}
      {/* # B) the path: diploma → apprenticeship → paid while learning */}
      {B > 0.001 && <g opacity={B}>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, step[k], 8)} transform={`translate(${620 + k * 460} ${GY - 40}) scale(${pop(f, step[k], 12)})`}>
          <ellipse cx={10} cy={30} rx={190} ry={40} fill="rgba(30,20,30,0.22)" /><ellipse cx={0} cy={0} rx={180} ry={50} fill="#A9A08C" /><ellipse cx={0} cy={-14} rx={180} ry={46} fill="#CFC5AE" />
          {k === 0 && <g transform="translate(0 -120)"><path d="M-110 -10 L0 -60 L110 -10 L0 40 Z" fill={INK} /><rect x={-60} y={10} width={120} height={50} rx={10} fill={INK} /><path d="M90 0 L90 70" stroke={GOLD} strokeWidth={6} /></g>}
          {k === 1 && <g transform="translate(0 -110) rotate(-30)"><rect x={-14} y={-90} width={28} height={160} rx={10} fill="#8E949C" /><path d="M-40 -110 A44 44 0 1 1 40 -110 L18 -80 L-18 -80 Z" fill="#8E949C" /></g>}
          {k === 2 && <g transform="translate(0 -110)"><Coin x={0} y={0} s={2} /></g>}
          <text y={110} textAnchor="middle" fill={INK} style={TXT(42)}>{['HIGH SCHOOL DIPLOMA', f >= five ? 'APPRENTICE 4–5 YEARS' : 'APPRENTICE', 'PAID WHILE LEARNING'][k]}</text>
        </g>)}
        {[0, 1].map((k) => <path key={k} d={`M${740 + k * 460} ${GY - 120} q110 -60 220 0`} stroke={ORANGE} strokeWidth={10} fill="none" strokeDasharray="20 14" opacity={on(f, step[k + 1] - 4, 8)} />)}
      </g>}
      {/* # C) Leo's tower grows from $54,000 to the median */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Person f={f} who="worker" beats={leo} x={560} y={GY + 40} s={0.8} />
        <Tower x={1100} y={GY} n={H(54000)} s={1.3} col="#7FC6BC" edge={TEAL} />
        <Tower x={1100} y={GY - H(54000) * 18} n={grow * H(9190)} s={1.3} />
        <Ticket x={1440} y={GY - H(54000) * 9} t="TODAY $54,000" size={44} col={TEAL} tc={CREAM} />
        <g opacity={on(f, d9190, 8)}><Ticket x={1440} y={GY - H(63190) * 18 - 10} t="+ $9,190 A YEAR" size={56} col={GOLD} /></g>
      </g>}
      {/* # D) half earn less than the median; a better skill lifts later paychecks */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={1 - on(f, better - 12, 8)}>
          <line x1={240} y1={770} x2={1680} y2={770} stroke={INK} strokeWidth={6} strokeDasharray="24 16" />
          <text x={1700} y={784} fill={INK} style={TXT(40)}>MEDIAN</text>
          {Array.from({ length: 10 }, (_, k) => <g key={k} opacity={on(f, half + k * 2, 6)} transform={`translate(${320 + k * 150} ${k < 5 ? 0 : -260})`}>
            <Person f={f} who={k % 2 ? 'worker' : 'buyer'} beats={[[half, 'idle', 'neutral']]} x={0} y={k < 5 ? 1000 : 1000} s={0.34} o={k < 5 && f >= less ? 0.55 : 1} />
          </g>)}
          <g opacity={on(f, less, 8)}><Ticket x={620} y={480} t="HALF EARN LESS" size={48} col={CREAM} /></g>
        </g>
        <g opacity={on(f, better - 4, 8)}>
          {Array.from({ length: 6 }, (_, k) => { const h = 120 + k * 40 * on(f, lifts, 30); return <g key={k} opacity={on(f, lifts + k * 4, 6)} transform={`translate(${460 + k * 200} ${GY})`}>
            <rect x={-70} y={-h} width={140} height={h} rx={10} fill={k ? GOLD : '#7FC6BC'} /><rect x={-50} y={-h + 20} width={100} height={12} rx={6} fill={CREAM} opacity={0.8} />
          </g> })}
          <g opacity={on(f, after, 8)}><Ticket x={960} y={400} t="EVERY PAYCHECK AFTER IT" size={50} col={CREAM} /></g>
        </g>
      </g>}
      {/* # E) not only one boss */}
      {E > 0.001 && <g opacity={E}>
        <Person f={f} who="worker" beats={leo} x={460} y={GY + 40} s={0.78} />
        <Person f={f} who="owner" beats={[[skills, 'idle', 'neutral']]} x={900} y={GY + 40} s={0.6} flip />
        <g opacity={on(f, boss, 8)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, boss + 4 + k * 4, 8)}><Home x={1200 + k * 260} y={GY} s={0.6} col={[CREAM, SAND, '#F6D2C2'][k]} roof={[RUST_, TEAL, PLUM][k]} /></g>)}</g>
        <g opacity={on(f, boss, 8)}><Ticket x={1460} y={500} t="MORE THAN ONE CUSTOMER" size={44} col={CREAM} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={all} x={760} y={560} kind="glint" />
        <Life f={f} at={today} x={1100} y={500} kind="glint" />
        <Life f={f} at={c("s30:their")} x={1000} y={560} kind="glint" />
        <Life f={f} at={c("s34:have")} x={1460} y={640} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-skill" />
      <Headline f={f} lines={[[learn, 'LEARN A SKILL THAT PAYS MORE', INK, 88], [skills, 'SELL IT TO MORE THAN ONE BOSS', INK, 84]]} />
    </g>
  )
}
const RUST_ = '#B8522A'

export const RH_SKILL = makePiece('rh-skill', 'Way 4 at noon on a building site: two coin pay towers to scale — ALL JOBS $50,980 (grey) and ELECTRICIANS $63,190 (gold) with a big light bulb that switches on (MEDIAN PAY · MAY 2025); three stepping stones with a diploma cap, a wrench and a coin — HIGH SCHOOL DIPLOMA → APPRENTICE 4–5 YEARS → PAID WHILE LEARNING; Leo\'s teal tower TODAY $54,000 grows a gold top + $9,190 A YEAR; ten small electricians along a dashed MEDIAN line, five below it dimmed (HALF EARN LESS); then six paychecks rising one after another (EVERY PAYCHECK AFTER IT); finally Leo beside one boss, and three neighbours\' houses appear: MORE THAN ONE CUSTOMER.', {
  mood: 'light', Component: Skill,
  beats: ["s29:learn", "s29:pays", "s30:electricians", "s30:may", "s30:63190", "s30:50980", "s30:all", "s31:path", "s31:diploma", "s31:five", "s31:apprenticeship", "s31:paid", "s32:reached", "s32:9190", "s32:today", "s33:quick", "s33:half", "s33:less", "s33:better", "s33:lifts", "s33:after", "s34:skills", "s34:boss", "s29:number", "s30:their", "s34:have"],
  sfx: [['s30:63190', 'pop', 0.08], ['s32:9190', 'coin', 0.1], ['s34:boss', 'pop', 0.08]] })
