# Prompt Library Guide

Prompts in `.github/prompts` are standalone templates for Codex, GitHub Copilot, and CLI agents.

## Usage

1. Open the target Salesforce DX repository.
2. Choose the prompt matching the task.
3. Paste it into the agent tool with any target file, object, field, or requirement.
4. Keep the prompt constraints intact unless you intentionally want broader action.

## Prompt groups

- Review: project, Apex, triggers, Flow, LWC, permissions.
- Creation: Apex service, Apex test, LWC.
- Operations: deployment validation, package.xml generation, metadata retrieval, debugging.

## Safety

All prompts require safe commands first, forbid real deployments by default, and require accurate validation reporting.

