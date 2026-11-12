// ---------------------------------------------------------------- s100–s110: the whole story (casino-style rebuild).
// The room from the opening, now at dawn, closing the loop. The laptop screen replays the auction: three AD SPOTS fill
// as tiny paddles rise; through the window the story plays out in turn — paddles, a USEFUL meter and a click coin; a
// coin tower to $224.5B; a $1 coin losing its 20¢ slice to partners — while an AI Overview slides onto the screen.
// "running shoes" types itself once more; each result gets a little shop sign behind it; the Sponsored row glows gold
// with a crown (someone won your attention). A $0 tag sits on the search box while an eye gets a SOLD tag. You close
// the laptop and walk out into the morning.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, Headline, Person, win } from '../aimoney/common'
import { PriceTag } from '../charts'
import { CoinTower, gestB } from '../buffett/hook'
import { Pointer, Row, SearchBar } from './kit'
import { Laptop, NightWindow, Pie, Room } from './hook'
import { SHOPS } from './search'
export { Vault } from './auction'

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const story = c('s100:story'), auction = c('s101:auction'), screen = c('s101:screen'), bid102 = c('s102:businesses'), scores = c('s102:scores'), click102 = c('s102:click')
  const clicks103 = c('s103:clicks'), n224 = c('s103:224'), n20 = c('s104:20'), partners = c('s104:partners'), ai105 = c('s105:ai'), page105 = c('s105:page')
  const single = c('s106:single'), yours = c('s106:yours'), paying = c('s107:paying'), business = c('s107:business'), sponsored = c('s108:sponsored'), won = c('s108:won')
  const free = c('s109:free'), attention = c('s109:attention'), works = c('s110:works')
  // # extra gesture words
  const G = [c('s101:starts'), c('s102:winner'), c('s103:in#2'), c('s104:ad'), c('s104:google'), c('s106:of'), c('s107:see'), c('s109:the'), c('s110:money')]
  const LX = 700, LY = 720, SX = LX, SY = LY - 150
  // # the window plays the story in turn
  const W1 = win(f, bid102 - 4, clicks103, 8), W2 = win(f, clicks103 - 2, n20 - 2, 8), W3 = win(f, n20 - 2, single, 8), W4 = on(f, single, 10)
  // # the laptop closes at the end
  const shut = easeInOut(span(f, works - 6, works + 10))
  const aiH = easeInOut(span(f, ai105, ai105 + 14))
  return (
    <g>
      <StageBg id="gg-payoff" frame={f} />
      <Room />
      <NightWindow x={1160} y={280} w={640} h={600} f={f} id="gg-payoff">
        {/* # dawn grows over the whole scene */}
        <rect x={1160} y={280} width={640} height={600} fill="#F5B98A" opacity={0.6 * easeInOut(span(f, story, works + 30))} />
        
        {/* # 1: paddles, a USEFUL meter, a click coin */}
        <g opacity={W1}>
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${1270 + k * 150} ${lerp(820, 600, on(f, bid102 + k * 3, 8))})`}><rect x={-6} y={0} width={12} height={110} fill="#8E5E36" /><circle cx={0} cy={-40} r={50} fill="#FFFFFF" stroke={SHOPS[k][1]} strokeWidth={9} /><text x={0} y={-22} textAnchor="middle" fill="#202124" style={{ font: '400 46px "Bebas Neue"' }}>$</text></g>)}
          <g opacity={on(f, scores, 6)} transform="translate(1720 820)"><rect x={-22} y={-300} width={44} height={300} rx={22} fill="#2A3448" /><rect x={-16} y={-6 - 280 * on(f, scores, 16) * 0.9} width={32} height={280 * on(f, scores, 16) * 0.9} rx={16} fill={P.mint} /></g>
          {(() => { const p = fly(f, click102 + 2, [1420, 520], [1480, 860], 16, 120); return <g opacity={p.o}><Coin x={p.x} y={p.y} s={0.8} /></g> })()}
        </g>
        {/* # 2: the coin tower to $224.5B */}
        <g opacity={W2}><CoinTower x={1480} y={860} n={Math.min(17, Math.max(0, (f - clicks103) / 1.2))} s={0.6} />
          <text x={1480} y={400} textAnchor="middle" fill="#FFFFFF" opacity={on(f, n224, 6)} style={{ font: '400 70px "Bebas Neue"' }}>SEARCH 2025 ≈ $224.5B</text></g>
        {/* # 3: the $1 coin loses 20¢ to partners */}
        <g opacity={W3}><Pie x={1480} y={600} r={170} part={0.2} t={easeInOut(span(f, n20, n20 + 14))} color={P.coral} rest={P.gold} /><text x={1480} y={624} textAnchor="middle" fill="#3A2A12" style={{ font: '400 80px "Bebas Neue"' }}>$1</text>
          <text x={1480} y={840} textAnchor="middle" fill="#FFFFFF" opacity={on(f, partners, 6)} style={{ font: '400 52px "Bebas Neue"' }}>≈ 20¢ TO PARTNERS</text></g>
        {/* # 4: an eye with a SOLD tag (your attention) */}
        <g opacity={W4 * on(f, attention - 4, 8)} transform="translate(1480 580)"><ellipse rx={200} ry={110} fill="#FFFFFF" /><circle r={70} fill="#1A73E8" /><circle r={30} fill="#0D1424" />
          <g transform="translate(150 120)"><PriceTag x={0} y={0} text="SOLD" r={-10} color={P.coral} /></g></g>
      </NightWindow>
      {/* # everything in front of the window a little smaller (owner: objects and people were too large) */}
      <g transform="translate(960 1000) scale(0.85) translate(-960 -1000)">
      {/* # the laptop: the auction spots, AI overview, the search, the glowing Sponsored row; closes at the end */}
      <g transform={`translate(${LX} 1000) scale(1.35) translate(${-LX} -1000)`}>
        <g transform={`translate(0 ${LY}) scale(1 1) translate(0 ${-LY})`}><Laptop x={LX} y={LY} glow={0.6 * shut}>
          {f < single && <g>
            <text x={SX} y={SY - 90} textAnchor="middle" fill={P.ink} opacity={on(f, auction, 6)} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>A TINY AUCTION FOR YOUR SCREEN</text>
            {[0, 1, 2].map((k) => <g key={k} transform={`translate(${SX - 140 + k * 140} ${SY - 20})`}><rect x={-60} y={-40} width={120} height={80} rx={10} fill="#E8EAED" /><rect x={-60} y={-40} width={120} height={80} rx={10} fill={SHOPS[k][1]} opacity={on(f, screen + k * 4, 6)} /><text y={10} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 30px "Bebas Neue"' }}>{SHOPS[k][0]}</text></g>)}
            <g opacity={aiH}><rect x={SX - 200} y={SY + 40} width={400} height={80} rx={10} fill="#E8F0FE" /><text x={SX - 186} y={SY + 72} fill="#1A73E8" style={{ font: '700 22px Inter' }}>✦ AI Overview</text><rect x={SX - 186} y={SY + 86} width={300} height={10} rx={5} fill="#9DB9F2" /></g>
          </g>}
          {f >= single && <g>
            <SearchBar x={SX} y={SY - 90} w={620} s={0.6} text="running shoes" t={span(f, single, yours + 6)} />
            <g opacity={on(f, free, 6)} transform={`translate(${SX + 160} ${SY - 130}) scale(${pop(f, free) * 0.6})`}><PriceTag x={0} y={0} text="$0" r={-8} color={P.mint} /></g>
            <g transform={`translate(${SX - 190} ${SY - 30}) scale(0.4)`}>
              <Row x={0} y={30} w={900} sponsored title="Running shoes – Shop B" hi={on(f, sponsored, 6)} />
              <Row x={0} y={160} w={900} title="How to choose running shoes" />
              {[0, 1].map((k) => <g key={k} opacity={on(f, business + k * 4, 6)} transform={`translate(930 ${k * 130})`}><rect x={0} y={-30} width={70} height={60} rx={8} fill={SHOPS[k + 1][1]} /><path d="M-6 -30 L76 -30 L68 -50 L2 -50 Z" fill={SHOPS[k + 1][1]} /></g>)}
            </g>
            <g opacity={on(f, won, 6)} transform={`translate(${SX - 10} ${SY - 46}) scale(${pop(f, won) * 0.7})`}><path d="M-40 20 L-40 -14 L-20 6 L0 -24 L20 6 L40 -14 L40 20 Z" fill={P.gold} /></g>
          </g>}
        </Laptop></g>
      </g>
      <g opacity={win(f, click102 - 4, clicks103, 6)}><Pointer x={lerp(1000, 760, easeInOut(span(f, click102 - 4, click102)))} y={lerp(800, 590, easeInOut(span(f, click102 - 4, click102)))} s={1} click={span(f, click102, click102 + 12)} /></g>
      <Person f={f} who="buyer" beats={gestB([[0, 'type', 'neutral'], [auction, 'explain', 'neutral'], [bid102, 'lookFar', 'thinking'], [clicks103, 'point', 'smiling'], [n20, 'explain', 'thinking'], [ai105, 'read', 'thinking'], [single, 'type', 'neutral'], [paying, 'think', 'thinking'], [sponsored, 'point', 'smiling'], [free, 'present', 'smiling'], [works - 10, 'walkA', 'smiling', 'walkB', 10]], G)} x={lerp(240, -260, easeInOut(span(f, works + 4, works + 60)))} y={1000} s={1.15} />
      </g>
      <Headline f={f} lines={[[story, 'THE WHOLE STORY', P.ink, 110], [n224, 'SEARCH 2025: ~$224.5B', P.goldInk, 104], [n20, '≈ 20¢ OF EACH AD $ TO PARTNERS', P.ink, 96], [single, 'IT STARTS WITH ONE SEARCH', P.ink, 104],
        [paying, 'A BUSINESS BEHIND EVERY RESULT', P.ink, 100], [sponsored, '“SPONSORED” = SOMEONE WON YOUR ATTENTION', P.goldInk, 88], [free, 'FREE BOX · YOUR ATTENTION IS SOLD', P.goldInk, 96], [works, 'THAT’S HOW THE MONEY ACTUALLY WORKS', P.ink, 88]]} />
      <Vignette id="gg-payoff" />
    </g>
  )
}

const BEATS = ['s101:starts', 's102:winner', 's103:in#2', 's104:ad', 's104:google', 's106:of', 's107:see', 's109:the', 's110:money', 's100:story', 's101:auction', 's101:screen', 's102:businesses', 's102:scores', 's102:click', 's103:clicks', 's103:224', 's104:20', 's104:partners', 's105:ai', 's105:page', 's106:single', 's106:yours', 's107:paying', 's107:business', 's108:sponsored', 's108:won', 's109:free', 's109:attention', 's110:works']
export const GG_PAYOFF = makePiece('gg-payoff', 'Google long (casino-style): the room from the opening at dawn; the laptop replays a tiny auction for your screen as three AD SPOTS fill with shop colours; through the window paddles rise, a USEFUL meter fills and a click coin drops, a coin tower climbs to SEARCH 2025 ≈ $224.5B, a $1 coin loses its 20¢ slice to partners; an AI Overview slides onto the screen; running shoes types once more, each result gets a little shop sign, the Sponsored row glows with a crown; a $0 tag sits on the search box while an eye in the window gets a SOLD tag; you close the laptop and walk out into the morning', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s101:auction', 'click', 0.3], ['s102:click', 'click', 0.35], ['s103:224', 'coin', 0.3], ['s104:20', 'swish', 0.3], ['s108:won', 'chime', 0.3], ['s109:attention', 'ding', 0.3]] })
