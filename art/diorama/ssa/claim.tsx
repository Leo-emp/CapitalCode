// ---------------------------------------------------------------- s46–s57: step four, when to claim.
// A) three mail vans at three loading doors: 62 · 67 · 70 (FULL RETIREMENT AGE 67 for born 1960+). Each van's check
//    envelope is drawn to scale: 62 = −30% → ≈$1,515; 67 = ≈$2,164; 70 = +8% a year → ≈$2,683 (+24%).
// B) the race: two lines of stacked envelopes climbing a wall chart by age — the age-62 line starts eight years earlier,
//    the age-70 line climbs faster and crosses it at about 80 (totals to scale, no interest). Health, savings, work.
// C) the earnings-test trap: a scale — above $25,560, $1 held back for every $2: earning $35,560 → $10,000 over →
//    $5,000 held back; a returning arrow: added back at full retirement age. Then a question stamp for 2034.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PostWorld, Vig, Stamp, Envelope, Van, Tube, Life, FLOOR, TXT, CREAM, INK, RED, NAVY, BRASS, BRASS2, GREEN, GOLD, DEEPT, PLUM, WOOD2 } from './kit'

const P67 = 2163.87, P62 = 0.7 * P67, P70 = 1.24 * P67

const Claim: React.FC<PieceProps> = ({ f, c }) => {
  const born = c('s46:born'), y1960 = c('s46:1960'), full = c('s46:full'), d67 = c('s46:67')
  const early = c('s47:early'), d62 = c('s47:62'), cut = c('s47:cut'), d30 = c('s47:30'), life = c('s47:life')
  const d2164 = c('s48:2164'), d1515 = c('s48:1515')
  const wait = c('s49:wait'), d67b = c('s49:67'), d8 = c('s49:8'), d70 = c('s49:70')
  const d2683 = c('s50:2683'), d24 = c('s50:24')
  const better = c('s51:better'), eight = c('s51:eight'), bigger = c('s51:bigger')
  const d80 = c('s52:80'), catch_ = c('s52:catch'), total = c('s52:total'), early52 = c('s52:early')
  const single = c('s53:single'), health = c('s53:health'), savings = c('s53:savings'), work = c('s53:work')
  const trap = c('s54:trap'), working = c('s54:working'), d1 = c('s54:1'), d2 = c('s54:2'), d25560 = c('s54:25560')
  const d35560 = c('s55:35560'), d5000 = c('s55:5000')
  const lost = c('s56:lost'), raised = c('s56:raised'), surprise = c('s56:surprise')
  const plan = c('s57:plan'), there = c('s57:there'), big = c('s57:big')

  const A = 1 - on(f, better - 10, 8), B = win(f, better - 2, trap - 2, 8), Cc = on(f, trap - 2, 8)
  const rosa: Beat[] = [[born, 'present', 'smiling'], [early, 'point', 'thinking'], [cut, 'shock', 'worried'], [wait, 'think', 'thinking'], [d2683, 'celebrate', 'smiling'], [better, 'scratchHead', 'thinking'], [health, 'explain', 'neutral'], [trap, 'stop', 'worried'], [lost, 'relief', 'smiling'], [plan, 'confident', 'smiling']]
  const vans = [[d62, '62', P62, RED], [d67, '67', P67, NAVY], [d70, '70', P70, GREEN]] as const
  // # cumulative totals by age (thousands of dollars), to scale on the wall chart
  const cx = (age: number) => 420 + (age - 62) * 46, cy = (tot: number) => 820 - tot / 1000 * 0.9
  const run = (start: number, mo: number, upto: number) => Array.from({ length: Math.max(0, Math.floor(upto - start) + 1) }, (_, i) => [start + i, mo * 12 * i] as [number, number])
  const grow = on(f, eight, 60)
  const age = lerp(62, 86, grow)

  return (
    <g>
      <PostWorld f={f} id="ss-claim" tone="warm" />
      {/* # A) three vans, three ages */}
      {A > 0.001 && <g opacity={A}>
        {vans.map(([at, t, pia, col], k) => { const x = 420 + k * 540, show = on(f, at, 10)
          return <g key={k} opacity={k === 1 ? on(f, d67, 8) : show}>
            <rect x={x - 220} y={340} width={440} height={300} rx={14} fill={DEEPT} /><rect x={x - 200} y={360} width={400} height={262} fill="#163A41" />
            <text x={x} y={450} textAnchor="middle" fill={CREAM} style={TXT(100)}>{t}</text>
            <Van x={x} y={FLOOR} s={0.9} col={col} t={`AGE ${t}`} />
            {/* the check envelope to scale */}
            <g opacity={on(f, [d1515, d2164, d2683][k], 8)} transform={`translate(${x} 570) scale(${0.6 + 0.6 * pia / P70})`}><Envelope x={0} y={0} s={1} t={`≈ $${Math.round(pia).toLocaleString('en-US')}`} /></g>
          </g> })}
        <g opacity={on(f, y1960, 8) * (1 - on(f, early - 4, 8))}><Stamp x={960} y={300} t="BORN 1960 OR LATER: FULL AGE 67" size={44} col={NAVY} tc={CREAM} /></g>
        <g opacity={on(f, d30, 8) * (1 - on(f, wait - 4, 8))}><Stamp x={960} y={300} t={f >= life ? 'AT 62: −30%, FOR LIFE' : 'AT 62: −30%'} size={48} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, d8, 8)}><Stamp x={960} y={300} t={f >= d24 ? 'AT 70: +8% A YEAR = +24%' : 'AFTER 67: +8% A YEAR'} size={48} col={GREEN} tc={CREAM} /></g>
        <Person f={f} who="investorF" beats={rosa} x={1800} y={FLOOR + 60} s={0.6} flip />
      </g>}
      {/* # B) the race to about 80 */}
      {B > 0.001 && <g opacity={B}>
        <rect x={380} y={270} width={1200} height={570} rx={12} fill={CREAM} stroke={BRASS2} strokeWidth={6} />
        {[62, 66, 70, 74, 78, 82, 86].map((a) => <g key={a}><line x1={cx(a)} y1={820} x2={cx(a)} y2={830} stroke={INK} strokeWidth={3} /><text x={cx(a)} y={862} textAnchor="middle" fill={INK} style={TXT(30)}>{a}</text></g>)}
        <text x={980} y={310} textAnchor="middle" fill={INK} style={TXT(34)}>TOTAL COLLECTED BY AGE</text>
        {/* line from 62 */}
        <path d={run(62, P62, age).map(([a, tot], i) => `${i ? 'L' : 'M'}${cx(a)} ${cy(tot)}`).join(' ')} stroke={RED} strokeWidth={10} fill="none" />
        {/* line from 70 */}
        {age > 70 && <path d={run(70, P70, age).map(([a, tot], i) => `${i ? 'L' : 'M'}${cx(a)} ${cy(tot)}`).join(' ')} stroke={GREEN} strokeWidth={10} fill="none" />}
        <g opacity={on(f, eight, 8)}><Stamp x={620} y={420} t="START AT 62" size={40} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, bigger, 8)}><Stamp x={1300} y={720} t="START AT 70" size={40} col={GREEN} tc={CREAM} /></g>
        <g opacity={on(f, d80, 8)}><line x1={cx(80.4)} y1={290} x2={cx(80.4)} y2={820} stroke={GOLD} strokeWidth={6} strokeDasharray="16 10" /><Stamp x={cx(80.4)} y={420} t="CATCH-UP ≈ AGE 80" size={40} col={GOLD} /></g>
        <g opacity={on(f, total, 8)}><text x={1540} y={800} textAnchor="end" fill={INK} style={TXT(28)}>NO INTEREST, SAME YEARLY RAISES</text></g>
        <g opacity={on(f, single, 8)}>{[[health, 'HEALTH'], [savings, 'SAVINGS'], [work, 'WORK']].map(([at, t], k) => <g key={k} opacity={on(f, at as number, 8)}><Stamp x={1760} y={420 + k * 120} t={t as string} size={40} col={CREAM} /></g>)}</g>
      </g>}
      {/* # C) the earnings-test trap */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Person f={f} who="investorF" beats={rosa} x={300} y={FLOOR + 60} s={0.74} />
        <g opacity={1 - on(f, plan - 10, 8)}>
          {/* the earnings bar with the limit */}
          <rect x={500} y={520} width={(35560 / 40000 * 1100) * on(f, d35560, 24) + 1} height={70} rx={10} fill={BRASS} />
          <rect x={500} y={520} width={Math.min(25560, 35560 * on(f, d35560, 24)) / 40000 * 1100} height={70} rx={10} fill={GREEN} />
          <g opacity={on(f, d25560, 8)}><line x1={500 + 25560 / 40000 * 1100} y1={470} x2={500 + 25560 / 40000 * 1100} y2={640} stroke={INK} strokeWidth={6} /><text x={500 + 25560 / 40000 * 1100 + 14} y={455} textAnchor="start" fill={INK} style={TXT(36)}>LIMIT $25,560</text></g>
          <g opacity={on(f, working, 8)}><text x={510} y={505} fill={INK} style={TXT(36)}>{f >= d35560 ? 'ROSA EARNS $35,560 (BEFORE 67)' : 'EARNINGS BEFORE 67'}</text></g>
          <g opacity={on(f, d1, 8) * (1 - on(f, d35560, 8))}><Stamp x={1100} y={760} t={f >= d2 ? '$1 HELD BACK PER $2 ABOVE' : '$1 HELD BACK…'} size={46} col={RED} tc={CREAM} /></g>
          <g opacity={on(f, d35560, 8)}><Stamp x={1250} y={760} t="$10,000 OVER ÷ 2" size={40} col={CREAM} /></g>
          <g opacity={on(f, d5000, 8)} transform={`translate(1640 ${lerp(560, 720, on(f, d5000, 20))})`}><Envelope x={0} y={0} s={1.2} t="$5,000 HELD" col="#F3D3CC" /></g>
          <g opacity={on(f, raised, 8)}><path d="M1640 640 Q1640 360 1100 360" stroke={GREEN} strokeWidth={10} fill="none" /><path d="M1120 340 L1090 360 L1120 380" stroke={GREEN} strokeWidth={10} fill="none" /><Stamp x={1100} y={300} t="ADDED BACK AT 67" size={44} col={GREEN} tc={CREAM} /></g>
          <g opacity={on(f, surprise, 8)}><Stamp x={1640} y={300} t="A COMMON SURPRISE" size={38} col={CREAM} /></g>
        </g>
        <g opacity={on(f, plan - 2, 8)}>
          <Envelope x={960} y={560} s={1.6} t="ROSA’S PLAN" />
          <g opacity={on(f, there, 8)}><text x={960} y={400} textAnchor="middle" fill={RED} style={TXT(120)}>?</text><Stamp x={1400} y={420} t="WILL THE MONEY BE THERE?" size={44} col={NAVY} tc={CREAM} /></g>
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={full} x={960} y={600} kind="glint" />
        <Life f={f} at={catch_} x={cx(80.4)} y={500} kind="glint" />
        <Life f={f} at={early52} x={620} y={600} kind="glint" />
        <Life f={f} at={big} x={960} y={500} kind="spark" />
        <Life f={f} at={c("s48:month")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s49:67")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s50:70")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s50:67")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s51:62")} x={980} y={600} kind="glint" />
        <Life f={f} at={c("s51:checks")} x={980} y={600} kind="glint" />
        <Life f={f} at={c("s52:not")} x={980} y={600} kind="glint" />
        <Life f={f} at={c("s54:there's")} x={1100} y={560} kind="glint" />
        <Life f={f} at={c("s54:67")} x={1100} y={560} kind="glint" />
        <Life f={f} at={c("s55:back")} x={1100} y={560} kind="glint" />
        <Life f={f} at={c("s56:age")} x={1100} y={560} kind="glint" />
        <Life f={f} at={c("s56:expect")} x={1100} y={560} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="ss-claim" />
      <Headline f={f} lines={[[born, 'WHEN TO CLAIM', INK, 92], [better, 'WHICH IS BETTER?', INK, 92], [trap, 'ONE MORE TRAP', INK, 92], [plan, 'BUT WILL IT BE THERE?', INK, 92]]} />
    </g>
  )
}

