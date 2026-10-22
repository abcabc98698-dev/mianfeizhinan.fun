const fs = require('fs');

const filepath = 'recommend/index.md';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Replace Block 1 (End-to-End Routing Architecture)
const oldBlock1Regex = /```[\s\S]*?【国际骨干传输与多级代理端到端路由拓扑全景图】[\s\S]*?```/;
const newBlock1 = `
| 传输层级 | 核心物理架构与节点部署 | 关键技术特性与指标 | 典型链路表现与风控状态 |
| :--- | :--- | :--- | :--- |
| **① 终端用户环境**<br>*(最后一公里接入)* | • 电信 (AS4134 163 / AS4809 CN2)<br>• 联通 (AS4837 169 / AS9929 A网)<br>• 移动 (AS9808 CMNET) | 本地物理 FTTH 光纤接入，发起初始代理数据包握手 | 传输首包质量取决于本地 ISP 到机房中转跳数 |
| **② 接入调度层**<br>*(境内 BGP Anycast 边缘)* | 深圳前海、上海崇明、北京大兴、广州大学城等核心机房多线 BGP 集群 | 智能 Anycast 路由收敛，动态感知运营商拥堵，毫秒级故障自动漂移 | 将不同运营商流量引导至最优内网入口，消灭跨网结算延迟 |
| **③ 跨境过境层 (优质专线)**<br>*(物理 IEPL/IPLC 信道)* | 海底/陆地光纤专线内网切片通道 (SJC, APG, TPE, FASTER) | 二层以太网/SDH 物理切片，物理隔离完全绕过公网出口防火墙 | **0% 骨干丢包，物理恒定时延 (深港 4~6ms)**，全天候零拥塞 |
| **③ 跨境过境层 (公网中转)**<br>*(公网隧道直连中继)* | 中国电信 163 / 联通 169 公网国际出口网关 | TCP/UDP 公网隧道封装，受 GFW 实时 DPI 深度检测影响 | **晚高峰丢包率 15%~35%**，延迟剧烈抖动，易频繁断流 |
| **④ 跨境汇聚层**<br>*(境外 Border Gateway 交换中心)* | 香港 HKIX / Equinix HK、东京 Equinix TY2、新加坡 SG1、洛杉矶 CoreSite LA2 | 境外 Tier-1 骨干网交换中心直接对等互联 (Direct Peering) | 实现跨国流量大吞吐分发，将数据包送达对应落地机房 |
| **⑤ 落地出口层**<br>*(原生双 ISP vs 商业 VPS)* | • 原生双 ISP (AT&T, Comcast, HKBN, HKT)<br>• 商业机房 (Cogent, Telia, Leaseweb, OVH) | • 双 ISP：FraudScore < 15，原生住宅属性<br>• 商业 VPS：FraudScore > 60，大带宽高吞吐成本低 | • 双 ISP：流媒体 4K 与 AI 工具 100% 原生解锁<br>• 商业机房：适合大文件下载，但易被风控拦截 |
| **⑥ 目标服务终点**<br>*(国际互联网目标矩阵)* | 流媒体 (Netflix 4K, Disney+, YouTube)、AI 实验室 (ChatGPT, Claude 3.5)、跨境电商 (Amazon, PayPal) | 端到端完整闭环交付 | 依赖前面 5 层的综合架构质量保障关键业务高可用 |
`;

if (oldBlock1Regex.test(content)) {
  content = content.replace(oldBlock1Regex, newBlock1.trim());
  console.log('Replaced recommend/index.md Block #1 (Topology)');
} else {
  console.log('recommend/index.md Block #1 regex not matched');
}

// 2. Replace Block 4 (8-Tier Architecture)
const oldBlock4Regex = /```[\s\S]*?机场推荐选型体系 · 八大二级梯队拓扑图[\s\S]*?```/;
const newBlock4 = `
| 梯队代号 | 专题梯队定位 | 价格预算区间 | 核心架构特征 | 目标应用场景 |
| :---: | :--- | :---: | :--- | :--- |
| **[1.1](/recommend/low-cost-tier)** | **低门槛平价梯队** | ¥5 ~ ¥10 /月 | 优质 BGP 大带宽中继 | 学生党、轻度查资料与日常网页浏览 |
| **[1.2](/recommend/beginner-friendly)** | **新手免配置直连** | ¥10 ~ ¥20 /月 | 专属一键跨平台客户端 | 零基础新手，免手动导入配置与调节点 |
| **[1.3](/recommend/monthly-pay-as-you-go)**| **纯月付按量灵活款** | ¥10 ~ ¥25 /月 | 无绑定期月付，支持按量扣费 | 拒绝长期套牢，按需消耗流量 |
| **[1.4](/recommend/backup-emergency)** | **备用防失联救生圈** | 一次性买断 | 永久不过期 IEPL 专线 | 主力机场维护或突发断网时的终极容灾 |
| **[1.5](/recommend/native-ip-streaming)** | **流媒体双 ISP 原生** | ¥25 ~ ¥40 /月 | 原生住宅双 ISP 落地 IP | Netflix 全区非自制剧、Disney+、Claude 3.5 |
| **[1.6](/recommend/ecommerce-static-ip)**| **跨境电商静态 IP** | ¥35 ~ ¥60 /月 | 独享静态纯净 IP 隔离 | 亚马逊/TikTok 店铺防关联、PayPal 支付 |
| **[1.7](/recommend/iepl-iplc-peak)** | **晚高峰抗挤压物理专线**| ¥35 ~ ¥80 /月 | 端到端二层 IEPL 专线 | 晚间远程办公、跨国视频会议、海外网游加速 |
| **[1.8](/recommend/geek-academic)** | **极客学术多协议全开** | ¥20 ~ ¥45 /月 | VLESS-Reality / Hysteria 2 | 程序员代码同步、大模型 API、学术检索 |
`;

if (oldBlock4Regex.test(content)) {
  content = content.replace(oldBlock4Regex, newBlock4.trim());
  console.log('Replaced recommend/index.md Block #4 (8-Tier Table)');
} else {
  console.log('recommend/index.md Block #4 regex not matched');
}

fs.writeFileSync(filepath, content, 'utf8');
console.log('Finished updating recommend/index.md, new length:', content.length);
