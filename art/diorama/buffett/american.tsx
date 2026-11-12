// ---------------------------------------------------------------- s58–s69: Buy American. I Am. (casino-style rebuild).
// 1) A newsstand on a night street: the calendar flips to October; the BUY AMERICAN. I AM. paper rises huge on the
// stand; Buffett carries a sack of coins from a SAFE BONDS vault to a US STOCKS building. 2) The market as a long
// downhill track: a cart carrying Buffett boards at HE BUYS and keeps rolling down into fog (illustration); a $100
// bar shrinks to $63 (S&P 500, 2008) beside Berkshire's −9.6%; calendar pages get crossed out day after day.
// 3) His desk: the 1986 letter and a foggy crystal ball; then a sturdy building on deep foundations with a LOW tag
// while a scared crowd runs off and Buffett points at it.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, win } from '../aimoney/common'
import { Calendar, PriceTag } from '../charts'
import { Building } from '../kit'
import { Mini } from '../../rig/Mini'
import { Bank, Letter, Newspaper } from './kit'
import { Buffett, Street, gestB } from './hook'

// # the downhill track: points in screen space; cart position u 0–1 along it
const TRACK: [number, number][] = [[140, 340], [420, 400], [700, 520], [980, 610], [1260, 760], [1540, 860], [1800, 900]]
const along = (u: number) => { const n = TRACK.length - 1, i = Math.min(n - 1, Math.floor(u * n)), t = u * n - i, [x0, y0] = TRACK[i], [x1, y1] = TRACK[i + 1]; return { x: lerp(x0, x1, t), y: lerp(y0, y1, t), a: Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI } }

