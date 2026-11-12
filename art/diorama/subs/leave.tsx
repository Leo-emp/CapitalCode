// ---------------------------------------------------------------- s78–s90: when leaving gets hard (casino style).
// One setting: Maya at her laptop on the left, a US courthouse on the right. Her screen shows the YEARLY PLAN · PAID
// MONTHLY. On "sued", a government lawyer walks up the courthouse steps with the case file. Her CANCEL click sets off
// a stack of pop-ups (ARE YOU SURE? / WAIT! / ONE MORE STEP) while a magnifier finds the small print: FEE. The worked
// example plays across a strip of 12 months: 4 paid (green), 8 left (grey) → 8 × $60 = $480 → half = $240 to leave.
// The executive arrives shaking his head (disagrees); then two $75M bags: one to the courthouse, one to Maya as free
// services; her screen's sign-up page now shows the EARLY CANCEL FEE big and clear; the fee tag stays, but in view.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { fly, Headline, Person, win } from '../aimoney/common'
import { gestB } from '../buffett/hook'
import { Gavel } from '../google/kit'
import { Desk, Exec, Maya, Studio } from './kit'

const Leave: React.FC<PieceProps> = ({ f, c }) => {
  const plans = c("s78:plans"), yearly = c('s78:yearly'), month78 = c('s78:month'), june = c('s79:june'), sued = c('s79:sued'), federal = c('s79:federal')
  const lawsuit = c('s80:lawsuit'), cancelled = c('s80:cancelled'), fee80 = c('s80:fee'), half80 = c('s80:half'), left80 = c('s80:left')
  const hidden = c('s81:hidden'), print = c('s81:print'), pages = c('s81:pages'), popups = c('s81:popups')
  const example = c('s82:example'), n60 = c('s83:60'), four = c('s83:four'), eight = c('s84:eight'), times = c('s84:times'), n480 = c('s85:480'), leave85 = c('s85:leave')
  const disagreed = c('s86:disagreed'), march = c('s87:march'), n150 = c('s87:150'), government = c('s88:government'), services = c('s88:services')
  const show89 = c('s89:show'), clearly = c('s89:clearly'), sign89 = c('s89:sign'), notice = c('s90:notice'), stay = c('s90:stay'), front = c('s90:front')
  // # extra gesture words
  const G = [c('s78:paid'), c('s79:government'), c('s80:year'), c('s81:small'), c('s82:work'), c('s83:sign'), c('s84:payments'), c('s85:fee'), c('s86:claims'), c('s87:settle'), c('s88:payment'), c('s89:deal'), c('s90:settlement'), c('s90:people'), c('s81:and'), c('s84:dollars'), c('s85:that'), c('s88:half'), c('s90:the#2'), c('s77:stopping'), c('s77:harder'), c('s77:starting')]
  const DX = 640, CX = 1560
  const EX = win(f, example - 4, disagreed - 2, 10)
  // # screen phases: plan → pop-ups → (example) → sign-up page with the fee shown
  const scr = f < cancelled ? 0 : f < show89 ? 1 : 2
  return (
    <g>
      <StageBg id="sb-leave" frame={f} />
      <Studio />
      {/* # the courthouse */}
      <g transform={`translate(${CX} 1000)`}>
        <path d="M-300 -560 L0 -680 L300 -560 Z" fill="#D9CBB1" /><rect x={-300} y={-560} width={600} height={40} fill="#C9B48E" />
        {[-240, -120, 0, 120, 240].map((x) => <rect key={x} x={x - 26} y={-520} width={52} height={440} fill="#EFE6D6" />)}
        <rect x={-320} y={-80} width={640} height={30} fill="#C9B48E" /><rect x={-340} y={-50} width={680} height={50} fill="#B9A47E" />
        <text y={-600} textAnchor="middle" fill="#5C4A3A" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 4 }}>US COURT</text>
      </g>
      <g opacity={win(f, sued - 2, example - 4, 6)}><Gavel x={1180} y={330} s={0.6} hit={easeInOut(span(f, sued, sued + 6)) * (1 - span(f, sued + 10, sued + 16))} /></g>
      {/* # the government lawyer with the case file */}
      <g opacity={on(f, sued - 4, 8)}><Person f={f} who="investor" beats={gestB([[0, 'walkA', 'neutral', 'walkB', 10], [sued + 20, 'hold', 'neutral'], [half80, 'point', 'angry'], [hidden, 'explain', 'angry'], [n150, 'receive', 'smiling']], G.slice(0, 5))} x={lerp(2100, CX + 60, easeInOut(span(f, sued - 4, sued + 20)))} y={1000} s={0.95} flip /></g>
      {/* # the laptop */}
      <Desk x={DX}>
        {scr === 0 && <g><rect x={DX - 190} y={480} width={380} height={140} rx={14} fill="#FFF5E0" stroke={P.gold} strokeWidth={5} /><text x={DX} y={540} textAnchor="middle" fill={P.ink} opacity={on(f, yearly, 4)} style={{ font: '400 50px "Bebas Neue"' }}>YEARLY PLAN</text><text x={DX} y={596} textAnchor="middle" fill={P.ink2} opacity={on(f, month78, 4)} style={{ font: '400 44px "Bebas Neue"' }}>PAID MONTHLY</text></g>}
        {scr === 1 && <g>
          {['ARE YOU SURE?', 'WAIT! AN OFFER', 'ONE MORE STEP'].map((t, k) => <g key={k} opacity={on(f, pages + k * 5 - 2, 4)} transform={`translate(${DX - 60 + k * 50} ${470 + k * 40})`}><rect x={-150} y={-40} width={300} height={90} rx={12} fill="#FFFFFF" stroke="#5B6680" strokeWidth={5} /><text y={18} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>{t}</text></g>)}
          <g opacity={on(f, cancelled, 4) * (1 - on(f, pages - 2, 4))}><rect x={DX - 110} y={500} width={220} height={80} rx={40} fill={P.coral} /><text x={DX} y={556} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>CANCEL</text></g>
        </g>}
        {scr === 2 && <g><rect x={DX - 200} y={460} width={400} height={170} rx={14} fill="#FFFFFF" stroke={P.gold} strokeWidth={6} /><text x={DX} y={510} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>SIGN UP</text><text x={DX} y={580} textAnchor="middle" fill={P.coralInk} opacity={on(f, clearly, 6)} style={{ font: '400 50px "Bebas Neue"' }}>EARLY CANCEL FEE</text></g>}
      </Desk>
      {/* # the magnifier finds the small print */}
      <g opacity={win(f, print - 4, pages + 2, 6)} transform={`translate(${DX + 300} ${lerp(800, 600, easeInOut(span(f, hidden, print)))})`}><circle r={80} fill="#FFFFFF" opacity={0.85} stroke="#5B6680" strokeWidth={12} /><path d="M56 56 L120 120" stroke="#5B6680" strokeWidth={22} strokeLinecap="round" /><text y={16} textAnchor="middle" fill={P.coralInk} style={{ font: '400 50px "Bebas Neue"' }}>FEE</text></g>
      {/* # the worked example across 12 months */}
      <g opacity={EX}>
        <rect x={900} y={250} width={480} height={330} rx={16} fill="#FFFFFF" stroke="#C9B48E" strokeWidth={5} />
        <text x={1140} y={300} textAnchor="middle" fill={P.ink2} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 3 }}>EXAMPLE · ONE YEAR</text>
        {Array.from({ length: 12 }, (_, k) => { const paid = k < 4; return <g key={k} opacity={on(f, (paid ? four : eight) - 4 + k, 4)}><rect x={930 + k * 36} y={330} width={30} height={60} rx={6} fill={paid ? P.mint : '#C9CED8'} /></g> })}
        <text x={1002} y={430} textAnchor="middle" fill={P.mintInk} opacity={on(f, four, 6)} style={{ font: '400 38px "Bebas Neue"' }}>4 PAID</text>
        <text x={1230} y={430} textAnchor="middle" fill={P.ink2} opacity={on(f, eight, 6)} style={{ font: '400 38px "Bebas Neue"' }}>8 LEFT</text>
        <text x={1140} y={496} textAnchor="middle" fill={P.ink} opacity={on(f, times, 6)} style={{ font: '400 50px "Bebas Neue"' }}>8 × $60 = $480</text>
        <g opacity={on(f, n480 + 4, 6)} transform={`translate(1140 548) scale(${pop(f, n480 + 4)})`}><text textAnchor="middle" fill={P.coralInk} style={{ font: '400 54px "Bebas Neue"' }}>HALF = $240 TO LEAVE</text></g>
      </g>
      {/* # the settlement: two $75M bags */}
      {[[government, 1790, 'TO GOVT'], [services, 420, 'FREE SERVICES']].map(([at, tx, lab], k) => { const p = fly(f, (at as number) - 4, [1200, 420], [tx as number, k ? 880 : 760], 20, 160); const landed = f >= (at as number) + 16; return <g key={k} opacity={on(f, (at as number) - 4, 4) * (1 - on(f, sign89, 8))} transform={`translate(${landed ? tx : p.x} ${landed ? (k ? 880 : 760) : p.y})`}>
        <path d="M-80 70 Q-100 -30 -26 -60 L-44 -96 L44 -96 L26 -60 Q100 -30 80 70 Z" fill="#C9A35A" /><text y={30} textAnchor="middle" fill="#3A2A12" style={{ font: '400 46px "Bebas Neue"' }}>$75M</text>
        <text y={120} textAnchor="middle" fill={P.ink} style={{ font: '400 38px "Bebas Neue"' }}>{lab as string}</text></g> })}
      <g opacity={win(f, n150 - 2, government - 4, 6)} transform={`translate(1200 420) scale(${pop(f, n150)})`}><rect x={-170} y={-60} width={340} height={120} rx={18} fill={P.gold} /><text y={22} textAnchor="middle" fill="#3A2A12" style={{ font: '400 64px "Bebas Neue"' }}>$150M DEAL</text></g>
      {/* # the fee stays, but in plain view */}
      <g opacity={on(f, stay - 2, 6)} transform={`translate(1200 400) scale(${pop(f, stay)})`}><rect x={-210} y={-50} width={420} height={100} rx={16} fill="#FFFFFF" stroke={P.coral} strokeWidth={6} /><text y={18} textAnchor="middle" fill={P.coralInk} style={{ font: '400 50px "Bebas Neue"' }}>FEE STAYS · SHOWN UP FRONT</text></g>
      {/* # the executive disagrees, then signs */}
      <g opacity={on(f, disagreed - 4, 8)}><Exec f={f} beats={[[0, 'idle', 'neutral'], [disagreed, 'crossNoA', 'angry'], [march, 'signA', 'neutral'], [march + 10, 'signB', 'neutral'], [government, 'present', 'neutral'], [show89, 'explain', 'neutral']]} x={1260} y={1000} s={0.95} /></g>
      <Maya f={f} beats={gestB([[0, 'type', 'neutral'], [cancelled, 'type', 'neutral'], [pages, 'facepalm', 'worried'], [print, 'shock', 'shocked'], [example, 'explain', 'neutral'], [eight, 'countA', 'thinking'], [n480, 'despair', 'worried'], [services, 'receive', 'smiling'], [clearly, 'read', 'thinking'], [front, 'thumbsUp', 'neutral']], G.slice(5))} x={210} s={1.05} />
      <Headline f={f} lines={[[plans, 'A YEARLY PLAN, PAID MONTHLY', P.ink, 104], [sued, '2024: US GOVERNMENT SUES ADOBE', P.coralInk, 100], [lawsuit, 'CLAIM: QUIT IN YEAR 1 → PAY HALF THE REST', P.ink, 88], [hidden, 'CLAIM: FEE HIDDEN, HARD TO CANCEL', P.ink, 92],
        [example, 'EXAMPLE · ABOUT $60 A MONTH', P.ink, 100], [disagreed, 'ADOBE DISAGREED', P.ink, 110], [march, 'MARCH 2026: $150M SETTLEMENT', P.goldInk, 100], [show89, 'SHOW THE FEE BEFORE SIGN-UP', P.ink, 100], [notice, 'THE FEE ITSELF CAN STAY', P.coralInk, 104]]} />
      <Vignette id="sb-leave" />
    </g>
  )
}

