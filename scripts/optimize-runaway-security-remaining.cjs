const fs = require('fs');

function updateRunaway() {
  let content = fs.readFileSync('runaway/index.md', 'utf8');
  const initialLen = content.length;

  // 1. Block #3: 4-step dispute flowchart
  const target1 = /```\s*【确认机场物理跑路 \/ 无法履约】[\s\S]*?第四步：跟进平台裁决[\s\S]*?```/;
  const replacement1 = `| 维权处置阶段 | 黄金行动时限 | 核心实操动作与平台通道 | 预期处置结果与风控效力 |
| :--- | :--- | :--- | :--- |
| **第一步：绝对证据链固化** | 突发异常 **2 小时内** | • 截存完整支付账单凭证（交易单号、商户号、扣款时间戳）<br>• 截存后台套餐服务时长、剩余流量与未到期会员凭据<br>• 截存官网 HTTP 502/域名无响应与全节点测速 100% 丢包图<br>• 截存 Telegram 官方群全员禁言、工单超时超 24 小时未回复证据 | 锁定不可推翻的客观违约事实，形成完整反欺诈举证材料链 |
| **第二步：支付渠道精准分流** | 事发 **2 ~ 24 小时内** | **【渠道 A：微信支付 (聚合商户)】**<br>打开微信支付凭证 ➔ 点击「常见问题」 ➔ 「投诉商户」 ➔ 选择「未收到货/商家失联」<br>**【渠道 B：支付宝 (生活号/企业商户)】**<br>账单详情 ➔ 「发现问题」 ➔ 「投诉商家」 ➔ 选择「涉嫌欺诈/服务未履约」<br>**【渠道 C：国际信用卡 / Stripe】**<br>立即致电发卡行客服电话 ➔ 申请「交易争议拒付 (Chargeback)」调单 | 触发聚合支付平台针对高风险商户的 **T+1 至 T+7 资金结算冻结池**，拦截商户提现 |
| **第三步：申诉话术合规红线** | 提交申诉表单关键节点 | **【严禁触发敏感词】** 严禁出现“翻墙、代理、梯子、VPN、节点”等字样！<br>**【官方推荐合规标准口径】**<br>“本人购买正规云计算网络调试与远程办公提速软件技术服务，付款后商家服务器全线关停，未履行任何约定服务，在线客服与技术支持彻底失联，涉嫌网络消费欺诈。特申请全额原路撤单退款，并请平台依法冻结涉案非法商户号资金以保全消费者合法权益。” | 紧扣「软件技术服务未履约」与「消费欺诈」，百分百契合第三方支付消费者保障条例，直接进入人工加速审核队列 |
| **第四步：平台裁决与资金返还** | 申诉后 **24 ~ 72 小时内** | 支付机构风控系统向涉案商户下发举证倒计时通知。跑路商家因主机已被拔线关停，无法在规定时限内提供有效履约物流或服务证明；倒计时结束后平台系统直接裁决买家胜诉。 | 争议款项由支付机构直接从商户质押冻结金中**原路退回至用户零钱/银行卡** |`;

  if (target1.test(content)) {
    content = content.replace(target1, replacement1);
    console.log('Replaced runaway/index.md Block #1 (Dispute Flowchart)');
  } else {
    console.log('Failed to match runaway Block #1');
  }

  // 2. Block #11: GFW DNS Hijack vs Real Runaway
  const target2 = /```\s*【客户端】 ───\(请求订阅域名\)───►[\s\S]*?\(服务其实完全正常！\)[\s\S]*?```/;
  const replacement2 = `| 链路请求模式 | 流量解析中转路径 | 触发阻断机制 | 客户端表面现象 | 真实网络底层状态 |
| :--- | :--- | :--- | :--- | :--- |
| **公网明文 DNS 请求** | 客户端 ➔ 国内公共 DNS (114.114.114.114 / 223.5.5.5) | GFW 应用层 DNS 缓存投毒，下发虚假不可达 IP (如 \`0.0.0.0\` 或垃圾保留地址) | 客户端更新订阅报错，官网打不开，新手误以为商家跑路 | **虚惊一场**：仅为 Web/订阅域名污染，核心中继与海外落地依然 100% 存活运行 |
| **底层加密代理穿透** | 客户端 Fake-IP / DoH ➔ 直连国内 BGP 物理入口中继 IP | 物理专线隧道底层加密，完全免疫公网 DNS 劫持与 SNI 阻断机制 | 节点毫秒级连通，4K 流媒体与跨境访问丝滑如常 | **完全正常**：待运营下发新订阅域名或在客户端预埋静态解析即可完全自愈 |`;

  if (target2.test(content)) {
    content = content.replace(target2, replacement2);
    console.log('Replaced runaway/index.md Block #2 (DNS Poisoning comparison)');
  } else {
    console.log('Failed to match runaway Block #2');
  }

  // 3. Block #21: Zero-trust 4-dimension matrix
  const target3 = /```\s*【消费者个人零信任防跑路四维矩阵】[\s\S]*?即便一家暴雷，网络秒级切换[\s\S]*?```/;
  const replacement3 = `| 零信任防跑路铁律 | 典型商家套路与陷阱识别 | 消费者坚守红线与行动准则 | 容灾防护成效 |
| :--- | :--- | :--- | :--- |
| **铁律一：死守纯月付底线** | 商家推出“年付 2 折”、“三年付特惠送永久”等超低折扣圈存巨额预收款，随后在第 6~10 个月资金断裂跑路 | 坚决拒绝年付/多年付诱惑，永远只买单月（最多季付），单次资金沉淀严格控制在 **10~30 元人民币以内** | 即使偶遇不可抗力关停，损失仅十数元，彻底杜绝被大资金盘割韭菜 |
| **铁律二：物理带宽成本测算** | 标榜“无限流量”、“年付 50 元每月 1000G”，折合每 GB 低于 0.005 元，远低于真实专线机房电费与租金底线 | 熟记专线批发成本（正规 IEPL/IPLC 每 GB 出网成本约 0.08~0.15 元）。凡单价低于 **0.05 元/GB** 的必为假专线或庞氏资金盘 | 识破超卖作坊虚标骗局，避开晚高峰卡死与资金盘爆仓风险 |
| **铁律三：双活主备异构容灾** | 将全部上网、流媒体、远程办公绑死在单一机场上，一旦其域名受阻或机房维护立即陷入断网瘫痪 | 严格构建「1 优质主力纯专线（如光速云纯月付）+ 1 纯按量计费不限时备用包」的 **双活主备容灾拓扑** | 主力线路遇突发波动时，客户端 1 秒内无缝切至备用线路，生产力与观影零中断 |`;

  if (target3.test(content)) {
    content = content.replace(target3, replacement3);
    console.log('Replaced runaway/index.md Block #3 (Zero-trust matrix)');
  } else {
    console.log('Failed to match runaway Block #3');
  }

  fs.writeFileSync('runaway/index.md', content, 'utf8');
  console.log(`runaway/index.md: before ${initialLen}, after ${content.length}`);
}

