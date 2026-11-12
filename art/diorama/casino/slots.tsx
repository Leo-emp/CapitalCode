// ---------------------------------------------------------------- s84–s98: the fastest game in the building.
// A chip passes the toll; a slow wheel and a fast slot sit side by side, a stopwatch racing over the slot. The slot
// machine takes the stage; a little wheel's green pockets fade away (none here) and a glass panel opens on the RNG chip
// that decides each spin; ten coins go in, nine come back. The dealer and the other players fade out — just her and the
// machine. The reels spin in seconds and a win drops into the credit meter. A $1 coin loses an 8¢ wedge to the house
// (penny slots: 11¢). The same dollar circles the machine again and again, losing a wedge each time while her face
// does not change. The wedges pile into $4.9 billion for one year: more than half of the Strip's win (donut). Nevada's
// outline fills with $15.6 billion, two thirds of it slots. A gift box appears.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Donut, Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Coin, Headline, Person, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Chip, CHIP, Cocktail, Slot, Wheel } from './kit'
import { Pedestal } from '../kit'

// # a $1 coin with a wedge (share 0–1) cut out and moved by (dx, dy)
const Dollar: React.FC<{ x: number; y: number; s?: number; share: number; t: number; dx?: number; dy?: number; o?: number }> = ({ x, y, s = 1, share, t, dx = 260, dy = 160, o = 1 }) => {
  const a = share * Math.PI * 2, large = a > Math.PI ? 1 : 0, ex = Math.sin(a) * 180, ey = -Math.cos(a) * 180
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <circle r={180} fill={P.goldD} transform="translate(0 12)" />
      <circle r={180} fill={P.gold} />
      <text y={46} textAnchor="middle" fill={P.goldD} style={{ font: '400 150px "Bebas Neue"' }}>$1</text>
      {share > 0 && <path d={`M0 0 L0 -180 A180 180 0 ${large} 1 ${ex} ${ey} Z`} fill={P.coral} transform={`translate(${dx * t} ${dy * t})`} />}
    </g>
  )
}
const NEVADA = 'M0 0 L300 0 L300 360 L286 470 L262 500 L0 210 Z'

