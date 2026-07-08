---
name: linkedin-carousel
description: Generate a fully-branded LinkedIn carousel (1080×1080, 10 slides) following the sociyell viral framework — angle → flow → copy → visual translation → visual rhythm → swipe test. Maps a finished post into a per-variant slide set, exports numbered PNGs + a contact sheet via Puppeteer (over a local HTTP server), runs QA, and logs. Trigger on "carousel", "slides", "swipe post", "LinkedIn carousel", "design a deck", or when /post routes a draft to carousel media.
metadata:
  version: 3.0.0
---

# LinkedIn Carousel Design — Pipeline Skill

Turns a finished post into a branded 10-slide carousel. Content (the sociyell 6-step
framework, kk-carousel family selection, voice, copy, swipe test) is owned by the
`linkedin-carousel-creator` **agent**. This skill is the pipeline around it: get the copy,
put it in the template's copy source, export PNGs + a contact sheet, QA, log.

> **This file matches the template as it is today** (`Linkedin Carousel Design Template`,
> the per-variant Step Back system). It supersedes the old `CAROUSEL_DATA` data-layer
> approach — that template was replaced. Don't promise behavior that isn't built.

---

## Template location + how it's driven (read first)

```
references/template/Linkedin Carousel Design Template/index.html
```

A React + Babel canvas that renders many visual variants, each a 10-slide section.

