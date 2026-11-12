// ---------------------------------------------------------------- s1–s5: the personal hook (r81).
// A) A sunny office. Maya gets a raise: she holds up a green pay slip, +$10,000 A YEAR. A coworker slides in and leans
//    over: careful — a little brass staircase appears between them, HIGHER BRACKET, and Maya's slip shrinks to LESS?
//    She scratches her head (should I even take it?). The coworker leaves; good news: the shrinking-slip picture is crossed.
// B) The office melts into the night waterworks: a row of glass tanks, a $60,000 pay slip at the tap, a tall
//    $1,000,000 water tower, three brass step plates 1-2-3 and a sign REAL 2026 IRS NUMBERS.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { OfficeWorld, NightWorld, Terrace, Tank, Tap, Stream, Paycheck, Cross, Sign, Vig, STEP_X, STEP_Y, RATES, RATE_COL, TXT, INK, BRASS, BRASS2, CORAL, WARM, WATER, Life } from './kit'

const FLOOR = 880

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const raise = c('s1:raise'), work = c('s1:work'), imagine = c('s1:imagine'), d10k = c('s1:10000'), year = c('s1:year')
  const someone = c('s2:someone'), office = c('s2:office'), leans = c('s2:leans'), careful = c('s2:careful'), higher = c('s2:higher'), bracket = c('s2:bracket'), less = c('s2:less'), money = c('s2:money')
  const thinking = c('s3:thinking'), wait = c('s3:wait'), take = c('s3:take')
  const okay = c('s4:okay'), good = c('s4:good'), never = c('s4:never'), income = c('s4:income')
  const maths = c('s5:maths'), why = c('s5:why'), today = c('s5:today'), d60k = c('s5:60000'), million = c('s5:million'), three = c('s5:three'), simple = c('s5:simple'), steps = c('s5:steps'), real = c('s5:real'), y2026 = c('s5:2026')

  const A = 1 - on(f, maths - 4, 14), B = on(f, maths - 4, 14)
  const maya: Beat[] = [[0, 'idle', 'smiling'], [raise, 'holdUp', 'smiling'], [imagine, 'celebrate', 'smiling'], [d10k, 'holdUp', 'smiling'], [careful, 'holdUp', 'worried'], [less, 'shock', 'worried'], [thinking, 'scratchHead', 'thinking'], [take, 'offer', 'worried'], [good, 'relief', 'smiling'], [never, 'thumbsUp', 'smiling'], [income, 'holdUp', 'smiling']]
  const coworker: Beat[] = [[someone, 'idle', 'neutral'], [leans, 'explain', 'neutral'], [careful, 'stop', 'worried'], [higher, 'pointUp', 'worried'], [less, 'shrug', 'worried'], [okay, 'idle', 'neutral']]
  const holding = (f >= raise && f < imagine) || (f >= d10k && f < less) || (f >= take && f < good) || f >= income
  const hp = hand(f, maya, 560, FLOOR, 1, false)
  const shrink = 1 - 0.4 * on(f, less, 14) * (1 - on(f, good, 14))
  const coX = lerp(2200, 1480, on(f, someone, 22)) + lerp(0, 900, on(f, okay, 22))

  return (
    <g>
      {/* # A) the office */}
      {A > 0.001 && <g opacity={A}>
        <OfficeWorld f={f} id="tx-hook-o" />
        {/* desk with a monitor and a mug, behind nobody */}
        <g transform="translate(200 880)">
          <rect x={-200} y={-190} width={400} height={26} rx={8} fill="#C79B6D" /><rect x={-180} y={-164} width={20} height={164} fill="#9C734D" /><rect x={160} y={-164} width={20} height={164} fill="#9C734D" />
          <rect x={-120} y={-390} width={220} height={150} rx={12} fill="#2B3A55" /><rect x={-108} y={-378} width={196} height={126} rx={8} fill="#6FB3E0" /><rect x={-20} y={-240} width={40} height={50} fill="#2B3A55" />
          <rect x={130} y={-250} width={50} height={60} rx={8} fill={CORAL} /><path d="M180 -235 q22 0 22 18 q0 18 -22 18" fill="none" stroke={CORAL} strokeWidth={8} />
        </g>
        <Person f={f} who="investorF" beats={maya} x={560} y={FLOOR} s={1} />
        {holding && <g transform={`translate(${hp.x + 40} ${hp.y - 70}) scale(${shrink * pop(f, raise, 12)})`}>
          <Paycheck x={0} y={0} s={0.9} amount={f >= d10k ? (f >= less && f < good ? 'LESS?' : '+$10,000') : '+$'} title="RAISE" />
          <g opacity={on(f, year, 8) * (f >= less && f < good ? 0 : 1)}><rect x={-70} y={86} width={140} height={44} rx={10} fill="#5BB27E" /><text y={120} textAnchor="middle" fill="#FFFFFF" style={TXT(34)}>A YEAR</text></g>
        </g>}
        {/* the coworker who leans in */}
        <g opacity={on(f, someone, 10)}><Person f={f} who="investor" beats={coworker} x={coX} y={FLOOR} s={1} flip /></g>
        {/* the staircase worry: higher bracket -> less pay */}
        <g opacity={win(f, higher, never + 30, 10)}>
          <g transform={`translate(1030 600) scale(${0.85 * pop(f, higher, 14)})`}>
            {[0, 1, 2, 3].map((k) => <rect key={k} x={-150 + k * 70} y={60 - k * 50} width={70} height={k * 50 + 40} fill={k === 3 ? CORAL : BRASS} stroke={BRASS2} strokeWidth={3} />)}
            <path d="M-130 30 L120 -150" stroke={INK} strokeWidth={8} strokeLinecap="round" /><path d="M120 -150 l-40 4 l18 30 z" fill={INK} />
          </g>
          <g opacity={on(f, bracket, 8)}><Sign x={1030} y={740} t="HIGHER BRACKET" size={40} /></g>
          <g opacity={on(f, never, 8)}><Cross x={1030} y={600} s={1.15} /></g>
        </g>
      </g>}

      {/* # B) the waterworks preview */}
      {B > 0.001 && <g opacity={B}>
        <NightWorld f={f} id="tx-hook-n" />
        <Terrace n={7} />
        {RATES.map((r, k) => <g key={k} opacity={on(f, why + k * 3, 8)}><Tank x={STEP_X(k)} y={STEP_Y(k)} w={150} h={240} level={0.6 * on(f, d60k + 8, 30) * (k < 2 ? 1 : 0) + on(f, million, 40) * (k >= 2 ? 0.7 : 0.4)} rate={r} col={RATE_COL[k]} f={f} /></g>)}
        <g opacity={on(f, today, 8)}>
          <Tap x={240} y={330} open={on(f, d60k, 20)} />
          <Stream x={STEP_X(0) + 10} y0={372} y1={STEP_Y(0) - 60} f={f} o={on(f, d60k, 10)} />
        </g>
        <g opacity={win(f, d60k, million, 8)} transform={`translate(560 380) scale(${pop(f, d60k, 12)})`}><Paycheck x={0} y={0} s={0.9} amount="$60,000" /></g>
        <g opacity={win(f, million, three, 8)} transform={`translate(1200 330) scale(${pop(f, million, 12)})`}>
          <rect x={-170} y={-60} width={340} height={110} rx={16} fill={WARM} stroke={BRASS2} strokeWidth={4} /><text y={22} textAnchor="middle" fill={INK} style={TXT(76)}>$1,000,000</text>
        </g>
        {[three, simple, steps].map((a, k) => <g key={k} opacity={win(f, a, real + 20, 8)} transform={`translate(${760 + k * 200} 320) scale(${pop(f, a, 12)})`}>
          <circle r={70} fill={BRASS} stroke={BRASS2} strokeWidth={6} /><circle r={52} fill="none" stroke="#FFE39A" strokeWidth={3} />
          <text y={30} textAnchor="middle" fill={INK} style={TXT(86)}>{k + 1}</text>
        </g>)}
        <g opacity={on(f, y2026, 8)}><Sign x={960} y={500} t="REAL 2026 IRS NUMBERS" size={46} /></g>
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s4:on")} x={640} y={420} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="tx-hook" />
      </g>}
      <Headline f={f} lines={[[raise, 'A RAISE AT WORK', INK, 84], [higher, 'A HIGHER BRACKET = LESS PAY?', INK, 84], [okay, 'HERE IS THE GOOD NEWS', INK, 84], [maths, 'HOW TAX BRACKETS ACTUALLY WORK', '#FFFFFF', 88]]} />
    </g>
  )
}

