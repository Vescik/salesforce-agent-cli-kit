# Skill: Azure Wiki Documentation

Use this skill to generate Markdown documentation for Azure DevOps Wiki.

## Audience

The documentation must be readable by:

- Developers
- Salesforce admins
- Architects
- Testers
- Business analysts

## Required Content

The documentation must include:

1. User Story reference
2. Business context
3. Acceptance Criteria summary
4. Component and artifact list
5. Technical implementation description
6. Metadata behavior analysis
7. Acceptance Criteria coverage mapping
8. Data model impact
9. Automation impact
10. Security and permission impact
11. UI impact
12. Testing notes
13. Deployment notes
14. Manual implementation/configuration steps, when user-provided
15. Risks, assumptions, and open questions
16. Review checklist
17. Change log

## Rules

- Use Markdown tables where helpful.
- Keep language clear and direct.
- Do not expose secrets or internal sensitive values.
- Separate confirmed facts, inferred behavior, assumptions, and open questions.
- Do not infer manual steps from metadata. Label them as user-provided delivery context.
- Do not use Mermaid unless explicitly requested.
- Use Azure DevOps Wiki compatible Markdown.

## Required First Section

The documentation must start with:

```md
# <USER_STORY_ID> - <USER_STORY_TITLE>

## 1. User Story Reference
```
