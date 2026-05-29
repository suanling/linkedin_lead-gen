let items = [];
let selectedIdx = -1;

const $ = (id) => document.getElementById(id);

async function activeTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.id;
}

function renderList() {
  const list = $("list");
  list.innerHTML = "";
  if (!items.length) {
    list.innerHTML =
      '<div style="color:#888;padding:6px;">No posts found on this page. Try a post URL or your activity feed.</div>';
    return;
  }
  items.forEach((it, i) => {
    const div = document.createElement("div");
    div.className = "post" + (i === selectedIdx ? " selected" : "");
    const m = it.metrics || {};
    div.innerHTML =
      '<div class="preview">' +
      (it.preview || "(no preview)").replace(/[<>&]/g, (c) =>
        ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])
      ) +
      "</div>" +
      '<div class="meta">' +
      `👍 ${m.reactions ?? "?"} · 💬 ${m.comments ?? "?"} · 🔁 ${
        m.reposts ?? "?"
      } · 👁 ${m.impressions ?? "?"}` +
      "</div>" +
      `<div class="urn">${it.post_urn || "(no URN)"}</div>`;
    div.addEventListener("click", () => {
      selectedIdx = i;
      renderList();
      $("preview").style.display = "block";
      $("preview").textContent = JSON.stringify(it, null, 2);
      $("sendOne").disabled = !it.post_urn;
    });
    list.appendChild(div);
  });
  $("sendAll").disabled = !items.some((it) => it.post_urn);
}

$("snap").addEventListener("click", async () => {
  $("status").textContent = "";
  $("preview").style.display = "none";
  items = [];
  selectedIdx = -1;
  renderList();

  const tabId = await activeTabId();
  if (!tabId) return;
  chrome.tabs.sendMessage(tabId, { type: "AIOS_SNAPSHOT" }, (res) => {
    if (chrome.runtime.lastError || !res?.ok) {
      $("mode").textContent = "";
      $("status").innerHTML =
        '<span class="err">Could not read this page. Refresh the LinkedIn tab (Cmd+R) and try again.</span>';
      return;
    }
    if (!Array.isArray(res.items)) {
      // Old content script still loaded (pre-v0.2.0). Tell user to refresh.
      $("mode").textContent = "";
      $("status").innerHTML =
        '<span class="err">Stale content script. Refresh the LinkedIn tab (Cmd+R) and snapshot again.</span>';
      return;
    }
    $("mode").textContent = `Mode: ${res.mode || "?"} — ${res.items.length} post(s) found`;
    items = res.items;
    renderList();
  });
});

async function sendPayloads(payloads) {
  $("status").textContent = `Sending ${payloads.length}…`;
  let ok = 0;
  let fail = 0;
  for (const p of payloads) {
    const res = await new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "AIOS_SEND", payload: p }, resolve);
    });
    if (res?.ok) ok++;
    else fail++;
  }
  $("status").innerHTML =
    fail === 0
      ? `<span class="ok">✅ Sent ${ok}.</span>`
      : `<span class="err">Sent ${ok}, failed ${fail}.</span>`;
}

$("sendOne").addEventListener("click", () => {
  if (selectedIdx < 0) return;
  const p = items[selectedIdx];
  if (!p?.post_urn) return;
  sendPayloads([p]);
});

$("sendAll").addEventListener("click", () => {
  const valid = items.filter((it) => it.post_urn);
  if (!valid.length) return;
  sendPayloads(valid);
});

(async () => {
  const { endpoint, secret } = await chrome.storage.sync.get([
    "endpoint",
    "secret"
  ]);
  if (endpoint) $("endpoint").value = endpoint;
  if (secret) $("secret").value = secret;
})();

$("captureDMs").addEventListener("click", async () => {
  $("status").textContent = "Capturing DM inbox…";
  $("preview").style.display = "none";
  const tabId = await activeTabId();
  if (!tabId) return;
  chrome.tabs.sendMessage(tabId, { type: "AIOS_DM_SNAPSHOT" }, (res) => {
    if (chrome.runtime.lastError || !res?.ok) {
      $("status").innerHTML =
        '<span class="err">' +
        (res?.error || "Could not read messaging page. Open linkedin.com/messaging/ and refresh.") +
        "</span>";
      return;
    }
    const p = res.payload;
    $("preview").style.display = "block";
    $("preview").textContent = JSON.stringify(p, null, 2);
    $("mode").textContent =
      `Mode: DMS — ${p.conversations.length} conversation(s), ` +
      `skipped ${p.skipped.groups} group / ${p.skipped.inmail} InMail`;
    chrome.runtime.sendMessage({ type: "AIOS_SEND_DMS", payload: p }, (sendRes) => {
      if (sendRes?.ok) {
        $("status").innerHTML =
          `<span class="ok">✅ Sent ${p.conversations.length} DM rows.</span>`;
      } else {
        $("status").innerHTML =
          '<span class="err">Send failed: ' +
          (sendRes?.error || sendRes?.status || "unknown") +
          ". Is server.js running?</span>";
      }
    });
  });
});

$("saveEndpoint").addEventListener("click", async () => {
  await chrome.storage.sync.set({
    endpoint: $("endpoint").value.trim(),
    secret: $("secret").value.trim()
  });
  $("status").innerHTML = '<span class="ok">Saved.</span>';
});
