// ---------------------------------------------------------------- s21–s31: the switch (casino style).
// Adobe's lobby, one setting. Two kiosks: on the left the BOX kiosk ($2,600 once), on the right the CREATIVE CLOUD
// kiosk ($50 / MONTH, yearly plan, all apps). A May 2013 calendar pops; sparkles labelled NEW FEATURES fly only into
// the cloud kiosk and the box kiosk's shutter rolls down: NO MORE BIG UPDATES. Maya walks from the box kiosk to the
// cloud kiosk. Then the money: a big $2,600 coin beside a small $50 coin; two revenue bars, 2012 $4.4B and 2013
// $4.06B, the second lower; behind the cloud kiosk a crowd of subscribers grows from 0.3M to 1.4M. Finally a house
// with two signs: SOLD (one big bag) vs FOR RENT (a coin every month).
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, Headline, House, win } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { gestB } from '../buffett/hook'
import { CalPage, Exec, Maya, SoftBox, Studio } from './kit'

// # a kiosk: counter, roof band with a title, and a shutter (0 open → 1 closed)
const Kiosk: React.FC<{ x: number; title: string; color: string; shut?: number; children?: React.ReactNode }> = ({ x, title, color, shut = 0, children }) => (
  <g transform={`translate(${x} 0)`}>
    <rect x={-220} y={330} width={440} height={670} rx={14} fill="#FFFFFF" />
    <rect x={-240} y={300} width={480} height={80} rx={14} fill={color} />
    <text x={0} y={356} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>
    <g>{children}</g>
    <rect x={-220} y={760} width={440} height={240} fill="#E9DFCC" />
    {shut > 0 && <g><rect x={-220} y={380} width={440} height={380 * shut} fill="#8A94A8" />{Array.from({ length: Math.floor(10 * shut) }, (_, k) => <rect key={k} x={-220} y={400 + k * 38} width={440} height={6} fill="#6B7590" />)}</g>}
  </g>
)

