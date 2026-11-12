// ---------------------------------------------------------------- s93–s101: the whole thing in three steps, at sunrise.
// The waterworks at dawn on a brick base: the tax-free jar (1), three tanks (2), the tax chest (3), each lit with its brass
// number plate as it is named: the jar fills with $16,100; water pours into the tanks in order; coins add up in the chest
// and a few lift out (credits). YOUR BRACKET = the last tank the water reaches (not the rate on all your income); a glowing
// drop: only the new dollars pay the new rate; a little worker lifts a line (every year, with prices). Then Maya and her
// coworker from the office: she points at the buckets, he nods; she holds up her raise: SHE KEEPS MOST OF IT.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { SunriseWorld, Tank, Jar, Chest, Coin, Stream, Pipe, Paycheck, Sign, Cross, BracketLine, Ladder, Vig, TXT, INK, BRASS, BRASS2, CORAL, MINT, WARM, RATE_COL, BRICK, BRICK2, Life } from './kit'

const BASE = 900, TX = [720, 960, 1200], TW = 200, TH = 300
const surfT = (lv: number) => BASE - TH + 18 + (TH - 36) * (1 - lv)

const Plate: React.FC<{ x: number; y: number; n: number; o: number; s: number }> = ({ x, y, n, o, s }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><circle r={56} fill={BRASS} stroke={BRASS2} strokeWidth={6} /><circle r={42} fill="none" stroke="#FFE39A" strokeWidth={3} /><text y={26} textAnchor="middle" fill={INK} style={TXT(74)}>{n}</text></g>
)

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const tax93 = c('s93:tax'), three = c('s93:three')
  const one = c('s94:one'), slice = c('s94:slice'), d16100 = c('s94:16100')
  const two = c('s95:two'), pour = c('s95:pour'), order = c('s95:order'), own = c('s95:own'), touches = c('s95:touches')
  const step3 = c('s96:three'), add = c('s96:add'), subtract = c('s96:subtract'), credits = c('s96:credits')
  const bracket97 = c('s97:bracket'), last = c('s97:last'), reaches = c('s97:reaches'), not97 = c('s97:not'), all97 = c('s97:all')
  const never = c('s98:never'), shrink = c('s98:shrink'), only98 = c('s98:only'), newD = c('s98:new')
  const lines99 = c('s99:lines'), prices = c('s99:prices'), keeps = c('s99:keeps'), creep = c('s99:creep')
  const next = c('s100:next'), someone = c('s100:someone'), push = c('s100:push'), show = c('s100:show'), buckets = c('s100:buckets')
  const still = c('s101:still'), most = c('s101:most')

  const A = 1 - on(f, next - 6, 12), B = on(f, next - 6, 12)
  const lv = [on(f, pour, 24), on(f, pour + 14, 30) * 0.83, on(f, newD, 20) * 0.18]
  const lineLv = lerp(0.88, 0.96, on(f, lines99, 24))
  const maya: Beat[] = [[next, 'idle', 'smiling'], [show, 'point', 'smiling'], [buckets, 'present', 'smiling'], [still, 'holdUp', 'smiling'], [most, 'celebrate', 'smiling']]
  const cow: Beat[] = [[someone, 'shrug', 'worried'], [push, 'pointUp', 'worried'], [buckets, 'nodA', 'smiling', 'nodB', 10], [most, 'thumbsUp', 'smiling']]
  const hp = hand(f, maya, 440, 960, 0.95, false)

  return (
    <g>
      <SunriseWorld f={f} id="tx-payoff" />
      {/* # the dawn waterworks */}
      <g opacity={A > 0.001 ? 1 - 0.55 * B : 1} transform={`translate(${lerp(0, 220, B)} 0)`}>
        <rect x={180} y={BASE} width={1600} height={200} fill={BRICK} /><rect x={180} y={BASE} width={1600} height={14} fill="#A66B55" />
        {Array.from({ length: 6 }, (_, r) => <line key={r} x1={180} x2={1780} y1={BASE + 40 + r * 28} y2={BASE + 40 + r * 28} stroke={BRICK2} strokeWidth={2} opacity={0.6} />)}
        {/* step 1: the jar */}
        <g opacity={1 - B}><Jar x={360} y={BASE} s={0.8} f={f} level={0.75 * on(f, slice, 24)} label={f >= d16100 ? '$16,100' : 'TAX-FREE'} />
        <Plate x={360} y={540} n={1} o={on(f, one, 8)} s={pop(f, one, 12)} /></g>
        {/* step 2: the tanks */}
        <Pipe pts={[[440, BASE - 240], [560, BASE - 240], [560, BASE - TH - 50], [TX[0] - 40, BASE - TH - 50]]} w={20} o={on(f, two - 6, 10) * (1 - B)} />
        <Stream x={TX[0] - 40} y0={BASE - TH - 40} y1={surfT(lv[0]) + 8} f={f} w={18} o={win(f, pour, add, 8)} />
        {TX.map((x, k) => <Tank key={k} x={x} y={BASE} w={TW} h={TH} level={lv[k]} rate={['10%', '12%', '22%'][k]} col={RATE_COL[k]} f={f} lit={win(f, order + k * 6, order + k * 6 + 14, 4) + (k === 1 ? win(f, last, all97 + 20, 6) : 0) + (k === 2 ? win(f, newD, lines99, 6) + win(f, c('s98:higher'), c('s98:takehome'), 6) : 0)} />)}
        <Plate x={960} y={420} n={2} o={on(f, two, 8)} s={pop(f, two, 12)} />
        <g opacity={win(f, own, add, 8)}><Sign x={960} y={300} t="EACH RATE: ONLY ITS OWN DOLLARS" size={42} /></g>
        {/* step 3: the chest */}
        <Chest x={1600} y={BASE} s={0.85} n={on(f, add, 20) * 14 - on(f, subtract, 20) * 4} total={f >= add ? 'TAX' : undefined} />
        <Plate x={1600} y={540} n={3} o={on(f, step3, 8)} s={pop(f, step3, 12)} />
        {[0, 1, 2].map((k) => <g key={k} opacity={win(f, add + k * 6, add + k * 6 + 24, 4)}><Coin x={lerp(TX[k], 1600, on(f, add + k * 6, 22))} y={lerp(BASE - TH - 30, BASE - 170, on(f, add + k * 6, 22)) - 80 * Math.sin(Math.PI * on(f, add + k * 6, 22))} s={0.9} /></g>)}
        <g opacity={win(f, subtract, bracket97, 8)} transform={`translate(0 ${-50 * on(f, subtract, 20)})`}>{[0, 1].map((k) => <Coin key={k} x={1570 + k * 60} y={BASE - 200} s={0.9} />)}<g opacity={on(f, credits, 8)}><Sign x={1600} y={BASE - 270} t="− CREDITS" size={40} col={MINT} tc="#FFFFFF" /></g></g>
        {/* your bracket = the last tank the water reaches */}
        <g opacity={win(f, bracket97, never, 8)}><Sign x={TX[1]} y={BASE - TH - 25} t="YOUR BRACKET" size={44} col={WARM} /></g>
        <g opacity={win(f, not97, never, 8)}><Sign x={1300} y={300} t="NOT THE RATE ON ALL YOUR INCOME" size={40} /></g>
        {/* a take-home slip that cannot shrink */}
        <g opacity={win(f, c('s98:higher'), only98, 8)} transform={`translate(1360 330) scale(${1 - 0.25 * win(f, shrink, shrink + 24, 6)})`}><Paycheck x={0} y={0} s={0.8} title="TAKE-HOME" amount="PAY" /><g opacity={on(f, shrink + 14, 6)}><Cross x={0} y={0} s={0.8} /></g></g>
        {/* only the new dollars pay the new rate */}
        <g opacity={win(f, only98, lines99, 6)}><path d="M0 -24 Q18 0 0 20 Q-18 0 0 -24 Z" fill={WARM} transform={`translate(${TX[2]} ${lerp(BASE - TH, surfT(0.18) - 16, on(f, only98, 20))})`} /><Sign x={TX[2]} y={BASE - TH - 25} t="NEW DOLLARS ONLY" size={40} col={WARM} /></g>
        {/* the line lifts every year */}
        <g opacity={win(f, lines99, next - 6, 8)}>
          <BracketLine x1={TX[2] - TW / 2 - 10} x2={TX[2] + TW / 2 + 10} y={surfT(lineLv)} />
          <Ladder x={TX[2] + TW / 2 + 60} y={BASE} h={300} />
          <g opacity={on(f, prices, 8)}><Sign x={1300} y={300} t="LINES MOVE UP WITH PRICES" size={42} /></g>
        </g>
      </g>
      {/* # Maya shows her coworker the buckets */}
      {B > 0.001 && <g opacity={B}>
        <Person f={f} who="investorF" beats={maya} x={440} y={960} s={0.95} />
        <Person f={f} who="investor" beats={cow} x={170} y={960} s={0.95} />
        {f >= still && <g transform={`translate(${hp.x + 40} ${hp.y - 60}) scale(${pop(f, still, 12)})`}><Paycheck x={0} y={0} s={0.8} title="RAISE" amount="KEPT $8,450" /></g>}
        <g opacity={on(f, most, 8)}><Sign x={1180} y={300} t="SHE KEEPS MOST OF IT" size={60} col={MINT} tc="#FFFFFF" /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s94:2026")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s94:person")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s95:dollars")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s96:bucket")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s98:that")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s99:and")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s99:get")} x={960} y={760} kind="ripple" />
        <Life f={f} at={c("s100:bracket")} x={1000} y={760} kind="ripple" />
      </g>
      <g><Life f={f} at={c("s93:work")} x={960} y={760} kind="ripple" /><Life f={f} at={c("s93:three")} x={1600} y={820} kind="glint" /></g>
      {/* # life:end */}
      <Vig id="tx-payoff" k={0.2} />
      <Headline f={f} lines={[[tax93, 'TAX BRACKETS IN THREE STEPS', INK, 88], [next, 'NEXT TIME, SHOW THEM THE BUCKETS', INK, 80]]} />
    </g>
  )
}

