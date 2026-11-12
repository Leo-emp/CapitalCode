// ---------------------------------------------------------------- s7–s17: when trading cost money.
// A) An old broker's counter: a customer hands over an order slip, and a coin for the fee crosses the counter on
//    "fee"; it gets a COMMISSION tag; coins pile up behind the broker ("how brokers made their money").
// B) A broker's shopfront with a $4.95 per-trade price tag (2019); "October 2019 … cut to zero": the tag flips to $0;
//    three more shopfronts flip their tags in turn ("within days"); a phone races ahead of them all ("free for years").
// C) Robinhood's customers: a growing crowd with phones (27 million); two piles — $710B of stocks, 659 million
//    options contracts; a $0 stamp lands on the phone ("charged nothing per trade").
// D) "When the customer isn't paying, someone else usually is": the customer stands with empty pockets while a
//    silhouette behind the phone holds out a coin. "Let's meet Leo": Leo walks in, opens the app, taps BUY on 100.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { HSpot as Spot } from './kit'
import { Headline, Label, Person, Shadow, fly, win, type Beat } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground } from '../power/kit2'
import { Storefront } from '../gift/kit'
import { Stack } from '../fee/kit'
import { Mini } from '../../rig/Mini'
import { AppPhone, Cent, Slip, Tower } from './kit'

const GROUND = 920
// # a price tag that can flip from one price to another (flip 0–1)
const Tag: React.FC<{ x: number; y: number; a: string; b: string; flip: number; s?: number; o?: number }> = ({ x, y, a, b, flip, s = 1, o = 1 }) => {
  const sx = Math.abs(Math.cos(flip * Math.PI)), side = flip < 0.5 ? a : b
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <line x1={0} y1={-90} x2={0} y2={-40} stroke="#8A97AA" strokeWidth={4} />
    <g transform={`scale(${Math.max(0.05, sx)} 1)`}>
      <path d="M-90 -40 L90 -40 L90 50 L-90 50 Z" fill={flip < 0.5 ? P.paper : P.mint} stroke={P.edge} strokeWidth={3} />
      <text x={0} y={22} textAnchor="middle" fill={flip < 0.5 ? P.navy0 : '#FFFFFF'} style={{ font: '400 56px "Bebas Neue"' }}>{side}</text>
    </g>
  </g>
}

