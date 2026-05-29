# Learning Ledgers

Append-only performance ledgers that make the workspace self-improving at content. `post` writes rows; `score-posts` fills the 7-day numbers; `post` then biases future drafts toward what works.

## Files
- `hook-performance.md` — one row per published post (its format + hook pattern + 7-day score).
- `comments-performance.md` — seven rows per post (one per pinned-comment slot + score).

Both are append-only tables with a `## Current Quartiles` section at the tail.

## The loop (3 skills, 1 cycle)

```
post  → write + log the patterns used, scores blank
score-posts → you paste 7-day metrics → compute score → recompute quartiles
post  → reads Top/Bottom quartiles → drafts better → logs new rows → ...
```

**1. WRITE — `post`, at publish:** appends 1 hook row (`format`, `hook_pattern`, blank metrics) + 7 comment rows (slot `pattern`, blank metrics). Records *what was tried*, not yet *how it did*.

**2. SCORE — `score-posts`, weekly:** finds rows ≥7 days old with blank `date_scored`, you paste the LinkedIn analytics numbers, it fills them and computes one score per row:
- Hook score = `reactions + comments×2 + meaningful_comments×3 + reposts×4 + saves×5`
- Comment score = `reactions + replies×5`
(Saves and replies signal real intent, so they're weighted heaviest.)

**3. RANK — inside `score-posts`:** once a ledger has **≥12 scored rows** (per slot for comments; overall for hooks), it ranks by score and rewrites `## Current Quartiles` → Top (winning patterns) and Bottom (patterns to avoid). Below 12 rows it changes nothing — no acting on noise.

**4. LEARN — `post`, next draft:** reads `Current Quartiles → Top` to bias hook + comment patterns, and Bottom to avoid them. Then logs new rows → back to step 2.

## Rules
- **Append only.** Never rewrite past rows — the point is a longitudinal signal.
- **Tag, don't prose.** Structured fields so skills can read them.
- **Quartiles are derived, not authored.** Only `score-posts` writes the `## Current Quartiles` section.
- **It learns patterns, not posts** — which *hook style* and *comment type* work for your audience, so the lesson generalises.

## Getting the numbers in: manual or automated
- **Manual (default):** run `/score-posts`, paste the 7-day numbers. No setup.
- **Automated (optional):** the Chrome extension in `tools/linkedin-metrics-extension/` captures your post metrics into `inbox/posts/`; `score-posts` drains them. See that folder's `README.md` to install.

## The one habit that powers it
The loop only closes if you run `/score-posts` weekly. No scoring → ledgers stay blank → `post` just uses defaults (no harm, no learning). The weekly score is the engine — manual or extension-assisted.
