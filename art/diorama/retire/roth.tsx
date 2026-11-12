// ---------------------------------------------------------------- s37–s52: step four, traditional vs Roth (twin greenhouses).
// A) Two glass boxes: TRADITIONAL (the grey TAX sits at its EXIT door: LATER) and ROTH (TAX at its ENTRANCE: NOW;
//    the exit says TAX-FREE).
// B) The test: Jordan holds $1,000 of pay, tax rate 22 %. Ten coins go straight into TRADITIONAL; at ROTH two-and-a-bit
//    coins fly into the TAX envelope first, so $780 goes in.
// C) Both plants grow (7 % a year, 30 years, about ×7.6): TRADITIONAL's tag climbs to $7,612, then 22 % flies out at the
//    exit door → $5,937; ROTH's tag climbs $780 → $5,937, exit TAX-FREE. A big = sign: EXACTLY THE SAME.
// D) A two-step timeline under each box: both pay 22 %, just at different times.
// E) A dial for the tax rate in retirement: 12 % → TRADITIONAL glows ($6,699); 32 % → ROTH glows (traditional $5,176).
// F) A seesaw NOW / LATER; a coin splits between both boxes; a pay bar with a red line at $153,000 for Roth IRAs.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Box, Coin, GreenRoom, Label, Plant, R, TaxBox } from './kit'

const G = 920
const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US')

