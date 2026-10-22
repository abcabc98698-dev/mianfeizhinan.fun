const fs = require('fs');

// Test 2 ultra unique templates
function getShingles(text, k = 25) {
  const clean = text.replace(/[\s\r\n\t#*`|><:-]/g, '');
  const set = new Set();
  for (let i = 0; i <= clean.length - k; i++) {
    set.add(clean.slice(i, i + k));
  }
  return set;
}

function sim(t1, t2) {
  const s1 = getShingles(t1);
  const s2 = getShingles(t2);
  let inter = 0;
  for (let x of s1) if (s2.has(x)) inter++;
  return (inter / (s1.size + s2.size - inter));
}

console.log('Testing template differentiation engine...');
