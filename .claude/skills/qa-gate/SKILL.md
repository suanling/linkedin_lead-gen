---
name: qa-gate
description: The quality gate every outbound message and post passes before it ships. Runs ONLY the checks enabled in config.json — voice match, industry compliance, anti-AI, spam/cadence. Other skills call this before presenting a draft. Triggers "qa", "check this", "is this ready", "/qa-gate".
---

# QA Gate

The last check before anything goes out. Config-driven: reads `config.json → gates` and runs only the checks set `true`, per `.claude/rules/gates.md`. Other skills (`commenting-others`, `respond-to-own`, `dm-sales-coach`, `post`) call this on every draft.

## Run

1. Read `config.json → gates` and `industry`. Read `.claude/rules/gates.md`.
2. For each enabled check, evaluate the draft:

| Gate | Check | Source of truth |
|------|-------|-----------------|
| `voice_match` | Sounds like the owner? | `.claude/rules/voice.md` (DM/comment) or `kk-post.md` (post), grounded by `references/about-me.md` + `references/voice-profile.md` (lived stories, signature moves, hard nos) |
| `compliance` | Within the declared industry rules? Strict if regulated, light/skip if not. | `config.json.industry` + `gates.md` |
| `anti_ai` | No AI tells: em dashes, banned vocabulary, banned sentence patterns, rule-of-three, missing contractions, formatting tells | **`.claude/rules/anti-ai.md` (complete — Part 1 rules + Part 2 field guide)** |
| `spam_cadence` | Within daily caps; not templated/spammy | `gates.md` caps |

3. **Output** per enabled gate: `PASS`, or the exact problem + the fix (quote the offending phrase, give the rewrite).
4. If any gate fails, the draft does **not** ship until fixed. Re-run after the fix.

**Testimonial consent (part of `compliance`).** If a draft quotes or paraphrases a testimonial, confirm it exists in `references/testimonials.md` with `Consent to publish` granted (and, if regulated, `Compliance cleaned = yes` — no PII, no figures, Mode 2). Not consented, or not in the store, → FAIL: it cannot ship.

## Owner's final pass (after the gates PASS)
The machine gates catch the tells. They can't see whether the words are actually yours. So when
every enabled gate passes, close the output with these three for the owner to run in the two
seconds before they paste it into LinkedIn:

> Once the gates pass, ask yourself before you send:
> 🦊 Does this sound like me?
> 🦊 Have I added a point of view?
> 🦊 Have I shared a real example?

If any answer is "no," it isn't ready — the gate passing means it's clean, not that it's yours.
This matters more than it used to: LinkedIn now suppresses the reach of posts and comments that
read as generic (no point of view, no lived example), often down to first-degree contacts only.
A "no" on question 2 or 3 isn't just weak voice now, it's content the platform will quietly
bury. (Cadence — spacing comments out, varying their shape — is a behavior across the day, not a
per-draft check, so it lives in the `spam_cadence` gate, not here.)

## Rules
- Only run enabled gates. A coach with `compliance:false` skips compliance entirely.
- Be concrete, never "looks good" — evidence and specific rewrites only.
- This skill judges; it does not send. The calling skill sends after PASS.
