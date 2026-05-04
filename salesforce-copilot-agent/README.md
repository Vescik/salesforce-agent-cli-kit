# Salesforce Copilot Agent

## Purpose

This repository is a reusable GitHub Copilot Agent workspace for Salesforce metadata analysis, Azure Wiki documentation, User Story context generation, and GitHub deployment preparation.

It is designed for developers and solution designers who work in VS Code with Salesforce DX metadata stored in `force-app`.

## What This Agent Does

- Analyzes Salesforce metadata components located in `force-app`.
- Understands existing Salesforce configuration from retrieved metadata.
- Detects metadata dependencies and deployment risks.
- Generates structured Azure Wiki compatible documentation.
- Creates contextual User Story summaries from Description and Acceptance Criteria.
- Prepares output files in a clean folder structure.
- Provides safe GitHub deployment instructions.

## Repository Structure

```text
salesforce-copilot-agent/
├── README.md
├── .github/
│   └── copilot-instructions.md
├── agents/
│   └── salesforce-metadata-documentation-agent.md
├── skills/
│   ├── analyze-salesforce-metadata.md
│   ├── generate-azure-wiki-documentation.md
│   ├── generate-user-story-context.md
│   ├── compare-metadata-changes.md
│   ├── prepare-github-deployment.md
│   └── review-salesforce-flow.md
├── prompts/
│   ├── metadata-analysis.prompt.md
│   ├── azure-wiki-documentation.prompt.md
│   ├── user-story-context.prompt.md
│   └── deployment-checklist.prompt.md
├── templates/
│   ├── azure-wiki-page-template.md
│   ├── user-story-context-template.md
│   ├── metadata-component-summary-template.md
│   └── change-log-template.md
├── scripts/
│   ├── scan-force-app.js
│   ├── generate-docs.js
│   └── validate-output.js
└── output/
    ├── azure-wiki/
    ├── user-stories/
    └── metadata-analysis/
```

## Requirements

- VS Code
- GitHub Copilot Chat
- Node.js 18 or newer recommended
- Salesforce DX project metadata under `force-app`

No Salesforce org authentication is required for the included scripts.

## How to Use in VS Code

1. Open this folder in VS Code.
2. Open GitHub Copilot Chat.
3. Reference `.github/copilot-instructions.md`.
4. Use `agents/salesforce-metadata-documentation-agent.md` as the agent role.
5. Use the relevant prompt from `prompts/`.
6. Run the local scripts to prepare scan and placeholder outputs.

## How to Analyze force-app

Run:

```bash
node scripts/scan-force-app.js
```

To scan a custom path:

```bash
node scripts/scan-force-app.js ../my-salesforce-project/force-app
```

The scanner writes:

```text
output/metadata-analysis/force-app-scan.json
```

## How to Generate Azure Wiki Documentation

1. Run metadata scan.
2. Provide Description and Acceptance Criteria to Copilot.
3. Use `prompts/metadata-analysis.prompt.md`.
4. Use `prompts/azure-wiki-documentation.prompt.md`.
5. Save final documentation under:

```text
output/azure-wiki/solution-documentation.md
output/azure-wiki/deployment-notes.md
output/azure-wiki/rollback-notes.md
```

## How to Generate User Story Context

Use:

```text
prompts/user-story-context.prompt.md
```

Save output to:

```text
output/user-stories/user-story-context.md
```

## How to Prepare GitHub Deployment

If `GITHUB_REPOSITORY_URL` and `TARGET_BRANCH` are provided, prepare deployment commands.

If they are not provided, do not push. Use placeholder instructions in:

```text
output/azure-wiki/deployment-notes.md
```

## Example Input

## Description

The system should prevent Invoice status from being changed unexpectedly and collect information about the source of the change.

## Acceptance Criteria

- Invoice status cannot be changed from Invoiced to Draft by unauthorized automation.
- The system should log the previous and new status.
- The system should identify the user or automation context where possible.
- The logic should work without Apex if possible.

## Example Output

Expected generated files:

```text
output/user-stories/user-story-context.md
output/metadata-analysis/metadata-summary.md
output/metadata-analysis/change-summary.md
output/metadata-analysis/flow-review.md
output/azure-wiki/solution-documentation.md
output/azure-wiki/deployment-notes.md
output/azure-wiki/rollback-notes.md
```

## Safety Rules

- Do not delete Salesforce metadata.
- Do not rename metadata.
- Do not modify Salesforce metadata unless explicitly requested.
- Do not deploy to Salesforce from this workspace.
- Do not expose secrets, credentials, org IDs, tokens, usernames, private URLs, or customer data.
- Mark uncertainty with `Assumption:` or `Requires confirmation:`.
- Do not claim GitHub deployment completed unless `git push` actually succeeded.

## Limitations

- The scanner infers metadata type from file paths and names; it does not fully parse every XML or JavaScript file.
- Placeholder documentation must be replaced with Copilot-generated, story-specific content.
- No Salesforce org connection is used by default.
- No Azure Wiki API publishing is included; generated Markdown is copy/paste or Git-ready.

## GitHub Deployment Steps

Use these only after confirming target repository and branch:

```bash
git status
git remote -v
git branch --show-current
git add .
git commit -m "Add Salesforce Copilot metadata documentation agent"
git push origin {{TARGET_BRANCH}}
```
