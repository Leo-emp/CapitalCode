// ---------------------------------------------------------------- s20–s30: step one — the slice that is never taxed.
// A dusk kitchen with a lamp, a shelf and a big window onto the city.
// A) A glass jug of glowing water, INCOME, on the counter tips a slice off the top into a jar on the shelf: TAX-FREE,
//    then STANDARD DEDUCTION, $16,100; a second jar, $32,200, for a married couple. What is left in the jug is TAXABLE
//    INCOME and runs down a copper pipe out of the window, to the tanks. Bigger deductions: a little house (mortgage
//    interest) and a wrapped gift (charity) appear on the shelf, then leave — we use the standard one.
// B) Maya (made up, real 2026 rules) behind the counter holds her $60,000 pay slip. STEP 1: her pay becomes one glass tube
//    of water on the counter, $60,000; its first $16,100 lifts off into the jar (sealed, 0% TAX) and $43,900 stays.
//    STEP 2: the $43,900 runs into the pipe, out to the buckets.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { KitchenWorld, Jar, Paycheck, Pipe, Sign, Vig, TXT, INK, BRASS, BRASS2, CORAL, MINT, WATER, GLASS, PAPER, Life } from './kit'

const SHELF = 430, COUNTER = 800

const Deduct: React.FC<PieceProps> = ({ f, c }) => {
  const buckets20 = c('s20:buckets')
  const slice = c('s21:slice'), top = c('s21:top'), free = c('s21:free'), standard = c('s21:standard')
  const d16100 = c('s22:16100'), married = c('s22:married'), d32200 = c('s22:32200')
  const left = c('s23:left'), taxable = c('s23:taxable'), poured = c('s23:poured'), buckets23 = c('s23:buckets')
  const bigger = c('s24:bigger'), mortgage = c('s24:mortgage'), charity = c('s24:charity'), lots = c('s24:lots'), standard24 = c('s24:standard')
  const meet = c('s25:meet'), maya25 = c('s25:maya'), made = c('s25:made'), rules = c('s25:rules')
  const single = c('s26:single'), d60k = c('s26:60000'), job = c('s26:job')
  const step1 = c('s27:step'), takes = c('s27:takes'), d16100b = c('s27:16100')
  const d60k28 = c('s28:60000'), minus = c('s28:minus'), leaves = c('s28:leaves'), d43900 = c('s28:43900')
  const never = c('s29:never'), outside = c('s29:outside')
  const step2 = c('s30:step'), pour = c('s30:pour'), d43900b = c('s30:43900')

  const A = 1 - on(f, meet - 4, 12), B = on(f, meet - 4, 12)
  const tip = win(f, slice, free + 10, 10)
  const maya: Beat[] = [[meet, 'waveA', 'smiling', 'waveB', 10], [made, 'explain', 'smiling'], [single, 'idle', 'smiling'], [d60k, 'holdUp', 'smiling'], [step1, 'pointDown', 'thinking'], [minus, 'measure', 'thinking'], [d43900, 'present', 'smiling'], [never, 'thumbsUp', 'smiling'], [step2, 'pointDown', 'smiling'], [pour, 'present', 'smiling']]
  const hp = hand(f, maya, 1620, 1000, 1, true)
  const holding = f >= d60k && f < step1
  // # the tube on the counter: x 300..1220; first 27% (16,100 / 60,000) is the slice
  const TX = 300, TW = 920, cut = TX + TW * (16100 / 60000)
  const lift = on(f, minus, 26)
  const gone = on(f, pour, 30)

  return (
    <g>
      <KitchenWorld f={f} id="tx-deduct" />
      {/* # the shelf jar (stays through the scene); refills in B */}
      <Jar x={360} y={SHELF} s={0.85} f={f} level={A > 0.5 ? on(f, slice, 30) * 0.7 : on(f, minus + 18, 18) * 0.7} label={A > 0.5 ? (f >= d16100 ? '$16,100' : f >= free ? 'TAX-FREE' : '') : (f >= minus + 18 ? '$16,100' : '')} />
      <g opacity={A > 0.5 ? on(f, standard, 8) : on(f, d16100b, 8)}><Sign x={360} y={SHELF + 100} t="STANDARD DEDUCTION" size={34} /></g>
      {/* sealed: 0% TAX badge */}
      <g opacity={B * on(f, never, 8)} transform={`translate(470 ${SHELF - 200}) scale(${pop(f, never, 12)})`}><circle r={54} fill={MINT} stroke="#FFFFFF" strokeWidth={6} /><text y={-2} textAnchor="middle" fill="#FFFFFF" style={TXT(36)}>0%</text><text y={30} textAnchor="middle" fill="#FFFFFF" style={TXT(26)}>TAX</text></g>
      {/* the copper pipe out of the window, to the tanks */}
      <g opacity={A > 0.5 ? win(f, poured - 6, bigger - 4, 10) : on(f, outside, 10)}>
        <Pipe pts={[[1060, COUNTER - 30], [1120, COUNTER - 30], [1120, 600], [1240, 600]]} w={26} />
        <g opacity={A > 0.5 ? on(f, buckets23, 8) * (1 - on(f, bigger, 8)) : on(f, outside, 8)}><Sign x={1300} y={500} t="TO THE BUCKETS →" size={40} /></g>
      </g>

      {/* # A) the jug */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={1 - on(f, bigger - 4, 10)} transform={`translate(760 ${COUNTER}) rotate(${-28 * tip} -140 -380)`}>
          <path d="M-150 0 Q-190 -260 -100 -390 L100 -390 Q190 -260 150 0 Z" fill={GLASS} opacity={0.25} />
          <path d={`M-142 -20 Q-172 -230 -${110 - 20 * on(f, slice, 30)} ${-330 + 60 * on(f, slice, 30)} L${110 - 20 * on(f, slice, 30)} ${-330 + 60 * on(f, slice, 30) + 4 * Math.sin(f / 7)} Q172 -230 142 -20 Z`} fill={on(f, taxable, 10) > 0.5 ? '#3FB8E0' : WATER} opacity={0.85} />
          <path d="M-150 0 Q-190 -260 -100 -390 L100 -390 Q190 -260 150 0 Z" fill="none" stroke={GLASS} strokeWidth={6} />
          <path d="M-100 -390 L-150 -420 L-100 -360" fill={GLASS} opacity={0.5} />
          <g opacity={(1 - on(f, taxable, 8)) * on(f, buckets20, 8)}><Sign x={0} y={-130} t="INCOME" size={50} /></g>
          <g opacity={on(f, taxable, 8)}><Sign x={0} y={-130} t="TAXABLE INCOME" size={44} /></g>
        </g>
        {/* the slice pouring across to the jar */}
        <g opacity={win(f, slice + 4, free + 6, 6)}><path d={`M560 420 Q470 300 ${400} ${SHELF - 150}`} fill="none" stroke={WATER} strokeWidth={22} strokeLinecap="round" opacity={0.85} /></g>
        <g opacity={win(f, top, free, 6)}><Sign x={760} y={330} t="OFF THE TOP" size={42} /></g>
        {/* married couple: a second, bigger jar */}
        <g opacity={win(f, married, left, 10)}><Jar x={620} y={SHELF} s={0.85} f={f} level={0.9 * on(f, d32200, 24)} label={f >= d32200 ? '$32,200' : 'COUPLE'} /></g>
        {/* bigger deductions instead */}
        <g opacity={win(f, mortgage, standard24, 10)} transform={`translate(620 ${SHELF}) scale(${pop(f, mortgage, 12)})`}>
          <path d="M-70 0 L-70 -90 L0 -150 L70 -90 L70 0 Z" fill="#E9C25A" stroke="#9C7330" strokeWidth={4} /><rect x={-20} y={-56} width={40} height={56} fill="#8E5B3A" />
        </g>
        <g opacity={win(f, charity, standard24, 10)} transform={`translate(860 ${COUNTER}) scale(${pop(f, charity, 12)})`}>
          <rect x={-70} y={-110} width={140} height={110} rx={8} fill={CORAL} /><rect x={-12} y={-110} width={24} height={110} fill="#FFFFFF" /><path d="M0 -110 q-50 -50 -60 -10 q30 10 60 10 q30 0 60 -10 q-10 -40 -60 10" fill="#FFFFFF" />
        </g>
        <g opacity={win(f, bigger, lots, 8)}><Sign x={760} y={600} t="BIGGER DEDUCTIONS" size={44} col={PAPER} /></g>
      </g>}

      {/* # B) Maya and her pay as one tube of water */}
      {B > 0.001 && <g opacity={B}>
        <Person f={f} who="investorF" beats={maya} x={1620} y={1000} s={1} flip />
        <g opacity={on(f, made, 8) * (1 - on(f, single, 8))}><Sign x={1000} y={330} t="MAYA · MADE-UP EXAMPLE" size={40} /></g>
        <g opacity={on(f, rules, 8) * (1 - on(f, single, 8))}><Sign x={1000} y={420} t="REAL 2026 RULES" size={36} /></g>
        {holding && <g transform={`translate(${hp.x - 60} ${hp.y - 60}) scale(${pop(f, d60k, 12)})`}><Paycheck x={0} y={0} s={0.8} amount="$60,000" /></g>}
        <g opacity={on(f, job, 8) * (1 - on(f, step1, 8))}><Sign x={1000} y={330} t="SINGLE · $60,000 A YEAR" size={40} /></g>
        {/* step plates */}
        <g opacity={win(f, step1, step2, 8)}><Sign x={760} y={330} t="STEP 1" size={60} /></g>
        <g opacity={on(f, step2, 8)}><Sign x={760} y={330} t="STEP 2" size={60} /></g>
        {/* the tube */}
        <g opacity={on(f, takes, 10)}>
          <rect x={TX - 20} y={COUNTER - 16} width={TW + 40} height={16} rx={6} fill={BRASS} stroke={BRASS2} strokeWidth={3} />
          {/* the taxable part (stays, then runs into the pipe) */}
          <rect x={cut + (TX + TW - cut) * gone} y={COUNTER - 140} width={Math.max(0, (TX + TW - cut) * (1 - gone))} height={110} rx={20} fill="#3FB8E0" opacity={0.9} />
          {/* the slice, lifting off to the jar */}
          <g opacity={1 - on(f, minus + 16, 6)} transform={`translate(${lerp(0, 360 - (TX + cut) / 2, lift)} ${lerp(0, SHELF - 120 - (COUNTER - 85), lift)}) scale(${lerp(1, 0.4, lift)})`}>
            <rect x={TX} y={COUNTER - 140} width={cut - TX - 6} height={110} rx={20} fill={WATER} opacity={0.95} />
          </g>
          <rect x={TX} y={COUNTER - 150} width={TW} height={130} rx={26} fill="none" stroke={GLASS} strokeWidth={6} />
          <g opacity={on(f, d60k28, 8) * (1 - on(f, minus, 8))}><Label2 x={TX + TW / 2} y={COUNTER - 66} t="$60,000" /></g>
          <g opacity={win(f, minus, leaves + 30, 8)}><Label2 x={(TX + cut) / 2} y={COUNTER - 200} t="−$16,100" col={CORAL} /></g>
          <g opacity={on(f, d43900, 8) * (1 - gone)}><Label2 x={(cut + TX + TW) / 2} y={COUNTER - 66} t="$43,900" /></g>
          <g opacity={on(f, leaves, 8) * (1 - on(f, never, 8))}><Sign x={(cut + TX + TW) / 2} y={COUNTER - 180} t="TAXABLE INCOME" size={36} /></g>
          
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s21:the")} x={760} y={560} kind="ripple" />
        <Life f={f} at={c("s22:2026")} x={760} y={560} kind="ripple" />
        <Life f={f} at={c("s22:person")} x={760} y={560} kind="ripple" />
        <Life f={f} at={c("s22:together")} x={760} y={560} kind="ripple" />
        <Life f={f} at={c("s23:only")} x={760} y={560} kind="ripple" />
        <Life f={f} at={c("s24:that")} x={620} y={380} kind="glint" />
        <Life f={f} at={c("s25:the")} x={1560} y={440} kind="glint" />
        <Life f={f} at={c("s29:16100")} x={760} y={700} kind="ripple" />
        <Life f={f} at={c("s28:income")} x={760} y={700} kind="ripple" />
        <Life f={f} at={c("s30:now")} x={760} y={700} kind="ripple" />
        <Life f={f} at={c("s30:dollars")} x={760} y={700} kind="ripple" />
      </g>
      <g><Life f={f} at={c("s30:buckets")} x={1180} y={600} kind="glint" /></g>
      {/* # life:end */}
      <Vig id="tx-deduct" k={0.25} />
      <Headline f={f} lines={[[buckets20, 'STEP ONE: THE TAX-FREE SLICE', INK, 84], [left, 'WHAT IS LEFT GETS TAXED', INK, 84], [bigger, 'OR: BIGGER DEDUCTIONS', INK, 84], [meet, 'MEET MAYA', INK, 92]]} />
    </g>
  )
}

const Label2: React.FC<{ x: number; y: number; t: string; col?: string }> = ({ x, y, t, col = INK }) => <text x={x} y={y + 22} textAnchor="middle" fill={col === INK ? '#FFFFFF' : col} style={TXT(64)}>{t}</text>

export const TX_DEDUCT = makePiece('tx-deduct', 'Step one in a dusk kitchen: a glass jug of glowing water INCOME tips a slice off the top into a jar on the shelf — TAX-FREE, STANDARD DEDUCTION, $16,100 — and a second jar of $32,200 for a married couple; what is left is TAXABLE INCOME and runs down a copper pipe out of the window to the buckets; a little house (mortgage interest) and a wrapped gift (charity) stand for bigger deductions, then leave; Maya (made-up example, real 2026 rules) behind the counter holds her $60,000 pay slip; STEP 1 turns her pay into one glass tube of water, $60,000, whose first $16,100 lifts off into the sealed 0% TAX jar, leaving $43,900; STEP 2 runs the $43,900 into the pipe.', {
  mood: 'light', Component: Deduct,
  beats: ["s20:buckets", "s21:slice", "s21:top", "s21:free", "s21:standard", "s22:16100", "s22:married", "s22:32200", "s23:left", "s23:taxable", "s23:poured", "s23:buckets", "s24:bigger", "s24:mortgage", "s24:charity", "s24:lots", "s24:standard", "s25:meet", "s25:made", "s25:rules", "s26:single", "s26:60000", "s26:job", "s27:step", "s27:takes", "s27:16100", "s28:60000", "s28:minus", "s28:leaves", "s28:43900", "s29:never", "s29:outside", "s30:step", "s30:pour", "s21:the", "s22:2026", "s22:person", "s22:together", "s23:only", "s24:that", "s25:the", "s29:16100", "s28:income", "s30:now", "s30:dollars", "s30:buckets"],
  sfx: [['s21:slice', 'swish', 0.1], ['s28:minus', 'swish', 0.1], ['s29:never', 'pop', 0.1]] })
