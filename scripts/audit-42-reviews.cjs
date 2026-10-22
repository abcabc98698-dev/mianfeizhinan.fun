const fs = require('fs');
const path = require('path');

const reviewDir = path.resolve('review');
const files = fs.readdirSync(reviewDir).filter(f => f.endsWith('.md') && f !== 'index.md');

console.log(`Auditing ${files.length} review files...`);

// 1. Check AI cliches
const AI_PATTERNS = [
  '总而言之', '综上所述', '毫无疑问', '显而易见',
  '不可否认', '双刃剑', '不仅如此', '随着科技的发展',
  '在数字化时代', '犹如一把'
];

let aiFailures = 0;
files.forEach(f => {
  const content = fs.readFileSync(path.join(reviewDir, f), 'utf8');
  AI_PATTERNS.forEach(pat => {
    if (content.includes(pat)) {
      console.log(`[AI Cliché Alert] ${f} contains "${pat}"`);
      aiFailures++;
    }
  });
});

console.log(`AI Clichés detected: ${aiFailures}`);

// 2. Pairwise similarity check
function getShingles(text, k = 25) {
  const clean = text.replace(/[\s\r\n\t#*`|><:-]/g, '');
  const set = new Set();
  for (let i = 0; i <= clean.length - k; i++) {
    set.add(clean.slice(i, i + k));
  }
  return set;
}

let highSimCount = 0;
let maxSim = 0;
let maxPair = '';

const shinglesMap = {};
files.forEach(f => {
  shinglesMap[f] = getShingles(fs.readFileSync(path.join(reviewDir, f), 'utf8'));
});

for (let i = 0; i < files.length; i++) {
  for (let j = i + 1; j < files.length; j++) {
    const f1 = files[i];
    const f2 = files[j];
    const s1 = shinglesMap[f1];
    const s2 = shinglesMap[f2];
    
    let intersection = 0;
    for (let item of s1) {
      if (s2.has(item)) intersection++;
    }
    const union = s1.size + s2.size - intersection;
    const sim = intersection / union;
    
    if (sim > maxSim) {
      maxSim = sim;
      maxPair = `${f1} <-> ${f2}`;
    }
    if (sim > 0.35) {
      console.log(`[High Similarity Warning] ${f1} vs ${f2}: ${(sim * 100).toFixed(2)}%`);
      highSimCount++;
    }
  }
}

console.log(`Max pairwise similarity across all review files: ${(maxSim * 100).toFixed(2)}% (${maxPair})`);
console.log(`Pairs with > 35% similarity: ${highSimCount}`);
