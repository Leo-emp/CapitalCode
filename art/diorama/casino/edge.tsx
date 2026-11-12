// ---------------------------------------------------------------- s22–s33: the house edge.
// $10 chips roll past the wheel one after another; at each pass the green pockets shave a thin gold sliver into a
// little house (53¢ per $10). 38 coins line up; two turn green and slide into the house (2 of 38 ≈ 5.3%). The house
// grows a sharp roof edge ("house edge"); four small games each get their own little house. A balance with one chip
// a side barely tips. A one-green European wheel (2.7%); a blackjack hand with a thinking player (up to ~1%); a slot
// machine whose reels are covered. The $10 chip next to a tiny 53¢ coin; a $100 bill bet once loses a thin 5% slice;
// the player waves "no" — and the bill breaks into chips that start to circle.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Headline, Person, win } from '../aimoney/common'
import { Balance, Chip, CHIP, loopPoint, Slot, SplitBill, Table, Tray, Wheel } from './kit'

// # a little house with a sharp roof (the house edge); fill 0–1 = coins inside
const House: React.FC<{ x: number; y: number; s?: number; fill?: number; edge?: number; o?: number }> = ({ x, y, s = 1, fill = 0, edge = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={170} ry={22} fill={P.shadow} opacity={0.25} />
    <rect x={-130} y={-180} width={260} height={180} rx={10} fill={P.navy3} />
    <rect x={-110} y={-160 + 140 * (1 - fill)} width={220} height={140 * fill} rx={8} fill={P.gold} opacity={0.9} />
    <path d="M-160 -170 L0 -300 L160 -170 Z" fill={P.goldD} />
    {edge > 0 && <path d="M-160 -170 L0 -300 L160 -170" fill="none" stroke="#FFFFFF" strokeWidth={10 * edge} strokeLinejoin="miter" />}
    <rect x={-30} y={-80} width={60} height={80} rx={8} fill={P.navy0} />
  </g>
)
const Cards: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[[-50, -8, 'A'], [50, 8, 'K']].map(([dx, r, t]) => <g key={t as string} transform={`translate(${dx} 0) rotate(${r})`}><rect x={-70} y={-100} width={140} height={200} rx={14} fill="#FFFFFF" stroke="#C9D3E1" strokeWidth={3} /><text x={-40} y={-50} fill={CHIP.red} style={{ font: '400 56px "Bebas Neue"' }}>{t}</text><path d="M0 -10 L22 22 L0 52 L-22 22 Z" fill={CHIP.red} /></g>)}
  </g>
)
const Dice: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[[-60, -10, 5], [60, 12, 3]].map(([dx, r, n]) => <g key={dx} transform={`translate(${dx} 0) rotate(${r})`}><rect x={-55} y={-55} width={110} height={110} rx={20} fill="#FFFFFF" />
      {(n === 5 ? [[-28, -28], [28, -28], [0, 0], [-28, 28], [28, 28]] : [[-28, -28], [0, 0], [28, 28]]).map(([px, py], k) => <circle key={k} cx={px} cy={py} r={10} fill={CHIP.red} />)}</g>)}
  </g>
)