const BEATS = ['s77:stopping', 's77:harder', 's77:starting', 's81:and', 's84:dollars', 's85:that', 's88:half', 's90:the#2', 's78:paid', 's79:government', 's80:year', 's81:small', 's82:work', 's83:sign', 's84:payments', 's85:fee', 's86:claims', 's87:settle', 's88:payment', 's89:deal', 's90:settlement', 's90:people',
  's78:plans', 's78:yearly', 's78:month', 's79:june', 's79:sued', 's79:federal', 's80:lawsuit', 's80:cancelled', 's80:fee', 's80:half', 's80:left', 's81:hidden', 's81:print', 's81:pages', 's81:popups', 's82:example', 's83:60', 's83:four', 's84:eight', 's84:times', 's85:480', 's85:leave',
  's86:disagreed', 's87:march', 's87:150', 's88:government', 's88:services', 's89:show', 's89:clearly', 's89:sign', 's90:notice', 's90:stay', 's90:front']
export const SB_LEAVE = makePiece('sb-leave', 'Subscriptions long (casino-style): Maya at her laptop beside a US courthouse; her screen shows YEARLY PLAN · PAID MONTHLY; a gavel bangs and a government lawyer walks up with the case (claim: quit in year 1, pay half the rest); her CANCEL click sets off pop-ups (ARE YOU SURE? / WAIT! AN OFFER / ONE MORE STEP) and a magnifier finds the FEE in small print; an example strip of 12 months — 4 PAID, 8 LEFT, 8 × $60 = $480, HALF = $240 TO LEAVE; the executive disagrees, then signs a $150M DEAL: a $75M bag to the government and $75M of FREE SERVICES to Maya; her sign-up page now shows the EARLY CANCEL FEE; a card reads FEE STAYS · SHOWN UP FRONT', {
  mood: 'light', Component: Leave, beats: BEATS,
  sfx: [['s79:sued', 'thud', 0.35], ['s81:popups', 'click', 0.3], ['s85:480', 'ding', 0.3], ['s87:150', 'coin', 0.35], ['s89:clearly', 'pop', 0.3]] })
