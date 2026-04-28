---
applyTo: "**/*.{cls,trigger,js,html,xml,permissionset-meta.xml,profile-meta.xml,flow-meta.xml,object-meta.xml,field-meta.xml}"
---

# Salesforce Code Review Instructions

Use these rules when reviewing Salesforce DX metadata, Apex, Flow, and LWC changes.

- Inspect the surrounding architecture before recommending changes.
- Treat SOQL/DML in loops, missing CRUD/FLS checks in exposed Apex, unsafe sharing, and hardcoded IDs as high-priority findings.
- Review Flow XML for trigger object, timing, entry criteria, Get Records, loops, DML, subflows, Apex actions, fault paths, recursion, and bulk behavior.
- Review LWC for loading states, error handling, Apex call handling, wire usage, accessibility basics, and hardcoded org assumptions.
- Review deployment risk: package dependencies, tests, permission changes, destructive metadata, and rollback notes.
- Prefer concrete file/line findings and minimal safe fixes.
- Do not edit files during a review unless the user asks for implementation.

