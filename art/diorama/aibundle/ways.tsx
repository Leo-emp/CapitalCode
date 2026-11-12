// ---------------------------------------------------------------- s37–s58: two ways to sell AI.
// A) Way one: an add-on box with the spark sits beside the subscription; only two people walk over to it. Copilot
//    Pro (January 2024): $20 a month → $240 a year, stacked on top of the subscription.
// B) Way two: the spark goes inside the box; a row of everyone gets the price rise (+$3 a month / +$30 a year).
// C) Example, round numbers: 100 small figures. Way one: 5 gold buyers × $240 → a $1,200 pile. Way two: all 100 ×
//    $30 → $3,000. Most figures never send a request (grey); only a few light the AI bill; the light users' coins
//    flow toward the heavy users.
// D) Results: a crowd (89 million, +8%), sales +11% — from more people and more per person.
// E) Google: Workspace with Gemini, for businesses; $12 → $14 per person a month.
// F) There was a way to keep the old price: a small door behind the box, hard to find.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { DataCenter, Headline, Label, Prop, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Coin, Spark, Spot, SubBox, Tag, XMark } from './kit'
import { CoinColumn, Page } from './kit2'

const GROUND = 930
// # a tiny person glyph for the 100-person example grid (cheap to draw 100 times)
const Dot: React.FC<{ x: number; y: number; color: string; o?: number; s?: number }> = ({ x, y, color, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><circle cx={0} cy={-26} r={11} fill={color} /><rect x={-13} y={-14} width={26} height={30} rx={11} fill={color} /></g>
)
const LOOKS = ['investorF', 'buyer', 'worker', 'owner', 'investor', 'hero']

const Ways: React.FC<PieceProps> = ({ f, c }) => {
  const ways = c('s37:ways'), back37 = c('s37:back')
  const one38 = c('s38:one'), sell = c('s38:sell'), extra38 = c('s38:extra'), only38 = c('s38:only'), want = c('s38:want')
  const year41 = c('s41:year'), way47 = c('s47:way'), with48 = c('s48:with'), more48 = c('s48:more'), people49 = c('s49:people'), nothing49b = c('s49:nothing'), send49 = c('s49:send'), growth54 = c('s54:growth'), ms54 = c('s54:microsoft'), case58 = c('s58:case'), each54 = c('s54:each'), jan54 = c('s54:january'), year44 = c('s44:year'), yearly44 = c('s44:yearly'), d240c = c('s47:240'), company47 = c('s47:company'), ms52 = c('s52:microsoft'), back37b = c('s37:back'), one38b = c('s38:one'), uses44 = c('s44:uses'), price44 = c('s44:price'), d3b = c('s44:3'), before52 = c('s52:before'), year53 = c('s53:year'), pay38 = c('s38:pay'), ms39 = c('s39:microsoft'), first39 = c('s39:first'), jan40 = c('s40:january'), did43 = c('s43:did'), personal44 = c('s44:personal'), copilot44 = c('s44:copilot'), way45 = c('s45:way'), round45 = c('s45:round'), results = c('s51:results'), june = c('s52:june'), ms55 = c('s55:microsoft'), jan56 = c('s56:january')
  const tried = c('s39:tried'), launched = c('s40:launched'), pro = c('s40:pro'), inside = c('s40:inside'), d20 = c('s40:20'), month40 = c('s40:month')
  const d240 = c('s41:240'), top = c('s41:top')
  const way42 = c('s42:way'), ai42 = c('s42:ai'), plan42 = c('s42:plan'), everyone = c('s42:everyone'), raise = c('s42:raise'), everyone2 = c('s42:everyone#2')
  const later = c('s43:later'), exactly = c('s43:exactly')
  const got = c('s44:got'), allowance = c('s44:allowance'), went44 = c('s44:went'), d3 = c('s44:3'), d30 = c('s44:30')
  const why45 = c('s45:why'), imagine = c('s45:imagine'), example = c('s45:example')
  const picture = c('s46:picture'), d100 = c('s46:100')
  const one47 = c('s47:one'), d5 = c('s47:5'), buy = c('s47:buy'), d240b = c('s47:240'), collects47 = c('s47:collects'), d1200 = c('s47:1200')
  const two48 = c('s48:two'), all48 = c('s48:all'), pay48 = c('s48:pay'), d30b = c('s48:30'), collects48 = c('s48:collects'), d3000 = c('s48:3000')
  const never49 = c('s49:never'), nina49 = c('s49:nina'), nothing49 = c('s49:nothing'), bill = c('s49:bill'), request = c('s49:request')
  const bundle = c('s50:bundle'), barely = c('s50:barely'), help = c('s50:help'), lot = c('s50:lot')
  const showed = c('s51:showed'), d89 = c('s52:89'), consumer = c('s52:consumer'), d8 = c('s52:8')
  const revenue = c('s53:revenue'), d11 = c('s53:11')
  const things = c('s54:things'), subscribers54 = c('s54:subscribers'), money54 = c('s54:money'), increase = c('s54:increase')
  const not55 = c('s55:not'), google = c('s56:google'), gemini = c('s56:gemini'), workspace = c('s56:workspace'), businesses = c('s56:businesses')
  const standard = c('s57:standard'), d12 = c('s57:12'), per57 = c('s57:per'), month57 = c('s57:month')
  const keep = c('s58:keep'), old = c('s58:old'), easy = c('s58:easy'), find = c('s58:find')

  const A = win(f, ways - 20, way42), B = win(f, way42 - 2, why45), Cc = win(f, why45 - 2, showed), D = win(f, showed - 2, not55), E = win(f, not55 - 2, c('s58')), F = on(f, c('s58') - 2, 8)
  // # the grid of 100: who buys the extra (5) and who uses Copilot a lot (the same 5)
  const HEAVY = new Set([12, 27, 44, 61, 88])
  return (
    <g>
      <Stage id="ab-ways" frame={f} />
      <Spot f={f} at={d240} x={1250} y={560} rx={220} ry={160} />
      <Spot f={f} at={d1200} x={1250} y={760} rx={160} ry={200} />
      <Spot f={f} at={d3000} x={1600} y={720} rx={160} ry={240} />
      <Spot f={f} at={d89} x={960} y={720} rx={260} ry={160} />
      <Spot f={f} at={d12} x={1450} y={640} rx={200} ry={140} />
      <Headline f={f} lines={[[ways, 'TWO WAYS TO GET THE MONEY BACK', P.ink, 100], [one38, 'WAY 1: SELL AI AS AN EXTRA', P.ink, 104], [launched, 'JANUARY 2024: COPILOT PRO', P.ink, 104], [d240, '$240 A YEAR ON TOP', P.coralInk, 110],
        [way42, 'WAY 2: PUT IT IN THE PLAN', P.ink, 104], [later, 'JANUARY 2025: MICROSOFT DID IT', P.ink, 100], [d30, '+$3 A MONTH · +$30 A YEAR', P.coralInk, 104],
        [why45, 'EXAMPLE · ROUND NUMBERS', P.ink2, 104], [one47, 'WAY 1: 5 PEOPLE × $240', P.ink, 104], [two48, 'WAY 2: 100 PEOPLE × $30', P.ink, 104], [never49, 'MOST NEVER SEND A REQUEST', P.ink, 100], [bundle, 'LIGHT USERS HELP PAY FOR HEAVY USERS', P.ink, 88],
        [showed, "MICROSOFT'S RESULTS", P.ink, 110], [d89, '89 MILLION SUBSCRIBERS · JUNE 2025', P.ink, 92], [d11, 'SUBSCRIPTION REVENUE +11%', P.mintInk, 100], [things, 'MORE PEOPLE + MORE PER PERSON', P.ink, 96],
        [not55, 'NOT ONLY MICROSOFT', P.ink, 110], [standard, 'BUSINESS STANDARD: $12 → $14', P.coralInk, 100], [keep, 'A WAY TO KEEP THE OLD PRICE…', P.ink, 104], [easy, '…BUT NOT EASY TO FIND', P.coralInk, 110]]} />

      {/* # A) way one: an extra, bought by a few */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {f >= back37b && (() => { const fl = fly(f, back37b, [1500, 300], [700, 560], 20, 100); return fl.t < 1 ? <Coin x={fl.x} y={fl.y} r={40} o={fl.o} /> : null })()}
        <g opacity={on(f, one38b, 8) * (1 - on(f, extra38, 8))} transform={`translate(1300 600) scale(${pop(f, one38b)})`}><circle r={80} fill={P.card} stroke={P.gold} strokeWidth={6} /><Label x={0} y={30} text="1" size={96} font="Bebas Neue" color={P.goldInk} /></g>
        <SubBox x={700} y={560} s={0.85 * (1 + 0.06 * on(f, ms39, 6) * (1 - on(f, tried + 10, 8)))} tiles={1} />
        {f >= pay38 && [0, 1].map((k) => { const fl = fly(f, pay38 + k * 6, [1500 + k * 70, GROUND - 280], [1300, 640], 18, 90); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={30} o={fl.o} /> : null })}
        <g opacity={on(f, first39, 8) * (1 - on(f, jan40, 8))} transform={`translate(1520 370) scale(${pop(f, first39)})`}><circle r={60} fill={P.gold} /><Label x={0} y={18} text="1ST" size={52} font="Bebas Neue" color={P.navy0} /></g>
        <g opacity={on(f, jan40, 8) * (1 - on(f, d20, 8))}><Page x={1600} y={380} s={0.8 * pop(f, jan40)} top="JANUARY" big="2024" /></g>
        {/* # the add-on box: slides in beside the subscription, then climbs on top of it on "on top" */}
        <g opacity={on(f, extra38, 8)} transform={`translate(${lerp(1300, 700, on(f, top, 20))} ${lerp(520, 280, on(f, top, 20))}) scale(${lerp(1, 0.7, on(f, top, 20))})`}>
          <rect x={-150} y={-120} width={300} height={240} rx={30} fill="#FFFFFF" stroke="#8A5BD6" strokeWidth={6} strokeDasharray="16 10" />
          <Spark x={0} y={-10} s={1} f={f} glow={1} />
          <Label x={0} y={100} text={f >= pro ? 'COPILOT PRO' : 'EXTRA'} size={44} font="Bebas Neue" color="#6B45B0" />
        </g>
        <g opacity={on(f, d20, 8) * (1 - on(f, top, 10))}><Tag x={1690} y={560} text={f >= d240 ? '$240' : '$20'} sub={f >= d240 ? 'A YEAR' : 'A MONTH'} s={1.1 * (1 + 0.1 * on(f, year41, 6) * (1 - on(f, year41 + 14, 8)))} color={P.gold} /></g>
        <g opacity={on(f, top, 8)}><Tag x={1200} y={300} text="+$240" sub="A YEAR" s={1.0} color={P.coral} /></g>
        {/* # only the people who want it walk over */}
        {[0, 1].map((k) => { const t = on(f, want + k * 6, 30)
          return <g key={k} opacity={on(f, only38 + k * 4, 8) * (1 - on(f, launched, 10))}><Mini look={LOOKS[k]} x={lerp(1800 + k * 70, 1580 + k * 90, t)} y={GROUND} scale={1.6} frame={f} seed={k} mood="happy" /></g> })}
      </g>}

      {/* # B) way two: in the plan, everyone pays */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <SubBox x={960} y={420} s={0.85 * (1 + 0.05 * on(f, did43, 6) * (1 - on(f, exactly + 12, 8)))} title={f >= personal44 ? 'BOTH PLANS' : 'MICROSOFT 365'} seat={on(f, ai42, 6) * (1 - on(f, plan42, 10)) + on(f, exactly, 6) * (1 - on(f, got, 8))} />
        {(() => { const t = on(f, ai42, 16); return <Spark x={lerp(1500, 1155, t)} y={lerp(200, 250, t) - Math.sin(t * Math.PI) * 60} s={0.9 * (1 + 0.25 * on(f, copilot44, 6) * (1 - on(f, copilot44 + 14, 10)))} f={f} glow={1} /> })()}
        {Array.from({ length: 10 }, (_, k) => <g key={k} opacity={on(f, everyone + k * 2, 8)}>
          <Mini look={LOOKS[k % 6]} x={190 + k * 171} y={GROUND} scale={1.1} frame={f} seed={k + 9} mood={f >= raise ? 'sad' : 'neutral'} />
          <g opacity={on(f, everyone2 + k, 8)}><Coin x={190 + k * 171} y={GROUND - 260 - 14 * on(f, yearly44 + k, 6) * (1 - on(f, yearly44 + k + 12, 8))} r={(f >= year44 && f < why45 ? 1.1 : 1) * 30 * (1 + 0.3 * on(f, d3b + k, 6) * (1 - on(f, d3b + k + 12, 8)))} t={f >= d30 ? '$30' : '$3'} color={P.coral} /></g></g>)}
        <g opacity={on(f, later, 8) * (1 - on(f, got, 10))}><Page x={1640} y={470} s={0.8} top="JANUARY" big="2025" /></g>
        {/* # the monthly AI allowance: a small fuel gauge next to the spark */}
        <g opacity={on(f, allowance, 8)} transform="translate(1500 470)">
          <rect x={-40} y={-90} width={80} height={180} rx={18} fill="#FFFFFF" stroke="#8A5BD6" strokeWidth={5} />
          <rect x={-28} y={78 - 150 * on(f, allowance, 20)} width={56} height={150 * on(f, allowance, 20)} rx={10} fill="#8A5BD6" opacity={0.7} />
          {[0, 1, 2].map((k) => <rect key={k} x={-30} y={30 - k * 45} width={60} height={6} fill="#FFFFFF" opacity={on(f, uses44 + k * 4, 6)} />)}
          <g opacity={on(f, price44, 6)}><Label x={0} y={-110} text="PRICE UP" size={40} font="Bebas Neue" color={P.coralInk} /></g>
          <Label x={0} y={140} text="AI USES / MONTH" size={36} font="Bebas Neue" color={P.ink2} />
        </g>
      </g>}

      {/* # C) the 100-person example */}
      {Cc > 0 && <g opacity={Cc}>
        <Ground y={GROUND} />
        {/* # "way two brings in more": a 2 medallion with a rising arrow, on the right, clear of the example frame */}
        <g opacity={on(f, way45, 8) * (1 - on(f, d100, 10))} transform={`translate(1420 560) scale(${pop(f, way45)})`}><circle r={70} fill={P.card} stroke={P.gold} strokeWidth={6} /><Label x={0} y={28} text="2" size={84} font="Bebas Neue" color={P.goldInk} /><path d="M130 60 L130 -40 M100 -10 L130 -48 L160 -10" fill="none" stroke={P.mintInk} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /></g>
        {([[1250, way47], [1600, with48]] as [number, number][]).map(([x, at], k) => <g key={k} opacity={on(f, at, 8) * (1 - on(f, never49, 8))} transform={`translate(${x} 330) scale(${pop(f, at)})`}><circle r={56} fill={P.card} stroke={P.gold} strokeWidth={5} /><Label x={0} y={22} text={String(k + 1)} size={64} font="Bebas Neue" color={P.goldInk} /></g>)}
        <g opacity={on(f, imagine, 8) * (1 - on(f, d100, 10))}><rect x={180} y={260} width={760} height={640} rx={30} fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="20 14" /><Label x={560} y={600} text={f >= round45 ? 'ROUND NUMBERS' : 'EXAMPLE'} size={64} font="Bebas Neue" color={P.ink2} /></g>
        {Array.from({ length: 100 }, (_, k) => {
          const heavy = HEAVY.has(k), x = 230 + (k % 10) * 74, y = 300 + Math.floor(k / 10) * 60
          const buyer = heavy && f >= d5, all = f >= all48 && f < never49
          const grey = f >= never49 && !heavy
          const color = grey ? '#BFB5A3' : buyer && f < two48 ? P.gold : all ? P.mint : heavy && f >= never49 ? '#8A5BD6' : P.navy3
          return <Dot key={k} x={x} y={y} color={color} o={on(f, d100 + Math.floor(k / 10) * 2, 8)} s={(buyer && f < two48 ? 1.25 : 1) * (all ? (1 + 0.2 * on(f, more48, 6) * (1 - on(f, more48 + 14, 8))) : 1) * (!heavy ? (1 + 0.15 * on(f, people49, 6) * (1 - on(f, people49 + 14, 8))) : 1)} />
        })}
        {/* # the two piles */}
        {[...HEAVY].map((k, j) => <g key={k} opacity={on(f, d240c + j * 2, 6) * (1 - on(f, two48, 8))}><Coin x={230 + (k % 10) * 74} y={300 + Math.floor(k / 10) * 60 - 56} r={16} t="" /></g>)}
        <g opacity={on(f, company47, 6) * (1 - on(f, collects47 + 10, 8))}><ellipse cx={1250} cy={GROUND - 10} rx={110} ry={30} fill={P.gold} opacity={0.4} /></g>
        <g opacity={on(f, collects47, 8)}><CoinColumn x={1250} y={GROUND - 20} n={Math.round(on(f, collects47, 20) * 6)} w={150} />
          <g opacity={on(f, d1200, 8)}><Label x={1250} y={GROUND + 70} text="WAY 1: $1,200" size={52} font="Bebas Neue" color={P.goldInk} /></g></g>
        <g opacity={on(f, collects48, 8)}><CoinColumn x={1600} y={GROUND - 20} n={Math.round(on(f, collects48, 26) * 15)} w={150} color={P.mint} />
          <g opacity={on(f, d3000, 8)}><Label x={1600} y={GROUND + 70} text="WAY 2: $3,000" size={52} font="Bebas Neue" color={P.mintInk} /></g></g>
        <g opacity={on(f, buy, 8) * (1 - on(f, two48, 8))}><Label x={600} y={GROUND + 70} text={`5 × $240`} size={56} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, pay48, 8) * (1 - on(f, never49, 8))}><Label x={600} y={GROUND + 70} text={`100 × $30`} size={56} font="Bebas Neue" color={P.mintInk} /></g>
        {/* # the AI bill: only the heavy users send requests */}
        <g opacity={on(f, bill, 8) * (1 - on(f, bundle, 10))}>
          <DataCenter x={1430} y={560} s={0.45} f={f} />
          {[...HEAVY].map((k, j) => <line key={k} x1={230 + (k % 10) * 74} y1={300 + Math.floor(k / 10) * 60 - 26} x2={1300} y2={480} stroke="#8A5BD6" strokeWidth={3} strokeDasharray="8 8" opacity={on(f, request + j * 2, 8) * 0.8} />)}
          <Label x={1430} y={640} text="AI BILL" size={44} font="Bebas Neue" color={P.ink2} />
        </g>
        <g opacity={on(f, nothing49b, 8) * (1 - on(f, bundle, 8))}><Coin x={1600} y={420} r={44} t="0" /></g>
        <g opacity={on(f, send49, 8) * (1 - on(f, bundle, 8))}><g transform="translate(1050 380)"><rect x={-34} y={-24} width={68} height={48} rx={8} fill="#FFFFFF" stroke={P.ink2} strokeWidth={4} /><XMark x={0} y={0} o={1} size={30} /></g></g>
        <g opacity={on(f, nina49, 8) * (1 - on(f, bundle, 8))}><Label x={600} y={GROUND + 70} text="NO REQUESTS ≈ NO AI COST" size={48} font="Bebas Neue" color={P.ink2} /></g>
        {/* # the bundle: light users' coins drift to the heavy users */}
        {f >= help && [0, 1, 2, 3, 4].map((k) => { const t = ((f - help + k * 9) % 45) / 45, src = [3, 35, 58, 76, 95][k], dst = [...HEAVY][k]
          const ax = 230 + (src % 10) * 74, ay = 300 + Math.floor(src / 10) * 60 - 40, bx = 230 + (dst % 10) * 74, by = 300 + Math.floor(dst / 10) * 60 - 40
          return <g key={k} opacity={Math.sin(t * Math.PI) * (1 - on(f, showed - 10, 8))}><Coin x={lerp(ax, bx, t)} y={lerp(ay, by, t) - Math.sin(t * Math.PI) * 60} r={16} t="" /></g> })}
        <g opacity={on(f, barely, 8)}><Label x={600} y={GROUND + 70} text={f >= lot ? 'PURPLE: USE IT A LOT' : 'GREY: BARELY USE IT'} size={48} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      {/* # D) results */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <g opacity={on(f, showed, 8) * (1 - on(f, d89, 10))} transform={`translate(760 560) scale(${pop(f, showed) * (1 + 0.06 * on(f, results, 6) * (1 - on(f, results + 14, 8)))})`}>{[0, 1, 2].map((k) => <rect key={k} x={-150 + k * 110} y={-80 - k * 70} width={80} height={180 + k * 70} rx={10} fill={[P.sky, P.mint, P.gold][k]} />)}</g>
        <g opacity={on(f, ms52, 8) * (1 - on(f, d89, 10))}><SubBox x={1650} y={540} s={0.45} /></g>
        <g opacity={on(f, june, 8) * (1 - on(f, d89, 10))}><Page x={1260} y={520} s={0.9 * pop(f, june)} top="JUNE" big="2025" /></g>
        {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, (k < 11 ? d89 : d8) + (k % 11) * 2, 8)}>
          <Mini look={LOOKS[k % 6]} x={180 + k * 140} y={GROUND} scale={1.0} frame={f} seed={k + 20} mood="neutral" />
          <g opacity={on(f, money54 + k, 8)}><Coin x={180 + k * 140} y={GROUND - 250} r={lerp(20, 34, on(f, increase, 16)) * (1 + 0.2 * on(f, each54 + k, 6) * (1 - on(f, each54 + k + 10, 8)))} t="" /></g></g>)}
        <g opacity={on(f, before52, 8) * 0.25 * (1 - on(f, revenue, 10))}>{Array.from({ length: 11 }, (_, k) => <Mini key={k} look={LOOKS[k % 6]} x={250 + k * 140} y={GROUND - 120} scale={0.7} frame={f} seed={k + 80} />)}</g>
        <g opacity={on(f, year53, 8) * (1 - on(f, revenue, 6))} transform="translate(960 500)"><rect x={-260} y={-60} width={520} height={120} rx={20} fill="none" stroke={P.ink2} strokeWidth={4} strokeDasharray="14 10" /></g>
        <g opacity={on(f, consumer, 8) * (1 - on(f, revenue, 10))}><Label x={960} y={GROUND + 80} text="89 MILLION" size={64} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, d8, 8) * (1 - on(f, revenue, 10))}><Label x={1720} y={GROUND - 260} text="+8%" size={64} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, revenue, 8)}>
          <g transform="translate(960 500)"><rect x={-260} y={-60} width={520} height={120} rx={20} fill="#FFFFFF" stroke="#D8CDB8" strokeWidth={4} />
            <rect x={-240} y={-40} width={400 * on(f, revenue, 20) + 44 * on(f, d11, 16)} height={80 * (1 + 0.15 * on(f, growth54, 6) * (1 - on(f, growth54 + 14, 8)))} rx={14} fill={P.mint} />
            <g opacity={on(f, d11, 8)}><Label x={0} y={110} text="+11%" size={72} font="Bebas Neue" color={P.mintInk} /></g></g>
        </g>
        <g opacity={on(f, jan54, 8) * (1 - on(f, not55 - 6, 6))}><Tag x={1700} y={330} text="+$30" sub="A YEAR" s={0.8} color={P.coral} /></g>
        <g opacity={on(f, ms54, 8) * (1 - on(f, not55 - 6, 6))}><SubBox x={1480} y={330} s={0.35} /></g>
        <g opacity={on(f, subscribers54, 8)}><Label x={180} y={GROUND + 80} text="MORE PEOPLE" size={44} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
        <g opacity={on(f, money54, 8)}><Label x={1740} y={GROUND + 80} text="MORE PER PERSON" size={44} font="Bebas Neue" color={P.ink2} anchor="end" /></g>
      </g>}

      {/* # E) Google's Workspace */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        <g opacity={on(f, ms55, 8) * (1 - on(f, google - 10, 8))} transform={`translate(${lerp(0, -700, on(f, jan56, 20))} 0)`}><SubBox x={760} y={560} s={0.95} /></g>
        <g opacity={on(f, jan56, 8) * (1 - on(f, d12, 8))}><Page x={1660} y={300} s={0.8 * pop(f, jan56)} top="JANUARY" big="2025" /></g>
        <g opacity={on(f, google, 8)}><SubBox x={760} y={560} s={0.95} title="WORKSPACE" color={P.teal2} letters="DSMC" tileColors={['#4A86E8', '#2FA86B', '#D9534F', '#F0B429']} tiles={on(f, workspace, 14)} /></g>
        {(() => { const t = on(f, gemini, 16); return <g opacity={on(f, gemini, 6)}><Spark x={lerp(1300, 978, t)} y={lerp(240, 370, t)} s={0.9} f={f} glow={1} /></g> })()}
        <g opacity={on(f, businesses, 8)} transform={`translate(1450 ${GROUND}) scale(${pop(f, businesses)})`}>
          <rect x={-120} y={-420} width={240} height={420} rx={10} fill="#9FB4CC" />
          {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-90 + (k % 3) * 66} y={-390 + Math.floor(k / 3) * 90} width={48} height={60} rx={6} fill="#E6F1FF" />)}
          <rect x={-30} y={-70} width={60} height={70} rx={6} fill="#5C6F8E" />
        </g>
        <g opacity={on(f, d12, 8)}><Tag x={1270} y={330} text={f >= per57 ? '$14' : '$12'} sub="PER PERSON / MONTH" s={1.0} color={f >= per57 ? P.gold : '#F3E3B5'} sticker="+$2" stickerO={on(f, per57, 10)} /></g>
      </g>}

      {/* # F) the old price was there — behind the box */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} />
        <g transform={`translate(${lerp(0, 230, on(f, keep, 20))} 0)`}>
          <rect x={720} y={420} width={200} height={340} rx={16} fill={P.mint} stroke="#2E9E6E" strokeWidth={5} />
          <Label x={820} y={560} text="OLD" size={52} font="Bebas Neue" color={P.navy0} /><Label x={820} y={620} text="PRICE" size={52} font="Bebas Neue" color={P.navy0} />
        </g>
        <SubBox x={960} y={560} s={(1 + 0.06 * on(f, case58, 6) * (1 - on(f, case58 + 14, 8)))} seat={0} />
        <Spark x={1190} y={360} s={0.9} f={f} glow={1} />
        <g opacity={on(f, find, 8)} transform={`translate(${lerp(1500, 1300, Math.sin((f - find) / 20) * 0.5 + 0.5)} 640)`}><Prop id="magnifier" x={0} y={0} size={220} f={f} /></g>
      </g>}
      <Vignette id="ab-ways" />
    </g>
  )
}

