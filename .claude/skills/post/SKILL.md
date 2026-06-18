---
name: post
description: Produce a LinkedIn post end-to-end — pick a kk-post format, write it in the owner's voice, match a lead magnet, choose media (per config), run the QA gate, generate the 7 pinned comments, and log it. LinkedIn-only (no cross-platform repurposing). Triggers "write a post", "draft a linkedin post", "I have a draft post", "turn this into a post", "/post".
---

# Post — LinkedIn post production

Takes an idea or rough draft to a publish-ready LinkedIn post + its 7 pinned comments, in the owner's voice. LinkedIn-only. Content creation is a different machine from lead-gen — this is the content side.

**The content lens lives in `.claude/agents/linkedin-post-creator.md`.** That agent owns the creative work — ideation and voice-drafting in the short-form shape (emotional + point-of-view opener, Broad → Niche → Deep, Hook → Shift → Lesson → Call-to-Value, under 900 chars). This skill is the full pipeline *around* that lens: intake, format pick, lead-magnet match, media, QA, the 7 pinned comments, and logging. Invoke the `linkedin-post-creator` agent for a fast draft or a set of post ideas; run `/post` when you want the whole pipeline. The short-form shape and tone bounds are defined once, in the agent — this skill defers to it rather than restating them.

Read first: `kk-post.md` (post-format library), `account-profile.md` + `references/positioning.md` (angle, ICP), `references/lead-magnets.md`, `.claude/rules/voice.md` grounded by `references/about-me.md` + `references/voice-profile.md` (master profile + how she writes — the lived stories and signature moves), `references/market-context.md` (cited, compliance-safe stats when a post needs data), `config.json` (media). Quality via `qa-gate`.

**Capture beliefs & contrarian takes as you draft.** When the owner articulates a sharp, distinctly-theirs belief or contrarian take while shaping the post, offer to save it under the matching lens in `positioning.md` (Beliefs & contrarian takes) per `references/capture-protocol.md`. A consented testimonial may be *used* here, but only if `testimonials.md` marks consent granted and compliance cleaned.

## Pipeline

### 1. Intake
Get the topic / rough draft + the goal (visibility, authority, lead-gen). Two distinct picks from `positioning.md` (they are not the same thing):
- **Focus area(s)** (the *outcome* sold) — driven by the input: match the owner's "I help …" statement + raw content to one or more of `positioning.md → Focus areas`, by relevance (don't force a fixed count). Build the post on a single clear shift ("from X → to Y") so short-form stays punchy, even if it touches more than one area. If the input doesn't clearly map to any focus area, ask before drafting.
- **Content pillar / lens** (the *angle* it's told from) — from `positioning.md → Content pillars / Signature lenses` (derived in `/onboard`). Rotate a different one across posts for angle-diversity.

### 2. Pick / mix formats
Build the structure from the **filled `kk-post.md`** by **mixing and matching** — combine the moves from one or more of the owner's worked, in-voice examples that best fit the brief and the short-form shape. Draw on the filled examples, NOT the empty `[bracket]` scaffolding of `kk-post-template.md`. If `kk-post.md` isn't filled yet, flag it and ask the owner to run onboarding's Taste Interview rather than drafting from the empty template.

### 2a. Short-form shape (per the linkedin-post-creator lens)
Fill the chosen format to the short-form shape defined in `.claude/agents/linkedin-post-creator.md` — an emotional + point-of-view opener (no job title, ~8 words), Broad → Niche → Deep, then **Hook** (120–180) → **Shift** (150–250) → **Lesson** (150–250) → **Call-to-Value** (40–80), under **900 characters** total, structured problem → insight → solution → Call-to-Value. The shape is layered on the kk-post format, never replaces it. Default for punchy posts; skip only for a long-form piece. See the agent for the full shape and the tone bounds — don't restate them here, follow the agent so there's one source of truth.

### 3. Write it in voice
Draft per the `linkedin-post-creator` lens: fill the format with the owner's content, apply `voice.md` (and the filled kk-post examples as the voice reference). Tone may be positive/conversational with light humour, but `voice.md` + `anti-ai.md` win — no banned vocab, no em dashes inside sentences, no motivational-poster ending, contrarian edge kept (capped on financial content per `qa-gate` Mode 2). Zero AI tells.

### 4. Match a lead magnet
From `references/lead-magnets.md`, pick the magnet that fits the post's pain/topic. If none fits, suggest creating one with `lead-magnet-gen`. The magnet is delivered after a call, never pasted raw (link/asset) in the post.

**Placement of the ask.** Default: pinned comment #3 as a keyword-to-DM (this protects the post's reach). Optional: when the owner wants the ask in the post body, add one explicit keyword-to-DM line after the Call-to-Value (still never the raw link/asset). Coaching content only — on financial content an in-post lead-gen ask triggers `qa-gate` Mode 2 bucket-B pre-approval, so keep it in the comment there.

### 5. Media (per config)
Read `config.json → media`. Selfie / no-media always available. Infographic / carousel / video only if enabled (API keys present). Suggest the fitting media type; generate only what's enabled, else note "media: owner to supply".

### 6. QA gate
Run `qa-gate` on the post body. Do not proceed until it passes (voice + anti_ai always; compliance if enabled).

### 7. The 7 pinned comments
Generate all seven (1-2 lines each, one action):
1. Engagement question (A/B/C reply)
2. TL;DR lesson
3. Next-step CTA — prefer keyword-to-DM over a link
4. Social-proof mini-case — **source it, never invent it**: pull from `references/testimonials.md` (consent granted + compliance cleared) or the **Proof bank** in `references/voice-profile.md` (anonymised client patterns — no names or identifying detail; no $/products on financial). If nothing on file fits the post, ask the owner for a real anonymised case rather than fabricating one.
5. Conversation extender (role-specific)
6. Why-I-do-this (humanise)
7. Repost amplifier (why it matters)

Read `references/learning/` first: if `hook-performance.md` / `comments-performance.md` have ≥12 scored rows, bias the hook and comment patterns toward their `## Current Quartiles → Top` and avoid the Bottom; else use the defaults above.

### 8. Log
On "published":
- Save the post to a local content store (or note it) with frontmatter: format used, lead_magnet, media_type, comment_patterns.
- Append to `audit-log.md`: `[YYYY-MM-DD HH:MM] post | linkedin | <topic> | published`.
- Append **1 row** to `references/learning/hook-performance.md` (format + hook_pattern, scores blank) and **7 rows** (one per comment slot) to `references/learning/comments-performance.md`. `score-posts` fills the metrics at the 7-day mark.

## Rules
- Ideation and voice-drafting follow the `linkedin-post-creator` agent (the content lens); this skill orchestrates the pipeline around it. Keep the short-form shape and tone bounds defined once, in the agent.
- LinkedIn only — no X/Threads/IG repurposing.
- Never fake the owner's voice — if the draft is thin, ask before inventing lived detail.
- Lead magnet is the hook to earn a conversation. The magnet link/asset is never pasted raw in the post; the keyword-to-DM ask defaults to pinned comment #3 and may optionally appear as one explicit line in the post body (coaching only — financial in-post asks need `qa-gate` Mode 2 pre-approval).
- Build structure by mixing and matching moves from the *filled* `kk-post.md` examples (not the empty `kk-post-template.md`) to fit the brief; keep structure sourced from those worked examples (don't invent wholesale), and never reveal a format name.
