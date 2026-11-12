// ---------------------------------------------------------------- s24–s30: how the promise is bought.
// A) PJM's auctioneer at a podium with a gavel; a calendar flips three years ahead; three steps rise (step by step).
// B) First: the auctioneer measures what the region needs on its busiest day — a shelf of empty promise slots fills in,
//    then two dashed slots for the safety margin.
// C) Second: five plant owners stand by their plants and raise price paddles.
// D) Third: the plants slide into a staircase, cheapest lowest; the auctioneer ticks them one by one up the stairs and a
//    promise scroll drops into each slot until the shelf is full.
// E) The last plant's price becomes a gold line across every step; the lower steps fill up to it with coins; the owner of
//    the cheapest plant catches the extra and grins.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, Headline, Person, Tick, win } from '../aimoney/common'
import { PowerPlant } from './kit'
import { Gavel, Ground, Paddle, Podium, Scroll, Sun } from './kit2'

const GROUND = 920
// # the five plants' asking prices (heights, not numbers: no prices are spoken here)
const ASK = [120, 190, 250, 330, 430]
const STEP_X = (k: number) => 520 + k * 250

const Auction: React.FC<PieceProps> = ({ f, c }) => {
  const auction = c('s24:auction'), three = c('s24:three'), needed = c('s24:needed')
  const works = c('s25:works'), step1 = c('s25:step'), step2 = c('s25:step#2')
  const first = c('s26:first'), estimates = c('s26:estimates'), most = c('s26:most'), busiest = c('s26:busiest'), safety = c('s26:safety')
  const moment26 = c('s26:moment'), region26 = c('s26:region'), ready27 = c('s27:ready'), second = c('s27:second'), owners = c('s27:owners'), offer = c('s27:offer'), names = c('s27:names')
  const third = c('s28:third'), accepts = c('s28:accepts'), cheapest = c('s28:cheapest'), moving = c('s28:moving'), enough = c('s28:enough')
  const last = c('s29:last'), becomes = c('s29:becomes'), everyone = c('s29:everyone')
  const low = c('s30:low'), still = c('s30:still'), paid = c('s30:paid'), higher = c('s30:higher')
  const AB = first - 4, BC = second - 4, CD = third - 4
  const A = win(f, auction, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 8)
  // # D/E: the shelf needs 4 promises; plants 0–3 are accepted one by one, plant 4 (dearest) is not needed
  const ticks = [accepts, cheapest + 10, moving, enough - 6]
  const lineY = GROUND - ASK[3]
  return (
    <g>
      <Stage id="pw-auction" frame={f} />
      <Headline f={f} lines={[[three, '3 YEARS BEFORE', P.ink, 100], [works, '', P.ink], [first, 'FIRST', P.ink, 104], [second, 'SECOND', P.ink, 104], [third, 'THIRD', P.ink, 104], [last, '', P.ink], [everyone, 'THE PRICE FOR EVERYONE', P.goldInk, 100]]} />

      {/* # A) the auction and its three steps */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [auction, 'present', 'smiling'], [three, 'point', 'neutral'], [works, 'explain', 'smiling'], [step1, 'countOne', 'smiling']]} x={560} y={GROUND} s={0.72} o={on(f, auction, 10)} />
        <Podium x={560} y={GROUND} s={1.05} label="AUCTION" o={on(f, auction, 10)} />
        <g opacity={on(f, auction + 6, 8)}><Gavel x={690} y={GROUND - 290} s={1.1} r={-30 + 40 * Math.max(0, Math.sin(Math.min(1, span(f, auction + 6, auction + 20)) * Math.PI))} /></g>
        <g opacity={on(f, three, 8) * (1 - on(f, works, 8))}>
          <Calendar x={1300} y={420} text={['NOW', '+1', '+2', '+3'][Math.min(3, Math.floor(Math.max(0, f - three) / 9))]} s={1.4} flip={((f - three) % 9) / 9} />
          <g opacity={on(f, needed, 8)} transform={`translate(1300 ${GROUND})`}><PowerPlant x={0} y={0} s={0.6} ready={1} f={f} /></g>
        </g>
        {/* # three steps rise, one on each "step" */}
        {[step1, step2, step2 + 8].map((a, k) => <g key={k} opacity={on(f, a, 8)} transform={`translate(${1060 + k * 200} ${GROUND})`}>
          <rect x={-90} y={-(120 + k * 110) * on(f, a, 14)} width={180} height={(120 + k * 110) * on(f, a, 14)} rx={12} fill={[P.sky, P.gold, P.coral][k]} />
          <text x={0} y={-(120 + k * 110) * on(f, a, 14) + 70} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 72px "Bebas Neue"' }}>{k + 1}</text>
        </g>)}
      </g>}

      {/* # B) step 1: how much the region needs on its busiest day, plus a safety margin */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <Sun x={1640} y={260} heat={on(f, busiest, 16)} f={f} o={on(f, busiest, 10)} />
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [estimates, 'measure', 'thinking'], [most, 'point', 'neutral'], [region26, 'present', 'neutral'], [moment26, 'countOne', 'neutral'], [safety, 'explain', 'smiling']]} x={330} y={GROUND} s={0.62} />
        {/* # the shelf of promise slots */}
        <g transform={`translate(560 ${GROUND - 120})`}>
          <rect x={0} y={0} width={960} height={26} rx={10} fill="#8E6232" opacity={on(f, estimates, 10)} />
          {Array.from({ length: 6 }, (_, k) => {
            const isMargin = k >= 4, at = isMargin ? safety + (k - 4) * 6 : most + k * 6
            return <g key={k} opacity={on(f, at, 8)} transform={`translate(${80 + k * 160} 0)`}>
              <rect x={-60} y={-260} width={120} height={256} rx={14} fill={isMargin ? 'none' : '#FFF6E2'} stroke={isMargin ? P.goldD : '#CDB58C'} strokeWidth={5} strokeDasharray={isMargin ? '14 10' : '0'} />
              {!isMargin && <Scroll x={0} y={-132} s={0.55} o={0.35} />}
            </g>
          })}
        </g>
      </g>}

      {/* # C) step 2: plant owners stand by their plants and raise price paddles */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {ASK.map((_, k) => {
          const x = 230 + k * 365, at = owners + k * 4
          return <g key={k} opacity={on(f, at, 8)}>
            <PowerPlant x={x + 70} y={GROUND} s={0.42} ready={0.3 * on(f, offer, 10) + 0.7 * on(f, ready27 + k * 2, 10)} f={f} />
            <Person f={f} who={['owner', 'investor', 'investorF', 'buyer', 'worker'][k]} beats={[[0, 'idle', 'neutral'], [offer, 'present', 'smiling'], [names + k * 3, 'holdUp', 'smiling']]} x={x - 110} y={GROUND} s={0.55} />
            <g opacity={on(f, names + k * 3, 8)}><Paddle x={x - 60} y={GROUND - 420 - 30 * pop(f, names + k * 3)} s={0.8} text="$" color={['#FFF6E2', '#FFE9C2', '#FFD9A8', '#FFC48F', '#FFB07A'][k]} /></g>
          </g>
        })}
      </g>}

      {/* # D + E) step 3: the staircase, cheapest first, ticked until the shelf of 4 is full; then one price line */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {ASK.map((h, k) => {
          const x = STEP_X(k), slide = on(f, third + k * 4, 18), acc = k < 4 && f >= ticks[k]
          // # E: accepted steps fill up to the last accepted price with coins
          const fill = k < 4 ? lerp(h, ASK[3], on(f, becomes + k * 4, 18)) : h
          return <g key={k} opacity={slide} transform={`translate(0 ${lerp(60, 0, slide)})`}>
            <rect x={x - 100} y={GROUND - fill} width={200} height={fill} rx={12} fill={k < 4 && f >= becomes ? P.gold : '#E9DCC0'} opacity={0.9} />
            <rect x={x - 100} y={GROUND - h} width={200} height={h} rx={12} fill={['#FFF6E2', '#FFE9C2', '#FFD9A8', '#FFC48F', '#FFB07A'][k]} stroke="#CDB58C" strokeWidth={4} />
            <PowerPlant x={x + 10} y={GROUND - fill} s={0.38} ready={acc ? 1 : 0.3} f={f} />
            {acc && <Tick x={x} y={GROUND - fill + 60} o={on(f, ticks[k], 8)} r={34} />}
            {k === 4 && <g opacity={on(f, enough, 8) * 0.8}><rect x={x - 100} y={GROUND - h} width={200} height={h} rx={12} fill="#FFFFFF" opacity={0.55} /></g>}
          </g>
        })}
        {/* # the auctioneer climbs the stairs with each tick */}
        {(() => {
          const k = ticks.filter((t) => f >= t).length, x = k === 0 ? 300 : STEP_X(k - 1) - 70, y = k === 0 ? GROUND : GROUND - ASK[k - 1]
          return <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [accepts, 'point', 'neutral'], [enough, 'thumbsUp', 'smiling'], [last, 'point', 'neutral'], [everyone, 'present', 'smiling']]} x={lerp(x, x, 1)} y={y} s={0.42} />
        })()}
        {/* # E: the last offer's price becomes one gold line across every step */}
        <g opacity={on(f, last, 10)}>
          <line x1={STEP_X(0) - 120} y1={lineY} x2={STEP_X(0) - 120 + (STEP_X(3) - STEP_X(0) + 240) * on(f, becomes, 18)} y2={lineY} stroke={P.goldD} strokeWidth={10} strokeLinecap="round" />
        </g>
        {/* # s30: the cheapest plant's owner catches the extra coins and grins */}
        <g opacity={on(f, low, 10)}>
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [still, 'receive', 'smiling'], [higher, 'celebrate', 'smiling']]} x={250} y={GROUND} s={0.62} />
          {Array.from({ length: 5 }, (_, k) => { const t = on(f, paid + k * 4, 14); return f >= paid + k * 4 ? <Coin key={k} x={lerp(STEP_X(0), 290, t)} y={lerp(GROUND - ASK[3] + 20, GROUND - 330, t) - Math.sin(t * Math.PI) * 80} s={0.6} o={1 - on(f, paid + k * 4 + 14, 6)} /> : null })}
        </g>
      </g>}
      <Vignette id="pw-auction" />
    </g>
  )
}

