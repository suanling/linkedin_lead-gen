# Brand System — Suan Ling LinkedIn Carousels

> Visual standard for native-document/carousel posts. Read by `linkedin-carousel-creator` (and any
> carousel render/export step). Editorial navy / cream / terracotta. Square 1080×1080 slides.

## Colour tokens
- **Navy (primary / dark slides):** `#07273E`
- **Terracotta (accent):** `#E95117`
- **Cream (light slides / background):** `#F5F0EA`
- **Body text:** `#4A4540`

Use navy for hook and CTA slides, cream for text/value slides, terracotta as a single accent flourish
(never as a full background). One accent per slide. White space is a feature, not empty room.

## Typography
- **Headings / display:** Playfair Display (serif).
- **Body / labels:** Inter (sans).
- Google Fonts via `<link>` when rendering HTML.

## Canvas
- **1080×1080 px** per slide (square). 10 slides per deck.

## Visual rhythm (layout rotation — auto-enforce across the 10 slides)
Variety keeps the reader swiping; never run the same layout twice in a row.

| Slide | Layout type |
|---|---|
| 1 | Bold minimal — hook dominates, dark navy, single accent flourish |
| 2 | Text-heavy — cream background, tension paragraph |
| 3 | Diagram / cards — 3-card grid on cream |
| 4 | Photo-background + overlay — full-bleed image with text |
| 5 | Text + visual balance — split layout |
| 6 | Diagram / cards — variant of slide 3 |
| 7 | Photo-background + overlay — variant of slide 4 |
| 8 | Bold typographic — pro-move tagline, terracotta accent |
| 9 | Editorial quote — large serif italic, cream, breathing room (the save/screenshot slide) |
| 10 | Navy CTA — single ask, name plate, soft accent shape |

## Notes
- Design supports the message; it never competes with it.
- One concept per slide, clear hierarchy (what to read first), generous margins.
- Slide 9 is the crystallised, screenshot-worthy takeaway — the line people save.
