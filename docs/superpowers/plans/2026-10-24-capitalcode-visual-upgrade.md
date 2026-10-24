# CapitalCode Visual Upgrade (Phase 2b) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Goal:** Close the gap to the Alux reference found in the owner's review of the first long video
(2026-10-24): show what the voice says, characters acting inside brighter scenes, slides that are
never empty, fewer slams, persistent branding. Then re-render the first video for comparison.

**Evidence:** owner feedback + self-review (taste/learning.json r13–r15). Measured: mean brightness
6.9% vs reference 16.0%; 23/110 sentences without their own visual; 53 pose changes + 31 generic
icons were most of the scene-shot "events"; 11 slams; slides heading-only for seconds after cuts.

**Spec:** `docs/superpowers/specs/2026-10-23-capitalcode-agent-design.md` (§6 art, §6.6 motion,
§11 gates) — this plan raises the bar inside it; owner rules in taste/learning.json are binding.

## Global constraints
- Everything stays code-drawn (no AI images); characters only via `Actor`; front-facing rule kept.
- No per-frame SVG filters (tore text); deterministic drawing.
- Every behaviour change ships with a test that failed first; `vitest tests/agent tests/art` green.

## Part A — engine gates (quick)
- [x] A1 First visual within 1 s of every slide cut (first `at` cue − shot start ≤ 1.0 s); refusal names the word to start on.
- [x] A2 Slam cap: ≤ 3 slams per long video (scene slams + slam slides), ≤ 1 per Short.
- [x] A3 Brand shot starts ≤ 25 s.
- [x] A4 Persistent small logo emblem on every frame (top-left, low opacity), not on the brand card.
- [x] A5 gate-video measures mean brightness and reports it (target 12–20%, refuses after Part C lands).

## Part B — "show what's said"
- [x] B1 Plan schema: optional `beats` — per sentence a visual idea; gate requires ≥ 1 *illustrative*
      event per sentence (slide item, vignette step, held/placed object, slam); pose changes and the
      generic-icon set (question, exclamation, tick, cross, warning, magnifier, clock, calendar) do not count.
- [x] B2 Vignette library (`art/vignettes/`): data-driven animated mini-scenes, each a shot kind
      `vignette` with cue-able steps: money-flow (dollars into N big vs many small), bubble (swell/pop),
      leaderboard (rows swap ranks), pie-slice, baskets (same items in several baskets), lottery (tickets
      grey out, few glow), scale (tips). BUILT: these 7. NOT YET: crowd-vs-giant, ladder/stairs, timeline-city.
- [x] B3 Catalog + skill + plan gate know vignettes (data checks, layout budgets, cues per step).

## Part C — characters inside brighter scenes
- [x] C1 Brightness pass: scene palette/lighting lifted toward the reference (mean ~15%), measured by A5.
- [x] C2 Acting: actors can sit at desk anchors, hold a prop in hand (prop follows the hand), and
      two-actor moments (handshake/talk) at paired anchors.
- [x] C3 Props in the hand or on the floor (scene ground line); effects may float. NOT YET: desk-top placement.

## Part D — re-render the first video
- [x] D1 Re-plan "Your Index Fund…" with beats + vignettes + acting; hook opens on the $100 split vignette.
- [ ] D2 Gates, render, Critic, package; side-by-side comparison for the owner.

## Part E — art backlog from the Critic (v3, round 2: 7.9) — next pass
- [ ] E1 `tracks` vignette: two horizon lines (e.g. 30 years vs 5 years) with one dip that only the long one recovers from.
- [ ] E2 `slice-grows` vignette: one company's slice of a pie/bar grows step by step as new money flows in.
- [ ] E3 Hero actions with oversized props (weighing two price tags; carrying a giant price tag) — new poses + prop scale.
- [ ] E4 New props: oil barrel, pill bottle, router/server (sector shorthand for company names).
- [ ] E5 Vignettes still planned: crowd-vs-giant, ladder/stairs, era skyline; desk-top prop placement.
- [ ] E6 Scene variety: fewer "hero standing beside a set" shots — more two-person moments and full-frame vignettes.
