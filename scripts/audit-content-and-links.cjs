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
console.log('Total Markdown Files:', files.length);

// 2.1 Content Depth
let wordCounts = [];
let thinUnder500 = [];
let thinUnder300 = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Character count (standard for Chinese content)
  const len = content.length;
  wordCounts.push({ file: f, len });
  if (len < 500) thinUnder500.push({ file: f, len });
  if (len < 300) thinUnder300.push({ file: f, len });
});

wordCounts.sort((a, b) => a.len - b.len);
console.log('\n=== 2.1 Content Depth ===');
console.log('Min length:', wordCounts[0]);
console.log('Max length:', wordCounts[wordCounts.length - 1]);
console.log('Files < 500 chars:', thinUnder500.length);
console.log('Files < 300 chars:', thinUnder300.length);
console.log('Distribution:');
const buckets = {
  '< 6,000': 0,
  '6,000 - 8,000': 0,
  '8,000 - 12,000': 0,
  '12,000 - 20,000': 0,
  '> 20,000': 0
};
wordCounts.forEach(w => {
  if (w.len < 6000) buckets['< 6,000']++;
  else if (w.len <= 8000) buckets['6,000 - 8,000']++;
  else if (w.len <= 12000) buckets['8,000 - 12,000']++;
  else if (w.len <= 20000) buckets['12,000 - 20,000']++;
  else buckets['> 20,000']++;
});
console.log(buckets);

// 2.3 Titles, Descriptions, H1s
console.log('\n=== 2.3 Duplicate Title, Description, H1 Scan ===');
const titleMap = {};
const descMap = {};
const h1Map = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // Title
  const titleMatch = content.match(/^title:\s*(.*)$/m);
  const title = titleMatch ? titleMatch[1].trim().replace(/^['"]|['"]$/g, '') : '';
  if (title) {
    titleMap[title] = (titleMap[title] || []).concat(f);
  }

  // Description
  const descMatch = content.match(/^description:\s*(.*)$/m);
  const desc = descMatch ? descMatch[1].trim().replace(/^['"]|['"]$/g, '') : '';
  if (desc) {
    descMap[desc] = (descMap[desc] || []).concat(f);
  }

  // H1
  const h1Match = content.match(/^#\s+(.*)$/m);
  const h1 = h1Match ? h1Match[1].trim() : '';
  if (h1) {
    h1Map[h1] = (h1Map[h1] || []).concat(f);
  }
});

const dupTitles = Object.entries(titleMap).filter(([t, list]) => list.length > 1);
const dupDescs = Object.entries(descMap).filter(([d, list]) => list.length > 1);
const dupH1s = Object.entries(h1Map).filter(([h, list]) => list.length > 1);

console.log('Duplicate Titles count:', dupTitles.length);
if (dupTitles.length > 0) console.log('Dup Titles:', dupTitles);
console.log('Duplicate Descriptions count:', dupDescs.length);
if (dupDescs.length > 0) console.log('Dup Descriptions:', dupDescs);
console.log('Duplicate H1s count:', dupH1s.length);
if (dupH1s.length > 0) console.log('Dup H1s:', dupH1s);

// 3. E-E-A-T Audit
console.log('\n=== 3. E-E-A-T Trust Signals ===');
const aboutExists = fs.existsSync('about.md') || fs.existsSync('about/index.md');
const privacyExists = fs.existsSync('privacy.md') || fs.existsSync('privacy/index.md') || fs.existsSync('legal/privacy.md');
const termsExists = fs.existsSync('terms.md') || fs.existsSync('terms/index.md') || fs.existsSync('legal/terms.md');
const methodologyExists = fs.existsSync('methodology.md') || fs.existsSync('review/methodology.md') || fs.existsSync('guide/methodology.md');

console.log('About Us page exists:', aboutExists);
console.log('Privacy Policy page exists:', privacyExists);
console.log('Terms of Service page exists:', termsExists);
console.log('Methodology page exists:', methodologyExists);

let authorAttributionCount = 0;
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('作者：') || content.includes('作者:') || content.includes('author:') || content.includes('责任编辑')) {
    authorAttributionCount++;
  }
});
console.log('Pages with explicit author attribution in markdown:', authorAttributionCount, '/', files.length);

