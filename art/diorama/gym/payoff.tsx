// ---------------------------------------------------------------- s70–s78: the price per visit.
// A) The gym with a green tick (not a scam); the hero runs happily on a treadmill (a good deal) while three sofas sit
//    behind; the hero thinks beside a price tag (how we judge the price).
// B) A small $15 tag grows into the per-visit test: a bank statement line, a month strip with visits ticked, the $15
//    bar splitting into 3 parts → $5 a visit. Then two sides of a see-saw: "$1–2 a visit" (runner, coins coming in)
//    vs "$15+ a visit" (sofa, coins going out); both fine — which side are you on.
// C) The last picture: a treadmill with no coin vs a sofa whose coin drops into the gym; the hero walks past the gym
//    and looks at the treadmill in its window, which glows.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Doc, fly, Headline, Label, Person, Tick, win } from '../aimoney/common'
import { GymFront, SeeSaw, Sofa, SplitBar, Treadmill, VisitStrip, Zzz } from './kit'

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const s70 = c('s70'), scam = c('s70:scam')
  const really = c('s71:really'), deal = c('s71:deal'), stays = c('s71:stays')
  const judge = c('s72:judge')
  const small = c('s73:small'), visit = c('s73:visit')
  const paid = c('s74:paid'), divide = c('s74:divide'), went = c('s74:went')
  const d15 = c('s74a:15'), d3 = c('s74a:3'), d5 = c('s74a:5')
  const dollar = c('s75:dollar'), others = c('s75:others')
  const d15b = c('s76:15'), paying = c('s76:paying')
  const wrong = c('s76a:wrong'), side = c('s76a:side')
  const work = c('s77:work'), pay = c('s77:pay'), stay = c('s77:stay'), gym77 = c('s77:gym'), money77 = c('s77:money')
  const walk = c('s78:walk'), treadmill = c('s78:treadmill')
  const A = win(f, s70, small), B = win(f, small, work), C = on(f, work, 12)
  return (
    <g>
      <Stage id="gm-payoff" frame={f} />
      <Headline f={f} lines={[[scam, 'NOT A SCAM', P.ink, 110], [deal, 'GO OFTEN = GOOD DEAL', P.mintInk, 104], [judge, 'HOW WE JUDGE THE PRICE', P.ink, 100], [visit, 'PRICE PER VISIT', P.goldInk, 116], [d5, '$15 ÷ 3 = $5 A VISIT', P.goldInk, 110], [dollar, 'WHICH SIDE ARE YOU ON?', P.ink, 100], [work, 'NOT WHEN YOU WORK OUT…', P.ink, 100], [pay, '…WHEN YOU PAY AND STAY HOME', P.goldInk, 96], [walk, '', P.ink]]} />
      {/* # A) not a scam; a good deal if you go */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, really, 6)}><GymFront x={960} y={900} s={1.1} lit={1} /><Tick x={1500} y={480} o={on(f, scam, 4)} r={60} /></g>
        <g opacity={on(f, really, 4)}>
          <Treadmill x={620} y={900} s={1.1} f={f} run={1} used={1} />
          <Person f={f} who="hero" beats={[[0, 'runA', 'smiling', 'runB', 12], [c('s71:gym'), 'fistPump', 'smiling'], [c('s71:good'), 'runA', 'smiling', 'runB', 12], [c('s72:trick'), 'think', 'thinking'], [judge, 'measure', 'thinking']]} x={590} y={880} s={0.76} />
          <g opacity={on(f, deal, 4)}><Tick x={880} y={420} o={1} r={50} /></g>
          <g opacity={on(f, c('s71:reason'), 4)}>{[0, 1, 2].map((k) => <g key={k} opacity={k === 0 ? 1 : on(f, stays + (k - 1) * 4, 4)}><Sofa x={1220 + k * 240} y={620 + (k % 2) * 330} s={0.45} /><Mini look={['buyer', 'worker', 'owner'][k]} x={1220 + k * 240} y={600 + (k % 2) * 330} scale={0.75} frame={f} seed={k + 180} /><Zzz x={1260 + k * 240} y={480 + (k % 2) * 330} f={f} /></g>)}</g>
          <g opacity={on(f, judge, 4)} transform={`translate(880 420) scale(${pop(f, judge)})`}><rect x={-100} y={-56} width={200} height={112} rx={20} fill="#F08A3C" /><text x={0} y={24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"' }}>$15</text></g>
        </g>
      </g>}
      {/* # B) the per-visit test */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, dollar, 6)}>
          <g transform={`translate(960 ${lerp(560, 420, on(f, visit, 14))}) scale(${lerp(0.6, 0.8, on(f, c('s73:number'), 14)) + 0.2 * on(f, visit, 14)}) rotate(${-8 * Math.sin(Math.PI * span(f, c('s73:matters'), c('s73:matters') + 14))})`} opacity={on(f, c('s73:15'), 4) * (1 - on(f, paid, 6))}><rect x={-100} y={-56} width={200} height={112} rx={20} fill="#F08A3C" /><text x={0} y={24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"' }}>$15</text><text x={0} y={110} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"' }}>{f >= visit ? '÷ VISITS = ?' : 'A MONTH'}</text></g>
          <g opacity={on(f, paid, 4) * (1 - on(f, d15, 6))}><Doc x={560} y={620} s={1.2} r={-3} title="LAST MONTH" lines={3} /><Label x={560} y={820} text="PAID: $15" size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, divide, 4) * (1 - on(f, d15, 6))}><Label x={960} y={640} text="÷" size={140} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, went, 4) * (1 - on(f, d15, 6))}><VisitStrip x={1380} y={620} n={3} w={560} /><Label x={1380} y={720} text="TIMES YOU WENT" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, d15, 4)}>
            <SplitBar x={960} y={560} w={1000} n={f >= d3 ? 3 : 1} t={span(f, d3, d3 + 14)} total="$15" each={f >= d5 ? '$5 A VISIT' : ''} />
            <VisitStrip x={960} y={820} n={3} w={900} o={on(f, d3, 4)} />
          </g>
        </g>
        <g opacity={on(f, dollar, 4)}>
          <SeeSaw x={960} y={760} w={1100} tilt={-0.2 * on(f, c('s75:answer'), 14) + lerp(0, 0.3, on(f, c('s75:members'), 14)) - 0.3 * on(f, c('s75:members'), 14) + lerp(0, 0.4, on(f, c('s76:more'), 20)) - lerp(0, 0.2, on(f, side, 20))}
            left={<g><Treadmill x={0} y={0} s={0.55} f={f} run={1} used={1} /><Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={-14} y={-10} s={0.38} /><text x={0} y={-260} textAnchor="middle" fill={P.mintInk} style={{ font: '400 50px "Bebas Neue"' }}>$1–2 A VISIT</text></g>}
            right={<g opacity={on(f, d15b, 4)}><Sofa x={0} y={0} s={0.45} /><Mini look="buyer" x={0} y={-16} scale={0.8} frame={f} seed={190} /><text x={0} y={-260} textAnchor="middle" fill={P.coralInk} style={{ font: '400 50px "Bebas Neue"' }}>$15+ A VISIT</text></g>} />
          {/* # coins come in to the frequent side, go out from the rare side */}
          {Array.from({ length: 4 }, (_, k) => { const p = fly(f, (k < 2 ? others : c('s75:helping')) + k * 6, [1360, 420], [560, 420], 22, 140); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null })}
          {Array.from({ length: 4 }, (_, k) => { const p = fly(f, paying + k * 6, [1360, 420], [560, 420], 22, 140); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null })}
          <g opacity={on(f, c('s76a:neither'), 4)}><Tick x={400} y={380} o={1} r={40} /></g><g opacity={on(f, wrong, 4)}><Tick x={1520} y={380} o={1} r={40} /></g>
          <g opacity={on(f, Math.min(gym77, c('s76a:deal')), 8)}><GymFront x={960} y={960} s={0.32} lit={1} /></g>
          <g opacity={on(f, money77, 4)}><Coin x={960} y={lerp(700, 760, on(f, money77, 12))} s={0.9} text="?" /></g>
        </g>
      </g>}
      {/* # C) the last picture */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, walk, 6)}>
          <g opacity={on(f, work, 4)}><Treadmill x={560} y={880} s={1} f={f} run={1} used={1} /><Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={530} y={860} s={0.7} /><Label x={560} y={1000} text="NO NEW MONEY" size={46} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, pay, 4)}><Sofa x={1360} y={900} s={0.8} /><Mini look="buyer" x={1360} y={870} scale={1.3} frame={f} seed={195} />
            {(() => { const p = fly(f, stay, [1360, 640], [960, 420], 22, 120); return p.o > 0 ? <Coin x={p.x} y={p.y} s={1.1} o={p.o} text="15" /> : null })()}
            <g opacity={on(f, stay + 20, 4)} transform="translate(960 420)"><rect x={-110} y={-30} width={220} height={60} rx={14} fill={P.navy3} /><Coin x={0} y={-10} s={0.8} text="15" /></g></g>
        </g>
        <g opacity={on(f, walk, 4)}>
          <GymFront x={1100} y={900} s={1.2} lit={0.4 + 0.6 * on(f, c('s78:gym'), 6)} />
          <circle cx={1100 - 0.2 * 1.2 * 330} cy={900 - 155 * 1.2} r={110} fill={P.gold} opacity={0.35 * on(f, treadmill, 6) * (0.7 + 0.3 * Math.sin(f / 5))} />
          <Person f={f} who="hero" beats={[[0, 'walkA', 'neutral', 'walkB', 12], [c('s78:remember'), 'think', 'thinking'], [treadmill, 'lookFar', 'thinking']]} x={lerp(220, 880, span(f, walk, treadmill))} y={1000} s={0.66} />
        </g>
      </g>}
      <Vignette id="gm-payoff" />
    </g>
  )
}

