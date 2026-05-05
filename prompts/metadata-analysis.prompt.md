---
description: Analyze Salesforce metadata in force-app and generate a structured metadata summary.
---

# Task

Analyze the Salesforce metadata located in `{{FORCE_APP_PATH}}`.

# Inputs

- Description: `{{DESCRIPTION}}`
- Acceptance Criteria: `{{ACCEPTANCE_CRITERIA}}`
- Force App Path: `{{FORCE_APP_PATH}}`

# Instructions

1. Identify all relevant components related to the Description and Acceptance Criteria.
2. Explain what each component does.
3. Explain how each component works technically.
4. Explain what business process each component supports.
5. Detect dependencies between objects, fields, Flows, validation rules, layouts, permission sets, Apex, and LWC.
6. Identify deployment risks and testing recommendations.
7. Mark uncertainty with `Assumption:` or `Requires confirmation:`.

# Expected Output

Save or produce Azure Wiki compatible Markdown with:

- Component name
- Component type
- File path
- Business purpose
- Technical behavior
- Dependencies
- Security impact
- Automation impact
- Deployment risk
- Testing recommendations
