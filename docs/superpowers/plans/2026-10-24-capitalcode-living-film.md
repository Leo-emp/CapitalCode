# CapitalCode Living Film (Wave 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn CapitalCode's render engine into a "living film": Night-flat colours, animated characters, a moving camera, crowds/grids/circles and the metaphors the index-fund script needs — then remake that video and its Shorts as proof.

**Architecture:** The engine (plan → gates → timeline → Remotion chunks) stays. New behaviour lives in pure, frame-driven functions (`art/motion/*.ts`) that the existing components call: idle life and gestures feed `poseAt`, a camera track transforms a scene's layers with parallax, transitions grow a shot out of a point of the previous one. The plan schema gains optional fields; old plans still render (in the new look).

**Tech Stack:** TypeScript (strict), React/SVG, Remotion 4.0.506, vitest, ffmpeg.

**Spec:** `docs/superpowers/specs/2026-10-24-capitalcode-living-film-design.md` (§12 holds the calls made for the owner).

## Global Constraints

- Code-drawn only (React/SVG); no AI images, no stock footage, no pastel Kurzgesagt look; no per-frame SVG filters; deterministic (no `Math.random`).
- Characters only via `art/rig/Actor.tsx`; front-facing rule kept; the five HD looks unchanged.
- Main world "Night flat": deep navy, never near-black; video brightness band **20–35%**; deep teal second world for ~30% of shots.
- Every counted visual event shows the words being spoken and is cued to its word; idle life, talk gestures, drift and walker-follow are automatic and do **not** count (spec §12.1–2).
- Density: no gap over **2 s** without a counted event; **0** sentences without one (chapter openers excepted); rendered `changeEvery` ≤ **1.5 s**.
- Text share (`slide` + slam shots) ≤ **25%** of runtime.
- Render ≤ 60 min per long video on this PC; memory safeguards (`renderConcurrency`) and chunk caching must keep working.
- Commits as Leo-emp with the Co-Authored-By line; `// #` comment style; every behaviour change ships with a test that failed first.

## Review Focus

1. **A walker or camera move that crosses a chunk seam** — a 900-frame chunk boundary inside a walk or pan must render identically to an uncut render (no jump at the seam).
2. **Old plans** (v1/v3 `plan.json`, no camera/path/give fields) must still pass `gate-plan` shape checks and render — no crash on missing new fields.
3. **Hand-over at the same frame as a pose change** — the object must stay attached to exactly one hand (never two copies, never dropped on the floor).
4. **Zoom-into a point outside the next shot's frame** (e.g. a prop at x 1850) — the transition must clamp so the incoming shot fully covers the frame by its end.
5. **Crowd of 60+ minis** — render time per frame must stay within budget (≤ 120 ms/frame measured on the fixture) and nothing overflows the frame.

---

### Task 1: Night-flat palette, worlds and brightness band

**Files:**
- Modify: `art/tokens.ts` (add `WORLDS`, `WorldId`), `art/scenes/kit.tsx` (scene `world` prop, flat fills in kit primitives: `NightSky`, `Skyline`, `Pavement`, `RoomShell`, `Desk`, `Monitor`, `BlindsWindow`, `Shelf`, `OfficeChair`, `Door`, `LightPool`), `agent/schema.ts` (`SceneShot.world?: WorldId`), `art/episode/Episode.tsx` (pass `world`), `agent/commands/qa.ts` (band `[20, 35]`)
- Test: `tests/art/worlds.test.ts`

**Interfaces:**
- Produces: `type WorldId = 'night' | 'teal'`; `WORLDS: Record<WorldId, { sky: [string, string]; wall: string; floor: string; solid: string; solidShade: string; glow: string; line: string }>`; `SceneProps.world?: WorldId` (default `'night'`).

