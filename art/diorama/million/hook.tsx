// ---------------------------------------------------------------- s1–s7: the hook (cream).
// A) Leo's bedroom: he wakes, his phone shows $1,000,000; a dream bubble: a hammock between palms (never work again).
// B) The million (10 cash bricks) pours into a MONEY MACHINE, which drops a $40,000 paycheck; two columns:
//    $40,000 vs the typical household's $84,000 (a house on top), a dashed half-line shows "less than half".
// C) The pile with the hammock on top is crossed (not forever); the machine runs and pays; four choice sockets light;
//    a 30-year calendar; the machine sputters (breaks down halfway) then recovers; Leo walks in, labelled made-up;
//    calendar pages flip 1928 → 2025 (almost 100 years of data).
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CalPage, NoMark, Street } from '../bank/kit'
import { Room, Window } from '../money4/kit'
import { BigPhone, BrickPile, Dream, Machine, Nightstand, Paycheck } from './kit'

const GROUND = 930

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const imagine = c('s1:imagine'), wake = c('s1:wake'), one = c('s1:1'), invest = c('s1:invest')
  const picture = c('s2:picture'), never2 = c('s2:never'), work2 = c('s2:work')
  const history = c('s3:history'), million3 = c('s3:million'), invested3 = c('s3:invested'), pay3 = c('s3:pay'), d40 = c('s3:40000'), thirty3 = c('s3:thirty')
  const less4 = c('s4:less'), half4 = c('s4:half'), household = c('s4:household'), d84 = c('s4:84000')
  const pile5 = c('s5:pile'), forever = c('s5:forever'), machine5 = c('s5:machine'), pays5 = c('s5:pays'), salary = c('s5:salary'), right5 = c('s5:right')
  const four6 = c('s6:four'), choices6 = c('s6:choices'), decide6 = c('s6:decide'), whether6 = c('s6:whether'), thirty6 = c('s6:thirty'), breaks6 = c('s6:breaks'), halfway = c('s6:halfway')
  const follow = c('s7:follow'), leo7 = c('s7:leo'), test7 = c('s7:test'), h100 = c('s7:100'), data7 = c('s7:data')

  const AB = history - 6, BC = pile5 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)

  // # A) Leo in the bedroom
  const aBeats: Beat[] = [[0, 'idle', 'neutral'], [wake, 'relax', 'smiling'], [one, 'phone', 'shocked'], [invest, 'holdUp', 'smiling'], [picture, 'think', 'smiling'], [never2, 'celebrate', 'smiling']]
  const hp = hand(f, aBeats, 380, GROUND, 1.15)

  // # B) the pile pours into the machine
  const pour = span(f, invested3, invested3 + 30)
  const payOut = on(f, pay3, 14)

  // # C) the machine: sputters on "breaks", recovers on "halfway"+20
  const broke = win(f, breaks6, halfway + 26, 6)
  const leoX = lerp(-160, 330, span(f, follow, follow + 36))
  const walking = f >= follow && f < follow + 36
  const cBeats: Beat[] = [[follow, 'walkA', 'smiling', 'walkB', 10], [follow + 36, 'present', 'smiling'], [test7, 'point', 'thinking'], [data7, 'confident', 'smiling']]
  const year = Math.round(lerp(1928, 2025, span(f, h100, data7 + 10)))

  return (
    <g>
      <Stage id="m-hook" frame={f} />

      {/* # A) bedroom: wake, phone, dream */}
      {A > 0 && <g opacity={A}>
        <Room ground={GROUND} />
        <Window x={1560} y={380} s={1.05} />
        {/* the bed */}
        <g transform={`translate(1050 ${GROUND})`}><rect x={-300} y={-150} width={600} height={120} rx={20} fill="#7FA7D9" /><rect x={-300} y={-60} width={600} height={60} rx={10} fill="#A9744E" />
          <rect x={-320} y={-260} width={40} height={260} rx={10} fill="#8E5B3A" /><rect x={-270} y={-200} width={170} height={70} rx={30} fill="#FFFFFF" />
          <path d="M-90 -150 Q100 -190 300 -150 L300 -100 L-90 -100 Z" fill="#5C86C0" /></g>
        <Nightstand x={1480} y={GROUND} s={1.1} f={f} ring={win(f, wake, wake + 30, 4)} />
        <ellipse cx={1050} cy={GROUND + 60} rx={420} ry={40} fill="#C9A0A0" opacity={0.5} />
        <Person f={f} who="investor" beats={aBeats} x={380} y={GROUND} s={1.15} />
        {/* the phone balance, held up */}
        <g opacity={on(f, one, 8) * (1 - on(f, picture, 8))} transform={`translate(${hp.x + 230} ${hp.y - 20 - 12 * pop(f, one, 12)})`}><BigPhone x={0} y={0} s={0.78} amount="$1,000,000" sub="BALANCE" pulse={pop(f, one, 14)} /></g>
        <g opacity={on(f, picture, 12)}><Dream x={1120} y={430} s={1.0 + 0.05 * pop(f, picture, 14)} f={f} /></g>
      </g>}

      {/* # B) the pile pours into the machine; the paycheck; 40k vs 84k */}
      {B > 0 && <g opacity={B}>
        <Street f={f} ground={GROUND} o={0.55} trees={[110, 1830]} lamps={[]} />
        <Ground y={GROUND} />
        <g opacity={1 - on(f, less4, 10)}>
          <g opacity={on(f, million3, 8)}><BrickPile x={430} y={GROUND} n={10 * (1 - pour)} s={1.05} />
            {pour < 0.6 && <Label x={430} y={GROUND + 70} text="$1,000,000" size={56} font="Bebas Neue" color={P.ink} o={1 - pour / 0.6} />}</g>
          <Machine x={1180} y={GROUND} s={1.0} f={f} run={on(f, invested3, 20)} fill={pour} o={on(f, history, 10)} />
          <g opacity={payOut}><Paycheck x={lerp(1490, 1640, payOut)} y={lerp(860, 560, payOut)} s={0.95} r={-6 + 6 * payOut} amt={f >= d40 ? '$40,000' : ''} sub="A YEAR" /></g>
          <g opacity={on(f, thirty3, 10)} transform={`translate(1720 ${330 - 10 * pop(f, thirty3, 12)})`}><CalPage x={0} y={0} s={0.9} m="FOR ABOUT" d="30 YRS" col="#2E5C9A" /></g>
        </g>
        {/* two columns: 40k vs 84k */}
        <g opacity={on(f, less4, 10)}>
          <g transform="translate(680 0)"><rect x={-120} y={GROUND - 248} width={240} height={248} rx={18} fill="#7FC495" /><Paycheck x={0} y={GROUND - 360} s={0.85} amt="$40,000" sub="THE MILLION PAYS" /></g>
          <g transform="translate(1240 0)" opacity={on(f, household, 10)}>
            <rect x={-120} y={GROUND - 520 * on(f, household, 20)} width={240} height={520 * on(f, household, 20)} rx={18} fill="#6FA8DC" />
            <g transform={`translate(0 ${GROUND - 530})`}><path d="M-110 0 L0 -100 L110 0 Z" fill="#C94A3E" /><rect x={-80} y={0} width={160} height={0} /></g>
            <g opacity={on(f, d84, 8)}><Label x={0} y={GROUND - 650} text="$84,000" size={72} font="Bebas Neue" color={P.ink} /><Label x={0} y={GROUND + 64} text="TYPICAL US HOUSEHOLD" size={48} font="Bebas Neue" color={P.ink2} /></g>
          </g>
          <g opacity={on(f, half4, 10)}><line x1={500} y1={GROUND - 260} x2={1420} y2={GROUND - 260} stroke={P.coral} strokeWidth={6} strokeDasharray="18 12" />
            <Label x={1560} y={GROUND - 244} text="HALF" size={56} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}

      {/* # C) not forever; the machine; four choices; breaks halfway; Leo; 100 years */}
      {C > 0 && <g opacity={C}>
        <Street f={f} ground={GROUND} o={0.55} trees={[110, 1830]} lamps={[]} />
        <Ground y={GROUND} />
        <g opacity={1 - on(f, machine5, 10)}>
          <BrickPile x={960} y={GROUND} n={10} s={1.1} />
          <Dream x={960} y={470} s={0.7} f={f} />
          <NoMark x={960} y={480} o={on(f, forever, 8)} r={170} />
        </g>
        <g opacity={on(f, machine5, 10)}>
          <Machine x={1020} y={GROUND} s={1.05} f={f} run={1} fill={1} broken={broke} lit={[four6, choices6, decide6, whether6].filter((a) => f >= a).length} />
          {[pays5, salary].map((a, k) => { const t = span(f, a, a + 26); return t > 0 && t < 1 ? <Paycheck key={k} x={lerp(1340, 1560, t)} y={lerp(860, 660, Math.sin(t * Math.PI / 2))} s={0.7} amt="$40,000" sub="A YEAR" o={1 - on(f, a + 22, 4)} /> : null })}
          <g opacity={win(f, right5, four6, 8)}><ellipse cx={1020} cy={GROUND - 330} rx={380} ry={360} fill={P.gold} opacity={0.12} /></g>
          <g opacity={on(f, thirty6, 10) * (1 - on(f, follow, 10))} transform={`translate(1640 ${360 - 10 * pop(f, thirty6, 12)})`}><CalPage x={0} y={0} s={0.9} m={f >= breaks6 ? 'HALFWAY' : '30 YEARS'} d={f >= breaks6 ? '15' : '30'} col={f >= breaks6 ? '#C94A3E' : '#2E5C9A'} /></g>
        </g>
        <g opacity={on(f, follow, 8)}>
          <Person f={f} who="investor" beats={cBeats} x={leoX} y={GROUND} s={1.1} flip={false} life={walking ? 0 : 3} />
          <g opacity={on(f, leo7, 8)}><Label x={leoX} y={GROUND + 66} text="LEO (MADE-UP INVESTOR)" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, h100, 10)} transform={`translate(1660 ${380 - 10 * pop(f, h100, 12)})`}><CalPage x={0} y={0} s={1.0} m="MARKET DATA" d={String(year)} col="#2E5C9A" /></g>
      </g>}

      <Headline f={f} lines={[[one, '$1,000,000 TO INVEST', P.ink, 104], [picture, 'NEVER WORK AGAIN?', P.ink, 104], [d40, '≈ $40,000 A YEAR', P.mintInk, 106], [less4, 'LESS THAN HALF A TYPICAL INCOME', P.ink, 92], [pile5, 'NOT A PILE TO LIVE ON FOREVER', P.ink, 92], [machine5, 'A MACHINE THAT PAYS A SALARY', P.ink, 92], [four6, '4 CHOICES DECIDE IF IT LASTS', P.ink, 96], [test7, '1928 → 2025: REAL DATA', P.ink, 96]]} />
      <Vignette id="m-hook" />
    </g>
  )
}

