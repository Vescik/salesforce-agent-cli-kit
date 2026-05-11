# Salesforce MCP Implementation Plan

## Goal

Evaluate Salesforce DX MCP Server for GitHub Copilot Agent workflows without enabling it automatically in this repository.

The first version should support local VS Code proof-of-concept work only. It should help developers understand whether Salesforce MCP improves:

- Salesforce metadata inspection.
- Code analysis.
- Azure Wiki documentation generation.
- Flow review.
- Permission review.
- Deployment planning.

It must not deploy metadata, mutate org data, run anonymous Apex, or change permissions by default.

## Phase 1: Local proof of concept

### 1. Verify local prerequisites

Run these manually on a developer machine:

```bash
node --version
npm --version
sf --version
code --version
```

Required:

- Node.js available on PATH.
- Salesforce CLI installed and working.
- VS Code installed.
- GitHub Copilot and GitHub Copilot Chat enabled in VS Code.
- Access to a sandbox, scratch org, or developer org.

Do not use production for the first proof of concept.

### 2. Authorize a non-production Salesforce org

Use a clear local alias:

```bash
sf org login web --alias my-sandbox-alias
sf org display --target-org my-sandbox-alias
```

Safety notes:

- Do not commit the alias as a team default.
- Do not use a personal production org alias.
- Do not use `ALLOW_ALL_ORGS`.

### 3. Create local VS Code MCP config

Create `.vscode/mcp.json` locally, or preferably use user-level MCP configuration.

Safe starting config:

```json
{
  "servers": {
    "salesforceDx": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@salesforce/mcp",
        "--orgs",
        "my-sandbox-alias",
        "--toolsets",
        "core,orgs,code-analysis"
      ]
    }
  }
}
```

Repository policy:

- Commit only `.vscode/mcp.example.json`.
- Ignore `.vscode/mcp.json`.
- Prefer user-level config when org aliases differ by developer.

### 4. Start and verify MCP in VS Code

Use VS Code Command Palette:

- `MCP: List Servers`
- `MCP: Reset Cached Tools`
- `MCP: Show Installed Servers`

Then open Copilot Chat in Agent Mode and ask:

```text
Show the MCP tools available from Salesforce DX. Do not run any Salesforce operation yet.
```

Expected result:

- Copilot sees Salesforce DX MCP tools.
- No Salesforce deploy, retrieve, data update, or permission operation is executed.

### 5. Run simple read-only tests

Use prompts like:

```text
Use Salesforce DX MCP only for read-only inspection.
List authorized Salesforce orgs visible to the MCP server.
Do not deploy, retrieve, update data, assign permissions, run Apex, or run tests.
```

If Copilot proposes risky actions, stop the proof of concept and tighten the toolsets or instructions.

## Phase 2: Controlled Salesforce metadata analysis

### 1. Keep toolsets minimal

Default:

```text
core,orgs,code-analysis
```

Optional after review:

```text
metadata
data
testing
users
```

Do not add optional toolsets until the team has agreed on allowed commands and approval points.

### 2. Test local metadata analysis without org tools

Ask Copilot to inspect local source first:

```text
Analyze local force-app metadata only.
Do not connect to Salesforce orgs.
Summarize objects, fields, Flows, Apex, LWC, permission sets, and deployment risks.
```

Expected behavior:

- Uses repository files.
- Does not call Salesforce MCP org tools.
- Produces a metadata summary.

### 3. Test Code Analyzer MCP

Use absolute paths, as required by Salesforce Code Analyzer MCP:

```text
Run Salesforce Code Analyzer on these absolute file paths only:
- /absolute/path/to/force-app/main/default/classes/Example.cls

Use the working directory /absolute/path/to/project.
Do not deploy, run Apex tests, retrieve metadata, or query org data.
```

Expected behavior:

- Uses `code-analysis` tools only.
- Reports PMD/CPD/ESLint/RetireJS/regex findings if available.
- Does not inspect more than the allowed file list.

