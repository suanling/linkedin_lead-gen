# LinkedIn Metrics — Chrome extension (optional)

Automates the metrics half of the learning loop. Instead of pasting numbers into `/score-posts` by hand, this captures your own LinkedIn post + comment metrics from the page and drops them into `references/learning/inbox/`, where `score-posts` drains them.

**Client-side only.** It reads the analytics already shown on *your* posts while *you're* logged in. No scraping of other people, no credentials stored, no cloud — the data goes only to a server running on your own machine.

You do NOT need this. `/score-posts` works fine with manual paste. Install it only if you want the numbers captured automatically.

## What you need
- Google Chrome (or any Chromium browser: Edge, Brave)
- Node.js installed (`node --version` should print a version)

## Install — 5 steps

**1. Set a secret.** Create a file named `.env` in the workspace root (one level above `tools/`) with:
```
METRICS_SECRET=pick-any-long-random-string
```

**2. Start the local receiver.** In a terminal:
```
cd tools/linkedin-metrics-extension
node server.js
```
You should see "LinkedIn Metrics receiver running… Listening: http://127.0.0.1:5678". Leave it running while you capture. (Stop with Ctrl+C.)

**3. Load the extension in Chrome.**
- Go to `chrome://extensions`
- Turn on **Developer mode** (top-right)
- Click **Load unpacked**
- Select this folder: `tools/linkedin-metrics-extension`
- The "LinkedIn Metrics" extension appears in your toolbar.

**4. Configure it.** Click the extension icon → set:
- Endpoint: `http://localhost:5678/webhook/linkedin-metrics`
- Shared secret: the SAME string you put in `.env`
- Save.

**5. Capture.** Open one of your own LinkedIn posts (or your post analytics view), click the extension icon → **Send**. A JSON file lands in `references/learning/inbox/posts/`. (For DM inbox snapshots, open Messaging and use the DM capture button — lands in `inbox/dms/`.)

## Then score
Run **`/score-posts`** — it drains `references/learning/inbox/posts/*.json`, fills the blank rows in the ledgers, and recomputes quartiles. (If you skip the extension, score-posts just asks you to paste the numbers instead.)

## Auto-start the server (optional, macOS)
Add a `launchd` plist that runs `node server.js` on login, so the receiver is always up. Otherwise just run it manually before a capture session.

## Privacy / safety
- Runs on `127.0.0.1` only — not reachable from the network.
- Rejects any request without your `METRICS_SECRET`.
- Captured JSON (your metrics) lives in `references/learning/inbox/` and is **gitignored** — never committed.
- Reads only pages you open while logged in; stores no LinkedIn credentials.
