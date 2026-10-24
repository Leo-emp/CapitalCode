// ============================================================
// ACT 2 — "The price of the bet" (s31–s47), diorama pieces.
// Sourced numbers only: value 40% vs profits 27% (Dec 2025),
// 28× vs 19.5× forward P/E, +44% (our calc), 55% of the gain since 2021.
// ============================================================
import React from 'react'
import { getProp } from '../props/registry'
import { Mini } from '../rig/Mini'
import { BigBars, BigLine, Calendar, CoinStack, countTo, Donut, Label, PriceTag } from './charts'
import { arc, between, easeInOut, easeOut, lerp, on, P, Pedestal, Platform, pop, rnd, Sliver, span, Stage, Tower, Vignette } from './kit'
import { makePiece, type PieceProps } from './registry'

const Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number }> = ({ id, x, y, size, f }) => {
  const C = getProp(id).Component
  return <C size={size} x={x - size / 2} y={y - size / 2} frame={f} />
}
const TEN = Array.from({ length: 10 }, (_, k) => ({ x: 960 + (k - 4.5) * 120, h: 260 + rnd(k * 5) * 200 }))

// ---------------------------------------------------------------- s31–s33: fine — if they earn their size. What are we paying for?
const Price: React.FC<PieceProps> = ({ f, c }) => {
  const earn = c('s31:earn'), tag = c('s32:paying'), calc = c('s33:calculation')
  const swing = Math.sin((f - tag) / 9) * 18 * Math.exp(-(f - tag) / 40)
  const away = easeInOut(span(f, calc - 6, calc + 20))
  return (
    <g>
      <Stage id="pc" frame={f} />
      <g transform={`translate(0 ${away * -80}) scale(${1 - away * 0.08})`} opacity={1 - away}>
        <Platform id="pc" cx={960} cy={870} rx={760} ry={110} />
        {TEN.map((t, k) => (
          <g key={k} opacity={on(f, c('s31:concentrated') + k * 2)}>
            <Tower id="pc" i={k} x={t.x} y={860} h={t.h * on(f, c('s31:concentrated') + k * 2, 18)} w={84} glow={on(f, c('s31:size')) * 0.6} />
            {/* # "if they earn their size": each tower's profits stack up beside it, matching its height */}
            <CoinStack x={t.x + 46} y={880} n={Math.round(t.h / 40)} p={span(f, earn + k * 2, earn + 24)} s={0.7} />
          </g>
        ))}
        <g opacity={between(f, c('s31:not'), c('s31:if'))}><circle cx={960} cy={300} r={80} fill={P.mint} opacity={0.9} /><path d="M920 300 l28 28 l52 -60" stroke={P.white} strokeWidth={16} fill="none" strokeLinecap="round" /></g>
        <Label x={960} y={150} text="WHAT ARE YOU PAYING FOR?" size={80} font="Bebas Neue" color={P.champL} o={on(f, c('s32:question'))} />
        {/* # a big price tag swings down onto the towers */}
        {f >= tag - 4 && <g transform={`translate(960 ${lerp(-200, 330, easeOut(span(f, tag - 4, tag + 14)))}) rotate(${swing})`}><path d="M0 -330 L0 -40" stroke={P.champL} strokeWidth={4} /><PriceTag x={0} y={40} text="$ ? ? ?" s={2.2} r={0} /></g>}
      </g>
      {f >= calc - 6 && <g transform={`translate(960 540) scale(${pop(f, calc)})`}><Prop id="calculator" x={0} y={0} size={300} f={f} /></g>}
      <Vignette id="pc" />
    </g>
  )
}

