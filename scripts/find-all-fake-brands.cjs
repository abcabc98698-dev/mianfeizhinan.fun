const fs = require('fs');
const path = require('path');

const cardNames = new Set();
const cardFiles = [];
const allFakeMentions = [];

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
      
      // Match AffiliateCard name
      const regex = /<AffiliateCard[\s\S]*?name="([^"]+)"/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        cardNames.add(m[1]);
        cardFiles.push({ file: full.replace(/\\/g, '/'), name: m[1] });
      }

      // Check fake terms
      const fakes = ['极光', 'Aurora', '云盾', 'CloudShield', '深蓝', '星河', 'MIANFEI_'];
      for (const f of fakes) {
        if (content.includes(f)) {
          allFakeMentions.push({ file: full.replace(/\\/g, '/'), term: f });
        }
      }
    }
  }
}

scan('.');
console.log('All AffiliateCard names found in Markdown files:');
console.log(Array.from(cardNames));
console.log('\nTotal card files:', cardFiles.length);

const fakeFiles = new Set(allFakeMentions.map(x => x.file));
console.log('\nUnique markdown files mentioning fake terms:', fakeFiles.size);
console.log(Array.from(fakeFiles));
