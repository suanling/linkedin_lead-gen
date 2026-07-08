#!/usr/bin/env node
// export-png.js — render the carousel template in headless Chromium and
// screenshot the 10 slides of ONE variant at 1080x1080.
//
// Usage (serve over HTTP first — Babel XHR is CORS-blocked under file://):
//   cd "references/template/Linkedin Carousel Design Template" && python3 -m http.server 8765 &
//   node export-png.js "http://localhost:8765/index.html" "daily-log/export/sb-v1/" "sb-v1"
//
// Variant ids match app.jsx's VARIANT_META: the Step Back set is sb-v1, sb-v2,
// sb-v5, sb-v6, sb-v8, sb-v9, sb-v10, sb-v11 (plus legacy v1..v12 and `ex`).
// The template renders each variant as a section with artboards id="<variant>-<n>"
// (e.g. sb-v1-1 .. sb-v1-10). We walk artboards whose id starts with "<variant>-",
// grab the inner 1080x1080 element, and screenshot it. Output: NN-<slug>.png,
// slugs from window.CAROUSEL_DATA when present, else slide-NN.

const path = require('path');
const fs = require('fs');

async function main() {
  const [, , htmlArg, outArg, variantArg] = process.argv;
  if (!htmlArg || !outArg || !variantArg) {
    console.error('Usage: node export-png.js <index.html> <out dir> <variant-id>');
    process.exit(1);
  }
  // Accept either an http(s) URL or a local file path. Note: Babel-standalone
  // loads the type="text/babel" JSX via XHR, which CORS-blocks under file://,
  // so serving over http is REQUIRED for this template. The skill starts a
  // local server and passes the http URL here.
  const isUrl = /^https?:\/\//i.test(htmlArg);
  const url = isUrl ? htmlArg : 'file://' + path.resolve(htmlArg);
  const outDir = path.resolve(outArg);
  const variant = variantArg.replace(/^#/, '').toLowerCase();
  fs.mkdirSync(outDir, { recursive: true });

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1200, deviceScaleFactor: 2 });

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  // Babel-standalone compiles type=text/babel scripts after load. Wait until
  // the variant's artboards exist. Artboards are <div data-dc-slot="<v>-<n>">
  // inside <div data-dc-section="<v>">.
  await page.waitForFunction(
    (v) => !!document.querySelector(`[data-dc-slot^="${v}-"]`),
    { timeout: 60000 },
    variant
  );
  // Settle a beat for fonts/layout.
  await new Promise((r) => setTimeout(r, 1500));

  // The design canvas renders inside a pan/zoom viewport (transform: ...scale()).
  // Force it to identity scale so each 1080x1080 slide renders at true pixel size
  // for crisp screenshots, and disable transitions so it snaps immediately.
  await page.evaluate(() => {
    const vp = Array.from(document.querySelectorAll('*')).find(
      (el) => el.style && el.style.transform && el.style.transform.includes('scale(')
    );
    if (vp) {
      vp.style.transition = 'none';
      vp.style.transform = 'translate3d(0px,0px,0) scale(1)';
      vp.style.setProperty('--dc-inv-zoom', '1');
    }
    // Hide canvas grid background so it never bleeds into clipped shots.
    document.body.style.background = '#ffffff';
  });
  await new Promise((r) => setTimeout(r, 600));

  // Tag the 1080x1080 slide root inside each artboard with a stable data attr
  // and return the ordered list (n + slug) so we can grab element handles.
  const slides = await page.evaluate((v) => {
    const slugs = (window.CAROUSEL_DATA && Array.isArray(window.CAROUSEL_DATA.slides))
      ? window.CAROUSEL_DATA.slides.reduce((m, s) => { if (s) m[s.n] = s.slug; return m; }, {})
      : {};
    const boards = Array.from(document.querySelectorAll(`[data-dc-slot^="${v}-"]`))
      .map((el) => {
        const m = el.getAttribute('data-dc-slot').match(new RegExp(`^${v}-(\\d+)$`));
        return m ? { n: parseInt(m[1], 10), el } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.n - b.n);

    return boards.map(({ n, el }) => {
      const all = Array.from(el.querySelectorAll('div'));
      const slide = all.find((d) => d.offsetWidth === 1080 && d.offsetHeight === 1080) || el;
      slide.setAttribute('data-export-slide', `${v}-${n}`);
      return { n, slug: slugs[n] || `slide-${String(n).padStart(2, '0')}`, tag: `${v}-${n}` };
    });
  }, variant);

  if (!slides.length) {
    console.error(`No artboards found for variant "${variant}".`);
    await browser.close();
    process.exit(2);
  }

  // Purge stale numbered PNGs from a previous run (old slug names) so the folder
  // only ever holds the current 10 slides. Keeps the contact sheet clean.
  const expected = new Set(slides.map((s) => `${String(s.n).padStart(2, '0')}-${s.slug}.png`));
  for (const f of fs.readdirSync(outDir)) {
    if (/^\d\d-.*\.png$/.test(f) && !expected.has(f)) {
      fs.unlinkSync(path.join(outDir, f));
      console.log('purged stale', f);
    }
  }

  const written = [];
  for (const s of slides) {
    const name = `${String(s.n).padStart(2, '0')}-${s.slug}.png`;
    const file = path.join(outDir, name);
    const handle = await page.$(`[data-export-slide="${s.tag}"]`);
    if (!handle) { console.warn('skip (not found)', name); continue; }
    await handle.screenshot({ path: file });
    written.push({ name, file });
    console.log('wrote', name);
  }

  // Auto contact sheet (2 cols) so the reviewer sees all slides in one image.
  if (written.length) {
    const cells = written.map((w, i) => {
      const b64 = fs.readFileSync(w.file).toString('base64');
      return `<div class="cell"><div class="num">${String(i + 1).padStart(2, '0')}</div>` +
        `<img src="data:image/png;base64,${b64}"/></div>`;
    }).join('');
    const sheetHtml = `<!doctype html><meta charset="utf-8"><style>` +
      `body{margin:0;background:#e8e4dd}` +
      `.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;padding:24px;width:1180px;font-family:monospace}` +
      `.cell{position:relative;background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.12)}` +
      `.cell img{display:block;width:100%;height:auto}` +
      `.num{position:absolute;top:8px;left:8px;z-index:2;background:#07273e;color:#fff;font-size:13px;padding:3px 8px;border-radius:4px;letter-spacing:.1em}` +
      `</style><div class="grid" id="g">${cells}</div>`;
    const sheetPage = await browser.newPage();
    await sheetPage.setViewport({ width: 1180, height: 3000, deviceScaleFactor: 2 });
    await sheetPage.setContent(sheetHtml, { waitUntil: 'networkidle0' });
    const grid = await sheetPage.$('#g');
    const sheetPath = path.join(path.dirname(outDir), `${variant}-contact-sheet.png`);
    await grid.screenshot({ path: sheetPath });
    console.log('contact sheet ->', sheetPath);
  }

  await browser.close();
  console.log(`\nDone. ${written.length} slides -> ${outDir}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
