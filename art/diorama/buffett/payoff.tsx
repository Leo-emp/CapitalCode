// ---------------------------------------------------------------- s104–s114: the whole story (casino-style rebuild).
// The wet street from the opening, now at dawn. 1) Buffett walks past the bike, whose tag drops from $500 to $300, and
// a crowd reaching for one briefcase; he picks it up. 2) Goldman, with the glowing coupon and a 10% coin, and Bank of
// America, with its tower climbing from $5B to $20.7B. 3) A living room: a family on a sofa beside a phone that never
// rings; Buffett signs a cheque for billions to a scared bank; an IRISH BANK cracks under −89%. 4) Sunrise: the fear-
// greed dial swings wildly in the sky above a steady gold WORTH line resting on a strong building; Buffett walks off.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Phone, Stamp, win } from '../aimoney/common'
import { PriceTag } from '../charts'
import { Building } from '../kit'
import { Mini } from '../../rig/Mini'
import { Bank, Bike, Briefcase, Cheque, Coupon, Dial } from './kit'
import { Buffett, CoinTower, Street, gestB } from './hook'

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const story = c('s104:story'), scared = c('s105:scared'), below = c('s105:below')
  const panic106 = c('s106:panic'), rare = c('s106:rare'), terms106 = c('s106:terms')
  const keeps = c('s107:keeps'), person = c('s107:person'), goldman = c('s108:goldman'), n10 = c('s108:10'), coupons108 = c('s108:coupons')
  const america = c('s109:america'), n207 = c('s109:207'), deals = c('s110:deals'), panic110 = c('s110:panic')
  const terms111 = c('s111:terms'), billions = c('s111:billions'), lost = c('s112:lost'), bets = c('s112:bets')
  const fear113 = c('s113:fear'), worth113 = c('s113:worth'), works = c('s114:works')
  const A = win(f, 0, goldman - 4, 10), B = win(f, goldman - 4, deals - 4, 10), Cw = win(f, deals - 4, fear113 - 4, 10), D = on(f, fear113 - 4, 10)
  // # extra gesture words (each pause gets Buffett acting on a word)
  const G = [c('s111:payments'), c('s104:so'), c('s105:and'), c('s106:it'), c('s109:into'), c('s110:most'), c('s110:do'), c('s111:only'), c('s111:were'), c('s113:the'), c('s113:idea'), c('s113:not')]
  return (
    <g>
      <StageBg id="wb-pay" frame={f} />
      <Headline f={f} lines={[[story, 'THE WHOLE STORY', P.ink, 110], [scared, 'FEAR PUSHES PRICES DOWN', P.ink, 104], [panic106, 'IN A PANIC, CASH SETS THE TERMS', P.ink, 100], [keeps, 'BUFFETT KEEPS CASH READY', P.goldInk, 104],
        [goldman, 'GOLDMAN: 10% A YEAR + COUPONS', P.ink, 100], [america, 'BANK OF AMERICA: $5B → ~$20.7B', P.goldInk, 100], [deals, 'NOT DEALS MOST OF US GET', P.ink, 104], [lost, 'HE LOST ON SOME 2008 BETS', P.coralInk, 100],
        [fear113, 'FEAR CHANGES PRICES, NOT WORTH', P.goldInk, 100], [works, 'THAT’S HOW THE MONEY ACTUALLY WORKS', P.ink, 88]]} />
      <circle cx={1700} cy={lerp(700, 220, on(f, story, 400))} r={100} fill={P.gold} opacity={0.85} />
      {/* # A: the bike's tag drops; a crowd reaches for one briefcase; Buffett picks it up */}
      {A > 0 && <g opacity={A}>
        <Street f={f} lamps={[]} />
        <Bike x={400} y={880} s={1} />
        <g transform={`translate(640 ${lerp(560, 680, easeInOut(span(f, below, below + 16)))}) rotate(${lerp(0, 16, on(f, below, 14))})`}><PriceTag x={0} y={0} text={f > below + 8 ? '$300' : '$500'} r={0} color={f > below + 8 ? P.coral : P.paper} s={1.1} /></g>
        <g opacity={on(f, panic106, 8)} transform={`translate(1240 ${lerp(840, f > keeps ? 640 : 840, on(f, keeps, 14))})`}><Briefcase x={0} y={0} s={0.8} open={on(f, person, 10)} /></g>
        {Array.from({ length: 7 }, (_, k) => { const a = Math.PI * (0.05 + 0.9 * k / 6); return <g key={k} opacity={on(f, rare + k, 6) * (1 - on(f, keeps, 10))}><Mini look={['buyer', 'owner', 'worker'][k % 3]} x={1240 - Math.cos(a) * 420} y={1060} scale={0.75} frame={f} seed={k + 160} mood="sad" /></g> })}
        <g opacity={on(f, terms106, 6) * (1 - on(f, keeps, 8))} transform="translate(1240 420)"><PriceTag x={0} y={0} text="TERMS" r={-6} color={P.gold} /></g>
        <Buffett f={f} beats={gestB([[0, 'walkA', 'smiling', 'walkB', 10], [keeps, 'holdUp', 'smug']], G)} x={lerp(-200, 1120, easeInOut(span(f, story, keeps)))} y={1060} s={1} plate={0} />
      </g>}
      {/* # B: Goldman with the coupon and 10%; Bank of America with $5B → $20.7B */}
      {B > 0 && <g opacity={B}>
        <Street f={f} lamps={[]} />
        <Bank x={480} y={1000} s={0.85} name="GOLDMAN SACHS" f={f} />
        <g opacity={on(f, n10, 6)} transform={`translate(480 ${lerp(500, 330, on(f, n10, 12))})`}><Coin x={-120} y={0} s={1.5} text="10%" /></g>
        <g opacity={on(f, coupons108, 6)} transform={`translate(560 ${lerp(500, 330, on(f, coupons108, 12))}) rotate(-6) scale(0.6)`}><Coupon x={0} y={0} price="$115" name="GOLDMAN" glow={1} /></g>
        <g opacity={on(f, america, 6)}><Bank x={1440} y={1000} s={0.85} name="BANK OF AMERICA" f={f} color="#F1D9D9" />
          <CoinTower x={1050} y={980} n={5} s={0.6} label="$5B" color={P.sky} /><CoinTower x={1820} y={980} n={Math.min(21, (f - america) / 1.2)} s={0.6} label={f > n207 ? '$20.7B' : undefined} /></g>
      </g>}
      {/* # C: a phone that never rings; a cheque for billions; the −89% loss */}
      {Cw > 0 && <g opacity={Cw}>
        <rect x={0} y={900} width={1920} height={180} fill="#C9B48E" />
        <g opacity={1 - on(f, terms111, 10)}>
          <rect x={360} y={740} width={620} height={200} rx={40} fill="#3A6EA8" /><rect x={340} y={680} width={660} height={90} rx={40} fill="#2B5A8F" />
          {[0, 1, 2].map((k) => <Mini key={k} look={['hero', 'buyer', 'worker'][k]} x={480 + k * 200} y={900} scale={0.9} frame={f} seed={k + 170} />)}
          <g transform="translate(1300 760) rotate(-8) scale(0.9)"><Phone x={0} y={0} s={1}><text x={0} y={-40} textAnchor="middle" fill="#5C6F8E" style={{ font: '400 40px "Bebas Neue"' }}>NO CALLS</text></Phone></g>
          <g opacity={on(f, panic110, 6)}><path d="M1180 600 L1420 900 M1420 600 L1180 900" stroke={P.coral} strokeWidth={20} strokeLinecap="round" /></g>
        </g>
        <g opacity={on(f, terms111, 10) * (1 - on(f, lost, 10))}>
          <Buffett f={f} beats={gestB([[0, 'idle', 'neutral'], [billions, 'offer', 'smiling']], G)} x={380} y={1060} s={1} plate={0} />
          <g transform={`translate(${lerp(1300, 1000, on(f, terms111, 14))} 600) rotate(-4)`}><Cheque x={0} y={0} s={1} to="A SCARED BANK" amount="$5B" signed={on(f, billions, 14)} /></g>
        </g>
        <g opacity={on(f, lost, 10)}>
          <Bank x={960} y={1000} s={0.9} name="IRISH BANK" f={f} crack={on(f, bets, 12)} shake={0.4} />
          <g opacity={on(f, bets, 4)}><Stamp x={960} y={360} text="−89%" f={f} at={bets} size={150} /></g>
        </g>
      </g>}
      {/* # D: the dial swings in the sky; the WORTH line stays; Buffett walks off */}
      {D > 0 && <g opacity={D}>
        <Street f={f} lamps={[]} />
        <Building x={1300} y={980} s={3} seed={3} />
        <g transform={`translate(700 560) scale(${pop(f, fear113)})`}><Dial x={0} y={0} s={1.1} v={Math.sin((f - fear113) / 7)} /></g>
        <g opacity={on(f, worth113, 6)}><path d="M160 700 L1760 700" stroke={P.goldInk} strokeWidth={14} strokeDasharray="34 18" /><text x={1760} y={680} textAnchor="end" fill={P.goldInk} style={{ font: '400 64px "Bebas Neue"' }}>WORTH</text></g>
        <Buffett f={f} beats={gestB([[0, 'walkA', 'smiling', 'walkB', 12]], G)} x={lerp(300, 2100, easeInOut(span(f, works - 10, works + 70)))} y={1060} s={0.95} plate={0} />
      </g>}
      <Vignette id="wb-pay" />
    </g>
  )
}

