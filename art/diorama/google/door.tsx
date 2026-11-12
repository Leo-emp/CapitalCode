// ---------------------------------------------------------------- s53–s67: paying to be the front door (casino-style).
// 1) A busy daytime street. Google's building stands on the right; a crowd walks along the pavement. You check your
// phone; a giant phone stands in the middle of the street like a gate, and everyone walks through it — its search box
// reads GOOGLE (the default). A phone maker stands at the gate and Google's rep hands him a heavy money bag. Four
// partner signs pop over the street (BROWSERS, PHONE MAKERS, CARRIERS, WEBSITES) and coins fly to each from a $60B
// bag; a big $1 coin on the left loses a 20¢ slice. 2) A courtroom: the judge's bench, a board "2021: $26B+ PAID TO BE
// THE DEFAULT" with an iPhone, a gavel bangs "ILLEGAL MONOPOLY (2024 RULING)"; a later ruling card reads "CAN STILL
// PAY · NO EXCLUSIVE DEALS" while Google's rep and the phone maker shrug at each other.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, Headline, Person, Stamp, win } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { gestB } from '../buffett/hook'
import { Gavel, PhoneB } from './kit'
import { HQ, Pie } from './hook'

const Door: React.FC<PieceProps> = ({ f, c }) => {
  const catch53 = c('s53:catch'), first = c('s53:first'), where = c('s54:where'), phone55 = c('s55:phone'), browser55 = c('s55:browser'), choosing = c('s55:choosing')
  const chose = c('s56:chose'), pays56 = c('s56:pays'), default57 = c('s57:default'), worth = c('s57:worth'), door58 = c('s58:door'), street = c('s58:street')
  const traffic = c('s59:traffic'), partners = c('s60:partners'), browser60 = c('s60:browser'), phone60 = c('s60:phone'), carriers = c('s60:carriers'), websites = c('s60:websites')
  const n60 = c('s61:60'), n20 = c('s62:20'), average = c('s63:average'), partners63 = c('s63:partners'), case64 = c('s64:case'), deals64 = c('s64:deals')
  const judge = c('s65:judge'), n26 = c('s65:26'), iphones = c('s65:iphones'), ruled = c('s66:ruled'), monopoly = c('s66:monopoly'), decision = c('s67:decision'), exclusive = c('s67:exclusive')
  // # extra gesture words
  const G = [c('s61:those'), c('s63:businesses'), c('s63:goes'), c('s65:alone'), c('s65:and'), c('s67:to'), c('s53:google'), c('s57:see'), c('s58:it'), c('s60:it'), c('s60:in'), c('s61:in'), c('s60:ads'), c('s62:made'), c('s63:ads'), c('s63:for#2'), c('s65:in'), c('s65:default'), c('s65:the'), c('s66:these'), c('s67:but'), c('s67:with')]
  const A = win(f, 0, case64 - 2, 10), B = on(f, case64 - 2, 10)
  const SIGNS: [number, string, string][] = [[browser60, 'BROWSERS', '#3A6EA8'], [phone60, 'PHONE MAKERS', '#2FA36B'], [carriers, 'CARRIERS', '#8A5CC2'], [websites, 'WEBSITES', '#E08A3C']]
  return (
    <g>
      <StageBg id="gg-door" frame={f} />
      {/* # 1: the busy street */}
      {A > 0 && <g opacity={A}>
        <rect x={0} y={0} width={1920} height={1000} fill="#CFE6F5" />
        {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={k * 300 - 40} y={560 - (k % 2) * 80} width={240} height={440 + (k % 2) * 80} fill="#B7CDE0" />)}
        <rect x={0} y={1000} width={1920} height={80} fill="#7D8798" /><rect x={0} y={990} width={1920} height={14} fill="#5B6680" />
        <g transform="translate(960 1000) scale(0.9) translate(-960 -1000)">
        <HQ x={1720} y={1000} s={0.85} label="GOOGLE" fill={on(f, default57, 10) * 0.4} />
        {/* # the crowd walks right, through the phone gate, towards Google */}
        {/* # the crowd leaves once the money talk starts (owner: people must not linger past their lines) */}
        <g opacity={win(f, 0, traffic, 10)}>{Array.from({ length: 7 }, (_, k) => { const x = ((f * 3 + k * 260) % 1700) - 100; return <g key={k} opacity={x > 1580 ? 0 : 1}><Mini look={['buyer', 'owner', 'worker', 'hero'][k % 4]} x={x} y={1000} scale={1} frame={f} seed={k + 400} mood="neutral" /></g> })}</g>
        {/* # the phone gate: its search box reads GOOGLE once it's the default */}
        <g opacity={win(f, phone55, traffic, 8)} transform={`translate(1060 ${lerp(1200, 690, easeInOut(span(f, phone55, phone55 + 16)))})`}><PhoneB x={0} y={0} s={1} label={f > chose ? 'Google' : 'Search'} glow={on(f, default57, 8) * (1 - on(f, traffic, 8))} /></g>
        <g opacity={win(f, browser55, chose, 6)} transform={`translate(1060 280) scale(${pop(f, browser55)})`}><rect x={-150} y={-46} width={300} height={92} rx={16} fill="#FFFFFF" /><text y={16} textAnchor="middle" fill={P.ink} style={{ font: '400 46px "Bebas Neue"' }}>AND IN BROWSERS</text></g>
        <g opacity={win(f, worth, traffic, 6)} transform={`translate(1060 290) scale(${pop(f, worth)})`}><rect x={-230} y={-46} width={460} height={92} rx={16} fill="#1A73E8" /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>DEFAULT = SEEN FIRST</text></g>
        {/* # partner signs and the $60B bag */}
        {SIGNS.map(([at, lab, col], k) => <g key={k} opacity={on(f, at, 6) * (1 - on(f, n60, 8))} transform={`translate(${300 + (k % 2) * 420} ${440 + Math.floor(k / 2) * 150}) scale(${pop(f, at) * 1.3})`}><rect x={-135} y={-42} width={270} height={84} rx={14} fill={col} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 42px "Bebas Neue"' }}>{lab}</text></g>)}
        <g opacity={win(f, n60, n20, 6)} transform={`translate(1000 ${lerp(1100, 780, on(f, n60, 12))}) scale(1.3)`}><path d="M-90 80 Q-110 -40 -30 -70 L-50 -110 L50 -110 L30 -70 Q110 -40 90 80 Z" fill="#C9A35A" /><text y={40} textAnchor="middle" fill="#3A2A12" style={{ font: '400 64px "Bebas Neue"' }}>$60B</text></g>
        {Array.from({ length: 8 }, (_, k) => { const p = fly(f, n60 + 10 + k * 4, [1000, 700], [300 + (k % 2) * 420, 460 + Math.floor((k % 4) / 2) * 150], 20, 160); return <g key={k} opacity={p.o * (1 - on(f, n20, 8))}><Coin x={p.x} y={p.y} s={0.55} /></g> })}
        {/* # a $1 coin loses a 20¢ slice */}
        <g opacity={win(f, n20 - 2, case64, 8)} transform={`translate(860 560) scale(${pop(f, n20)})`}>
          <Pie x={0} y={0} r={190} part={0.2} t={easeInOut(span(f, n20, n20 + 16))} color={P.coral} rest={P.gold} />
          <text x={0} y={22} textAnchor="middle" fill="#3A2A12" style={{ font: '400 70px "Bebas Neue"' }}>$1</text>
          <text x={0} y={260} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"' }}>≈ 20¢ TO PARTNERS</text>
        </g>
        {/* # Google's rep hands the phone maker a bag */}
        <g opacity={win(f, chose, case64, 8)}>
          <Person f={f} who="investor" beats={gestB([[0, 'idle', 'neutral'], [pays56, 'offer', 'smiling'], [traffic, 'explain', 'smiling'], [n60, 'present', 'smiling'], [n20, 'point', 'neutral']], G.slice(0, 6))} x={1400} y={1000} s={0.95} flip />
          <Person o={win(f, chose, traffic, 10)} f={f} who="worker" beats={[[0, 'idle', 'neutral'], [pays56 + 8, 'receive', 'smiling'], [n60 + 20, 'thumbsUp', 'smiling']]} x={720} y={1000} s={0.95} />
          {(() => { const p = fly(f, pays56 + 2, [1350, 760], [760, 760], 16, 120); return <g opacity={p.o}><path d="M-50 40 Q-60 -20 -15 -36 L-25 -56 L25 -56 L15 -36 Q60 -20 50 40 Z" fill="#C9A35A" transform={`translate(${p.x} ${p.y})`} /></g> })()}
        </g>
        <Person o={win(f, 0, traffic, 10)} f={f} who="buyer" beats={gestB([[0, 'phone', 'neutral'], [where, 'think', 'thinking'], [phone55, 'phone', 'neutral'], [choosing, 'shrug', 'thinking'], [chose, 'point', 'shocked'], [door58, 'explain', 'neutral'], [partners, 'countA', 'neutral'], [n20, 'point', 'thinking']], G.slice(6, 16))} x={200} y={1000} s={1.1} />
        </g>
      </g>}
      {/* # 2: the courtroom */}
      {B > 0 && <g opacity={B}>
        <rect x={0} y={0} width={1920} height={1000} fill="#6B4A2E" />
        {Array.from({ length: 10 }, (_, k) => <rect key={k} x={k * 200 + 20} y={230} width={160} height={600} rx={8} fill="#7A5638" />)}
        <rect x={0} y={1000} width={1920} height={80} fill="#4A3220" /><rect x={0} y={0} width={1920} height={215} fill="#EFE6D6" /><rect x={0} y={205} width={1920} height={22} fill="#8E6A45" />
        <g transform="translate(960 1000) scale(0.9) translate(-960 -1000)">
        {/* # the bench and the judge */}
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [judge, 'explain', 'neutral'], [ruled, 'point', 'angry'], [decision, 'explain', 'neutral']]} x={960} y={860} s={0.9} />
        <rect x={660} y={700} width={600} height={300} rx={12} fill="#4A3220" /><rect x={640} y={680} width={640} height={40} rx={10} fill="#3A2616" />
        <g transform="translate(960 840)"><rect x={-110} y={-34} width={220} height={68} rx={12} fill={P.gold} /><text y={16} textAnchor="middle" fill="#3A2A12" style={{ font: '400 46px "Bebas Neue"' }}>US COURT</text></g>
        <Gavel x={1180} y={640} s={0.6} hit={easeInOut(span(f, monopoly - 4, monopoly + 4)) * (1 - span(f, monopoly + 8, monopoly + 14))} />
        {/* # the 2021 board with an iPhone */}
        <g opacity={win(f, n26 - 4, ruled, 8)} transform={`translate(330 560) scale(${pop(f, n26 - 4)})`}>
          <rect x={-250} y={-200} width={500} height={330} rx={16} fill="#F4F1EA" />
          <text y={-130} textAnchor="middle" fill={P.ink} style={{ font: '400 50px "Bebas Neue"' }}>2021 ALONE</text>
          <text y={-40} textAnchor="middle" fill={P.coralInk} style={{ font: '400 96px "Bebas Neue"' }}>$26B+</text>
          <text y={30} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>PAID TO BE THE DEFAULT</text>
          <text y={90} textAnchor="middle" fill={P.ink2} style={{ font: '400 34px "Bebas Neue"' }}>PHONES · BROWSERS</text>
        </g>
        <g opacity={win(f, iphones, ruled, 6)} transform={`translate(330 870) scale(${pop(f, iphones) * 0.32})`}><PhoneB x={0} y={0} label="Google" /></g>
        <g opacity={win(f, monopoly, decision, 6)}><Stamp x={960} y={320} text="ILLEGAL MONOPOLY" f={f} at={monopoly} size={80} /><text x={960} y={408} textAnchor="middle" fill={P.gold} style={{ font: '400 48px "Bebas Neue"' }}>2024 RULING</text></g>
        <g opacity={on(f, decision, 8)} transform={`translate(1560 360) scale(${pop(f, decision) * 0.85})`}>
          <rect x={-270} y={-140} width={540} height={280} rx={16} fill="#F4F1EA" />
          <text y={-74} textAnchor="middle" fill={P.ink} style={{ font: '400 46px "Bebas Neue"' }}>LATER DECISION</text>
          <text y={4} textAnchor="middle" fill={P.mintInk} style={{ font: '400 50px "Bebas Neue"' }}>CAN STILL PAY TO BE DEFAULT</text>
          <text y={74} textAnchor="middle" fill={P.coralInk} opacity={on(f, exclusive, 6)} style={{ font: '400 50px "Bebas Neue"' }}>LIMITS ON EXCLUSIVE DEALS</text>
        </g>
        <Person f={f} who="investor" beats={gestB([[0, 'nervous', 'worried'], [ruled, 'despair', 'worried'], [decision, 'relief', 'smiling']], G.slice(16))} x={1500} y={1000} s={0.95} flip />
        <Person f={f} who="worker" beats={[[0, 'idle', 'worried'], [iphones, 'nervous', 'worried'], [decision, 'shrug', 'smiling']]} x={1760} y={1000} s={0.95} flip />
        </g>
      </g>}
      <Headline f={f} lines={[[catch53, 'FIRST, YOU HAVE TO SEARCH ON GOOGLE', P.ink, 92], [where, 'WHERE DO YOU SEARCH?', P.ink, 104], [chose, 'GOOGLE PAYS TO BE THE CHOICE', P.goldInk, 100], [door58, 'THE MAIN DOOR TO A BUSY STREET', P.ink, 96],
        [traffic, 'TRAFFIC ACQUISITION COSTS', P.ink, 100], [n60, '2025: ABOUT $60 BILLION', P.goldInk, 104], [n20, '≈ 20¢ OF EVERY AD DOLLAR', P.goldInk, 104], [case64, 'A US COURT CASE', P.ink, 110], [ruled, 'RULED: ILLEGAL MONOPOLY', P.coralInk, 104], [decision, 'STILL ALLOWED, WITH LIMITS', P.ink, 104]]} />
      <Vignette id="gg-door" />
    </g>
  )
}