// ---------------------------------------------------------------- s34–s36: 40% of the value, 27% of the profits
const ValueProfit: React.FC<PieceProps> = ({ f, c }) => {
  const pay = c('s36:paying'), get = c('s36:getting')
  return (
    <g>
      <Stage id="vp" tint="teal" frame={f} />
      <Label x={960} y={130} text="THE TOP 10, END OF 2025" size={64} font="Bebas Neue" color={P.champL} o={on(f, c('s34:end'))} />
      <BigBars f={f} x={560} y={760} w={800} h={500} max={45} unit="%" bars={[
        { label: 'of the index’s value', value: 40, color: P.gold, at: c('s34:40') },
        { label: 'of its profits', value: 27, color: P.mint, at: c('s35:27') },
      ]} />
      {/* # the gap between them */}
      {f >= c('s35:only') && <g opacity={on(f, c('s35:only'))}><path d={`M900 ${760 - (40 / 45) * 500} L1060 ${760 - (40 / 45) * 500} M1060 ${760 - (40 / 45) * 500} L1060 ${760 - (27 / 45) * 500}`} stroke={P.coral} strokeWidth={6} strokeDasharray="14 10" /><Label x={1090} y={760 - (33.5 / 45) * 500} text="gap" size={40} anchor="start" color={P.coral} /></g>}
      {/* # "paying for 40 … getting 27": the investor hands over 40 coins and gets 27 back */}
      <g opacity={on(f, c('s36:put'))}>
        <Pedestal x={260} y={900} r={110} /><Mini look="investor" x={240} y={900} scale={1.3} frame={f} seed={3} mood={f > get + 20 ? 'sad' : 'neutral'} />
        <CoinStack x={330} y={890} n={Math.round(40 - 40 * span(f, pay, pay + 30))} s={0.8} />
        <CoinStack x={1650} y={890} n={Math.round(27 * span(f, get, get + 30))} s={0.8} />
        <Pedestal x={1650} y={900} r={90} color={P.navy3} />
        {f >= pay && f < get + 40 && Array.from({ length: 12 }, (_, i) => {
          const t = span(f, (i < 8 ? pay : get) + (i % 8) * 3, (i < 8 ? pay : get) + (i % 8) * 3 + 20)
          if (t <= 0 || t >= 1) return null
          const p = i < 8 ? arc({ x: 330, y: 820 }, { x: 760, y: 420 }, easeInOut(t), 160) : arc({ x: 1060, y: 520 }, { x: 1650, y: 820 }, easeInOut(t), 160)
          return <ellipse key={i} cx={p.x} cy={p.y} rx={18} ry={7} fill={P.gold} />
        })}
      </g>
      <Vignette id="vp" />
    </g>
  )
}

// ---------------------------------------------------------------- s37–s39: the gap is a bet on the future
const FutureBet: React.FC<PieceProps> = ({ f, c }) => {
  const gap = c('s37:gap'), fut = c('s37:future'), grow = c('s38:grow'), long = c('s38:long'), val = c('s39:valuations')
  const fly = easeInOut(span(f, gap, fut + 10))
  return (
    <g>
      <Stage id="fb" frame={f} />
      {/* # a road to a glowing horizon: "the future" */}
      <g opacity={on(f, c('s37'))}>
        <ellipse cx={960} cy={460} rx={520} ry={160} fill={P.gold} opacity={0.12} />
        <circle cx={960} cy={470} r={90} fill={P.gold} opacity={0.85} />
        <path d="M900 520 L1020 520 L1700 1080 L220 1080 Z" fill={P.navy3} />
        {Array.from({ length: 6 }, (_, i) => { const k = ((i / 6) + f / 200) % 1, y = 520 + k * k * 560, w = 6 + k * 34; return <rect key={i} x={960 - w / 2} y={y} width={w} height={8 + k * 40} fill={P.champL} opacity={0.7} /> })}
        <rect x={0} y={520} width={1920} height={8} fill={P.navy2} />
      </g>
      {/* # the gap (a glowing block) floats off toward the horizon */}
      <g transform={`translate(${lerp(960, 960, fly)} ${lerp(900, 470, fly)}) scale(${lerp(1, 0.4, fly)})`} opacity={between(f, gap - 4, grow + 6)}>
        <rect x={-110} y={-70} width={220} height={140} rx={20} fill={P.coral} /><Label x={0} y={18} text="13 pts" size={56} font="Bebas Neue" color={P.white} />
      </g>
      <Label x={960} y={150} text="A BET ON THE FUTURE" size={80} font="Bebas Neue" color={P.champL} o={on(f, fut)} />
      {/* # what the bet assumes: their profits climb much faster, for a long time (shape only, no data) */}
      <g opacity={on(f, grow)}>
        <BigLine f={f} x={360} y={240} w={1200} h={560} values={[1, 1.4, 2, 2.9, 4.2, 6]} min={0} max={6.5} from={grow} to={long + 20} color={P.gold} />
        <BigLine f={f} x={360} y={240} w={1200} h={560} values={[1, 1.15, 1.32, 1.5, 1.7, 1.95]} min={0} max={6.5} from={c('s38:everyone')} to={long + 20} color={P.sky} area={false} />
        <Label x={1580} y={290} text="the giants (expected)" size={34} anchor="end" color={P.gold} o={on(f, c('s38:faster'))} />
        <Label x={1580} y={700} text="everyone else" size={34} anchor="end" color={P.sky} o={on(f, c('s38:everyone'))} />
        <Label x={960} y={880} text="FOR A LONG TIME →" size={50} font="Bebas Neue" color={P.white} o={on(f, long)} />
      </g>
      {f >= val && <g transform={`translate(1600 560) scale(${pop(f, val)})`}><PriceTag x={0} y={0} text="PRICE" s={1.4} /></g>}
      <Vignette id="fb" />
    </g>
  )
}

