// ---------------------------------------------------------------- s44–s57: why Goldman said yes (casino-style rebuild).
// 1) On the bank steps Buffett holds the only briefcase of cash while a crowd of bankers reaches for it with empty
// hands; a TERMS paper unrolls and gets stamped; a thought bubble replays the $300 bike. 2) Goldman's front: the
// cheque and a gold BUFFETT plate fly onto the building; a ticker board on its wall jumps +9.7%; the crowd outside
// turns happy; two banners unroll, CASH and CONFIDENCE. 3) The sun rises over Goldman: an APR 2011 calendar; notes
// stream back into Buffett's $5.5B tower; he holds up the coupon he kept; three banks (Goldman, GE, Swiss Re) pour
// notes into a $12.8B pile; a coin stream of about $1.2B a year runs dry; the banks pay EXTRA to get out.
import React from 'react'
import { easeInOut, lerp, on, P, pop, rnd, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Doc, Headline, fly, win } from '../aimoney/common'
import { Calendar, PriceTag } from '../charts'
import { Mini } from '../../rig/Mini'
import { Note } from '../gift/kit'
import { Bank, BigArrow, Bike, Briefcase, Cheque, Coupon } from './kit'
import { Buffett, CoinTower, Street, gestB } from './hook'

const Yes: React.FC<PieceProps> = ({ f, c }) => {
  const bank44 = c('s44:bank'), deal44 = c('s44:deal')
  const panic45 = c('s45:panic'), cash45 = c('s45:cash'), nobody45 = c('s45:nobody')
  const scarce = c('s46:scarce'), holding = c('s46:holding'), terms46 = c('s46:terms')
  const bike47 = c('s47:bike'), buyer = c('s47:buyer'), price47 = c('s47:price')
  const money48 = c('s48:money'), name48 = c('s48:name')
  const announced = c('s49:announced'), jumped = c('s49:jumped'), trusts = c('s50:trusts'), fine = c('s50:fine')
  const twice = c('s51:twice'), cash51 = c('s51:cash'), confidence = c('s51:confidence')
  const survived = c('s52:survived'), april = c('s53:april'), back53 = c('s53:back'), bonus53 = c('s53:bonus'), coupons54 = c('s54:coupons')
  const goldman55 = c('s55:goldman'), general = c('s55:general'), swiss = c('s55:swiss'), n128 = c('s55:128')
  const n12 = c('s56:12'), tax = c('s56:tax'), terms57 = c('s57:terms'), extra = c('s57:extra')
  const A = win(f, 0, money48 - 4, 10), B = win(f, money48 - 4, survived - 4, 10), Cw = on(f, survived - 4, 10)
  // # extra gesture words (each pause gets Buffett acting on a word)
  const G = [c('s50:thought'), c('s45:wants'), c('s48:did'), c('s49:trading'), c('s49:late'), c('s53:it'), c('s53:dollars'), c('s53:billion'), c('s55:same'), c('s56:those'), c('s55:one')]
  return (
    <g>
      <StageBg id="wb-yes" frame={f} />
      <Headline f={f} lines={[[bank44, 'WHY WOULD GOLDMAN SAY YES?', P.ink, 100], [panic45, 'IN A PANIC, CASH IS RARE', P.coralInk, 104], [scarce, 'THE ONE WITH CASH SETS THE TERMS', P.ink, 96], [money48, 'CASH + BUFFETT’S NAME', P.goldInk, 104],
        [jumped, 'GOLDMAN SHARES +9.7% (LATE TRADING)', P.mintInk, 92], [twice, 'CASH AND CONFIDENCE', P.ink, 104], [april, 'APRIL 2011: $5.5 BILLION BACK', P.goldInk, 100], [coupons54, 'HE KEPT THE COUPONS', P.ink, 104],
        [goldman55, '2011: $12.8 BILLION TO BUY DEALS BACK', P.goldInk, 92], [n12, 'THEY EARNED ~$1.2B A YEAR', P.ink, 100], [extra, 'THEY PAID EXTRA TO GET OUT', P.ink, 100]]} />
      {/* # A: the only briefcase of cash; a crowd of bankers reaching; the terms; the bike remembered */}
      {A > 0 && <g opacity={A}>
        <Street f={f} lamps={[]} />
        <Bank x={1300} y={1000} s={1.1} name="GOLDMAN SACHS" f={f} shake={0.25} />
        <g opacity={on(f, deal44, 6) * (1 - on(f, panic45, 8))} transform={`translate(1640 480) scale(${pop(f, deal44)})`}><text textAnchor="middle" fill={P.goldInk} style={{ font: '400 200px "Bebas Neue"' }}>?</text></g>
        <Buffett f={f} beats={gestB([[0, 'idle', 'neutral'], [cash45, 'holdUp', 'smug'], [terms46, 'point', 'smug']], G)} x={520} y={1060} s={1.1} plate={0} />
        <g opacity={on(f, cash45, 6)} transform={`translate(520 ${lerp(760, 560, on(f, holding, 12))})`}><Briefcase x={0} y={0} s={0.7} open={on(f, holding, 10)} /></g>
        {Array.from({ length: 9 }, (_, k) => { const t = on(f, panic45 + k * 2, 16); return <g key={k} opacity={on(f, panic45 + k, 8)}><Mini look={['buyer', 'owner', 'worker'][k % 3]} x={lerp(1900, 840 + k * 90, t) + Math.sin(f / 5 + k) * 10} y={1060} scale={0.85} frame={f} seed={k + 80} mood="sad" />
          <g opacity={on(f, nobody45, 6)} transform={`translate(${lerp(1900, 840 + k * 90, t)} 870)`}><circle r={22} fill={P.card} /><path d="M-10 -10 L10 10 M10 -10 L-10 10" stroke={P.coralInk} strokeWidth={5} /></g></g> })}
        <g opacity={on(f, terms46, 6) * (1 - on(f, bike47, 8))} transform={`translate(${lerp(1100, 860, on(f, terms46, 12))} 420) rotate(-6) scale(0.75)`}><Doc x={0} y={0} title="TERMS" stamp="SIGNED" stampO={on(f, terms46 + 12, 6)} /></g>
        <g opacity={on(f, bike47, 8)} transform={`translate(860 380) scale(${pop(f, bike47)})`}>
          <ellipse rx={300} ry={190} fill="#FFFFFF" /><circle cx={-260} cy={220} r={30} fill="#FFFFFF" /><circle cx={-330} cy={290} r={18} fill="#FFFFFF" />
          <Bike x={-60} y={20} s={0.7} /><g opacity={on(f, price47, 6)} transform="translate(170 -60)"><PriceTag x={0} y={0} text="$300" s={0.8} r={0} color={P.coral} /></g>
          <g opacity={on(f, buyer, 6)}><Note x={160} y={70} s={0.5} text="$" /></g>
        </g>
      </g>}
      {/* # B: Goldman's front: cheque + BUFFETT plate land; the ticker jumps; the crowd cheers; two banners */}
      {B > 0 && <g opacity={B}>
        <Street f={f} lamps={[200]} />
        <Bank x={960} y={1000} s={1.3} name="GOLDMAN SACHS" f={f} />
        {(() => { const p = fly(f, money48 + 2, [300, 700], [960, 640], 18, 200); return <g opacity={1 - on(f, name48 + 20, 8)}><Cheque x={p.t > 0 ? p.x : 300} y={p.t > 0 ? p.y : 700} s={lerp(0.6, 0.3, p.t)} to="GOLDMAN SACHS" amount="$5B" /></g> })()}
        {(() => { const p = fly(f, name48 + 2, [300, 500], [960, 360], 18, 200); return <g opacity={on(f, name48, 4)} transform={`translate(${p.x} ${p.y}) scale(1.3)`}><rect x={-150} y={-30} width={300} height={60} rx={14} fill={P.gold} /><text x={0} y={18} textAnchor="middle" fill="#0E1B33" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>BUFFETT</text></g> })()}
        <g opacity={on(f, announced, 6)} transform={`translate(1600 ${lerp(1100, 620, on(f, announced, 14))})`}><rect x={-200} y={-160} width={400} height={300} rx={20} fill="#0D1424" /><text y={-90} textAnchor="middle" fill="#9FB4D6" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>GOLDMAN SHARES</text>
          <g opacity={on(f, jumped, 6)} transform={`translate(-90 ${lerp(120, 40, on(f, jumped, 14))}) scale(0.5)`}><BigArrow x={0} y={0} s={1} /></g><text x={70} y={60} fill={P.mint} opacity={on(f, jumped, 6)} style={{ font: '400 90px "Bebas Neue"' }}>+9.7%</text></g>
        {Array.from({ length: 10 }, (_, k) => <g key={k} opacity={on(f, trusts + k, 6)}><Mini look={['buyer', 'hero', 'owner', 'worker', 'investor'][k % 5]} x={140 + k * 120 + (k > 4 ? 600 : 0)} y={1060} scale={0.8} frame={f} seed={k + 90} mood={f > fine ? 'happy' : 'neutral'} /></g>)}
        {[[cash51, 'CASH', 520], [confidence, 'CONFIDENCE', 1400]].map(([at, lab, x], k) => <g key={k} opacity={on(f, at as number, 6)} transform={`translate(${x} 300)`}><rect x={-6} y={-60} width={12} height={60} fill={P.ink2} /><rect x={-170} y={0} width={340} height={lerp(0, 110, on(f, at as number, 10))} rx={10} fill={k ? P.sky : P.gold} /><text y={74} textAnchor="middle" fill="#0E1B33" opacity={on(f, (at as number) + 6, 6)} style={{ font: '400 64px "Bebas Neue"' }}>{lab as string}</text></g>)}
      </g>}
      {/* # C: sunrise; the money comes back; the coupon kept; three banks pay $12.8B to get out */}
      {Cw > 0 && <g opacity={Cw}>
        <circle cx={1700} cy={lerp(520, 260, on(f, survived, 30))} r={110} fill={P.gold} opacity={0.9} />
        <Street f={f} lamps={[]} />
        <g opacity={1 - on(f, goldman55, 10)}>
          <Bank x={1380} y={1000} s={1.05} name="GOLDMAN SACHS" f={f} />
          <g opacity={on(f, april, 6)} transform={`translate(1000 ${lerp(200, 330, on(f, april, 12))})`}><Calendar x={0} y={0} text="2011" s={1.2} /></g>
          {Array.from({ length: 8 }, (_, k) => { const p = fly(f, back53 + k * 3, [1380, 640], [640, 860], 16, 220); return <g key={k} opacity={p.t > 0 && p.t < 1 ? 1 : 0}><Note x={p.x} y={p.y} s={0.75} text="$" /></g> })}
          {(() => { const p = fly(f, bonus53, [1380, 560], [640, 700], 16, 260); return <g opacity={on(f, bonus53, 4) * (1 - on(f, bonus53 + 20, 6))}><Coin x={p.x} y={p.y} s={1.5} text="+10%" /></g> })()}
          <CoinTower x={640} y={980} n={on(f, back53 + 6, 4) * Math.min(11, (f - back53 - 6) / 2)} s={0.9} label={f > bonus53 + 20 ? '$5.5B' : undefined} />
          <Buffett f={f} beats={gestB([[0, 'idle', 'smiling'], [coupons54, 'holdUp', 'smug']], G)} x={300} y={1060} s={1} plate={0} />
          <g opacity={on(f, coupons54, 6)} transform={`translate(300 ${lerp(760, 440, on(f, coupons54, 14))}) rotate(-6) scale(0.8)`}><Coupon x={0} y={0} price="$115" name="GOLDMAN" glow={1} /></g>
        </g>
        <g opacity={on(f, goldman55, 10)}>
          {[[goldman55, 'GOLDMAN SACHS', '#DDE6F2'], [general, 'GENERAL ELECTRIC', '#DDEFE3'], [swiss, 'SWISS RE', '#F1D9D9']].map(([at, nm, col], k) => <g key={k} opacity={on(f, at as number, 6)}><Bank x={360 + k * 600} y={1000} s={0.72} name={nm as string} f={f} color={col as string} /></g>)}
          {Array.from({ length: 12 }, (_, k) => { const p = fly(f, n128 + k * 2, [360 + (k % 3) * 600, 640], [960, 470], 16, 160); return <g key={k} opacity={p.t > 0 && p.t < 1 ? 1 : 0}><Note x={p.x} y={p.y} s={0.6} text="$" /></g> })}
          <g opacity={on(f, n128 + 14, 6)} transform={`translate(960 400) scale(${pop(f, n128 + 14)})`}><rect x={-210} y={-70} width={420} height={140} rx={24} fill={P.gold} /><text y={40} textAnchor="middle" fill="#0E1B33" style={{ font: '400 110px "Bebas Neue"' }}>$12.8B</text></g>
          {/* # the income stream that stops */}
          {Array.from({ length: 8 }, (_, k) => { const t = ((f - n12) / 40 + k / 8) % 1; return <g key={k} opacity={on(f, n12, 6) * (1 - on(f, terms57, 10))}><Coin x={lerp(200, 1720, t)} y={640 + Math.sin(t * Math.PI * 2) * 30} s={0.8} /></g> })}
          <g opacity={on(f, tax, 6) * (1 - on(f, terms57, 8))} transform="translate(960 760)"><rect x={-240} y={-46} width={480} height={92} rx={18} fill={P.navy2} /><text x={0} y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>~$1.2B A YEAR, PRE-TAX</text></g>
          {Array.from({ length: 3 }, (_, k) => { const p = fly(f, extra + k * 4, [360 + k * 600, 640], [960, 640], 18, 200); return <g key={k} opacity={on(f, extra + k * 4, 4)}><Coin x={p.x} y={p.y} s={1.2} text="+" /></g> })}
        </g>
      </g>}
      <Vignette id="wb-yes" />
    </g>
  )
}

