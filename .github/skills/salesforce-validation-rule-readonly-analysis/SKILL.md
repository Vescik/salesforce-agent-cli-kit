# Salesforce Validation Rule Read-Only Analysis

## Purpose

Explain validation rules in admin-friendly language without editing or disabling them.

## When to use

Use when a save is blocked, an error message appears, or an admin needs to understand a validation formula.

## Inputs

- Validation rule name
- Error message
- Object and fields involved
- Local validation metadata if available

## Read-only workflow

1. Identify the validation rule.
2. Translate the formula into plain language.
3. Explain when it blocks saving.
4. List fields and users that may be affected.
5. Explain safe checks and risks of changing or disabling it.

## Allowed inspection methods

Read local object metadata and validation formulas. Suggest safe Setup checks only.

## Forbidden actions

Do not edit validation rules, deactivate rules, modify records, bypass security controls, deploy, run tests, commit, push, or create pull requests.

## Safety rules

This skill is read-only.

The assistant must not:

- deploy
- run tests
- edit code
- edit metadata
- edit repository files outside documentation tasks
- modify Salesforce records
- update permissions
- run anonymous Apex
- run data import/update/delete commands
- create commits
- create pull requests
- push branches

The assistant may only explain, analyze, summarize, document, and recommend safe manual checks.

## Output format

```md
## Validation rule summary
## Plain-language meaning
## When it blocks saving
## Fields involved
## Example scenario
## Safe admin checks
## Risks of changing/disabling
## Developer/admin questions
```

## Examples

- Explain a validation formula.
- Explain why users cannot save a record.
- Explain risks of disabling a rule.

## Escalation guidance

Escalate when a rule is tied to compliance, integrations, Apex, or cross-object business logic.
