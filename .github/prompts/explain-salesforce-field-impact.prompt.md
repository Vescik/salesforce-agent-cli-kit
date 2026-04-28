---
description: Explain where a Salesforce field may be used and what risk exists before changing it.
---

# Task

Explain the likely impact of changing, hiding, deleting, renaming, or repurposing a Salesforce field.

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

Inspect local metadata references if available. Suggest searches, but do not change files.

# Read-only workflow

1. Identify the object and field.
2. Explain likely dependencies: layouts, Lightning pages, reports, Flow, validation rules, formulas, permissions, integrations, and Apex.
3. Explain safe checks in Setup.
4. Explain what evidence to collect.
5. Prepare developer questions if a change is needed.

# Expected output

```md
## Field summary
## Where it may be used
## What may break
## Safe admin checks
## Evidence to collect
## Developer questions
## What not to change yet
```
