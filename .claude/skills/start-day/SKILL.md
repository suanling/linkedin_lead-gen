---
name: start-day
description: Start the day — read both trackers and write today's action checklist into the daily note. Surfaces who to comment on, who to follow up, and what's overdue. Triggers: "start my day", "what do I do today", "daily list", "/start-day".
---

# Start Day

Builds today's "what to do" list from the two trackers and writes it into the daily note. This is the one command the user runs each morning. They then work the list manually, calling `commenting-others`, `dm-sales-coach`, `respond-to-own`, and `log-prospect` as needed.

## Filter rule

Select every row whose **Next Action ≤ today** — due today AND overdue (past dates). Nothing slips because it was missed. Mark overdue items so they're visible.

## Step 0 — Check GitHub sync

Before building the list, make sure the local workspace matches GitHub — the tracker files
the rest of this skill reads should reflect the latest backed-up state.

```bash
git fetch origin main --quiet
git rev-list --left-right --count origin/main...main
```

Reads as `<remote_only> <local_only>`:
- **Both zero** → up to date, nothing to do.
- **Remote ahead, local zero** (behind) → fast-forward automatically: `git pull --ff-only origin main`. This is a private single-owner repo, so a clean fast-forward is safe to apply without asking first.
- **Local ahead, remote zero** → unpushed local commits. Run the sync script to back them up: `./.claude/skills/sync/sync.sh`.
- **Both non-zero** (diverged) → stop, don't force anything (no merge, no rebase, no force-push), and flag it to the owner. This shouldn't normally happen in a single-owner workspace.
- If `git pull --ff-only` fails because uncommitted local changes conflict with incoming commits, stop and flag it rather than stashing or discarding anything.

Report the outcome in one line before Step 1, e.g. `GitHub: up to date.` / `GitHub: pulled 1 new commit.` / `GitHub: pushed 2 unsynced commit(s).`

## Step 1 — Read both trackers

```python
import openpyxl
from datetime import date

today = date.today()

def due(path, sheet, name_col, next_col, extra_cols):
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb[sheet]
    rows = []
    for r in ws.iter_rows(min_row=2, values_only=True):
        if not r or not r[name_col]:
            continue
        na = r[next_col]
        d = na.date() if hasattr(na, "date") else na
        if d and d <= today:
            overdue = (today - d).days if d < today else 0
            rows.append((r[name_col], overdue, {k: r[i] for k, i in extra_cols.items()}))
    return sorted(rows, key=lambda x: -x[1])

# Lead-gen: Name=0, Next Action=9; show Status=4, DM Stage=7
followups = due("trackers/lead-gen-tracker.xlsx", "Prospects", 0, 9,
                {"status": 4, "stage": 7})
# Engagement: Name=0, Next Action=4; show Category=2
engage = due("trackers/engagement-tracker.xlsx", "Accounts", 0, 4,
             {"category": 2})
```

## Step 2 — Write the daily note

Open or create `daily-log/YYYY-MM-DD.md`. Write (append a fresh `## Today` if re-run):

```markdown
> Process: sops/linkedin-sop.md · Rules: CLAUDE.md

## Today — {date}

### Post today
- [ ] {theme} — {topic/angle} ({pillar focus}) → run /post

### Engage (comment on their posts)
- [ ] {Name} — {category} {⚠️ Nd overdue if overdue}

### Follow up (DMs)
- [ ] {Name} — {status} / {stage} {⚠️ Nd overdue if overdue}

### Park / review
- [ ] {Name} — request {N}d old, still not connected
```

Overdue items get `⚠️ {N}d overdue`. If a list is empty, write `- (nothing due)`.

For **Post today**, pull the row for today's date from `references/content-calendar.md` (the row carries **Pillar focus + Topic/Angle** only). Theme + Objective are fixed by weekday — look them up for today's weekday from the calendar's legend (or `positioning.md → Weekly content calendar`), not from the row. If there's no calendar or no row for today, write `- (no calendar entry — pick a topic)`.

## Step 3 — Weekly score nudge

If today is a Sunday (or the last working day of the week), check `references/learning/hook-performance.md` for rows that are ≥7 days old with a blank `date_scored`. If any exist, add a line to the daily note:
```
### Weekly
- [ ] Run /score-posts — {N} post(s) past the 7-day mark, unscored
```
This is the habit that keeps the learning loop closing. Skip on other days.

## Step 4 — Summary line

End with: `You have {E} to engage, {F} follow-ups ({O} overdue). Park/review: {P}.`

## Rules
- Never auto-send anything — this only plans. The user works the list.
- Don't overwrite earlier daily-note content; append a new `## Today` block if one exists.
- If a tracker is missing or empty, say so and skip that section.
- GitHub sync (Step 0): fast-forward pulls and pushing already-committed local commits are safe to do automatically. Never merge, rebase, or force-push — a diverged history gets flagged to the owner, not resolved automatically.
