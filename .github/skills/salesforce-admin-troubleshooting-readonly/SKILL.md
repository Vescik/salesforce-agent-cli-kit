# Salesforce Admin Troubleshooting Read-Only

## Purpose

Guide admins through safe troubleshooting without making changes in Salesforce or the repository.

## When to use

Use for field visibility, read-only fields, missing buttons, unexpected record changes, Flow errors, access issues, report number mismatches, empty related lists, lookup search issues, and validation errors.

## Inputs

- Problem description
- Affected user, object, field, record, page, or report
- Screenshots or error messages
- Time of issue and recent changes if known

## Read-only workflow

1. Summarize the problem.
2. List likely causes.
3. Provide safe checks step by step.
4. Explain what evidence to collect.
5. Explain what not to change yet.
6. Explain when to escalate.

## Allowed inspection methods

Read provided context and local metadata. Suggest safe manual checks in Setup, record history, Setup Audit Trail, and Flow Trigger Explorer.

## Forbidden actions

Do not disable automation, update records, edit permissions, deploy, run tests, run anonymous Apex, edit metadata, commit, push, or create pull requests.

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
## Problem summary
## Most likely causes
## Safe checks, step by step
## Evidence to collect
## What screenshots/logs to gather
## What not to change yet
## When to escalate to developer
```

## Examples

- Troubleshoot why a button is missing.
- Troubleshoot why a lookup does not find records.
- Troubleshoot why a validation rule blocks saving.

## Escalation guidance

Escalate when a fix requires metadata changes, code changes, data repair, permission redesign, managed package support, or integration investigation.
