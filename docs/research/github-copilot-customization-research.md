# GitHub Copilot Customization Research

## Summary

GitHub Copilot customization is most maintainable when repository guidance is layered by scope: short global instructions, focused path/task instructions, specialist agents, workflow skills, and standalone prompt files.

## Recommended repo structure

- `AGENTS.md` for cross-agent safety and operating rules.
- `.github/copilot-instructions.md` for repository-wide Copilot guidance.
- `.github/instructions/*.instructions.md` for focused always-on rules, optionally path-scoped with frontmatter.
- `.github/agents/*.agent.md` for specialist custom agents with YAML frontmatter.
- `.github/skills/<skill>/SKILL.md` for reusable multi-step workflows with optional assets.
- `.github/prompts/*.prompt.md` for reusable task templates.

## What should be always-on instructions

Always-on files should stay short: safety, validation honesty, command classification, repository conventions, and handoff guidance. Detailed checklists belong in skills or docs.

## What should be a custom agent

Use custom agents for specialist roles with their own workflow and output contract, such as Salesforce Code Reviewer, Apex Engineer, Flow Architect, Security Reviewer, Release Validator, and Researcher.

## What should be a skill

Use skills for reusable multi-step procedures: metadata discovery, Apex review, Flow review, LWC review, permission/security review, deployment validation, debugging, and code creation.

## What should be a prompt

Use prompt files for repeatable one-shot tasks that should work without previous chat context, such as reviewing a Flow, creating an Apex test, validating deployment, or generating package.xml.

## Risks / limitations

- Copilot customization support differs across GitHub.com, VS Code, Copilot CLI, JetBrains, Visual Studio, and other surfaces.
- Too many duplicated instructions can conflict and reduce agent quality.
- Custom agents and skills are evolving features; frontmatter support and tool names can vary by environment.
- Skills can include scripts and resources, so imported skills should be reviewed before use.

## Source links

- GitHub Docs: [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- GitHub Docs: [Customization cheat sheet](https://docs.github.com/copilot/reference/customization-cheat-sheet)
- GitHub Docs: [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- GitHub Docs: [About custom agents](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents)
- GitHub Docs: [Customization library](https://docs.github.com/copilot/tutorials/customization-library)

