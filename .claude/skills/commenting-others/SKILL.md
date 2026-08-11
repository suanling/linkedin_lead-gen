---
name: commenting-others
description: Comment on OTHER people's LinkedIn posts (your ICP and the voices they follow) — find fresh posts, understand what was actually said, identify a genuine owner reaction, draft natural comments that contribute something not already in the post, run the QA gate, optionally promote good-fit accounts into the lead-gen tracker, and log to the engagement tracker + daily note. Also handles replying under a comment you left on someone else's post (same thread, their turf), and adding named targets to your engagement groups when you paste a profile. Triggers: "engagement", "comment on posts", "do my comments", "add [name] to my targets", "here's a profile to engage", "paste a profile", "/commenting-others", "/engage".
---

# Commenting on Others' Posts

The daily engagement routine: leave thoughtful, natural comments on fresh posts from the owner's ICP and the voices they follow, to build visibility, relationships and warm leads.

Copy-paste mode: the owner pastes the comment manually, says "done", and the skill logs it and moves on.

Comments are how cold people become warm; warm people become prospects. See Step 5b.

Read:

- who/why from `references/engagement-targets.md`
- ICP from `account-profile.md` + `references/icp.md`
- voice from `.claude/rules/voice.md`
- lived context from `references/about-me.md`
- voice evidence from `references/voice-profile.md`
- beliefs and positioning from `references/positioning.md`
- market facts from `references/market-context.md`

Quality is enforced by `qa-gate`.

---

# CORE PHILOSOPHY

## Comments are reactions, not miniature posts.

Never prove the owner read the post by repeating it.

Prove it by responding to something inside it.

The objective is NOT to manufacture a "thoughtful LinkedIn comment."

The objective is:

1. understand what the author actually said
2. notice what genuinely stands out
3. separate the author's thinking from the owner's thinking
4. identify what the owner can genuinely add
5. express that thought naturally
6. stop when the thought is complete

A good comment should normally contain at least one thought that could NOT have been produced merely by paraphrasing or summarising the source post.

Do not optimise for:

- sounding intelligent
- sounding profound
- sounding like a thought leader
- demonstrating expertise unnecessarily
- getting a reply
- producing a quotable line
- performing engagement
- impressing lurkers at the expense of natural conversation

Optimise for:

- genuine reaction
- relevance
- independent contribution
- specificity
- natural language
- relationship fit

A short observation that contributes something real is better than a polished multi-line comment that merely restates the post.

---

# THE CENTRAL QUESTION

Before writing any comment, answer:

> What did this post make the owner think that isn't already in the post?

If there is a clear answer, that is the foundation of the comment.

If there is no clear answer, do NOT manufacture one.

A simple, genuine reaction is acceptable.

---

# DO NOT POLISH THE HUMANITY OUT OF THE COMMENT

The purpose of drafting is not to transform an ordinary thought into "better LinkedIn writing."

If the owner's natural wording already works, preserve it.

Do not automatically:

- elevate vocabulary
- create rhetorical symmetry
- introduce metaphors
- add hooks
- add punchlines
- add contrast structures
- add clever framing
- add business jargon
- make the comment more authoritative
- make the comment more inspirational
- make the comment sound more sophisticated

Natural wording is the target.

It is NOT merely raw material for a more impressive final version.

---

# CAPTURE BELIEFS & CONTRARIAN TAKES

When the owner voices a sharp, distinctly-theirs belief or contrarian take while shaping a comment, offer to save it under the matching lens in `positioning.md` under Beliefs & Contrarian Takes, following `references/capture-protocol.md`.

Do not capture the post author's personal story as the owner's content.

---

# TRACKER SCHEMA

`engagement-tracker.xlsx`

Sheet:

`Accounts`

Columns:

1. Name
2. Country
3. Category
4. Last Engaged
5. Next Action
6. Total Engagements
7. First Engaged
8. LinkedIn URL
9. Date Added
10. Notes

---

# GLOBAL RULES

## ICP + Geography

Skip anyone outside the ICP or matching disqualifiers in `account-profile.md`.

Skip the wrong geography when targeting a specific market.

---

## Fresh Posts

Prefer posts from the last 24–48 hours.

