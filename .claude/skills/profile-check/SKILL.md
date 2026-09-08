---
name: profile-check
description: Check an uploaded LinkedIn profile PDF and place the person in Group 1 (bigger voice), Group 2 (ICP prospect) or Group 3 (peer/adjacent) — or skip them, with the reason. Runs hard exclusions and geography first, then works the three groups in order. If they fit, adds them to references/engagement-targets.md and seeds the engagement tracker so /commenting-others picks them up. Logs the verdict either way. Triggers: uploading or pasting a LinkedIn profile PDF, "check this profile", "is this person a fit", "which group", "should I engage them", "profile check", "/profile-check".
---

# Profile Check

The owner uploads a LinkedIn profile PDF. This skill answers one question:

**Which group do they belong in — 1, 2, 3, or none?**

- **Group 1** — a bigger voice whose audience IS the owner's ICP. Borrow their room.
- **Group 2** — the ICP itself, the buyer. These become prospects.
- **Group 3** — a peer or adjacent voice. Stay visible, learn what lands.
- **None** — skip, with the reason and what would change it.

The three groups are not a ranking. They are three different jobs, and a profile can
be excellent for one and useless for the other two. Work them in order (1, then 2,
then 3) and give each its own honest test — the commonest error is settling for Group 3
because a profile is impressive but does not fit anywhere.

Then log the decision. **Both outcomes get logged.** A skip is the more valuable
record: it stops the same profile being re-checked in three weeks, and the accumulated
skips are what surface a sourcing problem before it becomes a pattern.

## Where it stops

**If they fit a group, this skill adds them** — the targets file row and the engagement
tracker seed, both done here (Step 5). A fit that is never written down is work thrown
away, and the next session has no record of it.

It does **not** draft a comment and does **not** create a lead-gen (prospect) tracker
row. Commenting is `/commenting-others`; promotion to a prospect happens there, after
real engagement. A Group 2 verdict means "worth warming", not "a live lead".

## Read first

- **The three group tests: `references/engagement-profile-criteria.md`** — accept, reject and
  edge cases for Groups 1, 2 and 3. This skill runs the workflow; that file says what passes.
  Every criterion there carries a marker: **✅** supported by the owner's own profile, **⚙️** an
  operating decision, **🔍** needs a live check. Treat a ⚙️ as changeable and a 🔍 as `unverified`
  until checked. Its **Operating decisions to make** section lists what is still open — do not
  invent an answer to one mid-check.
- ICP + disqualifiers: `references/icp.md`
- Hard exclusions + geography + group definitions: `references/engagement-targets.md`
- Compliance mode: `.claude/rules/gates.md`, plus any operational ruleset it names
  (regulated owners only; non-regulated workspaces have none)
- Positioning (for the competitor test): `references/positioning.md`

Check the audit log for the name before starting. If they have been checked before,
say so and open with what changed rather than re-deciding from scratch.

---

# NEVER FABRICATE

Everything in the verdict must come from the PDF or from a reference file.

If the PDF is unclear, missing a section, or has stripped entity names (a known
LinkedIn export defect that strips entity names), say so explicitly and
mark the affected claims UNVERIFIED. **Do not infer from layout.**

Never guess: follower count, revenue, team size, client names, company age, or
geography. Absent evidence is absent, not weak evidence.

Where a figure in the profile is the *target's* claim, keep it attributed to them.
Never let it drift into the owner's own words.

---

# STEP 0 — READ THE PDF

Read the whole PDF, not the first page. Pull out:

- Name, LinkedIn URL, location, pronouns if stated, follower count if shown
- Current role(s) and company, with start dates and duration
- Concurrent roles (people often hold several; this changes the read)
- Prior career, with durations
- About/summary text
- Skills, awards, certifications, licences
- Banner and headline text

Note what is **missing**. A PDF with no About section supports fewer conclusions
than one with a full summary, and the verdict should say so.

---

# STEP 1 — HARD EXCLUSIONS (run before anything else)

These are automatic. They are not weighed against fit or reach. A good profile does
not override them. Check these **before** any ICP work, and stop if one fires.

Read the current list from `references/engagement-targets.md` → "Hard exclusions".
That file is the authority; this is the summary of what to look for.

