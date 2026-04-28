---
applyTo: "**/*.{cls,trigger,js,html,xml,permissionset-meta.xml,profile-meta.xml,sharingRules-meta.xml}"
---

# Salesforce Security Instructions

Use these rules for Salesforce security review and implementation.

- Apex runs in system mode by default; record sharing, object permissions, and field permissions must be considered separately.
- Prefer explicit `with sharing` or `inherited sharing`; require justification for `without sharing`.
- For exposed Apex (`@AuraEnabled`, `@InvocableMethod`, REST, Visualforce controllers), verify CRUD/FLS with user-mode operations, `Security.stripInaccessible`, or describe checks.
- Prefer Lightning Data Service for UI data operations when it fits the use case.
- Review permission sets, profiles, Apex class access, custom permissions, named credentials, and guest/community access when metadata changes expose functionality.
- Flag hardcoded IDs, secrets, tokens, usernames, org URLs, and sensitive sample data.
- Do not query sensitive org data unless necessary and explicitly justified.

