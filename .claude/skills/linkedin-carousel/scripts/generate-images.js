#!/usr/bin/env node
// generate-images.js — generate carousel background images via the kie.ai
// Nano Banana API for the "Linkedin Carousel Design Template".
//
// Usage:
//   KIE_API_KEY=... node generate-images.js [template-dir] [variant]
//   e.g. KIE_API_KEY=... node generate-images.js \
//          "references/template/Linkedin Carousel Design Template" sb-v1
//
//   template-dir defaults to references/template/Linkedin Carousel Design Template
//   variant      defaults to sb-v1
//
// It reads the <Img ... placeholder="..."> art-direction tags for the chosen variant
// out of slides-stepback-all.jsx (slides 2/4/6/8; slide 10 is the selfie slot and is
// skipped), expands each short tag into a full editorial prompt, calls kie.ai, and
// downloads <variant>-slide-NN-bg.png. Writes images-<variant>.json mapping slide -> file.
// To USE the images, point that variant's <Img> slots at the files (replace placeholder
// with a src) and re-export.
//
// API (https://api.kie.ai):
//   POST /api/v1/jobs/createTask   { model, input:{ prompt, output_format, aspect_ratio } }
//   GET  /api/v1/jobs/recordInfo?taskId=...   poll until state==="success"
//
// Model + shape per docs.kie.ai/market/google/nano-banana.

const fs = require('fs');
const path = require('path');

const API = 'https://api.kie.ai';
const MODEL = process.env.KIE_MODEL || 'google/nano-banana';
const ASPECT = '1:1'; // square slides (1080x1080)
const POLL_MS = 5000;
const TIMEOUT_MS = 9 * 60 * 1000;

function die(msg) { console.error(msg); process.exit(1); }

async function createTask(key, prompt) {
  const res = await fetch(`${API}/api/v1/jobs/createTask`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, input: { prompt, output_format: 'png', aspect_ratio: ASPECT } }),
  });
  const j = await res.json();
  if (!res.ok || j.code !== 200 || !j.data || !j.data.taskId) {
    throw new Error(`createTask failed: ${res.status} ${JSON.stringify(j)}`);
  }
  return j.data.taskId;
}