**Read the exclusions from `references/engagement-profile-criteria.md`** — compliance, direct
competitors, and any owner-specific categories. They differ by owner and they grow; do not
restate them here.

Two things about how they behave, which are general:

**An exclusion follows the venture, not the person.** Someone can run an excluded business and a
clean one. But a venture-level admission does not survive a headline that advertises the excluded
business, because the comment sits under the person's name and headline.

**Some accounts are admitted with a post-type filter** rather than blocked outright, where only
part of their content is unsafe. Write the filter into the row at Step 7A so
`/commenting-others` can apply it before drafting.

**If a hard exclusion fires:** stop. Log it as HARD EXCLUSION, never engage. No
tracker row, no group. Say which signals fired and whether the operative clause fired
or only the spotters.

---

# STEP 2 — GEOGRAPHY

**Per-group markets: `references/engagement-profile-criteria.md`.** Geography is set per group
and changes; do not hardcode it here.

The rule that does not change: the audience exception turns on **whose audience it is, not how
large**. Ten thousand followers in the wrong country is still the wrong room.

If geography fails and the exception does not open, that is decisive on its own. Log
it and stop; no ICP analysis is needed.

---

# STEP 3 — THE GROUP PASS

**Read the current group balance first**, computed from `trackers/engagement-tracker.xlsx`
against the target split in `references/engagement-targets.md` → "Session mix". Recompute from
the tracker rather than trusting any prose summary; a written-down balance goes out of date
within days and will mislead a sourcing decision.

The balance does not override a genuine fit. It breaks ties, and it raises the bar for
Group 3 specifically.

## PRIMARY GROUP — assess all three, then assign exactly one

The three tests are independent and all three are run. The **primary group** is what the
tracker carries, and it is assigned by this precedence:

1. **A genuine Group 2 buyer stays Group 2**, even when they also have audience-host
   potential. A buyer is worth more than a room, and a person cannot be worked as both at
   once. Record the reach separately in **Audience host = yes**; it changes how you comment,
   not which group they sit in.
2. **Group 1 is for non-ICP audience hosts** with proven overlap with agency owners.
3. **Group 3 is for high-value agency-ecosystem peers, referral routes and learning voices.**
   It is **not a consolation category.** An impressive profile that fails Groups 1 and 2 is a
   decline, not a Group 3 add. Group 3 is already over target; the bar is "this specific
   relationship earns its engagement slots", not "too good to reject".

Work the three tests in order. **Test all three before concluding** — a profile that
fails Group 2 may be a strong Group 1, and stopping early is how good voices get lost.

**A free-filter failure disposes of GROUP 2 ONLY.** "Not a founder" and "not a service
business" answer the Group 2 question and say nothing about the other two. An employee,
an AI trainer or a product-company founder can still be an excellent Group 1 host or a
Group 3 peer, and the whole point of testing Group 1 first is that its question is about
*their audience*, not their job title.

So **"declined on filter 1 before any other test was needed" is not a complete verdict.**
Name what Group 1 and Group 3 returned, even if the answer is one line each. Record the
decline as **declined-G2**, never as a bare "employee" or "not a founder".

> Real cost of skipping this: profiles get disposed of on filter 1 with
> no Group 1 or Group 3 read on record. Any of them may have been an
> audience host that was already researched and then thrown away.

---

## GROUP 1 — Bigger voice (test this first, it is the gap)

**Criteria: `references/engagement-profile-criteria.md` → Group 1.** Accept-when, do-not-accept,
and what counts as audience evidence all live there.

Two things stay here because they are procedure, not filter:

**1. Reach must be evidenced.** A follower count in the PDF, or clear evidence of a following. If
the PDF shows no follower count, **say so** — there is no reach case without evidence, and it must
not be guessed.

> ### ⚠️ A PDF CANNOT ACCEPT A GROUP 1 ACCOUNT
>
> A LinkedIn profile PDF **cannot prove** follower reach, audience composition, recent posting, or
> commentability. It shows what the person says about themselves, not who turns up in their
> comments.
>
> **A PDF may NOMINATE a Group 1 candidate. Acceptance requires live verification** of two things:
> recent posts, and who is actually commenting on them.
>
> **Where live audience evidence is unavailable, the verdict is `research-needed — audience
> verification`. Do NOT add the account to the active engagement book.** An unverified Group 1 add
> spends comment slots in a room that was never checked, and the mistake is invisible because the
> comments still look fine.
>
> This is the reverse of the Group 2 rule, where the PDF settles business shape. Shape is
> self-reported and checkable; audience is neither.

