const fs = require('fs');
const path = require('path');

// 1. Inspect AffiliateCard.vue
console.log('=== 1. AffiliateCard.vue rel attribute check ===');
const affCardPath = '.vitepress/theme/components/AffiliateCard.vue';
if (fs.existsSync(affCardPath)) {
  const content = fs.readFileSync(affCardPath, 'utf8');
  console.log('AffiliateCard link markup:');
  const aMatches = content.match(/<a[^>]*>/g) || [];
  aMatches.forEach(a => console.log('  ', a));
}

// 2. Check rendered HTML in dist for raw external affiliate links rel
console.log('\n=== 2. Rendered external affiliate links in .vitepress/dist ===');
const backupEmergencyHtmlPath = '.vitepress/dist/recommend/backup-emergency.html';
if (fs.existsSync(backupEmergencyHtmlPath)) {
  const html = fs.readFileSync(backupEmergencyHtmlPath, 'utf8');
  const affLinkMatches = html.match(/<a[^>]+href=["'][^"']*(gsyvipaff|flycataff|breezenetaff|twilightaff|dalaoyunaff)[^"']*["'][^>]*>[\s\S]*?<\/a>/gi) || [];
  console.log('Sample rendered affiliate links in backup-emergency.html:');
  affLinkMatches.slice(0, 5).forEach(m => console.log('  ', m));
}

// 3. Check orphan pages in built HTML
console.log('\n=== 3. Are the 50 "orphan" markdown files linked in HTML dist? ===');
// Scan all dist HTML files for hrefs to these 50 pages
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

// Read all HTML files into memory
const allDistHtml = distFiles.map(f => ({
  file: f,
  content: fs.readFileSync(f, 'utf8')
}));

const testOrphans = [
  '/free/emergency-fallback-methods',
  '/free/failure-rate-tracking',
  '/free/free-vs-paid-cost-model',
  '/free/long-term-free-sources',
  '/free/node-verification-sop',
  '/free/open-source-self-built',
  '/free/public-node-harvesting',
  '/free/security-limits-honeypots',
  '/guide/disaster-recovery-contingency',
  '/guide/low-price-trap-dissection'
];

testOrphans.forEach(p => {
  const incoming = allDistHtml.filter(d => d.content.includes(`href="${p}"`) || d.content.includes(`href="${p}.html"`));
  console.log(`Path ${p} has ${incoming.length} incoming links in built HTML (from: ${incoming.slice(0, 3).map(i => path.basename(i.file)).join(', ')})`);
});

// 4. Check Generic Anchor Text
console.log('\n=== 4. Generic Anchor Text Audit ===');
let genericAnchors = [];
const mdFiles = [];
function walkMd(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.vitepress' || file === '.git' || file === 'scripts' || file === 'dist') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) walkMd(fullPath);
    else if (file.endsWith('.md')) mdFiles.push(fullPath);
  });
}
walkMd('.');

mdFiles.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const linkMatches = c.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
  linkMatches.forEach(lm => {
    const textMatch = lm.match(/\[([^\]]+)\]/);
    if (textMatch) {
      const text = textMatch[1].trim();
      if (['点击这里', '查看更多', '详情', '链接', '更多', '点击', '直达', '官方网站', '官网直达'].includes(text)) {
        genericAnchors.push({ file: f, text, link: lm });
      }
    }
  });
});
console.log('Total generic anchor texts found:', genericAnchors.length);
const genericCounts = {};
genericAnchors.forEach(g => genericCounts[g.text] = (genericCounts[g.text] || 0) + 1);
console.log('Breakdown by text:', genericCounts);

// 5. Image Alt and Dimension check in dist
console.log('\n=== 5. Images missing alt or dimensions in dist ===');
let totalImages = 0;
let missingAlt = 0;
let missingWidthHeight = 0;

allDistHtml.forEach(d => {
  const imgTags = d.content.match(/<img[^>]+>/gi) || [];
  totalImages += imgTags.length;
  imgTags.forEach(img => {
    if (!img.includes('alt=') || img.includes('alt=""') || img.includes("alt=''")) {
      missingAlt++;
    }
    if (!img.includes('width=') || !img.includes('height=')) {
      missingWidthHeight++;
    }
  });
});

console.log('Total img tags in dist:', totalImages);
console.log('Missing/Empty alt:', missingAlt);
console.log('Missing width/height:', missingWidthHeight);
