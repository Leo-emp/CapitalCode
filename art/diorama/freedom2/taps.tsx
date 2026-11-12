// ---------------------------------------------------------------- s66–s74: step six, build the freedom paycheck.
// A) A tall glass tank with a gold line at $60,000 A YEAR (the life). One tap — DIVIDENDS ONLY — pours, and the level stops at about $16,000 (s67–s68);
//    the gap up to the line is marked A LONG WAY (s69).
// B) Bengen's test: the whole $1.5M jar, a 4% slice lifts off the top each year (s70).
// C) Four taps over the tank: dividends, interest and rent pour cash (s71), then a fourth tap — a small slice of gains — fills the rest (s72);
//    a red FAIL stamp acted out and crossed, "what the gains were for", and a 33-year calendar tick (s73); the tank full at the line: $60,000 A YEAR,
//    THE FREEDOM PAYCHECK (s74).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { C, Check, City, Cross, Defs, FONT, Grain, Jar, Tag, Tap, fadeIn, scene } from './kit'

const G = 930
// # the tank: x centre, base y, height 520; segments = [value 0-1 of the line, colour]
const TX = 1080, TH = 420, TW = 420, LINE = 0.86
const Tank: React.FC<{ segs: [number, string][]; o?: number; line?: number }> = ({ segs, o = 1, line = 1 }) => {
  let acc = 0
  return (
    <g opacity={o}>
      <ellipse cx={TX} cy={G + 6} rx={TW * 0.62} ry={18} fill="#000" opacity={0.2} />
      <rect x={TX - TW / 2} y={G - TH} width={TW} height={TH} rx={24} fill="#DDEFF5" opacity={0.5} />
      {segs.map(([v, col], k) => { const h = TH * LINE * Math.max(0, v), y = G - 6 - acc - h; acc += h; return h > 0.5 ? <rect key={k} x={TX - TW / 2 + 8} y={y} width={TW - 16} height={h} rx={k === 0 ? 0 : 4} fill={col} /> : null })}
      <rect x={TX - TW / 2} y={G - TH} width={TW} height={TH} rx={24} fill="none" stroke="#B9D6E0" strokeWidth={8} />
      <rect x={TX - TW / 2 + 16} y={G - TH + 20} width={16} height={TH - 40} rx={8} fill="#fff" opacity={0.35} />
      <g opacity={line}><line x1={TX - TW / 2 - 40} y1={G - 6 - TH * LINE} x2={TX + TW / 2 + 40} y2={G - 6 - TH * LINE} stroke={C.goldD} strokeWidth={8} strokeDasharray="20 12" />
        <text x={TX + TW / 2 + 60} y={G - TH * LINE + 6} fill={C.ink} style={{ font: `400 40px ${FONT.big}` }}>$60,000</text></g>
    </g>
  )
}