function updateSecurity() {
  let content = fs.readFileSync('security/index.md', 'utf8');
  const initialLen = content.length;

  // 1. Block #0: Supply chain poisoning
  const target1 = /```\s*恶意分发渠道 \(伪造官网\/TG群\) ──> 二次打包客户端 ──> 注入 Shellcode \/ DLL 劫持[\s\S]*?└──────────────────────────────────────────────────────────────────────────────────┘\s*```/;
  const replacement1 = `| 供应链攻击环节 | 渗透渠道与技术手法 | 终端植入恶意行为 | 典型危害与损失 |
| :--- | :--- | :--- | :--- |
| **恶意分发渗透** | 搜索引擎竞价黑产广告、破解软件论坛、第三方非官方网盘、仿冒 Telegram 频道 | 针对开源原版客户端（Clash Verge、v2rayN）进行反编译与二次加壳打包，注入 Shellcode 或劫持关键 DLL 文件 | 诱导用户关闭 Windows Defender 或给予管理员提权运行 |
| **本地凭证收割** | 本地文件扫描与 DPAPI 动态解密 | 暴力解密并窃取 Chrome / Edge / Firefox 本地数据库保存的明文密码、信用卡信息与 Session Cookie | 社交账号被盗、海外平台（GitHub、Google、AWS）会话被直接劫持 |
| **资产静默置换** | 剪贴板常驻内存监听与正则替换 | 毫秒级识别剪贴板中的 Bitcoin / Ethereum / USDT (TRC-20/ERC-20) 钱包地址并实时替换为黑客收款钱包 | 用户进行加密货币充提转账时资产被瞬间转移盗取 |
| **后门木马受控** | 释放轻量 Cobalt Strike Beacon 恶意木马 | 静默与境外黑产 C2 控制服务器建立心跳连接，将受害者 PC 变为分布式 DDoS 攻击与挖矿肉鸡 | 电脑风扇狂转、系统极度卡顿、企业内网横向渗透风险剧增 |
| **流量返利劫持** | 篡改订阅规则列表 (Rule-providers) | 强制向分流规则中注入静默跳转脚本，将电商购物与交易流量劫持至攻击者的返利推广 Affiliate 链接 | 隐私行为被无底线跟踪监视，个人数据在黑市被批量倒卖 |`;

  if (target1.test(content)) {
    content = content.replace(target1, replacement1);
    console.log('Replaced security/index.md Block #1 (Supply chain)');
  } else {
    console.log('Failed to match security Block #1');
  }

  // 2. Block #18: Four-tuple forensic correlation attack
  const target2 = /```\s*\+-----------------------------------------------------------------------------------------\+[\s\S]*?四元组交叉溯源分析模型[\s\S]*?【时间戳与包大小完全重合，身份链条彻底闭合】\s*```/;
  const replacement2 = `| 维度对比 | 境内运营商侧流量日志 (ISP Access Log) | 商业机场中继日志 (Airport Ingress Log) | 交叉关联溯源闭环判定 (Correlation Result) |
| :--- | :--- | :--- | :--- |
| **时间戳精度** | \`2026-10-22 20:15:30.124\` | \`2026-10-22 20:15:30.180\` | **时间差仅 56ms**：完全符合境内城域网到专线入口的传输时延 |
| **网络地址四元组** | 源 IP：\`114.88.xxx.xxx\` (张三家庭宽带真实公网 IP)<br>目的 IP：\`120.232.xxx.xxx\` (机场中转机房入口) | 接入源 IP：\`114.88.xxx.xxx\`<br>用户 UID：\`user_8848\` (张三注册账号) | **接入源 IP 与目标入口完全一致**，直接完成物理宽带与平台账号的身份绑定 |
| **数据包特征** | 发包数据量：\`1480 字节\` (包含 TLS 握手特征) | 接收数据包：\`1480 字节\` ➔ 转发目标：\`x.com:443\` | **封包大小与流量突增曲线 100% 吻合**，身份链路完全闭合 |
| **法律取证效力** | 证明该宽带账号在特定时间向特定机房发送了加密流量 | 证明该机房入口将该流量转发至特定境外网站与服务 | **两份日志一旦交叉调取**，即可形成铁证级别的端到端访问行为溯源闭环 |`;

  if (target2.test(content)) {
    content = content.replace(target2, replacement2);
    console.log('Replaced security/index.md Block #2 (Forensic Correlation)');
  } else {
    console.log('Failed to match security Block #2');
  }

  // 3. Block #24: Root CA MITM attack
  const target3 = /```\s*客户端发起请求 ──> \[安装了伪造根证书\][\s\S]*?用户浏览器地址栏【依然显示小绿锁】，完全失去警示作用！\s*```/;
  const replacement3 = `| 中间人劫持步骤 | 攻击者执行动作与诱导手法 | 系统底层状态演变 | 实际破坏与数据泄漏后果 |
| :--- | :--- | :--- | :--- |
| **1. 根证书诱导植入** | 恶意客户端以“去广告/免流/解密VIP”为幌子，诱导用户通过 UAC 弹窗将自签名假冒根证书导入系统的「受信任的根证书颁发机构」 | 本地操作系统底层 Trust Store 被攻破，系统完全盲目信任该攻击者颁发的任意证书 | 系统安全基石瞬间崩塌，任何假冒证书均被系统判定为合法正规机构 |
| **2. 动态伪造目标证书** | 当用户发起对银行、Google 或 Telegram 的 HTTPS 会话时，中间人代理动态签发一张对应域名的伪造数字证书与本地握手 | 客户端完成 TLS 握手，浏览器地址栏**依然显示正常的小绿锁与安全连接标志** | 用户在视觉上毫无察觉，误以为当前依然处于高强度端到端加密状态 |
| **3. 全流量完全明文解密** | 恶意代理在中间层直接拆解 TLS 封包，获取完全未经加密的原始明文 HTTP 数据 | 拦截并提取用户输入的登录账号、明文密码、银行卡 CVV、短信验证码与 Session Cookie | 所有个人机密与资产凭据在攻击者后台一览无余地实时记录在案 |
| **4. 伪装转发与掩盖痕迹** | 代理端再以正常客户端身份与境外真实目标服务器建立合法 TLS 连接并透明转发数据 | 网页正常打开，业务正常交互，用户毫无感知 | 攻击者既完成了数据全量截获，又没有破坏业务连续性，隐蔽性极高 |`;

  if (target3.test(content)) {
    content = content.replace(target3, replacement3);
    console.log('Replaced security/index.md Block #3 (Root CA MITM)');
  } else {
    console.log('Failed to match security Block #3');
  }

  // 4. Block #48: Chained Proxy Topology
  const target4 = /```\s*\[本地个人工作站\]\s*│[\s\S]*?仅记录自建 VPS 的纯净独立 IP，零风控，零日志关联威胁！\s*```/;
  const replacement4 = `| 代理链路层级 | 承担角色与网络实体 | 该节点能观察到的信息 (可见边界) | 该节点绝对无法知道的信息 (隐私盲区) | 核心防护价值 |
| :--- | :--- | :--- | :--- | :--- |
| **本地客户端** | 个人电脑 / 手机终端<br>(Clash Verge / Sing-box) | 发送给目标网站的原始请求与多层加密封包 | 无盲区（掌握端到端全链路） | 将数据包进行双重加密封装，建立内层与外层两条互不干扰的加密通道 |
| **跳板一：商业专线机场** | 国内 BGP 入口 ➔ 物理 IEPL 专线中继<br>(仅充当**高速物理加速隧道**) | • 用户本地真实宽带公网 IP<br>• 加密流量包体积与发包频率<br>• 外层目的地址：**境外的自建 VPS 节点 IP** | • **绝对不知道用户最终访问的具体网站**（访问的是 Google 还是 GitHub 完全不可见）<br>• **绝对无法解密内层真实传输数据** | 享受大厂专线的超低延迟与 4K 高带宽，同时剥离机场后台对个人隐私日志的溯源能力 |
| **跳板二：海外自建 VPS** | 境外独占轻量云服务器<br>(扮演**真实出口与端到端解密终点**) | • 来源 IP：商业专线机房的出口 IP<br>• 内层解密指令：要求代理访问目标网址 | • **绝对不知道使用者的真实境内宽带 IP**（其日志中只有机场专线机房的 IP） | 彻底斩断境外服务商对境内宽带 IP 的风控关联，保障独立专属 IP 纯净度 |
| **目标海外服务** | OpenAI / ChatGPT / 金融银行 / AWS | 仅记录境外自建 VPS 的单一纯净原生 IP | 彻底隔绝境内真实宽带 IP 与公共机场共享节点污染 | 零风控警告、零频繁验证码拦截、终身杜绝封号风控 |`;

  if (target4.test(content)) {
    content = content.replace(target4, replacement4);
    console.log('Replaced security/index.md Block #4 (Chained proxy)');
  } else {
    console.log('Failed to match security Block #4');
  }

  // 5. Block #58: DNS Leak Prevention
  const target5 = /```\s*┌─────────────────── 用户本地设备[\s\S]*?【绝对隐私：运营商只能看到密文】\s*```/;
  const replacement5 = `| DNS 解析方案 | 解析请求发送路径 | 运营商与监管可见信息 | 真实隐私防护等级 | 建议与最佳实践 |
| :--- | :--- | :--- | :--- | :--- |
| **方案 A：未配置防泄漏 DNS**<br>\`(传统明文 UDP 53)\` | 本地系统 ➔ 明文 UDP 53 发送至国内本地运营商 Local DNS (如 114.114.114.114 或省网 DNS) | **运营商日志精准留存：** 清晰记录你的宽带账号在特定时间点查询了哪些境外域名（如 x.com、github.com） | <RiskBadge type="danger">完全裸奔极高危</RiskBadge><br>即使正文走了加密代理，域名查询记录已被实时审计 | **坚决废弃**：立即关闭系统本地直接解析境外域名的默认行为 |
| **方案 B：正确配置 Fake-IP + DoH**<br>\`(现代高级分流标准)\` | 客户端内核本地即时分配虚拟 Fake-IP (如 198.18.0.x) ➔ 真实域名封装进代理加密隧道 ➔ 远程境外安全 DoH 递归解析 | **运营商完全抓瞎：** 运营商只能观察到本地与专线机房之间的不可解密加密数据流，对访问域名一无所知 | <RiskBadge type="success">绝对隐私零泄漏</RiskBadge><br>远程 DNS 在海外机房安全解析，彻底杜绝本地嗅探与 GFW 污染 | **强烈推荐**：在 Clash Verge Rev 或 Sing-box 中开启 \`enhanced-mode: fake-ip\` 与安全 DoH 解析 |`;

  if (target5.test(content)) {
    content = content.replace(target5, replacement5);
    console.log('Replaced security/index.md Block #5 (DNS leak)');
  } else {
    console.log('Failed to match security Block #5');
  }

  fs.writeFileSync('security/index.md', content, 'utf8');
  console.log(`security/index.md: before ${initialLen}, after ${content.length}`);
}

updateRunaway();
updateSecurity();
