---
name: score-posts
phase: 1
description: >
  Drain LinkedIn-metrics inbox and score published posts at the 7-day mark, appending rows to the hook/cta performance ledgers and recomputing quartiles. Also scores baits from the linkedin-leadgen tracker. Runs Sunday inside Job 4 weekly review, or on demand. Trigger on "score posts", "score this week", "/score-posts", "run weekly scoring", "update hook ledger", or as part of the Sunday weekly review job.
---

# Score Posts — Weekly Performance Loop

This skill is the engine of the **Hook & Bait Learning Loop**. It runs Sunday, drains captured metrics, appends to ledgers, recomputes quartiles. Output of this skill becomes input to the `hook`, `dm-sales-coach`, and `qa-gate` skills next week.


> **Paths — everything is inside va-workspace (2026-08-01).** Ledgers, inbox, content history,
> trackers and the metrics extension are all relative to this workspace. Nothing reads or writes
> outside it. Destinations come from `config.json → paths`:
> - `content_store` (`content/`) — the post history carrying `hook_pattern` and `post_urn`.
>   `/post` and `/log-linkedin-post` write there; scoring matches against it.
> - `lead_gen_tracker` (`trackers/lead-gen-tracker.xlsx`) — bait outcomes.
>
> If posts were previously logged to an external notes vault, migrate them into `content_store`
> so the scoring history is complete; two filename conventions can coexist there safely, since
> matching is on frontmatter rather than filename.
>
> `cta-performance.md` and `bait-performance.md` were created empty here on 2026-07-31 —
> the AIOS rows were left behind deliberately (different ICP, pre-pivot).

## When this runs

- **Scheduled:** Sunday, inside Job 4 weekly review (the weekly review job (AIOS-side; not wired in va-workspace — run `/score-posts` by hand)).
- **On demand:** the owner says "score posts" or "/score-posts".

## Inputs

1. **Inbox:** `references/learning/inbox/*.json` — captured by Chrome extension.
2. **Content files:** `<config.paths.content_store>/*.md` (`content/`) — frontmatter holds `post_urn`, `hook_pattern`, `pillar`, `cta`. Two naming conventions coexist there after the 2026-08-01 migration (`YYYY-MM-DD — LinkedIn — Topic.md` from the vault, `YYYY-MM-DD-kebab-slug.md` for newer posts). Match on frontmatter, never on filename shape.
3. **Bait log:** `<config.paths.lead_gen_tracker>` (`trackers/lead-gen-tracker.xlsx`) — for bait reply outcomes.
4. **Existing ledgers:** `references/learning/hook-performance.md`, `bait-performance.md`, `cta-performance.md`, `comments-performance.md`.

## Workflow

### Step 1 — Drain inbox

For each `*.json` in `references/learning/inbox/`:

1. Parse JSON. Extract `post_urn`, metrics.
2. **Derive `date_published` from URN.** LinkedIn activity URN IDs encode a millisecond timestamp:
   ```js
   const ms = Number(BigInt(urn.split(':').pop()) >> 22n);
   const date_published = new Date(ms).toISOString().slice(0,10); // YYYY-MM-DD
   ```
   Compute `days_since_published` = today − date_published. Posts < 7d still get a row but tagged `<7d` in notes and excluded from quartile recompute until they age in.
3. **Dedupe against the ledger BEFORE matching content (critical — URN is NOT a reliable key).** A single published post has **two sibling URNs created ~0.7s apart**: the `ugcPost` (created when "Post" is hit) and the `activity` (created when LinkedIn distributes to feed). The `/post` skill logs one; the extension scrapes the other. So **the same post arrives with a different URN each capture** — raw-URN matching will treat it as new every time and create duplicate ledger rows + duplicate content files (this happened W24, 2026-06-12). Match by a **stable identity key**, not the URN:
   ```
   identity_key = date_published (YYYY-MM-DD, from URN timestamp) + "|" + normalized_first_line
   normalized_first_line = first ~50 chars of preview, lowercased, whitespace-collapsed, punctuation-stripped
   ```
   - Scan existing ledger rows (`hook-performance.md`). If a row already has the same `date_published` AND a matching opening line → **SKIP this JSON** (already scored). Optionally append a fresh `metrics_history` entry to the matched content file if metrics changed, but do NOT add a new ledger row.
   - Only proceed to scoring if no ledger row matches the identity key.
