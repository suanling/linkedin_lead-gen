---
name: post
description: Produce a LinkedIn post end-to-end — pick a kk-post format, write it in the owner's voice, match a lead magnet, choose media (per config), run the QA gate, generate the 7 pinned comments, and log it. LinkedIn-only (no cross-platform repurposing). Triggers "write a post", "draft a linkedin post", "I have a draft post", "turn this into a post", "/post".
---

# Post — LinkedIn post production

Takes an idea or rough draft to a publish-ready LinkedIn post + its 7 pinned comments, in the owner's voice. LinkedIn-only. Content creation is a different machine from lead-gen — this is the content side.

Read first: `kk-post.md` (post-format library), `account-profile.md` + `references/positioning.md` (angle, ICP), `references/lead-magnets.md`, `.claude/rules/voice.md`, `config.json` (media). Quality via `qa-gate`.

## Pipeline

### 1. Intake
Get the topic / rough draft + the goal (visibility, authority, lead-gen). Identify the pillar/angle from `positioning.md`.

### 2. Pick a format
Choose the best-fit template from `kk-post.md`. Follow its `[bracketed stage directions]` exactly — they are the structure. If the owner's worked example for that format is still `[xxx]`, fill it now in their voice (and save it back to `kk-post.md` so it's reusable).

### 3. Write it in voice
Fill the format with the owner's content. Apply `voice.md` (and the filled kk-post examples as the voice reference). Zero AI tells.

### 4. Match a lead magnet
From `references/lead-magnets.md`, pick the magnet that fits the post's pain/topic. If none fits, suggest creating one with `lead-magnet-gen`. The magnet is delivered after a call, not dropped in the post (the post earns the comment/DM).

### 5. Media (per config)
Read `config.json → media`. Selfie / no-media always available. Infographic / carousel / video only if enabled (API keys present). Suggest the fitting media type; generate only what's enabled, else note "media: owner to supply".

### 6. QA gate
Run `qa-gate` on the post body. Do not proceed until it passes (voice + anti_ai always; compliance if enabled).

### 7. The 7 pinned comments
Generate all seven (1-2 lines each, one action):
1. Engagement question (A/B/C reply)
2. TL;DR lesson
3. Next-step CTA — prefer keyword-to-DM over a link
4. Social-proof mini-case (anonymised; compliance-aware if regulated)
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
- LinkedIn only — no X/Threads/IG repurposing.
- Never fake the owner's voice — if the draft is thin, ask before inventing lived detail.
- Lead magnet is the hook to earn a conversation, never dropped raw in the post.
- Follow kk-post bracket directions exactly; fill examples, never alter the format.