const Slots: React.FC<PieceProps> = ({ f, c }) => {
  const edge = c('s84:edge'), every = c('s84:every'), best = c('s84:best'), friend = c('s84:friend'), most = c('s84:most'), often = c('s84:often')
  const slot = c('s85:slot'), slot86 = c('s86:slot'), no86 = c('s86:no'), green = c('s86:green'), pockets = c('s86:pockets'), spin87 = c('s87:spin'), time87 = c('s87:time'), strip91 = c('s91:strip'), more91 = c('s91:more'), again92 = c('s92:again#2'), time92 = c('s92:time'), casino98 = c('s98:casino')
  const computer = c('s87:computer'), decides = c('s87:decides'), pays = c('s87:pays'), less = c('s87:less')
  const dealer = c('s88:dealer'), players = c('s88:players'), down = c('s88:down')
  const spin = c('s89:spin'), seconds = c('s89:seconds'), win89 = c('s89:win'), credits = c('s89:credits'), again89 = c('s89:again')
  const strip90 = c('s90:strip'), b8 = c('s90:8'), dollar90 = c('s90:dollar'), penny = c('s91:penny'), b11 = c('s91:11')
  const cents = c('s92:cents'), small = c('s92:small'), same = c('s92:same'), seconds92 = c('s92:seconds'), lose92 = c('s92:lose'), average = c('s92:average')
  const nobody = c('s93:nobody'), point = c('s93:point')
  const add = c('s94:add'), cents94 = c('s94:cents'), strip94 = c('s94:strip'), kept94 = c('s94:kept'), b49 = c('s94:49'), year = c('s94:year'), s90 = c('s90')
  const half = c('s95:half'), won = c('s95:won')
  const nevada = c('s96:nevada'), b156 = c('s96:156'), thirds = c('s97:thirds'), slots97 = c('s97:slots')
  const tool = c('s98:tool'), gift = c('s98:gift')
  const A = win(f, 0, slot - 2), Bp = win(f, slot - 2, b8 - 8), Cp = win(f, b8 - 8, add - 2), D = win(f, add - 2, casino98 - 2), E = on(f, casino98 - 2, 10)
  // # the same dollar circling the machine: one lap per ~1.4 s, a wedge lost each lap
  const lap = Math.max(0, (f - same) / (f >= again92 ? 30 : 42)), laps = Math.floor(lap)
  return (
    <g>
      <Stage id="cs-slot" frame={f} />
      <Headline f={f} lines={[[edge, 'THE EDGE WORKS ON EVERY BET', P.ink, 100], [best, 'SO THE BEST GAME IS THE FASTEST', P.goldInk, 100], [slot, 'THE SLOT MACHINE', P.goldInk, 120], [computer, 'A COMPUTER DECIDES', P.ink, 104], [pays, 'PAYS BACK A LITTLE LESS', P.ink, 104],
        [dealer, 'NO DEALER · NO WAITING', P.ink, 104], [spin, 'A SPIN TAKES SECONDS', P.ink, 104], [b8, 'STRIP SLOTS: 8¢ OF EVERY $1', P.goldInk, 100], [b11, 'PENNY SLOTS: 11¢', P.goldInk, 108], [cents, '8¢ SOUNDS SMALL…', P.ink, 108], [same, 'THE SAME DOLLAR, AGAIN AND AGAIN', P.ink, 96], [nobody, 'NOBODY NOTICES 8¢', P.ink, 108],
        [b49, '$4.9 BILLION IN ONE YEAR', P.goldInk, 104], [half, 'MORE THAN HALF THE STRIP\'S WIN', P.goldInk, 100], [b156, 'NEVADA: $15.6 BILLION', P.goldInk, 104], [thirds, 'TWO THIRDS FROM SLOTS', P.goldInk, 104], [tool, 'ONE MORE TOOL', P.ink, 112]]} />
      {/* # A: the toll on every bet; a slow wheel vs a fast slot */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, best, 10)}>
          <rect x={860} y={360} width={200} height={50} rx={12} fill={P.goldD} /><Label x={960} y={398} text="EDGE" size={40} font="Bebas Neue" color={P.navy0} />
          {Array.from({ length: 5 }, (_, k) => { const u = span(f, every + k * 8, every + 40 + k * 8); return u > 0 && u < 1 ? <Chip key={k} x={lerp(300, 1620, u)} y={560} s={0.9} color={CHIP.blue} /> : null })}
        </g>
        <g opacity={on(f, best, 10)}>
          <Wheel cx={560} cy={620} r={190} rot={f * 0.7} numbers={false} />
          <Slot x={1360} y={980} s={0.75} f={f} spinAt={friend} spinFor={999} />
          <g transform="translate(1360 200)" opacity={on(f, most, 8)}><circle r={70} fill={P.card} /><circle r={70} fill="none" stroke={P.ink} strokeWidth={6} />
            <line x1={0} y1={0} x2={Math.sin(f / 2) * 54} y2={-Math.cos(f / 2) * 54} stroke={P.coral} strokeWidth={8} strokeLinecap="round" /></g>
          <g transform="translate(560 200)" opacity={on(f, most, 8)}><circle r={70} fill={P.card} /><circle r={70} fill="none" stroke={P.ink} strokeWidth={6} />
            <line x1={0} y1={0} x2={Math.sin(f / 30) * 54} y2={-Math.cos(f / 30) * 54} stroke={P.ink2} strokeWidth={8} strokeLinecap="round" /></g>
          <g opacity={on(f, often, 8)}><Label x={1360} y={340} text="MOST OFTEN" size={52} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}
      {/* # B: the machine; no green pockets; the RNG; 10 in, 9 out; no dealer, no players; spin + credits */}
      {Bp > 0 && <g opacity={Bp}>
        <Slot x={960} y={1010} s={1.05} f={f} showInside={on(f, computer, 10)} spinAt={f >= spin ? spin : f >= time87 ? time87 : f >= spin87 ? spin87 : decides} spinFor={f >= spin ? 40 : 40} credits={f >= win89 ? `${Math.round(lerp(40, 60, on(f, credits, 14)))}` : f >= spin ? '40' : undefined} />
        <g opacity={on(f, slot86, 8) * (1 - on(f, computer, 8))} transform={`translate(1520 420) scale(${0.8 + 0.2 * on(f, no86, 10)})`}><Pedestal x={0} y={90} r={150} /><Wheel cx={0} cy={0} r={120} rot={f} numbers={false} dimGreen={on(f, pockets, 10)} />
          <path d="M-130 -130 L130 130" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, pockets, 8)} /></g>
        {/* # 25 coins in, 23 back out (≈ 92% paid back, the Strip average) */}
        <g opacity={on(f, pays, 8) * (1 - on(f, dealer - 4, 8))}>
          {Array.from({ length: 25 }, (_, k) => <Coin key={k} x={300 + (k % 5) * 60} y={300 + Math.floor(k / 5) * 56} s={0.62} />)}
          <Label x={420} y={630} text="IN" size={56} font="Bebas Neue" color={P.ink} />
          {Array.from({ length: 23 }, (_, k) => <g key={k} opacity={on(f, pays + k * 0.8, 6)}><Coin x={1440 + (k % 5) * 60} y={300 + Math.floor(k / 5) * 56} s={0.62} /></g>)}
          <g opacity={on(f, less, 8)}><Label x={1560} y={630} text="BACK: A LITTLE LESS" size={56} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        {/* # the dealer and the other players fade out; she sits alone */}
        <g opacity={on(f, dealer - 6, 8) * (1 - on(f, dealer + 6, 12))}><Person f={f} who="owner" beats={[[0, 'idle', 'neutral']] as Beat[]} x={1500} y={1000} s={0.85} /></g>
        <g opacity={on(f, players - 6, 8) * (1 - on(f, players + 6, 12))}>{[1400, 1650].map((x, k) => <Person key={k} f={f} who={k ? 'buyer' : 'hero'} beats={[[0, 'idle', 'neutral']] as Beat[]} x={x} y={1000} s={0.8} />)}</g>
        <g opacity={on(f, down, 8)}><Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [win89, 'fistPump', 'smiling'], [again89, 'offer', 'neutral']] as Beat[]} x={520} y={1000} s={0.95} /></g>
        <g opacity={on(f, seconds, 8)} transform="translate(1500 300)"><circle r={70} fill={P.card} /><circle r={70} fill="none" stroke={P.ink} strokeWidth={6} /><line x1={0} y1={0} x2={Math.sin(f / 3) * 54} y2={-Math.cos(f / 3) * 54} stroke={P.coral} strokeWidth={8} strokeLinecap="round" /><Label x={0} y={120} text="SECONDS" size={44} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, s90, 8)}><Calendar x={1500} y={620} text="2024" s={0.7} flip={on(f, s90, 12)} /></g>
        {f >= win89 && f < credits + 16 && [0, 1, 2].map((k) => { const t = easeInOut(span(f, win89 + k * 4, credits + k * 4)); return <Coin key={k} x={960} y={lerp(560, 920, t)} s={0.6} o={1 - t * 0.6} /> })}
      </g>}
      {/* # C: 8¢ of every $1 (11¢ on pennies); the same dollar loses a wedge each lap */}
      {Cp > 0 && <g opacity={Cp}>
        <g opacity={1 - on(f, same - 4, 10)}>
          <Dollar x={700} y={580} share={f >= penny && f < cents ? 0.11 : 0.08} t={easeInOut(span(f, dollar90 - 6, dollar90 + 14))} o={on(f, strip90, 8)} />
          <g opacity={on(f, b8, 8)}><Label x={1080} y={460} text={f >= b11 && f < cents ? '11¢' : '8¢'} size={120} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, strip91, 8) * (1 - on(f, cents, 8))} transform={`translate(1450 570) scale(${1 + 0.15 * on(f, more91, 10)}) translate(-1450 -570)`}><rect x={1300} y={500} width={300} height={140} rx={20} fill={P.card} /><Label x={1450} y={590} text="PENNY SLOT" size={60} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, cents, 8) * (1 - on(f, same - 4, 8))}><Label x={700} y={900} text="SOUNDS SMALL" size={60} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, same - 4, 10)}>
          <Slot x={960} y={980} s={0.8} f={f} spinAt={same} spinFor={9999} />
          {(() => { const a = lap * Math.PI * 2, x = 960 + Math.cos(a) * 520, y = 560 + Math.sin(a) * 260, sc = Math.max(0.35, 0.8 - laps * 0.04); return <g transform={`translate(${x} ${y}) scale(${sc})`}><circle r={120} fill={P.gold} /><text y={36} textAnchor="middle" fill={P.goldD} style={{ font: '400 110px "Bebas Neue"' }}>$1</text></g> })()}
          {Array.from({ length: Math.min(12, laps) }, (_, k) => <path key={k} d="M0 0 L0 -40 A40 40 0 0 1 20 -35 Z" fill={P.coral} transform={`translate(${1560 + (k % 4) * 46} ${880 - Math.floor(k / 4) * 46})`} />)}
          <g opacity={on(f, time92, 8)}><ellipse cx={1630} cy={850} rx={140} ry={80} fill={P.coral} opacity={0.15} /></g>
          <g opacity={on(f, lose92, 8)}><Label x={1630} y={760} text="−8¢ EACH TIME" size={50} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, average, 8) * (1 - on(f, nobody, 8))}><Label x={300} y={300} text="ON AVERAGE" size={50} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, nobody, 8)}><Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [point, 'relax', 'smiling']] as Beat[]} x={300} y={1000} s={0.9} /></g>
        </g>
      </g>}
      {/* # D: the wedges pile up to $4.9 billion; more than half the Strip; Nevada $15.6bn, two thirds slots */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, nevada - 4, 10)}>
          {Array.from({ length: 60 }, (_, k) => <path key={k} d="M0 0 L0 -40 A40 40 0 0 1 20 -35 Z" fill={k % 2 ? P.coral : P.gold} transform={`translate(${520 + (k % 10) * 40 - Math.floor(k / 10) * 0} ${880 - Math.floor(k / 10) * 44}) scale(${on(f, add + k * 0.6, 6)})`} />)}
          <g opacity={on(f, cents94, 8) * (1 - on(f, strip94, 8))}><Label x={700} y={530} text="ALL THOSE CENTS" size={70} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, strip94, 8) * (1 - on(f, b49, 8))}><Label x={700} y={530} text="STRIP SLOTS" size={80} font="Bebas Neue" color={P.ink} /></g>
          <ellipse cx={700} cy={760} rx={260} ry={160} fill={P.gold} opacity={0.15 * on(f, kept94, 10)} />
          <g opacity={on(f, b49, 8)}><Label x={700} y={530} text="$4.9B" size={130} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, year, 8)}><Calendar x={1060} y={760} text="2024" s={0.8} /></g>
          <g opacity={on(f, half - 6, 8)}><Donut cx={1460} cy={600} r={230} part={55.8} p={easeInOut(span(f, half - 6, half + 18))} color={P.gold} rest={P.navy4} /><Label x={1460} y={620} text="SLOTS" size={60} font="Bebas Neue" color={P.ink} /><g opacity={on(f, won, 8)}><Label x={1460} y={900} text="OF THE STRIP'S $8.8B" size={46} font="Bebas Neue" color={P.ink2} /></g></g>
        </g>
        <g opacity={on(f, nevada - 4, 10)}>
          <g transform="translate(360 260) scale(1.25)"><path d={NEVADA} fill={P.navy3} stroke={P.gold} strokeWidth={5} /><path d={NEVADA} fill={P.gold} opacity={0.35 * on(f, b156, 14)} /></g>
          <g opacity={on(f, b156, 8)}><Label x={550} y={480} text="$15.6B" size={90} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, thirds - 6, 8)}><Donut cx={1360} cy={580} r={240} part={67.4} p={easeInOut(span(f, thirds - 6, thirds + 18))} color={P.gold} rest={P.navy4} /><g opacity={on(f, slots97, 8)}><Label x={1360} y={600} text="SLOTS ⅔" size={64} font="Bebas Neue" color={P.ink} /></g></g>
        </g>
      </g>}
      {/* # E: the gift */}
      {E > 0 && <g opacity={E}>
        <Person f={f} who="owner" beats={[[0, 'walkA', 'smiling', 'walkB', 10], [tool, 'offer', 'smiling']] as Beat[]} x={lerp(200, 560, span(f, casino98, tool))} y={900} s={0.95} />
        <rect x={300} y={780} width={1320} height={40} rx={14} fill="#6B4426" /><rect x={320} y={820} width={1280} height={300} fill="#4E311B" />
        <g transform={`translate(1000 780) scale(${0.6 + 0.4 * on(f, tool, 12)})`}>
          <rect x={-180} y={-260} width={360} height={260} rx={20} fill={P.coral} /><rect x={-24} y={-260} width={48} height={260} fill={P.gold} />
          <g transform={`translate(0 ${-260 - 160 * on(f, gift, 12)}) rotate(${-25 * on(f, gift, 12)} -200 0)`}><rect x={-200} y={-60} width={400} height={70} rx={16} fill={P.coralD} /><rect x={-24} y={-60} width={48} height={70} fill={P.gold} /></g>
          <g opacity={on(f, gift, 10)}><Cocktail x={0} y={-250} s={0.8} /></g>
        </g>
      </g>}
      <Vignette id="cs-slot" />
    </g>
  )
}