const BEATS = ['s24:auction', 's24:three', 's24:needed', 's25:works', 's25:step', 's25:step#2', 's26:first', 's26:estimates', 's26:most', 's26:busiest', 's26:safety', 's27:second', 's27:owners', 's27:offer', 's27:names', 's28:third', 's28:accepts', 's28:cheapest', 's28:moving', 's28:enough', 's29:last', 's29:becomes', 's29:everyone', 's30:low', 's30:still', 's30:paid', 's30:higher', 's26:region', 's27:ready', 's26:moment']
export const PW_AUCTION = makePiece('pw-auction', 'Power long: the capacity auction step by step — PJM measures the busiest-day need plus a margin, plants raise price paddles, a staircase cheapest first until full, the last price becomes one line for everyone, the cheap plant gets the higher price', {
  mood: 'light', Component: Auction, beats: BEATS,
  sfx: [['s24:auction', 'thud', 0.35], ['s24:three', 'flutter', 0.3], ['s25:step', 'pop', 0.25], ['s26:most', 'tick', 0.25], ['s27:names', 'pop', 0.25], ['s28:accepts', 'ding', 0.25], ['s28:enough', 'ding', 0.3], ['s29:becomes', 'swish', 0.3], ['s30:paid', 'coin', 0.35]] })
