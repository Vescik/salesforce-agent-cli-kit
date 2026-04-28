#!/usr/bin/env bash
set -euo pipefail

run() {
  printf '\n$ %s\n' "$*"
  "$@"
}

printf 'Salesforce DX project inspection\n'
run pwd
run git status --short

if [ ! -f sfdx-project.json ]; then
  printf '\nNo sfdx-project.json found. Run this script from a Salesforce DX project root.\n'
  exit 0
fi

run cat sfdx-project.json

printf '\nPackage directories:\n'
node -e 'const p=require("./sfdx-project.json"); for (const d of p.packageDirectories || []) console.log(`- ${d.path}${d.default ? " (default)" : ""}`)'

printf '\nApex files:\n'
find . -type f \( -name "*.cls" -o -name "*.trigger" \) | sort || true

printf '\nFlow files:\n'
find . -type f -name "*.flow-meta.xml" | sort || true

printf '\nLWC files:\n'
find . -path "*/lwc/*" -type f | sort || true

printf '\nObject and field metadata:\n'
find . -type f \( -name "*.object-meta.xml" -o -name "*.field-meta.xml" \) | sort || true

printf '\nPermission metadata:\n'
find . -type f \( -name "*.permissionset-meta.xml" -o -name "*.profile-meta.xml" \) | sort || true

if command -v sf >/dev/null 2>&1; then
  run sf org list
else
  printf '\nSalesforce CLI not found; skipped sf org list.\n'
fi

