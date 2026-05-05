const fs = require('fs');
const path = require('path');

const root = process.argv[2] || 'force-app';
const outputPath = path.join('output', 'metadata-analysis', 'force-app-scan.json');

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

function stripMetaSuffix(fileName) {
  return fileName
    .replace(/\.field-meta\.xml$/, '')
    .replace(/\.object-meta\.xml$/, '')
    .replace(/\.validationRule-meta\.xml$/, '')
    .replace(/\.recordType-meta\.xml$/, '')
    .replace(/\.flow-meta\.xml$/, '')
    .replace(/\.permissionset-meta\.xml$/, '')
    .replace(/\.profile-meta\.xml$/, '')
    .replace(/\.layout-meta\.xml$/, '')
    .replace(/\.flexipage-meta\.xml$/, '')
    .replace(/\.quickAction-meta\.xml$/, '')
    .replace(/\.tab-meta\.xml$/, '')
    .replace(/\.app-meta\.xml$/, '')
    .replace(/\.labels-meta\.xml$/, '')
    .replace(/\.md-meta\.xml$/, '')
    .replace(/\.cls$/, '')
    .replace(/\.trigger$/, '')
    .replace(/\.[^.]+$/, '');
}

function inferMetadata(filePath) {
  const normalized = filePath.split(path.sep).join('/');
  const fileName = path.basename(filePath);
  const parts = normalized.split('/');

  if (normalized.includes('/objects/') && normalized.includes('/fields/') && fileName.endsWith('.field-meta.xml')) {
    const objectName = parts[parts.indexOf('objects') + 1];
    return { metadataType: 'CustomField', componentName: `${objectName}.${stripMetaSuffix(fileName)}` };
  }
  if (normalized.includes('/objects/') && normalized.includes('/validationRules/')) {
    const objectName = parts[parts.indexOf('objects') + 1];
    return { metadataType: 'ValidationRule', componentName: `${objectName}.${stripMetaSuffix(fileName)}` };
  }
  if (normalized.includes('/objects/') && normalized.includes('/recordTypes/')) {
    const objectName = parts[parts.indexOf('objects') + 1];
    return { metadataType: 'RecordType', componentName: `${objectName}.${stripMetaSuffix(fileName)}` };
  }
  if (normalized.includes('/objects/') && fileName.endsWith('.object-meta.xml')) {
    return { metadataType: 'CustomObject', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/flows/') && fileName.endsWith('.flow-meta.xml')) {
    return { metadataType: 'Flow', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/layouts/') && fileName.endsWith('.layout-meta.xml')) {
    return { metadataType: 'Layout', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/permissionsets/') && fileName.endsWith('.permissionset-meta.xml')) {
    return { metadataType: 'PermissionSet', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/profiles/') && fileName.endsWith('.profile-meta.xml')) {
    return { metadataType: 'Profile', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/classes/') && fileName.endsWith('.cls')) {
    return { metadataType: 'ApexClass', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/triggers/') && fileName.endsWith('.trigger')) {
    return { metadataType: 'ApexTrigger', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/lwc/')) {
    const lwcIndex = parts.indexOf('lwc');
    return { metadataType: 'LightningWebComponent', componentName: parts[lwcIndex + 1] || stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/aura/')) {
    const auraIndex = parts.indexOf('aura');
    return { metadataType: 'AuraComponent', componentName: parts[auraIndex + 1] || stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/tabs/') && fileName.endsWith('.tab-meta.xml')) {
    return { metadataType: 'CustomTab', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/applications/') && fileName.endsWith('.app-meta.xml')) {
    return { metadataType: 'CustomApplication', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/customMetadata/') && fileName.endsWith('.md-meta.xml')) {
    return { metadataType: 'CustomMetadata', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/labels/') && fileName.endsWith('.labels-meta.xml')) {
    return { metadataType: 'CustomLabels', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/flexipages/') && fileName.endsWith('.flexipage-meta.xml')) {
    return { metadataType: 'FlexiPage', componentName: stripMetaSuffix(fileName) };
  }
  if (normalized.includes('/quickActions/') && fileName.endsWith('.quickAction-meta.xml')) {
    return { metadataType: 'QuickAction', componentName: stripMetaSuffix(fileName) };
  }
  return { metadataType: 'Unknown', componentName: stripMetaSuffix(fileName) };
}

const files = walk(root).sort();
const scan = files.map((filePath) => {
  const inferred = inferMetadata(filePath);
  return {
    filePath,
    fileName: path.basename(filePath),
    extension: path.extname(filePath),
    metadataType: inferred.metadataType,
    componentName: inferred.componentName,
  };
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(scan, null, 2)}\n`);

console.log(`Scanned ${scan.length} metadata files from ${root}`);
console.log(`Wrote ${outputPath}`);
