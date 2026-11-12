// ---------------------------------------------------------------- s31–s43a: we pay for who we plan to be.
// A) A member on the sofa with a tag, puzzled. Two economists arrive with three years of record folders; a grid of
//    member dots fills (7,752) and three small clubs appear; one tag reads $70+ a month.
// B) The maths as one splitting object (r42): the $70 bar over a month strip with 4.3 visits splits into four-and-a-bit
//    parts → "$17+ A VISIT". A 10-visit punch card → "$10 A VISIT". A see-saw: the member side ($17+) sinks below the
//    pass side ($10). About $600 leaks from a wallet into a pile. Three clubs each get the same tick.
// C) A thought cloud: 12 planned visits vs 4 real ones. The hero signs up picturing three gym days a week; busy weeks
//    flip past on a calendar; a "next Monday" note; coins keep leaving the card. The hero beside a dashed outline of the
//    fit self he plans to be; that outline glows on "hopeful".
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, fly, Headline, Label, Person, Prop, Tick, win } from '../aimoney/common'
import { BankCard, KeyTag, MiniGym, PunchCard, SeeSaw, Sofa, SplitBar, Thought, VisitStrip } from './kit'

const Study: React.FC<PieceProps> = ({ f, c }) => {
  const s31 = c('s31'), paying = c('s31:paying'), barely = c('s31:barely')
  const two = c('s32:two'), berkeley = c('s32:berkeley'), studied = c('s32:studied'), years = c('s32:years')
  const paid37 = c('s37:paid#2'), buying = c('s37:buying'), d7752 = c('s32:7752'), clubs = c('s32:clubs')
  const monthly = c('s33:monthly'), d70 = c('s33:70')
  const d43 = c('s34:43'), divide = c('s35:divide'), visits35 = c('s35:visits'), workout = c('s35:workout'), d17 = c('s35:17')
  const visits36 = c('s36:visits'), pass2 = c('s36:pass#2'), explanation = c('s39:explanation')
  const pass = c('s36:pass'), d10b = c('s36:10#2')
  const more = c('s37:more'), withPass = c('s37:pass')
  const saved = c('s38:saved'), d600 = c('s38:600')
  const one38 = c('s38a:one'), three38 = c('s38a:three'), thousands = c('s38a:thousands'), sign39 = c('s39:sign')
  const expect = c('s39:expect'), really = c('s39:really')
  const signup = c('s40:signup'), picture = c('s40:picture')
  const busy = c('s41:busy'), another = c('s41:another')
  const monday = c('s42:monday'), payment = c('s42:payment')
  const are = c('s43:are'), plan = c('s43:plan')
  const lazy = c('s43a:lazy'), hopeful = c('s43a:hopeful')
  const A = win(f, s31, d43), B = win(f, d43, expect), C = on(f, expect, 12)
  const hero = [[0, 'think', 'thinking'], [signup, 'signA', 'smiling', 'signB', 10], [picture, 'lookFar', 'smiling'], [busy, 'nervous', 'worried'], [monday, 'pointUp', 'neutral'], [payment, 'emptyPockets', 'worried'], [c('s43:words'), 'scratchHead', 'thinking'], [are, 'shrug', 'thinking'], [plan, 'lookFar', 'smiling'], [hopeful, 'relief', 'smiling']] as const
  const coinsOut = (from: number, n: number) => Array.from({ length: n }, (_, k) => { const p = fly(f, from + k * 12, [1180, 620], [1700, 980], 24, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null })
  return (
    <g>
      <Stage id="gm-study" frame={f} />
      <Headline f={f} lines={[[two, 'A BERKELEY STUDY', P.ink, 104], [d70, 'PLAN: $70+ A MONTH', P.ink, 104], [d17, '$17+ A VISIT', P.coralInk, 116], [d10b, 'PASS: $10 A VISIT', P.mintInk, 110], [d600, '≈ $600 LOST', P.coralInk, 116], [expect, 'WE EXPECT TOO MUCH', P.ink, 104], [plan, 'THE PERSON WE PLAN TO BE', P.goldInk, 100]]} />
      {/* # the drawing sits a little larger on the stage (static, never a zoom) */}
      <g transform="translate(960 900) scale(1.15) translate(-960 -900)">
      {/* # A) the question and the study */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, two, 6)}>
          <Sofa x={960} y={960} s={0.9} />
          <Mini look="buyer" x={960} y={930} scale={1.5} frame={f} seed={11} />
          <g opacity={on(f, paying, 4)} transform={`translate(1300 560) scale(${0.6 * pop(f, paying)})`}><KeyTag x={0} y={0} text="PAID" /></g>
          <g opacity={on(f, barely, 4)} transform="translate(640 560)"><Prop id="question" x={0} y={0} size={150} f={f} /></g>
        </g>
        <g opacity={on(f, two, 4)}>
          <Person f={f} who="investor" beats={[[0, 'read', 'thinking'], [d7752, 'point', 'neutral']]} x={300} y={960} s={0.66} />
          <Person f={f} who="investorF" beats={[[0, 'measure', 'thinking'], [clubs, 'present', 'smiling'], [d70, 'pointUp', 'neutral']]} x={520} y={960} s={0.66} />
          <g opacity={on(f, berkeley, 4) * (1 - on(f, years, 6))} transform={`translate(1200 600) scale(${pop(f, berkeley)})`}><Prop id="school" x={0} y={0} size={260} f={f} /></g>
          <g opacity={on(f, studied, 4) * (1 - on(f, years, 6))} transform="translate(1500 520)"><Prop id="magnifier" x={0} y={0} size={160} f={f} /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, c('s32:using') + k * 5, 4) * (1 - on(f, d7752, 6))} transform={`translate(${900 + k * 200} 700) scale(${pop(f, c('s32:using') + k * 5)})`}><Prop id="newspaper" x={0} y={0} size={160} f={f} /></g>)}
          <g opacity={on(f, d7752, 4) * (1 - on(f, monthly, 6))}>{Array.from({ length: 160 }, (_, k) => <circle key={k} cx={820 + (k % 20) * 44} cy={430 + Math.floor(k / 20) * 44} r={13} fill={['#5BCBFF', '#F06B5B', '#3DDC97', '#E9C25A'][k % 4]} opacity={on(f, d7752 + k * 0.15, 4)} />)}<Label x={1240} y={820} text="7,752 MEMBERS" size={52} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, clubs, 4) * (1 - on(f, monthly, 6))}>{[0, 1, 2].map((k) => <MiniGym key={k} x={1040 + k * 200} y={960} s={1.6 * pop(f, clubs + k * 3)} />)}<g opacity={on(f, c('s33:looked'), 4)} transform={`translate(${lerp(1000, 1440, span(f, c('s33:looked'), c('s33:members') + 10))} 840)`}><Prop id="magnifier" x={0} y={0} size={130} f={f} /></g></g>
          <g opacity={on(f, monthly, 4)} transform={`translate(1240 620) scale(${0.95 * pop(f, monthly)}) rotate(${-8 * Math.sin(Math.PI * span(f, c('s34:average'), c('s34:average') + 14))})`}><KeyTag x={0} y={0} text={f >= d70 ? '$70+' : 'MONTHLY'} /></g>
        </g>
      </g>}
      {/* # B) the maths */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, pass, 6)}>
          <SplitBar x={960} y={480} w={1100} n={f >= divide + 6 ? 4 : 1} t={span(f, divide, divide + 14)} total="$70+ A MONTH" each={f >= d17 ? '$17+ A VISIT' : f >= workout ? '$? A VISIT' : ''} />
          <VisitStrip x={960} y={lerp(760, 700, on(f, visits35, 12))} n={4} o={on(f, d43, 4)} />
          <Label x={960} y={850} text="≈ 4.3 VISITS A MONTH" size={48} font="Bebas Neue" color={P.ink} o={on(f, d43, 4)} />
        </g>
        <g opacity={on(f, c('s36:clubs'), 4) * (1 - on(f, pass, 6))}>{[0, 1, 2].map((k) => <MiniGym key={k} x={640 + k * 320} y={640} s={2.2 * pop(f, c('s36:clubs') + k * 3)} />)}<g opacity={on(f, c('s36:sold'), 4)} transform={`translate(960 ${lerp(640, 820, on(f, c('s36:sold'), 14))}) scale(0.5)`}><PunchCard x={0} y={0} /></g></g>
        <g opacity={on(f, pass, 4) * (1 - on(f, more, 6))}>
          <PunchCard x={960} y={560} s={1.3 * pop(f, pass)} punched={Math.round(10 * span(f, visits36, d10b))} r={-8 * on(f, pass2, 12)} />
          <Label x={960} y={820} text="$10 A VISIT" size={64} font="Bebas Neue" color={P.mintInk} o={on(f, d10b, 4)} />
        </g>
        <g opacity={on(f, more, 4) * (1 - on(f, saved, 6))}>
          <SeeSaw x={960} y={740} w={900} tilt={-lerp(0, 1, on(f, more, 20))}
            left={<g><rect x={-90} y={-120} width={180} height={120} rx={18} fill="#F06B5B" /><text x={0} y={-42} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>$17+</text><text x={0} y={-140} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>MEMBER</text></g>}
            right={<g opacity={Math.max(on(f, paid37, 4), on(f, withPass, 4))}>{f >= buying && [0, 1].map((k) => <Coin key={k} x={-40 + k * 80} y={-200 - 20 * Math.sin(Math.PI * span(f, buying + k * 4, buying + k * 4 + 14))} s={0.5} />)}<rect x={-90} y={-90} width={180} height={90} rx={18} fill="#3DDC97" /><text x={0} y={-28} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>$10</text><text x={0} y={-110} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>PASS</text></g>} />
        </g>
        <g opacity={on(f, saved, 4) * (1 - on(f, one38, 6))}>
          <g opacity={on(f, c('s38:time'), 4)} transform="translate(380 560) scale(1.2)"><Calendar x={0} y={0} text="MEMBER" s={1} /></g>
          <g opacity={on(f, c('s38:members'), 4)} transform="translate(700 620)"><Prop id="wallet" x={0} y={0} size={220} f={f} /></g>
          {Array.from({ length: 10 }, (_, k) => { const p = fly(f, saved + k * 4, [760, 600], [1240 + (k % 4) * 50, 800 - Math.floor(k / 4) * 34], 20, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.9} o={p.o} /> : null })}
          {Array.from({ length: 10 }, (_, k) => <Coin key={k} x={1240 + (k % 4) * 50} y={800 - Math.floor(k / 4) * 34} s={0.9} o={f >= saved + k * 4 + 20 ? 1 : 0} />)}
          <g transform={`translate(0 ${-16 * Math.sin(Math.PI * span(f, c('s38:average'), c('s38:average') + 12))})`}><Label x={1320} y={900} text="≈ $600" size={72} font="Bebas Neue" color={P.coralInk} o={on(f, d600, 4)} /></g>
        </g>
        <g opacity={on(f, one38, 4)}>{[0, 1, 2].map((k) => <g key={k} opacity={k === 0 || f >= three38 + (k - 1) * 4 ? 1 : 0} transform={`translate(${(960 - (600 + k * 360)) * 0.35 * on(f, explanation, 14)} 0) rotate(${k === 0 ? 4 * Math.sin((f - c('s38a:badly')) / 3) * on(f, c('s38a:badly'), 4) * (1 - on(f, c('s38a:badly') + 24, 4)) : 0} ${600 + k * 360} 720)`}><MiniGym x={600 + k * 360} y={720} s={2.4} /><Tick x={600 + k * 360} y={500} o={on(f, three38 + k * 4, 4)} r={44} /></g>)}
          <line x1={600} y1={620} x2={1320} y2={620} stroke={P.goldInk} strokeWidth={5} strokeDasharray="12 12" opacity={on(f, c('s38a:pattern'), 6)} />
          <g opacity={on(f, c('s39:economists'), 4)}><Person f={f} who="investor" beats={[[0, 'explain', 'neutral']]} x={220} y={980} s={0.5} /><Person f={f} who="investorF" beats={[[0, 'pointUp', 'smiling']]} x={1700} y={980} s={0.5} /></g>
          <g opacity={on(f, thousands, 4)}>{Array.from({ length: 12 }, (_, k) => <Mini key={k} look={['buyer', 'investor', 'worker', 'owner'][k % 4]} x={460 + k * 90} y={1000} scale={0.7} frame={f} seed={k + 50} />)}</g>
          <g opacity={on(f, sign39, 4)} transform={`translate(960 400) scale(${0.6 * pop(f, sign39)})`}><KeyTag x={0} y={0} text="SIGN UP" /></g></g>
      </g>}
      {/* # C) the hopeful self */}
      {C > 0 && <g opacity={C}>
        <Person f={f} who="hero" beats={hero as never} x={560} y={980} s={0.74} />
        <g opacity={1 - on(f, signup, 6)}>
          <Thought x={1200} y={460} w={760} h={340}>
            <g opacity={on(f, expect, 4)}><Label x={0} y={-60} text="PLAN" size={40} font="Bebas Neue" color={P.ink2} /><VisitStrip x={0} y={-10} n={12} w={600} /></g>
            <g opacity={on(f, really, 4)}><Label x={0} y={70} text="REALLY" size={40} font="Bebas Neue" color={P.ink2} /><VisitStrip x={0} y={120} n={4} w={600} /></g>
          </Thought>
        </g>
        <g opacity={on(f, signup, 4) * (1 - on(f, busy, 6))}>
          <g transform="translate(860 760) rotate(-6)"><rect x={-160} y={-110} width={320} height={220} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={4} /><path d={`M-110 40 Q-60 ${lerp(40, 10, span(f, signup, signup + 20))} 0 40 T110 30`} fill="none" stroke={P.navy3} strokeWidth={5} /></g>
          <Thought x={1300} y={420} w={620} h={300} o={on(f, picture, 4)}><VisitStrip x={0} y={0} n={f >= c('s40:week') ? 3 : f >= c('s40:three') ? 2 : f >= c('s40:going') ? 1 : 0} of={7} w={480} /><Label x={0} y={80} text="3 DAYS A WEEK" size={40} font="Bebas Neue" color={P.ink} /></Thought>
        </g>
        <g opacity={on(f, busy, 4) * (1 - on(f, are, 6))}>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, (k === 0 ? busy : another) + (k === 2 ? 12 : 0), 4)} transform={`translate(${1000 + k * 40} ${560 + k * 30}) rotate(${-6 + k * 5}) scale(1.4)`}><Calendar x={0} y={0} text={['BUSY', 'BUSY', 'BUSY'][k]} s={1} /></g>)}
          <g opacity={on(f, monday, 4)} transform="translate(1500 460) rotate(4)"><rect x={-130} y={-80} width={260} height={160} rx={10} fill="#F6E27A" /><text x={0} y={-8} textAnchor="middle" fill="#5A4A10" style={{ font: '400 48px "Bebas Neue"' }}>NEXT</text><text x={0} y={44} textAnchor="middle" fill="#5A4A10" style={{ font: '400 48px "Bebas Neue"' }}>MONDAY</text></g>
          <g opacity={on(f, payment, 4)}><BankCard x={1180} y={760} s={0.7} r={-4} />{coinsOut(payment, 5)}{coinsOut(c('s42:month'), 3)}</g>
        </g>
        <g opacity={on(f, are, 4)}>
          {/* # the fit self he plans to be: a dashed outline beside him, glowing on "hopeful" */}
          <g opacity={on(f, plan, 4)}>
            <ellipse cx={1180} cy={640} rx={220} ry={380} fill={P.gold} opacity={(0.1 * on(f, c('s43a:little'), 12) + 0.15 * on(f, hopeful, 12)) * (0.7 + 0.3 * Math.sin(f / 6))} />
            <g opacity={0.55}><Person f={f} who="hero" beats={[[0, 'runA', 'smiling', 'runB', 14]]} x={1180} y={980} s={0.74} /></g>
            <Label x={1180} y={1050} text="PLANNED ME" size={44} font="Bebas Neue" color={P.goldInk} />
          </g>
          <g opacity={on(f, c('s43a:gym'), 4)}><MiniGym x={1600} y={380} s={1.4} /></g>
          <g opacity={on(f, lazy, 4) * (1 - on(f, c('s43a:only'), 4))} transform="translate(1600 560)"><Prop id="cross" x={0} y={0} size={110} f={f} /><Label x={0} y={110} text="LAZY" size={44} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, hopeful, 4)} transform="translate(1600 560)"><Tick x={0} y={0} o={1} r={50} /><Label x={0} y={110} text="HOPEFUL" size={44} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}
      </g>
      <Vignette id="gm-study" />
    </g>
  )
}

