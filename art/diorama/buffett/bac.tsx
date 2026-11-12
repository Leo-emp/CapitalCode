// ---------------------------------------------------------------- s70–s85: the Bank of America deal (casino-style rebuild).
// 1) Bank of America with cracked windows and papers blowing out; workers sweep up the mess; Buffett's 2011 letter on an
// easel lights the line about past mistakes; Buffett walks in. 2) A long table: the $5B cheque slides across; a 6%
// coin; three $300M towers grow, one a year; a big coupon BUY AT $7.14 lands on a mountain of 700 million share papers;
// a 2013 board shows them worth $10.9B; Buffett leans back in an armchair while 6% coins keep dropping and a 2021
// calendar hangs on the wall. 3) June 2017: the bank hands its owners bigger coins; the coupon is punched and a flood
// of shares pours into Buffett's vault; bars $5B cost vs $20.7B worth, with a dashed +$15.7B gap.
import React from 'react'
import { easeInOut, lerp, on, P, pop, rnd, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, fly, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Mini } from '../../rig/Mini'
import { Share } from '../buyback/kit'
import { Bank, Cheque, Coupon, Letter } from './kit'
import { Buffett, CoinTower, Street, gestB } from './hook'

const Armchair: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x={-150} y={-260} width={300} height={200} rx={40} fill="#8A3A3A" /><rect x={-190} y={-110} width={380} height={110} rx={30} fill="#A44848" /><rect x={-210} y={-170} width={70} height={170} rx={30} fill="#8A3A3A" /><rect x={140} y={-170} width={70} height={170} rx={30} fill="#8A3A3A" /></g>
)

