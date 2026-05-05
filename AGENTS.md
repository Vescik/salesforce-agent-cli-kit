# AGENTS.md

## Purpose

This repository is a reusable, flat Salesforce AI Agent Toolkit for Salesforce DX inspection, review, implementation, testing, deployment planning, and Azure Wiki documentation workflows.

Created by Dominik Machowski.

Agents should keep this repo generic. Do not add org aliases, credentials, company names, customer data, object-specific assumptions, or one-off project instructions.

## Repository structure rules

- Keep the kit as a single root-level package.
- Do not add nested agent workspaces such as `salesforce-copilot-agent/`.
- Put GitHub Copilot custom agents in `.github/agents/`.
- Put documentation agents in `agents/`.
- Put reusable skills in `skills/` and GitHub skill folders in `.github/skills/`.
- Put reusable prompts in `prompts/` and GitHub prompt files in `.github/prompts/`.
- Put helper scripts in `scripts/`.
- Put Azure Wiki templates in `templates/`.
- Keep local-only config in `config.json`; commit only `config.example.json`.

## Global safety rules

- Inspect the repository before editing.
- Prefer small, composable files over large instruction dumps.
- Preserve existing useful files and architecture unless they are clearly superseded.
- Do not deploy to production unless the user explicitly requests it.
- Do not run destructive commands unless the user explicitly requests them.
- Do not claim validation passed unless the command was actually run.
- Do not include secrets, tokens, usernames, passwords, org URLs, or project-specific customer data.

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

- Use Salesforce Code Review Agent for Apex, Flow, LWC, metadata, permissions, security, dependency, and deployment-risk review.
- Use Salesforce Developer Agent for implementation across Apex, Flow metadata, LWC, metadata XML, scripts, and docs.
- Use Salesforce Test Agent for Apex tests, LWC tests, lint, scanner, CI checks, and validation evidence.
- Use Salesforce Deployment Agent for package scope, validate-only planning, release notes, rollback notes, and deployment checklists.
- Use Salesforce Documentation Creator Agent for Azure Wiki pages, user story context, metadata summaries, release notes, and handoff docs.
- Use Refactor Documentation Agent for Salesforce User Story Azure Wiki documentation generated from User Story details and local `force-app/` metadata.
- Use Azure DevOps User Story Fetcher when the user provides a numeric Azure DevOps Work Item ID and wants Description and Acceptance Criteria fetched through read-only Azure DevOps MCP before documentation generation.

Keep Developer Agent separate from Code Review Agent. Review tasks should not edit files by default; implementation tasks may edit files only when requested.
