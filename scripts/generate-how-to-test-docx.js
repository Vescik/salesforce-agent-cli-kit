const fs = require('fs');
const path = require('path');
const {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} = require('docx');

const DEFAULT_OUTPUT_DIR = 'output/test-docs';

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
node scripts/generate-how-to-test-docx.js \\
  --story-id "US-000123" \\
  --title "Prevent invoice status from changing unexpectedly" \\
  --description-file "input/story-description.md" \\
  --acceptance-criteria-file "input/acceptance-criteria.md" \\
  --output-dir "output/test-docs"

Optional:
  --config "config.json"
  --description "inline description"
  --acceptance-criteria "inline acceptance criteria"
  --ado-work-item-json "input/ado-work-items/12345.json"

Notes:
- The output file name is HOW_TO_TEST_[USER STORY ID].docx.
- Existing files are not overwritten. A proposed update file is created instead.
- This script does not connect to Salesforce, Azure DevOps, or Azure Wiki.`;
}

function readConfig(configPath) {
  const resolvedPath = configPath || 'config.json';
  if (!fs.existsSync(resolvedPath)) return {};
  return JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
}

function readJsonFile(filePath) {
  if (!filePath) return {};
  if (!fs.existsSync(filePath)) throw new Error(`JSON file does not exist: ${filePath}`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readOptionalFile(filePath) {
  if (!filePath) return '';
  if (!fs.existsSync(filePath)) throw new Error(`Input file does not exist: ${filePath}`);
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
  return {
    id: String(raw.id || fields['System.Id'] || ''),
    title: stripHtml(raw.title || fields['System.Title'] || ''),
    description: stripHtml(raw.description || fields['System.Description'] || ''),
    acceptanceCriteria: stripHtml(raw.acceptanceCriteria || fields['Microsoft.VSTS.Common.AcceptanceCriteria'] || ''),
    url: raw.url || raw._links?.html?.href || '',
  };
}

function sanitizeStoryId(storyId) {
  return String(storyId || 'DRAFT')
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'DRAFT';
}

function splitAcceptanceCriteria(text) {
  if (!text) return [];
  return String(text)
    .replace(/\\n/g, '\n')
    .split(/\n+/)
    .map((line) => line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, '').trim())
    .filter(Boolean);
}

function paragraph(text, options = {}) {
  return new Paragraph({
    text,
    ...options,
  });
}

function textParagraph(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...options.run })],
    ...options.paragraph,
  });
}

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 240, after: 120 },
  });
}

function bullet(text) {
  return new Paragraph({
    text,
    bullet: { level: 0 },
    spacing: { after: 80 },
  });
}

function numbered(text) {
  return new Paragraph({
    text,
    numbering: { reference: 'test-steps', level: 0 },
    spacing: { after: 80 },
  });
}

function cell(text, bold = false) {
  return new TableCell({
    margins: { top: 120, bottom: 120, left: 120, right: 120 },
    children: [textParagraph(text, { run: { bold } })],
  });
}

function table(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1 },
      bottom: { style: BorderStyle.SINGLE, size: 1 },
      left: { style: BorderStyle.SINGLE, size: 1 },
      right: { style: BorderStyle.SINGLE, size: 1 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
      insideVertical: { style: BorderStyle.SINGLE, size: 1 },
    },
    rows: rows.map((row, rowIndex) =>
      new TableRow({
        children: row.map((value) => cell(String(value || ''), rowIndex === 0)),
      })
    ),
  });
}

function testCaseBlocks(storyId, acceptanceCriteria) {
  const items = acceptanceCriteria.length
    ? acceptanceCriteria
    : ['Requires confirmation: Acceptance Criteria were not provided. Create a placeholder test case after AC are confirmed.'];

  return items.flatMap((ac, index) => {
    const testCaseId = `TC-${storyId}-${String(index + 1).padStart(2, '0')}`;
    return [
      heading(`${testCaseId}`, HeadingLevel.HEADING_3),
      table([
        ['Field', 'Value'],
        ['Related AC', acceptanceCriteria.length ? `AC${index + 1}` : 'Requires confirmation'],
        ['Scenario', ac],
        ['Preconditions', 'Requires confirmation: environment, user permissions, and test data.'],
        ['Expected Result', acceptanceCriteria.length ? ac : 'Requires confirmation after AC are provided.'],
        ['Actual Result', 'To be completed by tester.'],
        ['Status', 'Not Run / Pass / Fail / Blocked'],
        ['Evidence / Screenshot', 'Attach screenshot, record link, or test evidence.'],
      ]),
      paragraph('Suggested steps:', { spacing: { before: 120, after: 80 } }),
      numbered('Open the target Salesforce environment and log in as the intended tester persona.'),
      numbered('Prepare or locate test data required for this Acceptance Criterion.'),
      numbered('Execute the business action related to the scenario.'),
      numbered('Compare the actual result with the expected result.'),
      numbered('Capture evidence and update the status.'),
    ];
  });
}

function buildDoc({ storyId, title, description, acceptanceCriteria, sourceUrl }) {
  const today = new Date().toISOString().slice(0, 10);
  const sanitizedStoryId = sanitizeStoryId(storyId);
  const acItems = splitAcceptanceCriteria(acceptanceCriteria);
  const children = [
    new Paragraph({
      children: [new TextRun({ text: `HOW TO TEST - ${sanitizedStoryId}`, bold: true, size: 36 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
    }),
    heading('User Story Reference', HeadingLevel.HEADING_1),
    table([
      ['Field', 'Value'],
      ['User Story ID', sanitizedStoryId],
      ['Title', title || 'Requires confirmation'],
      ['Source / Link', sourceUrl || 'Requires confirmation'],
      ['Generated Date', today],
    ]),
    heading('Purpose / Scope', HeadingLevel.HEADING_1),
    paragraph('This document helps testers validate the User Story based on the provided Description and Acceptance Criteria. It does not prove Salesforce implementation details and should be reviewed with the implementation owner when context is unclear.'),
    heading('Business Summary', HeadingLevel.HEADING_1),
    paragraph(description || 'Requires confirmation: User Story description was not provided.'),
    heading('Acceptance Criteria Summary', HeadingLevel.HEADING_1),
    ...(acItems.length ? acItems.map((ac, index) => bullet(`AC${index + 1}: ${ac}`)) : [bullet('Requires confirmation: Acceptance Criteria were not provided.')]),
    heading('Preconditions', HeadingLevel.HEADING_1),
    bullet('Org/environment: Requires confirmation.'),
    bullet('User/profile/permission assumptions: Requires confirmation.'),
    bullet('Required test data: Requires confirmation.'),
    heading('Test Cases', HeadingLevel.HEADING_1),
    ...testCaseBlocks(sanitizedStoryId, acItems),
    heading('Negative And Regression Checklist', HeadingLevel.HEADING_1),
    bullet('Confirm invalid or restricted behavior is handled according to the Acceptance Criteria.'),
    bullet('Confirm existing valid behavior still works after the change.'),
    bullet('Confirm user permissions and expected personas are included in testing.'),
    bullet('Confirm edge cases and missing/invalid data are reviewed where relevant.'),
    heading('Manual Validation Checklist', HeadingLevel.HEADING_1),
    bullet('Capture screenshots or record links for each executed test case.'),
    bullet('Record actual result and status for every test case.'),
    bullet('Mark unclear assumptions as Requires confirmation.'),
    bullet('Escalate blocked or unclear behavior to the developer or business owner.'),
    heading('Risks / Assumptions / Open Questions', HeadingLevel.HEADING_1),
    bullet('Requires confirmation: exact Salesforce UI navigation is not generated unless provided.'),
    bullet('Requires confirmation: test users, permissions, and data setup are not inferred.'),
    bullet('Requires confirmation: missing Acceptance Criteria should be completed before final QA sign-off.'),
    heading('Tester Sign-Off', HeadingLevel.HEADING_1),
    table([
      ['Field', 'Value'],
      ['Tester Name', ''],
      ['Execution Date', ''],
      ['Overall Result', 'Pass / Fail / Blocked'],
      ['Notes', ''],
    ]),
  ];

  return new Document({
    numbering: {
      config: [
        {
          reference: 'test-steps',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '%1.',
              alignment: AlignmentType.LEFT,
            },
          ],
        },
      ],
    },
    sections: [{ children }],
  });
}

function resolveOutputFile(outputDir, storyId) {
  const sanitizedStoryId = sanitizeStoryId(storyId);
  const baseName = `HOW_TO_TEST_${sanitizedStoryId}.docx`;
  let targetFile = path.join(outputDir, baseName);
  if (fs.existsSync(targetFile)) {
    targetFile = path.join(outputDir, `HOW_TO_TEST_${sanitizedStoryId}.proposed-update.docx`);
  }
  return targetFile;
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    return;
  }

  const config = readConfig(args.config);
  const adoWorkItem = normalizeAdoWorkItem(readJsonFile(args['ado-work-item-json']));
  const storyId = hasArg(args, 'story-id') ? args['story-id'] : adoWorkItem.id || 'DRAFT';
  const title = hasArg(args, 'title') ? args.title : adoWorkItem.title || 'Requires confirmation';
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
  const outputDir = args['output-dir'] || config.testDocsOutputPath || DEFAULT_OUTPUT_DIR;

  fs.mkdirSync(outputDir, { recursive: true });
  const targetFile = resolveOutputFile(outputDir, storyId);
  const doc = buildDoc({
    storyId,
    title,
    description,
    acceptanceCriteria,
    sourceUrl: adoWorkItem.url,
  });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(targetFile, buffer);

  console.log('HOW TO TEST DOCX generated.');
  console.log(`File: ${targetFile}`);
  console.log(`User Story ID: ${sanitizeStoryId(storyId)}`);
  console.log(`Title found: ${title ? 'yes' : 'no'}`);
  console.log(`Description found: ${description ? 'yes' : 'no'}`);
  console.log(`Acceptance Criteria found: ${acceptanceCriteria ? 'yes' : 'no'}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