const Taps: React.FC<PieceProps> = ({ f, c }) => {
  const build = c('s66:build')
  const mistake = c('s67:mistake'), think = c('s67:think'), dividends67 = c('s67:dividends'), alone = c('s67:alone')
  const whole68 = c('s68:whole'), stock = c('s68:stock'), sixteen = c('s68:sixteen')
  const long = c('s69:long'), sixty69 = c('s69:sixty')
  const rule = c('s70:rule'), never = c('s70:never'), took = c('s70:took'), whole70 = c('s70:whole'), pile70 = c('s70:pile')
  const taps = c('s71:taps'), div71 = c('s71:dividends'), interest = c('s71:interest'), rent = c('s71:rent'), cash = c('s71:cash')
  const sells = c('s72:sells'), slice = c('s72:slice'), gains72 = c('s72:gains'), fill = c('s72:fill'), rest = c('s72:rest')
  const failure = c('s73:failure'), gains73 = c('s73:gains'), bengens73 = c("s73:bengen's"), lasted = c('s73:lasted'), thirty = c('s73:thirty')
  const together = c('s74:together'), sixty74 = c('s74:sixty'), freedom74 = c('s74:freedom')

  const AB = c('s70') - 6, BC = c('s71') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const divOnly = (16 / 60) * span(f, dividends67, sixteen + 10)
  // # C) four segments, each filling on its word (shares are illustrative; together they reach the $60,000 line)
  const s1 = 0.22 * span(f, div71, div71 + 18), s2 = 0.26 * span(f, interest, interest + 18), s3 = 0.2 * span(f, rent, rent + 18), s4 = 0.32 * span(f, slice, fill + 16)

  return (
    <g>
      <Defs />
      {/* # A) dividends alone fall short */}
      {A > 0 && <g opacity={A}>
        <City sky="gold" f={f} sun={[300, 300]} ground={G} />
        <g transform={`translate(${TX} ${G}) scale(${1 + 0.04 * pop(f, c('s66:paycheck'), 14)}) translate(${-TX} ${-G})`}><Tank segs={[[divOnly, C.teal]]} o={on(f, build - 6, 10)} line={on(f, mistake, 10)} /></g>
        <g transform={`translate(${TX - 30} ${G - TH - 40}) scale(${1 + 0.12 * pop(f, c('s68:today'), 12)}) translate(${-(TX - 30)} ${-(G - TH - 40)})`}><Tap x={TX - 30} y={G - TH - 40} f={f} flow={on(f, dividends67, 8) * (1 - on(f, sixteen + 10, 10))} o={on(f, dividends67 - 6, 8)} color={C.teal} /></g>
        <Tag x={TX - 220} y={G - TH - 160} text="DIVIDENDS ONLY" size={38} o={on(f, alone - 6, 8)} color={C.teal} ink="#fff" />
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [think, 'think', 'thinking'], [sixteen, 'shock', 'shocked'], [long, 'shrug', 'worried']]} x={420} y={G} s={0.92} />
        <Tag x={TX} y={G - 6 - TH * LINE * (16 / 60) - 60} text="ABOUT $16,000 A YEAR" size={40 * (1 + 0.12 * pop(f, c('s68:year'), 12))} o={on(f, sixteen, 8)} color={C.sun} point="down" />
        <Tag x={420} y={G + 60} text="$1.5M ALL IN STOCKS" size={36} o={on(f, stock, 8)} point="none" />
        <g opacity={on(f, long - 2, 10)}>
          <path d={`M${TX + TW / 2 + 40} ${G - 6 - TH * LINE * (16 / 60)} L${TX + TW / 2 + 40} ${G - 6 - TH * LINE + 20}`} stroke={C.red} strokeWidth={10} strokeLinecap="round" />
          <path d={`M${TX + TW / 2 + 20} ${G - 6 - TH * LINE + 46} L${TX + TW / 2 + 40} ${G - 6 - TH * LINE + 16} L${TX + TW / 2 + 60} ${G - 6 - TH * LINE + 46}`} stroke={C.red} strokeWidth={10} fill="none" strokeLinecap="round" />
          <Tag x={TX + TW / 2 + 200} y={G - 230} text="A LONG WAY" size={40} o={1} color={C.red} ink="#fff" point="none" />
        </g>
      </g>}

      {/* # B) Bengen: 4% of the whole pile */}
      {B > 0 && <g opacity={B}>
        <City sky="gold" f={f} sun={[300, 300]} ground={G} />
        <Jar x={760} y={G} level={0.92} s={1.2 * (1 + 0.05 * pop(f, c("s70:bengen's"), 14))} label="$1.5M" />
        <g transform={`translate(${lerp(760, 1300, span(f, took, whole70 + 10))} ${lerp(G - 440, G - 380, span(f, took, whole70 + 10)) - 120 * Math.sin(Math.PI * span(f, took, whole70 + 10))})`} opacity={on(f, took - 4, 8)}>
          <rect x={-90} y={-36} width={180} height={72} rx={14} fill={C.gold} stroke={C.goldD} strokeWidth={5} /><text y={18} textAnchor="middle" fill={C.ink} style={{ font: `400 52px ${FONT.big}` }}>4%</text>
        </g>
        <Tag x={1300} y={G - 520} text="FROM THE WHOLE PILE" size={42} o={on(f, whole70, 8)} color={C.sun} />
        <Tag x={760} y={G + 60} text="EACH YEAR" size={38} o={on(f, pile70, 8)} point="none" />
        <Tag x={1300} y={G - 200} text="NOT DIVIDENDS ONLY" size={38} o={win(f, never, took, 8)} point="none" />
        <Cross x={1300} y={G - 200} r={130} p={on(f, never + 4, 12) * (1 - on(f, took - 4, 8))} />
        <Tag x={1300} y={G - 120} text="THE 4% RULE" size={38} o={win(f, rule, never - 2, 8)} point="none" />
      </g>}

      {/* # C) four taps fill the freedom paycheck */}
      {Cc > 0 && <g opacity={Cc}>
        <City sky="gold" f={f} sun={[300, 300]} ground={G} />
        <g transform={`translate(${TX} ${G}) scale(${1 + 0.04 * pop(f, c('s71:freedom'), 14)}) translate(${-TX} ${-G})`}><Tank segs={[[s1, C.teal], [s2, '#7D93B8'], [s3, C.brick], [s4, C.leaf]]} /></g>
        <Tag x={TX} y={G + 60} text="FREEDOM PAYCHECK" size={38} o={win(f, c('s71:freedom'), cash, 8)} point="none" color={C.cash} ink="#fff" />
        {[[div71, C.teal, 'DIVIDENDS'], [interest, '#7D93B8', 'INTEREST'], [rent, C.brick, 'RENT'], [slice, C.leaf, 'SLICE OF GAINS']].map(([at, col, t], k) => {
          const x = TX - 330 + k * 220, flow = on(f, at as number, 8) * (1 - on(f, (at as number) + (k === 3 ? fill - slice + 20 : 24), 8))
          return <g key={k} opacity={on(f, k < 3 ? taps - 4 + k * 4 : sells - 4, 8) * (1 - on(f, together - 4, 8))}>
            <Tap x={x} y={G - TH - 60} f={f} flow={flow} s={0.75} color={col as string} />
            <Tag x={x + 20} y={G - TH - 250} text={t as string} size={30} o={on(f, k < 3 ? (at as number) - 2 : slice, 6)} point="none" color={k === 3 ? C.leaf : C.cream} ink={k === 3 ? '#fff' : C.ink} />
          </g> })}
        <Tag x={TX} y={G + 60} text="ARRIVE AS CASH" size={38} o={win(f, cash, sells, 8)} point="none" />
        <Tag x={TX} y={G + 60} text="FILLS THE REST" size={38} o={win(f, fill, failure - 4, 8)} point="none" color={C.leaf} ink="#fff" />
        {/* # s73: a FAIL stamp acted out then crossed; then 33 years */}
        <g opacity={win(f, failure - 6, gains73 + 10, 8)} transform={`translate(420 ${G - 420}) rotate(-10)`}>
          <rect x={-150} y={-80} width={300} height={160} rx={16} fill="none" stroke={C.red} strokeWidth={12} /><text y={34} textAnchor="middle" fill={C.red} style={{ font: `400 100px ${FONT.big}` }}>FAIL</text>
          <Cross x={0} y={0} r={130} p={on(f, failure + 4, 12)} color={C.cashD} />
        </g>
        <Tag x={420} y={G - 220} text="WHAT THE GAINS WERE FOR" size={34} o={win(f, gains73, bengens73, 8)} point="none" color={C.leaf} ink="#fff" />
        <g opacity={win(f, bengens73 - 4, together - 4, 8)} transform={`translate(420 ${G - 160})`}>
          <rect x={-130} y={-260} width={260} height={260} rx={16} fill="#fff" /><rect x={-130} y={-260} width={260} height={60} rx={16} fill={C.red} />
          <text y={-60} textAnchor="middle" fill={C.ink} style={{ font: `400 140px ${FONT.big}` }}>33</text>
          <Check x={120} y={-250} r={36} p={on(f, thirty + 10, 8)} />
          <Tag x={0} y={70} text="STILL LASTED 33+ YEARS" size={34} o={on(f, lasted, 8)} point="none" color={C.cashD} ink="#fff" />
        </g>
        <g opacity={on(f, together - 4, 10)}>
          <Person f={f} who="investor" beats={[[0, 'present', 'smiling'], [freedom74, 'celebrate', 'smiling']]} x={420} y={G} s={0.92} />
          <Tag x={TX} y={G - TH - 40} text={f >= sixty74 ? '$60,000 A YEAR' : '4% OF $1.5M'} size={56} o={on(f, c('s74:million'), 8)} color={f >= sixty74 ? C.sun : C.cream} point="none" />
        </g>
        <circle cx={TX} cy={G - 250} r={360} fill="url(#ff-glow)" opacity={0.5 * on(f, freedom74, 12)} />
        <Tag x={TX} y={G + 60} text="THE FREEDOM PAYCHECK" size={46} o={on(f, freedom74, 8)} point="none" color={C.cash} ink="#fff" />
      </g>}

      <Headline f={f} lines={[[build, 'STEP 6: BUILD THE FREEDOM PAYCHECK', C.ink, 90], [mistake, 'A COMMON MISTAKE', C.ink, 104], [rule, 'THE 4% RULE NEVER NEEDED THAT', C.ink, 96],
        [taps, 'FOUR TAPS', C.ink, 108], [sells, 'PLUS A SMALL SLICE OF GAINS', C.ink, 100], [failure, "SELLING A SLICE ISN'T FAILING", C.ink, 96], [together, 'PUT TOGETHER', C.ink, 108]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s66:paycheck", "s70:bengen's", "s68:year", "s74:million", "s68:today", "s71:freedom", 's66:build', 's67:mistake', 's67:think', 's67:dividends', 's67:alone', 's68:whole', 's68:stock', 's68:sixteen', 's69:long', 's69:sixty', 's70:rule', 's70:never', 's70:took', 's70:whole', 's70:pile',
  's71:taps', 's71:dividends', 's71:interest', 's71:rent', 's71:cash', 's72:sells', 's72:slice', 's72:gains', 's72:fill', 's72:rest', 's73:failure', 's73:gains', "s73:bengen's", 's73:lasted', 's73:thirty', 's74:together', 's74:sixty', 's74:freedom']
export const FF_TAPS = makePiece('ff-taps', 'Freedom step six: a tall glass tank with a dashed $60,000 line; one teal tap (DIVIDENDS ONLY) fills it to ABOUT $16,000 A YEAR while Leo is shocked ($1.5M ALL IN STOCKS), a red arrow up the gap (A LONG WAY); a $1.5M jar, a 4% block lifts off (FROM THE WHOLE PILE, EACH YEAR, NOT DIVIDENDS ONLY crossed); four taps fill the tank in colours: DIVIDENDS, INTEREST, RENT (ARRIVE AS CASH) and SLICE OF GAINS (FILLS THE REST); a red FAIL stamp crossed (WHAT THE GAINS WERE FOR), a 33 calendar ticked (STILL LASTED 33+ YEARS); full tank $60,000 A YEAR, glowing, THE FREEDOM PAYCHECK, Leo celebrates', {
  mood: 'light', Component: Taps, beats: BEATS,
  sfx: [['s68:sixteen', 'pop', 0.15], ['s69:long', 'swish', 0.12], ['s70:took', 'coin', 0.15], ['s71:dividends', 'coin', 0.1], ['s71:interest', 'coin', 0.1], ['s71:rent', 'coin', 0.1], ['s72:slice', 'coin', 0.12], ['s73:failure', 'swish', 0.12], ['s74:freedom', 'chime', 0.2]] })
