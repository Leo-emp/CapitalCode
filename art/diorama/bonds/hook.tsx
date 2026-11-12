// ---------------------------------------------------------------- s1–s10: the hook — you already own bonds
// A) s1      your study: you shrug ("never bought one") while an engraved bond certificate slides out of a drawer.
// B) s2      a retirement-fund box opens: blue stock papers and green bond papers inside; a bank takes in coins
//            (deposits) and stacks green bond papers beside itself.
// C) s3–s4   two towers of paper side by side: BONDS ≈ $161 trillion vs STOCKS ≈ $158 trillion.
// D) s5–s6   a solid brass safe full of bonds: "the boring, safe part"; you lean back.
// E) s7–s8   navy night: the bond pile and the stock pile both sink (2022); a bank cracks.
// F) s9–s10  the road of this video: five stops drawn as objects (a certificate, three borrowers, coupons,
//            the seesaw, your wallet) appear as they are named.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { B, BDefs, BGrain, Bank, Capitol, Certificate, CityHall, Coin, Coupon, Factory, FLOOR, Flourish, Parchment, Seesaw, Skyline, Study, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  own1: 's1:own', bonds1: 's1:bonds', never1: 's1:never', bought1: 's1:bought',
  retire2: 's2:retirement', part2: 's2:part', bonds2: 's2:bonds', banks2: 's2:banks', deposit2: 's2:deposit', bonds2b: 's2:bonds#2',
  thing3: "s3:here's", bond3: 's3:bond', bigger3: 's3:bigger', stock3: 's3:stock',
  hundred4: 's4:hundred', sixty4: 's4:sixty', fifty4: 's4:fifty', stocks4: 's4:stocks',
  thinking5: "s5:you're", boring5: 's5:boring', safe5: 's5:safe', most6: 's6:most',
  twenty7: 's7:twenty', safest7: 's7:safest', lost7: 's7:lost', stocks7: 's7:stocks',
  year8: 's8:year', losses8: 's8:losses', bank8: 's8:bank', down8: 's8:down',
  trader9: 's9:trader', why9: 's9:why',
  step10: 's10:step', what10: 's10:what', borrows10: 's10:borrows', paid10: 's10:paid', prices10: 's10:prices', money10: 's10:money',
}

