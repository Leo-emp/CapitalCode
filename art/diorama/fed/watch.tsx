// ---------------------------------------------------------------- s74–s79: who watches the Fed
// A) s74–75  the Fed building under a glass dome marked INDEPENDENT; a rate decision paper slides past a desk with a
//            NO APPROVAL NEEDED stamp (not from the President or anyone else in government).
// B) s76     a report book travels from the Fed up the steps of Congress twice a year (two calendar marks).
// C) s77–78  seven overlapping 14-year bars on a timeline (staggered terms); one bar glows: THE CHAIR.
// D) s79     the September statement pinned up for everyone: VOTE 12–0.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline } from '../aimoney/common'
import { Capitol, F, FDefs, FGrain, FLOOR, FedBuilding, Hall, LoanPaper, Mark, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  independent74: 's74:independent', unaccountable74: 's74:unaccountable',
  decisions75: 's75:decisions', approval75: 's75:approval', president75: 's75:president', government75: 's75:government',
  congress76: 's76:congress', reports76: 's76:reports', twice76: 's76:twice',
  fourteen77: 's77:fourteen', overlap77: 's77:overlap', whole77: 's77:whole',
  chair78: 's78:chair', seven78: 's78:seven', senate78: 's78:senate',
  published79: 's79:published', statement79: 's79:statement', twelve79: 's79:twelve', zero79: 's79:zero',
}

