# Salesforce Admin Read-Only Explanation

## Purpose

Explain Salesforce configuration and behavior for a non-developer admin without changing anything.

## When to use

Use when an admin asks what a feature, setting, field, object, automation, page, report, or access behavior means.

## Inputs

- Admin question
- Object, field, Flow, page, report, or permission name if known
- Local metadata snippets if available
- Screenshots or observed behavior if available

## Read-only workflow

1. Restate the question in simple terms.
2. Inspect only local files or provided context.
3. Explain what the Salesforce feature probably does.
4. List safe checks the admin can do in Setup.
5. Identify risks and what to ask a developer.

## Allowed inspection methods

Local `find`, `grep`, `cat`, `sed`, `head`, `tail`, and reading provided metadata. Salesforce CLI examples may be suggested but not run unless explicitly approved for a non-production org.

## Forbidden actions

Do not change org data, metadata, code, permissions, reports, dashboards, automations, repository history, branches, commits, pushes, or pull requests.

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
## Short explanation
## What it does
## Where to check in Setup
## Safe checks
## Risks
## Questions for a developer
```

## Examples

- Explain why a field is read-only.
- Explain what a custom object is used for.
- Explain why a button appears for one user but not another.

## Escalation guidance

Escalate to a developer when Apex, integrations, managed packages, or metadata changes may be required.
