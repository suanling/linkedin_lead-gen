#!/usr/bin/env python3
"""Verify every file+section a skill cites exists in a workspace."""
import os, re, sys, glob

root = sys.argv[1]
os.chdir(root)

skill_files = sorted(glob.glob(".claude/skills/**/*.md", recursive=True)) + \
              sorted(glob.glob(".claude/agents/*.md")) + \
              sorted(glob.glob(".claude/rules/*.md"))

FILE_RE = re.compile(r'(?<![A-Za-z0-9_./-])((?:\.claude/(?:skills|agents|rules)/[A-Za-z0-9_./-]+|references|tools|sops|trackers|lead-magnets|daily-log|content)/[A-Za-z0-9_./ -]+?\.(?:md|py|json|xlsx))`?')
ROOT_RE = re.compile(r'`((?:account-profile|config|kk-post|kk-carousel|kk-reel|audit-log|START-HERE|CLAUDE|README)[A-Za-z0-9_.-]*\.(?:md|json))`')
# "file.md` → "Section"  /  file.md -> Section
SEC_RE  = re.compile(r'`?([A-Za-z0-9_./ -]+\.md)`?\s*(?:→|->)\s*"?([A-Z][A-Za-z0-9 &/,\'-]{2,40})')

missing_files, missing_secs, ok_files = {}, [], set()

for sf in skill_files:
    try: txt = open(sf, encoding="utf-8").read()
    except Exception: continue
    for m in list(FILE_RE.finditer(txt)) + list(ROOT_RE.finditer(txt)):
        path = m.group(1).strip()
        if path.endswith(".example") or "ABSOLUTE/PATH" in path: continue
        if os.path.exists(path): ok_files.add(path)
        else: missing_files.setdefault(path, set()).add(sf)
    for m in SEC_RE.finditer(txt):
        path, sec = m.group(1).strip(), m.group(2).strip()
        if not os.path.exists(path): continue
        body = open(path, encoding="utf-8", errors="replace").read()
        # section present if a heading line contains the cited words
        head = [l for l in body.splitlines() if l.lstrip().startswith("#")]
        words = sec.rstrip(".,").lower()
        if not any(words[:18] in h.lower() for h in head):
            missing_secs.append((sf, path, sec))

print(f"scanned {len(skill_files)} skill/agent/rule files")
print(f"resolved {len(ok_files)} distinct referenced paths\n")
if missing_files:
    print(f"MISSING FILES ({len(missing_files)}):")
    for p, srcs in sorted(missing_files.items()):
        print(f"  {p}")
        for s in sorted(srcs): print(f"      cited by {s}")
else: print("MISSING FILES: none")
print()
if missing_secs:
    print(f"MISSING SECTIONS ({len(missing_secs)}):")
    for sf, p, sec in missing_secs: print(f"  {p} -> '{sec}'  (cited by {sf})")
else: print("MISSING SECTIONS: none")
