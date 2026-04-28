---
description: Review a Lightning Web Component for quality, security, and UX risks.
---

# Task

Review the requested LWC.

# Context to inspect

- `pwd` and repository file tree.
- `git status --short` and relevant diffs.
- `sfdx-project.json` package directories.
- Related Apex, Flow, LWC, object, field, permission, and manifest metadata.

# Required workflow

1. Inspect repository structure.
2. Locate relevant Salesforce DX metadata.
3. Inspect JS, HTML, metadata, Apex imports, error handling, loading states, accessibility, and exposure configuration.
4. Suggest minimal safe changes.
5. Do not edit files unless explicitly requested.
6. Do not deploy to production.
7. Report every command run.

# Commands to run

Safe commands first:

```bash
pwd
ls -la
find . -maxdepth 4 -type f | sort
git status --short
cat sfdx-project.json
sf org list
```

Use focused searches as needed:

```bash
find . -type f -name "*.flow-meta.xml" | sort
find force-app -type f \( -name "*.cls" -o -name "*.trigger" -o -name "*.js" -o -name "*.permissionset-meta.xml" \) | sort
grep -R "TargetObjectOrField__c" force-app/main/default -n || true
```

Validation commands only when appropriate:

```bash
npm test
npm run lint
sf scanner run
sf apex run test
sf project deploy validate --source-dir force-app/main/default --test-level NoTestRun
```

# Constraints

- Do not run destructive commands.
- Do not run real deployments.
- Do not assume org aliases, object names, usernames, credentials, or company-specific data.
- Do not claim validation passed unless it actually ran.

# Expected output

```md
## Summary
## Findings / changes
## Commands run
## Validation
## Risks / assumptions
## Next steps
```

