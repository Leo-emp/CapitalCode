// ---------------------------------------------------------------- s9–s16: step one, what a share is (morning, the bakery front).
// A) Rosa (made-up) outside her bakery; a $10,000-a-year profit stack; a dashed outline of a second shop with a $40,000 tag.
// B) Her empty pockets; a bank with a loan paper is crossed (instead of borrowing); a grid cuts the bakery front into
//    1,000 pieces; one piece flips into a share certificate.
// C) Two stacks of certificates: 600 stay with Rosa, 400 slide to three investors who pay $100 coins; the coins pile up
//    to $40,000, roll into the bakery and the second shop builds brick by brick.
// D) Both shops with the grid: one piece glows (one thousandth), then the oven, the two shops and a coin of profit light
//    in turn (one thousandth of each).
// E) A door marked IPO with a queue of the public; then a lottery ticket (crossed) next to the glowing certificate:
//    ownership in a real business.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bakery, Coin, Folk, Label, M, No, Share, Town } from './kit'

const G = 940

const Stack: React.FC<{ x: number; y: number; n: number; o?: number; label: string }> = ({ x, y, n, o = 1, label }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: n }, (_, k) => <rect key={k} x={-90 + (k % 2) * 4} y={-20 - k * 14} width={180} height={12} rx={3} fill={k % 2 ? M.paper : '#F0E4CC'} stroke={M.teal} strokeWidth={2} />)}
    <text y={50} textAnchor="middle" fill={M.ink} style={BB(52)}>{label}</text>
  </g>
)