const Roth: React.FC<PieceProps> = ({ f, c }) => {
  const k401 = c('s37:401k'), ira37 = c('s37:ira'), two37 = c('s37:two'), flavours37 = c('s37:flavours'), traditional37 = c('s37:traditional'), roth37 = c('s37:roth')
  const traditional38 = c('s38:traditional'), now38 = c('s38:now'), later38 = c('s38:later'), goes38 = c('s38:goes'), before38 = c('s38:before'), pay38 = c('s38:pay'), out38 = c('s38:out'), retirement38 = c('s38:retirement')
  const roth39 = c('s39:roth'), now39 = c('s39:now'), later39 = c('s39:later'), first39 = c('s39:first'), qualified39 = c('s39:qualified'), taxfree39 = c('s39:taxfree')
  const more40 = c('s40:more'), test40 = c('s40:test'), sets40 = c('s40:sets'), n1000 = c('s40:1000'), rate40 = c('s40:rate'), n22 = c('s40:22')
  const traditional41 = c('s41:traditional'), all41 = c('s41:all'), box41 = c('s41:box'), roth41 = c('s41:roth'), off41 = c('s41:off'), n780 = c('s41:780')
  const grow42 = c('s42:grow'), n7 = c('s42:7'), n30 = c('s42:30'), ends42 = c('s42:ends'), n76 = c('s42:76'), bigger42 = c('s42:bigger')
  const traditional43 = c('s43:traditional'), n7612 = c('s43:7612'), n22b = c('s43:22'), off43 = c('s43:off'), n5937 = c('s43:5937')
  const roth44 = c('s44:roth'), n780b = c('s44:780'), n5937b = c('s44:5937'), no44 = c('s44:no')
  const exactly45 = c('s45:exactly'), rate45 = c('s45:rate'), now45 = c('s45:now'), later45 = c('s45:later'), equal45 = c('s45:equal')
  const notice46 = c('s46:notice'), n22c = c('s46:22'), cost46 = c('s46:cost'), both46 = c('s46:both'), pay46 = c('s46:pay'), different46 = c('s46:different'), times46 = c('s46:times')
  const difference47 = c('s47:difference'), changes47 = c('s47:changes')
  const retirement48 = c('s48:retirement'), drops48 = c('s48:drops'), n12 = c('s48:12'), n6699 = c('s48:6699'), wins48 = c('s48:wins')
  const rises49 = c('s49:rises'), n32 = c('s49:32'), n5176 = c('s49:5176'), roth49 = c('s49:roth'), wins49 = c('s49:wins')
  const whole50 = c('s50:whole'), question50 = c('s50:question'), lower50 = c('s50:lower'), now50 = c('s50:now'), later50 = c('s50:later')
  const many51 = c('s51:many'), both51 = c('s51:both'), split51 = c('s51:split'), two51 = c('s51:two')
  const limit52 = c('s52:limit'), roth52 = c('s52:roth'), income52 = c('s52:income'), line52 = c('s52:line'), y2026 = c('s52:2026'), phased52 = c('s52:phased'), n153k = c('s52:153000')

  const AB = more40 - 4, CD = exactly45 - 4, DE = difference47 - 4, EF = whole50 - 4
  const A = win(f, 0, AB), BC = win(f, AB - 8, CD), D = win(f, CD - 8, DE), E = win(f, DE - 8, EF), F = on(f, EF - 8, 10)

  // # B/C) the test: values on each box
  const trIn = f >= all41 ? 1000 : 0, rIn = f >= n780 ? 780 : 0
  const g = 1 + 6.6123 * span(f, grow42, n76 + 20)
  const trV = f < traditional43 ? trIn * g : f < n22b ? lerp(trIn * g, 7612, span(f, traditional43, n7612)) : lerp(7612, 5937.6, span(f, off43, n5937 + 6))
  const rV = f < roth44 ? rIn * g : lerp(rIn * g, 5937.6, span(f, roth44, n5937b))
  const in41 = c('s41:in'), now42 = c('s42:now'), income38 = c('s38:income'), retire39 = c('s39:retirement'), now45b = c('s45:now'), later45b = c('s45:later'), one46 = c('s46:one'), other46 = c('s46:other')
  const jB: Beat[] = [[AB, 'holdUp', 'smiling'], [test40, 'pointUp', 'neutral'], [sets40, 'reachDown', 'neutral'], [rate40, 'think', 'thinking'], [now42, 'explain', 'smiling'], [all41, 'offer', 'neutral'], [off41, 'point', 'neutral'], [grow42, 'relax', 'smiling'], [n7612, 'shock', 'shocked'], [n5937, 'point', 'neutral'], [n5937b, 'shock', 'shocked']]
  const grow = 0.2 + 0.75 * span(f, grow42, n76 + 20)
  // # E) the retirement rate dial
  const rate = f < n12 ? 22 : f < n32 ? lerp(22, 12, span(f, drops48, n12 + 6)) : lerp(12, 32, span(f, rises49, n32 + 6))
  const trNet = 7612 * (1 - rate / 100)
  const trWin = on(f, wins48, 8) * (1 - on(f, rises49, 8)), rWin = on(f, wins49, 8)
  // # F) the seesaw tilt
  const tilt = 8 * Math.sin(f / 18)
  const payBar = span(f, income52, n153k + 10)

  return (
    <g>
      <GreenRoom id="rt-r" f={f} mood="gold" floor={G} />
      {/* # A) two flavours */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, traditional37 - 4, 10)}><Box x={560} y={G} s={0.95} tag="TRADITIONAL" door="out" doorTax={on(f, later38, 10)} glow={on(f, traditional38, 10) * (1 - on(f, roth39, 10))}><Plant x={0} y={-30} s={0.9} grow={0.5} f={f} /></Box></g>
        <g opacity={on(f, roth37 - 4, 10)}><Box x={1360} y={G} s={0.95} tag="ROTH" tagColor={R.gold} door="in" doorTax={on(f, now39, 10)} glow={on(f, roth39, 10)}><Plant x={0} y={-30} s={0.9} grow={0.5} f={f} /></Box></g>
        <g opacity={on(f, now38, 8) * (1 - on(f, roth39, 8))}><Label x={560} y={G + 60} text={f >= later38 ? 'NO TAX NOW · TAX LATER' : 'NO TAX NOW'} size={38} /></g>
        {f >= goes38 && f < roth39 && <Coin x={lerp(300, 560, span(f, goes38, before38 + 10))} y={G - 160} s={0.8} />}
        <g opacity={win(f, pay38, roth39, 6)}><TaxBox x={800} y={G - 260} s={0.6} /></g>
        {f >= income38 && f < roth39 && <Coin x={560} y={G - 160 - 30 * pop(f, income38, 12)} s={0.8} />}
        {/* Roth: tax first at the entrance, then a coin leaves tax-free in retirement */}
        {f >= first39 && span(f, first39, first39 + 18) < 1 && <Coin x={lerp(1100, 1180, span(f, first39, first39 + 18))} y={lerp(G - 160, G - 330, span(f, first39, first39 + 18))} s={0.7} />}
        {f >= qualified39 && <Coin x={lerp(1560, 1760, span(f, qualified39, retire39 + 10))} y={G - 160} s={0.8} />}
        <g opacity={on(f, out38, 8) * (1 - on(f, roth39, 8))}><Label x={760} y={G - 470} text="TAXED WHEN IT COMES OUT" size={36} fill={R.grey} ink={R.paper} /></g>
        <g opacity={on(f, roth39, 8)}><Label x={1360} y={G + 60} text={f >= later39 ? 'TAX NOW · NO TAX LATER' : 'TAX NOW'} size={38} fill={R.gold} /></g>
        <g opacity={on(f, taxfree39, 8)}><Label x={1600} y={G - 470} text="QUALIFIED: TAX-FREE OUT" size={36} fill={R.forest} ink={R.paper} /></g>
        <g opacity={on(f, k401, 8) * (1 - on(f, traditional37, 8))}><Label x={960} y={300} text={f >= ira37 ? '401(K) AND IRA' : '401(K)'} size={50} /></g>
      </g>}
      {/* # B + C) the $1,000 test and the growth */}
      {BC > 0 && <g opacity={BC}>
        <Person f={f} who="investor" beats={jB} x={960} y={G + 10} s={0.85} />
        <g opacity={on(f, n1000, 8) * (1 - on(f, all41, 8))}><Coin x={960} y={340 - 10 * pop(f, n1000, 12)} s={1.6} text="$1,000" /></g>
        <g opacity={on(f, n22, 8) * (1 - on(f, grow42, 8))}><Label x={960} y={220} text="TAX RATE: 22%" size={50} fill={R.grey} ink={R.paper} /></g>
        <Box x={440} y={G} s={1} tag={f >= n5937 ? '$5,937' : f >= n7612 ? '$7,612' : f >= all41 ? (f >= grow42 ? 'GROWING…' : '$1,000') : 'TRADITIONAL'} door="out" doorTax={on(f, n22b, 8)} glow={on(f, box41, 10) * (1 - on(f, roth41, 10))}><Plant x={0} y={-30} s={1} grow={grow} f={f} /></Box>
        <Box x={1480} y={G} s={1} tag={f >= n5937b ? '$5,937' : f >= n780 ? (f >= grow42 ? 'GROWING…' : '$780') : 'ROTH'} tagColor={R.gold} glow={win(f, in41, now42 + 10, 6) + win(f, n780b, n5937b, 6)} door="in" doorTax={on(f, roth41, 8) * (1 - on(f, grow42, 8))}><Plant x={0} y={-30} s={1} grow={grow} f={f} /></Box>
        <g opacity={on(f, traditional41, 8)}><Label x={440} y={G + 60} text={f >= n5937 ? 'AFTER 22% TAX LATER' : 'TRADITIONAL: ALL $1,000 IN'} size={34} /></g>
        <g opacity={on(f, roth41, 8)}><Label x={1480} y={G + 60} text={f >= no44 ? 'NO TAX LEFT TO PAY' : 'ROTH: $780 IN'} size={34} fill={R.gold} /></g>
        {/* tax flies off: first at Roth's entrance, later at traditional's exit */}
        {f >= off41 && span(f, off41, off41 + 20) < 1 && [0, 1].map((k) => { const t = span(f, off41 + k * 5, off41 + k * 5 + 16); return <Coin key={k} x={lerp(1300, 1480, t)} y={lerp(560, 300, t)} s={0.6} o={t > 0 ? 1 : 0} /> })}
        {f >= off43 && span(f, off43, off43 + 24) < 1 && [0, 1, 2].map((k) => { const t = span(f, off43 + k * 5, off43 + k * 5 + 16); return <Coin key={k} x={lerp(640, 760, t)} y={lerp(800, 560, t)} s={0.6} o={t > 0 ? 1 : 0} /> })}
        <g opacity={on(f, n7, 8) * (1 - on(f, traditional43, 8))}><Label x={960} y={220} text={f >= n76 ? '≈ 7.6× BIGGER' : f >= ends42 ? 'EACH ONE ENDS UP…' : f >= n30 ? '7% A YEAR · 30 YEARS (SAY)' : '7% A YEAR (SAY)'} size={46} /></g>
      </g>}
      {/* # D) exactly the same */}
      {D > 0 && <g opacity={D}>
        <Box x={440} y={G} s={1} tag="$5,937" door="out" doorTax={1} glow={win(f, later45b, notice46, 6) + win(f, one46, other46, 6)}><Plant x={0} y={-30} s={1} grow={0.95} f={f} /></Box>
        <Box x={1480} y={G} s={1} tag="$5,937" tagColor={R.gold} door="in" doorTax={1} glow={win(f, now45b, later45b, 6) + win(f, other46, both46, 6)}><Plant x={0} y={-30} s={1} grow={0.95} f={f} /></Box>
        <g transform={`translate(960 ${520 - 12 * pop(f, exactly45, 14)})`}><rect x={-110} y={-70} width={220} height={36} rx={18} fill={R.forest} /><rect x={-110} y={10} width={220} height={36} rx={18} fill={R.forest} /></g>
        <g opacity={on(f, rate45, 8) * (1 - on(f, notice46, 8))}><Label x={960} y={700} text={f >= equal45 ? 'SAME RATE NOW AND LATER = EQUAL' : 'SAME TAX RATE…'} size={40} fill={R.forest} ink={R.paper} /></g>
        <g opacity={on(f, n22c - 4, 10)}>
          {[[440, 'LATER', 'out'], [1480, 'NOW', 'in']].map(([x, t], k) => <g key={k} transform={`translate(${x} 260)`} opacity={on(f, k ? both46 : n22c, 8)}><TaxBox x={0} y={0} s={0.8} text="22%" /><Label x={0} y={100} text={`PAID ${t}`} size={36} fill={R.grey} ink={R.paper} /></g>)}
          <g opacity={on(f, different46, 8)}><Label x={960} y={700} text="SAME TAX, DIFFERENT TIMES" size={44} /></g>
          <g opacity={on(f, cost46, 8) * (1 - on(f, both46, 8))}><Label x={960} y={700} text="NOT A COST OF ONLY ONE" size={40} /></g>
        </g>
      </g>}
      {/* # E) when the rate changes */}
      {E > 0 && <g opacity={E}>
        <Box x={440} y={G} s={1} tag={f >= n5176 ? '$5,176' : f >= n6699 ? '$6,699' : 'TRADITIONAL'} glow={trWin} door="out" doorTax={1}><Plant x={0} y={-30} s={1} grow={0.95} f={f} /></Box>
        <Box x={1480} y={G} s={1} tag="$5,937" tagColor={R.gold} glow={rWin} door="in" doorTax={1}><Plant x={0} y={-30} s={1} grow={0.95} f={f} /></Box>
        <g transform="translate(960 470)" opacity={on(f, retirement48 - 4, 10)}>
          <circle r={170} fill={R.brass} /><circle r={146} fill={R.paper} />
          {[0, 10, 20, 30, 40].map((t) => { const a = ((-210 + (t / 40) * 240) * Math.PI) / 180; return <g key={t}><line x1={110 * Math.cos(a)} y1={110 * Math.sin(a)} x2={134 * Math.cos(a)} y2={134 * Math.sin(a)} stroke={R.ink} strokeWidth={6} /><text x={88 * Math.cos(a)} y={88 * Math.sin(a) + 10} textAnchor="middle" fill={R.ink2} style={BB(26)}>{t}</text></g> })}
          {(() => { const a = ((-210 + (rate / 40) * 240) * Math.PI) / 180; return <line x1={0} y1={0} x2={120 * Math.cos(a)} y2={120 * Math.sin(a)} stroke={R.red} strokeWidth={10} strokeLinecap="round" /> })()}
          <circle r={18} fill={R.ink} /><text y={90} textAnchor="middle" fill={R.ink} style={BB(56)}>{Math.round(rate)}%</text>
          <Label x={0} y={230} text="TAX RATE IN RETIREMENT" size={34} />
        </g>
        <g opacity={on(f, changes47, 8) * (1 - on(f, retirement48, 8))}><Label x={960} y={220} text="WHEN THE RATE CHANGES" size={50} /></g>
        <g opacity={trWin}><Label x={440} y={G + 60} text="TRADITIONAL WINS" size={40} fill={R.forest} ink={R.paper} /></g>
        <g opacity={rWin}><Label x={1480} y={G + 60} text="ROTH WINS" size={40} fill={R.forest} ink={R.paper} /></g>
        <g opacity={on(f, n5176, 8)}><Label x={440} y={G + 60} text="ONLY $5,176" size={40} fill={R.red} ink={R.paper} /></g>
      </g>}
      {/* # F) the one question; split; the Roth income line */}
      {F > 0 && <g opacity={F}>
        <Person f={f} who="investor" beats={[[EF, 'weighA', 'thinking', 'weighB', 20], [many51, 'explain', 'smiling'], [split51, 'offer', 'smiling'], [limit52, 'pointUp', 'neutral'], [phased52, 'stop', 'neutral']]} x={300} y={G + 10} s={0.95} />
        <g opacity={on(f, question50 - 4, 10) * (1 - on(f, many51, 10))} transform={`translate(1150 ${G - 260}) rotate(${tilt})`}>
          <rect x={-420} y={-14} width={840} height={28} rx={14} fill={R.woodD} />
          <g transform="translate(-330 -14)"><rect x={-90} y={-110} width={180} height={110} rx={16} fill={R.slate} /><text y={-40} textAnchor="middle" fill={R.paper} style={BB(52)}>NOW</text></g>
          <g transform="translate(330 -14)"><rect x={-90} y={-110} width={180} height={110} rx={16} fill={R.grey} /><text y={-40} textAnchor="middle" fill={R.paper} style={BB(52)}>LATER</text></g>
        </g>
        <g opacity={on(f, question50 - 4, 10) * (1 - on(f, many51, 10))}><path d={`M1150 ${G - 246} L1100 ${G} L1200 ${G} Z`} fill={R.woodD} /><Label x={1150} y={300} text={f >= lower50 ? 'IS YOUR RATE LOWER NOW, OR LATER?' : 'ONE QUESTION'} size={46} /></g>
        <g opacity={win(f, many51 - 4, limit52, 8)}>
          <Box x={900} y={G} s={0.8} tag="TRADITIONAL" /><Box x={1500} y={G} s={0.8} tag="ROTH" tagColor={R.gold} />
          {f >= split51 && [0, 1].map((k) => { const t = span(f, split51 + k * 4, split51 + k * 4 + 18); return <Coin key={k} x={lerp(1200, k ? 1500 : 900, t)} y={lerp(300, G - 200, t)} s={0.9} /> })}
          <g opacity={on(f, both51, 8)}><Label x={1200} y={300} text={f >= split51 ? 'SPLIT BETWEEN THE TWO' : 'MANY PLANS OFFER BOTH'} size={44} /></g>
        </g>
        <g opacity={on(f, limit52 - 4, 10)} transform={`translate(800 ${G - 300})`}>
          <rect width={900} height={60} rx={30} fill={R.cream} stroke={R.ink} strokeOpacity={0.2} /><rect width={900 * payBar} height={60} rx={30} fill={R.slate} />
          <rect x={620} y={-40} width={8} height={140} fill={R.red} opacity={on(f, line52, 8)} />
          <text x={624} y={-56} textAnchor="middle" fill={R.red} style={BB(40)} opacity={on(f, n153k, 8)}>$153,000</text>
          <Label x={450} y={140} text={f >= y2026 ? 'ROTH IRA, SINGLE, 2026' : 'ROTH IRA INCOME LINE'} size={38} o={on(f, roth52, 8)} />
        </g>
      </g>}
      <Headline f={f} lines={[[k401, 'STEP 4: TRADITIONAL VS ROTH', R.ink, 92], [more40, 'THE $1,000 TEST', R.ink, 100], [exactly45, 'EXACTLY THE SAME', R.forestD, 100], [difference47, 'WHEN THE RATE CHANGES', R.ink, 96], [whole50, 'LOWER NOW, OR LATER?', R.ink, 96]]} />
    </g>
  )
}

