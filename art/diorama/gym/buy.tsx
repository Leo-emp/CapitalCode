// ---------------------------------------------------------------- s7–s17a: what you buy when you join.
// A) The new member takes the key tag at the desk; a $15 coin stack (a month) and a calendar ($49 once a year); the old
//    $10 tag flips to $15; three tags, two turn into Black Cards ($25); twelve monthly coins + the fee roll into $229.
// B) The one object that splits (r42): a green $15 bar above a month strip. Every day vs never: a runner and a
//    sleeper both pay the same coin. On "12" the bar splits into 12 parts ($1.25 each), then merges to 4 ($3.75),
//    then stays whole for one visit ($15); with no visits the bar drops into the gym's slot and the member shrugs.
// C) The gym's view: four identical tags all pay the same; a bank card sends a coin on the same calendar day each
//    month while the dumbbell stays on the rack; the coins settle into one steady column — the real product.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, fly, Headline, Label, Person, Tick, win } from '../aimoney/common'
import { BankCard, KeyTag, Rack, Sofa, SplitBar, Treadmill, VisitStrip, Zzz } from './kit'

const Buy: React.FC<PieceProps> = ({ f, c }) => {
  const s7 = c('s7'), buy = c('s7:buy'), join = c('s7:join')
  const d15 = c('s8:15'), d49 = c('s8:49'), year = c('s8:year')
  const d10 = c('s8a:10'), raised = c('s8a:raised'), n15 = c('s8a:15'), newM = c('s8a:new')
  const more8 = c('s8b:more')
  const two = c('s8b:two'), black = c('s8b:black'), d25 = c('s8b:25')
  const add = c('s9:add'), d229 = c('s9:229'), basic = c('s9a:basic'), plan9 = c('s9a:plan'), key10 = c('s10:key')
  const same = c('s10:same'), everyDay = c('s10:every'), never = c('s10:never')
  const real = c('s11:real'), often = c('s11:often')
  const d12 = c('s12:12'), split = c('s12:split'), dollar = c('s12:dollar')
  const d4 = c('s13:4'), d375 = c('s13:3')
  const once = c('s14:once'), full = c('s14:full')
  const paid = c('s15:paid'), nothing = c('s15:nothing')
  const gym16 = c('s16:gym'), same16 = c('s16:same')
  const bank = c('s17:bank'), day = c('s17:day'), month = c('s17:month'), lift = c('s17:lift')
  const steady = c('s17a:steady'), product = c('s17a:product')
  const A = win(f, s7, same), B = win(f, same, gym16), C = on(f, gym16, 12)
  // # B: how many parts the $15 bar is split into at this moment, and its per-visit label
  const parts = f >= once ? 1 : f >= d4 ? 4 : f >= split ? 12 : 1
  const each = f >= paid ? '' : f >= once ? '$15 A VISIT' : f >= d375 ? '$3.75 A VISIT' : f >= dollar ? '$1.25 A VISIT' : ''
  const visits = f >= c('s15:go') ? 0 : f >= once ? 1 : f >= d4 ? 4 : f >= d12 ? Math.round(12 * span(f, c('s12:12#2'), c('s12:visits'))) : 0
  const glow = Math.max(on(f, c('s12:each'), 4) * (1 - on(f, d4, 4)), on(f, c('s13:each'), 4) * (1 - on(f, once, 4)), on(f, c('s14:workout'), 4) * (1 - on(f, paid, 4)))
  const hero = [[0, 'receive', 'smiling'], [c('s8:member'), 'holdUp', 'smiling'], [d15, 'countOne', 'neutral'], [raised, 'shock', 'shocked'], [two, 'countA', 'neutral', 'countB', 14], [d229, 'countOne', 'thinking'], [basic, 'thumbsUp', 'smiling']] as const
  return (
    <g>
      <Stage id="gm-buy" frame={f} />
      <Headline f={f} lines={[[join, 'THE DAY YOU JOIN', P.ink, 100], [d229, '≈ $229 A YEAR', P.goldInk, 116], [same, 'SAME PRICE, ANY USE', P.ink, 104], [often, 'PRICE PER VISIT?', P.ink, 104], [gym16, 'TO THE GYM: ALL THE SAME', P.ink, 100], [product, 'THE REAL PRODUCT', P.goldInk, 112]]} />
      {/* # the drawing sits a little larger on the stage (static, never a zoom) */}
      <g transform="translate(960 900) scale(1.15) translate(-960 -900)">
      {/* # A) joining: hero takes the tag; the price pieces arrive one by one on their words */}
      {A > 0 && <g opacity={A}>
        <rect x={180} y={760} width={560} height={150} rx={20} fill="#C9B48E" /><rect x={180} y={740} width={560} height={30} rx={12} fill="#E2D2B0" />
        <Person f={f} who="hero" beats={hero as never} x={460} y={900} s={0.7} />
        <g opacity={on(f, join, 4) * (1 - on(f, d15, 6))} transform={`translate(640 600) scale(${0.55 * pop(f, join) * (1 + 0.15 * Math.sin(Math.PI * span(f, c('s8:basic'), c('s8:basic') + 12)))})`}><KeyTag x={0} y={0} text="MEMBER" /></g>
        {/* # $15 a month: a coin stack with its tag; $49 once a year: a calendar */}
        <g opacity={on(f, d15, 4) * (1 - on(f, two, 6))}>
          {Array.from({ length: 5 }, (_, k) => <Coin key={k} x={1080} y={720 - k * 36} s={1.35} o={on(f, d15 + k * 2, 4)} />)}
          <Label x={1080} y={850} text="$15 / MONTH" size={64} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, d49, 4) * (1 - on(f, two, 6))} transform={`translate(1500 620) scale(${1.6 * pop(f, d49)})`}><Calendar x={0} y={0} text="YEAR" s={1} /></g>
        <g opacity={on(f, year, 4) * (1 - on(f, two, 6))}><Label x={1500} y={850} text="+ $49 / YEAR" size={64} font="Bebas Neue" color={P.ink} /></g>
        {/* # the old price: a $10 tag (1998–2024) flips to $15 on "raised" */}
        <g opacity={on(f, d10, 4) * (1 - on(f, two, 6))} transform={`translate(${1290 + 10 * Math.sin((f - c('s8a:until')) / 2) * on(f, c('s8a:until'), 4) * (1 - on(f, raised, 4))} 420) scale(${1 - 0.5 * Math.sin(Math.PI * span(f, raised, raised + 12))} 1)`}>
          <rect x={-120} y={-60} width={240} height={120} rx={20} fill={f >= raised + 6 ? '#F08A3C' : '#7FC98A'} />
          <text x={0} y={24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 76px "Bebas Neue"' }}>{f >= raised + 6 ? '$15' : '$10'}</text>
          <text x={0} y={-76} textAnchor="middle" fill={P.ink2} opacity={on(f, c('s8a:26'), 4)} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>{f >= raised + 6 ? '2024' : '1998 – 2024'}</text>
        </g>
        <g opacity={on(f, newM, 4) * (1 - on(f, two, 6))}><Mini look="worker" x={1640} y={560} scale={0.9} frame={f} seed={14} mood="happy" /><g opacity={on(f, c('s8b:many'), 4)}><Mini look="investorF" x={1760} y={560} scale={0.9} frame={f} seed={15} mood="happy" /><Mini look="owner" x={1520} y={560} scale={0.9} frame={f} seed={16} mood="happy" /></g></g>
        <g opacity={on(f, more8, 4) * (1 - on(f, two, 6))}>{[0, 1, 2].map((k) => <Coin key={k} x={1080} y={590 - k * 26} s={0.9} o={on(f, more8 + k * 3, 4)} />)}</g>
        {/* # two thirds of members: three tags, two turn black ($25) */}
        <g opacity={on(f, two, 4) * (1 - on(f, add, 6))}>
          {[0, 1, 2].map((k) => { const bl = k < 2 && f >= black + k * 4; return <g key={k} transform={`translate(${880 + k * 320} 560) scale(${1.0 * pop(f, two + k * 3)})`}><KeyTag x={0} y={0} text={bl ? 'BLACK' : 'BASIC'} color={bl ? '#1C2230' : '#F08A3C'} /></g> })}
          <g opacity={on(f, d25, 4)}><Label x={1040} y={740} text="≈ $25 / MONTH" size={64} font="Bebas Neue" color={P.ink} /><path d="M840 660 L840 680 L1240 680 L1240 660" fill="none" stroke={P.ink2} strokeWidth={4} /></g>
        </g>
        {/* # a year: 12 monthly coins and the yearly fee roll into one pile labelled $229 */}
        <g opacity={on(f, plan9, 4)} transform={`translate(1290 ${lerp(640, 520, on(f, key10, 14))}) scale(${lerp(0.5, 0.9, on(f, key10, 14))}) rotate(${-10 * Math.sin(Math.PI * span(f, key10, key10 + 16))})`}><KeyTag x={0} y={0} text="BASIC" /></g>
        <g opacity={on(f, add, 4) * (1 - on(f, plan9, 6))}>
          {Array.from({ length: 13 }, (_, k) => { const t = span(f, add + k * 2, d229 + 6), x = lerp(900 + (k % 7) * 130, 1290, t), y = lerp(480 + Math.floor(k / 7) * 130, 700, t); return t < 1 ? <Coin key={k} x={x} y={y} s={k === 12 ? 1.1 : 0.8} text={k === 12 ? '49' : '15'} /> : null })}
          <g opacity={on(f, d229, 6)}><g opacity={on(f, c('s9:year'), 4)} transform="translate(1580 660) scale(1.1)"><Calendar x={0} y={0} text="YEAR" s={1} /></g>{Array.from({ length: 9 }, (_, k) => <Coin key={k} x={1290 + ((k % 3) - 1) * 80 * (1 - 0.4 * on(f, c('s9a:simple'), 6))} y={720 - Math.floor(k / 3) * 54} s={1.3} />)}<Label x={1290} y={850} text="$229" size={96} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}
      {/* # B) the $15 bar that splits on the spoken visit counts */}
      {B > 0 && <g opacity={B}>
        {/* # every day vs never: a runner and a sleeper, the same coin above each */}
        <g opacity={on(f, everyDay, 4) * (1 - on(f, real, 6))}>
          <Treadmill x={620} y={880} s={1} f={f} run={1} used={1} /><Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={590} y={860} s={0.72} />
          <g opacity={on(f, never, 4)}><Sofa x={1330} y={880} s={0.8} /><Mini look="buyer" x={1330} y={850} scale={1.3} frame={f} seed={9} /><Zzz x={1390} y={660} f={f} /></g>
          <Coin x={620} y={330} s={1.2} text="15" o={on(f, same, 4)} /><Coin x={1330} y={330} s={1.2} text="15" o={on(f, never, 4)} />
        </g>
        <g opacity={on(f, real, 6)}>
          <g transform={`translate(0 ${-14 * Math.sin(Math.PI * span(f, c('s12:15'), c('s12:15') + 12))})`}><SplitBar x={960} y={500} w={1200} n={parts} t={span(f, split, split + 14)} total="$15 A MONTH" each={each} o={1 - on(f, nothing, 6)} /></g>
          <VisitStrip x={960} y={780} n={visits} o={on(f, c('s11:thing'), 4)} />
          <g opacity={on(f, c('s11:workout'), 4) * (1 - on(f, c('s11:thing'), 4))} transform="translate(960 820)"><Treadmill x={0} y={0} s={0.6} f={f} run={1} used={1} /></g>
          <rect x={360} y={440} width={1200 / Math.max(1, parts)} height={120} rx={16} fill="none" stroke={P.goldInk} strokeWidth={8} opacity={glow} />
          <g opacity={on(f, c('s12:month'), 4) * (1 - on(f, d12, 4))}><Calendar x={1660} y={500} text="MONTH" s={1} /></g>
          <Label x={960} y={870} text={visits === 1 ? '1 VISIT' : `${visits} VISITS`} size={48} font="Bebas Neue" color={P.ink2} o={on(f, d12, 4)} />
          {/* # no visits: the whole bar drops into the gym's slot, the member shrugs */}
          <g opacity={on(f, paid, 4)}>
            <rect x={760} y={560} width={400} height={40} rx={16} fill={P.navy3} />
            <g transform={`translate(0 ${lerp(-60, 90, span(f, paid, nothing + 10))})`} opacity={1 - on(f, nothing + 12, 4)}><SplitBar x={960} y={500} w={420} n={1} t={0} /></g>
            <g opacity={on(f, nothing, 4)}><Person f={f} who="buyer" beats={[[0, 'shrug', 'worried']]} x={1500} y={1000} s={0.6} /></g>
          </g>
        </g>
      </g>}
      {/* # C) the gym's side: identical tags, a bank card paying on the same day each month */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, bank, 6)}>{[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(${420 + k * 360} ${560 - 30 * on(f, c('s16:members'), 6)}) scale(${0.95 * pop(f, gym16 + k * 3)})`}><KeyTag x={0} y={0} text="$15" /><g opacity={on(f, c('s16:worth') + k * 3, 4)}><Coin x={0} y={170} s={1.2} text="15" /></g><g opacity={on(f, same16, 4)}><Tick x={120} y={-90} o={1} r={34} /></g></g>)}</g>
        <g opacity={on(f, bank, 4)}>
          <BankCard x={420} y={560} s={0.9} r={-6} />
          <g transform="translate(1000 520) scale(1.3)"><Calendar x={0} y={0} text="1ST" s={1} /></g>
          {/* # one coin per month from the card to the gym's column */}
          {[0, 1, 2, 3, 4].map((k) => { const p = fly(f, day + k * 16, [420, 520], [1500, 700 - k * 34], 20, 180); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.9} o={p.o} /> : null })}
          {Array.from({ length: 5 }, (_, k) => <Coin key={k} x={1500} y={700 - k * 34} s={0.9} o={f >= day + k * 16 + 20 ? 1 : 0} />)}
          <g opacity={on(f, month, 4)}><Label x={1000} y={680} text="EVERY MONTH" size={46} font="Bebas Neue" color={P.ink} /></g>
          {/* # the dumbbell never leaves the rack */}
          <g opacity={on(f, lift, 4) * (1 - on(f, steady, 6))} transform={`rotate(${3 * Math.sin((f - c('s17:single')) / 3) * on(f, c('s17:single'), 4) * (1 - on(f, c('s17:single') + 20, 4))} 1000 980)`}><Rack x={1000} y={980} s={0.9} /></g>
          {/* # the steady column: the coins rise into one tall stack */}
          <g opacity={on(f, steady, 6)}><ellipse cx={1500} cy={660} rx={140} ry={300} fill={P.gold} opacity={0.15 * on(f, c('s17a:gym'), 6)} />{Array.from({ length: 16 }, (_, k) => <Coin key={k} x={1500} y={860 - k * 34} s={0.9} o={k < 12 ? on(f, steady + k * 2, 4) : on(f, c('s17a:member') + (k - 12) * 3, 4)} />)}<Label x={1500} y={960} text="STEADY" size={52} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}
      </g>
      <Vignette id="gm-buy" />
    </g>
  )
}

export const GM_BUY = makePiece('gm-buy', 'Gym long: joining ($15 a month + $49 a year, was $10, two thirds Black Card $25, $229 a year); one $15 bar splits by visits (12 → $1.25, 4 → $3.75, 1 → $15, 0 → nothing); the gym gets the same coin every month', {
  mood: 'light', Component: Buy,
  beats: ["s7", "s7:buy", "s7:join", "s8:15", "s8:49", "s8:year", "s8a:10", "s8a:raised", "s8a:new", "s8b:more", "s8b:two", "s8b:black", "s8b:25", "s9:add", "s9:229", "s9a:basic", "s9a:plan", "s10:key", "s10:same", "s10:every", "s10:never", "s11:real", "s11:often", "s12:12", "s12:split", "s12:dollar", "s13:4", "s13:3", "s14:once", "s14:full", "s15:paid", "s15:nothing", "s16:gym", "s16:same", "s17:bank", "s17:day", "s17:month", "s17:lift", "s17a:steady", "s17a:product", "s15:go", "s12:12#2", "s12:visits", "s12:each", "s13:each", "s14:workout", "s8:member", "s8:basic", "s8a:until", "s8a:26", "s8b:many", "s9:year", "s9a:simple", "s12:15", "s11:thing", "s11:workout", "s12:month", "s16:members", "s16:worth", "s17:single", "s17a:gym", "s17a:member"],
  sfx: [['s7:join', 'ding', 0.3], ['s8:15', 'coin', 0.35], ['s8a:raised', 'swish', 0.3], ['s9:229', 'cash', 0.35], ['s12:split', 'pop', 0.3], ['s13:4', 'pop', 0.3], ['s14:once', 'pop', 0.3], ['s15:nothing', 'thud', 0.35], ['s17:day', 'coin', 0.35], ['s17a:steady', 'chime', 0.3]] })
