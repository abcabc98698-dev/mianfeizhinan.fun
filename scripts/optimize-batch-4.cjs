const fs = require('fs');

function runBatch4() {
  // 1. free/failure-rate-tracking.md
  {
    let c = fs.readFileSync('free/failure-rate-tracking.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*连通率 %[\s\S]*?时间 \(00:00 - 24:00\)\s*```/;
    const r = `| 时间窗口 | 公益免费节点可用率 | 平均握手延迟 | 典型网络现象与体验 | 物理底层机理剖析 |
| :--- | :--- | :--- | :--- | :--- |
| **深夜闲时 (03:00~07:00)** | **约 32.0% ~ 35.8%** | 180 ~ 260 ms | 部分节点可勉强打开 Google 首页或推送 Telegram 纯文字消息 | 大多数网民已入睡，公网国际出口骨干网负载降至全天最低谷，免费节点勉强有微量带宽残存 |
| **白天工作时段 (09:00~18:00)** | **12.5% ~ 18.0%** | 350 ~ 650 ms | 网页加载极其缓慢，频繁超时重试，偶有少量轻量请求能通过 | 企业专线与公网跨境业务占据主要带宽，公共免费节点由于缺乏优先级保障，被运营商 QoS 限制 |
| **晚间高峰时段 (20:00~23:00)** | **< 5.8% (断崖归零)** | **> 1200 ms 或丢包 100%** | **全节点飘红超时**，完全无法握手，音视频彻底瘫痪 | 全国跨境流量雪崩式暴增，骨干网 Buffer 队列溢出触发随机丢包，无任何保障的免费公网流量首当其冲被直接丢弃 |
| **突发封锁/特殊时期** | **< 1.0% (全军覆没)** | 全链路超时 | 订阅源抓取的数百个节点全部失联，客户端频繁弹出 Connection Refused | 敏感阻断策略升级，黑产抓取的公开 IP 批量命中 GFW 威胁情报黑名单，全网端口瞬间被封死 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('free/failure-rate-tracking.md replaced');
    } else {
      console.log('free/failure-rate-tracking.md match failed');
    }
    fs.writeFileSync('free/failure-rate-tracking.md', c, 'utf8');
    console.log(`free/failure-rate-tracking.md: ${initLen} -> ${c.length}`);
  }

  // 2. free/free-vs-paid-cost-model.md
  {
    let c = fs.readFileSync('free/free-vs-paid-cost-model.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*时间充裕度 \(高\)[\s\S]*?时间充裕度 \(低\)\s*```/;
    const r = `| 用户人群象限 | 个人时薪/预算定位 | 时间充裕度 | 推荐网络解决方案 | 投入产出比与理由分析 |
| :--- | :--- | :--- | :--- | :--- |
| **象限 I：职场新人 / 考研小白** | 预算适中 (月均 10~20 元) | 时间有限，需要专注学业与工作 | **8 ~ 15 元高性价比纯月付机场**<br>(如飞猫云 / 微风网络) | 花一杯奶茶钱省去每天寻找测试免费节点的 1~2 小时折腾时间，保障基础查资料与文献下载流畅 |
| **象限 II：在校学生 / 极客尝鲜** | 预算极低 (期望免费或微付费) | 时间极为充裕，具备折腾动手欲望 | **爬虫自动化抓取 / 开源公益节点** | 适合用于学习网络协议、抓包调试、Linux 基础运维与代码测试，但绝不可用于日常高频核心生产力 |
| **象限 III：低频备用 / 极轻度查询** | 预算中等，但使用频次极低 | 时间宝贵，反感每月持续扣费 | **光速云致敬斯诺克 147 永久套餐**<br>(147元买断247GB专线永不过期) | 告别按月续费清零压力，账号充值一次常年有效，需要查资料或跨境登录时随时打开秒连 |
| **象限 IV：外贸跨境 / 商业生产力** | 预算充裕 (月均 30~100 元) | 极度稀缺，断网 1 小时即造成重大商业损失 | **旗舰物理 IEPL 专线纯月付**<br>(如光速云纯内网 IEPL 专线，9折码 \`AMM\`) | SLA 99.99% 物理专线，4K 杜比视界秒开，原生双 ISP 解锁，零丢包零断流，完全匹配商业级高可用要求 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('free/free-vs-paid-cost-model.md replaced');
    } else {
      console.log('free/free-vs-paid-cost-model.md match failed');
    }
    fs.writeFileSync('free/free-vs-paid-cost-model.md', c, 'utf8');
    console.log(`free/free-vs-paid-cost-model.md: ${initLen} -> ${c.length}`);
  }

  // 3. free/open-source-self-built.md
  {
    let c = fs.readFileSync('free/open-source-self-built.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*\[商业机场容灾架构\][\s\S]*?必须手动重装折腾\)\s*```/;
    const r = `| 架构对比维度 | 商业专线机场容灾架构 (如光速云) | 个人自建单机 VPS 架构 | 容灾可靠性与运维差异 |
| :--- | :--- | :--- | :--- |
| **入口网络拓扑** | 覆盖全国华东、华南、华北等 **8 个省份的多线 BGP 入口**，三网智能优选跳数 | 单一境外机房公网 IP（直连美国、日本等），跨国公网长途漫游 | 商业机场就近接入骨干网，自建 VPS 遭遇国际出口拥塞直接卡死 |
| **传输承载介质** | **物理内网 IEPL/IPLC 专线**，境内中继走私网光纤跨境，完全不经过 GFW 公网出口 | 公网公网公网！数据包必须穿透 GFW 深度包检测 (DPI) 审查 | 专线 0 丢包 0 封锁，自建 VPS 协议特征极易被识别导致 IP 被阻断 |
| **故障自愈机制** | **异地多活毫秒级自动容灾**：任一入口拔线或落地宕机，DNS/Anycast 自动将流量分流至存活机房，用户完全无感知 | **单点故障 (SPOF)**：VPS 一旦被墙或机房维护，网络彻底瘫痪，必须重新花钱换 IP、手动重装操作系统与脚本 | 商业机场 SLA 保障高达 99.9%，自建单机遭遇突发阻断自救成本极高 |
| **综合持有成本** | 月付 15~35 元，零运维精力投入，全平台客户端一键导入配置即用 | 境外 VPS 月租 $3.5~$10 美元 + 换 IP 费用 ($3/次) + 持续更新防封脚本的大量时间成本 | 自建综合金钱与时间成本通常远超购买成熟的月付商业专线 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('free/open-source-self-built.md replaced');
    } else {
      console.log('free/open-source-self-built.md match failed');
    }
    fs.writeFileSync('free/open-source-self-built.md', c, 'utf8');
    console.log(`free/open-source-self-built.md: ${initLen} -> ${c.length}`);
  }

  // 4. free/public-node-harvesting.md
  {
    let c = fs.readFileSync('free/public-node-harvesting.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*\[数据采集层\][\s\S]*?重构为标准 Clash\/Sing-box YAML\/JSON 配置文件\s*```/;
    const r = `| 自动化流水线层级 | 处理核心技术动作 | 过滤与清洗规则 | 输出产物与性能指标 |
| :--- | :--- | :--- | :--- |
| **1. 分布式数据采集层** | 定时轮询 GitHub Raw 仓库、Telegram API 频道更新、以及公开 Base64 订阅源网页 | 针对全球数百个公开数据源发起并发 HTTP GET 抓取，设置 5s 超时熔断 | 汇聚原始未清洗的混合加密文本流 (单日可达 10 万+ 条目) |
| **2. 协议解码与哈希去重** | 批量执行 Base64 递归解码，正则解析 \`vmess://\`、\`vless://\`、\`ss://\`、\`trojan://\` 节点链接 | 提取 \`IP:Port:UUID\` 生成 SHA-256 哈希指纹，剔除全网互相洗稿的 85% 重复节点 | 输出标准化结构化节点参数字典，去除冗余垃圾数据 |
| **3. 高并发异步探活层** | 基于 Python \`asyncio\` + \`aiohttp\` 协程池，对上万个独立节点并发执行 TCP 握手探活 | 设置严格握手超时 (Timeout = 1.5s)，超过 1.5 秒未握手或回包 RST 直接剔除 | 存活率通常瞬间从 100% 暴跌至 8%~12%，无情淘汰僵尸死节点 |
| **4. 威胁情报清洗与聚合** | 查询 MaxMind ASN 数据库，过滤已知黑产蜜罐段与高欺诈 ASN，注入动态 Fake-IP 与分流规则 | 重构并生成兼容 Clash Verge Rev (YAML) 与 Sing-box (JSON) 的标准订阅配置文件 | 最终生成高可用精简订阅包，大幅降低本地客户端内存消耗 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('free/public-node-harvesting.md replaced');
    } else {
      console.log('free/public-node-harvesting.md match failed');
    }
    fs.writeFileSync('free/public-node-harvesting.md', c, 'utf8');
    console.log(`free/public-node-harvesting.md: ${initLen} -> ${c.length}`);
  }
}

runBatch4();
