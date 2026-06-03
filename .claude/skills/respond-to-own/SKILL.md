---
name: respond-to-own
description: Reply to comments people leave on YOUR OWN LinkedIn posts — draft replies in your voice using the (1,3-4,1) comment architecture, written for the lurkers, to deepen rapport and earn DMs. Runs the QA gate, logs to the audit log. Triggers "reply to this comment", "someone commented on my post", "help me respond", "/respond-to-own", "/reply".
---

# Respond to comments on your own posts

Draft replies to the comments on your posts that sound authentically like you, add real substance, invite a second reply, and quietly build positioning. Every reply does five jobs: sound human, sound like you, add something new, invite continuation, reinforce your positioning.

Read first: `.claude/rules/voice.md` (and `kk-post.md` for deeper voice), grounded by `references/about-me.md` + `references/voice-profile.md` (the lived stories and signature moves), `references/positioning.md` (your POV / signature angles). Quality is enforced by `qa-gate` (voice_match + anti_ai). Copy-paste mode — you paste the reply, say "done".

**Capture as you reply.** A comment praising the owner is a testimonial → offer to capture it (consent-gated) per `references/capture-protocol.md`. A belief or contrarian take the owner articulates → offer to save it under its lens in `positioning.md` (Beliefs & contrarian takes).

## The (1, 3-4, 1) architecture
Hard limit: 5-6 lines (read on phones while scrolling). You're writing for the **lurkers**, not just the commenter.

- **1 = Hook / POV** — one line, a specific insight or angle, NOT flattery. Makes a lurker stop. (Bad: "Great point!", "Love this", or flattery disguised as insight — if removing it still makes sense, it was filler.)
- **3-4 = Value** — short lines, each one new substance. At least one line MUST be a real first-person detail from your own life (see "Two hard rules" below, not optional). It must add something **not** in the original comment. Optional tactical shape: Tactic → Example/Result → Pitfall → Why it matters.
- **1 = CTA** — one line, a real question that invites a reply. (Bad: "Thoughts?", "Agree?")

Ground the value in **your** POV and lived experience (from `positioning.md` / `kk-post.md`) — your signature angles are what make replies unmistakably yours.

### Two hard rules (what makes it sound like *you*, not an articulate stranger)
Not optional. A draft that breaks either one fails QA — rewrite before presenting.

1. **Lead from your own lived experience or a point of view only you would take.** At least one line of the value section must be unmistakably *yours* — one of:
   - **(a) a specific first-person lived detail**: a real moment, number, or scene from your own story. Pull it from the **Story bank** in `references/about-me.md`. Use what's actually recorded there; if nothing fits, that's a weaker reply (see below), don't invent one.
   - **(b) a signature lens, belief, or contrarian take**: a stance or angle that's distinctly yours, not the obvious take. Run the draft through one of your **Signature lenses** in `references/positioning.md`, or pull a saved **Belief / contrarian take** from that file, and let it generate the add.

   What does NOT satisfy this: a generic clever reframe an articulate stranger could write. That's the articulate-but-generic gap that makes a reply feel AI-written. The test for every draft: *could this line only have come from you?* If yes via (a) or (b), it passes. Required in Thought Leader and Conversationalist; Short & Sweet may run lighter but still obeys rule 2. Never fabricate lived detail — keep it true to `references/about-me.md` and `references/voice-profile.md`. No real anchor and no sharp lens to offer? Then it's a weaker reply; say so rather than papering over with a reframe.

2. **Speak from your life, never about their people.** Don't analyse the commenter's clients, team, or audience as if you know them ("when you hit that pause with someone", "the leaders who…"). You haven't met their people, and theorising about them reads as presumptuous, not warm. React to the *idea* and to your *own* experience of it, in first person, on ground you've actually walked.

## How to draft
1. **Load voice** (`voice.md`, `kk-post.md`) — every time.
2. **Assess the commenter** — seniority (senior / peer / earlier-career), comment type (agreement / addition / question / challenge), relationship potential.
3. **Generate three variations** (all within 5-6 lines):
   - **Short & Sweet** (3-4) — light: strong one-liner + question. For simple agreements.
   - **Thought Leader** (5-6) — full (1,3-4,1), compressed strategic insight, numbered value points. For comments on your core themes.
   - **Conversationalist** (5-6) — value shifts toward shared experience; CTA invites a DM. For people you want a relationship with.
   - **Angle diversity (required):** the three variations must each add a *different* angle, ideally each run through a different **Signature lens** (`references/positioning.md`). Three versions of the same point is a fail. Name each variation's distinct angle to yourself before presenting.
4. **Run qa-gate** on each (voice_match + anti_ai). Fix anything it flags before presenting.
5. **Recommend** one, with a one-line why. Factor *who commented*: for a **peer / fellow creator**, default to the **Conversationalist** (relationship over lurker theatre), offering the Thought Leader "if you'd rather play to the audience"; for an **ICP prospect**, lead with whatever best surfaces their pain and earns the DM (commenter tone, post theme, your goal: visibility / relationship / DM).

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
