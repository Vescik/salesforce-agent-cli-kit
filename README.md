# Salesforce Agent CLI Kit

## What this repo is

A reusable Salesforce AI Agent Toolkit for Salesforce DX repositories. It packages global agent rules, GitHub Copilot instructions, custom agents, reusable skills, standalone prompts, research notes, and safe helper scripts for Salesforce review, creation, and validation workflows.

The kit is intentionally generic. It does not contain org aliases, credentials, customer names, object-specific assumptions, or deployment targets.

## Creator

Created by Dominik Machowski.

## Who it is for

- Salesforce developers reviewing Apex, Flow, LWC, metadata, and permissions.
- Technical architects standardizing agent-assisted Salesforce delivery.
- Teams using VS Code, GitHub Copilot, or CLI-based agents on Salesforce DX projects.
- Release owners who need repeatable validate-only deployment workflows.

## How to use with GitHub Copilot

Copy this repository's `.github` folder into a Salesforce DX repository, or keep this repo as a reference library and copy only the agents, skills, prompts, and instructions you need.

Recommended Copilot layers:

- `.github/copilot-instructions.md` for repository-wide Salesforce guidance.
- `.github/instructions/*.instructions.md` for focused always-on rules.
- `.github/agents/*.agent.md` for specialist custom agents.
- `.github/skills/*/SKILL.md` for reusable workflows.
- `.github/prompts/*.prompt.md` for copy-paste-ready task templates.

## How to use with VS Code and GitHub Copilot

Use this repository as a reusable instruction, agent, skill, and prompt library for Salesforce work in VS Code.

1. Open your Salesforce DX project in VS Code.
2. Use GitHub Copilot Chat or a GitHub Copilot coding agent with the relevant files from this kit.
3. Start tasks by inspecting the target Salesforce DX repo.
4. Classify commands by safety before suggesting or running them.
5. Select the relevant skill from `.github/skills` or prompt from `.github/prompts`.

## How to use agents

Use the smallest agent role that fits the task:

- `salesforce-code-review-agent.agent.md` for Apex, Flow, LWC, metadata, permissions, security, dependency, and deployment-risk review.
- `salesforce-developer-agent.agent.md` for implementation across Apex, Flow metadata, LWC, metadata XML, scripts, and docs.
- `salesforce-test-agent.agent.md` for Apex tests, LWC tests, lint, scanner, CI checks, and validation evidence.
- `salesforce-deployment-agent.agent.md` for package scope, validate-only planning, release notes, rollback notes, and deployment checklists.
- `salesforce-documentation-creator-agent.agent.md` for Azure Wiki pages, user story context, metadata summaries, release notes, and handoff documentation.

Developer and Code Review remain separate on purpose: review should classify risk without editing by default, while development is an implementation workflow.

## Salesforce Admin Read-Only Agents

The admin read-only agents, skills, prompts, and docs were moved to a dedicated repository:

`https://github.com/Vescik/salesforce-admin-readonly-agents`

Keep this repository focused on developer-oriented Salesforce review, implementation, validation, and metadata documentation workflows.

## How to use skills

Skills are reusable workflows. Start with `salesforce-cli-automation` for general inspection, then use focused skills such as `salesforce-apex-review`, `salesforce-flow-review`, `salesforce-lwc-review`, `salesforce-permission-security-review`, `salesforce-deployment-validation`, `salesforce-metadata-discovery`, `salesforce-code-creation`, or `salesforce-debugging`.

## How to use prompts

Prompts in `.github/prompts` are standalone. Paste one into Codex, GitHub Copilot Chat, or another agent tool in the target Salesforce DX repo. Each prompt includes task, context to inspect, required workflow, safe commands, constraints, and expected output.

## Recommended workflow

1. Inspect repository structure and `sfdx-project.json`.
2. Identify package directories and changed metadata.
3. Select a specialized agent or prompt.
4. Run safe read-only commands first.
5. Make the smallest useful change if implementation is requested.
6. Run tests, lint, scanner, or validate-only deployment only when appropriate.
7. Report commands run, validation status, and remaining risks.

## Safety rules

- No secrets, org aliases, customer data, usernames, or hardcoded org URLs.
- No production deployment unless explicitly requested.
- No destructive commands unless explicitly requested.
- Always distinguish safe read-only commands, validation/dry-run commands, and dangerous commands.
- Never claim validation passed unless it actually ran.

## Example tasks

- "Review this Salesforce Flow for bulk safety and recursion risk."
- "Create an Apex service class and test class for this requirement."
- "Inspect the project and generate a package.xml for modified metadata."
- "Review all automations touching Invoice__c.Status__c."
- "Validate deployment without deploying to production."

## Documentation

- `docs/agent-usage-guide.md`
- `docs/prompt-library-guide.md`
- `docs/salesforce-review-playbook.md`
- `docs/salesforce-cli-commands.md`
- `docs/research/*.md`
