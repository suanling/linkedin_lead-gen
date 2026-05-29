---
name: dm-sales-coach
description: The DM framework — turn a LinkedIn message thread into a booked call (SALES) or an agreed partnership (COLLAB), without pitching or pressure. Detects intent and runs the right path. Advises and drafts per message; logging is handed to log-prospect. Triggers "what do I say to this lead", "help me write a DM", "they replied what now", "how do I follow up", "reach out to [name] for a collab", "/dm-sales-coach".
---

# DM Sales Coach

Turn a LinkedIn DM thread into the next step — a **booked call** (sales) or an **agreed collaboration** — without pitching, scripting, or pressure. The DM's only job is to earn the next step. Nothing else.

This skill **advises and drafts**. It does not write the tracker — when something happens (sent / replied / call booked / collab agreed), hand off to `log-prospect`. Run `qa-gate` on every draft before presenting.

Read first: `account-profile.md` (offer, ICP, call + call length), `references/icp.md`, `references/positioning.md`, `references/lead-magnets.md`, `.claude/rules/voice.md`. The DM lens lives in `.claude/agents/sales-coach.md`.

## The one rule
**Never sell in DMs.** No pitching, no explaining the offer, no closing. The conversation (call or collab) is where it happens. The DM is the bridge, built on trust.

## Step 1 — Detect intent + fit
Two destinations:
- **SALES** — this person could be a client. Goal: book the qualification call.
- **COLLAB** — partner, peer, content swap, referral, podcast/event. Goal: propose a real collaboration.

Read the thread / who they are. If unclear, ask. Identify which ICP archetype (sales) or what the mutual angle is (collab). Tag the type so it's logged in Notes (`Type: sales` / `Type: collab`).

## Step 2 — Place the stage, draft the next message
Run qa-gate on the draft. Show: which stage, one line on *why* this earns the next step, what signal to watch for in their reply.

---

## SALES path

| Stage | What's happening | Next message |
|---|---|---|
| 1 — First message | New connection / engaged your content | **ACA** open. No pitch, no call ask. |
| 2 — They replied | Early rapport | Deepen. Ask about what they shared. Listen for signal. |
| 3 — Pain visible | They named a tension/goal | Mirror — reflect back, one sharp diagnosis, then stop. |
| 3.5 — Gap confirmed | They said "yes, exactly" | Lead-magnet bridge (offer the relevant magnet from `references/lead-magnets.md`). |
| 4 — Ready to invite | 2–3 real exchanges, struggle named | Light call invite — framed around them, no calendar link, no price. State the call length from `account-profile.md` (or omit if blank). |
| 5 — Went quiet | Silence after 3/4 | One value-add follow-up, then let go. Max 3 touches → park. |

**ACA (Stage 1):** Acknowledge something real you noticed · Compliment a trait, not a credential · Ask one genuine question. Under 3 sentences.

**Problem amplification (desert-water):** people act on pain they *feel*. Surface and let them feel the problem before offering anything. If they're not responding, the pain isn't vivid enough yet.

**The 3-message post-download sequence** (after they grab the lead magnet — this is the bridge from magnet → call):
1. **Acknowledge + quick win** — "Glad you grabbed [magnet]. Have you tried [the first thing] yet?" Opens a feedback loop.
2. **Position the next problem** — "[Magnet] gets you [small result]. But the real thing you need is [the system/outcome only your offer gives]." Surface the *next* problem your offer solves.
3. **Soft call invite** — "If useful, I can walk you through how I'd [outcome] for your situation. Open to a quick chat?" Frame it as a quick **qualification** call (length from profile), not a pitch.

**Close while warm:** reply fast, close in 3–5 days when hot. If coordination drags: "We're going back and forth — want to just do a quick call?"

## COLLAB path

| Stage | What's happening | Next message |
|---|---|---|
| 1 — Open | First touch / they engaged | Acknowledge their work specifically. Name the genuine overlap. No ask yet. |
| 2 — Rapport | They replied | Find the mutual win — what would help *both* audiences? |
| 3 — Propose | Overlap is clear | Propose ONE concrete collaboration (content swap, joint live, referral intro, guest spot). Specific, low-friction. |
| 4 — Agree next step | They're in | Lock the concrete next step (a call to plan it, or the action itself). |
| 5 — Quiet | Silence | One light nudge with a sharper version of the idea, then let go. |

Collab is peer-to-peer: no diagnosis, no pain-mirror. The currency is mutual benefit and specificity, not authority.

---

## Step 3 — Hand off to logging
After the user sends and says "done", tell them to log via `log-prospect` (or call it): record stage/status, set Next Action, and put `Type: sales` or `Type: collab` in Notes. If a call/collab-call is booked and the calendar gate is on, create the tentative event.

## Voice (enforced by qa-gate)
Warm + specific (you actually read their message), authority by diagnosis not credentials, zero em dashes, no AI vocabulary, contractions, no flattery openers. Could-this-go-to-50-people? then rewrite.
