# Skill: Markdown Quality Review

Use this skill before saving final documentation.

## Review Checklist

Review the generated Markdown for:

1. Clear heading structure
2. Correct Markdown tables
3. No broken internal links where possible
4. No placeholder text left unintentionally
5. No secrets or sensitive data
6. No unsupported claims
7. Clear distinction between facts, assumptions, and open questions
8. Consistent naming of Salesforce components
9. Correct User Story ID and title
10. Usability for Azure Wiki

## Required Behavior

- Return issues found.
- Fix issues before presenting the document to the user.
- Do not remove uncertainty by guessing.
- Keep assumptions clearly labeled.
- Keep open questions visible.

## Common Fixes

- Replace vague claims with `Requires confirmation:`.
- Repair malformed table rows.
- Remove unsupported technical claims.
- Ensure every Acceptance Criterion appears in the coverage table.
- Ensure no secrets, tokens, org IDs, usernames, private URLs, or credentials appear in the document.
