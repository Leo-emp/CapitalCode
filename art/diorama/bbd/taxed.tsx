// ---------------------------------------------------------------- s8–s19: a salary is taxed before it reaches you (typical household ≈ $70,000, ≈ 14%);
// the rich hold shares; a rise is not taxed until you sell ($10 → $100 example); the 25 richest got ≈ $401B richer 2014–18 and paid ≈ $13.6B
// (ProPublica "true tax rate" 3.4% = tax paid ÷ wealth growth); most new wealth was never sold, so never taxed
import React from 'react'
import { lerp, on, P, span, Stage, Vignette, Pedestal } from '../kit'
import { Donut } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, fly, Headline, Person, Pile, Prop as Prop0, Stamp, win } from '../aimoney/common'
// # catalog props draw small at their nominal size; this story shows them big (owner r37: few objects, big)
const Prop: typeof Prop0 = (p) => <Prop0 {...p} size={p.size * 1.6} />
import { At, Cert, FlipTag, Paycheck, Scale, Stack, Tag, TaxOffice , Accents, xcam, punch, type Acc } from './kit'

// # every cue that drives a drawing (the plan gate counts them; each one also punches the frame in)
const BEATS: string[] = ['s10:federal', 's12a:90#2', 's17:called', 's18:richer', 's14:gain', 's19:wealth', 's8:pay', 's9:salary', 's9:out', 's9:paycheck', 's9:reaches', 's10:propublica', 's10:household', 's10:70000', 's10:14', 's11:rich', 's11:salary', 's11:shares', 's11:companies',
    's12:rise', 's12:richer', 's12:no', 's12:yet', 's12a:buy', 's12a:10', 's12a:100', 's12a:90', 's12a:sell', 's12a:owe', 's13:america', 's13:gain', 's13:sell', 's13:hold', 's14:number', 's14:screen',
    's15:from', 's15:25', 's15:401', 's15:richer', 's16:federal', 's17:propublica', 's16:five', 's16:paid', 's16:136', 's17:side', 's17:34', 's18:income', 's18:paid', 's18:compared', 's19:gap', 's19:sold', 's19:taxed']
