// ---------------------------------------------------------------- s92–s100: the whole story (casino style).
// Back in Maya's studio from the opening. A big recap board on the wall replays the story one picture at a time:
// one coin from the box vs a coin every month; the two stacks after a few years (the subscription taller than the
// box); a row of /MO tags flipping up together beside a calendar with a coin on the 1st; Adobe's tower dipping in
// 2013, then almost all gold; a pile of forgotten bills fading. Maya works happily at her laptop with update
// sparkles (worth it if you use it every day); a balance tips toward the company side; finally a big BUY button on
// the board morphs into SUBSCRIBE, and Maya turns to us with a smile.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, win } from '../aimoney/common'
import { gestB } from '../buffett/hook'
import { BillEnv, CalPage, Desk, Maya, SoftBox, Studio } from './kit'

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const story = c('s91:story'), onetime = c('s92:onetime'), once92 = c('s92:once'), sub92 = c('s92:subscription'), every92 = c('s92:every')
  const few = c('s93:few'), paid93 = c('s93:paid'), box93 = c('s93:box'), rises = c('s94:rises'), schedule = c('s94:schedule')
  const dip = c('s95:dip'), almost = c('s95:almost'), small96 = c('s96:small'), forget = c('s96:forget'), none = c('s97:none'), day97 = c('s97:day'), update = c('s97:update')
  const side = c('s98:side'), built = c('s98:built'), buy = c('s99:buy'), subscribe = c('s99:subscribe'), works = c('s100:works')
  // # extra gesture words
  const G = [c('s92:sale'), c('s93:subscriber'), c('s94:subscriber'), c('s95:switch'), c('s96:side'), c('s97:deal'), c('s98:helps'), c('s99:turned'), c('s100:money'), c('s92:stay'), c('s94:the'), c('s94:on#2'), c('s95:subscriptions'), c('s96:pay'), c('s97:is')]
  const BX = 1300, BY = 520 // # the recap board centre
  const P1 = win(f, onetime - 4, few - 2, 8), P2 = win(f, few - 2, rises - 2, 8), P3 = win(f, rises - 2, dip - 2, 8), P4 = win(f, dip - 2, small96 - 2, 8), P5 = win(f, small96 - 2, none - 2, 8)
  const P55 = win(f, none - 2, side - 2, 8), P6 = win(f, side - 2, buy - 2, 8), P7 = on(f, buy - 2, 8)
  const morph = easeInOut(span(f, subscribe - 6, subscribe + 8))
  return (
    <g>
      <StageBg id="sb-pay" frame={f} />
      <Studio />
      {/* # the recap board */}
      <rect x={BX - 440} y={BY - 270} width={880} height={540} rx={20} fill="#FFFFFF" stroke="#8E6A45" strokeWidth={12} />
      <g opacity={P1}>
        <SoftBox x={BX - 230} y={BY - 30} s={0.6} name="BOX" />
        <g opacity={on(f, once92, 4)} transform={`translate(${BX - 230} ${lerp(BY + 120, BY + 170, on(f, once92, 10))})`}><Coin x={0} y={0} s={0.9} /></g>
        <text x={BX - 230} y={BY + 250} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>PAYS ONCE</text>
        <g opacity={on(f, sub92, 6)}><CalPage x={BX + 220} y={BY - 60} top="EVERY MONTH" big="$" s={0.9} />
          {Array.from({ length: 4 }, (_, k) => { const t = ((f - every92 + k * 10) % 40) / 40; return <g key={k} opacity={on(f, every92, 4) * (t < 0.85 ? 1 : 0)}><Coin x={BX + 220} y={lerp(BY + 60, BY + 200, t)} s={0.5} /></g> })}
          <text x={BX + 220} y={BY + 250} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>PAYS EVERY MONTH</text></g>
      </g>
      <g opacity={P2}>
        <rect x={BX - 300} y={BY + 200 - 260 * on(f, few, 12)} width={200} height={260 * on(f, few, 12)} rx={12} fill={P.gold} />
        <text x={BX - 200} y={BY + 250} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>BOX</text>
        <rect x={BX + 100} y={BY + 200 - 400 * easeInOut(span(f, few, paid93 + 10))} width={200} height={400 * easeInOut(span(f, few, paid93 + 10))} rx={12} fill="#7FB4E8" />
        <text x={BX + 200} y={BY + 250} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>SUBSCRIPTION</text>
      </g>
      <g opacity={P3}>
        {Array.from({ length: 4 }, (_, k) => { const up = f >= rises + 4 + k * 2; return <g key={k} transform={`translate(${BX - 330 + k * 150} ${BY - 80})`}><rect x={-62} y={-30} width={124} height={60} rx={10} fill={up ? P.coral : '#7FB4E8'} /><text y={12} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>{up ? '$70/MO' : '$60/MO'}</text></g> })}
        <g opacity={on(f, schedule, 6)}><CalPage x={BX} y={BY + 110} top="EVERY MONTH" big="1ST" s={0.85} /><g transform={`translate(${BX + 140} ${BY + 150})`}><Coin x={0} y={0} s={0.8} /></g></g>
      </g>
      <g opacity={P4}>
        {[['2012', 4.4], ['2013', 4.06], ['2024', 21.5]].map(([yr, v], k) => { const h = 18 * (v as number) * easeInOut(span(f, dip + k * 5, dip + k * 5 + 14)); return <g key={k}><rect x={BX - 300 + k * 230} y={BY + 200 - h} width={160} height={h} rx={10} fill={k === 1 ? P.coral : '#9AA3B5'} />
          {k === 2 && <rect x={BX - 300 + k * 230} y={BY + 200 - h * 0.95 * on(f, almost, 12)} width={160} height={h * 0.95 * on(f, almost, 12)} rx={10} fill={P.gold} />}
          <text x={BX - 220 + k * 230} y={BY + 250} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>{yr as string}</text></g> })}
      </g>
      <g opacity={P5}>{Array.from({ length: 6 }, (_, k) => <BillEnv key={k} x={BX - 180 + (k % 3) * 180} y={BY - 60 + Math.floor(k / 3) * 170} s={0.8} r={(k % 2 ? 1 : -1) * 5} o={1 - 0.4 * on(f, forget + k * 3, 10)} />)}</g>
      <g opacity={P55}>
        <circle cx={BX} cy={BY - 40} r={130} fill={P.mint} opacity={on(f, day97 - 4, 8)} /><path d={`M${BX - 60} ${BY - 40} l45 45 l85 -95`} stroke="#FFFFFF" strokeWidth={26} fill="none" strokeLinecap="round" opacity={on(f, day97, 8)} />
        <text x={BX} y={BY + 170} textAnchor="middle" fill={P.ink} opacity={on(f, day97, 6)} style={{ font: '400 56px "Bebas Neue"' }}>USE IT EVERY DAY?</text><text x={BX} y={BY + 230} textAnchor="middle" fill={P.mintInk} opacity={on(f, update, 6)} style={{ font: '400 56px "Bebas Neue"' }}>CAN BE WORTH IT</text>
      </g>
      <g opacity={P6}>
        <path d={`M${BX} ${BY + 220} L${BX - 40} ${BY + 240} L${BX + 40} ${BY + 240} Z`} fill="#5B6680" /><rect x={BX - 6} y={BY - 40} width={12} height={260} fill="#5B6680" />
        <g transform={`translate(${BX} ${BY - 40}) rotate(${12 * easeInOut(span(f, side, built))})`}><rect x={-320} y={-8} width={640} height={16} rx={8} fill="#5B6680" />
          <g transform="translate(300 -10)"><Coin x={0} y={-30} s={0.8} /><Coin x={-40} y={-10} s={0.8} /><text y={80} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>COMPANY</text></g>
          <g transform="translate(-300 -10)"><Coin x={0} y={-30} s={0.5} /><text y={80} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>YOU</text></g></g>
      </g>
      <g opacity={P7} transform={`translate(${BX} ${BY}) scale(${pop(f, buy)})`}>
        <rect x={-300 - 40 * morph} y={-90} width={600 + 80 * morph} height={180} rx={90} fill={morph > 0.5 ? '#C2384A' : P.mint} />
        <text y={40} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 120px "Bebas Neue"' }}>{morph > 0.5 ? 'SUBSCRIBE' : 'BUY'}</text>
      </g>
      {/* # Maya at her desk, update sparkles when she uses it every day */}
      <Desk x={480}>
        <g opacity={win(f, day97 - 4, side, 6)}>{Array.from({ length: 4 }, (_, k) => <text key={k} x={380 + k * 70} y={560 - 30 * Math.sin((f - day97) / 6 + k)} textAnchor="middle" fill={P.gold} style={{ font: '700 50px Inter' }}>✦</text>)}<text x={480} y={640} textAnchor="middle" fill={P.ink} opacity={on(f, update, 6)} style={{ font: '400 44px "Bebas Neue"' }}>NEW UPDATE</text></g>
      </Desk>
      <Maya f={f} beats={gestB([[0, 'explain', 'smiling'], [onetime, 'point', 'neutral'], [few, 'countA', 'thinking'], [rises, 'point', 'worried'], [small96, 'facepalm', 'worried'], [none, 'type', 'smiling'], [side, 'think', 'thinking'], [buy, 'point', 'smiling'], [works, 'thumbsUp', 'smiling']], G)} x={170} s={1.05} />
      <Headline f={f} lines={[[story, 'THE WHOLE STORY', P.ink, 110], [onetime, 'ONCE VS EVERY MONTH', P.ink, 110], [few, 'A FEW YEARS IN: SUBSCRIBER PAID MORE', P.ink, 92], [rises, 'PRICE RISES REACH EVERYONE', P.ink, 104], [dip, 'A DIP, THEN ALMOST ALL SUBSCRIPTIONS', P.goldInk, 92],
        [small96, 'SMALL BILLS ARE EASY TO FORGET', P.ink, 100], [none, 'WORTH IT IF YOU USE IT DAILY', P.mintInk, 100], [side, 'BUILT FOR WHICH SIDE?', P.ink, 110], [buy, 'BUY → SUBSCRIBE', P.goldInk, 120], [works, 'THAT’S HOW THE MONEY ACTUALLY WORKS', P.ink, 88]]} />
      <Vignette id="sb-pay" />
    </g>
  )
}

