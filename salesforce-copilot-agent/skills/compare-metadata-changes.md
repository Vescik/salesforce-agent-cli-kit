# Skill: Compare Metadata Changes

## Purpose

Compare the current Salesforce metadata state with Git changes.

## Git Commands

Use safe Git inspection where possible:

```bash
git status
git diff
git diff --name-only
```

## Identify

- Added files
- Modified files
- Deleted files
- Renamed files
- Affected metadata types
- Potential deployment risks
- Test impact
- Documentation impact

## Output

Save the change summary to:

`output/metadata-analysis/change-summary.md`

## Safety

Do not stage, commit, reset, clean, delete, or overwrite files while comparing metadata changes.
