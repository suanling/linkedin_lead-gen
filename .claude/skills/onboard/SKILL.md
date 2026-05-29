---
name: onboard
description: Set up this workspace for the account owner — identity, value prop, ICP, offer, voice (light intake + optional deep Taste Interview), quality gates, industry/compliance, media, lead magnets. Fills account-profile.md, config.json, rules/voice.md, kk-post.md, references/*. Idempotent and resumable. Triggers "set me up", "onboard me", "make this mine", "I'm new here", "/onboard". Sub-command "/onboard voice" resumes just the voice interview.
---

# Onboard — make this workspace yours

After this runs, every skill knows who the owner is, what they sell, who they target, how they sound, and which quality checks to enforce. Everything stays inside this folder.

Read `START-HERE.md` and `CLAUDE.md` once for context, then run the steps. Confirm each file back as you write it. **Don't invent answers** — if the owner is unsure on ICP/offer/voice, ask one sharpening question rather than guessing.

## Step 0 — First-run setup + state check
This is a pristine template (the owner's data is gitignored). On first run, create the live files from their blanks:
- For every `*.example` file, if the matching live file does NOT exist, copy it (e.g. `account-profile.md.example` → `account-profile.md`). Do not overwrite an existing live file.
- If `trackers/lead-gen-tracker.xlsx` / `trackers/engagement-tracker.xlsx` don't exist, create them blank with their schemas (sheet "Prospects": Name·Country·Job Title·Company·Status·Date Requested·Date Connected·DM Stage·Last Contact·Next Action·Touchpoints·Lead Magnet Sent·LinkedIn URL·Notes; sheet "Accounts": Name·Country·Category·Last Engaged·Next Action·Total Engagements·First Engaged·LinkedIn URL·Date Added·Notes) via openpyxl.

Then read `account-profile.md`. If it's already filled (no `[xxx]`), confirm before overwriting. If `/onboard voice` was called, jump straight to Step 4b.

## Step 1 — Identity → `account-profile.md`
Name, LinkedIn URL, headline/role, company, market.

## Step 2 — Value proposition + ICP → `account-profile.md` + `references/icp.md` + `references/positioning.md`
Value prop, core promise, proof. Two ICP archetypes (who, pain/trigger, what they want, hook angle), disqualifiers. One-line positioning (problem → solution → outcome).

## Step 3 — Offer / call → `account-profile.md`
The call you book, **call length (their choice — leave blank to state no duration; never hard-code one)**, booking link.

## Step 4 — Voice (two layers)

**4a. Outreach voice → `.claude/rules/voice.md`** (light intake): tone, banned phrases, signature moves. Used for DMs + comments.

**4b. Post voice via the Taste Interviewer → fills `kk-post.md`** (optional, deep). Offer: run now / later (`/onboard voice`) / skip.
- `kk-post.md` is the **post-format library**: ~44 LinkedIn templates whose `[bracketed stage directions]` are the FORMAT (never change them) and whose lines read `[xxx]` until filled with the owner's worked examples.
- **Adaptive, no fixed question count.** Interview to capture how the owner thinks, writes, and the lived stories/examples they'd actually use — across Beliefs & Contrarian Takes, Writing Mechanics, Aesthetic Crimes, Voice & Personality, Structural Preferences, Hard Nos, Red Flags. Coverage areas, not quotas; follow productive threads, stop when saturated. One question at a time; push back on vague answers; demand specifics; call out contradictions.
- **Fill the examples (required behaviour):** use the captured voice + stories to replace the `[xxx]` example lines in `kk-post.md` with the owner's own worked example for that format — **leaving every `[bracketed direction]` exactly as-is.** Save incrementally so the owner can stop and resume (`/onboard voice` continues from the first remaining `[xxx]`). It's fine to fill only the most relevant formats now; the `post` skill fills the rest on demand when a format is chosen.

## Step 5 — Industry + compliance → `config.json.industry` + `.claude/rules/gates.md`
Declare industry. If regulated (e.g. financial advice), capture the rules into `gates.md`; if not, compliance stays light/off.

## Step 6 — Quality gates → `config.json.gates`
Toggle the four: voice_match, compliance, anti_ai, spam_cadence. Set daily caps in `gates.md`.

## Step 7 — Media → `config.json.media`
Which can they generate (selfie always on; infographic/carousel/video gated on having API keys)? Note where keys live if used.

## Step 8 — Lead magnets → `references/lead-magnets.md`
Register existing magnets (name, archetype, link/file, UTM). If none, offer `lead-magnet-gen` to create one.

## Step 9 — Hand off
Trackers already exist blank in `trackers/`. Point them to `START-HERE.md` and the daily loop: `/start-day` → work the list → `commenting-others`, `dm-sales-coach`, `respond-to-own`, `log-prospect`.

## Rules
- Only write `account-profile.md`, `config.json`, `.claude/rules/*`, `kk-post.md`, `references/*`. Never edit `sops/`, other skills, or `CLAUDE.md`.
- Idempotent; safe to re-run. Always confirm before overwriting filled content.
