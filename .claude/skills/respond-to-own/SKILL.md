---
name: respond-to-own
description: Reply to comments people leave on YOUR OWN LinkedIn posts — draft replies in your voice using the (1,3-4,1) comment architecture, written for the lurkers, to deepen rapport and earn DMs. Runs the QA gate, logs to the audit log. Triggers "reply to this comment", "someone commented on my post", "help me respond", "/respond-to-own", "/reply".
---

# Respond to comments on your own posts

Draft replies to the comments on your posts that sound authentically like you, add real substance, invite a second reply, and quietly build positioning. Every reply does five jobs: sound human, sound like you, add something new, invite continuation, reinforce your positioning.

Read first: `.claude/rules/voice.md` (and `kk-post.md` for deeper voice), grounded by `references/about-me.md` + `references/voice-profile.md` (the lived stories and signature moves), `references/positioning.md` (your POV / signature angles). Quality is enforced by `qa-gate` (voice_match + anti_ai). Copy-paste mode — you paste the reply, say "done".

## The (1, 3-4, 1) architecture
Hard limit: 5-6 lines (read on phones while scrolling). You're writing for the **lurkers**, not just the commenter.

- **1 = Hook / POV** — one line, a specific insight or angle, NOT flattery. Makes a lurker stop. (Bad: "Great point!", "Love this", or flattery disguised as insight — if removing it still makes sense, it was filler.)
- **3-4 = Value** — short lines, each one new substance: a tactic, a lived example, a reframe, or a named pitfall. The critical rule: it must add something **not** in the original comment. Optional tactical shape: Tactic → Example/Result → Pitfall → Why it matters.
- **1 = CTA** — one line, a real question that invites a reply. (Bad: "Thoughts?", "Agree?")

Ground the value in **your** POV and lived experience (from `positioning.md` / `kk-post.md`) — your signature angles are what make replies unmistakably yours.

## How to draft
1. **Load voice** (`voice.md`, `kk-post.md`) — every time.
2. **Assess the commenter** — seniority (senior / peer / earlier-career), comment type (agreement / addition / question / challenge), relationship potential.
3. **Generate three variations** (all within 5-6 lines):
   - **Short & Sweet** (3-4) — light: strong one-liner + question. For simple agreements.
   - **Thought Leader** (5-6) — full (1,3-4,1), compressed strategic insight, numbered value points. For comments on your core themes.
   - **Conversationalist** (5-6) — value shifts toward shared experience; CTA invites a DM. For people you want a relationship with.
4. **Run qa-gate** on each (voice_match + anti_ai). Fix anything it flags before presenting.
5. **Recommend** one, with a one-line why (commenter tone, post theme, your goal: visibility / relationship / DM).

## Failure patterns to avoid (the lessons, not the bio)
- **Poetic paraphrasing** — restating the commenter's point in fancier words. Fix: add a specific lived anecdote + a new angle + a CTA.
- **AI structural tells** — "not just X but Y" parallelism, "It is/That is" without contractions, stiff words ("genuinely unsettling"). Fix: contractions, plain phrasing, one concrete detail.
- **Abstract / academic** — jargon + rule-of-three lists. Fix: one concrete personal example, plain language.
- **Flattery opener + no value** — "Love this, you made it so profound." Fix: open with a real observation about the *topic*, not a compliment about the commenter.

## If the commenter is also a tracked prospect
If they're in `trackers/lead-gen-tracker.xlsx` (match on LinkedIn URL), this reply is a touch — increment `Touchpoints`, update `Last Contact` and `Next Action` via `log-prospect`. If they're a strong new fit, offer to add them.

## Logging
After "done", append to `audit-log.md`:
`[YYYY-MM-DD HH:MM] respond-to-own | <commenter name> | reply | <reply text>`

## Constraints
- 5-6 lines max. No clichés ("game-changer", "spot on", "couldn't agree more"). No emojis unless they used them first.
- Never open with flattery; the Hook is an insight. Never pitch in replies — the insight is the promotion.
- If they challenge/disagree, acknowledge-then-pivot: validate first, then offer your view.
