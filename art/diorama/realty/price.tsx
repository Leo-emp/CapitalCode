// ---------------------------------------------------------------- s6–s17: step one — who really sets the price (one made-up house).
// A big paper house with a garden fence. A) The owner wants to move: FOR SALE sign, asking $420,000 (ASKING PRICE = a
//    guess); three similar houses on the hill behind get SOLD signs (what nearby homes sold for).
// B) Two buyers arrive with paper offer cards, $410,000 and $415,000; she shakes hands with the higher one and the sign
//    flips to SOLD $415,000. If nobody had come close: a PRICE CUT ↓ tag. She is a buyer too: she carries a moving box.
// C) The bank: an appraiser with a clipboard checks the house; if the appraisal comes in below the offer, the loan shrinks
//    and the price is renegotiated. Every price = where one seller and the buyers meet; what decides what buyers can pay?
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { DayWorld, Street, House, LawnSign, Tag, Bank, Clipboard, CoinStack, Paper, Vig, Tree, TXT, INK, CORAL, MINT, MUSTARD, PAPER, SLATE, ROOFS, WALLS, Life } from './kit'

const GY = 880

const Offer: React.FC<{ x: number; y: number; t: string; s?: number; col?: string }> = ({ x, y, t, s = 1, col = PAPER }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><Paper d="M-80 -46 L80 -46 L80 46 L-80 46 Z" fill={col} dx={4} dy={5} /><text y={-14} textAnchor="middle" fill={INK} style={TXT(26)}>OFFER</text><text y={30} textAnchor="middle" fill={INK} style={TXT(44)}>{t}</text></g>
)

