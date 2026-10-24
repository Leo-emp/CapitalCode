# CapitalCode "Diorama" Style — Design

Date: 2026-10-25 · Owner: Leo-emp · Status: approved in chat (proof first)
Replaces the shot approach of `2026-10-24-capitalcode-living-film-design.md` for most shots (that engine — camera,
rig life, gestures, walks, hand-over, kinetic text, gates — stays and is reused).

## 1. Why
The owner watched the living-film v4 video and did not like it: "sometimes it doesnt match what its saying", "it feels
like we use pre generated fixed images and do a bit of annimations and add some related stickers", "i dont see much
difference from old version". Owner: "study this video. I want like that continuous illustration that transforms"
(Kurzgesagt, *Banking Explained – Money and Credit*). Then: "that style but we can still use our charaters",
"make it feel like high end brand with premium UI illustrations", "use sound effects in relevant illustrations",
"just match the reference video style. but everything must be clean and polished and coherent".

## 2. What the reference does (studied frame by frame, 2026-10-25)
- **No rooms, no presenter.** Shots are a few objects on a plain soft background (light vignette): a vault, a bank on
  an island, coins, a card house. Rooms are rare.
- **Built on the words.** Elements appear one by one in sync: buildings pop up until they fill the screen, coins
  drop in one at a time, an island assembles, icons orbit the Earth one by one.
- **Objects act out the idea.** Coins painted gold by a brush; a money pile grows like a mountain then burns; card
  houses stacked on a see-saw collapse; a bank on springs, then lifted by balloons; cards become a credit card.
- **Camera reveals scale.** Zoom out from a few buildings to an endless city; fly into the vault door to the gears.
- **Transitions are drawn.** Ribbon/stripe wipes, zig-zag paper wipes, flip, split into 3–6 panels each with its own
  small animation.
- **People are small and simple** (on round pedestals with coin stacks, or just hands acting); faces only in close-ups.
- **Text is rare**, typed word by word for key numbers only.
- **A colour per idea** (each scene its own background colour).

## 3. Decisions
| Area | Decision |
|---|---|
| Style | Match the reference: continuous, transforming object illustrations (owner) |
| Characters | Ours, used the reference way: mini figures on pedestals, full figures acting with objects, close-ups for emotion, hands acting (owner) |
| Feel | High-end brand: clean, polished, coherent — generous space, one focus at a time, refined surfaces (soft gradients, soft shadows, gentle highlights), premium eased motion with a small overshoot and settle (owner) |
| Colours | Ours: deep navy / teal base, bright solid objects; champagne the luxury accent; sky blue, coral for meaning; green/red only for gains/losses; a background tint per idea within that family (Claude's call, keeps "colours ours") |
| App/UI elements | Only where a line is about one (a card payment, a balance); never decoration (owner: "just match the reference") |
| Sound | A subtle, matched sound on every meaningful action (pop, coin clink, flutter, whoosh, crack, crackle, tick, chime), always under the voice (owner) |
| Rooms | Kept for lines that are truly about a place; most shots are dioramas |
| Text | Key numbers/terms only, typed as spoken |
| Process | A 30-second proof (the hook, s1–s8) before converting the whole video (agreed in chat) |

## 4. Success test
With the sound off, a viewer can roughly follow the story from the pictures alone; with it on, every picture matches
the words being said at that moment. Nothing looks templated or like stickers on a backdrop.

## 5. Proof (built first)
The index-fund hook, s1–s8 (0–33 s), with the real voice:
- s1 "$100 into an S&P 500 index fund" — the hero's hand drops a $100 bill into a big S&P 500 box.
- s2 "a tiny slice of 500 different companies" — the bill splits into slivers that fly out to company buildings that
  pop up until they fill the screen (camera pulls back).
- s3 "almost 38 dollars … to just 10 of them" — a thick stream of slivers swerves into 10 giant towers; the rest trickle.
- s4 "One company … more than 7 dollars 50" — camera flies to one tower that swallows a pile and grows tallest.
- s5 "the other 490 … about 13 cents" — pull back; 490 tiny buildings each catch a crumb (count 13¢).
- s6 "sold to you as the safe, spread-out choice … one of the most concentrated bets" — a calm safe-looking shield
  over the spread city; it cracks as the city tips toward the 10 towers.
- s7–s8 "not automatically bad … not what most people think they own" — the hero (close-up) shrugs, then looks at
  the tilted city, thinking.
Sound on every action. Rendered and reviewed before anything else is converted.

## 6. Left to the builder
How dioramas are expressed in plan.json (a new shot kind with items + cued actions), the primitive set, easing
curves, synthesized vs downloaded SFX, and how far rooms are reused.
