#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-salesforce-agent-cli-kit}"
VISIBILITY="${2:-private}"
OWNER="${3:-}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI is required: https://cli.github.com/"
  exit 1
fi

if [ ! -d .git ]; then
  git init
fi

git add .
git commit -m "Initial Salesforce agent CLI kit" || true

if [ -n "$OWNER" ]; then
  gh repo create "$OWNER/$REPO_NAME" "--$VISIBILITY" --source=. --remote=origin --push
else
  gh repo create "$REPO_NAME" "--$VISIBILITY" --source=. --remote=origin --push
fi
