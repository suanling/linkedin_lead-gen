# AIOS LinkedIn Metrics — Chrome Extension

**v0.2.0** — Captures **your own** LinkedIn post metrics + DM-inbox snapshots from the pages you're already viewing, and sends them to your local AIOS inbox so the `score-posts` skill can roll them into the hook-performance + DM-attribution ledgers.

## What gets captured

| Source | Endpoint | Lands at |
|---|---|---|
| Post metrics + comment-1 reactions/replies | `/webhook/linkedin-metrics` | `references/learning/inbox/posts/<timestamp>-<urn>.json` |
| DM inbox snapshot (1:1 only, InMail/group skipped) | `/webhook/linkedin-dms` | `references/learning/inbox/dms/YYYY-MM-DD.json` (overwrites same-day) |
| Lead-magnet click exports (manual drop) | n/a | `references/learning/inbox/clicks/*.json` — ⚠️ **no live source since 2026-07-20** (was Beehiiv UTM export; newsletter moved to Substack, which has no equivalent export) |

**Why client-side?** LinkedIn's ToS forbids server-side scraping. This extension only reads the DOM in your own browser session — same access pattern as a human reading the page. Nothing runs in the background; nothing scrapes other people's profiles.

## Install (developer mode)

1. Chrome → `chrome://extensions/` → toggle **Developer mode** on (top right).
2. Click **Load unpacked** → select `plugins/linkedin-metrics-extension/`.
3. Pin the extension to the toolbar.

## Usage

1. Open one of your published posts in standalone view (URL contains `urn:li:activity:`). The post analytics card needs to be visible — easiest is to open the post detail page or your "View analytics" view.
2. Click the AIOS extension icon → **📸 Snapshot**.
3. Review the JSON preview. If `reactions` / `comments` / `impressions` are `null`, scroll the page so the analytics card is rendered, then snapshot again. (Selectors are best-effort; LinkedIn DOM changes often.)
4. Click **📤 Send**.

The payload lands in your local server (or n8n webhook) → AIOS `references/learning/inbox/posts/`.

### Capture DMs

1. Open `linkedin.com/messaging/`.
2. Click extension icon → **💬 Capture DMs**.
3. The popup scrapes the visible conversation list (scroll to load more first if you want a deeper window), filters out group chats and InMail, and POSTs to `/webhook/linkedin-dms`. Same-day captures overwrite — each click is a fresh snapshot.

### Use it weekly

Every Sunday before running `/score-posts`: (1) open each post you published this week and click **Snapshot → Send all** so post-metrics + comment-1 stats land in `inbox/posts/`. (2) Open `linkedin.com/messaging/`, scroll back ~7 days, click **Capture DMs** so a fresh `inbox/dms/<today>.json` is written. (3) Lead-magnet attribution via `inbox/clicks/` is **paused** — the Beehiiv UTM export was its only source and the newsletter moved to Substack on 2026-07-20. Skip this step until a replacement source exists. (4) Then run `/score-posts` — it'll drain whichever folders have data.

## Endpoint

Default: `http://localhost:5678/webhook/linkedin-metrics`

Override in popup → Settings if you run n8n on a different host/port.

## Local receiver (no n8n needed)

`server.js` is a zero-dependency Node script that listens on the endpoint and writes each payload into `references/learning/inbox/`.

### Run it

```bash
cd "plugins/linkedin-metrics-extension"
node server.js
```

You'll see:

```
AIOS LinkedIn Metrics receiver running.
  Listening: http://127.0.0.1:5678/webhook/linkedin-metrics
  Inbox:     /Users/.../references/learning/inbox
  Stop:      Ctrl+C
```

Leave it running while you snapshot posts. Stop with Ctrl+C.

### Auto-start on login (macOS, optional)

Create `~/Library/LaunchAgents/com.aios.linkedin-metrics.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.aios.linkedin-metrics</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/node</string>
    <string>/ABSOLUTE/PATH/TO/plugins/linkedin-metrics-extension/server.js</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>/tmp/aios-linkedin-metrics.log</string>
  <key>StandardErrorPath</key><string>/tmp/aios-linkedin-metrics.err</string>
</dict>
</plist>
```

Then: `launchctl load ~/Library/LaunchAgents/com.aios.linkedin-metrics.plist`

Edit the absolute paths first. Find your node path with `which node`.

## Limitations & sanity checks

- **DM attribution is proxy-based.** `score-posts` uses (a) lead_magnet_clicks via UTM (clicks/ folder), (b) keyword DMs whose preview contains a `cta_code`, (c) proxy DMs = new inbound 1:1 DMs in the 48h after a post goes live. The extension feeds (b) and (c) via the DM snapshot.
- **InMail-promoted DMs aren't captured** because LinkedIn flags them with the `inmail-pill` and they're paid promo, not organic — they would inflate proxy-DM counts. If you want them later, remove the InMail filter in `content.js → scrapeDMInbox`.
- **Group chats skipped** — name has commas / "and N others". Score-posts only attributes 1:1 inbound.
- **DM scrape only sees what's rendered.** Scroll the conversation list to load older threads before clicking Capture DMs.
- **Comment-1 stats are proxy for click-count.** LinkedIn doesn't expose link clicks; reactions on the pinned/top comment are the next-best signal. If LinkedIn changes the comment social-bar selectors, `comment_1_selector` in the JSON will be `null` and counts will stop landing.
- **Selectors are fragile.** If LinkedIn changes the DOM, snapshot returns nulls. Patch `content.js` — selector choices are commented inline.
- **Use only on your own posts.** This extension is designed for self-monitoring.

## Security

- No external endpoints. Only `localhost:5678` (or your override).
- No analytics, no telemetry.
- Reads only the active tab's DOM when you click Snapshot.
