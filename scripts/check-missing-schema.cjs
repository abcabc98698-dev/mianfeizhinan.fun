const fs = require('fs');
const path = require('path');

const distFiles = [];
function walkDist(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) walkDist(fullPath);
    else if (file.endsWith('.html')) distFiles.push(fullPath);
  });
}
walkDist('.vitepress/dist');

const missingSchema = [];
distFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  if (!html.includes('application/ld+json')) {
    missingSchema.push(f.replace(/\\/g, '/').replace('.vitepress/dist/', ''));
  }
});

console.log('Pages missing Schema.org JSON-LD:', missingSchema.length);
console.log('Sample missing:', missingSchema.slice(0, 20));
