// ---------------------------------------------------------------- s8–s19 (redrawn 2026-10-31): two rooms, one tax office above them.
// LEFT a worker's flat: his paycheck comes through the door and its tax slice is cut off and sucked up a pipe BEFORE it
// reaches his hands ($70,000, 14%). RIGHT a rich owner's home: wealth is a framed share certificate that grows while the
// pipe's valve stays shut ($10 → $100 example: +$90, tax $0); the valve opens only on "sell". Then the owner's home becomes
// a skyline of 25 towers growing ($401B) with a trickle up to the tax office ($13.6B) → a 3.4% slice → a scale: tax paid vs
// how much richer; the towers' shares lock (never sold → never taxed).
import React from 'react'
import { easeInOut, lerp, on, P, span, Stage, Vignette } from '../kit'
import { Donut, Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, hand, Headline, Person, Pile, win } from '../aimoney/common'
import { Cert, FlipTag, Paycheck, Scale, TaxOffice } from './kit'
import { Pipe, Skyline } from './world'

const Room: React.FC<{ x0: number; x1: number; wall: string; floor: string }> = ({ x0, x1, wall, floor }) => (
  <g><rect x={x0} y={250} width={x1 - x0} height={650} fill={wall} /><rect x={x0} y={900} width={x1 - x0} height={300} fill={floor} /><rect x={x0} y={890} width={x1 - x0} height={14} fill="#000" opacity={0.08} /></g>
)
const Door: React.FC<{ x: number }> = ({ x }) => <g><rect x={x - 70} y={630} width={140} height={270} rx={8} fill="#8A5A34" /><rect x={x - 40} y={700} width={80} height={10} rx={4} fill="#5E3A1E" /><circle cx={x + 45} cy={780} r={8} fill={P.gold} /></g>
const Win: React.FC<{ x: number; y: number; w: number; h: number; children?: React.ReactNode }> = ({ x, y, w, h, children }) => (
  <g><rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={8} fill="#BFE0F5" stroke="#F7F1E1" strokeWidth={12} /><clipPath id={`w${x}`}><rect x={x - w / 2} y={y - h / 2} width={w} height={h} /></clipPath><g clipPath={`url(#w${x})`}>{children}</g></g>
)