const BEATS = ["s37:ways", "s38:sell", "s38:extra", "s38:only", "s38:want", "s41:year", "s47:way", "s48:with", "s48:more", "s49:people", "s49:nothing", "s49:send", "s54:growth", "s54:microsoft", "s58:case", "s54:each", "s54:january", "s44:year", "s44:yearly", "s47:240", "s47:company", "s52:microsoft", "s37:back", "s38:one", "s44:uses", "s44:price", "s44:3", "s52:before", "s53:year", "s38:pay", "s39:microsoft", "s39:first", "s40:january", "s43:did", "s44:personal", "s44:copilot", "s45:way", "s45:round", "s51:results", "s52:june", "s55:microsoft", "s56:january", "s39:tried", "s40:launched", "s40:pro", "s40:inside", "s40:20", "s41:240", "s41:top", "s42:way", "s42:ai", "s42:plan", "s42:everyone", "s42:raise", "s42:everyone#2", "s43:later", "s43:exactly", "s44:got", "s44:allowance", "s44:30", "s45:why", "s45:imagine", "s45:example", "s46:picture", "s46:100", "s47:5", "s47:buy", "s47:collects", "s47:1200", "s48:two", "s48:all", "s48:pay", "s48:collects", "s48:3000", "s49:never", "s49:nina", "s49:bill", "s49:request", "s50:bundle", "s50:barely", "s50:help", "s50:lot", "s51:showed", "s52:89", "s52:consumer", "s52:8", "s53:revenue", "s53:11", "s54:things", "s54:subscribers", "s54:money", "s54:increase", "s55:not", "s56:google", "s56:gemini", "s56:workspace", "s56:businesses", "s57:standard", "s57:12", "s57:per", "s58:keep", "s58:old", "s58:easy", "s58:find", "s58"]
export const AB_WAYS = makePiece('ab-ways', 'AI bundle ch3: way one = an add-on box with the spark beside the subscription, two people walk to it; Copilot Pro $20/month → $240/year stacked on top; way two = the spark goes into the box, ten people each get a +$3/+$30 coin, a monthly AI-uses gauge; 100-dot example: 5 gold × $240 = $1,200 pile vs 100 × $30 = $3,000 pile; most go grey (no requests), 5 purple light the AI bill; light users\' coins drift to heavy users; results crowd 89M +8%, revenue bar +11%, coins grow per person; Workspace + Gemini, office tower, $12 → $14 per person; an OLD PRICE door slides out behind the box, a magnifier searches', {
  mood: 'light', Component: Ways, beats: BEATS,
  sfx: [['s41:240', 'pop', 0.2], ['s42:ai', 'chime', 0.2], ['s47:1200', 'coin', 0.25], ['s48:3000', 'cash', 0.25], ['s53:11', 'pop', 0.2], ['s57:per', 'pop', 0.2], ['s58:find', 'swish', 0.2]] })
