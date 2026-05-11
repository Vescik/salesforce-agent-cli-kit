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

## Azure DevOps MCP Setup

For automatic User Story fetching, use VS Code + GitHub Copilot Agent Mode with the official Azure DevOps MCP server.

Copy the example MCP configuration:

```bash
mkdir -p .vscode
cp .vscode/mcp.example.json .vscode/mcp.json
```

Then open VS Code, start GitHub Copilot Chat in Agent Mode, and authenticate with the Azure DevOps organization when prompted.

The MCP config loads only these Azure DevOps domains:

- `core`
- `work`
- `work-items`

This repo treats Azure DevOps MCP as read-only for User Story fetching. Do not commit `.vscode/mcp.json`, tokens, PATs, organization secrets, or cached work item data.

References:

- [Azure DevOps MCP remote setup](https://learn.microsoft.com/en-us/azure/devops/mcp-server/remote-mcp-server)
- [Microsoft Azure DevOps MCP server](https://github.com/microsoft/azure-devops-mcp)
- [Azure DevOps Work Items REST API](https://learn.microsoft.com/en-us/rest/api/azure/devops/wit/work-items/get-work-item)

## Repository Structure

```text
.
├── .github/
│   ├── agents/
│   ├── instructions/
│   ├── prompts/
│   ├── skills/
│   └── copilot-instructions.md
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
  "wikiDocsPath": "User-Stories",
  "testDocsOutputPath": "output/test-docs"
}
```

The Azure Wiki repo path must already exist before generating wiki drafts.

## Main Agent Groups

### GitHub Copilot Custom Agents

Use `.github/agents/` for Salesforce development, Azure Wiki documentation, and Azure DevOps User Story fetch workflows:

- `azure-devops-user-story-fetcher.agent.md`
- `refactor-documentation-agent.md`
- `salesforce-code-review-agent.agent.md`
- `salesforce-developer-agent.agent.md`
- `salesforce-metadata-documentation-agent.md`
- `salesforce-managed-package-mcp-agent.agent.md`
- `salesforce-test-docx-creator.agent.md`
- `salesforce-test-agent.agent.md`
- `salesforce-deployment-agent.agent.md`
- `salesforce-documentation-creator-agent.agent.md`
- `salesforce-user-story-documentation-runner.agent.md`
- `subagents/salesforce-metadata-analysis-agent.md`

Developer and Code Review remain separate on purpose: review should classify risk without editing by default, while development is an implementation workflow.

### Salesforce MCP Managed Package Agent

Use `salesforce-managed-package-mcp-agent.agent.md` when a Salesforce DX project references a managed package or namespace and you need a package-aware analysis.

Use it for:

- finding namespace-prefixed references in local metadata
- checking package dependency risk before deployment
- explaining package objects, fields, Apex, Flow, LWC, and permission references
- documenting installed package evidence from a confirmed non-production org
- preparing safe next checks for package upgrades or missing package dependencies

Salesforce MCP is not enabled by default. Start local-only, then use Salesforce MCP in VS Code only after you configure it yourself with a sandbox/dev org alias. Recommended initial toolsets are `core,orgs,code-analysis`.

Do not use this agent to install or uninstall packages, deploy metadata, retrieve over local files, mutate data, run anonymous Apex, or change permissions.

### Skills And Prompts

Use `.github/skills/` and `.github/prompts/` for all reusable workflow instructions and copy-paste task prompts. Root-level `scripts/`, `templates/`, `docs/`, and `output/` stay outside `.github` because they are executable helpers, Markdown templates, documentation, and generated artifacts.

## How To Use With VS Code And GitHub Copilot

1. Open this repository or copy its files into a Salesforce DX project.
2. Open VS Code and GitHub Copilot Chat.
3. Reference `.github/copilot-instructions.md` and `AGENTS.md`.
4. Choose the smallest matching agent:
   - review: Code Review Agent
   - implementation: Developer Agent
   - tests/CI: Test Agent
   - release: Deployment Agent
   - docs/wiki: Documentation Creator, Refactor Documentation Agent, User Story Documentation Runner, or Azure DevOps User Story Fetcher
   - tester docs: Salesforce Test DOCX Creator
5. Keep repo-specific configuration in `config.json`.

## How To Generate Docs From Azure DevOps User Story ID

Use this when you only know the numeric Azure DevOps Work Item ID.

In GitHub Copilot Chat:

```text
Use Azure DevOps User Story Fetcher.

Work Item ID: 12345

Fetch Description and Acceptance Criteria from Azure DevOps, then generate Azure Wiki documentation draft.
Do not commit or push.
```

The agent should:

1. Fetch the Work Item through Azure DevOps MCP read-only tools.
2. Normalize the Work Item into `input/ado-work-items/12345.json`.
3. Run:

```bash
npm run agent:ado-story-doc -- --ado-work-item-json "input/ado-work-items/12345.json"
```

Expected normalized JSON shape:

```json
{
  "id": 12345,
  "title": "Example title",
  "description": "User Story description",
  "acceptanceCriteria": "Acceptance Criteria",
  "workItemType": "User Story",
  "state": "Active",
  "tags": "salesforce",
  "url": "https://dev.azure.com/<organization>/<project>/_workitems/edit/12345"
}
```

Files under `input/ado-work-items/` are ignored by Git.

Before running the generator, the agent should ask whether there are manual implementation, configuration, deployment, permission, data, or validation steps not visible in Salesforce metadata. If they exist, save them under `input/manual-steps/<work-item-id>.md` and run:

```bash
npm run agent:ado-story-doc -- \
  --ado-work-item-json "input/ado-work-items/12345.json" \
  --manual-steps-file "input/manual-steps/12345.md"
```

If there are no manual steps, reply to the agent with:

```text
NO MANUAL STEPS
```

Manual steps are documented as user-provided delivery context, not as confirmed metadata facts. Files under `input/manual-steps/` are ignored by Git.

## How To Generate User Story Azure Wiki Documentation

After configuring `config.json`, run:

```bash
npm run agent:story-doc -- \
  --story-id "US-000123" \
  --title "Prevent invoice status from changing unexpectedly" \
  --description-file "input/story-description.md" \
  --acceptance-criteria-file "input/acceptance-criteria.md" \
  --manual-steps-file "input/manual-steps/US-000123.md"
```

In GitHub Copilot Chat, use:

```text
Use Salesforce User Story Documentation Runner.

User Story ID: US-000123
Title: Prevent invoice status from changing unexpectedly
Description file: input/story-description.md
Acceptance Criteria file: input/acceptance-criteria.md
Manual steps file: input/manual-steps/US-000123.md

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
  --acceptance-criteria-file "input/acceptance-criteria.md" \
  --manual-steps "Assign the target permission set group after deployment and complete a sandbox smoke test."
```

Or pass paths directly:

```bash
node scripts/generate-user-story-doc.js \
  --story-id "US-000123" \
  --title "Prevent invoice status from changing unexpectedly" \
  --description-file "input/story-description.md" \
  --acceptance-criteria-file "input/acceptance-criteria.md" \
  --manual-steps-file "input/manual-steps/US-000123.md" \
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

Publishing requires explicit approval and should follow `.github/skills/git-wiki-publish.md`.

## How To Generate HOW_TO_TEST DOCX For Testers

Use this when testers need a Word document generated from User Story Description and Acceptance Criteria.

From Azure DevOps JSON:

```bash
npm run agent:how-to-test -- --ado-work-item-json "input/ado-work-items/12345.json"
```

From local inputs:

```bash
npm run agent:how-to-test -- \
  --story-id "US-000123" \
  --title "Prevent invoice status from changing unexpectedly" \
  --description-file "input/story-description.md" \
  --acceptance-criteria-file "input/acceptance-criteria.md"
```

The output file is written to:

```text
output/test-docs/HOW_TO_TEST_US-000123.docx
```

The DOCX includes User Story reference, business summary, Acceptance Criteria, preconditions, test cases per AC, negative and regression checklist, manual validation checklist, risks/open questions, and tester sign-off placeholders.

In GitHub Copilot Chat:

```text
Use Salesforce Test DOCX Creator.

User Story ID: US-000123
Title: Prevent invoice status from changing unexpectedly
Description file: input/story-description.md
Acceptance Criteria file: input/acceptance-criteria.md

Generate HOW_TO_TEST DOCX for testers.
Do not commit or push.
```

## Scripts

```bash
npm run scan
npm run generate
npm run agent:how-to-test -- --help
npm run agent:story-doc -- --help
npm run agent:ado-story-doc -- --help
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