Do not spend engagement effort on stale posts unless there is a specific strategic reason.

---

## Eligibility Gap

Check the tracker.

If `Next Action` is in the future for the account, skip it.

Avoid over-commenting on the same person.

---

## Copy-Paste Mode

Draft.

Present.

Wait for:

`done`

Never auto-post.

---

## QA Required

Run `qa-gate` on every proposed comment.

At minimum check:

- voice_match
- anti_ai
- semantic duplication
- naturalness
- question quality

---

# NEVER FABRICATE

Never invent:

- facts
- experiences
- relationships
- personal stories
- author intentions
- company ownership
- research ownership
- results
- statistics
- motivations
- causal relationships

If something cannot be confirmed, either leave it out or state uncertainty plainly.

---

# REFER, DON'T ASSUME

Whose post/account this is and which Group it belongs to must come from confirmed information.

For identity and classification, check:

- `references/engagement-targets.md`
- `trackers/engagement-tracker.xlsx`
- `account-profile.md`
- `references/icp.md`

For lived detail, beliefs or proof, check:

- `references/about-me.md`
- `references/voice-profile.md`
- `references/positioning.md`

Do not classify solely from a headline.

If the author's identity is not confirmed, ask before drafting.

If classification remains uncertain after checking the available information, label it as a working assumption rather than presenting it as fact.

---

# CONFIRM WHAT ACTUALLY HAPPENED

Before claiming that the author:

- created something
- researched something
- owns something
- experienced something
- leads something
- believes something
- discovered something

confirm that the post actually supports the claim.

Do not infer ownership or authorship from the topic alone.

Do not infer an author's experience from a familiar LinkedIn post format.

Read the stated frame.

---

# DO NOT MANUFACTURE CAUSALITY

Two true facts do not automatically have a causal relationship.

If a comment connects two pieces of owner context using language such as:

- because
- therefore
- so
- that's why
- which led to

confirm that the source material actually supports that connection.

Never manufacture connective tissue between unrelated facts.

---

# STEP 0 — KICKOFF

Set today's target.

There is no fixed number.

Read `references/engagement-targets.md`.

State:

> Targeting N comments today.

---

# STEP 1 — BUILD THE QUEUE

Using `references/engagement-targets.md` and the engagement tracker, build a list of eligible accounts.

Eligible means:

`Next Action ≤ today`

or the account has not yet been engaged.

Order by priority.

Skip:

- out-of-ICP accounts where engagement has no strategic value
- wrong geography where relevant
- not-yet-eligible accounts

---

# STEP 1B — ADD NAMED TARGETS

Trigger when the owner asks to add specific people or pastes a profile.

Ask for, per account:

- Name
- LinkedIn profile URL
- Headline/About
- Location
- Optional but useful: posting topics or recent post

Raw profile copy-paste is acceptable.

Batch input is acceptable.

## Per Account

### 1. Apply ICP + geography filter

Out-of-market or out-of-ICP people may still qualify as:

**Group 1:** bigger voice / audience relationship

or

**Group 3:** peer / adjacent relationship

Do not classify them as a Group 2 prospect unless they actually fit the ICP.

### 2. Pick the group

Use the criteria in `references/engagement-targets.md`.

- Group 1 — bigger voice
- Group 2 — ICP
- Group 3 — peer / adjacent

For Group 2, tag the appropriate archetype.

Explain the classification in one line.

### 3. Add to engagement targets

Append:

`Name | LinkedIn URL | why-one-line`

to the appropriate table.

### 4. Seed tracker

Set:

`Next Action = today`

`Category = group`

`Total Engagements = 0`

Do not guess missing geography or comment-section fit.

Ask when necessary.

---

# STEP 2 — FIND A FRESH POST

For each eligible account, find a post from approximately the last two days.

Use LinkedIn content search where available.

Fall back to a wider search window only when the actual post is still recent enough.

If no suitable post is found after reasonable attempts, skip.

Do not rely on profile/activity pages if they do not expose the full post text.

If the owner pastes a post without identifying the author and identity matters to the drafting or classification, confirm before proceeding.

---

# STEP 3 — UNDERSTAND BEFORE COMMENTING

