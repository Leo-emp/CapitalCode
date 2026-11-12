// ============================================================
// COVER GATE — measures a drawn cover in node (every kit part
// reports its box) before it is rendered. Owner rules: a hero with
// a real expression, words readable on a phone, few objects, no
// pile-ups or messy overlaps, nothing under YouTube's overlays.
// ============================================================
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BoxProvider, SIZE, type Box, type Collector } from '../../art/covers/kit'
import type { Cover } from '../../art/covers/registry'

const area = (b: Box) => Math.max(0, b.w) * Math.max(0, b.h)
const inter = (a: Box, b: Box) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y))
const allowed = (a: Box, b: Box) => [a.touches, b.touches].some((t, i) => t?.includes('*') || t?.includes((i ? a : b).name))

export const measureCover = (cover: Cover): Collector => {
  const col: Collector = { boxes: [] }
  renderToStaticMarkup(React.createElement(BoxProvider, { value: col }, React.createElement(cover.Component)))
  return col
}

export const checkCover = (cover: Cover): { problems: string[]; boxes: Box[] } => {
  const { boxes, canvas: drawn } = measureCover(cover)
  const p: string[] = []
  const canvas = cover.canvas
  if (drawn && drawn !== canvas) p.push(`drawn on a ${drawn} canvas but declared ${canvas}`)
  const { w, h } = SIZE[canvas]
  const text = boxes.filter((b) => b.kind === 'text'), heroes = boxes.filter((b) => b.kind === 'hero')
  const face = boxes.find((b) => b.kind === 'face'), objects = boxes.filter((b) => b.kind === 'object')

  // # the hero: exactly one, a feeling on the face, the face big enough to read on a phone
  if (heroes.length !== 1) p.push(`needs exactly one main hero (got ${heroes.length})`)
  if (face) {
    if (face.info?.expression === 'neutral') p.push('the hero needs an expression that fits the story (not neutral)')
    const min = canvas === 'tall' ? 0.09 : 0.17 // # face height ÷ canvas height
    if (face.h / h < min) p.push(`hero face too small: ${Math.round(face.h)} px tall, needs ≥ ${Math.round(min * h)} px`)
    if (face.x < 0 || face.y < 0 || face.x + face.w > w || face.y + face.h > h) p.push('hero face is cut off by the edge')
  }

  // # the words: 1–2 blocks, 3–12 words in all (owner 2026-11-10: one complete sentence), big, inside the frame
  if (text.length < 1 || text.length > 2) p.push(`needs 1–2 word blocks (got ${text.length})`)
  const words = text.reduce((s, b) => s + Number(b.info?.words ?? 0), 0)
  if (words < 3 || words > 12) p.push(`needs 3–12 words in all (got ${words})`)
  const minPx = canvas === 'tall' ? 110 : 100
  for (const t of text) {
    if (Number(t.info?.minSize) < minPx) p.push(`"${t.info?.text}": smallest line ${t.info?.minSize} px, needs ≥ ${minPx} px to read on a phone`)
    if (t.x < 24 || t.y < 24 || t.x + t.w > w - 24 || t.y + t.h > h - 24) p.push(`"${t.info?.text}" runs off the edge`)
  }

  // # clean frame: 1–3 main objects, ≤ 6 checked parts in all
  if (objects.length < 1 || objects.length > 3) p.push(`needs 1–3 main objects (got ${objects.length})`)
  const parts = boxes.filter((b) => b.kind !== 'scenery' && b.kind !== 'face')
  if (parts.length > 7) p.push(`too busy: ${parts.length} parts (keep ≤ 7 incl. words and hero)`)

  // # no pile-ups: words never cover the face; main things never overlap unless declared (touches)
  for (const t of text) if (face && inter(t, face) > 0) p.push(`words "${t.info?.text}" cover the hero's face`)
  const solid = boxes.filter((b) => ['text', 'hero', 'object', 'extra'].includes(b.kind))
  for (let i = 0; i < solid.length; i++) for (let j = i + 1; j < solid.length; j++) {
    const a = solid[i], b = solid[j]
    if (allowed(a, b)) continue
    const share = inter(a, b) / Math.min(area(a), area(b))
    // # a hero's box is loose (arms, air beside the legs): allow a little more there
    const limit = a.kind === 'hero' || b.kind === 'hero' ? 0.18 : 0.08
    if (share > limit) p.push(`${a.name} and ${b.name} overlap ${Math.round(share * 100)}% — move apart or mark touches`)
  }

  // # no dead areas: each band of the frame (thirds of the long side) must hold some of the story
  const along = canvas === 'tall' ? 'y' : 'x', len = canvas === 'tall' ? h : w
  for (let k = 0; k < 3; k++) {
    const a0 = (len * k) / 3, a1 = (len * (k + 1)) / 3
    const cover = parts.reduce((s, b) => s + Math.max(0, Math.min(a1, (b as any)[along] + (along === 'y' ? b.h : b.w)) - Math.max(a0, (b as any)[along])) * (along === 'y' ? Math.min(b.w, w) : Math.min(b.h, h)), 0)
    if (cover / ((a1 - a0) * (along === 'y' ? w : h)) < 0.18) p.push(`the ${['top', 'middle', 'bottom'][k].replace(/^(top|bottom)$/, (m) => canvas === 'wide' ? (m === 'top' ? 'left' : 'right') : m)} third is mostly empty — fill it with the story`)
  }

  // # YouTube overlays: Shorts — right-side buttons and bottom title; long — the timestamp corner
  const keep = [...text, ...(face ? [face] : []), ...objects]
  for (const b of keep) {
    if (canvas === 'tall' && (b.y + b.h > 1560 || (b.x + b.w > 960 && b.y + b.h > 1100))) p.push(`${b.name} sits under the Shorts overlay (keep above y 1560, and off the right edge below y 1100)`)
    if (canvas === 'wide' && b.x + b.w > 1700 && b.y + b.h > 960) p.push(`${b.name} sits under the timestamp corner`)
  }
  return { problems: p, boxes }
}