const Watch: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s76') - 4, BC = c('s77') - 4, CD = c('s79') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = fadeIn(f, CD)
  const slide = easeInOut(span(f, t.decisions75, t.approval75 + 16))
  const book = (k: number) => easeInOut(span(f, t.reports76 + k * 16, t.reports76 + k * 16 + 24))
  return (
    <g>
      <FDefs />
      <Hall />
      {/* ---------------- A) independent ---------------- */}
      {A > 0 && <g opacity={A}>
        <FedBuilding x={620} y={FLOOR} s={0.75} sign="THE FED" />
        <path d="M280 900 L280 520 Q280 260 620 260 Q960 260 960 520 L960 900" fill="#fff" opacity={0.18 * on(f, t.independent74, 10)} stroke="#fff" strokeWidth={6} />
        <Tag x={620} y={300} text="INDEPENDENT" size={44} bg={F.teal} o={on(f, t.independent74, 8)} />
        <Tag x={620} y={FLOOR + 74} text="BUT ACCOUNTABLE" size={38} bg={F.slate} o={on(f, t.unaccountable74, 8)} />
        <LoanPaper x={lerp(960, 1420, slide)} y={600} s={0.5} title="RATE" o={on(f, t.decisions75 - 2, 8)} />
        <g opacity={on(f, t.approval75 - 2, 8)} transform={`translate(1500 820) rotate(-8) scale(${lerp(1.3, 1, on(f, t.approval75, 8))})`}>
          <rect x={-230} y={-50} width={460} height={100} rx={12} fill="none" stroke={F.coral} strokeWidth={8} />
          <text y={18} textAnchor="middle" fill={F.coral} style={{ font: `400 52px ${FONT.big}`, letterSpacing: 3 }}>NO APPROVAL NEEDED</text>
        </g>
        <Tag x={1500} y={940} text="NOT FROM THE PRESIDENT, OR ANYONE IN GOVERNMENT" size={28} bg={F.slate} o={on(f, t.government75, 8)} />
      </g>}

      {/* ---------------- B) reports to Congress twice a year ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <FedBuilding x={420} y={FLOOR} s={0.6} sign="THE FED" />
        <Capitol x={1460} y={FLOOR} s={0.9} />
        <Tag x={1460} y={FLOOR + 74} text="CONGRESS" size={40} bg={F.slate} o={on(f, t.congress76, 8)} />
        {[0, 1].map((k) => { const p = book(k); return p > 0.01 && p < 0.99 && <g key={k} transform={`translate(${lerp(640, 1240, p)} ${560 - Math.sin(Math.PI * p) * 160})`}><rect x={-60} y={-80} width={120} height={160} rx={8} fill={F.teal} /><rect x={-50} y={-70} width={100} height={20} fill="#fff" opacity={0.7} /></g> })}
        <Tag x={940} y={330} text="A FULL REPORT, TWICE A YEAR" size={40} bg={F.teal} o={on(f, t.twice76, 8)} />
      </g>}

      {/* ---------------- C) staggered terms ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        {Array.from({ length: 7 }, (_, k) => { const x0 = 200 + k * 90, o = on(f, t.fourteen77 + k * 3, 6); const chair = k === 3 && on(f, t.chair78, 8) > 0.5
          return o > 0.01 && <g key={k} opacity={o}><rect x={x0} y={300 + k * 80} width={620} height={56} rx={28} fill={chair ? F.gold : F.slateL} /><text x={x0 + 310} y={340 + k * 80} textAnchor="middle" fill="#fff" style={{ font: `400 34px ${FONT.big}` }}>{chair ? 'THE CHAIR · 14-YEAR TERM' : '14-YEAR TERM'}</text></g> })}
        <Tag x={1640} y={480} text="TERMS OVERLAP" size={40} bg={F.copperD} o={on(f, t.overlap77, 8)} />
        <Tag x={1640} y={560} text="NO PRESIDENT PICKS ALL 7" size={34} bg={F.slate} o={on(f, t.whole77, 8)} />
        <Tag x={1640} y={720} text="CHOSEN BY THE PRESIDENT" size={32} bg={F.inkSoft} o={on(f, t.seven78, 8)} />
        <Tag x={1640} y={790} text="CONFIRMED BY THE SENATE" size={32} bg={F.inkSoft} o={on(f, t.senate78, 8)} />
      </g>}

      {/* ---------------- D) published ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <g transform="translate(960 600)">
          <rect x={-380} y={-300} width={760} height={600} rx={18} fill="#000" opacity={0.12} transform="translate(10 12)" />
          <rect x={-380} y={-300} width={760} height={600} rx={18} fill="#fff" />
          <rect x={-380} y={-300} width={760} height={96} rx={18} fill={F.slate} /><text y={-236} textAnchor="middle" fill="#fff" style={{ font: `400 46px ${FONT.big}`, letterSpacing: 4 }}>FOMC STATEMENT · SEPT 16, 2026</text>
          {[0, 1, 2].map((k) => <rect key={k} x={-300} y={-150 + k * 50} width={600 - k * 80} height={18} rx={9} fill={F.marbleD} />)}
          <g opacity={on(f, t.twelve79 - 2, 8)}><rect x={-220} y={60} width={440} height={150} rx={20} fill={F.greenL} /><text y={162} textAnchor="middle" fill={F.greenD} style={{ font: `400 96px ${FONT.big}` }}>VOTE 12–0</text></g>
        </g>
      </g>}

      <Headline f={f} lines={[[c('s74'), 'WHO WATCHES THE FED?', F.ink, 110], [t.congress76, 'REPORTS TO CONGRESS', F.ink, 110], [c('s77'), 'OVERLAPPING TERMS', F.ink, 112], [t.published79, 'EVERY DECISION PUBLISHED', F.ink, 104]]} />
      <Mark f={f} at={(EXTRA['fed-watch'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_WATCH = makePiece('fed-watch', "Who watches the Fed: the Fed building under a glass dome marked INDEPENDENT but accountable, a rate decision paper slides past a NO APPROVAL NEEDED stamp, not from the President or anyone in government; a report book flies from the Fed to Congress twice a year; seven overlapping 14-year term bars, one glowing as the chair, chosen by the President and confirmed by the Senate; the September 16, 2026 FOMC statement pinned up, vote 12–0", {
  mood: 'light', Component: Watch, beats: [...Object.values(K), ...(EXTRA['fed-watch'] ?? [])],
  sfx: [['s75:approval', 'thud', 0.1], ['s79:twelve', 'ding', 0.08]] })
