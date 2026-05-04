# GitHub Copilot Instructions

This repository is a GitHub Copilot workspace for Salesforce metadata analysis, Azure Wiki documentation, user story context generation, and GitHub deployment preparation.

## Operating Rules

- Always analyze Salesforce metadata before suggesting changes.
- Prefer minimal, safe changes.
- Do not delete or rename metadata files without explicit approval.
- Explain findings in both business language and technical language.
- Use Markdown compatible with Azure DevOps Wiki.
- Do not expose secrets, credentials, org IDs, tokens, usernames, private URLs, or customer data.
- If metadata is unclear, mark uncertainty clearly instead of guessing.
- Do not modify Salesforce metadata unless the user explicitly asks for implementation.
- Do not run destructive commands.

## Salesforce Documentation Standard

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
- Bullet lists
- Markdown tables
- Plain fenced code blocks only when useful

Do not use Mermaid unless explicitly requested.
