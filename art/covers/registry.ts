// ============================================================
// COVERS — one custom drawn thumbnail per entry. A video has 3
// (different concepts, not one layout three times). `job` is the
// job folder's name, so `cc cover <job>` finds them.
// ============================================================
import type React from 'react'
import type { Canvas } from './kit'

export type Cover = {
  id: string                 // # e.g. 'visa-1'
  job: string                // # job folder name (basename)
  canvas: Canvas             // # 'tall' Short cover 1080×1920 · 'wide' long thumbnail 1920×1080
  concept: string            // # the one-line story the picture tells
  Component: React.FC
}
export const makeCover = (c: Cover): Cover => c
