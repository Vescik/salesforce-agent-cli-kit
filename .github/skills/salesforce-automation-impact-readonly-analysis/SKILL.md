# Salesforce Automation Impact Read-Only Analysis

## Purpose

Help admins understand which automations may affect records or fields without disabling or editing automation.

## When to use

Use when a field changes unexpectedly, a record status moves, an approval starts, an email sends, or a record is assigned automatically.

## Inputs

- Object and field name
- Record example
- Time of change
- User or automation user involved
- Local metadata if available

## Read-only workflow

1. Identify the field or process.
2. Search local metadata if available.
3. Explain possible automation sources: Flow, validation rule, workflow, Process Builder, approval, Apex trigger, assignment rule, escalation rule, duplicate rule, matching rule, email alert, field update.
4. Explain order-of-execution at a high level.
5. Recommend evidence to collect and safe Setup checks.

## Allowed inspection methods

Read local metadata and suggest safe checks such as Field History Tracking, Setup Audit Trail, Flow Trigger Explorer, and record history.

## Forbidden actions

Do not disable automation, edit Flow, edit rules, run tests, deploy, modify records, run anonymous Apex, commit, push, or create pull requests.

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
## Field or process being investigated
## Automations that may be involved
## How each automation may affect the record
## Evidence to collect
## Safe checks in Setup
## Developer escalation points
## Risk of changing this automation
```

## Examples

- Investigate what may change `Invoice__c.Status__c`.
- Explain why an approval process may update a field.
- Explain why an assignment rule may reassign a case.

## Escalation guidance

Escalate when Apex triggers, integrations, managed packages, or broad automation changes are involved.
