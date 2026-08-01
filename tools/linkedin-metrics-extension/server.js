#!/usr/bin/env node
// AIOS LinkedIn Metrics — local receiver
// Zero-dependency Node server. Listens on localhost:5678/webhook/linkedin-metrics,
// writes each POSTed JSON payload into the AIOS inbox.
//
// Usage:
//   node server.js
//
// Override defaults with env vars:
//   AIOS_INBOX=/absolute/path/to/inbox  PORT=5678  node server.js
//
// Auto-start on login (macOS): see "launchd" section in README.

const http = require("http");
const fs = require("fs");
const path = require("path");

// Auto-load .env from AIS-OS root if AIOS_SECRET isn't already in env.
// Tiny hand-rolled parser; no dependency on dotenv.
function loadEnvFile(p) {
  if (!fs.existsSync(p)) return;
  const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2];
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = val;
  }
}
loadEnvFile(path.resolve(__dirname, "..", "..", ".env"));

const PORT = parseInt(process.env.PORT || "5678", 10);
const SHARED_SECRET = process.env.AIOS_SECRET || "change-me-aios-2026";

if (SHARED_SECRET === "change-me-aios-2026") {
  console.warn(
    "⚠️  Using default secret. Set AIOS_SECRET in .env (AIS-OS root) before going live."
  );
}
const ALLOWED_ORIGIN_PREFIXES = [
  "chrome-extension://",
  "https://www.linkedin.com",
  "https://web.whatsapp.com"
];

// Default inbox: ../../references/learning/inbox relative to this file.
const DEFAULT_INBOX = path.resolve(
  __dirname,
  "..",
  "..",
  "references",
  "learning",
  "inbox"
);
const INBOX = process.env.AIOS_INBOX || DEFAULT_INBOX;

if (!fs.existsSync(INBOX)) {
  console.error(`Inbox folder does not exist: ${INBOX}`);
  console.error("Create it or set AIOS_INBOX env var to a valid path.");
  process.exit(1);
}

// Ensure score-posts subfolders exist (posts/, dms/, clicks/).
const POSTS_DIR = path.join(INBOX, "posts");
const DMS_DIR = path.join(INBOX, "dms");
const CLICKS_DIR = path.join(INBOX, "clicks");
const WA_DIR = path.join(INBOX, "whatsapp-snapshots");
const WA_CONV_DIR = path.join(INBOX, "whatsapp-conversations");
for (const d of [POSTS_DIR, DMS_DIR, CLICKS_DIR, WA_DIR, WA_CONV_DIR]) {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
    console.log(`✓ Created ${path.relative(INBOX, d) || d}/`);
  }
}

function corsHeaders(res, origin) {
  const allowed =
    origin && ALLOWED_ORIGIN_PREFIXES.some((p) => origin.startsWith(p));
  if (allowed) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-AIOS-Secret");
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function filenameFor(payload) {
  const d = new Date();
  const stamp =
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const urn = (payload.post_urn || "unknown").split(":").pop();
  return `${stamp}-${urn}.json`;
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin || "";
  const originAllowed =
    !origin || ALLOWED_ORIGIN_PREFIXES.some((p) => origin.startsWith(p));
  corsHeaders(res, origin);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (!originAllowed) {
    console.log(`✗ 403 forbidden origin: ${origin}`);
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden origin");
    return;
  }

  if (req.headers["x-aios-secret"] !== SHARED_SECRET) {
    const got = req.headers["x-aios-secret"];
    console.log(
      `✗ 401 unauthorized — header X-AIOS-Secret ${
        got ? "mismatch" : "missing"
      }`
    );
    res.writeHead(401, { "Content-Type": "text/plain" });
    res.end("Unauthorized");
    return;
  }

  const isPosts =
    req.method === "POST" && req.url.startsWith("/webhook/linkedin-metrics");
  const isDms =
    req.method === "POST" && req.url.startsWith("/webhook/linkedin-dms");
  const isWa =
    req.method === "POST" && req.url.startsWith("/webhook/whatsapp-snapshot");
  const isWaConv =
    req.method === "POST" && req.url.startsWith("/webhook/whatsapp-conversation");

  if (!isPosts && !isDms && !isWa && !isWaConv) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > 2_000_000) req.destroy();
  });
  req.on("end", () => {
    try {
      const payload = JSON.parse(body);
      let dest, filename;
      if (isWaConv) {
        // One file per capture. Multiple chats accumulate side by side.
        // Filename = <chat-or-firstSender>-<HHMMSS>.json so captures NEVER
        // overwrite each other, even when the chat title can't be scraped.
        const d = new Date();
        const day = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        const dayDir = path.join(WA_CONV_DIR, day);
        if (!fs.existsSync(dayDir)) fs.mkdirSync(dayDir, { recursive: true });
        // Prefer the scraped title; else fall back to the first inbound sender
        // name (data-pre-plain-text captures this reliably even when title fails).
        let label = payload.chat;
        if (!label && Array.isArray(payload.messages)) {
          const inbound = payload.messages.find((m) => m && m.dir === "in" && m.sender);
          if (inbound) label = inbound.sender;
        }
        const safeChat =
          String(label || "unknown-chat")
            .replace(/[^\wÀ-￿ \-]/g, "")
            .trim()
            .slice(0, 50) || "unknown-chat";
        const stamp = `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
        filename = `${safeChat}-${stamp}.json`;
        dest = path.join(dayDir, filename);
      } else if (isWa) {
        // Same-day snapshots overwrite — chat list is a fresh point-in-time view.
        const d = new Date();
        filename = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.json`;
        dest = path.join(WA_DIR, filename);
      } else if (isDms) {
        // Same-day snapshots overwrite — DMs are a fresh point-in-time view.
        const d = new Date();
        filename = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.json`;
        dest = path.join(DMS_DIR, filename);
      } else {
        filename = filenameFor(payload);
        dest = path.join(POSTS_DIR, filename);
      }
      fs.writeFileSync(dest, JSON.stringify(payload, null, 2), "utf8");
      const rel = path.relative(INBOX, dest);
      console.log(`✓ Wrote ${rel}`);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, filename: rel }));
    } catch (e) {
      console.error("✗ Failed to write:", e.message);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`AIOS LinkedIn Metrics receiver running.`);
  console.log(`  Listening: http://127.0.0.1:${PORT}/webhook/linkedin-metrics`);
  console.log(`             http://127.0.0.1:${PORT}/webhook/linkedin-dms`);
  console.log(`             http://127.0.0.1:${PORT}/webhook/whatsapp-snapshot`);
  console.log(`             http://127.0.0.1:${PORT}/webhook/whatsapp-conversation`);
  console.log(`  Inbox:     ${INBOX}`);
  console.log(`             posts/  dms/  clicks/  whatsapp-snapshots/  whatsapp-conversations/`);
  console.log(`  Stop:      Ctrl+C`);
});
