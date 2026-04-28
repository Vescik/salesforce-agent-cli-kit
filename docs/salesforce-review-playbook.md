# Salesforce Review Playbook

## Review order

1. Understand the request and changed files.
2. Inspect `sfdx-project.json` and package directories.
3. Review metadata by type: Apex, Flow, LWC, permissions, objects/fields, manifests.
4. Classify findings by severity.
5. Suggest minimal safe fixes.
6. Validate with tests, scanner, or validate-only deployment only when appropriate.

## Severity model

- BLOCKER: likely production failure, data exposure, secret leak, destructive action, or bulk/governor failure.
- HIGH: serious security, scalability, recursion, or deployment risk.
- MEDIUM: missing coverage, incomplete error handling, unclear automation order, or weak deployment notes.
- LOW: maintainability and polish issues.
- NICE TO HAVE: optional improvements.

## Salesforce-specific checks

- Apex: bulkification, SOQL/DML loops, sharing, CRUD/FLS, tests, assertions, async transaction boundaries.
- Flow: trigger timing, entry criteria, loops, Get Records, DML, subflows, Apex actions, fault paths, recursion, bulk behavior.
- LWC: data access, Apex calls, wire errors, imperative catches, loading states, accessibility, metadata exposure.
- Security: permission sets, profiles, class access, guest/community exposure, named credentials, custom permissions.
- Release: package.xml, dependencies, test level, destructive changes, rollback limits, dry-run result.

