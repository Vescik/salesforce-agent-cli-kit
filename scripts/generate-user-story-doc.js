const fs = require('fs');
const path = require('path');

const DEFAULT_WIKI_REPO_PATH = '../azure-wiki-repo';
const DEFAULT_WIKI_DOCS_PATH = 'User-Stories';

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') {
      args.help = true;
      continue;
    }
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true;
    args[key] = value;
    if (value !== true) i += 1;
  }
  return args;
}

function usage() {
  return `Usage:
node scripts/generate-user-story-doc.js \\
  --story-id "US-000123" \\
  --title "Prevent invoice status from changing unexpectedly" \\
  --ado-work-item-json "input/ado-work-items/12345.json" \\
  --description-file "input/story-description.md" \\
  --acceptance-criteria-file "input/acceptance-criteria.md" \\
  --force-app-path "force-app" \\
  --wiki-repo-path "../azure-wiki-repo" \\
  --wiki-docs-path "User-Stories"

Optional:
  --config "config.json"

Notes:
- Copy config.example.json to config.json for local repo paths.
- Use --ado-work-item-json for normalized Azure DevOps Work Item data fetched by the Azure DevOps User Story Fetcher agent.
- The wiki repo path must already exist.
- Existing documentation is not overwritten. A proposed update file is created instead.
- This script does not commit or push. Publishing requires explicit user approval.`;
}

function readConfig(configPath) {
  const resolvedPath = configPath || 'config.json';
  if (!fs.existsSync(resolvedPath)) return {};
  const raw = fs.readFileSync(resolvedPath, 'utf8');
  return JSON.parse(raw);
}

function readJsonFile(filePath) {
  if (!filePath) return {};
  if (!fs.existsSync(filePath)) {
    throw new Error(`JSON file does not exist: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function readOptionalFile(filePath) {
  if (!filePath) return '';
  if (!fs.existsSync(filePath)) {
    throw new Error(`Input file does not exist: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8').trim();
}

function hasArg(args, key) {
  return Object.prototype.hasOwnProperty.call(args, key);
}

function stripHtml(value) {
  return String(value || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeAdoWorkItem(raw) {
  if (!raw || Object.keys(raw).length === 0) return {};
  const fields = raw.fields || {};
  const id = raw.id || fields['System.Id'] || '';
  const title = raw.title || fields['System.Title'] || '';
  const description = raw.description || fields['System.Description'] || '';
  const acceptanceCriteria = raw.acceptanceCriteria || fields['Microsoft.VSTS.Common.AcceptanceCriteria'] || '';
  const workItemType = raw.workItemType || fields['System.WorkItemType'] || '';
  const state = raw.state || fields['System.State'] || '';
  const tags = raw.tags || fields['System.Tags'] || '';
  const url = raw.url || raw._links?.html?.href || '';

  return {
    id: id ? String(id) : '',
    title: stripHtml(title),
    description: stripHtml(description),
    acceptanceCriteria: stripHtml(acceptanceCriteria),
    workItemType: stripHtml(workItemType),
    state: stripHtml(state),
    tags: stripHtml(tags),
    url,
  };
}

function kebabCase(value) {
  return String(value || 'untitled')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'untitled';
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (entry.isFile()) return [fullPath];
    return [];
  });
}

function inferComponent(filePath) {
  const normalized = filePath.split(path.sep).join('/');
  const fileName = path.basename(filePath);
  const strip = fileName
    .replace(/\.flow-meta\.xml$/, '')
    .replace(/\.object-meta\.xml$/, '')
    .replace(/\.field-meta\.xml$/, '')
    .replace(/\.validationRule-meta\.xml$/, '')
    .replace(/\.permissionset-meta\.xml$/, '')
    .replace(/\.profile-meta\.xml$/, '')
    .replace(/\.layout-meta\.xml$/, '')
    .replace(/\.flexipage-meta\.xml$/, '')
    .replace(/\.cls$/, '')
    .replace(/\.trigger$/, '')
    .replace(/\.[^.]+$/, '');

  if (normalized.includes('/flows/')) return { type: 'Flow', name: strip };
  if (normalized.includes('/classes/') && fileName.endsWith('.cls')) return { type: 'Apex Class', name: strip };
  if (normalized.includes('/triggers/') && fileName.endsWith('.trigger')) return { type: 'Apex Trigger', name: strip };
  if (normalized.includes('/objects/') && normalized.includes('/fields/')) return { type: 'Custom Field', name: strip };
  if (normalized.includes('/objects/') && normalized.includes('/validationRules/')) return { type: 'Validation Rule', name: strip };
  if (normalized.includes('/objects/') && fileName.endsWith('.object-meta.xml')) return { type: 'Custom Object', name: strip };
  if (normalized.includes('/permissionsets/')) return { type: 'Permission Set', name: strip };
  if (normalized.includes('/profiles/')) return { type: 'Profile', name: strip };
  if (normalized.includes('/layouts/')) return { type: 'Layout', name: strip };
  if (normalized.includes('/flexipages/')) return { type: 'Lightning Page', name: strip };
  if (normalized.includes('/lwc/')) {
    const parts = normalized.split('/');
    return { type: 'Lightning Web Component', name: parts[parts.indexOf('lwc') + 1] || strip };
  }
  if (normalized.includes('/aura/')) {
    const parts = normalized.split('/');
    return { type: 'Aura Component', name: parts[parts.indexOf('aura') + 1] || strip };
  }
  return { type: 'Metadata', name: strip };
}

function extractKeywords(...values) {
  const stop = new Set(['the', 'and', 'or', 'for', 'with', 'from', 'that', 'this', 'should', 'when', 'where', 'into', 'user', 'story']);
  const words = values
    .join(' ')
    .split(/[^a-zA-Z0-9_]+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 3 && !stop.has(word.toLowerCase()));
  return [...new Set(words)].slice(0, 40);
}

function findRelevantComponents(forceAppPath, keywords, changedFiles) {
  const allFiles = walk(forceAppPath).sort();
  const changedSet = new Set((changedFiles || []).map((file) => file.trim()).filter(Boolean));
  const lowerKeywords = keywords.map((keyword) => keyword.toLowerCase());

  return allFiles
    .map((filePath) => {
      const component = inferComponent(filePath);
      const normalized = filePath.split(path.sep).join('/');
      const pathHit = lowerKeywords.some((keyword) => normalized.toLowerCase().includes(keyword));
      const changedHit = changedSet.has(normalized) || changedSet.has(filePath);
      let contentHit = false;
      try {
        const content = fs.readFileSync(filePath, 'utf8').slice(0, 200000).toLowerCase();
        contentHit = lowerKeywords.some((keyword) => content.includes(keyword));
      } catch (_) {
        contentHit = false;
      }
      const relevant = pathHit || contentHit || changedHit;
      return {
        ...component,
        path: normalized,
        relevance: changedHit ? 'Changed file supplied by user' : relevant ? 'Matched story keyword or metadata content' : 'Low confidence context file',
        confidence: changedHit ? 'High' : relevant ? 'Medium' : 'Low',
        relevant,
      };
    })
    .filter((item) => item.relevant)
    .slice(0, 80);
}

function splitAcceptanceCriteria(text) {
  if (!text) return [];
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, '').trim())
    .filter(Boolean);
}