const Price: React.FC<PieceProps> = ({ f, c }) => {
  const house = c('s6:house'), made = c('s6:made'), real6 = c('s6:real')
  const owner = c('s7:owner'), move = c('s7:move'), sale = c('s7:sale'), d420 = c('s7:420000')
  const asking = c('s8:asking'), guess = c('s8:guess')
  const similar = c('s9:similar'), sold9 = c('s9:sold'), recently = c('s9:recently')
  const buyers = c('s10:buyers'), d410 = c('s10:410000'), second = c('s10:second'), d415 = c('s10:415000')
  const takes = c('s11:takes'), higher = c('s11:higher'), realP = c('s11:real'), agreed = c('s11:agreed')
  const nobody = c('s12:nobody'), cut = c('s12:cut')
  const sellers = c('s13:sellers'), buyers13 = c('s13:buyers'), rent = c('s13:rent')
  const check = c('s14:check'), bank = c('s14:bank'), appraiser = c('s14:appraiser'), worth = c('s14:worth')
  const below = c('s15:below'), loan = c('s15:loan'), lower = c('s15:lower'), reneg = c('s15:renegotiated')
  const meeting = c('s16:meeting'), seller16 = c('s16:seller'), show = c('s16:show')
  const big = c('s17:big'), decides = c('s17:decides'), pay = c('s17:pay')

  const B = win(f, buyers - 6, sellers - 4, 12), C = on(f, check - 6, 12)
  const seller: Beat[] = [[owner, 'idle', 'smiling'], [move, 'point', 'smiling'], [d420, 'present', 'smiling'], [guess, 'think', 'thinking'], [similar, 'lookFar', 'thinking'], [buyers, 'waveA', 'smiling', 'waveB', 10], [higher, 'handshake', 'smiling'], [nobody, 'nervous', 'worried'], [cut, 'pointDown', 'worried'], [sellers, 'carry', 'smiling'], [check, 'idle', 'neutral'], [below, 'shock', 'worried'], [reneg, 'handshake', 'smiling'], [meeting, 'present', 'smiling']]
  const buyer1: Beat[] = [[buyers, 'idle', 'smiling'], [d410, 'offer', 'smiling'], [takes, 'shrug', 'neutral']]
  const buyer2: Beat[] = [[second, 'idle', 'smiling'], [d415, 'offer', 'smiling'], [higher, 'handshake', 'smiling'], [agreed, 'celebrate', 'smiling']]
  const appr: Beat[] = [[appraiser, 'hold', 'thinking'], [worth, 'read', 'thinking'], [below, 'shrug', 'neutral'], [lower, 'pointDown', 'neutral']]
  const sellerX = B > 0.5 ? lerp(1120, 1180, on(f, higher, 16)) : 1120
  const b1 = hand(f, buyer1, 1500, GY + 20, 0.8, true), b2 = hand(f, buyer2, 1740, GY + 20, 0.8, true), ap = hand(f, appr, 1460, GY + 20, 0.8, true)
  const signT = f >= realP ? '$415,000' : f >= d420 ? '$420,000' : undefined
  const signTop = f >= realP && f < nobody ? 'SOLD' : 'FOR SALE'

  return (
    <g>
      <DayWorld f={f} id="re-price" />
      {/* comparable houses on the hill behind (A) */}
      <g opacity={win(f, similar - 4, buyers - 6, 10)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, similar + k * 4, 8)}>
        <House x={1360 + k * 200} y={740} s={0.36} roof={ROOFS[k + 2]} wall={WALLS[k + 1]} />
        <g opacity={on(f, sold9 + k * 4, 6)}><LawnSign x={1360 + k * 200 + 70} y={746} s={0.36} top="SOLD" col={MINT} /></g>
      </g>)}<g opacity={on(f, recently, 8)}><Tag x={1560} y={560} t="SOLD NEARBY, RECENTLY" size={38} /></g></g>
      <Street y={GY} />
      {/* the garden fence and the big house */}
      <g opacity={on(f, house - 4, 10)}>
        {Array.from({ length: 14 }, (_, i) => <rect key={i} x={280 + i * 52} y={GY - 70} width={14} height={70} rx={4} fill="#FFFFFF" />)}
        <rect x={270} y={GY - 50} width={720} height={10} fill="#FFFFFF" />
        <Tree x={220} y={GY} s={1.1} />
        <House x={640} y={GY - 6} s={1.45} roof={ROOFS[0]} wall={WALLS[1]} />
        <g opacity={on(f, sale, 8)}><LawnSign x={960} y={GY + 6} s={1.1} t={signT} top={signTop} col={signTop === 'SOLD' ? MINT : CORAL} /></g>
        <g opacity={win(f, asking, similar, 8)}><Tag x={960} y={330} t="ASKING PRICE = A GUESS" size={46} /></g>
        <g opacity={win(f, made, owner, 8)}><Tag x={1340} y={420} t="MADE-UP HOUSE, REAL STEPS" size={44} /></g>
        <g opacity={win(f, cut, sellers, 8)} transform={`translate(960 ${GY - 220}) scale(${pop(f, cut, 12)})`}><Paper d="M-120 -40 L120 -40 L120 40 L-120 40 Z" fill={CORAL} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>PRICE CUT ↓</text></g>
      </g>
      {/* the seller */}
      <Person f={f} who="owner" beats={seller} x={sellerX} y={GY + 20} s={0.8} flip={B > 0.5} />
      <g opacity={win(f, sellers, check - 4, 8)}><Tag x={960} y={330} t="SELLERS ARE BUYERS TOO" size={48} /></g>
      <g opacity={win(f, buyers13, check - 4, 8)}>
        <g transform="translate(1400 640)"><House x={0} y={0} s={0.3} roof={ROOFS[3]} wall={WALLS[3]} /><text y={50} textAnchor="middle" fill={INK} style={TXT(32)}>BUY</text></g>
        <g opacity={on(f, rent, 8)}><g transform="translate(1600 640)"><rect x={-60} y={-150} width={120} height={150} fill="#E8C9A6" />{[0, 1, 2].map((r) => <rect key={r} x={-40} y={-135 + r * 45} width={80} height={28} fill="#9BC3D9" />)}<text y={50} textAnchor="middle" fill={INK} style={TXT(32)}>OR RENT</text></g></g>
      </g>

      {/* # B) two buyers with offers */}
      {B > 0.001 && <g opacity={B}>
        <Person f={f} who="buyer" beats={buyer1} x={1500} y={GY + 20} s={0.8} flip />
        <g opacity={on(f, second - 4, 10)}><Person f={f} who="investorF" beats={buyer2} x={1740} y={GY + 20} s={0.8} flip /></g>
        {f >= d410 && f < takes + 10 && <g transform={`translate(${b1.x - 30} ${b1.y - 40}) scale(${pop(f, d410, 12)})`}><Offer x={0} y={0} t="$410,000" s={0.9} /></g>}
        {f >= d415 && f < higher + 6 && <g transform={`translate(${b2.x - 30} ${b2.y - 40}) scale(${pop(f, d415, 12)})`}><Offer x={0} y={0} t="$415,000" s={0.9} col="#E2F3E8" /></g>}
        <g opacity={win(f, agreed, nobody, 8)}><Tag x={960} y={330} t="THE PRICE = WHAT A BUYER AGREED TO PAY" size={44} /></g>
        <g opacity={win(f, nobody, sellers, 8)}><Tag x={960} y={330} t="NO OFFER CLOSE?" size={48} /></g>
      </g>}

      {/* # C) the bank's check */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={on(f, bank, 10)}><Bank x={1730} y={GY - 40} s={0.55} /></g>
        <g opacity={on(f, appraiser - 4, 10)}><Person f={f} who="investor" beats={appr} x={1460} y={GY + 20} s={0.8} flip /></g>
        {f >= appraiser && <g transform={`translate(${ap.x - 20} ${ap.y - 20})`}><Clipboard x={0} y={0} s={0.8} r={-8} /></g>}
        <g opacity={win(f, worth, below, 8)}><Tag x={960} y={330} t="APPRAISAL: WHAT IS IT WORTH?" size={46} /></g>
        <g opacity={win(f, below, meeting, 8)}>
          <g opacity={1 - on(f, reneg, 8)}><Tag x={960} y={330} t="APPRAISAL BELOW THE OFFER?" size={46} col={CORAL} tc="#FFFFFF" /></g>
          <CoinStack x={1730} y={GY - 260} n={lerp(8, 5, on(f, loan, 20))} s={0.8} />
          <g opacity={on(f, lower, 8)}><Tag x={1730} y={GY - 420} t="SMALLER LOAN" size={36} /></g>
          <g opacity={on(f, reneg, 8)}><Tag x={960} y={330} t="RENEGOTIATE THE PRICE" size={46} /></g>
        </g>
        {/* the meeting point */}
        <g opacity={win(f, meeting, big, 8)}>
          <path d={`M${lerp(720, 900, on(f, meeting, 20))} 330 L960 330`} stroke={CORAL} strokeWidth={12} strokeLinecap="round" />
          <path d={`M${lerp(1200, 1020, on(f, seller16, 20))} 330 L960 330`} stroke={MINT} strokeWidth={12} strokeLinecap="round" />
          <circle cx={960} cy={330} r={22} fill={MUSTARD} opacity={on(f, show, 8)} />
          <text x={700} y={300} textAnchor="middle" fill={INK} style={TXT(40)}>SELLER</text><text x={1220} y={300} textAnchor="middle" fill={INK} style={TXT(40)}>BUYERS</text>
        </g>
        <g opacity={on(f, decides, 8)}><Tag x={1180} y={330} t="WHAT DECIDES WHAT BUYERS CAN PAY?" size={44} col={MUSTARD} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s6:like")} x={640} y={560} kind="glint" />
        <Life f={f} at={c("s8:pay")} x={640} y={560} kind="glint" />
        <Life f={f} at={c("s9:prices")} x={640} y={560} kind="glint" />
        <Life f={f} at={c("s10:one")} x={1600} y={700} kind="glint" />
        <Life f={f} at={c("s11:dollars")} x={1600} y={700} kind="glint" />
        <Life f={f} at={c("s11:415000")} x={1600} y={700} kind="glint" />
        <Life f={f} at={c("s12:close")} x={960} y={740} kind="glint" />
        <Life f={f} at={c("s13:and")} x={960} y={740} kind="glint" />
        <Life f={f} at={c("s13:she#2")} x={960} y={740} kind="glint" />
        <Life f={f} at={c("s13:she")} x={960} y={740} kind="glint" />
        <Life f={f} at={c("s14:most")} x={1460} y={640} kind="glint" />
        <Life f={f} at={c("s15:appraisal")} x={1460} y={640} kind="glint" />
        <Life f={f} at={c("s15:the#3")} x={1460} y={640} kind="glint" />
        <Life f={f} at={c("s15:price")} x={1460} y={640} kind="glint" />
        <Life f={f} at={c("s16:on")} x={960} y={330} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="re-price" />
      <Headline f={f} lines={[[house, 'ONE HOUSE', INK, 92], [buyers, 'THE BUYERS SHOW UP', INK, 88], [check, 'ONE MORE CHECK: THE BANK', INK, 84], [big, 'THE BIG QUESTION', INK, 92]]} />
    </g>
  )
}

