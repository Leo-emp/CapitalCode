// ---------------------------------------------------------------- s77–s85: what you really give (casino-style rebuild).
// One sunny shopping street. You stand in the middle and turn out your pockets ($0 — not money). A glowing thought
// bubble rises from your head: "RUNNING SHOES · NOW". Your phone search turns it into a signal: "I MIGHT BUY TODAY".
// The shoe shop on the right lights up; its owners raise paddles behind the window, ready to bid; a click drops a big
// coin into the shop's till. Little signal pings rise from every passer-by. On the left a billboard: people walk past
// without looking; then your phone pops up a Sponsored ad at the exact moment you look. Finally you get a free answer
// card while the shop owners drop coins into Google's box.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, Headline, Person, win } from '../aimoney/common'
import { PriceTag } from '../charts'
import { Mini } from '../../rig/Mini'
import { gestB } from '../buffett/hook'
import { Billboard, PhoneB } from './kit'
import { PaddleMini } from './search'

const Give: React.FC<PieceProps> = ({ f, c }) => {
  const tens = c('s77:tens'), giving = c('s77:giving'), money78 = c('s78:money'), attention = c('s78:attention'), now = c('s78:now')
  const running = c('s79:running'), today = c('s79:today'), click80 = c('s80:click'), worth80 = c('s80:worth'), ready = c('s81:ready'), bidding = c('s81:bidding')
  const signal = c('s82:signal'), moment = c('s82:moment'), billboard = c('s83:billboard'), walk = c('s83:walk'), search83 = c('s83:search'), looking = c('s83:looking')
  const deal = c('s84:deal'), free85 = c('s85:free'), businesses = c('s85:businesses'), answers = c('s85:answers')
  // # extra gesture words
  const G = [c('s77:you'), c('s78:valuable'), c('s78:what'), c('s79:world'), c('s81:a'), c('s81:know'), c('s85:those')]
  const HX = 820
  return (
    <g>
      <StageBg id="gg-give" frame={f} />
      {/* # the shopping street */}
      <rect x={0} y={0} width={1920} height={1000} fill="#D6ECF7" />
      <rect x={0} y={0} width={1920} height={215} fill="#EFE6D6" /><rect x={0} y={205} width={1920} height={22} fill="#8E6A45" />
      <rect x={0} y={1000} width={1920} height={80} fill="#9AA3B5" /><rect x={0} y={990} width={1920} height={14} fill="#7D8798" />
      {/* # everything inside the room a little smaller (owner: objects and people were too large) */}
      <g transform="translate(960 1000) scale(0.9) translate(-960 -1000)">
      {/* # everything inside the room at 80% (owner: objects and people were too large) */}
      <g transform="translate(960 1000) scale(0.8) translate(-960 -1000)">
      {/* # the shoe shop on the right: awning, window, owners with paddles */}
      <g>
        <rect x={1220} y={420} width={680} height={580} fill="#F4F1EA" />
        <path d="M1200 420 L1920 420 L1900 340 L1220 340 Z" fill="#E05A4C" />
        {Array.from({ length: 10 }, (_, k) => <path key={k} d={`M${1200 + k * 72} 420 q36 30 72 0`} fill="#E05A4C" />)}
        <text x={1560} y={398} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 4 }}>RUN SHOP</text>
        <rect x={1260} y={480} width={600} height={500} rx={10} fill="#BFD9EA" opacity={0.6 + 0.3 * on(f, today, 10)} />
        {[0, 1].map((k) => <PaddleMini key={k} f={f} x={1420 + k * 280} k={k} up={on(f, ready + k * 3, 8) * (1 - on(f, billboard, 8)) + on(f, businesses, 8)} s={1.6} mood={f > click80 ? 'happy' : 'neutral'} />)}
        {/* # the till fills on a click */}
        <g transform="translate(1290 940)"><rect x={-50} y={-40} width={100} height={80} rx={10} fill="#5A3A22" /><text y={14} textAnchor="middle" fill={P.gold} style={{ font: '400 40px "Bebas Neue"' }}>TILL</text></g>
        {(() => { const p = fly(f, click80 + 4, [HX + 160, 560], [1290, 900], 18, 160); return <g opacity={p.o}><Coin x={p.x} y={p.y} s={0.9} /></g> })()}
        <g opacity={win(f, worth80, ready, 6)} transform={`translate(1330 300) scale(${pop(f, worth80)})`}><PriceTag x={0} y={0} text="A CLICK = A LIKELY BUYER" r={-4} color={P.gold} /></g>
      </g>
      {/* # the billboard on the left with passers-by not looking */}
      <g opacity={win(f, billboard - 4, deal, 10)}><Billboard x={330} y={1000} s={1} text="SHOES!" /></g>
      {/* # passers-by only while the signal/billboard lines run */}
      {Array.from({ length: 4 }, (_, k) => { const x = ((f * 2.4 + k * 330) % 1100) - 60; return <g key={k} opacity={(x < 1080 ? 1 : 0) * win(f, signal - 6, deal, 10)}><Mini look={['buyer', 'owner', 'worker', 'investor'][k]} x={x} y={1000} scale={0.95} frame={f} seed={k + 500} mood="neutral" />
        {/* # each passer-by sends a tiny signal ping when people search */}
        <circle cx={x} cy={800 - 120 * (((f - signal + k * 9) % 36) / 36)} r={10 + 20 * (((f - signal + k * 9) % 36) / 36)} fill="none" stroke="#1A73E8" strokeWidth={5} opacity={win(f, signal, billboard, 6) * (1 - ((f - signal + k * 9) % 36) / 36)} /></g> })}
      {/* # your pockets: $0 */}
      <g opacity={win(f, giving - 2, attention, 6)} transform={`translate(${HX} 520) scale(${pop(f, money78)})`}><Coin x={0} y={0} s={1.3} text="$0" /></g>
      {/* # the thought bubble: what you want, right now */}
      <g opacity={win(f, attention - 2, click80, 8)} transform={`translate(${HX - 400} ${lerp(520, 420, on(f, attention, 14))}) scale(${pop(f, attention)})`}>
        <ellipse rx={260} ry={110} fill="#FFFFFF" /><circle cx={200} cy={120} r={22} fill="#FFFFFF" /><circle cx={250} cy={160} r={12} fill="#FFFFFF" />
        <text y={-6} textAnchor="middle" fill={P.ink} style={{ font: '400 58px "Bebas Neue"' }}>{f > today ? 'I MIGHT BUY TODAY' : 'RUNNING SHOES'}</text>
        <text y={52} textAnchor="middle" fill={P.goldInk} opacity={on(f, now, 6)} style={{ font: '400 46px "Bebas Neue"' }}>RIGHT NOW</text>
      </g>
      {/* # your phone: a Sponsored ad appears the moment you look */}
      <g opacity={win(f, search83 - 2, deal, 8)} transform={`translate(${HX + 260} ${lerp(820, 600, easeInOut(span(f, search83, search83 + 12)))}) scale(0.55)`}>
        <PhoneB x={0} y={0} label="running shoes" />
        <g opacity={on(f, looking, 6)}><rect x={-120} y={-160} width={240} height={150} rx={14} fill="#FFF5D6" stroke={P.gold} strokeWidth={6} /><text x={-100} y={-118} fill="#202124" style={{ font: '700 26px Inter' }}>Sponsored</text><text x={-100} y={-74} fill="#1A0DAB" style={{ font: '500 30px Inter' }}>Running shoes</text><text x={-100} y={-36} fill="#1A0DAB" style={{ font: '500 30px Inter' }}>– Run Shop</text></g>
      </g>
      {/* # the deal: a free answer for you, coins from shops to Google */}
      <g opacity={on(f, answers - 4, 8)} transform={`translate(${HX - 400} 420) scale(${pop(f, answers - 4)})`}><rect x={-200} y={-50} width={400} height={100} rx={18} fill={P.mint} /><text y={16} textAnchor="middle" fill="#0E3B26" style={{ font: '400 50px "Bebas Neue"' }}>ANSWERS: FREE</text></g>
      <g opacity={on(f, businesses, 8)} transform="translate(1100 920)"><rect x={-80} y={-70} width={160} height={140} rx={14} fill="#1A73E8" /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '700 70px Inter' }}>G</text></g>
      {Array.from({ length: 4 }, (_, k) => { const p = fly(f, businesses + 6 + k * 5, [1420 + (k % 2) * 280, 700], [1100, 860], 18, 160); return <g key={k} opacity={p.o}><Coin x={p.x} y={p.y} s={0.6} /></g> })}
      <Person f={f} who="buyer" beats={gestB([[0, 'idle', 'neutral'], [giving, 'emptyPockets', 'smiling'], [attention, 'think', 'thinking'], [running, 'phone', 'smiling'], [click80, 'point', 'smiling'], [ready, 'lookFar', 'thinking'], [signal, 'explain', 'neutral'], [billboard, 'pockets', 'neutral'], [search83, 'phone', 'smiling'], [deal, 'handshake', 'smiling'], [free85, 'celebrate', 'smiling']], G)} x={HX} y={1000} s={1.1} />
      </g>
      </g>
      <Headline f={f} lines={[[tens, 'WHAT DO YOU GIVE?', P.ink, 110], [attention, 'ATTENTION + WHAT YOU WANT NOW', P.goldInk, 100], [running, '“I MIGHT BUY THIS TODAY”', P.ink, 104], [ready, 'READY TO ACT → SHOPS BID', P.ink, 104],
        [billboard, 'BILLBOARD VS SEARCH AD', P.ink, 104], [deal, 'THE DEAL', P.goldInk, 120], [free85, 'FREE ANSWERS · BUSINESSES PAY', P.ink, 100]]} />
      <Vignette id="gg-give" />
    </g>
  )
}