const BEATS = ['s92:stay', 's94:the', 's94:on#2', 's95:subscriptions', 's96:pay', 's97:is', 's92:sale', 's93:subscriber', 's94:subscriber', 's95:switch', 's96:side', 's97:deal', 's98:helps', 's99:turned', 's100:money',
  's91:story', 's92:onetime', 's92:once', 's92:subscription', 's92:every', 's93:few', 's93:paid', 's93:box', 's94:rises', 's94:schedule', 's95:dip', 's95:almost', 's96:small', 's96:forget', 's97:none', 's97:day', 's97:update', 's98:side', 's98:built', 's99:buy', 's99:subscribe', 's100:works']
export const SB_PAYOFF = makePiece('sb-payoff', 'Subscriptions long (casino-style): back in Maya’s studio, a big recap board replays the story: a BOX that PAYS ONCE vs a calendar that PAYS EVERY MONTH; the box block vs a taller subscription stack; $60/MO tags flipping to $70/MO with a 1ST-of-the-month coin; Adobe bars 2012, 2013 (dip) and 2024 almost all gold; a pile of bills fading away; Maya works at her laptop with NEW UPDATE sparkles; a balance tips toward the COMPANY side; a big BUY button morphs into SUBSCRIBE and Maya gives a thumbs up', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s92:once', 'coin', 0.3], ['s94:rises', 'swish', 0.3], ['s95:dip', 'thud', 0.3], ['s99:subscribe', 'pop', 0.35]] })