**2. Where the evidence comes from**, in order: their own About stating who they serve · their
hashtags · the composition of their comment section · their client examples · their banner. A
headline alone is not enough.

Someone who does not really post, or whose value is the relationship rather than the feed, is
Group 3, not Group 1.

---

## GROUP 2 — The ICP (a prospect, not just an engagement target)

**Criteria: `references/engagement-profile-criteria.md` → Group 2.** Accept-when, the
problem signals, the disqualifiers and the edge cases all live there.
`references/icp.md` carries the fuller archetype detail behind it.

Tag the sub-type in the verdict where the owner has defined sub-types. They live in
`references/icp.md`; use that file's own labels rather than inventing bands here.

**When the core problem is genuinely unknown from a profile, record it UNRESOLVED rather than
failed.**
A profile that shows the right shape but not the problem is the common ambiguous case, and a
wrong "problem not present" call loses a real buyer.

**Group 2 watch condition.** Where a profile is the right shape but the core problem is not yet
visible, write the flip condition into the row: *"reclassify to Group 2 the moment a post shows
[the observable signal from `references/engagement-profile-criteria.md`]."* That is a real
finding, not a hedge.

---

## GROUP 3 — Peer or adjacent (the bar is raised)

**Criteria: `references/engagement-profile-criteria.md` → Group 3.** The four value types, the
likely fits, and the do-not-accept list all live there.

Two procedural notes:

**The bar is deliberately high.** Group 3 is over target, and "pasted profiles keep resolving to
peers" is a named pattern to resist. Depth over breadth.

**Peer-shaped vs ICP-shaped.** Someone who is ICP-shaped but fails on evidence is a Group 2
near-miss, not a Group 3 peer. Filing them as a peer is the wrong record and loses the flip
condition.

---

## Retired and secondary lanes

Where the owner has an audience they used to serve, or a second offer that is not the buyer for
this book, overlap with it is **not** an exclusion on its own. A profile can sit in a retired lane
and still be a genuine fit.

What it does carry is a **scroll-back cost**. A comment history filling with the retired lane's
topics makes the owner's own profile read as though that lane is still the offer. Invisible per
comment, compounding across the book. It weighs against a cadence, not against the person.

The owner's retired or secondary lanes, if any, are recorded in
`references/engagement-profile-criteria.md` under *Reference positioning*.

---

# STEP 4 — THE VERDICT

Name the group and the sub-type where it applies, in one line, with the reason that
decided it.

## Verdicts that are none of the three

Use these where they are the honest answer:

- **DELIVERY-PARTNER CANDIDATE** — not a target, not a decline (`icp.md` partners note)
- **REFERRAL OUTLET, direct contact only** — serves people the owner sends away;
  keep the relationship, spend no engagement slots (the referral-outlet pattern)

## Status vocabulary — use these, not "hold"

**SHAPE-QUALIFIED HOLD is retired.** It was doing several unrelated jobs at once, and
because none of its gates was time-based, every held row sat at the same Next Action date
and surfaced overdue every morning forever. Say which of these is true instead:

| Status | Means | What clears it |
|---|---|---|
| `qualified-active` | Fits, posting, workable now | — |
| `qualified-quiet` | Fits, but no recent posts | Nothing. Work them by DM. |
| `accepted-g1` | Audience host, cleared on the room | — |
| `peer-watch` | Group 3, collab or referral track | — |
| `compliance-review` | Blocked on a written compliance rule | The rule being settled |
| `research-needed` | One named gap, and the gap is stated | Finding that one fact |
| `declined-g2` | Failed Group 2 only; may still host | New evidence |
| `excluded-all` | Competitor or compliance, every group | Nothing |

**`qualified-quiet` is the important one.** It means **commercially qualified but not
comment inventory.** Someone who clears the shape and does not post is a qualified target
who cannot be worked by commenting today. That is a fact about the channel, not a verdict on
the fit, and it must never be recorded as a decline.

