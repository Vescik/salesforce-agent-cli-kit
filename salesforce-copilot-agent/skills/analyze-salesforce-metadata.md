# Skill: Analyze Salesforce Metadata

## Purpose

Analyze Salesforce metadata inside `force-app/` and produce structured component summaries for documentation and review.

## Supported Metadata Types

- objects
- fields
- validationRules
- flows
- layouts
- permissionsets
- profiles
- classes
- triggers
- lwc
- aura
- tabs
- applications
- customMetadata
- labels
- flexipages
- quickActions
- recordTypes

## Extracted Fields

For each relevant component, extract:

- `componentName`
- `componentType`
- `filePath`
- `businessPurpose`
- `technicalPurpose`
- `dependencies`
- `relatedObjects`
- `relatedFields`
- `automationImpact`
- `securityImpact`
- `deploymentRisk`
- `testingRecommendations`

## Reference Detection Rules

- Flow references object/field through XML start elements, record operations, conditions, assignments, and variables.
- Validation rule references fields in formula XML.
- Layout uses fields, buttons, actions, sections, and related lists.
- Permission set grants access to objects, fields, Apex classes, Flows, tabs, and custom permissions.
- Apex references object APIs, field APIs, SOQL, DML, async patterns, sharing mode, and test classes.
- LWC references Apex methods, object APIs, field APIs, wire adapters, and exposed targets.

## Output

Save analysis to:

`output/metadata-analysis/metadata-summary.md`

Use Azure Wiki compatible Markdown.
