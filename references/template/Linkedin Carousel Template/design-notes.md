# LinkedIn Carousel — Structural Irreplaceability

**The thesis (positioning behind the tool):**
Everyone is sharpening the tool. Almost nobody is sharpening their position. The tool is rented, the skill is leased, only the position is owned — and compounding lives at the bottom layer.

## Structure (locked in by user)

| # | Beat | What it does |
|---|---|---|
| 01 | Hook | Stop the scroll. One brutal sentence. |
| 02 | Tension | Why this matters. Make them feel exposed. |
| 03–07 | Value progression | 5 micro-payloads, each opening a small curiosity gap. |
| 08 | Insight upgrade | The pro move — the reframing only the few make. |
| 09 | Crystallised takeaway | The single line they screenshot. |
| 10 | Frictionless CTA | Comment LAYERS + follow. |

## Two design directions

### A. Editorial — magazine spread
Kinfolk / Aesop / high-end annual report. Off-grid composition. Bodoni Moda italic on cream. Generous whitespace, asymmetric image slots, one navy "dark statement" slide for rhythm. Heading scale is restrained — the eye lands softly, then notices the structure. Slide 5 is the dark moment. Slide 10 closes warm.

### B. Bold — type-as-image
Graphic, almost poster-like. Massive single words. Terracotta strikethroughs, type-art splits, three-tier color blocks for the framework. Higher contrast, less negative space, more pixel-on-pixel weight. Built for the LinkedIn feed at thumbnail size — readable at 360px wide.

Each direction is shown twice — once in **Lumina Clarity** (navy + terracotta on cream) and once in **Suan Ling** (ink + clay on ivory, with one Caveat hand mark on the CTA).

## System decisions

- **Frame**: 1080 × 1080, square. LinkedIn-native.
- **Counter**: `01 / 10` top-right, mono, tracked. Every slide.
- **Swipe hint**: subtle `swipe →` bottom-right except slide 10 (which says `comment LAYERS ↓`).
- **Image slots** on slides 2, 4, 6, 8 — every other from slide 2. Slide 1 is pure type so the hook lands.
- **Logo mark** sits quiet bottom-left from slide 2 onward, omitted on the hook for cleanness.
- **One accent per slide.** Terracotta is precious.
- **No emoji. No gradients. No glassmorphism.** Per system.

## Editing

All headline and body text is `contentEditable`. Click anything to retype it in place. (Edits live in-session; fork the file to commit them.)
