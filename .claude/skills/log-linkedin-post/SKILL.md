---
name: log-linkedin-post
phase: 3
description: >
  Log a published LinkedIn post to the vault — creates the content file in /Content/, 
  appends a log line to today's daily note, and adds the post to the Published section of 
  Content — Index.md. Post counts are rolled up weekly by the weekly-review skill.
  
  Use this skill any time the owner says "I published", "just posted", "log this post", 
  "save my LinkedIn post", "I went live on LinkedIn", "/log-post", or pastes a LinkedIn 
  post and says something like "it's up" or "this is live". Also trigger when she mentions 
  a post topic and says it went out today. Even if she just pastes post text without 
  explicit instruction — if it looks like something just published, offer to log it with 
  this skill.
---

# Log LinkedIn Published Post

When the owner shares a post that's been published on LinkedIn, do the steps below in sequence.

---

## STEP 0: GATHER WHAT'S NEEDED

You need five things before proceeding:

1. **Post body** — the full text of the post (usually pasted in chat)
2. **Topic / title** — a short descriptive name (2–5 words). Infer from the first line or hook if not given. Confirm before using.
3. **CTA** — the call-to-action keyword (e.g. `DM BUFFER`, `DM REDESIGN`, `Comment YES`). If not mentioned and not obvious from the post, ask.
4. **Post URL or URN** — the LinkedIn permalink (e.g. `https://www.linkedin.com/feed/update/urn:li:activity:7123456789/`). Extract the URN (`urn:li:activity:7123456789`) for matching against the metrics ledger later. If not given, ask — this is what `score-posts` uses to link metrics to the post.
5. **Hook pattern** — classify the opener using `.claude/agents/linkedin-post-creator.md` (the content lens) patterns: `confession` | `reframe` | `specific-number` | `contradiction` | `reader-question` | `inversion` | `other`. Plus emotion: `admiration` | `curiosity` | `polarisation`. Infer; confirm if uncertain.

Today's date is already known from context. Use it for all file names and dates.

If the post body is missing, ask for it before doing anything else.

---

## STEP 1: CREATE THE CONTENT FILE

**File location:** `Thinking Brain/Content/`
**File name format:** `YYYY-MM-DD — LinkedIn — [Topic].md`

Example: `2026-04-17 — LinkedIn — The Real Cost of Waiting.md`

Build the file with this structure:

```
---
title: [Topic — extended natural title, inferred from post body]
date: YYYY-MM-DD
modified: YYYY-MM-DD
tags: [content, linkedin, <2–3 topic tags inferred from the post>]
status: published
project:
role: content-writer
aliases: []
platform: LinkedIn
cta: [CTA keyword]
post_url: [full LinkedIn URL]
post_urn: [urn:li:activity:NNNNNNNNNN]
hook_pattern: [confession|reframe|specific-number|contradiction|reader-question|inversion|other]
emotion: [admiration|curiosity|polarisation]
pillar: [financial-flexibility|structural-irreplaceability|meta|personal]
length: [character count of post body]
scored: false
---

[Full post body, exactly as provided — preserve all line breaks]

---

*Published YYYY-MM-DD · LinkedIn · [[YYYY-MM-DD]]*
```

**Notes on frontmatter:**
- `title` should read naturally as a headline — not just the topic keyword
- Tags: always include `content` and `linkedin`, then add 1–3 topical tags (lowercase, hyphenated) inferred from the post theme (e.g. `financial-clarity`, `career-transition`, `ai-mindset`)
- `cta`: use the exact keyword (e.g. `DM BUFFER`) — if none in the post, leave blank

Write this file to: `Thinking Brain/Content/YYYY-MM-DD — LinkedIn — [Topic].md`

---

## STEP 2: UPDATE TODAY'S DAILY NOTE

**File:** the owner's daily note for today, `daily-log/YYYY-MM-DD.md`

Find the section `## 📝 What Happened Today` and append this line:

```
- ✅ Published LinkedIn post: [[YYYY-MM-DD — LinkedIn — [Topic]]]
```

**Important:** 
- Append — never overwrite existing lines
- If today's daily note doesn't exist yet, create it from the owner's daily-note template (copy the structure verbatim — headers, helpers, all sections) before adding the line
- If a "Published LinkedIn post" line already exists for today, add a second one (each post gets its own line)

---

## STEP 3: UPDATE CONTENT INDEX

**File:** `Thinking Brain/Content/Content — Index.md`

Under the `### Published` section, add a new line at the **top** of the list (most recent first):

```
- [[YYYY-MM-DD — LinkedIn — [Topic]]] — *[2–5 word descriptor of the post's theme]*
```

The descriptor should capture the angle or pillar in plain language — not the title, but the essence (e.g. `Financial clarity / survival identity`, `Career transition / buffer building`).

---

## STEP 4: (removed) DAILY FUNNEL TRACKING

The daily note no longer contains a `📊 Daily Tracking` table — LinkedIn post counts are now rolled up Sunday by the `weekly-review` skill from the Chrome-extension inbox. **Skip this step.** Do not look for or create a Content & Visibility table in the daily note.

---

## STEP 4.5: (SKIP) KNOWLEDGE BASE RAW

> **Retired 2026-08-01.** The `Knowledge Base` vault was renamed `Knowledge Base (Backup)`
> and last received a post on 2026-06-08. Do not write there — a mirror into a backup vault
> is worse than no mirror. Skip this step. If a raw mirror is wanted again, pick a live
> destination first and update this file.

<details><summary>Original step (kept for reference)</summary>

**File:** `Knowledge Base/raw/YYYY-MM-DD-linkedin-<slug>.md`

`<slug>` = lowercase topic, hyphenated (e.g. `friday-energy-audit`).

Write a copy of the post with this frontmatter:

```
---
source_type: own-content
platform: LinkedIn
date_published: YYYY-MM-DD
post_url: <full LinkedIn URL>
post_urn: <urn:li:activity:NNN>
topic: <Topic>
pillar: <pillar>
hook_pattern: <pattern>
emotion: <emotion>
cta: <CTA keyword>
ingested: false
---

<full post body>
```

If `Knowledge Base/raw/` doesn't exist or KB is offline, skip this step silently and
note `KB raw write skipped` in the confirmation. Don't block the rest of the logging.

This file gets picked up when KB Phase B ingest runs — no live ingestion now.

---

</details>

## STEP 5: CONFIRM

Show a clean summary:

```
✅ Post logged: [[YYYY-MM-DD — LinkedIn — Topic]]

📄 Content file created: Content/YYYY-MM-DD — LinkedIn — Topic.md
📝 Daily note updated: logged under What Happened Today
📋 Content Index updated: added to Published
📚 KB raw written: Knowledge Base/raw/YYYY-MM-DD-linkedin-<slug>.md
```

If anything was skipped (e.g. daily note didn't exist, table not found), note it clearly so she knows what's missing.

---

## RULES

- Always read files before editing — never assume structure, verify from the actual content
- Preserve all existing content when appending or editing — especially the daily note and index
- Never overwrite or delete existing entries
- Use the exact Obsidian wikilink format `[[Note Name]]` for internal links — no markdown URLs
- If any file can't be found, tell the user and ask where it moved before proceeding
