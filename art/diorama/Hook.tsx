// ============================================================
// DIORAMA PROOF — the index-fund hook (s1–s8, ≈ 34 s) as one
// continuous transforming illustration (spec 2026-10-25 §5).
// A hand drops $100 into the fund → it splits into slivers that fly
// to 500 little companies → most of it pours into 10 giant towers →
// one tower swallows $7.50 → 490 buildings catch a crumb each →
// the "safe" glass dome cracks as everything slides to the giants →
// zig-zag wipe → the hero, close up, reacting.
// `cue` maps "s3:38"-style keys to frames (from words.json).
// ============================================================
import React from 'react'
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from 'remotion'
import { KineticText } from '../motion/kinetic'
import { expressionAt } from '../motion/acting'
import { Actor } from '../rig/Actor'
import { poseAt, type PoseId } from '../rig/pose'
import { fontFaces } from '../tokens'
import { arc, Bill, Building, Dome, easeInOut, easeOut, FundBox, Hand, lerp, P, Platform, rnd, settle, Sliver, span, Stage, Tower, Vignette, ZigZagWipe } from './kit'

export type HookProps = { cue: Record<string, number>; voice?: string }

// ------------------------------------------------------------ the city layout (deterministic)
const CX = 960, CY = 760, RX = 860, RY = 230
const TOWERS = Array.from({ length: 10 }, (_, k) => ({ x: CX + (k - 4.5) * 64, y: 640 + Math.abs(k - 4.5) * 7, h: 150 + rnd(k * 3 + 1) * 120 }))
const ONE = 4 // # the tower that swallows the most
const SMALL: { x: number; y: number; s: number; seed: number; d: number }[] = (() => {
  const out: { x: number; y: number; s: number; seed: number; d: number }[] = []
  for (let i = 0; out.length < 490 && i < 20000; i++) {
    const x = CX + (rnd(i * 2 + 1) * 2 - 1) * RX * 0.95, y = CY + (rnd(i * 2 + 2) * 2 - 1) * RY * 0.9
    if (((x - CX) / RX) ** 2 + ((y - CY) / RY) ** 2 > 0.82) continue
    if (Math.abs(x - CX) < 360 && y < 700) continue // # keep the back-centre for the giants
    if (out.some((b) => Math.abs(b.x - x) < 30 && Math.abs(b.y - y) < 16)) continue
    out.push({ x, y, s: 0.5 + 0.6 * ((y - (CY - RY)) / (2 * RY)), seed: i, d: Math.hypot((x - CX) / RX, (y - CY) / RY) })
  }
  return out.sort((a, b) => a.y - b.y)
})()

// ------------------------------------------------------------ camera keys [cue, centre x, centre y, zoom]
const camAt = (f: number, keys: [number, number, number, number][]) => {
  let cur = keys[0]
  let x = cur[1], y = cur[2], z = cur[3]
  for (const k of keys.slice(1)) {
    if (f < k[0]) break
    const t = easeInOut(span(f, k[0], k[0] + 30))
    x = lerp(x, k[1], t); y = lerp(y, k[2], t); z = lerp(z, k[3], t); cur = k
    if (t < 1) break
  }
  // # a gentle drift so the film never sits perfectly still
  return { x: x + Math.sin(f / 70) * 4, y: y + Math.sin(f / 90) * 3, z: z * (1 + 0.004 * Math.sin(f / 110)) }
}