const Edge: React.FC<PieceProps> = ({ f, c }) => {
  const many = c('s22:many'), green = c('s22:green'), take = c('s22:take'), b53 = c('s22:53'), every22 = c('s22:every')
  const two = c('s23:2'), b38 = c('s23:38'), b53p = c('s23:53')
  const house = c('s24:house'), edge = c('s24:edge'), game = c('s25:game'), one25 = c('s25:one')
  const small = c('s26:small'), single = c('s26:single'), fair = c('s26:fair')
  const european = c('s27:european'), green27 = c('s27:green'), b27 = c('s27:27')
  const blackjack = c('s28:blackjack'), best = c('s28:best'), choice = c('s28:choice'), hand = c('s28:hand'), edge28 = c('s28:edge'), b1 = c('s28:1')
  const slot = c('s29:slot'), show = c('s29:show'), keep = c('s29:keep'), there = c('s29:there')
  const b53n = c('s30:53'), ten30 = c('s30:10'), sound = c('s30:sound'), much = c('s30:much')
  const walked = c('s31:walked'), b100 = c('s31:100'), once = c('s31:once'), keep31 = c('s31:keep'), b5 = c('s31:5')
  const nobody = c('s32:nobody'), where = c('s33:where'), go = c('s33:go')
  // # phases
  const A = win(f, many - 10, two - 2), Bp = win(f, two - 2, game), Cp = win(f, game, european), D = win(f, european, slot), E = win(f, slot, b53n - 2), F = on(f, b53n - 2, 10)
  // # A: chips roll past the wheel; each loses a sliver at the green pockets
  const roll = (k: number) => span(f, many + k * 9, many + 40 + k * 9)
  return (
    <g>
      <Stage id="cs-edge" frame={f} />
      <Headline f={f} lines={[[take, '53¢ FROM EVERY $10', P.goldInk, 112], [b53p, '2 OUT OF 38 ≈ 5.3%', P.goldInk, 112], [house, 'THE HOUSE EDGE', P.goldInk, 120], [game, 'EVERY GAME HAS ONE', P.ink, 108], [small, 'SMALL ENOUGH TO FEEL FAIR', P.ink, 104],
        [european, 'ONE GREEN POCKET', P.ink, 104], [blackjack, 'BLACKJACK', P.ink, 112], [edge28, 'UP TO ABOUT 1%', P.goldInk, 112], [slot, 'SLOTS: NOT SHOWN', P.ink, 104], [b53n, '53¢ ON $10', P.ink, 112], [b100, '$100, BET ONCE', P.ink, 108], [b5, 'THE HOUSE KEEPS ABOUT $5', P.goldInk, 104], [nobody, 'NOBODY PLAYS LIKE THAT', P.coralInk, 104], [where, 'WHERE DOES THE REST GO?', P.ink, 104]]} />
      {/* # A */}
      {A > 0 && <g opacity={A}>
        <Table x={960} y={560} w={1400} d={320} />
        <Wheel cx={500} cy={640} r={190} rot={f * 1.2} glowGreen={on(f, green, 8)} numbers={false} />
        {Array.from({ length: 6 }, (_, k) => { const u = roll(k); if (u <= 0 || u >= 1) return null; const x = lerp(160, 1760, u), y = 860 - Math.sin(u * Math.PI) * 60; return <Chip key={k} x={x} y={y} s={1.4} color={CHIP.blue} label="$10" /> })}
        {Array.from({ length: 6 }, (_, k) => { const t = span(f, many + 20 + k * 9, many + 34 + k * 9); return t > 0 && f >= take - 10 ? <rect key={k} x={lerp(960, 1560, t) - 14} y={lerp(860, 900, t) - Math.sin(t * Math.PI) * 120} width={28} height={10} rx={3} fill={P.gold} opacity={t < 1 ? 1 : 0} /> : null })}
        <House x={1640} y={1010} s={0.8} fill={0.1 + 0.4 * on(f, take, 30)} />
        <g opacity={on(f, b53, 8)}><Label x={1640} y={700} text="53¢" size={80} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, every22, 8)}><Label x={300} y={780} text="EVERY $10 BET" size={56} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {/* # B: 38 coins; two turn green and slide into the house; the roof becomes the edge */}
      {Bp > 0 && <g opacity={Bp}>
        {Array.from({ length: 38 }, (_, k) => {
          const g = k >= 36, t = g ? easeInOut(span(f, b38 + 6 + (k - 36) * 4, b38 + 24 + (k - 36) * 4)) : 0
          const x = 170 + (k % 19) * 72, y = 470 + Math.floor(k / 19) * 120
          return <g key={k} opacity={on(f, two + k * 0.4, 6)}><Chip x={lerp(x, 1640, t)} y={lerp(y, 860, t) - Math.sin(t * Math.PI) * 100} s={0.78} color={g && f >= two + 6 ? CHIP.green : CHIP.gold} /></g>
        })}
        <House x={1640} y={1010} s={0.8} fill={0.2 + 0.3 * on(f, b38 + 24, 12)} edge={on(f, edge, 10)} />
        <g opacity={on(f, b53p, 8)}><Label x={1640} y={700} text="5.3%" size={90} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}
      {/* # C: every game has its own little house; a balance with one chip a side barely tips */}
      {Cp > 0 && <g opacity={Cp}>
        {f < small && [0, 1, 2, 3].map((k) => {
          const x = 330 + k * 420, a = game + k * 5
          return <g key={k} opacity={on(f, a, 8)} transform={`translate(${x} 600) scale(${pop(f, a)})`}>
            <rect x={-180} y={-220} width={360} height={420} rx={30} fill={P.card} />
            {k === 0 && <Wheel cx={0} cy={-40} r={110} rot={f} numbers={false} />}
            {k === 1 && <Cards x={0} y={-40} s={0.8} />}
            {k === 2 && <Slot x={0} y={110} s={0.4} f={f} />}
            {k === 3 && <Dice x={0} y={-40} />}
            <g opacity={on(f, one25, 8)}><House x={110} y={170} s={0.28} fill={0.4} edge={1} /></g>
          </g>
        })}
        <g opacity={on(f, small, 10)}><Balance x={960} y={330} s={1.3} tilt={lerp(0, 0.18, easeInOut(span(f, single, single + 20)))}
          left={<Chip x={0} y={-10} s={0.7} color={CHIP.blue} />} right={<g><Chip x={0} y={-10} s={0.7} color={CHIP.blue} /><rect x={20} y={-34} width={18} height={8} rx={3} fill={P.gold} /></g>} />
          <g opacity={on(f, fair, 8)}><Label x={960} y={1000} text="ALMOST FAIR" size={60} font="Bebas Neue" color={P.ink} /></g></g>
      </g>}
      {/* # D: Europe 2.7%, blackjack up to ~1% */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, blackjack - 4, 10)}>
          <Table x={960} y={560} w={1100} d={320} />
          <Wheel cx={960} cy={640} r={230} rot={f * 0.8} glowGreen={on(f, green27, 8)} numbers={false} europe />
          {/* # cover the second green pocket: a European wheel has only one */}
          <g opacity={on(f, european, 8)}><Label x={960} y={980} text="EUROPE" size={60} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, b27, 8)}><Label x={1360} y={460} text="2.7%" size={110} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        <g opacity={on(f, blackjack - 4, 10)}>
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [best, 'think', 'thinking'], [choice, 'scratchHead', 'thinking'], [hand, 'point', 'neutral'], [edge28, 'shrug', 'neutral']] as Beat[]} x={700} y={760} s={0.95} />
          <ellipse cx={960} cy={860} rx={760} ry={190} fill="#1F7A52" /><ellipse cx={960} cy={860} rx={760} ry={190} fill="none" stroke="#6B4426" strokeWidth={30} />
          <g transform="translate(1000 840) scale(1 0.55)"><Cards x={0} y={0} s={lerp(0.6, 1, on(f, blackjack, 10))} o={on(f, blackjack, 8)} /></g>
          <g opacity={on(f, hand, 8)}><Chip x={1300} y={820} s={0.9} color={CHIP.blue} label="$10" /></g>
          <g opacity={on(f, b1, 8)}><House x={1560} y={900} s={0.4} fill={0.15} edge={1} /><Label x={1560} y={720} text="≤ 1%" size={80} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}
      {/* # E: the slot keeps its number hidden */}
      {E > 0 && <g opacity={E}>
        <Slot x={960} y={980} s={1.1} f={f} spinAt={slot} spinFor={40} />
        <g opacity={on(f, show, 8)}><rect x={960 - 200} y={980 - 520} width={400} height={200} rx={20} fill={P.navy0} /><Label x={960} y={980 - 390} text="?" size={140} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, keep, 8)}><ellipse cx={960} cy={1000} rx={300} ry={40} fill={P.gold} opacity={0.35 + 0.15 * Math.sin(f / 5)} /></g>
        <g opacity={on(f, there, 8)}><Label x={1450} y={520} text="LATER" size={70} font="Bebas Neue" color={P.ink2} /></g>
      </g>}
      {/* # F: 53¢ next to $10; $100 bet once; nobody plays like that; the bill becomes circling chips */}
      {F > 0 && <g opacity={F}>
        <g opacity={1 - on(f, walked - 4, 10)}>
          <Table x={1000} y={640} w={1300} d={300} />
          <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [sound, 'shrug', 'neutral']] as Beat[]} x={260} y={1000} s={0.95} />
          <g transform={`translate(760 760) scale(${pop(f, ten30)})`}><Chip x={0} y={0} s={4} color={CHIP.blue} label="$10" /></g>
          <Tray x={1440} y={800} s={0.8} fill={0.25} label="HOUSE" />
          {(() => { const t = easeInOut(span(f, b53n, b53n + 20)); return <g opacity={on(f, b53n, 6)} transform={`translate(${lerp(900, 1440, t)} ${lerp(700, 740, t) - Math.sin(t * Math.PI) * 140})`}><rect x={-40} y={-14} width={80} height={28} rx={8} fill={P.gold} /><Label x={0} y={-30} text="53¢" size={60} font="Bebas Neue" color={P.goldInk} /></g> })()}
          <g opacity={on(f, much, 8)}><Label x={760} y={560} text="NOT MUCH?" size={56} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, walked - 4, 10) * (1 - on(f, where, 10))}>
          <Table x={960} y={640} w={1300} d={300} red={on(f, once, 8)} />
          <Tray x={1500} y={820} s={0.8} fill={0.2} label="HOUSE" />
          {(() => { const push = easeInOut(span(f, b100, once)); return <SplitBill x={lerp(600, 830, push)} y={lerp(480, 740, push)} s={lerp(0.9, 0.6, push)} lost={0.05} t={easeInOut(span(f, keep31, keep31 + 18))} dx={1100} dy={150} o={on(f, b100, 8)} /> })()}
          <g opacity={on(f, b5, 8)}><Label x={1500} y={640} text="$5" size={90} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, nobody, 8)}><Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [nobody, 'shrug', 'smug']] as Beat[]} x={240} y={1000} s={0.9} /></g>
        </g>
        {/* # the rest of the money: chips that start circling */}
        {f >= where - 6 && Array.from({ length: 10 }, (_, k) => { const t = easeInOut(span(f, where - 6 + k * 2, where + 14 + k * 2)), p = loopPoint(960, 620, 520, 200, k / 10 + (f - where) / 120); return <Chip key={k} x={lerp(1000, p.x, t)} y={lerp(560, p.y, t)} s={0.8} color={CHIP.red} /> })}
        <g opacity={on(f, go, 8)}><ellipse cx={960} cy={620} rx={520} ry={200} fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="6 16" /></g>
      </g>}
      <Vignette id="cs-edge" />
    </g>
  )
}

