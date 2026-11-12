// ---------------------------------------------------------------- s59–s64: the whole picture (Market Street at dusk, lamps coming on).
// The whole street in one frame; each place lights up as its line is said:
// 1) Rosa's bakery with a share certificate: a dividend coin pops (pays), a price tag rises, then dips (struggles);
// 2) the auction hall: two folks swap a share for a coin (slices change hands), a LAST PRICE board updates;
// 3) the scoreboard S&P 500 flickers with a news board beside it (news and feelings);
// 4) the road of year-stones, where a 20-stone window glows (time). The lamps all come on for the closing line.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, win } from '../aimoney/common'
import { BB, Bakery, Coin, Folk, Label, Lamp, M, News, Share, Town } from './kit'
import { UP1 } from './data'

const G = 940

const Whole: React.FC<PieceProps> = ({ f, c }) => {
  const together59 = c('s59:together')
  const share60 = c('s60:share'), business60 = c('s60:business'), pays60 = c('s60:pays'), dividends60 = c('s60:dividends'), rising60 = c('s60:rising'), costs60 = c('s60:costs'), struggles60 = c('s60:struggles')
  const auction61 = c('s61:auction'), slices61 = c('s61:slices'), hands61 = c('s61:hands'), last61 = c('s61:last'), agreed61 = c('s61:agreed')
  const jump62 = c('s62:jump'), news62 = c('s62:news'), feelings62 = c('s62:feelings'), sp62 = c('s62:sp'), scoreboard62 = c('s62:scoreboard'), market62 = c('s62:market')
  const time63 = c('s63:time'), scary63 = c('s63:scary'), bet63 = c('s63:bet'), owning63 = c('s63:owning'), growing63 = c('s63:growing')
  const works64 = c('s64:works')

  const lit = (a: number) => 0.45 + 0.55 * on(f, a, 12)
  const tagY = -40 * on(f, rising60, 12) + 50 * on(f, struggles60, 12)
  const swap = span(f, hands61, hands61 + 24)
  const lamps = on(f, works64 - 10, 20)

  return (
    <g>
      <Town id="mk-w" f={f} mood="evening" />
      {/* 1) the bakery */}
      <g opacity={lit(share60)}>
        <Bakery x={300} y={G} s={0.62} f={f} glow={on(f, business60, 10)} />
        <Share x={300} y={380 - 8 * pop(f, share60, 12)} s={0.55} r={-6} />
        {f >= dividends60 && (() => { const t = span(f, dividends60, dividends60 + 20); return <Coin x={lerp(300, 420, t)} y={lerp(450, 320, t)} s={0.5} text="$10" o={t < 1 ? 1 : 0.8} /> })()}
        <g opacity={on(f, rising60 - 4, 8)} transform={`translate(470 ${430 + tagY})`}><path d="M-50 -24 L40 -24 L62 0 L40 24 L-50 24 Z" fill={f >= struggles60 ? M.red : M.green} /><text x={-4} y={12} textAnchor="middle" fill="#FFFFFF" style={BB(34)}>{f >= costs60 ? '↓' : '↑'}</text></g>
        <g opacity={on(f, pays60, 8)}><Label x={300} y={G + 50} text="A SLICE OF A BUSINESS" size={38} /></g>
      </g>
      {/* 2) the auction hall */}
      <g opacity={lit(auction61)} transform={`translate(780 ${G})`}>
        <rect x={-200} y={-50} width={400} height={50} fill={M.stoneD} /><rect x={-180} y={-330} width={360} height={280} fill={M.cream} />
        {Array.from({ length: 4 }, (_, k) => <rect key={k} x={-150 + k * 90} y={-320} width={30} height={270} fill="#E4D3B5" />)}
        <path d="M-210 -330 L0 -440 L210 -330 Z" fill={M.stone} /><text y={-350} textAnchor="middle" fill={M.ink} style={BB(36)}>AUCTION</text>
        <Folk x={-80} y={0} s={1.7} c={M.teal} o={on(f, slices61, 8)} /><Folk x={80} y={0} s={1.7} c={M.brick} o={on(f, slices61, 8)} />
        {f >= hands61 && <g><rect x={lerp(-60, 50, swap)} y={-150} width={34} height={24} rx={4} fill={M.paper} stroke={M.teal} strokeWidth={3} /><circle cx={lerp(60, -50, swap)} cy={-120} r={14} fill={M.gold} /></g>}
        <g opacity={on(f, last61, 8)} transform="translate(0 -230)"><rect x={-110} y={-30} width={220} height={60} rx={10} fill="#22252E" /><text y={14} textAnchor="middle" fill={M.butter} style={BB(36)}>{f >= agreed61 ? 'LAST: $101' : 'LAST: $100'}</text></g>
      </g>
      {/* 3) the scoreboard + news */}
      <g opacity={lit(jump62)}>
        <g transform={`translate(1230 ${G})`}><rect x={-8} y={-260} width={16} height={260} fill={M.woodD} /><News x={0} y={-400} s={0.55} head={f >= feelings62 ? 'FEAR!' : 'GOOD NEWS'} icon={f >= feelings62 ? 'down' : 'up'} o={on(f, news62, 8)} /></g>
        <g transform={`translate(1430 ${480 - 8 * pop(f, sp62, 12)})`} opacity={on(f, sp62 - 4, 8)}><rect x={-140} y={-70} width={280} height={140} rx={16} fill="#22252E" /><text y={-12} textAnchor="middle" fill="#C9CED6" style={BB(32)}>S&P 500</text>
          <text y={44} textAnchor="middle" fill={Math.floor(f / 20) % 2 ? M.green : M.red} style={BB(56)}>{Math.floor(f / 20) % 2 ? '+0.4%' : '−0.3%'}</text></g>
        <g opacity={win(f, market62, time63 + 4, 6) * (0.5 + 0.5 * Math.sin(f / 4))}><rect x={1270} y={390} width={320} height={180} rx={22} fill="none" stroke={M.butter} strokeWidth={7} /></g>
        <g opacity={on(f, scoreboard62, 8)}><Label x={1430} y={620} text="THE SCOREBOARD" size={38} /></g>
      </g>
      {/* 4) the road of years */}
      <g opacity={lit(time63)} transform="translate(1180 0)">
        {UP1.map((u, i) => <rect key={i} x={360 + (i % 14) * 26} y={700 + Math.floor(i / 14) * 32} width={20} height={26} rx={5} fill={u ? M.stone : M.red} opacity={f >= time63 ? 1 : 0.6} />)}
        <rect x={360 - 4 + 4 * 26} y={700 - 4 + 32} width={14 * 26 + 6} height={32 * 2 - 2} rx={8} fill={M.butter} opacity={0.3 * on(f, owning63, 10)} stroke={M.butterD} strokeWidth={4} />
        <g opacity={on(f, scary63, 8) * (1 - on(f, owning63, 8))}><Label x={540} y={660} text={f >= bet63 ? '1 YEAR: A SCARY BET' : '1 YEAR'} size={36} fill={M.red} ink="#FFFFFF" /></g>
        <g opacity={on(f, growing63, 8)}><Label x={540} y={660} text="20 YEARS: OWNING" size={36} fill={M.greenD} ink="#FFFFFF" /></g>
      </g>
      {/* the lamps come on */}
      {[560, 1040, 1700].map((x) => <Lamp key={x} x={x} y={G} s={0.9} on={lamps} />)}
      <Headline f={f} lines={[[together59, 'THE WHOLE PICTURE', M.paper, 104], [share60, 'A SHARE = A SLICE', M.paper, 100], [auction61, 'THE MARKET = AN AUCTION', M.paper, 100], [jump62, 'PRICES MOVE ON NEWS', M.paper, 100], [time63, 'TIME CHANGES THE RISK', M.paper, 100], [works64, 'HOW THE MONEY WORKS', M.paper, 100]]} />
    </g>
  )
}

export const MK_WHOLE = makePiece('mk-whole', 'The whole picture: Market Street at dusk; Rosa\'s bakery with a share certificate lights up, a $10 dividend coin pops, a price tag rises then dips red; the auction hall lights, two townsfolk swap a share for a coin, a LAST price board updates; a news board (good news, then fear) and an S&P 500 scoreboard flicker; the road of 98 year-stones lights, one year marked a scary bet, then a 20-year window glows (owning); the street lamps come on', {
  mood: 'dark', Component: Whole,
  beats: ["s60:share", "s60:business", "s60:pays", "s60:dividends", "s60:rising", "s60:costs", "s60:struggles", "s61:auction", "s61:slices", "s61:hands", "s61:last", "s61:agreed", "s62:jump", "s62:news", "s62:feelings", "s62:sp", "s62:scoreboard", "s62:market", "s63:time", "s63:scary", "s63:bet", "s63:owning", "s63:growing", "s64:works"],
  sfx: [['s60:dividends', 'coin', 0.1], ['s61:hands', 'swish', 0.1], ['s62:sp', 'tick', 0.1], ['s64:works', 'chime', 0.12]] })