// ------------------------------------------------------------ the city (also drawn small in the close-up)
const City: React.FC<{ f: number; c: (k: string) => number; id: string }> = ({ f, c, id }) => {
  const tiny = c('s2:tiny'), comp = c('s2:companies')
  const towerUp = c('s3:38'), oneUp = c('s4:takes'), other = c('s5:other'), split = c('s5:split')
  const slide = easeInOut(span(f, c('s6:quietly'), c('s6:quietly') + 45))
  const glowAll = Math.max(0, 1 - Math.abs(f - c('s6:choice') - 10) / 20)
  const dimSmall = Math.max(0, Math.min(easeOut(span(f, c('s3:almost'), c('s3:almost') + 20)), 1 - easeOut(span(f, other, other + 20)))) + 0.5 * slide
  const tilt = -3 * slide
  return (
    <g transform={`rotate(${tilt} ${CX} ${CY})`}>
      <Platform id={id} cx={CX} cy={CY} rx={RX} ry={RY} />
      {/* # small companies pop up one by one across "500 different companies" */}
      {SMALL.map((b, j) => {
        const at = tiny + 6 + (j / SMALL.length) * (comp - tiny + 18)
        const k = settle(span(f, at, at + 10))
        if (k <= 0.001) return null
        const x = lerp(b.x, TOWERS[ONE].x, 0.18 * slide)
        // # a crumb (gold coin) lands on each roof on "split", rippling out from the centre
        const ca = split + b.d * 40, cp = span(f, ca, ca + 10)
        return (
          <g key={j} transform={`translate(${x} ${b.y}) scale(${k}) translate(${-x} ${-b.y})`}>
            <Building x={x} y={b.y} s={b.s} seed={b.seed} dim={dimSmall} glow={glowAll * 0.6} />
            {cp > 0 && <ellipse cx={x} cy={b.y - 60 * b.s - (1 - easeOut(cp)) * 50} rx={7 * b.s} ry={3.5 * b.s} fill={P.gold} />}
          </g>
        )
      })}
      {/* # the ten giants rise on "38", one by one; one grows tallest on "takes" */}
      {TOWERS.map((t, k) => {
        const at = towerUp + k * 3, h = t.h * settle(span(f, at, at + 18)) + (k === ONE ? 260 * settle(span(f, oneUp, oneUp + 40)) : 0)
        const glow = Math.max(easeOut(span(f, c('s3:10'), c('s3:10') + 15)) * (1 - easeOut(span(f, other, other + 20))), easeOut(span(f, c('s6:concentrated'), c('s6:concentrated') + 15)))
        return h > 2 ? <Tower key={k} id={id} i={k} x={t.x} y={t.y} h={h} glow={glow} /> : null
      })}
    </g>
  )
}