const Cost: React.FC<PieceProps> = ({ f, c }) => {
  const every = c('s7:every'), trade7 = c('s7:trade'), fee7 = c('s7:fee')
  const commission = c('s8:commission'), brokers8 = c('s8:brokers'), place = c('s8:place'), made8 = c('s8:made'), money8 = c('s8:money')
  const s9 = c('s9'), schwab9 = c('s9:schwab'), biggest = c('s9:biggest'), charged = c('s9:charged'), d4 = c('s9:4'), online = c('s9:online')
  const october = c('s10:october'), cut = c('s10:cut'), zero10 = c('s10:zero'), other = c('s10:other'), same = c('s10:same'), days = c('s10:days')
  const racing = c('s11:racing'), app11 = c('s11:app'), free11 = c('s11:free'), years11 = c('s11:years'), robinhood11 = c('s11:robinhood')
  const s12 = c('s12'), d27 = c('s12:27'), customers = c('s12:customers'), accounts = c('s12:accounts')
  const bought = c('s13:bought'), d710 = c('s13:710'), stocks13 = c('s13:stocks'), traded = c('s13:traded'), d659 = c('s13:659'), contracts = c('s13:contracts')
  const charged14 = c('s14:charged'), nothing14 = c('s14:nothing'), trade14 = c('s14:trade')
  const s15 = c('s15'), customer15 = c('s15:customer'), paying = c('s15:paying'), someone = c('s15:someone'), usually = c('s15:usually')
  const see16 = c('s16:see'), billions = c('s16:billions'), meet = c('s16:meet'), leo16 = c('s16:leo')
  const opens = c('s17:opens'), app17 = c('s17:app'), taps = c('s17:taps'), buy17 = c('s17:buy'), d100 = c('s17:100'), company = c('s17:company')
  const AB = s9 - 4, BC = s12 - 4, CD = s15 - 4
  const A = win(f, every - 30, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  const D1 = win(f, CD, see16 - 4), D2 = on(f, see16 - 4, 10)
  return (
    <g>
      <Stage id="hd-cost" frame={f} />
      <Spot f={f} at={c("s8:companies")} x={1240} y={700} rx={300} ry={260} />
      <Spot f={f} at={c("s9:america")} x={420} y={700} rx={260} ry={240} />
      <Spot f={f} at={c("s9:charles")} x={420} y={300} rx={200} ry={160} />
      <g opacity={on(f, c("s9"), 8) * (1 - on(f, c("s10:october"), 8))}><rect x={670} y={290} width={180} height={56} rx={14} fill={P.navy3} /><text x={760} y={330} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>2019</text></g>
      <Headline f={f} lines={[[fee7, 'EVERY TRADE: A FEE', P.ink, 100], [commission, 'THE COMMISSION', P.ink, 104], [s9, '', P.ink], [d4, '2019: $4.95 PER TRADE', P.ink, 100], [zero10, 'OCTOBER 2019: $0', P.ink, 104], [robinhood11, 'ROBINHOOD: FREE FOR YEARS', P.ink, 96], [d27, '≈ 27 MILLION CUSTOMERS', P.ink, 100], [d710, '2025: ≈ $710 BILLION OF STOCKS', P.ink, 92], [d659, '+ 659 MILLION OPTIONS CONTRACTS', P.ink, 92], [nothing14, '$0 PER TRADE', P.ink, 108], [someone, 'SOMEONE ELSE PAYS', P.ink, 104], [meet, 'MEET LEO', P.ink, 108], [d100, 'BUY 100 SHARES', P.ink, 104]]} />

      {/* # A) the old broker's counter */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Storefront x={1240} y={GROUND} s={1.2} sign="BROKER" color={P.navy3} />
        <Mini look="investor" x={560} y={GROUND} scale={1.25} frame={f} seed={11} mood={f >= fee7 ? 'sad' : 'neutral'} />
        {/* # the order slip goes over, then a coin for the fee */}
        {(() => { const fl = fly(f, trade7 - 6, [640, 640], [1180, 640], 18, 100); return f >= trade7 - 6 ? <Slip x={fl.x} y={fl.y} s={0.6} o={1 - on(f, commission + 10, 8)} /> : null })()}
        {(() => { const fl = fly(f, fee7, [620, 600], [1060, 720], 18, 120); return f >= fee7 ? <g><Cent x={fl.x} y={fl.y} r={36} t="$" />
          {f >= commission && <g opacity={on(f, commission, 8)} transform={`translate(${fl.x + 40} ${fl.y - 70}) rotate(-8)`}><rect x={-10} y={-24} width={190} height={48} rx={10} fill={P.gold} /><text x={85} y={12} textAnchor="middle" fill={P.navy0} style={{ font: '400 34px "Bebas Neue"' }}>COMMISSION</text></g>}</g> : null })()}
        <g opacity={on(f, brokers8, 8)}><Label x={1240} y={GROUND + 70} text="THE BROKER" size={52} font="Bebas Neue" color={P.ink} /></g>
        {/* # coins pile up behind the counter */}
        <g opacity={on(f, made8, 10)}><Stack x={1600} y={GROUND - 10} n={Math.round(lerp(2, 14, on(f, money8, 24)))} w={150} /></g>
      </g>}

      {/* # B) the $4.95 tag flips to $0; the others follow; the app races ahead */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, schwab9, 10)}><Storefront x={420} y={GROUND} s={1.0} sign="SCHWAB" color="#1B6FB8" /></g>
        <Tag x={420} y={300} a="$4.95" b="$0" flip={span(f, cut, zero10 + 4)} s={1.2} o={on(f, d4, 8)} />
        <g opacity={on(f, online, 8) * (1 - on(f, october, 8))}><Label x={420} y={430} text="PER ONLINE TRADE" size={40} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, october, 8)}><Calendar x={760} y={330} text="OCT" s={0.9} /></g>
        {/* # three more brokers flip their tags, one by one */}
        {[0, 1, 2].map((k) => { const at = [other, same, days][k]
          return <g key={k} opacity={on(f, other - 6 + k * 3, 10)}>
            <Storefront x={860 + k * 290} y={GROUND} s={0.75} sign="BROKER" color={[P.skyD, P.coralD, P.goldD][k]} />
            <Tag x={860 + k * 290} y={480} a="$" b="$0" flip={on(f, at, 10)} s={0.9} />
          </g> })}
        {/* # the app that had been free for years, out in front */}
        <g opacity={on(f, app11, 10)} transform={`translate(${lerp(2100, 1790, on(f, racing, 30))} 0)`}>
          <AppPhone x={0} y={560} s={0.8} zero={on(f, free11, 8)} />
          {[0, 1, 2].map((k) => <line key={k} x1={120 + k * 10} y1={460 + k * 60} x2={200 + k * 10} y2={460 + k * 60} stroke={P.ink2} strokeWidth={6} strokeLinecap="round" opacity={0.6} />)}
          <g opacity={on(f, robinhood11, 8)}><Label x={0} y={GROUND + 70} text="ROBINHOOD" size={52} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # C) the customers and what they traded */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, bought, 10)}>
          {Array.from({ length: 18 }, (_, k) => { const row = Math.floor(k / 6), col = k % 6
            return <g key={k} opacity={on(f, s12 + k * 2, 6)}><Mini look={['buyer', 'investorF', 'hero', 'investor', 'worker', 'owner'][(k + row) % 6]} x={420 + col * 220 + (row % 2) * 110} y={GROUND - row * 150} scale={0.75} frame={f} seed={k + 60} mood="happy" /></g> })}
          <g opacity={on(f, accounts, 8)}><Label x={960} y={GROUND + 70} text="CUSTOMERS WITH MONEY IN THEIR ACCOUNTS" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, bought, 10) * (1 - on(f, s15 - 10, 8))}>
          {/* # $710B of stocks: share certificates stacking up */}
          {Array.from({ length: Math.round(9 * on(f, d710, 26)) }, (_, k) => <g key={k} transform={`translate(${560 + (k % 2) * 16} ${GROUND - 40 - k * 46})`}><rect x={-150} y={-20} width={300} height={40} rx={6} fill={P.paper} stroke={P.edge} strokeWidth={3} /><rect x={-120} y={-6} width={140} height={10} rx={5} fill="#C8B994" /></g>)}
          <g opacity={on(f, stocks13, 8)}><Label x={560} y={GROUND + 70} text="STOCKS: $710B" size={54} font="Bebas Neue" color={P.ink} /></g>
          {/* # 659 million options contracts: contract cards fanning up */}
          {Array.from({ length: Math.round(8 * on(f, d659, 26)) }, (_, k) => <g key={k} transform={`translate(1360 ${GROUND - 60 - k * 50}) rotate(${(k % 3 - 1) * 4})`}><rect x={-130} y={-28} width={260} height={56} rx={8} fill="#E8D9FF" stroke="#9D7FD0" strokeWidth={3} /><text x={0} y={12} textAnchor="middle" fill="#5E3F9A" style={{ font: '400 30px "Bebas Neue"' }}>OPTION · 100 SHARES</text></g>)}
          <g opacity={on(f, contracts, 8)}><Label x={1360} y={GROUND + 70} text="OPTIONS: 659M CONTRACTS" size={54} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, charged14, 8)}><AppPhone x={960} y={460} s={0.6} zero={on(f, nothing14, 8)} /></g>
        </g>
      </g>}

      {/* # D) someone else pays; meet Leo */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {D1 > 0 && <g opacity={D1}>
          <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [paying, 'emptyPockets', 'neutral']]} x={460} y={GROUND} s={0.85} o={on(f, customer15, 8)} />
          <AppPhone x={960} y={560} s={0.9} />
          <g opacity={on(f, someone, 10)} transform={`translate(${lerp(1760, 1460, on(f, someone, 20))} 0)`}><Tower x={0} y={GROUND} s={0.75} f={f} sign="SOMEONE ELSE" /></g>
          {f >= usually && (() => { const fl = fly(f, usually, [1380, GROUND - 260], [1060, 520], 22, 120); return <Cent x={fl.x} y={fl.y} r={34} t="$" /> })()}
        </g>}
        {D2 > 0 && <g opacity={D2}>
          <g opacity={on(f, billions, 8) * (1 - on(f, meet, 10))}><Stack x={1500} y={GROUND - 10} n={20} w={200} /></g>
          {(() => { const beats: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 12], [meet + 30, 'idle', 'smiling'], [opens, 'phone', 'smiling'], [d100, 'phone', 'smiling'], [company, 'thumbsUp', 'smiling']]
            const lx = lerp(-200, 520, on(f, meet - 10, 34))
            return <g>
              <Person f={f} who="buyer" beats={beats} x={lx} y={GROUND} s={0.85} />
              <g opacity={on(f, leo16, 8) * (1 - on(f, opens, 8))}><Label x={lx} y={GROUND + 70} text="LEO" size={56} font="Bebas Neue" color={P.ink} /></g>
              <g opacity={on(f, app17, 10)} transform={`translate(0 ${lerp(30, 0, pop(f, app17, 14))})`}><AppPhone x={1180} y={540} s={1.25} press={on(f, buy17, 4) * (1 - on(f, buy17 + 8, 6))} shares={f >= d100 ? 'BUY 100' : undefined} /></g>
            </g> })()}
        </g>}
      </g>}
      <Vignette id="hd-cost" />
    </g>
  )
}

