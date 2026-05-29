---
name: start-day
description: Start the day — read both trackers and write today's action checklist into the daily note. Surfaces who to comment on, who to follow up, and what's overdue. Triggers: "start my day", "what do I do today", "daily list", "/start-day".
---

# Start Day

Builds today's "what to do" list from the two trackers and writes it into the daily note. This is the one command the user runs each morning. They then work the list manually, calling `commenting-others`, `dm-sales-coach`, `respond-to-own`, and `log-prospect` as needed.

## Filter rule

Select every row whose **Next Action ≤ today** — due today AND overdue (past dates). Nothing slips because it was missed. Mark overdue items so they're visible.

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

### Engage (comment on their posts)
- [ ] {Name} — {category} {⚠️ Nd overdue if overdue}

### Follow up (DMs)
- [ ] {Name} — {status} / {stage} {⚠️ Nd overdue if overdue}

### Park / review
- [ ] {Name} — request {N}d old, still not connected
```

Overdue items get `⚠️ {N}d overdue`. If a list is empty, write `- (nothing due)`.

## Step 3 — Summary line

End with: `You have {E} to engage, {F} follow-ups ({O} overdue). Park/review: {P}.`

## Rules
- Never auto-send anything — this only plans. The user works the list.
- Don't overwrite earlier daily-note content; append a new `## Today` block if one exists.
- If a tracker is missing or empty, say so and skip that section.
