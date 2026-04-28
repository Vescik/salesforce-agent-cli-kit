# Salesforce Agent CLI Kit

Reusable repository scaffold for Salesforce DX projects using Codex, GitHub Copilot agents, custom instructions, and Salesforce CLI automation skills.

## Contents

- `AGENTS.md` — top-level agent rules for Codex/GitHub-style coding agents.
- `.github/skills/salesforce-cli-automation/SKILL.md` — reusable Salesforce CLI automation skill.
- `.github/agents/salesforce-cli-implementer.agent.md` — custom Salesforce CLI agent profile.
- `.github/instructions/salesforce-project.instructions.md` — repository-wide Salesforce instructions.
- `docs/salesforce-cli-commands.md` — copy-paste-ready Salesforce CLI commands.
- `docs/codex-create-repo-and-artifacts-spec.md` — full Codex spec to create the GitHub repo and artifacts.
- `scripts/bootstrap-github-repo.sh` — optional local helper script.

## Recommended repo name

```bash
salesforce-agent-cli-kit
```

## Manual creation fallback

```bash
git init
git add .
git commit -m "Initial Salesforce agent CLI kit"
gh repo create Vescik/salesforce-agent-cli-kit --private --source=. --remote=origin --push
```
