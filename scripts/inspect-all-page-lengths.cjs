const fs = require('fs');
const path = require('path');

function getMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.vitepress' && file !== 'public' && file !== 'scripts') {
        results = results.concat(getMdFiles(fullPath));
      }
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getMdFiles('.');
console.log('Total markdown files:', files.length);

const under6k = [];
const over6k = [];

files.forEach(f => {
  const len = fs.readFileSync(f, 'utf8').length;
  if (len < 6000) {
    under6k.push({ file: f, len });
  } else {
    over6k.push({ file: f, len });
  }
});

console.log(`Files >= 6,000 chars: ${over6k.length}`);
console.log(`Files < 6,000 chars: ${under6k.length}`);

// Group under 6k by directory
const underByDir = {};
under6k.forEach(item => {
  const d = path.dirname(item.file);
  if (!underByDir[d]) underByDir[d] = [];
  underByDir[d].push(item);
});

console.log('\nUnder 6,000 chars grouped by directory:');
for (let d in underByDir) {
  console.log(`- ${d}: ${underByDir[d].length} files (min: ${Math.min(...underByDir[d].map(x => x.len))}, max: ${Math.max(...underByDir[d].map(x => x.len))})`);
}
