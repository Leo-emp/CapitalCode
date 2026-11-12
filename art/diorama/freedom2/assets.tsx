// ---------------------------------------------------------------- s54–s65: step five, add assets that pay you cash (one comparison row, r58 exception).
// A) The grown money tree (the pile); Leo moves part of it — coin sacks roll toward three empty building plots (s54–s55); "$10,000 IN EACH" (s56).
// B) The street of payers, each with a $10,000 sack in front, lit in turn while the others dim:
//    a company pays dividends to its owners — about 1%, about $100 a year (s57–s58);
//    the US government dome pays interest on a 10-year Treasury — nearly 5%, close to $500 (s59–s60);
//    an apartment block (a REIT) collects rent, by law pays out at least 90% of taxable income — nearly 4%, about $380 (s61–s63);
//    the tree itself: gains (s64). Then all four wobble (rates move), the dividend stream shrinks under scissors, and all four light together (s65).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Apartments, C, Capitol, Check, City, Defs, FONT, Factory, Grain, MoneyTree, Tag, fadeIn, scene } from './kit'

const G = 930
const Sack: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={66} ry={10} fill="#000" opacity={0.18} />
    <path d="M-58 0 C-76 -56 -48 -104 -24 -116 L24 -116 C48 -104 76 -56 58 0 Z" fill="#D9B27C" />
    <path d="M-28 -118 Q0 -140 28 -118" fill="none" stroke="#8A6A3E" strokeWidth={8} strokeLinecap="round" />
    <text y={-40} textAnchor="middle" fill="#6E5230" style={{ font: `400 ${text ? 34 : 60}px ${FONT.big}` }}>{text ?? '$'}</text>
  </g>
)
const CoinPile: React.FC<{ x: number; y: number; n: number; o?: number }> = ({ x, y, n, o = 1 }) => (
  <g opacity={o} transform={`translate(${x} ${y})`}>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k} transform={`translate(${(k % 2) * 6 - 3} ${-k * 12})`}><ellipse rx={30} ry={11} fill={C.goldD} /><ellipse cy={-4} rx={30} ry={11} fill={C.gold} /></g>)}</g>
)
const COLS = [300, 760, 1220, 1680]

