// ---------------------------------------------------------------- s99–s108: the free drinks are not free.
// A server brings a cocktail, a covered meal and a room key to a player's table. A COMPS ribbon; a die rolls in and is
// swept away (not random) — in its place a small machine. Into it go a chip (how much you bet), a clock (how long) and a
// little house roof (the edge); out comes a coin pile: THEORETICAL LOSS. A thin slice of the pile is cut off and turns
// into the drink, meal and key. The FREE room key loses its heart; a small discount tag sits on a big pile that stays.
// A high roller gets a gold SUITE key and a tourist a drink — both from the same machine; a big pile gives a big gift,
// a small pile a small one. The player sits back, the clock turns, and her chips start circling again.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Coin, Headline, Person, win } from '../aimoney/common'
import { Chip, CHIP, ChipLoop, Cocktail, Meal, RoomKey } from './kit'

// # the comp machine: a box with three input slots and an output chute
const Machine: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; busy?: number }> = ({ x, y, s = 1, o = 1, f, busy = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={190} rx={260} ry={26} fill={P.shadow} opacity={0.2} />
    <rect x={-220} y={-170} width={440} height={360} rx={30} fill={P.navy3} />
    <rect x={-190} y={-140} width={380} height={120} rx={16} fill={P.navy0} />
    <text x={0} y={-62} textAnchor="middle" fill={P.mint} style={{ font: '400 56px "JetBrains Mono"' }}>{busy > 0 ? ['BET×TIME', '×EDGE', '= THEO'][Math.floor(f / 20) % 3] : 'THEO'}</text>
    {[-130, 0, 130].map((dx) => <rect key={dx} x={dx - 44} y={-200} width={88} height={34} rx={10} fill={P.navy1} />)}
    {[0, 1, 2].map((k) => <circle key={k} cx={-120 + k * 120} cy={70 + Math.sin(f / 6 + k) * 4 * busy} r={34} fill={P.gold} opacity={0.6 + 0.4 * busy} />)}
    <rect x={180} y={110} width={120} height={60} rx={14} fill={P.navy1} />
  </g>
)
const Clock: React.FC<{ x: number; y: number; s?: number; f: number; o?: number; speed?: number }> = ({ x, y, s = 1, f, o = 1, speed = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={70} fill={P.paper} stroke={P.ink} strokeWidth={6} />
    <line x1={0} y1={0} x2={Math.sin((f * speed) / 20) * 50} y2={-Math.cos((f * speed) / 20) * 50} stroke={P.navy2} strokeWidth={8} strokeLinecap="round" />
    <line x1={0} y1={0} x2={Math.sin((f * speed) / 240) * 34} y2={-Math.cos((f * speed) / 240) * 34} stroke={P.coral} strokeWidth={10} strokeLinecap="round" />
  </g>
)
const MiniRoof: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-60} y={-40} width={120} height={80} rx={8} fill={P.navy4} /><path d="M-80 -36 L0 -100 L80 -36 Z" fill={P.goldD} stroke="#FFFFFF" strokeWidth={6} /></g>
)
// # a pile of coins of a given size (rows of coins)
const Pile: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; cut?: number }> = ({ x, y, n, s = 1, o = 1, cut = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: n }, (_, k) => { const r = Math.floor(Math.sqrt(k)), c = k - r * r; return <Coin key={k} x={(c - r) * 34 + (k === n - 1 ? cut * 120 : 0)} y={-r * 30 - (k === n - 1 ? cut * 60 : 0)} s={0.7} /> })}
  </g>
)

