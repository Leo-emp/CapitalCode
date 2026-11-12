// ---------------------------------------------------------------- s41–s51: two made-up borrowers, one year.
// A) Split screen: Ana (left) and Ben (right), same job, same pay, same $1,000 card. A month calendar at the top turns
//    1 → 3 → 4 → 12. Month 1: Ana's groceries (10% bar) vs Ben's $950 laptop (95%). Month 3: Ben's report gets a late mark,
//    a fee coin first. Month 4: three application forms land on Ben's side. Ana's report fills with on-time ticks.
// B) Month 12, the lender's desk: both reports side by side. Ana: 12 on time, small balance, no new credit (green).
//    Ben: a late payment, a maxed card, three applications (red). Ben's tag says HIGHER RATE — or DENIED. Pay and job icons,
//    crossed out: the lender never saw them.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, Coin, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Basket } from '../money4/kit'
import { Note } from '../econ/kit'
import { Briefcase, Card, Form, Laptop, NoCross, Report, GREEN, RED, TXT, INK } from './kit'

const GROUND = 930

const Two: React.FC<PieceProps> = ({ f, c }) => {
  const watch = c('s41:watch'), ana = c('s41:ana'), ben = c('s41:ben'), job = c('s41:job'), card41 = c('s41:card')
  const month1 = c('s42:month'), groceries = c('s42:groceries'), laptop = c('s42:laptop')
  const keeps = c('s42:keeps'), puts = c('s42:puts'), same50 = c('s50:same'), paper = c('s50:paper'), likely = c('s50:likely')
  const p10 = c('s43:10'), p95 = c('s43:95')
  const month3 = c('s44:month'), forgets = c('s44:forgets'), fee = c('s44:fee'), p30 = c('s44:30'), reported = c('s44:reported')
  const month4 = c('s45:month'), three45 = c('s45:three'), check = c('s45:check')
  const nothing = c('s46:nothing'), pays = c('s46:pays'), every = c('s46:every')
  const month12 = c('s47:month'), apply = c('s47:apply'), loan = c('s47:loan')
  const sees = c('s48:sees'), twelve = c('s48:twelve'), small = c('s48:small'), rush = c('s48:rush')
  const then49 = c('s49:then'), late49 = c('s49:late'), near = c('s49:near'), apps = c('s49:applications')
  const risk = c('s50:risk'), higher = c('s50:higher'), turned = c('s50:turned')
  const notice = c('s51:notice'), hard = c('s51:hard'), earn = c('s51:earn')

  const A = win(f, 0, month12 - 4), B = on(f, month12 - 4, 10)
  const monthT = f >= month4 ? 'MONTH 4' : f >= month3 ? 'MONTH 3' : f >= month1 ? 'MONTH 1' : ''
  const anaUse = f >= keeps ? 0.1 * on(f, keeps, 16) : 0
  const benUse = f >= puts ? 0.95 * on(f, puts, 20) : 0
  const anaMarks = Array.from({ length: Math.min(6, f >= nothing ? 1 + Math.floor((f - nothing) / 10) : f >= month1 ? 1 : 0) }, () => 1)
  const benMarks = f >= reported ? [1, 0] : f >= month1 ? [1] : []
  const anaB: Beat[] = [[watch, 'idle', 'smiling'], [groceries, 'hold', 'smiling'], [pays, 'thumbsUp', 'smiling']]
  const benB: Beat[] = [[watch, 'idle', 'smiling'], [laptop, 'celebrate', 'smiling'], [forgets, 'oops', 'worried'], [fee, 'facepalm', 'worried'], [three45, 'phone', 'thinking']]
  return (
    <g>
      <Stage id="cs-two" frame={f} />
      <Headline f={f} lines={[[watch, 'MADE-UP EXAMPLE: ANA AND BEN', P.ink, 86], [month12, 'MONTH 12: THE SAME CAR LOAN', P.ink, 86], [notice, 'WHAT THE LENDER NEVER SAW', P.ink, 90]]} />
      <Ground y={GROUND} />

      {/* # A) the year, side by side */}
      {A > 0 && <g opacity={A}>
        <rect x={956} y={360} width={8} height={GROUND - 360} rx={4} fill={P.ink2} opacity={0.3} />
        <g opacity={on(f, month1 - 6, 8)} transform="translate(960 300)"><rect x={-130} y={-50} width={260} height={90} rx={14} fill={INK} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(60)}>{monthT}</text></g>
        <g opacity={on(f, ana, 8)}><Person f={f} who="investorF" beats={anaB} x={200} y={GROUND} s={0.95} /><Label x={200} y={GROUND + 70} text="ANA" size={56} font="Bebas Neue" color={GREEN} /></g>
        <g opacity={on(f, ben, 8)}><Person f={f} who="buyer" beats={benB} x={1720} y={GROUND} s={0.95} flip /><Label x={1720} y={GROUND + 70} text="BEN" size={56} font="Bebas Neue" color={RED} /></g>
        <g opacity={win(f, job, month1, 6)}><Briefcase x={560} y={700} s={0.9} /><Briefcase x={1360} y={700} s={0.9} /><Label x={960} y={500} text="SAME JOB · SAME PAY" size={56} font="Bebas Neue" color={P.ink} /></g>
        {/* the cards */}
        <g opacity={on(f, card41, 8)}>
          <Card x={600} y={450} s={0.85} used={anaUse} bar label="$1,000" />
          <Card x={1320} y={450} s={0.85} used={benUse} bar label="$1,000" />
        </g>
        <g opacity={on(f, groceries, 8) * (1 - on(f, month3 - 6, 10))} transform="translate(600 760) scale(0.55)"><Basket x={0} y={0} shown={6} /></g>
        <g opacity={on(f, laptop, 8) * (1 - on(f, month3 - 6, 10))}><Laptop x={1320} y={760} s={0.8} /></g>
        <g opacity={on(f, p10, 8)}><Label x={600} y={630} text="10% USED" size={56} font="Bebas Neue" color={GREEN} /></g>
        <g opacity={on(f, p95, 8)}><Label x={1320} y={630} text="95% USED" size={56} font="Bebas Neue" color={RED} /></g>
        {/* the reports */}
        <g opacity={on(f, month3 - 6, 10)}>
          <Report x={600} y={810} s={0.42} marks={anaMarks} title="ANA" />
          <Report x={1320} y={810} s={0.42} marks={benMarks} title="BEN" glow={win(f, reported, month4, 6)} />
        </g>
        <g opacity={win(f, fee, reported, 6)} transform={`translate(1520 600) scale(${pop(f, fee, 12)})`}><Coin x={0} y={0} s={1.4} text="FEE" /></g>
        <g opacity={on(f, p30, 8) * (1 - on(f, month4, 8))}><Label x={1320} y={335} text="30 DAYS LATE: REPORTED" size={40} font="Bebas Neue" color={RED} /></g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, three45 + k * 6, 8)}><Form x={lerp(2000, 1420 + k * 60, on(f, three45 + k * 6, 16))} y={720 + (k % 2) * 20} s={0.5} r={-10 + k * 10} /></g>)}
        <g opacity={on(f, check, 8)}><Label x={1320} y={335} text="3 NEW CHECKS" size={46} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, every, 8)}><Label x={600} y={335} text="ON TIME, EVERY MONTH" size={46} font="Bebas Neue" color={GREEN} /></g>
      </g>}

      {/* # B) the lender compares */}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="owner" beats={[[month12, 'idle', 'neutral'], [sees, 'read', 'thinking'], [then49, 'read', 'thinking'], [risk, 'shrug', 'neutral']]} x={960} y={GROUND} s={1} />
        <rect x={760} y={760} width={400} height={170} rx={12} fill="#8E5B3A" />
        <g opacity={on(f, apply, 8)}><Report x={520} y={560} s={0.8} marks={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} title="ANA" glow={win(f, sees, then49, 6)} /></g>
        <g opacity={on(f, loan, 8)} transform={`translate(${8 * Math.sin((f - paper) / 2) * win(f, paper, likely, 4)} 0)`}><Report x={1400} y={560} s={0.8} marks={[1, 0, 1, 1, 1, 1]} title="BEN" glow={win(f, then49, risk, 6)} col="#FFF1EE" /></g>
        {([[twelve, '12 ON TIME'], [small, 'SMALL BALANCE'], [rush, 'NO NEW CREDIT']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={on(f, at, 8) * (1 - on(f, notice, 8))}><Label x={80} y={340 + k * 56} text={t} size={44} font="Bebas Neue" color={GREEN} anchor="start" /></g>)}
        {([[late49, 'A LATE PAYMENT'], [near, 'A MAXED CARD'], [apps, '3 APPLICATIONS']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={on(f, at, 8) * (1 - on(f, notice, 8))}><Label x={1840} y={340 + k * 56} text={t} size={44} font="Bebas Neue" color={RED} anchor="end" /></g>)}
        <g opacity={win(f, same50, paper, 6)}><Label x={960} y={330} text="SAME JOB · SAME PAY" size={50} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, likely, 8) * (1 - on(f, higher, 8))}><Label x={1460} y={900} text="BIGGER RISK" size={54} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, higher, 8) * (1 - on(f, notice, 8))} transform={`translate(1460 ${900 - 10 * pop(f, higher, 12)})`}><rect x={-170} y={-44} width={340} height={80} rx={12} fill={RED} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(54)}>{f >= turned ? 'OR DENIED' : 'HIGHER RATE'}</text></g>
        <g opacity={on(f, notice, 8)}>
          <Briefcase x={760} y={390} s={0.7} /><NoCross x={760} y={330} s={0.8} o={on(f, hard, 8)} />
          <Note x={1160} y={330} t="PAY" s={0.8} /><NoCross x={1160} y={330} s={0.8} o={on(f, earn, 8)} />
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s41:on")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s41:pay")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s42:ana")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s42:dollars")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s43:ana")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s43:limit")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s44:first")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s45:four")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s45:spread")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s45:each")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s46:ana")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s50:pay")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s50:ben")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s51:saw")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s51:works")} x={960} y={620} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="cs-two" />
    </g>
  )
}