## STEP 3A — SUMMARISE THE POST

Read the entire post through its final line.

Write a short summary of no more than 2–3 sentences.

Capture:

1. the central point
2. any important argument, invitation, announcement or ask

The summary exists to verify comprehension.

Show it to the owner and wait for confirmation or correction.

If corrected, the corrected interpretation replaces the original.

### Summary Requirements

The summary must:

- lead with the central point
- be simple
- be direct
- preserve the author's meaning
- preserve the author's tone
- distinguish argument from ask when relevant
- make sense without seeing the source post

Avoid:

- unnecessary copied wording
- commentary
- interpretation beyond the text
- outside information
- exaggerated claims
- robotic summary language
- academic language
- over-polished language

### Important

The summary is for comprehension ONLY.

Do NOT use the summary as the raw material for the comment.

Once the summary is confirmed, return to the ORIGINAL POST.

The final comment must not simply convert the summary into conversational first-person language.

---

# STEP 3B — BUILD THE COMMENT IDEA

Before drafting polished comments, work through the following reasoning checkpoint.

Keep every answer short.

The purpose is not to produce an essay about the post.

The purpose is to separate:

**what the author said**

from

**what the owner thinks**

---

## 1. WHAT STOOD OUT?

Choose ONE specific element from the post that genuinely invites a reaction.

It may be:

- a sentence
- claim
- tension
- assumption
- implication
- distinction
- example
- decision
- trade-off
- observation

Output:

**What stood out:** [one concise sentence]

Do not automatically choose the headline or overall thesis.

Choose the specific thing that creates the strongest genuine reaction.

---

## 2. WHAT HAS THE AUTHOR ALREADY SAID?

Identify what the author has already established around that point.

Output:

**Already covered:** [1–2 concise sentences]

Treat everything in this section as unavailable as the owner's "new insight."

The comment must not merely:

- repeat it
- synonymise it
- shorten it
- make it more eloquent
- turn it into first person
- turn it into a rhetorical question

This is the duplication boundary.

---

## 3. WHAT IS THE OWNER'S ACTUAL THOUGHT?

Now ask:

> After reading this specific point, what does the owner think that the author has NOT already said?

Possible forms include:

- implication
- consequence
- distinction
- qualification
- respectful disagreement
- lived observation
- pattern
- practical implication
- second-order effect
- connection
- reframe

Output:

**My add:** [1–2 concise sentences]

This is the core contribution.

The final comment should contain this thought.

If no genuine additional thought exists:

DO NOT manufacture one.

Use a simple natural reaction instead.

### When agreement is the honest answer

Some posts are thin, promotional, or so straightforward that the only way to "add" something is to
disagree for the sake of it.

On those posts, a plain agreement that states the author's point more concretely than the author
stated it is a legitimate comment, not a failure of this step.

Output:

**My add:** None available. Plain agreement, stated concretely.

Then go to Step 7 and write the natural wording.

Do not force a distinction, a qualification or a contrarian angle onto a post that does not support
one. A manufactured disagreement reads worse than an honest nod.

---

## 4. IS IT ACTUALLY NEW?

Run a semantic duplication check.

Output:

**New because:** [one concise sentence]

Ask:

- Is this absent from the source post?
- Is this genuinely an extension rather than a synonym?
- Did the author already say or clearly establish it?
- Could this thought have been generated simply from a summary?
- Am I merely making the author's idea sound smarter?
- Am I confusing different wording with different thinking?

If the contribution is essentially already present:

STOP.

Return to Step 3 and find another angle.

Do not proceed with a duplicated insight.

Skip this step when Step 3 returned "plain agreement, stated concretely." That path is not claiming
novelty, so there is nothing to duplicate-check.

---

## 5. IS THERE A NATURAL PERSONAL CONNECTION?

Check the owner's:

- lived experiences
- beliefs
- professional observations
- established opinions
- relevant proof
- recurring patterns

Use:

- `references/about-me.md`
- `references/voice-profile.md`
- `references/positioning.md`

Output either:

**Personal connection:** [specific relevant connection]

or:

**Personal connection:** None needed.

Personal context is optional.

Do not force a personal anecdote because "personal comments perform better."

Never fabricate an experience.

