# Salesforce MCP Security Review

## Security position

Salesforce MCP should be treated as privileged integration software. It can expose Salesforce org capabilities to an AI agent through tools. Even when the user intent is documentation or code review, the enabled toolsets may include operations that read sensitive data or change Salesforce state.

Default policy: read-only, local-first, sandbox/dev only.

## Threat model

| Threat | Example | Impact | Mitigation |
| --- | --- | --- | --- |
| Salesforce CLI credential exposure | Local auth files or org aliases available to MCP | Unauthorized org access from local machine | Use personal machines, least-privilege orgs, and avoid shared credentials |
| Org data exposure | AI agent runs broad SOQL queries | Sensitive customer or business data appears in chat or docs | Use sandbox/dev, narrow queries, redact output |
| Metadata mutation | Agent calls deploy or DevOps mutation tool | Unexpected org configuration changes | Do not enable mutation-heavy toolsets by default |
| Local source overwrite | Agent retrieves metadata into project | User changes can be overwritten | Treat retrieve as controlled and approval-gated |
| Anonymous Apex execution | Agent runs Apex that updates records | Data corruption or bypassed controls | Block anonymous Apex by policy |
| Permission assignment | Agent grants permission set to user | Unauthorized access | Block permission changes by policy |
| Test execution side effects | Agent runs long or resource-heavy tests | CI/resource impact | Require approval for tests |
| Production access | MCP uses production alias | High blast radius | Do not use production aliases by default |
| Overbroad server config | `ALLOW_ALL_ORGS` or `--toolsets all` | Too many tools and orgs exposed | Use named sandbox alias and minimal toolsets |
| MCP server trust | Malicious or compromised MCP package | Local machine or org risk | Use official package only and review release notes |

## Secrets and credential handling

Do not commit:

- Real `.vscode/mcp.json` files with org aliases.
- `.env` files.
- Salesforce usernames.
- Session IDs.
- Client credentials.
- Private URLs.
- Any credential-bearing local config.

Use:

- `.vscode/mcp.example.json` for examples.
- VS Code user-level MCP config for personal setup.
- GitHub Agents secrets or approved organization-level secure storage only if cloud-agent experimentation is later approved.

## Salesforce org access risks

The Salesforce DX MCP Server requires `--orgs`, and those orgs must be locally authorized. This means the server can potentially operate with the permissions of the authorized Salesforce user.

Risk controls:

- Use a low-privilege sandbox or developer org user.
- Prefer aliases like `my-sandbox-alias`.
- Avoid `DEFAULT_TARGET_ORG` for shared docs unless the user understands their local default.
- Never use `ALLOW_ALL_ORGS` as a team default.
- Never point early testing at production.

## Production org risks

Production should be out of scope for this toolkit's MCP default.

Blocked by default:

- Production deployment.
- Production data queries with sensitive fields.
- Production anonymous Apex.
- Production permission changes.
- Production retrieve operations that can overwrite local files.

If production read-only analysis is ever required, it should be a separate approved workflow with:

- Named purpose.
- Named approver.
- Narrow query/component scope.
- Redaction rules.
- Audit notes.

## Data exposure risks

Read-only is not automatically safe. SOQL or Tooling API reads can expose sensitive data.

Safe pattern:

```text
Use read-only metadata first.
If data is required, query only the minimum fields and record count needed.
Do not include personal or customer data in generated documentation.
```

Avoid:

- `SELECT *` style broad queries.
- Exporting records into repo files.
- Including raw record data in Azure Wiki docs.
- Querying production data unless explicitly approved.

## Destructive command risks

The following operations must be blocked unless a human explicitly approves them for a non-production environment:

- Metadata deploy.
- Metadata retrieve that overwrites source.
- Destructive changes.
- Org deletion.
- Data update, upsert, import, or delete.
- Permission assignment or removal.
- Anonymous Apex.
- DevOps Center state mutation.

## MCP server trust model

MCP servers run code. For local VS Code, a `stdio` server runs on the developer machine through commands such as `npx`.

Controls:

- Use official Salesforce package `@salesforce/mcp`.
- Prefer pinned or reviewed versions for team rollout.
- Keep telemetry and debug behavior understood.
- Review release notes before expanding toolsets.
- Use VS Code MCP trust prompts and reset trust when config changes.
- Consider VS Code sandbox fields where they fit local policy.

## Policy levels

### Level 1: Safe / read-only

Allowed:

- Analyze local files.
- Read local metadata.
- Run Salesforce Code Analyzer on explicit absolute file paths.
- Describe objects, fields, Flows, Apex, LWC, layouts, and permission set XML from local source.
- Generate documentation.
- Run narrow read-only SOQL only after explicit confirmation of non-production org.

Blocked:

- Deployments.
- Anonymous Apex execution.
- Data updates.
- Destructive changes.
- Permission changes.
- Production org access.
- Retrieve operations that overwrite local files.

Recommended toolsets:

```text
core,orgs,code-analysis
```

### Level 2: Controlled developer mode

Allowed:

- Read metadata.
- Run selected code analysis.
- Run selected tests after approval.
- Prepare deployment commands.
- Prepare validate-only deployment plan.
- Use `metadata` or `testing` toolsets only for a scoped task.

Manual approval required:

- Test execution.
- Validate-only deployment.
- Metadata retrieve.
- Any command that can modify local files.
- Any command that consumes significant org resources.

Still blocked:

- Production deployment.
- Anonymous Apex data fixes.
- Permission changes.
- Data mutation.

### Level 3: Automation mode

Allowed only for sandbox/dev orgs after separate approval:

- Automated validations.
- Test execution.
- Pull request creation.
- Documentation commits.

Never allow:

- Automatic production deployment.
- Automatic destructive changes.
- Automatic data updates.
- Automatic permission assignment.
- Automatic anonymous Apex.

## Recommended safe default configuration

Use only:

```text
core,orgs,code-analysis
```

Use a specific sandbox or developer org alias:

```text
my-sandbox-alias
```

Do not use:

```text
ALLOW_ALL_ORGS
--toolsets all
--allow-non-ga-tools
production aliases
```

## Approval language

Before any Level 2 operation, require explicit wording such as:

```text
APPROVE SALESFORCE MCP VALIDATION IN SANDBOX <alias>
```

Before any commit/push operation for generated documentation, require the repository's existing approval policy for Git changes.