// ---------------------------------------------------------------- s40–s41: 28× vs 19.5×, in plain money, +44%
const Valuations: React.FC<PieceProps> = ({ f, c }) => {
  const plain = c('s40a:plain'), pay = c('s40b:paying'), one = c('s40b:1'), never = c('s40c:never'), years = c('s40c:28'), climb = c('s40d:climbing'), p44 = c('s41:44')
  const bars = 1 - on(f, plain - 10)
  return (
    <g>
      <Stage id="va" tint="teal" frame={f} />
      <g opacity={bars}>
        <Label x={960} y={130} text="PRICE ÷ NEXT YEAR’S EXPECTED PROFIT" size={56} font="Bebas Neue" color={P.champL} o={on(f, c('s40:trading'))} />
        <BigBars f={f} x={560} y={800} w={800} h={540} max={30} bars={[
          { label: 'top 10', value: 28, color: P.gold, at: c('s40:28'), text: `${countTo(28, on(f, c('s40:28'), 22), 0)}×` },
          { label: 'the rest', value: 19.5, color: P.sky, at: c('s40:195'), text: `${countTo(19.5, on(f, c('s40:195'), 22), 1)}×` },
        ]} />
        <Label x={760} y={940} text="× next year’s profit" size={34} color={P.white} o={on(f, c('s40:next'))} />
      </g>
      {/* # plain money: pay $28 today for $1 of profit next year */}
      <g opacity={on(f, plain) * (1 - on(f, p44 - 8))}>
        <Label x={960} y={130} text="IN PLAIN MONEY" size={72} font="Bebas Neue" color={P.champL} o={on(f, plain)} />
        <CoinStack x={500} y={820} n={28} p={span(f, pay - 6, c('s40b:28#2') + 10)} s={1.6} />
        <Label x={500} y={900} text={countTo(28, span(f, pay - 6, c('s40b:28#2') + 10), 0, '$', ' today')} size={52} font="Bebas Neue" o={on(f, pay - 6)} />
        <Label x={760} y={600} text="for" size={50} color={P.white} o={on(f, c('s40b:for'))} />
        <g opacity={on(f, one)} transform={`translate(0 ${-Math.sin(span(f, c('s40b:expected'), c('s40b:expected') + 14) * Math.PI) * 40})`}><CoinStack x={1000} y={820} n={1} s={1.6} /><Label x={1000} y={900} text="$1 profit / year" size={44} font="Bebas Neue" /></g>
        {/* # if it never grew: one coin a year, 28 calendar pages to earn it back */}
        {f >= never && Array.from({ length: 28 }, (_, i) => {
          const t = on(f, years + i * 1.6, 8)
          return t > 0 && <g key={i} transform={`translate(${1180 + (i % 7) * 96} ${300 + Math.floor(i / 7) * 120}) scale(${0.55 * t})`}><Calendar x={0} y={0} text={`${i + 1}`} /></g>
        })}
        {f >= years && <Label x={1470} y={860} text={countTo(28, span(f, years, years + 45), 0, '', ' YEARS')} size={70} font="Bebas Neue" color={P.coral} />}
        {/* # "they expect the profits to keep climbing": a staircase of coin stacks */}
        <g opacity={on(f, climb - 20)}>{[0, 1, 2, 3, 4].map((k) => <CoinStack key={k} x={1180 + k * 120} y={1000} n={2 + k * 3} p={span(f, climb - 20 + k * 4, climb + k * 4)} s={0.8} />)}</g>
      </g>
      {/* # each $1 of future profit from the giants costs 44% more */}
      <g opacity={on(f, p44 - 8)}>
        <Label x={960} y={160} text="WHAT $1 OF FUTURE PROFIT COSTS" size={60} font="Bebas Neue" color={P.champL} />
        <g transform={`translate(620 560) scale(${pop(f, c('s41:dollar#2')) * (1 + 0.08 * Math.max(0, 1 - Math.abs(f - c('s41:everyone') - 6) / 8))})`}><PriceTag x={0} y={0} text="1.00" s={2.2} color={P.sky} /></g>
        <Label x={620} y={760} text="everyone else" size={40} o={on(f, c('s41:dollar#2'))} />
        <g transform={`translate(1300 520) scale(${pop(f, c('s41:giants'))})`}><PriceTag x={0} y={0} text={(1 + 0.44 * on(f, p44, 30)).toFixed(2)} s={2.8} color={P.gold} /></g>
        <Label x={1300} y={780} text="the giants" size={40} o={on(f, c('s41:giants'))} />
        <Label x={1300} y={300} text={countTo(44, on(f, p44, 30), 0, '+', '%')} size={110} font="Bebas Neue" color={P.coral} o={on(f, p44)} />
      </g>
      <Vignette id="va" />
    </g>
  )
}

