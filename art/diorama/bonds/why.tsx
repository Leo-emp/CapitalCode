// ---------------------------------------------------------------- s75–s85: why people still own bonds (a calm harbour)
// A) s75     Nina on the pier; a $20 coin lands on her stack every six months (JAN / JUL flags).
// B) s76–79  98 tiles, one per year 1928–2025 (real data): the 26 years stocks lost money turn coral; in 21 of them
//            a green arrow: Treasury bonds went up. 2008 lifts out: stocks −37% vs bonds +20%.
// C) s80–81  a two-hulled boat — STOCKS hull and BONDS hull under one PORTFOLIO deck: when the stocks hull sinks the
//            bonds hull holds the deck up; then the rare year both sink (only 5 of 98).
// D) s82–83  the price: two columns, stocks ≈ 10% a year vs Treasury bonds ≈ 4.5%.
// E) s84     inflation: Nina's $20 coin stays the same size while the basket's price tag keeps growing.
// F) s85     a brass balance: GROWTH vs STEADINESS; then a signpost: HOW TO OWN THEM.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Certificate, Arrow, B, BDefs, BGrain, Basket, Coin, CoinStack, FLOOR, Flourish, Harbour, Parchment, Tag, cues, fadeIn, scene, FONT } from './kit'
import { SP500, TBOND, YEAR0 } from './data'

const K = {
  first75: 's75:first', steady75: 's75:steady', income75: 's75:income', twenty75: 's75:twenty', six75: 's75:six',
  second76: 's76:second', bonds76: 's76:bonds', stocks76: 's76:stocks', crash76: 's76:crash',
  nineteen77: 's77:nineteen', stocks77: 's77:stocks', losing77: 's77:losing', years77: 's77:years',
  twenty78: 's78:twenty', treasury78: 's78:treasury', up78: 's78:up',
  thousand79: 's79:thousand', stocks79: 's79:stocks', thirty79: 's79:thirty', rose79: 's79:rose', twenty79: 's79:twenty',
  mix80: 's80:mix', falls80: 's80:falls', holds80: 's80:holds', portfolio80: 's80:portfolio',
  rare81: 's81:rare', century81: 's81:century', same81: 's81:same', five81: 's81:five',
  price82: 's82:price',
  stocks83: 's83:stocks', ten83: 's83:ten', four83: 's83:four', treasury83: 's83:treasury',
  inflation84: 's84:inflation', quiet84: 's84:quiet', ninas84: "s84:nina's", stays84: 's84:stays', everything84: 's84:everything', expensive84: 's84:expensive',
  growth85: 's85:growth', steadiness85: 's85:steadiness', last85: 's85:last', own85: 's85:own',
}
const COLS = 14, TS = 80, GAP = 10, GX = 250, GY = 300

// # the two-hulled boat; dipS / dipB = how far each hull sinks (px)
const Boat: React.FC<{ x: number; y: number; dipS: number; dipB: number; o: number }> = ({ x, y, dipS, dipB, o }) => {
  if (o <= 0.01) return null
  const tilt = -Math.atan2(dipS - dipB, 560) * 180 / Math.PI
  const mid = (dipS + dipB) / 2
  return <g opacity={o} transform={`translate(${x} ${y})`}>
    <g transform={`translate(-280 ${dipS})`}><path d="M-170 0 L170 0 L130 90 L-130 90 Z" fill={B.blue} stroke={B.blueD} strokeWidth={6} /><text x={0} y={60} textAnchor="middle" fill="#fff" style={{ font: `400 46px ${FONT.big}`, letterSpacing: 4 }}>STOCKS</text></g>
    <g transform={`translate(280 ${dipB})`}><path d="M-170 0 L170 0 L130 90 L-130 90 Z" fill={B.green} stroke={B.greenD} strokeWidth={6} /><text x={0} y={60} textAnchor="middle" fill="#fff" style={{ font: `400 46px ${FONT.big}`, letterSpacing: 4 }}>BONDS</text></g>
    <g transform={`translate(0 ${mid}) rotate(${tilt})`}>
      <rect x={-470} y={-40} width={940} height={40} rx={10} fill="#B08A57" stroke="#6E5230" strokeWidth={5} />
      <text x={-250} y={-8} textAnchor="middle" fill="#fff" style={{ font: `400 34px ${FONT.big}`, letterSpacing: 6 }}>PORTFOLIO</text>
      <rect x={-12} y={-300} width={24} height={260} fill="#6E5230" />
      <path d="M12 -290 L250 -80 L12 -80 Z" fill={B.parchL} stroke={B.parchDD} strokeWidth={4} />
    </g>
  </g>
}

