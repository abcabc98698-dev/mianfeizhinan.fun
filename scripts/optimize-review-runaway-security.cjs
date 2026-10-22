const fs = require('fs');

// 1. Optimize review/index.md
{
  const fp = 'review/index.md';
  let c = fs.readFileSync(fp, 'utf8');

  // Replace Block 1 (Comparison dimension)
  const oldB1Regex = /```[\s\S]*?传统黑产测速营销 vs 工业级网络性能测试对比维度[\s\S]*?```/;
  const newB1 = `
| 评测对比维度 | 传统黑产推手营销号测速套路 | 本站工业级网络性能实测标准 |
| :--- | :--- | :--- |
| **测试时间窗口** | 凌晨或白天闲时（公网出口无拥堵，制造极速假象） | 晚高峰 20:30~22:30（海缆与骨干极限拥堵期压测） |
| **测速工具选择** | 仅单点跑 Speedtest 挑最高一次下行峰值截图 | 多线程 iperf3 持续压榨 + Fast.com 真实流媒体测速 |
| **网络抖动与丢包**| 故意隐匿丢包率与 RTT 方差（实际可能高达 30%） | 连续 1000 次 Ping 丢包率、Jitter 抖动方差与 RTT 稳定性全量公开 |
| **落地 IP 风控** | 不测流媒体，不测 Claude / ChatGPT 真实风控 | Scamalytics 欺诈分、Netflix 原生非自制剧与 Claude 通过率全测 |
`;
  if (oldB1Regex.test(c)) {
    c = c.replace(oldB1Regex, newB1.trim());
    console.log('Replaced review/index.md Block #1');
  }

  // Replace Block 5 (IP purity 4-dimension model)
  const oldB5Regex = /```[\s\S]*?【落地 IP 纯净度四维审计模型】[\s\S]*?```/;
  const newB5 = `
| 审计维度 | 核心检测指标与数据源 | 优质合格基准 | 高危淘汰红线 |
| :--- | :--- | :--- | :--- |
| **1. ASN 属性与 IP 类型** | IPinfo / ip2location 数据库查询 | 原生住宅 (Residential) / 双 ISP | 廉价数据中心机房广播 (Hosting/DC) |
| **2. 综合反欺诈评分** | Scamalytics / IPQS 风险分值 | Fraud Score < 15 分 (低风险极优) | Fraud Score > 60 分 (高风险滥用池) |
| **3. 全球流媒体版权穿透** | RegionCheck 脚本自动化全库探测 | Netflix 非自制剧 4K 秒开 / Disney+ 全解 | 仅能看自制剧，频繁提示“检测到代理” |
| **4. AI 实验室反爬挑战** | Cloudflare Turnstile 浏览器指纹校验 | ChatGPT 4o / Claude 3.5 Sonnet 秒进 | 频繁循环弹出人机验证，返回 1020 拒绝 |
`;
  if (oldB5Regex.test(c)) {
    c = c.replace(oldB5Regex, newB5.trim());
    console.log('Replaced review/index.md Block #5');
  }

  fs.writeFileSync(fp, c, 'utf8');
}

// 2. Optimize runaway/index.md
{
  const fp = 'runaway/index.md';
  let c = fs.readFileSync(fp, 'utf8');

  // Replace Block 2 (Ponzi timeline)
  const oldB2Regex = /```[\s\S]*?\[用户规模 \/ 资金流水\][\s\S]*?```/;
  const newB2 = `
| 跑路演进阶段 | 商家典型操作与获客陷阱 | 底层财务与现金流特征 | 网络表现与最终结局 |
| :--- | :--- | :--- | :--- |
| **阶段一：疯狂吸金**<br>*(M1~M2 虚假繁荣)* | 推出 19.9 元/年超级低价，各大论坛疯狂引流吸粉 | 现金流看似充裕，但新用户年费全用于垫付当月机房机柜租金 | 节点暂时可用，口碑处于巅峰期 |
| **阶段二：成本击穿**<br>*(M3~M4 资金亏空)* | 带宽严重穿孔，上游机房按 95 计费催缴天价账单 | 每月收入远低于带宽刚性支出，资金链实质性断裂倒挂 | 晚高峰大面积断连，频繁发布“机房割接割接”敷衍公告 |
| **阶段三：终接收割**<br>*(M5 绝望清仓)* | 推出“三年付5折”、“永久特权88元”等自杀式大促，强制关闭退款 | 最后一波突击圈钱 10~30 万现金，转入海外不可逆加密钱包 | 官方群开启全员禁言，客服工单已读不回 |
| **阶段四：拔线失联**<br>*(M6 跑路蒸发)* | 服务器全线红叉关机，官网解析指向 127.0.0.1，TG 群解散 | 站长携款潜逃，用户年付资金全额打水漂 | 站长改头换面换壳重生，开始下一轮庞氏收割循环 |
`;
  if (oldB2Regex.test(c)) {
    c = c.replace(oldB2Regex, newB2.trim());
    console.log('Replaced runaway/index.md Block #2');
  }

  // Replace Block 5 (Troubleshooting tree)
  const oldB5Regex = /```[\s\S]*?【用户端发起：节点连接失败 \/ 官网打不开】[\s\S]*?```/;
  const newB5 = `
| 排查排险步骤 | 测试操作与执行命令 | 判定结果与对应真相 | 推荐处置行动 |
| :--- | :--- | :--- | :--- |
| **第 1 步：本地与运营商排查** | 访问国内主流站点（Bilibili、百度） | 若国内也无法打开，为本地家庭 Wi-Fi 故障 | 重启光猫与路由器，无需焦虑 |
| **第 2 步：订阅域名 DNS 状态** | 终端运行 \`nslookup [订阅域名] 1.1.1.1\` | • 若解析返回 0.0.0.0：遭 GFW DNS 缓存投毒<br>• 若海外境外也解析失败：域名已过期欠费未续费 | 若为 DNS 投毒，客户端改用 IP 订阅；若域名欠费，跑路概率 > 80% |
| **第 3 步：节点底层端口存活性** | \`tcping [节点入口IP] [端口]\` | • 若丢包率 100% 持续超过 48 小时：机房已拔线或上游停机<br>• 若 TCP 握手正常但打不开网页：节点账号鉴权被封 | 停止向该机场继续充值，立即启动备用容灾网络通道 |
| **第 4 步：官方社群与支持状态** | 检查官方 Telegram 群与工单系统 | • 若全员禁言且超过 7 天无管理人员出面：跑路已进入实质阶段<br>• 若管理人员公开解释海缆割接并给出修复 ETA：属于常规维护 | 截存所有支付凭证与账单，准备向第三方支付网关发起追偿申诉 |
`;
  if (oldB5Regex.test(c)) {
    c = c.replace(oldB5Regex, newB5.trim());
    console.log('Replaced runaway/index.md Block #5');
  }

  fs.writeFileSync(fp, c, 'utf8');
}

