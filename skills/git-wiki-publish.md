# Skill: Git Wiki Publish

Use this skill only after documentation has been generated and reviewed.

## Rules

1. Never commit without explicit user approval.
2. Never push without explicit user approval.
3. Check Git status before committing.
4. Stage only the generated documentation file unless the user approves more files.
5. Use a clear commit message.
6. Do not force-push.
7. If push fails, explain the issue and suggest next steps.

## Recommended Commit Message Format

```txt
docs(wiki): add documentation for <USER_STORY_ID> <TITLE>
```

## Required Flow

1. Show generated file path.
2. Show Git status.
3. Ask for approval.
4. After approval:

```bash
git add <file>
git commit -m "docs(wiki): add documentation for <USER_STORY_ID> <TITLE>"
git push
```

## Approval Phrase

Use an explicit approval phrase such as:

```txt
APPROVE WIKI PUSH
```

Do not interpret vague approval as permission to push.
