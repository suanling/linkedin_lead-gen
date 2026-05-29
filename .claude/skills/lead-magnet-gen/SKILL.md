---
name: lead-magnet-gen
description: Create a lead magnet end-to-end in the owner's voice — find the idea, write it, package it, set up delivery, run a launch checklist, and register it so post and dm-sales-coach can use it. One skill, full pipeline (idea → asset → delivery → launch). Triggers "create a lead magnet", "make a lead magnet", "I need a freebie", "lead magnet ideas", "build a guide", "/lead-magnet-gen".
---

# Lead Magnet Generator

Full lead-magnet pipeline. A good lead magnet solves ONE specific problem fast and creates the *next* problem your offer solves (public principle, Hormozi's *$100M Leads*: the magnet should reveal a problem, not just give value). The conversion engine isn't the magnet — it's the 3-message post-download sequence in `dm-sales-coach`. The magnet is the hook that earns the conversation.

Read first: `account-profile.md` (offer, ICP), `references/icp.md` (pains), `references/positioning.md`, `.claude/rules/voice.md` + `kk-post.md` (voice), `config.json → media`.

Run the stages in order; you can also jump to one ("just give me ideas", "package this").

## Stage 1 — Idea finder
From `references/icp.md`, list the ICP's felt pains. For each, propose a magnet idea + format (checklist / template / swipe file / mini-guide / calculator / scorecard / cheat-sheet). Recommend the 1–2 with the best "quick win + reveals the next problem" fit. If the owner already has a pain in mind, start there.

## Stage 2 — Title + promise
3 title options — specific outcome, low effort, fast win ("The 5-point X audit", "Steal my Y template"). Recommend one. The promise must be actionable the same day.

## Stage 3 — Write it (creator)
Structure: intro (name the pain) → body (the steps / checklist / template / framework) → bridge (the *next* problem this surfaces) → soft CTA (a conversation, not a hard sell). Keep it tight — a usable tool, not a book. Owner's voice throughout (`voice.md` / `kk-post.md`).

## Stage 4 — Package it
- Decide the deliverable format and a clean name.
- Write the "what you get" blurb (3 bullets max).
- If `config.media` design generation is enabled (keys present): produce a branded PDF/visual. Else: deliver clean **markdown** and note "owner to design/brand".
- Save to `lead-magnets/<slug>.md` (+ asset file if generated).

## Stage 5 — Delivery setup
- Draft the **delivery message** (what you send when someone opts in) — short, warm, sets up the 3-message sequence.
- Note where the file/link lives and a **UTM tag** for the link (so downloads are trackable).
- Reminder: deliver *after* the qualifying conversation where possible (the magnet earns the call; don't dump it cold).

## Stage 6 — Launch checklist
Before it goes live, confirm:
- [ ] Solves one pain, fast; reveals the next problem
- [ ] Title promises a specific same-day win
- [ ] Voice + `qa-gate` passed (voice + anti_ai; compliance if regulated)
- [ ] Delivery message drafted; link/UTM set
- [ ] Registered in `references/lead-magnets.md`
- [ ] (Optional) announcement post — hand the topic to `/post`

## Stage 7 — Register
Add a row to `references/lead-magnets.md`: name · archetype/pain · link/file · UTM · notes. Now `post` and `dm-sales-coach` can match against it.

## Rules
- One pain, one quick win. Don't over-scope a magnet.
- Owner's voice throughout — never generic.
- Always register it so the rest of the funnel can use it.
- Degrade gracefully without design keys (markdown is always fine).
- The magnet reveals the next problem; it does not solve everything (that's the offer).
