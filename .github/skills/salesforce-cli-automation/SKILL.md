# Salesforce CLI Automation Skill

## Purpose

Use this skill when working with Salesforce DX projects, metadata, Flows, Apex, LWC, permission sets, objects, fields, deployment validation, and repository-level Salesforce automation.

The agent should be able to inspect the project, run CLI commands, validate changes, and produce safe implementation steps.

This skill is designed for AI coding agents that have access to terminal or CLI execution.

---

## Core Principles

Always inspect the repository before changing files.

Prefer minimal, safe changes.

Do not rewrite large metadata files unless necessary.

Do not assume the org alias, package structure, or deployment target.

Before running destructive commands, explain the risk and avoid executing unless explicitly requested.

Always validate metadata after changes when possible.

Prefer Salesforce CLI commands over manual guessing.

Use project commands to confirm facts instead of assuming them.

---

## Allowed CLI Behavior

The agent may run safe read-only commands without asking first.

Safe commands include:

```bash
pwd
ls
find . -maxdepth 3 -type f
git status
git branch
git diff
cat sfdx-project.json
sf org list
sf project list metadata
sf project generate manifest
sf project retrieve preview
sf apex list test
sf data query
```

The agent may run validation commands when needed.

Validation commands include:

```bash
sf project deploy validate
sf project deploy start --dry-run
sf apex run test
sf apex run test --test-level RunLocalTests
sf scanner run
npm test
npm run lint
npm run build
```

The agent must be careful with write/deploy commands.

Potentially dangerous commands include:

```bash
sf project deploy start
sf project retrieve start
sf org delete scratch
sf project delete source
git reset
git clean
rm -rf
```

Do not run destructive commands unless the user explicitly requested them.

---

## First Repository Inspection

At the beginning of a task, inspect the project structure.

Recommended commands:

```bash
pwd
ls
find . -maxdepth 3 -type f | sed 's#^\./##' | sort | head -200
git status --short
```

Then inspect Salesforce project configuration:

```bash
cat sfdx-project.json
sf org list
```

If package directories exist, identify them from `sfdx-project.json`.

Check common folders:

```bash
find force-app -maxdepth 4 -type f | sort | head -200
find force-app -type f \( -name "*.flow-meta.xml" -o -name "*.cls" -o -name "*.trigger" -o -name "*.js" -o -name "*.object-meta.xml" -o -name "*.field-meta.xml" \) | sort
```

---

## Metadata Discovery

When the task involves Salesforce Flows, search for Flow metadata:

```bash
find . -type f -name "*.flow-meta.xml" | sort
```

Search for specific object references:

```bash
grep -R "ObjectApiName__c" force-app/main/default -n || true
grep -R "FieldApiName__c" force-app/main/default -n || true
```

Search for automation around an object:

```bash
grep -R "<object>Account</object>" force-app/main/default/flows -n || true
grep -R "<object>CustomObject__c</object>" force-app/main/default/flows -n || true
```

Search Apex references:

```bash
grep -R "CustomObject__c" force-app/main/default/classes force-app/main/default/triggers -n || true
```

Search LWC references:

```bash
grep -R "CustomObject__c" force-app/main/default/lwc -n || true
```

---

## Flow Analysis Rules

When analyzing a Flow XML file, identify:

1. Flow label and API name
2. Trigger object
3. Trigger type
4. Before-save or after-save timing
5. Entry criteria
6. Decision elements
7. Get Records elements
8. Update/Create/Delete Records elements
9. Loops
10. Subflows
11. Apex actions
12. Fault paths
13. Recursion risks
14. Bulk behavior risks

Useful commands:

```bash
grep -n "<label>\|<processType>\|<start>\|<object>\|<triggerType>\|<recordTriggerType>" path/to/flow.flow-meta.xml
grep -n "<recordLookups>\|<recordUpdates>\|<recordCreates>\|<loops>\|<decisions>\|<subflows>\|<actionCalls>" path/to/flow.flow-meta.xml
```

If XML is large, use targeted search rather than reading blindly.

---

## Apex Analysis Rules

When analyzing Apex, check:

1. Trigger context
2. Handler/service structure
3. SOQL inside loops
4. DML inside loops
5. CRUD/FLS checks where required
6. Sharing model
7. Hardcoded IDs
8. Test coverage
9. Bulk safety
10. Error handling

Useful commands:

