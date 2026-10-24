// ============================================================
// ZOOM-INTO — the living film's main way between related shots
// (spec §6, instead of most cuts): the camera flies into an object
// of the current shot (a vault door, a window, a coin) while the
// next shot grows out of that point as a widening circle.
// A clip-path circle, not an SVG filter (filters tore and cost time).
// ============================================================

export const ZOOM_INTO = 18 // # frames

const ease = (t: number) => { const x = Math.max(0, Math.min(1, t)); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 }

// # p: 0→1 through the transition; point: where on screen (1920×1080) the next shot comes from
export const zoomIntoAt = (p: number, point: { x: number; y: number }) => {
  const x = Math.max(0, Math.min(1920, point.x)), y = Math.max(0, Math.min(1080, point.y))
  const e = ease(p)
  // # the outgoing shot zooms 1→3× toward the point, keeping it fixed on screen
  const k = 1 + 2 * e
  // # the incoming shot grows from the point: its circle reaches the farthest corner, its content settles 0.6→1×
  const R = Math.max(Math.hypot(x, y), Math.hypot(1920 - x, y), Math.hypot(x, 1080 - y), Math.hypot(1920 - x, 1080 - y))
  const ki = 0.6 + 0.4 * e
  return {
    outgoing: { k, tx: x * (1 - k), ty: y * (1 - k) },
    incoming: { k: ki, tx: x * (1 - ki), ty: y * (1 - ki), r: R * e, cx: x, cy: y },
  }
}
