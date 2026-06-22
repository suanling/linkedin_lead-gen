/**
 * generate-images.js
 * Generates background images for carousel slides 4 and 7 using kie.ai (nano-banana-2).
 *
 * Usage:
 *   node scripts/generate-images.js "<prompt for slide 4>" "<prompt for slide 7>" <output-dir>
 *
 * Requires: KIE_API_KEY environment variable
 * Output:   <output-dir>/slide-04-bg.png, <output-dir>/slide-07-bg.png
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_BASE = 'https://api.kie.ai';
const MODEL = 'nano-banana-2';
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 120000;

const KIE_API_KEY = process.env.KIE_API_KEY;

if (!KIE_API_KEY) {
  console.error('Error: KIE_API_KEY environment variable is not set.');
  console.error('Set it with: $env:KIE_API_KEY="your_key_here"  (PowerShell)');
  process.exit(1);
}

const [,, prompt4, prompt7, outDir] = process.argv;

if (!prompt4 || !prompt7 || !outDir) {
  console.error('Usage: node generate-images.js "<slide4 prompt>" "<slide7 prompt>" <output-dir>');
  process.exit(1);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// ── Helpers ──────────────────────────────────────────────────────────────────

function apiRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.kie.ai',
      path: endpoint,
      method,
      headers: {
        'Authorization': `Bearer ${KIE_API_KEY}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch (e) { resolve({ status: res.statusCode, body: raw }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function pollJob(jobId) {
  const start = Date.now();
  while (Date.now() - start < POLL_TIMEOUT_MS) {
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
    const { status, body } = await apiRequest('GET', `/api/v1/jobs/${jobId}`);
    if (status !== 200) throw new Error(`Poll error ${status}: ${JSON.stringify(body)}`);
    const jobStatus = body.status || body.data?.status;
    if (jobStatus === 'completed' || jobStatus === 'success') {
      // Try common response shapes for the image URL
      return body.output?.url
        || body.data?.output?.url
        || body.result?.url
        || body.data?.result?.[0]?.url
        || body.images?.[0]?.url
        || body.data?.images?.[0]?.url;
    }
    if (jobStatus === 'failed' || jobStatus === 'error') {
      throw new Error(`Job ${jobId} failed: ${JSON.stringify(body)}`);
    }
    console.log(`  [${jobId}] status: ${jobStatus} — waiting...`);
  }
  throw new Error(`Job ${jobId} timed out after ${POLL_TIMEOUT_MS / 1000}s`);
}

async function generateImage(prompt, label) {
  console.log(`\nGenerating ${label}...`);
  console.log(`  Prompt: ${prompt}`);

  const { status, body } = await apiRequest('POST', '/api/v1/jobs/createTask', {
    model: MODEL,
    callBackUrl: '',
    input: {
      prompt,
      image_input: [],
      aspect_ratio: '1:1',
      resolution: '1K',
      output_format: 'png',
    },
  });

  if (status !== 200 && status !== 201) {
    throw new Error(`createTask failed (${status}): ${JSON.stringify(body)}`);
  }

  const jobId = body.jobId || body.data?.jobId || body.id || body.data?.id;
  if (!jobId) throw new Error(`No job ID in response: ${JSON.stringify(body)}`);
  console.log(`  Job ID: ${jobId}`);

  const imageUrl = await pollJob(jobId);
  if (!imageUrl) throw new Error(`No image URL in completed job ${jobId}`);
  console.log(`  Image URL: ${imageUrl}`);

  return imageUrl;
}

// ── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  try {
    // Build brand-consistent prompts
    const brandSuffix = 'editorial photography, warm cream and deep navy tones, soft natural light, no text, no people, no faces, clean minimal composition, 1:1 square';
    const brandNegative = 'text, watermark, people, faces, logos, cluttered, neon, oversaturated, sci-fi, futuristic';

    const [url4, url7] = await Promise.all([
      generateImage(`${prompt4}, ${brandSuffix}`, 'slide 04 background'),
      generateImage(`${prompt7}, ${brandSuffix}`, 'slide 07 background'),
    ]);

    const out4 = path.join(outDir, 'slide-04-bg.png');
    const out7 = path.join(outDir, 'slide-07-bg.png');

    console.log('\nDownloading images...');
    await Promise.all([
      downloadFile(url4, out4).then(() => console.log(`  ✓ slide-04-bg.png`)),
      downloadFile(url7, out7).then(() => console.log(`  ✓ slide-07-bg.png`)),
    ]);

    // Output JSON for the carousel skill to consume
    const result = { slide4: out4, slide7: out7 };
    console.log('\nResult:', JSON.stringify(result));

    // Write a manifest the populate step can read
    fs.writeFileSync(path.join(outDir, 'images.json'), JSON.stringify(result, null, 2));
    console.log(`\nManifest written to ${path.join(outDir, 'images.json')}`);

  } catch (err) {
    console.error('\nError:', err.message);
    process.exit(1);
  }
})();
