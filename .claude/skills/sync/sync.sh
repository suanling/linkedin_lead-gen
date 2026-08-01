#!/usr/bin/env bash
# Back up owner data (audit log, trackers, references, posts) to the private
# SL-linkedin remote. Safe to run repeatedly; exits 0 when there is nothing new.
#
#   ./.claude/skills/sync/sync.sh              # commit + push
#   ./.claude/skills/sync/sync.sh --dry-run    # show what would be sent
#   ./.claude/skills/sync/sync.sh -m "message" # custom commit message
set -euo pipefail

BRANCH="sl-live"
REMOTE="sl"
DRY_RUN=0
MSG=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run|-n) DRY_RUN=1; shift ;;
    -m|--message) MSG="${2:-}"; shift 2 ;;
    -h|--help) sed -n '2,8p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "unknown option: $1" >&2; exit 2 ;;
  esac
done

cd "$(git rev-parse --show-toplevel)"

# The personal paths. Tracked files sync on their own; the force-add is what
# catches NEW files in dirs the template .gitignore still excludes
# (lead-magnets, pending-amendments, content, metrics inbox).
PATHS=(
  audit-log.md
  account-profile.md
  config.json
  kk-post.md
  kk-carousel.md
  .claude/rules/voice.md
  .claude/rules/gates.md
  .claude/settings.local.json
  references/
  trackers/
  daily-log/
  content/
  lead-magnets/
  pending-amendments/
)

# Never send these, even if a rule above would sweep them in.
EXCLUDE_RE='(^|/)\.env$|(^|/)\.DS_Store$|node_modules/|^daily-log/export/|(^|/)__pycache__/|\.pyc$|^\.git\.corrupted-backup/|^tools/linkedin-metrics-extension/logs/'

# --- guards -----------------------------------------------------------------
current="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$current" != "$BRANCH" ]]; then
  echo "! On branch '$current', but owner data lives on '$BRANCH'."
  echo "  Run: git checkout $BRANCH"
  exit 1
fi

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "! Remote '$REMOTE' is missing. Expected the private SL-linkedin repo." >&2
  exit 1
fi

# Refuse to push owner data anywhere but the private repo.
if [[ "$(git remote get-url "$REMOTE")" != *"SL-linkedin"* ]]; then
  echo "! Remote '$REMOTE' does not point at SL-linkedin. Refusing to push." >&2
  exit 1
fi

# --- stage ------------------------------------------------------------------
existing=()
for p in "${PATHS[@]}"; do [[ -e "$p" ]] && existing+=("$p"); done
git add -f -- "${existing[@]}" 2>/dev/null || true

# Drop anything matching the exclusion list back out of the index.
while IFS= read -r f; do
  [[ -n "$f" ]] && git restore --staged -- "$f" 2>/dev/null || true
done < <(git diff --cached --name-only | grep -E "$EXCLUDE_RE" || true)

if git diff --cached --quiet; then
  echo "Already up to date. Nothing new to back up."
  exit 0
fi

echo "Files to back up:"
git diff --cached --name-status | sed 's/^/  /'
count=$(git diff --cached --name-only | wc -l | tr -d ' ')

# Last line of defence: never let a secret through.
if leaked=$(git diff --cached --name-only | grep -E "$EXCLUDE_RE" || true); [[ -n "$leaked" ]]; then
  echo "! Refusing to commit excluded files:" >&2
  echo "$leaked" | sed 's/^/    /' >&2
  exit 1
fi

if [[ "$DRY_RUN" == "1" ]]; then
  echo ""
  echo "(dry run — nothing committed. Re-run without --dry-run to push.)"
  git reset -q
  exit 0
fi

# --- commit + push ----------------------------------------------------------
[[ -z "$MSG" ]] && MSG="Sync workspace data ($(date +%Y-%m-%d), ${count} file(s))"
git commit -q -m "$MSG"
git push -q "$REMOTE" "$BRANCH"
echo ""
echo "Backed up ${count} file(s) to $REMOTE/$BRANCH."
