# Salesforce Code Review Checklist

## Summary

Use this severity model when reviewing Salesforce DX code and metadata. Adjust severity based on production exposure, data sensitivity, automation volume, and deployment blast radius.

## BLOCKER

- SOQL or DML inside loops in triggers, services, invocable Apex, batch/queueable code, or Flow loops.
- Exposed Apex without CRUD/FLS enforcement when reading or mutating user-visible data.
- Unsafe sharing model: implicit sharing or `without sharing` without documented reason.
- Hardcoded credentials, tokens, usernames, org URLs, or secrets.
- Real deployment or destructive metadata path hidden in an automated workflow.

## HIGH

- Trigger or Flow recursion risk without entry criteria, changed-field checks, idempotency, or guard design.
- Flow data-changing elements, subflows, or actions without fault paths where failure must be visible or recoverable.
- LWC imperative Apex calls without `catch`, wire handlers ignoring `error`, or raw stack traces shown to users.
- Hardcoded Salesforce IDs, Record Type IDs, Profile IDs, Queue IDs, or environment-specific URLs.
- Permission changes that expose Apex classes, objects, fields, tabs, or guest/community access without review notes.

## MEDIUM

- Apex tests only cover one record and do not exercise bulk behavior.
- Flow tested only with one record and no realistic import/mass-update scenario.
- Business constants or user-facing messages embedded directly in code instead of Custom Metadata or Custom Labels.
- Multiple automations on the same object with unclear order, dependencies, or ownership.
- Missing deployment notes for test level, package.xml contents, data backfill, or rollback limits.

## LOW

- Static analysis was not run when available.
- Flow elements lack descriptions in complex production automation.
- LWC has weak loading or empty states but no data/security issue.
- Apex naming or layering is inconsistent but behavior is safe.

## NICE TO HAVE

- Add focused docs for complex automations.
- Add reusable test factories.
- Add package.xml generation notes.
- Add examples for safe validate-only deployment.

## Source links

- Salesforce Developers: [Apex Code Best Practices](https://developer.salesforce.com/ja/wiki/apex_code_best_practices)
- Salesforce Developers Blog: [Working with Salesforce Records Using SOQL and DML](https://developer.salesforce.com/blogs/2022/08/working-with-salesforce-records-using-soql-and-dml)
- Salesforce Developers: [Secure Apex Classes](https://developer.salesforce.com/docs/platform/lwc/guide/apex-security)
- Salesforce Developers: [Handle Errors from Apex](https://developer.salesforce.com/docs/platform/lwc/guide/apex-error-handling.html)
- Salesforce Developers Blog: [LWC Error Handling Best Practices](https://developer.salesforce.com/blogs/2020/08/error-handling-best-practices-for-lightning-web-components)
- Salesforce Developers: [Flow Scanner Rules Reference](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/rules-flow.html)

