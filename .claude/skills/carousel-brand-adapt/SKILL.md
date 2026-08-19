---
name: carousel-brand-adapt
justification: did this by hand twice on 2026-08-18 — first building Incrova's five-template system from three reference PDFs, then re-clothing the same system in va-workspace's brand for the LinkedIn carousel amendment
review: 2027-02-28
description: Build a client's anti-slop carousel DESIGN SYSTEM from uploaded carousel references plus their brand colours and fonts. Produces five named templates (teach / announce / tip-run / story / hard truths), rotation rules, image prompt recipes, and the truth gate — all restricted to the client's kit. This creates the system a new brand's decks are rendered in; to fill and export a deck inside an EXISTING system, use linkedin-carousel instead. Use when someone says "adapt the carousel system for [client]", "build carousel templates from these references", "set up a new brand's carousel design", or uploads carousel PDFs/screenshots with a brand kit.
---

# /carousel-brand-adapt — a client's carousel system from references + brand kit

Turn carousel references the client admires plus their brand kit into a template system
they own: distinct constructions, one kit, rotation rules, and the gates that keep the
output from reading as AI-made.

The parent system this adapts is recorded in
`AI Control Centre/docs/specs/2026-08-18-incrova-template-system.md` (the worked example)
and `pending-amendments/2026-08-18-carousel-design-anti-slop.md` (the va-workspace
transfer). Read the spec before the first run; it holds the reasoning.

## Inputs — collect before building anything

1. **References** — 2–5 carousels the client would be proud to have made. PDFs or
   screenshots, every slide. Read every page (Read tool handles PDFs). No references,
   no run: ask for them. The references supply *construction*; nothing else transfers.
2. **Brand kit** — their real colours (hex) and typefaces. If they have no kit, propose
   one — exactly 4 colour roles (ground / text / accent / signal) and at most 3 faces
   (working, display, handwriting) — and mark it "proposed, overrule me". If the client's
   kit has no handwriting face, do NOT import one: the hand-drawn layer becomes drawn
   SVG only (arrows, circles, underlines), or propose adding a script face and let the
   owner decide.
3. **The audience and the platform** — one real person the content is for, and where it
   ships (Instagram 1080×1350, LinkedIn 1080×1080). The platform sets the canvas; the
   audience feeds the design read.
4. **Check for an existing system first.** If the client already has one (e.g. Lumina
   Clarity IS the existing `Linkedin Carousel Design Template`), this skill amends it via
   `/amend-sop`, never builds a duplicate beside it.

## The workflow — propose, confirm, build, wire

This is an interactive workflow with a hard stop in the middle. Do not build the full
system before the owner has seen and confirmed the template proposals.

### Phase 1 — Study the references (vocabulary, not templates)
For each reference, name what makes it feel human: where type sits relative to the photo,
what the hand-drawn layer is (arrows, circles, script), what the texture is, where it
breaks its own grid, what mixes registers. Steal the vocabulary. Never clone the
reference — popular Canva templates ARE slop at the account level because thousands of
accounts ship the same file.

**Sufficiency check:** five templates need five distinct constructions. If the references
supply fewer — they are all one style, or there are too few — say exactly what is
missing ("all three references are paper-editorial; I have no photo-led construction")
and **ask for more references before proposing**. Do not pad the proposal with
constructions invented from nothing.

### Phase 2 — Define the kit (the constraint layer)
Write it down before designing: the 4 colour roles, the ≤3 faces, canvas + margins
(≥8% of canvas width per side), the fixed elements. Fixed-element positions defer to the
platform template's locked conventions (this workspace: counter top-right, mark
bottom-left, per the existing design-notes) — don't invent new positions per client.

### Phase 3 — PROPOSE five templates, then STOP for confirmation
Render five template proposals — a cover each, all showing roughly the same message so
they compare fairly — and show them to the owner (contact sheet or served HTML page).
The five jobs: **teach** (workhorse), **announce** (interruptor), **tip-run**
(photography + progress marker), **story** (first person, inset photos), **hard truths**
(the workhorse inverted to its dark ground). Each proposal = one construction from the
references, re-clothed in the kit.

