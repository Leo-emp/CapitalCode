// ---------------------------------------------------------------- s38–s45: present 2, spending more (an example).
// Present 2 opens and a clothes-shop card comes out into your hand. A rail with a red jacket, price tag 70. The
// price becomes one bar: the first 50 paid by the card (green), the other 20 from your wallet (gold). The till
// keeps the 50 it was already holding and takes 20 more. Then a survey grid of 100 shoppers: 47 light up (almost
// half spent more than the card). A shop door: you walk in with the card and out with an extra bag. Last,
// present 3 waits, closed — the one where the company hands over nothing.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Coin, Counter, Headline, Person, hand, win } from '../aimoney/common'
import { Bag, Figure, GiftCard, Jacket, Present, Rail, Till, Wallet } from './kit'

const More: React.FC<PieceProps> = ({ f, c }) => {
  const second = c('s38:second'), present38 = c('s38:present'), use = c('s38:use')
  const get = c('s39:get'), clothing = c('s39:clothing'), see = c('s39:see'), jacket = c('s39:jacket'), p70 = c('s39:70')
  const pays = c('s40:pays'), first = c('s40:first'), other = c('s40:other'), b20 = c('s40:20'), pocket = c('s40:pocket')
  const keeps = c('s41:keeps'), holding = c('s41:holding'), gets = c('s41:gets'), more41 = c('s41:more')
  const happens = c('s42:happens'), lot = c('s42:lot')
  const survey = c('s43:survey'), shoppers = c('s43:shoppers'), almost = c('s43:almost'), half = c('s43:half'), spent43 = c('s43:spent'), worth = c('s43:worth')
  const brings = c('s44:brings'), door = c('s44:door'), once = c('s44:once'), easy = c('s44:easy'), little = c('s44:little')
  const third = c('s45:third'), company = c('s45:company'), hands = c('s45:hands'), nothing = c('s45:nothing')
  const A = win(f, 0, keeps - 2), A2 = win(f, keeps - 2, happens - 2), B = win(f, happens - 2, brings - 2), B2 = win(f, brings - 2, third - 2), C = on(f, third - 2, 10)
  const you: Beat[] = [[0, 'idle', 'smiling'], [use, 'holdUp', 'smiling'], [see, 'point', 'smiling'], [p70, 'scratchHead', 'thinking'], [pays, 'hold', 'neutral'], [pocket, 'reachDown', 'neutral']]
  const hp = hand(f, you, 360, 1000, 0.95)
  const cardOut = easeInOut(span(f, present38 + 4, use + 4))
  // # the 70 bar: card part, then your part
  const cardPart = on(f, first, 14), yourPart = on(f, b20, 14)
  return (
    <g>
      <Stage id="gc-more" frame={f} />
      <Headline f={f} lines={[[second, 'PRESENT 2', P.goldInk, 110], [clothing, 'A $50 CARD FOR A CLOTHES SHOP', P.ink, 92], [p70, 'THE JACKET COSTS $70', P.ink, 100], [pays, 'CARD $50 + YOU $20', P.goldInk, 104],
        [keeps, 'THE SHOP GETS $20 MORE', P.goldInk, 104], [survey, '2024 SURVEY · ABOUT 1,000 SHOPPERS', P.ink, 92], [almost, 'ALMOST HALF SPENT MORE', P.goldInk, 104], [door, 'THE CARD BRINGS YOU IN', P.ink, 100], [third, 'PRESENT 3', P.goldInk, 110]]} />
      <g opacity={on(f, get, 8) * (1 - on(f, happens, 10))}><rect x={60} y={40} width={210} height={64} rx={14} fill={P.card} /><text x={165} y={86} textAnchor="middle" fill={P.ink2} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>EXAMPLE</text></g>
      {/* # A: present 2 gives you a card; the jacket costs 70; card 50 + your 20 */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, get, 10)} transform={`translate(960 900) scale(${pop(f, second)})`}><Present x={0} y={0} s={1.3} open={on(f, present38, 12)} color="#3A6EA8" n="2" /></g>
        <Person f={f} who="hero" beats={you} x={360} y={1000} s={0.95} o={on(f, use - 6, 8)} />
        <GiftCard x={lerp(960, hp.x + 40, cardOut)} y={lerp(520, hp.y - 30, cardOut)} s={lerp(0.6, 0.34, cardOut)} r={-8} color="#3A6EA8" amount="$50" o={on(f, present38 + 4, 8)} />
        <g opacity={on(f, clothing, 8)}>
          <Rail x={1200} y={380} w={620} />
          <Jacket x={1050} y={430} s={0.8} color="#3A6EA8" />
          <g transform={`translate(1350 430) scale(${0.8 + 0.08 * on(f, jacket, 10)})`}><Jacket x={0} y={0} s={1} price={on(f, p70, 6) > 0.5 ? '$70' : undefined} /></g>
        </g>
        {/* # the price as one bar */}
        <g opacity={on(f, pays, 8)}>
          <rect x={700} y={880} width={1050} height={110} rx={20} fill={P.card} />
          <rect x={700} y={880} width={750 * cardPart} height={110} rx={20} fill="#3A6EA8" />
          <rect x={1450} y={880} width={300 * yourPart} height={110} rx={20} fill={P.gold} />
          <text x={1075} y={956} textAnchor="middle" fill="#FFFFFF" opacity={cardPart} style={{ font: '400 60px "Bebas Neue"' }}>CARD $50</text>
          <text x={1600} y={956} textAnchor="middle" fill="#0E1B33" opacity={yourPart} style={{ font: '400 60px "Bebas Neue"' }}>YOU $20</text>
        </g>
        <g opacity={on(f, pocket, 8)}><Wallet x={hp.x + 30} y={hp.y + 40} s={0.6} open={on(f, pocket, 10)} /></g>
      </g>}
      {/* # A2: the till keeps the 50 it already held and gets 20 more */}
      {A2 > 0 && <g opacity={A2}>
        <Counter x={960} y={760} w={1400} />
        <Till x={960} y={760} s={1.2} open={on(f, holding, 10)} bills={1} />
        <g opacity={on(f, holding, 8)}><text x={600} y={560} textAnchor="middle" fill={P.ink} style={{ font: '400 64px "Bebas Neue"' }}>$50 ALREADY HELD</text></g>
        {[0, 1].map((k) => { const t = easeInOut(span(f, gets + k * 6, gets + k * 6 + 18)); return <g key={k} opacity={on(f, gets + k * 6, 4)}><Coin x={lerp(1600, 1000 + k * 60, t)} y={lerp(420, 700, t) - Math.sin(t * Math.PI) * 120} s={1.2} text="$10" /></g> })}
        <g opacity={on(f, more41, 8)}><text x={1420} y={560} textAnchor="middle" fill={P.goldInk} style={{ font: '400 72px "Bebas Neue"' }}>+ $20 MORE</text></g>
      </g>}
      {/* # B: 100 shoppers; 47 light up */}
      {B > 0 && <g opacity={B}>
        {Array.from({ length: 100 }, (_, k) => {
          const col = k % 20, row = Math.floor(k / 20), lit = k < 47 ? on(f, half + k * 0.4, 6) : 0
          return <g key={k} opacity={on(f, shoppers + k * 0.25, 6)}><Figure x={280 + col * 72} y={420 + row * 125} s={0.42} hi={lit} card={on(f, spent43, 8)} /></g>
        })}
        <g opacity={on(f, lot, 8) * (1 - on(f, survey, 8))}><text x={960} y={560} textAnchor="middle" fill={P.ink} style={{ font: '400 72px "Bebas Neue"' }}>IT HAPPENS A LOT</text></g>
        <g opacity={on(f, worth, 8)}><text x={960} y={1050} textAnchor="middle" fill={P.ink2} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 2 }}>47 IN 100 SPENT MORE THAN THEIR CARD WAS WORTH</text></g>
      </g>}
      {/* # B2: through the shop door with a card, out with an extra bag */}
      {B2 > 0 && <g opacity={B2}>
        <rect x={760} y={300} width={400} height={640} rx={20} fill="#E8EEF5" /><rect x={800} y={340} width={320} height={600} rx={14} fill="#9FDCFF" opacity={0.5} />
        <rect x={720} y={260} width={480} height={70} rx={16} fill="#3A6EA8" /><text x={960} y={312} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 4 }}>CLOTHES</text>
        <Person f={f} who="hero" beats={[[0, 'walkA', 'smiling', 'walkB', 10], [once + 10, 'idle', 'smiling'], [easy, 'holdUp', 'smiling'], [little, 'celebrate', 'smiling']] as Beat[]} x={lerp(300, 1440, easeInOut(span(f, door - 6, once + 10)))} y={1000} s={0.95} />
        <g opacity={on(f, easy, 8)}><Bag x={1640} y={1000} s={1} color="#3A6EA8" /></g>
        <g opacity={on(f, little, 8)}><Bag x={1780} y={1000} s={0.8} color={P.coral} /><text x={1700} y={780} textAnchor="middle" fill={P.goldInk} style={{ font: '400 56px "Bebas Neue"' }}>A LITTLE MORE</text></g>
      </g>}
      {/* # C: present 3 waits, closed */}
      {C > 0 && <g opacity={C}>
        <g transform={`translate(960 900) scale(${pop(f, third)})`}><Present x={0} y={0} s={1.4} color="#2FA36B" n="3" open={0.15 * on(f, hands, 10)} /></g>
        <g opacity={on(f, nothing, 8)}><text x={960} y={480} textAnchor="middle" fill={P.ink} style={{ font: '400 72px "Bebas Neue"' }}>THE COMPANY HANDS OVER NOTHING</text></g>
        <g opacity={on(f, company, 8) * (1 - on(f, nothing, 8))}><text x={960} y={480} textAnchor="middle" fill={P.ink2} style={{ font: '400 60px "Bebas Neue"' }}>?</text></g>
      </g>}
      <Vignette id="gc-more" />
    </g>
  )
}

