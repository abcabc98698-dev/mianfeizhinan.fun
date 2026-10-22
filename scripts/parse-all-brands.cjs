const fs = require('fs');
const path = require('path');

const f28 = fs.readFileSync('C:/Users/Pro User/Desktop/机场品牌信息/28个机场品牌清单.txt', 'utf8');
const f14 = fs.readFileSync('C:/Users/Pro User/Desktop/机场品牌信息/14个机场品牌清单.txt', 'utf8');

// Parse 28
const lines28 = f28.split('\n');
const sections28 = [];
let cur28 = null;
for (let line of lines28) {
  const m = line.match(/(?:主推)?##\s*(\d+[\.\s]+[^\r\n]+)/);
  if (m) {
    if (cur28) sections28.push(cur28);
    cur28 = { header: m[1].trim(), text: line + '\n' };
  } else if (cur28) {
    cur28.text += line + '\n';
  }
}
if (cur28) sections28.push(cur28);

// Parse 14
const lines14 = f14.split(/\r?\n/);
const sections14 = [];
let cur14 = null;
for (let i = 0; i < lines14.length; i++) {
  const line = lines14[i].trim();
  const nextLine = (lines14[i+1] || '').trim();
  if (nextLine.startsWith('基础信息') && line.length > 0 && !line.startsWith('#')) {
    if (cur14) sections14.push(cur14);
    cur14 = { name: line.replace(/^\d+[\.\s]+/, '').trim(), text: line + '\n' };
  } else if (cur14) {
    cur14.text += lines14[i] + '\n';
  }
}
if (cur14) sections14.push(cur14);

console.log('Sections 28 count:', sections28.length);
console.log('Sections 14 count:', sections14.length);

const results = [];

// Helper to extract link
function extractLink(text) {
  const m = text.match(/https?:\/\/[^\s\)\`\]\"\'<>]+/);
  return m ? m[0] : '';
}

// Helper to extract coupon
function extractCoupon(text) {
  const m = text.match(/优惠码[：:\s]*[`'\"]?([A-Za-z0-9_-]+)[`'\"]?/);
  return m ? m[1] : '';
}

// Parse 28 brands
sections28.forEach((s, idx) => {
  const nameM = s.header.match(/\d+[\.\s]+([^\s（(]+)/);
  const rawName = nameM ? nameM[1] : s.header;
  const enM = s.header.match(/[（(]([a-zA-Z0-9_-]+)[）)]/);
  const enName = enM ? enM[1] : '';
  const link = extractLink(s.text);
  const coupon = extractCoupon(s.text);
  results.push({
    source: '28',
    index: idx + 1,
    header: s.header,
    name: rawName,
    enName,
    link,
    coupon,
    length: s.text.length
  });
});

// Parse 14 brands
sections14.forEach((s, idx) => {
  const link = extractLink(s.text);
  const coupon = extractCoupon(s.text);
  results.push({
    source: '14',
    index: 28 + idx + 1,
    header: s.name,
    name: s.name,
    enName: '',
    link,
    coupon,
    length: s.text.length
  });
});

console.log('Total brands:', results.length);
results.forEach(r => {
  console.log(`${r.index}. [${r.name}] link: ${r.link ? 'YES' : 'NO'} | coupon: ${r.coupon || 'None'}`);
});
