---
name: log-linkedin-post
phase: 3
description: >
  Log a published LinkedIn post — files it in the content store, appends a line to today's
  daily note, and updates the content index when one is configured. All destinations come
  from config.json → paths. Scored later at the 7-day mark by score-posts.
  
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


> **Paths come from `config.json`.** Read `config.json → paths` and write only where it points:
> - `content_store` — where published posts are filed (default `content/`)
> - `daily_notes` — the daily-note folder (default `daily-log/`)
> - `daily_note_template` — the template used when today's note doesn't exist yet
> - `content_index` — a running index of published posts; skip STEP 3 when blank
>
> These default to folders inside the workspace. They can point at an external notes vault
> instead, in which case say so plainly in the confirmation, since the write lands outside
> the workspace and outside whatever backs it up. If a path is blank, ask the owner where it
> should go and offer to save it to `config.json`. Never hardcode an absolute path here.

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

**File location:** `<config.paths.content_store>/`
**File name format:** `YYYY-MM-DD-[kebab-slug].md`

Example: `2026-06-23-founder-identity-shift.md`

**Match the folder you are writing into.** Before creating the file, list
`<config.paths.content_store>/` and follow the naming already in use there. The kebab-slug
form above is this workspace's `content/` convention; a vault using
`YYYY-MM-DD — LinkedIn — Topic.md` keeps that instead. Never mix two conventions in one folder.

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

Write this file to: `<config.paths.content_store>/` using the naming convention you confirmed above.

---

## STEP 2: UPDATE TODAY'S DAILY NOTE

**File:** `<config.paths.daily_notes>/YYYY-MM-DD.md`

Find the section `## 📝 What Happened Today` and append this line:

```
- ✅ Published LinkedIn post: [[YYYY-MM-DD — LinkedIn — [Topic]]]
```

**Important:** 
- Append — never overwrite existing lines
- If today's daily note doesn't exist yet, create it from `<config.paths.daily_note_template>` when that is set; otherwise start a plain note with a `## 📝 What Happened Today` heading
- If the heading isn't present in an existing note, add it at the end rather than rewriting the note
- If a "Published LinkedIn post" line already exists for today, add a second one (each post gets its own line)

---

## STEP 3: UPDATE CONTENT INDEX

**File:** `<config.paths.content_index>`

**Skip this step entirely when `content_index` is blank** — the content folder is then the
record, and there is no index to maintain. Do not invent one.

When it is set, find the `### Published` section and add a new line at the **top** of the list (most recent first):

```
- [[YYYY-MM-DD — LinkedIn — [Topic]]] — *[2–5 word descriptor of the post's theme]*
```

The descriptor should capture the angle or pillar in plain language — not the title, but the essence (e.g. `Financial clarity / survival identity`, `Career transition / buffer building`).

---

## STEP 4: (removed) DAILY FUNNEL TRACKING

The daily note no longer contains a `📊 Daily Tracking` table. Post performance is picked up
at the 7-day mark by `/score-posts`, which reads the metrics inbox and matches on `post_urn`.
**Skip this step.** Do not look for or create a Content & Visibility table in the daily note.

---

## STEP 5: CONFIRM

Show a clean summary:

```
✅ Post logged: <filename>

📄 Content file created: <content_store>/<filename>
📝 Daily note updated: logged under What Happened Today
📋 Content Index updated: added to Published        ← omit when content_index is blank
```

List only the steps that actually ran. If a step was skipped (no index configured, daily note
heading missing), say so plainly rather than printing a line that implies it happened.

---

## RULES

- Always read files before editing — never assume structure, verify from the actual content
- Preserve all existing content when appending or editing — especially the daily note and index
- Never overwrite or delete existing entries
- Use the exact Obsidian wikilink format `[[Note Name]]` for internal links — no markdown URLs
- If any file can't be found, tell the user and ask where it moved before proceeding
