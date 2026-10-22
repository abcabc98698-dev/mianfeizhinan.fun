const fs = require('fs');
const path = require('path');

const fakeTerms = [
  'Aurora Metro Express',
  'AuroraExpress',
  'AuroraNet',
  'aurora-express',
  'MIANFEI_AURORA',
  '极光专线网络',
  '极光网络',
  '极光专线',
  '极光影音',
  'CineStream Pro',
  'CloudShield Emergency',
  'CloudShield',
  'cloudshield',
  '云盾应急双活',
  '云盾应急',
  'MIANFEI_SHIELD',
  'SpareRoute',
  '备用客',
  'NebulaLink',
  '星云互联',
  'CloudPinnacle',
  '云际网络',
  'ThunderGeek',
  '雷霆极客',
  'CloudResilience',
  '云速备用舱'
];

const fileOccurrences = {};

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.vitepress' && entry.name !== '.git' && entry.name !== 'scripts') {
        scan(full);
      }
    } else if (entry.name.endsWith('.md')) {
      const content = fs.readFileSync(full, 'utf8');
      const rel = full.replace(/\\/g, '/');
      for (const term of fakeTerms) {
        if (content.includes(term)) {
          if (!fileOccurrences[rel]) fileOccurrences[rel] = new Set();
          fileOccurrences[rel].add(term);
        }
      }
    }
  }
}

scan('.');
console.log(`Total files with fake terms: ${Object.keys(fileOccurrences).length}`);
for (const [f, terms] of Object.entries(fileOccurrences)) {
  console.log(`${f}: [${Array.from(terms).join(', ')}]`);
}
