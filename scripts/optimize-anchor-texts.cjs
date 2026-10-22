const fs = require('fs');

const dirs = ['recommend'];
let totalUpdated = 0;

dirs.forEach(d => {
  fs.readdirSync(d).filter(f => f.endsWith('.md')).forEach(file => {
    const filePath = `${d}/${file}`;
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let fileUpdated = 0;

    const newLines = lines.map(line => {
      if (line.includes('[官网直达]') && line.includes('|')) {
        const cols = line.split('|').map(c => c.trim());
        // Column 2 usually has the brand: | **🥇 第一主推** | **光速云** | ...
        if (cols.length >= 3) {
          const brandMatch = cols[2].replace(/\*/g, '').trim();
          if (brandMatch && brandMatch.length <= 15) {
            fileUpdated++;
            totalUpdated++;
            return line.replace('[官网直达]', `[访问${brandMatch}官网]`);
          }
        }
      }
      return line;
    });

    if (fileUpdated > 0) {
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
      console.log(`Updated ${fileUpdated} anchor texts in ${filePath}`);
    }
  });
});

console.log(`Total anchor texts optimized: ${totalUpdated}`);
