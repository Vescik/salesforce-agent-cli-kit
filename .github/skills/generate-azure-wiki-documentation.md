# Skill: Generate Azure Wiki Documentation

## Purpose

Generate documentation ready to be pasted into Azure Wiki or committed to an Azure Wiki Git repository.

## Required Page Structure

Each generated page must include:

# Title

## 1. Business Context

## 2. Scope of Change

## 3. Metadata Components

## 4. Component Details

## 5. Process / Automation Logic

## 6. Security and Permissions

## 7. Dependencies

## 8. Risks and Assumptions

## 9. Testing Scenarios

## 10. Deployment Notes

## 11. Manual Implementation / Configuration Steps

Include only user-provided manual steps. If none were provided, state that confirmation is required before publishing.

## 12. Rollback Notes

## 13. Change Log

## Rules

- Be concise but complete.
- Do not use generic filler text.
- Use `Assumption: ...` when inferring from incomplete context.
- Use `Requires confirmation: ...` when the source metadata does not prove the purpose.
- Do not invent manual steps. Only rewrite, organize, and clearly label user-provided manual steps.
- Do not include secrets, org IDs, tokens, usernames, or private URLs.

## Output

Save generated pages to:

- `output/azure-wiki/solution-documentation.md`
- `output/azure-wiki/deployment-notes.md`
- `output/azure-wiki/rollback-notes.md`