export const GM_STUDY = makePiece('gm-study', 'Gym long: a Berkeley study (7,752 members, 3 clubs); $70+ plan, 4.3 visits → $17+ a visit vs $10 pass, ≈ $600 lost; we expect to go more; busy weeks, next Monday, payments keep leaving; we pay for the person we plan to be', {
  mood: 'light', Component: Study,
  beats: ["s31", "s31:paying", "s31:barely", "s32:two", "s32:berkeley", "s32:studied", "s32:years", "s37:paid#2", "s37:buying", "s32:7752", "s32:clubs", "s33:monthly", "s33:70", "s34:43", "s35:divide", "s35:visits", "s35:workout", "s35:17", "s36:visits", "s36:pass#2", "s39:explanation", "s36:pass", "s36:10#2", "s37:more", "s37:pass", "s38:saved", "s38:600", "s38a:one", "s38a:three", "s38a:thousands", "s39:sign", "s39:expect", "s39:really", "s40:signup", "s40:picture", "s41:busy", "s41:another", "s42:monday", "s42:payment", "s43:are", "s43:plan", "s43a:lazy", "s43a:hopeful", "s43:words", "s32:using", "s33:looked", "s33:members", "s34:average", "s36:clubs", "s36:sold", "s38:time", "s38:members", "s38:average", "s38a:badly", "s38a:pattern", "s39:economists", "s40:week", "s40:three", "s40:going", "s42:month", "s43a:little", "s43a:gym", "s43a:only"],
  sfx: [['s32:two', 'pop', 0.3], ['s32:7752', 'tick', 0.3], ['s35:divide', 'pop', 0.3], ['s36:pass', 'click', 0.3], ['s37:more', 'thud', 0.35], ['s38:saved', 'coin', 0.35], ['s40:signup', 'click', 0.3], ['s41:busy', 'swish', 0.3], ['s42:payment', 'coin', 0.35], ['s43a:hopeful', 'chime', 0.35]] })
