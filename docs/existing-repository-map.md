# Existing Repository Map

## Existing repository map

Initial repository contents before this expansion:

- `AGENTS.md`: root safety and operating policy.
- `README.md`: short scaffold overview.
- `.github/agents/`: Salesforce-focused agent profiles imported from `awesome-copilot` plus a local CLI implementer.
- `.github/instructions/salesforce-project.instructions.md`: repository-wide Salesforce instructions.
- `.github/skills/salesforce-cli-automation/SKILL.md`: CLI-oriented Salesforce automation skill.
- `docs/codex-create-repo-and-artifacts-spec.md`: original creation spec.
- `docs/salesforce-cli-commands.md`: Salesforce CLI command reference groups.
- `scripts/bootstrap-github-repo.sh`: repository bootstrap helper.

## Current strengths

- Clear safety stance: no production deploys or destructive commands by default.
- Existing Salesforce CLI skill already classifies safe, validation, and dangerous commands.
- Existing command docs are copy-paste-ready.
- Repository already uses the correct `.github/agents`, `.github/instructions`, and `.github/skills` patterns.

## Missing capabilities

- No prompt library for repeatable Codex/Copilot/CLI workflows.
- No research docs explaining the chosen structure.
- No specialized skills for Apex, Flow, LWC, security, deployment validation, metadata discovery, code creation, and debugging.
- Broad imported Salesforce agents overlapped and were less aligned with the requested final architecture.
- No safe inspection or validate-only helper scripts.

## Proposed file additions

- `.github/copilot-instructions.md`
- `.github/instructions/salesforce-code-review.instructions.md`
- `.github/instructions/salesforce-security.instructions.md`
- `.github/instructions/salesforce-cli-safety.instructions.md`
- Focused `.github/agents/salesforce-*.agent.md` profiles for reviewer, Apex, Flow, LWC, security, release validation, CLI, and research.
- Reusable `.github/skills/salesforce-*/SKILL.md` workflows.
- Standalone `.github/prompts/*.prompt.md` templates.
- `docs/research/*.md`, `docs/agent-usage-guide.md`, `docs/prompt-library-guide.md`, and `docs/salesforce-review-playbook.md`.
- `scripts/inspect-salesforce-project.sh` and `scripts/validate-salesforce-project.sh`.

## Architecture decision

The older broad Salesforce agents were replaced by the focused target agent set from the spec. This avoids duplicate roles and makes handoffs clearer while preserving the original local CLI implementer role as a first-class focused agent.

