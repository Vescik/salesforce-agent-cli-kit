const fs = require('fs');
const path = require('path');

const requiredPaths = [
  '.github/copilot-instructions.md',
  'agents/salesforce-metadata-documentation-agent.md',
  'agents/refactor-documentation-agent.md',
  'agents/subagents/salesforce-metadata-analysis-agent.md',
  'skills',
  'prompts',
  'templates',
  'scripts/scan-force-app.js',
  'scripts/generate-docs.js',
  'scripts/generate-user-story-doc.js',
  'scripts/validate-output.js',
  'output',
  'output/azure-wiki',
  'output/user-stories',
  'output/metadata-analysis',
  'output/user-stories/user-story-context.md',
  'output/metadata-analysis/metadata-summary.md',
  'output/metadata-analysis/change-summary.md',
  'output/azure-wiki/solution-documentation.md',
  'output/azure-wiki/deployment-notes.md',
  'output/azure-wiki/rollback-notes.md',
];

const requiredSkillFiles = [
  'skills/analyze-salesforce-metadata.md',
  'skills/generate-azure-wiki-documentation.md',
  'skills/generate-user-story-context.md',
  'skills/compare-metadata-changes.md',
  'skills/prepare-github-deployment.md',
  'skills/review-salesforce-flow.md',
  'skills/salesforce-metadata-analysis.md',
  'skills/azure-wiki-documentation.md',
  'skills/markdown-quality-review.md',
  'skills/git-wiki-publish.md',
];

const requiredPromptFiles = [
  'prompts/metadata-analysis.prompt.md',
  'prompts/azure-wiki-documentation.prompt.md',
  'prompts/user-story-context.prompt.md',
  'prompts/deployment-checklist.prompt.md',
];

const requiredTemplateFiles = [
  'templates/azure-wiki-page-template.md',
  'templates/user-story-azure-wiki-template.md',
  'templates/metadata-component-summary-template.md',
];

const allRequired = [
  ...requiredPaths,
  ...requiredSkillFiles,
  ...requiredPromptFiles,
  ...requiredTemplateFiles,
];

const missing = allRequired.filter((item) => !fs.existsSync(path.resolve(item)));

if (missing.length > 0) {
  console.error('Validation failed. Missing required files or folders:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log('Validation passed. Required Salesforce Copilot agent workspace files exist.');
console.log(`Checked ${allRequired.length} required paths.`);