export const TX_HOOK = makePiece('tx-hook', 'Hook: in a sunny office Maya holds up a green raise slip, +$10,000 A YEAR; a coworker slides in and leans over — careful — a little brass staircase HIGHER BRACKET appears and her slip shrinks to LESS?; she scratches her head and holds it out (should I even take it?); the coworker leaves, she relaxes, and the staircase worry is crossed out; then the office melts into a night waterworks: seven glass tanks on a rising brick terrace, a tap pouring a $60,000 pay slip, a $1,000,000 sign, three brass step plates 1-2-3 and a sign REAL 2026 IRS NUMBERS.', {
  mood: 'light', Component: Hook,
  beats: ["s1:raise", "s1:work", "s1:imagine", "s1:10000", "s1:year", "s2:someone", "s2:office", "s2:leans", "s2:careful", "s2:higher", "s2:bracket", "s2:less", "s2:money", "s3:thinking", "s3:wait", "s3:take", "s4:okay", "s4:good", "s4:never", "s4:income", "s5:maths", "s5:why", "s5:today", "s5:60000", "s5:million", "s5:three", "s5:simple", "s5:steps", "s5:real", "s5:2026", "s4:on"],
  sfx: [['s1:raise', 'pop', 0.1], ['s4:never', 'thud', 0.12], ['s5:million', 'swish', 0.1]] })
