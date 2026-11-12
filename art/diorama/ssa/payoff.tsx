// ---------------------------------------------------------------- s70–s77: the payoff in the post office at golden hour.
// Rosa's money one more time, each step a small drawing that replaces the last: two capsules (6.2% + 6.2%) running straight
// to a row of mailboxes; the best-35 envelope dropping into the sorter; three vans with ≈$1,515 · ≈$2,164 · ≈$2,683;
// a mailbox at 83%. Then a pink piggy bank labelled ROSA gets a cross; the vault runs low while the tubes keep flowing
// (savings low, paychecks still coming); last, a young worker and a retiree shake hands across the tube: A PROMISE.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PostWorld, Vig, Stamp, Cross, Envelope, Tube, Mailbox, Vault, Van, Life, FLOOR, TXT, CREAM, INK, RED, NAVY, BRASS, BRASS2, GREEN, GOLD, DEEPT, PLUM, WOOD2 } from './kit'

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const follow = c('s70:follow'), more = c('s70:more')
  const pays = c('s71:pays'), boss = c('s71:boss'), straight = c('s71:straight'), name = c('s71:name')
  const best = c('s72:best'), d35 = c('s72:35'), kinder = c('s72:kinder')
  const claims = c('s73:claims'), d1515 = c('s73:1515'), d2164 = c('s73:2164'), d2683 = c('s73:2683')
  const y2034 = c('s74:2034'), d83 = c('s74:83'), zero = c('s74:zero')
  const piggy = c('s75:piggy'), rosa75 = c("s75:rosa's")
  const broke = c('s76:broke'), low = c('s76:low'), coming = c('s76:coming')
  const promise = c('s77:promise'), next = c('s77:next'), keep = c('s77:keep')

  const A = win(f, follow - 2, best - 2, 8), B = win(f, best - 2, claims - 2, 8), Cc = win(f, claims - 2, y2034 - 2, 8), D = win(f, y2034 - 2, piggy - 2, 8), E = win(f, piggy - 2, broke - 2, 8), F = win(f, broke - 2, promise - 2, 8), G = on(f, promise - 2, 8)
  const rosa: Beat[] = [[follow, 'present', 'smiling'], [pays, 'offer', 'smiling'], [piggy, 'crossNoA', 'neutral', 'crossNoB', 10], [promise, 'handshake', 'smiling']]

  return (
    <g>
      <PostWorld f={f} id="ss-payoff" tone="warm" />
      <g opacity={on(f, follow, 8) * (1 - on(f, best - 10, 8))}><Stamp x={960} y={330} t="ROSA’S MONEY, ONE MORE TIME" size={50} col={CREAM} /></g>
      {/* # A) pays → straight to retirees */}
      {A > 0.001 && <g opacity={A}>
        <Person f={f} who="investorF" beats={rosa} x={260} y={FLOOR + 60} s={0.66} />
        <Tube pts={[[380, 620], [1400, 620]]} f={f} flow={on(f, pays, 8)} n={5} rate={2} />
        <g opacity={on(f, boss, 8)}><Tube pts={[[380, 720], [1400, 720]]} f={f} flow={1} n={5} rate={2} /></g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, straight + k * 3, 8)}><Mailbox x={1500 + k * 140} y={FLOOR} s={0.7} flag={on(f, straight + k * 3, 10)} /></g>)}
        <g opacity={on(f, pays, 8)}><Stamp x={720} y={520} t="6.2% + 6.2%" size={44} col={GOLD} /></g>
        <g opacity={on(f, name, 8)}><Stamp x={1640} y={440} t="STRAIGHT TO RETIREES" size={40} col={GREEN} tc={CREAM} /></g>
      </g>}
      {/* # B) best 35 years, a kinder formula */}
      {B > 0.001 && <g opacity={B}>
        <g transform="translate(960 600)">
          <rect x={-300} y={-220} width={600} height={360} rx={20} fill={BRASS2} opacity={0.3} />
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${(k - 1) * 180} 60)`}><rect x={-70} y={-120} width={140} height={200} rx={10} fill={[GREEN, BRASS, PLUM][k]} opacity={0.85} /><text y={0} textAnchor="middle" fill={CREAM} style={TXT(48)}>{['90%', '32%', '15%'][k]}</text></g>)}
          <g opacity={on(f, d35, 8)}><Envelope x={0} y={lerp(-300, -170, on(f, d35, 20))} s={1.1} t="BEST 35 YEARS" /></g>
        </g>
        <g opacity={on(f, kinder, 8)}><Stamp x={960} y={330} t="KINDER TO LOWER EARNERS" size={50} col={GREEN} tc={CREAM} /></g>
      </g>}
      {/* # C) when she claims */}
      {Cc > 0.001 && <g opacity={Cc}>
        {[[d1515, '62', '≈ $1,515', RED], [d2164, '67', '≈ $2,164', NAVY], [d2683, '70', '≈ $2,683', GREEN]].map(([at, a, t, col], k) => <g key={k} opacity={on(f, at as number, 8)}>
          <Van x={420 + k * 540} y={FLOOR} s={0.8} col={col as string} t={`AGE ${a}`} />
          <Stamp x={420 + k * 540} y={540} t={t as string} size={50} col={GOLD} />
        </g>)}
        <g opacity={on(f, claims, 8)}><Stamp x={960} y={330} t="WHEN SHE CLAIMS: FOR LIFE" size={50} col={CREAM} /></g>
      </g>}
      {/* # D) 2034: about 83%, not zero */}
      {D > 0.001 && <g opacity={D}>
        <Mailbox x={760} y={FLOOR} s={1.3} flag={1} />
        <g opacity={on(f, d83, 8)}><Envelope x={1200} y={600} s={1.6 * 0.83} t="≈ 83%" /></g>
        <g opacity={on(f, y2034, 8)}><Stamp x={960} y={330} t="2034, IF NOTHING CHANGES" size={50} col={NAVY} tc={CREAM} /></g>
        <g opacity={on(f, zero, 8)}><Stamp x={1500} y={500} t="NOT ZERO" size={56} col={GREEN} tc={CREAM} /></g>
      </g>}
      {/* # E) not a piggy bank with her name on it */}
      {E > 0.001 && <g opacity={E}>
        <Person f={f} who="investorF" beats={rosa} x={560} y={FLOOR + 60} s={0.74} />
        <g transform={`translate(1200 ${FLOOR})`}>
          <ellipse cx={0} cy={-120} rx={170} ry={120} fill="#E8A3A0" /><circle cx={150} cy={-140} r={50} fill="#E8A3A0" /><rect x={-50} y={-250} width={100} height={14} rx={6} fill={INK} />
          {[-110, 70].map((x) => <rect key={x} x={x} y={-30} width={36} height={30} fill="#E8A3A0" />)}
          <g opacity={on(f, rosa75, 8)}><rect x={-80} y={-150} width={160} height={50} fill={CREAM} stroke={INK} strokeWidth={3} /><text y={-114} textAnchor="middle" fill={INK} style={TXT(40)}>ROSA</text></g>
          <g opacity={on(f, rosa75 + 6, 8)}><Cross x={0} y={-120} s={1.1} /></g>
        </g>
      </g>}
      {/* # F) savings low, paychecks still coming */}
      {F > 0.001 && <g opacity={F}>
        <Vault x={420} y={520} s={0.75} fill={0.1} open={1} />
        <g opacity={on(f, low, 8)}><Stamp x={420} y={330} t="SAVINGS RUNNING LOW" size={44} col={RED} tc={CREAM} /></g>
        <Tube pts={[[760, 700], [1700, 700]]} f={f} flow={on(f, coming, 8)} n={7} rate={2} />
        <g opacity={on(f, coming, 8)}><Stamp x={1240} y={540} t="PAYCHECKS KEEP COMING IN" size={46} col={GREEN} tc={CREAM} /></g>
      </g>}
      {/* # G) a promise between generations */}
      {G > 0.001 && <g opacity={G}>
        <Tube pts={[[300, 380], [1620, 380]]} f={f} flow={1} n={6} rate={1.2} w={30} />
        <Person f={f} who="worker" beats={[[promise, 'handshake', 'smiling']]} x={820} y={FLOOR + 60} s={0.8} />
        <Person f={f} who="buyer" beats={[[promise, 'handshake', 'smiling']]} x={1100} y={FLOOR + 60} s={0.8} flip />
        <g opacity={on(f, next, 8)}><Stamp x={960} y={300} t="A PROMISE, PAID BY THE NEXT WORKERS" size={46} col={GOLD} /></g>
        <g opacity={on(f, keep, 8)}><Stamp x={1500} y={520} t="HOW DO WE KEEP IT?" size={40} col={CREAM} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={more} x={960} y={500} kind="glint" />
        <Life f={f} at={broke} x={420} y={520} kind="glint" />
        <Life f={f} at={c("s71:percent#2")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s71:not")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s72:check")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s72:a")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s73:67")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s74:checks")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s75:security")} x={1200} y={700} kind="glint" />
        <Life f={f} at={c("s76:says")} x={1200} y={700} kind="glint" />
        <Life f={f} at={c("s76:the#2")} x={1200} y={700} kind="glint" />
        <Life f={f} at={c("s77:how")} x={960} y={520} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="ss-payoff" />
      <Headline f={f} lines={[[follow, 'FOLLOW ROSA’S MONEY', INK, 92], [piggy, 'NOT A PIGGY BANK', INK, 92], [promise, 'A PROMISE', INK, 92]]} />
    </g>
  )
}

export const SS_PAYOFF = makePiece('ss-payoff', 'Payoff in the post office at golden hour (ROSA\'S MONEY, ONE MORE TIME): Rosa\'s two capsule tubes (6.2% + 6.2%) run straight into three mailboxes whose flags rise (STRAIGHT TO RETIREES); a BEST 35 YEARS envelope drops into a brass sorter with three slots 90% · 32% · 15% (KINDER TO LOWER EARNERS); three mail vans AGE 62 · AGE 67 · AGE 70 with ≈ $1,515 · ≈ $2,164 · ≈ $2,683 (WHEN SHE CLAIMS: FOR LIFE); a big mailbox gets a smaller ≈ 83% envelope (2034, IF NOTHING CHANGES · NOT ZERO); a pink piggy bank labelled ROSA gets a red cross as Rosa shakes her head; a nearly empty vault (SAVINGS RUNNING LOW) beside a tube still full of capsules (PAYCHECKS KEEP COMING IN); finally a young worker and a retiree shake hands under a running tube: A PROMISE, PAID BY THE NEXT WORKERS · HOW DO WE KEEP IT?', {
  mood: 'light', Component: Payoff,
  beats: ["s70:follow", "s70:more", "s71:pays", "s71:boss", "s71:straight", "s71:name", "s72:best", "s72:35", "s72:kinder", "s73:claims", "s73:1515", "s73:2164", "s73:2683", "s74:2034", "s74:83", "s74:zero", "s75:piggy", "s75:rosa's", "s76:broke", "s76:low", "s76:coming", "s77:promise", "s77:next", "s77:keep", "s71:percent#2", "s71:not", "s72:check", "s72:a", "s73:67", "s74:checks", "s75:security", "s76:says", "s76:the#2", "s77:how"],
  sfx: [['s73:1515', 'pop', 0.08], ['s74:83', 'chime', 0.08], ["s75:rosa's", 'thud', 0.08]] })
