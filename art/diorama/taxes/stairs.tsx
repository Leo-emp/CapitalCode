// ---------------------------------------------------------------- s6–s19: the staircase of buckets.
// A) The myth: a big glass jug of glowing water, YOUR INCOME, on a brass stand; a red 22% sticker slaps on the whole jug,
//    all the water turns red; then a cross on the sticker, and the water splits into seven drops that fly off.
// B) A row of seven glass tanks on a rising brick terrace (the stairs), each with its brass rate plaque and a range tag.
//    Each tank lights as its rate is said. The brass tap opens and the water pours in left to right: the 10% tank fills,
//    overflows through a copper pipe into the 12% tank, then the 22% tank; a gold arrow climbs the stairs; 37% lights last.
// C) The key: under every tank a copper chute drips coins at that tank's own rate. One glowing drop in the 12% tank pays
//    a 12¢ coin; the tanks after it flash but take nothing from it.
// D) A married couple on the first step; the range tags flip to their doubled values with ×2 badges. The tap shuts; a jar
//    waits beside it for the one more step.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { NightWorld, Terrace, Tank, Tap, Stream, Pipe, Coin, Cross, Sign, Vig, STEP_X, STEP_Y, RATES, RATE_COL, CAPS, TXT, INK, BRASS, BRASS2, CORAL, WARM, WATER, GLASS, PAPER, Life } from './kit'

const MFJ = ['$0–24,800', '$24,800–100,800', '$100,800–211,400', '$211,400–403,550', '$403,550–512,450', '$512,450–768,700', '$768,700+']
const H = 260, W = 150