const BEATS = ['s86:slot', 's86:no', 's87:spin', 's87:time', 's91:strip', 's91:more', 's92:again#2', 's92:time', 's98:casino', 's90', 's94:cents', 's94:strip', 's94:kept', 's84:edge', 's84:every', 's84:best', 's84:friend', 's84:most', 's84:often', 's85:slot', 's86:green', 's86:pockets', 's87:computer', 's87:decides', 's87:pays', 's87:less', 's88:dealer', 's88:players', 's88:down',
  's89:spin', 's89:seconds', 's89:win', 's89:credits', 's89:again', 's90:strip', 's90:8', 's90:dollar', 's91:penny', 's91:11', 's92:cents', 's92:small', 's92:same', 's92:seconds', 's92:lose', 's92:average', 's93:nobody', 's93:point',
  's94:add', 's94:49', 's94:year', 's95:half', 's95:won', 's96:nevada', 's96:156', 's97:thirds', 's97:slots', 's98:tool', 's98:gift']
export const CS_SLOTS = makePiece('cs-slots', 'Casino long: the edge on every bet; slow wheel vs fast slot; the RNG inside, 10 coins in 9 back; no dealer, no players; spin + credits; $1 loses 8¢ (penny 11¢); the same dollar shrinks lap after lap; $4.9bn pile, >half the Strip; Nevada $15.6bn, ⅔ slots; a gift', {
  mood: 'dark', Component: Slots, beats: BEATS,
  sfx: [['s85:slot', 'chime', 0.4], ['s87:computer', 'glitch', 0.3], ['s87:less', 'coin', 0.35], ['s89:spin', 'click', 0.35], ['s89:credits', 'coin', 0.4], ['s90:8', 'swish', 0.35], ['s92:same', 'whoosh', 0.3], ['s94:49', 'cash', 0.45], ['s96:156', 'impact', 0.35], ['s98:gift', 'pop', 0.35]] })
