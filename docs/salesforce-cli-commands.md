# Salesforce CLI Commands

## Basic repository inspection

```bash
pwd
ls
find . -maxdepth 3 -type f | sed 's#^\./##' | sort | head -200
git status --short
git branch
```

## Salesforce DX project inspection

```bash
cat sfdx-project.json
sf org list
sf project list metadata
```

## Find Salesforce metadata

```bash
find force-app -type f | sort
find . -type f -name "*.flow-meta.xml" | sort
find force-app -type f \( -name "*.cls" -o -name "*.trigger" \) | sort
find force-app/main/default/lwc -maxdepth 3 -type f | sort
```

## Inspect Flows

```bash
grep -R "<object>Account</object>" force-app/main/default/flows -n || true
grep -n "<label>\|<processType>\|<start>\|<object>\|<triggerType>\|<recordTriggerType>" path/to/flow.flow-meta.xml
grep -n "<recordLookups>\|<recordUpdates>\|<recordCreates>\|<loops>\|<decisions>\|<subflows>\|<actionCalls>" path/to/flow.flow-meta.xml
```

## Inspect Apex

```bash
grep -R "SELECT .* FROM" force-app/main/default/classes force-app/main/default/triggers -n || true
grep -R "insert \|update \|delete \|upsert \|Database." force-app/main/default/classes force-app/main/default/triggers -n || true
grep -R "without sharing\|with sharing\|inherited sharing" force-app/main/default/classes -n || true
grep -R "Test.startTest\|@isTest\|@TestSetup" force-app/main/default/classes -n || true
```

## Inspect LWC

```bash
grep -R "@salesforce/apex\|@wire\|getRecord\|updateRecord\|createRecord\|deleteRecord" force-app/main/default/lwc -n || true
npm run lint
npm test
```

## Generate manifest

```bash
sf project generate manifest --source-dir force-app/main/default --name package
cat package.xml
```

## Validate deployment

```bash
sf project deploy validate --source-dir force-app/main/default --test-level NoTestRun
sf project deploy validate --source-dir force-app/main/default --test-level RunLocalTests
sf project deploy validate --source-dir force-app/main/default --test-level RunSpecifiedTests --tests TestClassName
```

## Run Apex tests

```bash
sf apex list test
sf apex run test --test-level RunLocalTests --result-format human --wait 30
sf apex run test --tests TestClassName --result-format human --wait 30
```

## Query Salesforce data

```bash
sf data query --query "SELECT Id, Name FROM Account LIMIT 10"
sf data query --use-tooling-api --query "SELECT Id, DeveloperName FROM FlowDefinitionView LIMIT 20"
```

## Commands to avoid unless explicitly requested

```bash
sf project deploy start
sf org delete scratch
rm -rf
git reset --hard
git clean -fd
```