- [ ] **Step 1: Write failing tests** — `worlds.test.ts`: `luma(WORLDS.night.sky[0])` between 9 and 16 and `> luma('#05070C') * 2.5`; teal sky luma between 14 and 24; `solid` luma ≥ 55 in both worlds (bright objects); every key present in both worlds.
- [ ] **Step 2: Run** `npx vitest run tests/art/worlds.test.ts` — Expected: FAIL (`WORLDS` undefined).
- [ ] **Step 3: Implement** `WORLDS` in `tokens.ts`; kit primitives read `world` (passed through `SceneDraw` args as `w: typeof WORLDS[WorldId]`) and use solid fills + one shade side instead of line-only strokes; `makeScene` paints `sky` gradient instead of `COLORS.bg`.
- [ ] **Step 4: Run** the test + `npx vitest run tests/art` — Expected: PASS.
- [ ] **Step 5: Measure** `npx tsx temp/voicetest/scenes.mts temp/voicetest/scenes_w1 && bash temp/voicetest/luma.sh temp/voicetest/scenes_w1` — Expected: mean ≥ 20%, none below 15%.
- [ ] **Step 6: Commit** `feat(art): night-flat + teal worlds, solid kit primitives, brightness band 20–35%`.

### Task 2: Restyle all 61 scenes and 62 props to Night flat

**Files:**
- Modify: `art/scenes/street.tsx`, `work.tsx`, `world.tsx`, `niche.tsx`; `art/props/money.tsx`, `business.tsx`, `tech.tsx`
- Test: `tests/art/scenes.test.tsx` (extend)

**Interfaces:**
- Consumes: `WORLDS`, `world` arg (Task 1). Produces: no API change (scene ids, anchors unchanged).

- [ ] **Step 1: Failing test** — for every scene id: rendered markup (both worlds) contains no `fill="#04060B"` / `fill="#05070C"` and at least 6 `fill=` attributes that are not `none` (solid objects, not line art).
- [ ] **Step 2: Run** — Expected: FAIL on the current line-art scenes.
- [ ] **Step 3: Restyle** each scene's buildings, furniture and objects to solid fills from `w` (keep layouts, anchors, `DECOR_FIGURES` list valid); props get a lit side + shade side.
- [ ] **Step 4: Run** `npx vitest run tests/art` — PASS; render the style-bible scene sheets (`page_07…12`) and eyeball every scene (no missing objects, people readable, brightness ≥ 20%).
- [ ] **Step 5: Commit** `feat(art): restyle scenes and props to night flat`.

### Task 3: Idle life and automatic talk gestures

**Files:**
- Create: `art/motion/life.ts`
- Modify: `art/rig/Actor.tsx` (apply life), `agent/timeline.ts` (add `speech: [number, number][]` frame ranges per sentence), `art/episode/Episode.tsx`
- Test: `tests/art/life.test.ts`

**Interfaces:**
- Produces: `idleLife(frame: number, seed: number): { blink: number /*0–1 lid*/, breath: number, headTurn: number /*deg*/, sway: number /*px*/ }`; `talkGesture(frame: number, speech: [number, number][], seed: number): Pose | null` (a gesture pose blend while a sentence is spoken, `null` when silent); `Timeline.speech?: [number, number][]`.

- [ ] **Step 1: Failing tests** — `idleLife`: blink > 0.9 for 3–5 frames at least once every 120–200 frames, never two blinks < 60 frames apart; deterministic for a seed; `breath` period 50–70 frames. `talkGesture`: returns `null` outside speech ranges; inside, consecutive frames differ by < 6° per joint (no snaps); two actors with different seeds are not in sync.
- [ ] **Step 2: Run** — FAIL (module missing).
- [ ] **Step 3: Implement** with seeded smooth noise (sum of sines); Actor eyes use `blink`; `poseAt` result is mixed 35% with `talkGesture` only when the actor's own track has no key within ±8 frames (cued actions win).
- [ ] **Step 4: Run** `npx vitest run tests/art tests/agent` — PASS.
- [ ] **Step 5: Commit** `feat(rig): idle life (blink, breath, head, sway) and automatic talk gestures`.

### Task 4: Walking along a path

**Files:**
- Create: `art/motion/walk.ts`
- Modify: `agent/schema.ts` (`ShotActor.path?: { at: Cue; to: string /*anchor*/ }[]`), `art/episode/Episode.tsx`, `agent/gates/plan.ts` (path anchors exist)
- Test: `tests/art/walk.test.ts`, `tests/agent/planGate.test.ts`

