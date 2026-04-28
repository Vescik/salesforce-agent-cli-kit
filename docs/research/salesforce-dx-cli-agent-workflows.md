# Salesforce DX CLI Agent Workflows

## Summary

Salesforce DX agents should inspect the local project first, detect package directories from `sfdx-project.json`, locate metadata by type, prefer metadata inspection over org data queries, and separate read-only commands from validation and destructive commands.

## Safe read-only commands

```bash
pwd
ls -la
find . -maxdepth 4 -type f | sort
git status --short
git diff
cat sfdx-project.json
sf org list --json
sf config get target-org target-dev-hub --json
sf project deploy preview --target-org <alias>
sf apex list test --target-org <alias>
sf data query --target-org <alias> --json --query "SELECT QualifiedApiName, Label FROM EntityDefinition ORDER BY QualifiedApiName LIMIT 200"
sf data query --target-org <alias> --use-tooling-api --json --query "SELECT Id, DeveloperName, MasterLabel, ProcessType, Status FROM Flow ORDER BY DeveloperName LIMIT 200"
```

## Validation commands

```bash
npm test
npm run lint
npm run build
sf scanner run
sf apex run test --target-org <alias> --test-level RunLocalTests --wait 30 --result-format human
sf project deploy validate --target-org <alias> --source-dir force-app --test-level RunLocalTests --wait 30
sf project deploy validate --target-org <alias> --manifest manifest/package.xml --test-level RunSpecifiedTests --tests MyClassTest --wait 30
sf project deploy start --target-org <alias> --source-dir force-app --dry-run --test-level RunLocalTests --wait 30
```

## Dangerous commands requiring explicit approval

```bash
sf project deploy start --target-org <alias> --source-dir force-app
sf project retrieve start --target-org <alias>
sf project delete source --target-org <alias> --metadata ApexClass:OldClass
sf project reset tracking --target-org <alias>
sf org create scratch --definition-file config/project-scratch-def.json --alias <alias>
sf org delete scratch --target-org <alias>
sf org create sandbox --target-org <prod-alias> --alias <sandbox-alias>
sf org delete sandbox --target-org <sandbox-alias>
sf data create record --target-org <alias> --sobject Account --values "Name=Test"
sf data update record --target-org <alias> --sobject Account --record-id <id> --values "Name=Changed"
sf data delete record --target-org <alias> --sobject Account --record-id <id>
```

## Flow analysis commands

```bash
find force-app -path "*/flows/*.flow-meta.xml" -type f | sort
rg "<processType>|<status>|<recordTriggerType>|<triggerType>|<start>|<scheduledPaths>|<actionCalls>|<subflows>|<recordCreates>|<recordUpdates>|<recordDeletes>|<loops>" force-app/main/default/flows
xmllint --xpath "//*[local-name()='processType' or local-name()='status' or local-name()='recordTriggerType']/text()" force-app/main/default/flows/My_Flow.flow-meta.xml
```

## Apex analysis commands

```bash
find force-app -path "*/classes/*.cls" -type f | sort
rg "with sharing|without sharing|inherited sharing|Database\.|@AuraEnabled|callout|SOQL|SELECT " force-app/main/default/classes
rg "insert |update |upsert |delete |undelete |merge " force-app/main/default/classes
```

## LWC analysis commands

```bash
find force-app -path "*/lwc/*/*.js-meta.xml" -type f | sort
rg "<isExposed>|<target>|<targetConfig>|<apiVersion>|<capability>" force-app/main/default/lwc
rg "@api|@wire|import .* from 'lightning/|createRecord|updateRecord|deleteRecord" force-app/main/default/lwc
```

## Permission/security analysis commands

```bash
find force-app -path "*/permissionsets/*.permissionset-meta.xml" -type f | sort
rg "<objectPermissions>|<fieldPermissions>|<classAccesses>|<userPermissions>|<tabSettings>|<recordTypeVisibilities>" force-app/main/default/permissionsets
rg -n -i "password|secret|token|client_secret|refresh_token|access_token" force-app .github docs scripts || true
```

## Source links

- Salesforce Developers: [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli/)
- Salesforce Developers: [Salesforce CLI Plugin Overview](https://developer.salesforce.com/docs/platform/salesforce-cli-plugin/guide/conceptual-overview.html)
- Salesforce CLI GitHub: [plugin-deploy-retrieve](https://github.com/salesforcecli/plugin-deploy-retrieve)
- Salesforce CLI GitHub: [plugin-org](https://github.com/salesforcecli/plugin-org)
- Salesforce Developers: [LWC XML Configuration Tags](https://developer.salesforce.com/docs/platform/lwc/guide/reference-configuration-tags)
- Salesforce Developers Blog: [Manipulate data with the Salesforce CLI](https://developer.salesforce.com/blogs/2024/02/manipulate-data-with-the-salesforce-cli)
- Salesforce Developers: [Metadata Coverage Report](https://developer.salesforce.com/docs/success/metadata-coverage-report/references/metadata-types/metadata-types.html)