const Stairs: React.FC<PieceProps> = ({ f, c }) => {
  const brackets = c('s6:brackets'), sticker = c('s6:sticker'), whole = c('s6:whole')
  const earn = c('s7:earn'), d22 = c('s7:22'), every = c('s7:every'), taxed = c('s7:taxed')
  const mistake = c('s8:mistake'), one = c('s8:one'), split = c('s8:split'), pieces = c('s8:pieces')
  const row = c('s9:row'), holds = c('s9:holds'), amount = c('s9:amount'), rate9 = c('s9:rate')
  const y2026 = c('s10:2026'), seven = c('s10:seven')
  const rAt = [c('s10:10'), c('s10:12'), c('s10:22'), c('s10:24'), c('s10:32'), c('s10:35'), c('s10:37')]
  const fills = c('s11:fills'), order = c('s11:order'), left = c('s11:left'), right = c('s11:right'), pouring = c('s11:pouring')
  const first12 = c('s12:first'), d12400 = c('s12:12400'), b10 = c('s12:bucket')
  const full = c('s13:full'), spill = c('s13:spill'), b12 = c('s13:12'), d50400 = c('s13:50400')
  const b22 = c('s14:22'), d105700 = c('s14:105700'), stairs = c('s14:stairs')
  const top = c('s15:top'), b37 = c('s15:37'), d640600 = c('s15:640600')
  const key = c('s16:key'), touches = c('s16:touches'), inside = c('s16:inside')
  const dollar17 = c('s17:dollar'), taxed17 = c('s17:taxed'), matter = c('s17:matter'), after = c('s17:after')
  const married = c('s18:married'), filing = c('s18:filing'), lines18 = c('s18:lines'), double = c('s18:double')
  const before = c('s19:before'), step19 = c('s19:step')

  const A = 1 - on(f, row - 6, 12), B = on(f, row - 6, 12)
  // # fill levels: tank 0 fills on s12, tank 1 on s13, tank 2 on s14 (the rest stay as they are: the example stops there)
  const lv = [on(f, d12400, 40), on(f, spill, 50) * 1, on(f, b22, 50) * 0.55, 0, 0, 0, 0]
  const lit = (k: number) => win(f, rAt[k], rAt[k] + 22, 6) + (k === 0 ? win(f, d12400, full, 6) : 0) + (k === 1 ? win(f, b12, b22, 6) : 0) + (k === 2 ? win(f, b22, top, 6) : 0) + (k === 6 ? win(f, b37, key, 6) : 0)
  const capLitAt = [win(f, d12400, full, 6), win(f, d50400, b22, 6), win(f, d105700, top, 6), 0, 0, 0, win(f, d640600, key, 6)]
  const dbl = on(f, double, 12)
  const couple: Beat[] = [[married, 'idle', 'smiling'], [filing, 'hug', 'smiling'], [double, 'thumbsUp', 'smiling']]

  return (
    <g>
      <NightWorld f={f} id="tx-stairs" />
      {/* # A) the myth: one sticker on the whole jug */}
      {A > 0.001 && <g opacity={A}>
        <rect x={0} y={900} width={1920} height={200} fill="#2A2350" />
        <g transform="translate(960 900)">
          <rect x={-200} y={-40} width={400} height={40} rx={10} fill={BRASS} stroke={BRASS2} strokeWidth={4} />
          {/* jug */}
          <g opacity={1 - on(f, split, 12)}>
            <path d="M-170 -60 Q-210 -330 -110 -470 L110 -470 Q210 -330 170 -60 Z" fill={GLASS} opacity={0.22} />
            <path d={`M-162 -90 Q-190 -300 -120 -400 Q0 ${-412 + 6 * Math.sin(f / 7)} 120 -400 Q190 -300 162 -90 Z`} fill={on(f, every, 14) > 0.5 ? CORAL : WATER} opacity={0.85} />
            <path d="M-170 -60 Q-210 -330 -110 -470 L110 -470 Q210 -330 170 -60 Z" fill="none" stroke={GLASS} strokeWidth={6} />
            <rect x={-120} y={-500} width={240} height={40} rx={10} fill={BRASS} stroke={BRASS2} strokeWidth={4} />
            <g opacity={on(f, brackets, 8)}><Sign x={0} y={-150} t="YOUR INCOME" size={48} /></g>
            {/* the one-sticker myth */}
            <g opacity={on(f, sticker, 6)} transform={`translate(0 -300) rotate(-8) scale(${pop(f, sticker, 12)})`}>
              <circle r={96} fill={CORAL} stroke="#FFFFFF" strokeWidth={10} />
              <text y={30} textAnchor="middle" fill="#FFFFFF" style={TXT(f >= d22 ? 92 : 40)}>{f >= d22 ? '22%' : 'ONE RATE'}</text>
            </g>
            <g opacity={on(f, mistake, 8)}><Cross x={0} y={-300} s={1.25} /></g>
          </g>
          {/* split into pieces: seven drops fly right into a row */}
          {RATE_COL.map((col, k) => { const t = on(f, split + k * 2, 22); return <g key={k} opacity={on(f, split, 6) * (1 - on(f, pieces + 12, 10))} transform={`translate(${lerp(0, -600 + k * 200, t)} ${lerp(-260, -320 - 40 * Math.sin(k), t)})`}>
            <path d="M0 -50 Q38 0 0 40 Q-38 0 0 -50 Z" fill={col} stroke="#FFFFFF" strokeWidth={4} />
          </g> })}
        </g>
        {/* every dollar taxed: coral coins rain from the jug */}
        <g opacity={win(f, taxed, mistake, 6)}>{[0, 1, 2, 3, 4].map((k) => <Coin key={k} x={720 + k * 120} y={lerp(560, 830, ((f - taxed) / 30 + k * 0.2) % 1)} s={0.9} t="22" />)}</g>
        <g opacity={win(f, earn, every, 8)}><Sign x={1500} y={700} t="A 22% PERSON?" size={50} /></g>
      </g>}

      {/* # B–D) the waterworks */}
      {B > 0.001 && <g opacity={B}>
        <Terrace n={7} />
        <g opacity={on(f, y2026, 8) * (1 - on(f, seven - 8, 8))}><Sign x={1500} y={330} t="2026 · SINGLE FILER" size={46} /></g>
        <g opacity={win(f, seven + 2, fills, 8)}><Sign x={1500} y={330} t="7 BUCKETS" size={50} /></g>
        {/* the tap and its stream into tank 0 */}
        <g opacity={on(f, fills - 10, 10)}>
          <Tap x={150} y={300} open={on(f, fills, 20) * (1 - on(f, married - 12, 20))} />
          <Stream x={STEP_X(0)} y0={340} y1={STEP_Y(0) - H * (0.1 + 0.85 * lv[0]) + 20} f={f} o={on(f, pouring - 20, 10) * (1 - on(f, married - 12, 8))} />
        </g>
        {/* overflow pipes between neighbouring tanks */}
        {[0, 1].map((k) => <g key={k} opacity={on(f, k === 0 ? spill - 8 : b22 - 8, 10)}>
          <Pipe pts={[[STEP_X(k) + W / 2 - 4, STEP_Y(k) - H + 26], [STEP_X(k) + 121, STEP_Y(k) - H + 26], [STEP_X(k) + 121, STEP_Y(k + 1) - H - 30], [STEP_X(k + 1) - 20, STEP_Y(k + 1) - H - 30]]} w={20} />
          <Stream x={STEP_X(k + 1) - 20} y0={STEP_Y(k + 1) - H - 20} y1={STEP_Y(k + 1) - H * (0.1 + 0.85 * lv[k + 1]) + 16} f={f} w={16} o={win(f, k === 0 ? spill : b22, k === 0 ? b22 + 20 : top, 8)} />
        </g>)}
        {RATES.map((r, k) => {
          const show = on(f, row + k * 3, 10), dropIn = 40 * (1 - on(f, row + k * 3, 14))
          const dim = 1 - 0.45 * (win(f, dollar17, after + 30, 8) * (k === 1 ? 0 : 1)) - (k === 0 ? on(f, married - 8, 10) : 0)
          return <g key={k} opacity={show * dim} transform={`translate(0 ${-dropIn})`}>
            <Tank x={STEP_X(k)} y={STEP_Y(k)} w={W} h={H} level={lv[k]} rate={r} col={RATE_COL[k]} f={f}
              lit={Math.min(1, lit(k) + win(f, rate9, y2026, 8) + win(f, matter + 3 * k, matter + 3 * k + 12, 4) * (k > 1 ? 1 : 0))}
              cap={dbl > 0.5 ? MFJ[k] : CAPS[k]} capO={on(f, holds + k * 2, 8)} capBelow capLit={capLitAt[k]} />
            {k < 5 && <g opacity={dbl} transform={`translate(${STEP_X(k) + 104} ${STEP_Y(k) + 70}) scale(${pop(f, double + k * 3, 10)})`}><circle r={24} fill={CORAL} /><text y={10} textAnchor="middle" fill="#FFFFFF" style={TXT(30)}>×2</text></g>}
          </g>
        })}
        {/* the gold arrow climbing the stairs */}
        <g opacity={win(f, stairs, top + 10, 8)}>
          {[2, 3, 4, 5].map((k) => <path key={k} d={`M${STEP_X(k) + 60} ${STEP_Y(k) - 20} L${STEP_X(k + 1) - 60} ${STEP_Y(k + 1) - 20}`} stroke={WARM} strokeWidth={10} strokeLinecap="round" opacity={on(f, stairs + (k - 2) * 5, 6)} />)}
          <path d={`M${STEP_X(6) - 60} ${STEP_Y(6) - 20} l-26 -6 l10 24 z`} fill={WARM} opacity={on(f, stairs + 20, 6)} />
        </g>
        {/* left-to-right arrow on "in order" */}
        <g opacity={win(f, order, pouring + 10, 8)}>
          <path d={`M${STEP_X(0)} 1050 L${lerp(STEP_X(0), STEP_X(6), on(f, left, 30))} 1050`} stroke={WARM} strokeWidth={12} strokeLinecap="round" />
          <path d={`M${lerp(STEP_X(0), STEP_X(6), on(f, left, 30)) + 6} 1050 l-30 -18 l0 36 z`} fill={WARM} opacity={on(f, right, 6)} />
        </g>

        {/* # C) each tank's own chute: coins drip at its own rate */}
        <g opacity={win(f, key, married - 6, 10)}>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, touches + k * 5, 8)}>
            <rect x={STEP_X(k) - W / 2 - 34} y={STEP_Y(k) - 120} width={30} height={60} rx={6} fill={COPPER_DARK} />
            <Coin x={STEP_X(k) - W / 2 - 19} y={STEP_Y(k) - 120 + 140 * (((f - touches) / 24 + k * 0.3) % 1)} s={0.6} t={RATES[k].replace('%', '')} />
          </g>)}
          <g opacity={on(f, inside, 8) * (1 - on(f, dollar17, 8))}><Sign x={1300} y={330} t="EACH RATE: ONLY ITS OWN DOLLARS" size={42} /></g>
        </g>
        {/* one glowing drop in the 12% tank pays a 12¢ coin */}
        <g opacity={win(f, dollar17, married - 6, 8)}>
          <g transform={`translate(${STEP_X(1)} ${STEP_Y(1) - 140})`}><circle r={30} fill="#FFFFFF" opacity={0.35 + 0.2 * Math.sin(f / 4)} /><path d="M0 -24 Q18 0 0 20 Q-18 0 0 -24 Z" fill={WARM} /></g>
          <g opacity={on(f, taxed17, 8)} transform={`translate(1060 400) scale(${pop(f, taxed17, 12)})`}><rect x={-140} y={-46} width={280} height={84} rx={14} fill={PAPER} stroke={BRASS2} strokeWidth={3} /><text y={14} textAnchor="middle" fill={INK} style={TXT(48)}>$1 → PAYS 12¢</text></g>
        </g>

        {/* # D) married couple on the first step */}
        <g opacity={win(f, married - 4, before + 10, 10)}>
          <Person f={f} who="investorF" beats={couple} x={STEP_X(0) - 50} y={STEP_Y(0)} s={0.42} />
          <Person f={f} who="investor" beats={couple} x={STEP_X(0) + 55} y={STEP_Y(0)} s={0.42} flip />
          <g opacity={on(f, lines18, 8)}><Sign x={960} y={330} t="MARRIED, FILING TOGETHER" size={44} /></g>
        </g>
        <g opacity={on(f, step19, 10)} transform={`translate(560 360) scale(${pop(f, step19, 12)})`}><circle r={64} fill={BRASS} stroke={BRASS2} strokeWidth={6} /><text y={28} textAnchor="middle" fill={INK} style={TXT(80)}>1</text></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s7:percent#2")} x={960} y={520} kind="glint" />
        <Life f={f} at={c("s9:one")} x={716} y={780} kind="ripple" />
        <Life f={f} at={c("s12:a")} x={230} y={830} kind="ripple" />
        <Life f={f} at={c("s12:10")} x={230} y={830} kind="ripple" />
        <Life f={f} at={c("s12:income")} x={230} y={830} kind="ripple" />
        <Life f={f} at={c("s19:filled")} x={960} y={760} kind="ripple" />
      </g>
      {/* # life:end */}
      <Vig id="tx-stairs" />
      <Headline f={f} lines={[[brackets, 'WHAT MOST PEOPLE PICTURE', '#FFFFFF', 84], [row, 'A ROW OF BUCKETS', '#FFFFFF', 92], [fills, 'FILLED IN ORDER, LEFT TO RIGHT', '#FFFFFF', 84], [key, 'THE KEY', WARM, 96], [married, 'MARRIED COUPLES', '#FFFFFF', 88], [before, 'ONE MORE STEP FIRST', '#FFFFFF', 88]]} />
    </g>
  )
}
const COPPER_DARK = '#8A4E27'