const BEATS = ['s111:payments', 's104:so', 's105:and', 's106:it', 's109:into', 's110:most', 's110:do', 's111:only', 's111:were', 's113:the', 's113:idea', 's113:not', 's104:story', 's105:scared', 's105:below', 's106:panic', 's106:rare', 's106:terms', 's107:keeps', 's107:person', 's108:goldman', 's108:10', 's108:coupons', 's109:america', 's109:207', 's110:deals', 's110:panic',
  's111:terms', 's111:billions', 's112:lost', 's112:bets', 's113:fear', 's113:worth', 's114:works']
export const WB_PAYOFF = makePiece('wb-payoff', 'Buffett long (casino-style): the wet street at dawn; Buffett walks past the bike as its tag drops from $500 to $300 and a crowd reaches for one briefcase, which he picks up; Goldman with a 10% coin and the glowing coupon, Bank of America with towers $5B and $20.7B; a family on a sofa beside a phone that never rings; Buffett signs a $5B cheque to a scared bank; an IRISH BANK cracks under −89%; at sunrise the fear-greed dial swings wildly above a steady gold WORTH line by a strong building, and Buffett walks off', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s105:below', 'swish', 0.3], ['s108:10', 'ding', 0.3], ['s109:207', 'chime', 0.3], ['s112:bets', 'thud', 0.3], ['s113:worth', 'pop', 0.3]] })
