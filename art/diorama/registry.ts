// ============================================================
// PIECES — the choreographed illustrations a video is made of
// (diorama style). A piece covers a stretch of the script and
// animates on named cue words; it declares its beats (for the
// "show every line" gate) and its sound effects (mixed under the
// voice). Drawn into a 1920×1080 SVG by the Episode.
// ============================================================
import type React from 'react'
import type { Mood } from './kit'

export type PieceProps = { f: number; c: (k: string) => number; from: number; to: number }
export type Piece = {
  id: string; title: string
  beats: string[]                              // # cue keys where something meaningful happens
  sfx: [cue: string, name: string, volume?: number][]
  Component: React.FC<PieceProps>
  mood?: Mood                                  // # the piece's usual mood (light/dark); a plan shot can override it
  canvas?: Canvas                              // # 'wide' 1920×1080 (long videos, the default) or 'tall' 1080×1920 (Shorts)
}
export type Canvas = 'wide' | 'tall'
export const CANVAS: Record<Canvas, { w: number; h: number }> = { wide: { w: 1920, h: 1080 }, tall: { w: 1080, h: 1920 } }
export const makePiece = (id: string, title: string, p: Omit<Piece, 'id' | 'title'>): Piece => ({ id, title, ...p })

const LIST: Piece[] = []
export const PIECES: readonly Piece[] = LIST
export const registerPiece = (p: Piece) => { const i = LIST.findIndex((x) => x.id === p.id); if (i >= 0) LIST[i] = p; else LIST.push(p) }
export const findPiece = (id: string) => LIST.find((p) => p.id === id)
export const getPiece = (id: string) => { const p = findPiece(id); if (!p) throw new Error(`unknown piece "${id}" (known: ${LIST.map((x) => x.id).join(', ')})`); return p }