const Switch: React.FC<PieceProps> = ({ f, c }) => {
  const instead = c('s21:instead'), n2600 = c('s21:2600'), n50 = c('s21:50'), yearly = c('s21:yearly'), apps = c('s21:apps')
  const later = c('s22:later'), may = c('s22:may'), move = c('s22:move'), features = c('s23:features'), cloud23 = c('s23:cloud'), boxed = c('s23:boxed'), updates = c('s23:updates')
  const newest = c('s24:newest'), subscribe = c('s24:subscribe'), cost25 = c('s25:cost'), day = c('s26:day'), first = c('s26:first')
  const fell = c('s27:fell'), n44 = c('s27:44'), n406 = c('s27:406'), n2013 = c('s28:2013'), n14 = c('s28:14'), n300k = c('s28:300000')
  const big29 = c('s29:big'), smaller = c('s29:smaller'), landlord = c('s30:landlord'), selling30 = c('s30:selling'), renting30 = c('s30:renting')
  const once31 = c('s31:once'), every31 = c('s31:every'), years31 = c('s31:years')
  // # extra gesture words
  const G = [c('s20:cloud'), c('s21:month'), c('s22:adobe'), c('s23:said'), c('s24:words'), c('s25:money'), c('s26:customer'), c('s27:revenue'), c('s28:paying'), c('s29:payment'), c('s30:houses'), c('s31:house'), c('s26:2600'), c('s26:about'), c('s28:but'), c('s28:subscribers'), c('s29:coming'), c('s20:adobe'), c('s20:second'), c('s20:pay'), c('s27:billion')]
  const A = win(f, 0, cost25 - 2, 10), B = win(f, cost25 - 2, landlord - 2, 10), C = on(f, landlord - 2, 10)
  const MX = lerp(770, 1170, easeInOut(span(f, newest, subscribe + 10)))
  const subsN = f < n300k ? Math.round(3 * on(f, n2013, 10)) : 3 + Math.round(11 * easeInOut(span(f, n14 - 20, n14)))
  return (
    <g>
      <StageBg id="sb-switch" frame={f} />
      <Studio />
      {/* # A: the two kiosks */}
      {A > 0 && <g opacity={A}>
        <Kiosk x={460} title="BOX" color="#C2384A" shut={easeInOut(span(f, boxed, updates + 10))}>
          <SoftBox x={0} y={570} s={0.75} name="ALL APPS" price="$2,600" />
        </Kiosk>
        <g opacity={on(f, updates, 6)} transform={`translate(460 ${lerp(500, 560, on(f, updates, 10))})`}><rect x={-210} y={-40} width={420} height={80} rx={14} fill={P.coral} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>NO MORE BIG UPDATES</text></g>
        <Kiosk x={1460} title="CREATIVE CLOUD" color="#3A6EA8">
          <g opacity={on(f, n50, 6)} transform={`translate(0 520) scale(${pop(f, n50)})`}><text textAnchor="middle" y={20} fill={P.ink} style={{ font: '400 90px "Bebas Neue"' }}>$50 / MONTH</text></g>
          <text y={610} textAnchor="middle" fill={P.ink2} opacity={on(f, yearly, 6)} style={{ font: '400 46px "Bebas Neue"' }}>YEARLY PLAN</text>
          <g opacity={on(f, apps, 6)}>{['#C2384A', '#3A6EA8', '#2FA36B', '#8A5CC2', '#E08A3C'].map((col, k) => <rect key={k} x={-170 + k * 72} y={650} width={56} height={56} rx={12} fill={col} />)}</g>
        </Kiosk>
        <g opacity={win(f, may - 4, features + 20, 6)} transform={`translate(960 300) scale(${pop(f, may) * 0.7})`}><CalPage x={0} y={0} top="MAY" big="2013" /></g>
        {/* # new features: sparkles fly only into the cloud kiosk */}
        {Array.from({ length: 6 }, (_, k) => { const p = fly(f, features + k * 4, [960, 300], [1360 + (k % 3) * 100, 520], 16, 120); return <g key={k} opacity={p.o}><text x={p.x} y={p.y} textAnchor="middle" fill={P.gold} style={{ font: '700 60px Inter' }}>✦</text></g> })}
        <g opacity={win(f, features, boxed, 6)} transform="translate(1460 470)"><rect x={-150} y={-36} width={300} height={72} rx={14} fill={P.gold} /><text y={14} textAnchor="middle" fill="#3A2A12" style={{ font: '400 42px "Bebas Neue"' }}>NEW FEATURES</text></g>
        <Maya f={f} beats={gestB([[0, 'idle', 'neutral'], [instead, 'think', 'thinking'], [features, 'lookFar', 'shocked'], [newest, 'walkA', 'neutral', 'walkB', 10], [subscribe + 10, 'phone', 'neutral']], G.slice(0, 4))} x={MX} s={1.05} flip={f < newest} />
        <Exec f={f} beats={gestB([[0, 'present', 'smiling'], [may, 'explain', 'smiling'], [boxed, 'stop', 'smug'], [subscribe, 'handshake', 'smiling']], G)} x={960} s={1} />
      </g>}
      {/* # B: the money — big coin vs small coin, revenue bars, the subscriber crowd */}
      {B > 0 && <g opacity={B}>
        <g opacity={win(f, cost25 - 2, fell, 8)}>
          <g transform={`translate(480 600) scale(${pop(f, day)})`} opacity={on(f, day - 4, 6)}><Coin x={0} y={0} s={4} /><text y={250} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>$2,600 · BOX, DAY ONE</text></g>
          <g transform={`translate(960 680) scale(${pop(f, first)})`} opacity={on(f, first - 4, 6)}><Coin x={0} y={0} s={1.6} /><text y={170} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>$50 · CLOUD, MONTH ONE</text></g>
        </g>
        <g opacity={on(f, fell - 2, 8)}>
          {[[n44, 4.4, '2012', '$4.4B', '#9AA3B5', 380], [n406, 4.06, '2013', '$4.06B', P.coral, 700]].map(([at, v, yr, lab, col, x], k) => { const h = 120 * (v as number) * easeInOut(span(f, at as number, (at as number) + 14)); return <g key={k} opacity={on(f, at as number, 6)}>
            <rect x={(x as number) - 120} y={960 - h} width={240} height={h} rx={14} fill={col as string} />
            <text x={x as number} y={930 - h} textAnchor="middle" fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>{lab as string}</text>
            <text x={x as number} y={1050} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>{yr as string}</text></g> })}
          <text x={540} y={1050} textAnchor="middle" fill={P.ink2} style={{ font: '400 1px "Bebas Neue"' }}>ADOBE REVENUE</text>
        </g>
        <g>
          <Kiosk x={1460} title="CLOUD SUBSCRIBERS" color="#3A6EA8">
            <text y={450} textAnchor="middle" fill={P.ink2} style={{ font: '400 48px "Bebas Neue"' }}>$50 / MONTH EACH</text>
            {Array.from({ length: 14 }, (_, k) => <g key={k} opacity={k < subsN ? 1 : 0}><Mini look={['buyer', 'owner', 'worker', 'hero', 'investor'][k % 5]} x={-150 + (k % 5) * 75} y={610 + Math.floor(k / 5) * 110} scale={0.62} frame={f} seed={k + 700} mood="happy" /></g>)}
            <text y={900} textAnchor="middle" fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>{f >= n14 - 20 ? '≈ 1.4 MILLION' : f >= n2013 ? '≈ 0.3 MILLION' : ''}</text>
          </Kiosk>
        </g>
        <Exec f={f} beats={gestB([[0, 'nervous', 'worried'], [fell, 'despair', 'worried'], [n2013, 'lookFar', 'thinking'], [n14, 'celebrate', 'smiling'], [big29, 'explain', 'smiling']], G)} x={1040} s={0.95} />
        {/* # a big payment today, smaller ones that keep coming */}
        {Array.from({ length: 5 }, (_, k) => { const p = fly(f, smaller + k * 7, [1460, 600], [960, 760], 14, 120); return <g key={k} opacity={p.o}><Coin x={p.x} y={p.y} s={0.6} text="$50" /></g> })}
      </g>}
      {/* # C: the landlord's house — sold once vs rented every month */}
      {C > 0 && <g opacity={C}>
        <House x={960} y={980} s={2.3} />
        <g opacity={on(f, selling30, 6)} transform={`translate(480 ${lerp(380, 440, on(f, selling30, 10))})`}><rect x={-150} y={-46} width={300} height={92} rx={14} fill={P.coral} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>SOLD: ONCE</text></g>
        <g opacity={on(f, once31, 6)} transform={`translate(480 760) scale(${pop(f, once31) * 1.4})`}><path d="M-90 80 Q-110 -40 -30 -70 L-50 -110 L50 -110 L30 -70 Q110 -40 90 80 Z" fill="#C9A35A" /><text y={40} textAnchor="middle" fill="#3A2A12" style={{ font: '400 52px "Bebas Neue"' }}>$$$</text></g>
        <g opacity={on(f, renting30, 6)} transform={`translate(1440 ${lerp(380, 440, on(f, renting30, 10))})`}><rect x={-170} y={-46} width={340} height={92} rx={14} fill="#2FA36B" /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>RENTED: MONTHLY</text></g>
        {Array.from({ length: 6 }, (_, k) => { const p = fly(f, every31 + k * 8, [1100, 760], [1440, 760], 12, 100); return <g key={k} opacity={p.o}><Coin x={p.x} y={p.y} s={0.6} /></g> })}
        <Exec f={f} beats={gestB([[0, 'explain', 'smiling'], [selling30, 'point', 'neutral'], [renting30, 'present', 'smiling'], [years31, 'celebrate', 'smiling']], G)} x={1720} s={0.95} flip />
      </g>}
      <Headline f={f} lines={[[instead, 'BOX $2,600 OR $50 A MONTH', P.ink, 104], [later, 'MAY 2013: A MUCH BIGGER MOVE', P.ink, 100], [features, 'NEW FEATURES: CLOUD ONLY', P.goldInk, 104], [newest, 'WANT THE NEWEST? SUBSCRIBE', P.ink, 104],
        [cost25, 'AT FIRST, IT COST ADOBE', P.coralInk, 104], [fell, 'REVENUE FELL: $4.4B → $4.06B', P.coralInk, 100], [n2013, 'SUBSCRIBERS: 0.3M → 1.4M', P.goldInk, 104], [big29, 'BIG PAYMENT NOW → SMALL ONES FOREVER', P.ink, 92], [landlord, 'SELLING VS RENTING', P.ink, 110]]} />
      <Vignette id="sb-switch" />
    </g>
  )
}

