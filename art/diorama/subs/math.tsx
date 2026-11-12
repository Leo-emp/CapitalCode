// ---------------------------------------------------------------- s33–s50: why monthly is worth more (casino style).
// 1) A side-by-side race on a wooden stage, 2012 prices. On the left, the box owner stands by one gold block: the
// $2,600 box, paid once. On the right, Maya pays $50 a month: a coin drops each month and her stack grows a year at
// a time (a calendar flips YEAR 1 … 5) — $600, $1,200, $1,800, $2,400, $3,000 — past a dashed line at the box's
// height at ≈ 4.3 years; everything above the line glows EXTRA FOR ADOBE; at ten years the stack reaches $6,000.
// 2) A row of subscribers each wearing a $60 / MONTH tag; on "June" every tag flips to $70 at once (moved
// automatically), +$120 a year; beside them the box shelf, where only the next buyer sees a new price; one year at
// $70 is $840. 3) A heavy $2,600 boulder vs a $50 feather on two scales; people nod yes to the feather.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, Headline, Person, win } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { gestB } from '../buffett/hook'
import { CalPage, Maya, SoftBox, Studio } from './kit'

const PX = 0.11 // # pixels per dollar on the race stacks ($1,000 = 100 px)

const Math4: React.FC<PieceProps> = ({ f, c }) => {
  const one = c('s33:one'), n2600 = c('s33:2600'), once33 = c('s33:once'), two34 = c('s34:two'), n50 = c('s34:50'), n600 = c('s34:600')
  const three = c('s35:three'), divide = c('s35:divide'), four35 = c('s35:four'), paid35 = c('s35:paid'), four36 = c('s36:four'), extra = c('s36:extra'), stays = c('s36:stays')
  const line37 = c('s37:line'), y1 = c('s38:one'), y2 = c('s38:two'), n1200 = c('s38:1200'), y3 = c('s39:three'), n1800 = c('s39:1800'), y4 = c('s39:four'), n2400 = c('s39:2400')
  const y5 = c('s40:five'), n3000 = c('s40:3000'), more40 = c('s40:more'), owner41 = c('s41:owner'), once41 = c('s41:once'), ten = c('s42:ten'), n6000 = c('s42:6000')
  const price43 = c('s43:price'), june = c('s44:june'), n60 = c('s44:60'), n70 = c('s44:70'), america = c('s44:america'), existing = c('s45:existing'), auto = c('s45:automatically')
  const rise46 = c('s46:rise'), n120 = c('s46:120'), box47 = c('s47:box'), next47 = c('s47:next'), everyone = c('s47:everyone'), n840 = c('s48:840')
  const feel = c('s49:feel'), n2600b = c('s50:2600'), decision = c('s50:decision'), small50 = c('s50:small'), yes50 = c('s50:yes')
  // # extra gesture words
  const G = [c('s32:prices'), c('s33:box'), c('s34:subscription'), c('s35:subscriber'), c('s36:money'), c('s37:year'), c('s38:subscriber'), c('s39:years'), c('s40:already'), c('s41:long'), c('s42:price'), c('s44:plan'), c('s45:subscribers'), c('s46:month'), c('s47:subscription'), c('s48:year'), c('s49:paying'), c('s50:month'), c('s34:one'), c('s35:600'), c('s35:cost'), c('s36:month'), c('s36:for#2'), c('s37:a'), c('s38:600'), c('s40:box'), c('s41:2600'), c('s43:same'), c('s46:subscriber'), c('s47:only'), c('s48:70'), c('s32:go'), c('s32:that'), c('s32:step'), c('s32:step#2'), c('s32:2012')]
  const A = win(f, 0, price43 - 2, 10), B = win(f, price43 - 2, feel - 2, 10), Cw = on(f, feel - 2, 10)
  // # Maya's stack: one year at a time (≈ $600 each), then on to ten years
  const yearAt = [n600, n1200, n1800, n2400, n3000], yearsDone = yearAt.filter((t) => f >= t).length
  const stack = f >= n6000 - 20 ? lerp(3000, 6000, easeInOut(span(f, ten, n6000))) : yearsDone * 600
  const BOX = 2600, BASE = 960, SX = 1080, LX = 560
  const lineO = on(f, divide, 8)
  // # the price tags: $60 → $70 for everyone already paying, in a quick ripple
  // # a little hop on extra spoken words (subscribers react in turn)
  const hop = (k: number) => G.reduce((m, g, i) => (i % 5 === k ? Math.max(m, Math.max(0, 1 - Math.abs(f - g - 4) / 5)) : m), 0)
  const flipK = (k: number) => f >= auto + k * 3 || (f >= n70 && k === 0)
  return (
    <g>
      <StageBg id="sb-math" frame={f} />
      <Studio />
      {/* # 1: the race */}
      {A > 0 && <g opacity={A}>
        {/* # the box owner and the one gold block */}
        <Person f={f} who="owner" beats={gestB([[0, 'idle', 'neutral'], [once33, 'present', 'smiling'], [owner41, 'pockets', 'smiling'], [once41, 'thumbsUp', 'smiling']], G.slice(0, 4))} x={250} y={1000} s={1} />
        <g opacity={on(f, one, 6)}>
          <rect x={LX - 150} y={BASE - BOX * PX * easeInOut(span(f, one, n2600 + 6))} width={300} height={BOX * PX * easeInOut(span(f, one, n2600 + 6))} rx={14} fill={P.gold} stroke={P.goldD} strokeWidth={6} />
          <g transform={`translate(${LX} ${BASE - BOX * PX - 130})`}><SoftBox x={0} y={0} s={0.55} name="BOX" /></g>
          <text x={LX} y={BASE - BOX * PX / 2 + 20} textAnchor="middle" fill="#3A2A12" opacity={on(f, n2600, 6)} style={{ font: '400 64px "Bebas Neue"' }}>$2,600</text>
          <text x={LX} y={1050} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>BOX · PAID ONCE</text>
        </g>
        {/* # the dashed line at the box's height and the glow above it */}
        <g opacity={lineO}><path d={`M${LX - 140} ${BASE - BOX * PX} L${SX + 150} ${BASE - BOX * PX}`} stroke={P.coral} strokeWidth={6} strokeDasharray="22 14" /></g>
        {/* # Maya's subscription stack */}
        <g opacity={on(f, two34, 6)}>
          <rect x={SX - 150} y={BASE - stack * PX} width={300} height={stack * PX} rx={14} fill="#7FB4E8" stroke="#3A6EA8" strokeWidth={6} />
          {Array.from({ length: Math.floor(stack / 600) }, (_, k) => <rect key={k} x={SX - 150} y={BASE - (k + 1) * 66 - 2} width={300} height={4} fill="#3A6EA8" />)}
          {stack > BOX && <rect x={SX - 150} y={BASE - stack * PX} width={300} height={(stack - BOX) * PX} rx={14} fill={P.gold} opacity={0.75 * on(f, extra, 8)} />}
          <text x={SX} y={BASE - stack * PX - 26} textAnchor="middle" fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>{stack > 0 && (stack % 600 === 0 || stack >= 6000) ? `$${Math.round(stack).toLocaleString('en-US')}` : ''}</text>
          <text x={SX} y={1050} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>$50 A MONTH</text>
        </g>
        <g opacity={on(f, extra, 6) * (stack > BOX ? 1 : 0)} transform={`translate(${SX + 300} ${BASE - BOX * PX - 60})`}><rect x={-140} y={-40} width={280} height={80} rx={14} fill={P.gold} /><text y={16} textAnchor="middle" fill="#3A2A12" style={{ font: '400 46px "Bebas Neue"' }}>EXTRA FOR ADOBE</text></g>
        <g opacity={win(f, four35 - 4, four36, 6)} transform={`translate(${SX + 300} ${BASE - BOX * PX - 60}) scale(${pop(f, four35) * 1.15})`}><rect x={-120} y={-36} width={240} height={72} rx={14} fill={P.coral} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>≈ 4.3 YEARS</text></g>
        {/* # a coin each month, and the year calendar */}
        {Array.from({ length: 6 }, (_, k) => { const p = fly(f, n50 + k * 6, [1640, 640], [SX, BASE - stack * PX - 40], 10, 80); return <g key={k} opacity={p.o * (f < divide ? 1 : 0)}><Coin x={p.x} y={p.y} s={0.5} text="$50" /></g> })}
        <g opacity={on(f, y1 - 4, 6)}><CalPage x={1460} y={420} top="AFTER" big={f >= n6000 - 20 ? '10 YRS' : `${Math.max(1, yearsDone)} YR${yearsDone > 1 ? 'S' : ''}`} s={0.9} /></g>
        <Maya f={f} beats={gestB([[0, 'idle', 'neutral'], [two34, 'offer', 'neutral'], [divide, 'countA', 'thinking'], [extra, 'shock', 'shocked'], [line37, 'countA', 'neutral'], [y3, 'countB', 'neutral'], [more40, 'point', 'shocked'], [ten, 'despair', 'worried']], G.slice(4))} x={1720} s={1.05} flip />
      </g>}
      {/* # 2: the price rise reaches everyone already paying */}
      {B > 0 && <g opacity={B}>
        <g transform="translate(330 0)">
          <rect x={-230} y={560} width={460} height={16} rx={6} fill="#8E6A45" /><SoftBox x={-110} y={490} s={0.4} name="" /><SoftBox x={0} y={490} s={0.4} name="" /><SoftBox x={110} y={490} s={0.4} name="" />
          <text y={630} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>BOX: NEW PRICE</text>
          <text y={680} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>ONLY FOR NEXT BUYERS</text>
          <g opacity={on(f, box47, 6)}><Mini look="buyer" x={0} y={1000} scale={1.45} frame={f} seed={801} mood="neutral" /></g>
        </g>
        {Array.from({ length: 5 }, (_, k) => { const x = 820 + k * 225, fl = flipK(k); return <g key={k}>
          <Mini look={['hero', 'owner', 'worker', 'investor', 'buyer'][k]} x={x} y={1000 - 30 * hop(k)} scale={1.7} frame={f} seed={k + 820} mood={fl && f > auto ? 'sad' : 'neutral'} />
          <g transform={`translate(${x} ${lerp(620, 600, fl ? 1 : 0)}) scale(${fl && f >= auto + k * 3 && f < auto + k * 3 + 8 ? pop(f, auto + k * 3) : 1})`}><rect x={-100} y={-38} width={200} height={76} rx={12} fill={fl ? P.coral : '#7FB4E8'} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 48px "Bebas Neue"' }}>{fl ? '$70 / MO' : '$60 / MO'}</text></g>
        </g> })}
        <g opacity={win(f, june - 2, existing, 6)} transform={`translate(1270 380) scale(${pop(f, june)})`}><CalPage x={0} y={0} top="JUNE" big="2025" s={0.9} /></g>
        <g opacity={win(f, n120 - 2, n840 - 2, 6)} transform={`translate(1270 380) scale(${pop(f, n120)})`}><Coin x={0} y={0} s={1.5} /><text y={130} textAnchor="middle" fill={P.coralInk} style={{ font: '400 60px "Bebas Neue"' }}>+$120 A YEAR</text></g>
        <g opacity={on(f, n840 - 2, 6)} transform={`translate(1270 380) scale(${pop(f, n840)})`}><Coin x={0} y={0} s={1.5} /><text y={130} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"' }}>ONE YEAR ≈ $840</text></g>
      </g>}
      {/* # 3: how it feels — a heavy boulder vs a feather */}
      {Cw > 0 && <g opacity={Cw}>
        <g opacity={on(f, n2600b - 2, 8)} transform="translate(560 0)">
          <ellipse cx={0} cy={1000} rx={260} ry={26} fill="#000" opacity={0.15} />
          <path d="M-230 990 Q-260 760 -80 700 Q80 640 210 760 Q280 880 230 990 Z" fill="#8A94A8" stroke="#5B6680" strokeWidth={8} />
          <text y={880} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 90px "Bebas Neue"' }}>$2,600</text>
          <text y={600} textAnchor="middle" fill={P.ink} opacity={on(f, decision, 6)} style={{ font: '400 52px "Bebas Neue"' }}>A BIG DECISION</text>
        </g>
        <g opacity={on(f, small50 - 6, 8)} transform={`translate(1240 ${720 + 20 * Math.sin(f / 12)}) rotate(${-20 + 8 * Math.sin(f / 15)}) scale(1.5)`}>
          <path d="M0 -150 Q90 -40 10 150 Q-80 -20 0 -150 Z" fill="#FFFFFF" stroke="#C9B48E" strokeWidth={6} /><path d="M0 -140 L5 150" stroke="#C9B48E" strokeWidth={5} />
          <text x={140} y={20} fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>$50</text>
        </g>
        <Maya f={f} beats={gestB([[0, 'think', 'thinking'], [decision, 'nervous', 'worried'], [small50, 'relief', 'smiling'], [yes50, 'thumbsUp', 'smiling']], G)} x={1650} s={1.05} flip />
      </g>}
      <Headline f={f} lines={[[one, 'STEP 1: THE BOX, $2,600 ONCE', P.ink, 100], [two34, 'STEP 2: $50 A MONTH ≈ $600 A YEAR', P.ink, 96], [three, 'STEP 3: $2,600 ÷ $600 ≈ 4.3 YEARS', P.goldInk, 96], [four36, 'STEP 4: AFTER THAT, EXTRA FOR ADOBE', P.ink, 92],
        [line37, 'YEAR BY YEAR · 2012 PRICES', P.ink, 104], [ten, 'TEN YEARS: ABOUT $6,000', P.coralInk, 104], [june, 'JUNE 2025: $60 → $70 A MONTH', P.ink, 100], [existing, 'EXISTING SUBSCRIBERS MOVED TOO', P.coralInk, 98], [n840, 'ONE YEAR NOW ≈ $840', P.goldInk, 104], [feel, 'IT FEELS DIFFERENT', P.ink, 110]]} />
      <Vignette id="sb-math" />
    </g>
  )
}

