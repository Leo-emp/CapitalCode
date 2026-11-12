// ---------------------------------------------------------------- s88–s94: the four steps, the takeaway, the question.
// A) Four step badges, each lighting with its sentence and its own picture: a fund vault with investor icons; a shop
//    with a debt block locked on; gold and red piles under a magnifying glass; fee envelopes + a profit coin to the firm.
// B) $30M grows into $95M (left); a store sinks under debt blocks (right).
// C) A newspaper: BOUGHT BY PRIVATE EQUITY. The hero lifts a magnifying glass to the debt block: how much debt came with it?
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { StepBadge } from '../bank/kit'
import { DEBT, DEBT_D, EQ, EQ_D, Envelope, FirmHQ, FundVault, Glass, InvIcon, Lock, MiniShop, MoneyColumn, ToyStore } from './kit'

const GROUND = 930
const GREEN = '#3DBE84', GREEN_D = '#23935F', RED = '#E5634F', RED_D = '#B7402F'

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const one = c('s88:one'), raises = c('s88:raises'), pensions = c('s88:pensions')
  const two = c('s89:two'), buys = c('s89:buys'), borrowed = c('s89:borrowed'), back89 = c('s89:back')
  const three = c('s90:three'), grow = c('s90:grow'), sell = c('s90:sell'), gains = c('s90:gains'), losses = c('s90:losses')
  const four = c('s91:four'), collects = c('s91:collects'), fees = c('s91:fees'), share = c('s91:share'), wins = c('s91:wins')
  const d30 = c('s92:30'), d95 = c('s92:95'), sink = c('s92:sink'), debt92 = c('s92:debt')
  const next93 = c('s93:next'), bought93 = c('s93:bought'), equity93 = c('s93:equity'), ask = c('s93:ask'), question = c('s93:question'), much = c('s93:much'), debt93 = c('s93:debt')
  const works = c('s94:works')

  const AB = d30 - 8, BC = next93 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = on(f, BC, 10)
  const hero: Beat[] = [[BC, 'idle', 'neutral'], [bought93, 'hold', 'thinking'], [ask, 'pointUp', 'neutral'], [much, 'holdUp', 'thinking'], [works, 'present', 'smiling']]
  return (
    <g>
      <Stage id="pe-payoff" frame={f} />
      <Headline f={f} lines={[[one, 'PRIVATE EQUITY IN 4 STEPS', P.ink, 104], [d30, 'DEBT MAKES IT BIGGER, BOTH WAYS', P.ink, 96], [next93, 'NEXT TIME YOU HEAR IT…', P.ink, 104], [much, 'HOW MUCH DEBT CAME WITH IT?', P.goldInk, 100]]} />
      <Ground y={GROUND} />

      {/* # A) the four steps */}
      {A > 0 && <g opacity={A}>
        {([[one, 1, 'RAISE A FUND'], [two, 2, 'BUY WITH DEBT'], [three, 3, 'GROW + SELL'], [four, 4, 'COLLECT FEES']] as [number, number, string][]).map(([at, n, t], k) => {
          const next = [two, three, four, AB][k]
          return <g key={n} opacity={on(f, at, 8)} transform={`translate(0 ${16 * (1 - pop(f, at, 12))})`}>
            <StepBadge x={270 + k * 460} y={780} n={n} t={t} lit={win(f, at, next, 8)}>
              {n === 1 && <g><FundVault x={0} y={80} s={0.62} fill={on(f, raises, 20) * 0.7} label="FUND" /><g opacity={on(f, pensions, 8)}><InvIcon kind="pension" x={-150} y={-80} s={0.7} /><InvIcon kind="insure" x={150} y={-80} s={0.7} /></g></g>}
              {n === 2 && <g><MiniShop x={0} y={80} s={1.45} sign={false} /><g opacity={on(f, borrowed, 8)} transform={`translate(0 ${-40 * (1 - on(f, borrowed, 12))})`}><rect x={-130} y={-200} width={260} height={74} rx={12} fill={DEBT} /><Label x={0} y={-148} text="DEBT" size={46} font="Bebas Neue" color="#FFFFFF" /></g><g opacity={on(f, back89, 8)}><Lock x={160} y={-60} s={0.8} /></g></g>}
              {n === 3 && <g><g transform={`translate(-90 80) scale(${0.6 + 0.3 * on(f, gains, 16)})`}><path d="M-120 0 Q0 -160 120 0 Z" fill={EQ} stroke={EQ_D} strokeWidth={6} /></g>
                <g opacity={on(f, losses, 8)} transform={`translate(110 80) scale(${0.6 + 0.3 * on(f, losses, 16)})`}><path d="M-120 0 Q0 -130 120 0 Z" fill={RED} stroke={RED_D} strokeWidth={6} /></g>
                <g opacity={on(f, grow, 8)}><Glass x={lerp(-90, 110, on(f, losses, 16))} y={-90} s={0.5} /></g></g>}
              {n === 4 && <g><FirmHQ x={40} y={80} s={0.45} name="" />
                <g opacity={on(f, fees, 8)}><Envelope x={-120} y={-40} s={0.8} t="" /></g>
                <g opacity={on(f, share, 8)} transform={`translate(-120 ${-150 - 10 * pop(f, wins, 12)})`}><circle r={40} fill={EQ} stroke={EQ_D} strokeWidth={5} /></g></g>}
            </StepBadge>
          </g>
        })}
      </g>}

      {/* # B) 30 → 95, and a store sinking under debt */}
      {B > 0 && <g opacity={B}>
        <rect x={956} y={300} width={8} height={GROUND - 300} rx={4} fill={P.ink2} opacity={0.35} />
        <MoneyColumn x={330} y={GROUND - 10} w={200} unit={5} labelSide="in" size={48} segs={[{ v: 30, col: EQ, colD: EQ_D, label: '$30M' }]} />
        <g opacity={on(f, d95, 8)}><MoneyColumn x={680} y={GROUND - 10} w={200} unit={5} grow={on(f, d95, 20)} labelSide="in" size={48} segs={[{ v: 95, col: GREEN, colD: GREEN_D, label: '$95M' }]} /></g>
        <g opacity={on(f, sink, 10)}>
          <clipPath id="pe-sink"><rect x={960} y={0} width={960} height={GROUND} /></clipPath>
          <g clipPath="url(#pe-sink)"><g transform={`translate(0 ${200 * on(f, debt92, 40)})`}>
            <ToyStore x={1440} y={GROUND} s={0.7} dark={on(f, debt92, 30)} f={f} />
            {[0, 1, 2].map((k) => <g key={k} opacity={on(f, sink + k * 5, 6)}><rect x={1300} y={GROUND - 420 - k * 80} width={280} height={70} rx={12} fill={DEBT} /><rect x={1440} y={GROUND - 420 - k * 80} width={80} height={70} fill={DEBT_D} opacity={0.4} /></g>)}
          </g></g>
        </g>
      </g>}

      {/* # C) the newspaper and the question */}
      {Cw > 0 && <g opacity={Cw}>
        <Person f={f} who="hero" beats={hero} x={420} y={GROUND} s={1.02} />
        <g opacity={on(f, bought93, 10)} transform={`translate(1180 ${560 - 14 * pop(f, bought93, 12)}) rotate(-3)`}>
          <rect x={-330} y={-230} width={660} height={460} rx={10} fill="#FFFDF5" stroke="#CDB58C" strokeWidth={3} />
          <rect x={-300} y={-200} width={600} height={60} rx={4} fill="#16294A" /><text y={-156} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>THE DAILY NEWS</text>
          <text y={-70} textAnchor="middle" fill="#16294A" style={{ font: '400 64px "Bebas Neue"' }}>{f >= equity93 ? 'BOUGHT BY PRIVATE EQUITY' : 'BOUGHT BY…'}</text>
          <g transform="translate(-150 120)"><MiniShop x={0} y={60} s={0.9} /></g>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={10} y={20 + k * 40} width={270} height={14} rx={7} fill="#C9B79A" />)}
        </g>
        {/* the question: a debt block with a magnifying glass */}
        <g opacity={on(f, debt93, 10)} transform={`translate(0 ${-30 * (1 - on(f, debt93, 14))})`}><rect x={1340} y={200} width={300} height={84} rx={14} fill={DEBT} /><Label x={1490} y={260} text="DEBT: ?" size={58} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, much, 10)}><Glass x={1730} y={420} s={0.55} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s87:steps")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s88:firm")} x={270} y={640} rx={210} ry={200} />
        <Spot f={f} at={c("s89:money")} x={730} y={640} rx={210} ry={200} />
        <Spot f={f} at={c("s89:company")} x={730} y={640} rx={210} ry={200} />
        <Spot f={f} at={c("s89:must")} x={730} y={640} rx={210} ry={200} />
        <Spot f={f} at={c("s90:more")} x={1190} y={640} rx={210} ry={200} />
        <Spot f={f} at={c("s90:debt")} x={1190} y={640} rx={210} ry={200} />
        <Spot f={f} at={c("s92:how")} x={1440} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s92:same")} x={1440} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s92:move")} x={1440} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s93:came")} x={1490} y={240} rx={170} ry={70} />
        <Spot f={f} at={c("s93:with")} x={1490} y={240} rx={170} ry={70} />
        <Spot f={f} at={c("s94:this")} x={420} y={720} rx={150} ry={230} />
        <Spot f={f} at={c("s94:how")} x={420} y={720} rx={150} ry={230} />
      </g>
      {/* # spots:end */}
      <Vignette id="pe-payoff" />
    </g>
  )
}

