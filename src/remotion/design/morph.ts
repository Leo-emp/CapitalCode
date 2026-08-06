// # SVG path point interpolation for chart-to-chart morphing
// # Custom implementation — no flubber dependency needed
// # Used when AI Director sets morph_from on a chart scene

// # A point on an SVG path
export interface Point {
  x: number
  y: number
}

// # Resample a path to exactly `count` evenly-spaced points
// # Uses linear interpolation along the path's total arc length
export function normalizePath(path: Point[], count: number): Point[] {
  // # Edge cases: empty path or single point
  if (path.length === 0) return Array.from({ length: count }, () => ({ x: 0, y: 0 }))
  if (path.length === 1) return Array.from({ length: count }, () => ({ ...path[0] }))
  if (count <= 1) return [{ ...path[0] }]

  // # Step 1: Calculate the length of each segment between consecutive points
  let totalLength = 0
  const segLengths: number[] = []
  for (let i = 1; i < path.length; i++) {
    const dx = path[i].x - path[i - 1].x
    const dy = path[i].y - path[i - 1].y
    const len = Math.sqrt(dx * dx + dy * dy)
    segLengths.push(len)
    totalLength += len
  }

  // # All points identical — just replicate the first one
  if (totalLength === 0) return Array.from({ length: count }, () => ({ ...path[0] }))

  // # Step 2: Walk along the path at even intervals
  const result: Point[] = []
  const step = totalLength / (count - 1)

  for (let i = 0; i < count; i++) {
    const targetDist = i * step

    // # Find which segment this distance falls in
    let walked = 0
    let segIdx = 0
    for (segIdx = 0; segIdx < segLengths.length; segIdx++) {
      if (walked + segLengths[segIdx] >= targetDist || segIdx === segLengths.length - 1) {
        break
      }
      walked += segLengths[segIdx]
    }

    // # Interpolate within the found segment
    const distInSeg = targetDist - walked
    const t = segLengths[segIdx] > 0 ? distInSeg / segLengths[segIdx] : 0
    const clampedT = Math.max(0, Math.min(1, t))

    result.push({
      x: path[segIdx].x + (path[segIdx + 1].x - path[segIdx].x) * clampedT,
      y: path[segIdx].y + (path[segIdx + 1].y - path[segIdx].y) * clampedT,
    })
  }

  return result
}

// # Interpolate between two paths point-by-point
// # Both are auto-normalized to the same point count before blending
// # progress: 0 = pathA, 1 = pathB (use with spring or interpolate)
export function interpolatePaths(
  pathA: Point[],
  pathB: Point[],
  progress: number
): Point[] {
  // # Use the longer path's count so no data is lost
  const count = Math.max(pathA.length, pathB.length, 2)
  const a = normalizePath(pathA, count)
  const b = normalizePath(pathB, count)

  // # Linear blend at each point
  return a.map((pa, i) => ({
    x: pa.x + (b[i].x - pa.x) * progress,
    y: pa.y + (b[i].y - pa.y) * progress,
  }))
}

// # Convert Point array to SVG path `d` attribute string
// # M x y L x y L x y ...
export function pointsToSvgPath(points: Point[]): string {
  if (points.length === 0) return ''
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')
}
