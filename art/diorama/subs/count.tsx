// ---------------------------------------------------------------- s52–s64: money you can count on (casino style).
// 1) The executive's office. Along the floor runs a conveyor belt: subscribers drop a coin at the left end every
// month and the coins ride steadily into the company vault on the right. On the wall, the box world: a calendar
// "NEXT YEAR" with a big "?". Coins already queued on the belt are tagged NEXT MONTH. The executive holds Adobe's
// annual report stamped MORE PREDICTABLE; investors by the vault cheer; a calendar shows the 1st of the month with a
// coin; then a new hire walks in, a gear starts turning (new features) and a bank hands over a money bag.
// 2) Two money towers: 2012 ≈ $4.4B and 2024 ≈ $21.5B, the big one ≈ 95% gold (SUBSCRIPTIONS ≈ $20.5B), about five
// times taller; two small BOUGHT COMPANY buildings slide in beside it.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, Headline, Stamp, win } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { gestB } from '../buffett/hook'
import { CalPage, Exec, Studio, Tower } from './kit'

const Count: React.FC<PieceProps> = ({ f, c }) => {
  const predictable = c('s52:predictable'), box53 = c('s53:box'), next53 = c('s53:next'), subscribe = c('s54:subscribe'), way = c('s54:way')
  const itself = c('s55:itself'), stream = c('s55:stream'), predictable55 = c('s55:predictable'), investors = c('s56:investors'), steady = c('s56:steady'), grow = c('s56:grow')
  const first = c('s57:first'), know = c('s57:know'), hire = c('s58:hire'), build = c('s58:build'), borrow = c('s58:borrow')
  const switch59 = c('s59:switch'), n215 = c('s60:215'), n205 = c('s61:205'), n95 = c('s62:95'), compared = c('s63:compared'), five = c('s63:five')
  const buying = c('s64:buying'), almost = c('s64:almost'), subs64 = c('s64:subscriptions')
  // # extra gesture words
  const G = [c('s51:more'), c('s53:customers'), c('s54:customers'), c('s55:wrote'), c('s56:plan'), c('s57:business'), c('s57:month'), c('s58:features'), c('s60:adobe'), c('s61:billion'), c('s62:calculation'), c('s63:revenue'), c('s64:growth'), c('s53:knows'), c('s54:money'), c('s54:paying'), c('s55:and'), c('s57:in'), c('s59:happened'), c('s62:by'), c('s62:adobe'), c('s64:now'), c('s51:companies'), c('s51:love'), c('s51:matters')]
  const A = win(f, 0, switch59 - 2, 10), B = on(f, switch59 - 2, 10)
  const BX = 260, BY = 930, VX = 1640 // # belt from BX to the vault at VX
  const beltOn = on(f, predictable - 2, 8)
  return (
    <g>
      <StageBg id="sb-count" frame={f} />
      <Studio />
      {/* # 1: the conveyor office */}
      {A > 0 && <g opacity={A}>
        {/* # the belt */}
        <g opacity={beltOn}>
          <rect x={BX - 40} y={BY} width={VX - BX - 80} height={40} rx={20} fill="#5B6680" />
          {Array.from({ length: 16 }, (_, k) => <circle key={k} cx={BX - 20 + ((k * 90 + f * 3) % (VX - BX - 120))} cy={BY + 20} r={10} fill="#3A4660" />)}
          {Array.from({ length: 7 }, (_, k) => { const t = ((f - predictable) * 3 + k * 170) % 1200; return <g key={k} opacity={t < 1150 ? 1 : 0}><Coin x={BX + t} y={BY - 40} s={0.65} /></g> })}
          <g opacity={win(f, way - 4, investors, 6)} transform={`translate(${BX + 320} ${BY - 140})`}><rect x={-120} y={-36} width={240} height={72} rx={14} fill="#7FB4E8" /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 42px "Bebas Neue"' }}>NEXT MONTH</text></g>
          {/* # subscribers drop a coin at the left end */}
          {[0, 1].map((k) => <Mini key={k} look={['hero', 'owner'][k]} x={110 + k * 110} y={1000} scale={1.3} frame={f} seed={k + 900} mood="neutral" />)}
        </g>
        {/* # the vault */}
        <g transform={`translate(${VX + 80} 1000)`}><rect x={-150} y={-330} width={300} height={330} rx={24} fill="#5B6680" /><rect x={-120} y={-300} width={240} height={270} rx={16} fill="#2A3448" /><circle cx={0} cy={-170} r={60} fill="#8A94A8" /><circle cx={0} cy={-170} r={14} fill="#2A3448" /><text y={-345} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>ADOBE</text></g>
        {/* # the box world: next year? */}
        <g opacity={win(f, box53 - 2, subscribe, 6)} transform={`translate(520 470) scale(${pop(f, box53)})`}><CalPage x={0} y={0} top="NEXT YEAR" big="?" s={1.1} /></g>
        {/* # the annual report stamped MORE PREDICTABLE */}
        <g opacity={win(f, itself - 2, investors + 10, 6)} transform={`translate(640 520) scale(${pop(f, itself)})`}><rect x={-120} y={-150} width={240} height={300} rx={12} fill="#FFFFFF" stroke="#C9B48E" strokeWidth={5} /><text y={-100} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>ADOBE 10-K</text>{[0, 1, 2, 3].map((k) => <rect key={k} x={-90} y={-60 + k * 34} width={180 - (k % 2) * 50} height={12} rx={6} fill="#DADCE0" />)}<g opacity={on(f, predictable55, 4)}><Stamp x={0} y={110} text="MORE PREDICTABLE" f={f} at={predictable55} size={44} /></g></g>
        {/* # investors by the vault */}
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, investors + k * 3, 6) * (1 - on(f, first, 8))}><Mini look="investor" x={1300 + k * 120} y={1000} scale={1.25} frame={f} seed={k + 950} mood={f > steady ? 'happy' : 'neutral'} /></g>)}
        {/* # the 1st of every month: a coin, known in advance */}
        <g opacity={win(f, first - 2, hire, 6)} transform={`translate(760 470) scale(${pop(f, first)})`}><CalPage x={0} y={0} top="EVERY MONTH" big="1ST" s={1.1} /><g transform="translate(150 60)"><Coin x={0} y={0} s={1} /></g></g>
        {/* # hire, build, borrow */}
        <g opacity={win(f, hire - 2, switch59, 6)}><Mini look="worker" x={lerp(-100, 640, easeInOut(span(f, hire, hire + 16)))} y={1000} scale={1.5} frame={f} seed={990} mood="happy" /></g>
        <g opacity={win(f, build - 2, switch59, 6)} transform={`translate(1260 470) rotate(${(f - build) * 4}) scale(${pop(f, build)})`}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-14} y={-96} width={28} height={30} rx={6} fill="#8A94A8" transform={`rotate(${k * 45})`} />)}<circle r={72} fill="#8A94A8" /><circle r={26} fill="#2A3448" /></g>
        <g opacity={win(f, borrow - 2, switch59, 6)} transform={`translate(1470 ${lerp(380, 480, on(f, borrow, 10))}) scale(${pop(f, borrow)})`}><path d="M-80 70 Q-100 -30 -26 -60 L-44 -96 L44 -96 L26 -60 Q100 -30 80 70 Z" fill="#C9A35A" /><text y={36} textAnchor="middle" fill="#3A2A12" style={{ font: '400 44px "Bebas Neue"' }}>LOAN</text></g>
        <Exec f={f} beats={gestB([[0, 'explain', 'smiling'], [box53, 'shrug', 'worried'], [subscribe, 'present', 'smiling'], [itself, 'hold', 'smiling'], [investors, 'celebrate', 'smiling'], [first, 'countA', 'smiling'], [hire, 'handshake', 'smiling'], [borrow, 'receive', 'smiling']], G)} x={1000} y={1000} s={0.95} />
      </g>}
      {/* # 2: the two towers */}
      {B > 0 && <g opacity={B}>
        {[[compared, 4.4, '2012 ≈ $4.4B', 520], [n215, 21.5, '2024 ≈ $21.5B', 1000]].map(([at, v, lab, x], k) => { const h = 30 * (v as number) * easeInOut(span(f, at as number, (at as number) + 20)); return <g key={k} opacity={on(f, at as number, 6)}>
          <rect x={(x as number) - 140} y={960 - h} width={280} height={h} rx={16} fill={k ? '#7FB4E8' : '#9AA3B5'} />
          {k === 1 && <rect x={(x as number) - 140} y={960 - h * 0.954 * on(f, n205, 14)} width={280} height={h * 0.954 * on(f, n205, 14)} rx={16} fill={P.gold} />}
          <text x={x as number} y={930 - h} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"' }}>{lab as string}</text></g> })}
        <g opacity={on(f, n205, 6)} transform="translate(1000 760)"><text textAnchor="middle" fill="#3A2A12" style={{ font: '400 50px "Bebas Neue"' }}>SUBSCRIPTIONS</text><text y={60} textAnchor="middle" fill="#3A2A12" style={{ font: '400 56px "Bebas Neue"' }}>≈ $20.5B</text></g>
        <g opacity={on(f, n95, 6)} transform={`translate(1000 560) scale(${pop(f, n95)})`}><rect x={-130} y={-44} width={260} height={88} rx={16} fill="#FFFFFF" stroke={P.gold} strokeWidth={6} /><text y={18} textAnchor="middle" fill={P.goldInk} style={{ font: '400 54px "Bebas Neue"' }}>$95 OF $100</text></g>
        <g opacity={on(f, five, 6)} transform={`translate(760 600) scale(${pop(f, five)})`}><rect x={-90} y={-44} width={180} height={88} rx={16} fill={P.coral} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>≈ 5×</text></g>
        {[0, 1].map((k) => <g key={k} opacity={on(f, buying + k * 6, 8)} transform={`translate(${lerp(2100, 1450 + k * 300, easeInOut(span(f, buying + k * 6, buying + k * 6 + 18)))} 1000)`}><Tower x={0} y={0} s={0.7} label="BOUGHT" color="#8A5CC2" /></g>)}
        <Exec f={f} beats={gestB([[0, 'idle', 'neutral'], [n215, 'present', 'smiling'], [n95, 'point', 'smiling'], [five, 'celebrate', 'smiling'], [buying, 'explain', 'neutral'], [almost, 'confident', 'smug']], G)} x={260} y={1000} s={0.95} />
      </g>}
      <Headline f={f} lines={[[predictable, 'PREDICTABLE MONEY', P.goldInk, 110], [box53, 'BOX: NEXT YEAR? NOBODY KNOWS', P.ink, 100], [subscribe, 'SUBSCRIPTION: ALREADY ON ITS WAY', P.ink, 96], [itself, 'ADOBE: “MORE PREDICTABLE”', P.goldInk, 104], [investors, 'INVESTORS LIKE STEADY MONEY', P.ink, 100],
        [hire, 'HIRE · BUILD · BORROW', P.ink, 110], [switch59, 'AFTER THE SWITCH', P.ink, 110], [n215, 'ADOBE 2024: ≈ $21.5 BILLION', P.goldInk, 100], [n95, '≈ $95 OF EVERY $100 · OUR CALCULATION', P.goldInk, 90], [compared, 'NEARLY FIVE TIMES 2012', P.ink, 104], [buying, 'PLUS COMPANIES IT BOUGHT', P.ink, 104]]} />
      <Vignette id="sb-count" />
    </g>
  )
}

const BEATS = ['s51:companies', 's51:love', 's51:matters', 's51:more', 's53:knows', 's54:money', 's54:paying', 's55:and', 's57:in', 's59:happened', 's62:by', 's62:adobe', 's64:now', 's53:customers', 's54:customers', 's55:wrote', 's56:plan', 's57:business', 's57:month', 's58:features', 's60:adobe', 's61:billion', 's62:calculation', 's63:revenue', 's64:growth',
  's52:predictable', 's53:box', 's53:next', 's54:subscribe', 's54:way', 's55:itself', 's55:stream', 's55:predictable', 's56:investors', 's56:steady', 's56:grow', 's57:first', 's57:know', 's58:hire', 's58:build', 's58:borrow', 's59:switch', 's60:215', 's61:205', 's62:95', 's63:compared', 's63:five', 's64:buying', 's64:almost', 's64:subscriptions']
export const SB_COUNT = makePiece('sb-count', 'Subscriptions long (casino-style): the executive’s office — a conveyor belt carries a coin from subscribers every month into the ADOBE vault (NEXT MONTH coins already on the belt) while the box world shows a NEXT YEAR ? calendar; the executive holds Adobe’s 10-K stamped MORE PREDICTABLE; investors cheer; a calendar shows the 1ST of every month with a coin; a new hire walks in, a gear turns and a LOAN bag arrives; then two towers, 2012 ≈ $4.4B and 2024 ≈ $21.5B, the big one ≈ 95% gold (subscriptions ≈ $20.5B, $95 of $100), ≈ 5× taller, and two BOUGHT CO. buildings slide in', {
  mood: 'light', Component: Count, beats: BEATS,
  sfx: [['s52:predictable', 'chime', 0.3], ['s55:predictable', 'thud', 0.3], ['s56:investors', 'pop', 0.3], ['s60:215', 'coin', 0.35], ['s63:five', 'ding', 0.3], ['s64:buying', 'swish', 0.3]] })
