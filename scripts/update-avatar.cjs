const fs = require('fs');

const src = 'C:/Users/Pro User/.gemini/antigravity/brain/3e1c73a2-7458-4635-9c67-3840efb3973e/.user_uploaded/media_1792653065301_ad8f3bc2.webp';
const buf = fs.readFileSync(src);

// 1. Write binary webp files
fs.writeFileSync('public/avatar.webp', buf);
fs.writeFileSync('public/logo.webp', buf);
fs.writeFileSync('public/favicon.webp', buf);
fs.writeFileSync('public/favicon.ico', buf); // Many modern browsers accept webp even if named .ico

// 2. Write SVG version with base64 embedded avatar
const b64 = buf.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <clipPath id="avatarCircle">
      <circle cx="50" cy="50" r="50"/>
    </clipPath>
  </defs>
  <circle cx="50" cy="50" r="49" fill="#2563eb" stroke="#2563eb" stroke-width="2"/>
  <image href="data:image/webp;base64,${b64}" x="0" y="0" width="100" height="100" clip-path="url(#avatarCircle)"/>
</svg>`;
fs.writeFileSync('public/logo.svg', svg, 'utf8');

console.log('Successfully wrote avatar files to public/');