> ### ⚠️ A quiet account is NOT automatically a DM
>
> Do **not** route quiet accounts to direct outreach by default. A DM is a different channel
> with its own cost, its own cadence limits and its own authorisation. Set the **Engagement
> route** field instead, to one of:
>
> | Route | Means |
> |---|---|
> | `wait for post` | Wait for them to post; check on the recorded cadence |
> | `employee/company surface` | Reach the firm through its people or company page |
> | `group 1 adjacency` | They read and occasionally comment under a bigger voice; meet them there |
> | `monitor` | No route today; re-read at the recorded date |
> | `direct outreach` | **Only if separately authorised.** Never the default, and never inferred from the account being quiet |
>
> **Do not set a quiet account's Next Action to today unless there is a real, authorised
> action.** A date with nothing behind it manufactures an overdue row that surfaces every
> morning and can never be cleared, which is the exact failure that retired the old
> `SHAPE-QUALIFIED HOLD`.

Every `research-needed` row states the single missing fact. If you cannot name it in one
line, the honest status is a decline or an add, not a wait.

## The posting gate (applies to all three groups)

An account is only worth a cadence if they actually post. A Group 1 account that does
not post has no comment section to be seen in; a Group 3 account that does not post
teaches nothing.

A profile PDF alone does not show this. If posting is unverified, **say so** — a group
verdict on the profile is not a complete verdict without it.

# STEP 5 — COMPLIANCE AND HANDLING

Set the compliance mode per `.claude/rules/gates.md`. Which modes exist, and what triggers each,
is owner-specific and lives there.

**Write a handling rule whenever the profile contains figures or named institutions.** This
applies to a PASS, and to a skip that might be revisited.

Name what must never be repeated, and what is safe to engage: *"engage the idea, never the
numbers."* Figures that belong to the target's employer or programme are never the target's own,
and must not drift into the owner's words.

---

# STEP 6 — FLIP CONDITIONS

Every skip ends with what would change it. Be specific and realistic.

A good flip condition names an observable event the owner could actually see in a post or on a
profile, drawn from their own criteria file. A bad one is a wish.

If nothing realistic would flip it, say that plainly. Hard exclusions do not get flip
conditions.

---

# STEP 7 — IF THEY FIT, ADD THEM

Only for a real group verdict (1, 2 or 3). A skip, a hard exclusion, a
`research-needed`, a `compliance-review`, a delivery-partner candidate and a referral outlet all
get logged at Step 8 but are **never added** to the targets file or the tracker.

`qualified-quiet` is the exception: it is a real Group 2 verdict, so the row IS added, with the
engagement route set and **no Next Action date unless there is an authorised action**.

Steps 5 and 6 ran first, so the handling rule and the flip condition are already in
hand. The row is the artefact that gets read back — write it once, complete.

## 7A — Append to the targets file

Add a row to the correct group table in `references/engagement-targets.md`:

`| Name | LinkedIn URL | why-one-line |`

The "why" column is the account's working record, not a label. Existing rows run long
by design and carry the reasoning, the warnings and the watch conditions. Include, where they apply: the business and its age, the audience read and what evidenced it, why this
group and not the other two, the compliance handling rule, and the flip or watch
condition.

Use the same warning markers as the neighbouring rows so they scan the same way:
⚠️ risk or a thing never to do · ⭐ the reason this account is here · 💡 a drafting note ·
✅ confirmed evidence · ➡️ a flip condition.

## 7B — Seed the engagement tracker

Append a row to `trackers/engagement-tracker.xlsx`, sheet `Accounts`. The columns:

| Column | Value |
|---|---|
| Name | as on the profile |
| Country | from the profile; leave blank if genuinely absent, never guess |
| Category | `Group 1` · `Group 2` · `Group 3` |
| Last Engaged | blank |
| Next Action | today's date |
| Total Engagements | `0` |
| First Engaged | blank |
| LinkedIn URL | full URL |
| Date Added | today's date |
| Status | the Step 4 vocabulary: `qualified-active` · `qualified-quiet` · `accepted-g1` · `peer-watch` · `research-needed` · `compliance-review` |
| Decline group | blank for an add. On a decline row, which group's test failed: `G2` · `G1` · `G3` · `all` |
| Audience host | `yes` where a Group 2 buyer ALSO has proven agency-owner reach. Blank otherwise. Never changes the primary group |
| Activity status | `active` (posted in 30 days) · `slow` (30–90) · `quiet` (90+ or unknown) |
| Commentable today | `yes` only with a fresh, workable post outside cooldown and company lane. Otherwise `no`. This is the field `/commenting-others` selects on |
| Engagement route | `wait for post` · `employee/company surface` · `group 1 adjacency` · `monitor` · `direct outreach` (authorised only) |
| Company lane | the firm, so two people at one company are never worked in the same window |

