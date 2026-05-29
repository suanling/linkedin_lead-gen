---
name: score-posts
description: Score published posts and their pinned comments at the ~7-day mark — you paste the LinkedIn analytics numbers, it fills the blank rows in the learning ledgers and recomputes the top/bottom quartiles so post drafts better over time. Run weekly. Triggers "score posts", "score this week", "update the ledger", "/score-posts".
---

# Score Posts

Closes the learning loop. `post` appends rows to the ledgers with blank scores at publish; this skill fills in the 7-day metrics and recomputes quartiles. No browser automation — you supply the numbers from LinkedIn analytics.

Run weekly (or whenever posts cross the 7-day mark).

## Step 1 — Find what's due
Read `references/learning/hook-performance.md` and `comments-performance.md`. List rows where `date_scored` is blank AND the post is ≥7 days old. Tell the owner which posts need numbers.

## Step 2 — Collect metrics
For each due post, ask the owner for the LinkedIn analytics numbers (or accept a paste):
- **Post:** reactions, comments, meaningful comments (≥15 words), reposts, saves, impressions.
- **Each pinned comment (1–7):** reactions, replies.
If they don't have a number, leave it blank — don't invent.

## Step 3 — Fill the ledgers
- Hook ledger: set `date_scored`, the metric columns, and compute `score = reactions + comments×2 + meaningful_comments×3 + reposts×4 + saves×5`.
- Comments ledger: set `date_scored`, `reactions`, `replies`, and `score = reactions + replies×5` per comment row.
Append-only — never rewrite earlier rows.

## Step 4 — Recompute quartiles
If a ledger has **≥12 scored rows** (per comment slot for the comments ledger; overall for hooks), rank by `score` and rewrite the `## Current Quartiles` section at the file tail:
- **Top:** the top-quartile `hook_pattern`s / comment `pattern`s (with their slot).
- **Bottom:** the bottom-quartile patterns to avoid.
Below 12 rows, leave the section as-is and note "not enough data yet".

## Step 5 — Confirm
Report: how many posts/comments scored, the current top and bottom patterns, and one observation (e.g. "saves cluster on the contradiction hook").

## Rules
- Append/update only the blank rows you're scoring; never alter historical scores.
- Quartiles are derived, never authored by hand.
- `post` reads `## Current Quartiles → Top` to bias drafts and avoids the Bottom — so accurate scoring here is what makes the workspace improve.