const Comps: React.FC<PieceProps> = ({ f, c }) => {
  const drinks = c('s99:drinks'), meals = c('s99:meals'), rooms = c('s99:rooms')
  const comps = c('s100:comps'), random = c('s100:random')
  const estimates = c('s101:estimates'), lose = c('s101:lose'), bet = c('s101:bet'), play = c('s101:play'), edge = c('s101:edge')
  const game101 = c('s101:game'), number102 = c('s102:number'), theoretical = c('s102:theoretical'), loss = c('s102:loss')
  const slice = c('s103:slice'), back = c('s103:back'), perks = c('s103:perks')
  const free = c('s104:free'), room = c('s104:room'), kind = c('s104:kind')
  const discount = c('s105:discount'), money = c('s105:money'), anyway = c('s105:anyway')
  const high = c('s106:high'), suite = c('s106:suite'), tourist = c("s106:tourist's"), drink = c('s106:drink'), same = c('s106:same'), sum = c('s106:sum')
  const bigger = c('s107:bigger'), loss107 = c('s107:loss'), gift = c('s107:gift')
  const perk = c('s108:perk'), stay = c('s108:stay'), longer = c('s108:longer'), needs = c('s108:needs')
  const A = win(f, 0, estimates - 2), Bp = win(f, estimates - 2, free - 2), Cp = win(f, free - 2, high - 2), D = win(f, high - 2, perk - 2), E = on(f, perk - 2, 10)
  return (
    <g>
      <Stage id="cs-comp" frame={f} />
      <Headline f={f} lines={[[drinks, 'FREE DRINKS · MEALS · ROOMS', P.ink, 100], [comps, 'COMPS', P.goldInk, 124], [random, 'NOT RANDOM', P.ink, 112], [estimates, 'WHAT YOU WILL PROBABLY LOSE', P.ink, 100], [theoretical, 'YOUR THEORETICAL LOSS', P.goldInk, 104],
        [slice, 'A SLICE COMES BACK AS PERKS', P.ink, 100], [free, 'A FREE ROOM IS NOT KINDNESS', P.ink, 100], [discount, 'A SMALL DISCOUNT', P.goldInk, 112], [high, 'HIGH ROLLER · TOURIST', P.ink, 104], [same, 'THE SAME SUM', P.goldInk, 112], [bigger, 'BIGGER LOSS, BIGGER GIFT', P.goldInk, 104], [stay, 'ONE MORE REASON TO STAY', P.ink, 104]]} />
      {/* # A: the server brings drink, meal, key; COMPS; a die is swept away */}
      {A > 0 && <g opacity={A}>
        <rect x={360} y={760} width={1200} height={40} rx={14} fill="#6B4426" /><rect x={380} y={800} width={1160} height={260} fill="#4E311B" />
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [drinks, 'receive', 'smiling'], [rooms, 'celebrate', 'smiling'], [random, 'think', 'thinking']] as Beat[]} x={1580} y={1000} s={0.9} />
        <Person f={f} who="owner" beats={[[0, 'walkA', 'smiling', 'walkB', 10], [drinks + 10, 'offer', 'smiling']] as Beat[]} x={lerp(-100, 300, span(f, 0, drinks + 10))} y={1000} s={0.9} />
        <g opacity={on(f, drinks, 8)}><Cocktail x={lerp(400, 640, easeInOut(span(f, drinks, drinks + 14)))} y={760} s={0.9} /></g>
        <g opacity={on(f, meals, 8)}><Meal x={lerp(400, 960, easeInOut(span(f, meals, meals + 14)))} y={760} s={1} /></g>
        <g opacity={on(f, rooms, 8)}><RoomKey x={lerp(400, 1300, easeInOut(span(f, rooms, rooms + 14)))} y={700} s={0.8} /></g>
        <g opacity={on(f, comps, 8)} transform={`translate(960 400) scale(${pop(f, comps)})`}><path d="M-300 -60 L300 -60 L270 0 L300 60 L-300 60 L-270 0 Z" fill={P.coral} /><Label x={0} y={22} text="COMPS" size={80} font="Bebas Neue" color={P.white} /></g>
      </g>}
      {/* # B: the machine — bet, time, edge in; theoretical loss out; a slice becomes perks */}
      {Bp > 0 && <g opacity={Bp}>
        <Machine x={760} y={640} f={f} busy={on(f, edge + 6, 10) * (1 - on(f, theoretical, 10))} />
        <g opacity={on(f, game101, 8) * (1 - on(f, theoretical, 8))}><rect x={1000} y={300} width={90} height={90} rx={16} fill="#FFFFFF" /><circle cx={1025} cy={325} r={9} fill={CHIP.red} /><circle cx={1045} cy={345} r={9} fill={CHIP.red} /><circle cx={1065} cy={365} r={9} fill={CHIP.red} /></g>
        <g opacity={on(f, number102, 8) * (1 - on(f, loss, 8))}><rect x={600} y={420} width={320} height={110} rx={16} fill={P.mint} opacity={0.3 + 0.2 * Math.sin(f / 3)} /></g>
        {[[bet, <Chip key="c" x={0} y={0} s={1} color={CHIP.blue} label="$10" />, 'HOW MUCH YOU BET', 630], [play, <Clock key="k" x={0} y={0} s={0.7} f={f} />, 'HOW LONG YOU PLAY', 760], [edge, <MiniRoof key="r" x={0} y={0} s={0.8} />, 'THE EDGE', 890]].map(([a, node, t, sx], k) => {
          const u = easeInOut(span(f, (a as number) - 4, (a as number) + 16))
          return <g key={k}><g transform={`translate(${lerp(300 + k * 340, sx as number, u)} ${lerp(260, 340, u)}) scale(${lerp(1, 0.5, u)})`} opacity={on(f, (a as number) - 6, 6) * (1 - span(f, (a as number) + 14, (a as number) + 18))}>{node as React.ReactNode}</g>
            <g opacity={on(f, a as number, 8) * (1 - on(f, theoretical, 8))}><Label x={300 + k * 340} y={400} text={t as string} size={44} font="Bebas Neue" color={P.ink} /></g></g>
        })}
        <g opacity={on(f, lose, 8) * (1 - on(f, bet - 6, 8))}><Label x={760} y={840} text="EXPECTED LOSS" size={50} font="Bebas Neue" color={P.ink2} /></g>
        <Pile x={1380} y={860} n={Math.round(25 * on(f, theoretical, 20))} s={1.5} cut={easeInOut(span(f, slice, slice + 16))} />
        <g opacity={on(f, loss, 8)}><Label x={1360} y={940} text="THEORETICAL LOSS" size={50} font="Bebas Neue" color={P.goldInk} /></g>
        {/* # the cut slice turns into perks */}
        <g opacity={on(f, back, 8)}>
          <Cocktail x={1560} y={560} s={0.55} o={on(f, perks, 8)} /><Meal x={1700} y={600} s={0.5} o={on(f, perks + 4, 8)} /><RoomKey x={1820} y={520} s={0.45} o={on(f, perks + 8, 8)} />
          <Label x={1700} y={680} text="PERKS" size={50} font="Bebas Neue" color={P.ink} />
        </g>
      </g>}
      {/* # C: the free room is not kindness; a small discount on a big pile that stays */}
      {Cp > 0 && <g opacity={Cp}>
        <rect x={200} y={820} width={1520} height={40} rx={14} fill="#6B4426" /><rect x={220} y={860} width={1480} height={260} fill="#4E311B" />
        <RoomKey x={560} y={740} s={1.6} r={-4} />
        <g opacity={on(f, room, 8)} transform="translate(720 640) rotate(8)"><rect x={-80} y={-32} width={160} height={64} rx={12} fill={P.mint} /><Label x={0} y={18} text="FREE" size={50} font="Bebas Neue" color={P.navy0} /></g>
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [kind, 'shrug', 'smug']] as Beat[]} x={1000} y={820} s={0.85} />
        <Pile x={1420} y={810} n={Math.round(36 * on(f, discount - 10, 20))} s={1.3} />
        {(() => { const t = easeInOut(span(f, discount, discount + 20)); return <g opacity={on(f, discount, 6)}><Coin x={lerp(1420, 600, t)} y={lerp(640, 720, t) - Math.sin(t * Math.PI) * 160} s={0.9} /></g> })()}
        <g opacity={on(f, money, 8)}><Label x={1420} y={960} text="WHAT THE MATHS SAYS IT WINS" size={44} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, anyway, 8)}><ellipse cx={1420} cy={700} rx={240} ry={120} fill={P.gold} opacity={0.15} /></g>
      </g>}
      {/* # D: high roller and tourist from the same machine; bigger pile, bigger gift */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, bigger - 4, 10)}>
          <Machine x={960} y={420} s={0.7} f={f} busy={on(f, same, 8)} />
          <Person f={f} who="investor" beats={[[0, 'idle', 'smug'], [suite, 'holdUp', 'smug']] as Beat[]} x={420} y={1000} s={0.9} />
          <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [drink, 'holdUp', 'smiling']] as Beat[]} x={1500} y={1000} s={0.9} />
          <g opacity={on(f, suite, 8)}><RoomKey x={620} y={560} s={0.8} gold /></g>
          <g opacity={on(f, drink, 8)}><Cocktail x={1300} y={760} s={0.7} /></g>
          <g opacity={on(f, high, 8)}><Label x={420} y={1050} text="HIGH ROLLER" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, tourist, 8)}><Label x={1500} y={1050} text="TOURIST" size={50} font="Bebas Neue" color={P.ink} /></g>
          {[[620, 560], [1300, 600]].map(([x, y], k) => <path key={k} d={`M${960 + (k ? 160 : -160)} 520 Q${(960 + x) / 2} ${y - 160} ${x} ${y - 80}`} fill="none" stroke={P.gold} strokeWidth={6} strokeDasharray="10 12" opacity={on(f, sum, 8)} />)}
        </g>
        <g opacity={on(f, bigger - 4, 10)}>
          <Pile x={560} y={880} n={9} s={1.4} /><Pile x={1300} y={880} n={Math.round(36 * on(f, loss107, 14)) || 9} s={1.4} />
          <g transform={`translate(560 460) scale(${0.5})`} opacity={on(f, gift, 8)}><rect x={-180} y={-120} width={360} height={260} rx={20} fill={P.coral} /><rect x={-24} y={-120} width={48} height={260} fill={P.gold} /></g>
          <g transform={`translate(1300 400) scale(${0.5 + 0.5 * on(f, gift, 14)})`} opacity={on(f, gift, 8)}><rect x={-180} y={-120} width={360} height={260} rx={20} fill={P.coral} /><rect x={-24} y={-120} width={48} height={260} fill={P.gold} /></g>
          <g opacity={on(f, loss107, 8)}><Label x={560} y={960} text="SMALL EXPECTED LOSS" size={44} font="Bebas Neue" color={P.ink2} /><Label x={1300} y={960} text="BIG EXPECTED LOSS" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}
      {/* # E: she sits back, the clock turns, her chips start circling again */}
      {E > 0 && <g opacity={E}>
        <Person f={f} who="investor" beats={[[0, 'relax', 'smiling'], [stay, 'leanBack', 'smiling'], [needs, 'offer', 'neutral']] as Beat[]} x={420} y={1000} s={0.95} />
        <Cocktail x={640} y={800} s={0.6} />
        <Clock x={420} y={300} s={1.1} f={f} speed={on(f, longer, 10) * 8 + 1} />
        <ChipLoop cx={1260} cy={600} rx={420} ry={200} f={f} start={perk} n={8} lap={60} toll={on(f, needs - 10, 10)} />
      </g>}
      <Vignette id="cs-comp" />
    </g>
  )
}