**`Category` carries the PRIMARY group and only that.** Audience-host potential goes in its
own column. A row must never read "Group 2 / Group 1".
| Notes | `Added YYYY-MM-DD.` then the working, as in 7A |

Write it with `openpyxl`, appending after the last populated row. Read the header row
first rather than assuming the column order.

**Do not guess missing geography or comment-section fit.** Leave the cell blank and say
what is unknown. An absent value is recoverable; a wrong one gets trusted.

## 7C — Confirm the balance shifted

Say what the group split is now. Adding to Group 3 when it is over target is a real
cost, and the count is the only thing that makes that visible.

---

# STEP 8 — LOG IT

**Both outcomes get logged. Always.**

## Audit log

Append one line to `audit-log.md`:

```
[YYYY-MM-DD HH:MM] profile-check | Name | verdict | evidence and reasoning
```

Verdict is one of: `GROUP 1` · `GROUP 2` (with the owner's sub-type where defined) · `GROUP 3` ·
`declined-G2` · `excluded-all` · `qualified-quiet` · `research-needed` ·
`compliance-review` · `peer-watch` · `DELIVERY-PARTNER CANDIDATE` ·
`NOT added (referral outlet, direct contact only)`.

Add the ground in brackets where it is decisive on its own: `(geography)`,
`(evidence gap, not a fit gap)`.

**A decline names the group whose test it failed.** `declined-G2` means Group 2 failed
and Group 1 and Group 3 were answered and also declined. `excluded-all` is the only
verdict that closes all three at once, and only a competitor or a compliance ground
earns it.

Bare `NOT added`, bare `employee` and bare `not a founder` are no longer valid verdicts.
A declined table full of rows reading "employee, not a founder" answers the Group 2
question and nothing else — none of them can be re-read later to find out whether an
audience host was researched and then thrown away. That is the failure this field exists
to stop.

**Record all three group calls, not only the winning one.** The rows that get read back
months later are the ones that say why Group 1 was closed *and* why Group 2 failed *and*
why Group 3 was declined. A verdict naming only the outcome cannot be re-examined when
something changes.

The reasoning field carries the working: role and duration, prior career, the audience
read and what evidenced it, which disqualifier fired and why, which precedent it
matches, what was deliberately NOT inferred, the compliance handling rule, and the flip
condition. These rows are read
back months later — the detail is the point, and existing rows run long by design.

## Daily note

Append to today's note in `daily-log/`:

```
- 🔍 Profile checked, NOT added: Name (role, company). One-line reason.
- ✅ Profile checked, GROUP 2 (A2): Name (role, company). One-line reason.
```

Icons in use: 🔍 not added · ✅ placed in a group · ⏸️ research-needed or compliance-review ·
🤝 delivery-partner candidate · ⛔ hard exclusion.

## Memory

Hard exclusions go to memory alongside the existing ones, so the name is recognised on
sight in a later session.

## Patterns

If several checks in a session fail the same way, say so. That observation is what
distinguishes a screening problem from a sourcing problem, and it has already changed
how targets are found.

Watch the **audience axis** in particular. Pasted profiles repeatedly arrive from
adjacent expert worlds and fail Group 1 on whose room it is, while Group 1 stays the
gap. That is a sourcing-input problem, not a screening problem, and naming it is worth
more than the individual verdict.

---

# STEP 9 — REPORT

Give the owner the short version, per `CLAUDE.md`: **the group** (or none), the one
reason that decided it, and the flip condition. Under 150 words.

Where a group was a close call, say which one and what would have tipped it. Where the
posting gate is unverified, say that too.

The full working goes in the audit log, not the reply.

If they landed in a group, say plainly that they were **added** — which group, and that
the targets file and tracker are both updated with Next Action set to today. Close with
the handoff: run `/commenting-others` to comment on them.
