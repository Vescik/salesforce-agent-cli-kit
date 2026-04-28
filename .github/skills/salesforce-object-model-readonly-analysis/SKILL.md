# Salesforce Object Model Read-Only Analysis

## Purpose

Explain object and field relationships for admins without changing schema or metadata.

## When to use

Use for questions about objects, fields, lookup relationships, master-detail relationships, junction objects, roll-up summaries, formula fields, record types, related lists, and reporting impact.

## Inputs

- Object or field API name
- Business process description
- Local object metadata if available

## Read-only workflow

1. Identify standard vs custom object.
2. Explain important fields.
3. Explain relationships and related lists.
4. Identify automations, validation rules, layouts, and reports that may depend on it.
5. Explain risks before changing or deleting fields.

## Allowed inspection methods

Read local object, field, layout, Flow, and validation metadata. Suggest non-executed searches and Setup checks.

## Forbidden actions

Do not create, delete, rename, or edit objects, fields, relationships, record types, layouts, pages, or records.

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
## Object summary
## Important fields
## Relationships
## Related automations
## Related layouts/pages
## Reporting impact
## Risks before changing
## Safe admin checks
```

## Examples

- Explain what a junction object does.
- Explain the impact of changing a lookup field.
- Explain why a related list is empty.

## Escalation guidance

Escalate when schema changes may affect integrations, Apex, reports, automations, or managed packages.
