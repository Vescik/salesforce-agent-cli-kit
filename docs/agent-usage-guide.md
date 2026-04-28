# Agent Usage Guide

## Agent selection

- Salesforce Code Reviewer: broad project review and risk classification.
- Salesforce Apex Engineer: Apex and Apex tests.
- Salesforce Flow Architect: Flow analysis, design, and refactor.
- Salesforce LWC Engineer: Lightning Web Components.
- Salesforce Security Reviewer: permissions, CRUD/FLS, sharing, secrets, exposed Apex.
- Salesforce Release Validator: deployment readiness and validate-only workflows.
- Salesforce CLI Implementer: command-driven inspection and validation.
- Salesforce Researcher: official-doc research and recommendations.

## Typical flow

1. Start with safe repository inspection.
2. Choose the specialist agent.
3. Use the matching skill for checklist and commands.
4. Use a prompt file when the task should be repeatable without chat history.
5. Validate only when safe and useful.

## Handoffs

- Reviewer to Apex Engineer for implementation.
- Flow Architect to Release Validator for deploy readiness.
- Security Reviewer to CLI Implementer for evidence gathering.
- Researcher to any implementation agent after source-backed recommendations.

