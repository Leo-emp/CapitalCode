// ---------------------------------------------------------------- s75–s83: the payoff at sunset on Maple Street.
// Four paper step signs light up along the street as they are said: 1 the price (a SOLD sign checked by the bank's
// clipboard), 2 the borrowing (a coin stack under a rate dial), 3 the owners (a padlocked door), 4 the tug of war (a little
// rope with the PRICE flag). Then two numbers on two paper cards: THE RATE · HOMES FOR SALE NEAR YOU. The walker from the
// hook asks the one question — HOW MANY OWNERS WILL SELL? — and the street's lights come on.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { DayWorld, Street, House, LawnSign, Clipboard, CoinStack, Padlock, Tag, Paper, Vig, TXT, INK, CORAL, MINT, MUSTARD, PAPER, SLATE, TEAL, ROOFS, WALLS, Life } from './kit'

const GY = 880, SX = [300, 720, 1140, 1560]

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const real = c('s75:real'), four = c('s75:four')
  const one = c('s76:one'), pay = c('s76:pay'), bank = c('s76:bank')
  const two = c('s77:two'), borrow = c('s77:borrow'), rate77 = c('s77:rate')
  const three = c('s78:three'), owners = c('s78:owners'), low = c('s78:low')
  const fourS = c('s79:four'), tug = c('s79:tug')
  const numbers = c('s80:numbers'), rate80 = c('s80:rate'), sale80 = c('s80:sale')
  const next = c('s81:next'), crash = c('s81:crash'), question = c('s81:question')
  const owners82 = c('s82:owners'), sell = c('s82:sell')
  const buyer83 = c('s83:buyer'), borrow83 = c('s83:borrow'), go = c('s83:go')

  const A = 1 - on(f, numbers - 6, 12), B = win(f, numbers - 6, next - 6, 12), C = on(f, next - 6, 12)
  const walker: Beat[] = [[next, 'idle', 'neutral'], [crash, 'shrug', 'thinking'], [question, 'pointUp', 'smiling'], [owners82, 'explain', 'thinking'], [buyer83, 'present', 'smiling'], [go, 'thumbsUp', 'smiling']]
  const stepAt = [one, two, three, fourS]

  return (
    <g>
      <DayWorld f={f} id="re-payoff" tone="sunset" />
      <Street y={GY} />
      {/* # A) four step signs along the street */}
      {A > 0.001 && <g opacity={A}>
        {SX.map((x, k) => <g key={k} opacity={on(f, k === 0 ? real : stepAt[k] - 4, 10) * (0.45 + 0.55 * on(f, stepAt[k], 10))} transform={`translate(${x} ${GY - 6})`}>
          <rect x={-8} y={-520} width={16} height={520} fill="#8B6A4E" />
          <Paper d="M-150 -560 L150 -560 L150 -460 L-150 -460 Z" fill={[CORAL, MUSTARD, TEAL, '#5C8FC2'][k]} />
          <text y={-490} textAnchor="middle" fill="#FFFFFF" style={TXT(60)}>{`STEP ${k + 1}`}</text>
        </g>)}
        {/* step 1: a SOLD sign checked by the bank */}
        <g opacity={on(f, pay, 8)}><LawnSign x={300} y={GY} s={1.1} top="SOLD" col={MINT} t="PRICE" /><g opacity={on(f, bank, 8)}><Clipboard x={400} y={GY - 260} s={0.9} r={10} /></g></g>
        {/* step 2: borrowing — coins under a little rate dial */}
        <g opacity={on(f, borrow, 8)}><CoinStack x={720} y={GY} n={8} /><g opacity={on(f, rate77, 8)} transform={`translate(720 ${GY - 260})`}><circle r={70} fill={PAPER} stroke={SLATE} strokeWidth={6} /><line x1={0} y1={0} x2={50 * Math.sin(lerp(-1, 0.8, on(f, rate77, 24)))} y2={-50 * Math.cos(lerp(-1, 0.8, on(f, rate77, 24)))} stroke={CORAL} strokeWidth={8} strokeLinecap="round" /><text y={46} textAnchor="middle" fill={INK} style={TXT(26)}>RATE</text></g></g>
        {/* step 3: owners and the lock */}
        <g opacity={on(f, owners, 8)}><House x={1140} y={GY - 6} s={0.62} roof={ROOFS[1]} wall={WALLS[2]} lock={on(f, low, 10)} lockT="3%" /></g>
        {/* step 4: the tug of war */}
        <g opacity={on(f, tug, 8)} transform={`translate(1560 ${GY - 160})`}>
          <line x1={-150} y1={0} x2={150} y2={0} stroke="#B98457" strokeWidth={10} />
          <g transform={`translate(${12 * Math.sin(f / 10)} 0)`}><Paper d="M-40 0 L-40 -60 L0 -94 L40 -60 L40 0 Z" fill={MUSTARD} dx={3} dy={4} /><text y={-20} textAnchor="middle" fill={INK} style={TXT(24)}>PRICE</text></g>
          <text x={-150} y={60} textAnchor="middle" fill={CORAL} style={TXT(30)}>BUYERS</text><text x={150} y={60} textAnchor="middle" fill={TEAL} style={TXT(30)}>OWNERS</text>
        </g>
      </g>}
      {/* # B) the two numbers that matter */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, rate80, 8)} transform={`translate(620 600) scale(${pop(f, rate80, 12)})`}><Paper d="M-260 -150 L260 -150 L260 150 L-260 150 Z" fill={PAPER} /><rect x={-260} y={-150} width={520} height={70} fill={CORAL} /><text y={-100} textAnchor="middle" fill="#FFFFFF" style={TXT(46)}>NUMBER 1</text><text y={40} textAnchor="middle" fill={INK} style={TXT(70)}>THE RATE</text><text y={100} textAnchor="middle" fill={INK} style={TXT(36)}>BUYERS CAN BORROW AT</text></g>
        <g opacity={on(f, sale80, 8)} transform={`translate(1300 600) scale(${pop(f, sale80, 12)})`}><Paper d="M-260 -150 L260 -150 L260 150 L-260 150 Z" fill={PAPER} /><rect x={-260} y={-150} width={520} height={70} fill={TEAL} /><text y={-100} textAnchor="middle" fill="#FFFFFF" style={TXT(46)}>NUMBER 2</text><text y={40} textAnchor="middle" fill={INK} style={TXT(64)}>HOMES FOR SALE</text><text y={100} textAnchor="middle" fill={INK} style={TXT(36)}>NEAR YOU</text></g>
      </g>}
      {/* # C) the one question, and the street lights up */}
      {C > 0.001 && <g opacity={C}>
        {[0, 1, 2, 3, 4].map((k) => <House key={k} x={240 + k * 360} y={GY - 6} s={0.62} roof={ROOFS[k]} wall={WALLS[k]} v={k % 2} lit={on(f, go - 10 + k * 3, 10)} />)}
        <Person f={f} who="hero" beats={walker} x={960} y={1060} s={0.55} />
        <g opacity={win(f, crash, owners82, 8)}><Tag x={960} y={330} t="“PRICES MUST CRASH!”" size={56} /></g>
        <g opacity={on(f, owners82, 8)} transform={`translate(960 330) scale(${pop(f, owners82, 12)})`}><Paper d="M-380 -64 L380 -64 L380 50 L-380 50 Z" fill={MUSTARD} /><text y={18} textAnchor="middle" fill={INK} style={TXT(70)}>HOW MANY OWNERS WILL SELL?</text></g>
        <g opacity={on(f, borrow83, 8)}><Tag x={960} y={460} t="WHAT ONE BUYER CAN BORROW · WHAT ONE OWNER WILL LET GO" size={34} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s75:works")} x={720} y={500} kind="glint" />
        <Life f={f} at={c("s76:lends")} x={720} y={500} kind="glint" />
        <Life f={f} at={c("s77:can")} x={720} y={500} kind="glint" />
        <Life f={f} at={c("s78:from#2")} x={720} y={500} kind="glint" />
        <Life f={f} at={c("s79:sides")} x={720} y={500} kind="glint" />
        <Life f={f} at={c("s80:headline")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s80:and")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s81:ask")} x={960} y={640} kind="glint" />
        <Life f={f} at={c("s83:only")} x={960} y={640} kind="glint" />
        <Life f={f} at={c("s83:is#2")} x={960} y={640} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="re-payoff" />
      <Headline f={f} lines={[[real, 'THE MARKET IN FOUR STEPS', INK, 88], [numbers, 'TWO NUMBERS THAT MATTER', INK, 88], [next, 'NEXT TIME, ASK ONE QUESTION', INK, 84]]} />
    </g>
  )
}

