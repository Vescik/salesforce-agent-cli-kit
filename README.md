# Salesforce Agent CLI Kit

OOTB-ready GitHub Copilot/Codex agent package for Salesforce DX delivery teams.

Created by Dominik Machowski.

## Purpose

This repository is a single, flat agent workspace for Salesforce projects. It includes:

- GitHub Copilot instructions
- custom agent definitions
- reusable skills
- copy-paste prompts
- Azure Wiki documentation templates
- Node.js helper scripts
- placeholder output folders
- safe Salesforce DX review, test, deployment, and documentation workflows

The repo is intentionally generic. It does not contain org aliases, credentials, customer names, private URLs, tokens, or deployment targets.

## Repository Structure

```text
.
├── .github/
│   ├── agents/
│   ├── instructions/
│   ├── prompts/
│   ├── skills/
│   └── copilot-instructions.md
├── agents/
│   ├── refactor-documentation-agent.md
│   ├── salesforce-metadata-documentation-agent.md
│   └── subagents/
├── skills/
├── prompts/
├── templates/
├── scripts/
├── output/
├── docs/
├── config.example.json
├── package.json
├── AGENTS.md
└── README.md
```

There is no nested workspace folder. Everything is available from the repository root.

## Configuration

Copy the example config and edit local paths:

```bash
cp config.example.json config.json
```

`config.json` is ignored by Git. Use it for local values such as:

```json
{
  "forceAppPath": "force-app",
  "wikiRepoPath": "../azure-wiki-repo",
  "wikiDocsPath": "User-Stories"
}
```

The Azure Wiki repo path must already exist before generating wiki drafts.

## Main Agent Groups

### GitHub Copilot Custom Agents

Use `.github/agents/` for broad Salesforce development workflows:

- `salesforce-code-review-agent.agent.md`
- `salesforce-developer-agent.agent.md`
- `salesforce-test-agent.agent.md`
- `salesforce-deployment-agent.agent.md`
- `salesforce-documentation-creator-agent.agent.md`
- `salesforce-user-story-documentation-runner.agent.md`

Developer and Code Review remain separate on purpose: review should classify risk without editing by default, while development is an implementation workflow.

### User Story Documentation Agents

Use `agents/` for Azure Wiki and Salesforce metadata documentation workflows:

- `agents/refactor-documentation-agent.md`
- `agents/salesforce-metadata-documentation-agent.md`
- `agents/subagents/salesforce-metadata-analysis-agent.md`

## How To Use With VS Code And GitHub Copilot

1. Open this repository or copy its files into a Salesforce DX project.
2. Open VS Code and GitHub Copilot Chat.
3. Reference `.github/copilot-instructions.md` and `AGENTS.md`.
4. Choose the smallest matching agent:
   - review: Code Review Agent
   - implementation: Developer Agent
   - tests/CI: Test Agent
   - release: Deployment Agent
   - docs/wiki: Documentation Creator, Refactor Documentation Agent, or User Story Documentation Runner
5. Keep repo-specific configuration in `config.json`.

## How To Generate User Story Azure Wiki Documentation

After configuring `config.json`, run:

```bash
npm run agent:story-doc -- \
  --story-id "US-000123" \
  --title "Prevent invoice status from changing unexpectedly" \
  --description-file "input/story-description.md" \
  --acceptance-criteria-file "input/acceptance-criteria.md"
```

In GitHub Copilot Chat, use:

```text
Use Salesforce User Story Documentation Runner.

User Story ID: US-000123
Title: Prevent invoice status from changing unexpectedly
Description file: input/story-description.md
Acceptance Criteria file: input/acceptance-criteria.md

Run the local documentation generator and create the Azure Wiki draft.
Do not commit or push.
```

The runner agent should execute the npm command for you after checking `config.json`.

Equivalent direct command:

```bash
npm run generate:story-doc -- \
  --story-id "US-000123" \
  --title "Prevent invoice status from changing unexpectedly" \
  --description-file "input/story-description.md" \
  --acceptance-criteria-file "input/acceptance-criteria.md"
```

Or pass paths directly:

```bash
node scripts/generate-user-story-doc.js \
  --story-id "US-000123" \
  --title "Prevent invoice status from changing unexpectedly" \
  --description-file "input/story-description.md" \
  --acceptance-criteria-file "input/acceptance-criteria.md" \
  --force-app-path "force-app" \
  --wiki-repo-path "../azure-wiki-repo" \
  --wiki-docs-path "User-Stories"
```

The script:

- scans local metadata by keyword
- creates an Azure Wiki Markdown draft
- avoids overwriting existing docs
- does not commit
- does not push

Publishing requires explicit approval and should follow `skills/git-wiki-publish.md`.

## Scripts

```bash
npm run scan
npm run generate
npm run agent:story-doc -- --help
npm run generate:story-doc -- --help
npm run validate
```

Direct commands:

```bash
node scripts/scan-force-app.js
node scripts/generate-docs.js
node scripts/generate-user-story-doc.js --help
node scripts/validate-output.js
```

## Safety Rules

- Do not deploy Salesforce metadata unless explicitly requested.
- Do not run destructive commands.
- Do not hardcode org aliases, secrets, credentials, usernames, tokens, private URLs, or customer data.
- Do not claim validation passed unless it was executed.
- Never commit or push Azure Wiki documentation without explicit user approval.
- If implementation cannot be inferred from metadata, write `Assumption:` or `Requires confirmation:`.

## Admin Read-Only Agents

Admin read-only agents live in a separate repo:

`https://github.com/Vescik/salesforce-admin-readonly-agents`

This repo remains focused on developer-oriented Salesforce review, implementation, validation, deployment planning, and documentation generation.
