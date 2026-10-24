// ============================================================
// ACT 3 — "We have been here before" (s48–s63), diorama pieces.
// Sourced: 2000 top 10 ≈ 27% of the index (record then), 23.6× vs
// ~16× forward P/E (2000) → 11.5× vs ~16× (2005); the 2000 list;
// only Microsoft is still in the top 10 (2026).
// ============================================================
import React from 'react'
import { getProp } from '../props/registry'
import { Actor } from '../rig/Actor'
import { Mini } from '../rig/Mini'
import { expressionAt } from '../motion/acting'
import { poseAt, type PoseId } from '../rig/pose'
import { BigLine, Calendar, CoinStack, countTo, Label, PriceTag } from './charts'
import { between, easeInOut, easeOut, lerp, on, P, Pedestal, Platform, pop, rnd, span, Stage, Tower, Vignette } from './kit'
import { makePiece, type PieceProps } from './registry'

const Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number }> = ({ id, x, y, size, f }) => {
  const C = getProp(id).Component
  return <C size={size} x={x - size / 2} y={y - size / 2} frame={f} />
}
const OLD: [string, string, string][] = [['GE', 's52:general', 'factory'], ['Exxon', 's52:exxon', 'oil-barrel'], ['Pfizer', 's52:pfizer', 'medical-kit'], ['Cisco', 's52:cisco', 'server-rack'], ['Citigroup', 's52:citigroup', 'bank'],
  ['Walmart', 's52:walmart', 'shopping-bag'], ['Microsoft', 's52:microsoft', 'laptop'], ['AIG', 's52:aig', 'umbrella'], ['Merck', 's52:merck', 'medical-kit'], ['Intel', 's52:intel', 'ai-chip']]

