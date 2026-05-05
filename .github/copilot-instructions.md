# Salesforce Agent CLI Kit Instructions

This repository is an OOTB-ready Salesforce DX agent workspace for GitHub Copilot/Codex workflows.

Use `AGENTS.md` for global safety rules. Use focused files in `.github/agents`, `.github/instructions`, `.github/skills`, `.github/prompts`, `agents`, `skills`, `prompts`, and `templates` for detailed workflows.

## Core Behavior

- Always inspect the repository before suggesting changes.
- Always analyze Salesforce metadata before documenting implementation behavior.
- Prefer minimal, safe changes.
- Do not delete or rename metadata files without explicit approval.
- Explain findings in both business language and technical language.
- Use Markdown compatible with Azure DevOps Wiki when generating wiki docs.
- Do not expose secrets, credentials, org IDs, tokens, usernames, private URLs, customer data, or personal data.
- If metadata is unclear, mark uncertainty clearly instead of guessing.
- Do not modify Salesforce metadata unless the user explicitly asks for implementation.
- Do not deploy to production or run destructive commands without explicit approval.

## Salesforce DX Inspection

When working in a Salesforce DX repo:

- Inspect `sfdx-project.json` before assuming package directories.
- Prefer metadata inspection over org data queries.
- Classify commands as safe read-only, validation/dry-run, or dangerous.
- Report validation accurately, including when validation was not run.

## Documentation Standard

When documenting Salesforce components, include:

- Component name
- Component type
- Purpose
- Business context
- Technical behavior
- Dependencies
- Risks
- Test scenarios
- Deployment notes

## Metadata Analysis Standard

Inspect `force-app/` when present. Pay attention to:

- Objects and fields
- Validation rules
- Flows
- Layouts
- Permission sets and profiles
- Apex classes and triggers
- Lightning Web Components
- Aura components
- Tabs, applications, labels, custom metadata, FlexiPages, quick actions, and record types

## Azure Wiki Markdown

Use:

- `#` and `##` headings
- bullet lists
- Markdown tables
- plain fenced code blocks only when useful

Do not use Mermaid unless explicitly requested.

## Wiki Publishing

Generated Azure Wiki documentation must be reviewed first.

Never commit or push wiki documentation until the user explicitly approves publishing, for example:

```text
APPROVE WIKI PUSH
```
