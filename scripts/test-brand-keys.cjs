const fs = require('fs');
const path = require('path');

// 1. Read source data
const f28Path = 'C:/Users/Pro User/Desktop/机场品牌信息/28个机场品牌清单.txt';
const f14Path = 'C:/Users/Pro User/Desktop/机场品牌信息/14个机场品牌清单.txt';
const gsPath = 'public/guangsu-tests/光速云品牌信息.txt';

const f28 = fs.readFileSync(f28Path, 'utf8');
const f14 = fs.readFileSync(f14Path, 'utf8');
const gsText = fs.readFileSync(gsPath, 'utf8');

// Parse 28 brands
const lines28 = f28.split('\n');
const brands28 = {};
let cur28Name = null;
let cur28Lines = [];

for (let line of lines28) {
  const m = line.match(/(?:主推)?##\s*(\d+[\.\s]+[^\r\n]+)/);
  if (m) {
    if (cur28Name) {
      brands28[cur28Name] = cur28Lines.join('\n');
    }
    const nameMatch = m[1].match(/\d+[\.\s]+([^\s（(]+)/);
    cur28Name = nameMatch ? nameMatch[1].trim() : m[1].trim();
    cur28Lines = [line];
  } else if (cur28Name) {
    cur28Lines.push(line);
  }
}
if (cur28Name) {
  brands28[cur28Name] = cur28Lines.join('\n');
}

// Parse 14 brands
const lines14 = f14.split(/\r?\n/);
const brands14 = {};
let cur14Name = null;
let cur14Lines = [];

for (let i = 0; i < lines14.length; i++) {
  const line = lines14[i].trim();
  const nextLine = (lines14[i+1] || '').trim();
  if (nextLine.startsWith('基础信息') && line.length > 0 && !line.startsWith('#')) {
    if (cur14Name) {
      brands14[cur14Name] = cur14Lines.join('\n');
    }
    cur14Name = line.replace(/^\d+[\.\s]+/, '').trim();
    cur14Lines = [line];
  } else if (cur14Name) {
    cur14Lines.push(lines14[i]);
  }
}
if (cur14Name) {
  brands14[cur14Name] = cur14Lines.join('\n');
}

console.log('28 parsed brand keys:', Object.keys(brands28));
console.log('14 parsed brand keys:', Object.keys(brands14));