### 4. Test org metadata queries only if approved

If local metadata is incomplete, test read-only org access with a sandbox alias:

```text
Use Salesforce MCP in read-only mode against my-sandbox-alias.
Inspect metadata needed to explain the selected object and fields.
Do not deploy, retrieve over local files, run Apex, update data, or change permissions.
```

Do not use this step for production.

### 5. Record what works

Create internal notes with:

- Prompt used.
- Toolsets enabled.
- Tools Copilot attempted to call.
- Whether user approval was requested.
- Output quality.
- Any unsafe proposed action.

## Phase 3: Documentation workflow

Connect Salesforce MCP to this repo's existing documentation workflow without making MCP required.

Recommended flow:

1. User provides User Story ID, Description, and Acceptance Criteria, or fetches them through Azure DevOps MCP.
2. Agent analyzes local `force-app/` metadata.
3. Agent optionally uses Salesforce MCP Code Analyzer for selected files.
4. Agent asks for manual steps that are not visible in metadata.
5. Agent generates Azure Wiki Markdown using the existing documentation generator.
6. Agent generates `HOW_TO_TEST_[USER STORY ID].docx` if requested.
7. User reviews output.
8. Commit/push remains manual or requires explicit approval.

Prompt:

```text
Generate Azure Wiki documentation for this User Story.
Start with local force-app analysis.
Use Salesforce MCP only for code analysis on explicitly listed files.
Do not connect to production.
Do not deploy, retrieve metadata over local files, mutate data, run anonymous Apex, change permissions, or push documentation.
```

## Phase 4: Team rollout

### 1. Decide config strategy

Recommended:

- Commit `.vscode/mcp.example.json` only.
- Ignore `.vscode/mcp.json`.
- Use VS Code user-level MCP config for personal org aliases.

Reason:

- Org aliases are developer-specific.
- Workspace config can accidentally encourage broad access.
- User-level config reduces repo-level exposure.

### 2. Create onboarding docs

Team docs should include:

- How to install Salesforce CLI.
- How to authorize a sandbox/dev org.
- How to configure VS Code MCP.
- Which toolsets are approved.
- Which prompts are allowed.
- Which actions require approval.
- How to stop MCP server if it behaves unexpectedly.

### 3. Create allowed/disallowed prompts

Allowed:

- "Analyze local force-app files."
- "Run Code Analyzer on these absolute file paths."
- "Explain Flow XML from local files."
- "Prepare deployment checklist without executing deployment."

Disallowed:

- "Deploy this to production."
- "Run anonymous Apex to fix records."
- "Assign this permission set to users."
- "Retrieve all metadata and overwrite my local project."

### 4. Create review checklist

Before broad rollout, confirm:

- No production org alias is used.
- No `ALLOW_ALL_ORGS`.
- No `--toolsets all`.
- No `--allow-non-ga-tools` by default.
- No local `.vscode/mcp.json` committed.
- Team understands approval points.

## Phase 5: Optional automation

Evaluate Copilot Cloud Agent separately. Do not assume VS Code MCP config applies.

Cloud evaluation steps:

1. Review GitHub repository/custom-agent MCP configuration.
2. Determine whether Salesforce MCP can run in the cloud environment.
3. Decide how org access would be represented without local Salesforce CLI auth.
4. Store any required credentials only in GitHub Agents variables or approved secure storage.
5. Limit custom-agent `tools` to specific allowed tools.
6. Start with read-only documentation tasks only.

Do not enable:

- Autonomous production deployment.
- Anonymous Apex execution.
- Permission assignment.
- Data updates.
- Destructive metadata operations.

## Recommended default

Partial implementation now:

- Add research and examples.
- Use local VS Code proof of concept.
- Use `core,orgs,code-analysis`.
- Use sandbox/dev org alias.
- Keep all mutation and deployment workflows approval-gated.
