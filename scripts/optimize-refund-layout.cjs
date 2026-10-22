const fs = require('fs');

const filepath = 'refund/index.md';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Replace Block 1 (Knowledge hub directory)
const oldBlock1Regex = /```[\s\S]*?【退款政策与争议维权全指南】知识中枢[\s\S]*?```/;
const newBlock1 = `
| 核心研报专题 | 专题深入研讨要点与核心矛盾 | 关键维权策略与反制指南 |
| :--- | :--- | :--- |
| **[1. 阶梯退款条件与 SLA 违约标准](/refund/refund-conditions-sla)** | 什么样的断连可界定为严重违约并要求全额退款？ | 掌握 24h 无理由退款窗口期与单日连通率 < 95% 证据链 |
| **[2. 已用流量与服务时长扣费精算模型](/refund/usage-proration-model)** | 已用 10G 流量申请退款，扣费公式怎么算才合理？ | 揭秘“按天折算 vs 按量折算”猫腻，防范过度折旧陷阱 |
| **[3. “特价商品概不退换”霸王条款穿透](/refund/promo-no-refund-pitfalls)** | 商家声称虚拟商品售出不退，法律如何支持消费者？ | 运用民法典格式条款无效原则，戳穿非法免责声明 |
| **[4. 支付网关手续费与退款到账时效](/refund/gateway-fee-timeline)** | 为什么退款要扣 3%~5% 手续费？款项几天到账？ | 拆解聚合支付与银行清算时间表，杜绝隐形乱扣费 |
| **[5. 破除商家推诿与拒退理由反制话术](/refund/counter-denial-tactics)** | 客服声称“是你本地网络慢”时如何硬核反驳？ | 运用双向抓包与第三方探针数据击碎“甩锅”借口 |
| **[6. 维权证据固定与客户端日志提取](/refund/evidence-logging-guide)** | 申请争议处理需要准备哪些不可篡改的关键凭证？ | 固化 NextTrace 拓扑、丢包率报告与微信/支付宝账单 |
| **[7. 支付渠道纠纷处理标准流转图谱](/refund/payment-dispute-flow)** | 工单已读不回时，如何穿透至第三方收银台投诉？ | 微信/支付宝/银行卡拒付全流程升级与调解实操 |
| **[8. 2026 机场退款诚信履约红黑榜](/refund/fair-refund-provider-index)** | 哪些品牌退款爽快有信誉？哪些是老赖黑名单？ | 42 家机场退款履约周期与客服响应 SLA 全面量化 |
`;

if (oldBlock1Regex.test(content)) {
  content = content.replace(oldBlock1Regex, newBlock1.trim());
  console.log('Replaced refund/index.md Block #1');
}

// 2. Replace Block 2 (Proration formula breakdown)
const oldBlock2Regex = /```[\s\S]*?用户实付金额 \(P_actual\)[\s\S]*?```/;
const newBlock2 = `
| 扣除项目 | 计费依据与算法规则 | 行业合理标准与防坑警示 |
| :--- | :--- | :--- |
| **已用时间折算 (D_time)** | $P_{\\text{actual}} \\times \\frac{\\text{已使用自然天数}}{\\text{套餐总有效天数}}$ | 按自然日严格线性折算，不可按整月四舍五入进位 |
| **已用流量折算 (D_traffic)** | $\\text{已用流量 (GB)} \\times \\text{官方单G标价}$ | 需与时间折旧取较小值或协商一致，杜绝双重叠加惩罚性扣除 |
| **支付网关通道费 (F_gateway)** | 实际发生的手续费（通常为实付金额的 $1.5\\% \\sim 3\\%$） | 第三方支付机构硬性收取的沉没成本，合理扣除可予以认可 |
| **最终应退金额 (R)** | $R = P_{\\text{actual}} - \\max(D_{\\text{time}}, D_{\\text{traffic}}) - F_{\\text{gateway}}$ | 最终余额必须原路退回用户原支付账户，拒绝退为无法提现的平台余额 |
`;

if (oldBlock2Regex.test(content)) {
  content = content.replace(oldBlock2Regex, newBlock2.trim());
  console.log('Replaced refund/index.md Block #2');
}

// 3. Replace Block 3 & 4 (5-Stage SOP)
const oldBlock3And4Regex = /```[\s\S]*?第一阶段：故障发生与技术证据链固化[\s\S]*?第四阶段：锁定支付清算网关与收单主体信息[\s\S]*?```/;
const newBlock3And4 = `
| 申诉维权阶段 | 关键动作与核心执行细节 | 输出物与关键证据固定 |
| :--- | :--- | :--- |
| **第一阶段：技术证据链固化**<br>*(0 ~ 2 小时)* | • 测试国内主流网站连通性，排除本地宽带故障<br>• 使用 NextTrace 执行目标节点路由跟踪并截屏<br>• 执行连续 100 次 ping 并保存丢包率与时延报告 | \`trace.log\` / \`ping_evidence.png\`<br>具有法律效力的客观技术证据 |
| **第二阶段：服务协议 (TOS) 审查**<br>*(2 ~ 4 小时)* | • 核查购买时的服务条款是否有 24h 无理由或 SLA 补偿承诺<br>• 计算按照实际使用天数/流量折算后的合理应退金额 | \`refund_calc.xlsx\`<br>依据合同法的退费明细账单 |
| **第三阶段：提交专业级申诉工单**<br>*(4 ~ 24 小时)* | • 工单主题明确标明订单号与无理由退款申请<br>• 正文清晰列举违约事实与量化证据，附带退款账户信息<br>• 设定合理解决期限（如 12~24 小时） | \`ticket_submit.png\`<br>与商家穷尽协商努力的沟通留痕 |
| **第四阶段：穿透支付清算网关**<br>*(24 ~ 48 小时)* | • 调取账单详情，获取收款方的商户全称与第三方商户单号<br>• 明确收款方主体性质（正规网络科技公司 vs 个人发卡网） | \`payment_receipt.pdf\`<br>锁定实际收款法律责任主体 |
| **第五阶段：支付渠道介入与争议冻结**<br>*(48 ~ 72 小时)* | • 登录微信支付/支付宝「对订单有疑问 -> 商家未提供服务」<br>• 上传技术证据与工单沟通截图，申请支付机构介入仲裁<br>• 倒逼商家面临商户资金冻结风险，原路退还剩余款项 | **原路退款成功**<br>退款到账入账凭证 |
`;

if (oldBlock3And4Regex.test(content)) {
  content = content.replace(oldBlock3And4Regex, newBlock3And4.trim());
  console.log('Replaced refund/index.md Blocks #3 & #4');
}

fs.writeFileSync(filepath, content, 'utf8');
console.log('Finished updating refund/index.md, new length:', content.length);
