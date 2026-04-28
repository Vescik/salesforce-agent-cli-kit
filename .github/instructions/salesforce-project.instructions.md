# Salesforce Project Instructions

These instructions apply to Salesforce DX repositories.

## General

- Prefer minimal changes.
- Inspect existing architecture before editing.
- Do not deploy automatically.
- Use CLI validation where possible.
- Keep metadata structure stable.
- Avoid hardcoded IDs.
- Avoid destructive operations.

## Salesforce Flow

When working with Flow:

- Identify whether it is before-save or after-save.
- Check entry criteria.
- Check whether Get Records or Update Records happen inside loops.
- Check recursion risk.
- Check if Formula Field, Validation Rule, Roll-Up Summary, Scheduled Flow, Platform Event, or Apex is more appropriate.
- Do not rewrite large Flow XML files unless necessary.

## Apex

When working with Apex:

- Preserve trigger handler architecture if it exists.
- Avoid SOQL and DML inside loops.
- Bulkify all logic.
- Add or update tests.
- Respect sharing model.
- Avoid hardcoded IDs.

## LWC

When working with LWC:

- Preserve public API.
- Keep error handling visible.
- Check Apex imports.
- Check permissions and field access assumptions.
- Run lint/tests if available.

## Final Response

Always include:

- what was checked
- what changed
- commands run
- validation result
- risks or assumptions
