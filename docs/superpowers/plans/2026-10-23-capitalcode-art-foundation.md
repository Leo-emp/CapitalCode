# CapitalCode Art Foundation (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the reusable CapitalCode art library (logo, jointed characters with expressions, ~30 scenes, ~60 props, infographic kit, thumbnail kit, SFX) and a rendered style bible for the owner to approve.

**Architecture:** A new `art/` library of React/SVG components rendered by Remotion, beside the untouched old Next.js app. Pure logic (poses, cue timing, registries, layout math, unique ids) is unit-tested with vitest; visual quality is checked by rendering stills and reviewing them by eye, then by the owner at the style-bible gate. The engine (Phase 2) gets its own plan after the gate, because it consumes this library's interfaces.

**Tech Stack:** TypeScript (strict), React 19, Remotion 4.0.506, vitest 4, ffmpeg (SFX), existing fonts in `public/fonts`.

**Spec:** `docs/superpowers/specs/2026-10-23-capitalcode-agent-design.md`

## Global Constraints

- 16:9 compositions are 1920×1080 @ 30 fps; thumbnails 1280×720.
- Dark Alux look: frames mostly dark (reference mean brightness ≈ 11%); accent = logo champagne; red/green only for losses/gains. No AI images, no paid art.
- Characters are **front-facing only**, built from the owner-approved `Man`/`ManPose` (spike/AluxSync.tsx). `spike/Rig.tsx` is the rejected 3/4 rig — never build on it.
- Every visual element that reacts to speech takes its start frame from a cue word via `cueFrame`.
- SVG `id`s (gradients, filters) must be unique per rendered instance.
- Do not modify or delete the old app (`src/`, `tests/` outside `tests/art/`, Next/Drizzle/Vercel config).
- Commits as Leo-emp <pmzo.mm08@gmail.com>, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. No secrets in code, logs or commits.
- Heavily commented code with `// #` comments (owner's learning style), matching the spike files.

## Review Focus

1. **SVG id collisions** — two characters or a character + scene in one frame sharing `id="grain"`/gradient ids render the wrong fills. Expect every instance to get unique ids (Task 1 `useUid`, used by every component; Task 3 test renders two characters to markup and asserts ids are distinct).
2. **Cue words that don't match the spoken text** — punctuation, apostrophes, case, numbers spoken as words ("$350k" vs "three hundred and fifty thousand"). Expect normalisation and a clear error naming the missing cue and the nearest words, never a silent frame 0 (Task 1 tests).
3. **Text overflow at small sizes** — long words in thumbnails/infographics overflowing their box. Expect `fitText` to shrink to fit and report when even the minimum size overflows (Task 9 tests).
4. **Pose blending edge cases** — switching hand shapes mid-blend, angles of opposite sign, pose tracks with keys out of order or before frame 0. Expect deterministic, sorted, clamped blending (Task 3 tests).
5. **Render cost** — heavy SVG filters (grain, blur) on every element making 10-minute renders impractical. Expect a measured per-frame budget: the style-bible demo (Task 11) records ms/frame and the plan's acceptance is ≤ 400 ms/frame on this PC.

---

## File Structure

```
art/
  tokens.ts              # palette, fonts, motion constants
  timing.ts              # Word type, normaliseWord, cueFrame
  uid.ts                 # useUid(prefix) unique SVG ids
  Grain.tsx Vignette.tsx # shared overlays
  logo/Emblem.tsx  logo/Wordmark.tsx  logo/LogoReveal.tsx
  rig/pose.ts            # Pose types, POSES, mixPose, poseAt (pure)
  rig/faces.tsx          # Face component, EXPRESSIONS
  rig/looks.ts           # HERO + supporting looks
  rig/Character.tsx      # full-body front-facing jointed character
  props/registry.ts props/*.tsx     # ~60 props
  scenes/registry.ts scenes/*.tsx   # ~30 scenes with layers + anchors
  infographics/*.tsx  infographics/layout.ts
  thumbnails/Thumbnail.tsx thumbnails/fitText.ts
  stylebible/StyleBible.tsx  stylebible/Demo.tsx
  index.tsx              # Remotion entry registering art compositions
scripts/make-sfx.sh      # code-generated SFX → public/sfx/cc/
scripts/render-style-bible.mts
tests/art/*.test.ts(x)
```

Registries share one shape so the engine can query them:

```ts
export type ArtEntry<P> = { id: string; tags: string[]; title: string; Component: React.FC<P> }
```

---

### Task 1: Foundations — tokens, cue timing, unique ids, overlays, entry

**Files:** Create `art/tokens.ts`, `art/timing.ts`, `art/uid.ts`, `art/Grain.tsx`, `art/Vignette.tsx`, `art/index.tsx`; Test `tests/art/timing.test.ts`, `tests/art/uid.test.tsx`.

**Interfaces:**
- Produces: `type Word = { w: string; s: number; e: number }`; `normaliseWord(w: string): string`; `cueFrame(words: Word[], word: string, nth?: number, fps?: number): number`; `useUid(prefix: string): string`; `TOKENS` (colours incl. `champagne`, `champagneLight`, `red`, `green`, `bg`, `text`, `dim`; fonts; `FPS = 30`); `<Grain id/>`, `<Vignette/>`.

- [ ] **Step 1: Write failing tests**

```ts
// tests/art/timing.test.ts
const W = [{ w: 'Buyers', s: 2.74, e: 3.2 }, { w: "don't.", s: 3.27, e: 3.6 }, { w: 'three', s: 5.68, e: 5.9 }, { w: 'three', s: 9.53, e: 9.8 }]
test('normalises case and punctuation', () => expect(normaliseWord("Don't.")).toBe("don't"))
test('cue frame of first match', () => expect(cueFrame(W, 'buyers')).toBe(82))
test('nth occurrence', () => expect(cueFrame(W, 'three', 2)).toBe(286))
test('missing cue names nearby words', () => expect(() => cueFrame(W, 'sellers')).toThrow(/sellers.*buyers/i))
// tests/art/uid.test.tsx — two components using useUid('grain') render different ids (renderToStaticMarkup)
```

- [ ] **Step 2:** Run `npx vitest run tests/art` → Expected: FAIL (modules missing).
- [ ] **Step 3:** Implement. `cueFrame` = `Math.round(s * fps)` of the nth normalised match; the error lists the 3 closest words by edit distance. `useUid` uses React `useId()` sanitised for SVG (`:` removed). Champagne sampled from the owner's logo PNG (`Downloads/CapitalCode Metallic Finance Emblem.png`) — record the hexes in `tokens.ts`. `art/index.tsx` calls `registerRoot` with an empty composition list for now.
- [ ] **Step 4:** Run `npx vitest run tests/art` → Expected: PASS.
- [ ] **Step 5:** Commit `feat(art): tokens, cue timing, unique ids, overlays`.

### Task 2: Logo — vector emblem, wordmark, reveal animation

**Files:** Create `art/logo/Emblem.tsx`, `art/logo/Wordmark.tsx`, `art/logo/LogoReveal.tsx`; register `LogoReveal` (3 s) and `LogoStill` in `art/index.tsx`; Test `tests/art/logo.test.tsx`.

**Interfaces:** Produces `<Emblem size={number} id?/>` (square, transparent), `<Wordmark height={number} tagline?: boolean/>`, `<LogoReveal/>` (bars rise, slash swipes, wordmark fades in).

- [ ] **Step 1:** Failing test: `Emblem` markup contains a `linearGradient` with the champagne stops and uses unique ids when rendered twice.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Draw the C-with-rising-bars emblem and serif wordmark (Georgia/serif fallback stack; metallic via multi-stop champagne gradient + highlight band) to match the owner's PNG.
- [ ] **Step 4:** Run tests → PASS. Render `npx remotion still art/index.tsx LogoStill output/style-bible/logo.png --port=3177`; compare side by side with the PNG at 1:1 and at 40 px; fix until shapes match.
- [ ] **Step 5:** Commit `feat(art): vector CapitalCode logo + reveal`.

### Task 3: Rig — poses and full-body front-facing character

**Files:** Create `art/rig/pose.ts`, `art/rig/Character.tsx`; Test `tests/art/pose.test.ts`, `tests/art/character.test.tsx`.

**Interfaces:**
- Produces: `type ArmPose = { sh: number; el: number; up: number; fo: number; hand: HandShape }`, `type LegPose = { hip: number; knee: number }`, `type Pose = { r: ArmPose; l: ArmPose; rl: LegPose; ll: LegPose; head: number; lean: number; bob: number; expression: ExpressionId }`; `POSES: Record<PoseId, Pose>` with `idle, think, point, shrug, present, type, walkA, walkB, celebrate, facepalm, armsCrossed, hold, sit`; `mixPose(a, b, t)`; `poseAt(frame, fps, track: [number, PoseId][])`; `<Character pose look id? scale?/>` origin at feet centre.

- [ ] **Step 1:** Failing tests: `mixPose(a,b,0)` equals a, `(…,1)` equals b; hand shape and expression switch at t ≥ 0.5; `poseAt` sorts keys, returns first pose before the first key, blends with spring after each key; two `<Character>`s in one markup have distinct gradient ids.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Port `Man`/`ManPose`/`ManArm` from `spike/AluxSync.tsx` (same look: round head, glasses, jacket, tie) and add jointed legs (front view: hip swing ±, knee bend, foot) for `walkA/walkB/celebrate/sit`. Hand shapes: `rest, chin, point, fist, open, hold`. Expression slot delegates to Task 4 (temporary neutral face).
- [ ] **Step 4:** Tests → PASS. Render a pose strip still (all 13 poses) → review by eye: proportions as v5, no weird joints; fix.
- [ ] **Step 5:** Commit `feat(art): jointed full-body character + 13 poses`.

### Task 4: Faces — expressions

**Files:** Create `art/rig/faces.tsx`; wire into `Character`; Test `tests/art/faces.test.tsx`.

**Interfaces:** `type ExpressionId = 'neutral'|'thinking'|'shocked'|'worried'|'smiling'|'smug'|'angry'`; `EXPRESSIONS: ExpressionId[]`; `<Face expression blink?: number/>` drawn within the existing dark head (brows + mouth + eye glint; glasses stay).

- [ ] **Step 1:** Failing test: every `ExpressionId` renders and produces different markup from `neutral`.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement (brows/mouth paths; readable at thumbnail size — shocked = round open mouth + raised brows). **Step 4:** PASS; render an expression strip at 1× and at thumbnail scale; check they read at 168×94. **Step 5:** Commit `feat(art): facial expressions`.

### Task 5: Looks — hero and supporting characters

**Files:** Create `art/rig/looks.ts`; Test `tests/art/looks.test.ts`.

**Interfaces:** `type Look = { jacket: [string,string,string]; shirt: string; tie: string; pants: [string,string]; skin: [string,string]; hair: 'short'|'bald'|'long'|'cap'; glasses: boolean; accessory?: 'apron'|'hardhat'|'none' }`; `LOOKS: { hero, buyer, investor, worker }`.

- [ ] Steps: failing test (4 looks, hero matches the approved colours from the spike, all looks distinct) → FAIL → implement + extend `Character` for hair/apron/hardhat → PASS → render line-up still → commit `feat(art): hero + supporting looks`.

### Task 6: Props — ~60 in three batches

**Files:** Create `art/props/registry.ts` + one file per family (`money.tsx`, `business.tsx`, `tech.tsx`, `drama.tsx`); Test `tests/art/props.test.tsx`.

**Interfaces:** `type PropProps = { size: number; enter?: number /*frame*/; idle?: boolean }`; `PROPS: ArtEntry<PropProps>[]`; `getProp(id)`; `findProps(tag)`.

Batches (≈20 each):
- **Money:** cash stack, banknote, coin, coin stack, gold bar, credit card, wallet, piggy bank, safe/vault door, cheque/contract, receipt, price tag, calculator, bank building, dollar sign, euro/pound signs, tax form, briefcase, money bag, ATM.
- **Business & world:** house, car, shop front mini, factory, chimney smoke, shipping container, truck, crane, globe, map pin, chart board, laptop, phone, newspaper, handshake, gavel, magnifier, clock, calendar, trophy.
- **Tech, crypto & drama:** Bitcoin coin, generic crypto coin, blockchain cubes, AI chip, robot head, server rack, cloud, lock, shield, warning sign, rising arrow, crashing arrow, fire, smoke, cracks, lightning, explosion burst, question mark, exclamation, red X / green tick.

- [ ] **Step 1:** Failing tests: ≥ 60 entries; unique ids; every entry has ≥ 1 tag and a title; every component renders at size 200 without throwing; `findProps('money')` non-empty.
- [ ] **Step 2:** FAIL. **Step 3:** Draw each batch in the house style (grain, rim light, champagne/blue/pink palette, entry pop + idle wobble/flicker). Real company logos are not drawn. **Step 4:** PASS after each batch; render a 6×N contact sheet per batch and review by eye; redraw weak ones. **Step 5:** Commit per batch `feat(art): props — <batch>`.

### Task 7: Scenes — ~30 in three batches

**Files:** Create `art/scenes/registry.ts` + one file per scene group; Test `tests/art/scenes.test.tsx`.

**Interfaces:**
```ts
type Anchor = { x: number; y: number; scale: number; layer: 'back'|'mid'|'front' }
type SceneProps = { variant?: string; lightsOn?: number; t?: number /*0..1 drift*/ }
type SceneEntry = ArtEntry<SceneProps> & { anchors: Record<string, Anchor> /* 'stand','sit','counter','prop1'… */ }
SCENES: SceneEntry[]; getScene(id); findScenes(tag)
```

Batches:
- **A (street & money):** shop street at night (port the owner-approved brick shop + night city), bank interior, vault, ATM street, mansion, supermarket aisle, city skyline, home living room, kitchen table bills, empty void (thumbnail).
- **B (work & industry):** office, trading desk, meeting room, startup garage, factory floor, warehouse, construction site, port/containers, stock-exchange floor, courtroom.
- **C (tech, news, world):** server room, crypto mining room, phone-screen frame, laptop-screen frame, newspaper desk, parliament, airport, map backdrop, laboratory/AI lab, podium/stage.

- [ ] **Step 1:** Failing tests: ≥ 30 scenes; unique ids; every scene has `stand` anchor and ≥ 1 prop anchor; anchors inside 0..1920 × 0..1080; every scene renders with `t=0` and `t=1`.
- [ ] **Step 2:** FAIL. **Step 3:** Draw each batch: 3 layers for parallax, built-in ambient motion (lights flicker, screens glow, plants sway), dark base with lit focal area. **Step 4:** PASS per batch; render a contact sheet with the hero placed at `stand`; review by eye against the approved first-sample shop; fix. **Step 5:** Commit per batch `feat(art): scenes — <batch>`.

### Task 8: Infographic kit

**Files:** Create `art/infographics/layout.ts` + `NumberBuild.tsx, Equation.tsx, BarChart.tsx, LineChart.tsx, AreaChart.tsx, StackedBar.tsx, FlowDiagram.tsx, Timeline.tsx, CompareCards.tsx, MapHighlight.tsx, QuoteCard.tsx, ChapterCard.tsx, KeywordSlam.tsx, SlideFrame.tsx`; Test `tests/art/layout.test.ts`.

**Interfaces:** every component takes data + `cues: number[]` (frames, from `cueFrame`) for each build step, e.g. `<Equation parts={[{text:'$350k',label:'PROFIT PER YEAR'},{op:'× 3'},{text:'$1.05m',label:'SALE PRICE',tone:'green'}]} cues={[a,b,c]}/>`. `layout.ts`: `niceTicks(min,max,count)`, `scaleLinear(domain,range)`, `formatMoney(v,{compact})` → `$350k`, `$1.05m`, `$8B`.

- [ ] **Step 1:** Failing tests: `formatMoney(350000,{compact:true})='$350k'`, `formatMoney(1050000,…)='$1.05m'`, `formatMoney(8e9,…)='$8B'`; `niceTicks(0,69,5)` → `[0,20,40,60,80]`; `scaleLinear` maps endpoints exactly.
- [ ] **Step 2:** FAIL. **Step 3:** Implement components in the reference style (SlideFrame: small heading top-left + short accent rule, generous space). **Step 4:** PASS; render one still per component; review. **Step 5:** Commit `feat(art): infographic kit`.

### Task 9: Thumbnail kit

**Files:** Create `art/thumbnails/fitText.ts`, `art/thumbnails/Thumbnail.tsx`; register `Thumb` (1280×720) with input props; Test `tests/art/fitText.test.ts`.

**Interfaces:** `fitText(text, box:{w,h}, font:{family,weight,min,max}, measure)` → `{size, lines, overflow}`; `<Thumbnail layout:'hero-left'|'object-center'|'split' words:string[] accentWord?:number character?:{pose,expression,look} prop?:string scene?:string bright?:boolean/>` with emblem badge fixed bottom-left.

- [ ] **Step 1:** Failing tests: 3 short words fit at max size; a 30-character word shrinks; an impossible text returns `overflow:true` at `min` (uses a fake fixed-width `measure`).
- [ ] **Step 2:** FAIL. **Step 3:** Implement layouts per spec §10 (one big emotional subject, 2–4 condensed words, stake element, rim glow, dark + bright variant, badge). **Step 4:** PASS; render 6 sample thumbnails for the test story (3 dark, 3 bright) at 1280×720 and shrunk to 168×94; check readability. **Step 5:** Commit `feat(art): thumbnail kit`.

### Task 10: Sound effects

**Files:** Create `scripts/make-sfx.sh` → `public/sfx/cc/{whoosh,swish,tick,pop,impact,riser,cash,glitch,thud,ding}.wav`; Test `tests/art/sfx.test.ts`.

- [ ] Steps: failing test (all 10 files exist, each 0.03–3 s, peak ≤ −1 dBFS via `ffprobe`) → FAIL → write ffmpeg recipes (extend the spike's whoosh/tick/impact/drone/swish) → run script → PASS → commit `feat(art): code-generated SFX set`.

### Task 11: Style bible + library demo

**Files:** Create `art/stylebible/StyleBible.tsx` (pages: logo, characters × expressions, poses, looks, props sheets, scenes sheets, infographics, thumbnails), `art/stylebible/Demo.tsx`, `scripts/render-style-bible.mts`.

**Interfaces:** consumes all registries. `Demo` rebuilds the owner-approved 17-second sample (shop scene, hero think/point/shrug, BUYERS DON'T., equation slide, burning deal) **from the library only**, driven by the Andrew HD word timings (`public/spike/voice_andrew_hd_final2.wav` + its words) via `cueFrame`.

- [ ] **Step 1:** `npx tsx scripts/render-style-bible.mts` renders every page to `output/style-bible/page_NN.png` and the demo to `output/style-bible/demo.mp4`, printing ms/frame.
- [ ] **Step 2:** Review every page by eye (nothing cropped, overlapping, weird; consistent palette; text readable). Fix and re-render until clean.
- [ ] **Step 3:** Expected: demo ≤ 400 ms/frame; all `npx vitest run tests/art` PASS; old suite unchanged (`npm test` result equal to the baseline recorded before Task 1).
- [ ] **Step 4:** Commit `feat(art): style bible + library demo`.

### Task 12: Owner gate

- [ ] Present the style-bible pages and demo to the owner (open the files). Record approval or the requested changes in the ledger. Phase 2 (engine plan) starts only after approval.
