const fs = require('fs');

const html = fs.readFileSync('.vitepress/dist/review/guangsucloud.html', 'utf8');
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (match) {
  console.log('JSON-LD found in review/guangsucloud.html:');
  console.log(JSON.stringify(JSON.parse(match[1]), null, 2));
} else {
  console.log('NO JSON-LD in review/guangsucloud.html');
}

// Check how many pages in dist have JSON-LD now
const distFiles = [];
function walkDist(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = require('path').join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) walkDist(fullPath);
    else if (file.endsWith('.html')) distFiles.push(fullPath);
  });
}
walkDist('.vitepress/dist');

let withSchema = 0;
distFiles.forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  if (h.includes('application/ld+json')) withSchema++;
});
console.log(`\nTotal HTML files with Schema.org: ${withSchema} / ${distFiles.length}`);