4. **Match to the content file** by the SAME identity key: scan `<config.paths.content_store>/*.md` — first try `post_urn:` exact match, then fall back to date+opening-line match (handles the dual-URN case). If still no match, the post was published but never logged via `/post` (stage 8) — ask user for the full text + CTA, create the content file, then continue. Do NOT create a file if one already exists for that date+opening (check first — a filename date can be off by one vs the URN-derived date).
5. Read the content file's frontmatter for: `pillar`, `hook_pattern`, `emotion`, `cta`, body length.
6. Ask user for `dms_received` count only if extension didn't capture (fallback path; primary path is `inbox/dms/*.json`).
7. Compute **360Brew score** (2026 formula, v2 — DM attribution split):
   ```
   score = (saves × 10) + (meaningful_comments × 5) + (comments × 2) + reactions
         + (reposts × 4)
         + (lead_magnet_clicks × 8)   // UTM-tracked, cleanest funnel signal
         + (keyword_dms × 5)          // exact match: DMs containing post's cta_code
         + (proxy_dms × 2)            // new inbound DMs in 48h window post-publish, sender not already a contact
         + (profile_visits × 3) + (dwell_time_avg_s × 0.1)
   ```
   Saves and meaningful_comments (≥15 words) are what 360Brew rewards. Null fields → 0.

   **DM attribution sources (3 channels, used together):**
   - `lead_magnet_clicks` — pulled from `references/learning/inbox/clicks/*.json`. **Source changed 2026-07-20:** was a Beehiiv UTM export; the newsletter moved to Substack. Substack does not expose a comparable per-link UTM export, so this channel has **no live feed** until a replacement is chosen (candidates: a link shortener with its own analytics, or UTM params read from the lead-magnet landing page's own analytics). Until then, treat `lead_magnet_clicks` as **absent, not zero** — do not let a missing feed silently deflate a post's score. If the folder is empty, score on the other two channels and say so in the output.
   - `keyword_dms` — pulled from `references/learning/inbox/dms/*.json` (extension scrapes `/messaging/` inbox). For each DM where `preview` contains the post's `cta_code` (case-insensitive), attribute to that post. 100% accurate.
   - `proxy_dms` — same `inbox/dms/` source. For DMs without a keyword match: attribute to the post published in the prior 48h if the sender is not already a known contact, i.e. not present in `<config.paths.lead_gen_tracker>` or `<config.paths.engagement_tracker>`. Noisy proxy, low weight.

   **Required post frontmatter (enforced by `log-linkedin-post`):** `cta_code:` (e.g. `"LEVERAGE"`, optional but enables keyword_dms), `lead_magnet_url:` (must include `?utm_content=<post_urn>`, optional but enables click attribution).
8. Append one row to `references/learning/hook-performance.md` under `## Rows`.
9. If post had a CTA, also append to `references/learning/cta-performance.md`.
10. **Comment-level scoring:** if the JSON includes per-comment metrics for the post's pinned comments OR the user provides per-comment counts manually, append one row per comment slot (1–7) to `references/learning/comments-performance.md`. `partial_score = reactions + (replies × 5)`. If per-comment metrics are unavailable, skip silently — quartiles only activate at ≥12 rows per slot.
11. **Write metrics_history into the content file frontmatter.** When a content file is matched, append (don't overwrite) a `metrics_history` entry to its frontmatter so each post tracks its own performance curve over time:
   ```yaml
   metrics_history:
     - date_scored: 2026-05-15
       days_since_published: 7
       saves: 14
       meaningful_comments: 3
       comments: 11
       reactions: 87
       reposts: 1
       impressions: 2410
       dwell_time_avg_s: 18
       profile_visits: 9
       lead_magnet_clicks: 12
       keyword_dms: 3
       proxy_dms: 2
       score: 312
   last_scored: 2026-05-15
   ```
   If the post has been scored before, this is a second/third entry — keeps a longitudinal record. Set `scored: true` once first entry written.
12. Move processed JSON to `references/learning/inbox/processed/YYYY-Www/`.

### Step 2 — Score baits

1. Read the LeadGen tracker. Find baits sent ≥ 7 days ago that haven't been scored yet (track via a `scored_in_ledger` column or a separate `bait-scored.txt` marker file in `references/learning/state/`).
2. For each unscored bait, append a row to `bait-performance.md` with situation, template, replied/sentiment/next_step.
3. Mark scored.

### Step 3 — Recompute quartiles

For `hook-performance.md`:
- If ≥ 12 rows in `window=7d`, sort by `score`, split into quartiles.
- Rewrite the `## Current Quartiles → Top quartile` section with up to 6 example hooks (the actual first 2 lines of those posts, not URNs — for few-shot use).
- Rewrite `## Bottom quartile` with up to 4 patterns to flag.

For `bait-performance.md`:
- If ≥ 20 rows, segment by `situation`. Within each situation, top/bottom quartile.
- Rewrite `## Current Quartiles per situation` with template snippets.

For `cta-performance.md`:
- If ≥ 12 rows, top/bottom by `action_rate`.

For `comments-performance.md`:
- If ≥ 12 rows **per `comment_idx` slot** (1–7), top/bottom quartile by `partial_score` within that slot.
- Rewrite the `## Quartile snapshot` section with up to 3 top + 3 bottom patterns per slot.
- Used by `/post` skill to bias the 7-comment generation toward proven patterns.

### Step 4 — Confirm

Report:

```
✅ Scored {N} posts, {M} baits this week.

📈 Top hook this week: "{first 2 lines}" — score {X}
📉 Bottom hook this week: "{first 2 lines}" — score {Y}

📊 Quartiles updated:
  - hook-performance.md  ({total rows} rows, {window} window)
  - bait-performance.md  ({total rows})
  - cta-performance.md   ({total rows})

🔍 Hook skill will now few-shot from {N} top patterns.
🛡  QA-review will flag {M} bottom patterns.
```

## Failure modes

- **Dual-URN duplicates (most common pitfall)** — the same post arrives with a different URN than was logged (`ugcPost` vs `activity`, ~0.7s apart). NEVER trust raw-URN match alone. Always dedupe by the date+opening-line identity key (Step 1.3) before appending a ledger row or creating a content file. Symptom if ignored: duplicate ledger rows + duplicate `Content/` files (happened W24, 2026-06-12 — created then deleted).
- **No `post_urn` in content file frontmatter** — match by date+opening line instead; once matched, patch the URN into the file. Next run finds it either way.
- **Inbox JSON for a post not yet logged** — published but no content file: ask user for full text + CTA, create the file, then score. Do NOT defer (deferring loses the metrics snapshot). Check date+opening first — a file may exist under a filename date off-by-one from the URN-derived date.
- **Fewer than threshold rows** — skill still appends, just doesn't recompute quartiles. Tells user "ledger growing, {X} more rows until quartiles activate".

## Rules

- Append-only writes to ledgers. Never rewrite existing rows.
- The only section that gets rewritten is `## Current Quartiles` (it's derived).
- If user is unsure about a field, leave it blank rather than guess. Blank fields don't pollute the few-shot signal.
- All times in SGT.

## Related

- Capture: `tools/linkedin-metrics-extension/`
- Ledgers: `references/learning/`
- Log: `.claude/skills/post/SKILL.md` (stage 8 logging) (must include `post_urn` and `hook_pattern` in frontmatter — patched 2026-05-08)
- Consumers: `.claude/agents/linkedin-post-creator.md`, `.claude/skills/dm-sales-coach/SKILL.md`, `.claude/skills/qa-gate/SKILL.md`