export const GM_PAYOFF = makePiece('gm-payoff', 'Gym long: not a scam; a good deal if you go; judge the price per visit ($15 ÷ 3 = $5); $1–2 a visit vs $15+ a visit — which side are you on; gyms make money when you pay and stay home; walking past the gym, the treadmill glows', {
  mood: 'light', Component: Payoff,
  beats: ["s70", "s70:scam", "s71:really", "s71:deal", "s71:stays", "s72:judge", "s73:small", "s73:visit", "s74:paid", "s74:divide", "s74:went", "s74a:15", "s74a:3", "s74a:5", "s75:dollar", "s75:others", "s76:15", "s76:paying", "s76a:wrong", "s76a:side", "s77:work", "s77:pay", "s77:stay", "s77:gym", "s77:money", "s78:walk", "s78:treadmill", "s71:gym", "s71:good", "s72:trick", "s71:reason", "s73:number", "s73:matters", "s73:15", "s75:answer", "s75:members", "s76:more", "s75:helping", "s76a:neither", "s76a:deal", "s78:gym", "s78:remember"],
  sfx: [['s70:scam', 'ding', 0.3], ['s71:deal', 'chime', 0.3], ['s73:visit', 'pop', 0.3], ['s74a:3', 'pop', 0.3], ['s76:paying', 'coin', 0.35], ['s77:stay', 'coin', 0.4], ['s78:treadmill', 'chime', 0.35]] })
