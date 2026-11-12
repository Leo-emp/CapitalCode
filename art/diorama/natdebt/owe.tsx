// ---------------------------------------------------------------- s36–s49: who the US owes.
// A) One long bar = the whole $40.6T (Treasury, Nov 2026). It splits into two piles: $7.8T the government owes itself and
//    $32.8T debt held by the public. Below, the Social Security trust fund lends its surplus to the Treasury as special IOUs.
// B) The public pile, to scale: foreign investors $9.3T (flags of Japan $1.1T, UK $1T, China $590B — Japan is under 3% of
//    the whole), the Federal Reserve $4.6T (bought from banks in the market), and the rest, roughly $19T, held at home:
//    a bank, a pension fund, an insurer, a money-market fund and a saver's piggy bank.
// C) The myth "one country owns America" crossed out; most of it is owed at home. Then: will it ever be paid back?
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, Jar, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankFront } from '../bank/kit'
import { CentralBank, NoCross, Arrow } from '../econ/kit'
import { Capitol, Flag, IOU, Piggy, TXT, INK, RED, GREEN, BLUE, GOLD } from './kit'

const GROUND = 930
const X0 = 160, W = 1600

const Owe: React.FC<PieceProps> = ({ f, c }) => {
  const split = c('s36:split'), piles = c('s36:piles')
  const first = c('s37:first'), d78 = c('s37:78'), itself = c('s37:itself')
  const social = c('s38:social'), collect = c('s38:collect'), extra = c('s38:extra'), special = c('s38:special')
  const part = c('s39:part')
  const second = c('s40:second'), d328 = c('s40:328'), publicW = c('s40:public')
  const d93 = c('s41:93')
  const japan = c('s42:japan'), britain = c('s42:britain'), china = c('s42:china')
  const enormous = c('s43:enormous'), p3 = c('s43:3')
  const central = c('s44:central'), federal = c('s44:federal'), d46 = c('s44:46')
  const buys = c('s45:buys'), market = c('s45:market'), loans = c('s45:loans')
  const rest = c('s46:rest'), d19 = c('s46:19'), banks46 = c('s46:banks'), pension = c('s46:pension'), insurance = c('s46:insurance'), money46 = c('s46:money'), savers = c('s46:savers')
  const pension47 = c('s47:pension'), piece = c('s47:piece')
  const scary = c('s48:scary'), foreign = c('s48:foreign'), americans = c('s48:americans')
  const question = c('s49:question'), paid = c('s49:paid')

  const A = win(f, 0, d93 - 6), B = win(f, d93 - 6, scary - 4), Cw = on(f, scary - 4, 10)
  // # A: the split of the whole bar
  const sp = on(f, split, 20)
  const wIntra = (7.79 / 40.55) * W, gapX = 30 * sp
  // # B: the public bar, to scale
  const pf = (v: number) => (v / 32.76) * W
  const segs: [number, number, string, string][] = [[9.33, d93, '#7FA8D8', 'FOREIGN $9.3T'], [4.58, d46, '#2F3E66', 'FED $4.6T'], [18.85, d19, GREEN, 'AT HOME ~$19T']]
  let accX = X0
  return (
    <g>
      <Stage id="nd-owe" frame={f} />
      <Headline f={f} lines={[[split, 'TWO PILES · $40.6 TRILLION', P.ink, 90], [d93, 'DEBT HELD BY THE PUBLIC · $32.8T', P.ink, 80], [scary, 'WHO REALLY HOLDS IT', P.ink, 96]]} />
      <Ground y={GROUND} />

      {/* # A) two piles */}
      {A > 0 && <g opacity={A}>
        <rect x={X0 - gapX} y={330} width={wIntra} height={110} rx={14} fill={GOLD} opacity={on(f, first, 8) * 0.5 + 0.5} />
        <rect x={X0 + wIntra + gapX} y={330} width={W - wIntra} height={110} rx={14} fill="#E5A99E" opacity={on(f, second, 8) * 0.5 + 0.5} />
        <g opacity={on(f, d78, 8)}><Label x={X0 + wIntra / 2 - gapX} y={480} text="$7.8T" size={60} font="Bebas Neue" color={P.ink} /><Label x={X0 + wIntra / 2 - gapX} y={530} text="OWED TO ITSELF" size={36} font="Bebas Neue" color={P.ink2} o={on(f, itself, 8)} /></g>
        <g opacity={on(f, d328, 8)}><Label x={X0 + wIntra + (W - wIntra) / 2 + gapX} y={480} text="$32.8T" size={60} font="Bebas Neue" color={P.ink} /><Label x={X0 + wIntra + (W - wIntra) / 2 + gapX} y={530} text="DEBT HELD BY THE PUBLIC" size={36} font="Bebas Neue" color={P.ink2} o={on(f, publicW, 8)} /></g>
        <g opacity={on(f, piles, 8) * (1 - on(f, first, 8))}><Label x={960} y={480} text="$40.6 TRILLION" size={70} font="Bebas Neue" color={P.ink} /></g>
        {/* the trust fund lends its surplus */}
        <g opacity={win(f, social - 4, second, 10)}>
          <rect x={300} y={GROUND - 260} width={300} height={260} rx={20} fill="#8BA0BF" stroke="#5C6F8E" strokeWidth={8} />
          <text x={450} y={GROUND - 180} textAnchor="middle" fill="#FFFFFF" style={TXT(40)}>SOCIAL SECURITY</text><text x={450} y={GROUND - 135} textAnchor="middle" fill="#FFFFFF" style={TXT(40)}>TRUST FUND</text>
          <g opacity={on(f, collect, 8)}><Label x={450} y={GROUND - 290} text="IN > OUT" size={50} font="Bebas Neue" color={GREEN} /></g>
          <g opacity={on(f, extra, 8)}><Arrow x={800} y={GROUND - 140} dir="right" col={P.ink2} s={0.8} /></g>
          <CentralBank x={1300} y={GROUND} s={0.55} name="U.S. TREASURY" />
          <g opacity={on(f, special, 8)}><IOU x={lerp(1150, 620, on(f, special, 24))} y={GROUND - 340} s={0.55} t="SPECIAL IOU" col={GOLD} /></g>
          <g opacity={on(f, part, 8)}><Label x={960} y={GROUND + 60} text="ONE PART OF GOVERNMENT HOLDS ANOTHER'S IOUs" size={42} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # B) the public pile, to scale */}
      {B > 0 && <g opacity={B}>
        {segs.map(([v, at, col, t], k) => { const x = accX; const w = pf(v); accX += w; return <g key={k} opacity={on(f, at, 8)}>
          <rect x={x + k * 6} y={330} width={w - 6} height={110} rx={14} fill={col} />
          <text x={x + w / 2} y={404} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>{t}</text>
        </g> })}
        {/* foreign: flags */}
        <g opacity={win(f, japan - 4, central - 4, 10)}>
          {([[japan, 'jp', '$1.1T', 300], [britain, 'uk', '$1T', 620], [china, 'cn', '$590B', 940]] as [number, 'jp' | 'uk' | 'cn', string, number][]).map(([at, cc, t, x], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${30 * (1 - pop(f, at, 14))})`}><Flag x={x} y={GROUND} s={1.2} c={cc} /><Label x={x + 96} y={GROUND - 270} text={t} size={60} font="Bebas Neue" color={P.ink} /></g>)}
          <g opacity={on(f, enormous, 8)}>
            <rect x={1220} y={640} width={540} height={60} rx={10} fill="#E8E1D2" />
            <rect x={1220} y={640} width={540 * (1.068 / 40.55) * on(f, p3, 20)} height={60} rx={10} fill="#BC002D" />
            <Label x={1490} y={600} text="JAPAN'S SHARE OF ALL $40.6T" size={36} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, p3, 8)}><Label x={1490} y={770} text="UNDER 3%" size={64} font="Bebas Neue" color={RED} /></g>
          </g>
        </g>
        {/* the Fed buys from banks in the market */}
        <g opacity={win(f, central - 4, rest - 4, 10)}>
          <CentralBank x={560} y={GROUND} s={0.75} name="FEDERAL RESERVE" glow={win(f, federal, buys, 6)} />
          <g opacity={on(f, buys, 8)}><BankFront x={1420} y={GROUND} s={0.8} name="BANKS" /></g>
          <g opacity={on(f, market, 8)}><IOU x={lerp(1250, 950, on(f, market, 28))} y={760} s={0.5} t="IOU" /></g>
          <g opacity={on(f, loans, 8)}><Label x={990} y={620} text="BOUGHT IN THE MARKET" size={50} font="Bebas Neue" color={P.ink} /><Label x={990} y={670} text="NOT A LOAN STRAIGHT TO THE TREASURY" size={36} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* at home */}
        <g opacity={on(f, rest - 4, 10)}>
          {([[banks46, 'BANKS', <BankFront key="b" x={0} y={0} s={0.42} name="BANK" />], [pension, 'PENSIONS', <g key="p"><rect x={-70} y={-150} width={140} height={150} rx={8} fill="#E6DCC4" /><text y={-60} textAnchor="middle" fill={INK} style={TXT(34)}>PENSION</text></g>], [insurance, 'INSURERS', <g key="i"><path d="M-80 -90 Q0 -170 80 -90 Z" fill={BLUE} /><rect x={-4} y={-90} width={8} height={90} fill={INK} /></g>], [money46, 'MONEY FUNDS', <Jar key="j" x={0} y={0} s={0.55} fill={0.7} />], [savers, 'SAVERS', <Piggy key="s" x={0} y={0} s={0.7} />]] as [number, string, React.ReactNode][]).map(([at, t, pic], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(${300 + k * 330} ${GROUND - 60 - 20 * (1 - pop(f, at, 12))})`}>{pic}<text y={50} textAnchor="middle" fill={INK} style={TXT(40)}>{t}</text></g>)}
          <g opacity={on(f, pension47, 8)}><Person f={f} who="buyer" beats={[[pension47, 'present', 'smiling'], [piece, 'point', 'smiling']]} x={1800} y={GROUND} s={0.6} flip /></g>
          <g opacity={on(f, piece, 8)}><Label x={960} y={560} text="YOU MAY OWN A PIECE" size={60} font="Bebas Neue" color={GREEN} /></g>
        </g>
      </g>}

      {/* # C) the myth, and the next question */}
      {Cw > 0 && <g opacity={Cw}>
        <g opacity={1 - on(f, question - 4, 10)}>
          <Capitol x={760} y={GROUND} s={0.8} />
          <g opacity={on(f, foreign, 8)}><Flag x={1020} y={GROUND} s={1.4} c="jp" /><Flag x={1400} y={GROUND} s={1.4} c="cn" /></g>
          <g opacity={on(f, foreign + 10, 8)}><NoCross x={1330} y={690} s={2.4} /></g>
          <g opacity={on(f, americans, 8)}><Label x={960} y={360} text="MOSTLY OWED AT HOME" size={80} font="Bebas Neue" color={GREEN} /></g>
        </g>
        <g opacity={on(f, question - 4, 10)}>
          <IOU x={960} y={600} s={1.6} t="IOU" kind="PAID BACK?" />
          <g opacity={on(f, paid, 8)}><circle cx={1400} cy={480} r={90} fill="#FFFFFF" stroke="#E2D3B4" strokeWidth={8} /><text x={1400} y={520} textAnchor="middle" fill={RED} style={TXT(110)}>?</text></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s36:into")} x={960} y={400} rx={230} ry={120} />
        <Spot f={f} at={c("s37:trillion")} x={960} y={400} rx={230} ry={120} />
        <Spot f={f} at={c("s37:government")} x={960} y={400} rx={230} ry={120} />
        <Spot f={f} at={c("s38:when")} x={800} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s38:pay")} x={800} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s38:the#2")} x={800} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s38:ious")} x={800} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s39:the#2")} x={800} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s39:another")} x={800} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s40:is")} x={960} y={400} rx={230} ry={120} />
        <Spot f={f} at={c("s40:everyone")} x={960} y={400} rx={230} ry={120} />
        <Spot f={f} at={c("s40:called")} x={960} y={400} rx={230} ry={120} />
        <Spot f={f} at={c("s41:is")} x={960} y={400} rx={230} ry={120} />
        <Spot f={f} at={c("s41:us")} x={960} y={400} rx={230} ry={120} />
        <Spot f={f} at={c("s42:11")} x={620} y={750} rx={230} ry={200} />
        <Spot f={f} at={c("s42:trillion#2")} x={620} y={750} rx={230} ry={200} />
        <Spot f={f} at={c("s42:billion")} x={620} y={750} rx={230} ry={200} />
        <Spot f={f} at={c("s43:11")} x={620} y={750} rx={230} ry={200} />
        <Spot f={f} at={c("s43:but")} x={620} y={750} rx={230} ry={200} />
        <Spot f={f} at={c("s43:trillion#2")} x={620} y={750} rx={230} ry={200} />
        <Spot f={f} at={c("s44:trillion")} x={990} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s45:and")} x={990} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s45:treasury")} x={990} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s46:is")} x={960} y={800} rx={230} ry={150} />
        <Spot f={f} at={c("s46:america")} x={960} y={800} rx={230} ry={150} />
        <Spot f={f} at={c("s46:and#2")} x={960} y={800} rx={230} ry={150} />
        <Spot f={f} at={c("s47:if")} x={960} y={800} rx={230} ry={150} />
        <Spot f={f} at={c("s47:fund")} x={960} y={800} rx={230} ry={150} />
        <Spot f={f} at={c("s47:bonds")} x={960} y={800} rx={230} ry={150} />
        <Spot f={f} at={c("s48:so")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s48:isn't")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s48:most")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s48:america's")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s49:but")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s49:asks")} x={960} y={600} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="nd-owe" />
    </g>
  )
}