export const RE_PRICE = makePiece('re-price', 'Step one with one made-up paper house behind a white fence: the owner lists it, FOR SALE $420,000 — ASKING PRICE = A GUESS; three similar houses on the hill get SOLD signs (sold nearby, recently); two buyers arrive with paper offer cards $410,000 and $415,000; she shakes hands with the higher one and the sign flips to SOLD $415,000 — the price is what a buyer agreed to pay; a PRICE CUT ↓ tag if no offer had come close; sellers are buyers too (a little house to BUY or a block to RENT); then the bank: an appraiser with a clipboard checks what it is worth; if the appraisal is below the offer, a coin stack shrinks to a SMALLER LOAN and they RENEGOTIATE; seller and buyer arrows meet at one point; WHAT DECIDES WHAT BUYERS CAN PAY?', {
  mood: 'light', Component: Price,
  beats: ["s6:house", "s6:made", "s7:owner", "s7:move", "s7:sale", "s7:420000", "s8:asking", "s8:guess", "s9:similar", "s9:sold", "s9:recently", "s10:buyers", "s10:410000", "s10:second", "s10:415000", "s11:takes", "s11:higher", "s11:real", "s11:agreed", "s12:nobody", "s12:cut", "s13:sellers", "s13:buyers", "s13:rent", "s14:check", "s14:bank", "s14:appraiser", "s14:worth", "s15:below", "s15:loan", "s15:lower", "s15:renegotiated", "s16:meeting", "s16:seller", "s16:show", "s17:big", "s17:decides", "s17:pay", "s6:like", "s8:pay", "s9:prices", "s10:one", "s11:dollars", "s11:415000", "s12:close", "s13:and", "s13:she#2", "s13:she", "s14:most", "s15:appraisal", "s15:the#3", "s15:price", "s16:on"],
  sfx: [['s7:sale', 'pop', 0.08], ['s11:higher', 'swish', 0.1], ['s11:real', 'pop', 0.1], ['s15:below', 'thud', 0.1]] })