export const RE_PAYOFF = makePiece('re-payoff', 'Payoff at sunset on Maple Street: four paper STEP signs light along the street — 1 a SOLD PRICE sign checked by the bank\'s clipboard, 2 a coin stack under a swinging rate dial, 3 a house whose door gets a 3% padlock, 4 a little rope with the PRICE flag between BUYERS and OWNERS; then two paper cards, NUMBER 1 THE RATE buyers can borrow at and NUMBER 2 HOMES FOR SALE near you; the walker from the hook hears “PRICES MUST CRASH!”, points up and asks HOW MANY OWNERS WILL SELL? — what one buyer can borrow · what one owner will let go — and the windows along the street light up.', {
  mood: 'light', Component: Payoff,
  beats: ["s75:real", "s75:four", "s76:one", "s76:pay", "s76:bank", "s77:two", "s77:borrow", "s77:rate", "s78:three", "s78:owners", "s78:low", "s79:four", "s79:tug", "s80:numbers", "s80:rate", "s80:sale", "s81:next", "s81:crash", "s81:question", "s82:owners", "s82:sell", "s83:buyer", "s83:borrow", "s83:go", "s75:works", "s76:lends", "s77:can", "s78:from#2", "s79:sides", "s80:headline", "s80:and", "s81:ask", "s83:only", "s83:is#2"],
  sfx: [['s76:one', 'pop', 0.08], ['s77:two', 'pop', 0.08], ['s78:three', 'pop', 0.08], ['s79:four', 'pop', 0.08], ['s82:sell', 'impact', 0.12]] })