export const CS_TWO = makePiece('cs-two', 'Two made-up borrowers over a year: split screen with Ana and Ben, same job and pay (two briefcases), each with a $1,000 card and a usage bar; a calendar turns month 1, 3, 4; Ana buys groceries (10% used), Ben puts a laptop on his card (95% used); Ben forgets a payment — a FEE coin, then 30 days late: a red mark on his report; three application forms fly onto his side (3 new checks) while Ana\'s report fills with on-time ticks; month 12, a lender reads both reports at a desk — Ana: 12 on time, small balance, no new credit; Ben: a late payment, a maxed card, 3 applications — Ben\'s tag reads HIGHER RATE, then OR DENIED; pay and job icons are crossed out: the lender never saw them.', {
  mood: 'light', Component: Two,
  beats: ["s41:watch", "s41:ana", "s41:ben", "s41:job", "s41:card", "s42:month", "s42:groceries", "s42:laptop", "s42:keeps", "s42:puts", "s50:same", "s50:paper", "s50:likely", "s43:10", "s43:95", "s44:month", "s44:forgets", "s44:fee", "s44:30", "s44:reported", "s45:month", "s45:three", "s45:check", "s46:nothing", "s46:pays", "s46:every", "s47:month", "s47:apply", "s47:loan", "s48:sees", "s48:twelve", "s48:small", "s48:rush", "s49:then", "s49:late", "s49:near", "s49:applications", "s50:risk", "s50:higher", "s50:turned", "s51:notice", "s51:hard", "s51:earn", "s41:on", "s41:pay", "s42:ana", "s42:dollars", "s43:ana", "s43:limit", "s44:first", "s45:four", "s45:spread", "s45:each", "s46:ana", "s50:pay", "s50:ben", "s51:saw", "s51:works"],
  sfx: [['s42:laptop', 'pop', 0.1], ['s44:fee', 'coin', 0.12], ['s44:reported', 'thud', 0.12], ['s45:three', 'swish', 0.1], ['s50:higher', 'thud', 0.12]] })
