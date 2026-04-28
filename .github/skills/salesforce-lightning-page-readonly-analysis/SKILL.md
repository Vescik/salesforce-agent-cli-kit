# Salesforce Lightning Page Read-Only Analysis

## Purpose

Explain Lightning page, Dynamic Forms, Dynamic Actions, and component visibility behavior without editing pages.

## When to use

Use when a field, button, component, related list, or action is visible for one user, app, profile, or record type but not another.

## Inputs

- Object and page name
- User/profile/app/record type context
- Screenshot or observed behavior
- Local Lightning page metadata if available

## Read-only workflow

1. Identify the page and user context.
2. Explain page assignment and activation.
3. Explain component visibility, Dynamic Forms, Dynamic Actions, compact layout, related lists, and mobile differences.
4. Suggest safe checks in Lightning App Builder and Setup.

## Allowed inspection methods

Read local Lightning page metadata and suggest safe Setup checks. Do not save or activate pages.

## Forbidden actions

Do not edit pages, layouts, actions, visibility rules, assignments, metadata, records, commits, pushes, or pull requests.

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
## Page behavior summary
## Components involved
## Visibility rules
## User/profile/record type impact
## Why something may be visible or hidden
## Safe admin checks
## What not to change without review
```

## Examples

- Explain why a related list is missing.
- Explain why a button appears only on one record type.
- Explain Dynamic Forms visibility.

## Escalation guidance

Escalate if the visibility depends on custom LWC logic, Apex, managed packages, or complex permissions.
