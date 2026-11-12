// ---------------------------------------------------------------- s95–s99: the whole path, and the payoff.
// A) A road from the night office (left) to the sunrise (right); eight numbered posts light one by one with their step names (s95–s96).
// B) Your machine: gauge at zero, YOUR SECOND PAYCHECK: $0 — Leo's was too (s97); a payday envelope feeds it, it starts, and at sunrise it pays envelopes back (s98);
//    a calm wide sunrise holds under the closing line (s99; no logo while the voice speaks, r64).
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { C, City, Defs, Envelope, FONT, Grain, Machine, Tag, fadeIn, scene } from './kit'

const G = 930
const STEPS = ['YOUR NUMBER', 'TWO PAYCHECKS', 'INVEST FIRST', 'GROW THE PILE', 'ASSETS THAT PAY', 'FREEDOM PAYCHECK', 'CROSSOVER', 'LEAVE SAFELY']
const Post: React.FC<{ x: number; y: number; n: number; o: number; lit: number }> = ({ x, y, n, o, lit }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${0.9 + 0.12 * lit})`}><ellipse cx={0} cy={4} rx={30} ry={7} fill="#000" opacity={0.2} /><rect x={-7} y={-120} width={14} height={122} rx={4} fill={C.bark} /><circle cx={0} cy={-140} r={38} fill={lit > 0.5 ? C.sun : C.paper} stroke={C.brassD} strokeWidth={5} /><text y={-126} textAnchor="middle" fill={C.ink} style={{ font: `400 44px ${FONT.big}` }}>{n}</text></g>

const Path: React.FC<PieceProps> = ({ f, c }) => {
  const whole = c('s95:whole'), free = c('s95:free')
  const at = [c('s96:find'), c('s96:know'), c('s96:invest'), c('s96:grow'), c('s96:add'), c('s96:build'), c('s96:reach'), c('s96:leave')]
  const second = c('s97:second'), zero = c('s97:zero'), leos = c("s97:leo's")
  const payday = c('s98:payday'), feed = c('s98:feed'), day = c('s98:day'), starts = c('s98:starts'), good = c('s98:good')
  const AB = c('s97') - 6
  const A = scene(f, -20, AB), B = fadeIn(f, AB)
  const sunUp = span(f, day - 10, good + 20)

  return (
    <g>
      <Defs />
      {A > 0 && <g opacity={A}>
        <rect width={1920} height={1080} fill="url(#ff-night)" />
        <g opacity={span(f, whole - 10, at[7] + 20)}><City sky="gold" f={f} sun={[1760, 640]} ground={G} /></g>
        <path d={`M60 ${G + 70} C 600 ${G + 40} 1200 ${G + 10} 1880 ${G - 40}`} fill="none" stroke={C.paper} strokeWidth={44} strokeLinecap="round" pathLength={1} strokeDasharray={`${span(f, whole - 6, free + 10)} 1`} />
        <Tag x={170} y={G - 140} text="9 TO 5" size={40} o={on(f, c('s95:nine'), 8)} />
        <Tag x={1800} y={G - 120} text="FREE" size={52} o={on(f, free, 8)} color={C.sun} />
        {STEPS.map((t, k) => { const x = lerp(330, 1620, k / 7), y = G + 30 - k * 10
          return <g key={k}><Post x={x} y={y} n={k + 1} o={on(f, at[k] - 4, 6)} lit={on(f, at[k], 6)} />{k === 2 && <circle cx={x} cy={y - 140} r={60} fill="url(#ff-glow)" opacity={win(f, c('s96:rest'), c('s96:rest') + 20, 6)} />}
            <Tag x={x} y={k % 2 ? y - 260 : y - 340} text={t} size={30} o={on(f, at[k], 6)} color={on(f, at[k], 6) > 0.5 && (k === 7 || f < (at[k + 1] ?? 9e9)) ? C.sun : C.cream} /></g> })}
      </g>}
      {B > 0 && <g opacity={B}>
        <rect width={1920} height={1080} fill="url(#ff-night)" />
        <g opacity={sunUp}><City sky="gold" f={f} sun={[1500, lerp(760, 420, sunUp)]} ground={G} /></g>
        <g opacity={1 - sunUp}><City sky="night" f={f} sun={null} ground={G} /></g>
        <Machine x={960} y={G} f={f} s={1.05} o={on(f, c('s97:now') - 4, 8)} run={on(f, starts, 20)} plate="YOUR SECOND PAYCHECK" glow={0.6 * on(f, good - 10, 20)} />
        <Tag x={960} y={G - 480} text="TODAY: $0" size={50} o={win(f, zero - 4, payday, 8)} color={C.red} ink="#fff" />
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [leos, 'waveA', 'smiling', 'waveB', 10], [day, 'relax', 'smiling']]} x={360} y={G} s={0.9} o={on(f, leos - 6, 8)} />
        <Tag x={360} y={G - 560} text="LEO'S WAS TOO" size={38} o={win(f, leos, payday, 8)} />
        {[0, 1, 2].map((k) => { const a = feed + k * 10, t = span(f, a, a + 18); return f >= a && t < 1 ? <g key={k} transform={`translate(${lerp(460, 900, t)} ${lerp(G - 300, G - 120, t) - 100 * Math.sin(Math.PI * t)}) scale(0.55)`}><Envelope x={0} y={0} text="PAY" /></g> : null })}
        <Tag x={600} y={G + 60} text="EVERY PAYDAY, FEED IT" size={38} o={on(f, payday, 8) * (1 - on(f, day - 6, 8))} point="none" />
        {[0, 1, 2, 3].map((k) => { const a = starts + 10 + k * 26, t = span(f, a, a + 26); return f >= a && t < 1 ? <g key={k} transform={`translate(${lerp(1080, 1500, t)} ${lerp(G - 110, G - 240, t) - 80 * Math.sin(Math.PI * t)}) scale(0.55)`}><Envelope x={0} y={0} text="$" color={C.cashL} /></g> : null })}
        <Tag x={960} y={G - 520} text={f >= c('s99:not') ? 'HOW THE MONEY WORKS · NOT PERSONAL ADVICE' : 'HOW THE MONEY WORKS'} size={34} o={on(f, c('s99:money'), 8)} point="none" />
        <Tag x={1500} y={G + 60} text="IT PAYS YOU BACK, FOR GOOD" size={40} o={on(f, good - 6, 8)} point="none" color={C.cash} ink="#fff" />
      </g>}
      <Headline f={f} lines={[[whole, 'THE WHOLE PATH', C.cream, 108], [second, 'YOUR SECOND PAYCHECK', C.cream, 104], [day, 'ONE DAY IT PAYS YOU', C.ink, 104]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s97:now", "s96:rest", "s99:not", "s99:money", 's95:whole', 's95:nine', 's95:free', 's96:find', 's96:know', 's96:invest', 's96:grow', 's96:add', 's96:build', 's96:reach', 's96:leave', 's97:second', 's97:zero', "s97:leo's", 's98:payday', 's98:feed', 's98:day', 's98:starts', 's98:good']
export const FF_PATH = makePiece('ff-path', 'Freedom recap: a night-to-sunrise road from 9 TO 5 to FREE with eight numbered posts lighting in turn (YOUR NUMBER, TWO PAYCHECKS, INVEST FIRST, GROW THE PILE, ASSETS THAT PAY, FREEDOM PAYCHECK, CROSSOVER, LEAVE SAFELY); a brass YOUR SECOND PAYCHECK machine at night, TODAY: $0, Leo waves (LEO\'S WAS TOO); pay envelopes feed it (EVERY PAYDAY, FEED IT), the sun rises and it pays envelopes back (IT PAYS YOU BACK, FOR GOOD)', {
  mood: 'light', Component: Path, beats: BEATS,
  sfx: [['s96:find', 'pop', 0.1], ['s96:know', 'pop', 0.1], ['s96:invest', 'pop', 0.1], ['s96:grow', 'pop', 0.1], ['s96:add', 'pop', 0.1], ['s96:build', 'pop', 0.1], ['s96:reach', 'pop', 0.1], ['s96:leave', 'pop', 0.1], ['s98:starts', 'chime', 0.15], ['s98:good', 'riser', 0.12]] })
