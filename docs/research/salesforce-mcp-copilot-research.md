# Salesforce MCP and GitHub Copilot Research

## Executive summary

The official Salesforce DX MCP Server can be useful for local VS Code + GitHub Copilot Agent workflows, but it should be adopted carefully and partially.

Recommendation: implement a local proof of concept first, using a sandbox or developer org alias and the smallest useful toolsets:

```text
core,orgs,code-analysis
```

Do not enable Salesforce MCP by default in this repository. Do not commit a real `.vscode/mcp.json` with org aliases. Do not give Copilot access to production orgs, data mutation tools, deployment tools, anonymous Apex, or permission-management tools until a team security review is complete.

Primary sources:

- [Salesforce DX MCP Server GitHub repository](https://github.com/salesforcecli/mcp)
- [Salesforce Code Analyzer MCP documentation](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/mcp.html)
- [VS Code MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration)
- [GitHub Copilot cloud agent MCP documentation](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/mcp-and-cloud-agent)
- [GitHub custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)

## What MCP is in this context

Model Context Protocol (MCP) is a standard way for an AI assistant to call external tools. In this repository, MCP matters because GitHub Copilot Agent can potentially use MCP tools to inspect Salesforce orgs, run code analysis, read metadata, and support documentation generation.

There are two distinct usage modes:

- Local VS Code Copilot Agent: runs MCP servers on the developer machine, usually through `stdio`, and can use local Salesforce CLI authentication.
- GitHub Copilot cloud agent: runs in GitHub infrastructure and uses repository or custom-agent MCP configuration. It is not the same runtime as local VS Code.

## What Salesforce DX MCP Server provides

Salesforce publishes the Salesforce DX MCP Server through the npm package:

```bash
npx -y @salesforce/mcp
```

The Salesforce DX MCP Server is currently described by Salesforce as Beta. Treat the API surface, tool behavior, and security model as subject to change.

The server requires the `--orgs` flag. The referenced orgs must already be authorized locally through Salesforce CLI, for example with `sf org login web` or the VS Code Salesforce authorization command.

Example from Salesforce documentation patterns:

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

This example is useful for understanding syntax, but it is not the recommended safe default for this repository.

## Supported toolsets

Salesforce DX MCP supports toolsets that can be enabled with `--toolsets`. Important toolsets include:

| Toolset | Purpose | Recommended default |
| --- | --- | --- |
| `core` | Basic DX MCP tools; always enabled by the server | Yes |
| `orgs` | Authorized org discovery and org-related tools | Yes, sandbox/dev only |
| `code-analysis` | Salesforce Code Analyzer MCP tools | Yes |
| `metadata` | Retrieve and deploy metadata between org and project | No by default |
| `data` | Query and manage org data | No by default |
| `users` | User and permission-related operations | No by default |
| `testing` | Apex and feature testing tools | No by default |
| `lwc-experts` | LWC analysis, optimization, and expert tools | Optional after review |
| `aura-experts` | Aura-to-LWC and Aura analysis tools | Optional after review |
| `experts-validation` | LWC production-readiness validation | Optional after review |
| `devops` | DevOps Center resource operations | No by default |
| `enrichment` | Metadata enrichment tools | No by default |
| `scale-products` | Apex performance and scale tools | Optional after review |

Salesforce recommends enabling only the toolsets that are actually needed. Enabling `all` can overwhelm the model context and exposes more capabilities than a normal documentation or review workflow needs.

## Code Analyzer MCP

The Salesforce Code Analyzer MCP tools are a good first candidate because they are local-analysis focused. Salesforce documents the `code-analysis` toolset and notes that Code Analyzer usually does not require org access, but the Salesforce DX MCP Server still requires `--orgs` in its startup arguments.

Useful facts from the Code Analyzer MCP documentation:

- Most Code Analyzer MCP tools are generally available.
- Non-GA Code Analyzer tools require `--allow-non-ga-tools`.
- Code analysis targets must use absolute file paths.
- `run_code_analyzer` accepts up to 10 files in one execution.
- Supported engines include PMD, CPD, ESLint, RetireJS, and regex.

## Local VS Code Copilot Agent vs Copilot Cloud Agent

| Area | Local VS Code Copilot Agent | Copilot Cloud Agent |
| --- | --- | --- |
| Runtime | Developer machine | GitHub-hosted environment |
| MCP config | User profile or workspace `.vscode/mcp.json` | Repository/custom-agent MCP settings |
| Salesforce auth | Local Salesforce CLI authorization | Must be configured for cloud runtime; do not assume local auth exists |
| Local files | Direct workspace access | Repository checkout in cloud task environment |
| MCP server type | Commonly `stdio` through local commands like `npx` | Repository/custom-agent MCP configuration |
| Tools/resources/prompts | VS Code can use MCP server capabilities supported by the client | Cloud agent supports MCP tools only, not MCP resources or prompts |
| OAuth remote MCP | Depends on local client support | GitHub docs state cloud agent does not currently support remote MCP servers that use OAuth |
| Recommended use | First implementation path | Evaluate later |

Important: do not assume `.vscode/mcp.json` works in Copilot Cloud Agent. Treat local Copilot Agent and Copilot Cloud Agent as separate deployment models.

## Salesforce org authentication requirements

Salesforce MCP relies on Salesforce CLI authorization. The developer must authorize the org before the MCP server can access it.

Preferred setup:

```bash
sf org login web --alias my-sandbox-alias
```

Avoid:

- Production aliases.
- `ALLOW_ALL_ORGS`.
- Shared machines with many authorized orgs.
- Committing aliases or user-specific config.

## Tools and risky operations

These tools or tool categories require special care:

| Tool / category | Risk |
| --- | --- |
| `deploy_metadata` | Can modify org metadata. Never run without explicit approval. |
| `retrieve_metadata` | Can overwrite local source files. Treat as a controlled operation. |
| `run_soql_query` | Read-only but can expose sensitive org data. Use sandbox/dev and narrow queries. |
| `run_apex_test` | Non-destructive but can consume org resources and affect CI assumptions. |
| `assign_permission_set` | Changes user access. Never allow in read-only workflows. |
| `delete_org` | Destructive for scratch orgs. Requires explicit approval. |
| DevOps Center mutation tools | Can modify delivery state. Do not enable by default. |
| Anonymous Apex tools if exposed | Can mutate data or metadata. Block by policy. |

## Known limitations

- Salesforce DX MCP Server is Beta.
- Tool availability and release status can change.
- Local org authorization is required even for some workflows that are mostly local.
- Code Analyzer MCP expects absolute file paths.
- Code Analyzer currently has file-count and engine limitations.
- MCP tool invocation is mediated by the LLM and client approvals; users do not normally call individual MCP tools directly.
- Copilot Cloud Agent does not inherit local VS Code MCP configuration.
- Cloud Agent supports MCP tools only, not MCP resources or prompts.
- Cloud Agent remote MCP OAuth support is limited per GitHub documentation.

## Use case fit

### A. Metadata analysis

Good fit for local file analysis without MCP. Salesforce MCP can help when org metadata must be inspected or enriched, but start with local `force-app/` scanning and Code Analyzer.

### B. Documentation generation

Good fit. Copilot can use local files, existing repo prompts, and generated metadata summaries. Salesforce MCP is optional and should not be required for Azure Wiki documentation drafts.

### C. Flow review

Good fit from local XML files. MCP is not required for basic Flow XML review. Org-connected metadata tools may help when local source is incomplete.

### D. Permission analysis

Partial fit. Local permission set XML and profiles can be inspected without MCP. Org-connected checks may require SOQL/Tooling API or Salesforce MCP data/users tools, which should be read-only and sandbox-only by default.

### E. Deployment support

Use MCP only to prepare commands and documentation at first. Do not let Copilot autonomously deploy. Validation and test execution belong in controlled developer mode with explicit approval.

## Recommendation

Implement now, partially:

1. Add documentation and example config only.
2. Keep `.vscode/mcp.json` out of the repo.
3. Use local VS Code as the first proof of concept.
4. Start with `core,orgs,code-analysis`.
5. Use a sandbox or developer org alias only.
6. Expand to `metadata` or `data` only after a security review.
7. Keep production deployment and data mutation out of scope.
