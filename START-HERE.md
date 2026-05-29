# START HERE

This is a self-contained LinkedIn lead-generation workspace. Set it up once for your account, then run it daily. Everything stays inside this folder.

## Set up (once, ~20 min)

Run **`/onboard`**. It walks you through:
1. Who you are + your LinkedIn URL
2. Your value proposition + ICP (who you target)
3. Your offer + the call you book (call length is your choice)
4. Your voice — a short outreach voice, plus an optional deep **Taste Interview** that fills your post-format examples in `kk-post.md`
5. Your industry + which **quality gates** to enforce (voice / compliance / anti-AI / spam-cadence)
6. Your lead magnet(s) — register existing ones, or create one with `/lead-magnet-gen`

You can stop and resume the voice interview anytime with `/onboard voice`.

## The funnel (what you're running)

```
comment on their posts (warm) → connect (ACA) → DM rapport → surface pain
  → offer lead magnet → 3-message sequence → qualification call → close while warm
```

Pipeline fills two ways: you comment on good-fit people (and promote them), and people who reply/connect inbound. Source manually in Sales Nav too — `/log-prospect` captures it.

## Daily loop

1. **`/start-day`** — writes today's checklist into your daily note (who's due + overdue, from both trackers).
2. Work the list:
   - **`/commenting-others`** — comment on others' posts
   - **`/dm-sales-coach`** — what to say to each lead (sales or collab)
   - **`/respond-to-own`** — reply to comments on your posts
3. **`/log-prospect`** — record any status change (sent request / accepted / replied / call booked).
4. Posting content? **`/post`** (and **`/lead-magnet-gen`** when you need a new freebie).
5. Something the playbook doesn't cover? **`/amend-sop`**.

## The rules that matter

- Every message is a **draft** — you send it on LinkedIn yourself.
- Everything gets **logged** (tracker + audit-log).
- **Never sell in DMs** — the DM's only job is to earn the call.
- Voice: no em dashes, no AI vocabulary, no flattery, specific not generic.

Full rules: [`CLAUDE.md`](CLAUDE.md). The method: [`sops/linkedin-sop.md`](sops/linkedin-sop.md).
