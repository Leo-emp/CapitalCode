// ---------------------------------------------------------------- s51–s61: the real numbers (Nevada, 2024).
// Our notebook slides aside and the state regulator's report opens, game rows filling in. A 10×10 block of chips is
// what roulette players bought; 16 of them turn gold and slide into the house. A blackjack block keeps 14, next to a
// single thin coral sliver for its ~1% edge. Labelled HOLD. A tall hold bar stands next to a short edge bar; circling
// arrows run round the block (the same chips bet many times) until a player walks off; another pockets a chip. Three
// edge bars stack up to the hold bar (3×). The house's roulette pile grows to $359M — while players still cheer.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Doc, Headline, Person, win } from '../aimoney/common'
import { Chip, CHIP, Stack, Table, Tray, Wheel } from './kit'

// # a 10×10 block of chips; `kept` of them turn gold and slide to (tx, ty) at progress t
const Block: React.FC<{ x: number; y: number; kept: number; t: number; tx: number; ty: number; o?: number; show: number }> = ({ x, y, kept, t, tx, ty, o = 1, show }) => (
  <g opacity={o}>
    {Array.from({ length: 100 }, (_, i) => {
      const c = i % 10, r = Math.floor(i / 10), gold = i >= 100 - kept, px = x + c * 54, py = y + r * 36
      const u = gold ? easeInOut(Math.max(0, Math.min(1, t * 1.3 - (i - (100 - kept)) * 0.02))) : 0
      return <g key={i} opacity={Math.min(1, Math.max(0, show * 100 - i * 0.6))}><Chip x={lerp(px, tx + ((i % 4) - 1.5) * 50, u)} y={lerp(py, ty - Math.floor((i % 16) / 4) * 14, u) - Math.sin(u * Math.PI) * 80} s={0.52} color={gold && t > 0 ? CHIP.gold : CHIP.red} /></g>
    })}
  </g>
)

