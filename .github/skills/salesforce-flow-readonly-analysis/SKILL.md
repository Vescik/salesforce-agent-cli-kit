# Salesforce Flow Read-Only Analysis

## Purpose

Explain Flow behavior, launch conditions, record reads, possible record changes, and risk areas without editing Flow metadata.

## When to use

Use when an admin asks what a Flow does, when it runs, why it changed data, or why a Flow error appeared.

## Inputs

- Flow label or API name
- Flow XML if available locally
- User-visible error or record example
- Object and field names involved

## Read-only workflow

1. Identify Flow type: record-triggered, screen, scheduled, or autolaunched.
2. Explain trigger timing and entry criteria.
3. Summarize decisions, assignments, subflows, and actions.
4. Identify records read and records the Flow may create, update, or delete.
5. Explain risks such as recursion, missing fault paths, or broad criteria.
6. Recommend safe Setup checks and developer questions.

## Allowed inspection methods

Read local Flow XML, search metadata names, and review provided screenshots or errors. Do not run Flow tests or deployment validation.

## Forbidden actions

Do not edit Flow XML, activate/deactivate Flows, run tests, validate deployment, deploy, modify records, or disable automation.

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
## Flow summary
## When it runs
## What it reads
## What it may change
## User-visible effect
## Risk areas
## Safe admin checks
## What to ask a developer
```

## Examples

- Explain an after-save Flow on `Invoice__c`.
- Explain why a Flow may update a status field.
- Explain a Flow error message for a user.

## Escalation guidance

Escalate when the Flow calls Apex, updates related records, has recursion risk, or needs structural changes.