const ShareP: React.FC<PieceProps> = ({ f, c }) => {
  const madeup9 = c('s9:madeup'), owned9 = c('s9:owned'), baker9 = c('s9:baker'), rosa9 = c('s9:rosa'), that13 = c('s13:that'), one14b = c('s14:one#2')
  const makes10 = c('s10:makes'), k10 = c('s10:10000'), wants10 = c('s10:wants'), second10 = c('s10:second'), costs10 = c('s10:costs'), k40 = c('s10:40000')
  const doesnt11 = c("s11:doesn't"), instead11 = c('s11:instead'), borrowing11 = c('s11:borrowing'), cuts11 = c('s11:cuts'), k1000 = c('s11:1000'), equal11 = c('s11:equal'), each11 = c('s11:each'), share11 = c('s11:share')
  const keeps12 = c('s12:keeps'), k600 = c('s12:600'), sells12 = c('s12:sells'), k400 = c('s12:400'), investors12 = c('s12:investors'), d100 = c('s12:100')
  const times13 = c('s13:times'), k40b = c('s13:40000'), goes13 = c('s13:goes'), second13 = c('s13:second'), built13 = c('s13:built')
  const every14 = c('s14:every'), thousandth14 = c('s14:thousandth'), whole14 = c('s14:whole'), ovens14 = c('s14:ovens'), shops14 = c('s14:shops'), profits14 = c('s14:profits')
  const company15 = c('s15:company'), public15 = c('s15:public'), first15 = c('s15:first'), ipo15 = c('s15:ipo'), offering15 = c('s15:offering')
  const lottery16 = c('s16:lottery'), ticket16 = c('s16:ticket'), piece16 = c('s16:piece'), ownership16 = c('s16:ownership'), real16 = c('s16:real')

  const AB = doesnt11 - 4, BC = keeps12 - 6, CD = every14 - 6, DE = company15 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = win(f, CD - 8, DE), E = on(f, DE - 8, 10)

  const aBeats: Beat[] = [[0, 'idle', 'smiling'], [owned9, 'present', 'smiling'], [baker9, 'waveA', 'smiling', 'waveB', 14], [makes10, 'present', 'smiling'], [wants10, 'pointUp', 'smiling'], [costs10, 'shock', 'shocked']]
  const bBeats: Beat[] = [[AB, 'emptyPockets', 'worried'], [instead11, 'crossNoA', 'neutral', 'crossNoB', 12], [cuts11, 'explain', 'smiling'], [each11, 'holdUp', 'smiling']]
  const cBeats: Beat[] = [[BC, 'holdChest', 'smiling'], [sells12, 'offer', 'smiling'], [d100, 'receive', 'smiling'], [that13, 'celebrate', 'smiling'], [goes13, 'point', 'smiling'], [built13, 'thumbsUp', 'smiling']]
  const toInv = span(f, sells12, k400 + 20)
  const pile = span(f, d100, k40b)
  const build = span(f, second13, built13 + 10)

  return (
    <g>
      <Town id="mk-s-base" f={f} mood="morning" />
      {/* # A) Rosa, her profit, the second shop she wants */}
      {A > 0 && <g opacity={A}>
        <Town id="mk-s-a" f={f} mood="morning" />
        <Bakery x={700} y={G} s={0.95} f={f} />
        <Person f={f} who="investorF" beats={aBeats} x={300} y={G} s={0.85} />
        <g opacity={on(f, rosa9, 8) * (1 - on(f, makes10, 8))}><Label x={300} y={G + 60} text="ROSA (MADE-UP)" size={44} /></g>
        <g opacity={on(f, k10, 10) * (1 - on(f, second10, 8))}>{Array.from({ length: 6 }, (_, k) => <Coin key={k} x={1250} y={G - 30 - k * 22} s={0.7} o={on(f, k10 + k * 2, 5)} />)}<Label x={1250} y={G + 60} text="$10,000 PROFIT A YEAR" size={44} /></g>
        <g opacity={on(f, second10, 10)}><rect x={1170} y={G - 430} width={480} height={430} fill="none" stroke={M.ink2} strokeWidth={6} strokeDasharray="22 14" />
          <text x={1410} y={G - 220} textAnchor="middle" fill={M.ink2} style={BB(56)}>SHOP 2?</text>
          <g opacity={on(f, k40, 8)} transform={`translate(1410 ${G - 500 - 10 * pop(f, k40, 12)})`}><Label x={0} y={0} text="COSTS $40,000" size={54} fill={M.red} ink="#FFFFFF" /></g></g>
      </g>}

      {/* # B) not a loan: cut the bakery into 1,000 shares */}
      {B > 0 && <g opacity={B}>
        <Town id="mk-s-b" f={f} mood="morning" />
        <Person f={f} who="investorF" beats={bBeats} x={300} y={G} s={0.85} />
        <g opacity={win(f, instead11, cuts11, 8)} transform={`translate(1350 ${G})`}>
          <rect x={-200} y={-320} width={400} height={320} fill="#D9D2C4" /><path d="M-230 -320 L0 -430 L230 -320 Z" fill="#A8A091" /><text y={-345} textAnchor="middle" fill={M.ink} style={BB(46)}>BANK</text>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-170 + k * 95} y={-300} width={40} height={300} fill="#C2B9A8" />)}
          <g transform="translate(-260 -200) rotate(-8)"><rect x={-80} y={-100} width={160} height={200} rx={8} fill={M.paper} /><text y={-40} textAnchor="middle" fill={M.ink} style={BB(44)}>LOAN</text></g>
          <No x={-60} y={-200} r={170} o={on(f, borrowing11, 8)} />
        </g>
        <g opacity={on(f, cuts11 - 4, 10)}>
          <Bakery x={1200} y={G} s={1.1} f={f} grid={span(f, cuts11, k1000 + 6)} lift={on(f, each11, 16) * (1 - on(f, share11 + 8, 8))} />
          <g opacity={on(f, k1000, 8)}><Label x={1200} y={G + 60} text={f >= equal11 ? '1,000 EQUAL PIECES' : '1,000 PIECES'} size={52} /></g>
          <g opacity={on(f, share11, 10)}><Share x={760} y={430 - 16 * (1 - pop(f, share11, 14))} s={0.95} r={-6} big="1 SHARE" /></g>
        </g>
      </g>}

      {/* # C) 600 stay, 400 sold at $100; the second shop is built */}
      {Cc > 0 && <g opacity={Cc}>
        <Town id="mk-s-c" f={f} mood="noon" />
        <Person f={f} who="investorF" beats={cBeats} x={260} y={G} s={0.82} />
        <g opacity={1 - on(f, goes13, 10)}>
          <Stack x={560} y={G - 20} n={12} label={f >= k600 ? '600 KEPT' : ''} o={on(f, keeps12, 10)} />
          {/* the 400 slide right to the investors */}
          <g transform={`translate(${lerp(560, 960, toInv)} 0)`} opacity={on(f, sells12, 8)}><Stack x={0} y={G - 20 - 180} n={8} label={f >= k400 ? '400 SOLD' : ''} /></g>
          <g opacity={on(f, investors12, 10)}>{[0, 1, 2].map((k) => <Folk key={k} x={1250 + k * 130} y={G} s={2.2} c={['#C27A5E', M.teal, '#7C6BAA'][k]} />)}</g>
          {f >= d100 && [0, 1, 2].map((k) => { const t = span(f, d100 + k * 6, d100 + k * 6 + 20); return <Coin key={k} x={lerp(1250 + k * 130, 960, t)} y={lerp(G - 180, G - 360, t) - 90 * Math.sin(t * Math.PI)} s={0.55} text="$100" o={t < 1 ? 1 : 0} /> })}
          <g opacity={on(f, times13, 10)}><Label x={960} y={330} text={f >= k40b ? '400 × $100 = $40,000' : '400 × $100'} size={64} fill={M.ink} ink="#FFFFFF" /></g>
          <g opacity={on(f, d100 + 10, 10)}>{Array.from({ length: Math.round(8 * pile) }, (_, k) => <Coin key={k} x={960 + (k % 4) * 50 - 75} y={G - 380 - Math.floor(k / 4) * 30} s={0.5} />)}</g>
        </g>
        {/* the money goes to the bakery; shop 2 is built */}
        <g opacity={on(f, goes13, 10)}>
          <Bakery x={760} y={G} s={0.85} f={f} glow={win(f, goes13, second13, 6)} />
          <g transform={`translate(1300 ${G})`}><clipPath id="mk-s-build"><rect x={-260} y={-460 * build * 0.85} width={520} height={460} /></clipPath>
            <g clipPath="url(#mk-s-build)"><Bakery x={0} y={0} s={0.85} f={f} sign="ROSA'S 2" awning={M.brick} /></g>
            <rect x={-230} y={-430 * 0.85} width={460} height={430 * 0.85} fill="none" stroke={M.ink2} strokeWidth={5} strokeDasharray="20 12" opacity={1 - build} /></g>
          {(() => { const t = span(f, goes13, goes13 + 20); return t > 0 && t < 1 ? <Coin x={lerp(960, 1300, t)} y={lerp(400, 600, t)} s={0.7} text="$40K" /> : null })()}
        </g>
      </g>}

      {/* # D) one thousandth of everything */}
      {D > 0 && <g opacity={D}>
        <Town id="mk-s-d" f={f} mood="noon" />
        <Bakery x={600} y={G} s={0.85} f={f} grid={1} glow={on(f, shops14, 10)} />
        <Bakery x={1150} y={G} s={0.85} f={f} grid={1} sign="ROSA'S 2" awning={M.brick} glow={on(f, shops14, 10)} />
        <g opacity={on(f, thousandth14, 8)}><rect x={600 - 221 + 13 * 13} y={G - 391 + 9 * 15.6} width={11} height={15.6} fill={M.butter} stroke={M.redD} strokeWidth={3} />
          <Label x={600} y={G + 60} text="1 SHARE = 1/1,000" size={52} /></g>
        <g opacity={on(f, one14b, 8)}><rect x={1150 - 221 + 13 * 13} y={G - 391 + 9 * 15.6} width={11} height={15.6} fill={M.butter} stroke={M.redD} strokeWidth={3} /></g>
        <g opacity={on(f, whole14, 8)}><Label x={880} y={300} text="OF THE WHOLE BUSINESS" size={52} fill={M.ink} ink="#FFFFFF" /></g>
        <g opacity={on(f, ovens14, 10)} transform={`translate(1600 ${G})`}><rect x={-110} y={-220} width={220} height={220} rx={16} fill="#6E6A72" /><rect x={-80} y={-180} width={160} height={110} rx={12} fill="#2A2A30" /><rect x={-70} y={-170} width={140} height={90} rx={10} fill="#FF9B4A" opacity={0.7 + 0.3 * Math.sin(f / 5)} /><text y={-30} textAnchor="middle" fill="#FFFFFF" style={BB(36)}>OVEN</text></g>
        <g opacity={on(f, profits14, 10)}><Coin x={1600} y={500 - 12 * pop(f, profits14, 12)} s={1.2} /></g>
      </g>}

      {/* # E) the IPO door; not a lottery ticket */}
      {E > 0 && <g opacity={E}>
        <Town id="mk-s-e" f={f} mood="noon" />
        <g opacity={1 - on(f, lottery16, 10)}>
          <Bakery x={760} y={G} s={0.9} f={f} />
          <g opacity={on(f, ipo15, 10)} transform={`translate(860 ${G - 300 - 10 * pop(f, ipo15, 12)})`}><Label x={0} y={0} text="IPO" size={80} fill={M.butter} /></g>
          {Array.from({ length: 6 }, (_, k) => <Folk key={k} x={1120 + k * 110} y={G} s={2} c={['#C27A5E', M.teal, '#7C6BAA', M.brick, '#5E8F6E', '#B08A3C'][k]} o={on(f, public15 + k * 3, 8)} />)}
          <g opacity={on(f, first15, 8)}><Label x={1400} y={G - 270} text="FIRST SALE TO THE PUBLIC" size={46} /></g>
          <g opacity={on(f, offering15, 8)}><Label x={760} y={G + 60} text="INITIAL PUBLIC OFFERING" size={46} fill={M.ink} ink="#FFFFFF" /></g>
        </g>
        <g opacity={on(f, lottery16, 10)}>
          <g transform="translate(620 520) rotate(-8)"><rect x={-180} y={-110} width={360} height={220} rx={14} fill="#F7D84A" /><circle cx={-180} cy={0} r={26} fill={M.cream} /><circle cx={180} cy={0} r={26} fill={M.cream} />
            <text y={-20} textAnchor="middle" fill={M.ink} style={BB(56)}>LOTTERY</text><text y={50} textAnchor="middle" fill={M.ink} style={BB(44)}>№ 0417</text></g>
          <No x={620} y={520} r={170} o={on(f, ticket16, 8)} />
          <g opacity={on(f, piece16, 10)}><Share x={1300} y={500 - 12 * pop(f, piece16, 12)} s={1.3} big="1 SHARE" />
            {f >= ownership16 && <ellipse cx={1300} cy={500} rx={260} ry={170} fill={M.butter} opacity={0.18 + 0.08 * Math.sin(f / 6)} />}</g>
          <g opacity={on(f, real16, 8)}><Label x={1300} y={760} text="OWNERSHIP OF A REAL BUSINESS" size={48} fill={M.tealD} ink="#FFFFFF" /></g>
        </g>
      </g>}

      <Headline f={f} lines={[[rosa9, "ROSA'S BAKERY", M.ink, 100], [second10, 'SHE NEEDS $40,000', M.ink, 100], [cuts11, 'CUT INTO 1,000 SHARES', M.ink, 100], [sells12, 'SELL 400 SHARES AT $100', M.ink, 96], [every14, 'EACH SHARE OWNS 1/1,000', M.ink, 96], [ipo15, 'THE FIRST SALE: AN IPO', M.ink, 100], [lottery16, 'NOT A LOTTERY TICKET', M.ink, 100]]} />
    </g>
  )
}