export const SS_CLAIM = makePiece('ss-claim', 'Step four: three teal loading doors numbered 62 · 67 · 70, each with a mail van (AGE 62 red, AGE 67 navy, AGE 70 green) and a check envelope drawn to scale — ≈ $1,515, ≈ $2,164, ≈ $2,683 (BORN 1960 OR LATER: FULL AGE 67 · AT 62: −30%, FOR LIFE · AT 70: +8% A YEAR = +24%); then a cream wall chart TOTAL COLLECTED BY AGE where a red line (START AT 62) climbs from 62 and a steeper green line (START AT 70) starts eight years later and crosses it at a gold dashed line CATCH-UP ≈ AGE 80 (NO INTEREST, SAME YEARLY RAISES), with HEALTH · SAVINGS · WORK stamps; then the earnings trap: a pay bar ROSA EARNS $35,560 (BEFORE 67) crossing a LIMIT $25,560 line ($1 HELD BACK PER $2 ABOVE · $10,000 OVER ÷ 2) and a pink envelope $5,000 HELD that a green arrow returns (ADDED BACK AT 67 · A COMMON SURPRISE); finally ROSA\'S PLAN envelope under a red question mark: WILL THE MONEY BE THERE?', {
  mood: 'light', Component: Claim,
  beats: ["s46:born", "s46:1960", "s46:full", "s46:67", "s47:early", "s47:62", "s47:cut", "s47:30", "s47:life", "s48:2164", "s48:1515", "s49:wait", "s49:8", "s49:70", "s50:2683", "s50:24", "s51:better", "s51:eight", "s51:bigger", "s52:80", "s52:catch", "s52:total", "s52:early", "s53:single", "s53:health", "s53:savings", "s53:work", "s54:trap", "s54:working", "s54:1", "s54:2", "s54:25560", "s55:35560", "s55:5000", "s56:lost", "s56:raised", "s56:surprise", "s57:plan", "s57:there", "s57:big", "s48:month", "s49:67", "s50:70", "s50:67", "s51:62", "s51:checks", "s52:not", "s54:there's", "s54:67", "s55:back", "s56:age", "s56:expect"],
  sfx: [['s47:30', 'thud', 0.08], ['s50:2683', 'chime', 0.08], ['s52:80', 'pop', 0.08], ['s55:5000', 'thud', 0.08]] })
