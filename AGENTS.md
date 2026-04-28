# AGENTS.md

## Purpose

This repository contains reusable instructions, skills, custom agents, and CLI command documentation for Salesforce DX automation work.

Agents working in this repository should help inspect, modify, validate, and document Salesforce DX projects safely.

## General Rules

- Prefer minimal, safe changes.
- Inspect the repository before editing.
- Do not deploy to production unless explicitly requested.
- Do not run destructive commands unless explicitly requested.
- Use CLI commands to verify facts instead of guessing.
- Preserve existing project structure and naming conventions.
- Be honest when validation was not run.
- Never claim a command passed if it was not executed.

## Command Safety

Safe read-only commands may be run automatically:

```bash
pwd
ls
find
grep
git status
git diff
cat sfdx-project.json
sf org list
```

Validation commands may be run when useful:

```bash
sf project deploy validate
sf project deploy start --dry-run
sf apex run test
npm test
npm run lint
npm run build
```

Do not run these automatically:

```bash
sf project deploy start
rm -rf
git reset --hard
git clean -fd
sf org delete scratch
```

## Salesforce Preferences

Prefer:

- Formula Fields for simple derived values.
- Validation Rules for simple blocking.
- Before-save Flow for same-record updates.
- After-save Flow for related-record updates and logging.
- Scheduled Flow for delayed recalculation.
- Platform Events for async decoupling.
- Apex only when declarative tools are insufficient.

Avoid:

- Get Records inside loops.
- DML inside loops.
- One giant Flow doing many unrelated jobs.
- Hardcoded IDs.
- Production deployments without explicit instruction.

## Final Response Format

Use:

```md
## Summary
## Files changed
## Commands run
## Validation
## Risks / assumptions
## Next steps
```