export const MK_SHARE = makePiece('mk-share', 'Step one, what a share is: Rosa (made-up) outside her bakery, a $10,000-a-year profit coin stack, a dashed SHOP 2? outline tagged COSTS $40,000; empty pockets, a BANK with a LOAN paper crossed; a grid cuts the bakery front into 1,000 equal pieces and one lifts out into a 1 SHARE certificate; 600 certificates stay, 400 slide to three investors who pay $100 coins, 400 × $100 = $40,000, the coins roll into the bakery and the second shop builds; both shops with the grid, one piece glows (1/1,000), then the whole business, the oven and a profit coin; a door marked IPO with a queue of the public (initial public offering); a lottery ticket crossed beside a glowing share certificate (ownership of a real business)', {
  mood: 'light', Component: ShareP,
  beats: ["s9:owned", "s9:baker", "s9:rosa", "s13:that", "s14:one#2", "s10:makes", "s10:10000", "s10:wants", "s10:second", "s10:costs", "s10:40000", "s11:doesn't", "s11:instead", "s11:borrowing", "s11:cuts", "s11:1000", "s11:equal", "s11:each", "s11:share", "s12:keeps", "s12:600", "s12:sells", "s12:400", "s12:investors", "s12:100", "s13:times", "s13:40000", "s13:goes", "s13:second", "s13:built", "s14:every", "s14:thousandth", "s14:whole", "s14:ovens", "s14:shops", "s14:profits", "s15:company", "s15:public", "s15:first", "s15:ipo", "s15:offering", "s16:lottery", "s16:ticket", "s16:piece", "s16:ownership", "s16:real"],
  sfx: [['s11:borrowing', 'thud', 0.12], ['s11:1000', 'click', 0.12], ['s12:100', 'coin', 0.14], ['s13:built', 'chime', 0.14], ['s16:ticket', 'thud', 0.12]] })
