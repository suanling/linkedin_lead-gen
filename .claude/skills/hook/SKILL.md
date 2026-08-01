---
name: hook
phase: 2
description: >
  Content hook craft — write and review opening lines for LinkedIn posts, IG captions, newsletter subjects, video scripts, and carousels. Uses the Hook · Retain · Reward unit, the Hook Checklist, and scroll-stopping hook patterns. NOT for sales bait or lead qualifying (that's the bait/dm-sales-coach skills). Use whenever the owner says "write a hook", "open this post", "stronger first line", "hook for [topic]", "hook checklist", "is this hook good", "scroll-stopping", "rewrite the opener", or pastes a draft and asks for the first line.
---

# Hook — Content Hook Craft

For content creation only — never for sales/lead qualifying. The opening line of a post is the only line most people read; this skill makes sure that one line earns the next.

## The unit

Every piece of content runs **Hook → Retain → Reward**:

- **Hook** — first 1–2 lines. Stops the scroll. Promises something specific.
- **Retain** — the body. Delivers on the promise without front-loading the payoff. Keeps tension across paragraphs.
- **Reward** — the close. Lands the insight or the CTA. The reader leaves with something.

The hook is not separate from the body — it's a contract for what the body must deliver. A great hook with a weak body breaks trust faster than a weak hook ever would.

## Hook checklist

Before any hook ships, check it against:

1. **Specific, not generic** — "9 years in GovTech" beats "Years in tech"
2. **Tension or surprise** — names a contradiction, a counterintuitive truth, or a confession
3. **Earns the next line** — the second line *has* to be read or the post falls apart
4. **the owner's voice** — first person, contractions, short, no buzzwords
5. **No cliffhanger bait** — don't promise a payoff you can't deliver in the body
6. **One idea** — if the hook contains two ideas, cut one

Full reference: `references/hook-checklist.md` and `references/scroll-stopping-hooks.md`.

## Scroll-stopping patterns (verified to work in her voice)

- **Confession** — "I used to think I was overwhelmed because I had too much work." (May 6 post)
- **Reframe** — "Firefighting doesn't make you valuable. It makes you available." (May 5 post)
- **Specific number / timeframe** — "9 years in GovTech."
- **Contradiction** — "The calmest leader in the room isn't deciding less."
- **Question that names her reader** — "What are you building that earns when you're not working?"
- **Inversion of common wisdom** — "A salary is the most unstable income you have."

Avoid: "Are you struggling with X?", "5 ways to Y", "The secret to Z" — generic, voice-breaking.

## Emotional trigger lens (use alongside patterns)

Every strong hook also triggers at least one of:

- **Admiration** — "I want that result" (e.g. "I signed 6 new clients last quarter — all from cold calls.")
- **Curiosity** — "I need to know this" (e.g. "After 8 years of cold calling, this is the only opener that works.")
- **Polarisation** — "Wait, really?" / "I disagree" (e.g. "Most advisors are afraid of cold calling. That is exactly why it works.")

Then refine with: **Quantify** (add a number), **Personalise** (first person), **Simplify** (cut to the spine). Full template library: `references/scroll-stopping-hooks.md`.

When generating options, label each by emotion type and note which refinements were applied. Always run the 6-point checklist before recommending.

## Self-improving loop

**Before generating any hook**, read `references/learning/hook-performance.md` → `## Current Quartiles → Top quartile`. If the section has examples (≥ 12 scored rows), use them as few-shot — match the patterns that have actually performed for *her* audience, not just the handwritten library above.

If the ledger is still warming up (< 12 rows), fall back to the handwritten patterns. Tell the user: "_ledger has {N} rows; falling back to handwritten patterns until 12_".

The ledger is updated weekly by the `score-posts` skill.

## Workflow

When she says "write a hook for [topic]":

1. **Read the ledger.** `references/learning/hook-performance.md` → top quartile patterns. Note the dominant pattern and emotion type for her best-performing posts in the last 30 days.
2. Ask one question: **what's the one true thing she wants the reader to walk away knowing?** (the Reward, in one sentence)
3. Generate **3 hook options** — different patterns from the list above
3. For each, show the first 2 lines + 1 sentence on why it'd hook her ICP (PMs/BAs/SWEs in Singapore who feel quietly replaceable)
4. Mark her natural pick (the one closest to recent published posts in `Content/`)
5. After she picks one, draft Retain + Reward to match the hook's contract

When she says "is this hook good?":
- Run the 6-point checklist
- Quote the strongest line and the weakest line
- Suggest one specific revision (not "make it better" — show the rewrite)
- Never hedge — say yes, no, or rewrite

## Voice never-dos

Buzzwords ("game-changer", "synergy", "leverage" as a verb, "crushing it") · walls of text · more than one exclamation mark · em-dashes used to dramatise · "Are you...?" openers · "Here's the thing..." (unless followed by something genuinely sharp).

## References

- `references/hook-checklist.md` — full checklist (mirrored from `references/hook-checklist.md` in AIS-OS)
- `references/scroll-stopping-hooks.md` — pattern library (mirrored from `Content/Strategy/scroll-stopping-hooks.md`)
- `references/hook-retain-reward.md` — the unit framework (mirrored from `Zettelkasten/Content Unit — Hook Retain Reward.md`)
- `.claude/rules/voice.md` (grounded by `references/voice-profile.md`) (one level up at `.claude/rules/voice.md` (grounded by `references/voice-profile.md`)) — VOICE PROFILE, single source of truth

## Boundaries

This skill is for **content** hooks only. For sales hooks (DM openers, cold call openers, qualifying questions, lead-magnet drops): use `bait`, `dm-sales-coach`, or the `linkedin-leadgen` / `ekko-leads` plugins.
