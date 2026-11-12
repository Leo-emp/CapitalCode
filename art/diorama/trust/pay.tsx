// ---------------------------------------------------------------- s70–s77: the playbook (payoff).
// A) Three cards slide in and light in turn: 1) a stack whose top 40% turns red; 2) a GRAT box passing a gold growth
//    stack out with a ≈ $0 tag; 3) a DYNASTY box with an infinity loop.
// B) The rulebook open on its stand, the Capitol behind: all written into the rules, left there by Congress.
// C) A street of ordinary homes far below a dashed $15M allowance line high above them.
// D) A velvet rope with a VERY RICH ONLY sign: the billionaire and his lawyer inside, everyone else outside.
// E) The billionaire hands a glowing gold sprout (tomorrow's growth) into the trust box: tag ≈ $0; the lid locks and an infinity loop glows.
import React from 'react'
import { clamp01, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, House, Person, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { FlipTag } from '../bbd/kit'
import { Capitol } from '../debt1835/kit'
import { CashColumn, Pill, Rulebook, TrustBox } from './kit'
import { Spot } from '../bank/kit'

const GROUND = 930

const Loop8: React.FC<{ x: number; y: number; s?: number; t: number; o?: number }> = ({ x, y, s = 1, t, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 0 C-40 -60 -120 -60 -120 0 C-120 60 -40 60 0 0 C40 -60 120 -60 120 0 C120 60 40 60 0 0 Z" fill="none" stroke="#B4821C" strokeWidth={18} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - clamp01(t)} />
  </g>
)
// # a gold sprout: two leaves on a stem; g 0–1 grows it
const Sprout: React.FC<{ x: number; y: number; s?: number; g?: number; o?: number }> = ({ x, y, s = 1, g = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={-40} rx={90} ry={70} fill={P.gold} opacity={0.25} />
    <rect x={-36} y={-30} width={72} height={46} rx={10} fill="#8E5E36" />
    <path d={`M0 -30 L0 ${-30 - 90 * g}`} stroke="#3DA672" strokeWidth={10} strokeLinecap="round" />
    <path d={`M0 ${-30 - 60 * g} q -50 -10 -60 -50 q 45 0 60 50`} fill={P.gold} stroke="#B88A2E" strokeWidth={3} opacity={g} />
    <path d={`M0 ${-30 - 80 * g} q 50 -10 60 -50 q -45 0 -60 50`} fill={P.gold} stroke="#B88A2E" strokeWidth={3} opacity={g} />
  </g>
)

const Pay: React.FC<PieceProps> = ({ f, c }) => {
  const three70 = c('s70:three'), together = c('s70:together')
  const one71 = c('s71:one'), take = c('s71:take'), p40 = c('s71:40'), m15 = c('s71:15')
  const two72 = c('s72:two'), hand72 = c('s72:hand'), future = c('s72:future'), growth72 = c('s72:growth'), value72 = c('s72:value'), zero72 = c('s72:zero')
  const three73 = c('s73:three'), lock73 = c('s73:lock'), generations = c('s73:generations'), forever = c('s73:forever')
  const hidden = c('s74:hidden'), illegal = c('s74:illegal'), written = c('s74:written'), congress = c('s74:congress'), left74 = c('s74:left')
  const most = c('s75:most'), comes = c('s75:comes'), m15b = c('s75:15'), far = c('s75:far'), anyone = c('s75:anyone'), behind = c('s75:behind')
  const lawyers = c('s76:lawyers'), fortune76 = c('s76:fortune'), protecting = c('s76:protecting'), game = c('s76:game'), rich76 = c('s76:rich'), play = c('s76:play')
  const practice76 = c('s76:practice'), book74 = c('s74:book'), billionaires = c('s77:billionaires'), beat77 = c('s77:beat'), hiding = c('s77:hiding'), beat2 = c('s77:beat#2'), giving = c('s77:giving'), tomorrows = c('s77:tomorrow\'s'), nothing77 = c('s77:nothing'), parking = c('s77:parking'), box77 = c('s77:box'), never = c('s77:never'), dies77 = c('s77:dies')

  const cut = [c('s74') - 8, c('s75') - 8, c('s76') - 8, c('s77') - 8]
  const A = win(f, 0, cut[0]), B = win(f, cut[0], cut[1]), C = win(f, cut[1], cut[2]), D = win(f, cut[2], cut[3]), E = on(f, cut[3], 10)

  const cards = [[one71, 'THE 40% TAX'], [two72, 'THE GRAT'], [three73, 'THE DYNASTY TRUST']] as [number, string][]
  const lit = (k: number) => k === 0 ? win(f, one71, two72, 8) : k === 1 ? win(f, two72, three73, 8) : on(f, three73, 8)

  // # E) the sprout travels from his hand into the box
  const eBeats: Beat[] = [[cut[3], 'idle', 'smug'], [billionaires, 'confident', 'smug'], [hiding, 'crossNoA', 'neutral', 'crossNoB', 12], [giving, 'offer', 'smiling'], [parking, 'present', 'smug'], [dies77, 'confident', 'smug']]
  const ep = hand(f, eBeats, 380, GROUND, 1.05)
  const st = span(f, tomorrows, parking + 6)

  return (
    <g>
      <Stage id="tt-pay" frame={f} />
      <Headline f={f} lines={[[three70, 'THE PLAYBOOK', P.ink, 112], [hidden, 'NOT HIDDEN', P.ink, 112], [illegal, 'USED BY THE BOOK: LEGAL', P.mintInk, 100], [congress, 'AND CONGRESS LEFT IT THERE', P.ink, 96],
        [most, 'MOST FAMILIES: NEVER AN ISSUE', P.ink, 96], [lawyers, 'IT TAKES EXPENSIVE LAWYERS', P.ink, 96], [game, 'A GAME FOR THE VERY RICH', P.ink, 100],
        [hiding, 'NOT BY HIDING MONEY', P.ink, 104], [giving, "BY GIVING AWAY TOMORROW'S GROWTH", P.goldInk, 88], [box77, '… INTO A BOX THAT NEVER DIES', P.ink, 96]]} />

      {/* # A) the three cards */}
      {A > 0 && <g opacity={A}>
        {cards.map(([at, title], k) => { const x = 380 + k * 580, y = 560, inT = on(f, three70 + k * 6, 14), L = lit(k)
          return <g key={k} opacity={inT} transform={`translate(${x} ${y + 60 * (1 - inT) - 20 * L}) scale(${1 + 0.05 * L})`}>
            <rect x={-250} y={-300} width={500} height={600} rx={30} fill="#000" opacity={0.1} transform="translate(8 12)" />
            <rect x={-250} y={-300} width={500} height={600} rx={30} fill={P.card} stroke={L > 0.5 ? '#B4821C' : '#E2D3B4'} strokeWidth={L > 0.5 ? 8 : 4} />
            <circle cx={-190} cy={-240} r={36} fill="#2E4A78" /><text x={-190} y={-226} textAnchor="middle" fill="#FFF" style={{ font: '400 44px "Bebas Neue"' }}>{k + 1}</text>
            <text x={20} y={-224} textAnchor="middle" fill="#16294A" style={{ font: '400 48px "Bebas Neue"', letterSpacing: 2 }}>{title}</text>
            <g opacity={0.35 + 0.65 * on(f, at, 10)}>
              {k === 0 && <g><CashColumn x={0} y={230} h={340} w={180} color="gold" cut={0.4 * on(f, p40, 12)} lift={30 * on(f, p40, 12)} /><Pill x={0} y={-50 - 30 * on(f, p40, 12) } text="40%" size={46} w={120} color="#D9483A" o={on(f, p40, 8)} /><Pill x={0} y={270} text="ABOVE $15M" size={36} w={220} o={on(f, m15, 8)} /></g>}
              {k === 1 && <g><TrustBox x={-60} y={230} s={0.55} label="GRAT" lock={1} /><CashColumn x={lerp(-60, 140, on(f, hand72, 18))} y={lerp(80, 230, on(f, hand72, 18))} h={110 * on(f, growth72 - 10, 12)} w={110} color="gold" /><FlipTag x={60} y={-90} s={0.6} a="GIFT" b="≈ $0" t={span(f, zero72 - 6, zero72 + 8)} o={on(f, value72, 8)} color={f > zero72 ? '#7FD3A0' : P.gold} /></g>}
              {k === 2 && <g><TrustBox x={0} y={230} s={0.62} label="DYNASTY" tint="#B88A2E" lock={on(f, lock73, 10)} /><Loop8 x={0} y={-60} s={0.9} t={span(f, generations, forever + 12)} /></g>}
            </g>
          </g> })}
      </g>}

      {/* # B) written into the rules */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, congress - 6, 10)}><Capitol x={1380} y={GROUND} s={1.05} /></g>
        <g transform={`translate(0 ${-20 * (1 - pop(f, written, 12))})`}><Rulebook x={620} y={GROUND - 260} s={1.6} open={on(f, written, 16)} title="TAX CODE" /></g>
        <rect x={520} y={GROUND - 60} width={200} height={60} rx={8} fill="#8E5E36" />
        <Spot f={f} at={book74} x={620} y={GROUND - 260} rx={200} ry={210} />
        <Pill x={1380} y={GROUND + 64} text="LEFT AS IT IS" size={40} w={260} o={on(f, left74, 8)} />
      </g>}

      {/* # C) most families never reach the allowance */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {[0, 1, 2, 3, 4, 5].map((k) => <g key={k} opacity={on(f, most + k * 3, 8)}><House x={230 + k * 290} y={GROUND} s={0.62} color={['#E9C25A', '#9FD3B6', '#F2B8A2', '#BFD6F2', '#E9C25A', '#F2B8A2'][k]} /></g>)}
        <g opacity={on(f, m15b, 8)}><line x1={80} y1={300} x2={1840} y2={300} stroke="#B4821C" strokeWidth={8} strokeDasharray="26 16" /><Pill x={960} y={300} text="$15 MILLION ALLOWANCE" size={50} w={560} color="#B4821C" /></g>
        <g opacity={on(f, far, 8)}><path d={`M1700 ${GROUND - 260} L1700 360`} stroke="#5C6F8E" strokeWidth={6} /><path d="M1700 340 l-18 30 h36 Z" fill="#5C6F8E" /><path d={`M1700 ${GROUND - 240} l-18 -30 h36 Z`} fill="#5C6F8E" /><Pill x={1500} y={520} text="FAR ABOVE" size={40} w={230} color="#5C6F8E" o={on(f, far, 8)} /></g>
      </g>}

      {/* # D) a velvet rope: very rich only */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {[700, 1220].map((x) => <g key={x}><rect x={x - 12} y={GROUND - 200} width={24} height={200} rx={8} fill={P.gold} /><circle cx={x} cy={GROUND - 210} r={22} fill={P.gold} /><rect x={x - 40} y={GROUND - 14} width={80} height={14} rx={6} fill="#B88A2E" /></g>)}
        <path d={`M700 ${GROUND - 190} Q960 ${GROUND - 110} 1220 ${GROUND - 190}`} fill="none" stroke="#B0233A" strokeWidth={18} strokeLinecap="round" />
        <g opacity={on(f, game, 10)} transform={`translate(960 ${GROUND - 440 - 20 * (1 - pop(f, game, 14))})`}><rect x={-220} y={-60} width={440} height={120} rx={16} fill="#16294A" stroke={P.gold} strokeWidth={6} /><text y={22} textAnchor="middle" fill={P.gold} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 4 }}>VERY RICH ONLY</text></g>
        <Person f={f} who="investor" beats={[[cut[2], 'idle', 'smug'], [fortune76, 'confident', 'smug'], [play, 'thumbsUp', 'smiling']]} x={1480} y={GROUND} s={1.0} flip />
        <g opacity={on(f, lawyers, 8)}><Person f={f} who="buyer" beats={[[lawyers, 'present', 'smiling'], [protecting, 'read', 'thinking']]} x={1700} y={GROUND} s={0.95} flip /><Pill x={1700} y={GROUND + 64} text="LAWYER" size={38} w={170} /></g>
        <Person f={f} who="hero" beats={[[cut[2], 'idle', 'neutral'], [practice76, 'think', 'thinking'], [game, 'shrug', 'neutral'], [rich76, 'armsCrossed', 'thinking']]} x={420} y={GROUND} s={1.0} />
      </g>}

      {/* # E) tomorrow's growth, parked in a box that never dies */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        <Person f={f} who="investor" beats={eBeats} x={380} y={GROUND} s={1.05} />
        <TrustBox x={1180} y={GROUND} s={1.1} o={on(f, beat77, 10)} label="TRUST" tint="#B88A2E" open={win(f, parking - 10, box77 + 8, 8)} lock={on(f, never, 10)} glow={on(f, never, 16)} />
        <g opacity={on(f, beat2, 10) * (1 - on(f, box77, 6))}><Sprout x={lerp(ep.x + 130, 1180, st)} y={lerp(ep.y - 20, GROUND - 230, st) - 140 * Math.sin(Math.PI * st)} s={1.1} g={on(f, tomorrows, 16)} /></g>
        <FlipTag x={760} y={430} s={0.85} a="GROWTH" b="≈ $0" t={span(f, nothing77 - 6, nothing77 + 8)} o={win(f, giving, box77, 8)} color={f > nothing77 ? '#7FD3A0' : P.gold} />
        <Loop8 x={1180} y={420} s={1.0} t={span(f, never, dies77 + 14)} o={on(f, never, 8)} />
      </g>}
      <Vignette id="tt-pay" />
    </g>
  )
}

