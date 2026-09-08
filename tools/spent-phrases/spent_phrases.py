#!/usr/bin/env python3
"""
Extract recently-used openers, closers and repeated phrases from audit-log.md so a
drafting session can load them as constraints BEFORE writing, not audit them after.

Why this exists: "The line I'd [verb]", "my guess is" and "nobody/anyone" each became
visible signatures without anyone noticing, and each was only ever caught by grepping
the log after a draft had already been written and shown to the owner. Eyeballing does
not catch this class of drift. Counting does.

Usage:
    python3 tools/spent-phrases/spent_phrases.py            # last 14 days, print + write
    python3 tools/spent-phrases/spent_phrases.py --days 30
    python3 tools/spent-phrases/spent_phrases.py --stdout   # print only, no file write
"""

import argparse
import collections
import datetime as dt
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
AUDIT = ROOT / "audit-log.md"
OUT = ROOT / "references" / "learning" / "spent-phrases.md"

LINE = re.compile(
    r"^\[(\d{4}-\d{2}-\d{2})[^\]]*\]\s*([a-z-]+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*(.*)$"
)

# Entry kinds that contain owner-written prose worth checking for reuse.
PROSE_KINDS = {"comment", "reply", "dm", "connection note", "post"}

# Words too common to be interesting as a repeated phrase on their own.
STOP_STARTS = {
    "the", "a", "an", "and", "but", "so", "that", "this", "it", "is", "was",
    "of", "to", "in", "on", "for", "with", "as", "at", "by", "from", "you",
    "your", "i", "my", "we", "our", "they", "their", "he", "she",
}


def sentences(text):
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return [p.strip() for p in parts if p.strip()]


def first_words(s, n=7):
    w = re.findall(r"[A-Za-z0-9']+", s)
    return " ".join(w[:n]).lower()


def ngrams(text, lo=3, hi=5):
    words = re.findall(r"[a-z']+", text.lower())
    for n in range(lo, hi + 1):
        for i in range(len(words) - n + 1):
            g = words[i:i + n]
            if g[0] in STOP_STARTS and g[1] in STOP_STARTS:
                continue
            yield " ".join(g)


def load(days):
    if not AUDIT.exists():
        sys.exit(f"No audit log at {AUDIT}")
    cutoff = dt.date.today() - dt.timedelta(days=days)
    rows = []
    for raw in AUDIT.read_text(encoding="utf-8").splitlines():
        m = LINE.match(raw.strip())
        if not m:
            continue
        date_s, _skill, who, kind, text = m.groups()
        if kind.strip().lower() not in PROSE_KINDS:
            continue
        try:
            d = dt.date.fromisoformat(date_s)
        except ValueError:
            continue
        if d < cutoff or len(text.split()) < 5:
            continue
        rows.append((d, who.strip(), kind.strip().lower(), text.strip()))
    return sorted(rows)


def build(rows, days):
    openers = collections.Counter()
    closers = collections.Counter()
    phrases = collections.Counter()
    phrase_seen = collections.defaultdict(set)

    for d, who, _kind, text in rows:
        ss = sentences(text)
        if not ss:
            continue
        openers[first_words(ss[0])] += 1
        closers[first_words(ss[-1])] += 1
        for g in set(ngrams(text)):
            phrases[g] += 1
            phrase_seen[g].add(who)

    # A phrase only matters if it crossed to a DIFFERENT recipient. Twice in one
    # comment, or twice to the same person, is not a signature.
    repeated = [
        (g, c) for g, c in phrases.items()
        if c >= 2 and len(phrase_seen[g]) >= 2
    ]
    repeated.sort(key=lambda x: (-x[1], x[0]))

    # Drop n-grams fully contained in a longer, equally-frequent one.
    kept = []
    for g, c in repeated:
        if any(g != o and g in o and oc >= c for o, oc in repeated):
            continue
        kept.append((g, c))

    q_close = sum(1 for _, _, _, t in rows if t.rstrip().endswith("?"))

    L = []
    L.append("# Spent phrases")
    L.append("")
    L.append(f"> Generated from `audit-log.md`, last {days} days. "
             f"{len(rows)} owner-written entries.")
    L.append("> **Regenerate and read this BEFORE drafting, not after.** "
             "`python3 tools/spent-phrases/spent_phrases.py`")
    L.append("> Do not reuse anything below without a deliberate reason. "
             "This file is generated; edits are overwritten.")
    L.append("")

    L.append("## Repeated across two or more people")
    L.append("")
    L.append("The real signal. A phrase reaching a second recipient is how a natural line "
             "becomes a template.")
    L.append("")
    if kept:
        for g, c in kept[:40]:
            L.append(f"- `{g}` — {c}x, {len(phrase_seen[g])} people")
    else:
        L.append("- (none)")
    L.append("")

    L.append("## Stories already spent (30-day cooldown)")
    L.append("")
    L.append("First-person lived detail that reached a second person. A story used in the last "
             "30 days does not get reused without a deliberate decision. See "
             "`.claude/rules/anti-ai.md` -> Self-repetition.")
    L.append("")
    story = [
        (g, c) for g, c in kept
        if len(g.split()) >= 4
        and re.match(r"^(i|my|we|our)\b", g)
    ]
    if story:
        for g, c in story[:25]:
            who = ", ".join(sorted(phrase_seen[g]))
            L.append(f"- `{g}` — {c}x ({who})")
    else:
        L.append("- (none in window)")
    L.append("")

    L.append("## Openers used")
    L.append("")
    for g, c in openers.most_common(30):
        L.append(f"- {'**' if c > 1 else ''}{g}{f'** ({c}x)' if c > 1 else ''}")
    L.append("")

    L.append("## Closers used")
    L.append("")
    for g, c in closers.most_common(30):
        L.append(f"- {'**' if c > 1 else ''}{g}{f'** ({c}x)' if c > 1 else ''}")
    L.append("")

    L.append("## Shape checks")
    L.append("")
    pct = round(100 * q_close / len(rows)) if rows else 0
    L.append(f"- Closed on a question: **{q_close} of {len(rows)}** ({pct}%). "
             "Sustained above roughly half is a visible signature.")
    quoted = sum(1 for _, _, _, t in rows if t.lstrip()[:1] in {'"', "'"})
    L.append(f"- Opened on a quoted phrase from the post: **{quoted} of {len(rows)}**. "
             "Retiring the wording of this move does not retire the move.")
    L.append("")
    return "\n".join(L)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=14)
    ap.add_argument("--stdout", action="store_true")
    a = ap.parse_args()

    rows = load(a.days)
    if not rows:
        sys.exit(f"No owner-written entries in the last {a.days} days.")
    report = build(rows, a.days)
    print(report)
    if not a.stdout:
        OUT.parent.mkdir(parents=True, exist_ok=True)
        OUT.write_text(report + "\n", encoding="utf-8")
        print(f"\n[written to {OUT.relative_to(ROOT)}]", file=sys.stderr)


if __name__ == "__main__":
    main()
