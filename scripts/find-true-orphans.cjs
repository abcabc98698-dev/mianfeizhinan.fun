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

const htmlMap = distFiles.map(f => ({
  file: f,
  name: f.replace(/\\/g, '/').replace('.vitepress/dist/', ''),
  content: fs.readFileSync(f, 'utf8')
}));

console.log('Total HTML files in dist:', htmlMap.length);

const sitemapContent = fs.readFileSync('.vitepress/dist/sitemap.xml', 'utf8');
const locMatches = sitemapContent.match(/<loc>https:\/\/mianfeizhinan\.fun([^<]*)<\/loc>/g) || [];
const allUrls = locMatches.map(m => m.replace('<loc>https://mianfeizhinan.fun', '').replace('</loc>', ''));

console.log('Total URLs in sitemap:', allUrls.length);

const orphans = [];
allUrls.forEach(urlPath => {
  if (urlPath === '/' || urlPath === '') return;
  
  // Search for incoming links to this path in all HTML files
  // Paths can be href="/path", href="/path.html", href="/path/"
  const clean = urlPath.replace(/^\//, '');
  let incomingCount = 0;
  const linkers = [];

  htmlMap.forEach(h => {
    // don't count self-links
    if (h.name === clean + '.html' || h.name === clean + '/index.html' || (clean === '' && h.name === 'index.html')) return;
    
    // Check if content links to this url
    if (h.content.includes(`href="/${clean}"`) || 
        h.content.includes(`href="/${clean}.html"`) || 
        h.content.includes(`href="/${clean}/"`) ||
        h.content.includes(`href="${clean}"`)) {
      incomingCount++;
      linkers.push(h.name);
    }
  });

  if (incomingCount === 0) {
    orphans.push({ path: urlPath, clean });
  }
});

console.log(`\nTotal True Orphan URLs (0 incoming links across all 174 HTML files): ${orphans.length}`);
console.log('List of Orphan URLs:');
orphans.forEach((o, i) => {
  console.log(`${i + 1}. ${o.path}`);
});
