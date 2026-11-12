// ---------------------------------------------------------------- s45–s55: step four, ETFs (cream).
// A) The purple ETF parcel (a fund, packaged differently) slides onto a STOCK EXCHANGE: its shares trade like a
//    company's. Left: the mutual-fund clock with ONE dot at the close; right: the exchange board's line moving all
//    day; Sam taps BUY / SELL on a phone whenever the OPEN sign is lit.
// B) Growth: the bar of US fund money now shows the purple ETF part, $13 TRILLION, and +$1.5 TRILLION in 2025 — a
//    record year.
// C) The good parts (ticks): most ETF money follows an index → many are very cheap; start with one share; most show
//    what they own every day; usually fewer surprise tax bills (shares swapped behind the scenes — a little curtain).
// D) The downsides (crosses): trading all day tempts Sam to tap far too often; the SPREAD between a BUY and a SELL
//    price tag; the price bobbing above / below the value of what the ETF owns; a parcel opened under a
//    magnifier — complicated, expensive strategies: CHECK WHAT'S INSIDE.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Doc, Headline, Label, Person, Phone, Stat, Tick, win, type Beat } from '../aimoney/common'
import { Ground, Magnifier } from '../power/kit2'
import { Tag } from '../money4/kit'
import { Company } from '../invest/kit'
import { Board, DayClock, Parcel, Pot } from './kit'

const GROUND = 930
const K = {
  stands: 's45:stands', exchange45: 's45:exchangetraded', funds45: 's45:funds',
  etf46: 's46:etf', fund46: 's46:fund', packaged: 's46:packaged', differently: 's46:differently', shares46: 's46:shares', trade46: 's46:trade', stock46: 's46:stock', exchange46: 's46:exchange', like46: 's46:like', company46: 's46:company',
  instead: 's47:instead', one47: 's47:one', price47: 's47:price', end47: 's47:end', day47: 's47:day', moves47: 's47:moves', all47: 's47:all', long47: 's47:long', buy47: 's47:buy', sell47: 's47:sell', whenever: 's47:whenever', open47: 's47:open',
  grown: 's48:grown', fast: 's48:fast', k13: 's48:13', trillion48: 's48:trillion', y2025: 's48:2025', year48: 's48:year', alone: 's48:alone', investors48: 's48:investors', record: 's48:record', k15: 's48:5', trillion48b: 's48:trillion#2',
  good49: 's49:good', most49: 's49:most', money49: 's49:money', index49: 's49:index', many49: 's49:many', cheap: 's49:cheap',
  start: 's50:start', one50: 's50:one', share50: 's50:share', show: 's50:show', own50: 's50:own', day50: 's50:day',
  taxable: 's51:taxable', etfs51: 's51:etfs', fewer: 's51:fewer', tax51: 's51:tax', mutual51: 's51:mutual', because51: 's51:because', created: 's51:created', swapped: 's51:swapped', scenes: 's51:scenes',
  downsides: 's52:downsides', moves52: 's52:moves', tempting: 's52:tempting', buy52: 's52:buy', sell52: 's52:sell', often: 's52:often',
  trade53: 's53:trade', gap: 's53:gap', buying: 's53:buying', selling: 's53:selling', called53: 's53:called', spread: 's53:spread',
  pay: 's54:pay', little: 's54:little', above: 's54:above', below: 's54:below', value54: 's54:value', owns54: 's54:owns',
  not55: 's55:not', simple55: 's55:simple', index55: 's55:index', some55: 's55:some', complicated: 's55:complicated', expensive: 's55:expensive', always: 's55:always', check: 's55:check', inside: 's55:inside',
}
type Key = keyof typeof K

// # a small stock-exchange hall (columns + roof) for the ETF to sit in
const Exchange: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-300} y={-30} width={600} height={30} fill="#CFC3AA" /><rect x={-270} y={-330} width={540} height={300} fill="#EFE6D2" />
    {[-210, -105, 0, 105, 210].map((cx) => <rect key={cx} x={cx - 16} y={-320} width={32} height={290} fill="#FFFFFF" />)}
    <path d="M-300 -330 L0 -430 L300 -330 Z" fill="#E2D8C2" /><Label x={0} y={-350} text="STOCK EXCHANGE" size={34} font="Bebas Neue" color="#16294A" />
  </g>
)

