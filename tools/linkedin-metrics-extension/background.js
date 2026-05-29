// LinkedIn Metrics — service worker
// Receives a payload from the popup and POSTs it to the local metrics server.
// The server writes the JSON to references/learning/inbox/.

const DEFAULT_ENDPOINT = "http://localhost:5678/webhook/linkedin-metrics";
const DEFAULT_SECRET = "change-me";

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
      "X-Metrics-Secret": secret
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
