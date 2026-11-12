// ---------------------------------------------------------------- s49–s64: how much can Leo spend? (cream).
// A) The $40,000 paycheck; a 1994 desk with a long scroll of market years under a magnifier (looking back at history);
//    a 30-YEARS calendar; the big "4%" plaque; three step badges.
// B) The machine, step by step: step 1 it pays Leo $40,000 (4% of the million); step 2 a basket of the same things,
//    prices +3%, the next paycheck says $41,200; step 3 the rest stays in the hopper, which rises and falls.
// C) Our test: a ribbon of start years 1928 → 1996, each running 30 years; 69 little Leos; with 60/40, 65 glow (lasted)
//    and 4 go grey — red rings on the 1965–1969 starts, an inflation arrow and a storm cloud.
// D) All in cash: only 14 glow; a chart: the cash pile's line sinks under a withdrawal line that keeps rising.
// E) The 1998 Trinity University study (~95% with half stocks, half bonds); a road into fog (no promise), taxes not
//    included; thirty paychecks in a row (about $40,000 a year for 30 years); a treasure chest crossed (not a fortune);
//    the machine again, a drip starts (one more choice).
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground, Scroll, Magnifier } from '../power/kit2'
import { CalPage, NoMark, StepBadge } from '../bank/kit'
import { Basket } from '../money4/kit'
import { bump, College, Drip, FogRoad, LeoGrid, Machine, Paycheck, Weather, gridPos } from './kit'
import { OK_6040, OK_CASH } from './data'

const GROUND = 930
const FAIL = [37, 38, 40, 41]

