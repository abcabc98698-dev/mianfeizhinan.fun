const http = require('http');
const fs = require('fs');

const sitemapContent = fs.readFileSync('.vitepress/dist/sitemap.xml', 'utf8');
const locMatches = sitemapContent.match(/<loc>https:\/\/mianfeizhinan\.fun([^<]*)<\/loc>/g) || [];
const paths = locMatches.map(m => m.replace('<loc>https://mianfeizhinan.fun', '').replace('</loc>', ''));

console.log('Total extracted paths:', paths.length);

// Sample 25 URLs across different categories
const sampledPaths = [
  '/',
  '/recommend/',
  '/free/',
  '/trial/',
  '/security/',
  '/runaway/',
  '/refund/',
  '/review/',
  '/guide/',
  '/recommend/low-cost-tier',
  '/recommend/native-ip-streaming',
  '/free/failure-rate-tracking',
  '/free/open-source-self-built',
  '/trial/anti-abuse-fraud-checks',
  '/trial/retention-conversion-tricks',
  '/security/account-credential-security',
  '/security/multi-hop-defense',
  '/runaway/evidence-collection-sop',
  '/runaway/outage-monitoring-signals',
  '/refund/dispute-chargeback-tactics',
  '/review/guangsucloud',
  '/review/peak-congestion-tolerance',
  '/guide/protocol-client-setup',
  '/guide/node-selection-routing-rules',
  '/non-existent-page-test-404' // Deliberate 404 test
];

async function checkUrl(p) {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:4173' + p, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path: p,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'] || '',
          contentLength: data.length,
          isSoft404: res.statusCode === 200 && data.length < 500
        });
      });
    });
    req.on('error', (err) => {
      resolve({ path: p, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing 25 sampled URLs against local server...');
  const results = [];
  for (const p of sampledPaths) {
    results.push(await checkUrl(p));
  }

  let count200 = 0;
  let count404 = 0;
  let countErrors = 0;
  let countSoft404 = 0;

  results.forEach(r => {
    if (r.statusCode === 200) {
      count200++;
      if (r.isSoft404) countSoft404++;
    } else if (r.statusCode === 404) {
      count404++;
    } else {
      countErrors++;
    }
    console.log(`[${r.statusCode || 'ERR'}] ${r.path} - size: ${r.contentLength || 0} bytes ${r.isSoft404 ? 'SOFT-404' : ''}`);
  });

  console.log('\nSummary:');
  console.log('200 OK:', count200);
  console.log('404 Not Found:', count404);
  console.log('Other Errors (500/502/etc.):', countErrors);
  console.log('Soft 404s:', countSoft404);
}

run();
