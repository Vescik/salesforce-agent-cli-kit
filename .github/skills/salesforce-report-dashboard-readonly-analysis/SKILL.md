# Salesforce Report Dashboard Read-Only Analysis

## Purpose

Explain reports and dashboards without editing report definitions, dashboard settings, running users, or folder sharing.

## When to use

Use when report numbers differ, users see different data, dashboard tiles look wrong, or filters/groupings need explanation.

## Inputs

- Report or dashboard name
- Screenshot or exported definition if available
- User context
- Expected vs actual numbers

## Read-only workflow

1. Identify report type and source reports.
2. Explain filters, cross filters, buckets, groupings, and summaries.
3. Explain running user and folder access.
4. Explain why numbers may differ.
5. Suggest safe checks and evidence to collect.

## Allowed inspection methods

Read local report/dashboard metadata if available and suggest safe Setup/report builder checks without saving changes.

## Forbidden actions

Do not edit reports, dashboards, running users, folders, sharing, records, metadata, commits, pushes, or pull requests.

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
## Report/dashboard summary
## Data source
## Filters
## Groupings and summaries
## Access considerations
## Why numbers may differ
## Safe admin checks
## Questions to ask report owner
```

## Examples

- Explain why dashboard totals differ by user.
- Explain a report filter.
- Explain folder access effects.

## Escalation guidance

Escalate when numbers depend on custom report types, integrations, data quality fixes, or permission redesign.
