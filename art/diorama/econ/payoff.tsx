// ---------------------------------------------------------------- s94–s100: the four ideas, the eggs again, the question.
// A) A little town street with four buildings that light up one by one as each idea is said: a clock tower (everything is
//    limited), a lemonade stall with a tug rope (prices from buyers and sellers), a grocer with a basket and red tags
//    (inflation), the central bank with its rate dial (interest).
// B) The egg carton again: its tag swings from $6.23 to $2.35 — no government set either price.
// C) The presenter asks the question: two signposts — FEWER THINGS? (a near-empty carton) or MORE MONEY? (a growing cash stack).
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Basket } from '../money4/kit'
import { Backdrop, Carton, Cash, CentralBank, LemonStand, RateDial, Rope, Tag, TXT, WallClock, GREEN, RED } from './kit'

const GROUND = 930

const Tower: React.FC<{ x: number; f: number }> = ({ x, f }) => (
  <g transform={`translate(${x} ${GROUND}) scale(0.8)`}>
    <rect x={-90} y={-520} width={180} height={520} fill="#D9A86A" stroke="#B5844A" strokeWidth={5} />
    <path d="M-110 -520 L0 -640 L110 -520 Z" fill="#C94A3E" />
    <g transform="translate(0 -420) scale(0.62)"><WallClock x={0} y={0} f={f * 6} /></g>
    <rect x={-40} y={-120} width={80} height={120} rx={10} fill="#6E5236" />
    {[-50, 20].map((wx) => <rect key={wx} x={wx} y={-270} width={30} height={50} rx={6} fill="#BFE4FF" />)}
  </g>
)
const Grocer: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} ${GROUND})`}>
    <rect x={-200} y={-320} width={400} height={320} rx={10} fill="#F3E3C6" />
    {Array.from({ length: 7 }, (_, k) => <path key={k} d={`M${-220 + k * 62.8} -320 l62.8 0 l0 40 q-31.4 30 -62.8 0 z`} fill={k % 2 ? '#FFFFFF' : RED} />)}
    <text y={-338} textAnchor="middle" fill={P.ink} style={TXT(56)}>GROCER</text>
    <rect x={-170} y={-230} width={220} height={150} rx={8} fill="#BFE4FF" opacity={0.85} />
    <g transform="translate(-60 -100) scale(0.5)"><Basket x={0} y={0} shown={8} /></g>
    <rect x={80} y={-200} width={90} height={200} rx={8} fill="#6E5236" />
  </g>
)

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const basic = c('s94:basic'), four = c('s94:four')
  const one = c('s95:one'), limited = c('s95:limited')
  const two = c('s96:two'), buyers = c('s96:buyers'), sellers96 = c('s96:sellers'), pulling = c('s96:pulling'), every96 = c('s96:every'), against96 = c('s96:against'), message = c('s96:message')
  const three = c('s97:three'), spending = c('s97:spending'), board = c('s97:board'), stuff97 = c('s97:stuff'), prices97 = c('s97:prices'), inflation97 = c('s97:inflation'), grows97 = c('s97:grows')
  const four98 = c('s98:four'), money98 = c('s98:money'), raise = c('s98:raise'), cut = c('s98:cut'), warm = c('s98:warm')
  const eggs = c('s99:eggs'), p623 = c('s99:23'), fall = c('s99:fall'), p235 = c('s99:back'), government = c('s99:government')
  const next = c('s100:next'), jumps = c('s100:jumps'), ask = c('s100:ask'), question = c('s100:question'), scarcer = c('s100:scarcer'), money = c('s100:money'), grow = c('s100:grow')

  const A = win(f, 0, eggs - 6), B = win(f, eggs - 6, next - 4), Cw = on(f, next - 4, 10)
  const lit = (a: number, b: number) => win(f, a, b, 8)
  const dial = f >= cut ? lerp(0.8, 0.15, on(f, cut, 20)) * (1 - on(f, warm, 20)) + 0.4 * on(f, warm, 20) : lerp(0.15, 0.8, on(f, raise, 20))
  const hero: Beat[] = [[next - 4, 'idle', 'neutral'], [jumps, 'shock', 'shocked'], [ask, 'pointUp', 'thinking'], [scarcer, 'point', 'thinking'], [money, 'explain', 'neutral'], [grow, 'present', 'smiling']]
  const Glow: React.FC<{ x: number; l: number }> = ({ x, l }) => l > 0 ? <ellipse cx={x} cy={GROUND - 280} rx={260} ry={340} fill={P.gold} opacity={0.22 * l} /> : null
  const Num: React.FC<{ x: number; n: number; at: number; t: string }> = ({ x, n, at, t }) => <g opacity={on(f, at, 8)} transform={`translate(${x} 230) scale(${pop(f, at, 12)})`}>
    <circle r={50} fill={P.ink} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={TXT(60)}>{n}</text>
    <text y={100} textAnchor="middle" fill={P.ink} style={TXT(50)}>{t}</text>
  </g>
  return (
    <g>
      <Stage id="ec-payoff" frame={f} />
      <Backdrop f={f} town={false} />
      <Headline f={f} lines={[[basic, 'BASIC ECONOMICS IN 4 IDEAS', P.ink, 100], [eggs, 'THE EGGS, AGAIN', P.ink, 96], [ask, 'ASK ONE QUESTION', P.goldInk, 100]]} />
      <Ground y={GROUND} />

      {/* # A) the town of four ideas */}
      {A > 0 && <g opacity={A}>
        <Glow x={260} l={lit(one, two)} /><Glow x={720} l={lit(two, three)} /><Glow x={1200} l={lit(three, four98)} /><Glow x={1660} l={lit(four98, eggs)} />
        <g opacity={on(f, basic - 6, 10)}>
          <g opacity={0.55 + 0.45 * on(f, one, 10)}><Tower x={260} f={f} /></g>
          <g opacity={0.55 + 0.45 * on(f, two, 10)}>
            <LemonStand x={720} y={GROUND} s={0.85 * (1 + 0.06 * win(f, every96, message, 5))} price="$2" />
            <g opacity={on(f, buyers, 8)}><Rope x1={560} x2={880} y={560} knot={720 - 40 * on(f, buyers, 10) + 80 * on(f, sellers96, 10) - 40 * on(f, pulling, 10) + 30 * on(f, against96, 8) - 30 * on(f, against96 + 10, 8) + 20 * Math.sin(f / 6) * (1 - on(f, message, 20))} /></g>
          </g>
          <g opacity={0.55 + 0.45 * on(f, three, 10)}>
            <g transform={`translate(1200 ${GROUND}) scale(${1 + 0.05 * win(f, stuff97, prices97, 6)}) translate(-1200 ${-GROUND})`}><Grocer x={1200} /></g>
            {[0, 1, 2].map((k) => <g key={k} opacity={on(f, [prices97, board - 6, board][k], 6)}><Tag x={1060 + k * 140} y={lerp(560, 520, on(f, [prices97, board - 6, board][k], 14))} t="UP" s={0.6} col={RED} ink="#FFFFFF" /></g>)}
          </g>
          <g opacity={0.55 + 0.45 * on(f, four98, 10)}>
            <CentralBank x={1660} y={GROUND} s={0.62} name="CENTRAL BANK" />
            <g opacity={on(f, money98, 8)}><RateDial x={1660} y={470} s={0.55} v={dial} /></g>
          </g>
        </g>
        <Num x={260} n={1} at={one} t="LIMITS" />
        <Num x={720} n={2} at={two} t="PRICES" />
        <Num x={1200} n={3} at={three} t="INFLATION" />
        <Num x={1660} n={4} at={four98} t="INTEREST" />
        <g opacity={win(f, limited, two, 6)}><Label x={260} y={1010} text="EVERY CHOICE COSTS" size={38} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, message, three, 6)}><Label x={720} y={1010} text="A PRICE IS A MESSAGE" size={38} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, inflation97, four98, 6)} transform={`translate(1200 560) scale(${pop(f, inflation97, 12)})`}><rect x={-150} y={-44} width={300} height={80} rx={10} fill={RED} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(54)}>INFLATION</text></g>
        <g opacity={win(f, grows97, four98, 6)}><Cash x={1360} y={GROUND} n={Math.round(lerp(1, 5, on(f, grows97, 20)))} s={0.55} /></g>
        <g opacity={win(f, spending, four98, 6)}><Label x={1200} y={1010} text="MORE MONEY THAN STUFF" size={38} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, raise, eggs, 6)}><Label x={1660} y={1010} text={f >= cut ? 'CUT TO WARM UP' : 'RAISE TO COOL'} size={38} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # B) the eggs again */}
      {B > 0 && <g opacity={B}>
        <rect x={560} y={820} width={800} height={34} rx={8} fill="#C9B18A" /><rect x={580} y={854} width={24} height={76} fill="#A88F66" /><rect x={1316} y={854} width={24} height={76} fill="#A88F66" />
        <Carton x={960} y={820} s={1.6} />
        <g transform={`translate(960 ${500}) rotate(${12 * Math.sin((f - p623) / 8) * win(f, p623, p235, 6)})`}>
          <line x1={0} y1={-150} x2={0} y2={-50} stroke="#8E7A5A" strokeWidth={4} />
          <Tag x={0} y={0} t={f >= p235 ? '$2.35' : '$6.23'} s={1.3} col={f >= p235 ? GREEN : RED} ink="#FFFFFF" />
        </g>
        <g opacity={on(f, government, 8)}><Label x={960} y={330} text="NO GOVERNMENT SET EITHER" size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, fall, 8)}><Label x={1420} y={560} text="AND BACK" size={56} font="Bebas Neue" color={GREEN} /></g>
      </g>}

      {/* # C) the question */}
      {Cw > 0 && <g opacity={Cw}>
        <Person f={f} who="hero" beats={hero} x={360} y={GROUND} s={1.05} />
        <g opacity={on(f, jumps, 8)}><Tag x={660} y={lerp(330, 290, on(f, jumps, 14))} t="PRICE UP" s={0.8} col={RED} ink="#FFFFFF" r={0} /></g>
        {/* two signposts */}
        {([[scarcer, 960, 'FEWER THINGS?'], [money, 1520, 'MORE MONEY?']] as [number, number, string][]).map(([at, x, t], k) => <g key={k} opacity={on(f, k === 0 ? question : money - 6, 8)} transform={`translate(0 ${30 * (1 - pop(f, k === 0 ? question : money - 6, 14))})`}>
          <rect x={x - 12} y={460} width={24} height={GROUND - 460} fill="#8E5B3A" />
          <path d={`M${x - 220} 380 L${x + 190} 380 L${x + 230} 430 L${x + 190} 480 L${x - 220} 480 Z`} fill={k ? '#7FC495' : '#F4C95D'} stroke="#8E5B3A" strokeWidth={5} />
          <text x={x} y={452} textAnchor="middle" fill={P.ink} style={TXT(64)}>{t}</text>
          <g opacity={on(f, at, 8)}>
            {k === 0 ? <g transform={`translate(${x} 800)`}><Carton x={0} y={0} s={0.9} n={Math.round(lerp(12, 2, on(f, at, 30)))} /></g>
              : <g transform={`translate(${x} 860)`}><Cash x={0} y={0} n={Math.round(lerp(2, 9, on(f, grow - 8, 30)))} s={0.9} /></g>}
          </g>
        </g>)}
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s95:choice")} x={260} y={620} rx={200} ry={230} />
        <Spot f={f} at={c("s96:prices")} x={720} y={660} rx={200} ry={230} />
        <Spot f={f} at={c("s98:interest")} x={1660} y={620} rx={200} ry={230} />
        <Spot f={f} at={c("s99:price")} x={960} y={660} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="ec-payoff" />
    </g>
  )
}

export const EC_PAYOFF = makePiece('ec-payoff', 'Payoff: a small town street with four buildings lighting up one by one, numbered 1–4 — a clock tower (limits), a lemonade stall with a tug rope (prices), a grocer whose tags go up (inflation), the central bank with its rate dial raising and cutting (interest); the egg carton again with its tag swinging from $6.23 to $2.35 — no government set either; the presenter points up and two signposts appear: FEWER THINGS? over a carton that empties, and MORE MONEY? over a cash stack that grows.', {
  mood: 'light', Component: Payoff,
  beats: ["s94:basic", "s94:four", "s95:one", "s95:limited", "s96:two", "s96:buyers", "s96:sellers", "s96:pulling", "s96:every", "s96:against", "s96:message", "s97:three", "s97:spending", "s97:board", "s97:stuff", "s97:prices", "s97:inflation", "s97:grows", "s98:four", "s98:money", "s98:raise", "s98:cut", "s98:warm", "s99:eggs", "s99:23", "s99:fall", "s99:back", "s99:government", "s100:next", "s100:jumps", "s100:ask", "s100:question", "s100:scarcer", "s100:money", "s100:grow", "s95:choice", "s96:prices", "s98:interest", "s99:price"],
  sfx: [['s95:one', 'pop', 0.12], ['s96:two', 'pop', 0.12], ['s97:three', 'pop', 0.12], ['s98:four', 'pop', 0.12], ['s99:back', 'chime', 0.15], ['s100:ask', 'ding', 0.12]] })
