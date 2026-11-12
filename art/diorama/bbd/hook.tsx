// ---------------------------------------------------------------- s1–s7: Musk paid $0 federal income tax in 2018; Bezos $0 in 2007 and 2011;
// richest people, homes, jets, staff; (brand at s4); they rarely sell and borrow against what they own; a loan is not income; one example investor
// # picture-first (owner r36/r37/r39): every line is a drawing; text is short labels only; one picture group at a time
import React from 'react'
import { lerp, on, P, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, hand, fly, Headline, Person, Prop as Prop0, Stamp, win } from '../aimoney/common'
// # catalog props draw small at their nominal size; this story shows them big (owner r37: few objects, big)
const Prop: typeof Prop0 = (p) => <Prop0 {...p} size={p.size * 1.6} />
import { At, Chain, Stack, Tag, TaxBill , Accents, xcam, punch, type Acc } from './kit'

// # every cue that drives a drawing (the plan gate counts them; each one also punches the frame in)
const BEATS: string[] = ['s3:these', 's6:it#2', 's1:musk', 's1:zero', 's1:federal', 's2:bezos', 's2:federal', 's2:in', 's2:in#2', 's2:none', 's3:richest', 's3:earth', 's3:homes', 's3:jets', 's3:staff', 's4:little',
    's5:answer', 's5:rarely', 's5:sell', 's5:cash', 's5:borrow', 's5:own', 's6:loan', 's6:income', 's6:back', 's6:no', 's7:one', 's7:plan', 's7:rules', 's7:maths', 's7:saves', 's7:breaks']
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const y18 = c('s1'), musk = c('s1:musk'), zero = c('s1:zero'), fed = c('s1:federal')
  const fed2 = c('s2:federal'), bezos = c('s2:bezos'), y07 = c('s2:in') + 8, none = c('s2:none'), y11 = c('s2:in#2') + 8
  const richest = c('s3:richest'), earth = c('s3:earth'), homes = c('s3:homes'), jets = c('s3:jets'), staff = c('s3:staff')
  const answer = c('s5:answer'), rarely = c('s5:rarely'), sell = c('s5:sell'), cash = c('s5:cash'), borrow = c('s5:borrow'), own = c('s5:own')
  const loan = c('s6:loan'), income = c('s6:income'), back = c('s6:back'), no = c('s6:no')
  const little4 = c('s4:little'), investor = c('s7:one'), plan7 = c('s7:plan'), rules = c('s7:rules'), maths = c('s7:maths'), saves = c('s7:saves'), breaks = c('s7:breaks')
  const A = win(f, c('s1'), richest), B = win(f, richest, c('s5')), C = win(f, c('s5'), investor), D = on(f, investor, 8)
  const hero: Beat[] = [[0, 'present', 'neutral'], [zero, 'shock', 'shocked'], [bezos, 'explain', 'neutral'], [none, 'shrug', 'thinking'], [homes, 'point', 'neutral'],
    [answer, 'explain', 'neutral'], [rarely, 'stop', 'neutral'], [borrow, 'present', 'smiling'], [loan, 'countOne', 'neutral'], [no, 'shrug', 'smug'],
    [investor, 'present', 'smiling'], [maths, 'pointUp', 'neutral'], [breaks, 'oops', 'worried']]
  const inv: Beat[] = [[0, 'idle', 'neutral'], [saves, 'celebrate', 'smiling'], [breaks, 'nervous', 'worried']]
  // # the investor in the borrowing beat: arms crossed over her shares, on the phone for cash, catches it, signs, celebrates
  const inv5: Beat[] = [[0, 'armsCrossed', 'smug'], [rarely, 'holdChest', 'smug'], [sell, 'stop', 'neutral'], [cash, 'phone', 'neutral'], [borrow, 'receive', 'smiling'],
    [loan, 'signA', 'neutral', 'signB', 12], [income, 'present', 'neutral'], [no, 'celebrate', 'smiling']]
  const h5 = hand(f, inv5, 1000, 1040, 1.0)
  const cashFly = fly(f, borrow + 4, [1700, 700], [h5.x, h5.y], 20, 120)
  const XC = xcam(c, [["s3:these",1240,560,1.05],["s6:it#2",1680,880,1.08]])
  const XA: Acc[] = []
  return (
    <g>
      <Stage id="bh" frame={f} />
      <Headline f={f} lines={[[zero, 'TAX PAID: $0', P.coralInk, 130], [none, 'AGAIN: $0', P.coralInk, 130], [richest, 'THE RICHEST PEOPLE', P.ink, 116],
        [rarely, 'THEY RARELY SELL', P.goldInk, 126], [borrow, 'THEY BORROW', P.goldInk, 136], [income, 'A LOAN IS NOT INCOME', P.ink, 116], [investor, 'ONE EXAMPLE INVESTOR', P.ink, 116]]} />
      <g transform={punch(f, BEATS.map(c))}><g transform={camera(f, [...XC, [y18, 1240, 600, 1.05], [bezos, 1240, 600, 1.05], [richest, 960, 540, 1], [answer, 1200, 620, 1.04], [investor, 960, 540, 1]])}>
        {/* # A: two tax bills — 2018 (Musk) stamped $0; then 2007 and 2011 (Bezos), both $0 */}
        <g opacity={A}>
          <g opacity={1 - on(f, bezos, 8)}>
            <At f={f} at={y18} x={1240} y={600} s={1.1}><TaxBill x={0} y={0} year="2018" amount={f >= zero ? '$0' : ''} /></At>
            <Tag f={f} at={musk} x={1240} y={860} text="ELON MUSK" size={60} />
            <At f={f} at={fed} x={1560} y={420}><Prop id="tax-form" x={0} y={0} size={150} f={f} /></At>
          </g>
          <g opacity={on(f, bezos, 6)}>
            <Tag f={f} at={bezos} x={1240} y={880} text="JEFF BEZOS" size={60} />
            <At f={f} at={fed2} x={1240} y={340} s={0.8}><Prop id="tax-form" x={0} y={0} size={120} f={f} /></At>
            <At f={f} at={bezos} x={1060} y={580} r={-5}><TaxBill x={0} y={0} year={f >= y07 ? '2007' : ''} amount={f >= none ? '$0' : ''} /></At>
            <At f={f} at={bezos} x={1420} y={580} r={5}><TaxBill x={0} y={0} year={f >= y11 ? '2011' : ''} amount={f >= y11 + 8 ? '$0' : ''} /></At>
          </g>
        </g>
        {/* # B: the richest on Earth — a globe, a mansion, a jet, staff */}
        <g opacity={B}>
          <At f={f} at={richest} x={1240} y={420}><Prop id="crown" x={0} y={0} size={170} f={f} /></At>
          <At f={f} at={earth} x={1240} y={640}><Prop id="globe" x={0} y={0} size={220} f={f} /></At>
          <At f={f} at={homes} x={900} y={820}><Prop id="house" x={0} y={0} size={220} f={f} /></At>
          <g opacity={on(f, jets, 6)} transform={`translate(${lerp(1900, 1580, on(f, jets, 22))} ${lerp(560, 480, on(f, jets, 22))})`}><Prop id="airplane" x={0} y={0} size={240} f={f} /></g>
          <At f={f} at={little4} x={1240} y={880} s={0.7}><Prop id="coin" x={0} y={0} size={60} f={f} /></At>
          <g opacity={on(f, staff, 6)}><Person f={f} who="worker" beats={[[0, 'idle', 'smiling'], [staff + 4, 'carry', 'smiling']]} x={1560} y={1010} s={0.8} /></g>
        </g>
        {/* # C: a stack of shares stays put (padlock, no sale); cash comes from a bank, held against the shares */}
        <g opacity={C}>
          <At f={f} at={answer} x={1300} y={900}><Stack x={0} y={0} n={10} /></At>
          <At f={f} at={rarely} x={1300} y={560}><Prop id="padlock" x={0} y={0} size={130} f={f} /></At>
          <At f={f} at={sell} x={1520} y={540} s={0.9}><Prop id="cross" x={0} y={0} size={110} f={f} /></At>
          <g opacity={on(f, cash, 6) * (1 - on(f, loan, 8))}><At f={f} at={cash} x={1700} y={760}><Prop id="bank" x={0} y={0} size={240} f={f} /></At></g>
          {cashFly.t < 1 && cashFly.o > 0 && <g opacity={cashFly.o} transform={`translate(${cashFly.x} ${cashFly.y})`}><Prop id="cash-stack" x={0} y={0} size={90} f={f} /></g>}
          {cashFly.t >= 1 && f < loan && <Prop id="cash-stack" x={h5.x} y={h5.y} size={90} f={f} />}
          <g opacity={on(f, answer, 8)}><ellipse cx={1000} cy={800} rx={140} ry={240} fill="#F7FAFF" opacity={0.10} /><Person f={f} who="investor" beats={inv5} x={1000} y={1040} s={1.0} /></g>
          <g opacity={on(f, own, 6) * (1 - on(f, loan, 8))}><Chain a={[1440, 820]} b={[1620, 760]} t={span(f, own, own + 14)} /></g>
          <g opacity={on(f, loan, 6)}>
            <At f={f} at={loan} x={1680} y={600}><Prop id="contract" x={0} y={0} size={200} f={f} /></At>
            <Tag f={f} at={loan} x={1680} y={740} text="LOAN" size={56} />
            <At f={f} at={back} x={1680} y={400}><path d="M60 -20 A60 60 0 1 0 60 40" fill="none" stroke={P.mint} strokeWidth={12} strokeLinecap="round" /><path d="M40 52 L62 40 L56 16" fill="none" stroke={P.mint} strokeWidth={12} strokeLinecap="round" /></At>
            <Stamp x={1680} y={900} text="NO INCOME TAX" f={f} at={no} size={58} />
          </g>
        </g>
        {/* # D: our example investor; the rules (gavel), our maths (calculator), what it saves (piggy bank), where it breaks (cracks) */}
        <g opacity={D}>
          <g opacity={on(f, investor, 8)}><ellipse cx={1240} cy={800} rx={150} ry={260} fill="#F7FAFF" opacity={0.10} /></g><Person f={f} who="investor" beats={inv} x={1240} y={1040} s={1.15} o={on(f, investor, 8)} />
          <At f={f} at={plan7} x={880} y={820}><Prop id="contract" x={0} y={0} size={130} f={f} /></At>
          <At f={f} at={rules} x={900} y={500}><Prop id="gavel" x={0} y={0} size={150} f={f} /></At>
          <At f={f} at={maths} x={1580} y={420}><Prop id="calculator" x={0} y={0} size={150} f={f} /></At>
          <At f={f} at={saves} x={1700} y={720}><Prop id="piggy-bank" x={0} y={0} size={160} f={f} /></At>
          <At f={f} at={breaks} x={1700} y={720}><Prop id="cracks" x={0} y={0} size={200} f={f} /></At>
        </g>
        <Accents f={f} c={c} list={XA} Prop={Prop} />
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g></g>
      <Vignette id="bh" />
    </g>
  )
}

export const BB_HOOK = makePiece('bb-hook', "Long: Musk $0 federal income tax 2018, Bezos $0 in 2007 and 2011; the rich rarely sell and borrow; a loan is not income", { mood: 'dark', Component: Hook,
  beats: BEATS,
  sfx: [['s1:zero', 'impact', 0.5], ['s2:none', 'thud', 0.4], ['s3:jets', 'whoosh', 0.4], ['s5:borrow', 'cash', 0.5], ['s6:no', 'ding', 0.4], ['s7:breaks', 'crack', 0.4]] })
