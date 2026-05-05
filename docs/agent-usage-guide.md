# Agent Usage Guide

## Agent selection

- Salesforce Code Review Agent: review Apex, Flow, LWC, metadata, permissions, security, dependencies, and deployment risk without editing by default.
- Salesforce Developer Agent: implement requested Salesforce DX changes across Apex, Flow metadata, LWC, metadata XML, scripts, and docs.
- Salesforce Test Agent: plan and run safe tests, lint, scanner, CI checks, and validation evidence collection.
- Salesforce Deployment Agent: prepare package scope, validate-only planning, release notes, rollback notes, and deployment checklists.
- Salesforce Documentation Creator Agent: create Azure Wiki pages, user story context, metadata summaries, release notes, and handoff documentation.

## Why Developer and Review are separate

They should stay separate. Code review is a risk-classification workflow and should not edit files unless explicitly requested. Development is an implementation workflow and may edit files when the user asks for a change. Keeping them separate reduces accidental edits during review-only tasks.

## Typical flow

1. Start with safe repository inspection.
2. Choose the specialist agent.
3. Use the matching skill for checklist and commands.
4. Use a prompt file when the task should be repeatable without chat history.
5. Validate only when safe and useful.

## Handoffs

- Code Review Agent to Developer Agent for concrete fixes.
- Developer Agent to Test Agent for validation evidence.
- Test Agent to Deployment Agent for release readiness.
- Deployment Agent to Documentation Creator Agent for release notes and rollback docs.
- Documentation Creator Agent to Code Review Agent when documentation exposes technical uncertainty or risk.
