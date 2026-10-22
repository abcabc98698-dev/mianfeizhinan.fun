const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.vitepress' || file === '.git' || file === 'scripts' || file === 'dist') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('.');
const allBlocks = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const codeBlockRegex = /```[\s\S]*?```/g;
  let match;
  let blockIndex = 0;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const blockText = match[0];
    if (blockText.includes('┌') || blockText.includes('└') || blockText.includes('├') || blockText.includes('│') || blockText.includes('───')) {
      allBlocks.push({
        file: f,
        blockIndex,
        length: blockText.length,
        lines: blockText.split('\n').length,
        snippet: blockText.slice(0, 150).replace(/\n/g, ' ')
      });
    }
    blockIndex++;
  }
});

console.log(`Found ${allBlocks.length} code blocks with box drawing / ascii diagrams:`);
allBlocks.forEach((b, idx) => {
  console.log(`${idx + 1}. [${b.file}] Block #${b.blockIndex} (${b.lines} lines, ${b.length} chars)`);
  console.log(`   ${b.snippet}`);
});