export const M_HOOK = makePiece('m-hook', 'Million hook: Leo wakes, his phone shows $1,000,000; a dream of a hammock (never work again); the million pours into a money machine that pays a $40,000 paycheck; 40k vs the typical household 84k with a half line; a pile to live on forever crossed; the machine runs and pays a salary; four choice sockets light; a 30-year calendar; the machine sputters halfway; Leo walks in (made-up investor); market-data calendar flips 1928 to 2025', {
  mood: 'light', Component: Hook,
  beats: ["s1:imagine", "s1:wake", "s1:1", "s1:invest", "s2:picture", "s2:never", "s3:history", "s3:million", "s3:invested", "s3:pay", "s3:40000", "s3:thirty", "s4:less", "s4:half", "s4:household", "s4:84000", "s5:pile", "s5:forever", "s5:machine", "s5:pays", "s5:salary", "s5:right", "s6:four", "s6:choices", "s6:decide", "s6:whether", "s6:thirty", "s6:breaks", "s6:halfway", "s7:follow", "s7:leo", "s7:test", "s7:100", "s7:data"],
  sfx: [['s1:1', 'pop', 0.2], ['s3:invested', 'whoosh', 0.15], ['s3:pay', 'pop', 0.15], ['s5:forever', 'thud', 0.15], ['s6:breaks', 'thud', 0.2]] })
