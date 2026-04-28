---
description: Turn Salesforce admin observations into a clear developer escalation summary.
---

# Task

Prepare a clean developer escalation summary from admin observations.

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

Use the admin's issue description, screenshots, record examples, error messages, safe Setup checks already completed, and available local metadata.

# Read-only workflow

1. Clarify the issue in business language.
2. Identify object, field, record, user, and process context.
3. Separate expected behavior from actual behavior.
4. Identify evidence still needed.
5. Identify likely metadata or automation involved.
6. Draft questions for the developer.

# Expected output

```md
## Issue summary
## Business impact
## Object / field / record involved
## Steps to reproduce
## Expected behavior
## Actual behavior
## Screenshots or evidence needed
## Metadata likely involved
## Suspected automation
## Safe checks already completed
## Questions for developer
## Priority suggestion
```