**Interfaces:**
- Produces: `walkAt(frame: number, start: {x: number; y: number}, legs: { at: number; to: {x: number; y: number} }[], speed = 6 /*px per frame*/): { x: number; y: number; walking: boolean; facing: 1 | -1 }`; walking uses poses `walkA`/`walkB` alternating every 9 frames.

- [ ] **Step 1: Failing tests** — position stays at start before the first leg; reaches `to` and stops (`walking: false`) after `distance / speed` frames; `facing` = sign of travel; chunk-seam check: `walkAt(f)` equals itself computed from a timeline sliced at any frame (pure function of absolute frame). Gate: unknown path anchor refused `"sh: path anchor "x" not in scene"`.
- [ ] **Step 2: Run** — FAIL.
- [ ] **Step 3: Implement**; Episode moves the actor and flips it to `facing`; feet keep the ground line.
- [ ] **Step 4: Run** tests — PASS; render a 3-s still strip of a walk (Task 13 harness) and check limbs stay attached.
- [ ] **Step 5: Commit** `feat(rig): walking along a path between anchors`.

### Task 5: Expression blends and hand-over

**Files:**
- Modify: `art/rig/faces.tsx` (blend two expressions), `art/rig/pose.ts` (`poseAt` carries `exprMix`), `agent/schema.ts` (`ShotProp.give?: { at: Cue; to: number }`), `art/episode/Episode.tsx`, `agent/gates/plan.ts`
- Test: `tests/art/acting.test.ts` (extend)

**Interfaces:**
- Produces: `Face` accepts `{ expression: ExpressionId; to?: ExpressionId; mix?: number }`; `heldBy(frame: number, prop: { on: 'hand'; actor: number; give?: { at: number; to: number } }): { actor: number; travel: number /*0–1 between hands*/ }`.

- [ ] **Step 1: Failing tests** — face markup at `mix 0.5` differs from both ends; `heldBy` before `give.at` → giver, after `give.at + 12` → receiver, in between `travel` rises 0→1 monotonically; gate refuses `give.to` ≥ actor count.
- [ ] **Step 2: Run** — FAIL.
- [ ] **Step 3: Implement**; expression changes blend over 8 frames; during hand-over the prop interpolates from giver's hand to receiver's hand (`heldPoint`), both actors forced to `hold` pose for the overlap.
- [ ] **Step 4: Run** tests — PASS.
- [ ] **Step 5: Commit** `feat(rig): expression blends and handing objects between characters`.

### Task 6: Camera tracks with parallax and drift

**Files:**
- Create: `art/motion/camera.ts`
- Modify: `art/scenes/kit.tsx` (`SceneProps.camera?: Cam`, layers moved by depth: back 0.4, mid 1.0, front 1.35), `agent/schema.ts` (`SceneShot.camera?: { at: Cue; to: string | { x: number; y: number }; zoom?: number }[]`), `art/episode/Episode.tsx`, `agent/gates/plan.ts`
- Test: `tests/art/camera.test.ts`

**Interfaces:**
- Produces: `type Cam = { x: number; y: number; zoom: number }`; `cameraAt(frame: number, keys: { at: number; x: number; y: number; zoom: number }[], drift: number /*seed*/): Cam` (eased 24-frame moves + drift ≤ 6 px / 0.6%); `framed(cam: Cam): { tx: number; ty: number; k: number }` that never shows outside the 1920×1080 world.

- [ ] **Step 1: Failing tests** — before the first key: scene default framing + drift; moves ease (velocity 0 at both ends); `framed` keeps the view inside the world for zoom 1–2.5 and any target incl. `{x: 1850}`; drift never zero over any 30-frame window; gate refuses an unknown target anchor.
- [ ] **Step 2: Run** — FAIL.
- [ ] **Step 3: Implement**; when an actor walks and no camera key is active, the camera follows the walker (counts as non-event).
- [ ] **Step 4: Run** tests — PASS.
- [ ] **Step 5: Commit** `feat(camera): cue-keyed pans/zooms with parallax depth and constant drift`.

