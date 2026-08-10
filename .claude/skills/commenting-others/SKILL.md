---
name: commenting-others
description: Comment on OTHER people's LinkedIn posts (your ICP and the voices they follow) — find fresh posts, draft (1,2-3,1) comments in voice, run the QA gate, optionally promote good-fit accounts into the lead-gen tracker, and log to the engagement tracker + daily note. Also handles replying under a comment you left on someone else's post (same thread, their turf), and adding named targets to your engagement groups when you paste a profile. Triggers: "engagement", "comment on posts", "do my comments", "add [name] to my targets", "here's a profile to engage", "paste a profile", "/commenting-others", "/engage".
---

# Commenting on others' posts

The daily engagement routine: leave quality comments on fresh posts from your ICP and the voices they follow, to build visibility and warm leads. Copy-paste mode — you paste the comment yourself, say "done", the skill logs and moves on. Comments are how cold people become warm; warm people become prospects (see "promote", Step 5b).

Reads who/why from `references/engagement-targets.md`, ICP from `account-profile.md` + `references/icp.md`, voice from `.claude/rules/voice.md` (grounded by `references/about-me.md` + `references/voice-profile.md` — the lived stories and signature moves), and `references/market-context.md` for any cited, compliance-safe stat. Quality is enforced by `qa-gate`.

