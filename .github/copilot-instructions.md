# Salesforce Agent CLI Kit Instructions

This repository provides reusable Salesforce DX agent customizations. Keep instructions generic and portable across Salesforce projects.

Use `AGENTS.md` for global safety rules. Use focused files in `.github/instructions`, `.github/agents`, `.github/skills`, and `.github/prompts` for detailed workflows.

When working in a Salesforce DX repo:

- Inspect `sfdx-project.json` before assuming package directories.
- Prefer metadata inspection over org data queries.
- Classify commands as safe read-only, validation/dry-run, or dangerous.
- Do not deploy to production or run destructive commands without explicit approval.
- Do not hardcode org aliases, object names, customer data, credentials, or usernames.
- Report validation accurately, including when validation was not run.

