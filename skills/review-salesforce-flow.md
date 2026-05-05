# Skill: Review Salesforce Flow

## Purpose

Deeply analyze Salesforce Flow XML files from `force-app` and document behavior in Azure Wiki compatible Markdown.

## Review Areas

- Trigger conditions
- Record update logic
- Decision paths
- Assignment behavior
- Subflow calls
- Apex actions
- Fault paths
- Recursion risks
- Bulkification risks
- Missing logging
- Possible reasons why a record field could change unexpectedly

## Flow Output Requirements

For each relevant Flow, document:

- Flow API name
- Trigger type
- Object
- Entry conditions
- Decisions
- Assignments
- Updates
- Creates
- Deletes
- Subflows
- Apex actions
- Fault paths
- Potential recursion risk
- Debug/logging behavior

## Output

Save the Flow review to:

`output/metadata-analysis/flow-review.md`
