---
description: Generate Azure Wiki documentation from Salesforce metadata analysis and user story context.
---

# Task

Generate Azure Wiki documentation from the Salesforce metadata analysis.

# Inputs

- User Story Context: `{{USER_STORY_CONTEXT}}`
- Metadata Analysis: `{{METADATA_ANALYSIS}}`
- Change Summary: `{{CHANGE_SUMMARY}}`

# Instructions

1. Use Azure DevOps Wiki compatible Markdown.
2. Keep the structure clear, technical, and business-readable.
3. Include assumptions, risks, testing notes, deployment notes, and rollback notes.
4. Do not use generic filler text.
5. Do not expose secrets, credentials, org IDs, tokens, usernames, or private URLs.
6. Mark uncertainty with `Assumption:` or `Requires confirmation:`.
7. Include manual implementation/configuration steps only when provided by the user. Label them as user-provided delivery context.

# Required Sections

# Title

## 1. Business Context

## 2. Scope of Change

## 3. Metadata Components

## 4. Component Details

## 5. Process / Automation Logic

## 6. Security and Permissions

## 7. Dependencies

## 8. Risks and Assumptions

## 9. Testing Scenarios

## 10. Deployment Notes

## 11. Manual Implementation / Configuration Steps

## 12. Rollback Notes

## 13. Change Log
