const fs = require('fs');
const path = require('path');

const files = [
  {
    path: 'output/user-stories/user-story-context.md',
    content: `# User Story Context

## User Story

Requires confirmation: Provide Description and Acceptance Criteria to generate the final user story context.

## Background

Requires confirmation: Business background was not provided.

## Business Problem

Requires confirmation: Business problem was not provided.

## Expected Outcome

Requires confirmation: Expected outcome was not provided.

## Acceptance Criteria Summary

Requires confirmation: Acceptance Criteria were not provided.

## Salesforce Impact

Assumption: Salesforce metadata impact should be determined from force-app analysis.

## Metadata Components Likely Involved

Requires confirmation: Run metadata analysis and provide story details.

## Dependencies

Requires confirmation: Dependencies should be confirmed from metadata analysis.

## Assumptions

- Description and Acceptance Criteria are required for final content.

## Questions / Clarifications

- What is the target persona?
- What Salesforce objects and fields are in scope?
- What acceptance criteria are mandatory for release?

## Testing Notes

Requires confirmation: Testing notes should be based on final acceptance criteria.
`,
  },
  {
    path: 'output/metadata-analysis/metadata-summary.md',
    content: `# Metadata Summary

## Summary

Run \`node scripts/scan-force-app.js\` to produce \`force-app-scan.json\`, then use the metadata analysis prompt to generate detailed component documentation.

## Components

Requires confirmation: No component analysis has been generated yet.
`,
  },
  {
    path: 'output/metadata-analysis/change-summary.md',
    content: `# Change Summary

## Added Files

Requires confirmation: Run Git comparison.

## Modified Files

Requires confirmation: Run Git comparison.

## Deleted Files

Requires confirmation: Run Git comparison.

## Deployment Risk

Requires confirmation: Analyze changed metadata.

## Testing Impact

Requires confirmation: Analyze changed metadata and acceptance criteria.
`,
  },
  {
    path: 'output/metadata-analysis/flow-review.md',
    content: `# Flow Review

## Summary

Run the Flow review skill against relevant Flow XML files in force-app.

## Findings

Requires confirmation: No Flow XML has been analyzed yet.
`,
  },
  {
    path: 'output/azure-wiki/solution-documentation.md',
    content: `# Solution Documentation

## 1. Business Context

Requires confirmation: Provide User Story context.

## 2. Scope of Change

Requires confirmation: Provide metadata analysis and change summary.

## 3. Metadata Components

Requires confirmation: Run metadata analysis.

## 4. Component Details

Requires confirmation: Run metadata analysis.

## 5. Process / Automation Logic

Requires confirmation: Analyze Flow, Apex, validation rules, and related automation.

## 6. Security and Permissions

Requires confirmation: Analyze permission sets, profiles, Apex access, and field-level security.

## 7. Dependencies

Requires confirmation: Analyze references between metadata components.

## 8. Risks and Assumptions

- Assumption: This placeholder must be replaced with story-specific analysis.

## 9. Testing Scenarios

Requires confirmation: Generate from Acceptance Criteria.

## 10. Deployment Notes

Requires confirmation: Generate from change summary.

## 11. Rollback Notes

Requires confirmation: Generate from deployment strategy.

## 12. Change Log

Requires confirmation: Generate from Git diff.
`,
  },
  {
    path: 'output/azure-wiki/deployment-notes.md',
    content: `# Deployment Notes

## GitHub Deployment Checklist

- [ ] Confirm target repository URL.
- [ ] Confirm target branch.
- [ ] Confirm no unrelated user changes are staged.
- [ ] Run output validation.
- [ ] Commit generated setup.
- [ ] Push only after repository and branch are confirmed.

## Placeholder Commands

\`\`\`bash
git status
git remote -v
git branch --show-current
git add .
git commit -m "Add Salesforce Copilot metadata documentation agent"
git push origin {{TARGET_BRANCH}}
\`\`\`

Do not run push commands until \`GITHUB_REPOSITORY_URL\` and \`TARGET_BRANCH\` are confirmed.
`,
  },
  {
    path: 'output/azure-wiki/rollback-notes.md',
    content: `# Rollback Notes

## Rollback Strategy

Requires confirmation: Define rollback based on changed metadata and deployment method.

## Notes

- Document metadata components that can be reverted through source control.
- Confirm whether data correction is required.
- Confirm whether activation state changes are involved.
`,
  },
];

for (const file of files) {
  const fullPath = path.resolve(file.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  if (fs.existsSync(fullPath) && !process.argv.includes('--overwrite')) {
    console.log(`Skipping existing file: ${file.path}`);
    continue;
  }
  fs.writeFileSync(fullPath, file.content);
  console.log(`Created ${file.path}`);
}