export const TX_PAYOFF = makePiece('tx-payoff', 'Payoff at sunrise: the waterworks on a brick base — the tax-free jar (brass plate 1) fills with $16,100; water pours by copper pipe into three tanks in order (plate 2), each rate only its own dollars; coins add up in the tax chest (plate 3) and two lift out for credits; YOUR BRACKET marks the last tank the water reaches, NOT THE RATE ON ALL YOUR INCOME; a glowing drop shows NEW DOLLARS ONLY at the new rate; a ladder and a lifting line: LINES MOVE UP WITH PRICES; then Maya and her coworker from the office: she points at the buckets, he nods, and she holds up her raise slip KEPT $8,450 — SHE KEEPS MOST OF IT.', {
  mood: 'light', Component: Payoff,
  beats: ["s93:three", "s94:one", "s94:slice", "s94:16100", "s95:two", "s95:pour", "s95:order", "s95:own", "s95:touches", "s96:three", "s96:add", "s96:subtract", "s96:credits", "s97:bracket", "s97:last", "s97:reaches", "s97:not", "s97:all", "s98:never", "s98:shrink", "s98:only", "s98:new", "s99:lines", "s99:prices", "s99:keeps", "s99:creep", "s100:next", "s100:someone", "s100:push", "s100:show", "s100:buckets", "s101:still", "s101:most", "s98:higher", "s98:takehome", "s94:2026", "s94:person", "s95:dollars", "s96:bucket", "s98:that", "s99:and", "s99:get", "s100:bracket", "s93:work"],
  sfx: [['s94:one', 'pop', 0.08], ['s95:two', 'pop', 0.08], ['s96:three', 'pop', 0.08], ['s101:most', 'impact', 0.12]] })
