---
applyTo: "**/*"
---

# Salesforce CLI Safety Instructions

Classify every Salesforce CLI command before running it.

## Safe read-only

Examples: `pwd`, `ls`, `find`, `grep`, `git status`, `git diff`, `cat sfdx-project.json`, `sf org list`, read-only SOQL with small `LIMIT`, metadata listing commands.

## Validation / dry-run

Examples: `npm test`, `npm run lint`, `sf scanner run`, `sf apex run test`, `sf project deploy validate`, `sf project deploy start --dry-run`.

## Dangerous / explicit approval required

Examples: `sf project deploy start` without dry-run/validate, `sf project retrieve start` when it may overwrite local files, `sf org delete scratch`, `git reset --hard`, `git clean -fd`, `rm -rf`, destructive metadata deploys.

Use org aliases only when supplied by the user or discovered through safe commands. Never assume production targets.

