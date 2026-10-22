const fs = require('fs');

const sampleFiles = [
  'recommend/backup-emergency.md',
  'free/emergency-fallback-methods.md',
  'trial/anonymous-privacy-trials.md',
  'security/mitm-tampering-ad-injection.md',
  'runaway/dump-sales-alert.md',
  'refund/dispute-chargeback-tactics.md',
  'review/guangsucloud.md',
  'guide/protocol-client-setup.md',
  'free/failure-rate-tracking.md',
  'security/zero-trust-proxy-boundary.md'
];

sampleFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // split into paragraphs
  const paragraphs = content.split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 80 && !p.startsWith('#') && !p.startsWith('|') && !p.startsWith('<') && !p.startsWith('```'));
  
  console.log(`\n=== File: ${f} (Total chars: ${content.length}) ===`);
  console.log('Sample paragraphs (first 2):');
  paragraphs.slice(0, 2).forEach((p, idx) => {
    console.log(`[P${idx+1}] ${p.slice(0, 120)}...`);
  });
});