// 3. Optimize security/index.md
{
  const fp = 'security/index.md';
  let c = fs.readFileSync(fp, 'utf8');

  // Replace Block 2 (Security topology hub)
  const oldB2Regex = /```[\s\S]*?【安全专题中枢】代理安全信任边界与隐私攻防全景体系[\s\S]*?```/;
  const newB2 = `
| 安全防御层级 | 核心威胁模型与攻击面 | 本地与网络侧关键防御对策 |
| :--- | :--- | :--- |
| **第一层：传输链路与网络攻防边界** | 运营商深度包检测 (DPI)、公网明文嗅探、主动探针阻断 | 采用企业级 VLESS-Reality 或端到端物理专线，杜绝明文 TLS in TLS 暴露 |
| **第二层：客户端完整性与系统防护** | 闭源私有客户端植入后门、劫持剪贴板、窃取浏览器 Cookie | 坚决使用开源 Clash Verge Rev / Sing-box，严禁安装未知自签根证书 |
| **第三层：节点运维与服务商边界** | 服务商后台保留访问日志 (Access Log)、审计规则劫持 | 坚持规则分流模式 (Rule Mode)，杜绝在代理通道中访问银行与政企内网 |
| **第四层：身份隐私与支付脱敏防线** | 支付实名关联真实身份、邮箱社工库撞库、暗网转售数据 | 使用独立专用别名邮箱注册，选用正规合规支付通道，切断身份关联链路 |
`;
  if (oldB2Regex.test(c)) {
    c = c.replace(oldB2Regex, newB2.trim());
    console.log('Replaced security/index.md Block #2');
  }

  // Replace Block 5 (Layered encryption boundary)
  const oldB5Regex = /```[\s\S]*?代理环境下各网络分层加密与信息暴露边界拓扑矩阵[\s\S]*?```/;
  const newB5 = `
| 网络分层节点 | 该节点能够掌握的数据与信息 | 安全边界防护与防范对策 |
| :--- | :--- | :--- |
| **1. 用户本地设备 (Local Host)** | 完整明文数据、真实内网 IP、完整访问 URL 路径、所有进程信息 | 仅使用开源客户端，严格检查本地操作系统根证书列表 |
| **2. 本地局域网与运营商 (ISP)** | 本地真实公网 IP、目标代理入口 IP、连接时间戳与流量总大小 | 开启 Fake-IP 与 DoH 远程加密解析，彻底阻断本地运营商 DNS 污染记录 |
| **3. 代理中继与落地节点 (Proxy Server)** | 用户本地真实 IP、目标境外服务器域名与端口、传输密文数据 | HTTPS 端到端加密保护下，机场节点**完全无法看到**用户的账号密码与传输明文 |
| **4. 目标国际网站 (Target Server)** | 机场落地节点的出口 IP、用户向该网站提交的明文业务数据 | 目标网站只能识别到代理出口 IP，无法溯源至用户的国内真实宽带 IP |
`;
  if (oldB5Regex.test(c)) {
    c = c.replace(oldB5Regex, newB5.trim());
    console.log('Replaced security/index.md Block #5');
  }

  fs.writeFileSync(fp, c, 'utf8');
}

console.log('Finished updating review, runaway, and security index layout!');
