---
name: lead-magnet-gen
description: Create a lead magnet from scratch in the owner's voice and brand — title, outline, and a branded asset (or markdown if no design keys) — then register it so the post and dm-sales-coach skills can use it. Triggers "create a lead magnet", "make a lead magnet", "I need a freebie", "build a guide", "/lead-magnet-gen".
---

# Lead Magnet Generator

Create a new lead magnet from a pain point, in the owner's voice. The conversion engine isn't the magnet itself — it's the 3-message post-download sequence in `dm-sales-coach`. The magnet is the hook that earns the conversation.

Read first: `account-profile.md` (offer, ICP), `references/icp.md` (pains), `references/positioning.md`, `.claude/rules/voice.md` + `kk-post.md` (voice), `config.json → media`.

## Steps

### 1. Pick the pain
From `references/icp.md`, choose ONE specific, felt pain of the ICP. A magnet solves one small problem fast — not everything. If the owner names the pain, use that.

### 2. Title + promise
Draft 3 title options (specific outcome, low effort, fast win). Recommend one. The promise must be a quick win the reader can act on the same day.

### 3. Outline
Structure: intro (name the pain) → body (the steps/checklist/template) → CTA (the next problem this surfaces → soft invite to a conversation). Keep it tight — a usable tool, not a book.

### 4. Build the asset
- Always available: a clean **markdown** version.
- If `config.media` design generation is enabled (keys present): produce a branded PDF/infographic. Else, deliver markdown and note "owner to design/brand".
- Write the output to `lead-magnets/<slug>.md` (+ asset file if generated).

### 5. Register it
Add a row to `references/lead-magnets.md`: name, archetype/pain it serves, link/file path, UTM tag (blank for the owner to fill), notes. Now `post` and `dm-sales-coach` can match against it.

### 6. QA
Run `qa-gate` (voice + anti_ai; compliance if regulated) on the magnet copy before finalising.

## Rules
- One pain, one quick win. Don't over-scope.
- Owner's voice throughout — never generic.
- Always register the magnet so the rest of the funnel can use it.
- Degrade gracefully without design API keys (markdown is fine).