export const ND_OWE = makePiece('nd-owe', 'Who the US owes: one long bar of $40.6 trillion splits into $7.8T the government owes itself and $32.8T debt held by the public; the Social Security trust fund (in > out) lends its surplus to the U.S. Treasury as a special IOU; the public bar to scale — foreign $9.3T, Fed $4.6T, at home about $19T; flags of Japan $1.1T, the UK $1T and China $590B, with Japan\'s share of the whole drawn as a thin bar under 3%; the Federal Reserve buying IOUs from banks in the market; at home: banks, pensions, insurers, money funds and savers (a piggy bank) — you may own a piece; a capitol with two foreign flags crossed out: mostly owed at home; an IOU asking PAID BACK?', {
  mood: 'light', Component: Owe,
  beats: ["s36:split", "s36:piles", "s37:first", "s37:78", "s37:itself", "s38:social", "s38:collect", "s38:extra", "s38:special", "s39:part", "s40:second", "s40:328", "s40:public", "s41:93", "s42:japan", "s42:britain", "s42:china", "s43:enormous", "s43:3", "s44:central", "s44:federal", "s44:46", "s45:buys", "s45:market", "s45:loans", "s46:rest", "s46:19", "s46:banks", "s46:pension", "s46:insurance", "s46:money", "s46:savers", "s47:pension", "s47:piece", "s48:scary", "s48:foreign", "s48:americans", "s49:question", "s49:paid", "s36:into", "s37:trillion", "s37:government", "s38:when", "s38:pay", "s38:the#2", "s38:ious", "s39:the#2", "s39:another", "s40:is", "s40:everyone", "s40:called", "s41:is", "s41:us", "s42:11", "s42:trillion#2", "s42:billion", "s43:11", "s43:but", "s43:trillion#2", "s44:trillion", "s45:and", "s45:treasury", "s46:is", "s46:america", "s46:and#2", "s47:if", "s47:fund", "s47:bonds", "s48:so", "s48:isn't", "s48:most", "s48:america's", "s49:but", "s49:asks"],
  sfx: [['s36:split', 'swish', 0.1], ['s42:japan', 'pop', 0.08], ['s42:britain', 'pop', 0.08], ['s42:china', 'pop', 0.08], ['s48:foreign', 'thud', 0.1]] })