// # a filing drawer that slides open
const Drawer: React.FC<{ x: number; y: number; open: number }> = ({ x, y, open }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={6} rx={260} ry={18} fill="#000" opacity={0.15} />
    <rect x={-240} y={-330} width={480} height={330} rx={12} fill="#8F6E46" stroke="#5E4428" strokeWidth={5} />
    {[0, 1].map((k) => <g key={k}><rect x={-210} y={-300 + k * 150} width={420} height={130} rx={8} fill="#A9845A" /><rect x={-50} y={-250 + k * 150} width={100} height={20} rx={10} fill={B.brass} /></g>)}
    <g transform={`translate(0 ${-300 - 40 * open})`} opacity={open > 0.02 ? 1 : 0}><rect x={-230} y={0} width={460} height={130} rx={8} fill="#B89466" stroke="#5E4428" strokeWidth={4} /></g>
  </g>
)
// # the retirement fund drawn as a wooden crate with a lid; inside: stock papers (blue) and bond papers (green)
const FundCrate: React.FC<{ x: number; y: number; open: number; o: number; bonds: number }> = ({ x, y, open, o, bonds }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={6} rx={300} ry={20} fill="#000" opacity={0.15} />
    {[0, 1, 2].map((k) => <rect key={'s' + k} x={-230 + k * 34} y={-300 - k * 10 - 60 * open} width={180} height={230} rx={8} fill="#DCE8F5" stroke={B.blueD} strokeWidth={4} opacity={open} />)}
    {[0, 1, 2].map((k) => <rect key={'b' + k} x={30 + k * 34} y={-300 - k * 10 - 60 * open * bonds} width={180} height={230} rx={8} fill="url(#bd-cert)" stroke={B.green} strokeWidth={4} opacity={open} />)}
    <rect x={-280} y={-200} width={560} height={200} rx={10} fill="#B08A57" stroke="#6E5230" strokeWidth={6} />
    {[-120, 0, 120].map((d) => <line key={d} x1={-280} x2={280} y1={-200 + 66 + d / 3} y2={-200 + 66 + d / 3} stroke="#6E5230" strokeWidth={3} opacity={0.4} />)}
    <g opacity={1 - open} transform={`translate(0 ${-30 * open})`}><rect x={-280} y={-224} width={560} height={28} rx={6} fill="#C49D66" stroke="#6E5230" strokeWidth={5} /></g>
    <Tag x={0} y={-90} text="RETIREMENT FUND" size={40} bg={B.greenD} />
  </g>
)
// # a tower of stacked papers (green bonds or blue stocks); h in px
const PaperTower: React.FC<{ x: number; h: number; color: string; fill: string; o: number }> = ({ x, h, color, fill, o }) => {
  if (o <= 0.01) return null
  const n = Math.max(0, Math.floor(h / 26))
  return <g opacity={o}>
    <ellipse cx={x} cy={FLOOR + 6} rx={200} ry={18} fill="#000" opacity={0.16} />
    {Array.from({ length: n }, (_, k) => <rect key={k} x={x - 170 + ((k * 7) % 5) * 3} y={FLOOR - (k + 1) * 26} width={340} height={22} rx={4} fill={fill} stroke={color} strokeWidth={3} />)}
  </g>
}
// # a brass safe with its door open, bonds stacked inside
export const Safe: React.FC<{ x: number; y: number; o: number; door: number }> = ({ x, y, o, door }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={8} rx={300} ry={20} fill="#000" opacity={0.18} />
    <rect x={-260} y={-480} width={520} height={470} rx={24} fill="url(#bd-brass)" stroke={B.brassD} strokeWidth={8} />
    <rect x={-220} y={-440} width={440} height={390} rx={14} fill="#5B4A2A" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-190} y={-110 - k * 70} width={380} height={56} rx={6} fill="url(#bd-cert)" stroke={B.green} strokeWidth={4} />)}
    <g transform={`translate(220 -440) scale(${1 - 0.85 * door} 1)`}><rect x={0} y={0} width={-440} height={390} rx={14} fill="url(#bd-brass)" stroke={B.brassD} strokeWidth={6} transform="scale(-1 1)" /></g>
    <rect x={-230} y={-10} width={60} height={24} rx={6} fill={B.brassD} /><rect x={170} y={-10} width={60} height={24} rx={6} fill={B.brassD} />
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s2') - 4, BC = c('s3') - 6, CD = c('s5') - 6, DE = c('s7') - 4, EF = c('s9') - 6
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = scene(f, CD, DE), Es = scene(f, DE, EF), Fs = fadeIn(f, EF)
  // # E: both piles sink on "lost"
  const sink = easeInOut(span(f, t.lost7, t.lost7 + 30))
  // # F: the road
  const road = (u: number) => ({ x: lerp(520, 1760, u), y: 760 + Math.sin(u * Math.PI * 2) * 90 })
  const rp = easeInOut(span(f, EF, t.money10 + 10))
  const pts = Array.from({ length: 61 }, (_, k) => road(k / 60))
  const stops: [number, number][] = [[0.04, t.what10], [0.28, t.borrows10], [0.52, t.paid10], [0.76, t.prices10], [0.98, t.money10]]

  return (
    <g>
      <BDefs />
      {/* ---------------- A) your study ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study />
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [t.bonds1, 'point', 'thinking'], [t.never1, 'shrug', 'thinking']]} x={330} y={1060} s={0.82} />
        <Drawer x={1080} y={FLOOR} open={on(f, t.own1 - 2, 12)} />
        <Certificate x={1080} y={lerp(560, 400, on(f, t.bonds1, 14))} s={0.62} o={on(f, t.bonds1 - 2, 10)} n={0} />
      </g>}

      {/* ---------------- B) your fund + your bank ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Parchment />
        <FundCrate x={560} y={FLOOR} o={on(f, t.retire2 - 4, 8)} open={on(f, t.part2, 14)} bonds={on(f, t.bonds2, 12)} />
        <Tag x={680} y={430} text="BONDS" size={40} bg={B.green} o={on(f, t.bonds2, 8)} />
        <Tag x={420} y={470} text="STOCKS" size={40} bg={B.blueD} o={on(f, t.part2 + 6, 8)} />
        <Bank x={1420} y={FLOOR} s={0.85} o={on(f, t.banks2 - 4, 8)} />
        {f > t.deposit2 && [0, 1, 2].map((k) => { const p = ((f - t.deposit2) / 26 + k / 3) % 1; return <Coin key={k} x={lerp(1900, 1520, p)} y={FLOOR - 60} r={30} o={Math.min(1, (1 - p) * 3)} /> })}
        {[0, 1, 2].map((k) => <Certificate key={k} x={1010} y={FLOOR - 40 - k * 70} s={0.32} n={0} seal={false} amount="" title="BONDS" o={on(f, t.bonds2b + k * 4, 8)} />)}
      </g>}

      {/* ---------------- C) bigger than the stock market ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Skyline />
        <PaperTower x={660} h={560 * on(f, BC, 40)} color={B.green} fill="#FFF7E2" o={on(f, BC, 6)} />
        <PaperTower x={1260} h={549 * on(f, BC + 6, 40)} color={B.blueD} fill="#E3EDF8" o={on(f, BC + 6, 6)} />
        <Tag x={660} y={FLOOR + 80} text="BONDS" size={48} bg={B.green} o={on(f, t.bond3, 8)} />
        <Tag x={1260} y={FLOOR + 80} text="STOCKS" size={48} bg={B.blueD} o={on(f, t.stock3, 8)} />
        <Tag x={660} y={280} text="$161 TRILLION" size={50} bg={B.greenD} o={on(f, t.sixty4, 8)} />
        <Tag x={1260} y={292} text="$158 TRILLION" size={50} bg={B.blueD} o={on(f, t.fifty4, 8)} />
        <Tag x={960} y={1040} text="WORLDWIDE, 2025 · SIFMA" size={28} bg={B.inkSoft} o={on(f, t.stocks4, 8)} />
      </g>}

      {/* ---------------- D) the boring, safe part ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Study />
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [t.boring5, 'leanBack', 'smug'], [t.most6, 'thumbsUp', 'smiling']]} x={420} y={1060} s={0.82} />
        <Safe x={1220} y={FLOOR} o={on(f, CD, 8)} door={on(f, t.safe5, 14)} />
      </g>}

      {/* ---------------- E) 2022: both sink, a bank cracks ---------------- */}
      {Es > 0 && <g opacity={Es}>
        <Skyline night />
        <g opacity={1 - on(f, t.year8 - 8, 8)}>
          <PaperTower x={640} h={400 - 72 * sink} color={B.green} fill="#FFF7E2" o={on(f, DE, 8)} />
          <PaperTower x={1280} h={400 - 72 * sink} color={B.blueD} fill="#E3EDF8" o={on(f, DE + 6, 8)} />
          <Tag x={640} y={FLOOR + 80} text="SAFEST BONDS" size={42} bg={B.green} o={on(f, t.safest7, 8)} />
          <Tag x={1280} y={FLOOR + 80} text="STOCKS" size={42} bg={B.blueD} o={on(f, t.stocks7 - 4, 8)} />
          <Tag x={640} y={420} text="2022: −18%" size={50} bg={B.ox} o={on(f, t.lost7 + 10, 8)} />
          <Tag x={1280} y={420} text="2022: −18%" size={50} bg={B.ox} o={on(f, t.stocks7, 8)} />
        </g>
        <Bank x={960} y={FLOOR} s={1} night o={on(f, t.year8 + 2, 10)} crack={span(f, t.losses8, t.down8 + 10)} sign="A BIG US BANK" />
        <Tag x={960} y={300} text="2023" size={50} bg={B.ox} o={on(f, t.year8, 8)} />
      </g>}

      {/* ---------------- F) the road of this video ---------------- */}
      {Fs > 0 && <g opacity={Fs}>
        <Parchment />
        <Person f={f} who="hero" beats={[[0, 'idle', 'smiling'], [t.trader9, 'crossNoA', 'smiling'], [t.step10, 'explain', 'smiling'], [t.money10, 'point', 'smiling']]} x={250} y={1060} s={0.78} />
        <path d={'M' + pts.filter((_, k) => k / 60 <= rp).map((p) => `${p.x} ${p.y}`).join(' L')} stroke={B.parchDD} strokeWidth={40} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={'M' + pts.filter((_, k) => k / 60 <= rp).map((p) => `${p.x} ${p.y}`).join(' L')} stroke={B.brassL} strokeWidth={8} strokeDasharray="20 16" fill="none" />
        {stops.map(([u, at], k) => { const p = road(u), o = on(f, at - 2, 8); return o > 0.01 && <g key={k} opacity={o} transform={`translate(${p.x} ${p.y - 40}) scale(${0.85 + 0.15 * o})`}>
          <circle cx={0} cy={0} r={22} fill={B.brassD} />
          <g transform="translate(0 -60)">
            {k === 0 && <Certificate x={0} y={-90} s={0.36} n={0} />}
            {k === 1 && <g><Capitol x={-120} y={0} s={0.3} /><CityHall x={0} y={0} s={0.3} /><Factory x={120} y={0} s={0.3} /></g>}
            {k === 2 && <g><Coupon x={-60} y={-60} s={0.9} r={-8} /><Coupon x={60} y={-90} s={0.9} r={8} /></g>}
            {k === 3 && <Seesaw x={0} y={0} w={300} tilt={Math.sin(f / 12) * 8} />}
            {k === 4 && <g><rect x={-90} y={-130} width={180} height={120} rx={18} fill={B.green} stroke={B.greenD} strokeWidth={5} /><rect x={30} y={-100} width={70} height={56} rx={10} fill={B.greenD} /><circle cx={60} cy={-72} r={10} fill={B.brass} /></g>}
          </g>
        </g> })}
        <Tag x={1000} y={1020} text="WHAT IT IS · WHO BORROWS · HOW YOU'RE PAID · WHY PRICES MOVE · YOUR MONEY" size={28} bg={B.inkSoft} o={on(f, t.money10, 10)} />
      </g>}

      <Headline f={f} lines={[[t.own1, 'YOU ALREADY OWN BONDS', B.ink, 104], [t.bond3, 'BIGGER THAN STOCKS', B.ink, 110], [c('s5'), 'THE BORING, SAFE PART?', B.ink, 104], [t.twenty7, 'THEN CAME 2022', B.ox, 116], [c('s9'), 'STEP BY STEP', B.ink, 110]]} />
      <Flourish f={f} at={(EXTRA['bd-hook'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_HOOK = makePiece('bd-hook', "Hook: you shrug in your study as a bond certificate slides out of a drawer; a retirement-fund crate opens with blue stock papers and green bond papers, a bank takes in coin deposits and stacks bond papers; two towers of paper, bonds about $161 trillion vs stocks about $158 trillion; a brass safe full of bonds (the boring, safe part); at night both piles sink 18% in 2022 and a big US bank cracks in 2023; a road with five stops drawn as objects — a certificate, three borrowers, coupons, the seesaw, a wallet", {
  mood: 'light', Component: Hook, beats: [...Object.values(K), ...(EXTRA['bd-hook'] ?? [])],
  sfx: [['s1:bonds', 'softpop', 0.1], ['s3:bigger', 'riser', 0.08], ['s7:lost', 'thud', 0.12], ['s8:down', 'crack', 0.12], ['s10:money', 'chime', 0.1]] })
