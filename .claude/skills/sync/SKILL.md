---
name: sync
description: Back up owner data (audit log, trackers, references, posts, daily notes) to the private SL-linkedin repo. Run at the end of a working session or any time you want a checkpoint. Triggers "sync", "back up my data", "push my workspace", "save to github", "/sync".
---

# Sync

Backs up the owner's live workspace data to the **private** `SL-linkedin` repo on branch
`sl-live`. The template remote (`origin` → `linkedin_lead-gen`) never receives this data.

## Run it

```bash
./.claude/skills/sync/sync.sh              # commit + push
./.claude/skills/sync/sync.sh --dry-run    # preview, commit nothing
./.claude/skills/sync/sync.sh -m "note"    # custom commit message
```

Report the file list back to the owner. If it prints "Already up to date", say so plainly
rather than implying a backup ran.

## What it covers

`audit-log.md`, both trackers, all of `references/`, `kk-post.md`, `kk-carousel.md`,
`account-profile.md`, `config.json`, `.claude/rules/`, `.claude/settings.local.json`,
`daily-log/*.md`, `content/`, `lead-magnets/`, `pending-amendments/`.

Never sent: `.env`, `node_modules/`, `.DS_Store`, `daily-log/export/` (regenerable carousel
PNGs), `__pycache__/`, metrics-extension logs. The script re-checks this immediately before
committing and aborts if anything matches.

## Why the force-add

The template `.gitignore` deliberately excludes owner data so the public template repo stays
clean. Already-tracked files ignore that rule and sync normally, but **new** files in
`lead-magnets/`, `pending-amendments/`, and `content/` would stay invisible to `git status`.
The script force-adds those paths so nothing is silently missed.

## Guards

The script refuses to run if you are not on `sl-live`, if the `sl` remote is missing, or if
`sl` does not point at SL-linkedin. That last check is what stops owner data reaching the
public template repo.

## Care

- `sl-live` is the only branch that carries owner data. Never merge it into `main`.
- Never `git push origin sl-live` — that targets the template repo. Plain `git push` from
  `sl-live` is correct; it goes to `sl`.
- If SL-linkedin ever shows as public, stop and make it private before syncing.
