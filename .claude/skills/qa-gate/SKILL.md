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
| `anti_ai` | No AI tells: em dashes, banned vocabulary, banned sentence patterns, rule-of-three, missing contractions, formatting tells | **`.claude/rules/anti-ai.md` (complete: Hard bans, flag on one occurrence, plus Cluster tells, flag only when several co-occur)** |
| `spam_cadence` | Within daily caps; not templated/spammy | `gates.md` caps |

3. **Mechanical scan before the holistic read (`anti_ai` only).** Don't rely on a single vibes-based
   read to catch reversal/contrast constructions — self-review has repeatedly missed fresh instances
   of this exact pattern even moments after fixing the same pattern elsewhere in the same draft.
   Before judging tone, literally scan the draft text for these markers, and check every hit against
   `anti-ai.md`'s "Reversal / contrast tricks" bullets (AI pivot, difficulty-escalation reversal,
   negative parallelism, symmetric quotable pair):
   - "isn't" / "wasn't" / "doesn't" paired later in the same sentence or the next one with "it's" /
     "it does" / a restated subject
   - "not X, but" / "not because ... but because" / a trailing "..., not ___" at a sentence's end
   - "the actual/real ___" / "what actually matters/counts" / "___ matters more"
   - two consecutive sentences with matched subjects and an escalating verb ("Good ___ does A. Great
     ___ does B."; "___ alone doesn't do A. A well-planned ___ can do B.")
   A hit isn't automatically a fail — plenty are innocent factual comparisons or the sanctioned
   acknowledge-then-redirect move from `voice.md` — but every hit must be run through the strip-down
   test ("does this collapse to '[Thing] wasn't the problem, [other thing] was'?") before the draft
   can be marked clean. Do this scan even on a draft that already looks fine.
4. **Party-differentiation scan before the holistic read (`voice_match` only).** Same reasoning as
   Step 3: don't trust a vibes-only read to catch a fact attributed to the wrong person — self-review
   has already let three separate instances through in one session. Every fact in a draft belongs to
   exactly one of two parties, the owner or the target being commented on/replied to/messaged; this
   scan checks the draft hasn't blurred which is which. Before judging tone, literally scan for:
   - **"your ___" claims** ("your research," "your product," "your team," "your nine years") —
     trace each one back to the target's own post/thread text. If the source frames it as observed,
     learned, or relayed ("I saw this," "I learned this on a trip") rather than built/owned, a draft
     that treats it as the target's own work fails.
   - **Causal connectors** ("so," "that's why," "because") joining two claims — if both claims come
     from `about-me.md`, confirm the source text itself draws that connection; two true facts near
     each other there is not evidence they're linked.
   - **A bare "you" sitting next to a specific number, scene, or credential** — check whether that
     detail is actually the *owner's own* fact from `about-me.md`. If so, it must be explicitly
     marked as hers ("I... myself"), never left phrased as if it describes the target. This is the
     one that matters most: never let the owner's own information read as a claim about the person
     she's writing to.
   A hit isn't automatically a fail — plenty of "your X" phrasings are accurate. But every hit must
   be traced to its source before the draft can be marked clean, on every draft, not just ones that
   look risky.
5. **Output** per enabled gate: `PASS`, or the exact problem + the fix (quote the offending phrase, give the rewrite).
6. If any gate fails, the draft does **not** ship until fixed. Re-run after the fix.

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