const Spend: React.FC<PieceProps> = ({ f, c }) => {
  const number49 = c('s49:number'), comes49 = c('s49:comes')
  const y1994 = c('s50:1994'), planner = c('s50:planner'), looked = c('s50:looked'), history50 = c('s50:history'), retiree = c('s50:retiree'), thirty50 = c('s50:thirty'), running50 = c('s50:running')
  const answer51 = c('s51:answer'), famous = c('s51:famous'), p4 = c('s51:4'), rule = c('s51:rule'), step51 = c('s51:step')
  const step1 = c('s52:step'), first52 = c('s52:first'), takes52 = c('s52:takes'), p4b = c('s52:4'), million52 = c('s52:million'), d40 = c('s52:40000')
  const step2 = c('s53:step'), after53 = c('s53:after'), same53 = c('s53:same'), plus53 = c('s53:plus'), inflation53 = c('s53:inflation'), buys53 = c('s53:buys'), things53 = c('s53:things'), prices53 = c('s53:prices'), p3 = c('s53:3'), d41 = c('s53:41200')
  const step3 = c('s54:step'), stays54 = c('s54:stays'), invested54 = c('s54:invested'), growing54 = c('s54:growing'), shrinking54 = c('s54:shrinking'), markets54 = c('s54:markets')
  const ran55 = c('s55:ran'), test55 = c('s55:test'), yearly55 = c('s55:yearly'), y1928 = c('s55:1928'), y1996 = c('s55:1996'), running55 = c('s55:running'), thirty55 = c('s55:thirty')
  const n69 = c('s56:69'), leos56 = c('s56:leos'), different56 = c('s56:different'), starting56 = c('s56:starting'), million57 = c('s57:million')
  const sixty57 = c('s57:sixtyforty'), lasted57 = c('s57:lasted'), thirty57 = c('s57:thirty'), n65 = c('s57:65'), tests57 = c('s57:tests')
  const four58 = c('s58:four'), ran58 = c('s58:ran'), y1965 = c('s58:1965'), y1969 = c('s58:1969'), years58 = c('s58:years'), inflation58 = c('s58:inflation'), withdrawals58 = c('s58:withdrawals'), struggled = c('s58:struggled')
  const safest = c('s59:safest'), cash59 = c('s59:cash'), only59 = c('s59:only'), n14 = c('s59:14')
  const crashes = c('s60:crashes'), slowly = c('s60:slowly'), withdrawal60 = c('s60:withdrawal'), rises60 = c('s60:rises'), every60 = c('s60:every')
  const result61 = c('s61:result'), y1998 = c('s61:1998'), trinity = c('s61:trinity'), found61 = c('s61:found'), lasted61 = c('s61:lasted'), p95 = c('s61:95'), halfStocks = c('s61:halfstocks')
  const history62 = c('s62:history'), promise = c('s62:promise'), future = c('s62:future'), taxes = c('s62:taxes'), best = c('s62:best')
  const d40b = c('s63:40000'), roughly = c('s63:roughly'), thirty63 = c('s63:thirty'), fortune = c('s63:fortune'), nothing63 = c('s63:nothing')
  const more64 = c('s64:more'), quietly = c('s64:quietly'), lasts64 = c('s64:lasts')

  const AB = step1 - 8, BC = ran55 - 8, CD = safest - 8, DE = result61 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = win(f, BC, CD), D = win(f, CD, DE), E = on(f, DE, 10)

  // # B) the machine pays: paycheck 1 slides out on "40000", paycheck 2 on "41200"
  const bBeats: Beat[] = [[AB, 'idle', 'smiling'], [takes52, 'reachUp', 'smiling'], [d40, 'receive', 'smiling'], [step2, 'idle', 'thinking'], [inflation53, 'explain', 'thinking'], [d41, 'receive', 'smiling'], [step3, 'present', 'smiling'], [c('s54:whatever'), 'pointDown', 'smiling'], [growing54, 'thumbsUp', 'smiling'], [shrinking54, 'nervous', 'worried'], [markets54, 'shrug', 'neutral']]
  const pay1 = on(f, d40, 16) * (1 - on(f, step2, 10)), pay2 = on(f, d41, 16)
  const hop = 0.75 + 0.18 * on(f, growing54, 14) - 0.3 * on(f, shrinking54, 14) + 0.12 * on(f, markets54, 14)
  // # C) glow of each start year
  const glowC = (k: number) => (f < sixty57 ? 0.8 : OK_6040.includes(k) ? 1 : 1 - on(f, n65, 14))
  const glowD = (k: number) => (OK_CASH.includes(k) ? 1 : 1 - on(f, only59, 16))
  // # E) thirty paychecks
  const eBeats: Beat[] = [[DE, 'idle', 'smiling'], [history62, 'think', 'thinking'], [best, 'nodA', 'smiling', 'nodB', 14], [thirty63, 'present', 'smiling'], [fortune, 'crossNoA', 'neutral', 'crossNoB', 12], [nothing63, 'thumbsUp', 'smiling']]

  return (
    <g>
      <Stage id="m-spend" frame={f} />
      <Ground y={GROUND} />

      {/* # A) the 4 percent rule's origin */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, y1994, 10)}><Paycheck x={960} y={560} s={1.5 + 0.06 * pop(f, number49, 14)} amt="$40,000" sub="WHERE DOES IT COME FROM?" /></g>
        <g opacity={on(f, y1994, 10) * (1 - on(f, famous, 10))}>
          {/* a desk with a long scroll of years */}
          <g transform={`translate(860 ${GROUND})`}><rect x={-360} y={-250} width={720} height={36} rx={10} fill="#A9744E" /><rect x={-330} y={-214} width={36} height={214} fill="#8E5B3A" /><rect x={294} y={-214} width={36} height={214} fill="#8E5B3A" /></g>
          <g opacity={on(f, history50, 8)}><Scroll x={860} y={GROUND - 420} s={1.4} open={span(f, history50, history50 + 20)} /></g>
          <g opacity={on(f, looked, 8)}><Magnifier x={760 + 120 * Math.sin((f - looked) / 30)} y={GROUND - 440} s={1.2} /></g>
          <g transform={`translate(1560 ${380 - 10 * pop(f, y1994, 12)})`}><CalPage x={0} y={0} s={0.95} m={f >= thirty50 ? 'PAID FOR' : 'A STUDY,'} d={f >= thirty50 ? '30 YRS' : '1994'} col="#2E5C9A" /></g>
          <g opacity={on(f, retiree, 8)}><Person f={f} who="owner" beats={[[retiree, 'think', 'thinking'], [running50, 'emptyPockets', 'worried']]} x={300} y={GROUND} s={1.0} />
            <Label x={300} y={GROUND + 66} text="A RETIREE" size={48} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, famous, 10)}>
          <g transform={`translate(960 ${520}) scale(${pop(f, p4, 16)})`}><circle r={210} fill={P.gold} stroke={P.goldD} strokeWidth={12} /><text y={60} textAnchor="middle" fill="#16294A" style={{ font: '400 200px "Bebas Neue"' }}>4%</text></g>
          <g opacity={on(f, rule, 8)}><Label x={960} y={GROUND - 100} text="THE 4 PERCENT RULE" size={72} font="Bebas Neue" color={P.ink} /></g>
          {[0, 1, 2].map((k) => <StepBadge key={k} x={760 + k * 200} y={GROUND - 20} n={k + 1} t="" o={on(f, step51 + k * 5, 8)} />)}
        </g>
      </g>}

      {/* # B) step by step on the machine */}
      {B > 0 && <g opacity={B}>
        <Machine x={1020} y={GROUND} s={1.0} f={f} fill={hop} lit={0} plate="LEO'S $1M" />
        {[[step1, 'TAKE 4%'], [step2, '+ INFLATION'], [step3, 'REST STAYS IN']].map(([at, t], k) => <StepBadge key={k} x={1660} y={330 + k * 210} n={k + 1} t={t as string} o={on(f, at as number, 8)} lit={win(f, at as number, (at as number) + 40, 6)} />)}
        <g opacity={pay1}><Paycheck x={lerp(1290, 560, pay1)} y={lerp(860, 420, pay1)} s={0.85} amt="$40,000" sub="YEAR 1" /></g>
        <g opacity={win(f, c('s52:first'), p4b, 6)}><Label x={1020} y={GROUND - 660} text="YEAR 1" size={64} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, p4b, 8) * (1 - on(f, d40, 8))}><Label x={1020} y={GROUND - 640} text="4% OF $1,000,000" size={64} font="Bebas Neue" color={P.ink} /></g>
        {/* step 2: the same basket, prices +3% */}
        <g opacity={on(f, buys53, 8) * (1 - on(f, d41, 10))} transform={`translate(560 470) scale(${1 + 0.06 * bump(f, [c('s53:things')])})`}><Basket x={0} y={0} s={0.85} shown={10} />
          <g opacity={on(f, p3, 8)} transform={`translate(150 -230) rotate(-8) scale(${pop(f, p3, 12)})`}><path d="M-20 -40 L140 -40 L140 40 L-20 40 L-56 0 Z" fill="#F4C95D" stroke="#B88A2E" strokeWidth={4} /><text x={60} y={18} textAnchor="middle" fill="#16294A" style={{ font: '400 54px "Bebas Neue"' }}>+3%</text></g></g>
        <g opacity={win(f, same53, d41, 6)}><Paycheck x={1290} y={860 - 120 * on(f, same53, 12)} s={0.7} amt="$40,000" sub="SAME AMOUNT…" /></g>
        <g opacity={on(f, after53, 8) * (1 - on(f, step3, 8))}><Label x={1020} y={GROUND - 660} text="YEAR 2" size={64} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={pay2}><Paycheck x={lerp(1290, 560, pay2)} y={lerp(860, 420, pay2)} s={0.85} amt="$41,200" sub="YEAR 2" /></g>
        <g opacity={on(f, stays54, 8)}><path d={`M760 ${GROUND - 500} q60 -40 120 0`} fill="none" stroke={P.ink2} strokeWidth={0} />
          <Label x={1020} y={GROUND - 660} text={f >= shrinking54 ? 'THE REST: DOWN…' : f >= growing54 ? 'THE REST: UP…' : 'THE REST STAYS INVESTED'} size={60} font="Bebas Neue" color={f >= shrinking54 && f < markets54 ? P.coralInk : P.ink} /></g>
        <Person f={f} who="investor" beats={bBeats} x={330} y={GROUND} s={1.05} />
      </g>}

      {/* # C) 69 start years with 60/40 */}
      {Cc > 0 && <g opacity={Cc}>
        <g opacity={1 - on(f, n69, 10)}>
          {/* a ribbon of start years, each bar runs 30 years */}
          <g opacity={on(f, c('s55:starting'), 8)} transform="translate(960 560)">
            <rect x={-700} y={-10} width={1400} height={20} rx={10} fill="#CDB58C" />
            {Array.from({ length: 69 }, (_, k) => <rect key={k} x={-700 + k * 20} y={-60} width={6} height={50} rx={3} fill="#2E5C9A" opacity={span(f, y1928, y1996) * 69 > k ? 1 : 0.15} />)}
            <Label x={-700} y={70} text="1928" size={56} font="Bebas Neue" color={P.ink} /><g opacity={on(f, y1996, 8)}><Label x={680} y={70} text="1996" size={56} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, thirty55, 8)}>{[0, 23, 46, 68].map((k) => <g key={k}><rect x={-700 + k * 20} y={-130 - (k % 2) * 34} width={30 * 20 * span(f, thirty55, thirty55 + 24)} height={22} rx={11} fill={P.gold} opacity={0.85} /></g>)}<Label x={0} y={-200} text="EACH ONE RUNS 30 YEARS" size={54} font="Bebas Neue" color={P.goldInk} /></g>
          </g>
          <g opacity={on(f, test55, 8)} transform="translate(960 800)"><Label x={0} y={0} text={f >= yearly55 ? 'REAL YEARLY RETURNS, 1928–2025' : 'OUR OWN TEST'} size={56} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, n69, 10)}>
          <LeoGrid x={960} y={500} jump={bump(f, [c('s57:those')], 20)} glow={glowC} shown={69 * span(f, n69, leos56 + 10)} f={f} mark={FAIL} markO={on(f, four58, 10)} />
          <g opacity={on(f, n69, 8) * (1 - on(f, sixty57, 8))}><Label x={960} y={880} text="69 STARTING YEARS" size={64} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, sixty57, 8)}><Label x={960} y={880} text={f >= n65 ? '60/40: 65 OF 69 LASTED 30 YEARS' : f >= lasted57 ? '60/40: LASTED 30 YEARS?' : '60/40 MIX'} size={64} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, starting56, 8) * (1 - on(f, four58, 8))}><Label x={gridPos(0)[0] + 960} y={500 + gridPos(0)[1] - 110} text="1928" size={44} font="Bebas Neue" color={P.ink2} /><Label x={gridPos(68)[0] + 960} y={500 + gridPos(68)[1] + 70} text="1996" size={44} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={win(f, thirty57, n65, 6)} transform="translate(1700 330)"><circle r={60} fill={P.card} stroke={P.gold} strokeWidth={6} /><text y={20} textAnchor="middle" fill={P.goldInk} style={{ font: '400 56px "Bebas Neue"' }}>30Y</text></g>
          <g opacity={win(f, million57, n65, 6)}><ellipse cx={960} cy={620} rx={820} ry={240} fill={P.gold} opacity={0.08} /></g>
          <g opacity={on(f, y1965, 8)}><Label x={960} y={385} text={f >= y1969 ? '1965–1969' : '1965…'} size={52} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, inflation58, 8)} transform={`translate(1700 ${360 - 20 * bump(f, [c('s58:withdrawals')], 18)})`}><path d="M0 60 L0 -40 M-30 -10 L0 -44 L30 -10" stroke={P.coral} strokeWidth={14} fill="none" strokeLinecap="round" /><Label x={0} y={110} text="INFLATION" size={46} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, years58, 8)}><Weather x={240} y={290} kind="storm" s={0.8 + 0.1 * pop(f, struggled, 12)} f={f} /></g>
        </g>
      </g>}

      {/* # D) all cash: 14 of 69; the sinking line */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, crashes, 10)}>
          <LeoGrid x={960} y={500} glow={glowD} f={f} jump={bump(f, [c('s59:lasted'), c('s59:tests')], 18)} />
          <g opacity={on(f, cash59, 8)}><Label x={960} y={880} text={f >= n14 ? 'ALL CASH: ONLY 14 OF 69' : 'ALL IN CASH'} size={64} font="Bebas Neue" color={f >= n14 ? P.coralInk : P.ink} /></g>
        </g>
        <g opacity={on(f, crashes, 10)} transform="translate(400 800)">
          <line x1={0} y1={0} x2={1180} y2={0} stroke={P.ink2} strokeWidth={4} /><line x1={0} y1={0} x2={0} y2={-520} stroke={P.ink2} strokeWidth={4} />
          {/* cash pile: never crashes, but shrinks slowly as withdrawals rise */}
          <path d={Array.from({ length: 31 }, (_, k) => `${k ? 'L' : 'M'}${k * 38} ${-380 + Math.pow(k / 30, 1.6) * 380 * Math.min(1, span(f, slowly, every60 + 20) * 1.4)}`).join(' ')} stroke="#2FAE6B" strokeWidth={10} fill="none" />
          <Label x={40} y={-410} text="CASH PILE: NO CRASHES" size={50} font="Bebas Neue" color={P.mintInk} anchor="start" />
          <g opacity={on(f, withdrawal60, 8)}><path d={Array.from({ length: 31 }, (_, k) => `${k ? 'L' : 'M'}${k * 38} ${-60 - (Math.pow(1.03, k) - 1) * 150 * span(f, rises60, every60 + 20)}`).join(' ')} stroke={P.coral} strokeWidth={10} fill="none" strokeDasharray="20 12" />
            <Label x={1180} y={-40} text="WITHDRAWAL, RISING WITH PRICES" size={48} font="Bebas Neue" color={P.coralInk} anchor="end" /></g>
        </g>
      </g>}

      {/* # E) Trinity, fog, thirty paychecks, the drip */}
      {E > 0 && <g opacity={E}>
        <g opacity={1 - on(f, history62, 10)}>
          <g opacity={on(f, trinity, 10)}><College x={760} y={GROUND} s={1.1} /></g>
          <g opacity={on(f, found61, 8) * (1 - on(f, p95, 8))}><Label x={1460} y={720} text={f >= lasted61 ? '4% LASTED 30 YEARS IN…' : 'IT FOUND…'} size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, y1998, 8)} transform={`translate(1460 ${430 - 10 * pop(f, y1998, 12)})`}><CalPage x={0} y={0} s={1.0} m="STUDY" d="1998" col="#8E5B3A" /></g>
          <g opacity={on(f, p95, 8)} transform={`translate(1460 ${720}) scale(${pop(f, p95, 14)})`}><circle r={120} fill={P.gold} /><text y={30} textAnchor="middle" fill="#16294A" style={{ font: '400 96px "Bebas Neue"' }}>≈95%</text></g>
          <g opacity={on(f, halfStocks, 8)}><Label x={1460} y={GROUND + 62} text="LASTED, HALF STOCKS / HALF BONDS" size={48} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, history62, 10) * (1 - on(f, d40b, 10))}>
          <FogRoad x={1150} y={GROUND} f={f} />
          <g opacity={on(f, promise, 8)}><Label x={1150} y={GROUND - 440} text={f >= future ? 'THE FUTURE: NO PROMISE' : 'NO PROMISE'} size={58} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, taxes, 8)} transform="translate(1640 700)"><rect x={-110} y={-140} width={220} height={280} rx={14} fill="#FFFDF8" stroke="#CDB58C" strokeWidth={4} /><text y={-70} textAnchor="middle" fill="#16294A" style={{ font: '400 60px "Bebas Neue"' }}>TAX</text>
            {[0, 1, 2].map((k) => <rect key={k} x={-70} y={-30 + k * 36} width={140} height={14} rx={7} fill="#E3D3AE" />)}<Label x={0} y={200} text="NOT INCLUDED" size={46} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, d40b, 10) * (1 - on(f, more64, 10))}>
          {Array.from({ length: 30 }, (_, k) => <g key={k} opacity={on(f, c('s63:pay') + k * 0.8, 6)}><Paycheck x={720 + (k % 10) * 100} y={430 + Math.floor(k / 10) * 150} s={0.26} amt="" sub="" /></g>)}
          <g opacity={on(f, thirty63, 8)}><Label x={1170} y={GROUND - 120} text="≈ $40,000 A YEAR × 30 YEARS" size={62} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={win(f, fortune, nothing63 + 18, 6)} transform="translate(1720 420)"><rect x={-90} y={-60} width={180} height={110} rx={12} fill="#A9744E" /><path d="M-90 -60 Q0 -130 90 -60 Z" fill="#8E5B3A" /><circle cy={-10} r={16} fill={P.gold} /><NoMark x={0} y={-20} o={on(f, fortune, 8)} r={100} /></g>
        </g>
        <g opacity={on(f, more64, 10)}>
          <Machine x={1000} y={GROUND} s={1.0} f={f} fill={0.75} leak={on(f, quietly, 12)} plate="LEO'S $1M" />
          {f > quietly && <Drip x={1000 - 290 - 76} y={GROUND - 120} t={(f - quietly) / 26} d={150} />}
          <g opacity={on(f, lasts64, 8)}><Label x={1000} y={GROUND + 64} text="A SMALL LEAK…" size={56} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <Person f={f} who="investor" beats={eBeats} x={230} y={GROUND} s={1.0} o={on(f, history62, 10)} />
      </g>}

      <Headline f={f} lines={[[number49, 'WHERE $40,000 COMES FROM', P.ink, 100], [famous, 'THE 4 PERCENT RULE', P.ink, 104], [step1, 'STEP BY STEP', P.ink, 104], [ran55, 'WE TESTED IT OURSELVES', P.ink, 100], [safest, 'THE "SAFE" CHOICE: ALL CASH', P.ink, 96], [result61, 'A 1998 STUDY AGREES', P.ink, 100], [history62, 'HISTORY, NOT A PROMISE', P.ink, 100], [d40b, 'NOT A FORTUNE, NOT NOTHING', P.ink, 96], [more64, 'ONE MORE CHOICE', P.ink, 104]]} />
      <Vignette id="m-spend" />
    </g>
  )
}