const American: React.FC<PieceProps> = ({ f, c }) => {
  const deal = c('s58:deal'), weeks = c('s58:weeks'), further58 = c('s58:further')
  const october = c('s59:october'), times = c('s59:times'), american = c('s59:american')
  const money60 = c('s60:money'), bonds = c('s60:bonds'), stocks = c('s60:stocks')
  const forget = c('s61:forget'), bottom = c('s62:bottom')
  const n37 = c('s63:37'), dividends = c('s63:dividends'), n100 = c('s64:100'), n63 = c('s64:63')
  const berkshire = c('s65:berkshire'), n96 = c('s65:96')
  const further66 = c('s66:further'), fall = c('s66:fall'), perfect = c('s67:perfect'), day = c('s67:day')
  const n1986 = c('s68:1986'), predict = c('s68:predict'), rule = c('s69:rule'), low = c('s69:low'), strong = c('s69:strong')
  const A = win(f, 0, forget - 4, 10), B = win(f, forget - 4, n1986 - 4, 10), Cw = on(f, n1986 - 4, 10)
  const carry = easeInOut(span(f, bonds, stocks + 20))
  const cart = along(f < bottom ? lerp(0, 0.35, easeInOut(span(f, forget, bottom))) : lerp(0.35, 0.92, easeInOut(span(f, bottom, fall + 30))))
  const sp = lerp(1, 0.63, easeInOut(span(f, n37, n37 + 18))), brk = lerp(1, 0.904, easeInOut(span(f, n96, n96 + 16)))
  // # extra gesture words (each pause gets Buffett acting on a word)
  const G = [c('s59:wrote'), c('s60:wrote'), c('s61:is'), c('s63:the#2'), c('s63:year'), c('s64:of'), c('s64:calculation'), c('s65:book'), c('s68:show'), c('s69:buy')]
  return (
    <g>
      <StageBg id="wb-american" frame={f} />
      <Headline f={f} lines={[[deal, 'A FEW WEEKS AFTER THE GOLDMAN DEAL', P.ink, 92], [october, 'OCTOBER 2008 · NEW YORK TIMES', P.ink, 96], [money60, 'HIS OWN MONEY: BONDS → STOCKS', P.goldInk, 96], [bottom, 'HE DID NOT BUY AT THE BOTTOM', P.coralInk, 100],
        [n37, 'S&P 500 IN 2008: −37%', P.coralInk, 110], [n100, '$100 → ABOUT $63 · OUR CALCULATION', P.ink, 92], [berkshire, 'BERKSHIRE BOOK VALUE: −9.6%', P.ink, 100], [perfect, 'NO GUESSING THE PERFECT DAY', P.ink, 100],
        [n1986, 'NOBODY CAN PREDICT FEAR OR GREED', P.ink, 96], [rule, 'LOW PRICES + STRONG BUSINESSES', P.goldInk, 100]]} />
      {/* # A: the newsstand; the paper; coins carried from bonds to stocks */}
      {A > 0 && <g opacity={A}>
        <Street f={f} lamps={[160, 1760]} />
        <g opacity={on(f, deal, 6) * (1 - on(f, times, 8))} transform="translate(320 360)"><Calendar x={0} y={0} text={f > further58 ? 'OCT' : 'SEP'} s={1.3} flip={span(f, further58 - 8, further58 + 4)} /></g>
        <g opacity={on(f, weeks, 6) * (1 - on(f, money60, 8))} transform="translate(960 1000)"><rect x={-380} y={-420} width={760} height={420} rx={14} fill="#5A3A22" /><path d="M-420 -420 L420 -420 L380 -500 L-380 -500 Z" fill={P.coral} /></g>
        <g opacity={on(f, october, 6) * (1 - on(f, money60, 10))} transform={`translate(960 ${lerp(900, 560, on(f, times, 16))}) rotate(${lerp(-10, -2, on(f, times, 16))}) scale(${lerp(0.5, 0.95, on(f, times, 16))})`}><Newspaper x={0} y={0} head="BUY AMERICAN. I AM." /></g>
        <g opacity={on(f, american, 6) * (1 - on(f, money60, 8))}><Buffett f={f} beats={gestB([[0, 'point', 'smiling']], G)} x={420} y={1060} s={1.1} plate={0} /></g>
        <g opacity={on(f, money60, 8)}>
          <g transform="translate(360 1000)"><rect x={-200} y={-300} width={400} height={300} rx={24} fill={P.navy3} /><text y={-130} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"' }}>SAFE BONDS</text>{Array.from({ length: Math.round(8 * (1 - carry)) }, (_, k) => <Coin key={k} x={-120 + (k % 4) * 80} y={-50 - Math.floor(k / 4) * 60} s={0.8} />)}</g>
          <Bank x={1560} y={1000} s={0.85} name="US STOCKS" f={f} color="#D7EBDD" />
          <Buffett f={f} beats={gestB([[0, 'carry', 'smiling', 'carryHeavy', 14]], G)} x={lerp(560, 1300, carry)} y={1060} s={1} plate={0} />
          <g transform={`translate(${lerp(560, 1300, carry) + 40} ${880 + Math.sin(f / 4) * 6})`}><ellipse rx={70} ry={56} fill="#C9A15A" /><text y={18} textAnchor="middle" fill="#5A3A22" style={{ font: '400 56px "Bebas Neue"' }}>$</text></g>
        </g>
      </g>}
      {/* # B: the downhill track with Buffett's cart; the bars; crossed-out days */}
      {B > 0 && <g opacity={B}>
        <text x={140} y={250} fill={P.ink2} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>ILLUSTRATION</text>
        <path d={'M' + TRACK.map(([x, y]) => `${x} ${y}`).join(' L')} fill="none" stroke={P.coral} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
        {TRACK.slice(0, -1).map(([x, y], k) => <rect key={k} x={x - 6} y={y} width={12} height={1000 - y} fill={P.ink2} opacity={0.35} />)}
        <g opacity={on(f, bottom, 6)} transform={`translate(${along(0.35).x} ${along(0.35).y - 120})`}><rect x={-110} y={-36} width={220} height={60} rx={14} fill={P.gold} /><text y={8} textAnchor="middle" fill="#0E1B33" style={{ font: '400 44px "Bebas Neue"' }}>HE BUYS</text></g>
        <g transform={`translate(${cart.x} ${cart.y}) rotate(${cart.a})`}><rect x={-80} y={-70} width={160} height={60} rx={14} fill={P.gold} /><circle cx={-50} cy={-6} r={16} fill="#2A3448" /><circle cx={50} cy={-6} r={16} fill="#2A3448" /><circle cx={0} cy={-110} r={34} fill="#2B2B3A" /><rect x={-26} y={-82} width={52} height={22} rx={8} fill={P.navy2} /></g>
        {Array.from({ length: 5 }, (_, k) => <ellipse key={k} cx={1500 + Math.sin(f / 12 + k) * 120} cy={880 + k * 24} rx={360} ry={50} fill="#9FB4D6" opacity={0.28 * on(f, further66, 10)} />)}
        {/* # the two bars, top right */}
        <g opacity={on(f, n37, 6)} transform="translate(1250 260)">
          <rect x={0} y={0} width={180} height={300} rx={14} fill="none" stroke={P.ink2} strokeWidth={4} strokeDasharray="14 10" />
          <rect x={0} y={300 - 300 * sp} width={180} height={300 * sp} rx={14} fill={P.coral} /><text x={90} y={360} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>S&P 500</text>
          <text x={90} y={280 - 300 * sp} textAnchor="middle" fill={P.ink} opacity={on(f, n100, 6)} style={{ font: '400 56px "Bebas Neue"' }}>{f > n63 ? '$63' : '$100'}</text>
          <g opacity={on(f, berkshire, 6)}><rect x={260} y={300 - 300 * brk} width={180} height={300 * brk} rx={14} fill={P.gold} /><text x={350} y={360} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>BERKSHIRE</text><text x={350} y={280 - 300 * brk} textAnchor="middle" fill={P.ink} opacity={on(f, n96, 6)} style={{ font: '400 56px "Bebas Neue"' }}>−9.6%</text></g>
          <text x={90} y={410} textAnchor="middle" fill={P.ink2} opacity={on(f, dividends, 6)} style={{ font: '400 34px "Bebas Neue"' }}>DIVIDENDS INCLUDED</text>
        </g>
        <g opacity={on(f, perfect, 6)}>{Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, perfect + k * 2, 4)} transform={`translate(${200 + k * 150} 980) scale(0.6)`}><Calendar x={0} y={0} text={`${k + 10}`} /><path d="M-60 -60 L60 70 M60 -60 L-60 70" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, day + k * 2, 4)} /></g>)}</g>
      </g>}
      {/* # C: the 1986 letter and the crystal ball; then the rule: a strong building marked LOW */}
      {Cw > 0 && <g opacity={Cw}>
        <g opacity={1 - on(f, rule, 10)}>
          <rect x={0} y={900} width={1920} height={180} fill="#3A2A20" />
          <g transform="translate(600 600) rotate(-4)"><Letter x={0} y={0} year="1986" hi={on(f, n1986 + 8, 8)} /></g>
          <g opacity={on(f, predict, 6)} transform={`translate(1360 640) scale(${pop(f, predict)})`}>
            <circle r={210} fill="#9FB4D6" opacity={0.5} /><circle r={210} fill="none" stroke={P.ink2} strokeWidth={6} />
            {Array.from({ length: 5 }, (_, k) => <ellipse key={k} cx={Math.sin(f / 15 + k) * 60} cy={-60 + k * 30} rx={130} ry={30} fill="#FFFFFF" opacity={0.3} />)}
            <text x={0} y={60} textAnchor="middle" fill={P.ink} style={{ font: '400 200px "Bebas Neue"' }}>?</text><path d="M-120 210 L120 210 L90 260 L-90 260 Z" fill={P.navy3} />
          </g>
        </g>
        <g opacity={on(f, rule, 10)}>
          <Street f={f} lamps={[]} />
          <g opacity={on(f, strong, 6)} transform={`translate(1240 ${lerp(1200, 1000, on(f, strong, 14))})`}><Bank x={0} y={0} s={1.2} name="STRONG BUSINESS" f={f} color="#D7EBDD" /><rect x={-360} y={0} width={720} height={80} rx={10} fill={P.ink2} opacity={0.6} /></g>
          <g opacity={on(f, low, 6)} transform={`translate(1240 ${lerp(300, 420, on(f, low, 14))})`}><PriceTag x={0} y={0} text="LOW" s={1.4} r={-8} /></g>
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={1 - on(f, rule + 30 + k * 3, 12)}><Mini look={['buyer', 'owner', 'worker'][k % 3]} x={lerp(700 + k * 90, -200, easeInOut(span(f, rule + k * 3, rule + k * 3 + 40)))} y={1060} scale={0.8} frame={f} seed={k + 100} mood="sad" /></g>)}
          <Buffett f={f} beats={gestB([[0, 'idle', 'neutral'], [low, 'point', 'smiling']], G)} x={520} y={1060} s={1.05} plate={0} />
        </g>
      </g>}
      <Vignette id="wb-american" />
    </g>
  )
}

