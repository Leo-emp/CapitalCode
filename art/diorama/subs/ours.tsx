// ---------------------------------------------------------------- s66–s76: why we pay more than we think (casino style).
// Maya's living room in the evening, one setting. Small /MONTH tags drift past her and fade to grey — she stops
// noticing. A wall calendar shows a circular RENEWS arrow; a big STOP button sits on the table, untouched. A
// researcher with a clipboard asks her the question; her thought bubble says $86. Then she pulls her real bills from
// a drawer one by one and they pile up on the table to $219 a month — $133 more than her guess. A FREE TRIAL gift
// box opens into a PAID PLAN bill; a CANCEL? reminder pops on her phone and she snoozes it. Through the window, coins
// keep flowing out to the companies' buildings.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Person, win } from '../aimoney/common'
import { gestB } from '../buffett/hook'
import { BillEnv, CalPage, DayWindow, Maya, Studio, Tower } from './kit'

const Ours: React.FC<PieceProps> = ({ f, c }) => {
  const monthly = c('s66:monthly'), noticing = c('s66:noticing'), renews = c('s67:renews'), pay67 = c('s67:pay'), stop67 = c('s67:stop')
  const research = c('s68:research'), n1000 = c('s68:1000'), question = c('s68:question'), spend = c('s69:spend'), quick = c('s70:quick'), n86 = c('s70:86')
  const bills = c('s71:bills'), one71 = c('s71:one'), real = c('s72:real'), n219 = c('s72:219'), n133 = c('s72:133'), small73 = c('s73:small'), together = c('s73:together')
  const trial = c('s74:trial'), paid74 = c('s74:paid'), cancel74 = c('s74:cancel'), decision = c('s75:decision'), put = c('s75:put')
  const good = c('s76:good'), keeps = c('s76:keeps'), forget = c('s76:forget')
  // # extra gesture words
  const G = [c('s66:price'), c('s67:decide'), c('s69:subscriptions'), c('s70:average'), c('s71:people'), c('s72:month'), c('s73:subscription'), c('s74:subscriptions'), c('s75:stop'), c('s76:companies'), c('s68:r'), c('s72:they'), c('s73:bigger'), c('s75:one'), c('s76:makes')]
  const TX = 960
  // # bills pile up one by one on the table
  const nBills = f < bills ? 0 : Math.min(8, 1 + Math.floor((f - bills) / 7))
  return (
    <g>
      <StageBg id="sb-ours" frame={f} />
      <Studio />
      <DayWindow x={1420} y={300} w={420} h={520} id="sb-ours">
        <rect x={1420} y={300} width={420} height={520} fill="#F5B98A" opacity={0.5} />
        <Tower x={1540} y={820} s={0.45} label="APPS" color="#3A6EA8" /><Tower x={1740} y={820} s={0.5} label="MUSIC" color="#8A5CC2" />
        {Array.from({ length: 5 }, (_, k) => { const t = ((f - keeps + k * 12) % 60) / 60; return <g key={k} opacity={on(f, keeps, 6) * (t < 0.9 ? 1 : 0)}><Coin x={lerp(1440, 1640 + (k % 2) * 100, t)} y={lerp(560, 600 - 100 * Math.sin(t * Math.PI), t)} s={0.45} /></g> })}
      </DayWindow>
      {/* # the calendar with the RENEWS arrow */}
      <g opacity={win(f, renews - 2, research, 8)} transform={`translate(260 420) scale(${pop(f, renews)})`}><CalPage x={0} y={0} top="EVERY MONTH" big="" s={1.1} /><g transform="translate(0 30)"><path d="M-50 0 A50 50 0 1 1 0 50" fill="none" stroke={P.mint} strokeWidth={14} strokeLinecap="round" transform={`rotate(${(f - renews) * 6})`} /><text y={110} textAnchor="middle" fill={P.mintInk} style={{ font: '400 40px "Bebas Neue"' }}>RENEWS</text></g></g>
      {/* # the table */}
      <rect x={TX - 300} y={760} width={600} height={28} rx={8} fill="#7A5236" /><rect x={TX - 270} y={788} width={24} height={212} fill="#5C3D27" /><rect x={TX + 246} y={788} width={24} height={212} fill="#5C3D27" />
      {/* # the STOP button nobody presses */}
      <g opacity={win(f, stop67 - 2, research, 6)} transform={`translate(${TX + 160} 720) scale(${pop(f, stop67)})`}><rect x={-60} y={-10} width={120} height={50} rx={10} fill="#5B6680" /><ellipse cx={0} cy={-10} rx={56} ry={22} fill={P.coral} /><text y={-60} textAnchor="middle" fill={P.coralInk} style={{ font: '400 48px "Bebas Neue"' }}>STOP</text></g>
      {/* # small /MONTH tags drift and fade to grey */}
      {Array.from({ length: 4 }, (_, k) => { const t = span(f, monthly + k * 6, noticing + 30); return <g key={k} opacity={win(f, monthly + k * 6 - 2, renews, 6)} transform={`translate(${TX - 220 + k * 150} ${lerp(640, 480 - (k % 2) * 60, t)})`}><rect x={-62} y={-28} width={124} height={56} rx={10} fill={on(f, noticing, 14) > 0.5 ? '#C9CED8' : P.gold} /><text y={12} textAnchor="middle" fill={on(f, noticing, 14) > 0.5 ? '#8A94A8' : '#3A2A12'} style={{ font: '400 32px "Bebas Neue"' }}>/MONTH</text></g> })}
      {/* # the researcher asks; Maya's guess */}
      <g opacity={win(f, research - 2, bills, 8)}><Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [question, 'explain', 'smiling'], [spend, 'point', 'neutral']]} x={1260} y={1000} s={1} flip />
        <g transform="translate(1190 640)"><rect x={-40} y={-55} width={80} height={110} rx={8} fill="#8E6A45" /><rect x={-30} y={-45} width={60} height={90} fill="#FFFFFF" /></g>
        <g opacity={on(f, n1000, 6)} transform="translate(1260 300)"><rect x={-180} y={-36} width={360} height={72} rx={14} fill="#FFFFFF" stroke={P.ink2} strokeWidth={4} /><text y={14} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>≈ 1,000 AMERICANS · 2022</text></g>
      </g>
      <g opacity={win(f, quick - 2, together, 8)} transform={`translate(250 ${lerp(460, 420, on(f, quick, 12))}) scale(${pop(f, quick)})`}>
        <ellipse rx={170} ry={90} fill="#FFFFFF" /><circle cx={150} cy={90} r={18} fill="#FFFFFF" /><circle cx={190} cy={115} r={10} fill="#FFFFFF" />
        <text y={-14} textAnchor="middle" fill={P.ink2} style={{ font: '400 36px "Bebas Neue"' }}>MY GUESS</text>
        <text y={46} textAnchor="middle" fill={P.ink} opacity={on(f, n86, 4)} style={{ font: '400 74px "Bebas Neue"' }}>$86</text>
      </g>
      {/* # the real bills pile up on the table */}
      <g opacity={win(f, bills - 2, trial, 8)}>
        {Array.from({ length: nBills }, (_, k) => <BillEnv key={k} x={TX - 40 + (k % 2) * 30} y={720 - k * 26} s={0.85} r={(k % 3 - 1) * 4} />)}
        <g opacity={on(f, n219, 6)} transform={`translate(${TX + 230} 470) scale(${pop(f, n219)})`}><rect x={-150} y={-50} width={300} height={100} rx={16} fill={P.coral} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"' }}>$219 / MONTH</text></g>
        <g opacity={on(f, n133, 6)} transform={`translate(${TX + 230} 590) scale(${pop(f, n133)})`}><text textAnchor="middle" y={20} fill={P.coralInk} style={{ font: '400 64px "Bebas Neue"' }}>+$133 MORE</text></g>
      </g>
      {/* # the free trial turns into a paid plan; the cancel reminder gets snoozed */}
      <g opacity={win(f, trial - 2, good, 8)} transform={`translate(${TX} 640)`}>
        <g opacity={1 - on(f, paid74, 8)}><rect x={-110} y={-90} width={220} height={180} rx={12} fill="#8A5CC2" /><rect x={-20} y={-90} width={40} height={180} fill={P.gold} /><rect x={-120} y={-110} width={240} height={50} rx={10} fill="#A37BD6" /><text y={150} textAnchor="middle" fill={P.ink} style={{ font: '400 48px "Bebas Neue"' }}>FREE TRIAL</text></g>
        <g opacity={on(f, paid74, 8)}><BillEnv x={0} y={0} s={1.3} amount="PAID PLAN" /></g>
      </g>
      <g opacity={win(f, cancel74 - 2, good, 6)} transform={`translate(250 ${lerp(470, 420, on(f, cancel74, 10))}) scale(${pop(f, cancel74)})`}><rect x={-150} y={-60} width={300} height={120} rx={20} fill="#FFFFFF" stroke={P.ink2} strokeWidth={4} /><text y={-6} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>CANCEL TRIAL?</text><text y={42} textAnchor="middle" fill={f > put ? P.ink2 : P.coralInk} style={{ font: '400 36px "Bebas Neue"' }}>{f > put ? 'SNOOZED…' : 'TODAY'}</text></g>
      <Maya f={f} beats={gestB([[0, 'phone', 'neutral'], [noticing, 'pockets', 'neutral'], [stop67, 'shrug', 'neutral'], [question, 'think', 'thinking'], [n86, 'explain', 'smiling'], [bills, 'reachDown', 'neutral'], [n219, 'shock', 'shocked'], [n133, 'facepalm', 'worried'], [trial, 'celebrate', 'smiling'], [paid74, 'oops', 'worried'], [cancel74, 'phone', 'neutral'], [put, 'shrug', 'smug'], [keeps, 'lookFar', 'worried']], G)} x={560} s={1.1} />
      <Headline f={f} lines={[[monthly, 'SMALL MONTHLY PRICES', P.ink, 110], [renews, 'IT RENEWS BY ITSELF', P.ink, 110], [research, 'A 2022 SURVEY: HOW MUCH?', P.ink, 104], [n86, 'QUICK GUESS: $86 A MONTH', P.ink, 104], [n219, 'REAL BILLS: $219 A MONTH', P.coralInk, 104],
        [small73, 'SMALL ALONE, BIG TOGETHER', P.ink, 104], [trial, 'FREE TRIAL → PAID PLAN', P.ink, 104], [decision, 'EASY TO PUT OFF', P.ink, 110], [good, 'THE MONEY KEEPS COMING', P.goldInk, 104]]} />
      <Vignette id="sb-ours" />
    </g>
  )
}

