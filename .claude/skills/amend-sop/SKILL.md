---
name: amend-sop
description: Draft an SOP amendment when an exception comes up. Captures what happened, what should happen next time, and which part of the SOP it touches. Writes a draft to pending-amendments/ for the owner to review. NEVER edits the SOP directly. Triggers "/amend-sop", "should the SOP say…", "this isn't covered in the SOP", "next time should I…".
---

# /amend-sop — draft an SOP amendment

You hit something `sops/linkedin-sop.md` doesn't cover, or something it says that feels wrong. This captures the exception and drafts it for the owner to review. **You do not change the SOP yourself** — the owner decides.

## Hard rule
You CANNOT write to `sops/linkedin-sop.md`. It is read-only. This skill writes only to `pending-amendments/`.

## Step 1 — Capture the exception
Ask all four:
1. **What happened?** One or two concrete sentences — what was said/done, when.
2. **What should happen next time?** The rule or template change that would prevent this or handle it cleaner.
3. **One-off or pattern?** Single weird case (→ ledger entry) or expected to recur (→ rule change)? If unsure, default to one-off.
4. **Which part of the SOP?** Daily checklist / Rules / Decision tree / Templates / Escalate triggers / Exceptions ledger.

Don't guess. If they can't answer one, ask.

## Step 2 — Write the draft
Create `pending-amendments/YYYY-MM-DD-<slug>.md` (`<slug>` = 2-4 word kebab-case):

```markdown
---
sop: linkedin
drafted_at: YYYY-MM-DDTHH:MM:SS
type: <one-off | pattern>
status: pending-review
---

# Proposed amendment to the LinkedIn SOP

## What happened
<description>

## What should happen next time
<proposal>

## Section to amend
<Daily checklist | Rules | Decision tree | Templates | Escalate triggers | Exceptions ledger>

## Why
<one line — what this prevents>
```

## Step 3 — Confirm
> ✅ Drafted to `pending-amendments/YYYY-MM-DD-<slug>.md`.
> The owner will review and accept (update the SOP), edit, or skip. For now, keep following the current SOP.

## Guardrails
- **Never edit `sops/`.** If asked, refuse: "I can only draft — the owner approves before the SOP changes."
- **Never delete a pending amendment** — leave it for the owner to clear.
- **Never assume approval.** The current SOP stays active until the owner changes it.
- **One amendment per file.** Three exceptions = run it three times.
