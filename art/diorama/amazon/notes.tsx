// ---------------------------------------------------------------- s87–s99: two honest notes + payoff.
// A) Note 1: a search results page on a phone with "SPONSORED" tags; $69B of ad sales drops into the store's box (the
//    store block gets an "ADS INSIDE" band); a profit tag over the ads with a "?" — "we won't guess".
// B) Note 2: operating profit (two columns: store, AWS) and, outside the dashed line, a bag of investment gains that
//    belongs to neither; "net profit" includes it.
// C) Payoff: the four step icons light on their words; the store window at street level and the server room below;
//    a magnifying glass moves from the window down to the basement ("where it actually makes its money").
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Coin2, MoneyBag } from '../uber/kit'
import { ASpot, Parcel, Rack, TwoFloor } from './kit'

const GROUND = 820

const Notes: React.FC<PieceProps> = ({ f, c }) => {
  const two87 = c('s87:two'), honest = c('s87:honest'), fair = c('s87:fair')
  const first88 = c('s88:first'), isnt88 = c("s88:isn't"), shopping = c('s88:shopping'), sells88 = c('s88:sells'), ads88 = c('s88:ads'), sponsored = c('s88:sponsored'), search = c('s88:search')
  const y2025 = c('s89:2025'), d69 = c('s89:69'), counts = c('s89:counts'), inside = c('s89:inside'), numbers89 = c('s89:numbers')
  const doesnt90 = c("s90:doesn't"), profit90 = c('s90:profit'), guess = c('s90:guess')
  const second91 = c('s91:second'), operating91 = c('s91:operating'), businesses91 = c('s91:businesses'), taxes91 = c('s91:taxes'), investment91 = c('s91:investment'), gains91 = c('s91:gains')
  const net = c('s92:net'), included = c('s92:included'), gains92 = c('s92:gains'), belong = c('s92:belong'), store92 = c('s92:store'), aws92 = c('s92:aws')
  const remember = c('s93:remember'), four93 = c('s93:four')
  const store94 = c('s94:store'), thin94 = c('s94:thin'), behind94 = c('s94:behind'), rents94 = c('s94:rents'), fifth94 = c('s94:fifth'), half94 = c('s94:half'), pays94 = c('s94:pays'), ship94 = c('s94:ship')
  const shop95 = c('s95:shop'), renting95 = c('s95:renting')
  const next96 = c('s96:next'), sells96 = c('s96:sells'), where96 = c('s96:where'), money96 = c('s96:money')
  const biggest = c('s97:biggest'), profitable = c('s97:profitable')
  const sometimes = c('s98:sometimes'), window98 = c('s98:window'), money98 = c('s98:money'), sight = c('s98:sight')
  const how99 = c('s99:how'), advice = c('s99:advice')

  const AB = second91 - 6, BC = remember - 6
  const A = win(f, two87 - 30, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const C1 = 1 - on(f, shop95 - 6, 10), C2 = on(f, shop95 - 6, 10)

  return (
    <g>
      <Stage id="az-notes" frame={f} />
      <ASpot f={f} at={d69} x={1300} y={500} rx={200} ry={160} />
      <Headline f={f} lines={[[two87, 'TWO HONEST NOTES', P.ink, 110], [first88, '1) THE STORE INCLUDES ADS', P.ink, 100], [d69, 'ADS: ≈ $69B OF SALES (2025)', P.ink, 96], [guess, 'AD PROFIT: NOT REPORTED', P.ink, 100], [second91, '2) OPERATING PROFIT, NOT NET', P.ink, 96], [remember, 'THE 4 STEPS', P.ink, 110], [shop95, 'A SHOP THAT PROFITS FROM COMPUTERS', P.ink, 88], [where96, 'WHERE DOES IT MAKE ITS MONEY?', P.ink, 96], [how99, '', P.ink]]} />

      {/* # A) ads inside the store */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="hero" beats={[[0, 'present', 'smiling'], [c('s87:picture'), 'present', 'smiling'], [honest, 'countA', 'thinking'], [ads88, 'phone', 'smiling'], [guess, 'shrug', 'thinking']]} x={220} y={GROUND} s={0.75} />
        {/* # the phone with sponsored results */}
        <g opacity={on(f, shopping, 8)} transform="translate(560 470)"><rect x={-130} y={-260} width={260} height={520} rx={36} fill="#111A2E" /><rect x={-114} y={-236} width={228} height={472} rx={24} fill="#EEF3FA" />
          <rect x={-94} y={-216} width={188} height={40} rx={20} fill="#FFFFFF" stroke="#C9D3E1" strokeWidth={3} /><text x={-70} y={-188} fill={P.ink2} style={{ font: '400 26px "Bebas Neue"' }}>{f >= search ? 'HEADPHONES' : 'SEARCH…'}</text>
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(0 ${-130 + k * 120})`}><rect x={-94} y={-46} width={188} height={100} rx={12} fill="#FFFFFF" /><rect x={-82} y={-34} width={70} height={76} rx={8} fill="#D9DFE8" /><rect x={0} y={-30} width={80} height={10} rx={5} fill="#C9D3E1" />
            <g opacity={k < 2 ? on(f, sponsored + k * 4, 6) : 0}><rect x={0} y={0} width={86} height={26} rx={6} fill={P.gold} /><text x={43} y={20} textAnchor="middle" fill={P.navy0} style={{ font: '400 20px "Bebas Neue"' }}>SPONSORED</text></g></g>)}</g>
        {/* # the store block with ads inside */}
        <g transform="translate(1300 0)">
          <rect x={-260} y={GROUND - 480} width={520} height={480} rx={16} fill="#E9A23B" /><text x={0} y={GROUND - 400} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>THE STORE'S NUMBERS</text>
          <g opacity={on(f, inside, 8)}><rect x={-240} y={GROUND - 200 + 30 * (1 - on(f, inside, 14))} width={480} height={110} rx={12} fill={P.gold} stroke={P.goldD} strokeWidth={4} /><text x={0} y={GROUND - 130} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>ADS ARE IN HERE</text></g>
          {(() => { const fl = fly(f, d69, [-500, GROUND - 600], [0, GROUND - 260], 20, 120); return f >= d69 && fl.t < 1 ? <MoneyBag x={fl.x} y={fl.y} s={0.7} text="$69B" /> : null })()}
          <g opacity={on(f, c('s89:sales'), 8) * (1 - on(f, inside, 8))}><Label x={0} y={GROUND - 300} text="$69B OF AD SALES" size={44} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, profit90, 8)} transform={`translate(0 ${GROUND - 560 - 14 * pop(f, guess, 12) - 10 * pop(f, c('s90:ads'), 12)})`}><rect x={-140} y={-40} width={280} height={80} rx={14} fill={P.card} stroke={P.edge} strokeWidth={4} /><text y={16} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>AD PROFIT: ?</text></g>
        </g>
      </g>}

      {/* # B) operating profit vs net profit */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <rect x={360} y={260} width={760} height={GROUND - 260} rx={24} fill="none" stroke={P.mintInk} strokeWidth={6} strokeDasharray="18 12" opacity={on(f, operating91, 8)} />
        <g opacity={on(f, operating91, 8)}><Label x={740} y={240} text="OPERATING PROFIT" size={48} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, businesses91, 8)}>
          <rect x={460} y={GROUND - 34.4 * 9} width={200} height={34.4 * 9} rx={12} fill="#E9A23B" /><Label x={560} y={GROUND + 50} text="STORE" size={44} font="Bebas Neue" color={P.ink} />
          <rect x={820} y={GROUND - 45.6 * 9} width={200} height={45.6 * 9} rx={12} fill="#1F2B4A" /><Label x={920} y={GROUND + 50} text="AWS" size={44} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, taxes91, 8)}><Label x={740} y={330} text="BEFORE TAXES" size={40} font="Bebas Neue" color={P.ink2} /></g>
        {/* # investment gains: outside the box */}
        <g opacity={on(f, investment91, 8)} transform={`translate(1500 ${GROUND - 20 * (1 - pop(f, gains91, 14))})`}><MoneyBag x={0} y={0} s={1.2} text="GAINS" /><Label x={0} y={50} text="INVESTMENT GAINS" size={42} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, net, 8)}><rect x={300} y={200} width={1420} height={GROUND - 170} rx={30} fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="10 10" /><Label x={1500} y={240} text="NET PROFIT ALSO INCLUDES THESE" size={40} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, belong, 8)}><path d="M1360 520 L1640 680 M1640 520 L1360 680" stroke={P.coralInk} strokeWidth={0} /><Label x={1500} y={460} text={f >= aws92 ? 'NOT THE STORE, NOT AWS' : f >= store92 ? 'NOT THE STORE…' : 'BELONGS TO…'} size={42} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # C) payoff */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          {([[store94, 'THIN SLICE', '#E9A23B', thin94], [behind94, 'RENTS COMPUTERS', '#1F2B4A', rents94], [fifth94, '< 1/5 SALES, > 1/2 PROFIT', P.gold, half94], [pays94, 'NO SHIPPING', P.mint, ship94]] as [number, string, string, number][]).map(([at, t, col, at2], k) => {
            const x = 300 + k * 440
            return <g key={k} opacity={lerp(0.3, 1, on(f, at, 8)) * on(f, four93, 8)} transform={`translate(${x} ${GROUND - 120 - 20 * pop(f, at2, 14)})`}>
              {k === 0 && <g transform={`translate(0 ${-60 - 12 * pop(f, c('s94:huge'), 12)})`}><Parcel x={0} y={0} s={1} /></g>}
              {k === 1 && <g transform={`translate(0 ${-60 - 14 * pop(f, c('s94:computers'), 12)}) scale(0.55)`}><Rack x={0} y={0} f={f} /></g>}
              {k === 2 && <g transform={`translate(0 ${-12 * pop(f, c('s94:under'), 12)})`}><rect x={-90} y={-170} width={60} height={100} rx={8} fill="#E9A23B" /><rect x={30} y={-200} width={60} height={130} rx={8} fill="#1F2B4A" /></g>}
              {k === 3 && <g transform={`translate(0 ${-120 - 12 * pop(f, c('s95:company'), 12)})`}><Coin2 x={0} y={0} r={48} t="$" /></g>}
              <circle cx={0} cy={40} r={36} fill={col} /><text x={0} y={58} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{k + 1}</text>
              <Label x={0} y={130} text={t} size={38} font="Bebas Neue" color={P.ink} />
            </g> })}
        </g>
        <g opacity={C2}>
          <TwoFloor x={760} y={GROUND} s={0.95} f={f} open={1} />
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [next96, 'think', 'thinking'], [where96, 'point', 'smiling'], [sight, 'present', 'smiling']]} x={1500} y={GROUND} s={0.8} flip />
          {/* # a magnifying glass moves from the window down to the basement */}
          {(() => { const t = span(f, where96, money96 + 20) * 0.5 + span(f, money98, sight + 10) * 0.5, x = lerp(760, 760, t), y = lerp(560, 920, t)
            return <g opacity={on(f, next96, 8)} transform={`translate(${x + 220} ${y})`}><circle r={70} fill="#BFE3FF" fillOpacity={0.35} stroke={P.ink} strokeWidth={10} /><path d="M50 50 L120 120" stroke={P.ink} strokeWidth={18} strokeLinecap="round" /></g> })()}
          <g opacity={on(f, c('s96:company'), 8) * (1 - on(f, where96, 8))}><Label x={760} y={330} text={f >= c('s96:ask') ? 'WHAT IT SELLS THE MOST OF?' : 'LOOKING AT A COMPANY…'} size={44} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, biggest, 8) * (1 - on(f, sometimes, 8))} transform={`translate(0 ${-10 * pop(f, c("s97:isn't"), 12)})`}><Label x={1500} y={330} text={f >= profitable ? 'BIGGEST ≠ MOST PROFITABLE' : 'BIGGEST…'} size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, window98, 8)}><Label x={760} y={330} text="THE STORE WINDOW" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, sight, 8)}><Label x={1080} y={GROUND + 120} text="…AND THE MONEY, OUT OF SIGHT" size={40} font="Bebas Neue" color={P.ink} anchor="start" /></g>
          <g opacity={on(f, advice, 8)}><Label x={960} y={250} text="HOW THE MONEY WORKS — NOT INVESTMENT ADVICE" size={34} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}
      <Vignette id="az-notes" />
    </g>
  )
}

const BEATS = ['s90:ads', "s97:isn't", 's95:company', 's89:sales', 's94:huge', 's87:picture', 's94:computers', 's94:under', 's96:company', 's96:ask', 's87:two', 's87:honest', 's87:fair', 's88:first', "s88:isn't", 's88:shopping', 's88:sells', 's88:ads', 's88:sponsored', 's88:search', 's89:2025', 's89:69', 's89:counts', 's89:inside', 's89:numbers', "s90:doesn't", 's90:profit', 's90:guess', 's91:second', 's91:operating', 's91:businesses', 's91:taxes', 's91:investment', 's91:gains', 's92:net', 's92:included', 's92:gains', 's92:belong', 's92:store', 's92:aws', 's93:remember', 's93:four', 's94:store', 's94:thin', 's94:behind', 's94:rents', 's94:fifth', 's94:half', 's94:pays', 's94:ship', 's95:shop', 's95:renting', 's96:next', 's96:sells', 's96:where', 's96:money', 's97:biggest', 's97:profitable', 's98:sometimes', 's98:window', 's98:money', 's98:sight', 's99:how', 's99:advice']
export const AZ_NOTES = makePiece('az-notes', 'Amazon long ending: honest note 1 — Amazon\'s store numbers include ads (sponsored results on a search page), about $69B of ad sales in 2025, ad profit not reported; note 2 — operating profit (store and AWS, before taxes) vs net profit that also includes investment gains belonging to neither; recap of the four steps; a shop that makes most of its operating profit renting computers; a magnifying glass moves from the store window to the server room: ask where a company really makes its money; not investment advice', {
  mood: 'light', Component: Notes, beats: BEATS,
  sfx: [['s88:sponsored', 'pop', 0.2], ['s89:69', 'coin', 0.2], ['s90:guess', 'pop', 0.15], ['s91:investment', 'swish', 0.2], ['s94:half', 'pop', 0.2], ['s96:where', 'whoosh', 0.2], ['s98:sight', 'pop', 0.2]] })
