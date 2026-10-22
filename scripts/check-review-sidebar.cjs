const fs = require('fs');
const path = require('path');

const configPath = path.resolve('.vitepress/config.mts');
const content = fs.readFileSync(configPath, 'utf8');

const p1 = content.indexOf("'/review/': [");
const p2 = content.indexOf("'/guide/': [");

console.log('p1:', p1, 'p2:', p2);
if (p1 !== -1 && p2 !== -1) {
  console.log('Current /review/ section:\n', content.slice(p1, p2));
}
