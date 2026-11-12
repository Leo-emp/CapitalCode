// ---------------------------------------------------------------- s9–s21: step one, saving vs investing (cream).
// Left half LEND: Maya's $100 goes into a bank / a Treasury bill; an IOU ticket comes back; a small interest coin.
// Right half OWN: she buys a share certificate (a pie slice) of a company; profits → a dividend coin to her; the
// company grows a floor and her slice glows. Analogy: a key on a rent tag (fixed fee) vs a handshake (partner).
// A bond certificate with a 10-YEAR tag sits in the middle. A see-saw recap: LEND = SAFETY, OWN = GROWTH.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankFront, BondCert, DollarBill, Ticket } from '../bank/kit'
import { Company, Share } from './kit'

const GROUND = 930

const Save: React.FC<PieceProps> = ({ f, c }) => {
  const step9 = c('s9:step'), saving9 = c('s9:saving'), investing9 = c('s9:investing')
  const maya10 = c('s10:maya'), d100 = c('s10:100')
  const saves = c('s11:saves'), safe11 = c('s11:safe'), bank11 = c('s11:bank'), treasury11 = c('s11:treasury')
  const cases = c('s12:cases'), lending12 = c('s12:lending'), government12 = c('s12:government'), back12 = c('s12:back'), interest12 = c('s12:interest')
  const safe13 = c('s13:safe'), grows13 = c('s13:grows'), rate13 = c('s13:rate')
  const invests = c('s14:invests'), stocks14 = c('s14:stocks'), different = c('s14:different'), slice14 = c('s14:slice'), companies14 = c('s14:companies')
  const share15 = c('s15:share'), owns = c('s15:owns'), profits = c('s15:profits')
  const choice19 = c('s19:choice'), piece15b = c('s15:piece#2'), maya16 = c('s16:maya'), money16 = c('s16:money'), paid16 = c('s16:paid'), dividend = c('s16:dividend')
  const grows17 = c('s17:grows'), earns17 = c('s17:earns'), slice17 = c('s17:slice'), worth17 = c('s17:worth')
  const think18 = c('s18:think'), renting = c('s18:renting'), fee = c('s18:fee'), owning18 = c('s18:owning'), partner = c('s18:partner'), good18 = c('s18:good'), bad18 = c('s18:bad')
  const between = c('s19:between'), bonds19 = c('s19:bonds'), longer = c('s19:longer'), y10 = c('s19:10'), pays19 = c('s19:pays'), savings19 = c('s19:savings')
  const saving20 = c('s20:saving'), safety20 = c('s20:safety'), owning20 = c('s20:owning'), grow20 = c('s20:grow')
  const difference21 = c('s21:difference'), lending21 = c('s21:lending'), owning21 = c('s21:owning'), next21 = c('s21:next')

  const AB = think18 - 8, BC = saving20 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  // # the $100 bill: from Maya (centre) to the bank (left) on "saves", or to the company (right) on "invests"
  const toBank = fly(f, saves, [960, 560], [400, 640], 18, 140), toCo = fly(f, invests, [960, 560], [1520, 640], 18, 140)

  return (
    <g>
      <Stage id="iv-save" frame={f} />
      {/* # A) lend vs own */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <line x1={960} y1={250} x2={960} y2={GROUND} stroke="#CDB58C" strokeWidth={5} strokeDasharray="14 12" opacity={on(f, saving9, 8)} />
        <g opacity={on(f, saving9, 8)}><Label x={430} y={300} text="SAVING = LENDING" size={60} font="Bebas Neue" color={P.ink} o={on(f, lending12, 8) * 1 + (1 - on(f, lending12, 8)) * 1} /></g>
        <g opacity={on(f, investing9, 8)}><Label x={1490} y={300} text={f >= owns ? 'INVESTING = OWNING' : 'INVESTING'} size={60} font="Bebas Neue" color={P.ink} /></g>
        {/* left: bank + Treasury bill + IOU + interest coin */}
        <g opacity={on(f, bank11, 8)}><BankFront x={330} y={GROUND} s={0.7} open={on(f, saves, 12)} /></g>
        <g opacity={on(f, treasury11, 8)} transform={`translate(640 ${700 - 10 * pop(f, treasury11, 12)})`}><BondCert x={0} y={0} s={0.7} t="T-BILL" /></g>
        <g opacity={on(f, back12, 8)} transform={`translate(560 ${480 - 12 * pop(f, back12, 12)})`}><Ticket x={0} y={0} s={0.9} t="IOU + INTEREST" glow={win(f, back12, back12 + 30)} /></g>
        {(() => { const fl = fly(f, interest12, [420, 560], [860, 760], 18, 100); return fl.t > 0 && fl.t < 1 ? <Coin x={fl.x} y={fl.y} s={0.5} /> : null })()}
        <g opacity={on(f, grows13, 8)}><Label x={430} y={GROUND + 60} text={f >= rate13 ? 'GROWS BY A SMALL RATE' : 'SAFE…'} size={44} font="Bebas Neue" color={P.ink2} /></g>
        {/* right: company + share + dividend + growth */}
        <g opacity={on(f, companies14, 8)}><Company x={1560} y={GROUND} s={0.85} name="MAPLE FOODS" grow={on(f, grows17, 30)} glow={win(f, earns17, worth17 + 30, 8)} /></g>
        <g opacity={on(f, share15, 8)} transform={`translate(1290 ${560 - 12 * pop(f, owns, 12) - 12 * pop(f, slice17, 12)})`}><Share x={0} y={0} s={0.9 + 0.08 * win(f, piece15b, piece15b + 20, 6)} slice={0.12 + 0.06 * on(f, worth17, 20)} /></g>
        <g opacity={on(f, profits, 8) * (1 - on(f, think18 - 20, 8))}><Label x={1490} y={GROUND + 60} text={f >= dividend ? 'PROFIT PAID OUT = DIVIDEND' : 'A SLICE OF THE PROFITS'} size={42} font="Bebas Neue" color={P.goldInk} /></g>
        {(() => { const fl = fly(f, paid16, [1560, 500], [1020, 640], 20, 140); return fl.t > 0 && fl.t < 1 ? <Coin x={fl.x} y={fl.y} s={0.9} /> : null })()}
        {/* Maya and her bill */}
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [d100, 'holdUp', 'smiling'], [saves, 'offer', 'smiling'], [safe13, 'idle', 'neutral'], [invests, 'offer', 'smiling'], [paid16, 'receive', 'smiling'], [maya16, 'holdUp', 'smiling'], [worth17, 'celebrate', 'smiling']]} x={960} y={GROUND} s={1.0} />
        {f >= d100 && f < saves && <DollarBill x={1030} y={420} s={0.7} r={-8} t="$100" />}
        {toBank.t > 0 && toBank.t < 1 && <DollarBill x={toBank.x} y={toBank.y} s={0.7} t="$100" />}
        {toCo.t > 0 && toCo.t < 1 && <DollarBill x={toCo.x} y={toCo.y} s={0.7} t="$100" />}
      </g>}

      {/* # B) the analogy and bonds */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, renting, 8)} transform="translate(420 0)">
          <g transform={`translate(0 ${560 - 10 * pop(f, renting, 12)})`}><circle cx={-50} cy={0} r={46} fill="none" stroke={P.goldD} strokeWidth={16} /><rect x={-6} y={-10} width={150} height={20} rx={8} fill={P.goldD} /><rect x={110} y={10} width={16} height={30} fill={P.goldD} /><rect x={80} y={10} width={16} height={22} fill={P.goldD} /></g>
          <g opacity={on(f, fee, 8)}><Coin x={0} y={720} s={0.9} /><Label x={0} y={820} text="A SMALL, FIXED FEE" size={46} font="Bebas Neue" color={P.ink} /></g>
          <Label x={0} y={380} text="LENDING = RENTING IT OUT" size={52} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, owning18, 8)} transform="translate(1500 0)">
          <Person f={f} who="investorF" beats={[[owning18, 'idle', 'smiling'], [partner, 'handshake', 'smiling']]} x={-110} y={GROUND} s={0.9} />
          <Person f={f} who="owner" beats={[[owning18, 'idle', 'smiling'], [partner, 'handshake', 'smiling'], [bad18, 'shrug', 'worried']]} x={110} y={GROUND} s={0.9} flip />
          <Label x={0} y={330} text="OWNING = BEING A PARTNER" size={52} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, good18, 8)}><Label x={-110} y={410} text="GOOD YEARS" size={42} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, bad18, 8)}><Label x={110} y={410} text="BAD YEARS" size={42} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, bonds19, 10)} transform={`translate(960 ${640 - 12 * pop(f, bonds19, 12)})`}>
          <BondCert x={0} y={0} s={1.2} t="BOND" tag={f >= y10 ? '10 YEARS' : 'LOAN'} tagO={on(f, longer, 8)} />
          <g opacity={on(f, pays19, 8)}><Label x={0} y={170} text={f >= savings19 ? 'PAYS A BIT MORE THAN SAVINGS' : 'PAYS A BIT MORE…'} size={40} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, between, 8) * (1 - on(f, bonds19, 8))} transform={`translate(0 ${-10 * pop(f, choice19, 12)})`}><Label x={960} y={640} text="IN BETWEEN…" size={56} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      {/* # C) the see-saw recap */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g transform={`translate(960 760) rotate(${-8 * on(f, owning20, 16) + 8 * on(f, safety20, 16) - 8 * on(f, safety20 + 20, 16)})`}>
          <rect x={-620} y={-14} width={1240} height={28} rx={14} fill="#8E5B3A" />
          <g transform="translate(-480 -14)" opacity={on(f, saving20, 8)}><BankFront x={0} y={0} s={0.45} /><Label x={0} y={-260} text={f >= safety20 ? 'LEND: SAFETY' : 'LEND'} size={52} font="Bebas Neue" color={P.ink} /></g>
          <g transform="translate(480 -14)" opacity={on(f, owning20, 8)}><Company x={0} y={0} s={0.5} name="BUSINESSES" grow={on(f, grow20, 20)} /><Label x={0} y={-280} text={f >= grow20 ? 'OWN: GROWTH' : 'OWN'} size={52} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        <path d="M960 774 L900 930 L1020 930 Z" fill="#6E4F33" />
        <g opacity={on(f, difference21, 8)}><Label x={960} y={300} text={f >= next21 ? 'THIS DRIVES EVERYTHING NEXT' : 'LENDING VS OWNING'} size={56} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      <Headline f={f} lines={[[step9, 'STEP 1: SAVING VS INVESTING', P.ink, 100], [lending12, 'SAVING = LENDING', P.ink, 106], [invests, 'INVESTING = OWNING', P.ink, 106], [think18, 'RENTING VS PARTNERING', P.ink, 106], [between, 'BONDS: A LONGER LOAN', P.ink, 106], [saving20, 'SAFETY VS GROWTH', P.ink, 108]]} />
      <Vignette id="iv-save" />
    </g>
  )
}

