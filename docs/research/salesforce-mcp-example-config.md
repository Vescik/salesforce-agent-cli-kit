# Salesforce MCP Example Config

## Purpose

This file provides safe example configuration for a local Salesforce DX MCP proof of concept in VS Code.

Do not copy this into an active config without replacing placeholders and confirming the target org is non-production.

Do not commit a real `.vscode/mcp.json`.

## Minimal local VS Code config

Recommended first proof-of-concept config:

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

Why this is the safe starting point:

- Uses the official `@salesforce/mcp` package.
- Uses local `stdio`, the common VS Code pattern for local MCP servers.
- Uses one named sandbox/dev alias.
- Enables Code Analyzer tools for local static analysis.
- Does not enable metadata deployment, data management, user management, or testing by default.

## Salesforce documentation example

Salesforce documentation commonly shows examples using `DEFAULT_TARGET_ORG` and broader toolsets, for example:

```json
{
  "servers": {
    "Salesforce DX": {
      "command": "npx",
      "args": [
        "-y",
        "@salesforce/mcp",
        "--orgs",
        "DEFAULT_TARGET_ORG",
        "--toolsets",
        "orgs,metadata,data,users"
      ]
    }
  }
}
```

Use this only as syntax reference. It is not the recommended default for this repository because `DEFAULT_TARGET_ORG` depends on local developer state and the listed toolsets include capabilities beyond read-only documentation.

## VS Code user-level vs workspace-level guidance

VS Code can store MCP config in:

- Workspace config: `.vscode/mcp.json`
- User profile config: user-level `mcp.json`

Recommended repository policy:

- Commit `.vscode/mcp.example.json` only.
- Ignore `.vscode/mcp.json`.
- Prefer user-level config for real org aliases.

Reason:

- Org aliases vary by developer.
- Workspace config can accidentally standardize unsafe access.
- User-level config keeps personal org setup out of the repo.

## Suggested `.gitignore`

```gitignore
.vscode/mcp.json
.env
```

This repo already uses local-only config through `config.json` patterns. Keep Salesforce MCP real config local too.

## When to add extra toolsets

### Add `metadata`

Only after approval when the user needs org metadata operations.

Risks:

- Metadata deploy can change org configuration.
- Metadata retrieve can overwrite local files.

Guardrail:

```text
Use metadata tools only to inspect. Do not deploy. Do not retrieve over local files without approval.
```

### Add `data`

Only after approval for read-only sandbox/dev investigation.

Risks:

- SOQL can expose sensitive data.
- Some data tools may mutate records depending on enabled tools.

Guardrail:

```text
Run narrow read-only SOQL only. Do not insert, update, upsert, import, export sensitive data, or delete records.
```

### Add `testing`

Only after approval for controlled validation.

Risks:

- Test execution can consume org resources.
- Test output may reveal implementation details.

Guardrail:

```text
Run selected tests only after explicit approval. Do not run all tests by default.
```

### Add `users`

Do not add by default.

Risks:

- Permission set assignment changes access.
- User operations can affect compliance and support.

Guardrail:

```text
Read-only user/access explanation only. Do not assign or remove permissions.
```

## What to avoid

Do not use:

```text
ALLOW_ALL_ORGS
--toolsets all
--allow-non-ga-tools
production aliases
shared admin aliases
```

## Optional sandbox fields

VS Code supports sandbox configuration for local `stdio` MCP servers on macOS and Linux. This can restrict filesystem and network access.

Conceptual example:

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
      ],
      "sandboxEnabled": true,
      "sandbox": {
        "filesystem": {
          "denyRead": ["${userHome}/.ssh"],
          "denyWrite": ["${workspaceFolder}"]
        }
      }
    }
  }
}
```

Validate sandbox behavior locally before relying on it. Do not assume sandboxing makes dangerous Salesforce tools safe.

## Testing checklist

1. Confirm org alias is non-production.
2. Start VS Code.
3. Open Command Palette.
4. Run `MCP: List Servers`.
5. Confirm `salesforceDx` starts.
6. Ask Copilot to list available Salesforce MCP tools.
7. Ask for Code Analyzer rules.
8. Ask for local file analysis using absolute file paths.
9. Confirm no deploy, retrieve, data mutation, anonymous Apex, permission change, or production action is proposed.