// ---------------------------------------------------------------- s48–s53: the year 2000 bubble of giants
const DotCom: React.FC<PieceProps> = ({ f, c }) => {
  const bub = on(f, c('s48:bubble'), 30), fake = c('s51:fake'), names = c('s52:general'), profits = c('s52:profits'), val = c('s53:top')
  const A = 1 - on(f, val - 6)
  const xs = OLD.map((_, k) => 960 + (k - 4.5) * 128)
  return (
    <g>
      <Stage id="dc" tint="teal" frame={f} />
      <g transform={`translate(1660 170) scale(${pop(f, c('s48:2000'))})`}><Calendar x={0} y={0} text="2000" s={1.1} /></g>
      <g opacity={A}>
        <Platform id="dc" cx={960} cy={860} rx={760} ry={110} />
        {xs.map((x, k) => (
          <g key={k} opacity={on(f, c('s49:10') + k * 2)}>
            <Tower id="dc" i={k} x={x} y={850} h={(200 + rnd(k + 40) * 160) * on(f, c('s49:largest') + k * 2, 18)} w={86} glow={on(f, c('s49:record')) * 0.5} />
            <g opacity={on(f, c(OLD[k][1]))} transform={`translate(0 ${(1 - on(f, c(OLD[k][1]))) * 20})`}>
              <Prop id={OLD[k][2]} x={x} y={300} size={86} f={f} />
              <Label x={x} y={380} text={OLD[k][0]} size={28} weight={700} />
            </g>
            <CoinStack x={x + 30} y={872} n={6} p={span(f, profits - 10 + k * 2, profits + 20)} s={0.7} />
          </g>
        ))}
        {/* # the bubble swells around them */}
        {bub > 0 && <g><ellipse cx={960} cy={560} rx={880 * bub} ry={460 * bub} fill="#9FD8FF" opacity={0.1} /><ellipse cx={960} cy={560} rx={880 * bub} ry={460 * bub} fill="none" stroke="#CFEFFF" strokeWidth={5} opacity={0.5} />
          <path d={`M${960 - 700 * bub} ${560 - 260 * bub} A${760 * bub} ${400 * bub} 0 0 1 ${960 - 300 * bub} ${560 - 420 * bub}`} stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" fill="none" opacity={0.35} /></g>}
        <Label x={960} y={170} text={countTo(27, on(f, c('s49:27'), 24), 0, '', '% OF THE INDEX')} size={80} font="Bebas Neue" color={P.champL} o={on(f, c('s49:27')) * (1 - on(f, names - 10))} />
        <g opacity={between(f, c('s49:record'), names - 10)}><Prop id="crown" x={960} y={250} size={100} f={f} /></g>
        <g opacity={between(f, c('s50:safe'), c('s51'))}><Prop id="shield" x={1700} y={560} size={190} f={f} /><Label x={1700} y={700} text="felt safe" size={40} /></g>
        {/* # not fake start-ups: a flimsy dot-com tent, crossed out */}
        <g opacity={between(f, fake - 2, names)}>
          <path d="M150 720 L260 560 L370 720 Z" fill={P.coral} opacity={0.85} /><Label x={260} y={770} text="dot-com start-up" size={30} />
          <path d={`M170 590 L350 740 M350 590 L170 740`} stroke={P.white} strokeWidth={12} strokeLinecap="round" opacity={on(f, c('s51:startups'))} />
        </g>
        <Label x={960} y={170} text="REAL BUSINESSES, REAL PROFITS" size={72} font="Bebas Neue" color={P.champL} o={on(f, c('s52:real'))} />
      </g>
      {/* # their price: 23.6× vs ~16× */}
      <g opacity={on(f, val - 6)}>
        <Label x={960} y={150} text="2000: PRICE ÷ EXPECTED PROFIT" size={60} font="Bebas Neue" color={P.champL} />
        {[['top 10', 23.6, c('s53:236'), P.gold], ['the rest', 16, c('s53:16'), P.sky]].map(([l, v, a, col], i) => {
          const h = ((v as number) / 26) * 520 * pop(f, a as number, 22), x = 760 + i * 400
          return <g key={i} opacity={f >= (a as number) - 2 ? 1 : 0}><rect x={x - 80} y={820 - h} width={160} height={h} rx={14} fill={col as string} />
            <Label x={x} y={800 - h} text={`${countTo(v as number, on(f, a as number, 22), i ? 0 : 1)}×`} size={60} font="Bebas Neue" color={P.champL} /><Label x={x} y={880} text={l as string} size={38} /></g>
        })}
      </g>
      <Vignette id="dc" />
    </g>
  )
}

// ---------------------------------------------------------------- s54–s57c: sound familiar? → the premium flipped → buyers at the top
const Flip: React.FC<PieceProps> = ({ f, c }) => {
  const fam = c('s54:familiar'), later = c('s55:later'), flip = c('s57:flipped'), think = c('s57a:think'), fell = c('s57c:fell'), price = c('s57c:price')
  const A = between(f, c('s54') - 4, later - 4), B = between(f, later - 4, think), C = on(f, think)
  const keys: [number, PoseId][] = [[c('s54'), 'idle'], [c('s54:sound'), 'point'], [fam + 6, 'armsCrossed']]
  const ex = expressionAt(f, [{ at: c('s54'), pose: 'idle', expression: 'neutral' }, { at: c('s54:sound'), pose: 'point', expression: 'smug' }])
  // # see-saw: giants' side high (a premium) → flips low on "flipped"
  const tilt = lerp(14, -12, easeInOut(span(f, flip - 4, flip + 16))) + Math.sin((f - flip) / 4) * 3 * on(f, flip) * Math.exp(-Math.max(0, f - flip) / 30)
  const climb = easeInOut(span(f, c('s57a:bought'), c('s57b:biggest') + 10)), slide = easeInOut(span(f, fell, fell + 50))
  return (
    <g>
      <Stage id="fl" frame={f} />
      {/* # close-up: the hero, a knowing look — 2000 next to today */}
      <g opacity={A}>
        <g opacity={0.9}><Platform id="fl" cx={1300} cy={560} rx={170} ry={40} />{[0, 1, 2, 3, 4].map((k) => <Tower key={k} id="fl" i={k} x={1210 + k * 45} y={555} h={90 + k * 12} w={32} />)}<Label x={1300} y={650} text="2000" size={34} font="Bebas Neue" /></g>
        <g opacity={0.9}><Platform id="fl2" cx={1640} cy={560} rx={170} ry={40} />{[0, 1, 2, 3, 4].map((k) => <Tower key={k} id="fl2" i={k} x={1550 + k * 45} y={555} h={110 + k * 16} w={32} glow={0.5} />)}<Label x={1640} y={650} text="TODAY" size={34} font="Bebas Neue" /></g>
        <Actor who="hero" pose={poseAt(f, 30, keys)} expression={ex.expression} blend={ex.from ? { from: ex.from, mix: ex.mix! } : undefined} x={560} y={1300} scale={1.7} frame={f} life={5} />
        <Label x={1470} y={300} text="SOUND FAMILIAR?" size={84} font="Bebas Neue" color={P.champL} o={on(f, fam)} />
      </g>
      {/* # five years later: the see-saw flips */}
      <g opacity={B}>
        <g transform={`translate(1560 180) scale(${pop(f, c('s55:five'))})`}><Calendar x={0} y={0} text="2005" s={1.1} /></g>
        <path d="M900 860 L960 720 L1020 860 Z" fill={P.champ} />
        <g transform={`rotate(${tilt} 960 720)`}>
          <rect x={360} y={704} width={1200} height={30} rx={15} fill={P.cream} />
          <g transform="translate(520 700)"><Tower id="fl" i={0} x={0} y={0} h={200} w={110} glow={0.5} /><Label x={0} y={-260} text={f < flip ? '23.6×' : `${countTo(11.5, on(f, c('s55:115'), 20), 1)}×`} size={60} font="Bebas Neue" color={P.gold} /><Label x={0} y={70} text="the giants" size={36} /></g>
          <g transform={`translate(1400 ${700 - Math.sin(span(f, c('s55:against'), c('s55:against') + 12) * Math.PI) * 24})`}>{[0, 1, 2].map((k) => <rect key={k} x={-90 + k * 62} y={-110 - (k % 2) * 20} width={56} height={110 + (k % 2) * 20} rx={6} fill={P.sky} />)}<Label x={0} y={-180} text="16×" size={60} font="Bebas Neue" color={P.sky} /><Label x={0} y={70} text="the rest" size={36} /></g>
        </g>
        <Label x={960} y={160} text={f < flip ? 'THE PREMIUM DID NOT JUST SHRINK…' : 'IT FLIPPED'} size={f < flip ? 64 : 110} font="Bebas Neue" color={f < flip ? P.champL : P.coral} o={on(f, c('s56:premium'))} />
      </g>
      {/* # the people who bought at the top of the biggest, most famous names — and slid down */}
      <g opacity={C}>
        <path d="M200 1000 L960 330 L1720 1000 Z" fill={P.navy3} /><path d="M960 330 L1720 1000 L1300 1000 Z" fill={P.navy2} />
        <g opacity={on(f, c('s57b:famous'))}><Prop id="crown" x={960} y={280} size={120} f={f} /></g>
        <Label x={960} y={150} text="BIGGEST · MOST FAMOUS · SAFEST-LOOKING" size={54} font="Bebas Neue" color={P.champL} o={on(f, c('s57b:biggest'))} />
        {Array.from({ length: 9 }, (_, i) => {
          const side = i % 2 ? 1 : -1, start = { x: 960 + side * (700 - i * 30), y: 990 }, top = { x: 960 + side * (40 + i * 14), y: 380 + i * 8 }
          const up = easeOut(span(climb, i * 0.05, 0.6 + i * 0.05)), down = easeInOut(span(slide, i * 0.06, 0.7 + i * 0.03))
          const p = { x: lerp(lerp(start.x, top.x, up), start.x + side * 120, down), y: lerp(lerp(start.y, top.y, up), 1010, down) }
          return <Mini key={i} look={['hero', 'buyer', 'investor', 'owner', 'worker'][i % 5]} x={p.x} y={p.y} scale={0.75} frame={f} seed={i + 30} mood={down > 0.2 ? 'sad' : 'happy'} />
        })}
        {f >= price - 4 && <g transform={`translate(1330 420) scale(${pop(f, price)})`}><PriceTag x={0} y={0} text="ALREADY PRICED IN" s={0.95} r={6} /></g>}
        <Label x={960} y={1060} text="good news" size={36} o={between(f, c('s57c:good'), price)} />
      </g>
      <Vignette id="fl" />
    </g>
  )
}

// ---------------------------------------------------------------- s58–s63: only one survived; great company ≠ great price
const BEFORE = ['General Electric', 'Exxon Mobil', 'Pfizer', 'Cisco', 'Citigroup', 'Walmart', 'Microsoft', 'AIG', 'Merck', 'Intel']
const AFTER = ['NVIDIA', 'Apple', 'Alphabet', 'Microsoft', 'Amazon', 'Broadcom', 'Micron', 'Meta', 'Tesla', 'Eli Lilly']
const Survivors: React.FC<PieceProps> = ({ f, c }) => {
  const slid = c('s60:slid'), ng = c('s60:new'), lesson = c('s61:lesson'), great = c('s62:great'), inv = c('s62:investment'), wonder = c('s63:wonderful'), wait = c('s63:waiting'), back = c('s63:back')
  const A = 1 - on(f, lesson - 6), B = between(f, lesson - 6, wonder - 4), C = on(f, wonder - 4)
  const row = (i: number) => 220 + i * 70
  return (
    <g>
      <Stage id="sv" tint="teal" frame={f} />
      <g opacity={A}>
        <Label x={560} y={150} text="TOP 10 IN 2000" size={60} font="Bebas Neue" color={P.champL} o={on(f, c('s58:leaders'))} />
        <Label x={1360} y={150} text="TOP 10 TODAY" size={60} font="Bebas Neue" color={P.champL} o={on(f, ng)} />
        {BEFORE.map((n, i) => {
          const ms = n === 'Microsoft', drop = ms ? 0 : easeInOut(span(f, slid + i * 2, slid + 26 + i * 2))
          const toRight = ms ? easeInOut(span(f, c('s59:microsoft'), c('s59:microsoft') + 20)) : 0
          const y = lerp(row(i), row(3), toRight) + drop * 500, x = lerp(560, 1360, toRight)
          return <g key={n} opacity={on(f, c('s58:leaders') + i * 2) * (1 - drop)}>
            <rect x={x - 230} y={y - 44} width={460} height={58} rx={29} fill={ms ? P.gold : P.navy3} opacity={ms ? 0.95 : 0.8} />
            <Label x={x} y={y} text={n} size={34} color={ms ? P.navy0 : P.white} />
          </g>
        })}
        {AFTER.map((n, i) => n === 'Microsoft' ? null : <g key={n} opacity={on(f, ng + i * 3)} transform={`translate(${(1 - on(f, ng + i * 3)) * 80} 0)`}>
          <rect x={1130} y={row(i) - 44} width={460} height={58} rx={29} fill={P.sky} opacity={0.85} /><Label x={1360} y={row(i)} text={n} size={34} color={P.navy0} /></g>)}
        <Label x={960} y={1000} text={`only ${f >= c('s58:one') ? '1' : '…'} of 10 is still there`} size={44} color={P.champL} o={on(f, c('s58:only'))} />
      </g>
      {/* # the lesson: a great company is not a great investment at any price */}
      <g opacity={B}>
        <Label x={960} y={160} text="THE LESSON" size={84} font="Bebas Neue" color={P.champL} o={on(f, lesson)} />
        <g transform={`translate(560 560) scale(${pop(f, great)})`}><circle r={200} fill={P.navy1} opacity={0.6} /><Prop id="crown" x={0} y={-20} size={200} f={f} />
          <Label x={0} y={150} text="GREAT COMPANY" size={50} font="Bebas Neue" /><g transform="translate(140 -150)"><circle r={36} fill={P.mint} /><path d="M-16 0 l11 11 l22 -24" stroke={P.white} strokeWidth={8} fill="none" /></g></g>
        <Label x={960} y={570} text="≠" size={140} color={P.coral} o={on(f, c('s62:great#2'))} />
        <g transform={`translate(1360 560) scale(${pop(f, inv)})`}><circle r={200} fill={P.navy1} opacity={0.6} /><PriceTag x={-10} y={-10} text="ANY $" s={1.15} />
          <Label x={0} y={150} text="GREAT INVESTMENT?" size={50} font="Bebas Neue" /><g transform="translate(140 -150)" opacity={on(f, c('s62:any'))}><circle r={36} fill={P.coral} /><path d="M-14 -14 L14 14 M14 -14 L-14 14" stroke={P.white} strokeWidth={8} /></g></g>
      </g>
      {/* # bought at the wrong price: down, then years of crawling back to where you started */}
      <g opacity={C}>
        <BigLine f={f} x={300} y={260} w={1100} h={520} values={[100, 62, 55, 60, 68, 76, 84, 92, 100]} min={40} max={110} from={c('s63:bought') - 4} to={back + 20} color={P.coral} />
        <rect x={300} y={260 + 520 * (1 - (100 - 40) / 70)} width={1100} height={3} fill={P.champL} opacity={0.6} />
        <Label x={1410} y={260 + 520 * (1 - 60 / 70) - 14} text="where you started" size={32} anchor="end" color={P.champL} o={on(f, c('s63:started'))} />
        <g opacity={on(f, wait)}><Pedestal x={1640} y={860} r={110} /><Mini look="hero" x={1620} y={860} scale={1.3} frame={f} seed={9} mood="sad" /><Prop id="hourglass" x={1730} y={780} size={130} f={f} /></g>
        <Label x={1640} y={300} text={countTo(Math.max(1, Math.round(1 + 9 * span(f, c('s63:years'), back + 30))), 1, 0, '', ' YEARS')} size={70} font="Bebas Neue" color={P.coral} o={on(f, c('s63:years'))} />
        <Label x={850} y={180} text="A WONDERFUL BUSINESS, AT THE WRONG PRICE" size={56} font="Bebas Neue" color={P.champL} o={on(f, wonder)} />
      </g>
      <Vignette id="sv" />
    </g>
  )
}

export const ACT3 = [
  makePiece('dotcom', 'The year 2000: a bubble of real giants', {
    beats: ['s48', 's48:back', 's48:2000', 's48:top', 's48:dotcom', 's48:bubble', 's49', 's49:10', 's49:largest', 's49:reached', 's49:27', 's49:index', 's49:record', 's50', 's50:felt', 's50:safe', 's50:today',
      's51', 's51:not', 's51:fake', 's51:internet', 's51:startups', 's52:general', 's52:exxon', 's52:pfizer', 's52:cisco', 's52:citigroup', 's52:walmart', 's52:microsoft', 's52:aig', 's52:merck', 's52:intel', 's52:real', 's52:businesses', 's52:profits',
      's53', 's53:top', 's53:236', 's53:times', 's53:expected', 's53:against', 's53:16', 's53:rest', 's53:market'],
    sfx: [['s48:2000', 'whoosh', 0.5], ['s48:bubble', 'riser', 0.5], ['s49:27', 'tick', 0.5], ['s49:record', 'chime', 0.5], ['s50:safe', 'chime', 0.3], ['s51:fake', 'pop', 0.4], ['s51:startups', 'swish', 0.5],
      ['s52:general', 'pop', 0.4], ['s52:exxon', 'pop', 0.3], ['s52:pfizer', 'pop', 0.3], ['s52:cisco', 'pop', 0.3], ['s52:citigroup', 'pop', 0.3], ['s52:walmart', 'pop', 0.3], ['s52:microsoft', 'pop', 0.3], ['s52:aig', 'pop', 0.3], ['s52:merck', 'pop', 0.3], ['s52:intel', 'pop', 0.3],
      ['s52:profits', 'coin', 0.5], ['s53:236', 'tick', 0.6], ['s53:16', 'tick', 0.6]],
    Component: DotCom,
  }),
  makePiece('flip', 'Sound familiar? The premium flipped; buyers at the top slid down', {
    beats: ['s54', 's54:sound', 's54:familiar', 's55', 's55:five', 's55:later', 's55:giants', 's55:below', 's55:115', 's55:against', 's55:16', 's56', 's56:premium', 's56:shrink', 's57', 's57:flipped',
      's57a', 's57a:think', 's57a:people', 's57a:bought', 's57a:top', 's57b', 's57b:chosen', 's57b:biggest', 's57b:famous', 's57b:safestlooking', 's57b:world', 's57c', 's57c:exactly', 's57c:fell', 's57c:furthest', 's57c:favour', 's57c:good', 's57c:news', 's57c:already', 's57c:price'],
    sfx: [['s54:familiar', 'click', 0.5], ['s55:five', 'whoosh', 0.4], ['s55:115', 'tick', 0.5], ['s56:shrink', 'swish', 0.4], ['s57:flipped', 'thud', 0.7], ['s57a:bought', 'pop', 0.3], ['s57b:famous', 'chime', 0.4], ['s57c:fell', 'whoosh', 0.6], ['s57c:price', 'softpop', 0.6]],
    Component: Flip,
  }),
  makePiece('survivors', 'Only Microsoft survived; great company ≠ great price', {
    beats: ['s58', 's58:10', 's58:leaders', 's58:only', 's58:one', 's58:still', 's58:today', 's59:microsoft', 's60', 's60:rest', 's60:slid', 's60:rankings', 's60:new', 's60:giants', 's60:place', 's61', 's61:lesson', 's61:miss',
      's62', 's62:great', 's62:company', 's62:great#2', 's62:investment', 's62:any', 's62:price', 's62:different', 's63', 's63:wonderful', 's63:bought', 's63:wrong', 's63:price', 's63:waiting', 's63:years', 's63:back', 's63:started'],
    sfx: [['s58:leaders', 'whoosh', 0.4], ['s59:microsoft', 'ding', 0.6], ['s60:slid', 'swish', 0.6], ['s60:new', 'pop', 0.4], ['s61:lesson', 'chime', 0.4], ['s62:great', 'softpop', 0.5], ['s62:investment', 'softpop', 0.5], ['s62:any', 'click', 0.5],
      ['s63:wrong', 'thud', 0.5], ['s63:waiting', 'tick', 0.4], ['s63:back', 'riser', 0.4]],
    Component: Survivors,
  }),
]