function extractUrl(data) {
  // Result URLs live in resultJson (a JSON string) or already-parsed fields.
  let rj = data.resultJson || (data.result && data.result.resultJson) || data.result || data;
  if (typeof rj === 'string') { try { rj = JSON.parse(rj); } catch (e) { /* leave as string */ } }
  const urls =
    (rj && (rj.resultUrls || rj.urls || rj.images || rj.imageUrls)) ||
    (rj && rj.output && (rj.output.urls || rj.output.images)) ||
    null;
  if (Array.isArray(urls) && urls.length) return typeof urls[0] === 'string' ? urls[0] : urls[0].url;
  if (typeof rj === 'string' && /^https?:\/\//.test(rj)) return rj;
  return null;
}

async function pollTask(key, taskId) {
  const start = Date.now();
  for (;;) {
    if (Date.now() - start > TIMEOUT_MS) throw new Error(`timeout polling ${taskId}`);
    await new Promise((r) => setTimeout(r, POLL_MS));
    const res = await fetch(`${API}/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    const j = await res.json();
    const data = j.data || j;
    const state = (data.state || data.status || '').toLowerCase();
    if (state === 'success' || state === 'succeeded' || state === 'completed') {
      const url = extractUrl(data);
      if (!url) throw new Error(`success but no image url: ${JSON.stringify(data).slice(0, 400)}`);
      return url;
    }
    if (state === 'fail' || state === 'failed' || state === 'error') {
      throw new Error(`task failed: ${JSON.stringify(data).slice(0, 400)}`);
    }
    process.stdout.write('.');
  }
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
}

// Extract <Img ... placeholder="..."> art-direction tags from a slides-*.jsx file
// for one variant. The current template keeps image directions as short tags
// (e.g. "heavy machinery · still") on slides 2/4/6/8/10. Returns [{n, tag}].
// Matches both literal ids ("sb-v1-02-img") and template-literal ids (`sb-v1-${n}-img`).
function extractPlaceholders(jsxFile, variant) {
  const src = fs.readFileSync(jsxFile, 'utf8');
  const out = [];
  // Literal-id form: id="sb-v1-02-img" ... placeholder="heavy machinery · still"
  const litRe = new RegExp(`id="${variant}-(\\d+)-img"[^>]*?placeholder="([^"]*)"`, 'g');
  let m;
  while ((m = litRe.exec(src))) out.push({ n: parseInt(m[1], 10), tag: m[2] });
  // Template-literal form: id={`sb-v6-${n}-img`} ... placeholder="stepping back · still"
  // These share one tag across the variant's image slides (2,4,6,8,10).
  if (!out.length) {
    const tlRe = new RegExp(`id=\\{\`${variant}-\\$\\{n\\}-img\`\\}[^>]*?placeholder="([^"]*)"`);
    const tm = tlRe.exec(src);
    if (tm) for (const n of [2, 4, 6, 8, 10]) out.push({ n, tag: tm[1] });
  }
  return out.sort((a, b) => a.n - b.n);
}

// Expand a short art-direction tag into a full editorial image prompt that matches
// the deck's brand (muted, cinematic, no text, square).
function expandPrompt(tag) {
  return (
    `Editorial fine-art photograph, concept: ${tag}. ` +
    `Muted desaturated palette (warm cream, deep navy, terracotta accent), soft natural ` +
    `light, cinematic depth, generous negative space, no text, no people unless the concept ` +
    `is a portrait, square 1:1 composition, premium magazine aesthetic.`
  );
}

async function main() {
  const key = process.env.KIE_API_KEY;
  if (!key) die('KIE_API_KEY is not set. Export it and re-run:\n  KIE_API_KEY=... node generate-images.js [template-dir] [variant]');

  const dir = path.resolve(process.argv[2] || 'references/template/Linkedin Carousel Design Template');
  const variant = process.argv[3] || 'sb-v1';
  const jsxFile = path.join(dir, 'slides-stepback-all.jsx');
  if (!fs.existsSync(jsxFile)) die(`slides-stepback-all.jsx not found in ${dir}`);

  // Slide 10 is the portrait/selfie slot — never AI-generate it.
  const slots = extractPlaceholders(jsxFile, variant).filter(
    (s) => s.n !== 10 && !/portrait|selfie|direct gaze/i.test(s.tag)
  );
  if (!slots.length) die(`No image placeholders found for variant "${variant}" in ${jsxFile}.`);

  console.log(`Generating ${slots.length} image(s) for ${variant} via ${MODEL} (${ASPECT})...\n`);
  const images = {};
  for (const s of slots) {
    const file = `${variant}-slide-${String(s.n).padStart(2, '0')}-bg.png`;
    process.stdout.write(`slide ${s.n} [${s.tag}]: createTask `);
    const taskId = await createTask(key, expandPrompt(s.tag));
    process.stdout.write(`${taskId} polling`);
    const url = await pollTask(key, taskId);
    await download(url, path.join(dir, file));
    images[`slide${s.n}`] = `./${file}`;
    console.log(`\n  -> ${file}`);
  }

  fs.writeFileSync(path.join(dir, `images-${variant}.json`), JSON.stringify(images, null, 2) + '\n');
  console.log(`\nDone. ${Object.keys(images).length} image(s) saved to ${dir}.`);
  console.log(`Wrote images-${variant}.json. To use them, point the variant's <Img> ` +
    `slots at these files (replace the placeholder with src), then re-export.`);
  console.log(JSON.stringify(images, null, 2));
}

main().catch((e) => die(String(e && e.stack ? e.stack : e)));
