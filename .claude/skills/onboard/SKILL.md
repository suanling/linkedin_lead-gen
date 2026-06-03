---
name: onboard
description: Set up this workspace for the account owner — identity, value prop, ICP, offer, voice (light intake + optional deep Taste Interview), quality gates, industry/compliance, media, lead magnets. Fills account-profile.md, config.json, rules/voice.md, kk-post.md, references/about-me.md, references/voice-profile.md, references/*. Idempotent and resumable. Triggers "set me up", "onboard me", "make this mine", "I'm new here", "/onboard". Sub-command "/onboard voice" resumes just the voice interview.
---

# Onboard — make this workspace yours

After this runs, every skill knows who the owner is, what they sell, who they target, how they sound, and which quality checks to enforce. Everything stays inside this folder.

Read `START-HERE.md` and `CLAUDE.md` once for context, then run the steps. Confirm each file back as you write it. **Don't invent answers** — if the owner is unsure on ICP/offer/voice, ask one sharpening question rather than guessing.

## Step 0 — First-run setup + state check

### 0a — Location & duplicate-copy check (run FIRST, before creating or writing any file)
A common failure right after a `git clone`/download: the workspace ends up in a different folder than the one the owner actually opens — e.g. a copy on the **Desktop** (where Claude Code runs) while their real vault is in **iCloud Drive / OneDrive / Dropbox / Obsidian**. The skills then write to one copy while the owner views the other, so updates "never show up" in their files. Catch this before writing anything.

**Auto-detect first.** Run the bundled detector with the host's **native** Python (so cloud placeholders are enumerated — a translation layer like WSL/Git-bash often can't see `iCloudDrive`/`OneDrive`):

```
python .claude/skills/onboard/detect-workspace.py
```

It does two things: (a) **detect** — prints the working copy, flags a cloud-synced location, and lists **every** copy of this workspace it finds (matching the `CLAUDE.md` + `config.json` + `START-HERE.md` marker triplet) with each `config.json` timestamp; (b) **bootstrap** — deterministically creates any missing live file in the current copy (`*.example` → live file, `kk-post-template.md` → `kk-post.md`, and blank trackers with their schemas), never overwriting an existing file, so 0b below is handled automatically rather than relying on the model. `.env` is deliberately skipped (secrets — set up in Step 7). Pass `--detect-only` to skip bootstrap. Exit code `0` = single local copy, safe to proceed; exit code `1` = a problem needs a decision (more than one copy, or a cloud working copy). Act on the output:

1. **State where you're running.** Show the owner the working path the detector printed: "I read and write this workspace at `<path>`. Open your trackers and notes from exactly here, not another copy."
2. **If a cloud-synced location is flagged** (`iCloudDrive`, `OneDrive`, `Dropbox`, `Google Drive`, macOS `Library/Mobile Documents`): cloud folders store files as **online-only placeholders** (Windows `ReparsePoint`, macOS "dataless") the tooling often can't read or write, and edits may not sync immediately. Recommend either running from a **local, non-synced copy**, or setting the folder to **"Always keep on this device"**.
3. **If more than one copy is listed:** the copies will drift (Claude writes to the current one while the owner may open another — the exact "my updates don't show up" bug). Have the owner pick the **one** source of truth. If they pick a copy other than the current working directory, **stop** and tell them to relaunch Claude Code from that folder rather than silently writing to the wrong one. Never write to two copies.
4. **Record the choice** back to the owner so future sessions run from the same place. Only once the working copy is confirmed (detector exits `0`, or the owner has consciously accepted the setup), continue with first-run file creation below.

> If native Python isn't available, fall back to the manual version: print the cwd, check the path for the cloud segments above, and search the owner's common roots (home, Desktop, Documents, and the cloud roots) for the marker triplet.

### 0b — First-run file creation
> The 0a detector already performs this automatically (it bootstraps the current copy). This section is the spec it implements and the manual fallback if native Python isn't available. Either way, verify the live files below exist before continuing.

This is a pristine template (the owner's data is gitignored). On first run, create the live files from their blanks:
- For every `*.example` file, if the matching live file does NOT exist, copy it (e.g. `account-profile.md.example` → `account-profile.md`). Do not overwrite an existing live file.
- **`kk-post.md` is special** — its blank is `kk-post-template.md` (the empty `[xxx]` format library), NOT a `.example` file. If `kk-post.md` does not exist, create it by copying `kk-post-template.md`. `kk-post-example.md` holds worked examples in a generic voice for reference only; never copy its content into `kk-post.md` and never overwrite it. (Both `kk-post-template.md` and `kk-post-example.md` are read-only references.)
- If `trackers/lead-gen-tracker.xlsx` / `trackers/engagement-tracker.xlsx` don't exist, create them blank with their schemas (sheet "Prospects": Name·Country·Job Title·Company·Status·Date Requested·Date Connected·DM Stage·Last Contact·Next Action·Touchpoints·Lead Magnet Sent·LinkedIn URL·Notes; sheet "Accounts": Name·Country·Category·Last Engaged·Next Action·Total Engagements·First Engaged·LinkedIn URL·Date Added·Notes) via openpyxl.

Then read `account-profile.md`. If it's already filled (no `[xxx]`), confirm before overwriting. If `/onboard voice` was called, jump straight to Step 4b.

### Progress report — show this EVERY run
At the start of every `/onboard` or `/onboard voice` invocation (right after the state check above, before doing any step), display a completion percentage and the outstanding list, so the owner always knows where they stand:
- **Compute % complete** across the onboarding checklist — Step 1 identity (`account-profile.md`); Step 2 ICP (`icp.md` + `positioning.md` + `engagement-targets.md`); Step 3 offer; Step 4 (`about-me.md`, `voice-profile.md`, `voice.md`, `kk-post.md`); Step 5 industry + compliance (`config.json.industry` + `gates.md`, plus the operational ruleset if regulated); Step 6 gates (`config.json.gates`); Step 7 media (`config.json.media`); Step 8 lead magnets (`lead-magnets.md`). An item counts DONE when its file exists and holds no remaining clean `[xxx]`. A `[xxx — needs your real X]` genuine-gap marker counts as DONE (it was reached; the owner has no material for it). Score `kk-post.md` by **fill ratio** (filled formats ÷ total), not all-or-nothing, since it fills to sufficiency, not to zero placeholders.
- **Display format** — one headline line then a short list, e.g.:
  ```
  Onboarding: 78% complete
  Outstanding:
   - Step 5 compliance — gates.md still has [xxx]
   - Step 8 lead magnets — not started
   - kk-post.md — 136/769 formats unfilled
  ```
- Show it on a fresh run AND on every resume, so progress and what's left are always visible. When everything is DONE, say so plainly (`Onboarding: 100% complete`) instead of an empty list.

## Step 1 — Identity → `account-profile.md`
Name, LinkedIn URL, headline/role, company, market.

## Step 2 — Value proposition + ICP → `account-profile.md` + `references/icp.md` + `references/positioning.md` + `references/engagement-targets.md` (+ optional `references/market-context.md`)
Value prop, core promise, proof. Two ICP archetypes (who, pain/trigger, what they want, hook angle), disqualifiers. One-line positioning (problem → solution → outcome). **Seed `references/engagement-targets.md`** with the initial accounts and voices to engage (who the ICP follows, plus ideal-fit prospects) so `/commenting-others` and `/start-day` have targets on day one instead of an empty list.

**2b. Optional — refine the ICP via deep research** (offer: run now / skip). The owner declares the ICP from lived judgment FIRST; then `deep-research` pressure-tests it: is the pain real and current, how large, what words the ICP actually uses, where they gather (accounts, voices, hashtags), and what citable proof exists. **Research validates and locates the audience; it never defines it** — a research-generated ICP is the generic, ChatGPT-flavoured thing the owner rejects, so the owner keeps the final say. Outputs: sharpened `icp.md` (validated pains + real language + market-size signals), a richer `engagement-targets.md`, and `references/market-context.md` — a small file of cited, verifiable stats for compliance-safe content (every stat carries a real source; financial stats still pass the Mode 2 gate). **Skip it when the ICP is already sharp** — the value then is mostly the citable-stats + targets harvest, not the ICP itself.

**2c. Signature framework, lenses + content pillars → `references/positioning.md` ("Signature lenses" section).** Capture the owner's own model so every writing skill sounds like them, not generic. Use the owner's exact wording wherever they give it; never invent a framework they don't have.
- **Signature framework** — their named method/system and its parts (e.g. a multi-pillar framework), the part names and what each means. If they have none, leave it and note the gap; don't manufacture one.
- **Signature lenses (the canonical Focus Areas)** — the small set (≈4-6) of angles they see the world through. Ask for each in THEIR words: a name/theme, a 1-2 sentence description (keep verbatim), then add the "use as a lens" question. These are what `commenting-others`, `respond-to-own`, `post`, and `dm-sales-coach` run drafts through to stay distinctly the owner's, and what the angle-diversity rule rotates between. Map each to the framework part it draws on.
- **Scorecard + weekly structure (optional, only if they already have them).** If the owner has a scorecard/diagnostic that's *theirs*, capture its core axis + dimensions (they become value angles). If they run a content calendar, capture each day's theme + primary pillar focus + objective and tie it to a lens (powers `post` + angle-diversity). Most owners have neither; skip cleanly, never manufacture a generic version.
A different owner defines their own lenses; never carry one owner's lenses, scorecard, or framework into another's workspace.

## Step 3 — Offer / call → `account-profile.md`
The call you book, **call length (their choice — leave blank to state no duration; never hard-code one)**, booking link.

## Step 4 — Voice + master profile (one deep pass)

> **Regulated owner? Do Step 5 first.** If the owner's field is regulated (e.g. financial advice), establish industry + compliance (Step 5, incl. `gates.md` and any operational ruleset like `iafa-compliance.md`) BEFORE this deep fill — so financial content written into `voice.md`/`kk-post.md` is gated as it's written (concept-only, no numbers/products/returns), never retro-fitted after the fact.

One interview, four outputs. The quick intake (4a) gets the workspace usable fast; the deep Taste Interview (4b) captures the whole person and feeds it into the outreach voice, the master profile, the voice profile, AND the post library — never just one of them.

**4a. Outreach voice → `.claude/rules/voice.md`** (light intake, do now): tone, banned phrases, signature moves. Used for DMs + comments. This is the minimum so other skills can run; 4b deepens it.

**4b. Deep Taste Interview → `references/about-me.md` + `references/voice-profile.md` + `.claude/rules/voice.md` + `kk-post.md`** (optional, deep). Offer: run now / later (`/onboard voice`) / skip. `/onboard voice` resumes here. When 4b deepens `voice.md`, treat 4a's light version as a starting draft to expand and refine in place — one `voice.md`, deepened, never a second parallel file or a clobbered 4a.

One interview, applied to all outreach. As each answer lands, feed the captured traits into BOTH voice files and save the lived material into the master profile. Fill to the depth the interview supports on BOTH sides: deepen the outreach voice (`.claude/rules/voice.md`) as fully as the post library, never leaving DMs/comments on the lighter 4a pass while only posts get the deep treatment.

- **Interview deep enough to capture the person, paired with lived experience.** Go past writing mechanics to the owner's deep beliefs, personality, and non-negotiables (what they stand against, what they'd never say even if it performed). Push past polished answers to the raw conviction. For every belief and non-negotiable, also capture the **lived experience that illustrates it** (the real moment, client situation, turning point). A belief without its story is the hollow, ChatGPT-able content the owner rejects. Record belief + the story that earned it, paired.
- **Coverage target — the full "About Me" → `references/about-me.md`** (the master profile other skills read as source of truth). Probe each with real specifics and lived stories, not surface answers: identity; origin story (upbringing, family of origin, money growing up, what it made them, education, prior jobs); the turning point; partner/home + current family; health journey (then vs now); financial picture (numbers as PERSONAL CONTEXT ONLY, never for publishing under the compliance gate — money rules, financial origin, principles they believe); what they do + ICP; expertise + certs; values (and which are hardest now); beliefs (incl. any cultural-script rejected/rewritten/kept framing) + the story behind each; how they think + strengths; personality assessments (DISC, CliftonStrengths, Enneagram, Human Design, or whatever they've done — these explain the *why* behind the voice); energy profile + ideal day + non-negotiable anchors; personal life; support system; inner life (the running pattern, how they celebrate wins, their phrase for unfamiliar territory, what they carry quietly, spirituality, what people get wrong); therapy/inner work if relevant (named patterns, regulation tools, their standard of vulnerable-but-ChatGPT-proof content — about themselves, never others); life-purpose statement; goals (this year + 10-year vision); voice by platform.
- **Adaptive, no fixed question count.** Don't ask all of the above as separate questions in one sitting — pull the threads naturally and go deep where there's energy. Coverage areas, not quotas; follow productive threads, stop when saturated. One question at a time; push back on vague answers; demand specifics; call out contradictions.
- **Build the Story bank → `references/about-me.md` ("Story bank" section) — harvest, don't re-interview.** The Story bank is the writing skills' source for the "lead from lived experience" hard rule (`commenting-others`/`respond-to-own`). The interview above already surfaces lived scenes (the story behind each belief, the origin, the turning point, the professional shift) — **structure those** into the bank as *scene → the point it proves → which lens it fits* (lenses from `positioning.md`). Only **actively ask** where a lens still has no scene: *"a specific time you lived this — when, where, what happened, the moment it turned"* (push past summary to a concrete moment). One real scene per entry, never fabricated or embellished; financial concept-only (Mode 2); scenes involving others about the realisation only, never naming anyone. An entry seeded from existing material is a draft until the owner confirms it's true and theirs.
- **`references/voice-profile.md`** distils how they write and think (mechanics, signature moves, hard nos) from the same interview — the deeper companion to the one-line outreach voice in `voice.md`.
- **Deepen the outreach voice → `.claude/rules/voice.md`** to the same standard as the post library. As the interview yields material, fill its tone, signature moves, banned phrases, and short worked DM/comment examples as fully as the material supports — same rules (real material only; `[xxx — needs your real X]` where a detail is genuinely missing). The outreach voice must never end up thinner than `kk-post.md`.
- **Fill the post library → `kk-post.md`** (the **post-format library**: 100 LinkedIn templates whose `[bracketed stage directions]` are the FORMAT, never changed, and whose lines read `[xxx]` until filled). Use the captured voice + stories to replace the `[xxx]` example lines with the owner's own worked example for that format — **leaving every `[bracketed direction]` exactly as-is.** Use `kk-post-example.md` as the reference for the *shape and density* of a filled format (worked examples in a generic voice); take its structure, never its content. Fill in as many formats as the captured material is genuinely sufficient for — when the interview is rich, that is well past 10, not a token handful. Don't leave a format as clean `[xxx]` when the interview already holds material that could fill it. Follow the rules while filling: never fabricate, never reuse the same story/illustration as the centerpiece of more than one format (themes may recur, illustrations may not), and keep compliance (coaching = full voice; financial flips to concept-only — no numbers, products, or returns). Only where a format's specific lived detail is genuinely missing do you leave a clear `[xxx — needs your real X]` placeholder; the `post` skill then fills only those real gaps on demand, not formats the interview already supported.
- **Close the `[xxx — needs your real X]` gaps with targeted questions.** Filling a format leaves a genuine gap only where a specific lived detail is missing. When that happens, or when the owner returns via `/onboard voice` to deepen an already-filled library, don't just leave the gap for `post` to chase later. Ask the specific question each gap type needs, then write the answer in (cleaned to voice + compliance):
  - **Resource / listicle gaps** (e.g. format 67): "Name the actual books, tools, podcasts, or people you use and would put your name behind. For each, what it is and the one thing you took from it." Never invent titles.
  - **Client / proof gaps** (before/after, the anonymised case): "A real client situation — the stuck point, what shifted, the result." No names or identifying details; financial cases stay concept-only, no dollar figures, products, or returns.
  - **Asset / link gaps** (lead magnet, program, audit, carousel): "Does this asset exist? If so, the link and UTM. If not, leave the gap or offer `lead-magnet-gen`."
  - **Media gaps** (a personal photo, a specific image): record it as an owner-supplied asset, not something the interview can answer.
  - **Stat / claim gaps**: "Confirm the figure and its source before it's citable." Financial stats still pass the Mode 2 gate.
  - **Seeding from an existing draft.** If the owner already has a draft of their answers (content they generated elsewhere), use it to seed rather than re-asking from scratch: show their drafted answer per gap, have them confirm it's true or correct it, then write it in. Never paste a draft wholesale; it may be AI-generated too, so it carries tells and can fabricate. Every specific gets verified, em-dashes and voice cleaned, and financial details kept concept-only or routed to compliance.
- **Save incrementally** to all four files so the owner can stop and resume. `/onboard voice` continues at the next clean `[xxx]`. By default it SKIPS anything already marked `[xxx — needs your real X]` (reached, but the lived detail was genuinely missing) so it never re-asks for material the owner doesn't have. But when the owner returns specifically to close gaps, or brings new material or a draft, revisit those markers and fill them — the skip only avoids re-asking for material that doesn't exist yet; it is not a permanent lock.
- **Validate before it becomes the standing library.** After filling, run the new `voice.md` and `kk-post.md` content through the `anti_ai` check and the litmus test ("Could someone get this from ChatGPT?"), plus the compliance gate if the owner is regulated. Fix or flag any AI tells, fabricated specifics, or compliance slips before finishing — this content is the source every other skill imitates, so a tell here propagates everywhere.

## Step 5 — Industry + compliance → `config.json.industry` + `.claude/rules/gates.md` (+ `references/iafa-compliance.md` if regulated)
Declare industry. If regulated (e.g. financial advice), capture the rules into `gates.md`; if not, compliance stays light/off.
- **Operational ruleset.** For a regulated field, also create/populate the full operational ruleset the gate defers to (e.g. `references/iafa-compliance.md`): `gates.md` holds the summary, that file holds the detail qa-gate actually applies.
- **Account-separation decision.** Surface it explicitly — e.g. whether financial solicitation runs on a separate registered business page vs the personal/coaching account. Capture the owner's decision; never leave it silently "pending."

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