### Task 7: Zoom-into transitions

**Files:**
- Create: `art/motion/transition.ts`
- Modify: `agent/schema.ts` (`Shot.enter?: { zoomInto: string | { x: number; y: number } }` — point in the previous shot), `art/episode/Episode.tsx` (`ShotView`)
- Test: `tests/art/transition.test.ts`

**Interfaces:**
- Produces: `zoomIntoAt(p: number /*0–1*/, point: { x: number; y: number }): { outgoing: { k: number; tx: number; ty: number }; incoming: { k: number; tx: number; ty: number; r: number /*reveal circle radius*/ } }` over 18 frames (replaces `TRANSITION = 8` zoom-through when `enter` is set).

- [ ] **Step 1: Failing tests** — at p=0 the outgoing is untouched and the incoming radius is 0 at `point`; at p=1 the incoming fully covers 1920×1080 (r ≥ frame diagonal from `point`), including `point.x = 1850`; monotonic.
- [ ] **Step 2: Run** — FAIL.
- [ ] **Step 3: Implement** (outgoing zooms toward the point while the incoming grows from a circle at that point, clip-path circle — not an SVG filter).
- [ ] **Step 4: Run** tests — PASS.
- [ ] **Step 5: Commit** `feat(transition): zoom-into — the next shot grows out of a point of the current one`.

### Task 8: Crowds, grids and circles

**Files:**
- Create: `art/vignettes/layouts.tsx`; mini cast in `art/rig/Mini.tsx`
- Modify: `art/vignettes/registry.ts`, `art/vignettes/samples.ts`
- Test: `tests/art/vignettes.test.tsx` (samples cover new ids)

**Interfaces:**
- Produces vignettes: `crowd` `{ people: { look: string; share: number; label?: string }[] }` (≤ 60; pedestal + coin stack ∝ share; one cue per group of `people.length / steps`), `grid` `{ panels: { prop?: string; scene?: string; label: string }[] }` (4–6, one cue per panel), `circles` `{ items: { prop?: string; scene?: string; label?: string }[] }` (3–5). `Mini: React.FC<{ look: string; x: number; y: number; scale: number; frame: number; seed: number }>` (idle life included).

- [ ] **Step 1: Failing tests** — samples render before/after build; `crowd` with 60 people fits inside 120..1800 × 200..980; `grid` refuses 3 or 7 panels; labels ≥ 28 px.
- [ ] **Step 2: Run** — FAIL.
- [ ] **Step 3: Implement**.
- [ ] **Step 4: Run** tests — PASS; time a 60-person crowd still (≤ 120 ms/frame on this PC).
- [ ] **Step 5: Commit** `feat(art): crowd, grid and circles vignettes with a mini cast`.

### Task 9: Metaphors for the index-fund script

**Files:**
- Create: `art/vignettes/metaphors.tsx`
- Modify: `art/vignettes/registry.ts`, `samples.ts`
- Test: `tests/art/vignettes.test.tsx`

