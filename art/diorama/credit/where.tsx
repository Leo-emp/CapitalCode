// ---------------------------------------------------------------- s8–s23: where the number comes from.
// A) The meter, big: a borrower and a lender; a coin is lent and comes back — will it come back on time? The meter is a
//    PREDICTION; 300 and 850 appear on its ends and the needle climbs as the lender relaxes. FICO's bands light up.
// B1) Step 1: a borrower with a card, a car, a graduation cap and a house (one per word). Step 2: reports fly to three bureau
//     archives (Equifax, Experian, TransUnion). The bureaus only keep the record: owed, limits, on time.
// B2) Step 3: the record slides into the formula machine — 90% of top lenders, says FICO. Three small meters, a little
//     different. Step 4: out comes one number; the lender asks two questions: lend? and at what price?
// C) Not how rich you are (a vault, crossed out) — how you handled borrowed money (the report glows); a magnifier on the machine.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, House, Car, Coin, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Glass } from '../pe/kit'
import { Bureau, Cap, Card, Machine, Meter, NoCross, Report, Tick, Vault, GREEN, RED, TXT, INK } from './kit'

const GROUND = 930

const Where: React.FC<PieceProps> = ({ f, c }) => {
  const first = c('s8:first'), really = c('s8:really')
  const prediction = c('s9:prediction'), guesses = c('s9:guesses'), borrow = c('s9:borrow'), time9 = c('s9:time')
  const d300 = c('s10:300'), d850 = c('s10:850'), higher = c('s10:higher'), safer = c('s10:safer')
  const fico = c('s11:fico'), good = c('s11:good'), very = c('s11:very'), exceptional = c('s11:exceptional')
  const made = c('s12:made'), four = c('s12:four')
  const one = c('s13:one'), card = c('s13:card'), car = c('s13:car'), student = c('s13:student'), mortgage = c('s13:mortgage')
  const two = c('s14:two'), report = c('s14:report'), bureaus14 = c('s14:bureaus'), month = c('s14:month')
  const america = c('s15:america'), equifax = c('s15:equifax'), experian = c('s15:experian'), transunion = c('s15:transunion')
  const decide = c('s16:decide'), record = c('s16:record'), owe = c('s16:owe'), limits = c('s16:limits'), paid = c('s16:paid')
  const three = c('s17:three'), formula = c('s17:formula'), known = c('s17:known')
  const p90 = c('s18:90'), lenders18 = c('s18:lenders')
  const different = c('s19:different'), differ = c('s19:differ')
  const four20 = c('s20:four'), number = c('s20:number'), lender20 = c('s20:lender'), things = c('s20:things')
  const lend = c('s21:lend'), price = c('s21:price')
  const rich = c('s22:rich'), handled = c('s22:handled'), borrowed = c('s22:borrowed')
  const question = c('s23:question'), looking = c('s23:looking')

  const A = win(f, 0, made - 4), B1 = win(f, made - 4, three - 4), B2 = win(f, three - 4, rich - 4), Cw = on(f, rich - 4, 10)

  // # A
  const needle = f >= d850 ? lerp(300, 850, on(f, d850, 20)) * (1 - on(f, higher, 10)) + lerp(575, 800, on(f, higher, 24)) * on(f, higher, 10) : f >= d300 ? 300 : 575
  const coinOut = on(f, borrow, 20), coinBack = on(f, time9, 20)
  // # B1: reports flying to the bureaus, looping
  const flyT = (k: number) => { const t = ((f - report) / 28 + k / 3) % 1; return f >= report ? t : -1 }
  // # B2
  const into = on(f, formula, 24)
  const borrower: Beat[] = [[first, 'idle', 'neutral'], [borrow, 'receive', 'smiling'], [time9, 'offer', 'thinking']]
  const lenderA: Beat[] = [[first, 'idle', 'thinking'], [borrow, 'offer', 'neutral'], [safer, 'thumbsUp', 'smiling']]
  return (
    <g>
      <Stage id="cs-where" frame={f} />
      <Headline f={f} lines={[[really, 'WHAT A CREDIT SCORE IS', P.ink, 96], [fico, 'THE FICO SCALE', P.ink, 96], [one, 'STEP 1: YOU BORROW', P.ink, 96], [two, 'STEP 2: LENDERS REPORT', P.ink, 96], [three, 'STEP 3: THE FORMULA', P.ink, 96], [four20, 'STEP 4: ONE NUMBER, TWO QUESTIONS', P.ink, 86], [rich, 'NOT HOW RICH YOU ARE', P.ink, 96]]} />
      <Ground y={GROUND} />

      {/* # A) a prediction, 300 to 850 */}
      {A > 0 && <g opacity={A}>
        <Meter x={960} y={GROUND - 60} s={1.15} v={needle} bands={on(f, fico, 14)} ends={on(f, d300, 8)} lit={[0, 0, win(f, good, very, 6), win(f, very, exceptional, 6), on(f, exceptional, 8)]} />
        <Person f={f} who="buyer" beats={borrower} x={230} y={GROUND} s={0.85} />
        <Person f={f} who="owner" beats={lenderA} x={1690} y={GROUND} s={0.85} flip />
        {f >= borrow && f < time9 + 24 && <Coin x={coinBack > 0 ? lerp(330, 1590, coinBack) : lerp(1590, 330, coinOut)} y={480 - 160 * Math.sin(Math.PI * (coinBack > 0 ? coinBack : coinOut))} s={1.4} />}
        <g opacity={win(f, time9, d300, 6)}><Label x={960} y={330} text="ON TIME?" size={80} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, prediction, 8) * (1 - on(f, guesses, 6))}><Label x={960} y={GROUND + 60} text="A PREDICTION" size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, guesses + 6, time9, 6)}><Label x={960} y={GROUND + 60} text="WILL YOU PAY IT BACK?" size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, higher, fico, 6)}><Label x={960} y={GROUND + 60} text="HIGHER = SAFER" size={60} font="Bebas Neue" color={GREEN} /></g>
        {([[good, '670–739 GOOD', 560], [very, '740–799 VERY GOOD', 960], [exceptional, '800+ EXCEPTIONAL', 1360]] as [number, string, number][]).map(([at, t, x], k) => <g key={k} opacity={on(f, at, 8)}><Label x={x} y={GROUND + 60} text={t} size={44} font="Bebas Neue" color={P.ink} /></g>)}
      </g>}

      {/* # B1) step 1 and 2: you borrow, lenders report to three bureaus */}
      {B1 > 0 && <g opacity={B1}>
        <g opacity={1 - on(f, decide - 6, 10)}>
          <Person f={f} who="buyer" beats={[[made, 'idle', 'neutral'], [one, 'present', 'smiling']]} x={330} y={GROUND} s={0.95} />
          {([[card, 140, 420, <Card key="c" x={0} y={0} s={0.45} />], [car, 520, 420, <g key="v" transform="scale(0.55)"><Car x={0} y={40} /></g>], [student, 140, 640, <Cap key="g" x={0} y={30} s={0.7} />], [mortgage, 520, 640, <g key="h" transform="scale(0.32)"><House x={0} y={100} /></g>]] as [number, number, number, React.ReactNode][]).map(([at, x, y, pic], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(${x} ${y}) scale(${pop(f, at, 12)})`}>{pic}</g>)}
          {[0, 1, 2].map((k) => { const t = flyT(k); return t >= 0 && f < decide ? <g key={k} opacity={Math.sin(Math.PI * t)}><Report x={lerp(620, [1000, 1320, 1640][k], t)} y={560 - 120 * Math.sin(Math.PI * t)} s={0.22} r={-10 + 20 * t} /></g> : null })}
          <g opacity={on(f, month, 8)}><Label x={960} y={330} text="EVERY MONTH" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {([[equifax, 1000, 'EQUIFAX', '#C94A3E'], [experian, 1320, 'EXPERIAN', '#4F78AA'], [transunion, 1640, 'TRANSUNION', '#3FA36B']] as [number, number, string, string][]).map(([at, x, name, col], k) => <g key={k} opacity={on(f, Math.min(at, bureaus14 + k * 4), 8)} transform={`translate(0 ${30 * (1 - pop(f, Math.min(at, bureaus14 + k * 4), 14))})`}><Bureau x={lerp(x, [1260, 1490, 1720][k], on(f, decide - 6, 14))} y={GROUND} s={lerp(0.85, 0.68, on(f, decide - 6, 14))} name={name} col={col} glow={win(f, at, at + 20, 6)} /></g>)}
        <g opacity={on(f, america, 8) * (1 - on(f, decide, 8))}><Label x={1320} y={500} text="THE 3 BIG BUREAUS" size={50} font="Bebas Neue" color={P.ink} /></g>
        {/* the record they keep */}
        <g opacity={on(f, decide - 6, 10)}>
          <Report x={480} y={620} s={1.05} marks={[1, 1, 1, 1, 0, 1]} glow={on(f, record, 10) * (1 - on(f, owe, 10))} />
          {([[owe, 'WHAT YOU OWE'], [limits, 'YOUR LIMITS'], [paid, 'PAID ON TIME?']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(${-20 * (1 - on(f, at, 10))} 0)`}><rect x={660} y={470 + k * 100} width={14} height={14} rx={7} fill={INK} /><Label x={690} y={490 + k * 100} text={t} size={52} font="Bebas Neue" color={P.ink} anchor="start" /></g>)}
          <g opacity={on(f, decide, 8)}><Label x={1490} y={620} text="THEY DON'T DECIDE" size={46} font="Bebas Neue" color={RED} /></g>
        </g>
      </g>}

      {/* # B2) step 3 and 4: the formula, the number, the lender */}
      {B2 > 0 && <g opacity={B2}>
        <Machine x={900} y={GROUND} s={0.95} f={f} run={on(f, formula, 10)} screen={f >= number ? 'SCORE' : ''} name={f >= known ? 'FICO' : 'FORMULA'} />
        <g opacity={1 - into}><Report x={lerp(300, 620, into)} y={lerp(640, 760, into)} s={lerp(0.8, 0.3, into)} marks={[1, 1, 1, 1, 0, 1]} /></g>
        <g opacity={on(f, p90, 8) * (1 - on(f, four20, 8))} transform={`translate(900 360) scale(${pop(f, p90, 12)})`}><rect x={-230} y={-50} width={460} height={90} rx={16} fill={P.gold} /><text y={16} textAnchor="middle" fill={INK} style={TXT(50)}>90% OF TOP LENDERS*</text></g>
        <g opacity={on(f, lenders18, 8) * (1 - on(f, four20, 8))}><Label x={900} y={445} text="*ACCORDING TO FICO" size={30} font="Inter" color={P.ink2} /></g>
        {/* three bureaus, three slightly different readings */}
        <g opacity={win(f, different - 6, four20, 8)}>
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${1480 + (k % 2) * 260 - (k === 2 ? 130 : 0)} ${k === 2 ? 760 : 500})`}><Meter x={0} y={0} s={0.32} v={[720, 712, 726][k]} /><text y={50} textAnchor="middle" fill={INK} style={TXT(30)}>{['EQUIFAX', 'EXPERIAN', 'TRANSUNION'][k]}</text></g>)}
          <g opacity={on(f, differ, 8)}><Label x={1610} y={330} text="CAN DIFFER A LITTLE" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, lender20 - 6, 10)}>
          <Person f={f} who="owner" beats={[[lender20, 'hold', 'thinking'], [lend, 'think', 'thinking'], [price, 'point', 'neutral']]} x={1620} y={GROUND} s={0.95} flip />
          <g opacity={on(f, number, 8)}><Card x={lerp(1150, 1450, on(f, number, 20))} y={580} s={0.4} col="#1D2A44" /></g>
          <g opacity={on(f, things, 8)}><Label x={1620} y={330} text="TWO QUESTIONS" size={54} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, lend, 8)}><Tick x={1420} y={440} s={0.9} /><Label x={1420} y={530} text="LEND?" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, price, 8)}><circle cx={1820} cy={440} r={50} fill={P.gold} /><text x={1820} y={460} textAnchor="middle" fill={INK} style={TXT(60)}>%</text><Label x={1820} y={530} text="PRICE?" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # C) not wealth: track record */}
      {Cw > 0 && <g opacity={Cw}>
        <g opacity={1 - on(f, question - 6, 10)}>
          <Vault x={560} y={GROUND} s={1.1} t="$$$" /><NoCross x={560} y={GROUND - 150} s={1.3} o={on(f, rich + 8, 8)} />
          <g opacity={on(f, handled, 8)}><Report x={1360} y={640} s={1.05} marks={[1, 1, 1, 1, 1, 1]} glow={on(f, borrowed, 12)} /></g>
          <g opacity={on(f, borrowed, 8)}><Label x={1360} y={360} text="HOW YOU HANDLE DEBT" size={56} font="Bebas Neue" color={GREEN} /></g>
        </g>
        <g opacity={on(f, question - 6, 10)}>
          <Machine x={960} y={GROUND} s={1.05} f={f} run={1} screen="?" />
          <g opacity={on(f, looking, 8)}><Glass x={lerp(1500, 1220, on(f, looking, 20))} y={520} s={0.9} /></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s9:are")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s10:most")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s10:lender")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s11:to")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s11:to#2")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s11:800")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s12:here's")} x={400} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s13:borrow")} x={400} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s14:those")} x={400} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s15:big")} x={1320} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s16:the")} x={480} y={620} rx={200} ry={230} />
        <Spot f={f} at={c("s17:company")} x={900} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s17:score")} x={900} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s19:because")} x={900} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s19:a#2")} x={900} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s20:turns")} x={1620} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s21:and")} x={1620} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s22:score")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s22:it's")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s23:which")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s23:exactly")} x={960} y={640} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="cs-where" />
    </g>
  )
}

export const CS_WHERE = makePiece('cs-where', 'Where the score comes from: a big 300–850 meter between a borrower and a lender, a coin is lent and comes back — ON TIME? — the needle climbs as the lender gives a thumbs-up, FICO bands light (670–739 good, 740–799 very good, 800+ exceptional); step 1 a borrower with a card, car, graduation cap and house; step 2 reports fly every month to three bureau archives — Equifax, Experian, TransUnion — which keep the record (what you owe, your limits, paid on time) but do not decide; step 3 the record slides into the FICO formula machine with gears (90% of top lenders, according to FICO) and three small meters read a little differently; step 4 the machine prints a score and the lender asks two questions — lend? price?; a vault of money is crossed out, a clean credit report glows: how you handle debt.', {
  mood: 'light', Component: Where,
  beats: ["s8:first", "s8:really", "s9:prediction", "s9:guesses", "s9:borrow", "s9:time", "s10:300", "s10:850", "s10:higher", "s10:safer", "s11:fico", "s11:good", "s11:very", "s11:exceptional", "s12:made", "s12:four", "s13:one", "s13:card", "s13:car", "s13:student", "s13:mortgage", "s14:two", "s14:report", "s14:bureaus", "s14:month", "s15:america", "s15:equifax", "s15:experian", "s15:transunion", "s16:decide", "s16:record", "s16:owe", "s16:limits", "s16:paid", "s17:three", "s17:formula", "s17:known", "s18:90", "s18:lenders", "s19:different", "s19:differ", "s20:four", "s20:number", "s20:lender", "s20:things", "s21:lend", "s21:price", "s22:rich", "s22:handled", "s22:borrowed", "s23:question", "s23:looking", "s9:are", "s10:most", "s10:lender", "s11:to", "s11:to#2", "s11:800", "s12:here's", "s13:borrow", "s14:those", "s15:big", "s16:the", "s17:company", "s17:score", "s19:because", "s19:a#2", "s20:turns", "s21:and", "s22:score", "s22:it's", "s23:which", "s23:exactly"],
  sfx: [['s10:850', 'swish', 0.12], ['s15:equifax', 'pop', 0.1], ['s15:experian', 'pop', 0.1], ['s15:transunion', 'pop', 0.1], ['s17:formula', 'click', 0.12], ['s21:lend', 'ding', 0.12]] })