const BEATS = ['s61:those', 's63:businesses', 's63:goes', 's65:alone', 's65:and', 's67:to', 's53:google', 's57:see', 's58:it', 's60:it', 's60:in', 's61:in', 's60:ads', 's62:made', 's63:ads', 's63:for#2', 's65:in', 's65:default', 's65:the', 's66:these', 's67:but', 's67:with', 's53:catch', 's53:first', 's54:where', 's55:phone', 's55:browser', 's55:choosing', 's56:chose', 's56:pays', 's57:default', 's57:worth', 's58:door', 's58:street', 's59:traffic', 's60:partners', 's60:browser', 's60:phone', 's60:carriers', 's60:websites',
  's61:60', 's62:20', 's63:average', 's63:partners', 's64:case', 's64:deals', 's65:judge', 's65:26', 's65:iphones', 's66:ruled', 's66:monopoly', 's67:decision', 's67:exclusive']
export const GG_DOOR = makePiece('gg-door', 'Google long (casino-style): a busy street with Google’s building on the right and a crowd walking past; a giant phone rises like a gate and everyone walks through it — its search box reads Google, the default seen first; Google’s rep hands a phone maker a money bag; partner signs BROWSERS, PHONE MAKERS, CARRIERS and WEBSITES pop and coins fly to them from a $60B bag; a $1 coin loses a 20¢ slice; then a courtroom: a board 2021 ALONE $26B+ PAID TO BE THE DEFAULT with an iPhone, the gavel bangs ILLEGAL MONOPOLY · 2024 RULING, and a later-decision card reads CAN STILL PAY TO BE DEFAULT / LIMITS ON EXCLUSIVE DEALS', {
  mood: 'light', Component: Door, beats: BEATS,
  sfx: [['s55:phone', 'swish', 0.3], ['s56:pays', 'coin', 0.3], ['s61:60', 'coin', 0.35], ['s62:20', 'click', 0.3], ['s66:monopoly', 'thud', 0.35], ['s67:exclusive', 'ding', 0.3]] })
