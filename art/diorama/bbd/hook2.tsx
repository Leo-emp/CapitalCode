// ---------------------------------------------------------------- s1–s7 (redrawn 2026-10-31): a night city of the rich.
// Two glass towers. Musk's tax bill slides out of the first tower's penthouse and its total lands on $0; Bezos's two bills
// (2007, 2011) slide out of the second. The camera pulls back: mansion lights, a jet crosses, staff walk in. (brand at s4)
// Then the tower's base opens into a vault of shares that stays locked; the bank across the street builds a bridge of light
// and cash flows to her; the loan paper follows and she signs; a thin stream flows back; the tax office stays dark.
// The presenter steps in only to introduce the example investor (s7).
import React from 'react'
import { easeInOut, lerp, on, P, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, hand, Headline, Person, Doc } from '../aimoney/common'
import { TaxBill, TaxOffice } from './kit'
import { BankHall, Cash, GlassTower, Ground, Jet, LightBridge, Mansion, onBridge, Skyline, Vault } from './world'

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), musk = c('s1:musk'), zero = c('s1:zero'), fed = c('s1:federal')
  const bezos = c('s2:bezos'), y07 = c('s2:in') + 8, none = c('s2:none'), y11 = c('s2:in#2') + 8
  const richest = c('s3:richest'), homes = c('s3:homes'), jets = c('s3:jets'), staff = c('s3:staff'), pay = c('s3:pay')
  const answer = c('s5:answer'), rarely = c('s5:rarely'), sell = c('s5:sell'), cash = c('s5:cash'), borrow = c('s5:borrow'), own = c('s5:own')
  const loan = c('s6:loan'), income = c('s6:income'), back = c('s6:back'), no = c('s6:no')
  const today = c('s7:today'), one = c('s7:one'), plan = c('s7:plan'), rules = c('s7:rules'), maths = c('s7:maths'), saves = c('s7:saves'), breaks = c('s7:breaks')
  // # where things stand: tower A (Musk) left, tower B (Bezos) right, the bank low between them, the tax office far right
  const TA = 760, TB = 1600, BANK: [number, number] = [1300, 880], TAX = 1820
  const inv: Beat[] = [[0, 'idle', 'neutral'], [rarely, 'armsCrossed', 'smug'], [sell, 'stop', 'neutral'], [cash, 'emptyPockets', 'thinking'], [borrow, 'receive', 'smiling'],
    [loan, 'signA', 'neutral', 'signB', 12], [back, 'offer', 'neutral'], [no, 'confident', 'smug'], [one, 'present', 'smiling'], [breaks, 'nervous', 'worried']]
  const IX = 1040, IY = 1000
  const hp = hand(f, inv, IX, IY, 0.9)
  const bridgeT = easeInOut(span(f, borrow, borrow + 18))
  const vaultOpen = on(f, answer, 16)
  return (
    <g>
      <Stage id="bh2" frame={f} />
      <g>
        <Skyline f={f} />
        <Ground />
        <g opacity={on(f, homes, 10) * (1 - on(f, answer, 10))}><Mansion x={440} y={880} s={0.7} lit={on(f, homes, 14)} /></g>
        <GlassTower x={TA} y={880} w={260} h={520} f={f} lit={on(f, s1, 10) * (1 - on(f, bezos, 10)) + on(f, richest, 10) * 0.6} glow={on(f, pay, 14) * (1 - on(f, answer, 10)) + 0.8 * on(f, c('s4:rich'), 8) * (1 - on(f, c('s4:little'), 10))} />
        <GlassTower x={TB} y={880} w={220} h={460} f={f} lit={on(f, bezos, 10) * (1 - on(f, richest, 10)) + on(f, richest, 10) * 0.6} glow={on(f, pay, 14) * (1 - on(f, answer, 10))} />
        <g opacity={on(f, answer, 10)}><BankHall x={BANK[0]} y={BANK[1]} s={0.62} lit={on(f, borrow, 10)} /></g>
        <g opacity={on(f, c('s4:pay'), 10)}><TaxOffice x={TAX} y={880} s={0.55} shut={on(f, no, 8)} /></g>
        {(() => { const u = span(f, c('s4:little'), c('s4:little') + 26); return u > 0 && u < 1 ? <circle cx={lerp(TA + 60, TAX, u)} cy={lerp(330, 760, u) - Math.sin(Math.PI * u) * 120} r={9} fill={P.gold} /> : null })()}
        {/* # the vault in the base of tower A: revealed on "answer", locked on "rarely" */}
        <g opacity={vaultOpen}><Vault x={TA} y={872} s={0.55} lock={on(f, rarely, 12)} n={12} /></g>
        {/* # Musk's bill: slides out of tower A's penthouse; the total lands on $0 on "zero" */}
        <g opacity={on(f, s1 + 4, 8) * (1 - on(f, bezos, 10))} transform={(() => { const a = easeInOut(span(f, s1 + 4, s1 + 24)), e = easeInOut(span(f, bezos, bezos + 16)); return `translate(${lerp(lerp(TA, 1190, a), TA, e)} ${lerp(lerp(380, 400, a), 380, e)}) scale(${lerp(lerp(0.3, 1.05, a), 0.2, e)})` })()}>
          <TaxBill x={0} y={0} year="2018" amount={f >= zero ? '$0' : ''} />
          {f >= fed && <Label x={0} y={-30} text="FEDERAL INCOME TAX" size={30} font="Bebas Neue" color={P.navy2} o={on(f, fed, 6)} />}
          {f >= musk && <Label x={0} y={250} text="ELON MUSK" size={64} font="Bebas Neue" color={P.ink} o={on(f, musk, 6)} />}
        </g>
        {/* # Bezos's two bills slide out of tower B on his name; each year is written in as it is said */}
        {[[0, 1065, y07, none], [1, 1320, y11, y11 + 8]].map(([k, bx, ya, za]) => (
          <g key={k} opacity={on(f, bezos + k * 4, 8) * (1 - on(f, richest, 10))} transform={(() => { const a = easeInOut(span(f, bezos + k * 4, bezos + 24 + k * 4)), e = easeInOut(span(f, richest, richest + 16)); return `translate(${lerp(lerp(TB, bx, a), TB, e)} ${lerp(lerp(380, 400, a), 380, e)}) scale(${lerp(lerp(0.3, 0.82, a), 0.2, e)}) rotate(${k ? 5 : -5})` })()}>
            <TaxBill x={0} y={0} year={f >= ya ? (k ? '2011' : '2007') : ''} amount={f >= za ? '$0' : ''} />
          </g>))}
        {f >= bezos && <Label x={1190} y={700 - 20 * (1 - on(f, bezos, 8))} text="JEFF BEZOS" size={60} font="Bebas Neue" color={P.ink} o={on(f, bezos, 8) * (1 - on(f, richest, 10))} />}
        {/* # the jet crosses the sky on "jets"; staff walk into tower A on "staff" */}
        <Jet x={lerp(2100, -300, span(f, jets, jets + 90))} y={lerp(270, 240, span(f, jets, jets + 90))} s={0.8} o={on(f, jets, 4) * (1 - on(f, answer, 10))} />
        {[0, 1].map((k) => <g key={k} opacity={on(f, staff, 6) * (1 - on(f, answer, 10))}><Person f={f} who="worker" beats={[[0, 'walkA', 'smiling', 'walkB', 10]]} x={lerp(380 + k * 80, TA - 60 + k * 50, span(f, staff, staff + 70))} y={985} s={0.45} /></g>)}
        {/* # the investor: beside the locked vault; empty pockets on "cash"; the bank's bridge of light brings cash to her hands */}
        <g opacity={on(f, rarely, 8)}><Person f={f} who="investorF" beats={inv} x={IX} y={IY} s={0.9} /></g>
        <LightBridge a={[BANK[0] - 60, 700]} b={[hp.x, hp.y]} t={bridgeT} o={on(f, borrow, 6) * (1 - on(f, today, 10))} lift={90} />
        {[0, 1, 2].map((k) => { const u = span(f, borrow + 10 + k * 8, borrow + 34 + k * 8); return u > 0 && u < 1 ? <Cash key={k} {...onBridge([BANK[0] - 60, 700], [hp.x, hp.y], u, 90)} s={0.7} /> : null })}
        {f >= borrow + 34 && f < loan && <Cash x={hp.x} y={hp.y} s={0.7} />}
        {/* # "against what they own": a chain of light from the vault to the bank */}
        <LightBridge a={[TA + 120, 760]} b={[BANK[0] - 120, 760]} t={easeInOut(span(f, own, own + 16))} o={on(f, own, 6) * (1 - on(f, today, 10))} color={P.sky} lift={40} />
        {/* # the loan paper travels the bridge and she signs; a thin stream flows back on "paid back" */}
        {(() => { const u = easeInOut(span(f, loan, loan + 20)); const p = onBridge([BANK[0] - 60, 700], [hp.x, hp.y], u, 90); return f >= loan && f < income + 30 ? <g transform={`translate(${p.x} ${p.y - 40}) scale(0.35)`}><Doc x={0} y={0} title="LOAN" /></g> : null })()}
        {[0, 1, 2, 3].map((k) => { const u = span(f, back + k * 6, back + 24 + k * 6); return u > 0 && u < 1 ? <circle key={k} {...(() => { const p = onBridge([hp.x, hp.y], [BANK[0] - 60, 700], u, 90); return { cx: p.x, cy: p.y } })()} r={10} fill={P.gold} /> : null })}
        {/* # the plan: a dotted route draws on the road — her → bank → years → tax rules; it cracks on "breaks" */}
        <path d={`M${IX + 60} 930 L${BANK[0]} 930 L${TAX - 40} 930`} stroke={P.gold} strokeWidth={8} strokeDasharray="18 14" fill="none" opacity={on(f, plan, 8)} strokeDashoffset={-f} />
        {[[BANK[0], saves, 'SAVES?'], [TAX - 40, rules, 'RULES']].map(([x, at, t]) => <g key={t as string} opacity={on(f, at as number, 8)}><circle cx={x as number} cy={930} r={22} fill={P.gold} /><Label x={x as number} y={995} text={t as string} size={40} font="Bebas Neue" color={P.ink} /></g>)}
        <g opacity={on(f, maths, 8)}><Label x={IX + 80} y={995} text="OUR MATHS" size={40} font="Bebas Neue" color={P.ink} /></g>
        <path d={`M${BANK[0] + 180} 905 L${BANK[0] + 215} 930 L${BANK[0] + 195} 950 L${BANK[0] + 230} 975`} stroke={P.coral} strokeWidth={8} fill="none" opacity={on(f, breaks, 8)} />
        {/* # the presenter introduces the example investor */}
        <g opacity={on(f, today, 10)}><Person f={f} who="hero" beats={[[0, 'present', 'smiling'], [one, 'point', 'smiling'], [breaks, 'shrug', 'thinking']]} x={170} y={1190} s={1.1} life={2} /></g>
      </g>
      <Headline f={f} lines={[[zero, 'TAX PAID: $0', P.coralInk, 124], [none, 'AGAIN: $0', P.coralInk, 124], [richest, 'THE RICHEST PEOPLE ON EARTH', P.ink, 104],
        [rarely, 'THEY RARELY SELL', P.goldInk, 124], [borrow, 'THEY BORROW', P.goldInk, 130], [income, 'A LOAN IS NOT INCOME', P.ink, 112], [one, 'ONE EXAMPLE INVESTOR', P.ink, 112]]} />
      <Vignette id="bh2" />
    </g>
  )
}

const BEATS: string[] = ['s4:pay', 's4:little', 's4:rich', 's1', 's1:musk', 's1:zero', 's1:federal', 's2:bezos', 's2:in', 's2:none', 's2:in#2', 's3:richest', 's3:homes', 's3:jets', 's3:staff', 's3:pay',
  's5:answer', 's5:rarely', 's5:sell', 's5:cash', 's5:borrow', 's5:own', 's6:loan', 's6:income', 's6:back', 's6:no', 's7:today', 's7:one', 's7:plan', 's7:rules', 's7:maths', 's7:saves', 's7:breaks']
export const BB2_HOOK = makePiece('bb2-hook', 'Long (redrawn): night city — Musk/Bezos $0 bills from penthouses; vault of shares stays locked; bank bridge brings cash; loan signed; tax office dark', {
  mood: 'dark', Component: Hook, beats: BEATS,
  sfx: [['s1:zero', 'impact', 0.5], ['s2:none', 'thud', 0.4], ['s3:jets', 'whoosh', 0.4], ['s5:rarely', 'click', 0.4], ['s5:borrow', 'cash', 0.5], ['s6:no', 'ding', 0.4], ['s7:breaks', 'crack', 0.4]] })
