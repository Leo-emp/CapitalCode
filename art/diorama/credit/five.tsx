// ---------------------------------------------------------------- s24–s40: the five ingredients, each with a worked picture.
// A) A donut of FICO's five published weights grows slice by slice; 35% payment history lights.
// B) The payment timeline: due date → a few days late = a fee → 30 days late = reported (a LATE mark lands on the report) →
//    seven calendar pages: it can stay seven years.
// C) 30% amounts owed: a card with a $1,000 limit; balance $900 fills its bar to 90% (red) and the borrower looks stretched;
//    balance $100 = 10% (green) and he relaxes.
// D) 15% length (an old card with years on it), 10% new credit (application forms; checks count 12 months), 10% mix (card + loan).
// E) The closing-a-card trap: two $1,000 cards, $500 owed = 25%; scissors cut one card, the limit halves, the same $500 = 50%: 2×.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, Coin, House, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Calendar } from '../charts'
import { Backdrop } from '../econ/kit'
import { Card, Donut, Form, PARTS, Report, Scissors, Stopwatch, GREEN, RED, GOLD, TXT, INK } from './kit'

const GROUND = 930

const Five: React.FC<PieceProps> = ({ f, c }) => {
  const splits = c('s24:splits'), five = c('s24:five'), parts = c('s24:parts'), publishes = c('s24:publishes'), weighs = c('s24:weighs')
  const biggest = c('s25:biggest'), time25 = c('s25:time')
  const days = c('s26:days'), fee = c('s26:fee'), p30 = c('s26:30'), reported = c('s26:reported')
  const lands = c('s27:lands'), negative = c('s27:negative'), seven = c('s27:seven')
  const second = c('s28:second'), owed = c('s28:owed'), utilization = c('s28:utilization')
  const simply29 = c('s29:simply'), limit29 = c('s29:limit'), using29 = c('s29:using'), same32 = c('s32:same'), person32 = c('s32:person'), far32 = c('s32:far')
  const madeup = c('s30:madeup'), d1000 = c('s30:1000')
  const b900 = c('s31:900'), p90 = c('s31:90'), stretched = c('s31:stretched')
  const b100 = c('s32:100'), less = c('s32:less')
  const third = c('s33:third'), length = c('s33:length'), longer = c('s33:longer')
  const fourth = c('s34:fourth'), apply = c('s34:apply'), pulls = c('s34:pulls')
  const lots = c('s35:lots'), risky = c('s35:risky'), m12 = c('s35:12')
  const last = c('s36:last'), mix = c('s36:mix'), loan = c('s36:loan'), need = c('s36:need')
  const trap = c('s37:trap'), closing = c('s37:closing')
  const two = c('s38:two'), d1000b = c('s38:1000'), d500 = c('s38:500'), p25 = c('s38:25')
  const close = c('s39:close'), drops = c('s39:drops'), p50 = c('s39:50')
  const wrong = c('s40:wrong'), twice = c('s40:twice')

  const A = win(f, 0, days - 4) + win(f, second - 4, madeup - 4) + win(f, third - 4, trap - 4)
  const B = win(f, days - 4, second - 4), Cw = win(f, madeup - 4, third - 4), E = on(f, trap - 4, 10)
  // # the donut: slices grow on the five words, then one slice is lit for each part
  const grow = [five, parts, publishes, publishes + 8, weighs].map((a) => on(f, a, 14))
  const lit = f >= last ? 4 : f >= fourth ? 3 : f >= third ? 2 : f >= second ? 1 : f >= biggest ? 0 : -1
  const labels = PARTS.map((_, k) => (k === lit ? 1 : 0))
  // # C: the card's balance
  const bal = f >= b100 ? lerp(900, 100, on(f, b100, 20)) : f >= b900 ? lerp(0, 900, on(f, b900, 24)) : 0
  const guy: Beat[] = [[madeup, 'idle', 'neutral'], [b900, 'nervous', 'worried'], [stretched, 'despair', 'worried'], [b100, 'relief', 'smiling'], [person32, 'nodA', 'smiling', 'nodB', 10], [far32, 'relax', 'smiling']]
  // # E: utilization before / after closing one card
  const cut = on(f, close, 16), gone = on(f, close + 16, 16)
  const pct = f >= p50 ? 50 : f >= p25 ? 25 : 0
  return (
    <g>
      <Stage id="cs-five" frame={f} />
      <Backdrop f={f} o={E} town={false} />
      <Headline f={f} lines={[[splits, "FICO'S FIVE PARTS", P.ink, 100], [days, 'PAYMENT HISTORY: 35%', P.ink, 96], [madeup, 'MADE-UP EXAMPLE: UTILIZATION', P.ink, 86], [third, "FICO'S FIVE PARTS", P.ink, 100], [trap, 'THE CLOSED-CARD TRAP', P.ink, 100]]} />
      <Ground y={GROUND} />

      {/* # A) the donut, with the lit part named beside it */}
      {A > 0 && <g opacity={Math.min(1, A)}>
        <Donut x={640} y={560} s={1.05} grow={grow} lit={lit} labels={labels} />
        {lit >= 0 && <g key={lit} opacity={on(f, [biggest, second, third, fourth, last][lit], 8)}>
          <text x={1060} y={430} fill={PARTS[lit][2]} style={TXT(110)}>{`${PARTS[lit][0]}%`}</text>
          <text x={1060} y={510} fill={INK} style={TXT(60)}>{PARTS[lit][1]}</text>
          {/* a small picture for each part */}
          <g transform="translate(1620 800)">
            {lit === 0 && <g opacity={on(f, time25, 8)}><Calendar x={-60} y={-60} text="DUE" s={1} /><g transform="translate(110 -60)"><circle r={50} fill={GREEN} /><path d="M-24 2 l16 18 l34 -38" fill="none" stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" /></g></g>}
            {lit === 1 && <g opacity={on(f, utilization, 8)}><Card x={0} y={-60} s={0.8 * (1 + 0.08 * win(f, limit29, using29, 5))} used={0.15 + 0.35 * on(f, using29, 20)} bar /><g opacity={on(f, limit29, 8)}><text x={0} y={-200} textAnchor="middle" fill={INK} style={TXT(44)}>YOUR LIMIT</text></g></g>}
            {lit === 2 && <g opacity={on(f, length, 8)}><Card x={-40} y={-80} s={0.6} col="#8E7A5A" label="OLD" /><g opacity={on(f, longer, 8)}><Stopwatch x={170} y={40} s={0.7} f={f} /></g></g>}
            {lit === 3 && <g>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, [apply, lots, lots + 6][k], 8)}><Form x={-120 + k * 110} y={-60 + (k % 2) * 20} s={0.85} r={-8 + k * 8} /></g>)}<g opacity={on(f, m12, 8)}><Calendar x={250} y={-140} text="12 MO" s={0.9} /></g></g>}
            {lit === 4 && <g><g opacity={on(f, mix, 8)}><Card x={-120} y={-60} s={0.55} /></g><g opacity={on(f, loan, 8)} transform="translate(130 20) scale(0.38)"><House x={0} y={0} /></g></g>}
          </g>
        </g>}
        <g opacity={win(f, risky, last, 6)}><Label x={1060} y={600} text="MANY APPLICATIONS = RISKY" size={44} font="Bebas Neue" color={RED} anchor="start" /></g>
        <g opacity={win(f, need, trap, 6)}><Label x={1060} y={600} text="NO NEED FOR ONE OF EACH" size={44} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
        <g opacity={win(f, pulls, lots, 6)}><Label x={1060} y={600} text="EACH APPLICATION = A CHECK" size={44} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
        <g opacity={win(f, longer, fourth, 6)}><Label x={1060} y={600} text="LONGER USUALLY HELPS" size={44} font="Bebas Neue" color={GREEN} anchor="start" /></g>
        <g opacity={win(f, simply29, madeup, 6)}><Label x={1060} y={600} text="SHARE OF YOUR LIMIT IN USE" size={40} font="Bebas Neue" color={P.ink} anchor="start" /></g>
        <g opacity={win(f, owed, simply29, 6)}><Label x={1060} y={600} text={f >= utilization ? 'KEY IDEA: UTILIZATION' : 'HOW MUCH YOU OWE'} size={44} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
      </g>}

      {/* # B) late: a fee, then a report mark, for seven years */}
      {B > 0 && <g opacity={B}>
        <line x1={260} y1={700} x2={1660} y2={700} stroke={INK} strokeWidth={8} strokeLinecap="round" />
        {([[days - 6, 300, 'DUE DATE', INK], [fee, 760, 'A FEW DAYS LATE', GOLD], [p30, 1300, '30 DAYS LATE', RED]] as [number, number, string, string][]).map(([at, x, t, col], k) => <g key={k} opacity={on(f, at, 8)}><circle cx={x} cy={700} r={20} fill={col} /><Label x={x} y={790} text={t} size={46} font="Bebas Neue" color={col} /></g>)}
        <g opacity={on(f, days - 6, 8)}><Calendar x={300} y={560} text="DUE" s={1} /></g>
        <g opacity={on(f, fee, 8)} transform={`translate(760 ${560 - 20 * pop(f, fee, 12)})`}><Coin x={0} y={0} s={1.7} text="FEE" /></g>
        <g opacity={on(f, reported, 8)}>
          <Report x={1600} y={480} s={0.75} marks={[1, 1, 1, on(f, lands, 10) > 0.5 ? 0 : 1, 1, 1]} glow={win(f, lands, negative, 6)} />
          <g transform={`translate(${lerp(1300, 1540, on(f, reported, 20))} ${lerp(640, 560, on(f, reported, 20))}) rotate(-10)`} opacity={1 - on(f, lands, 8)}><rect x={-70} y={-30} width={140} height={60} rx={8} fill="none" stroke={RED} strokeWidth={6} /><text y={16} textAnchor="middle" fill={RED} style={TXT(44)}>LATE</text></g>
        </g>
        <g opacity={on(f, seven, 8)}>
          {Array.from({ length: 7 }, (_, k) => <g key={k} opacity={on(f, seven + k * 3, 6)} transform={`translate(${420 + k * 150} 930)`}><rect x={-55} y={-80} width={110} height={70} rx={8} fill="#FFFFFF" stroke="#D6C7A6" strokeWidth={3} /><rect x={-55} y={-80} width={110} height={18} rx={6} fill={RED} /><text y={-22} textAnchor="middle" fill={INK} style={TXT(34)}>{`YEAR ${k + 1}`}</text></g>)}
        </g>
      </g>}

      {/* # C) utilization on one card */}
      {Cw > 0 && <g opacity={Cw}>
        <Person f={f} who="buyer" beats={guy} x={360} y={GROUND} s={1.05} />
        <g opacity={on(f, d1000, 8)} transform={`translate(0 ${20 * (1 - pop(f, d1000, 12))})`}>
          <Card x={1160} y={480} s={1.4 * (1 + 0.05 * win(f, same32, person32, 5))} used={bal / 1000} bar label="LIMIT $1,000" />
        </g>
        <g opacity={on(f, b900, 8)}><Label x={1160} y={800} text={`BALANCE $${Math.round(bal / 10) * 10}`} size={64} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, p90, 8)} transform={`translate(1160 900) scale(${f >= b100 ? 1 : pop(f, p90, 12)})`}><text textAnchor="middle" fill={bal > 500 ? RED : GREEN} style={TXT(90)}>{`${Math.round(bal / 10)}% USED`}</text></g>
        <g opacity={win(f, stretched, b100, 6)}><Label x={360} y={300} text="STRETCHED?" size={60} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, less, 8)}><Label x={360} y={300} text="FAR LESS STRETCHED" size={54} font="Bebas Neue" color={GREEN} /></g>
      </g>}

      {/* # E) closing a card */}
      {E > 0 && <g opacity={E}>
        <Card x={600} y={460} s={1.1} used={pct === 50 ? 0.5 : 0.25} bar label="LIMIT $1,000" />
        <g opacity={on(f, d1000b, 8) * (1 - gone)} transform={`translate(0 ${200 * gone})`}><Card x={1320} y={460} s={1.1} used={0.25} bar label="LIMIT $1,000" cut={cut} /></g>
        <g opacity={win(f, closing, drops + 10, 6)}><Scissors x={lerp(1700, 1460, on(f, close - 10, 14))} y={460} s={1} open={Math.abs(Math.sin((f - close) / 3)) * win(f, close - 10, close + 16, 4)} /></g>
        <g opacity={on(f, two, 8)}><Label x={960} y={760} text={f >= drops ? 'TOTAL LIMIT $1,000' : 'TOTAL LIMIT $2,000'} size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, d500, 8)}><Label x={960} y={830} text="BALANCE $500" size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, p25, 8)} transform={`translate(960 330) scale(${pop(f, pct === 50 ? p50 : p25, 12)})`}><text textAnchor="middle" fill={pct === 50 ? RED : GREEN} style={TXT(110)}>{`${pct}% USED`}</text></g>
        <g opacity={on(f, twice, 8)} transform={`translate(1500 330) scale(${pop(f, twice, 14)})`}><circle r={80} fill={RED} /><text y={30} textAnchor="middle" fill="#FFFFFF" style={TXT(90)}>2×</text></g>
        <g opacity={on(f, wrong, 8)}><Label x={420} y={330} text="NOTHING WRONG" size={54} font="Bebas Neue" color={P.ink2} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s25:percent")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s25:did")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s26:bureaus")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s28:30")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s28:here")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s29:utilization")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s30:your")} x={1160} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s31:the")} x={1160} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s31:formula")} x={1160} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s32:if")} x={1160} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s32:you're")} x={1160} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s33:15")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s33:in")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s33:helps")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s34:new")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s35:in")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s35:those")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s36:both")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s36:says")} x={640} y={560} rx={230} ry={230} />
        <Spot f={f} at={c("s37:now")} x={960} y={500} rx={230} ry={200} />
        <Spot f={f} at={c("s37:card")} x={960} y={500} rx={230} ry={200} />
        <Spot f={f} at={c("s38:you#2")} x={960} y={500} rx={230} ry={200} />
        <Spot f={f} at={c("s39:and")} x={960} y={500} rx={230} ry={200} />
        <Spot f={f} at={c("s39:same")} x={960} y={500} rx={230} ry={200} />
        <Spot f={f} at={c("s40:paper")} x={960} y={500} rx={230} ry={200} />
        <Spot f={f} at={c("s40:stretched")} x={960} y={500} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="cs-five" />
    </g>
  )
}

