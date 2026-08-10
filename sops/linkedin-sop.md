---
sop: linkedin
modified: 2026-05-29
---

# LinkedIn Lead-Gen SOP

The playbook. The skills execute it; this is the reference for *how* and *why*. Read-only — propose changes via `/amend-sop`.

## 1. Purpose

Run the daily LinkedIn lead-gen funnel: comment on others' posts (warm), advance DM conversations toward a call or collaboration, reply to inbound comments, and keep the trackers current. Every message is drafted in the owner's voice, copy-pasted by the owner (never auto-sent), and logged.

## 2. Daily flow

Run in this order:
- **Start** — `/start-day`: reads both trackers, writes today's checklist (due + overdue) into the daily note.
- **Engage** — `/commenting-others`: comment on fresh posts from your targets. Promote good-fit accounts to the lead-gen tracker.
- **Follow up** — `/dm-sales-coach` per lead: new acceptances → first DM; replies → respond same day; check-ins due today.
- **Inbound** — `/respond-to-own` when there are comments on your own posts.
- **Source (manual)** — sent connection requests in Sales Nav? `/log-prospect` to capture them.
- **End of day** — one-line summary in `daily-log/YYYY-MM-DD.md`: what you did, any flags, any `/amend-sop` drafts.

Targets (comments/day, requests/day) are the owner's choice — set them in `references/engagement-targets.md` and `gates.md`.

## 3. Rules

**Always:**
- Load voice first: `.claude/rules/voice.md` (outreach) and the filled examples in `kk-post.md` (posts) / `kk-carousel.md` (carousels), grounded by `references/about-me.md` + `references/voice-profile.md`. For posts and carousels, the canonical fill rules are each library's header ("Principles for filling these formats" / "Carousel principles") — the Never list below is the outreach subset; don't diverge from the headers.
- Engage your ICP only (`account-profile.md` / `references/icp.md`). Skip disqualifiers. Skip the wrong geography if you target a specific market.
- Fresh posts only — last 24–48h. Older than 2 days = skip.
- Copy-paste mode — present the draft, run `qa-gate`, wait for "done", then log. Never auto-post.
- Honour the engagement gap per account (check the tracker's Next Action).
- Personalised connection notes only — never blank requests.
- One idea per DM. Short, human.

**Never:**
- Em dashes. Zero. (#1 AI tell.)
- AI vocabulary: crucial, pivotal, delve, landscape, foster, underscore, showcase, testament, profound, powerful (filler).
- Flattery openers: "Great post!", "Love this!", "So true!", "Spot on".
- Rule-of-three lists. Max 2 items.
- Drop contractions: it is → it's, I have → I've.
- Generic messages you could send to 50 people. Specific or rewrite.
- Pitch in DMs. The DM's only job is to earn the call.

## 4. Decision tree

- **Post older than 2 days / out of ICP / wrong geography:** skip, log as skipped.
- **On the tracker, Next Action in the future:** skip — honour the gap.
- **They reply in a DM:** respond same day.
- **Silent after first DM:** one follow-up after 5–7 days, then park. Max 3 touches.
- **They ask "what do you do?":** give the short version of your offer (from `account-profile.md`); don't dump details; ask what's on their plate.
- **Intent is collaboration, not buying:** switch to the COLLAB path in `dm-sales-coach` (mutual win → propose a concrete collab).
- **They challenge your credentials/claims, mention regulators, ask for pricing/guarantees, or show distress:** escalate to the owner. Don't respond yourself.

## 5. Templates

Voice rules apply. Personalise — never paste verbatim. Archetypes and offer come from `account-profile.md`.

**Stage 1 — Connection note (≤300 chars):**
```
Hi [Name], saw your post on [specific topic]. The bit about [specific point] landed. I work with [your ICP short label] thinking through [related angle]. Would love to connect.
```
**Stage 2 — First DM after accept:**
```
Hey [Name], thanks for connecting. Saw [specific recent post/activity]. [One specific reaction or question]. What's on your mind around [topic] lately?
```
**Stage 3 — Value bait (mid-conversation):**
```
Quick thought on [their context] — [one specific reframe/tactic/pitfall, 2-3 lines]. Curious if you've run into [related question]?
```
**Stage 4 — Call invite (after 2–3 real exchanges):**
```
This is easier on a call than in DM. [Call length if you state one], no pitch — just to map what you're working through. Open to it?
```

## 6. Escalate to the owner when…
Flag in the daily log; don't respond yourself.
- They challenge your credentials/claims.
- They mention regulators / complaints / ombudsman (relevant if your industry is regulated).
- They ask for specific pricing or guaranteed outcomes.
- They show distress (financial or mental health) — pause and flag.
- You're unsure which template/archetype fits, or a meeting time isn't confirmed.

## 7. Exceptions ledger
Append-only. Read every Monday.

| Date | Context | Decision |
|------|---------|----------|

*(empty — first exception logged here)*

## 8. Changelog

| Date | Section | Summary |
|------|---------|---------|
| 2026-05-29 | All | Template SOP — generic LinkedIn lead-gen playbook |