const BEATS = ['s59:wrote', 's60:wrote', 's61:is', 's63:the#2', 's63:year', 's64:of', 's64:calculation', 's65:book', 's68:show', 's69:buy', 's58:deal', 's58:weeks', 's58:further', 's59:october', 's59:times', 's59:american', 's60:money', 's60:bonds', 's60:stocks', 's61:forget', 's62:bottom', 's63:37', 's63:dividends', 's64:100', 's64:63', 's65:berkshire', 's65:96',
  's66:further', 's66:fall', 's67:perfect', 's67:day', 's68:1986', 's68:predict', 's69:rule', 's69:low', 's69:strong']
export const WB_AMERICAN = makePiece('wb-american', 'Buffett long (casino-style): a night newsstand where the calendar flips to October and the BUY AMERICAN. I AM. paper rises huge as Buffett points; Buffett carries a sack of coins from a SAFE BONDS vault to a US STOCKS building as the vault empties; an illustrative downhill track where a cart with Buffett boards at HE BUYS and keeps rolling down into fog; bars: $100 shrinks to $63 (S&P 500, 2008, dividends included) beside Berkshire −9.6%; calendar days crossed out; the 1986 letter beside a fogged crystal ball; a sturdy building rises with a LOW tag while a scared crowd runs off and Buffett points', {
  mood: 'dark', Component: American, beats: BEATS,
  sfx: [['s59:times', 'swish', 0.3], ['s60:stocks', 'coin', 0.3], ['s62:bottom', 'click', 0.3], ['s63:37', 'thud', 0.35], ['s66:fall', 'swish', 0.3], ['s69:strong', 'pop', 0.3]] })
