// ============================================================
// CAMERA — the scene camera of the living film (spec §6).
// A camera is a point of the 1920×1080 world it looks at plus a
// zoom. Keys come from the plan's cue words ("camera goes to what is
// being talked about"); every move is eased, and a gentle drift means
// no frame is ever perfectly still. Pure functions of the frame, so
// chunked renders match an uncut render at every seam.
// ============================================================

export type Cam = { x: number; y: number; zoom: number }
export type CamKey = Cam & { at: number }

export const MOVE = 24 // # frames for one camera move
const smooth = (t: number) => { const x = Math.max(0, Math.min(1, t)); return x * x * (3 - 2 * x) }
const lerpCam = (a: Cam, b: Cam, t: number): Cam => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, zoom: a.zoom + (b.zoom - a.zoom) * t })

// # Where the camera looks at a frame. keys[0] is the opening framing; each later key starts an
// # eased MOVE-frame move from wherever the camera is at that moment. drift (0–1) adds a slow float
// # of up to 6 px and 0.6% zoom, different per seed.
export const cameraAt = (frame: number, keys: CamKey[], seed: number, drift = 1): Cam => {
  const ks = [...keys].sort((a, b) => a.at - b.at)
  let from: Cam = ks[0], to: Cam = ks[0], start = -Infinity
  for (const k of ks.slice(1)) {
    if (k.at > frame) break
    from = lerpCam(from, to, smooth((k.at - start) / MOVE)); to = k; start = k.at
  }
  const c = lerpCam(from, to, smooth((frame - start) / MOVE))
  if (!drift) return c
  const dx = 3.5 * Math.sin(frame / 97 + seed) + 1.5 * Math.sin(frame / 41 + seed * 1.9) + 1 * Math.sin(frame / 11 + seed * 3.1)
  const dy = 2.5 * Math.sin(frame / 83 + seed * 0.7)
  const dz = 0.006 * Math.sin(frame / 131 + seed * 2.3)
  return { x: c.x + dx * drift, y: c.y + dy * drift, zoom: c.zoom + dz * drift }
}

// # Screen transform for a camera: translate(tx ty) scale(k), never showing past the world's edges
export const framed = (cam: Cam): { tx: number; ty: number; k: number } => {
  const k = Math.max(1, cam.zoom)
  const clampT = (v: number, size: number) => Math.min(0, Math.max(size * (1 - k), v))
  return { k, tx: clampT(960 - cam.x * k, 1920), ty: clampT(540 - cam.y * k, 1080) }
}

// # Parallax: a layer at depth d (back 0.6, mid 1, front 1.12) sees the camera's PAN scaled by d; all layers
// # share one zoom (a zoom is a lens, not a move — scaling the front layer more made people in it oversized)
export const DEPTH = { back: 0.6, mid: 1, front: 1.12 } as const
export const layerCam = (cam: Cam, d: number): Cam => ({ x: 960 + (cam.x - 960) * d, y: 540 + (cam.y - 540) * d, zoom: cam.zoom })

// # A plan's camera keys → camera keys in world pixels. `to` is a scene spot (people are framed at the
// # chest, 300 px above the feet — or higher on a close zoom, so the head never leaves the frame) or a point. Zoom carries over from the previous key; a first move with
// # no zoom is a gentle push-in (1.35×).
type Spot = { x: number; y: number; scale: number }
export const PUSH = 1.35
export const camKeys = (from: number, base: Cam, keys: { at: number; to: string | { x: number; y: number }; zoom?: number }[], anchors: Record<string, Spot>): CamKey[] => {
  const out: CamKey[] = [{ at: from, ...base }]
  for (const k of [...keys].sort((a, b) => a.at - b.at)) {
    const prev = out[out.length - 1]
    const zoom = k.zoom ?? (out.length === 1 ? Math.max(PUSH, base.zoom) : prev.zoom)
    let p = { x: base.x, y: base.y }
    if (typeof k.to === 'string') {
      const a = anchors[k.to]
      if (a) p = /^(stand|sit)/.test(k.to) ? { x: a.x, y: Math.min(a.y - 300 * a.scale, a.y - 600 * a.scale + 360 / zoom) } : { x: a.x, y: a.y }
    } else p = { x: k.to.x, y: k.to.y }
    out.push({ at: k.at, x: p.x, y: p.y, zoom })
  }
  return out
}
