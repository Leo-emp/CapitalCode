// ---------------------------------------------------------------- s59–s76: the plan behind the cancel button (dark mood).
// A) Two boxes: the new plan (spark, $99.99) and the Classic plan (same apps, old $69.99, the spark crossed out);
//    only for existing subscribers (a rope sign), only for a limited time (an hourglass).
// B) Australia first: two calendar pages (Australia earlier, US later); tags A$109 → A$159 and A$139 → A$179.
// C) Emails fly out; the email has two buttons; the Classic door is hidden behind it and slides out only on cancel.
// D) The court: the regulator's building, a crowd of 2.7 million; customers walk toward the Classic door; the
//    scales wait for the court (claims, not proven).
// E) Ten days later the box says sorry; the Classic door lights up; refund coins fly back to a wallet; A$11 a month.
// F) Not alone: five more places light up one by one as they are named. Then Nina, and the question.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Wallet } from '../gift/kit'
import { Mini } from '../../rig/Mini'
import { Australia, Coin, Email, Regulator, Spark, Spot, SubBox, Tag, XMark } from './kit'
import { Packet, Page } from './kit2'

const GROUND = 930
const LOOKS = ['investorF', 'buyer', 'worker', 'owner', 'investor', 'hero']

const Classic: React.FC<PieceProps> = ({ f, c }) => {
  const copilot59 = c('s59:copilot'), created = c('s59:created'), classic59 = c('s59:classic')
  const kept = c('s60:kept'), apps60 = c('s60:apps'), old = c('s60:old'), without60 = c('s60:without'), ai60 = c('s60:ai')
  const only61 = c('s61:only'), subscribed = c('s61:subscribed'), limited = c('s61:limited'), time61 = c('s61:time')
  const australia62 = c('s62:australia'), months = c('s62:months'), united = c('s62:united')
  const personal63 = c('s63:personal'), d109 = c('s63:109'), d159 = c('s63:159'), family63 = c('s63:family'), d139 = c('s63:139'), d179 = c('s63:179')
  const classic60 = c('s60:classic'), people61 = c('s61:people'), ms61 = c('s61:microsoft'), there63 = c('s63:there'), aud63 = c('s63:australian'), ms64 = c('s64:microsoft'), classic66b = c('s66:classic'), accc68 = c('s68:accc'), month74b = c('s74:month'), said72 = c('s72:said'), ai76 = c('s76:ai'), change64 = c('s64:change'), according = c('s65:according'), accc65 = c('s65:accc'), emails65b = c('s65:emails')
  const emailed = c('s64:emailed'), subscribers64 = c('s64:subscribers')
  const regulator65 = c('s65:regulator'), emails65 = c('s65:emails'), choices = c('s65:choices'), pay65 = c('s65:pay'), cancel65 = c('s65:cancel')
  const third = c('s66:third'), classic66 = c('s66:classic'), left = c('s66:left')
  const saw = c('s67:saw'), started = c('s67:started'), cancel67 = c('s67:cancel')
  const october = c('s68:october'), took = c('s68:took'), court68 = c('s68:court'), d27 = c('s68:27'), million = c('s68:million'), affected = c('s68:affected')
  const chair = c('s69:chair'), many = c('s69:many'), picked = c('s69:picked')
  const known = c('s69:known'), regs70 = c("s70:regulator's"), claims = c('s70:claims'), court70 = c('s70:court'), decide = c('s70:decide'), proven = c('s70:proven')
  const ten = c('s71:ten'), later71 = c('s71:later'), apologised = c('s71:apologised')
  const clearer = c('s72:clearer'), without72 = c('s72:without'), available = c('s72:available')
  const offered = c('s73:offered'), switched = c('s73:switched'), refund = c('s73:refund'), paid73 = c('s73:paid')
  const paid73b = c('s73:paid'), classic74 = c('s74:classic'), offer74 = c('s74:offer'), d11 = c('s74:11'), month74 = c('s74:month')
  const alone = c('s75:alone'), reports = c('s75:reports'), tested = c('s75:tested'), nz = c('s75:new'), sg = c('s75:singapore'), my = c('s75:malaysia'), tw = c('s75:taiwan'), th = c('s75:thailand')
  const add76 = c('s76:add'), someone76 = c('s76:someone'), what76 = c('s76:what'), nina76 = c('s76:nina'), never76 = c('s76:never')

  const A = win(f, copilot59 - 20, australia62), B = win(f, australia62 - 2, emailed), Cc = win(f, emailed - 2, october), D = win(f, october - 2, ten), E = win(f, ten - 2, c('s75')), F = on(f, c('s75') - 2, 8)
  const nina: Beat[] = [[0, 'idle', 'neutral'], [never76, 'scratchHead', 'thinking']]
  const sorry = on(f, apologised, 10) * (1 - on(f, offered, 10))
  return (
    <g>
      <Stage id="ab-classic" frame={f} />
      <Spot dark f={f} at={classic59} x={560} y={560} rx={260} ry={260} />
      <Spot dark f={f} at={d159} x={1250} y={480} rx={200} ry={120} />
      <Spot dark f={f} at={cancel67} x={1300} y={600} rx={220} ry={260} />
      <Spot dark f={f} at={d27} x={600} y={860} rx={260} ry={100} />
      <Spot dark f={f} at={d11} x={600} y={600} rx={200} ry={140} />
      <Headline f={f} lines={[[created, 'MICROSOFT ALSO MADE CLASSIC PLANS', P.ink, 96], [old, 'SAME APPS · OLD PRICE · NO AI', P.mintInk, 100], [only61, 'EXISTING SUBSCRIBERS ONLY', P.ink, 104], [limited, 'FOR A LIMITED TIME', P.coralInk, 110],
        [australia62, 'AUSTRALIA CAME FIRST', P.ink, 110], [personal63, 'PRICES IN AUSTRALIAN DOLLARS', P.ink, 100],
        [emailed, 'THE RENEWAL EMAILS', P.ink, 110], [regulator65, 'THE REGULATOR (ACCC) SAYS:', P.ink, 104], [third, 'THE THIRD CHOICE WAS LEFT OUT', P.coralInk, 100], [saw, 'ONLY SEEN WHEN CANCELLING', P.coralInk, 104],
        [october, 'OCTOBER 2025: TO COURT', P.ink, 110], [chair, 'MANY WOULD HAVE PICKED CLASSIC', P.mintInk, 100], [claims, "CLAIMS — THE COURT DECIDES", P.ink, 104],
        [ten, 'ABOUT 10 DAYS LATER', P.ink, 110], [clearer, 'WE COULD HAVE BEEN CLEARER', P.ink, 104], [offered, 'A REFUND FOR SWITCHING', P.mintInk, 104], [offer74, 'PERSONAL CLASSIC: A$11 A MONTH', P.mintInk, 100],
        [alone, 'NOT ALONE', P.ink, 120], [what76, 'WHAT DOES THE EXTRA ADD UP TO?', P.goldInk, 100]]} />

      {/* # A) the two plans */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} dark />
        <SubBox x={1340} y={540} s={0.9 * (1 + 0.06 * on(f, ms61, 6) * (1 - on(f, ms61 + 14, 8)))} title="NEW PLAN" />
        {[0, 1].map((k) => <g key={k} opacity={on(f, people61 + k * 4, 8)}><Mini look={LOOKS[k + 2]} x={380 + k * 360} y={GROUND} scale={0.9} frame={f} seed={k + 90} /></g>)}
        <Spark x={1547} y={360} s={0.8} f={f} glow={1} />
        <Tag x={1340} y={880} text="$99.99" s={0.9} r={0} />
        <g opacity={on(f, classic59, 10)}>
          <SubBox x={560} y={540} s={0.9 * pop(f, classic59, 14) * (1 + 0.06 * on(f, classic60, 6) * (1 - on(f, classic60 + 14, 8)))} title="CLASSIC" color="#2E9E6E" tiles={on(f, apps60, 14) * 0 + on(f, classic59, 20)} />
          <g opacity={on(f, old, 8)}><Tag x={560} y={880} text="$69.99" s={0.9} r={0} color={P.mint} /></g>
          <g opacity={on(f, without60, 8)}><Spark x={767} y={360} s={0.8} f={f} glow={0.4} /><XMark x={767} y={360} o={on(f, ai60, 8)} size={56} /></g>
        </g>
        {/* # existing subscribers only: a rope in front of the Classic box; limited time: an hourglass */}
        <g opacity={on(f, subscribed, 8)}>
          <Label x={560} y={GROUND + 80} text="CURRENT SUBSCRIBERS" size={44} font="Bebas Neue" color={P.ink2} />
        </g>
        <g opacity={on(f, limited, 8)} transform={`translate(960 600) rotate(${on(f, time61, 20) * 180})`}>
          <path d="M-50 -80 L50 -80 L8 0 L50 80 L-50 80 L-8 0 Z" fill="#F3E3B5" stroke={P.gold} strokeWidth={6} />
          <path d="M-30 -60 L30 -60 L4 -10 L-4 -10 Z" fill={P.gold} opacity={1 - on(f, time61, 30)} />
          <path d="M-30 60 L30 60 L4 20 L-4 20 Z" fill={P.gold} opacity={on(f, time61, 30)} />
        </g>
      </g>}

      {/* # B) Australia first; the Australian prices */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} dark />
        <Australia x={480} y={560} s={0.95 * pop(f, australia62, 16)} />
        <g opacity={on(f, there63, 8)} transform={`translate(560 480) scale(${pop(f, there63)})`}><path d="M0 0 C-30 -40 -30 -80 0 -80 C30 -80 30 -40 0 0 Z" fill={P.coral} /><circle cx={0} cy={-55} r={12} fill="#FFFFFF" /></g>
        <g opacity={on(f, aud63, 8)}><Label x={480} y={GROUND + 70} text="PRICES IN A$" size={52} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, months, 8) * (1 - on(f, personal63, 10))}>
          <Page x={1150} y={540} s={0.9} top="AUSTRALIA" big="OCT 24" color={P.mint} />
          <g opacity={on(f, united, 8)}><Page x={1500} y={540} s={0.9} top="U.S." big="JAN 25" /></g>
        </g>
        <g opacity={on(f, personal63, 8)}><Tag x={1250} y={480} text={f >= d159 ? 'A$159' : 'A$109'} s={1.15 * (f >= d109 ? 1 : 0.9)} color={f >= d159 ? P.gold : '#F3E3B5'} sticker="+A$50" stickerO={on(f, d159, 10)} />
          <Label x={1040} y={500} text="PERSONAL" size={48} font="Bebas Neue" color={P.ink2} anchor="end" /></g>
        <g opacity={on(f, family63, 8)}><Tag x={1250} y={800} text={f >= d179 ? 'A$179' : 'A$139'} s={1.15} color={f >= d179 ? P.gold : '#F3E3B5'} sticker="+A$40" stickerO={on(f, d179, 10)} />
          <Label x={1040} y={820} text="FAMILY" size={48} font="Bebas Neue" color={P.ink2} anchor="end" /></g>
      </g>}

      {/* # C) the emails; two buttons; the hidden door */}
      {Cc > 0 && <g opacity={Cc}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, regulator65 - 30, 10)}>
          <SubBox x={420} y={520} s={0.7 * (1 + 0.06 * on(f, ms64, 6) * (1 - on(f, ms64 + 14, 8)))} />
          {Array.from({ length: 5 }, (_, k) => <g key={k}>
            <Mini look={LOOKS[k]} x={980 + k * 170} y={GROUND} scale={1.2} frame={f} seed={k + 30} mood={f >= change64 ? 'sad' : 'neutral'} />
            <g opacity={on(f, change64 + k * 2, 6)}><Coin x={980 + k * 170} y={GROUND - 300} r={26} t="+" color={P.coral} /></g>
            {(() => { const fl = fly(f, emailed + k * 4, [720, 470], [980 + k * 170, GROUND - 300], 20, 140); return f >= emailed + k * 4 ? <Packet x={fl.t < 1 ? fl.x : 980 + k * 170} y={fl.t < 1 ? fl.y : GROUND - 300} s={0.8} o={on(f, emailed + k * 4, 4) * (1 - on(f, subscribers64 + 20, 8)) + (fl.t >= 1 ? 0 : 0)} /> : null })()}
          </g>)}
        </g>
        <g opacity={on(f, according, 10)}>
          <g opacity={on(f, according, 8) * (1 - on(f, third, 10))}><Regulator x={1580} y={560} s={0.45 * pop(f, according)} tilt={Math.sin(f / 18) * 0.3 * on(f, accc65, 8)} /></g>
          <Email x={820} y={590} s={1.3 * (1 + 0.04 * on(f, emails65b, 6) * (1 - on(f, emails65b + 14, 8)))} pay={1} cancel={1} doorHint={Math.min(1, on(f, third, 10) * (1 + 0.6 * on(f, classic66b, 6) * (1 - on(f, classic66b + 16, 8))))} pressCancel={on(f, started, 8)} door={on(f, cancel67, 18)} />
          <g opacity={on(f, choices, 8) * (1 - on(f, third, 8))}><Label x={820} y={GROUND + 60} text="TWO CHOICES" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, pay65, 6) * (1 - on(f, cancel65, 6))}><rect x={480} y={600} width={300} height={140} rx={28} fill="none" stroke={P.gold} strokeWidth={6} /></g>
          <g opacity={on(f, cancel65, 6) * (1 - on(f, third, 6))}><rect x={830} y={600} width={300} height={140} rx={28} fill="none" stroke={P.coral} strokeWidth={6} /></g>
          <g opacity={on(f, left, 8) * (1 - on(f, saw, 8))}><Label x={1480} y={GROUND + 60} text="CLASSIC: HIDDEN" size={52} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}

      {/* # D) court, the crowd, the would-be Classic customers, the scales */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} dark />
        <Regulator x={1420} y={GROUND} s={0.9 * pop(f, october, 14) * (1 + 0.06 * on(f, accc68, 6) * (1 - on(f, accc68 + 14, 8))) * (1 + 0.05 * on(f, regs70, 6) * (1 - on(f, regs70 + 14, 8)))} tilt={f >= claims ? Math.sin(f / 18) * 0.4 : 0} />
        <g opacity={on(f, court68, 8)}><rect x={1000} y={GROUND - 40} width={160} height={40} rx={8} fill="#6E4A22" />
          <g transform={`translate(1080 ${GROUND - 40}) rotate(${-35 + 35 * on(f, court68, 8)}) translate(0 -60)`}><rect x={-70} y={-24} width={140} height={48} rx={14} fill="#8E6232" /><rect x={50} y={-8} width={150} height={16} rx={8} fill="#6E4A22" /></g></g>
        {Array.from({ length: 8 }, (_, k) => { const walk = on(f, picked, 40)
          return <g key={k} opacity={on(f, d27 + k * 2, 8)}><Mini look={LOOKS[k % 6]} x={lerp(430 + k * 72, 390 + k * 72, walk)} y={GROUND} scale={0.9} frame={f} seed={k + 40} mood={f >= picked ? 'happy' : 'neutral'} /></g> })}
        <g opacity={on(f, million, 8) * (1 - on(f, many, 8))}><Label x={680} y={GROUND + 80} text="≈ 2.7 MILLION" size={64} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, many, 8) * (1 - on(f, claims, 10))} transform="translate(160 0)">
          <rect x={-20} y={GROUND - 360} width={200} height={340} rx={20} fill={P.mint} opacity={0.35 * on(f, known, 8)} /><rect x={0} y={GROUND - 340} width={160} height={300} rx={14} fill={P.mint} stroke="#2E9E6E" strokeWidth={5} /><Label x={80} y={GROUND - 170} text="CLASSIC" size={44} font="Bebas Neue" color={P.navy0} /></g>
        <g opacity={on(f, decide, 8)}><Label x={1420} y={GROUND + 80} text="NOT YET PROVEN" size={52} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      {/* # E) sorry, the door lights, the refund */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} dark />
        <g opacity={on(f, ten, 8) * (1 - on(f, apologised, 10))}><Page x={960} y={540} s={1.1} top="10 DAYS" big="LATER" color={P.navy3} /></g>
        <g opacity={on(f, apologised, 8)}>
          <g transform={`translate(1150 560) rotate(${-8 * sorry * (1 - 0.6 * on(f, said72, 8))})`}><SubBox x={0} y={0} s={0.8} /></g>
          <g opacity={sorry}><rect x={1340} y={250} width={260} height={110} rx={30} fill="#FFFFFF" /><Label x={1470} y={325} text="SORRY" size={64} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, clearer, 8)}><rect x={520} y={420} width={200} height={340} rx={16} fill={P.mint} stroke="#2E9E6E" strokeWidth={5} /><rect x={500} y={400} width={240} height={380} rx={22} fill={P.mint} opacity={0.25 * on(f, available, 10)} />
            <Label x={620} y={580} text="CLASSIC" size={48} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, switched, 8)}><Wallet x={330} y={820} s={1.3} open={on(f, refund, 10)} /></g>
          {f >= refund && [0, 1, 2].map((k) => { const fl = fly(f, refund + k * 7, [1150, 520], [330, 760], 22, 160); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={34} o={fl.o} /> : null })}
          <g opacity={on(f, paid73b, 8)}><CoinStack73 x={90} n={Math.round(on(f, paid73b, 16) * 3 + on(f, offer74, 16) * 2)} /></g>
          <g opacity={on(f, classic74, 6) * (1 - on(f, classic74 + 16, 8))}><rect x={500} y={400} width={240} height={380} rx={22} fill={P.mint} opacity={0.4} /></g>
          <g opacity={on(f, d11, 8)}><Tag x={620} y={320} text="A$11" sub="A MONTH" s={0.9 * (1 + 0.1 * on(f, month74b, 6) * (1 - on(f, month74b + 14, 8)))} color={P.mint} /></g>
        </g>
      </g>}

      {/* # F) five more places; then Nina */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, what76, 10)}>
          {([['AUSTRALIA', alone], ['NEW ZEALAND', nz], ['SINGAPORE', sg], ['MALAYSIA', my], ['TAIWAN', tw], ['THAILAND', th]] as [string, number][]).map(([n, at], k) => (
            <g key={k} opacity={on(f, at, 8)} transform={`translate(${260 + k * 280} 560) scale(${pop(f, at)})`}>
              <circle r={110} fill={P.card} /><circle r={110} fill="none" stroke={k ? P.coral : P.gold} strokeWidth={6} />
              <path d="M0 -70 L-50 -10 L-20 -10 L-20 50 L20 50 L20 -10 L50 -10 Z" fill={k ? P.coral : P.gold} />
              <Label x={0} y={170} text={n} size={40} font="Bebas Neue" color={P.ink} />
            </g>))}
          <g opacity={on(f, reports, 8)}><Label x={960} y={GROUND + 60} text={f >= tested ? 'REPORTS: THE SAME PRICE TEST' : 'REPORTS SAY'} size={48} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, someone76, 10)}><Person f={f} who="investorF" beats={nina} x={760} y={GROUND} s={1.1} />
          <g opacity={on(f, ai76, 8)}><Spark x={1500} y={420} s={0.7} f={0} glow={0.2} eyes={false} /><Label x={1570} y={360} text="z z" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* # the +$30 tag shows on "add up" (outside Nina's group, so the frame is never empty before "someone") */}
        <g opacity={on(f, add76, 8)}><Tag x={1200} y={500} text="+$30" sub="A YEAR" s={1.1 * pop(f, add76)} color={P.coral} /></g>
      </g>}
      <Vignette id="ab-classic" />
    </g>
  )
}