export const TX_STAIRS = makePiece('tx-stairs', 'The staircase: a glass jug of glowing water YOUR INCOME gets one red 22% sticker and all its water turns red — the myth — then a cross, and the water splits into seven coloured drops; a night waterworks with seven glass tanks on a rising brick terrace, each with a brass rate plaque (10, 12, 22, 24, 32, 35, 37%) and a range tag (2026 single filer); each lights as named; a brass tap pours water in left to right: the 10% tank fills to $12,400, overflows by copper pipe into the 12% tank up to $50,400, then the 22% tank up to $105,700; a gold arrow climbs the stairs to 37% after $640,600; copper chutes drip coins at each tank\'s own rate and one drop in the 12% tank pays 12¢ while the tanks after it take nothing; a married couple on the first step as the tags flip to double (×2); the tap shuts and a jar waits for the one more step.', {
  mood: 'dark', Component: Stairs,
  beats: ["s6:brackets", "s6:sticker", "s6:whole", "s7:earn", "s7:22", "s7:every", "s7:taxed", "s8:mistake", "s8:one", "s8:split", "s8:pieces", "s9:row", "s9:holds", "s9:amount", "s9:rate", "s10:2026", "s10:seven", "s11:fills", "s11:order", "s11:left", "s11:right", "s11:pouring", "s12:12400", "s13:full", "s13:spill", "s13:12", "s13:50400", "s14:22", "s14:105700", "s14:stairs", "s15:top", "s15:37", "s15:640600", "s16:key", "s16:touches", "s16:inside", "s17:dollar", "s17:taxed", "s17:matter", "s17:after", "s18:married", "s18:filing", "s18:lines", "s18:double", "s19:before", "s19:step", "s10:10", "s10:12", "s10:22", "s10:24", "s10:32", "s10:35", "s10:37", "s7:percent#2", "s9:one", "s12:a", "s12:10", "s12:income", "s19:filled"],
  sfx: [['s6:sticker', 'thud', 0.12], ['s8:mistake', 'thud', 0.12], ['s11:pouring', 'swish', 0.1], ['s13:spill', 'swish', 0.08]] })
