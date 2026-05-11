# Salesforce MCP Copilot Prompts

## Prompt safety baseline

Use this safety block in any prompt that might touch Salesforce MCP:

```text
Safety rules:
- Do not deploy metadata.
- Do not retrieve metadata over local files.
- Do not mutate Salesforce data.
- Do not run anonymous Apex.
- Do not change permissions or assign permission sets.
- Do not use production orgs.
- Do not run tests unless I explicitly approve.
- Prefer local force-app analysis before org-connected tools.
- If a command or tool is risky, stop and ask for approval.
```

## Verify Salesforce MCP tools are visible

```text
Use GitHub Copilot Agent in VS Code.

Check whether Salesforce DX MCP tools are visible.

Safety rules:
- Do not run any Salesforce org operation yet.
- Do not deploy, retrieve, query data, run tests, run anonymous Apex, or change permissions.

Expected output:
## MCP visibility
## Salesforce DX server status
## Available safe toolsets
## Any risky toolsets visible
## Next safe test
```

## List authorized orgs safely

```text
Use Salesforce DX MCP in read-only mode.

List only the authorized org aliases visible to the MCP server.

Safety rules:
- Do not connect to production.
- Do not query records.
- Do not deploy.
- Do not retrieve metadata.
- Do not run tests.
- Do not run anonymous Apex.
- Do not change permissions.

Expected output:
## Visible orgs
## Which org appears safe for sandbox/dev testing
## Warnings
```

## Run Code Analyzer on selected files

```text
Use Salesforce DX MCP Code Analyzer only.

Run code analysis on these absolute file paths:
- /ABSOLUTE/PATH/TO/force-app/main/default/classes/Example.cls

Working directory:
/ABSOLUTE/PATH/TO/PROJECT

Safety rules:
- Use only code-analysis tools.
- Do not analyze more than the listed files.
- Do not deploy.
- Do not query org data.
- Do not retrieve metadata.
- Do not run Apex tests.
- Do not run anonymous Apex.

Expected output:
## Code Analyzer summary
## High severity findings
## Medium severity findings
## Low severity findings
## Files analyzed
## Tool limitations
```

## Analyze local force-app metadata without org access

```text
Analyze the local Salesforce DX metadata in force-app.

Do not use Salesforce org-connected tools unless I explicitly approve.

Inspect:
- objects
- fields
- validation rules
- flows
- Apex
- LWC
- permission sets
- layouts
- flexipages

Safety rules:
- Local file analysis only.
- Do not deploy.
- Do not retrieve metadata.
- Do not query org data.
- Do not run tests.
- Do not run anonymous Apex.
- Do not change permissions.

Expected output:
## Metadata inventory
## Important components
## Dependencies
## Automation summary
## Security notes
## Documentation gaps
```

## Explain Flow XML from local files

```text
Explain the Salesforce Flow XML in this local file:
/ABSOLUTE/PATH/TO/force-app/main/default/flows/FLOW_NAME.flow-meta.xml

Safety rules:
- Read local files only.
- Do not edit Flow XML.
- Do not deploy.
- Do not retrieve metadata.
- Do not run tests.
- Do not query org data.
- Do not run anonymous Apex.

Explain:
- Flow API name
- Flow type
- Trigger object
- Trigger timing
- Entry criteria
- Decisions
- Gets
- Creates, updates, deletes
- Subflows
- Apex actions
- Fault paths
- Recursion risk
- Bulk behavior
- User-visible impact

Expected output:
## Flow summary
## Plain-language behavior
## Technical behavior
## Risk areas
## Safe admin checks
## Developer review points
```

## Generate Azure Wiki documentation

```text
Generate Azure Wiki documentation for this Salesforce User Story.

User Story ID:
<ID>

Title:
<TITLE>

Description:
<DESCRIPTION>

Acceptance Criteria:
<ACCEPTANCE_CRITERIA>

Workflow:
1. Analyze local force-app metadata first.
2. Use Salesforce MCP only for Code Analyzer if needed and only on explicit absolute file paths.
3. Ask me for manual implementation/configuration steps that are not visible in metadata.
4. Generate Azure Wiki-compatible Markdown.
5. Save a draft only if this repo's documentation generator is configured.
6. Do not commit or push unless I approve separately.

Safety rules:
- Do not deploy.
- Do not retrieve metadata over local files.
- Do not mutate org data.
- Do not run anonymous Apex.
- Do not change permissions.
- Do not use production orgs.
- Do not run tests unless I explicitly approve.

Expected output:
## Draft path
## Metadata analyzed
## Manual steps captured
## Acceptance Criteria coverage
## Assumptions
## Open questions
## Validation status
```

## Permission analysis with read-only boundary

```text
Analyze permission impact for this Salesforce scenario:
<SCENARIO>

Start with local permission set/profile metadata in force-app.

Only if I explicitly approve, use Salesforce MCP against a non-production org for read-only checks.

Safety rules:
- Do not assign permission sets.
- Do not edit permission sets or profiles.
- Do not change users.
- Do not deploy.
- Do not run anonymous Apex.
- Do not query sensitive record data.

Expected output:
## Access question
## Local metadata evidence
## Permission layers involved
## Possible missing access
## Read-only org checks, if approved
## What not to change blindly
```

## Deployment support as prepare commands only

```text
Prepare deployment support notes for this Salesforce change.

Use local metadata and Git diff only.
Do not execute deployment or validation commands.

Safety rules:
- Prepare commands only.
- Do not run sf project deploy start.
- Do not run sf project deploy validate.
- Do not retrieve metadata.
- Do not run Apex tests.
- Do not mutate data.
- Do not change permissions.

Expected output:
## Deployment scope
## Components to include
## Dependencies
## Suggested validate-only command
## Suggested test strategy
## Rollback notes
## Manual approval points
```

## Controlled validation prompt

Use this only after approval:

```text
I approve controlled validation in sandbox <alias>.

Prepare the exact validation command first and wait for my confirmation before running it.

Scope:
<SOURCE PATH OR PACKAGE>

Safety rules:
- Sandbox only.
- Validate-only only.
- No production deployment.
- No destructive changes.
- No anonymous Apex.
- No data mutation.
- No permission changes.

Expected output before execution:
## Proposed command
## Why it is validation-only
## Tests selected
## Risks
## Confirmation required
```
