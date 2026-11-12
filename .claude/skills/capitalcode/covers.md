# Covers — custom drawn thumbnails (owner rule 2026-11-08)

Every video (Short 1080×1920 `tall`, long 1920×1080 `wide`) gets 3 covers drawn just for it:
a well drawn scene, a hero whose expression fits the story, and big visible words. No fixed layout.

## How
1. Read the script. Write 3 **different concepts** (not one layout 3 times). Each = one picture that tells the story at a glance:
   a clash (you vs the bank), a surprise (tiny coin vs mountain), a before/after, a trap, a reveal.
2. Draw them in `art/covers/<topic>.tsx` with the kit (`kit.tsx`, `cast.tsx`, `words.tsx`); list them in `art/covers/index.ts`.
   `job` = the job folder name. Custom drawings go inside `<Part name kind x y w h>` so the gate can measure them.
3. `npx tsx agent/cli.ts cover <job>` → checks, then renders `<job>/covers/*.png`, `*_phone.png`, `sheet.png`.
   **Look at the sheet AND a phone copy.** Fix what reads badly, re-run. Then put `{ "cover": "<id>" }` ×3 in metadata.thumbnails.

## Design rules (what illustrated channels do)
- **One focal point.** The eye lands on the hero's face or the stake object first. Burst rays or a glow sit behind it.
- **Hero big.** Close-up or half-body; face ≥ 9 % of a tall cover's height, ≥ 17 % of a wide one. Real emotion
  (shocked, smug, worried, angry, smiling, thinking) — never neutral. Pose acts it out (holdUp, shock, despair, pointUp…).
- **Words state the point**, 2–6 words, readable alone ("EVERY SWIPE PAYS VISA", not "WAIT FOR IT"). One key word in the accent colour.
  Tall ≥ 110 px, wide ≥ 100 px. The words are part of the art — place and tilt them to fit the scene.
- **Clean frame.** 1–3 main objects, ≤ 7 parts in all, nothing piled up; things overlap only on purpose (`touches`, e.g. a card in hand).
- **No dead areas.** Each third of the frame carries part of the story.
- **Bright and saturated**, strong contrast between hero, object and background. Vary the palette per video.
- **Keep clear of YouTube's overlays:** Shorts — nothing key below y 1560 or at the right edge below y 1100; long — the bottom-right timestamp.
- **Every claim in the words must be true** and match the video's sourced facts.

## Learn
When the owner approves or rejects a cover, add one line below with why.

## Log
- 2026-11-08 visa-1 (first cover): close-up hero holding the card up, shocked; Visa toll booth with coins pouring out; road below.
- 2026-11-09 owner: words must make viewers curious, not state the obvious — 'EVERY SWIPE PAYS VISA' rejected → 'HOW VISA MAKES BILLIONS'.

## Owner feedback 2026-11-09 — Spotify cover "not bad but could improve a lot"
- Draw the story, not a symbol: show the money moving / splitting between who gets what, not a generic coin pile.
- The key object must be instantly recognisable and big (headphones, record, product) — no weak stand-ins like a phone with a ♪.
- The hero reacts TO the key object (looks / points at it); the reaction must have a target.
- Fill the centre with one strong scene; no empty middle.
- Words tease the twist (a number or a surprise from the sourced facts), not a copy of the title.

## Owner rule 2026-11-10 — cover TEXT (overrides earlier word advice)
- One complete, natural sentence that says what the video is about, simply, and makes viewers want to know.
- Good: "HOW BILLIONAIRES USE TRUST FUNDS TO BEAT THE SYSTEM", "WHERE MOST OF AMAZON'S PROFIT COMES FROM".
- Bad: clipped puzzles / fragments like "AMAZON'S PROFIT ISN'T THE STORE", "IT'S FREE. SO WHO PAYS?".
- Usually starts How / Why / Where / Who / What; up to ~10 words over 2–3 lines.

## Log 2026-11-10 — all 37 covers redone (v2) under the full-sentence rule
- Wide layout that works: words 3 lines top-right (x≈1380, y≈50–64, sizes 105–150); hero left (x≈300–420, feet 1310, scale 1.85); story scene in x 860–1700, y 480–960.
- `point` pose reaches ≈540 px right of the hero: keep objects right of x≈860 at hand height or the hand covers them.
- Words at y < ~50 trip the edge check; keep y ≥ 50.
- Tall layout: words 3 lines centred (x 540, y 80–150, sizes 110–150, ≤ 16–19 chars a line), scene y 700–1350, hero bottom-left.
- New drawings: Record, Headphones (draw.tsx). Money splits = big pile vs small pile + price tags (e.g. Spotify 68¢ / 32¢).