const BEATS = ['s19:choice', 's15:piece#2', 's16:maya', 's9:step', 's9:saving', 's9:investing', 's10:maya', 's10:100', 's11:saves', 's11:safe', 's11:bank', 's11:treasury', 's12:cases', 's12:lending', 's12:government', 's12:back', 's12:interest', 's13:safe', 's13:grows', 's13:rate', 's14:invests', 's14:stocks', 's14:different', 's14:slice', 's14:companies', 's15:share', 's15:owns', 's15:profits', 's16:money', 's16:paid', 's16:dividend', 's17:grows', 's17:earns', 's17:slice', 's17:worth', 's18:think', 's18:renting', 's18:fee', 's18:owning', 's18:partner', 's18:good', 's18:bad', 's19:between', 's19:bonds', 's19:longer', 's19:10', 's19:pays', 's19:savings', 's20:saving', 's20:safety', 's20:owning', 's20:grow', 's21:difference', 's21:lending', 's21:owning', 's21:next']
export const IV_SAVE = makePiece('iv-save', 'Investing step one: Maya’s $100 flies to a bank and a T-bill (lending: an IOU plus interest, a small interest coin) or to a company where she gets a share certificate pie slice, a dividend coin flies back and the company grows a floor; renting money out for a small fixed fee (a key and a coin) vs being a partner (handshake, good and bad years); a bond certificate with a 10-year tag in between; a see-saw recap lend = safety, own = growth', {
  mood: 'light', Component: Save, beats: BEATS,
  sfx: [['s11:saves', 'pop', 0.15], ['s14:invests', 'pop', 0.15], ['s16:dividend', 'coin', 0.2], ['s18:partner', 'pop', 0.15]] })
