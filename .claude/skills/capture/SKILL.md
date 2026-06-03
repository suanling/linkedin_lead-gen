---
name: capture
description: Capture material as you work — your own stories, your beliefs & contrarian takes, and testimonials people give you — into the right store, in voice and within compliance, with consent-gating for testimonials. The deliberate, on-demand version of the inline capture the other skills offer. Triggers "capture this", "save this story", "add this to my story bank", "that's a belief I hold", "save this take", "someone praised me", "log a testimonial", "/capture".
---

# Capture — stories, beliefs & contrarian takes, testimonials

Save the good stuff as it surfaces, into the right place. This is the standalone version of the capture
that `dm-sales-coach`, `respond-to-own`, `log-prospect`, `commenting-others`, and `post` offer inline;
all of them follow the same source of truth: **`references/capture-protocol.md`** (read it first).

Core rule: **offer, draft, confirm — never save silently, never fabricate, draft until the owner
confirms it's true and theirs.** Financial material stays concept-only (no numbers, products, returns).

## STEP 1 — Identify the bucket
From what the owner pasted/said, decide which of the four it is. If it's ambiguous, ask one question.

1. **Owner's own story / lived scene** (a real moment from *their* life)
2. **Owner's belief / contrarian take** (a sharp stance *they* hold)
3. **Testimonial** (someone praising the owner or their work)
4. **Someone else's personal story** (a prospect's/client's situation) → see the guardrail in Step 2

## STEP 2 — Route, draft, and (for bucket 4) stop
Draft the entry from what was actually said. Then:

- **Story → `references/about-me.md`, "Story bank" section.** Shape it as the existing entries:
  `- **[Short title].** [the scene, 1-2 lines]. *Point:* [what it proves]. *Lens:* [which lens(es)].`
  Tag the lens from `references/positioning.md`. Care: financial scenes concept-only; scenes that touch
  other people are about the realisation only, never naming or exposing anyone.

- **Belief / contrarian take → `references/positioning.md`, "Beliefs & contrarian takes" list.** Add:
  `- "[the take in their words]" → Lens N ([lens name])`. Pick the lens it belongs to. Remove the
  `*(none yet …)*` placeholder once a real one is added. Keep only takes they'd actually stand behind.

- **Testimonial → `references/testimonials.md`.** Add a row with Date · Who (name/role) · Where ·
  Quote (verbatim) · `Consent to publish = not granted` · `Compliance cleaned = —` · `Used in = —`.
  **Flag clearly that consent is required before it can be used anywhere**, and that for financial
  testimonials it must be prior WRITTEN consent, no PII, no figures (Mode 2, gates.md). Never paraphrase
  a testimonial into existence; capture only the real words.

- **Someone else's personal story → do NOT capture as content.** This is the owner's hard rule (never
  spend others' stories). Offer instead to add a short private note to their row in
  `trackers/lead-gen-tracker.xlsx` (Notes) for relationship continuity, via `log-prospect`. Nothing that
  `post` could ever pull from.

## STEP 3 — Confirm before saving
Read the drafted entry back and confirm it's true and theirs (and, for a testimonial, that the quote is
accurate). A captured-but-unconfirmed item is a draft, not a saved entry. Fix on request.

## STEP 4 — Save + report
Write the confirmed entry to its file. Report what was saved and where in one line. For a testimonial,
end with the reminder: "Not usable until you confirm consent." Batch is fine: handle several items in
one run, each routed to its own bucket.

## Rules
- Follow `references/capture-protocol.md`; this skill is its on-demand entry point.
- Offer, never auto-write; draft until confirmed; never fabricate or embellish.
- Testimonials are consent-gated by default; `qa-gate` blocks unconsented use.
- Never capture another person's personal story as reusable content.
- Writable targets only: `references/about-me.md`, `references/positioning.md`, `references/testimonials.md`,
  and (via `log-prospect`) the tracker. Never edit `sops/`, other skills, or `CLAUDE.md`.
