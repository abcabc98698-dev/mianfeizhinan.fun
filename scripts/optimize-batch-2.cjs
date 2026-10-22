const fs = require('fs');

function runBatch2() {
  // 1. recommend/native-ip-streaming.md
  {
    let content = fs.readFileSync('recommend/native-ip-streaming.md', 'utf8');
    const initLen = content.length;

    // Block #2: 流媒体平台风控三级防御漏斗
    const t1 = /```text\s*┌────────────────────────────────────────────────────────────────────────┐\s*│\s*流媒体平台风控三级防御漏斗[\s\S]*?【终极解锁：4K HDR 杜比视界满码率】\s*```/;
    const r1 = `| 防御漏斗层级 | 风控技术手段与检测源 | 违规判定表现 | 达标与解锁标准 |
| :--- | :--- | :--- | :--- |
| **第一道防线：ASN 属性过滤** | IPinfo / MaxMind 商业情报库实时核验 ASN 类型 | 若 IP 被标记为 Data Center / Hosting (机房机架)，立即判定为商业代理，下发版权锁（仅允许播放 Netflix 自制剧，锁定独家版权片源） | 必须为真实原生 Residential / ISP 家宽属性，通过原生住宅 IP 认证 |
| **第二道防线：并发会话聚合检测** | 统计同一公网 IP 在 1 小时内的并发 Netflix 登录账号数与 TLS 客户端指纹 | 聚合账号数 > 500 且设备跨度极大 ➔ 标记为公共代理池，全员弹出「您似乎使用了代理/解除屏蔽工具」警告 | 单 IP 并发会话符合普通家庭正常网关范围，无异常并发突增 |
| **第三道防线：DNS 与地理冲突嗅探** | 校验客户端发起 DNS 请求的递归节点归属地与出口 TCP 落地经纬度一致性 | DNS 发生境外泄漏、漂移至其他大区或 WebRTC 泄漏本地真实地址 ➔ 触发地区版权锁定，报错无法播放 | DNS、IPv4、IPv6 与 WebRTC 经纬度绝对纯净对齐 ➔ **解锁 4K HDR 杜比视界最高画质** |`;

    if (t1.test(content)) {
      content = content.replace(t1, r1);
      console.log('recommend/native-ip-streaming.md Block #1 replaced');
    } else {
      console.log('recommend Block #1 match failed');
    }

    // Block #6: 三大落地 IP 类型网络拓扑对比
    const t2 = /```text\s*┌────────────────────────────────────────────────────────────────────────┐\s*│\s*三大落地 IP 类型网络拓扑对比[\s\S]*?100% 居民真实画像\s*```/;
    const r2 = `| IP 架构类型 | 网络拓扑与机房分配链路 | 伪装真实度与 ASN 属性 | 解锁能力与风控表现 |
| :--- | :--- | :--- | :--- |
| **类型 A：廉价机房广播 IP**<br>\`(伪住宅 Fake-Residential)\` | 离岸机房 VPS ➔ BGP 宣告广播他人 IP 段 ➔ 表面修改 IP 库标签 | ASN 属性底层仍为 Hosting，各大流媒体数据库更新周期内即被识破 | 极易被一锅端封杀，晚高峰高频弹「检测到代理」警告 |
| **类型 B：原生单 ISP IP**<br>\`(半纯净过渡型)\` | 数据中心托管母机 ➔ 向运营商租用单一宽带属性 IP 段 | ASN 显示为 ISP 运营商，但机房机架网络拓扑与硬件特征仍可被高级检测引擎识别 | 解锁普通版权片源尚可，但在 Netflix 严苛节点或严风控大区稳定性中等 |
| **类型 C：本土原生双 ISP 住宅 IP**<br>\`(顶级黄金标准)\` | 本土真实家庭光纤宽带 (如香港 HKT/宽频、台湾 HiNet、美国家庭 Comcast) ➔ 本土物理网关双向对等分配 | ASN、Org 与网络类型 100% 对齐本土居民物理宽带画像 | **永久稳定秒开 4K/8K 杜比视界**，跨区跨库零风控阻断 |`;

    if (t2.test(content)) {
      content = content.replace(t2, r2);
      console.log('recommend/native-ip-streaming.md Block #2 replaced');
    } else {
      console.log('recommend Block #2 match failed');
    }

    // Block #16: 4K 极致画质四大物理网络指标底线
    const t3 = /```text\s*┌────────────────────────────────────────────────────────────────────────┐\s*│\s*4K 极致画质四大物理网络指标底线[\s\S]*?\(彻底杜绝转圈重连\)\s*```/;
    const r3 = `| 物理网络关键指标 | 达标底线数值要求 | 作用机制与网络保障原理 | 不达标时的负面体验 |
| :--- | :--- | :--- | :--- |
| **指标一：单线程持续吞吐** | 晚高峰 **> 45 Mbps** | 满足 Netflix 4K HDR、YouTube 4K60fps 与 Disney+ 杜比视界最高码率峰值突发缓冲需求 | 播放过程中频繁降画质至 1080P 或 720P，色彩发灰 |
| **指标二：丢包率上限控制** | 晚高峰严格 **< 0.2%** | 防止 TCP 滑动窗口断崖式收缩，保障数据封包快速重传与流水线吞吐 | 画面频繁定格转圈，连接中断报错并需要重载网页 |
| **指标三：Jitter 延迟抖动** | 抖动方差 **< 3.0 ms** | 确保音频流、视频流与字幕元数据包时钟精准对齐，维持传输时延平稳 | 音画不同步、字幕跳跃延迟、偶发音轨爆音 |
| **指标四：客户端缓冲区深度** | 预载缓存 **> 30 秒** | 在网络遭遇瞬时微秒级抖动时，依靠本地内存缓冲区平滑消解网络扰动 | 播放进度条始终追不上缓存条，稍有网络抖动立即转圈卡死 |`;

    if (t3.test(content)) {
      content = content.replace(t3, r3);
      console.log('recommend/native-ip-streaming.md Block #3 replaced');
    } else {
      console.log('recommend Block #3 match failed');
    }

    fs.writeFileSync('recommend/native-ip-streaming.md', content, 'utf8');
    console.log(`recommend/native-ip-streaming.md: before ${initLen}, after ${content.length}`);
  }

  // 2. guide/protocol-client-setup.md
  {
    let content = fs.readFileSync('guide/protocol-client-setup.md', 'utf8');
    const initLen = content.length;
    const t = /```text\s*┌────────────────────────────────────────────────────────────────────────┐\s*│\s*2026 全平台主流客户端生态图谱[\s\S]*?• sing-box for Mac\s*```/;
    const r = `| 操作系统平台 | 推荐首选客户端 (性能与稳定性旗舰) | 备选进阶客户端 (轻量与特殊场景) | 核心特性与推荐理由 |
| :--- | :--- | :--- | :--- |
| **Windows** | **Clash Verge Rev** (基于 Mihomo 内核) | **sing-box / FlClash** | 完美支持现代规则集与 Fake-IP，支持 TUN 虚拟网卡接管全系统流量，低内存占用 |
| **macOS** | **Clash Verge Rev / sing-box for Mac** | **Surge for Mac / Stash** | 深度适配 Apple Silicon M 系列芯片，原生内存管理优秀，支持系统级代理分流 |
| **Android** | **FlClash / Clash Meta for Android** | **sing-box / Karing** | 界面直观清爽，分应用代理 (Per-App Proxy) 隔离国内银行与支付应用，耗电极低 |
| **iOS / iPadOS** | **Shadowrocket (小火箭) / Stash** | **sing-box / Loon** | 支持 URL 规则自动更新与策略组切换，后台保活稳定，抗应用杀后台能力强 |`;

    if (t.test(content)) {
      content = content.replace(t, r);
      console.log('guide/protocol-client-setup.md Block replaced');
    } else {
      console.log('guide/protocol-client-setup.md match failed');
    }
    fs.writeFileSync('guide/protocol-client-setup.md', content, 'utf8');
    console.log(`guide/protocol-client-setup.md: before ${initLen}, after ${content.length}`);
  }

  // 3. guide/node-selection-routing-rules.md
  {
    let content = fs.readFileSync('guide/node-selection-routing-rules.md', 'utf8');
    const initLen = content.length;
    const t = /```text\s*客户端入站流量[\s\S]*?url-test 自动挑选延迟最低专线\s*```/;
    const r = `| 分流规则分组 | 覆盖典型域名与应用服务 | 分流调度策略与节点绑定 | 预期效果与核心优势 |
| :--- | :--- | :--- | :--- |
| **境内流量直连组**<br>\`(DIRECT)\` | 微信、淘宝、支付宝、网银客户端、Bilibili、百度、知乎等国内服务 | 命中中国大陆 IP 与直连规则列表，完全走本地物理宽带直连 | 杜绝异地登录告警，本地宽带满速下载，节省境外代理流量 |
| **流媒体影音专组**<br>\`(Streaming Proxy)\` | Netflix、Disney+、YouTube Premium、HBO Max、Spotify 等 | 固定绑定香港、新加坡或台湾地区的**本土原生双 ISP 住宅节点** | 解锁完整独家片源，秒开 4K/8K 杜比视界，杜绝因 IP 飘移触发异地风控 |
| **AI 纯净大模型组**<br>\`(AI Service)\` | ChatGPT、Claude 3.5 Sonnet、OpenAI API、Midjourney、Cursor 等 | 固定绑定美国、英国等低欺诈分 (FraudScore < 15) 的独立专属原生节点 | 杜绝公共节点黑名单牵连封号，API 握手零拒绝，长对话响应丝滑 |
| **通用海外加速组**<br>\`(Global Auto)\` | Google 搜索、GitHub、Wikipedia、Twitter/X、境外技术文档等 | 采用 \`url-test\` 策略组，在多条物理专线中自动挑选延迟最低的优质节点 | 毫秒级页面打开速度，无感智能故障切换，保障全天候高可用 |`;

    if (t.test(content)) {
      content = content.replace(t, r);
      console.log('guide/node-selection-routing-rules.md Block replaced');
    } else {
      console.log('guide/node-selection-routing-rules.md match failed');
    }
    fs.writeFileSync('guide/node-selection-routing-rules.md', content, 'utf8');
    console.log(`guide/node-selection-routing-rules.md: before ${initLen}, after ${content.length}`);
  }

  // 4. guide/low-price-trap-dissection.md
  {
    let content = fs.readFileSync('guide/low-price-trap-dissection.md', 'utf8');
    const initLen = content.length;
    const t = /```text\s*\[收入项\] 500 名低价用户[\s\S]*?【推出年付大促销收割一波，然后就地解散跑路】\s*```/;
    const r = `| 经营财务与成本科目 | 5元超低价超卖小作坊模型 | 正规可持续专线机场模型 (如光速云) | 经营结局与对消费者的影响 |
| :--- | :--- | :--- | :--- |
| **月度总营收规模** | 500 名用户 × 5 元/月 = **¥2,500 元/月** | 数万用户 × 15~35 元/月 = **稳健高现金流** | 超低价作坊营收根本无法覆盖刚性运维成本，倒闭是必然结局 |
| **核心带宽机房支出** | 租不起正规 1Gbps BGP 专线 (需 ¥10,000+/月)，只能妥协使用超廉价公网 NAT 机器 (**¥800 元/月**) | 采购正规多省 BGP 入口与广港/沪日物理内网专线 (**每月数十万固定支出**) | 低价作坊在晚高峰出口直接拥塞至瘫痪，用户速度从 100M 暴跌至 2M |
| **支付手续费与损耗** | 聚合收单高危通道扣点 6%~10% (**¥150~250 元/月**) | 长期合规离岸企业商户，费率合理可控 | 低价站聚合通道频繁被封，资金极易遭冻结 |
| **实际净毛利与心理** | 扣除租金与扣点后月净利**不足千元**，却要承受域名天天被封与大量工单轰炸 | 规模化正向盈利，配备专业 7×24 小时技术运维与备用链路 | **低价站长的必然出路**：趁年底或双十一推出“三年付 50 元”超低促销收割一笔资金，然后迅速拔线解散跑路 |`;

    if (t.test(content)) {
      content = content.replace(t, r);
      console.log('guide/low-price-trap-dissection.md Block replaced');
    } else {
      console.log('guide/low-price-trap-dissection.md match failed');
    }
    fs.writeFileSync('guide/low-price-trap-dissection.md', content, 'utf8');
    console.log(`guide/low-price-trap-dissection.md: before ${initLen}, after ${content.length}`);
  }

  // 5. refund/dispute-chargeback-tactics.md
  {
    let content = fs.readFileSync('refund/dispute-chargeback-tactics.md', 'utf8');
    const initLen = content.length;
    const t = /```text\s*持卡人致电银行发起拒付 ──►[\s\S]*?商户支付通道直接被【永久注销拉黑】\s*```/;
    const r = `| 国际拒付 (Chargeback) 节点 | 运作机制与银行行动流程 | 商家面临的毁灭性风控打击 | 对持卡人资金的保护效力 |
| :--- | :--- | :--- | :--- |
| **1. 申请发起与款项冲正** | 持卡人致电发卡银行提出未履约消费争议，发卡行依据 Visa / Mastercard 规则将款项直接从商户结算账户冲正退还 | 商家收单行立刻冻结对应交易资金并扣缴持卡人退款 | 持卡人资金在 1~3 个工作日内先行原路回款，免受坏账损失 |
| **2. 强制罚金惩处** | 国际卡组织向商家强制加收 **$15 ~ $25 美元/笔** 的高额拒付手续费 (Chargeback Fee) | 不论最终商家胜诉与否，该笔罚金均不可撤销，小额虚假商户数笔罚金即可被罚至破产 | 倒逼商家不敢随意失联拒退，违约成本极高 |
| **3. 支付通道永久封禁** | 国际清算网络严密监控商户拒付率。一旦商户月度拒付率超过 **1.0%** 的警戒线，其商户号直接被永久吊销并列入国际黑名单 (MATCH List) | 商家彻底失去国际信用卡收单资格，无法再继续向任何海外用户收款 | 从源头彻底摧毁不法跑路商家的欺诈收款生命线 |`;

    if (t.test(content)) {
      content = content.replace(t, r);
      console.log('refund/dispute-chargeback-tactics.md Block replaced');
    } else {
      console.log('refund/dispute-chargeback-tactics.md match failed');
    }
    fs.writeFileSync('refund/dispute-chargeback-tactics.md', content, 'utf8');
    console.log(`refund/dispute-chargeback-tactics.md: before ${initLen}, after ${content.length}`);
  }

  // 6. review/peak-congestion-tolerance.md
  {
    let content = fs.readFileSync('review/peak-congestion-tolerance.md', 'utf8');
    const initLen = content.length;
    const t1 = /```text\s*晚间 20:30 公网出口流量暴增[\s\S]*?自动降级为模糊的 480P\s*```/;
    const r1 = `| 拥塞链条阶段 | 物理网络底层演变 | 协议栈反应与算法机制 | 终端用户实际体验灾难 |
| :--- | :--- | :--- | :--- |
| **1. 骨干交换机溢出** | 晚高峰 20:30~22:30，跨境公网出口总流量突破物理上限，骨干网路由器交换队列 Buffer 瞬间爆满 | 硬件触发主动随机丢包机制 (RED / Early Drop)，公网数据包丢失率从 0.1% 飙升至 15%~35% | 境外连接开始产生高延迟，网页加载进度条停滞 |
| **2. TCP 拥塞窗口减半** | 客户端与服务端 TCP 协议栈检测到 ACK 确认包连续丢失与乱序，判定网络发生严重堵塞 | 触发拥塞避免算法 (Congestion Avoidance)，**拥塞窗口 (CWND) 断崖式减半**（从 128 个封包收缩为 2 个封包） | 下载速率瞬间发生雪崩式暴跌，从 100Mbps 断崖暴跌至 2Mbps |
| **3. 播放缓冲区耗尽** | 视频播放器的数据流入速率远低于视频每秒播放码率，预载 Buffer 秒级清空 | 播放器无法获取后续视频关键帧数据，触发解码暂停与重试机制 | **4K 画面定格死锁、白圈狂转**，系统强制将画质从 2160P 锐降至 480P 模糊渣画质 |`;

    if (t1.test(content)) {
      content = content.replace(t1, r1);
      console.log('review/peak-congestion-tolerance.md Block #1 replaced');
    } else {
      console.log('review/peak-congestion-tolerance.md Block #1 match failed');
    }

    const t2 = /```text\s*吞吐速率 \(Mbps\)[\s\S]*?19:30\s*20:30\s*21:30\s*22:30\s*```/;
    const r2 = `| 线路架构类型 | 白天闲时吞吐 (14:00) | 晚高峰吞吐 (20:30~22:30) | 晚高峰丢包率与抖动 | 核心技术原因与用户体感 |
| :--- | :--- | :--- | :--- | :--- |
| **物理内网 IEPL 专线**<br>\`(如光速云 / 微风网络)\` | **恒定 280 ~ 300 Mbps** | **恒定 280 ~ 295 Mbps**<br>零波动满速 | 丢包率 **< 0.1%**<br>抖动 < 1.5ms | 境内入口直连陆缆/海缆内网通道，完全不走公网国际出口，晚高峰秒开 4K/8K 杜比视界零卡顿 |
| **优质公网 BGP 中继**<br>\`(中端商业中继)\` | 150 ~ 200 Mbps | **45 ~ 85 Mbps**<br>轻微波动 | 丢包率 **1.5% ~ 4.0%**<br>抖动 8~15ms | 虽然入口有 BGP 优化，但出境仍需走公网海缆，遭遇全网高峰时出现轻微降速，1080P/4K 偶尔需微缓冲 |
| **劣质公网直连小作坊**<br>\`(低价月付超卖站)\` | 50 ~ 80 Mbps | **< 3 Mbps**<br>准时雪崩断流 | 丢包率 **25% ~ 45%**<br>抖动 > 100ms | 严重超卖，公网出口 Buffer 队列完全爆满，20:30 准时断流转圈，甚至网页超时无法打开 |`;

    if (t2.test(content)) {
      content = content.replace(t2, r2);
      console.log('review/peak-congestion-tolerance.md Block #2 replaced');
    } else {
      console.log('review/peak-congestion-tolerance.md Block #2 match failed');
    }
    fs.writeFileSync('review/peak-congestion-tolerance.md', content, 'utf8');
    console.log(`review/peak-congestion-tolerance.md: before ${initLen}, after ${content.length}`);
  }

  // 7. review/pricing-cost-performance.md
  {
    let content = fs.readFileSync('review/pricing-cost-performance.md', 'utf8');
    const initLen = content.length;
    const t = /```text\s*每GB单价 \(元\/GB\)[\s\S]*?线路质量与稳定性\s*```/;
    const r = `| 定位象限 | 单价区间 (元/GB) | 线路质量与稳定性 | 典型代表定位与技术特征 | 适用人群与选购建议 |
| :--- | :--- | :--- | :--- | :--- |
| **象限 I：顶级政企物理专线** | 0.25 ~ 0.50 元/GB | SLA 99.99%，全天候恒定超低延迟与零丢包 | 豪华物理专线、独享带宽入口、企业级 SLA 保障 (如企业高 SLA 物理专线) | 金融外汇高频交易、跨国商业会议、关键生产力用户（预算充足） |
| **象限 II：海外品牌营销溢价** | 0.30 ~ 0.80 元/GB | 协议受阻严重，晚高峰公网海缆严重拥塞 | 海外商业 VPN 大厂，海量营销广告溢价，缺乏境内专线优化 | 适合海外归国小白，境内用户极不推荐（性价比低且极易被墙） |
| **象限 III：极致超售跑路作坊** | 0.005 ~ 0.03 元/GB | 晚高峰断流率高达 40% 以上，频繁全节点报错 | 1 元几百 G、超卖数十倍、年付割韭菜资金盘，缺乏刚性运营资金 | **坚决避坑**：表面极度廉价，实测连通率极低，数月内必然跑路 |
| **象限 IV：黄金性价比主力梯队** | **0.08 ~ 0.18 元/GB** | **晚高峰稳健满速，秒开 4K，纯内网穿透** | **光速云 (Guangsu Cloud)**、**飞猫云 (Flycat Cloud)**、**微风网络**<br>真实内网专线/BGP 中继，支持纯月付与灵活退订 | **普通大众与技术极客首选**：踩准物理成本最优平衡点，高稳定性高性价比 |`;

    if (t.test(content)) {
      content = content.replace(t, r);
      console.log('review/pricing-cost-performance.md Block replaced');
    } else {
      console.log('review/pricing-cost-performance.md match failed');
    }
    fs.writeFileSync('review/pricing-cost-performance.md', content, 'utf8');
    console.log(`review/pricing-cost-performance.md: before ${initLen}, after ${content.length}`);
  }

  // 8. runaway/index.md (Block at line 298)
  {
    let content = fs.readFileSync('runaway/index.md', 'utf8');
    const initLen = content.length;
    const t = /```\s*【真正具备抗风险韧性的顶级机场架构拓扑】[\s\S]*?具备 6 个月以上刚性机房租金准备金\s*```/;
    const r = `| 容灾冗余体系 | 核心节点与技术配置 | 异地容灾与故障自愈机制 | 抵御跑路/瘫痪成效 |
| :--- | :--- | :--- | :--- |
| **入口冗余体系**<br>\`(Dual BGP Entry)\` | • **主入口**：江苏移动/浙江电信高端 BGP 入口 (万兆独享带宽，全国三网低跳数接入)<br>• **备入口**：广西南宁联通/广东异地跨省接入点 (全天候冷热备用) | 入口机房遭遇拔线、断电或 DDoS 泛洪攻击时，客户端 DNS/Anycast 毫秒级自动解析重定向至备用机房 | 杜绝入口单点故障导致的全局失联 |
| **传输链路冗余体系**<br>\`(Dual Physical Cable)\` | • **主专线**：广港物理 IEPL 内网专线 (端到端低至 5~8ms，全内网无视 GFW)<br>• **备专线**：沪日 / 京德 IPLC 跨洋物理专线 (异地异构物理光缆热备) | 主线遭遇海底光缆地震切断或机房检修时，BGP 边界路由器自动将数据包分流注入备用专线 | 彻底摆脱公网拥塞与海缆割接断网危机 |
| **落地调度与财务准备**<br>\`(Anycast & Reserve)\` | • **落地机房**：覆盖全球 50+ 节点，自有 ASN 广播，原生双 ISP 家宽动态漂移<br>• **财务准备金**：离岸实体公司托管，常备 6 个月以上刚性机房租金与专线抵押金 | 具备充足现金流抗击突发运营挤兑，服务器永不因欠费被上游 IDC 强行关停清退 | 从根本上杜绝资金链断裂跑路风险 |`;

    if (t.test(content)) {
      content = content.replace(t, r);
      console.log('runaway/index.md (Top Tier Architecture) Block replaced');
    } else {
      console.log('runaway/index.md (Top Tier Architecture) match failed');
    }
    fs.writeFileSync('runaway/index.md', content, 'utf8');
    console.log(`runaway/index.md: before ${initLen}, after ${content.length}`);
  }
}

runBatch2();
