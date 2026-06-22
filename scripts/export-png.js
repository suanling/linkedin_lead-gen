/**
 * export-png.js — Export one variant's 10 slides from the LinkedIn Carousel template.
 *
 * Usage:
 *   node scripts/export-png.js <path/to/index.html> <output-dir> [variant-id]
 *
 * variant-id: v1 v2 v5 v6 v7 v8 v9 v10 v11 v12  (default: v1)
 *
 * The template renders all variants as a design canvas. Each artboard has
 * id="${variantId}-${slideNumber}", e.g. "v9-1" through "v9-10".
 * This script finds those artboards, scrolls to each, and screenshots the
 * inner 1080×1080 canvas element.
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML_PATH = process.argv[2];
const OUT_DIR   = process.argv[3] || path.join(path.dirname(HTML_PATH || '.'), 'export');
const VARIANT   = (process.argv[4] || 'v1').toLowerCase();

const SLIDE_LABELS = [
  'hook', 'tension', 'do-see', 'three-layers', 'owned',
  'wrong-layer', 'the-tell', 'pro-move', 'screenshot', 'cta',
];

if (!HTML_PATH) {
  console.error('Usage: node export-png.js <index.html> <output-dir> [variant-id]');
  console.error('  variant-id: v1 v2 v5 v6 v7 v8 v9 v10 v11 v12  (default: v1)');
  process.exit(1);
}
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: 'new',
  });
  const page = await browser.newPage();
  // Wide viewport so the full canvas renders; deviceScaleFactor 2 = 2x resolution
  await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 2 });

  const fileUrl = 'file://' + path.resolve(HTML_PATH).replace(/\\/g, '/');
  console.log(`Loading: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for React to render artboards
  await page.waitForFunction(
    (variantId) => !!document.getElementById(`${variantId}-1`),
    { timeout: 20000 },
    VARIANT
  ).catch(() => {
    console.error(`Timed out waiting for artboard #${VARIANT}-1. Check that the variant ID is correct.`);
    process.exit(1);
  });

  // Extra settle time for fonts + images
  await new Promise(r => setTimeout(r, 1500));

  console.log(`Exporting variant ${VARIANT.toUpperCase()} → ${OUT_DIR}`);

  for (let i = 1; i <= 10; i++) {
    const artboardId = `${VARIANT}-${i}`;
    const num = String(i).padStart(2, '0');
    const slug = SLIDE_LABELS[i - 1] || `slide-${num}`;
    const outPath = path.join(OUT_DIR, `${num}-${slug}.png`);

    const el = await page.$(`#${artboardId}`);
    if (!el) {
      console.warn(`  ⚠ #${artboardId} not found, skipping`);
      continue;
    }

    // Scroll into view
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: 'center' });
    }, artboardId);
    await new Promise(r => setTimeout(r, 300));

    // The artboard wraps a 1080×1080 canvas div. Try to find it by size first,
    // then fall back to the artboard element itself.
    const canvas = await page.evaluateHandle((id) => {
      const artboard = document.getElementById(id);
      if (!artboard) return null;
      // Look for a child element that is exactly 1080px wide
      const candidates = artboard.querySelectorAll('*');
      for (const c of candidates) {
        const style = window.getComputedStyle(c);
        if (parseInt(style.width) === 1080 && parseInt(style.height) === 1080) return c;
      }
      return artboard;
    }, artboardId);

    try {
      await canvas.screenshot({ path: outPath });
      console.log(`  ✓ ${num}-${slug}.png`);
    } catch (err) {
      console.warn(`  ⚠ Could not screenshot #${artboardId}: ${err.message}`);
    }

    await canvas.dispose();
  }

  await browser.close();
  console.log(`\nDone. 10 slides (${VARIANT.toUpperCase()}) → ${OUT_DIR}`);
})();
