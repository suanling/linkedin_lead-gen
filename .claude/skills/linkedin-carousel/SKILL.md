---
name: linkedin-carousel
description: Generate a fully-branded LinkedIn carousel (1080×1080, 10 slides) following the sociyell viral framework — angle → flow → copy → visual translation → visual rhythm → swipe test. Populates the branded HTML template in references/template/, user picks a visual variant, exports numbered PNGs via Puppeteer (or Canva MCP fallback), runs QA, and logs. Trigger on "carousel", "slides", "swipe post", "LinkedIn carousel", "design a deck", or when /post routes a draft to carousel media.
metadata:
  version: 1.4.0
---

# LinkedIn Carousel Design — Pipeline Skill

This skill is a **pipeline wrapper**. Content generation (the sociyell 6-step framework, kk-carousel template selection, voice, copy refinement, swipe test) is owned entirely by the `linkedin-carousel-creator` **agent**. This skill invokes that agent, then populates the branded HTML template, the user picks a visual variant, Puppeteer exports that variant's slides, QA runs, and it logs.

---

## Three-Layer Architecture

```
kk-carousel.md (100 templates, 12 families)
  ↓ agent reads → picks structural family + slide beats
linkedin-carousel-creator (agent) — sociyell 6-step, voice, copy, swipe test
  ↓ returns structured 10-slide spec
/linkedin-carousel (this skill) — pipeline wrapper
  ↓ populate Editable slots → user picks variant → export PNGs → QA → log
```

---

## Template Location

```
references/template/Linkedin Carousel Template/index.html
```

This is a React + Babel design canvas that renders **all 10 visual variants simultaneously**, each as a full 10-slide section. Supporting files (do not move):

- `design-system/colors_and_type.css` — full token system (Lumina Clarity + Suan Ling palettes)
- `slides-bold.jsx` — V1 Original
- `slides-variants-a.jsx` — V2 Bleed, V5 Ruled, V6 Numeral, V7 Max Reduce
- `slides-variants-b.jsx` — V8 Poster, V9 Swiss Grid, V10 Diagonal
- `slides-variants-c.jsx` — V11 Overprint
- `slides-v12-playful.jsx` — V12 Playful
- `image-slot.js` — image placeholder web component

### The 10 visual variants

| ID | Name | Character |
|---|---|---|
| V1 | Original | Strikethrough hook, 3-tier color-block. The reference. |
| V2 | Bleed | Type cropped at slide edges. The cut is the composition. |
| V5 | Ruled | 7 horizontal rules at 132px — ledger/stave. Type interrupts. |
| V6 | Numeral | Slide counter at 660px / 7% opacity as texture. |
| V7 | Max Reduce | 1–3 words at absolute max scale. Space is the statement. |
| V8 | Poster | Centered vertical stack. Fight-card hierarchy. |
| V9 | Swiss Grid | 3-col: index / content / aside. Visible vertical rules. |
| V10 | Diagonal | 22° rule crosses each slide. Kinetic energy. |
| V11 | Overprint | Stroke-only outline behind solid fill. Print-inspired. |
| V12 | Playful | Grid bg, number badges, ALL CAPS chips, bold labels. |

All variants share the **same 10-slide copy** — the content is populated once; the visual treatment differs.

### The 10 slide roles (fixed across all variants)

```
01 hook → 02 tension → 03 do→see → 04 three layers → 05 owned →
06 wrong layer → 07 the tell → 08 pro move → 09 screenshot → 10 cta
```

---

## Inputs

1. **Brief.** Pasted text OR a path to a `.md` file.
   - If no brief is given, ask before proceeding.

2. **Output folder.** Default: `daily-log/`. PNGs land in `<output-folder>/export/<variant-id>/`.

---

## Step 1 — Invoke `linkedin-carousel-creator` Agent

Pass to the agent:
- The brief
- `output_format: slide_spec`

The agent returns:
```
caption: <string>
chosen_template_family: <string>
slides:
  - number: 1
    role: "Hook — stop scroll"
    copy: "<exact on-slide text>"
    layout_type: "Bold minimal"
    visual_note: "<brief design direction>"
    data_slug: "hook-stop-scroll"
  - ...
  - number: 10
    data_slug: "cta"
```

---

## Step 2 — Generate Background Images (kie.ai)

Slides 4 (three layers) and 7 (the tell) use photo-background overlay layouts in some variants. Generate images before opening the browser so they're ready to inline.

**API:** `https://api.kie.ai`
**Model:** `nano-banana-2`
**API key:** `KIE_API_KEY` environment variable — never hardcode