function tableRows(rows, fallback) {
  if (!rows.length) return fallback;
  return rows.join('\n');
}

function buildMarkdown({ storyId, title, description, acceptanceCriteria, implementationNotes, components, sourceUrl, adoWorkItem }) {
  const today = new Date().toISOString().slice(0, 10);
  const reference = storyId || 'Missing - generated as draft';
  const acItems = splitAcceptanceCriteria(acceptanceCriteria);
  const componentRows = components.map((component) =>
    `| ${component.type} | ${component.name} | ${component.name} | ${component.path} | Requires confirmation | ${component.confidence} |`
  );
  const acRows = acItems.map((ac, index) =>
    `| ${index + 1} | ${ac} | Requires Review | Requires confirmation from metadata and human review. |`
  );
  const coverageRows = acItems.map((ac, index) =>
    `| AC${index + 1} | ${ac} | ${components[0] ? components[0].name : 'Not found'} | Requires Review | Requires manual validation against implementation. |`
  );

  return `# ${reference} - ${title || 'Untitled User Story'}

## 1. User Story Reference

| Field | Value |
|---|---|
| User Story ID | ${reference} |
| Title | ${title || 'Requires confirmation'} |
| Source / Link | ${sourceUrl || 'Requires confirmation'} |
| Azure DevOps Type | ${adoWorkItem.workItemType || 'Requires confirmation'} |
| Azure DevOps State | ${adoWorkItem.state || 'Requires confirmation'} |
| Azure DevOps Tags | ${adoWorkItem.tags || 'Requires confirmation'} |
| Documentation Status | Draft |
| Created By | Documentation Agent |
| Created Date | ${today} |
| Last Updated | ${today} |

## 2. Business Context

${description || 'Requires confirmation: User Story description was not provided.'}

## 3. User Story Description

${description || 'Requires confirmation: User Story description was not provided.'}

## 4. Acceptance Criteria

| # | Acceptance Criterion | Coverage Status | Notes |
|---|---|---|---|
${tableRows(acRows, '| - | Requires confirmation | Requires Review | Acceptance Criteria were not provided. |')}

## 5. Component and Artifact Inventory

| Component Type | Component Name | API Name | Path | Purpose | Relevance |
|---|---|---|---|---|---|
${tableRows(componentRows, '| - | No relevant component identified | - | - | Requires confirmation | Low |')}

## 6. Technical Implementation Overview

Confirmed from metadata: ${components.length} potentially relevant component(s) were identified from local metadata search.

Inferred behavior: The implementation appears related to the provided User Story keywords. Detailed behavior requires human review of the listed components.

${implementationNotes ? `Implementation notes from user:\n\n${implementationNotes}` : 'Requires confirmation: No implementation notes were provided.'}

## 7. Detailed Metadata Analysis

### 7.1 Flows

${componentSection(components, 'Flow')}

### 7.2 Apex

${componentSection(components, 'Apex')}

### 7.3 Objects and Fields

${componentSection(components, 'Object')}
${componentSection(components, 'Field')}

### 7.4 Validation Rules

${componentSection(components, 'Validation Rule')}

### 7.5 Permission Sets / Security

${componentSection(components, 'Permission')}

### 7.6 UI Components

${componentSection(components, 'Lightning')}
${componentSection(components, 'Aura')}
${componentSection(components, 'Layout')}

## 8. Acceptance Criteria Coverage Analysis

| AC # | Requirement | Implementation Evidence | Status | Notes |
|---|---|---|---|---|
${tableRows(coverageRows, '| - | Requires confirmation | Not found | Requires Review | Acceptance Criteria were not provided. |')}

## 9. Data Model Impact

${components.some((c) => ['Custom Object', 'Custom Field', 'Validation Rule'].includes(c.type))
    ? 'Confirmed from metadata: Object, field, or validation metadata appears in the relevant component list.'
    : 'No direct data model changes were identified in metadata. Requires confirmation if data model changes are expected.'}

## 10. Automation Impact

${components.some((c) => ['Flow', 'Apex Trigger', 'Apex Class'].includes(c.type))
    ? 'Confirmed from metadata: Automation-related metadata appears in the relevant component list.'
    : 'No direct automation changes were identified in metadata. Requires confirmation if automation changes are expected.'}

## 11. Security and Access Impact

${components.some((c) => ['Permission Set', 'Profile'].includes(c.type))
    ? 'Confirmed from metadata: Security metadata appears in the relevant component list.'
    : 'Security impact requires manual confirmation because no directly relevant permission metadata was identified.'}

## 12. UI / UX Impact

${components.some((c) => ['Layout', 'Lightning Page', 'Lightning Web Component', 'Aura Component'].includes(c.type))
    ? 'Confirmed from metadata: UI metadata appears in the relevant component list.'
    : 'No direct UI changes were identified.'}

## 13. Testing Notes

| Scenario | Steps | Expected Result | Related AC |
|---|---|---|---|
| Happy path | Execute the expected business process with valid data. | The process completes successfully. | AC1 |
| Negative path | Attempt the restricted or invalid scenario. | The system blocks or handles it according to the Acceptance Criteria. | AC1 / AC2 |
| Regression | Repeat existing valid behavior around the same object and fields. | Existing valid behavior continues working. | AC3 |
| Permission/security | Test with expected user personas. | Access and behavior match the intended permission model. | Requires Review |

## 14. Deployment Notes

- Confirm all listed metadata components are included in the deployment scope.
- Confirm dependencies before deployment.
- Run relevant Apex, LWC, lint, scanner, and validate-only checks as appropriate.
- Do not deploy from this documentation workflow.

## 15. Risks, Assumptions, and Open Questions

### Risks

| Risk | Impact | Recommendation |
|---|---|---|
| Metadata relevance is keyword-based | Relevant components may be missed | Review changed files and known implementation notes manually |
| Coverage requires review | Documentation may overstate implementation support | Validate every Acceptance Criterion with a human reviewer |

### Assumptions

| Assumption | Reason | Requires Confirmation |
|---|---|---|
| Listed components are related to the User Story | They matched story keywords, changed files, or metadata content | Yes |

### Open Questions

| Question | Owner | Notes |
|---|---|---|
| Which components were intentionally changed for this User Story? | Developer | Confirm changed files or commit range |
| Are all Acceptance Criteria covered by visible metadata? | Developer / QA | Validate against implementation and tests |

## 16. Review Checklist

- [ ] User Story reference is correct
- [ ] Acceptance Criteria are listed
- [ ] Relevant metadata components are listed
- [ ] Technical behavior is clear
- [ ] Unsupported assumptions are clearly marked
- [ ] Testing scenarios are included
- [ ] Security impact is reviewed
- [ ] Deployment notes are reviewed
- [ ] Documentation approved for Azure Wiki

## 17. Change Log

| Date | Author | Change |
|---|---|---|
| ${today} | Documentation Agent | Initial draft generated |
`;
}

