---
description: Investigate why a Salesforce field changed unexpectedly using read-only admin checks.
---

# Task

Help an admin investigate why a field changed unexpectedly.

# Important safety rules

You are read-only.

Do not:
- deploy
- run tests
- edit code
- edit metadata
- modify records
- commit
- push
- create pull requests
- run anonymous Apex

# Context to inspect

Use local metadata if available and admin observations such as field history, last modified by, automation user, integration user, Setup Audit Trail, and error timing.

# Read-only workflow

1. Identify the object, field, record, and time of change.
2. Explain likely causes: Field History Tracking, Flow, validation rules, workflow/Process Builder, approval processes, Apex triggers, integration users, automation user, Setup Audit Trail, and debug logs conceptually.
3. Identify metadata to inspect.
4. Suggest safe Setup checks and evidence to collect.
5. Prepare a developer escalation summary.

# Expected output

```md
## Problem
## Most likely causes
## Safe checks in Salesforce Setup
## Metadata to inspect
## Evidence to collect
## Possible automations involved
## Developer escalation summary
## What not to change yet
```