const CoinStack73: React.FC<{ n: number; x: number }> = ({ n, x }) => <g>{Array.from({ length: n }, (_, k) => <g key={k}><ellipse cx={x} cy={GROUND - 20 - k * 22} rx={56} ry={14} fill={P.goldD} /><ellipse cx={x} cy={GROUND - 26 - k * 22} rx={56} ry={14} fill={P.gold} /></g>)}</g>

const BEATS = ["s59:copilot", "s59:created", "s59:classic", "s60:kept", "s60:apps", "s60:old", "s60:without", "s60:ai", "s61:subscribed", "s61:limited", "s61:time", "s62:australia", "s62:months", "s62:united", "s63:personal", "s63:109", "s63:159", "s63:family", "s63:179", "s60:classic", "s61:people", "s61:microsoft", "s63:there", "s63:australian", "s64:microsoft", "s66:classic", "s68:accc", "s74:month", "s72:said", "s76:ai", "s64:change", "s65:according", "s65:accc", "s65:emails", "s64:emailed", "s64:subscribers", "s65:regulator", "s65:choices", "s65:pay", "s65:cancel", "s66:third", "s66:left", "s67:saw", "s67:started", "s67:cancel", "s68:october", "s68:took", "s68:court", "s68:27", "s68:million", "s68:affected", "s69:chair", "s69:many", "s69:picked", "s69:known", "s70:regulator's", "s70:claims", "s70:decide", "s70:proven", "s71:ten", "s71:apologised", "s72:clearer", "s72:available", "s73:offered", "s73:switched", "s73:refund", "s73:paid", "s74:classic", "s74:offer", "s74:11", "s75:alone", "s75:reports", "s75:tested", "s75:new", "s75:singapore", "s75:malaysia", "s75:taiwan", "s75:thailand", "s76:add", "s76:someone", "s76:what", "s76:never", "s75"]
export const AB_CLASSIC = makePiece('ab-classic', 'AI bundle ch4: new plan box (spark, $99.99) vs Classic box (old $69.99, spark crossed), rope = existing subscribers only, hourglass = limited time; Australia map, calendar pages AUSTRALIA OCT 24 vs U.S. JAN 25; tags A$109→A$159, A$139→A$179; renewal emails fly to people; email with PAY MORE/CANCEL, Classic door hidden until cancel; regulator court, gavel, 2.7M crowd walking to a Classic door, scales wait (not yet proven); 10 days later the box says sorry, Classic door lights, refund coins to a wallet, A$11/month; six places light up (Australia, NZ, Singapore, Malaysia, Taiwan, Thailand); Nina with +$30', {
  mood: 'dark', Component: Classic, beats: BEATS,
  sfx: [['s59:classic', 'pop', 0.2], ['s63:159', 'pop', 0.2], ['s64:emailed', 'whoosh', 0.2], ['s67:cancel', 'click', 0.25], ['s68:court', 'thud', 0.3], ['s71:apologised', 'softpop', 0.2], ['s73:refund', 'coin', 0.25]] })
