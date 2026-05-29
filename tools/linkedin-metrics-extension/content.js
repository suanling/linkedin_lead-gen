// AIOS LinkedIn Metrics — content script
// Two modes:
//   - SINGLE  : standalone post page (/feed/update/urn:li:activity:.../)
//   - LIST    : activity feed page (/in/<handle>/recent-activity/...)
// In LIST mode, the script finds every post card on the page and returns
// a snapshot per card. The popup lets the user pick which to send.

(function () {
  "use strict";

  function parseCount(text) {
    if (!text) return null;
    const t = String(text).replace(/,/g, "").trim().toLowerCase();
    const m = t.match(/([\d.]+)\s*([km]?)/);
    if (!m) return null;
    let n = parseFloat(m[1]);
    if (m[2] === "k") n *= 1000;
    if (m[2] === "m") n *= 1000000;
    return Math.round(n);
  }

  function urnFromString(s) {
    if (!s) return null;
    const m = String(s).match(/urn:li:activity:\d+/);
    return m ? m[0] : null;
  }

  // Look inside an element for any text containing one of the labels and
  // grab a number near it.
  function findCountInScope(scope, labels) {
    const candidates = scope.querySelectorAll("button, span, a, div");
    for (const el of candidates) {
      const t = (el.textContent || "").trim().toLowerCase();
      if (t.length > 60) continue; // avoid sucking in entire post bodies
      for (const label of labels) {
        if (t.includes(label)) {
          const n = parseCount(t);
          if (n !== null) return n;
        }
      }
    }
    return null;
  }

  function countMeaningfulComments(card) {
    // Comments ≥15 words — 360Brew amplification trigger.
    // Best-effort: scan visible comment text blocks on the post page.
    const commentEls = card.querySelectorAll(
      '.comments-comment-item__main-content, [class*="comment-item"] [class*="text"], [class*="comment"][class*="content"]'
    );
    let meaningful = 0;
    commentEls.forEach((el) => {
      const t = (el.textContent || "").trim();
      const wc = t.split(/\s+/).filter(Boolean).length;
      if (wc >= 15) meaningful++;
    });
    return commentEls.length ? meaningful : null;
  }

  function parseDwellTime(text) {
    // "1m 23s" / "45s" / "2 min 10 sec"
    if (!text) return null;
    const m = String(text).match(/(?:(\d+)\s*m(?:in)?)?\s*(?:(\d+)\s*s(?:ec)?)?/i);
    if (!m || (!m[1] && !m[2])) return null;
    return (parseInt(m[1] || "0", 10) * 60) + parseInt(m[2] || "0", 10);
  }

  function findDwellTime(scope) {
    const candidates = scope.querySelectorAll("span, div");
    for (const el of candidates) {
      const t = (el.textContent || "").trim().toLowerCase();
      if (t.length > 80) continue;
      if (
        (t.includes("avg") || t.includes("average") || t.includes("time spent")) &&
        /\d/.test(t)
      ) {
        const s = parseDwellTime(t);
        if (s !== null) return s;
      }
    }
    return null;
  }

  // ─── Pinned / top comment capture ──────────────────────────────────────
  // For score-posts, we need the FIRST comment's reaction count as a proxy
  // for clicks on the lead-magnet link you pin as comment-1.
  // DOM (as of 2026-05): comments live under `.comments-comments-list` with
  // each item as `article.comments-comment-entity` (or legacy
  // `.comments-comment-item`). The first such element in document order is
  // either the author's pinned comment OR the top-by-relevance comment —
  // both are acceptable proxies for our purposes.
  function findFirstCommentStats(card) {
    const out = { reactions: null, replies: null, selector_used: null };
    try {
      const candidates = [
        "article.comments-comment-entity",
        ".comments-comment-entity",
        ".comments-comment-item",
        '[class*="comments-comment-entity"]'
      ];
      let firstComment = null;
      let usedSel = null;
      for (const sel of candidates) {
        const found = card.querySelector(sel);
        if (found) {
          firstComment = found;
          usedSel = sel;
          break;
        }
      }
      if (!firstComment) return out;
      out.selector_used = usedSel;

      // Reactions on this comment. LinkedIn renders the count inside a
      // button/span containing "reaction" or as a bare number near the
      // social-counts block. Scope to the comment subtree only.
      const reactionScopes = firstComment.querySelectorAll(
        '.comments-comment-social-bar__reactions-count, ' +
        '[class*="social-counts-reactions"], ' +
        'button[aria-label*="reaction" i], ' +
        'button[aria-label*="like" i]'
      );
      for (const el of reactionScopes) {
        const t = (el.textContent || el.getAttribute("aria-label") || "").trim();
        const n = parseCount(t);
        if (n !== null) { out.reactions = n; break; }
      }
      // Fallback: scan small text nodes within the social bar.
      if (out.reactions === null) {
        const bar = firstComment.querySelector(
          '[class*="social-bar"], [class*="social-counts"]'
        );
        if (bar) {
          const n = parseCount(bar.textContent);
          if (n !== null) out.reactions = n;
        }
      }

      // Replies: button labelled "N replies" / "Reply" with a count nearby.
      const replyEls = firstComment.querySelectorAll(
        'button, span, a'
      );
      for (const el of replyEls) {
        const t = (el.textContent || "").trim().toLowerCase();
        if (t.length > 40) continue;
        if (/repl(y|ies)/.test(t) && /\d/.test(t)) {
          const n = parseCount(t);
          if (n !== null) { out.replies = n; break; }
        }
      }
    } catch (e) {
      console.warn("[AIOS] findFirstCommentStats failed:", e);
    }
    return out;
  }

  function snapshotPostCard(card) {
    const urn =
      urnFromString(card.getAttribute("data-urn")) ||
      urnFromString(card.getAttribute("data-id")) ||
      urnFromString(card.outerHTML.slice(0, 4000));

    const bodyEl =
      card.querySelector(".feed-shared-update-v2__description") ||
      card.querySelector(".update-components-text") ||
      card.querySelector('[class*="description"]');
    const preview = bodyEl
      ? (bodyEl.textContent || "").trim().slice(0, 140)
      : "";

    const c1 = findFirstCommentStats(card);

    return {
      captured_at: new Date().toISOString(),
      source: "linkedin-metrics-extension",
      version: "0.2.0",
      post_urn: urn,
      post_url: urn
        ? `https://www.linkedin.com/feed/update/${urn}/`
        : location.href,
      preview,
      metrics: {
        // Engagement volume (legacy signals)
        reactions: findCountInScope(card, ["reaction", "like"]),
        comments: findCountInScope(card, ["comment"]),
        reposts: findCountInScope(card, ["repost", "share"]),
        impressions: findCountInScope(card, ["impression", "view"]),

        // 360Brew (2026) high-value signals
        saves: findCountInScope(card, ["save", "saved"]),
        profile_visits: findCountInScope(card, ["profile visit", "members visited"]),
        dwell_time_avg_s: findDwellTime(card),
        meaningful_comments: countMeaningfulComments(card),

        // Manual entry (LinkedIn doesn't expose)
        dms_received_estimate: null,

        // First/pinned comment — proxy for lead-magnet link engagement.
        // Set by findFirstCommentStats() below.
        comment_1_reactions: c1.reactions,
        comment_1_replies: c1.replies,
        comment_1_selector: c1.selector_used
      },
      page_title: document.title,
      notes: ""
    };
  }

  function singlePageSnapshot() {
    return [snapshotPostCard(document.body)];
  }

  function activityListSnapshot() {
    // LinkedIn renders activity items as <li> or <div> with data-urn or
    // data-id containing urn:li:activity. Scan broadly.
    const seen = new Set();
    const out = [];
    const cards = document.querySelectorAll(
      '[data-urn*="urn:li:activity"], [data-id*="urn:li:activity"]'
    );
    cards.forEach((card) => {
      const snap = snapshotPostCard(card);
      if (!snap.post_urn || seen.has(snap.post_urn)) return;
      seen.add(snap.post_urn);
      out.push(snap);
    });
    return out;
  }

  function detectMode() {
    if (location.href.includes("/messaging/")) return "DMS";
    if (location.href.includes("/feed/update/")) return "SINGLE";
    if (location.href.includes("/recent-activity/")) return "LIST";
    if (location.href.includes("/posts/")) return "SINGLE";
    return "UNKNOWN";
  }

  // ─── DM inbox scraper ──────────────────────────────────────────────────
  // On linkedin.com/messaging/, conversation rows render as
  // <li class="msg-conversation-listitem"> with:
  //   .msg-conversation-card__participant-names  → sender display name
  //   .msg-conversation-card__message-snippet    → latest preview text
  //   time.msg-conversation-card__time-stamp     → timestamp
  //   .msg-conversation-card__unread-count       → unread/new flag
  // Group chats: participant-names contains commas / "and N others" — skipped
  // (score-posts only attributes 1:1 inbound DMs).
  // InMail: pill `.msg-conversation-card__inmail-pill` or aria "InMail" — skipped.
  function scrapeDMInbox() {
    const out = [];
    const skipped = { groups: 0, inmail: 0, errors: 0 };
    const rows = document.querySelectorAll(
      'li.msg-conversation-listitem, ' +
      '.msg-conversations-container__convo-item, ' +
      '[class*="conversation-listitem"]'
    );
    rows.forEach((row) => {
      try {
        const nameEl = row.querySelector(
          '.msg-conversation-card__participant-names, [class*="participant-names"]'
        );
        const senderName = nameEl ? (nameEl.textContent || "").trim() : "";
        if (!senderName) return;
        if (/and \d+ other/i.test(senderName) || senderName.split(",").length > 1) {
          skipped.groups++;
          return;
        }

        const inmailPill = row.querySelector(
          '.msg-conversation-card__inmail-pill, [aria-label*="InMail" i], [class*="inmail" i]'
        );
        if (inmailPill) { skipped.inmail++; return; }

        const snippetEl = row.querySelector(
          '.msg-conversation-card__message-snippet, [class*="message-snippet"]'
        );
        const preview = snippetEl ? (snippetEl.textContent || "").trim() : "";

        const timeEl = row.querySelector(
          'time.msg-conversation-card__time-stamp, time, [class*="time-stamp"]'
        );
        const timestamp = timeEl
          ? (timeEl.getAttribute("datetime") || timeEl.textContent || "").trim()
          : "";

        const unreadEl = row.querySelector(
          '.msg-conversation-card__unread-count, [class*="unread-count"]'
        );
        const isNew = !!unreadEl ||
          /unread/i.test(row.className || "") ||
          row.querySelector('[class*="unread"]') !== null;

        let profileUrl = null;
        const link = row.querySelector('a[href*="/in/"]');
        if (link) profileUrl = link.href;

        out.push({
          sender_name: senderName,
          sender_profile_url: profileUrl,
          preview,
          timestamp,
          is_new: isNew
        });
      } catch (e) {
        skipped.errors++;
        console.warn("[AIOS] DM row scrape failed:", e);
      }
    });
    return { conversations: out, skipped };
  }

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg && msg.type === "AIOS_SNAPSHOT") {
      try {
        const mode = detectMode();
        let items = [];
        if (mode === "SINGLE") items = singlePageSnapshot();
        else if (mode === "LIST") items = activityListSnapshot();
        else if (mode === "DMS") items = []; // use AIOS_DM_SNAPSHOT instead
        else items = activityListSnapshot();
        sendResponse({ ok: true, mode, items });
      } catch (e) {
        sendResponse({ ok: false, error: String(e) });
      }
      return true;
    }
    if (msg && msg.type === "AIOS_DM_SNAPSHOT") {
      try {
        const mode = detectMode();
        if (mode !== "DMS") {
          sendResponse({
            ok: false,
            error: "Not on /messaging/ page. Open LinkedIn messaging first."
          });
          return true;
        }
        const { conversations, skipped } = scrapeDMInbox();
        sendResponse({
          ok: true,
          mode,
          payload: {
            captured_at: new Date().toISOString(),
            source: "linkedin-metrics-extension",
            version: "0.2.0",
            kind: "dm-inbox-snapshot",
            conversations,
            skipped
          }
        });
      } catch (e) {
        sendResponse({ ok: false, error: String(e) });
      }
      return true;
    }
  });
})();
