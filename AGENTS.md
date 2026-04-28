# AGENTS.md

## Purpose

This repository is a reusable Salesforce AI Agent Toolkit for Salesforce DX inspection, review, implementation, and validation workflows.

Created by Dominik Machowski.

Agents should keep this repo generic. Do not add org aliases, credentials, company names, customer data, object-specific assumptions, or one-off project instructions.

## Global safety rules

- Inspect the repository before editing.
- Prefer small, composable files over large instruction dumps.
- Preserve existing useful files and architecture unless they are clearly superseded.
- Do not deploy to production unless the user explicitly requests it.
- Do not run destructive commands unless the user explicitly requests them.
- Do not claim validation passed unless the command was actually run.
- Do not include secrets, tokens, usernames, passwords, org URLs, or project-specific customer data.

## Admin Read-Only Mode

When using Salesforce Admin Assistant or Admin Read-Only agents, the stricter read-only policy in `.github/instructions/salesforce-admin-readonly.instructions.md` overrides developer-oriented guidance.

Admin Read-Only agents are explanation-only. They must not deploy, run deployment validation, run tests, edit code, edit metadata, modify records, run anonymous Apex, change permissions, commit, push, or create pull requests.

## Repository inspection rules

Start with safe read-only inspection:

```bash
pwd
ls -la
find . -maxdepth 4 -type f | sort
git status --short
```

For Salesforce DX projects, also inspect:

```bash
cat sfdx-project.json
sf org list
find force-app -maxdepth 4 -type f | sort | head -200
```

If a file or command is unavailable, report that clearly and continue with local evidence.

## Salesforce CLI safety

Classify commands before running them:

- Safe read-only: local file inspection, Git status/diff, metadata search, org listing, non-mutating SOQL/Tooling API queries.
- Validation / dry-run: tests, lint, builds, scanner, validate-only deployments, dry-run deploys.
- Dangerous / needs explicit approval: real deploys, retrieves that overwrite local files, destructive changes, org deletion, file deletion, git reset, git clean.

Never run production deployment commands or destructive commands by default.

## Default output format

Use:

```md
## Summary
## Files changed
## Commands run
## Validation
## Risks / assumptions
## Next steps
```

## Handoff to specialized agents

- Use Salesforce Code Reviewer for broad project and metadata review.
- Use Salesforce Apex Engineer for Apex implementation and test design.
- Use Salesforce Flow Architect for Flow review, refactor, and automation design.
- Use Salesforce LWC Engineer for Lightning Web Component work.
- Use Salesforce Security Reviewer for CRUD/FLS, sharing, permissions, exposed Apex, and secrets review.
- Use Salesforce Release Validator for package.xml, test level, dry-run, and deployment readiness checks.
- Use Salesforce CLI Implementer for command-driven inspection and validation.
- Use Salesforce Researcher for source-backed research before implementation.
- Use Salesforce Admin Explainer, Flow Explainer, Permission Explainer, Object Model Explainer, Automation Impact Analyst, Lightning Page Explainer, Validation Rule Explainer, Report and Dashboard Explainer, and Admin Troubleshooting Guide for read-only admin explanation workflows.