**Interfaces:**
- Produces vignettes (data → steps): `crowd-giant` `{ giant: string; crowd: number; label?: string }` (concentration); `slice-grows` `{ name: string; from: number; to: number }` (one company's slice growing); `tracks` `{ long: { label: string; years: number }; short: { label: string; years: number } }` (30 vs 5 years with a dip only the long one recovers); `house-of-cards` `{ label?: string; collapse?: boolean }` (fragile); `money-mountain` `{ label?: string; burn?: boolean }`; `see-saw` `{ left: { label: string; value: number }; right: { label: string; value: number } }`.

- [ ] **Step 1: Failing tests** — each sample renders at 3 frames; data checks reject bad input with a reason; text ≥ 28 px.
- [ ] **Step 2: Run** — FAIL.
- [ ] **Step 3: Implement** (all motion on cues; deterministic).
- [ ] **Step 4: Run** tests — PASS; render every metaphor's still strip and review.
- [ ] **Step 5: Commit** `feat(art): metaphors for the index-fund remake`.

### Task 10: Restyle slides and existing vignettes

**Files:**
- Modify: `art/infographics/*.tsx`, `art/tokens.ts` (`PANEL_BG` from `WORLDS`), `art/vignettes/money.tsx`, `story.tsx`
- Test: `tests/art/infographics.test.tsx`, `tests/art/vignettes.test.tsx`

- [ ] **Step 1: Failing test** — panels and vignettes use world colours (no `#0A111C`/`#060A11` literals); vignette `heading` optional and ≤ 1 line.
- [ ] **Step 2: Run** — FAIL. **Step 3:** restyle (solid fills, lit/shade sides). **Step 4:** tests PASS. **Step 5: Commit** `feat(art): slides and vignettes in night flat`.

### Task 11: Density, text-share and change-rate gates

**Files:**
- Modify: `agent/gates/plan.ts` (counted events per spec §12.1, `maxGap` 2, `maxBare` 0, text share ≤ 0.25 replacing the 35–65% slide band), `agent/commands/plan.ts` (PACE), `agent/gates/video.ts` + `agent/commands/qa.ts` (`changeEvery ≤ 1.5` refuses)
- Test: `tests/agent/planGate.test.ts`, `tests/agent/videoGate.test.ts`

- [ ] **Step 1: Failing tests** — a camera key with `to` = an anchor named in the cue's sentence counts; a walk-follow or drift does not; a plan with 30% slide+slam time is refused `"text 30% of runtime (max 25%)"`; a 2.4-s gap is refused; gate-video refuses `changeEvery` 2.1 `"a new visual every 2.1 s (max 1.5 s)"`; **old v3 plan** (fixture copy) loads and reports only density/text problems, never a crash.
- [ ] **Step 2: Run** — FAIL. **Step 3:** implement. **Step 4:** `npx vitest run tests/agent` PASS. **Step 5: Commit** `feat(gates): show-every-line density, text share ≤ 25%, change rate ≤ 1.5 s`.

### Task 12: Director skill, catalog and taste for the living film

**Files:**
- Modify: `.claude/skills/capitalcode/SKILL.md`, `taste/capitalcode.md`, `agent/catalog.ts`
- Test: `tests/agent/catalog.test.ts` (new vignettes + fields listed)

- [ ] **Step 1: Failing test** — `catalogMarkdown` lists `crowd`, `grid`, `circles`, every metaphor id, and documents `camera`, `path`, `give`, `enter.zoomInto`, `world`.
- [ ] **Step 2: Run** — FAIL. **Step 3:** update catalog; rewrite skill §5 (beat-per-2–3-words planning: verb → character action, noun → object/camera, feeling → expression; zoom-into between related shots; worlds 70/30) and taste. **Step 4:** PASS. **Step 5: Commit** `docs(skill): plan living-film shots`.

### Task 13: Style bible v2

**Files:**
- Modify: `art/stylebible/Sheets.tsx`, `art/compositions.tsx`; script `agent/commands/stylebible.ts` (`cc stylebible` → `output/style-bible/`, old pages moved to `archive/`)
- Test: `tests/agent/cli.test.ts` (command registered)

- [ ] **Step 1–5:** pages: worlds, cast animation strip (walk frames, gesture strip, expression blends, hand-over), camera moves, metaphors, crowds/grids/circles, all scenes; render; eyeball; commit `feat: style bible v2`.

### Task 14: Remake the index-fund video and its Shorts

- [ ] **Step 1:** Re-plan `temp/jobs/20261024-1153_…/plan.json` (v4) with the skill: every sentence's beats, camera keys, walks, hand-overs, zoom-into links, worlds 70/30, slides ≤ 25%.
- [ ] **Step 2:** `cc gate-plan` until it passes; stills of all shots reviewed.
- [ ] **Step 3:** `cc run` (render ≤ 60 min, QA: brightness 20–35%, `changeEvery` ≤ 1.5 s, 0 flicker flags).
- [ ] **Step 4:** Critic rounds (max 2), `--final` if needed, package; `cc shorts` with written hooks.
- [ ] **Step 5:** Owner gets v1 / v3 / v4 side by side + new Shorts; record the owner's verdict with `cc learn`.
