// AIOS LinkedIn Metrics — service worker
// Receives a payload from the popup and POSTs it to the local n8n webhook.
// The n8n workflow writes the JSON to references/learning/inbox/.

const DEFAULT_ENDPOINT = "http://localhost:5678/webhook/linkedin-metrics";
const DEFAULT_SECRET = "change-me-aios-2026";

async function getConfig() {
  const { endpoint, secret } = await chrome.storage.sync.get([
    "endpoint",
    "secret"
  ]);
  return {
    endpoint: endpoint || DEFAULT_ENDPOINT,
    secret: secret || DEFAULT_SECRET
  };
}

function dmEndpointFromBase(endpoint) {
  // Map .../webhook/linkedin-metrics → .../webhook/linkedin-dms.
  // Falls back to appending /dms if the URL doesn't match.
  try {
    return endpoint.replace(/linkedin-metrics(\/?)$/, "linkedin-dms$1");
  } catch {
    return endpoint.replace(/\/?$/, "/dms");
  }
}

async function postJson(url, secret, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AIOS-Secret": secret
    },
    body: JSON.stringify(payload)
  });
  return { ok: res.ok, status: res.status };
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === "AIOS_SEND") {
    (async () => {
      try {
        const { endpoint, secret } = await getConfig();
        const result = await postJson(endpoint, secret, msg.payload);
        sendResponse(result);
      } catch (e) {
        sendResponse({ ok: false, error: String(e) });
      }
    })();
    return true;
  }
  if (msg && msg.type === "AIOS_SEND_DMS") {
    (async () => {
      try {
        const { endpoint, secret } = await getConfig();
        const dmUrl = dmEndpointFromBase(endpoint);
        const result = await postJson(dmUrl, secret, msg.payload);
        sendResponse(result);
      } catch (e) {
        sendResponse({ ok: false, error: String(e) });
      }
    })();
    return true;
  }
});

// ─── Bulk capture (v0.4.0) ─────────────────────────────────────────────────
// Saves, dwell and profile visits exist ONLY on a post's own analytics page,
// so a full capture used to mean visiting each post by hand. This walks a list
// of URNs, opens each analytics page in a background tab, snapshots it, closes
// the tab, and moves on.
//
// Deliberately client-side and deliberately slow. Everything runs in the
// user's own browser on pages they could open themselves — no cookie export,
// no server-side fetching. DELAY_MS spaces the loads out so a bulk run doesn't
// look like automated traffic; don't drop it to race the job.
const BULK_DELAY_MS = 2500;
const BULK_LOAD_TIMEOUT_MS = 15000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function analyticsUrlFor(urn) {
  return `https://www.linkedin.com/analytics/post-summary/${urn}/`;
}

// Resolve once the tab finishes loading, or on timeout — a slow page still
// gets a snapshot attempt rather than stalling the whole run.
function waitForTabLoad(tabId) {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      chrome.tabs.onUpdated.removeListener(listener);
      resolve();
    };
    const listener = (id, info) => {
      if (id === tabId && info.status === "complete") finish();
    };
    chrome.tabs.onUpdated.addListener(listener);
    setTimeout(finish, BULK_LOAD_TIMEOUT_MS);
  });
}

async function captureOne(urn) {
  let tab;
  try {
    tab = await chrome.tabs.create({ url: analyticsUrlFor(urn), active: false });
    await waitForTabLoad(tab.id);
    // The analytics panel renders after load; give it a moment to populate.
    await sleep(1200);
    const res = await chrome.tabs.sendMessage(tab.id, { type: "AIOS_SNAPSHOT" });
    if (!res || !res.ok || !res.items || !res.items.length) {
      return { urn, ok: false, error: "no snapshot returned" };
    }
    const item = res.items[0];
    const { endpoint, secret } = await getConfig();
    const sent = await postJson(endpoint, secret, item);
    return {
      urn,
      ok: sent.ok,
      saves: item.metrics ? item.metrics.saves : null,
      reactions: item.metrics ? item.metrics.reactions : null,
      error: sent.ok ? null : `send failed (${sent.status})`
    };
  } catch (e) {
    return { urn, ok: false, error: String(e) };
  } finally {
    if (tab && tab.id) {
      try { await chrome.tabs.remove(tab.id); } catch (_) {}
    }
  }
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === "AIOS_BULK_CAPTURE") {
    (async () => {
      const urns = (msg.urns || []).filter(Boolean);
      const results = [];
      for (let i = 0; i < urns.length; i++) {
        const r = await captureOne(urns[i]);
        results.push(r);
        chrome.runtime
          .sendMessage({
            type: "AIOS_BULK_PROGRESS",
            done: i + 1,
            total: urns.length,
            last: r
          })
          .catch(() => {}); // popup may be closed; the run continues regardless
        if (i < urns.length - 1) await sleep(BULK_DELAY_MS);
      }
      sendResponse({ ok: true, results });
    })();
    return true;
  }
});