const BEATS = ['s50:thought', 's45:wants', 's48:did', 's49:trading', 's49:late', 's53:it', 's53:dollars', 's53:billion', 's55:same', 's56:those', 's55:one', 's44:bank', 's44:deal', 's45:panic', 's45:cash', 's45:nobody', 's46:scarce', 's46:holding', 's46:terms', 's47:bike', 's47:buyer', 's47:price', 's48:money', 's48:name', 's49:announced', 's49:jumped', 's50:trusts', 's50:fine',
  's51:twice', 's51:cash', 's51:confidence', 's52:survived', 's53:april', 's53:back', 's53:bonus', 's54:coupons', 's55:goldman', 's55:general', 's55:swiss', 's55:128', 's56:12', 's56:tax', 's57:terms', 's57:extra']
export const WB_YES = makePiece('wb-yes', 'Buffett long (casino-style): on Goldman\'s steps Buffett holds up the only briefcase of cash while a crowd of sad bankers reaches in with empty hands; a TERMS paper is stamped SIGNED; a thought bubble replays the bike sold for $300; a cheque and a gold BUFFETT plate fly onto Goldman, a ticker board on its wall jumps +9.7%, the crowd turns happy and CASH and CONFIDENCE banners unroll; the sun rises: a 2011 calendar, notes and a +10% coin stream back into a $5.5B tower, Buffett holds up the coupon he kept; Goldman, GE and Swiss Re pour notes into a $12.8B badge; a ~$1.2B-a-year coin stream stops; the banks pay extra to get out', {
  mood: 'light', Component: Yes, beats: BEATS,
  sfx: [['s45:cash', 'pop', 0.3], ['s46:terms', 'click', 0.3], ['s48:name', 'swish', 0.3], ['s49:jumped', 'chime', 0.3], ['s53:back', 'coin', 0.3], ['s55:128', 'ding', 0.35], ['s57:extra', 'coin', 0.3]] })
