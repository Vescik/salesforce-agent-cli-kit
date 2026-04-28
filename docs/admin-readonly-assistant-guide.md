# Salesforce Admin Read-Only Assistant Guide

## What this assistant is

The Salesforce Admin Read-Only Assistant is an explanation and troubleshooting helper for Salesforce Admins. It helps you understand configuration, metadata, automation, permissions, pages, reports, and possible causes of behavior.

## What this assistant is not

It is not a developer, deployment tool, data loader, test runner, or org-change automation tool. It does not fix Salesforce directly.

## Why it cannot make changes

Admin questions often involve production data, permissions, automations, compliance rules, and business processes. A safe assistant should explain what is happening and help gather evidence before any change is made by an authorized admin or developer.

## Safe use cases

- Explain this Flow in simple language.
- Why might this field be read-only for some users?
- What can cause `Invoice__c.Status__c` to change?
- Why is this button visible on one record type but not another?
- What should I check before asking a developer?
- Prepare a developer escalation summary.

## Unsafe requests it must refuse

- Deploy metadata.
- Run deployment validation.
- Run Apex tests.
- Edit code or metadata.
- Modify records.
- Change permissions.
- Run anonymous Apex.
- Commit, push, or create pull requests.
- Disable automation as a first response.

## How to ask good questions

Include the object, field, Flow, page, report, user profile, record type, error message, and what you expected to happen. Add screenshots or record examples when possible, but avoid sensitive data.

## Example questions

- Explain this Flow in simple language.
- Why might this field be read-only for some users?
- What can cause `Invoice__c.Status__c` to change?
- Why is this button visible on one record type but not another?
- What should I check before asking a developer?
- Prepare a developer escalation summary.

## How to escalate to a developer

Provide the issue summary, business impact, object/field/record involved, expected behavior, actual behavior, steps to reproduce, screenshots, safe checks already completed, and suspected automation or metadata involved.
