---
name: log-prospect
description: Quickly log a LinkedIn lead-gen update — connection request sent, accepted, DM sent, replied, call booked, or any status change — to the lead-gen tracker and daily note. Creates a new row if the person isn't there yet (e.g. you sourced them in Sales Navigator and sent a request). Triggers "sent connection request to [name]", "connected with [name]", "they accepted", "[name] replied", "sent DM to [name]", "call booked with [name]", "log [name]", "/log-prospect", "mark [name] as [stage]".
---

# Log Prospect — quick lead-gen logger

Record a lead-gen event to `trackers/lead-gen-tracker.xlsx` and the daily note in one shot. Also the **manual-sourcing capture point**: since there's no proactive prospecting skill, this is where connection requests you send (manually / via Sales Navigator) get logged — it **creates a new row** if the person isn't in the tracker yet.

## Tracker schema (sheet "Prospects")
1 Name · 2 Country · 3 Job Title · 4 Company · 5 Status · 6 Date Requested · 7 Date Connected · 8 DM Stage · 9 Last Contact · 10 Next Action · 11 Touchpoints · 12 Lead Magnet Sent · 13 LinkedIn URL · 14 Notes

## STEP 1 — Parse the input
Extract: **Name(s)**, **event**, **detail/note**, and **LinkedIn URL** if given (URL is the join key). Supports batch: "sent request to Raj, Wei Lin replied, call booked with Priya".
If name or event is unclear, ask.

**Event → Status / DM Stage / Next Action:**

| What they say | Status | DM Stage | Next Action |
|---|---|---|---|
| "sent connection request to X" (manual / Sales Nav) | Requested | — | +7 days (chase/park check) |
| "they accepted" / "connected with" | Connected | Not Started | +1 day (send first DM) |
| "sent first DM" / "sent DM" | In DM | DM Sent | +3 days |
| "they replied" | In DM | Replied | +1 day |
| "qualifying" / "in convo" | In DM | Qualifying | +2 days |
| "proposed a call" | In DM | Call Proposed | +3 days |
| "call booked with X" | Call Booked | Call Booked | meeting date |
| "parked" / "not interested" | Parked / Closed Lost | — | +30 days / none |

## STEP 1b — Quick ICP check (new connection requests only)
When creating a new row, do a fast fit-check against `account-profile.md` + `references/icp.md`: which archetype, strong/weak fit. **Record the result in Notes** (no Tier column), e.g. `ICP: strong fit — Archetype A`. Never fabricate; if unsure, say so.

## STEP 2 — Update / create the row

```python
import openpyxl
from datetime import date, timedelta

TRACKER = "trackers/lead-gen-tracker.xlsx"   # relative to workspace root
wb = openpyxl.load_workbook(TRACKER)
ws = wb["Prospects"]
today = date.today()

NEXT = {
    "Requested":     today + timedelta(days=7),
    "Not Started":   today + timedelta(days=1),
    "DM Sent":       today + timedelta(days=3),
    "Replied":       today + timedelta(days=1),
    "Qualifying":    today + timedelta(days=2),
    "Call Proposed": today + timedelta(days=3),
    "Call Booked":   None,   # set to meeting date
    "Parked":        today + timedelta(days=30),
    "Closed Lost":   None,
}

# --- fill these per lead ---
name   = "NAME"
url    = ""              # LinkedIn URL (preferred join key)
status = "Requested"     # column 5
stage  = ""              # column 8 ("" if pre-DM)
note   = f"{today} — NOTE"
# new-row fields (only used when creating)
new_row = {"country": "", "title": "", "company": "", "magnet_sent": ""}

# locate by URL first, then name
target = None
for row in ws.iter_rows(min_row=2):
    if (url and row[12].value and url.strip() in str(row[12].value)) or \
       (not url and row[0].value and name.lower() in str(row[0].value).lower()):
        target = row[0].row
        break

if target is None:
    # create a new row
    ws.append([name, new_row["country"], new_row["title"], new_row["company"],
               status, today if status == "Requested" else None, None, stage,
               today, NEXT.get(status, today + timedelta(days=3)), 1,
               new_row["magnet_sent"], url, note])
else:
    r = target
    ws.cell(row=r, column=5).value  = status
    if status == "Connected":
        ws.cell(row=r, column=7).value = today                     # Date Connected
    if stage:
        ws.cell(row=r, column=8).value = stage                     # DM Stage
    ws.cell(row=r, column=9).value  = today                        # Last Contact
    ws.cell(row=r, column=10).value = NEXT.get(status, today + timedelta(days=3))  # Next Action (ALWAYS set)
    ws.cell(row=r, column=11).value = (ws.cell(row=r, column=11).value or 0) + 1   # Touchpoints
    prev = ws.cell(row=r, column=14).value or ""
    ws.cell(row=r, column=14).value = (prev + f"\n{note}").strip() # Notes (append)

wb.save(TRACKER)
print("Saved.")
```

**Next Action is always written** — `start-day` filters on it.

## STEP 3 — Daily note + audit log
- Append to `daily-log/YYYY-MM-DD.md` under `## What happened today`:
  `- 💼 Lead-gen: [Name] ([event]) — next action [date]`
- Append one line to `audit-log.md`:
  `[YYYY-MM-DD HH:MM] log-prospect | <name> | <status/stage> | <note>`

## STEP 4 — Confirm
```
✅ Logged [N]: [Name] — [event] | Status: [x] | Next action: [date]
```
Flag stale: if any row's Next Action is overdue and still Requested/DM Sent, mention it.

## Rules
- Read headers before writing; use `openpyxl` (preserves formatting).
- Append to Notes, never overwrite.
- Match on LinkedIn URL first, name as fallback.
- Always set Next Action.
