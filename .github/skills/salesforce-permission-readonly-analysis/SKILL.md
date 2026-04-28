# Salesforce Permission Read-Only Analysis

## Purpose

Explain Salesforce access issues without assigning, removing, or editing permissions.

## When to use

Use when a user cannot see, edit, create, delete, or access an object, field, tab, button, action, record, report, or dashboard.

## Inputs

- User or profile name, if known
- Object, field, tab, action, or record involved
- Error message or screenshot
- Local permission metadata if available

## Read-only workflow

1. Identify what access is missing or unexpectedly present.
2. Explain relevant layers: profile, permission set, permission set group, FLS, object permissions, sharing, record type, page layout, Lightning visibility, custom permission.
3. Suggest safe Setup checks.
4. Explain evidence to collect.
5. List possible root causes and escalation questions.

## Allowed inspection methods

Read local permission metadata and suggest safe Setup navigation. Do not change permissions.

## Forbidden actions

Do not assign permissions, remove permissions, edit profiles, edit permission sets, update sharing, change page assignments, or modify records.

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
## Access issue summary
## Permission layers involved
## Safe checks in Setup
## Evidence to collect
## Possible root causes
## What not to change blindly
## Escalation questions
```

## Examples

- Explain why a field is hidden.
- Explain why a user cannot edit a record.
- Explain why a button appears for one profile.

## Escalation guidance

Escalate when access depends on Apex sharing, custom permissions in code, managed package logic, or role hierarchy redesign.
