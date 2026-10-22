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

const htmlContents = distFiles.map(f => fs.readFileSync(f, 'utf8'));

['about', 'methodology', 'disclosure', 'privacy', 'terms'].forEach(p => {
  const incoming = htmlContents.filter(h => h.includes(`href="/${p}"`) || h.includes(`href="/${p}.html"`));
  console.log(`Incoming links to /${p} across all HTML files: ${incoming.length}`);
});