export const M_SPEND = makePiece('m-spend', 'How much can Leo spend: the $40,000 paycheck; a 1994 desk with a scroll of market years under a magnifier, a retiree with empty pockets, paid for 30 years; the big 4% plaque; on the machine, step 1 it pays $40,000 (4% of $1M), step 2 a basket of the same things +3% and the next paycheck $41,200, step 3 the rest stays in the hopper rising and falling; our test: a ribbon of start years 1928-1996 each running 30 years; 69 little Leos, 65 glow with 60/40, the four 1965-69 starts ringed red with inflation and a storm; all cash only 14 glow; the cash line sinks under a rising withdrawal line; Trinity University 1998 study ~95% half stocks half bonds; a road into fog (no promise, tax not included); thirty $40K paychecks; a treasure chest crossed; the machine with a small leak', {
  mood: 'light', Component: Spend,
  beats: ["s49:number", "s50:1994", "s50:planner", "s50:looked", "s50:history", "s50:retiree", "s50:thirty", "s50:running", "s51:famous", "s51:4", "s51:rule", "s51:step", "s52:step", "s52:takes", "s52:4", "s52:40000", "s53:step", "s53:after", "s53:same", "s53:inflation", "s53:buys", "s53:3", "s53:41200", "s54:step", "s54:stays", "s54:growing", "s54:shrinking", "s54:markets", "s55:ran", "s55:test", "s55:yearly", "s55:1928", "s55:1996", "s55:thirty", "s56:69", "s56:leos", "s56:starting", "s57:million", "s57:sixtyforty", "s57:lasted", "s57:thirty", "s57:65", "s58:four", "s58:1965", "s58:1969", "s58:years", "s58:inflation", "s58:struggled", "s59:safest", "s59:cash", "s59:only", "s59:14", "s60:crashes", "s60:slowly", "s60:withdrawal", "s60:rises", "s60:every", "s61:result", "s61:1998", "s61:trinity", "s61:found", "s61:lasted", "s61:95", "s61:halfstocks", "s62:history", "s62:promise", "s62:future", "s62:taxes", "s62:best", "s63:40000", "s63:roughly", "s63:thirty", "s63:fortune", "s63:nothing", "s64:more", "s64:quietly", "s64:lasts", "s54:whatever", "s52:first", "s53:things", "s55:starting", "s57:those", "s58:withdrawals", "s59:lasted", "s59:tests", "s63:pay"],
  sfx: [['s51:4', 'pop', 0.15], ['s52:40000', 'cash', 0.12], ['s53:41200', 'cash', 0.12], ['s57:65', 'chime', 0.12], ['s59:14', 'thud', 0.15], ['s61:95', 'pop', 0.12], ['s64:quietly', 'tick', 0.12]] })
