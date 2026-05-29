#!/usr/bin/env node
// LinkedIn Metrics — local receiver
// Zero-dependency Node server. Listens on localhost:5678 and writes each POSTed
// JSON payload into the workspace learning inbox, where score-posts drains it.
//
// Usage:   node server.js
// Env:     METRICS_SECRET=<your-secret>  PORT=5678  INBOX=/abs/path  node server.js

const http = require("http");
const fs = require("fs");
const path = require("path");

// Auto-load .env from the workspace root (../../ from this file) if present.
function loadEnvFile(p) {
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = val;
  }
}
loadEnvFile(path.resolve(__dirname, "..", "..", ".env"));

const PORT = parseInt(process.env.PORT || "5678", 10);
const SHARED_SECRET = process.env.METRICS_SECRET || "change-me";
if (SHARED_SECRET === "change-me") {
  console.warn("⚠️  Using default secret. Set METRICS_SECRET in .env before going live.");
}

const ALLOWED_ORIGIN_PREFIXES = ["chrome-extension://", "https://www.linkedin.com"];

// Default inbox: ../../references/learning/inbox relative to this file.
const INBOX = process.env.INBOX || path.resolve(__dirname, "..", "..", "references", "learning", "inbox");
if (!fs.existsSync(INBOX)) {
  console.error(`Inbox folder does not exist: ${INBOX}`);
  console.error("Create it or set INBOX env var to a valid path.");
  process.exit(1);
}

const POSTS_DIR = path.join(INBOX, "posts");
const DMS_DIR = path.join(INBOX, "dms");
for (const d of [POSTS_DIR, DMS_DIR]) {
  if (!fs.existsSync(d)) { fs.mkdirSync(d, { recursive: true }); console.log(`✓ Created ${path.relative(INBOX, d)}/`); }
}

function corsHeaders(res, origin) {
  if (origin && ALLOWED_ORIGIN_PREFIXES.some((p) => origin.startsWith(p))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Metrics-Secret");
}
const pad = (n) => String(n).padStart(2, "0");
function filenameFor(payload) {
  const d = new Date();
  const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const urn = (payload.post_urn || payload.post_id || "unknown").split(":").pop();
  return `${stamp}-${urn}.json`;
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin || "";
  const originAllowed = !origin || ALLOWED_ORIGIN_PREFIXES.some((p) => origin.startsWith(p));
  corsHeaders(res, origin);

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }
  if (!originAllowed) { res.writeHead(403); res.end("Forbidden origin"); return; }
  if (req.headers["x-metrics-secret"] !== SHARED_SECRET) {
    console.log(`✗ 401 — X-Metrics-Secret ${req.headers["x-metrics-secret"] ? "mismatch" : "missing"}`);
    res.writeHead(401); res.end("Unauthorized"); return;
  }

  const isPosts = req.method === "POST" && req.url.startsWith("/webhook/linkedin-metrics");
  const isDms = req.method === "POST" && req.url.startsWith("/webhook/linkedin-dms");
  if (!isPosts && !isDms) { res.writeHead(404); res.end("Not Found"); return; }

  let body = "";
  req.on("data", (chunk) => { body += chunk; if (body.length > 2_000_000) req.destroy(); });
  req.on("end", () => {
    try {
      const payload = JSON.parse(body);
      let dest;
      if (isDms) {
        const d = new Date();
        dest = path.join(DMS_DIR, `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.json`);
      } else {
        dest = path.join(POSTS_DIR, filenameFor(payload));
      }
      fs.writeFileSync(dest, JSON.stringify(payload, null, 2), "utf8");
      const rel = path.relative(INBOX, dest);
      console.log(`✓ Wrote ${rel}`);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, filename: rel }));
    } catch (e) {
      console.error("✗ Failed:", e.message);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("LinkedIn Metrics receiver running.");
  console.log(`  Listening: http://127.0.0.1:${PORT}/webhook/linkedin-metrics`);
  console.log(`             http://127.0.0.1:${PORT}/webhook/linkedin-dms`);
  console.log(`  Inbox:     ${INBOX} (posts/  dms/)`);
  console.log("  Stop:      Ctrl+C");
});