const Taxed: React.FC<PieceProps> = ({ f, c }) => {
  // # word reaction: the named object swells briefly (0→1→0 over 14 frames) on its word
  const sw = (ks: string[], x: number, y: number, amt = 0.12) => { const v = Math.max(...ks.map((k) => { const t = f - c(k); return t >= 0 && t < 14 ? Math.sin(Math.PI * t / 14) : 0 })); return `translate(${x} ${y}) scale(${1 + amt * v}) translate(${-x} ${-y})` }
  const pay = c('s8:pay'), salary = c('s9:salary'), out = c('s9:out'), paycheck = c('s9:paycheck'), reaches = c('s9:reaches')
  const report = c('s10:propublica'), household = c('s10:household'), d70 = c('s10:70000'), d14 = c('s10:14'), taxes = c('s10:taxes')
  const rich = c('s11:rich'), salary11 = c('s11:salary'), shares = c('s11:shares'), companies = c('s11:companies')
  const rise = c('s12:rise'), richer = c('s12:richer'), noTax = c('s12:no'), yet = c('s12:yet')
  const buy = c('s12a:buy'), d10 = c('s12a:10'), d100 = c('s12a:100'), d90 = c('s12a:90'), sellA = c('s12a:sell'), owe = c('s12a:owe')
  const america = c('s13:america'), gain = c('s13:gain'), sell13 = c('s13:sell'), hold = c('s13:hold'), gain14 = c('s14:gain'), screen = c('s14:screen')
  const from = c('s15:from'), d25 = c('s15:25'), d401 = c('s15:401'), richer15 = c('s15:richer'), five = c('s16:five'), paid16 = c('s16:paid'), d136 = c('s16:136')
  const side = c('s17:side'), d34 = c('s17:34'), income18 = c('s18:income'), paid18 = c('s18:paid'), compared = c('s18:compared'), gap = c('s19:gap'), sold = c('s19:sold'), taxed19 = c('s19:taxed')
  const ROOMS = win(f, pay, from, 12), CITY = win(f, from, side, 12), DONUT = win(f, side, paid18, 12), SCALE = on(f, paid18, 12)
  const worker: Beat[] = [[0, 'idle', 'smiling'], [salary, 'receive', 'smiling'], [out, 'shock', 'worried'], [paycheck, 'countA', 'neutral', 'countB', 14], [reaches, 'receive', 'neutral'], [d14, 'facepalm', 'worried'], [rich, 'idle', 'neutral']]
  const owner: Beat[] = [[0, 'idle', 'neutral'], [rich, 'confident', 'smug'], [salary11, 'shrug', 'smug'], [shares, 'present', 'smiling'], [rise, 'pointUp', 'smiling'], [richer, 'celebrate', 'smiling'],
    [noTax, 'confident', 'smug'], [buy, 'explain', 'neutral'], [d90, 'fistPump', 'smiling'], [sell13, 'offer', 'neutral'], [hold, 'holdChest', 'smiling'], [screen, 'pointUp', 'smiling']]
  const wh = hand(f, worker, 520, 1000, 0.95)
  // # the paycheck slides in under the door, gets its slice cut, then lands in his hands
  const inT = easeInOut(span(f, salary, salary + 18)), toHand = easeInOut(span(f, reaches, reaches + 14))
  const px = lerp(lerp(230, 770, inT), wh.x + 40, toHand), py = lerp(lerp(800, 620, inT), wh.y + 10, toHand), ps = lerp(lerp(0.4, 0.75, inT), 0.4, toHand)
  const slice = easeInOut(span(f, out + 4, out + 26))
  return (
    <g>
      <Stage id="bt2" frame={f} />
      <g>
        {/* # ROOMS: the worker's flat (left) and the owner's home (right), the tax office above, a pipe to each */}
        <g opacity={ROOMS}>
          <Room x0={-200} x1={958} wall="#E9DCC6" floor="#C9A97E" />
          <Room x0={962} x1={2120} wall="#F3E9D2" floor="#D9B98A" />
          <rect x={950} y={250} width={20} height={950} fill="#B89A72" />
          <Door x={230} />
          <Win x={420} y={470} w={200} h={160} />
          {/* # his family photo on the wall ("household") and the newspaper on the table ("ProPublica") */}
          <g opacity={on(f, household, 8)}><rect x={630} y={400} width={150} height={120} rx={8} fill="#F7F1E1" stroke="#8A5A34" strokeWidth={8} />{[0, 1, 2].map((k) => <circle key={k} cx={665 + k * 40} cy={455} r={14} fill={['#3A6EA8', '#E9C25A', '#C94A3E'][k]} />)}</g>
          <rect x={300} y={820} width={200} height={16} rx={6} fill="#8A5A34" /><rect x={315} y={836} width={12} height={64} fill="#8A5A34" /><rect x={473} y={836} width={12} height={64} fill="#8A5A34" />
          <g opacity={on(f, report, 8)} transform="translate(400 806) rotate(-4)"><rect x={-60} y={-14} width={120} height={18} rx={3} fill="#F7FAFF" stroke="#C9D3E1" strokeWidth={2} /><rect x={-50} y={-10} width={40} height={4} fill="#5C6F8E" /></g>
          {/* # the owner's home: a big window with company towers outside, the framed certificate, a shelf with a jar, a TV */}
          <Win x={1160} y={580} w={280} h={220}>{[0, 1, 2, 3].map((k) => <rect key={k} x={1050 + k * 62} y={690 - lerp(40, 90 + k * 30, on(f, companies, 20))} width={44} height={200} fill="#3A6EA8" opacity={0.8} />)}</Win>
          <g transform={`translate(1600 520) scale(${lerp(0.95, 1.15, on(f, rise, 24))})`}>
            <rect x={-150} y={-105} width={300} height={210} rx={10} fill="#8A5A34" />
            <Cert x={0} y={0} s={1.05} />
            <rect x={-150} y={-105} width={300} height={210} rx={10} fill={P.gold} opacity={0.25 * on(f, shares, 10) * (1 - on(f, rise, 10)) + 0.2 * on(f, gain, 8) * (1 - on(f, sell13, 8))} />
          </g>
          {f >= d10 && <FlipTag x={1600} y={300} s={0.9} a="$10" b="$100" t={span(f, d100, d100 + 12)} o={on(f, d10, 8) * (1 - on(f, gain14, 8))} />}
          <rect x={1680} y={830} width={200} height={14} rx={6} fill="#8A5A34" />
          <g transform="translate(1780 830)"><rect x={-45} y={-120} width={90} height={120} rx={14} fill="#DDEBF7" opacity={0.55} stroke="#A9C4DE" strokeWidth={5} />{Array.from({ length: Math.round(8 * on(f, d90, 20) * (1 - on(f, sell13, 10) * 0)) }, (_, k) => <ellipse key={k} cx={0} cy={-14 - k * 13} rx={30} ry={8} fill={P.gold} stroke={P.goldD} strokeWidth={2} />)}</g>
          <g opacity={on(f, d90, 8) * (1 - on(f, gain14, 8))}><Label x={1780} y={670} text="+$90" size={62} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, gain14, 8)} transform="translate(1150 770)"><rect x={-130} y={-80} width={260} height={160} rx={10} fill="#1B2233" /><rect x={-118} y={-68} width={236} height={136} rx={6} fill="#22324D" />
            <Label x={0} y={18} text={`$${Math.round(lerp(100, 9999, span(f, screen, screen + 40))).toLocaleString('en-US')}`} size={64} font="Bebas Neue" color={P.mint} /></g>
          <TaxOffice x={960} y={420} s={0.5} eat={on(f, out + 10, 6) * (1 - on(f, reaches, 8)) + on(f, sell13 + 6, 6) * (1 - on(f, hold, 8))} />
          <Pipe a={[800, 540]} b={[900, 400]} f={f} open={1} flow={on(f, out, 8) * (1 - on(f, d14 + 60, 10)) + on(f, taxes, 8) * (1 - on(f, rich, 8))} />
          <Pipe a={[1600, 400]} b={[1040, 400]} f={f} open={on(f, sell13, 6) * (1 - on(f, hold, 8))} flow={on(f, sell13 + 4, 6) * (1 - on(f, hold, 8))} color={P.coral} />
          {/* # the valve says why: "not yet" while held, "$0" on the example */}
          <g opacity={on(f, yet, 8) * (1 - on(f, owe, 8))}><Label x={1320} y={490} text="NOT YET" size={36} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, owe, 8) * (1 - on(f, sell13, 8))}><Label x={1320} y={490} text="TAX $0" size={38} font="Bebas Neue" color={P.mintInk} /></g>
          {/* # the paycheck: in under the door → slice cut and pulled up the pipe → the rest into his hands */}
          {f >= salary && <g transform={`translate(${px} ${py}) scale(${ps})`}><Paycheck x={0} y={0} amount={f >= d70 ? '$70,000' : ''} cut={slice} slice={f >= d14 ? '14%' : ''} /></g>}
          <g opacity={on(f, d14, 8) * (1 - on(f, rich, 8))}><Label x={330} y={590} text="14% TAX" size={56} font="Bebas Neue" color={P.coralInk} /></g>
          {/* # the owner has no paycheck: an empty dotted outline by his hand */}
          <g opacity={on(f, salary11, 8) * (1 - on(f, shares, 8))}><rect x={1300} y={640} width={200} height={90} rx={10} fill="none" stroke={P.ink2} strokeWidth={4} strokeDasharray="10 8" /><path d="M1290 625 L1510 745" stroke={P.coral} strokeWidth={8} /></g>
          <Person f={f} who="worker" beats={worker} x={520} y={1000} s={0.95} />
          <Person f={f} who="owner" beats={owner} x={1420} y={1000} s={0.95} />
        </g>
        {/* # CITY: 25 towers rise for the 25 richest, grow to $401B; a thin trickle runs to the tax office ($13.6B) */}
        <g opacity={CITY}>
          <Skyline f={f} night={false} />
          <rect x={-200} y={880} width={2320} height={300} fill="#D9C4A0" />
          {Array.from({ length: 25 }, (_, k) => { const col = k % 5, row = Math.floor(k / 5), x = 560 + col * 150 + (row % 2) * 50, base = 880 - row * 18, h = lerp(120, 150 + (k * 37) % 100, on(f, d25 + k * 0.6, 14)) * lerp(1, 1.5, on(f, d401, 30))
            return <g key={k}><rect x={x - 40} y={base - h} width={80} height={h} rx={6} fill={lerp(0, 1, on(f, d401, 20)) > 0.5 ? P.gold : '#3A6EA8'} opacity={0.75 + row * 0.05} /><rect x={x - 40} y={base - h} width={80} height={10} fill={P.white} opacity={0.6} />{Array.from({ length: Math.floor(h / 40) }, (_, w) => <rect key={w} x={x - 26} y={base - h + 24 + w * 40} width={52} height={14} rx={3} fill={P.white} opacity={0.35} />)}</g> })}
          <g transform={sw(['s16:federal', 's16:tax'], 1640, 880, 0.15)}><TaxOffice x={1640} y={880} s={0.55} eat={on(f, paid16, 8)} /></g>
          <Pipe a={[1300, 760]} b={[1580, 700]} f={f} open={1} flow={on(f, paid16, 8) * 0.6} o={on(f, paid16, 8)} />
          <g transform={sw(['s16:income', 's17:propublica', 's17:set'], 1640, 640, 0.25)}><g opacity={on(f, d136, 8)}><Label x={1640} y={640} text="$13.6B TAX" size={56} font="Bebas Neue" color={P.coralInk} /></g></g>
          <g opacity={on(f, richer15, 8) * (1 - on(f, paid16, 8))}><circle cx={960} cy={700} r={300} fill={P.gold} opacity={0.08} /></g>
        </g>
        {/* # DONUT: the towers melt into a gold ring; the trickle becomes a thin coral slice: 3.4% */}
        <g opacity={DONUT}>
          <Skyline f={f} night={false} />
          <g transform={sw(['s17:called', 's17:true'], 960, 600, 0.08)}><Donut cx={960} cy={600} r={290} part={0.034} p={on(f, d34, 24)} color={P.coral} rest={P.gold} thick={90} /></g>
          <g opacity={on(f, d34, 8)}><Label x={960} y={630} text="3.4%" size={110} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, income18, 8)}><Label x={960} y={940} text="NOT A RATE ON INCOME" size={52} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* # SCALE: tax paid (a few coins) vs how much richer (a heap); the heap locks — never sold, never taxed */}
        <g opacity={SCALE}>
          <Skyline f={f} night={false} />
          <rect x={-200} y={880} width={2320} height={300} fill="#D9C4A0" />
          <Scale x={960} y={980} s={1.35 * (1 + 0.05 * Math.max(...['s18:richer', 's18:got', 's19:shows', 's19:most', 's19:wealth'].map((k) => { const t = f - c(k); return t >= 0 && t < 14 ? Math.sin(Math.PI * t / 14) : 0 })))} l={0.1} r={on(f, compared, 18)}>{[<Pile key="a" x={0} y={-10} n={2} s={0.9} />, <Pile key="b" x={0} y={-10} n={on(f, compared, 20) * 18} s={0.9} />]}</Scale>
          <Label x={640} y={420} text="TAX PAID" size={54} font="Bebas Neue" color={P.coralInk} o={on(f, paid18, 8)} />
          <Label x={1280} y={420} text="HOW MUCH RICHER" size={54} font="Bebas Neue" color={P.goldInk} o={on(f, compared, 8)} />
          <g opacity={on(f, gap, 8)}><path d="M720 600 L1200 600" stroke={P.coral} strokeWidth={6} strokeDasharray="14 10" /><Label x={960} y={580} text="THE GAP" size={48} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, sold, 8)} transform="translate(1284 520)"><rect x={-34} y={-10} width={68} height={56} rx={10} fill={P.gold} /><path d="M-20 -10 L-20 -34 A20 20 0 0 1 20 -34 L20 -10" stroke={P.gold} strokeWidth={10} fill="none" /></g>
          <TaxOffice x={1720} y={880} s={0.45} shut={on(f, taxed19, 8)} />
        </g>
      </g>
      {/* # the city's dates and total sit fixed under the headline (the zooming camera never pushes them into it) */}
      <g opacity={CITY}><g opacity={on(f, from, 8)}><Label x={960} y={250} text={f >= five ? '2014 – 2018 · 5 YEARS' : '2014 – 2018'} size={64} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, d401, 8)}><Label x={960} y={325} text="$401B RICHER" size={66} font="Bebas Neue" color={P.goldInk} /></g></g>
      <Headline f={f} lines={[[salary, 'A SALARY IS TAXED FIRST', P.coralInk, 112], [rich, 'THE RICH OWN SHARES', P.goldInk, 116], [noTax, 'NO TAX YET', P.mintInk, 130], [sell13, 'TAXED ONLY WHEN SOLD', P.ink, 112],
        [from, 'THE RICHEST AMERICANS', P.ink, 112], [d25, 'THE 25 RICHEST AMERICANS', P.ink, 104], [d34, 'A 3.4% "TRUE TAX RATE"', P.coralInk, 104], [compared, 'TAX PAID vs HOW MUCH RICHER', P.ink, 96], [sold, 'NEVER SOLD = NEVER TAXED', P.goldInk, 104]]} />
      <Vignette id="bt2" />
    </g>
  )
}

