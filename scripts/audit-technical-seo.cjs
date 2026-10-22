const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('=== 1.1 Robots.txt Check ===');
const robotsPath = path.join('public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  console.log('robots.txt exists at public/robots.txt:');
  console.log(fs.readFileSync(robotsPath, 'utf8'));
} else {
  console.log('WARNING: public/robots.txt DOES NOT EXIST!');
}

console.log('\n=== 1.2 Sitemap Check ===');
const sitemapPath = path.join('.vitepress', 'dist', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  console.log('sitemap.xml exists in .vitepress/dist/sitemap.xml, size:', sitemapContent.length);
  const urls = sitemapContent.match(/<loc>[\s\S]*?<\/loc>/g) || [];
  console.log('Total URLs in sitemap:', urls.length);
  console.log('Sample first 5 URLs:', urls.slice(0, 5));
  console.log('Sample last 5 URLs:', urls.slice(-5));
  
  // Check for non-formal domains, 404s, or drafts
  const invalidDomainUrls = urls.filter(u => !u.includes('https://mianfeizhinan.fun'));
  console.log('URLs not using https://mianfeizhinan.fun:', invalidDomainUrls.length);
  
  // Check lastmod
  const lastmods = sitemapContent.match(/<lastmod>[\s\S]*?<\/lastmod>/g) || [];
  console.log('URLs with lastmod:', lastmods.length, 'Sample:', lastmods[0]);
} else {
  console.log('sitemap.xml does NOT exist in .vitepress/dist!');
}

console.log('\n=== 1.3 Canonical & Noindex in Built HTML ===');
function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = walk('.vitepress/dist');
console.log('Total HTML files in dist:', htmlFiles.length);

let canonicalCount = 0;
let canonicalAnomalies = [];
let noindexCount = 0;
let noindexFiles = [];

htmlFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (canonicalMatch) {
    canonicalCount++;
    const hrefMatch = canonicalMatch[0].match(/href=["']([^"']+)["']/i);
    const href = hrefMatch ? hrefMatch[1] : '';
    if (!href.startsWith('https://mianfeizhinan.fun/')) {
      canonicalAnomalies.push({ file: f, href });
    }
  } else {
    canonicalAnomalies.push({ file: f, error: 'Missing canonical' });
  }

  if (html.includes('noindex')) {
    noindexCount++;
    noindexFiles.push(f);
  }
});

console.log('Canonical tags found:', canonicalCount, '/', htmlFiles.length);
console.log('Canonical anomalies:', canonicalAnomalies.length);
if (canonicalAnomalies.length > 0) {
  console.log('Sample canonical anomalies:', canonicalAnomalies.slice(0, 5));
}
console.log('Files with noindex:', noindexCount);
if (noindexCount > 0) {
  console.log('Sample noindex files:', noindexFiles.slice(0, 5));
}

console.log('\n=== 1.4 URL Structure Check ===');
const markdownFiles = [];
function walkMd(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.vitepress' || file === '.git' || file === 'scripts' || file === 'dist') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      walkMd(fullPath);
    } else if (file.endsWith('.md')) {
      markdownFiles.push(fullPath);
    }
  });
}
walkMd('.');

let uppercaseUrls = [];
let chineseUrls = [];
let paramUrls = [];

markdownFiles.forEach(f => {
  const normalized = f.replace(/\\/g, '/');
  if (/[A-Z]/.test(normalized)) {
    uppercaseUrls.push(normalized);
  }
  if (/[\u4e00-\u9fa5]/.test(normalized)) {
    chineseUrls.push(normalized);
  }
});

console.log('Total Markdown pages:', markdownFiles.length);
console.log('Files with uppercase characters in path:', uppercaseUrls.length, uppercaseUrls);
console.log('Files with Chinese characters in path:', chineseUrls.length, chineseUrls);