Run:
```bash
node scripts/generate-images.js "<slide4 visual_note from agent spec>" "<slide7 visual_note from agent spec>" "<output-folder>"
```

This writes `<output-folder>/slide-04-bg.png`, `<output-folder>/slide-07-bg.png`, and `<output-folder>/images.json`.

**If `KIE_API_KEY` is not set:** skip, leave `image-slot` placeholders, and tell the user:
> "Slides 4 and 7 need background images. Set `KIE_API_KEY` in your environment or paste image URLs and I'll inline them."

---

## Step 3 — Populate the Editable Slots

The template JSX files use `<Editable>` components with default placeholder text. The skill's job is to **inject the agent's copy** into those slots by writing a thin data layer the template can read.

Write a `carousel-data.js` file alongside `index.html`:

```js
window.CAROUSEL_DATA = {
  brand: "lc",  // "lc" = Lumina Clarity | "sl" = Suan Ling (activates data-brand="suan-ling" palette)
  slides: [
    { n: 1,  slug: "hook-stop-scroll",   copy: "...", subCopy: "..." },
    { n: 2,  slug: "tension-build",      copy: "...", subCopy: "..." },
    // ... all 10
  ],
  images: {
    slide4Bg: "./slide-04-bg.png",   // path relative to index.html
    slide7Bg: "./slide-07-bg.png"
  }
};
```

Copy `carousel-data.js` and the bg images into the template folder (or the output folder if you copy the full template there). The template reads `window.CAROUSEL_DATA` at render time to fill `<Editable>` defaults.

**Brand:** Use `brand: "sl"` for Suan Ling's personal coaching content (activates clay/ivory/Playfair palette). Use `brand: "lc"` for Lumina Clarity content.

After writing the data file, say:
> "Carousel data ready. Open `references/template/Linkedin Carousel Template/index.html` in a browser to browse all 10 variants. Arrow keys navigate slides within each variant. Tell me which variant you want (V1–V12) and I'll export it."

---

## Step 4 — User Picks a Variant

The user opens `index.html`, scrolls through all 10 variants (V1–V12), and tells you which one to export. Wait for their choice before proceeding.

---

## Step 5 — Export PNGs for the Chosen Variant

**Primary — Puppeteer:**

Run `scripts/export-png.js`, passing the variant ID so it targets only that section:

```bash
node scripts/export-png.js "references/template/Linkedin Carousel Template/index.html" "<output-folder>/export/" "<variant-id>"
```

The export script navigates to the chosen variant's section (e.g. `#v9`), iterates its 10 artboards, and screenshots each 1080×1080 canvas.

PNG naming: `NN-<data-slug>.png`
```
01-hook-stop-scroll.png
02-tension-build.png
...
10-cta.png
```

**If Puppeteer is missing:**
```
Puppeteer not found. To install: npm install puppeteer
Or I can export via Canva instead — just say "use Canva".
```
Do not auto-install. Wait for user instruction.

**Fallback — Canva MCP:**
If user says "use Canva":
1. `mcp__claude_ai_Canva__generate-design-structured` — pass the 10-slide outline
2. `mcp__claude_ai_Canva__create-design-from-candidate` — save chosen candidate
3. `mcp__claude_ai_Canva__resize-design` — 1080×1080 (warn: uses trial resize credit)
4. `mcp__claude_ai_Canva__export-design` — PNG, all pages
5. Share the download URL

---

## Step 6 — QA Gate

Invoke `/qa-gate` on the final slide copy (voice + anti_ai always; compliance if the brief touches FA/MAS-regulated content). If compliance Mode 2 triggers, mark the deck DRAFT-FOR-COMPLIANCE-REVIEW.

---

## Step 7 — Log

Append one line to `audit-log.md`:
```
[date] carousel | [brief title/topic] | variant: [V?] | [output path] | qa: [pass/hold]
```

---

## Flow Summary

1. Get brief (paste or `.md` — ask if missing)
2. Invoke `linkedin-carousel-creator` agent → get structured 10-slide spec
3. Run `scripts/generate-images.js` for slides 4 + 7 (skip if no `KIE_API_KEY`)
4. Write `carousel-data.js` with agent's copy + image paths into template folder
5. User opens `references/template/Linkedin Carousel Template/index.html` → browses all 10 variants
6. User picks variant (V1–V12)
7. Run `scripts/export-png.js` for the chosen variant → numbered PNGs in `<output-folder>/export/`
8. Run `/qa-gate`
9. Append to `audit-log.md`

---

## Trigger from `/post`

When `/post` selects carousel as the media format:
- Input: `brief` (drafted post text), `output_folder`, optional `hook_draft`
- Return: `html_path`, `png_paths` (or Canva URL), `qa_result`