const Etf: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.grown - 8, BC = q.good49 - 8, CD = q.downsides - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = win(f, BC, CD), D = on(f, CD, 10)
  const sam: Beat[] = [[q.instead, 'idle', 'neutral'], [q.buy47, 'phone', 'smiling'], [q.open47, 'thumbsUp', 'smiling'],
    [CD, 'idle', 'neutral'], [q.tempting, 'phone', 'smug', 'type'], [q.often, 'facepalm', 'worried'], [q.trade53, 'idle', 'neutral'], [q.spread, 'point', 'neutral'], [q.check, 'idle', 'thinking']]
  const tap = (at: number) => win(f, at, at + 10, 3)
  const taps = Math.max(tap(q.buy52), tap(q.buy52 + 12), tap(q.sell52), tap(q.sell52 + 12), tap(q.often), tap(q.often + 10))
  // # price marker bobbing around the value line
  const bob = f < q.above ? 0 : f < q.below ? -60 * on(f, q.above, 10) : lerp(-60, 60, on(f, q.below, 10))
  const goods: [number, string][] = [[q.index49, 'MOST FOLLOW AN INDEX — MANY VERY CHEAP'], [q.share50, 'START WITH JUST ONE SHARE'], [q.show, 'SHOW WHAT THEY OWN, DAILY'], [q.fewer, 'USUALLY FEWER SURPRISE TAX BILLS']]
  return (
    <g>
      <Stage id="fd-etf" frame={f} />
      {/* # A) a fund that trades like a stock, all day */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, q.instead, 12)}>
          <Exchange x={1260} y={GROUND} s={1.0} o={on(f, q.stock46, 10)} />
          <g opacity={on(f, q.fund46, 8) * (1 - on(f, q.trade46, 12))}><Pot x={230} y={GROUND} s={0.5} fill={0.7} label="MUTUAL FUND" col="#2A8FD0" /><Label x={230} y={GROUND - 200} text="ALSO A FUND" size={36} font="Bebas Neue" color={P.ink2} /></g>
          <g transform={`translate(${lerp(620, 1260, on(f, q.trade46, 24))} ${lerp(GROUND - 20, GROUND - 40, on(f, q.trade46, 24))})`}><Parcel x={0} y={0} s={0.95} label="ETF" col="#7A5AA8" glow={win(f, q.etf46, q.differently + 20)} /></g>
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [q.etf46, 'point', 'smiling'], [q.trade46, 'explain', 'smiling']]} x={1000} y={GROUND} s={0.9} o={1 - on(f, q.stock46, 10)} />
          <g opacity={on(f, q.fund46, 8) * (1 - on(f, q.trade46, 10))}><Label x={520} y={GROUND + 60} text={f >= q.packaged ? 'A FUND, PACKAGED DIFFERENTLY' : 'A FUND TOO'} size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, q.like46, 8)}><Company x={1720} y={GROUND} s={0.5} name="CO." col="#5B7DB1" /><Label x={1260} y={GROUND + 60} text="TRADES JUST LIKE A COMPANY'S SHARES" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, q.instead, 12)}>
          <g opacity={1 - 0.5 * on(f, q.moves47, 10)}><DayClock x={420} y={480} s={1.0} hour={16} ring={win(f, q.end47, q.moves47, 6)} />
            <Label x={420} y={680} text="MUTUAL FUND: 1 PRICE, END OF DAY" size={40} font="Bebas Neue" color={P.ink2} /></g>
          <Board x={1180} y={500} w={640} h={300} title="ETF: PRICE MOVES ALL DAY" t={span(f, q.moves47, q.long47 + 20)} />
          <Person f={f} who="investor" beats={sam} x={1640} y={GROUND} s={0.95} flip />
          <g opacity={on(f, q.buy47, 8)}><Tag x={1180} y={790} t={f >= q.sell47 ? 'BUY OR SELL ANY TIME' : 'BUY…'} r={-3} col="#9FD8B4" /></g>
          <g opacity={on(f, q.whenever, 8)} transform={`translate(1640 ${330 - 8 * pop(f, q.open47, 12)})`}><rect x={-110} y={-50} width={220} height={90} rx={16} fill={f >= q.open47 ? '#1E9A63' : '#5C6F8E'} /><Label x={0} y={16} text="MARKET OPEN" size={40} font="Bebas Neue" color="#FFFFFF" /></g>
        </g>
      </g>}
      {/* # B) $13 trillion and a record year */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <Tag x={960} y={300} t="ALL US FUNDS, END OF 2025: $45 TRILLION" r={-2} />
        <rect x={360} y={420} width={1200} height={110} rx={18} fill={P.card} stroke={P.edge} strokeWidth={3} />
        <rect x={360} y={420} width={1200 * (31.4 / 45.1)} height={110} rx={18} fill="#2A8FD0" opacity={0.6} />
        <rect x={360 + 1200 * (31.4 / 45.1)} y={420} width={1200 * (13.4 / 45.1) * on(f, q.grown, 24)} height={110} rx={10} fill="#7A5AA8" />
        <Label x={360 + 600 * (31.4 / 45.1)} y={492} text="MUTUAL FUNDS" size={44} font="Bebas Neue" color="#FFFFFF" />
        <g opacity={on(f, q.fast, 8)}><Label x={360 + 1200 * (31.4 / 45.1) + 600 * (13.4 / 45.1)} y={492} text="ETFS" size={44} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, q.k13, 10)} transform={`translate(0 ${-12 * pop(f, q.trillion48, 12)})`}><Stat x={620} y={720} big="$13 TRILLION" small="IN ETFS" w={600} color="#7A5AA8" /></g>
        <g opacity={on(f, q.alone, 10)} transform={`translate(0 ${-12 * pop(f, q.trillion48b, 12)})`}><Stat x={1320} y={720} big={f >= q.k15 ? '+$1.5 TRILLION' : '+$1…'} small={f >= q.record ? 'PUT IN DURING 2025 — A RECORD' : 'PUT IN DURING 2025'} w={680} /></g>
      </g>}
      {/* # C) the good parts */}
      {Cc > 0 && <g opacity={Cc}>
        <Ground y={GROUND} />
        <Parcel x={1500} y={GROUND - 30} s={0.8} label="ETF" col="#7A5AA8" glow={win(f, q.good49, q.good49 + 30)} />
        {goods.map(([at, t], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${-8 * pop(f, at, 12)})`}><Tick x={200} y={360 + k * 120} o={on(f, at, 10)} r={34} /><Label x={260} y={376 + k * 120} text={t} size={50} anchor="start" font="Bebas Neue" color={P.ink} /></g>)}
        {/* # one share icon; holdings list; behind-the-scenes curtain */}
        <g opacity={win(f, q.one50, q.show, 8)}><Tag x={1320} y={420} t="1 SHARE" r={-5} col="#9FD8B4" /></g>
        <g opacity={win(f, q.show, q.taxable, 8)}><Tag x={1260} y={420} t="HOLDINGS: EVERY DAY" r={-5} col="#F4C95D" /></g>
        <g opacity={on(f, q.tax51, 10)} transform={`translate(1500 ${470 - 10 * pop(f, q.tax51, 12)})`}><Doc x={0} y={0} s={0.7} title="TAX BILL" stamp="FEWER" stampO={on(f, q.because51, 8)} lines={3} /></g>
        <g opacity={on(f, q.created, 8)}><Label x={1500} y={700} text={f >= q.swapped ? 'SHARES SWAPPED BEHIND THE SCENES' : 'HOW SHARES ARE CREATED…'} size={36} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, q.taxable, 8)}><Label x={960} y={GROUND + 60} text="IN A REGULAR TAXABLE ACCOUNT" size={40} font="Bebas Neue" color={P.ink2} /></g>
      </g>}
      {/* # D) the downsides */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {/* overtrading */}
        <g opacity={1 - on(f, q.trade53, 10)}>
          <Person f={f} who="investor" beats={sam} x={760} y={GROUND} s={1.0} />
          <g transform={`translate(1060 520) scale(${1 + 0.06 * taps})`}><Phone x={0} y={0} s={1.2}><rect x={-60} y={-80} width={120} height={60} rx={12} fill="#1E9A63" opacity={0.6 + 0.4 * taps} /><rect x={-60} y={10} width={120} height={60} rx={12} fill="#D9483A" opacity={0.6 + 0.4 * taps} /></Phone></g>
          <g opacity={on(f, q.often, 8)}><Label x={960} y={GROUND + 60} text="TOO EASY TO TRADE TOO OFTEN" size={48} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        {/* the spread */}
        <g opacity={win(f, q.trade53, q.pay, 10)}>
          <g opacity={on(f, q.buying, 8)}><Tag x={560} y={460} t="BUY: $50.02" r={-3} col="#9FD8B4" /></g>
          <g opacity={on(f, q.selling, 8)}><Tag x={560} y={640} t="SELL: $50.00" r={3} col="#F6B1A8" /></g>
          <g opacity={on(f, q.gap, 8)}><path d="M1000 470 L1040 470 L1040 650 L1000 650" fill="none" stroke={P.coralInk} strokeWidth={6} /><Label x={1080} y={580} text={f >= q.spread ? 'THE SPREAD' : 'A SMALL GAP'} size={60} anchor="start" font="Bebas Neue" color={P.coralInk} /></g>
          <Person f={f} who="investor" beats={sam} x={1640} y={GROUND} s={0.9} flip />
        </g>
        {/* price vs value */}
        <g opacity={win(f, q.pay, q.not55, 10)}>
          <line x1={360} y1={560} x2={1560} y2={560} stroke={P.ink2} strokeWidth={5} strokeDasharray="16 12" />
          <Label x={360} y={530} text="VALUE OF WHAT IT OWNS" size={38} anchor="start" font="Bebas Neue" color={P.ink2} o={on(f, q.value54, 8)} />
          <g transform={`translate(960 ${560 + bob})`}><circle r={30} fill="#7A5AA8" /><Label x={50} y={14} text="PRICE YOU PAY" size={38} anchor="start" font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, q.above, 8)}><Label x={1360} y={460} text="A LITTLE ABOVE" size={44} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, q.below, 8)}><Label x={1360} y={680} text="OR A LITTLE BELOW" size={44} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        {/* check what's inside */}
        <g opacity={on(f, q.not55, 10)}>
          <Parcel x={760} y={GROUND - 30} s={1.0} label="ETF" col="#7A5AA8" open={0.6 * on(f, q.complicated, 14)} />
          <g opacity={on(f, q.complicated, 10)}>{['LEVERAGE?', 'OPTIONS?', 'HIGH FEE?'].map((t, k) => <g key={k} opacity={on(f, q.complicated + k * 6, 8)} transform={`translate(${330 + k * 340} ${500 - 10 * pop(f, q.complicated + k * 6, 12)})`}><Tag x={0} y={0} t={t} s={0.85} r={-6 + 6 * k} col="#F6B1A8" /></g>)}</g>
          <g opacity={on(f, q.check, 10)} transform={`translate(${lerp(1300, 900, on(f, q.check, 16))} 600)`}><Magnifier x={0} y={0} s={1.2} /></g>
          <g opacity={on(f, q.simple55, 8)}><Label x={960} y={320} text="NOT EVERY ETF IS A SIMPLE INDEX FUND" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, q.inside, 8)}><Label x={960} y={GROUND + 60} text="ALWAYS CHECK WHAT'S INSIDE" size={52} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}
      <Headline f={f} lines={[[q.stands, 'ETF = EXCHANGE-TRADED FUND', P.ink, 100], [q.instead, 'ONE PRICE A DAY vs ALL DAY', P.ink, 100], [q.grown, 'ETFS HAVE GROWN FAST', P.ink, 104],
        [q.good49, 'ETFS: THE GOOD', P.mintInk, 108], [q.downsides, 'ETFS: THE DOWNSIDES', P.coralInk, 106], [q.trade53, 'EVERY TRADE HAS A GAP', P.ink, 104], [q.pay, 'PRICE vs VALUE', P.ink, 108], [q.not55, 'LOOK INSIDE FIRST', P.ink, 108]]} />
      <Vignette id="fd-etf" />
    </g>
  )
}

export const FD_ETF = makePiece('fd-etf', 'ETFs: a purple ETF parcel slides into a columned stock-exchange hall next to a company; a mutual-fund clock with one price at the close vs a price board line moving all day; Sam taps BUY/SELL on a phone under a MARKET OPEN sign; a bar of US fund money with the purple ETF part ($13 trillion) and +$1.5 trillion in 2025, a record; ticks for cheap index ETFs, one share, daily holdings, fewer tax bills with a red curtain sliding aside; crosses: Sam tapping the phone too often, BUY $50.02 vs SELL $50.00 and THE SPREAD bracket, a price dot bobbing above and below a value line, an opened ETF parcel with LEVERAGE?/OPTIONS?/HIGH FEE? tags under a magnifier', {
  mood: 'light', Component: Etf, beats: Object.values(K),
  sfx: [['s46:exchange', 'pop', 0.2], ['s47:open', 'ding', 0.2], ['s48:trillion#2', 'pop', 0.25], ['s52:often', 'click', 0.2], ['s53:spread', 'pop', 0.2], ['s55:inside', 'whoosh', 0.2]] })
