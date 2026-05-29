# Learning Ledgers

Append-only performance ledgers that make the workspace self-improving. `post` writes rows here; `score-posts` fills in the 7-day numbers; `post` then biases future drafts toward what works.

## Files
- `hook-performance.md` — every published post, its hook pattern + 7-day score.
- `comments-performance.md` — the 7 pinned comments per post + their 7-day score.

## Rules
- **Append only.** Never rewrite past rows — the point is a longitudinal signal.
- **Tag, don't prose.** Structured fields so skills can read them.
- **Quartiles are derived, not authored.** Once a ledger has ≥12 rows, `score-posts` recomputes a `## Current Quartiles` section (top / bottom) at the file tail.

## How it reads back
- `post` reads `## Current Quartiles → Top` as examples before drafting (hooks + comment patterns), and avoids the Bottom patterns.

## How rows get in
1. **At publish:** `post` appends the post's hook row + 7 comment rows (scores blank).
2. **Weekly:** `score-posts` — you paste the 7-day metrics from LinkedIn analytics; it fills the blank rows and recomputes quartiles. No browser automation required.
