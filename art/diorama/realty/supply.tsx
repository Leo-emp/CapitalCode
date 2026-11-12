// ---------------------------------------------------------------- s34–s47: step three — the homes for sale (the lock-in effect).
// Maple Street at dusk, windows lit. Most homes for sale are not new: their owners decide. 1.6 million for sale in the US;
// a row of five calendar pages fills to 4.8 (months of supply). Ten little houses: about half get gold padlocks (< 4%).
// A made-up owner beside his house: owes $300,000 at 3% → $1,265 a month; the same loan at 7.18% → $2,032: +$767 a month,
// so he stays — a padlock clicks onto his door, and onto doors all down the street. A second made-up owner already pays
// about 7%: nothing holds her back — she carries a box out and her house gets a FOR SALE sign. THE LOCK-IN EFFECT; every
// owner who stays is one less sign, and a queue of buyers forms at the one house that is for sale.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { DayWorld, Street, House, LawnSign, Tag, Padlock, Paper, Vig, TXT, INK, CORAL, MINT, MUSTARD, PAPER, ROOFS, WALLS, Life } from './kit'

const HX = [240, 600, 960, 1320, 1680], HY = 860

const Bill: React.FC<{ x: number; y: number; t: string; sub: string; col: string; s?: number }> = ({ x, y, t, sub, col, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Paper d="M-140 -80 L140 -80 L140 80 L-140 80 Z" fill={PAPER} />
    <rect x={-140} y={-80} width={280} height={46} fill={col} /><text y={-47} textAnchor="middle" fill="#FFFFFF" style={TXT(32)}>{sub}</text>
    <text y={22} textAnchor="middle" fill={INK} style={TXT(64)}>{t}</text><text y={62} textAnchor="middle" fill={INK} style={TXT(28)}>A MONTH</text>
  </g>
)

const Supply: React.FC<PieceProps> = ({ f, c }) => {
  const sale34 = c('s34:sale'), brand = c('s34:brand'), own34 = c('s34:own'), decide = c('s34:decide'), sell34 = c('s34:sell')
  const d16 = c('s35:16'), country = c('s35:country')
  const d48 = c('s36:48'), pace = c('s36:pace'), five = c('s36:five')
  const owners37 = c('s37:owners'), loans = c('s37:loans')
  const d49 = c('s38:49'), below = c('s38:below')
  const picture = c('s39:picture'), d300 = c('s39:300000'), p3 = c('s39:3')
  const d1265 = c('s40:1265')
  const sells = c('s41:sells'), d718 = c('s41:718'), d2032 = c('s41:2032')
  const d767 = c('s42:767'), move = c('s42:move')
  const stays = c('s43:stays'), millions = c('s43:millions')
  const second = c('s44:second'), p7 = c('s44:7')
  const moves = c('s45:moves'), nothing = c('s45:nothing'), back = c('s45:back')
  const lockin = c('s46:lockin'), lock46 = c('s46:lock')
  const less = c('s47:less'), compete = c('s47:compete'), left = c('s47:left')

  const mini = win(f, loans, picture - 4, 10)
  const dan: Beat[] = [[picture, 'idle', 'neutral'], [d300, 'think', 'thinking'], [d1265, 'relax', 'smiling'], [sells, 'scratchHead', 'thinking'], [d2032, 'shock', 'shocked'], [d767, 'facepalm', 'worried'], [stays, 'armsCrossed', 'smiling'], [lockin, 'idle', 'neutral']]
  const her: Beat[] = [[second, 'idle', 'smiling'], [p7, 'shrug', 'smiling'], [moves, 'carry', 'smiling'], [back, 'carry', 'smiling']]
  const lockOn = (k: number) => k === 2 ? on(f, stays, 10) : (k === 4 ? 0 : on(f, millions + k * 4, 8))
  const herX = lerp(1720, 1840, on(f, moves, 30))
  const queue = on(f, compete, 10)

  return (
    <g>
      <DayWorld f={f} id="re-supply" tone="dusk" />
      <Street y={880} dusk />
      {/* # the street */}
      {HX.map((x, k) => <g key={k} opacity={on(f, sale34 + k * 3, 10)}>
        <House x={x} y={HY} s={0.75} roof={ROOFS[(k + 1) % 6]} wall={WALLS[(k + 3) % 6]} lit={0.8} v={k % 2} lock={lockOn(k)} lockT={k === 2 ? '3%' : undefined} />
        {/* for-sale signs: two on s35; the locked houses lose theirs; her house gets one */}
        <g opacity={(k === 1 || k === 3 ? win(f, d16, less, 8) : 0) + (k === 4 ? on(f, nothing, 8) : 0)}><LawnSign x={x + 140} y={HY + 10} s={0.62} /></g>
      </g>)}
      <g opacity={win(f, brand, d16, 8)}><Tag x={960} y={330} t="MOSTLY NOT NEW: OWNERS DECIDE" size={46} /></g>
      <g opacity={win(f, d16, d48, 8)}><Tag x={960} y={330} t="≈ 1.6 MILLION FOR SALE (U.S.)" size={50} /></g>
      {/* months of supply */}
      <g opacity={win(f, d48 - 4, owners37, 8)} transform="translate(560 410)">
        {[0, 1, 2, 3, 4].map((k) => { const fill = Math.max(0, Math.min(1, 4.8 * on(f, pace, 40) - k)); return <g key={k} transform={`translate(${k * 170} 0)`}>
          <Paper d="M-60 -70 L60 -70 L60 70 L-60 70 Z" fill={PAPER} dx={4} dy={5} /><rect x={-60} y={-70} width={120} height={30} fill={CORAL} />
          <rect x={-50} y={-30} width={100 * fill} height={90} fill={MINT} opacity={0.7} /><text y={40} textAnchor="middle" fill={INK} style={TXT(50)}>{k + 1}</text>
        </g> })}
        <g opacity={on(f, five, 8)}><text x={340} y={150} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>4.8 MONTHS OF SUPPLY</text></g>
      </g>
      {/* ten mini houses, about half under 4% */}
      <g opacity={mini} transform="translate(420 470)">
        {Array.from({ length: 10 }, (_, k) => <g key={k} transform={`translate(${k * 120} 0)`} opacity={on(f, loans + k * 2, 6)}>
          <House x={0} y={0} s={0.22} roof={ROOFS[k % 6]} wall={WALLS[(k + 1) % 6]} lit={0.6} />
          {k < 5 && <g opacity={on(f, d49 + k * 3, 6)}><Padlock x={0} y={-150} s={0.45} /></g>}
        </g>)}
        <g opacity={on(f, below, 8)}><text x={540} y={80} textAnchor="middle" fill="#FFFFFF" style={TXT(50)}>≈ 49% OF HOME LOANS BELOW 4%</text></g>
      </g>
      {/* # the made-up owner who stays */}
      <g opacity={on(f, picture - 4, 10)}>
        <Person f={f} who="worker" beats={dan} x={1110} y={HY + 20} s={0.62} flip />
        <g opacity={win(f, d300, d1265 - 2, 8)}><Tag x={960} y={330} t="OWES $300,000 AT 3%" size={48} /></g>
        <g opacity={win(f, d1265, stays - 2, 8)}><Bill x={620} y={350} t="$1,265" sub="NOW, AT 3%" col={MINT} s={pop(f, d1265, 12)} /></g>
        <g opacity={win(f, d718, stays - 2, 8)}><Bill x={1300} y={350} t={f >= d2032 ? '$2,032' : '…'} sub="IF HE MOVES, AT 7.18%" col={CORAL} s={pop(f, d718, 12)} /></g>
        <g opacity={win(f, d767, stays - 2, 8)} transform={`translate(760 520) scale(${pop(f, d767, 12)})`}><Paper d="M-200 -46 L200 -46 L200 46 L-200 46 Z" fill={CORAL} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(54)}>+$767 A MONTH</text></g>
        <g opacity={win(f, move, stays, 8)}><Tag x={960} y={236} t="…FOR A HOUSE LIKE HIS OWN" size={36} /></g>
      </g>
      <g opacity={win(f, stays, second, 8)}><Tag x={960} y={330} t="SO HE STAYS" size={56} col={MUSTARD} /></g>
      {/* # the second owner who moves */}
      <g opacity={on(f, second - 4, 10)}>
        <Person f={f} who="investorF" beats={her} x={herX} y={HY + 20} s={0.62} flip />
        <g opacity={win(f, p7, lockin, 8)}><Tag x={1320} y={330} t="ALREADY PAYS ≈ 7%" size={48} /></g>
        <g opacity={win(f, nothing, lockin, 8)}><Tag x={1320} y={420} t="NOTHING HOLDS HER BACK" size={40} col={MINT} tc="#FFFFFF" /></g>
      </g>
      <g opacity={win(f, lockin, less, 8)} transform={`translate(960 330) scale(${pop(f, lockin, 12)})`}><Paper d="M-250 -60 L250 -60 L250 50 L-250 50 Z" fill={MUSTARD} /><text y={20} textAnchor="middle" fill={INK} style={TXT(76)}>THE LOCK-IN EFFECT</text></g>
      {/* buyers queue at the one house for sale */}
      <g opacity={queue}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${lerp(2000, 1400 - k * 110, on(f, compete + k * 5, 20))} 0)`}><Person f={f} who={['buyer', 'hero', 'investor'][k]} beats={[[compete, 'idle', 'thinking']]} x={0} y={1050} s={0.42} /></g>)}
        <g opacity={on(f, left, 8)}><Tag x={960} y={330} t="BUYERS COMPETE FOR THE FEW LEFT" size={46} /></g></g>
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s34:already")} x={960} y={640} kind="glint" />
        <Life f={f} at={c("s35:2026")} x={960} y={640} kind="glint" />
        <Life f={f} at={c("s35:sale")} x={960} y={640} kind="glint" />
        <Life f={f} at={c("s36:in")} x={960} y={640} kind="glint" />
        <Life f={f} at={c("s36:would")} x={960} y={640} kind="glint" />
        <Life f={f} at={c("s38:middle")} x={960} y={420} kind="glint" />
        <Life f={f} at={c("s38:loans")} x={960} y={420} kind="glint" />
        <Life f={f} at={c("s39:he")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s39:percent")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s41:same")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s42:month")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s42:already")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s43:too")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s44:recently")} x={1680} y={700} kind="glint" />
        <Life f={f} at={c("s45:the")} x={1680} y={700} kind="glint" />
        <Life f={f} at={c("s46:their")} x={960} y={330} kind="glint" />
        <Life f={f} at={c("s46:rates")} x={960} y={330} kind="glint" />
        <Life f={f} at={c("s47:who")} x={960} y={330} kind="glint" />
        <Life f={f} at={c("s47:houses")} x={960} y={330} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="re-supply" k={0.3} />
      <Headline f={f} lines={[[sale34, 'THE HOMES FOR SALE', '#FFFFFF', 88], [owners37, 'THE LOANS OWNERS ALREADY HAVE', '#FFFFFF', 84], [picture, 'ONE OWNER, TWO PAYMENTS', '#FFFFFF', 84]]} />
    </g>
  )
}

export const RE_SUPPLY = makePiece('re-supply', "Step three on Maple Street at dusk with lit windows: MOSTLY NOT NEW — OWNERS DECIDE; two FOR SALE signs and ≈ 1.6 MILLION FOR SALE (U.S.); five paper calendar pages fill to 4.8 MONTHS OF SUPPLY; ten little houses, about half with gold padlocks — ≈ 49% OF HOME LOANS BELOW 4%; a made-up owner beside his house OWES $300,000 AT 3%: a $1,265 bill now vs $2,032 if he moves at 7.18% — +$767 A MONTH for a house like his own — SO HE STAYS and a 3% padlock clicks onto his door and onto doors down the street; a second made-up owner ALREADY PAYS ≈ 7%, carries a box out, NOTHING HOLDS HER BACK and her house gets a FOR SALE sign; THE LOCK-IN EFFECT; the other signs vanish and a queue of buyers walks up — BUYERS COMPETE FOR THE FEW LEFT.", {
  mood: 'dark', Component: Supply,
  beats: ["s34:sale", "s34:brand", "s34:decide", "s35:16", "s35:country", "s36:48", "s36:pace", "s36:five", "s37:owners", "s37:loans", "s38:49", "s38:below", "s39:picture", "s39:300000", "s40:1265", "s41:sells", "s41:718", "s41:2032", "s42:767", "s42:move", "s43:stays", "s43:millions", "s44:second", "s44:7", "s45:moves", "s45:nothing", "s45:back", "s46:lockin", "s47:less", "s47:compete", "s47:left", "s34:already", "s35:2026", "s35:sale", "s36:in", "s36:would", "s38:middle", "s38:loans", "s39:he", "s39:percent", "s41:same", "s42:month", "s42:already", "s43:too", "s44:recently", "s45:the", "s46:their", "s46:rates", "s47:who", "s47:houses"],
  sfx: [['s38:49', 'pop', 0.08], ['s42:767', 'thud', 0.12], ['s43:stays', 'pop', 0.1], ['s46:lockin', 'thud', 0.12]] })