const BEATS = ['s32:go', 's32:that', 's32:step', 's32:step#2', 's32:2012', 's32:prices', 's34:one', 's35:600', 's35:cost', 's36:month', 's36:for#2', 's37:a', 's38:600', 's40:box', 's41:2600', 's43:same', 's46:subscriber', 's47:only', 's48:70', 's33:box', 's34:subscription', 's35:subscriber', 's36:money', 's37:year', 's38:subscriber', 's39:years', 's40:already', 's41:long', 's42:price', 's44:plan', 's45:subscribers', 's46:month', 's47:subscription', 's48:year', 's49:paying', 's50:month',
  's33:one', 's33:2600', 's33:once', 's34:two', 's34:50', 's34:600', 's35:three', 's35:divide', 's35:four', 's35:paid', 's36:four', 's36:extra', 's36:stays', 's37:line', 's38:one', 's38:two', 's38:1200', 's39:three', 's39:1800', 's39:four', 's39:2400', 's40:five', 's40:3000', 's40:more', 's41:owner', 's41:once', 's42:ten', 's42:6000',
  's43:price', 's44:june', 's44:60', 's44:70', 's44:america', 's45:existing', 's45:automatically', 's46:rise', 's46:120', 's47:box', 's47:next', 's47:everyone', 's48:840', 's49:feel', 's50:2600', 's50:decision', 's50:small', 's50:yes']
export const SB_MATH = makePiece('sb-math', 'Subscriptions long (casino-style): a side-by-side race at 2012 prices — the box owner by one gold block, the $2,600 box paid once; Maya pays $50 a month, coins drop and her stack grows a year at a time ($600, $1,200, $1,800, $2,400, $3,000) past a dashed line at the box height at ≈ 4.3 years, the part above glowing EXTRA FOR ADOBE, reaching $6,000 at ten years; then a row of subscribers whose $60 / MO tags flip to $70 together in June 2025 (+$120 a year, one year ≈ $840) while on the box shelf only the next buyer sees a new price; finally a heavy $2,600 boulder (a big decision) vs a floating $50 feather and Maya gives a thumbs up', {
  mood: 'light', Component: Math4, beats: BEATS,
  sfx: [['s33:2600', 'thud', 0.3], ['s35:four', 'ding', 0.3], ['s36:extra', 'chime', 0.3], ['s42:6000', 'coin', 0.3], ['s44:70', 'swish', 0.3], ['s46:120', 'coin', 0.3], ['s50:yes', 'pop', 0.3]] })
