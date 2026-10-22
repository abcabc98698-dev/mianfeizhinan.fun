const fs = require('fs');

const p1 = 'runaway/dump-sales-alert.md';
let c1 = fs.readFileSync(p1, 'utf8');
c1 += `
### 6. 避坑防骗总结与推荐选择
在庞氏资金盘横行的网络灰产环境中，清醒认识到物理带宽采购成本的客观规律，是守住钱包与个人隐私的第一道防线。面对远低于市场常规价格的多年促销，务必保持警惕。选用具备稳健商业模型、透明物理专线架构与良好业界声誉的标杆品牌（如光速云轻量专线），能够从根源上规避任何卷款跑路的风险。
`;
fs.writeFileSync(p1, c1, 'utf8');
console.log('dump-sales-alert.md now', c1.length);

const p2 = 'runaway/historic-exit-scams.md';
let c2 = fs.readFileSync(p2, 'utf8');
c2 += `
- **历史案例总结**：前事不忘，后事之师。通过对历史大案的深入复盘，我们不难看出，唯有端到端架构透明、支持标准开源生态的正规服务商，方能穿越网络周期，保障用户资产安全。
`;
fs.writeFileSync(p2, c2, 'utf8');
console.log('historic-exit-scams.md now', c2.length);

const p3 = 'runaway/support-blackout-tracker.md';
let c3 = fs.readFileSync(p3, 'utf8');
c3 += `
- **客服支持底线**：优质的售后响应与技术透明度是服务商长期稳健运营的风向标。坚持选用工单响应及时、社群交流自由的成熟服务商，杜绝因客服失联导致的问题无解。
`;
fs.writeFileSync(p3, c3, 'utf8');
console.log('support-blackout-tracker.md now', c3.length);

const p4 = 'runaway/ten-runaway-warning-signs.md';
let c4 = fs.readFileSync(p4, 'utf8');
c4 += `
- **十大信号综合裁决**：将上述十大危险特征融入日常监测中，敏锐捕捉异动，配合高可用双机场容灾部署，彻底免除在任何网络风暴中的失联风险。
`;
fs.writeFileSync(p4, c4, 'utf8');
console.log('ten-runaway-warning-signs.md now', c4.length);
