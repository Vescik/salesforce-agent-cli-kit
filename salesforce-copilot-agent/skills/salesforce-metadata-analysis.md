# Skill: Salesforce Metadata Analysis

Use this skill when analyzing Salesforce metadata in `force-app/`.

## Steps

1. Search for metadata components likely related to the User Story keywords.
2. Search for object names, field names, status values, flow names, Apex references, and labels mentioned in the User Story.
3. Inspect changed files if a changed-files list is provided.
4. Parse XML metadata where possible.
5. For flows, identify:
   - Trigger object
   - Trigger type
   - Before-save or after-save execution
   - Entry criteria
   - Decision logic
   - Record updates
   - Created records
   - Subflow calls
   - Apex action calls
6. For objects and fields, identify:
   - API names
   - Data types
   - Relationships
   - Picklist values
   - Formula logic
   - Validation rules
7. For Apex, identify:
   - Public methods
   - Invocable methods
   - DML operations
   - SOQL queries
   - Trigger context
8. Return a structured analysis with confidence levels.

## Rules

- Do not claim a component is relevant without evidence.
- Mark inferred behavior as inferred.
- Mark missing implementation as a gap.
- Prefer exact API names from metadata.
- Do not modify Salesforce metadata.
- Do not deploy Salesforce metadata.

## Output

Return:

```md
## Metadata Analysis Result
### Relevant Components
### Implementation Summary
### User Story Coverage Mapping
### Technical Behavior
### Dependencies
### Risks / Gaps / Open Questions
### Suggested Review Points
```