const Assets: React.FC<PieceProps> = ({ f, c }) => {
  const once = c('s54:once'), big = c('s54:big'), assets = c('s54:assets'), cash = c('s54:cash')
  const closer = c('s55:closer'), moves = c('s55:moves'), built = c('s55:built')
  const ten56 = c('s56:ten'), each = c('s56:each'), rates56 = c('s56:rates')
  const dividends = c('s57:dividends'), share = c('s57:share'), own = c('s57:own')
  const sp = c('s58:sp'), one58 = c('s58:one'), hundred58 = c('s58:hundred'), ten58 = c('s58:thousand')
  const interest = c('s59:interest'), lend = c('s59:lend'), treasury = c('s59:treasury'), five59 = c('s59:five')
  const close60 = c('s60:close'), five60 = c('s60:five'), ten60 = c('s60:ten')
  const rent = c('s61:rent'), reit = c('s61:reit'), collects = c('s61:collects')
  const law = c('s62:law'), ninety = c('s62:ninety'), owners = c('s62:owners')
  const four63 = c('s63:four'), eighty = c('s63:eighty')
  const fourth = c('s64:fourth'), gains = c('s64:gains'), growing = c('s64:growing')
  const none = c('s65:none'), rates65 = c('s65:rates'), cut = c('s65:cut'), depend = c('s65:depend')

  const AB = c('s57') - 6
  const A = scene(f, -20, AB), B = fadeIn(f, AB)
  // # which column is in focus (others dim to 0.35); -1 = all
  const focus = f < interest - 6 ? 0 : f < rent - 6 ? 1 : f < fourth - 6 ? 2 : f < none - 6 ? 3 : -1
  const dim = (k: number) => (focus === -1 || focus === k ? 1 : 0.35)
  const wob = (k: number) => f >= rates65 && f < depend ? 1 + 0.08 * Math.sin(f / 5 + k * 2) : 1
  const divCut = on(f, cut + 4, 14) * (1 - on(f, depend, 14))

  return (
    <g>
      <Defs />
      {/* # A) moving part of the pile into payers */}
      {A > 0 && <g opacity={A}>
        <City sky="day" f={f} sun={[1700, 250]} ground={G} />
        <MoneyTree x={380} y={G} g={lerp(0.75, 0.9, span(f, once, big + 20))} f={f} s={1} />
        <Tag x={380} y={G + 60} text="LEO'S PILE, NOW BIG" size={38} o={on(f, big, 8)} point="none" />
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [moves, 'push', 'smiling'], [ten56, 'present', 'smiling']]} x={820} y={G} s={0.9} o={on(f, closer - 10, 8)} />
        {[0, 1, 2].map((k) => { const x = 1180 + k * 260, t = span(f, moves + k * 10, moves + k * 10 + 30)
          return <g key={k}>
            <rect x={x - 110} y={G - 260} width={220} height={260} rx={10} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="18 12" opacity={on(f, assets, 8) * 0.8} />
            {f >= moves + k * 10 && <Sack x={lerp(820, x, t)} y={G} s={1.15} text={f >= ten56 ? '$10,000' : undefined} o={on(f, moves + k * 10, 6)} />}
          </g> })}
        <Tag x={1440} y={G - 330} text="ASSETS THAT PAY CASH" size={40} o={on(f, assets, 8) * (1 - on(f, ten56 - 4, 8))} />
        <Tag x={1440} y={G - 330} text="$10,000 IN EACH" size={44} o={on(f, each, 8)} color={C.sun} />
        <Tag x={1440} y={G + 60} text="AT TODAY'S RATES" size={36} o={on(f, rates56, 8)} point="none" />
      </g>}

      {/* # B) the street of payers */}
      {B > 0 && <g opacity={B}>
        <City sky="day" f={f} sun={[960, 230]} ground={G} />
        {/* # 1 dividends */}
        <g opacity={dim(0)}>
          <Factory x={COLS[0]} y={G - 70} f={f} s={0.85} />
          {[0, 1].map((j) => <Person key={j} f={f} who={j ? 'owner' : 'buyer'} beats={[[0, 'idle', 'smiling'], [own, 'receive', 'smiling']]} x={COLS[0] - 120 + j * 240} y={G} s={0.42} o={on(f, own - 4, 8) * (1 - on(f, interest - 6, 8))} />)}
          <g transform={`translate(${COLS[0]} ${G}) scale(${1 + 0.12 * pop(f, ten58, 14)})`}><Sack x={0} y={0} s={0.95} text="$10,000" /></g>
          <g transform={`translate(${COLS[0] - 60} ${G - 450}) scale(${1.4 * wob(0) * (1 - 0.5 * divCut)})`}><CoinPile x={0} y={0} n={1 * on(f, hundred58, 10)} /></g>
          <Tag x={COLS[0]} y={G - 590} text={f >= hundred58 ? '$100 A YEAR' : 'ABOUT 1%'} size={36} o={on(f, one58, 8)} color={f >= hundred58 ? C.sun : C.cream} />
          <g opacity={win(f, cut - 2, depend, 8)} transform={`translate(${COLS[0] + 120} ${G - 420}) rotate(${20 * Math.sin(f / 3)})`}><circle cx={-20} cy={20} r={16} fill="none" stroke={C.ink} strokeWidth={7} /><circle cx={20} cy={20} r={16} fill="none" stroke={C.ink} strokeWidth={7} /><path d="M-10 6 L30 -50 M10 6 L-30 -50" stroke="#9AA0B4" strokeWidth={9} strokeLinecap="round" /></g>
        </g>
        {f >= c('s57:profits') && f < own + 30 && [0, 1].map((j) => { const t = span(f, c('s57:profits') + j * 8, c('s57:profits') + j * 8 + 22); return t > 0 && t < 1 ? <g key={j} transform={`translate(${lerp(COLS[0], COLS[0] - 120 + j * 240, t)} ${lerp(G - 220, G - 160, t) - 80 * Math.sin(Math.PI * t)})`}><ellipse rx={16} ry={7} fill={C.goldD} /><ellipse cy={-3} rx={16} ry={7} fill={C.gold} /></g> : null })}
        {/* # 2 interest */}
        <g opacity={dim(1) * on(f, interest - 6, 8)}>
          <Capitol x={COLS[1]} y={G - 70} s={0.8 * (1 + 0.06 * pop(f, c('s59:government'), 14))} />
          <Sack x={COLS[1]} y={G} s={0.95} text="$10,000" />
          <g opacity={on(f, treasury - 4, 8) * (1 - on(f, five59 - 2, 8))} transform={`translate(${COLS[1]} ${G - 600})`}><rect x={-110} y={-60} width={220} height={120} rx={10} fill={C.paper} stroke={C.brassD} strokeWidth={4} /><text y={-8} textAnchor="middle" fill={C.ink} style={{ font: `400 34px ${FONT.big}` }}>10-YEAR</text><text y={34} textAnchor="middle" fill={C.ink} style={{ font: `400 34px ${FONT.big}` }}>TREASURY</text></g>
          <g transform={`translate(${COLS[1]} ${G - 450}) scale(${1.4 * wob(1) * (1 + 0.15 * pop(f, ten60, 14))})`}><CoinPile x={0} y={0} n={5 * on(f, five60, 14)} /></g>
          <Tag x={COLS[1]} y={G - 590} text={f >= five60 ? '$500 A YEAR' : 'NEARLY 5%'} size={36} o={on(f, five59, 8)} color={f >= five60 ? C.sun : C.cream} />
        </g>
        {/* # 3 rent */}
        <g opacity={dim(2) * on(f, rent - 6, 8)}>
          <Apartments x={COLS[2]} y={G - 70} s={0.8 * (1 + 0.06 * pop(f, c('s61:real'), 14))} />
          <Sack x={COLS[2]} y={G} s={0.95} text="$10,000" />
          <Tag x={COLS[2]} y={G - 470} text="A REIT" size={34} o={win(f, reit, law, 8)} point="none" />
          <g opacity={win(f, law - 4, four63, 8)} transform={`translate(${COLS[2]} ${G - 590})`}><circle r={70} fill={C.cashD} /><text y={20} textAnchor="middle" fill="#fff" style={{ font: `400 60px ${FONT.big}` }}>90%+</text></g>
          <Tag x={COLS[2]} y={G - 470} text="PAID OUT BY LAW" size={32} o={win(f, ninety, four63, 8)} />
          <g transform={`translate(${COLS[2]} ${G - 450}) scale(${1.4 * wob(2) * (1 + 0.15 * pop(f, c('s63:ten'), 14))})`}><CoinPile x={0} y={0} n={4 * on(f, eighty, 14)} /></g>
          <Tag x={COLS[2]} y={G - 590} text={f >= eighty ? '$380 A YEAR' : 'NEARLY 4%'} size={36} o={on(f, four63, 8)} color={f >= eighty ? C.sun : C.cream} />
          {/* # rent coins come from the windows */}
          {((f >= collects && f < law) || (f >= owners && f < c('s63') + 10)) && [0, 1, 2].map((j) => { const t = ((f - collects) / 24 + j / 3) % 1; return <g key={j} transform={`translate(${COLS[2] - 60 + j * 60} ${lerp(G - 280, G - 90, t)})`} opacity={1 - t}><ellipse rx={14} ry={6} fill={C.gold} /></g> })}
        </g>
        {/* # 4 gains */}
        <g opacity={dim(3) * on(f, fourth - 6, 8)}>
          <MoneyTree x={COLS[3]} y={G - 20} g={lerp(0.35, 0.5, span(f, gains, growing + 20))} f={f} s={0.85} />
          <Tag x={COLS[3]} y={G - 500} text="GROWING IN VALUE" size={34} o={on(f, growing, 8)} />
        </g>
        {/* # column names on the street */}
        {['DIVIDENDS', 'INTEREST', 'RENT', 'GAINS'].map((t, k) => <Tag key={k} x={COLS[k]} y={G + 70} text={t} size={40} o={on(f, [dividends, interest, rent, gains][k], 8) * dim(k)} point="none" color={k === focus ? C.sun : C.cream} />)}
        {focus === -1 && COLS.map((x, k) => <Check key={k} x={x + 150} y={G - 380} r={34} p={on(f, depend + 4 + k * 4, 8)} />)}
        <Tag x={960} y={G - 650} text="RATES MOVE" size={40} o={win(f, rates65, cut, 8)} color={C.amber} />
        <Tag x={960} y={G - 650} text="DIVIDENDS CAN BE CUT" size={40} o={win(f, cut, depend, 8)} color={C.red} ink="#fff" />
        <Tag x={960} y={G - 650} text="NOT JUST ONE" size={44} o={on(f, depend, 8)} color={C.cash} ink="#fff" />
      </g>}

      <Headline f={f} lines={[[once, 'STEP 5: ADD ASSETS THAT PAY YOU', C.ink, 96], [ten56, 'WHAT DOES $10,000 PAY?', C.ink, 104], [dividends, 'DIVIDENDS: A SHARE OF PROFITS', C.ink, 96], [interest, 'INTEREST: A LOAN TO THE GOVERNMENT', C.ink, 88],
        [rent, 'RENT: A REIT OWNS BUILDINGS', C.ink, 96], [fourth, 'AND GAINS', C.ink, 108], [none, 'NONE OF IT IS FIXED', C.ink, 104]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s59:government", "s63:ten", "s57:profits", "s61:real", "s58:thousand", "s60:ten", "s62:owners", 's54:once', 's54:big', 's54:assets', 's54:cash', 's55:closer', 's55:moves', 's55:built', 's56:ten', 's56:each', 's56:rates', 's57:dividends', 's57:share', 's57:own', 's58:sp', 's58:one', 's58:hundred',
  's59:interest', 's59:lend', 's59:treasury', 's59:five', 's60:close', 's60:five', 's61:rent', 's61:reit', 's61:collects', 's62:law', 's62:ninety', 's63:four', 's63:eighty', 's64:fourth', 's64:gains', 's64:growing',
  's65:none', 's65:rates', 's65:cut', 's65:depend']
export const FF_ASSETS = makePiece('ff-assets', 'Freedom step five: the big money tree (LEO\'S PILE, NOW BIG), Leo rolls three coin sacks into dashed building plots (ASSETS THAT PAY CASH, $10,000 IN EACH, AT TODAY\'S RATES); a street of four payers lit in turn: a company factory with two owners, coins ABOUT 1% then $100 A YEAR (DIVIDENDS); a government dome with a 10-YEAR TREASURY note, NEARLY 5% then $500 A YEAR (INTEREST); an apartment block, A REIT, 90%+ PAID OUT BY LAW, NEARLY 4% then $380 A YEAR (RENT); the tree GROWING IN VALUE (GAINS); then coin piles wobble (RATES MOVE), scissors over dividends (DIVIDENDS CAN BE CUT) and four ticks (NOT JUST ONE)', {
  mood: 'light', Component: Assets, beats: BEATS,
  sfx: [['s56:each', 'pop', 0.12], ['s58:hundred', 'coin', 0.15], ['s60:five', 'coin', 0.15], ['s62:ninety', 'pop', 0.12], ['s63:eighty', 'coin', 0.15], ['s64:gains', 'chime', 0.12], ['s65:cut', 'swish', 0.12], ['s65:depend', 'ding', 0.15]] })
