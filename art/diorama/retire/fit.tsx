// ---------------------------------------------------------------- s62–s68: step six, how the pieces fit (the two boxes side by side, held as one comparison).
// The 401(K) box (left, a WORK badge) and the IRA box (right, a key: YOU OPEN IT). Each fills to its own limit bar
// ($24,500 / $7,500); a gold MATCH coin sits only on the 401(K); a row of many plants grows beside the IRA (choice).
// A TRAD | ROTH switch appears on each box; a little arrow says LOWER LATER → TRADITIONAL, HIGHER LATER → ROTH.
// Then the match maths: $2,760 + $1,380 = $4,140 a year; +50¢ on every $1 on day one.
// Finally the 401(K) box fades out and the IRA slides to the centre as the main box (if your job has no 401(k)).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Box, Coin, GreenRoom, Label, Plant, R } from './kit'

const G = 920

const Switch: React.FC<{ x: number; y: number; o: number; side: number }> = ({ x, y, o, side }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-130} y={-34} width={260} height={68} rx={34} fill={R.ink} />
    <rect x={-124 + 124 * side} y={-28} width={124} height={56} rx={28} fill={side > 0.5 ? R.gold : R.slate} />
    <text x={-62} y={12} textAnchor="middle" fill={R.paper} style={BB(30)}>TRAD</text><text x={62} y={12} textAnchor="middle" fill={R.paper} style={BB(30)}>ROTH</text>
  </g>
)

const Fit: React.FC<PieceProps> = ({ f, c }) => {
  const put62 = c('s62:put'), boxes62 = c("s62:jordan's"), side62 = c('s62:side'), side62b = c('s62:side#2')
  const k401 = c('s63:401k'), work63 = c('s63:work'), holds63 = c('s63:holds'), n24500 = c('s63:24500'), only63 = c('s63:only'), match63 = c('s63:match')
  const ira64 = c('s64:ira'), open64 = c('s64:open'), holds64 = c('s64:holds'), n7500 = c('s64:7500'), more64 = c('s64:more'), investments64 = c('s64:investments'), choose64 = c('s64:choose')
  const each65 = c('s65:each'), traditional65 = c('s65:traditional'), roth65 = c('s65:roth'), lower65 = c('s65:lower'), later65 = c('s65:later'), roth65b = c('s65:roth#2'), higher65 = c('s65:higher')
  const match66 = c('s66:match'), changes66 = c('s66:changes'), fastest66 = c('s66:fastest'), n2760 = c('s66:2760'), becomes66 = c('s66:becomes'), n4140 = c('s66:4140'), year66 = c('s66:year'), growth66 = c('s66:growth')
  const n50 = c('s67:50'), cents67 = c('s67:cents'), every67 = c('s67:every'), puts67 = c('s67:puts'), first67 = c('s67:first'), day67 = c('s67:day')
  const job68 = c("s68:jordan's"), no68 = c('s68:no'), k401b = c('s68:401k'), ira68 = c('s68:ira'), main68 = c('s68:main'), box68 = c('s68:box'), same68 = c('s68:same'), choice68 = c('s68:choice')

  const solo = on(f, no68, 14)
  const kFill = span(f, holds63, n24500 + 10), iFill = span(f, holds64, n7500 + 10)
  const helps65 = c('s65:helps'), rate65 = c('s65:rate')
  const jBeats: Beat[] = [[0, 'present', 'smiling'], [k401, 'point', 'neutral'], [ira64, 'point', 'neutral'], [each65, 'weighA', 'thinking', 'weighB', 18], [helps65, 'point', 'neutral'], [rate65, 'think', 'thinking'], [match66, 'pointUp', 'smiling'], [n4140, 'celebrate', 'smiling'], [n50, 'countOne', 'smiling'], [no68, 'shrug', 'neutral'], [main68, 'thumbsUp', 'smiling']]
  const coinT = span(f, n2760, n4140 + 10)

  return (
    <g>
      <GreenRoom id="rt-f" f={f} mood="day" floor={G} />
      <Person f={f} who="investor" beats={jBeats} x={260} y={G + 10} s={0.9} />
      {/* the 401(k) box */}
      <g opacity={on(f, put62, 10) * (1 - solo)} transform={`translate(${lerp(-300, 0, on(f, side62, 14))} 0)`}>
        <Box x={760} y={G} s={0.95} tag="401(K)" tagColor={R.gold} glow={on(f, k401, 10) * (1 - on(f, ira64, 10))}>
          {Array.from({ length: Math.round(14 * kFill) }, (_, k) => <ellipse key={k} cx={0} cy={-50 - k * 16} rx={80} ry={13} fill={R.leaf} stroke={R.forestD} strokeWidth={3} />)}
        </Box>
        <g opacity={on(f, work63, 8)}><Label x={760} y={G + 60} text={f >= n24500 ? 'FROM WORK · $24,500 A YEAR' : 'FROM WORK'} size={34} /></g>
        <g opacity={on(f, match63, 8)}><Coin x={960} y={G - 380 - 10 * pop(f, match63, 12)} s={1.2} text="MATCH" /><Label x={960} y={G - 470} text={f >= only63 ? 'ONLY HERE' : ''} size={32} fill={R.gold} o={1 - on(f, match66 - 4, 8)} /></g>
        <Switch x={760} y={G - 560} o={on(f, traditional65, 8) * (1 - on(f, match66 - 4, 8))} side={on(f, roth65, 12) * (1 - on(f, lower65, 12)) + on(f, roth65b, 12)} />
      </g>
      {/* the IRA box */}
      <g opacity={on(f, side62b - 4, 10)} transform={`translate(${lerp(300, 0, on(f, side62b, 14)) + lerp(0, -260, solo)} 0)`}>
        <Box x={1420} y={G - 10 * pop(f, choice68, 14)} s={0.95 * (1 + 0.15 * solo)} tag="IRA" tagColor={R.gold} glow={on(f, ira64, 10) * (1 - on(f, each65, 10)) + on(f, main68, 10)}>
          {Array.from({ length: Math.round(6 * iFill) }, (_, k) => <ellipse key={k} cx={0} cy={-50 - k * 16} rx={80} ry={13} fill={R.leaf} stroke={R.forestD} strokeWidth={3} />)}
        </Box>
        <g opacity={on(f, open64, 8)}><Label x={1420} y={G + 60} text={f >= n7500 ? 'YOU OPEN IT · $7,500 A YEAR' : 'YOU OPEN IT'} size={34} /></g>
        <g opacity={on(f, more64, 8) * (1 - on(f, each65, 8))}>{[0, 1, 2, 3].map((k) => <Plant key={k} x={1660 + (k % 2) * 110} y={G - Math.floor(k / 2) * 250} s={0.45} grow={0.3 + 0.2 * k} f={f + k * 7} leaves={[R.gold, R.leafL, R.pot, R.sky][k]} />)}<Label x={1715} y={G + 60} text={f >= choose64 ? 'MORE TO CHOOSE FROM' : 'CHOICE'} size={30} o={on(f, investments64, 8)} /></g>
        <Switch x={1420} y={G - 560} o={on(f, traditional65, 8) * (1 - on(f, match66 - 4, 8)) + on(f, choice68, 8)} side={on(f, roth65, 12) * (1 - on(f, lower65, 12)) + on(f, roth65b, 12)} />
      </g>
      {/* the rule of thumb for traditional vs Roth */}
      <g opacity={win(f, lower65 - 4, match66, 8)}><Label x={1090} y={250} text={f >= higher65 ? 'HIGHER LATER → ROTH' : f >= later65 ? 'LOWER LATER → TRADITIONAL' : 'EACH CAN BE EITHER'} size={46} fill={f >= higher65 ? R.gold : R.slate} ink={f >= higher65 ? R.ink : R.paper} /></g>
      {/* the match maths */}
      <g opacity={win(f, match66, no68, 8)}>
        <Coin x={lerp(1000, 1090, coinT)} y={230} s={1.4} text="$2,760" o={on(f, n2760, 8)} />
        <Coin x={lerp(1300, 1210, coinT)} y={230} s={1.4} text="$1,380" o={on(f, becomes66 - 6, 8)} />
        <g opacity={on(f, n4140, 8)}><Label x={1150} y={320 - 10 * pop(f, n4140, 14)} text={f >= year66 ? '$4,140 A YEAR, BEFORE GROWTH' : '$4,140'} size={46} fill={R.forest} ink={R.paper} /></g>
        <g opacity={on(f, changes66, 8) * (1 - on(f, n2760, 8))}><Label x={1150} y={260} text={f >= fastest66 ? 'THE FASTEST CHANGE' : 'THE MATCH'} size={46} /></g>
        <g opacity={on(f, cents67, 8)}><Label x={1150} y={400} text={f >= first67 ? '+50¢ PER $1, ON DAY ONE' : '+50¢ PER $1'} size={42} fill={R.gold} /></g>
        <g opacity={on(f, every67, 8)} transform={`translate(${lerp(1080, 1150, span(f, puts67, puts67 + 16))} 580)`}><Coin x={-50} y={0} s={0.9} text="$1" /><Coin x={40} y={0} s={0.6} text="50¢" o={on(f, puts67, 8)} /></g>
      </g>
      <g opacity={on(f, k401b, 8)}><Label x={1150} y={260} text={f >= same68 ? 'SAME TRADITIONAL OR ROTH CHOICE' : 'NO 401(K)? THE IRA IS THE MAIN BOX'} size={44} /></g>
      <Headline f={f} lines={[[put62, 'STEP 6: SIDE BY SIDE', R.ink, 100], [match66, 'THE MATCH MOVES FASTEST', R.ink, 92], [no68, 'NO 401(K) AT WORK?', R.ink, 100]]} />
    </g>
  )
}

