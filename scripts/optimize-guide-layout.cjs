const fs = require('fs');

const filepath = 'guide/index.md';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Replace Block #2 (Supply Chain Risk)
const oldBlock2Regex = /```[\s\S]*?商业代理服务供应链风险传递模型[\s\S]*?```/;
const newBlock2 = `
| 供应链风险维度 | 核心故障与风险暴露特征 | 终端用户最终受损形态 |
| :--- | :--- | :--- |
| **上游基础设施脆弱性** | • 跨境海缆物理切断或上游机房拉闸<br>• 境内中继入口遭通报阻断<br>• 机房白名单与流控审计收紧 | **网络突发大面积中断**<br>关键时刻断网、流媒体打不开、开发代码无法提交 |
| **资金流转断裂风险** | • 第三方支付商户接口被风控冻结<br>• 年付资金池遭遇庞氏枯竭<br>• 运营者主观卷款潜逃拔线 | **个人资产沉没清零**<br>大额年付款项无法追索、工单客服失联 |
`;

if (oldBlock2Regex.test(content)) {
  content = content.replace(oldBlock2Regex, newBlock2.trim());
  console.log('Replaced guide/index.md Block #2');
}

// 2. Replace Block #5 (5-minute pre-purchase filter)
const oldBlock5Regex = /```[\s\S]*?首次购买翻墙机场 5 分钟背调排雷过滤漏斗[\s\S]*?```/;
const newBlock5 = `
| 过滤层级 | 核验重点与自查问题 | 触发高危判定动作 |
| :--- | :--- | :--- |
| **过滤层 1：存续时间与运营主体 (Domain & Age)** | • 域名成立时间是否大于 1 年？<br>• 品牌在 Google / Telegram 是否有历史存续痕迹？ | 触发 ──> **【 立即放弃：新注册极高危跑路盘 】** |
| **过滤层 2：透明度与公开社群审计 (Public Community)** | • 是否提供公开交流群（非仅禁言频道）？<br>• 群内是否开启全员禁言或关键词屏蔽严重？ | 触发 ──> **【 立即放弃：闭门收割高危 】** |
| **过滤层 3：服务协议与退款保障 (TOS & Refund)** | • 是否在显要位置声明“一经售出概不退款”霸王条款？<br>• 节点维护中断超过 24 小时是否承诺按天顺延补时长？ | 触发 ──> **【 降级评估：仅允许极小额月付 】** |
| **过滤层 4：结算渠道与交易对手 (Payment Gateway)** | • 是否仅支持个人私聊转账或个人发卡网？<br>• 结算页面是否为有合规资质的第三方聚合收单机构？ | 触发 ──> **【 立即放弃：资金无法追索 】** |
| **过滤层 5：实测试用与网络真实性 (Trial & NextTrace)** | • 晚高峰 (21:00) 丢包率是否 < 2%，无虚标伪专线？<br>• 是否提供正规试用或单月低门槛体验？ | 触发 ──> **【 终止交易：拒绝虚假宣传 】** |
| **最终准入结论** | 经过 5 层严格背调全部通过 | **【 允许进入：以单月纯月付方式购买体验 】** |
`;

if (oldBlock5Regex.test(content)) {
  content = content.replace(oldBlock5Regex, newBlock5.trim());
  console.log('Replaced guide/index.md Block #5');
}

// 3. Replace Block #16 (Client Ecosystem)
const oldBlock16Regex = /```[\s\S]*?全平台开源代理客户端生态演进格局[\s\S]*?```/;
const newBlock16 = `
| 客户端内核演进路线 | 核心代表工具与平台支持 | 底层技术特性与选型建议 |
| :--- | :--- | :--- |
| **传统成熟体系：Clash / Mihomo** | • Windows/macOS: **Clash Verge Rev**<br>• Android: **Clash Meta for Android (CMFA)**<br>• 软路由: **OpenClash** | 规则引擎极度成熟，社区规则集生态完备；可视化策略组拖拽配置门槛最低，适合绝大多数桌面端主力使用 |
| **现代轻量内核：Sing-box 生态** | • 全平台: **Sing-box 原生客户端**<br>• iOS: **Sing-box for iOS / Shadowrocket**<br>• 路由器: **Sing-box 核心原生运行** | 内存占用极低（待机仅 20MB），支持二进制 \`.srs\` 规则集编译；原生地道支持 VLESS-Reality 现代高抗封协议，嵌入式设备首选 |
`;

if (oldBlock16Regex.test(content)) {
  content = content.replace(oldBlock16Regex, newBlock16.trim());
  console.log('Replaced guide/index.md Block #16');
}

// 4. Replace Block #27 (Dual Provider Redundancy)
const oldBlock27Regex = /```[\s\S]*?主备双活多机场高可用容灾系统架构与自动故障转移机制[\s\S]*?```/;
const newBlock27 = `
| 容灾执行层级 | 策略组工作机制与调度逻辑 | 容灾切换时效与用户感知 |
| :--- | :--- | :--- |
| **第一级：本地智能分流 (Rule Routing)** | 本地内核接管流量，国内流量直连，海外应用流量智能分发至主力专线策略组 | 零延迟无感直连，节省代理流量 |
| **第二级：主力专线动态优选 (URL-Test)** | 香港/日本/新加坡专线多节点并发心跳探测（每 300 秒探测一次），自动优选最低延迟节点 | 晚高峰毫秒级平滑自愈，避免单节点拥塞 |
| **第三级：跨服务商自动容灾 (Fallback)** | 当主力机场全集群因海缆或维护宕机时，Fallback 机制自动激活备选机场（如**光速云**永久专线） | 30 秒内秒级无缝接管，关键跨国业务 100% 不掉线 |
`;

if (oldBlock27Regex.test(content)) {
  content = content.replace(oldBlock27Regex, newBlock27.trim());
  console.log('Replaced guide/index.md Block #27');
}

fs.writeFileSync(filepath, content, 'utf8');
console.log('Finished updating guide/index.md, new length:', content.length);
