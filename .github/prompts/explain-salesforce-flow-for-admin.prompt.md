---
description: Explain a Salesforce Flow in plain language for a non-developer admin.
---

# Task

Explain the selected Salesforce Flow in admin-friendly language.

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

Inspect local Flow metadata if available:

```bash
find . -type f -name "*.flow-meta.xml" | sort
grep -R "<label>" force-app/main/default/flows -n || true
```

# Read-only workflow

1. Identify Flow type.
2. Identify object.
3. Identify trigger timing.
4. Explain entry criteria.
5. Explain main decisions.
6. Explain records it reads.
7. Explain records it may create/update/delete.
8. Explain user-visible impact.
9. Explain risks.
10. Suggest safe Setup checks.

# Expected output

```md
## Flow summary

## Plain-language explanation

## When it runs

## What data it reads

## What data it may change

## Why it matters for admins

## Safe checks in Setup

## Questions to ask a developer
```