Then wait. The owner may confirm all five, swap some ("keep the dry-run look + A + B"),
reject the set ("I mean different designs"), or add references — all of which happened in
the worked sessions this skill comes from. Iterate the proposals until confirmed.
**No full build before confirmation.**

### Phase 4 — Build the confirmed templates
For each confirmed template: cover + interior samples, its own image recipe, and the
constraints that always hold:
- **The human layer**: exactly one hand-drawn mark per slide (accent colour, rotated
  1–3°, live SVG/type — never baked into an image), texture on every ground, one
  off-grid moment per slide in a different place each time. Perfect symmetry is a tell.
- **Each template owns its accent behaviour.** Crossing accents between templates is how
  the system blurs.
- Weight: the teach template carries half the feed; the announce template stays rare.
- **Rotation rules:** content picks the template, not mood; no template twice in a row;
  define the one allowed cross-template move (hard truths → teach) and require it to
  carry meaning.
- **Image recipe per template:** subject + real place + named light source + lens +
  material imperfections + empty space for type; positive phrasing; **no text inside any
  generated image, ever**; one light per template (lamp-lit / golden hour / airy /
  overcast). Generation route from this Mac: KIE API + `google/nano-banana` — see the
  Agent-wiki page `work/kie-nano-banana-image-generation.md`.

### Phase 5 — Wire into the design system (so linkedin-carousel can trigger it)
The build is not done until `linkedin-carousel` can render the new system with zero
pipeline changes:
1. Write each template as a variant component file reading the shared `SLIDES` array
   (schema in `slides-stepback-all.jsx`), routing slides by content before ground.
2. Register it: `<script type="text/babel" src="slides-<client>.jsx">` in `index.html`
   (before `app.jsx`), plus a `VARIANT_META` entry in `app.jsx` with a distinct id
   (e.g. `hx-v1`) — that id is what `linkedin-carousel`'s export step takes.
3. Add the client's fonts to `index.html` (Google Fonts link) with fallbacks.
4. Prove it: serve over HTTP, run the skill's `export-png.js` on the new variant id,
   and **look at the contact sheet** before calling it done.
5. Record the variant id and bg-token mapping in the client's design-notes so a future
   `linkedin-carousel` run knows what to target.

### The gates — ship with the system, run before every deck
- **Design read**, one line, before building: "Reading this as: [template] for [one real
  person], [palette]."
- **Truth gate** (before qa-gate): no statistic without a nameable source; no invented
  proof — an omitted slide beats a fabricated one; no three equally-weighted slides in a
  row — the strongest idea gets the most room.
- **Slop gate**: no baked-in text, no purple-default gradients, no three-equal-boxes, no
  emoji-as-icons, no decoration doing no work; review the deck in order at phone size;
  the kill test — swap in another brand's logo, and if nothing looks wrong, rebuild.

## Output — one system per client

`references/template/<client>-carousel-system/` holds `design-notes.md` (kit, confirmed
templates, rotation rules, image recipes, gates, variant ids + bg-token mapping) and the
variant JSX files wired per Phase 5.

Division of labour: **this skill designs and wires the system once per brand;
`linkedin-carousel` fills and ships decks inside it** (its export step targets the
variant id from Phase 5). Content (angle, flow, copy) stays with the
`linkedin-carousel-creator` agent either way. The `img` seed field already routes to
kie.ai — reuse it, don't add a second image path.

Hard-won gotchas (from the 2026-08-18 Halcyon dry run — worked example in that session's
scratchpad):
- Map the client's grounds onto the fixed `bg` tokens (`cream/paper/navy/mist`);
  the token vocabulary is fixed, the mapping is per client.
- Route slides by content before ground: a slide carrying `bars`/`compare`/`tagged` must
  go to a layout that renders those fields, or the deck's save-worthiness slide silently
  disappears.
- Slide root divs need `boxSizing:'border-box'` — without it the artboard silently crops
  the right edge (counters and footers vanish; left-aligned content hides the bug).
- Dry runs and tests write to the session scratchpad, never into `references/`.

Do not touch any SOP master; system-level rule changes go through `/amend-sop`.

## Compliance

This workspace's rules still bind: truth gate feeds `references/iafa-compliance.md`
(an unsourced number is a Mode 2 risk, not just a slop risk), and `qa-gate` runs after
these gates, never instead of them.
