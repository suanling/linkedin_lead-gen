# LinkedIn Lead-Gen Workspace — Operating Instructions

A self-contained LinkedIn lead-generation workspace. It runs entirely inside this folder — no external systems. Fill it with your own identity, voice, and targets via `/onboard`, then run the daily loop.

> **New here?** Read [`START-HERE.md`](START-HERE.md) first.

## What this is

One linear funnel, from a stranger to a booked call (or a collaboration):

```
comment on their posts (warm)  →  connect (ACA)  →  DM rapport  →  surface pain
  →  offer lead magnet  →  3-message sequence  →  qualification call  →  close while warm
```

Content creation (writing posts) is a separate machine that supports the funnel by building visibility. Both live here.

## Folder map

```
account-profile.md     your identity, value prop, ICP, offer, lead magnets   (you fill)
config.json            gate toggles, industry, media, paths                  (you fill)
kk-post.md             your filled post-format library — [bracket directions] = format   (you fill)
kk-post-template.md    the empty [xxx] template onboard copies to kk-post.md   (read-only)
kk-post-example.md     worked examples in a generic voice — shape reference only   (read-only)
kk-carousel.md         your filled carousel-format library — [bracket directions] = format   (you fill)
kk-carousel-template.md the empty [xxx] carousel template onboard copies to kk-carousel.md   (read-only)
audit-log.md           append-only record of everything sent
trackers/              lead-gen-tracker.xlsx + engagement-tracker.xlsx
lead-magnets/          your magnets
references/            about-me + voice-profile + profile (master profile), icp, positioning,
                       content-calendar (dated plan), brand-system (carousel visuals), lead-magnets,
                       engagement-targets, market-context, iafa-compliance, learning/
sops/linkedin-sop.md   the playbook (read-only)
.claude/
  rules/               voice.md (outreach voice), anti-ai.md (full anti-AI rules), gates.md
  agents/              sales-coach, relationship-manager, qa-officer, linkedin-post-creator,
                       linkedin-carousel-creator, storytelling-strategist (lenses)
  skills/              onboard, start-day, qa-gate, commenting-others,
                       dm-sales-coach, respond-to-own, log-prospect,
                       post, lead-magnet-gen, score-posts, amend-sop
daily-log/             your daily notes (plan + record)
pending-amendments/    SOP change drafts awaiting your review
tools/                 optional: linkedin-metrics-extension (auto-capture for score-posts)
```

## The skills

| Skill | Does |
|---|---|
| `/onboard` | One-time setup: identity, ICP, offer, voice (incl. deep Taste Interview → master profile + voice + kk-post), gates, lead magnets |
| `/start-day` | Reads both trackers → writes today's checklist into the daily note (due + overdue) |
| `/commenting-others` | Comment on others' posts; logs engagement; promotes good-fit accounts to prospects |
| `/dm-sales-coach` | What to say per lead — SALES (→ call) or COLLAB (→ partnership) path |
| `/respond-to-own` | Reply to comments on your own posts |
| `/log-prospect` | Quick logger; also captures manual/Sales-Nav connection requests |
| `/post` | Write a LinkedIn post (kk-post format → voice → media → QA → 7 comments) |
| `/lead-magnet-gen` | Create a lead magnet from a pain point |
| `/score-posts` | Weekly — score posts + comments at 7 days; feeds the learning ledgers so `post` improves |
| `/qa-gate` | Runs the enabled quality checks before anything ships |
| `/amend-sop` | Draft a change to the playbook |

## Hard rules
- **Drafts, not sends.** Every message is copy-paste — you send it on LinkedIn yourself.
- **Log everything.** Skills write the tracker (always set Next Action) + `audit-log.md`.
- **qa-gate before shipping.** Runs only the checks enabled in `config.json`.
- **Read-only:** `sops/`, `.claude/skills/`, `.claude/agents/`, this file. Everything else is your data.
- **Voice:** outreach from `rules/voice.md`; posts from `kk-post.md`. No em dashes, no AI vocabulary, no flattery, no fabricated lived detail.
- **Never sell in DMs** — the DM's only job is to earn the call.

## Daily loop
1. `/start-day` → today's list in the daily note.
2. Work it: `/commenting-others`, `/dm-sales-coach`, `/respond-to-own`.
3. `/log-prospect` to record status changes.
4. Hit an exception? `/amend-sop`.

---
*Self-contained · one owner per folder · LinkedIn lead-gen.*
