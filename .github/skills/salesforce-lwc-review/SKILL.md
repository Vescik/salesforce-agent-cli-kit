# Salesforce LWC Review

## Purpose

Review Lightning Web Components for data access, Apex calls, state handling, errors, accessibility, and metadata exposure.

## When to use

Use this skill when a Salesforce DX task needs repeatable CLI-oriented inspection, review, implementation, or validation in this domain.

## Inputs

- User request and target metadata, if known.
- Salesforce DX project root.
- Any supplied org alias or validation target.
- Whether edits are requested or the task is review-only.

## Workflow

1. Inspect repository structure and `git status --short`.
2. Read `sfdx-project.json` before assuming package directories.
3. Locate relevant metadata with safe commands.
4. Read focused files, not the entire repo by default.
5. Apply the checklist below.
6. Make minimal changes only if requested.
7. Run validation/dry-run commands only when appropriate.
8. Report commands run and validation status.

## Commands

Safe read-only examples:

```bash
find force-app/main/default/lwc -maxdepth 3 -type f | sort
grep -R "@salesforce/apex\|@wire\|getRecord\|updateRecord\|createRecord\|deleteRecord" force-app/main/default/lwc -n || true
npm run lint
```

Validation / dry-run examples:

```bash
npm test
npm run lint
sf scanner run
sf apex run test
sf project deploy validate --source-dir force-app/main/default --test-level NoTestRun
sf project deploy start --dry-run --source-dir force-app/main/default
```

Dangerous commands requiring explicit approval:

```bash
sf project deploy start
sf project retrieve start
sf org delete scratch
git reset --hard
git clean -fd
rm -rf
```

## Review checklist

- Confirm package directory and metadata type.
- Check hardcoded IDs, org-specific values, and secrets.
- Check bulk safety and governor-limit risk.
- Check CRUD/FLS and sharing where data is exposed.
- Check tests, lint, scanner, or validate-only options.
- Check deployment dependencies and rollback notes.

## Output format

```md
## Summary
## Findings / changes
## Commands run
## Validation
## Risks / assumptions
## Next steps
```

## Safety rules

Do not deploy to production. Do not delete files, clean Git state, reset branches, delete orgs, or overwrite local metadata unless the user explicitly approves the exact action.

## Examples

- Review metadata for bulk safety and security risks.
- Identify commands needed to validate a change without deployment.
- Suggest minimal refactors that preserve existing architecture.