const BEATS = ['s27:billion', 's20:adobe', 's20:second', 's20:pay', 's20:cloud', 's26:2600', 's26:about', 's28:but', 's28:subscribers', 's29:coming', 's21:month', 's22:adobe', 's23:said', 's24:words', 's25:money', 's26:customer', 's27:revenue', 's28:paying', 's29:payment', 's30:houses', 's31:house', 's21:instead', 's21:2600', 's21:50', 's21:yearly', 's21:apps', 's22:later', 's22:may', 's22:move', 's23:features', 's23:cloud', 's23:boxed', 's23:updates', 's24:newest', 's24:subscribe', 's25:cost', 's26:day', 's26:first', 's27:fell', 's27:44', 's27:406', 's28:2013', 's28:14', 's28:300000', 's29:big', 's29:smaller', 's30:landlord', 's30:selling', 's30:renting', 's31:once', 's31:every', 's31:years']
export const SB_SWITCH = makePiece('sb-switch', 'Subscriptions long (casino-style): Adobe’s lobby with a BOX kiosk ($2,600) and a CREATIVE CLOUD kiosk ($50 / MONTH, yearly plan, all apps); a MAY 2013 calendar; NEW FEATURES sparkles fly only into the cloud kiosk while the box kiosk’s shutter rolls down — NO MORE BIG UPDATES; Maya walks over to subscribe; a big $2,600 day-one coin beside a $50 month-one coin; revenue bars 2012 $4.4B and 2013 $4.06B; a CLOUD SUBSCRIBERS kiosk fills from ≈ 0.3 million to ≈ 1.4 million; small $50 coins keep coming; a house: SOLD ONCE (one bag) vs RENTED MONTHLY (coins every month)', {
  mood: 'light', Component: Switch, beats: BEATS,
  sfx: [['s21:50', 'pop', 0.3], ['s23:updates', 'thud', 0.3], ['s27:406', 'swish', 0.3], ['s28:14', 'chime', 0.3], ['s31:every', 'coin', 0.3]] })