function componentSection(components, typeNeedle) {
  const matches = components.filter((component) => component.type.includes(typeNeedle));
  if (!matches.length) return 'No directly relevant metadata found.';
  return matches.map((component) => `#### ${component.name}

| Field | Value |
|---|---|
| Type | ${component.type} |
| Path | ${component.path} |
| Relevance | ${component.relevance} |
| Confidence | ${component.confidence} |

Technical behavior:
- Requires confirmation: Review the metadata file to confirm exact runtime behavior.`).join('\n\n');
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    return;
  }

  const config = readConfig(args.config);
  const adoWorkItem = normalizeAdoWorkItem(readJsonFile(args['ado-work-item-json']));
  const title = hasArg(args, 'title') ? args.title : adoWorkItem.title || 'Untitled User Story';
  const storyId = hasArg(args, 'story-id') ? args['story-id'] : adoWorkItem.id || '';
  const description = hasArg(args, 'description')
    ? args.description
    : hasArg(args, 'description-file')
      ? readOptionalFile(args['description-file'])
      : adoWorkItem.description || '';
  const acceptanceCriteria = hasArg(args, 'acceptance-criteria')
    ? args['acceptance-criteria']
    : hasArg(args, 'acceptance-criteria-file')
      ? readOptionalFile(args['acceptance-criteria-file'])
      : adoWorkItem.acceptanceCriteria || '';
  const implementationNotes = args['implementation-notes'] || readOptionalFile(args['implementation-notes-file']);
  const forceAppPath = args['force-app-path'] || config.forceAppPath || 'force-app';
  const wikiRepoPath = args['wiki-repo-path'] || config.wikiRepoPath || DEFAULT_WIKI_REPO_PATH;
  const wikiDocsPath = args['wiki-docs-path'] || config.wikiDocsPath || DEFAULT_WIKI_DOCS_PATH;
  const changedFiles = args['changed-files'] ? String(args['changed-files']).split(',') : [];

  if (!fs.existsSync(wikiRepoPath)) {
    console.error(`Azure Wiki repo path does not exist: ${wikiRepoPath}`);
    console.error('Create or clone the Azure Wiki Git repo first, or pass --wiki-repo-path.');
    process.exit(1);
  }

  const keywords = extractKeywords(title, description, acceptanceCriteria, implementationNotes, changedFiles.join(' '));
  const components = findRelevantComponents(forceAppPath, keywords, changedFiles);
  const folderName = storyId || `draft-${kebabCase(title)}`;
  const fileName = `${storyId || 'draft'}-${kebabCase(title)}.md`;
  const targetDir = path.join(wikiRepoPath, wikiDocsPath, folderName);
  let targetFile = path.join(targetDir, fileName);

  fs.mkdirSync(targetDir, { recursive: true });

  if (fs.existsSync(targetFile)) {
    const parsed = path.parse(targetFile);
    targetFile = path.join(parsed.dir, `${parsed.name}.proposed-update${parsed.ext}`);
    console.warn(`Target documentation already exists. Writing proposed update instead: ${targetFile}`);
  }

  const markdown = buildMarkdown({
    storyId,
    title,
    description,
    acceptanceCriteria,
    implementationNotes,
    components,
    sourceUrl: adoWorkItem.url,
    adoWorkItem,
  });

  fs.writeFileSync(targetFile, markdown);

  console.log('Documentation draft generated.');
  console.log(`File: ${targetFile}`);
  if (adoWorkItem.id) {
    console.log(`Azure DevOps Work Item: ${adoWorkItem.id}`);
    console.log(`Description found: ${description ? 'yes' : 'no'}`);
    console.log(`Acceptance Criteria found: ${acceptanceCriteria ? 'yes' : 'no'}`);
  }
  console.log(`Relevant metadata components detected: ${components.length}`);
  console.log('Review the generated Markdown file.');
  console.log('To approve publishing to Azure Wiki, reply exactly: APPROVE WIKI PUSH');
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