```bash
find force-app -type f \( -name "*.cls" -o -name "*.trigger" \) | sort
grep -R "insert \|update \|delete \|upsert \|Database." force-app/main/default/classes force-app/main/default/triggers -n || true
grep -R "SELECT .* FROM" force-app/main/default/classes force-app/main/default/triggers -n || true
grep -R "without sharing\|with sharing\|inherited sharing" force-app/main/default/classes -n || true
grep -R "Test.startTest\|@isTest\|@TestSetup" force-app/main/default/classes -n || true
```

---

## LWC Analysis Rules

When analyzing LWC, check:

1. Component structure
2. Apex imports
3. Wire adapters
4. Imperative Apex calls
5. Error handling
6. Loading states
7. Permission assumptions
8. Hardcoded object or field names
9. Metadata exposure
10. Tests if available

Useful commands:

```bash
find force-app/main/default/lwc -maxdepth 3 -type f | sort
grep -R "@salesforce/apex\|@wire\|getRecord\|updateRecord\|createRecord\|deleteRecord" force-app/main/default/lwc -n || true
npm run lint
npm test
```

---

## Deployment Validation

Before finalizing changes, run validation if possible.

First check available org aliases:

```bash
sf org list
```

Generate or inspect manifest:

```bash
sf project generate manifest --source-dir force-app/main/default --name package
cat package.xml
```

Validate deployment:

```bash
sf project deploy validate --source-dir force-app/main/default --test-level NoTestRun
```

For Apex changes, prefer:

```bash
sf project deploy validate --source-dir force-app/main/default --test-level RunLocalTests
```

If a specific test class is known:

```bash
sf project deploy validate --source-dir force-app/main/default --test-level RunSpecifiedTests --tests TestClassName
```

Do not deploy to production automatically.

---

## Querying Salesforce Data

Use SOQL only when needed to understand real org data.

Examples:

```bash
sf data query --query "SELECT Id, Name FROM Account LIMIT 10"
sf data query --query "SELECT Id, DeveloperName, TableEnumOrId FROM CustomField LIMIT 10"
```

For Tooling API queries:

```bash
sf data query --use-tooling-api --query "SELECT Id, DeveloperName FROM FlowDefinitionView LIMIT 20"
```

Do not query sensitive data unless necessary.

Prefer metadata inspection over data inspection.

---

## Implementation Workflow

Use this workflow:

```text
1. Inspect repository structure
2. Identify Salesforce DX configuration
3. Locate relevant metadata
4. Read only the relevant files
5. Analyze current behavior
6. Propose smallest safe change
7. Implement change
8. Run formatting/lint/tests/validation if available
9. Summarize changed files
10. Explain risks and next manual checks
```

---

## Command Execution Policy

Before running a command, classify it:

### Safe

Read-only, local inspection, metadata search, git status.

Can run automatically.

### Medium risk

Validation, tests, builds, dry-run deploys.

Can run automatically if needed.

### High risk

Real deploy, destructive changes, file deletion, git reset, org deletion.

Do not run unless explicitly requested.

---

## Preferred Output Format

When completing a task, answer using:

```md
## What I checked
## Diagnosis
## Changes made
## Commands run
## Validation
## Remaining risks
## Next steps
```

---

## Rules For Editing Metadata

When editing Flow XML:

- preserve existing structure as much as possible
- avoid unnecessary reordering
- do not rename elements unless required
- do not remove fault paths without reason
- do not remove existing assignments or decisions without proving they are obsolete

When editing Apex:

- preserve existing architecture
- avoid adding logic directly into triggers if handler pattern exists
- bulkify all logic
- avoid SOQL/DML in loops
- avoid hardcoded IDs
- add or update tests where needed

When editing LWC:

- preserve public API unless requested
- avoid breaking template bindings
- keep error handling visible
- avoid hardcoded labels where custom labels are already used

---

## Salesforce Automation Decision Guide

### Use Formula Field when

The value is derived from current record or parent fields and does not need to be stored historically.

### Use Validation Rule when

The goal is to block invalid user edits or status transitions.

### Use Before-Save Flow when

The goal is to update fields on the same triggering record.

### Use After-Save Flow when

The goal is to update related records, create logs, send notifications, or call subflows.

### Use Scheduled Flow when

The result may be eventually consistent and recalculation can happen later.

### Use Platform Event when

The logic should be decoupled from the original transaction.

### Use Apex when

The logic requires complex bulk processing, grouping, locking, advanced error handling, or performance control.

---

## Do Not Do

Do not:

- deploy automatically to production
- run destructive CLI commands without explicit user request
- rewrite the whole project
- ignore existing architecture
- hide failed validation
- claim a command passed if it was not run
- assume org aliases
- assume package directories
- assume Flow timing without checking XML
- query sensitive data unnecessarily