When a personal connection IS used, show the scene rather than announcing the credential. Drop the
setup clause ("I spent years in...", "having worked in...", "in my experience..."). Write the detail
precisely enough that only someone who lived it could have written it, and let that carry the
authority. Test: delete the first clause. If the sentence still lands, the clause was announcing.

Where a real personal fact could be misread as the author's rather than the owner's, mark ownership
explicitly.

---

## 6. DOES THIS NEED A QUESTION?

Decide BEFORE drafting.

Output:

**Question:** Yes — [genuinely unanswered point]

or:

**Question:** No — observation is enough.

A question is justified only when:

- the answer is not already in the post
- the owner genuinely wants to know
- it advances the conversation
- it follows naturally from the owner's contribution

Do NOT ask a question:

- simply to get a reply
- because a comment framework says a CTA is required
- when the author already answered it
- when the comment is already complete
- as disguised engagement bait

Never automatically end with:

- "What do you think?"
- "Curious to hear your thoughts."
- "Would love to know your take."
- equivalent generic prompts

A concrete observation is a complete ending.

> **Why this rule exists.** Real incident, 2026-08-11: a comment asked whether an author's experiment
> was aimed at a gap she had stated, in her closing line, it was aimed at. She publicly flagged the
> comment as a way of spotting people using bots. Asking something the post already answered is the
> loudest available signal that the commenter did not read to the end.

---

## 7. SAY IT NORMALLY

Translate the owner's thought into the simplest natural wording that still preserves the meaning.

Output:

**Natural wording:** [rough conversational wording]

Imagine the owner has just read the post and is typing directly into the LinkedIn comment box.

This is NOT a copywriting exercise.

Prefer:

- ordinary vocabulary
- conversational rhythm
- direct statements
- natural contractions
- short sentences where natural
- one primary idea
- familiar language

Avoid:

- consultant language
- corporate vocabulary
- unnecessarily abstract nouns
- rhetorical flourishes
- clever metaphors
- symmetrical constructions
- manufactured hooks
- slogans
- aphorisms
- excessive contrast structures
- artificial profundity
- engagement language

If a phrase requires explanation, simplify it.

### CRITICAL RULE

**Natural wording is the target voice.**

It is NOT a rough draft that must subsequently be upgraded.

If it already sounds like something the owner would naturally type, preserve it almost verbatim.

Do not replace ordinary language with more sophisticated alternatives merely because they sound more polished.

Do not turn:

simple → sophisticated

conversational → authoritative

specific → abstract

ordinary → quotable

The goal is clarity and authenticity, not elevation.

---

# STEP 3C — REASONING CHECKPOINT

Before drafting the three options, show the owner:

**What stood out:**  
...

**Already covered:**  
...

**My add:**  
...

**New because:**  
...

**Personal connection:**  
...

**Question:**  
Yes / No

**Natural wording:**  
...

Keep this concise.

Do not produce long reasoning.

The checkpoint exists so the owner can identify:

- misunderstanding
- duplication
- wrong emphasis
- manufactured insight
- incorrect personal connection
- unnecessary question
- unnatural language

If the owner corrects any part, use the corrected reasoning.

Do not defend the previous interpretation.

---

# STEP 3D — DRAFT THREE VARIATIONS

Use the confirmed reasoning to create three options.

The three options should reflect genuinely different levels or modes of engagement.

Do NOT merely rewrite the same sentence with synonyms.

There is:

- no mandatory hook
- no mandatory CTA
- no mandatory question
- no mandatory personal story
- no mandatory line count
- no requirement to sound authoritative

---

## V1 — NATURAL REACTION

Usually 1–3 sentences.

This is the DEFAULT.

Start from `Natural wording`.

Stay extremely close to it.

Editing should primarily:

- remove genuine awkwardness
- improve clarity
- correct grammar where necessary
- make the connection to the source post understandable

### DO NOT "UPGRADE" V1

Do not replace ordinary vocabulary with sophisticated vocabulary.

Do not add:

- a hook
- thought-leadership language
- a metaphor
- an aphorism
- a CTA
- a question unless Step 6 identified one
- extra explanation merely to make the comment look substantial

