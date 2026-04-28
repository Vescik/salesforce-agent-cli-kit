# Codex Spec: Create Salesforce Agent CLI Kit Repository

## Goal

Create a new GitHub repository containing reusable Salesforce DX agent artifacts:

- `AGENTS.md`
- Salesforce CLI automation skill
- Salesforce CLI implementer agent
- repository-wide Salesforce instructions
- Salesforce CLI command documentation
- bootstrap script

The repository should be created in the connected GitHub account.

Recommended repository name:

```text
salesforce-agent-cli-kit
```

Recommended visibility:

```text
private
```

---

## Required Repository Structure

Create this structure:

```text
salesforce-agent-cli-kit/
├─ README.md
├─ AGENTS.md
├─ .github/
│  ├─ agents/
│  │  └─ salesforce-cli-implementer.agent.md
│  ├─ instructions/
│  │  └─ salesforce-project.instructions.md
│  └─ skills/
│     └─ salesforce-cli-automation/
│        └─ SKILL.md
├─ docs/
│  ├─ salesforce-cli-commands.md
│  └─ codex-create-repo-and-artifacts-spec.md
└─ scripts/
   └─ bootstrap-github-repo.sh
```

---

## Requirements

1. Create a new GitHub repository named `salesforce-agent-cli-kit`.
2. Make it private unless the user explicitly asks for public.
3. Initialize it with a `main` branch.
4. Create all files listed above.
5. Commit everything with:

```text
Initial Salesforce agent CLI kit
```

6. Do not include secrets.
7. Do not include org aliases, tokens, credentials, usernames, passwords, or project-specific customer data.
8. Do not deploy anything to Salesforce.
9. Do not run destructive commands.

---

## Content Requirements

### `AGENTS.md`

Create top-level agent rules:

- inspect repo before editing
- prefer minimal safe changes
- do not deploy to production unless explicitly requested
- do not run destructive commands unless explicitly requested
- use CLI to verify facts
- preserve existing architecture
- list safe commands and dangerous commands
- define final response format

### `.github/skills/salesforce-cli-automation/SKILL.md`

Create a reusable skill that covers:

- Salesforce DX inspection
- Flow metadata inspection
- Apex inspection
- LWC inspection
- deployment validation
- CLI command execution policy
- command safety classification
- rules for editing metadata
- decision guide for Formula Field, Validation Rule, Flow, Scheduled Flow, Platform Event, Apex

The skill must explicitly allow safe read-only CLI commands like:

```bash
pwd
ls
find
grep
git status
git diff
cat sfdx-project.json
sf org list
```

The skill must explicitly prevent destructive commands unless requested:

```bash
sf project deploy start
rm -rf
git reset --hard
git clean -fd
sf org delete scratch
```

### `.github/agents/salesforce-cli-implementer.agent.md`

Create an agent profile with frontmatter:

```yaml
---
name: Salesforce CLI Implementer
description: Inspects, modifies, and validates Salesforce DX projects using CLI commands.
tools: ['codebase', 'search', 'editFiles', 'terminal']
---
```

The agent should:

- use the Salesforce CLI Automation Skill
- inspect repository first
- run safe read-only commands automatically
- validate changes where possible
- avoid production deploys
- avoid destructive commands
- provide final summary with files changed, commands run, validation, notes

### `.github/instructions/salesforce-project.instructions.md`

Create repository-wide instructions for:

- Salesforce Flow
- Apex
- LWC
- validation
- response format

### `docs/salesforce-cli-commands.md`

Create copy-paste-ready command groups for:

- repository inspection
- Salesforce DX inspection
- metadata discovery
- Flow inspection
- Apex inspection
- LWC inspection
- manifest generation
- deployment validation
- Apex test execution
- SOQL queries
- dangerous commands to avoid

### `scripts/bootstrap-github-repo.sh`

Create executable helper script:

```bash
#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-salesforce-agent-cli-kit}"
VISIBILITY="${2:-private}"
OWNER="${3:-}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI is required: https://cli.github.com/"
  exit 1
fi

if [ ! -d .git ]; then
  git init
fi

git add .
git commit -m "Initial Salesforce agent CLI kit" || true

if [ -n "$OWNER" ]; then
  gh repo create "$OWNER/$REPO_NAME" "--$VISIBILITY" --source=. --remote=origin --push
else
  gh repo create "$REPO_NAME" "--$VISIBILITY" --source=. --remote=origin --push
fi
```

---

## Suggested Codex Workflow

1. Check GitHub connection.
2. Create repository.
3. Create local file tree.
4. Write all required files.
5. Commit changes.
6. Push to GitHub.
7. Return repository URL and file list.

---

## Validation

After creating the repo, run:

```bash
git status --short
find . -maxdepth 4 -type f | sort
```

If GitHub CLI is available:

```bash
gh repo view --web
```

Do not run Salesforce deployment commands for this repository because this repository is documentation/instructions only.

---

## Final Response Format

Return:

```md
## Repository

URL:

## Files created

- ...

## Commands run

- ...

## Validation

...

## Notes

...
```