// ---------------------------------------------------------------- s42–s47: it has paid off — but no room for disappointment
const PaidOff: React.FC<PieceProps> = ({ f, c }) => {
  const paid = c('s42:paid'), gain = c('s43:55'), faster = c('s44:faster'), price = c('s45:price'), dis = c('s45:disappointment'), adv = c('s46:advance'), yy = c('s46:year'), hist = c('s47:history')
  const A = 1 - on(f, c('s44') - 6), B = between(f, c('s44') - 6, c('s45') - 4), C = between(f, c('s45') - 4, adv - 2), D = on(f, hist)
  const stilt = 160 + 420 * easeInOut(span(f, c('s45:higher'), price + 20)), wob = Math.sin((f - dis) / 5) * 4 * on(f, dis) * Math.exp(-Math.max(0, f - dis) / 40)
  return (
    <g>
      <Stage id="po" frame={f} />
      <g opacity={A}>
        <BigLine f={f} x={260} y={250} w={700} h={520} values={[1, 1.1, 1.05, 1.5, 1.9, 2.6]} min={0.8} max={2.8} from={paid - 6} to={paid + 30} color={P.mint} />
        <Label x={610} y={170} text="SO FAR, IT PAID OFF" size={64} font="Bebas Neue" color={P.champL} o={on(f, paid)} />
        <g opacity={on(f, c('s43:2021'))}>
          <Donut cx={1400} cy={520} r={230} part={55} p={on(f, gain, 30)} />
          <Label x={1400} y={545} text={countTo(55, on(f, gain, 30), 0, '', '%')} size={110} font="Bebas Neue" color={P.champL} />
          <Label x={1400} y={820} text="of the market’s whole gain since 2021" size={36} />
          <Label x={1400} y={870} text="came from the top 10" size={36} color={P.gold} />
        </g>
      </g>
      <g opacity={B}>
        <BigBars f={f} x={560} y={800} w={800} h={500} max={10} bars={[{ label: 'their profits', value: 9, color: P.gold, at: faster - 10, text: '↑↑' }, { label: 'the rest', value: 5, color: P.sky, at: c('s44:rest') - 6, text: '↑' }]} />
        <Label x={960} y={160} text="THEIR PROFITS REALLY GREW FASTER" size={64} font="Bebas Neue" color={P.champL} />
      </g>
      {/* # the higher the price, the higher it stands on a thin stilt: no room for a stumble */}
      <g opacity={C} transform={`rotate(${wob} 960 980)`}>
        <rect x={944} y={980 - stilt} width={32} height={stilt} fill={P.navy4} />
        <Tower id="po" i={0} x={960} y={980 - stilt} h={220} w={110} glow={0.4} />
        <g transform={`translate(1150 ${980 - stilt - 160})`} opacity={on(f, price)}><PriceTag x={0} y={0} text="PRICE" s={1.2} /></g>
        <Label x={500} y={560} text="LESS ROOM" size={96} font="Bebas Neue" color={P.coral} o={on(f, c('s45:less'))} />
        <Label x={500} y={640} text="FOR DISAPPOINTMENT" size={64} font="Bebas Neue" color={P.coral} o={on(f, c('s45:less'))} />
        <ellipse cx={960} cy={990} rx={120} ry={20} fill={P.navy2} />
      </g>
      {/* # growth paid for in advance has to show up, year after year */}
      <g opacity={between(f, adv - 4, hist)}>
        <ellipse cx={520} cy={520} rx={160} ry={160} fill={P.gold} opacity={0.2 * on(f, c('s46:growth#2'))} />
        {[2026, 2027, 2028, 2029].map((y, i) => <g key={y} transform={`translate(${520 + i * 300} 520) scale(${pop(f, adv + i * 8)})`}><Calendar x={0} y={0} text={`${y}`} s={1.3} />
          <g opacity={on(f, yy + i * 4)}><circle cx={60} cy={-90} r={30} fill={P.mint} /><path d="M46 -90 l10 10 l20 -22" stroke={P.white} strokeWidth={7} fill="none" /></g></g>)}
        <Label x={960} y={240} text="IT HAS TO SHOW UP" size={64} font="Bebas Neue" color={P.champL} o={on(f, c('s46:show'))} />
      </g>
      {/* # history: the calendar spins back to 2000 */}
      <g opacity={D}>
        <g transform={`translate(960 540) scale(${1.6 + on(f, c('s47:example')) * 0.6})`}><Calendar x={0} y={0} text={`${Math.round(lerp(2026, 2000, easeInOut(span(f, hist, c('s47:example') + 10))))}`} /></g>
      </g>
      <Vignette id="po" />
    </g>
  )
}

