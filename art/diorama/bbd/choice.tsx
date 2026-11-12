// ---------------------------------------------------------------- s20–s35a: the example investor — $10M of shares bought for $1M; wants $1M.
// Way one: sell $1M → $100K original money + $900K gain; 20% + 3.8% = 23.8% → ≈ $214K tax, keeps ≈ $786K, the sold shares are gone.
// Way two: borrow against the shares (securities-backed line of credit, 50–95% per FINRA, SOFR ≈ 3.9% + lender charge; example 6% → $60K a year);
// a loan is not income. $214K vs $60K; the million is paid back later (the cleverest part)
import React from 'react'
import { lerp, on, P, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, hand, fly, Headline, Person, Pile, Prop as Prop0, Stamp, win } from '../aimoney/common'
// # catalog props draw small at their nominal size; this story shows them big (owner r37: few objects, big)
const Prop: typeof Prop0 = (p) => <Prop0 {...p} size={p.size * 1.6} />
import { At, Chain, Example, Scale, Stack, Tag, TaxOffice , Accents, xcam, punch, type Acc } from './kit'

// # the one certificate she sells, split into what she paid (blue, 10%) and the gain (gold, 90%); `t` pulls the two apart
const SoldSlice: React.FC<{ x: number; y: number; t: number; bo?: number; go?: number }> = ({ x, y, t, bo = 1, go = 1 }) => (
  <g transform={`translate(${x} ${y})`}>
    <g opacity={bo} transform={`translate(${-t * 60} ${t * 40})`}><rect x={-250} y={-44} width={50} height={88} rx={10} fill="#7FB2E5" stroke="#3A6EA8" strokeWidth={4} /></g>
    <g opacity={go} transform={`translate(${t * 40} 0)`}><rect x={-190} y={-44} width={440} height={88} rx={10} fill={P.gold} stroke={P.goldD} strokeWidth={4} /></g>
  </g>
)

// # every cue that drives a drawing (the plan gate counts them; each one also punches the frame in)
const BEATS: string[] = ['s20:person', 's21:shares', 's25:gain#2', 's26:investment', 's27:900000', 's27a:from', 's28:again', 's30:loan', 's22:year', 's30:brokers', 's33:year', 's35a:how', 's20:this', 's20:example', 's26:earner', 's26:federal', 's21:10', 's21:shares', 's21:bought', 's21:1', 's22:live', 's22:two', 's23:one', 's23:sells', 's23:shares', 's35:year', 's24:ten', 's24:100000', 's24:original', 's25:900000', 's25:taxed',
    's26:20', 's26:38', 's27:238', 's27:214000', 's27:office', 's27a:keeps', 's27a:786000', 's28:gone', 's28:never', 's29:two', 's29:every', 's29:borrows', 's30:banks', 's30:line', 's30:stay', 's30:security',
    's31:finra', 's31:value', 's32:lender', 's31:50', 's31:95', 's32:interest', 's32:sofr', 's32:39', 's32:extra', 's33:6', 's33:loan', 's33:60000', 's34:not', 's34:no', 's35:214000', 's35:60000', 's35:cheaper', 's35a:paid', 's35a:day', 's35a:cleverest']