// 4. Affiliate Links Compliance
console.log('\n=== 4. Affiliate Links Compliance ===');
let totalAffiliateCards = 0;
let affiliateUrls = [];
let rawExternalLinks = [];
let rawUnmarkedAffiliateLinks = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // Count AffiliateCard tags
  const cardMatches = content.match(/<AffiliateCard[\s\S]*?\/>/g) || [];
  totalAffiliateCards += cardMatches.length;

  // Check markdown links [text](url)
  const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let match;
  while ((match = mdLinkRegex.exec(content)) !== null) {
    const text = match[1];
    const url = match[2];
    if (!url.includes('mianfeizhinan.fun') && !url.includes('localhost')) {
      rawExternalLinks.push({ file: f, text, url });
      // Check if it's an affiliate link (contains aff, code=, ref=, etc.)
      if (/(\/aff|\?code=|\?aff=|\?ref=|gsyvipaff|register\?code)/i.test(url)) {
        rawUnmarkedAffiliateLinks.push({ file: f, text, url });
      }
    }
  }
});

console.log('Total <AffiliateCard> components across all pages:', totalAffiliateCards);
console.log('Total raw external links in markdown body:', rawExternalLinks.length);
console.log('Raw UNMARKED affiliate links in markdown text (bypassing AffiliateCard):', rawUnmarkedAffiliateLinks.length);
if (rawUnmarkedAffiliateLinks.length > 0) {
  console.log('Sample unmarked affiliate links:', rawUnmarkedAffiliateLinks.slice(0, 5));
}

// 5. Internal Links & Orphan Pages
console.log('\n=== 5. Internal Links & Click Depth ===');
let emptyHref = 0;
let hashHref = 0;
let internalLinks = [];
let inDegree = {};

files.forEach(f => {
  const normalized = f.replace(/\\/g, '/').replace(/^\.\//, '');
  inDegree[normalized] = 0;
});

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const source = f.replace(/\\/g, '/').replace(/^\.\//, '');

  if (content.includes('href=""') || content.includes("href=''") || content.includes('href=""')) emptyHref++;
  if (content.includes('href="#"') || content.includes("href='#'")) hashHref++;

  const intLinkRegex = /\[([^\]]+)\]\(((\/[a-zA-Z0-9.\-_#\/]*)|([a-zA-Z0-9.\-_#\/]+\.md))\)/g;
  let m;
  while ((m = intLinkRegex.exec(content)) !== null) {
    let target = m[2];
    if (target.startsWith('/')) {
      target = target.replace(/^\//, '').split('#')[0];
      if (target === '') target = 'index.md';
      else if (target.endsWith('/')) target = target + 'index.md';
      else target = target + '.md';
    }
    if (inDegree[target] !== undefined) {
      inDegree[target]++;
    }
  }
});

const orphanPages = Object.entries(inDegree).filter(([page, count]) => count === 0 && page !== 'index.md');
console.log('Empty href count:', emptyHref);
console.log('Hash # href count:', hashHref);
console.log('Total orphan pages (0 internal links pointing to them):', orphanPages.length);
if (orphanPages.length > 0) {
  console.log('Sample orphan pages:', orphanPages.slice(0, 10));
}

// 6. Schema Structured Data
console.log('\n=== 6. Schema.org Structured Data in Built HTML ===');
let schemaPages = 0;
let schemaTypes = {};

const distHtmls = [];
function walkDist(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) walkDist(fullPath);
    else if (file.endsWith('.html')) distHtmls.push(fullPath);
  });
}
walkDist('.vitepress/dist');

distHtmls.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  if (jsonLdMatches.length > 0) {
    schemaPages++;
    jsonLdMatches.forEach(m => {
      try {
        const jsonStr = m.replace(/<script type="application\/ld\+json">|<\/script>/g, '');
        const obj = JSON.parse(jsonStr);
        const type = obj['@type'] || 'Unknown';
        schemaTypes[type] = (schemaTypes[type] || 0) + 1;
      } catch (e) {
        console.log('Schema parse error in file:', f, e.message);
      }
    });
  }
});

console.log('HTML pages containing Schema.org JSON-LD:', schemaPages, '/', distHtmls.length);
console.log('Schema Types found:', schemaTypes);