export const CS_FIVE = makePiece('cs-five', 'The five ingredients: a donut of FICO\'s published weights grows slice by slice and each part lights in turn (35% payment history with a due-date calendar and tick, 30% amounts owed with a card, 15% length with an old card and a stopwatch, 10% new credit with application forms and a 12-month calendar, 10% credit mix with a card and a house loan); a payment timeline — due date, a few days late = a fee coin, 30 days late = a LATE stamp flies onto the credit report — then seven calendar pages, YEAR 1 to YEAR 7; a $1,000-limit card fills to 90% at a $900 balance while the borrower looks stretched, then drops to 10% at $100 and he relaxes; two $1,000 cards with a $500 balance = 25%, scissors cut one, the total limit drops to $1,000 and the same $500 = 50% — 2×.', {
  mood: 'light', Component: Five,
  beats: ["s24:splits", "s24:five", "s24:parts", "s24:publishes", "s24:weighs", "s25:biggest", "s25:time", "s26:days", "s26:fee", "s26:30", "s26:reported", "s27:lands", "s27:negative", "s27:seven", "s28:second", "s28:owed", "s28:utilization", "s29:simply", "s29:limit", "s29:using", "s32:same", "s32:person", "s32:far", "s30:madeup", "s30:1000", "s31:900", "s31:90", "s31:stretched", "s32:100", "s32:less", "s33:third", "s33:length", "s33:longer", "s34:fourth", "s34:apply", "s34:pulls", "s35:lots", "s35:risky", "s35:12", "s36:last", "s36:mix", "s36:loan", "s36:need", "s37:trap", "s37:closing", "s38:two", "s38:1000", "s38:500", "s38:25", "s39:close", "s39:drops", "s39:50", "s40:wrong", "s40:twice", "s25:percent", "s25:did", "s26:bureaus", "s28:30", "s28:here", "s29:utilization", "s30:your", "s31:the", "s31:formula", "s32:if", "s32:you're", "s33:15", "s33:in", "s33:helps", "s34:new", "s35:in", "s35:those", "s36:both", "s36:says", "s37:now", "s37:card", "s38:you#2", "s39:and", "s39:same", "s40:paper", "s40:stretched"],
  sfx: [['s26:fee', 'coin', 0.12], ['s27:lands', 'thud', 0.12], ['s31:900', 'riser', 0.1], ['s39:close', 'crack', 0.12], ['s40:twice', 'impact', 0.12]] })