export const DioramaHook: React.FC<HookProps> = ({ cue, voice }) => {
  const f = useCurrentFrame()
  const c = (k: string) => { const v = cue[k]; if (v === undefined) throw new Error(`hook: no cue ${k}`); return v }
  const id = 'dh'
  // ---------------------------------------------------------- camera
  const cam = camAt(f, [
    [0, 960, 560, 1.6],
    [c('s2:tiny'), 960, 600, 1.0],
    [c('s3:almost'), 960, 540, 1.25],
    [c('s4:One'), TOWERS[ONE].x, 470, 1.9],
    [c('s5:other'), 960, 620, 1.0],
    [c('s5:average'), SMALL[400].x, SMALL[400].y - 40, 2.0],
    [c('s6:fund'), 960, 610, 0.95],
  ])
  // ---------------------------------------------------------- the fund box: in front at first, then lifts up as the source
  const lift = easeInOut(span(f, c('s2:tiny'), c('s2:tiny') + 36))
  const box = { x: 960, y: lerp(560, 230, lift), s: lerp(1, 0.6, lift) }
  const mouth = { x: box.x, y: box.y - 110 * box.s }
  const open = easeOut(span(f, c('s2:tiny') - 6, c('s2:tiny') + 6))
  const bounce = Math.sin(span(f, c('s1:fund'), c('s1:fund') + 12) * Math.PI) * 10
  // ---------------------------------------------------------- the hand drops the bill into the slot
  const handIn = easeOut(span(f, c('s1:put') - 8, c('s1:put') + 16)), drop = easeInOut(span(f, c('s1:index'), c('s1:index') + 16)), handOut = easeInOut(span(f, c('s1:today'), c('s1:today') + 18))
  const handX = lerp(-400, 900, handIn) - handOut * 1300, handY = lerp(260, 300, handIn)
  const bill = drop < 1 ? { x: handX + 60, y: handY + 40 + drop * 160, o: 1 - drop * 0.9 } : null
  // ---------------------------------------------------------- slivers
  const slivers: React.ReactNode[] = []
  const tiny = c('s2:tiny')
  for (let i = 0; i < 150; i++) { // # the $100 splits into slivers that fly out to the companies
    const at = tiny + (i / 150) * 34, t = span(f, at, at + 22)
    if (t <= 0 || t >= 1) continue
    const b = SMALL[Math.floor(rnd(i * 7 + 3) * SMALL.length)], p = arc(mouth, { x: b.x, y: b.y - 50 * b.s }, easeInOut(t), 160)
    slivers.push(<Sliver key={`a${i}`} x={p.x} y={p.y} r={t * 540 + i * 37} s={0.8} />)
  }
  const pour = (from: number, to: number, n: number, target: (i: number) => { x: number; y: number }, key: string, gold = false) => {
    if (f < from || f > to + 24) return
    for (let i = 0; i < n; i++) {
      const ph = ((f - from) / 24 + i / n) % 1, born = from + (i / n) * 24
      if (f < born || f > to + ph * 24) continue
      const p = arc(mouth, target(i), easeInOut(ph), 90)
      slivers.push(<Sliver key={`${key}${i}`} x={p.x} y={p.y} r={ph * 300 + i * 41} s={0.75} gold={gold} />)
    }
  }
  // # most of the money pours into the ten giants; a thin trickle reaches the rest
  pour(c('s3:38'), c('s3:them') + 10, 70, (i) => ({ x: TOWERS[i % 10].x, y: TOWERS[i % 10].y - TOWERS[i % 10].h }), 'b')
  pour(c('s3:38'), c('s3:them') + 10, 8, (i) => { const b = SMALL[(i * 61) % SMALL.length]; return { x: b.x, y: b.y - 50 * b.s } }, 't')
  // # one company swallows a fat stream on "takes … 7 dollars 50 cents"
  pour(c('s4:takes'), c('s4:cents') + 6, 40, () => ({ x: TOWERS[ONE].x, y: TOWERS[ONE].y - TOWERS[ONE].h - 260 }), 'o', true)
  // ---------------------------------------------------------- the safe glass dome, cracking as it all slides to the giants
  const dome = { show: easeOut(span(f, c('s6:safe'), c('s6:safe') + 20)), crack: easeOut(span(f, c('s6:bets'), c('s6:bets') + 14)), shatter: easeOut(span(f, c('s6:market'), c('s6:market') + 20)) }
  // ---------------------------------------------------------- close-up after the wipe
  const wipeAt = c('s7') - 14
  const covered = f >= wipeAt + 14
  const keys: [number, PoseId][] = [[0, 'idle'], [c('s7:not'), 'shrug'], [c('s7:bad'), 'idle'], [c('s8:not'), 'think'], [c('s8:own'), 'point']]
  const exprKeys = [{ at: 0, pose: 'idle', expression: 'neutral' }, { at: c('s7:not'), pose: 'shrug', expression: 'worried' }, { at: c('s7:bad'), pose: 'idle', expression: 'smiling' }, { at: c('s8:not'), pose: 'think', expression: 'thinking' }]
  const ex = expressionAt(f, exprKeys)
  return (
    <AbsoluteFill>
      <style>{fontFaces()}</style>
      {voice && <Audio src={staticFile(voice)} />}
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {!covered ? (
          <g>
            <Stage id={id} frame={f} />
            <g transform={`translate(960 540) scale(${cam.z}) translate(${-cam.x} ${-cam.y})`}>
              {f >= tiny && <City f={f} c={c} id={id} />}
              <Dome id={id} cx={CX} cy={CY - 20} rx={RX * 0.98} ry={560} {...dome} />
              {slivers}
              <g transform={`translate(0 ${-bounce})`}><FundBox id={id} x={box.x} y={box.y} s={box.s} open={open} /></g>
              {bill && <Bill x={bill.x} y={bill.y} s={0.9} r={-8 + drop * 30} o={bill.o} />}
              {handIn > 0 && handOut < 1 && <Hand x={handX} y={handY} r={8} open={drop} />}
            </g>
          </g>
        ) : (
          <g>
            <Stage id={`${id}2`} tint="teal" frame={f} />
            {/* # the city, small and tilted on its island, beside the hero */}
            <g transform="translate(1040 260) scale(0.42)"><City f={f} c={c} id={`${id}m`} /></g>
            <Actor who="hero" pose={poseAt(f, 30, keys)} expression={ex.expression} blend={ex.from ? { from: ex.from, mix: ex.mix! } : undefined} x={600} y={1260} scale={1.6} frame={f} life={3} />
          </g>
        )}
        <ZigZagWipe p={span(f, wipeAt, wipeAt + 14)} color={P.champ} mode="cover" />
        <ZigZagWipe p={span(f, wipeAt + 14, wipeAt + 30)} color={P.champ} mode="reveal" />
        <Vignette id={covered ? `${id}2` : id} />
        {/* # key numbers only, typed or counted as spoken, always in the same place */}
        {f < c('s4:One') && <KineticText words="$38 of every $100" style="count" frame={f} at={c('s3:38')} x={960} y={150} size={84} />}
        {f < c('s4:One') + 10 ? null : f < c('s5:other') ? <KineticText words="$7.50" style="count" frame={f} at={c('s4:7')} x={960} y={150} size={96} /> : null}
        {f < c('s5:13') || f > c('s6:fund') ? null : <KineticText words="13¢" style="count" frame={f} at={c('s5:13')} x={960} y={150} size={96} />}
      </svg>
    </AbsoluteFill>
  )
}