export const RT_FIT = makePiece('rt-fit', "Step six, how the pieces fit: Jordan's two glass boxes slide in side by side in the greenhouse; the 401(k) box from work fills with coins to its 24,500-dollar limit and wears a gold MATCH coin (only here); the IRA box you open yourself fills to 7,500 dollars, with a cluster of different plants beside it (more to choose from); a TRAD | ROTH switch on each box flips as the voice says when each helps (lower later → traditional, higher later → Roth); the match maths: a 2,760-dollar coin and a 1,380-dollar coin slide together into 4,140 dollars a year before growth, +50 cents per dollar on day one; then the 401(k) box fades and the IRA box grows into the centre as the main box with the same traditional-or-Roth choice", {
  mood: 'light', Component: Fit,
  beats: ["s62:put", "s62:side", "s62:side#2", "s63:401k", "s63:work", "s63:holds", "s63:24500", "s63:only", "s63:match", "s64:ira", "s64:open", "s64:holds", "s64:7500", "s64:more", "s64:investments", "s64:choose", "s65:each", "s65:traditional", "s65:roth", "s65:lower", "s65:later", "s65:roth#2", "s65:higher", "s66:match", "s66:changes", "s66:fastest", "s66:2760", "s66:becomes", "s66:4140", "s66:year", "s67:50", "s67:cents", "s67:every", "s67:puts", "s67:first", "s68:no", "s68:401k", "s68:main", "s68:same", "s68:choice", "s65:helps", "s65:rate"],
  sfx: [['s66:4140', 'cash', 0.1], ['s68:no', 'whoosh', 0.1]] })