const BEATS = ['s30:10', 's30:sound', 's22:many', 's22:green', 's22:take', 's22:53', 's22:every', 's23:2', 's23:38', 's23:53', 's24:house', 's24:edge', 's25:game', 's25:one', 's26:small', 's26:single', 's26:fair',
  's27:european', 's27:green', 's27:27', 's28:blackjack', 's28:best', 's28:choice', 's28:hand', 's28:edge', 's28:1', 's29:slot', 's29:show', 's29:keep', 's29:there', 's30:53', 's30:much',
  's31:walked', 's31:100', 's31:once', 's31:keep', 's31:5', 's32:nobody', 's33:where', 's33:go']
export const CS_EDGE = makePiece('cs-edge', 'Casino long: chips shaved at the green pockets (53¢ per $10); 2 of 38 coins go green (5.3%); the house edge roof; every game has a house; Europe 2.7%; blackjack ≤1%; slot hides its number; $100 once keeps $5; the rest circles', {
  mood: 'dark', Component: Edge, beats: BEATS,
  sfx: [['s22:take', 'coin', 0.4], ['s23:38', 'coin', 0.4], ['s24:edge', 'impact', 0.4], ['s25:game', 'pop', 0.3], ['s27:27', 'ding', 0.35], ['s28:blackjack', 'flutter', 0.35], ['s29:slot', 'click', 0.35], ['s31:keep', 'swish', 0.4], ['s32:nobody', 'thud', 0.35], ['s33:where', 'whoosh', 0.35]] })