const BEATS = ['s101:game', 's102:number', 's99:drinks', 's99:meals', 's99:rooms', 's100:comps', 's100:random', 's101:estimates', 's101:lose', 's101:bet', 's101:play', 's101:edge', 's102:theoretical', 's102:loss', 's103:slice', 's103:back', 's103:perks',
  's104:free', 's104:room', 's104:kind', 's105:discount', 's105:money', 's105:anyway', 's106:high', 's106:suite', "s106:tourist's", 's106:drink', 's106:same', 's106:sum', 's107:bigger', 's107:loss', 's107:gift', 's108:perk', 's108:stay', 's108:longer', 's108:needs']
export const CS_COMPS = makePiece('cs-comps', 'Casino long: a server brings drink, meal, room key (COMPS); not random — bet, time and edge go into a machine that outputs the theoretical loss; a slice becomes perks; free room ≠ kindness, a small discount on a pile it wins anyway; suite and drink from the same sum; bigger loss bigger gift; she stays', {
  mood: 'light', Component: Comps, beats: BEATS,
  sfx: [['s99:drinks', 'pop', 0.3], ['s99:rooms', 'pop', 0.3], ['s100:comps', 'chime', 0.35], ['s101:bet', 'click', 0.3], ['s101:play', 'tick', 0.3], ['s102:theoretical', 'coin', 0.4], ['s103:slice', 'swish', 0.35], ['s104:kind', 'crack', 0.3], ['s106:sum', 'ding', 0.35], ['s107:gift', 'pop', 0.35]] })
