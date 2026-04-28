#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="${1:-force-app/main/default}"
TEST_LEVEL="${TEST_LEVEL:-NoTestRun}"
ORG_ALIAS="${ORG_ALIAS:-}"

run() {
  printf '\n$ %s\n' "$*"
  "$@"
}

printf 'Salesforce DX validate-only workflow\n'
run pwd
run git status --short

if [ ! -f sfdx-project.json ]; then
  printf '\nNo sfdx-project.json found. Run this script from a Salesforce DX project root.\n'
  exit 1
fi

if [ ! -d "$SOURCE_DIR" ] && [ ! -f "$SOURCE_DIR" ]; then
  printf '\nSource path not found: %s\n' "$SOURCE_DIR"
  exit 1
fi

if ! command -v sf >/dev/null 2>&1; then
  printf '\nSalesforce CLI is required for validation.\n'
  exit 1
fi

run sf org list

CMD=(sf project deploy validate --source-dir "$SOURCE_DIR" --test-level "$TEST_LEVEL")
if [ -n "$ORG_ALIAS" ]; then
  CMD+=(--target-org "$ORG_ALIAS")
fi

printf '\nAbout to run validate-only deployment. This does not deploy metadata.\n'
run "${CMD[@]}"