const BEATS = ['s38:second', 's38:present', 's38:use', 's39:get', 's39:clothing', 's39:see', 's39:jacket', 's39:70', 's40:pays', 's40:first', 's40:other', 's40:20', 's40:pocket', 's41:keeps', 's41:holding', 's41:gets', 's41:more',
  's42:happens', 's42:lot', 's43:survey', 's43:shoppers', 's43:almost', 's43:half', 's43:spent', 's43:worth', 's44:brings', 's44:door', 's44:once', 's44:easy', 's44:little', 's45:third', 's45:company', 's45:hands', 's45:nothing']
export const GC_MORE = makePiece('gc-more', 'Gift cards long: present 2 opens to a clothes-shop card in your hand; a jacket costs 70; one bar splits card 50 + you 20 from your wallet; the till keeps 50 and gets 20 more; 47 of 100 shoppers light up; you walk through the shop door with a card and out with an extra bag; present 3 waits closed', {
  mood: 'light', Component: More, beats: BEATS,
  sfx: [['s38:present', 'pop', 0.35], ['s39:70', 'click', 0.3], ['s40:20', 'coin', 0.35], ['s41:more', 'ding', 0.35], ['s43:half', 'swish', 0.3], ['s44:easy', 'pop', 0.3], ['s45:third', 'pop', 0.3]] })