export const ACT2 = [
  makePiece('price', 'Fine if they earn their size — what are we paying for?', {
    beats: ['s31', 's31:concentrated', 's31:not', 's31:problem', 's31:if', 's31:giant', 's31:earn', 's31:size', 's32', 's32:question', 's32:paying', 's33', 's33:second', 's33:calculation'],
    sfx: [['s31:concentrated', 'pop', 0.4], ['s31:earn', 'coin', 0.6], ['s31:size', 'chime', 0.4], ['s32:question', 'click', 0.5], ['s32:paying', 'swish', 0.6], ['s33:calculation', 'softpop', 0.6]], Component: Price,
  }),
  makePiece('value-profit', '40% of the value, 27% of the profits', {
    beats: ['s34', 's34:end', 's34:top', 's34:40', 's34:value', 's35', 's35:only', 's35:27', 's35:profits', 's36', 's36:put', 's36:paying', 's36:40', 's36:getting', 's36:27', 's36:earnings'],
    sfx: [['s34:40', 'tick', 0.6], ['s35:27', 'tick', 0.6], ['s35:only', 'swish', 0.4], ['s36:paying', 'coin', 0.6], ['s36:getting', 'coin', 0.5]], Component: ValueProfit,
  }),
  makePiece('future-bet', 'The gap is a bet on the future', {
    beats: ['s37', 's37:gap', "s37:market's", 's37:future', 's38', 's38:grow', 's38:profits', 's38:faster', 's38:everyone', 's38:long', 's39', 's39:same', 's39:valuations'],
    sfx: [['s37:gap', 'swish', 0.5], ['s37:future', 'riser', 0.5], ['s38:grow', 'whoosh', 0.4], ['s38:long', 'tick', 0.4], ['s39:valuations', 'softpop', 0.6]], Component: FutureBet,
  }),
  makePiece('valuations', '28× vs 19.5×, in plain money, +44%', {
    beats: ['s40', 's40:trading', 's40:28', 's40:next', 's40:earnings', 's40:rest', 's40:195', 's40a', 's40a:abstract', 's40a:plain', 's40a:money', 's40b', 's40b:28', 's40b:paying', 's40b:28#2', 's40b:for', 's40b:1', 's40b:profit', 's40b:expected', 's40b:year',
      's40c', 's40c:never', 's40c:grew', 's40c:28', 's40c:earn', 's40c:paid', 's40d', 's40d:accept', 's40d:expect', 's40d:climbing', 's41', 's41:dollar', 's41:giants', 's41:44', 's41:dollar#2', 's41:everyone'],
    sfx: [['s40:28', 'tick', 0.6], ['s40:195', 'tick', 0.6], ['s40a:plain', 'whoosh', 0.4], ['s40b:paying', 'coin', 0.6], ['s40b:1', 'softpop', 0.6], ['s40c:28', 'tick', 0.5], ['s40d:climbing', 'riser', 0.4], ['s41:giants', 'softpop', 0.5], ['s41:44', 'ding', 0.5]],
    Component: Valuations,
  }),
  makePiece('paid-off', 'It paid off — 55% of the gain — but no room for disappointment', {
    beats: ['s42', 's42:fair', 's42:paid', 's43', 's43:2021', 's43:10', 's43:55', 's43:gain', 's44', 's44:faster', 's44:rest', 's45', 's45:higher', 's45:price', 's45:less', 's45:disappointment',
      's46', 's46:growth', 's46:advance', 's46:growth#2', 's46:show', 's46:year', 's47', 's47:history', 's47:example', 's47:not'],
    sfx: [['s42:paid', 'riser', 0.5], ['s43:55', 'ding', 0.5], ['s44:faster', 'pop', 0.4], ['s45:higher', 'riser', 0.4], ['s45:disappointment', 'thud', 0.5], ['s46:advance', 'tick', 0.5], ['s46:year', 'chime', 0.4], ['s47:history', 'whoosh', 0.6]],
    Component: PaidOff,
  }),
]

void Sliver