const Why: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s76') - 4, BC = c('s80') - 4, CD = c('s82') - 4, DE = c('s84') - 4, EF = c('s85') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = scene(f, CD, DE), Es = scene(f, DE, EF), Fs = fadeIn(f, EF)
  // # A: coins every six months
  const paid = Math.min(6, Math.floor(span(f, t.steady75, t.six75 + 20) * 6 + 0.001))
  // # B: tiles
  const tiles = on(f, t.nineteen77 - 2, 12), lose = on(f, t.losing77 - 2, 10), up = span(f, t.twenty78, t.up78 + 10)
  const y2008 = on(f, t.thousand79, 12)
  let upCount = 0
  // # C: hulls
  const fall = on(f, t.falls80 - 2, 14), both = on(f, t.rare81 - 2, 14)
  const dipS = 60 * fall * (1 - both) + 60 * both, dipB = 60 * both
  // # E: basket price grows
  const grow = span(f, t.everything84 - 4, t.expensive84 + 16)
  return (
    <g>
      <BDefs />
      {/* ---------------- A) steady, known income ---------------- */}
      {A > 0 && <g opacity={A}>
        <Harbour />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [t.income75, 'receive', 'smiling'], [t.six75, 'thumbsUp', 'smiling']]} x={420} y={1060} s={0.82} />
        <CoinStack x={760} y={FLOOR} h={paid} r={56} />
        {['JAN', 'JUL', 'JAN', 'JUL', 'JAN', 'JUL'].map((m, k) => { const o = on(f, t.steady75 + k * ((t.six75 + 20 - t.steady75) / 6), 8); return o > 0.01 && <g key={k} opacity={o} transform={`translate(${1000 + k * 140} 520)`}>
          <rect x={-56} y={-50} width={112} height={130} rx={10} fill="#fff" stroke={B.inkL} strokeWidth={3} /><rect x={-56} y={-50} width={112} height={34} rx={10} fill={B.green} />
          <text y={-24} textAnchor="middle" fill="#fff" style={{ font: `400 26px ${FONT.big}`, letterSpacing: 3 }}>{m}</text><Coin x={0} y={36} r={34} label="$20" /></g> })}
        <Tag x={1350} y={360} text="STEADY, KNOWN INCOME" size={44} bg={B.green} o={on(f, t.steady75, 8)} />
      </g>}

      {/* ---------------- B) when stocks crash ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Parchment />
        {/* s76: a stock paper tumbles while a bond paper holds */}
        <g opacity={on(f, t.second76 - 2, 8) * (1 - on(f, t.nineteen77 - 4, 8))}>
          <g transform={`translate(640 ${lerp(480, 640, on(f, t.crash76, 16))}) rotate(${-18 * on(f, t.crash76, 16)})`}><rect x={-160} y={-100} width={320} height={200} rx={10} fill="#E3EDF8" stroke={B.blueD} strokeWidth={5} /><text y={20} textAnchor="middle" fill={B.blueD} style={{ font: `400 64px ${FONT.big}` }}>STOCKS</text></g>
          <Arrow x1={880} y1={420} x2={880} y2={720} p={on(f, t.crash76, 12)} color={B.ox} />
          <g transform="translate(1280 480)" opacity={on(f, t.bonds76 - 2, 8)}><rect x={-160} y={-100} width={320} height={200} rx={10} fill="url(#bd-cert)" stroke={B.green} strokeWidth={5} /><text y={20} textAnchor="middle" fill={B.green} style={{ font: `400 64px ${FONT.big}` }}>BONDS</text></g>
        </g>
        <g opacity={tiles * (1 - y2008)}>
          {SP500.map((sp, k) => {
            const cx = GX + (k % COLS) * (TS + GAP), cy = GY + Math.floor(k / COLS) * (TS + GAP)
            const bad = sp < 0, bup = bad && TBOND[k] > 0
            if (bup) upCount++
            const show = bup && upCount / 21 <= up + 0.001
            return <g key={k}>
              <rect x={cx} y={cy} width={TS} height={TS} rx={10} fill={bad ? lerp(0, 1, lose) > 0.5 ? B.coral : B.parchD : B.parchD} stroke={bad && lose > 0.5 ? B.ox : B.parchDD} strokeWidth={3} />
              <text x={cx + TS / 2} y={cy + 30} textAnchor="middle" fill={bad && lose > 0.5 ? '#fff' : B.inkSoft} style={{ font: `400 24px ${FONT.big}` }}>{YEAR0 + k}</text>
              {show && <path d={`M${cx + TS / 2} ${cy + 40} L${cx + TS / 2 + 18} ${cy + 66} L${cx + TS / 2 - 18} ${cy + 66} Z`} fill={B.green} />}
            </g>
          })}
        </g>
        <Tag x={1700} y={420} text="26 LOSING YEARS" size={36} bg={B.ox} o={lose * (1 - y2008)} />
        <Tag x={1700} y={500} text="BONDS UP IN 21" size={36} bg={B.green} o={on(f, t.up78, 8) * (1 - y2008)} />
        {y2008 > 0.01 && <g opacity={y2008}>
          <Tag x={440} y={560} text="2008" size={64} bg={B.ink} />
          <line x1={560} x2={1360} y1={560} y2={560} stroke={B.ink} strokeWidth={4} />
          <rect x={660} y={560} width={220} height={36.6 * 9 * on(f, t.thirty79 - 2, 14)} rx={8} fill="url(#bd-oxbar)" />
          <Tag x={770} y={560 + 36.6 * 9 + 50} text="STOCKS −37%" size={42} bg={B.ox} o={on(f, t.thirty79, 8)} />
          <rect x={1040} y={560 - 20.1 * 9 * on(f, t.rose79 - 2, 14)} width={220} height={20.1 * 9 * on(f, t.rose79 - 2, 14)} rx={8} fill="url(#bd-greenbar)" />
          <Tag x={1150} y={560 - 20.1 * 9 - 40} text="BONDS +20%" size={42} bg={B.green} o={on(f, t.twenty79, 8)} />
        </g>}
        <Tag x={960} y={1046} text="S&P 500 VS 10-YEAR TREASURY, 1928–2025 · DAMODARAN" size={24} bg={B.inkSoft} o={tiles} />
      </g>}

      {/* ---------------- C) the two-hulled boat ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Harbour />
        <Boat x={960} y={740} dipS={dipS} dipB={dipB} o={on(f, t.mix80 - 4, 10)} />
        <Tag x={960} y={330} text="BOTH FELL: ONLY 5 YEARS OUT OF 98" size={44} bg={B.ox} o={on(f, t.five81, 8)} />
        <Tag x={1520} y={440} text="HOLDS IT UP" size={40} bg={B.green} o={on(f, t.holds80, 8) * (1 - both)} />
      </g>}

      {/* ---------------- D) the price of steadiness ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Parchment />
        <g opacity={on(f, CD, 8) * (1 - on(f, t.stocks83 - 4, 8))}>
          <Certificate x={820} y={520} s={0.6} n={0} />
          <g transform="translate(1180 470)"><line x1={-120} y1={0} x2={0} y2={0} stroke={B.ink} strokeWidth={4} /><path d="M0 -70 L260 -70 L300 0 L260 70 L0 70 Z" fill={B.oxL} stroke={B.ink} strokeWidth={4} /><text x={140} y={22} textAnchor="middle" fill={B.oxD} style={{ font: '400 60px "Bebas Neue"' }}>A PRICE</text></g>
        </g>
        <rect x={560} y={FLOOR - 10.0 * 52 * on(f, t.ten83 - 2, 16)} width={280} height={10.0 * 52 * on(f, t.ten83 - 2, 16)} rx={10} fill="url(#bd-bluebar)" opacity={on(f, t.stocks83 - 2, 8)} />
        <Tag x={700} y={FLOOR + 70} text="STOCKS" size={44} bg={B.blueD} o={on(f, t.stocks83, 8)} />
        <Tag x={700} y={FLOOR - 520 - 50} text="≈ 10% A YEAR" size={48} bg={B.blueD} o={on(f, t.ten83, 8)} />
        <rect x={1080} y={FLOOR - 4.5 * 52 * on(f, t.four83 - 2, 16)} width={280} height={4.5 * 52 * on(f, t.four83 - 2, 16)} rx={10} fill="url(#bd-greenbar)" opacity={on(f, t.four83 - 4, 8)} />
        <Tag x={1220} y={FLOOR + 70} text="TREASURY BONDS" size={44} bg={B.green} o={on(f, t.treasury83, 8)} />
        <Tag x={1220} y={FLOOR - 234 - 50} text="≈ 4.5% A YEAR" size={48} bg={B.green} o={on(f, t.four83 + 4, 8)} />
        <Tag x={960} y={1030} text="1928–2025 · DAMODARAN" size={24} bg={B.inkSoft} o={on(f, t.stocks83, 8)} />
      </g>}

      {/* ---------------- E) inflation ---------------- */}
      {Es > 0 && <g opacity={Es}>
        <Parchment />
        <Person f={f} who="investorF" beats={[[0, 'think', 'neutral'], [t.stays84, 'present', 'neutral'], [t.expensive84, 'shrug', 'worried']]} x={300} y={1060} s={0.8} />
        <Coin x={720} y={560} r={110} label="$20" o={on(f, t.ninas84 - 2, 8)} />
        <Tag x={720} y={740} text="STAYS $20" size={44} bg={B.brassD} o={on(f, t.stays84 + 4, 8)} />
        <Basket x={1360} y={FLOOR} s={lerp(1, 1.25, grow)} o={on(f, DE, 8)} />
        <g opacity={on(f, t.everything84, 8)} transform={`translate(1600 ${420 - 40 * grow}) scale(${lerp(0.9, 1.3, grow)})`}><Tag x={0} y={0} text="PRICES" size={44} bg={B.ox} /><Arrow x1={110} y1={30} x2={110} y2={-60} color={B.ox} w={10} /></g>
        <Tag x={960} y={300} text="A QUIET RISK" size={50} bg={B.ink} o={on(f, t.quiet84, 8)} />
      </g>}

      {/* ---------------- F) growth vs steadiness ---------------- */}
      {Fs > 0 && <g opacity={Fs}>
        <Parchment />
        <g transform={`translate(960 ${FLOOR})`} opacity={on(f, t.growth85 - 4, 8) * (1 - on(f, t.last85 - 2, 8))}>
          <rect x={-14} y={-520} width={28} height={520} fill={B.brassD} /><ellipse cx={0} cy={4} rx={180} ry={16} fill="#000" opacity={0.15} /><rect x={-150} y={-30} width={300} height={30} rx={8} fill={B.brassD} />
          <g transform="translate(0 -520) rotate(-6)"><rect x={-460} y={-12} width={920} height={24} rx={12} fill={B.brass} />
            <g transform="translate(-400 0) rotate(6)"><path d="M-130 120 L130 120 L90 170 L-90 170 Z" fill={B.blue} /><line x1={0} y1={0} x2={-120} y2={120} stroke={B.brassD} strokeWidth={4} /><line x1={0} y1={0} x2={120} y2={120} stroke={B.brassD} strokeWidth={4} />
              <Tag x={0} y={240} text="GROWTH" size={48} bg={B.blueD} /></g>
            <g transform="translate(400 0) rotate(6)"><path d="M-130 120 L130 120 L90 170 L-90 170 Z" fill={B.green} /><line x1={0} y1={0} x2={-120} y2={120} stroke={B.brassD} strokeWidth={4} /><line x1={0} y1={0} x2={120} y2={120} stroke={B.brassD} strokeWidth={4} />
              <Tag x={0} y={240} text="STEADINESS" size={48} bg={B.green} o={on(f, t.steadiness85, 8)} /></g>
          </g>
        </g>
        <g opacity={on(f, t.last85, 8)} transform={`translate(960 ${FLOOR})`}>
          <rect x={-12} y={-460} width={24} height={460} fill="#8F7350" /><ellipse cx={0} cy={4} rx={120} ry={12} fill="#000" opacity={0.15} />
          <path d="M-20 -440 L360 -440 L420 -390 L360 -340 L-20 -340 Z" fill={B.green} /><text x={190} y={-372} textAnchor="middle" fill="#fff" style={{ font: `400 50px ${FONT.big}`, letterSpacing: 4 }}>HOW TO OWN THEM</text>
        </g>
      </g>}

      <Headline f={f} lines={[[t.first75, 'REASON 1: STEADY INCOME', B.green, 104], [t.second76, 'REASON 2: WHEN STOCKS CRASH', B.green, 100], [t.mix80, 'WHY PEOPLE MIX THEM', B.ink, 108], [t.price82, 'THE PRICE OF STEADY', B.ink, 108], [t.inflation84, 'INFLATION', B.ox, 120], [t.growth85, 'GROWTH VS STEADINESS', B.ink, 106]]} />
      <Flourish f={f} at={(EXTRA['bd-why'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_WHY = makePiece('bd-why', "Why people still own bonds: Nina on a harbour pier gets a $20 coin every January and July, steady known income; 98 real tiles 1928–2025, the 26 years stocks lost money turn coral and 21 of them get a green arrow because Treasury bonds rose; 2008 lifts out, stocks −37% vs bonds +20%; a two-hulled boat with STOCKS and BONDS hulls under one portfolio deck, when the stocks hull sinks the bonds hull holds it up, then the rare year both sink, only 5 of 98; stocks about 10% a year vs Treasury bonds about 4.5%; Nina's $20 coin stays the same while the basket's price tag grows; a brass balance GROWTH vs STEADINESS and a signpost HOW TO OWN THEM", {
  mood: 'light', Component: Why, beats: [...Object.values(K), ...(EXTRA['bd-why'] ?? [])],
  sfx: [['s77:losing', 'softpop', 0.1], ['s79:rose', 'ding', 0.1], ['s80:falls', 'swish', 0.08], ['s84:expensive', 'pop', 0.08]] })