If `Natural wording` already works as a comment, use it almost verbatim.

The model's job is not to make V1 more impressive.

The model's job is to avoid ruining a natural thought.

Examples:

KEEP:
"Roles change, tools change."

DO NOT UPGRADE TO:
"Roles evolve and technologies shift."

KEEP:
"something you actually get to carry with you."

DO NOT UPGRADE TO:
"a durable transferable advantage."

KEEP:
"knowing how to work with people"

DO NOT UPGRADE TO:
"interpersonal capability"
"human-centred leadership"
"relationship navigation"

---

## V2 — ADD A LAYER

Usually 2–4 sentences.

Take the owner's genuine contribution and develop it slightly.

Possible directions:

- consequence
- implication
- distinction
- qualification
- useful reframe
- relevant context

Do not introduce an entirely new thesis merely to make V2 appear more sophisticated than V1.

Do not turn it into a miniature LinkedIn post.

Do not manufacture a contrarian opening.

Do not perform expertise.

Add depth only when there is actual depth to add.

---

## V3 — CONVERSATION

Usually 2–4 sentences.

Use when there is a genuine opportunity for:

- curiosity
- personal observation
- respectful disagreement
- shared experience
- unresolved question
- relationship-building

A question remains optional.

Only ask a question if Step 6 identified a genuine one.

Do not manufacture curiosity simply because this variation is called "Conversation."

Conversation can also be a statement that naturally invites a response.

---

# STEP 3E — BOT-COMMENT TEST

Run this individually against every variation.

## A. Duplication

Ask:

1. Does the comment repeat the author's point before contributing anything?

2. Does it reuse distinctive wording unnecessarily?

3. Is the supposed insight merely a synonymised version of the author's point?

4. Could the comment have been produced by summarising the post?

5. Is the comment explaining the post back to the person who wrote it?

If yes, rewrite.

---

## B. Contribution

Ask:

6. What exact thought in this comment comes from the owner rather than the author?

There should be a clear answer.

7. Is that thought genuinely absent from the source?

8. Does it contribute enough to justify the comment?

If no genuine contribution exists, simplify into a natural reaction rather than manufacturing insight.

A comment taking the "plain agreement, stated concretely" path from Step 3B does not fail this
section. Its contribution is concreteness and a genuine reaction, not novelty. Check it against
section E instead.

---

## C. Question Quality

If there is a question:

9. Is it already answered anywhere in the post?

10. Is it strongly implied by the post?

11. Would the owner genuinely care about the answer?

12. Does it advance the conversation?

13. Would the comment actually be stronger without it?

If the question is unnecessary, remove it.

---

## D. Formula Detection

Check whether the comment follows common generated-comment patterns such as:

- compliment → paraphrase → generic insight → question
- quote → agreement → explanation → question
- agreement → restatement → generic lesson
- clever hook → abstract insight → engagement CTA
- praise → owner's unrelated expertise → question

If the structure feels manufactured, rewrite from `Natural wording`.

---

## E. Over-Polishing

Ask:

14. Did ordinary words become unnecessarily sophisticated?

15. Did simple sentences become rhetorical?

16. Did a natural thought become a slogan?

17. Was a metaphor added that the owner did not need?

18. Did the model create a "punchier" line merely because it sounded good?

19. Does this sound more like a LinkedIn creator writing content than a person leaving a comment?

If yes:

Return to `Natural wording`.

Simplify.

---

## F. Fake Humanity

Do NOT attempt to make AI-assisted writing look human by artificially adding:

- typos
- slang
- emojis
- sentence fragments
- fake anecdotes
- fake uncertainty
- deliberate grammatical mistakes
- random humour
- excessive informality

Humanity comes from the specificity and originality of the reaction, not cosmetic imperfections.

---

## G. Final Test

Ask:

> If the author suspected that some comments were generated automatically, is there anything about this comment that would reasonably make it look like the commenter did not actually read or think about the post?

If yes:

Identify the reason.

Then fix the underlying problem.

Do NOT merely disguise it stylistically.

---

# STEP 4 — QA + PRESENT

Run `qa-gate` on each variation.

At minimum:

- voice_match
- anti_ai
- semantic duplication
- naturalness
- question quality

