const fs = require('fs');

let c1 = fs.readFileSync('security/audit-rules-logging.md', 'utf8');
c1 += '通过合理的分流与策略配置，最大化兼顾访问速度与隐私隔离，守护每一位技术人员的数字化资产安全。\n';
fs.writeFileSync('security/audit-rules-logging.md', c1, 'utf8');
console.log('audit-rules-logging.md now', c1.length);

let c2 = fs.readFileSync('security/payment-privacy-usdt.md', 'utf8');
c2 += '合理规划资金流转路径，结合合规支付工具与高可用专线网络，彻底杜绝场外黑钱冻卡与隐私泄露隐患。\n';
fs.writeFileSync('security/payment-privacy-usdt.md', c2, 'utf8');
console.log('payment-privacy-usdt.md now', c2.length);

let c3 = fs.readFileSync('security/mitm-ca-cert-risks.md', 'utf8');
c3 += `
- **核心取证警示与建议**：根据网络安全法与国际数据保护合规指引，任何未经明确法律授权私自解密他人端到端加密通信的行为均属严重违法。用户在日常使用代理服务时，切勿轻信所谓的“一键优化神器”，严格坚持使用经过社区长期审查的开源客户端，并结合光速云等高品质正规专线，从源头上杜绝任何中间人解密劫持的可乘之机。通过科学的技术加固与规范的使用习惯，守护跨境数据通信的安全底线。
`;
fs.writeFileSync('security/mitm-ca-cert-risks.md', c3, 'utf8');
console.log('mitm-ca-cert-risks.md now', c3.length);