**One array drives everything: `SLIDES`** at the top of `slides-stepback-all.jsx`. It's a
10-entry array (one per slide), and EVERY variant (sb-v1 … sb-v11) reads from it — the
helper arrays (`SB_BG/SB_EYE/SB_WORD/SB_ACCENT/SB_SHORT/SB_RICH`) are derived from `SLIDES`,
so there is exactly one place to edit. To regenerate the whole carousel for ANY post,
replace the 10 `SLIDES` entries (the skill fills them from the agent's `slide_spec`).

Per-slide schema (only `headline` is required; each layout uses the fields present and
falls back gracefully — these map onto the recurring kk-carousel slide shapes so any family
can be expressed):

- `bg` cream|paper|navy|mist · `eyebrow` · `word` (hero word or null) · `accent` (bool)
- `headline` (required) · `body` · `extra` · `short` (one-line for minimal variants) · `img` (kie.ai seed)
- `list: []` — mini-list (Family A) · `bars: [{label,sub}]` — self-test/signs/audit (the SAVE slide)
- `compare: {oldLabel,old,newLabel,new}` — before/after (Family F) · `tagged: [{text,tag}]` — framework rows / save line (C41–C50)
- `strike` + `alt` — reframe (Family D) · `cta: {pre,key}` — slide-10 CTA button

The full schema with comments lives at the top of `slides-stepback-all.jsx`. You can also
click any text in the browser to retype in-session (edits are session-only; editing
`SLIDES` is what persists).

Two hard truths:

1. **Serve over HTTP, not `file://`.** Babel-standalone fetches the `.jsx` by XHR; under
   `file://` the browser CORS-blocks them and the page renders blank. Always:
   ```bash
   cd "references/template/Linkedin Carousel Design Template" && python3 -m http.server 8765
   ```
   Point the export script at `http://localhost:8765/index.html`.

2. **Use the Step Back (`sb-*`) variants for real content.** The legacy `v1..v12` /`ex`
   entries still hold the old "structural irreplaceability" essay copy. The `sb-*` set is
   the one wired to the current Step Back copy.

### The Step Back variants (these are the live ones)

| Picker id | Name | Character |
|---|---|---|
| `sb-v1`  | V1 Original  | Key word as hero type, serif-italic support. The reference. |
| `sb-v2`  | V2 Bleed     | Word bleeds off the edge; copy anchors bottom. |
| `sb-v5`  | V5 Ruled     | 7 stave rules; full headline + body. |
| `sb-v6`  | V6 Numeral   | Watermark slide number; big headline + body. |
| `sb-v8`  | V8 Poster    | Centered stack: eyebrow → word → rule → headline → body. |
| `sb-v9`  | V9 Swiss Grid| 3-column; word + headline + body in column 2. |
| `sb-v10` | V10 Diagonal | 22° crossing rule; word above, copy below at angle. |
| `sb-v11` | V11 Overprint| Stroke + fill layered word; copy anchors bottom. |

(`ex` = a Step Back example in V12 Playful. Legacy `v1..v12` = old essay copy, ignore.)

### The 10 beats (locked structure, per design-notes.md)

```
01 hook → 02 tension → 03–07 value progression (5 micro-payloads) →
08 insight upgrade (the pro move) → 09 crystallised takeaway (the screenshot line) →
10 frictionless CTA
```

Image slots sit on **slides 2, 4, 6, 8, 10** (every other from slide 2; slide 1 is pure
type so the hook lands; slide 10 is the portrait/selfie). Slots are `<Img placeholder="…">`
inside `slides-stepback-all.jsx`; the placeholder text is the art direction.

---

## Inputs

1. **A finished post** (pasted or `.md`; from `/post`, the drafted body). If none, ask.
2. **Brand.** `sl` = Suan Ling (ink/clay on ivory, Caveat CTA mark). `lc` = Lumina Clarity
   (navy + terracotta on cream). Default `sl` for the owner.
3. **Output folder.** Default `daily-log/`. PNGs → `daily-log/export/<variant>/`; contact
   sheet → `daily-log/export/<variant>-contact-sheet.png`.

---

## Step 1 — Get the slide copy (kk-carousel + the agent)

Invoke `linkedin-carousel-creator` with the post and `output_format: slide_spec`. It picks
a kk-carousel structural family and returns 10 beats (role, on-slide copy, layout note,
visual note). This maps directly onto `SB_RICH` (word/headline/body/extra) + `SB_WORD` +
`SB_SHORT` + `SB_EYE`.

## Step 2 — SAVE-WORTHINESS (required)

A carousel earns saves through reference value — at least one slide a reader will want
back. Every deck MUST contain:
- **A self-test / checklist slide** the reader runs on themselves (the "three things"
  beat at slide 4 is the natural home).
- **A quotable slide** — one clean, screenshot-ready line (the slide-9 takeaway).
If the agent's spec lacks either, add it before writing the copy arrays. QA checks this.

## Step 3 — Put the copy in the template

Replace the 10 entries of the `SLIDES` array at the top of `slides-stepback-all.jsx` with
the agent's `slide_spec` (same field names). That single edit updates ALL variants. Keep
10 entries; only `headline` is required per slide; add the structured fields (`bars`,
`compare`, `tagged`, `list`, `strike`/`alt`, `cta`) where the beat calls for them. Ensure
one `bars` self-test slide and one `tagged`/quotable slide are present (save-worthiness).
Do not edit the derived helper arrays (they read from `SLIDES`).

## Step 4 — Background images (kie.ai), optional

Image directions live as `<Img placeholder="…">` strings on slides 2/4/6/8 (and the slide-10
portrait, which is a selfie, never AI). To generate:
- **API:** `https://api.kie.ai` · `POST /api/v1/jobs/createTask` → poll `GET /api/v1/jobs/recordInfo`.
- **Model:** `google/nano-banana` (override `KIE_MODEL`). API key: `KIE_API_KEY` env var.
- `scripts/generate-images.js` currently expects a `carousel-data.js` with prompts (the old
  flow). For this template, either pass the placeholder strings as prompts directly, or add
  a small prompts file. **If `KIE_API_KEY` is unset:** skip; the slots stay as clean
  placeholders. Tell the user they can set the key and re-run, or supply images.

## Step 5 — Serve over HTTP

```bash
cd "references/template/Linkedin Carousel Design Template" && python3 -m http.server 8765 &
```
Background it; kill it at the end. The user can open `http://localhost:8765/index.html` to
browse the `sb-*` variants and pick one.

## Step 6 — Export the chosen variant

```bash
node ".claude/skills/linkedin-carousel/scripts/export-png.js" \
  "http://localhost:8765/index.html" "daily-log/export/<variant>/" "<variant>"
# e.g. <variant> = sb-v1, sb-v8, sb-v9
```
The script forces the canvas to 1:1, screenshots each 1080×1080 slide at 2× (→ 2160px,
retina), names them `NN-<slug>.png`, **auto-purges stale-slug PNGs** from a prior run, and
**auto-writes `<variant>-contact-sheet.png`** (a 2-col grid of all 10). Review the contact
sheet — fastest way to catch a wrong/old slide.

If Puppeteer/Chromium is missing: `npm install puppeteer && npx puppeteer browsers install
chrome`. Don't auto-install without telling the user.

## Step 7 — QA gate

Run `/qa-gate` on the caption + all on-slide copy (voice + anti_ai always; compliance per
`config.json`). Carousel-specific checks on top:
- No em dashes in on-slide copy (placeholder/art-direction strings are exempt).
- No leftover legacy essay copy ("leverage code", "replaceable", "the wrong layer",
  "tool/skill/position", "LAYERS" keyword) rendering on any `sb-*` slide.
- Save-worthiness present: ≥1 self-test slide AND ≥1 quotable slide (Step 2).
- Mode 2 (financial) → mark the deck DRAFT-FOR-COMPLIANCE-REVIEW.

## Step 8 — Log

```
[YYYY-MM-DD HH:MM] carousel | <topic> | variant: <id> | <output path> | qa: <pass/hold>
```
Kill the HTTP server.

---

## Flow summary

1. Finished post → `linkedin-carousel-creator` → 10 beats (kk-carousel family).
2. Ensure a self-test slide + a quotable slide (saves).
3. Edit the `SB_*` copy arrays in `slides-stepback-all.jsx` for this post.
4. (Optional) kie.ai images for slides 2/4/6/8 if `KIE_API_KEY` is set.
5. Serve over HTTP.
6. `export-png.js` for an `sb-*` variant → PNGs + contact sheet (auto-cleaned).
7. `/qa-gate` + carousel-specific checks.
8. Log; stop the server.

## Trigger from `/post`

Input `brief` (drafted post body), `output_folder`, optional `brand`; return `png_paths`,
`contact_sheet_path`, `qa_result`.

## Files

- `scripts/export-png.js` — render + screenshot one variant; auto-clean; contact sheet.
  Works with any variant id in `app.jsx` (`sb-v1`, `v8`, `ex`, …).
- `scripts/generate-images.js` — kie.ai image gen (older data-layer flow; adapt prompts
  for this template, see Step 4).
- `references/template/Linkedin Carousel Design Template/` — the canvas.
  `slides-stepback-all.jsx` holds the `SB_*` copy arrays + variant components.
  `slide-frame.jsx` holds shared chrome (counter, swipe hint, brand mark, `Editable`).
  `design-notes.md` is the locked structure + design system of record.

## History / gotchas

- The folder was renamed from `Linkedin Carousel Template` → `Linkedin Carousel Design
  Template` and the copy approach moved from a `CAROUSEL_DATA` data file to centralized
  `SB_*` arrays. Any old path or `carousel-data.js` reference is stale.
- Legacy `v1..v12` variants still render the old essay; only `sb-*` carry current copy.