const Hold: React.FC<PieceProps> = ({ f, c }) => {
  const model = c('s51:model'), nevada = c("s52:nevada's"), publishes = c('s52:publishes'), type = c('s52:type'), keeps = c('s52:keeps')
  const roulette = c('s53:roulette'), strip = c('s53:strip'), b16 = c('s53:16'), turned = c('s53:turned'), chips = c('s53:chips')
  const h53 = c('s53:100'), h54 = c('s54:100'), though = c('s54:though'), blackjack = c('s54:blackjack'), b14 = c('s54:14'), edge54 = c('s54:edge'), b1 = c('s54:1'), less54 = c('s54:less'), industry = c('s55:industry')
  const hold = c('s55:hold'), bigger = c('s56:bigger'), edge56 = c('s56:edge'), same = c('s56:same'), times = c('s56:times'), walks = c('s56:walks')
  const perfect = c('s57:perfect'), move = c('s57:move'), leave = c('s57:leave'), pocket = c('s57:pocket')
  const roulette58 = c('s58:roulette'), b3 = c('s58:3'), edge58 = c('s58:edge'), american = c('s58:american')
  const alone = c('s59:alone'), b359 = c('s59:359'), year = c('s59:year')
  const which = c('s60'), strange = c('s60:strange'), takes = c('s61:takes'), why = c('s61:why'), players61 = c('s61:players'), feel = c('s61:feel'), winning = c('s61:winning')
  const A = win(f, 0, roulette - 2), Bp = win(f, roulette - 2, bigger), Cp = win(f, bigger, perfect - 2), D = win(f, perfect - 2, which), E = on(f, which, 10)
  return (
    <g>
      <Stage id="cs-hold" frame={f} />
      <Headline f={f} lines={[[nevada, "NEVADA'S GAMING REGULATOR", P.ink, 104], [roulette, 'STRIP ROULETTE · 2024', P.ink, 104], [b16, 'KEPT ABOUT $16 OF EVERY $100', P.goldInk, 100], [blackjack, 'BLACKJACK: ABOUT $14', P.goldInk, 104], [hold, 'THE HOLD', P.goldInk, 124],
        [bigger, 'HOLD ≫ EDGE', P.goldInk, 120], [perfect, 'NOT A PERFECT MEASURE', P.ink, 104], [b3, 'ABOUT 3× THE EDGE', P.goldInk, 116], [alone, 'ROULETTE ALONE, ONE YEAR', P.ink, 104], [b359, '$359 MILLION', P.goldInk, 124], [which, '', P.ink], [strange, 'BACK TO THE STRANGE PART', P.ink, 104], [feel, 'YET PLAYERS FEEL LIKE WINNERS', P.ink, 100]]} />
      {/* # A: our notebook slides aside; the regulator's report opens and its game rows fill in */}
      {A > 0 && <g opacity={A}>
        <g transform={`translate(${lerp(0, -560, easeInOut(span(f, model, nevada)))} 0)`}><Doc x={960} y={560} s={1} title="OUR MATHS" lines={5} /></g>
        <g opacity={on(f, nevada, 8)} transform={`translate(1120 560) scale(${lerp(0.7, 1.25, easeInOut(span(f, nevada, publishes + 10)))})`}>
          <rect x={-260} y={-300} width={520} height={600} rx={24} fill="#000" opacity={0.2} transform="translate(12 14)" />
          <rect x={-260} y={-300} width={520} height={600} rx={24} fill={P.paper} />
          <circle cx={-170} cy={-220} r={48} fill={P.navy3} /><circle cx={-170} cy={-220} r={34} fill="none" stroke={P.gold} strokeWidth={5} />
          <text x={40} y={-236} textAnchor="middle" fill={P.navy2} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>NEVADA · 2024</text>
          <text x={40} y={-196} textAnchor="middle" fill={P.navy4} style={{ font: '400 32px "Bebas Neue"', letterSpacing: 2 }}>GAMING REVENUE REPORT</text>
          {[['ROULETTE', CHIP.green], ['BLACKJACK', CHIP.red], ['SLOTS', CHIP.gold], ['CRAPS', CHIP.blue]].map(([t, col], k) => (
            <g key={t} opacity={on(f, type + k * 5, 8)}><circle cx={-190} cy={-90 + k * 90} r={22} fill={col} /><text x={-150} y={-78 + k * 90} fill={P.navy2} style={{ font: '400 44px "Bebas Neue"' }}>{t}</text>
              <rect x={70} y={-102 + k * 90} width={140 * on(f, keeps + k * 3, 10)} height={26} rx={8} fill={P.goldD} /></g>))}
        </g>
      </g>}
      {/* # B: roulette block keeps 16, blackjack block keeps 14 vs a 1% sliver */}
      {Bp > 0 && <g opacity={Bp}>
        <g opacity={on(f, roulette, 8)}><Wheel cx={400} cy={300} r={70} rot={f} numbers={false} /><Label x={560} y={318} text="ROULETTE" size={44} font="Bebas Neue" color={P.ink} /></g>
        <rect x={130} y={400} width={560} height={390} rx={20} fill="none" stroke={P.gold} strokeWidth={6} opacity={on(f, h53, 8) * (1 - on(f, blackjack, 8))} />
        <rect x={1240} y={400} width={560} height={390} rx={20} fill="none" stroke={P.gold} strokeWidth={6} opacity={on(f, h54, 8) * (1 - on(f, though, 8))} />
        <g opacity={on(f, though, 8)}><rect x={1270} y={820} width={500} height={60} rx={14} fill={P.coral} opacity={0.15 + 0.1 * Math.sin(f / 4)} /></g>
        <Block x={160} y={430} kept={16} t={easeInOut(span(f, b16, b16 + 30))} tx={780} ty={930} show={on(f, strip - 10, 24)} />
        <g opacity={on(f, turned, 8)}><Label x={400} y={830} text="$100 TURNED INTO CHIPS" size={46} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, blackjack, 8)}>
          <g transform="translate(1430 300)"><rect x={-60} y={-60} width={70} height={100} rx={10} fill="#FFFFFF" transform="rotate(-8)" /><rect x={-10} y={-60} width={70} height={100} rx={10} fill="#FFFFFF" transform="rotate(8)" /></g>
          <Label x={1600} y={318} text="BLACKJACK" size={44} font="Bebas Neue" color={P.ink} />
          <Block x={1270} y={430} kept={14} t={easeInOut(span(f, b14, b14 + 30))} tx={1140} ty={930} show={on(f, blackjack, 24)} />
        </g>
        <g opacity={on(f, edge54, 8)}><rect x={1270} y={820} width={500} height={60} rx={14} fill={P.card} /><rect x={1282} y={832} width={lerp(30, 10, on(f, less54, 10))} height={36} rx={4} fill={P.coral} /><Label x={1530} y={866} text={f >= b1 ? 'EDGE ≈ 1% OR LESS' : 'EDGE'} size={40} font="Bebas Neue" color={P.coralInk} /></g>
        <g transform={`translate(960 940) scale(${1 + 0.12 * on(f, industry, 10)}) translate(-960 -940)`}><Tray x={960} y={960} s={0.75} fill={0.2 + 0.3 * on(f, b16 + 20, 20) + 0.25 * on(f, b14 + 20, 20)} label={f >= hold ? 'HOLD' : 'HOUSE'} /></g>
      </g>}
      {/* # C: hold bar vs edge bar; arrows circle the block; one player walks away, another pockets chips */}
      {Cp > 0 && <g opacity={Cp}>
        <g transform="translate(1440 900)">
          <rect x={-150} y={-560 * on(f, bigger, 16)} width={120} height={560 * on(f, bigger, 16)} rx={14} fill={P.gold} /><Label x={-90} y={60} text="HOLD 16%" size={50} font="Bebas Neue" color={P.goldInk} />
          <rect x={60} y={-185 * on(f, edge56, 12)} width={120} height={185 * on(f, edge56, 12)} rx={14} fill={P.coral} /><Label x={120} y={60} text="EDGE 5.3%" size={50} font="Bebas Neue" color={P.coralInk} />
        </g>
        {/* # the same chips go round and round */}
        <g opacity={on(f, same, 8)}>
          <ellipse cx={600} cy={560} rx={380} ry={220} fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="6 16" />
          {Array.from({ length: 6 }, (_, k) => { const u = (f - same) / 70 + k / 6, a = u * Math.PI * 2; return <Chip key={k} x={600 + Math.cos(a) * 380} y={560 + Math.sin(a) * 220} s={0.7} color={CHIP.red} /> })}
          <g opacity={on(f, times, 8)}><Label x={600} y={575} text="BET MANY TIMES" size={60} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, walks, 8)}><Person f={f} who="buyer" beats={[[0, 'walkA', 'smiling', 'walkB', 10]] as Beat[]} x={lerp(600, 1000, span(f, walks, walks + 60))} y={1040} s={0.7} /></g>
      </g>}
      {/* # D: imperfect measure (moves tables, pockets chips); 3 edge bars = the hold bar; $359M */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, alone - 4, 10)}>
          <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [move, 'walkA', 'neutral', 'walkB', 10], [leave, 'pockets', 'smug']] as Beat[]} x={lerp(380, 620, easeInOut(span(f, move, leave)))} y={1000} s={0.9} />
          {f >= leave && f < pocket + 10 && <Chip x={lerp(760, 640, easeInOut(span(f, leave, pocket)))} y={lerp(600, 800, easeInOut(span(f, leave, pocket)))} s={0.7} color={CHIP.red} />}
          <g transform="translate(1300 900)">
            <rect x={-160} y={-560} width={120} height={560} rx={14} fill={P.gold} opacity={0.9} /><Label x={-100} y={60} text="HOLD" size={50} font="Bebas Neue" color={P.goldInk} />
            {[0, 1, 2].map((k) => { const t = easeInOut(span(f, roulette58 + k * 6, b3 + k * 6)); return <g key={k} opacity={on(f, roulette58 + k * 6, 8)}><rect x={lerp(160, 20, t)} y={-185 * (k + 1) - 4 * k} width={120} height={185} rx={14} fill={P.coral} /></g> })}
            <g opacity={on(f, edge58, 8)}><Label x={80} y={60} text="3 × EDGE" size={50} font="Bebas Neue" color={P.coralInk} /></g>
          </g>
          <g opacity={on(f, american, 8)}><Wheel cx={1700} cy={300} r={90} rot={f} numbers={false} /></g>
        </g>
        <g opacity={on(f, alone - 4, 10)}>
          {Array.from({ length: 40 }, (_, k) => { const t = on(f, alone + k * 1.2, 10); return <Chip key={k} x={660 + (k % 8) * 86 - (Math.floor(k / 8) % 2) * 43} y={920 - Math.floor(k / 8) * 64} s={1.25 * t} color={k % 3 ? CHIP.gold : '#F2D27A'} /> })}
          <g opacity={on(f, b359, 8)}><Label x={960} y={460} text="$359M" size={150} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, year, 8)}><Label x={960} y={1010} text="STRIP ROULETTE · ONE YEAR" size={48} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}
      {/* # E: back at the tables — players cheering while the tray fills */}
      {E > 0 && <g opacity={E}>
                <g opacity={on(f, why, 8)}><Label x={1360} y={640} text="?" size={140} font="Bebas Neue" color={P.goldInk} /></g>
        {[['buyer', 420], ['investor', 680], ['worker', 940]].map(([who, x], k) => <g key={k} opacity={on(f, strange + k * 3, 8)}><Person f={f} who={who as string} beats={[[0, 'idle', 'neutral'], [feel + k * 3, 'celebrate', 'smiling'], [winning, k === 1 ? 'fistPump' : 'clapA', 'smiling', k === 1 ? undefined : 'clapB', 8]] as Beat[]} x={x as number} y={840} s={0.8} /></g>)}
        <Table x={900} y={720} w={1300} d={260} />
        <Tray x={1360} y={900} s={0.8} fill={0.3 + 0.3 * on(f, takes, 16) + 0.3 * on(f, winning, 20)} label="HOUSE" />
        {[420, 680, 940].map((x, k) => <Stack key={k} x={x} y={830} n={6 + k} s={0.8} color={[CHIP.red, CHIP.blue, CHIP.green][k]} />)}
      </g>}
      <Vignette id="cs-hold" />
    </g>
  )
}

