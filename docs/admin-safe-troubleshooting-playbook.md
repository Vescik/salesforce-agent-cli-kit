# Admin Safe Troubleshooting Playbook

## Field is not visible

## Symptoms
The user cannot see a field on a record page, layout, report, or related component.
## Likely causes
Field-level security, page layout, Lightning page Dynamic Forms, record type, component visibility, or managed package behavior.
## Safe checks
Check field-level security, assigned page layout, Lightning page visibility, app/profile/record type activation, and whether the field is on the relevant layout.
## Evidence to collect
User, profile, permission sets, object, field, record type, app, screenshot.
## What not to change yet
Do not add the field everywhere or change permissions broadly.
## When to escalate
Escalate if visibility depends on custom LWC, Apex, managed package logic, or complex permission design.

## Field is read-only

## Symptoms
The field is visible but cannot be edited.
## Likely causes
Field-level security, page layout read-only setting, record lock, approval process, formula field, roll-up field, system field, or automation.
## Safe checks
Check whether the field is editable by design, page layout field properties, permission sets, approval lock status, and record type.
## Evidence to collect
User, record, field, page layout, error message, whether other users can edit.
## What not to change yet
Do not grant broad edit access without confirming business rules.
## When to escalate
Escalate if Apex, managed packages, or integrations control editability.

## Button is missing

## Symptoms
A button or action appears for one user or record but not another.
## Likely causes
Page layout assignment, Dynamic Actions, Lightning page visibility, profile/action permissions, record type, object permissions, or custom permission.
## Safe checks
Check page layout buttons/actions, Lightning Dynamic Actions, app/profile/record type activation, and user permissions.
## Evidence to collect
Button name, user, profile, record type, app, screenshots from users who can and cannot see it.
## What not to change yet
Do not move actions globally without checking record types and processes.
## When to escalate
Escalate if the action is custom LWC, quick action with Apex, or managed package functionality.

## Record status changed unexpectedly

## Symptoms
A status or other field changed without the user expecting it.
## Likely causes
Flow, workflow rule, Process Builder, approval process, Apex trigger, integration user, assignment rule, escalation rule, or manual user update.
## Safe checks
Check Field History Tracking, Last Modified By, Setup Audit Trail, Flow Trigger Explorer, approval history, and local metadata references.
## Evidence to collect
Record ID, field name, old value, new value, timestamp, user, automation user, screenshots.
## What not to change yet
Do not disable automation or edit the field.
## When to escalate
Escalate if Apex triggers, integrations, or multiple automations may be involved.

## Flow error appeared

## Symptoms
A user sees a Flow error or receives a Flow error email.
## Likely causes
Missing required field, permission issue, failed update, missing related record, unhandled fault path, invalid entry criteria, or Apex action failure.
## Safe checks
Check Flow error email, Flow name, affected record, user permissions, recent changes, and whether fault paths exist.
## Evidence to collect
Full error text, Flow name, user, record, time, screenshot.
## What not to change yet
Do not deactivate or edit the Flow as the first step.
## When to escalate
Escalate if the Flow has Apex actions, complex updates, or no clear admin fix.

## User cannot access record

## Symptoms
The user cannot open, edit, or see a record.
## Likely causes
Org-wide defaults, role hierarchy, sharing rules, manual sharing, teams, queues, territory rules, ownership, or object permissions.
## Safe checks
Check object permissions, record owner, sharing button if available, role, groups, queues, and sharing settings.
## Evidence to collect
User, record ID, object, owner, error message, expected access.
## What not to change yet
Do not change org-wide defaults or broad sharing rules without review.
## When to escalate
Escalate if sharing model changes or Apex managed sharing may be needed.

## Report numbers look wrong

## Symptoms
A report or dashboard shows unexpected totals.
## Likely causes
Filters, cross filters, report type, date range, running user, folder access, sharing, stale dashboard refresh, or data quality.
## Safe checks
Check report filters, report type, running user, dashboard refresh time, folder sharing, and sample records.
## Evidence to collect
Report/dashboard name, expected number, actual number, filters, user, screenshot.
## What not to change yet
Do not change filters or dashboard running user without report owner review.
## When to escalate
Escalate if data model, sharing, or custom report type changes are needed.

## Related list is empty

## Symptoms
A related list shows no records or fewer records than expected.
## Likely causes
Relationship field value, sharing, related list filter, page layout, Lightning page component settings, record type, or data quality.
## Safe checks
Check whether child records are linked to the parent, user access, related list component settings, and page layout.
## Evidence to collect
Parent record, expected child record, relationship field, user, screenshot.
## What not to change yet
Do not mass update relationship fields without data review.
## When to escalate
Escalate if automation or integration should create/link records.

## Lookup search returns no records

## Symptoms
Lookup search does not show expected records.
## Likely causes
Search layout, lookup filter, sharing, record type, inactive records, search indexing, or user permissions.
## Safe checks
Check lookup filters, object access, record access, search layout, and whether the target record exists and is searchable.
## Evidence to collect
Lookup field, search term, expected record, user, screenshot.
## What not to change yet
Do not remove lookup filters without understanding business rules.
## When to escalate
Escalate if lookup behavior depends on custom UI or Apex.

## Validation rule blocks save

## Symptoms
A user cannot save because a validation error appears.
## Likely causes
Validation formula is true, missing required fields, status transition rule, record type condition, profile/user condition, or business compliance rule.
## Safe checks
Read the error message, identify fields involved, check record values, compare with a record that saves successfully.
## Evidence to collect
Error message, record values, user, record type, expected process.
## What not to change yet
Do not disable the rule or bypass controls without approval.
## When to escalate
Escalate if the rule conflicts with a valid business process or references complex formula logic.