export const RT_ROTH = makePiece('rt-roth', "Step four, traditional vs Roth: twin glass greenhouses in golden light; TRADITIONAL has the grey TAX at its exit door (no tax now, taxed when it comes out), ROTH has TAX at its entrance (tax now, qualified withdrawals tax-free); the 1,000-dollar test at a 22 percent tax rate: all 1,000 goes into traditional while two coins fly into tax at Roth's entrance so 780 goes in; both money plants grow 7 percent a year for 30 years (about 7.6 times), traditional's tag climbs to 7,612 then 22 percent flies out at the exit leaving 5,937, Roth's climbs from 780 to 5,937; a big equals sign: exactly the same; a 22 percent TAX envelope above each box, paid later vs paid now; a brass dial for the tax rate in retirement: at 12 percent traditional glows (6,699, traditional wins), at 32 percent Roth glows (traditional only 5,176); a NOW / LATER seesaw; a coin splits between both boxes; a pay bar with a red line at 153,000 dollars (Roth IRA, single, 2026)", {
  mood: 'light', Component: Roth,
  beats: ["s37:401k", "s37:ira", "s37:traditional", "s37:roth", "s38:traditional", "s38:now", "s38:later", "s38:goes", "s38:before", "s38:pay", "s38:out", "s39:roth", "s39:now", "s39:later", "s39:first", "s39:qualified", "s39:taxfree", "s40:more", "s40:test", "s40:sets", "s40:1000", "s40:rate", "s40:22", "s41:traditional", "s41:all", "s41:box", "s41:roth", "s41:off", "s41:780", "s42:grow", "s42:7", "s42:30", "s42:ends", "s42:76", "s43:traditional", "s43:7612", "s43:22", "s43:off", "s43:5937", "s44:roth", "s44:780", "s44:5937", "s44:no", "s45:exactly", "s45:rate", "s45:equal", "s46:notice", "s46:22", "s46:cost", "s46:both", "s46:different", "s47:difference", "s47:changes", "s48:retirement", "s48:drops", "s48:12", "s48:6699", "s48:wins", "s49:rises", "s49:32", "s49:5176", "s49:wins", "s50:whole", "s50:question", "s50:lower", "s51:many", "s51:both", "s51:split", "s52:limit", "s52:roth", "s52:income", "s52:line", "s52:2026", "s52:phased", "s52:153000", "s41:in", "s42:now", "s38:income", "s39:retirement", "s45:now", "s45:later", "s46:one", "s46:other"],
  sfx: [['s41:780', 'coin', 0.1], ['s43:5937', 'tick', 0.1], ['s45:exactly', 'ding', 0.12], ['s48:wins', 'pop', 0.1], ['s49:wins', 'pop', 0.1]] })