const BEATS = ['s53:100', 's54:100', 's54:though', 's54:less', 's55:industry', 's61:takes', 's61:why', 's61:players', 's51:model', "s52:nevada's", 's52:publishes', 's52:type', 's52:keeps', 's53:roulette', 's53:strip', 's53:16', 's53:turned', 's53:chips', 's54:blackjack', 's54:14', 's54:edge', 's54:1', 's55:hold',
  's56:bigger', 's56:edge', 's56:same', 's56:times', 's56:walks', 's57:perfect', 's57:move', 's57:leave', 's57:pocket', 's58:roulette', 's58:3', 's58:edge', 's58:american', 's59:alone', 's59:359', 's59:year', 's60:strange', 's61:feel', 's61:winning']
export const CS_HOLD = makePiece('cs-hold', 'Casino long: Nevada report rows; roulette block keeps 16 of 100 chips, blackjack 14 vs a 1% sliver; HOLD vs EDGE bars; chips circle; players move/pocket chips; 3 edge bars = hold; $359M pile; players still cheer', {
  mood: 'dark', Component: Hold, beats: BEATS,
  sfx: [["s52:nevada's", 'flutter', 0.35], ['s53:16', 'coin', 0.45], ['s54:14', 'coin', 0.4], ['s55:hold', 'ding', 0.35], ['s56:bigger', 'riser', 0.3], ['s58:3', 'impact', 0.35], ['s59:359', 'cash', 0.45], ['s61:feel', 'pop', 0.3]] })