Present:

### V1 — Natural Reaction
[comment]

### V2 — Add a Layer
[comment]

### V3 — Conversation
[comment]

Then give:

**Recommended:** V#

**Why:** one concise sentence based on the account type, post tone and relationship goal.

Do not automatically recommend the longest or most sophisticated option.

When V1 says enough, recommend V1.

---

# RECOMMENDATION LOGIC

## Peer / Fellow Creator / Bigger Voice

Primary goal:

**relationship**

Prefer the option that sounds most natural and creates genuine interaction.

Usually V1 or V3.

Use V2 only when there is genuinely useful additional thinking.

Do not perform for the person's audience at the expense of speaking naturally to the person.

Keep the comment connected to their post.

Do not redirect everything toward the owner's business.

---

## ICP Prospect

Primary goal:

**demonstrate relevant thinking naturally and build familiarity**

Use the option that best shows genuine understanding of something relevant to the prospect.

Often V2 for substantive business topics.

Use V3 where personal disclosure or genuine conversation makes it appropriate.

Never turn the comment into:

- a pitch
- a disguised pitch
- a profile advertisement
- a forced demonstration of expertise

The prospect should become interested because the owner contributed something useful, not because the comment advertised capability.

---

# OWNER COMMANDS

Wait for:

`done`

Log the recommended or last-pasted comment.

`skip`

Move to the next account.

`shorter`

Tighten the existing thought without changing its meaning or making it more polished.

`again`

Return to Step 3b and find a genuinely different angle.

Do NOT simply paraphrase the rejected comments.

If the owner explains what feels wrong, update the reasoning first.

---

# STEP 5 — LOG ON "DONE"

## STEP 5A — ENGAGEMENT TRACKER

Always set Next Action.

```python
import openpyxl
from datetime import date, timedelta

TRACKER = "trackers/engagement-tracker.xlsx"

wb = openpyxl.load_workbook(TRACKER)
ws = wb["Accounts"]

today = date.today()
gap = 7

name = "NAME"
url = ""
category = ""

target = None

for row in ws.iter_rows(min_row=2):
    if (
        url
        and row[7].value
        and url.strip() in str(row[7].value)
    ) or (
        not url
        and row[0].value
        and name.lower() in str(row[0].value).lower()
    ):
        target = row[0].row
        break

if target is None:
    ws.append([
        name,
        "",
        category,
        today,
        today + timedelta(days=gap),
        1,
        today,
        url,
        today,
        ""
    ])

else:
    r = target

    ws.cell(row=r, column=4).value = today
    ws.cell(row=r, column=5).value = today + timedelta(days=gap)

    ws.cell(row=r, column=6).value = (
        ws.cell(row=r, column=6).value or 0
    ) + 1

    if not ws.cell(row=r, column=7).value:
        ws.cell(row=r, column=7).value = today

wb.save(TRACKER)

print("Saved.")
```

## 5b. Engage → promote (the linkage)
If this account is a strong ICP fit and you've engaged them a few times, **offer to promote** them into the lead-gen tracker: "Promote [Name] to prospects?" On yes, call `log-prospect` to create their lead-gen row (Status = Requested or Connected as appropriate), pre-filled from here. If they're **already** in the lead-gen tracker (match on LinkedIn URL), increment their `Touchpoints` and update `Last Contact` there — a comment counts as a touch.

## 5c. Daily note + audit log
- `daily-log/YYYY-MM-DD.md` under `## What happened today`: `- 💬 Engaged: [names] — [count] comments`
- `audit-log.md`: `[YYYY-MM-DD HH:MM] commenting-others | <name> | comment | <comment text>`

---

# STEP 6 — When the list runs dry
Fallbacks for more targets: (1) **ask the owner to paste profiles** of people they already have in mind — run STEP 1b to file them; (2) people who reacted to your recent posts; (3) people who commented on your posts; (4) keyword content search for your ICP topics. Same filters apply (ICP, geography, freshness, eligibility). New accounts get added to the tracker.

---

# NOTES
- Use browser tools (`tabs_context`, `navigate`, `get_page_text`); search pages render text, profile/activity pages often don't.
- If you hit a login page, ask the owner to log in.