const Bac: React.FC<PieceProps> = ({ f, c }) => {
  const playbook = c('s70:playbook'), august = c('s71:august'), america = c('s71:america'), mistakes = c('s71:mistakes')
  const himself = c('s72:himself'), managers = c('s72:managers'), years72 = c('s72:years'), moment = c('s73:moment')
  const offered = c('s74:offered'), n6 = c('s74:6'), n300 = c('s75:300'), coupons = c('s76:coupons')
  const n700 = c('s77:700'), n7 = c('s77:7'), ten = c('s77:ten'), n2013 = c('s78:2013'), n109 = c('s78:109')
  const waited = c('s79:waited'), wait80 = c('s80:wait'), n6b = c('s80:6'), until = c('s80:until')
  const dividend = c('s81:dividend'), june = c('s81:june'), announced = c('s82:announced'), shares82 = c('s82:shares')
  const n207 = c('s83:207'), cost = c('s84:cost'), calc = c('s85:calculation'), n157 = c('s85:157'), payments = c('s85:payments')
  const A = win(f, 0, offered - 4, 10), B = win(f, offered - 4, dividend - 4, 10), Cw = on(f, dividend - 4, 10)
  // # extra gesture words (each pause gets Buffett acting on a word)
  const G = [c('s81:he'), c('s81:shareholders'), c('s72:mistakes'), c('s74:for'), c('s76:and'), c('s77:time'), c('s77:america'), c('s77:any'), c('s78:shares'), c('s80:stock'), c('s80:coupons'), c('s81:once'), c('s81:bank'), c('s81:did'), c('s82:buy'), c('s83:year'), c('s85:on')]
  return (
    <g>
      <StageBg id="wb-bac" frame={f} />
      <Headline f={f} lines={[[playbook, 'THE SAME PLAYBOOK', P.ink, 104], [august, 'AUGUST 2011: BANK OF AMERICA', P.ink, 100], [himself, 'BUFFETT: “HUGE MISTAKES” BY PAST MANAGERS', P.ink, 88], [offered, '$5 BILLION · 6% A YEAR', P.goldInk, 104],
        [n300, '$300 MILLION A YEAR', P.goldInk, 104], [n700, '700 MILLION SHARES AT $7.14', P.goldInk, 100], [n2013, 'END OF 2013: WORTH $10.9B', P.ink, 100], [waited, 'HE WAITED', P.ink, 110], [june, 'JUNE 2017: BIGGER DIVIDEND', P.ink, 100],
        [announced, 'HE USES THE COUPONS', P.goldInk, 104], [n207, 'END OF 2017: ABOUT $20.7B', P.goldInk, 104], [calc, '+$15.7B ON PAPER · OUR CALCULATION', P.goldInk, 92]]} />
      {/* # A: the bank in a mess; workers sweep; the 2011 letter; Buffett walks in */}
      {A > 0 && <g opacity={A}>
        <Street f={f} lamps={[1760]} />
        <g transform={`translate(${lerp(1600, 0, easeInOut(span(f, playbook, august + 10)))} 0)`}><Bank x={1100} y={1000} s={1.35} name="BANK OF AMERICA" f={f} color="#F1D9D9" crack={on(f, mistakes, 12)} shake={on(f, america, 6) * (1 - on(f, himself, 8)) * 0.4} /></g>
        {Array.from({ length: 8 }, (_, k) => { const t = ((f - mistakes) / 50 + rnd(k)) % 1; return <g key={k} opacity={on(f, mistakes, 6) * (1 - on(f, moment, 10))} transform={`translate(${1100 + lerp(-200, 700, t) + k * 20} ${lerp(500, 980, t)}) rotate(${t * 400 + k * 40})`}><rect x={-34} y={-44} width={68} height={88} rx={6} fill={P.paper} stroke={P.coral} strokeWidth={4} /></g> })}
        {Array.from({ length: 3 }, (_, k) => <g key={k} opacity={on(f, years72 + k * 4, 8)}><Mini look="worker" x={1400 + k * 140} y={1060} scale={0.85} frame={f} seed={k + 120} /><rect x={1440 + k * 140} y={900} width={10} height={150} fill="#8E5E36" transform={`rotate(${Math.sin(f / 4 + k) * 20} ${1445 + k * 140} 1050)`} /></g>)}
        <g opacity={on(f, himself, 6) * (1 - on(f, moment, 10))} transform={`translate(${lerp(-300, 420, on(f, himself, 14))} 600) rotate(-4) scale(0.85)`}><Letter x={0} y={0} year="2011" hi={on(f, managers, 8)} /></g>
        <g opacity={on(f, moment, 8)}><Buffett f={f} beats={gestB([[0, 'walkA', 'neutral', 'walkB', 10], [moment + 30, 'confident', 'smiling']], G)} x={lerp(-200, 420, easeInOut(span(f, moment, moment + 30)))} y={1060} s={1.15} plate={0} /></g>
      </g>}
      {/* # B: the table; cheque, 6%, the coupon, the share mountain, the armchair and the years */}
      {B > 0 && <g opacity={B}>
        <rect x={0} y={880} width={1920} height={200} fill="#5A3A22" /><rect x={0} y={880} width={1920} height={18} fill="#8E5E36" />
        <g opacity={1 - on(f, waited, 10)}>
          <Buffett f={f} beats={gestB([[0, 'idle', 'smiling'], [offered, 'offer', 'smiling'], [coupons, 'point', 'smug']], G)} x={220} y={1060} s={1} plate={0} />
          {(() => { const p = fly(f, offered + 2, [380, 760], [900, 640], 18, 120); return <g opacity={on(f, offered, 6) * (1 - on(f, coupons, 8))}><Cheque x={p.t > 0 ? p.x : 380} y={p.t > 0 ? p.y : 760} s={0.6} r={-4} to="BANK OF AMERICA" amount="$5B" signed={on(f, offered + 4, 12)} /></g> })()}
          <g opacity={on(f, n6, 6) * (1 - on(f, n300, 8))} transform={`translate(1450 500) scale(${pop(f, n6) * 1.6})`}><Coin x={0} y={0} s={2} text="6%" /></g>
          <g opacity={on(f, n300, 6) * (1 - on(f, coupons, 8))}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, n300 + k * 6, 6)}><CoinTower x={1100 + k * 260} y={860} n={Math.min(3, (f - n300 - k * 6) / 3)} s={0.85} label="$300M" /></g>)}</g>
          {/* # the share mountain and the coupon */}
          <g opacity={on(f, n700, 6)}>{Array.from({ length: 40 }, (_, k) => { const row = Math.floor(k / 8), col = k % 8; return <g key={k} opacity={on(f, n700 + k * 0.4, 4)}><Share x={1060 + col * 95 - row * 10} y={860 - row * 70} s={0.32} r={(k * 13) % 14 - 7} /></g> })}</g>
          <g opacity={on(f, coupons, 6)} transform={`translate(${lerp(1300, 760, on(f, coupons, 14))} ${lerp(200, 400, on(f, coupons, 14))}) rotate(-6) scale(1.05)`}><Coupon x={0} y={0} price={f > n7 ? '$7.14' : '$?'} name="BANK OF AMERICA" glow={on(f, n7, 8)} /></g>
          <g opacity={on(f, ten, 6) * (1 - on(f, n2013, 6))} transform="translate(600 330)"><text textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"' }}>GOOD FOR 10 YEARS</text></g>
          <g opacity={on(f, n2013, 6)} transform={`translate(1480 ${lerp(200, 380, on(f, n2013, 12))})`}><rect x={-200} y={-120} width={400} height={240} rx={20} fill="#0D1424" /><text y={-40} textAnchor="middle" fill="#9FB4D6" style={{ font: '400 50px "Bebas Neue"' }}>END OF 2013</text><text y={70} textAnchor="middle" fill={P.mint} opacity={on(f, n109, 6)} style={{ font: '400 110px "Bebas Neue"' }}>$10.9B</text></g>
        </g>
        <g opacity={on(f, waited, 10)}>
          <Armchair x={700} y={900} s={1.1} />
          <Buffett f={f} beats={gestB([[0, 'relax', 'smiling']], G)} x={700} y={900} s={1} plate={0} />
          {Array.from({ length: 5 }, (_, k) => { const t = ((f - n6b) / 30 + k / 5) % 1; return <g key={k} opacity={on(f, n6b, 6)}><Coin x={1100 + k * 110} y={lerp(240, 860, t)} s={1} text="6%" /></g> })}
          <g opacity={on(f, wait80, 6)} transform="translate(1100 320)"><rect x={-6} y={-80} width={12} height={80} fill={P.ink2} /><Calendar x={0} y={60} text={f > until ? '2021' : '2016'} s={1.1} flip={span(f, until - 6, until + 4)} /></g>
          <g opacity={on(f, until, 6)} transform="translate(1500 320)"><text textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>COUPONS LAST TO 2021</text></g>
        </g>
      </g>}
      {/* # C: the bigger dividend; the coupon punched; shares pour into the vault; the bars */}
      {Cw > 0 && <g opacity={Cw}>
        <Street f={f} lamps={[]} />
        <g opacity={1 - on(f, n207, 10)}>
          <Bank x={1400} y={1000} s={1.05} name="BANK OF AMERICA" f={f} color="#F1D9D9" />
          {Array.from({ length: 6 }, (_, k) => { const p = fly(f, dividend + 4 + k * 4, [1400, 620], [180 + k * 110, 950], 16, 140); return <g key={k}><g opacity={1 - on(f, shares82 - 6, 8)}><Mini look={['buyer', 'hero', 'owner'][k % 3]} x={180 + k * 110} y={1060} scale={0.65} frame={f} seed={k + 130} mood={f > june ? 'happy' : 'neutral'} /></g><g opacity={p.o}><Coin x={p.x} y={p.y} s={lerp(0.7, 1.15, on(f, june, 10))} /></g></g> })}
          <g opacity={on(f, june, 6)} transform="translate(1000 330)"><Calendar x={0} y={0} text="2017" s={1.1} /></g>
          <g opacity={on(f, announced, 6)} transform={`translate(1000 ${lerp(760, 620, on(f, announced, 12))}) rotate(-6)`}><Coupon x={0} y={0} price="$7.14" name="BANK OF AMERICA" used={on(f, announced + 8, 8)} /></g>
          {Array.from({ length: 24 }, (_, k) => { const p = fly(f, shares82 + k * 0.8, [1000, 620], [260 + (k % 6) * 70, 960 - Math.floor(k / 6) * 50], 14, 120); return <g key={k} opacity={p.t > 0 ? 1 : 0}><Share x={p.x} y={p.y} s={0.28} /></g> })}
        </g>
        <g opacity={on(f, n207, 10)}>
          {[[5.007, '$5B', P.sky, 640, cost, 'COST'], [20.664, '$20.7B', P.gold, 1180, n207, 'WORTH, END OF 2017']].map(([v, lab, col, x, at, sub], k) => { const h = 30 * (v as number) * on(f, at as number, 16); return <g key={k} opacity={on(f, at as number, 6)}><rect x={(x as number) - 160} y={960 - h} width={320} height={h} rx={18} fill={col as string} /><text x={x as number} y={930 - h} textAnchor="middle" fill={P.ink} style={{ font: '400 84px "Bebas Neue"' }}>{lab as string}</text><text x={x as number} y={1030} textAnchor="middle" fill={P.ink} style={{ font: '400 50px "Bebas Neue"' }}>{sub as string}</text></g> })}
          <rect x={1020} y={960 - 30 * 20.664} width={320} height={30 * (20.664 - 5.007) * on(f, n157, 12)} rx={10} fill="none" stroke={P.goldInk} strokeWidth={10} strokeDasharray="24 14" />
          <g opacity={on(f, n157, 6)}><text x={1400} y={960 - 30 * 12} fill={P.goldInk} style={{ font: '400 110px "Bebas Neue"' }}>+$15.7B</text></g>
          <g opacity={on(f, payments, 6)}><text x={1400} y={960 - 30 * 12 + 64} fill={P.ink2} style={{ font: '400 40px "Bebas Neue"' }}>ON PAPER, BEFORE PAYMENTS</text></g>
          <Buffett f={f} beats={gestB([[0, 'celebrate', 'smiling']], G)} x={240} y={1060} s={1} plate={0} />
        </g>
      </g>}
      <Vignette id="wb-bac" />
    </g>
  )
}

