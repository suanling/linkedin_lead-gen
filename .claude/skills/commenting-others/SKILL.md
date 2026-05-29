---
name: commenting-others
description: Comment on OTHER people's LinkedIn posts (your ICP and the voices they follow) — find fresh posts, draft (1,2-3,1) comments in voice, run the QA gate, optionally promote good-fit accounts into the lead-gen tracker, and log to the engagement tracker + daily note. Also handles replying under a comment you left on someone else's post (same thread, their turf). Triggers: "engagement", "comment on posts", "do my comments", "/commenting-others", "/engage".
---

# Commenting on others' posts

The daily engagement routine: leave quality comments on fresh posts from your ICP and the voices they follow, to build visibility and warm leads. Copy-paste mode — you paste the comment yourself, say "done", the skill logs and moves on. Comments are how cold people become warm; warm people become prospects (see "promote", Step 5b).

Reads who/why from `references/engagement-targets.md`, ICP from `account-profile.md` + `references/icp.md`, voice from `.claude/rules/voice.md`. Quality is enforced by `qa-gate`.

## Tracker schema (engagement-tracker.xlsx, sheet "Accounts")
1 Name · 2 Country · 3 Category · 4 Last Engaged · 5 Next Action · 6 Total Engagements · 7 First Engaged · 8 LinkedIn URL · 9 Date Added · 10 Notes

## RULES
- **ICP + geography filter** — skip anyone outside your ICP or matching your disqualifiers (`account-profile.md`). Skip the wrong geography if you target a specific market.
- **Fresh posts only** — last 24–48h. Commenting on stale posts wastes the effort.
- **Eligibility gap** — check the tracker: if `Next Action` is in the future for this account, skip (don't over-comment on the same person).
- **Copy-paste mode** — draft, present, wait for "done". Never auto-post.
- **Run qa-gate** on every comment before presenting.
- **Never fabricate** — if a post isn't found, say so and move on.

## STEP 0 — Kickoff
Set today's target (your choice — there's no fixed number). Read `references/engagement-targets.md` for your account groups and goals. State: "Targeting N comments today."

## STEP 1 — Build the queue
From `references/engagement-targets.md` + the engagement tracker, build a list of eligible accounts (`Next Action ≤ today` or not yet engaged), ordered by priority. Skip out-of-ICP, wrong-geography, and not-yet-eligible.

## STEP 2 — Find a fresh post
For each account, find a post from the last ~2 days via LinkedIn content search:
```
https://www.linkedin.com/search/results/content/?keywords=[FirstName+LastName]&datePosted=%22past-24h%22&origin=FACETED_SEARCH
```
Fall back to `past-week` but only proceed if the post is ≤ 2 days old. If none found in 1–2 tries, skip. Don't use profile/activity pages — they don't render post text.

## STEP 3 — Draft the comment — the (1, 2-3, 1) framework
Read the voice files first (`.claude/rules/voice.md`). Then assess the post (seniority, depth, your outcome goal for this account from engagement-targets), and draft **three** variations:

```
1     = Hook/POV — one line. A specific insight or angle, NOT flattery. Makes a lurker stop.
2–3   = Value — 2-3 short lines. Add something NEW: a tactic, a personal example, a reframe, a named pitfall. Write for the lurkers.
1     = CTA — one line. A question that invites a reply.
```
Hard limit: 5-6 lines.
- **V1 Short & Sweet** (3-4 lines) — sharp observation + one add. Light posts.
- **V2 Thought Leader** (5-6) — contrarian opener, develop WHY→HOW→OUTCOME, wrap + question.
- **V3 Conversationalist** (5-6) — personal-story hook, bridge to their post, question that invites a DM. Best for accounts you want a conversation with.

## STEP 4 — QA + present
Run `qa-gate` on each variation (voice_match + anti_ai at minimum). Present all three with a one-line commenter assessment and a recommendation. Wait: "done" = log the recommended (or last-pasted); "skip" = next; "shorter"/"again" = redraft.

## STEP 5 — Log on "done"

### 5a. Engagement tracker (always set Next Action)
```python
import openpyxl
from datetime import date, timedelta

TRACKER = "trackers/engagement-tracker.xlsx"
wb = openpyxl.load_workbook(TRACKER); ws = wb["Accounts"]
today = date.today()
gap = 7   # days between touches on the same account; tune per cadence

name = "NAME"; url = ""; category = ""   # fill per account
target = None
for row in ws.iter_rows(min_row=2):
    if (url and row[7].value and url.strip() in str(row[7].value)) or \
       (not url and row[0].value and name.lower() in str(row[0].value).lower()):
        target = row[0].row; break

if target is None:
    ws.append([name, "", category, today, today + timedelta(days=gap), 1, today, url, today, ""])
else:
    r = target
    ws.cell(row=r, column=4).value = today                          # Last Engaged
    ws.cell(row=r, column=5).value = today + timedelta(days=gap)    # Next Action (ALWAYS set)
    ws.cell(row=r, column=6).value = (ws.cell(row=r, column=6).value or 0) + 1  # Total Engagements
    if not ws.cell(row=r, column=7).value:
        ws.cell(row=r, column=7).value = today                      # First Engaged

wb.save(TRACKER); print("Saved.")
```

### 5b. Engage → promote (the linkage)
If this account is a strong ICP fit and you've engaged them a few times, **offer to promote** them into the lead-gen tracker: "Promote [Name] to prospects?" On yes, call `log-prospect` to create their lead-gen row (Status = Requested or Connected as appropriate), pre-filled from here. If they're **already** in the lead-gen tracker (match on LinkedIn URL), increment their `Touchpoints` and update `Last Contact` there — a comment counts as a touch.

### 5c. Daily note + audit log
- `daily-log/YYYY-MM-DD.md` under `## What happened today`: `- 💬 Engaged: [names] — [count] comments`
- `audit-log.md`: `[YYYY-MM-DD HH:MM] commenting-others | <name> | comment | <comment text>`

## STEP 6 — When the list runs dry
Fallbacks for more targets: (1) people who reacted to your recent posts, (2) people who commented on your posts, (3) keyword content search for your ICP topics. Same filters apply (ICP, geography, freshness, eligibility). New accounts get added to the tracker.

## NOTES
- Use browser tools (`tabs_context`, `navigate`, `get_page_text`); search pages render text, profile/activity pages often don't.
- If you hit a login page, ask the owner to log in.