**Capture beliefs & contrarian takes as you draft.** When the owner voices a sharp, distinctly-theirs belief or contrarian take while shaping a comment, offer to save it under the matching lens in `positioning.md` (Beliefs & contrarian takes) per `references/capture-protocol.md`. Don't capture the post author's personal story as content (the owner's rule).

## Tracker schema (engagement-tracker.xlsx, sheet "Accounts")
1 Name · 2 Country · 3 Category · 4 Last Engaged · 5 Next Action · 6 Total Engagements · 7 First Engaged · 8 LinkedIn URL · 9 Date Added · 10 Notes

## RULES
- **ICP + geography filter** — skip anyone outside your ICP or matching your disqualifiers (`account-profile.md`). Skip the wrong geography if you target a specific market.
- **Fresh posts only** — last 24–48h. Commenting on stale posts wastes the effort.
- **Eligibility gap** — check the tracker: if `Next Action` is in the future for this account, skip (don't over-comment on the same person).
- **Copy-paste mode** — draft, present, wait for "done". Never auto-post.
- **Run qa-gate** on every comment before presenting.
- **Never fabricate** — if a post isn't found, say so and move on.
- **Refer, don't assume** — whose post/account this is, and which Group it belongs to, must come from confirmed information, never a guess dressed as fact. For account identity/classification, check `references/engagement-targets.md` (already-named accounts + criteria), `trackers/engagement-tracker.xlsx` (existing `Category`), and `account-profile.md` + `references/icp.md` (the current ICP archetypes — note `engagement-targets.md`'s own Group 1/2 wording can lag a positioning pivot, so don't trust it blindly either). For lived detail, belief, or proof (hard rule 1a/1b below), check `references/about-me.md` (Story bank + BELIEFS), `references/voice-profile.md` (Proof bank), and `references/positioning.md` (Beliefs & contrarian takes). If the author's identity isn't confirmed, **ask before drafting, not after**. If a classification or a lived-detail line still rests on thin signal after checking these, **say so plainly as a working guess** rather than a settled fact.
  - **Also check — what happened in the post.** Before a draft claims the target did/owns/researched something ("your research," "your product," "your team"), confirm the post's own text actually states that, not just that the topic is adjacent to that shape. "I learned this on a trip" or "I saw this at a conference" is not the same as "I built this" — read the stated frame, don't infer ownership from familiar genre conventions (founder-pitches-product, expert-shares-research, etc).
  - **Also check — causal links between two true facts.** If a draft connects two real, independently-sourced facts from `about-me.md` with a "because," "so," or "that's why," confirm the source text itself draws that connection. Two true facts sitting near each other in the story bank is not evidence they're causally linked — don't manufacture the connective tissue between them. And if a real personal fact (a number, a scene) gets dropped into a comment, mark it explicitly as yours ("I... myself") — a bare "you" can misattribute your own true detail to the target.

## STEP 0 — Kickoff
Set today's target (your choice — there's no fixed number). Read `references/engagement-targets.md` for your account groups and goals. State: "Targeting N comments today."

## STEP 1 — Build the queue
From `references/engagement-targets.md` + the engagement tracker, build a list of eligible accounts (`Next Action ≤ today` or not yet engaged), ordered by priority. Skip out-of-ICP, wrong-geography, and not-yet-eligible.

## STEP 1b — Add named targets (paste a profile)
The engagement-side equivalent of `log-prospect`'s manual sourcing. When the owner wants specific people **in rotation now** instead of waiting for the auto-fill, ask them to paste each person's LinkedIn profile. Trigger this on its own ("add [name] to my targets", "here's a profile to engage") or whenever the queue is thin and the owner has people in mind.

**Ask the owner to paste, per account:**
- **Name + profile URL** (the URL is the join key)
- **Headline / About line**
- **Location** (confirm Singapore vs out-of-market, per the geography rule)
- *(optional but better)* **what they post about**, or a recent post — this is how you judge whether their comment section actually holds the ICP

A raw copy-paste of the profile page is fine; pull out what you need. Batch is fine (several at once).

**Then, per account:**
1. **ICP + geography filter.** Out-of-market or out-of-ICP people are still worth adding as a **Group 1** (bigger voice, borrow their audience) or **Group 3** (peer / adjacent) relationship play, but never as a **Group 2** prospect.
2. **Pick the group** using the criteria in `references/engagement-targets.md`: Group 1 (bigger voice), Group 2 (your ICP — also tag archetype **A** or **B**), or Group 3 (peer / adjacent). Say which and why in one line.
3. **Append a named row** to that group's table in `references/engagement-targets.md` (`Name | LinkedIn URL | why-one-line`; add the archetype for Group 2).
4. **Seed the engagement tracker** with the Step 5a code, but set **Next Action = today** (not +7) so the account surfaces in the next queue, with `Category` = the group and `Total Engagements = 0` (you haven't commented yet).

If a paste is missing **location** or **what they post about**, ask before filing — geography and comment-section fit are the two calls you shouldn't guess. Never invent a headline, location, or topic to fill a gap. Per **Refer, don't assume** (RULES above), check `engagement-targets.md` + the tracker + `account-profile.md`/`icp.md` before settling on a Group — don't classify from the headline alone.

## STEP 2 — Find a fresh post
For each account, find a post from the last ~2 days via LinkedIn content search:
```
https://www.linkedin.com/search/results/content/?keywords=[FirstName+LastName]&datePosted=%22past-24h%22&origin=FACETED_SEARCH
```
Fall back to `past-week` but only proceed if the post is ≤ 2 days old. If none found in 1–2 tries, skip. Don't use profile/activity pages — they don't render post text. Per **Refer, don't assume** (RULES above): if the owner pastes a post without naming the author, don't guess who it's from and draft around that guess — confirm the name first.

## STEP 3 — Draft the comment — the (1, 2-3, 1) framework
Read the voice files first (`.claude/rules/voice.md`). Then assess the post (seniority, depth, your outcome goal for this account from engagement-targets), and draft **four** variations:

```
1     = Hook/POV — one line. A specific insight or angle, NOT flattery. Makes a lurker stop.
2–3   = Value — 2-3 short lines. Add something NEW. At least one line MUST be a real first-person detail from your own life (see "Two hard rules" below, not optional). Write for the lurkers.
1     = CTA — one line. A question that invites a reply.
```
Hard limit: 5-6 lines for V1-V3; V4 has its own 40-word ceiling (below).
- **V1 Short & Sweet** (3-4 lines) — sharp observation + one add. Light posts.
- **V2 Thought Leader** (5-6) — contrarian opener, develop WHY→HOW→OUTCOME, wrap + question.
- **V3 Conversationalist** (5-6) — personal-story hook, bridge to their post, question that invites a DM. Best for accounts you want a conversation with.
- **V4 Quick Hit** (under 40 words total) — the fastest, leanest real reaction. Same content rules as V1-V3, compressed hard: still needs the lived-detail-or-lens line (rule 1), still never analyses the target's people (rule 2), still quotes/echoes their words when it fits (rule 3). If no real lived detail or lens fits in 40 words, say so rather than compressing into an over-polished, aphorism-shaped line (see `anti-ai.md` → manufactured vividness / aphorism formula) — a weaker V4 beats a fabricated or overly-neat one.

**Angle diversity (required):** all four variations must each add a *different* angle, ideally each one run through a different **Signature lens** (`references/positioning.md`). Two versions of the same point is a fail; that's applause, not value. V4 is not a shorter rehash of V1/V2/V3 — it needs its own genuine angle too. Before presenting, name (to yourself) the distinct angle each one adds and confirm they're genuinely different. If the post already covers a lot, every variation still has to add something the post didn't say.

### Two hard rules (what makes it sound like *you*, not an articulate stranger)
Not optional. A draft that breaks either one fails QA — rewrite before presenting.

1. **Lead from your own lived experience or a point of view only you would take.** At least one line of the value section must be unmistakably *yours* — one of:
   - **(a) a specific first-person lived detail**: a real moment, number, or scene from your own story. Pull it from the **Story bank** in `references/about-me.md`. Use what's actually recorded there; if nothing fits, that's a weaker comment (see below), don't invent one. **Prefer a concrete scene over an abstract belief statement** — "leaving a job where I was the harness, everything routed through what I remembered, nothing written down" reads as a human aside; "founder dependency is a design problem" reads as a pitch. Both can technically satisfy this rule; only the scene version passes its spirit.
   - **(b) a signature lens, belief, or contrarian take**: a stance or angle that's distinctly yours, not the obvious take. Run the draft through one of your **Signature lenses** in `references/positioning.md`, or pull a saved **Belief / contrarian take** from that file, and let it generate the add.

   What does NOT satisfy this: a generic clever reframe an articulate stranger could write. That's the articulate-but-generic gap that makes a comment feel AI-written. The test for every draft: *could this line only have come from you?* If yes via (a) or (b), it passes. Required in V2, V3, and V4; V1 may run lighter but still obeys rule 2. Never fabricate lived detail — keep it true to `references/about-me.md` and `references/voice-profile.md`. No real anchor and no sharp lens to offer? Then it's a weaker comment; say so rather than papering over with a reframe.

2. **Speak from your life, never about their people.** Don't analyse the author's clients, team, or audience as if you know them ("when you hit that pause with someone", "the leaders who…"). You haven't met their people, and theorising about them reads as presumptuous, not warm. React to the *idea* and to your *own* experience of it, in first person, on ground you've actually walked.

3. **Quote their words.** At least one line across the three variations should quote or closely echo a specific memorable phrase from the target's own post, not just respond to the idea in the abstract. Unlike rules 1 and 2, this is a "strengthens the comment" technique, not a hard-fail gate — a plain personal-update post with no quotable line shouldn't be penalized for lacking one.

**Shape check.** Per `.claude/rules/anti-ai.md` → Banned arcs → "The comment shape": the value
lines are one reaction + one personal observation, not a manufactured arc. Avoid contrast
constructions ("not X, but Y"), extended metaphors, three-part rhetorical lists, summarising the
post back to the author, and a polished closing line dressed as wisdom. The Hook/Value/CTA line
budget above is about pacing, not permission to reframe → metaphor → lesson inside it; the CTA
closes on a real question, never an aphorism.

**Stay on their content, not your pitch.** The comment's center of gravity should stay anchored to the target's own content, not pivot into your own topic. For **Group 1 (bigger voice)** and **Group 3 (peer/adjacent)** accounts, the closing line should generally invite the target to say more about *their* post or practice, not redirect to the reader's own business situation — that reads as self-promotional engagement-bait, the opposite of what builds real relationship. **Group 2 (ICP prospects) are the deliberate exception**: per Step 4's recommendation logic below, surfacing *their* pain by pointing at the reader's own situation is the intended warm-up mechanism there, not a violation of this rule.

## STEP 4 — QA + present
Run `qa-gate` on each variation (voice_match + anti_ai at minimum). Present all four with a one-line commenter assessment and a recommendation.

**Recommendation logic — account type decides the play:**
- **Peer / fellow creator** (not a prospect, e.g. another coach or a big voice): the goal is relationship, not lurker theatre. Default-recommend the **Conversationalist** (it lowers the status gap and invites a real back-and-forth), and offer the **Thought Leader** as the alternative "if you'd rather play to their audience." Per the "stay on their content, not your pitch" rule above, the closing line stays on them, not the reader's own business.
- **ICP prospect**: lead with whichever variation best surfaces *their* pain and earns the profile view, usually the **Thought Leader** for a substantive post or the **Conversationalist** when they've revealed something personal. This is the deliberate exception to "stay on their content" above — surfacing the reader's own situation *is* the warm-up mechanism here.
- **V4 Quick Hit** isn't tied to an account type the way V1-V3 are — it's always the fast alternative, offered alongside whichever of V1-V3 gets the primary recommendation, for whenever the owner wants the lowest-effort option that day.
- Always say *why* in one line (account type + post tone + your goal).

Wait: "done" = log the recommended (or last-pasted); "skip" = next; "shorter"/"again" = redraft.

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
Fallbacks for more targets: (1) **ask the owner to paste profiles** of people they already have in mind — run STEP 1b to file them; (2) people who reacted to your recent posts; (3) people who commented on your posts; (4) keyword content search for your ICP topics. Same filters apply (ICP, geography, freshness, eligibility). New accounts get added to the tracker.

## NOTES
- Use browser tools (`tabs_context`, `navigate`, `get_page_text`); search pages render text, profile/activity pages often don't.
- If you hit a login page, ask the owner to log in.
