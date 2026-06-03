#!/usr/bin/env python3
"""Step 0 auto-detect: find every copy of this workspace and flag cloud-synced / duplicate copies.

Run with the NATIVE python on the host (not via a translation layer), so cloud
placeholders (iCloud/OneDrive) are enumerated. Prints a report and exits 1 if more
than one copy exists or the working copy sits in a cloud-synced folder.
"""
import os, sys, time

MARKERS = ("CLAUDE.md", "config.json", "START-HERE.md")  # all three => a workspace copy
CLOUD = ("icloud", "onedrive", "dropbox", "google drive", "mobile documents")
SKIP_DIRS = {".git", "node_modules", ".obsidian", "__pycache__", "AppData", ".cache"}
MAX_DEPTH = 4

def is_workspace(d):
    return all(os.path.exists(os.path.join(d, m)) for m in MARKERS)

def cloud_hits(path):
    low = path.lower()
    return [c for c in CLOUD if c in low]

def main():
    home = os.path.expanduser("~")
    cwd = os.path.realpath(os.getcwd())

    roots = [
        home,
        os.path.join(home, "Desktop"), os.path.join(home, "Documents"),
        os.path.join(home, "Downloads"), os.path.join(home, "OneDrive"),
        os.path.join(home, "iCloudDrive"), os.path.join(home, "Dropbox"),
        os.path.join(home, "Google Drive"),
        os.path.join(home, "Library", "Mobile Documents", "com~apple~CloudDocs"),
    ]
    seen = set()
    roots = [r for r in roots if not (r in seen or seen.add(r))]

    found = set()
    for root in roots:
        if not os.path.isdir(root):
            continue
        for dirpath, dirnames, _ in os.walk(root):
            depth = dirpath[len(root):].count(os.sep)
            if depth >= MAX_DEPTH:
                dirnames[:] = []
                continue
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
            if is_workspace(dirpath):
                found.add(os.path.realpath(dirpath))
                dirnames[:] = []  # don't descend into a found workspace

    copies = sorted(found)
    print(f"Working copy: {cwd}")
    if cloud_hits(cwd):
        print(f"  WARNING: cloud-synced location ({', '.join(cloud_hits(cwd))}). "
              "Files may be online-only placeholders the tooling can't read/write. "
              'Set the folder to "Always keep on this device" or run from a local copy.')

    print(f"\nWorkspace copies found: {len(copies)}")
    for c in copies:
        try:
            mt = time.strftime("%Y-%m-%d %H:%M", time.localtime(os.path.getmtime(os.path.join(c, "config.json"))))
        except OSError:
            mt = "??"
        tags = ""
        if cloud_hits(c):
            tags += " [cloud]"
        if c == cwd:
            tags += " <-- CURRENT (Claude writes here)"
        print(f"  {c}  (config.json {mt}){tags}")

    if len(copies) > 1:
        print("\nACTION REQUIRED: more than one copy exists. They will drift, because Claude writes to the "
              "current copy while you may open another. Pick ONE source of truth before continuing.")
        return 1
    if cloud_hits(cwd):
        return 1
    print("\nOK: single copy, local. Safe to proceed.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