const BEATS = ["s8:companies", "s9:america", "s9:charles", "s9", 's7:every', 's7:trade', 's7:fee', 's8:commission', 's8:brokers', 's8:made', 's8:money', 's9:schwab', 's9:4', 's9:online', 's10:october', 's10:cut', 's10:zero', 's10:other', 's10:same', 's10:days', 's11:racing', 's11:app', 's11:free', 's11:robinhood', 's12', 's12:27', 's12:accounts', 's13:bought', 's13:710', 's13:stocks', 's13:659', 's13:contracts', 's14:charged', 's14:nothing', 's15:customer', 's15:paying', 's15:someone', 's15:usually', 's16:billions', 's16:meet', 's16:leo', 's17:opens', 's17:app', 's17:buy', 's17:100', 's17:company']
export const HD_COST = makePiece('hd-cost', 'PFOF long ch1: the old broker counter (a coin fee crosses on every trade: the commission); Schwab\'s $4.95 tag flips to $0 in October 2019, three more brokers follow within days, a $0 app races ahead (Robinhood); 27 million customers; $710B of stocks and 659M options contracts in 2025; $0 per trade; someone else pays (a silhouette behind the phone holds a coin); Leo walks in and taps BUY on 100 shares', {
  mood: 'light', Component: Cost, beats: BEATS,
  sfx: [['s7:fee', 'coin', 0.25], ['s10:zero', 'pop', 0.25], ['s11:racing', 'whoosh', 0.2], ['s12:27', 'pop', 0.2], ['s14:nothing', 'thud', 0.25], ['s15:someone', 'swish', 0.2], ['s17:buy', 'pop', 0.25]] })