const BEATS = ['s76:practice', 's74:book', 's77:billionaires', 's77:beat', 's70:three', 's70:together', 's71:one', 's71:take', 's71:40', 's71:15', 's72:two', 's72:hand', 's72:future', 's72:growth', 's72:value', 's72:zero', 's73:three', 's73:lock', 's73:generations', 's73:forever',
  's74:hidden', 's74:illegal', 's74:written', 's74:congress', 's74:left', 's75:most', 's75:comes', 's75:15', 's75:far', 's75:anyone', 's75:behind', 's76:lawyers', 's76:fortune', 's76:protecting', 's76:game', 's76:rich', 's76:play',
  's77:hiding', 's77:beat#2', 's77:giving', "s77:tomorrow's", 's77:nothing', 's77:parking', 's77:box', 's77:never', 's77:dies']
export const TT_PAY = makePiece('tt-pay', 'Trusts payoff: three cards light in turn — a gold stack whose top 40% turns red above $15M, a GRAT box handing out a gold growth stack with a gift tag flipping to ≈ $0, a DYNASTY box locking under an infinity loop; the tax-code rulebook opens with the Capitol behind (left as it is); a street of six homes far below a dashed $15 million allowance line; a velvet rope with a VERY RICH ONLY sign, the billionaire and his lawyer inside, the presenter outside shrugging; the billionaire crosses out hiding money, then hands a glowing gold sprout (tomorrow’s growth, tag ≈ $0) into the trust box, which locks under a glowing infinity loop', {
  mood: 'light', Component: Pay, beats: BEATS,
  sfx: [['s70:three', 'pop', 0.2], ['s71:40', 'thud', 0.15], ['s72:zero', 'pop', 0.2], ['s73:forever', 'chime', 0.2], ['s74:written', 'flutter', 0.15], ['s76:game', 'pop', 0.2], ['s77:never', 'chime', 0.3]] })