const BEATS = ['s81:he', 's81:shareholders', 's72:mistakes', 's74:for', 's76:and', 's77:time', 's77:america', 's77:any', 's78:shares', 's80:stock', 's80:coupons', 's81:once', 's81:bank', 's81:did', 's82:buy', 's83:year', 's85:on', 's70:playbook', 's71:august', 's71:america', 's71:mistakes', 's72:himself', 's72:managers', 's72:years', 's73:moment', 's74:offered', 's74:6', 's75:300', 's76:coupons', 's77:700', 's77:7', 's77:ten', 's78:2013', 's78:109',
  's79:waited', 's80:wait', 's80:6', 's80:until', 's81:dividend', 's81:june', 's82:announced', 's82:shares', 's83:207', 's84:cost', 's85:calculation', 's85:157', 's85:payments']
export const WB_BAC = makePiece('wb-bac', 'Buffett long (casino-style): Bank of America slides in with cracked windows and papers blowing out while workers sweep; Buffett\'s 2011 letter lights the line about past mistakes; Buffett walks in; at a long table a $5B cheque slides across, a 6% coin, three $300M towers grow; a mountain of share papers and a coupon BUY AT $7.14, good for 10 years; a 2013 board shows $10.9B; Buffett leans back in an armchair while 6% coins drop and the wall calendar flips to 2021; the bank pays its owners bigger coins in 2017; the coupon is punched and shares pour into a pile; bars $5B cost vs $20.7B worth with a dashed +$15.7B gap as Buffett celebrates', {
  mood: 'light', Component: Bac, beats: BEATS,
  sfx: [['s71:mistakes', 'crack', 0.3], ['s74:6', 'ding', 0.3], ['s77:7', 'pop', 0.3], ['s81:june', 'coin', 0.3], ['s82:announced', 'click', 0.3], ['s83:207', 'chime', 0.35]] })
