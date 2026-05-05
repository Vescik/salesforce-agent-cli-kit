# Deployment Notes

## GitHub Deployment Checklist

- [ ] Confirm target repository URL.
- [ ] Confirm target branch.
- [ ] Confirm no unrelated user changes are staged.
- [ ] Run output validation.
- [ ] Commit generated setup.
- [ ] Push only after repository and branch are confirmed.

## Placeholder Commands

```bash
git status
git remote -v
git branch --show-current
git add .
git commit -m "Add Salesforce Copilot metadata documentation agent"
git push origin {{TARGET_BRANCH}}
```

Do not run push commands until `GITHUB_REPOSITORY_URL` and `TARGET_BRANCH` are confirmed.