const BEATS = ['s77:you', 's78:valuable', 's78:what', 's79:world', 's81:a', 's81:know', 's85:those', 's77:tens', 's77:giving', 's78:money', 's78:attention', 's78:now', 's79:running', 's79:today', 's80:click', 's80:worth', 's81:ready', 's81:bidding', 's82:signal', 's82:moment', 's83:billboard', 's83:walk', 's83:search', 's83:looking', 's84:deal', 's85:free', 's85:businesses', 's85:answers']
export const GG_GIVE = makePiece('gg-give', 'Google long (casino-style): a sunny shopping street; you turn out your pockets ($0); a thought bubble RUNNING SHOES · RIGHT NOW becomes I MIGHT BUY TODAY; a click drops a big coin into the RUN SHOP till (a click = a likely buyer) and the owners raise paddles, ready to bid; signal pings rise from passers-by; people walk past a SHOES! billboard without looking, while your phone shows a Sponsored ad the moment you look; you get ANSWERS: FREE while the shop owners drop coins into Google’s box', {
  mood: 'light', Component: Give, beats: BEATS,
  sfx: [['s77:giving', 'pop', 0.3], ['s80:click', 'click', 0.35], ['s81:bidding', 'ding', 0.3], ['s83:looking', 'pop', 0.3], ['s85:businesses', 'coin', 0.3]] })