export const PE_PAYOFF = makePiece('pe-payoff', 'Payoff: four step badges light one by one with pictures — a fund vault with pension and insurer icons, a shop with a DEBT block locked on, gold and red piles under a magnifying glass, fee envelope and profit coin to the firm; then $30M grows into $95M on the left while a dark toy store sinks under debt blocks on the right; a newspaper BOUGHT BY PRIVATE EQUITY, the presenter points up and a DEBT: ? block with a magnifying glass — how much debt came with it?', {
  mood: 'light', Component: Payoff,
  beats: ["s88:one", "s88:raises", "s88:pensions", "s89:two", "s89:buys", "s89:borrowed", "s89:back", "s90:three", "s90:grow", "s90:sell", "s90:gains", "s90:losses", "s91:four", "s91:collects", "s91:fees", "s91:share", "s91:wins", "s92:30", "s92:95", "s92:sink", "s92:debt", "s93:next", "s93:bought", "s93:equity", "s93:ask", "s93:question", "s93:much", "s93:debt", "s94:works", "s87:steps", "s88:firm", "s89:money", "s89:company", "s89:must", "s90:more", "s90:debt", "s92:how", "s92:same", "s92:move", "s93:came", "s93:with", "s94:this", "s94:how"],
  sfx: [['s88:one', 'pop', 0.15], ['s89:two', 'pop', 0.15], ['s90:three', 'pop', 0.15], ['s91:four', 'pop', 0.15], ['s92:95', 'chime', 0.2], ['s92:sink', 'thud', 0.2], ['s93:bought', 'flutter', 0.15], ['s93:debt', 'pop', 0.2]] })