const BEATS: string[] = ['s19:most', 's19:wealth', 's17:called', 's17:true', 's18:richer', 's18:got', 's19:shows', 's16:federal', 's16:tax', 's16:income', 's17:propublica', 's17:set', 's9:reaches', 's10:household', 's10:70000', 's8:pay', 's9:salary', 's9:out', 's9:paycheck', 's9:reaches', 's10:propublica', 's10:household', 's10:70000', 's10:14', 's10:taxes', 's11:rich', 's11:salary', 's11:shares', 's11:companies',
  's12:rise', 's12:richer', 's12:no', 's12:yet', 's12a:buy', 's12a:10', 's12a:100', 's12a:90', 's12a:sell', 's12a:owe', 's13:america', 's13:gain', 's13:sell', 's13:hold', 's14:gain', 's14:screen',
  's15:from', 's15:25', 's15:401', 's15:richer', 's16:five', 's16:paid', 's16:136', 's17:side', 's17:34', 's18:income', 's18:paid', 's18:compared', 's19:gap', 's19:sold', 's19:taxed']
export const BB2_TAXED = makePiece('bb2-taxed', 'Long (redrawn): worker flat vs owner home under one tax office — paycheck taxed first ($70k, 14%); shares grow untaxed ($10→$100); 25 towers $401B vs $13.6B → 3.4% → scale', {
  mood: 'light', Component: Taxed, beats: BEATS,
  sfx: [['s9:out', 'swish', 0.4], ['s12a:100', 'ding', 0.4], ['s13:sell', 'click', 0.4], ['s15:401', 'riser', 0.3], ['s17:34', 'impact', 0.5], ['s19:sold', 'click', 0.4]] })