const BEATS = ['s68:r', 's72:they', 's73:bigger', 's75:one', 's76:makes', 's66:price', 's67:decide', 's69:subscriptions', 's70:average', 's71:people', 's72:month', 's73:subscription', 's74:subscriptions', 's75:stop', 's76:companies',
  's66:monthly', 's66:noticing', 's67:renews', 's67:pay', 's67:stop', 's68:research', 's68:1000', 's68:question', 's69:spend', 's70:quick', 's70:86', 's71:bills', 's71:one', 's72:real', 's72:219', 's72:133', 's73:small', 's73:together', 's74:trial', 's74:paid', 's74:cancel', 's75:decision', 's75:put', 's76:good', 's76:keeps', 's76:forget']
export const SB_OURS = makePiece('sb-ours', 'Subscriptions long (casino-style): Maya’s living room in the evening; small /MONTH tags drift past and fade grey; a calendar with a turning RENEWS arrow; a STOP button sits untouched on the table; a researcher with a clipboard (≈ 1,000 Americans, 2022) asks her; her thought bubble says MY GUESS $86; she pulls real bills from a drawer and they pile up to $219 / MONTH, +$133 MORE; a FREE TRIAL gift box turns into a PAID PLAN bill; a CANCEL TRIAL? reminder gets SNOOZED; through the window coins keep flowing to the APPS and MUSIC buildings', {
  mood: 'light', Component: Ours, beats: BEATS,
  sfx: [['s67:renews', 'swish', 0.3], ['s70:86', 'pop', 0.3], ['s72:219', 'thud', 0.35], ['s74:paid', 'click', 0.3], ['s76:keeps', 'coin', 0.3]] })
