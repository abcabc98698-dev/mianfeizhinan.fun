const fs = require('fs');

const dirs = ['recommend', 'free', 'trial', 'security', 'runaway', 'refund', 'guide', 'review'];

const sidebarData = {};

dirs.forEach(d => {
  const files = fs.readdirSync(d).filter(f => f.endsWith('.md'));
  sidebarData[d] = files.map(f => {
    const c = fs.readFileSync(`${d}/${f}`, 'utf8');
    const titleMatch = c.match(/^title:\s*(.*)$/m);
    let title = titleMatch ? titleMatch[1].trim().replace(/^['"]|['"]$/g, '') : f;
    // Simplify long titles for sidebar
    title = title.split('·')[0].split('(')[0].split('（')[0].replace(/^【[^】]+】/, '').trim();
    if (f === 'index.md') title = '体系主入口 (Overview)';
    const link = f === 'index.md' ? `/${d}/` : `/${d}/${f.replace('.md', '')}`;
    return { file: f, title, link };
  });
});

console.log('Sidebar mapping preview:');
dirs.forEach(d => {
  console.log(`\n=== ${d} (${sidebarData[d].length} items) ===`);
  sidebarData[d].forEach(item => console.log(`  { text: '${item.title}', link: '${item.link}' },`));
});