const Choice: React.FC<PieceProps> = ({ f, c }) => {
  const meet = c('s20:this'), example = c('s20:example'), d10 = c('s21:10'), shares = c('s21:shares'), bought = c('s21:bought'), d1 = c('s21:1')
  const shares23 = c('s23:shares'), year35 = c('s35:year'), live = c('s22:live'), two = c('s22:two'), one = c('s23:one'), sells = c('s23:sells'), ten = c('s24:ten'), d100k = c('s24:100000'), original = c('s24:original')
  const earner = c('s26:earner'), federal26 = c('s26:federal'), d900 = c('s25:900000'), taxed = c('s25:taxed'), d20 = c('s26:20'), d38 = c('s26:38'), d238 = c('s27:238'), d214 = c('s27:214000'), office = c('s27:office')
  const keeps = c('s27a:keeps'), d786 = c('s27a:786000'), gone = c('s28:gone'), never = c('s28:never')
  const two29 = c('s29:two'), every = c('s29:every'), borrows = c('s29:borrows'), banks = c('s30:banks'), line = c('s30:line'), stay = c('s30:stay'), security = c('s30:security')
  const value31 = c('s31:value'), lender32 = c('s32:lender'), finra = c('s31:finra'), d50 = c('s31:50'), d95 = c('s31:95'), interest = c('s32:interest'), sofr = c('s32:sofr'), d39 = c('s32:39'), extra = c('s32:extra')
  const d6 = c('s33:6'), loan33 = c('s33:loan'), d60 = c('s33:60000'), not34 = c('s34:not'), no34 = c('s34:no')
  const t214 = c('s35:214000'), t60 = c('s35:60000'), cheaper = c('s35:cheaper'), paid = c('s35a:paid'), day = c('s35a:day'), clever = c('s35a:cleverest')
  const A = win(f, c('s20'), one), B = win(f, one, two29), Cc = win(f, two29, t214), D = on(f, t214, 8)
  const hero: Beat[] = [[0, 'present', 'smiling'], [example, 'stop', 'neutral'], [two, 'countOne', 'neutral'], [one, 'pointUp', 'neutral'], [ten, 'explain', 'neutral'],
    [d900, 'point', 'neutral'], [d20, 'countOne', 'neutral'], [d214, 'shock', 'shocked'], [gone, 'facepalm', 'worried'], [two29, 'pointUp', 'smiling'], [line, 'explain', 'neutral'],
    [d50, 'explain', 'neutral'], [interest, 'explain', 'thinking'], [d60, 'countOne', 'neutral'], [no34, 'shrug', 'smug'], [t214, 'weighA', 'thinking', 'weighB', 30], [cheaper, 'thumbsUp', 'smiling'], [paid, 'explain', 'neutral'], [clever, 'pointUp', 'smiling']]
  const inv: Beat[] = [[0, 'idle', 'smiling'], [d10, 'present', 'smiling'], [live, 'think', 'thinking'], [two, 'scratchHead', 'thinking'], [sells, 'offer', 'neutral'], [d900, 'pointUp', 'neutral'], [d20, 'countOne', 'thinking'], [d238, 'think', 'worried'], [d214, 'shock', 'shocked'],
    [keeps, 'countA', 'worried', 'countB', 14], [gone, 'despair', 'worried'], [every, 'holdChest', 'smiling'], [borrows, 'handshake', 'smiling'], [line, 'signA', 'neutral', 'signB', 12], [stay, 'holdChest', 'smiling'],
    [d50, 'measure', 'thinking'], [loan33, 'receive', 'smiling'], [d60, 'offer', 'neutral'], [no34, 'fistPump', 'smug']]
  const hp = hand(f, inv, 960, 1040, 1.05)
  const banker: Beat[] = [[0, 'idle', 'neutral'], [banks, 'handshake', 'smiling'], [line, 'present', 'smiling'], [d39, 'explain', 'neutral'], [loan33, 'offer', 'smiling'], [d60, 'receive', 'smiling'], [no34, 'shrug', 'neutral']]
  const pull = span(f, ten, ten + 14)
  const toTax = fly(f, d214, [1500, 560], [1720, 900], 20, 120)
  const cashIn = fly(f, loan33 + 2, [1720, 720], [hp.x, hp.y], 20, 120), coinBack = fly(f, d60 + 4, [hp.x, hp.y], [1720, 720], 20, 100)
  const XC = xcam(c, [["s20:person",960,720,1.08],["s21:shares",1240,600,1.03],["s25:gain#2",1500,560,1.07],["s26:investment",1640,500,1.1],["s27:900000",1560,600,1.08],["s27a:from",1180,760,1.06],["s28:again",960,540,1],["s30:loan",1540,860,1.06]])
  const XA: Acc[] = [["s22:year","calendar",1480,420,100,"s22:two"],["s30:brokers","briefcase",1560,760,100,"s30:stay"],["s33:year","calendar",1540,640,80,"s34:no"],["s35a:how","question",1580,400,100,"s35a:cleverest"]]
  return (
    <g>
      <Stage id="bc" frame={f} tint="teal" />
      <Headline f={f} lines={[[d10, '$10M OF SHARES', P.goldInk, 124], [live, 'SHE NEEDS $1M', P.ink, 124], [one, 'WAY ONE: SELL', P.coralInk, 130], [d214, '≈ $214K TAX', P.coralInk, 136],
        [d786, 'SHE KEEPS ≈ $786K', P.ink, 120], [two29, 'WAY TWO: BORROW', P.mintInk, 130], [d50, 'BORROW 50%…', P.ink, 120], [d95, 'BORROW 50–95%', P.ink, 120], [d6, 'EXAMPLE RATE 6%', P.ink, 120], [no34, 'NO INCOME TAX', P.mintInk, 130],
        [t214, '$214K TAX', P.coralInk, 120], [t60, '$214K TAX OR $60K INTEREST', P.ink, 100], [paid, 'STILL OWED', P.goldInk, 130]]} />
      <g transform={punch(f, BEATS.map(c))}><g transform={camera(f, [...XC, [meet, 1240, 600, 1.03], [one, 1300, 600, 1.05], [two29, 960, 540, 1], [d50, 1300, 600, 1.05], [t214, 960, 540, 1]])}>
        {/* # A: the investor (EXAMPLE sticker), her stack of 10 certificates — the bottom one blue = the $1M she paid long ago; she needs $1M; a fork in the road */}
        <g opacity={A}>
          <Person f={f} who="investor" beats={inv} x={960} y={1040} s={1.05} o={on(f, meet, 8)} />
          <Example f={f} at={example} x={960} y={420} />
          <g opacity={on(f, d10, 6)}><Stack x={1420} y={1000} n={on(f, d10, 20) * 10} basis={f >= d1 ? 1 : 0} /><Tag f={f} at={shares} x={1420} y={650} text="$10M" size={80} color={P.goldInk} /></g>
          <At f={f} at={bought} x={1700} y={860} s={0.8}><Prop id="calendar" x={0} y={0} size={130} f={f} /></At>
          <Tag f={f} at={d1} x={1700} y={990} text="PAID $1M" size={52} color={P.skyInk} />
          <g opacity={on(f, live, 6) * (1 - on(f, two, 8))}><At f={f} at={live} x={1700} y={560}><Prop id="cash-stack" x={0} y={0} size={150} f={f} /></At></g>
          <g opacity={on(f, two, 6)} transform="translate(1700 560)"><path d="M0 120 L0 20 M0 20 L-90 -60 M0 20 L90 -60" stroke={P.ink2} strokeWidth={12} strokeLinecap="round" fill="none" /><path d="M-90 -60 l0 30 M-90 -60 l30 0" stroke={P.coralInk} strokeWidth={12} strokeLinecap="round" /><path d="M90 -60 l0 30 M90 -60 l-30 0" stroke={P.mintInk} strokeWidth={12} strokeLinecap="round" /></g>
        </g>
        {/* # B: she sells one certificate ($1M): 1/10 of it is her original money ($100K, blue), the rest gain ($900K, gold); the tax office bites 23.8% (≈ $214K);
            # she keeps ≈ $786K; the gap in her stack stays empty */}
        <g opacity={B}>
          <Person f={f} who="investor" beats={inv} x={960} y={1040} s={1.05} />
          <Stack x={1420} y={1000} n={9} basis={1} />
          <g opacity={on(f, shares23, 6) * (1 - on(f, d100k, 8))}><circle cx={1420} cy={830} r={210} fill={P.gold} opacity={0.15} /></g>
          <g opacity={on(f, gone, 6)}><rect x={1295} y={1000 - 9 * 26 - 62} width={250} height={44} rx={8} fill="none" stroke={P.coralInk} strokeWidth={4} strokeDasharray="12 10" /></g>
          <g opacity={on(f, sells, 6) * (1 - on(f, keeps, 8))}><SoldSlice x={lerp(1420, 1560, on(f, sells, 14))} y={lerp(700, 600, on(f, sells, 14))} t={pull} bo={1} go={1 - 0.24 * on(f, d214, 10)} /></g>
          <Tag f={f} at={ten} x={1500} y={440} text="×10" size={70} color={P.goldInk} o={1 - on(f, d100k, 6)} />
          <Tag f={f} at={d100k} x={1270} y={520} text="$100K" size={56} color={P.skyInk} o={1 - on(f, keeps, 6)} />
          <Tag f={f} at={original} x={1270} y={470} text="PAID" size={44} color={P.ink2} o={1 - on(f, keeps, 6)} />
          <Tag f={f} at={d900} x={1560} y={460} text="$900K GAIN" size={60} color={P.goldInk} o={1 - on(f, d20, 6)} />
          <g opacity={on(f, earner, 6) * (1 - on(f, d20, 6))}><At f={f} at={earner} x={1720} y={600}><Prop id="crown" x={0} y={0} size={90} f={f} /></At></g>
          <Tag f={f} at={federal26} x={1820} y={380} text="FEDERAL" size={44} color={P.ink2} o={1 - on(f, keeps, 6)} />
          <At f={f} at={taxed} x={1720} y={980} s={0.6}><TaxOffice x={0} y={0} eat={span(f, d214, d214 + 14)} /></At>
          <g opacity={on(f, d20, 6) * (1 - on(f, keeps, 8))}><Tag f={f} at={d20} x={1560} y={460} text="20%" size={70} color={P.coralInk} o={1 - on(f, d238, 6)} /><Tag f={f} at={d38} x={1700} y={460} text="+3.8%" size={60} color={P.coralInk} o={1 - on(f, d238, 6)} />
            <Tag f={f} at={d238} x={1600} y={460} text="23.8%" size={80} color={P.coralInk} /></g>
          {toTax.o > 0 && <g opacity={toTax.o} transform={`translate(${toTax.x} ${toTax.y})`}><Pile x={0} y={0} n={5} s={0.7} /></g>}
          <Tag f={f} at={office} x={1720} y={760} text="$214K" size={56} color={P.coralInk} />
          <g opacity={on(f, keeps, 6) * (1 - on(f, gone, 8))}><Prop id="cash-stack" x={hp.x} y={hp.y} size={80} f={f} /><Tag f={f} at={d786} x={1180} y={880} text="$786K" size={64} color={P.mintInk} /></g>
          <At f={f} at={never} x={1660} y={560}><Prop id="arrow-up" x={0} y={0} size={120} f={f} /><path d="M-70 -70 L70 70" stroke={P.coral} strokeWidth={14} strokeLinecap="round" /></At>
        </g>
        {/* # C: way two — the whole stack, locked and chained to a bank (line of credit); a gauge 50–95%; SOFR 3.9% + lender charge = example 6%;
            # $1M cash to her, $60K interest back a year; no income tax stamp */}
        <g opacity={Cc}>
          <Person f={f} who="investor" beats={inv} x={960} y={1040} s={1.05} />
          <At f={f} at={two29} x={1320} y={1000}><Stack x={0} y={0} n={10} basis={1} /></At>
          <g opacity={on(f, every, 6) * (1 - on(f, banks, 8))}><circle cx={1320} cy={850} r={190} fill={P.mint} opacity={0.14} /></g>
          <At f={f} at={security} x={1320} y={600}><Prop id="padlock" x={0} y={0} size={110} f={f} /></At>
          <g opacity={on(f, banks, 6)}><Person f={f} who="owner" beats={banker} x={1720} y={1040} s={0.95} /><At f={f} at={banks} x={1720} y={360}><Prop id="bank" x={0} y={0} size={110} f={f} /></At></g>
          <g opacity={on(f, line, 6)}><Chain a={[1450, 940]} b={[1640, 940]} t={span(f, line, line + 14)} /></g>
          <Tag f={f} at={stay} x={1320} y={1060} text="STILL HERS" size={46} color={P.mintInk} />
          <g opacity={on(f, d50, 6) * (1 - on(f, interest, 8))} transform="translate(1520 1000)">
            <rect x={-26} y={-300} width={52} height={300} rx={12} fill={P.card} /><rect x={-26} y={-300 * lerp(0.5, 0.95, span(f, d95, d95 + 14))} width={52} height={300 * lerp(0.5, 0.95, span(f, d95, d95 + 14))} rx={12} fill={P.mint} opacity={on(f, d50, 10)} />
            <Tag f={f} at={d50} x={70} y={-130} text="50%" size={44} /><Tag f={f} at={d95} x={70} y={-270} text="95%" size={44} /></g>
          <g opacity={on(f, value31, 6) * (1 - on(f, interest, 8))}><circle cx={1320} cy={850} r={190} fill={P.mint} opacity={0.14} /></g>
          <g opacity={on(f, lender32, 6) * (1 - on(f, loan33, 8))}><circle cx={1720} cy={360} r={90} fill={P.gold} opacity={0.25 + 0.1 * Math.sin(f / 5)} /></g>
          <At f={f} at={finra} x={1520} y={420} s={0.8} o={1 - on(f, interest, 8)}><Prop id="shield" x={0} y={0} size={90} f={f} /></At>
          <g opacity={on(f, interest, 6) * (1 - on(f, loan33, 8))}>
            <At f={f} at={interest} x={1520} y={560}><Prop id="interest-percent" x={0} y={0} size={90} f={f} /></At>
            <Tag f={f} at={sofr} x={1520} y={710} text="SOFR" size={52} /><Tag f={f} at={d39} x={1520} y={770} text="≈ 3.9%" size={56} color={P.skyInk} /><Tag f={f} at={extra} x={1520} y={830} text="+ LENDER" size={48} color={P.ink2} />
            <Tag f={f} at={d6} x={1520} y={430} text="= 6%" size={70} color={P.goldInk} />
          </g>
          {cashIn.t < 1 && cashIn.o > 0 && <g opacity={cashIn.o} transform={`translate(${cashIn.x} ${cashIn.y})`}><Prop id="cash-stack" x={0} y={0} size={90} f={f} /></g>}
          {cashIn.t >= 1 && f < d60 && <Prop id="cash-stack" x={hp.x} y={hp.y} size={90} f={f} />}
          <Tag f={f} at={loan33} x={1200} y={480} text="$1M LOAN" size={56} color={P.goldInk} o={1 - on(f, not34, 6)} />
          {coinBack.o > 0 && <g opacity={coinBack.o} transform={`translate(${coinBack.x} ${coinBack.y})`}><Pile x={0} y={0} n={2} s={0.7} /></g>}
          <Tag f={f} at={d60} x={1540} y={540} text="$60K A YEAR" size={52} color={P.coralInk} o={1 - on(f, not34, 6)} />
          <At f={f} at={not34} x={1540} y={600} s={0.9}><Prop id="tax-form" x={0} y={0} size={140} f={f} /><path d="M-70 -80 L70 80" stroke={P.coral} strokeWidth={14} strokeLinecap="round" /></At>
          <Stamp x={1180} y={300} text="$0 TAX" f={f} at={no34} size={56} />
        </g>
        {/* # D: the scale — $214K of tax (tall pile) against $60K of interest (small pile); a tick for borrowing; an hourglass (still owed) and a key (the clever part) */}
        <g opacity={D}>
          <g opacity={1 - on(f, paid, 8)}>
            <Scale x={1260} y={1010} s={1.25} l={on(f, t214, 12)} r={on(f, t60, 12) * 0.3}>{[<Pile key="a" x={0} y={-10} n={on(f, t214, 12) * 14} s={0.8} />, <Pile key="b" x={0} y={-10} n={on(f, t60, 12) * 4} s={0.8} />]}</Scale>
            <Tag f={f} at={t214} x={960} y={500} text="TAX $214K" size={60} color={P.coralInk} /><Tag f={f} at={t60} x={1560} y={500} text="INTEREST $60K" size={60} color={P.mintInk} />
            <At f={f} at={year35} x={1260} y={330} s={0.7}><Prop id="calendar" x={0} y={0} size={110} f={f} /></At>
            <At f={f} at={cheaper} x={1560} y={400}><Prop id="tick" x={0} y={0} size={100} f={f} /></At>
          </g>
          <g opacity={on(f, paid, 6)}>
            <At f={f} at={paid} x={1140} y={640}><Prop id="contract" x={0} y={0} size={220} f={f} /></At>
            <At f={f} at={day} x={1440} y={640}><Prop id="hourglass" x={0} y={0} size={200} f={f} /></At>
            <At f={f} at={clever} x={1720} y={640}><Prop id="key" x={0} y={0} size={200} f={f} /></At>
          </g>
        </g>
        <Accents f={f} c={c} list={XA} Prop={Prop} />
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g></g>
      <Vignette id="bc" />
    </g>
  )
}

export const BB_CHOICE = makePiece('bb-choice', 'Long: example $10M shares ($1M paid); sell $1M → $900K gain × 23.8% ≈ $214K tax; or borrow (SBLOC, 50–95%, example 6%) → $60K interest, no income tax', { mood: 'light', Component: Choice,
  beats: BEATS,
  sfx: [['s23:sells', 'swish', 0.4], ['s27:214000', 'cash', 0.5], ['s28:gone', 'thud', 0.4], ['s30:line', 'click', 0.4], ['s33:loan', 'cash', 0.5], ['s35:cheaper', 'ding', 0.4], ['s35a:cleverest', 'chime', 0.4]] })