const Taxed: React.FC<PieceProps> = ({ f, c }) => {
  const most = c('s8:pay'), salary = c('s9:salary'), out = c('s9:out'), paycheck = c('s9:paycheck'), reaches = c('s9:reaches')
  const report = c('s10:propublica'), household = c('s10:household'), d70 = c('s10:70000'), d14 = c('s10:14')
  const rich = c('s11:rich'), salary11 = c('s11:salary'), shares = c('s11:shares'), companies = c('s11:companies')
  const rise = c('s12:rise'), richer = c('s12:richer'), noTax = c('s12:no'), yet = c('s12:yet')
  const buy = c('s12a:buy'), d10 = c('s12a:10'), d100 = c('s12a:100'), d90 = c('s12a:90'), sellA = c('s12a:sell'), owe = c('s12a:owe')
  const america = c('s13:america'), gain = c('s13:gain'), sell13 = c('s13:sell'), hold = c('s13:hold'), number = c('s14:number'), screen = c('s14:screen')
  const fed16 = c('s16:federal'), pp17 = c('s17:propublica'), richer15 = c('s15:richer'), paid16 = c('s16:paid'), y14 = c('s15:from') + 10, d25 = c('s15:25'), d401 = c('s15:401'), five = c('s16:five'), d136 = c('s16:136'), side = c('s17:side'), d34 = c('s17:34')
  const income18 = c('s18:income'), paid18 = c('s18:paid'), compared = c('s18:compared'), gap = c('s19:gap'), sold19 = c('s19:sold'), taxed19 = c('s19:taxed')
  const A = win(f, c('s8'), rich), B = win(f, rich, gain), Cc = win(f, gain, c('s15')), D = win(f, c('s15'), income18), E = on(f, income18, 8)
  const hero: Beat[] = [[0, 'present', 'neutral'], [salary, 'explain', 'neutral'], [out, 'facepalm', 'worried'], [d14, 'countOne', 'neutral'],
    [rich, 'present', 'neutral'], [rise, 'pointUp', 'smiling'], [noTax, 'stop', 'neutral'], [d10, 'explain', 'neutral'], [d90, 'celebrate', 'smiling'], [owe, 'shrug', 'smug'],
    [gain, 'explain', 'neutral'], [hold, 'holdChest', 'neutral'], [d25, 'present', 'neutral'], [d401, 'shock', 'shocked'], [d136, 'pointDown', 'neutral'], [d34, 'facepalm', 'worried'],
    [income18, 'stop', 'neutral'], [compared, 'weighA', 'thinking', 'weighB', 30], [gap, 'explain', 'neutral'], [taxed19, 'shrug', 'thinking']]
  const worker: Beat[] = [[0, 'idle', 'smiling'], [paycheck, 'countA', 'smiling', 'countB', 14], [out, 'shock', 'worried'], [reaches, 'receive', 'neutral'], [d14, 'facepalm', 'worried']]
  const owner: Beat[] = [[0, 'confident', 'smug'], [salary11, 'shrug', 'smug'], [shares, 'present', 'smiling'], [richer, 'celebrate', 'smiling'], [noTax, 'confident', 'smug'], [yet, 'pointUp', 'smug']]
  const sliceT = span(f, out, out + 18)
  const XC = xcam(c, [["s10:federal",1620,820,1.08],["s12a:90#2",1400,820,1.08],["s17:called",1260,640,1.06],["s18:richer",1240,800,1.05]])
  const XA: Acc[] = [["s14:gain","magnifier",1560,440,110,"s14:screen"],["s19:wealth","money-bag",1640,600,130,"s19:taxed"]]
  return (
    <g>
      <Stage id="bt" frame={f} />
      <Headline f={f} lines={[[salary, 'A SALARY', P.ink, 130], [out, 'TAXED FIRST', P.coralInk, 136], [d70, 'TYPICAL HOUSEHOLD', P.ink, 116],
        [shares, 'WEALTH IN SHARES', P.goldInk, 120], [noTax, 'NO TAX YET', P.mintInk, 136], [sell13, 'TAXED ONLY WHEN SOLD', P.ink, 116],
        [d25, 'THE 25 RICHEST AMERICANS', P.ink, 104], [d34, 'A 3.4% "TRUE TAX RATE"', P.coralInk, 104], [compared, 'TAX ÷ HOW MUCH RICHER', P.ink, 100], [sold19, 'NEVER SOLD = NEVER TAXED', P.goldInk, 104]]} />
      <g transform={punch(f, BEATS.map(c))}><g transform={camera(f, [...XC, [salary, 1240, 620, 1.04], [rich, 960, 540, 1], [d10, 1240, 640, 1.06], [gain, 960, 540, 1], [d25, 1200, 600, 1.02], [income18, 960, 540, 1]])}>
        {/* # A: a crowd of three; a worker's paycheck — the tax slice is cut off and flies into the tax office before the rest reaches the worker */}
        <g opacity={A}>
          <g opacity={on(f, most, 6) * (1 - on(f, salary, 8))}>{['buyer', 'worker', 'owner'].map((w, k) => <g key={w}><Pedestal x={1000 + k * 280} y={1000} r={100} /><Person f={f} who={w} beats={[[0, 'idle', 'smiling']]} x={1000 + k * 280} y={1000} s={0.75} /></g>)}</g>
          <g opacity={on(f, salary, 6)}>
            <Person f={f} who="worker" beats={worker} x={1000} y={1040} s={1.05} />
            <At f={f} at={paycheck} x={1300} y={560} s={1}><Paycheck x={0} y={0} amount={f >= d70 ? '$70,000' : ''} cut={sliceT} slice={f >= d14 ? '14%' : ''} /></At>
            <At f={f} at={out} x={1700} y={960} s={0.8}><TaxOffice x={0} y={0} eat={span(f, out + 10, out + 20)} /></At>
            <At f={f} at={report} x={1660} y={360} s={0.9}><Prop id="newspaper" x={0} y={0} size={150} f={f} /></At>
            <At f={f} at={household} x={1380} y={860} s={0.9}><Prop id="family" x={0} y={0} size={170} f={f} /></At>
          </g>
        </g>
        {/* # B: no salary — shares of companies; the pile rises, the owner gets richer, the tax office stays shut; the $10 share becomes $100 */}
        <g opacity={B}>
          <g opacity={1 - on(f, buy, 8)}>
            <At f={f} at={salary11} x={1300} y={480} s={0.6} o={1 - on(f, shares, 8)}><Paycheck x={0} y={0} /><path d="M-260 -110 L200 110" stroke={P.coral} strokeWidth={16} strokeLinecap="round" /></At>
            <At f={f} at={companies} x={1660} y={560} o={1 - on(f, richer, 8)}><Prop id="skyscraper" x={0} y={0} size={260} f={f} /></At>
            <g opacity={on(f, shares, 6)}><Stack x={1300} y={980} n={lerp(3, 12, span(f, rise, rise + 30))} /></g>
            <At f={f} at={rise} x={1490} y={560}><Prop id="arrow-up" x={0} y={0} size={140} f={f} /></At>
            <g opacity={on(f, rich, 6)}><Person f={f} who="owner" beats={owner} x={1000} y={1040} s={0.95} /></g>
            <At f={f} at={noTax} x={1720} y={980} s={0.55}><TaxOffice x={0} y={0} shut={on(f, noTax, 8)} /></At>
            <At f={f} at={yet} x={1680} y={600}><Prop id="hourglass" x={0} y={0} size={120} f={f} /></At>
          </g>
          <g opacity={on(f, buy, 6)}>
            <At f={f} at={buy} x={1100} y={640} s={1.2}><Cert x={0} y={0} /></At>
            <g opacity={on(f, d10, 6)}><FlipTag x={1400} y={500} a="$10" b="$100" t={span(f, d100, d100 + 12)} /></g>
            <g opacity={on(f, d90, 6)}><Pile x={1400} y={860} n={on(f, d90, 18) * 12} s={0.9} /><Tag f={f} at={d90} x={1400} y={940} text="+$90" size={64} color={P.mintInk} /></g>
            <At f={f} at={sellA} x={1680} y={980} s={0.5}><TaxOffice x={0} y={0} shut={1} /></At>
            <Stamp x={1680} y={760} text="TAX $0" f={f} at={owe} size={56} />
            <At f={f} at={america} x={1100} y={400}><Prop id="globe" x={0} y={0} size={110} f={f} /></At>
          </g>
        </g>
        {/* # C: sell → the tax office takes its bite; hold → nothing happens, just a number climbing on a screen */}
        <g opacity={Cc}>
          <g opacity={1 - on(f, number, 8)}>
            <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [sell13, 'offer', 'neutral'], [hold, 'holdChest', 'smiling']]} x={1000} y={1040} s={1.05} />
            <At f={f} at={gain} x={1320} y={520}><Cert x={0} y={0} s={0.9} /></At>
            <At f={f} at={sell13} x={1680} y={900} s={0.7}><TaxOffice x={0} y={0} eat={span(f, sell13 + 6, sell13 + 16)} /></At>
            {(() => { const k = fly(f, sell13 + 4, [1320, 640], [1680, 820], 18, 100); return k.o > 0 ? <g opacity={k.o} transform={`translate(${k.x} ${k.y})`}><Prop id="coin" x={0} y={0} size={70} f={f} /></g> : null })()}
            <At f={f} at={hold} x={1320} y={760}><Prop id="tick" x={0} y={0} size={110} f={f} /></At>
          </g>
          <g opacity={on(f, number, 6)}>
            <At f={f} at={number} x={1260} y={620} s={1.6}><Prop id="laptop" x={0} y={0} size={260} f={f} /></At>
            <Tag f={f} at={screen} x={1260} y={560} text={`$${Math.round(lerp(1000, 9999, span(f, screen, screen + 40))).toLocaleString('en-US')}`} size={84} color={P.mintInk} />
          </g>
        </g>
        {/* # D: 25 richest on pedestals; their wealth pile grows to $401B; the tax they paid is a small pile ($13.6B); a donut with a 3.4% slice */}
        <g opacity={D}>
          <g opacity={on(f, d25, 6) * (1 - on(f, d401, 10))}>{Array.from({ length: 25 }, (_, k) => <g key={k} opacity={on(f, d25 + k * 0.6, 4)}><Pedestal x={940 + (k % 5) * 190} y={420 + Math.floor(k / 5) * 140} r={42} /><circle cx={940 + (k % 5) * 190} cy={392 + Math.floor(k / 5) * 140} r={20} fill={P.gold} /></g>)}</g>
          <g opacity={1 - on(f, d25, 8)}><At f={f} at={y14} x={1260} y={600}><Prop id="calendar" x={0} y={0} size={200} f={f} /></At><Tag f={f} at={y14} x={1260} y={860} text="2014 – 2018" size={80} color={P.goldInk} /></g>
          <g opacity={on(f, d401, 6) * (1 - on(f, d34, 10))}><Pile x={1080} y={960} n={on(f, d401, 30) * 36} s={1.3} /><Tag f={f} at={d401} x={1080} y={540} text="$401B RICHER" size={70} color={P.goldInk} /></g>
          <g opacity={on(f, d136, 6) * (1 - on(f, d34, 10))}><Pile x={1600} y={960} n={2} s={1.3} /><Tag f={f} at={d136} x={1600} y={860} text="$13.6B TAX" size={64} color={P.coralInk} /></g>
          <Tag f={f} at={five} x={1720} y={420} text="5 YEARS" size={52} />
          <Tag f={f} at={fed16} x={1600} y={1050} text="FEDERAL" size={40} color={P.ink2} o={1 - on(f, d34, 10)} />
          <At f={f} at={pp17} x={1440} y={400} s={0.8} o={1 - on(f, d34, 10)}><Prop id="newspaper" x={0} y={0} size={130} f={f} /></At>
          <g opacity={on(f, richer15, 6) * (1 - on(f, d34, 10))}><circle cx={1080} cy={800} r={200} fill={P.gold} opacity={0.12 + 0.05 * Math.sin(f / 6)} /></g>
          <At f={f} at={paid16} x={1600} y={700} s={0.4} o={1 - on(f, d34, 10)}><TaxOffice x={0} y={0} /></At>
          <g opacity={on(f, d34, 6)}><Donut cx={1260} cy={640} r={240} part={0.034} p={on(f, d34, 20)} color={P.coral} /><Tag f={f} at={d34} x={1260} y={666} text="3.4%" size={110} color={P.coralInk} /></g>
          <g opacity={on(f, side, 6) * (1 - on(f, d34, 8))}><path d="M1340 940 L1340 700" stroke={P.ink2} strokeWidth={4} strokeDasharray="10 10" /></g>
        </g>
        {/* # E: not the rate on income (paycheck crossed); tax paid vs how much richer on a scale; the gap; shares locked = never sold, never taxed */}
        <g opacity={E}>
          <g opacity={1 - on(f, gap, 8)}>
            <At f={f} at={income18} x={1600} y={420} s={0.55}><Paycheck x={0} y={0} /><path d="M-260 -110 L200 110" stroke={P.coral} strokeWidth={16} strokeLinecap="round" /></At>
            <g opacity={on(f, paid18, 6)}><Scale x={1240} y={1000} s={1} l={on(f, paid18, 10) * 0.1} r={on(f, compared, 16)}>{[<Pile key="a" x={0} y={-10} n={2} s={0.8} />, <Pile key="b" x={0} y={-10} n={on(f, compared, 16) * 15} s={0.8} />]}</Scale></g>
            <Tag f={f} at={paid18} x={1000} y={1050} text="TAX PAID" size={52} />
            <Tag f={f} at={compared} x={1480} y={1050} text="HOW MUCH RICHER" size={52} />
          </g>
          <g opacity={on(f, gap, 6)}>
            <At f={f} at={gap} x={1240} y={960}><Stack x={0} y={0} n={14} /></At>
            <At f={f} at={sold19} x={1240} y={480}><Prop id="padlock" x={0} y={0} size={150} f={f} /></At>
            <At f={f} at={taxed19} x={1640} y={960} s={0.6}><TaxOffice x={0} y={0} shut={1} /></At>
          </g>
        </g>
        <Accents f={f} c={c} list={XA} Prop={Prop} />
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g></g>
      <Vignette id="bt" />
    </g>
  )
}

export const BB_TAXED = makePiece('bb-taxed', 'Long: salary taxed first (≈ $70k, ≈ 14%); shares not taxed until sold ($10 → $100 example); 25 richest ≈ $401B richer vs ≈ $13.6B tax = 3.4%', { mood: 'light', Component: Taxed,
  beats: BEATS,
  sfx: [['s9:out', 'swish', 0.4], ['s12a:100', 'ding', 0.4], ['s15:401', 'coin', 0.5], ['s17:34', 'impact', 0.5], ['s19:sold', 'click', 0.4]] })
