# Skill: Prepare GitHub Deployment

## Purpose

Prepare generated files for deployment to a GitHub repository.

## Workflow

1. Validate generated documentation.
2. Check Git status.
3. Prepare commit message.
4. Create deployment checklist.
5. Provide safe push instructions.

## Repository Rules

- Do not hardcode repository URL unless provided by the user.
- If `GITHUB_REPOSITORY_URL` is not provided, generate placeholder instructions and do not push.
- If `TARGET_BRANCH` is not provided, detect the current branch and document it.
- If unrelated uncommitted user changes exist, stop and warn before committing.

## Expected Commands

```bash
git status
git add .
git commit -m "Add Salesforce Copilot metadata documentation agent"
git remote -v
git push origin {{TARGET_BRANCH}}
```

If the branch is not `main`, detect the current branch:

```bash
git branch --show-current
```

## Output

Create a deployment checklist in:

`output/azure-wiki/deployment-notes.md`
