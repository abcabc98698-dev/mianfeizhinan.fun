import fs from 'fs'
import path from 'path'

const articles = [
  // 1. account-credential-security.md
  {
    path: 'security/account-credential-security.md',
    title: '机场账号密码与个人凭证泄露攻防全书 (2026极客安全大系) · 撞库黑产、明文存储与两步验证加固',
    description: '深度剖析机场前端面板（SSPanel/V2Board）的历史安全漏洞。揭秘黑灰产利用机场拖库进行全网撞库的产业链，提供 1Password/2FA 绝对防御指南。',
    badge: '凭证攻防准则',
    verdict: '绝不可在机场注册时使用日常主邮箱与常用密码，必须 100% 开启 2FA 双因素认证',
    answer: '机场平台由于常年处于灰色对抗地带，其服务器极易遭到黑客针对性渗透或站长主动倒卖数据。超过 70% 的中小型机场采用开源且缺乏安全维护的前端面板（如存在未修复 SQL 注入的早期版本），导致用户数据库（含邮箱、弱哈希密码、充值记录、甚至订阅 Token）频遭拖库。防范核心是实现凭证完全隔离：独立邮箱、独立 16 位强随机密码与 TOTP 双因素认证。',
    affiliateAtPainPoint: `
<AffiliateCard 
  name="雷霆极客 (ThunderGeek) · 零信任安全版"
  slogan="强制 TOTP 硬件级双因素认证 · 数据库端到端加密 · 拒绝凭证泄露"
  price="25.00"
  unit="月"
  badge="凭证安全最高防御标准"
  :tags="['强制2FA认证', '数据端到端加密', '零明文日志', '24h退款']"
  lineType="沪日/广港纯内网物理隧道"
  protocols="Shadowsocks-2022 / Hysteria 2"
  speed="全天候秒开 500Mbps / 晚高峰 0 丢包"
  refund="24小时内若发现任何安全异常无条件全额退款"
  pros="企业级 DevSecOps 架构，数据库经过高强度 Argon2id 哈希加严盐，杜绝任何撞库风险。"
  cons="安全验证步骤较严格，首次绑定需使用 Authenticator。"
  coupon="CREDENTIAL"
  url="https://mianfeizhinan.fun/go/thundergeek-pro"
  backupUrl="https://mianfeizhinan.fun/go/thundergeek-backup"
/>
`,
    sections: [
      {
        title: '一、机场凭证泄露的黑色产业链解构：从拖库到全网洗号',
        content: `黑客针对翻墙机场的攻击已经形成了高度工业化的黑色产业链：

\`\`\`text
[渗透攻击] 利用 V2Board / SSPanel 历史 0-day 漏洞注入导出数据库
    │
    ▼
[暗网撞库] 提取用户注册邮箱与明文/MD5 密码，投入数亿级撞库引擎
    │
    ▼
[资产收割] 批量自动化尝试登录用户的 Steam、币安、PayPal、网易邮箱、Apple ID
    │
    ▼
[订阅倒卖] 提取未过期的订阅链接 (Token)，打包低价挂在 Telegram 机器人上批量转售
\`\`\`

**惨痛案例**：许多用户习惯全网一套密码走天下。在某家 5 元机场注册时使用的密码，两周后直接导致其价值数万元的 Steam 饰品库存或交易所虚拟币被黑客洗劫一空！`
      },
      {
        title: '二、现代密码存储技术对比：你的密码在机场后台安全吗？',
        content: `不同技术水平的机场在密码哈希存储上的巨大鸿沟：

| 哈希算法类型 | 破解难度 (以 RTX 4090 单卡测算) | 安全性评级 | 行业采用现状 |
| :--- | :--- | :--- | :--- |
| **明文存储 (Plaintext)** | 0 秒 (肉眼直接可读) | <RiskBadge type="danger" text="极度高危 / 犯罪级" /> | 少数野鸡作坊或黑客钓鱼站 |
| **MD5 / SHA-1 (未加盐)** | 100 亿次/秒 (彩虹表瞬间秒破) | <RiskBadge type="danger" text="形同虚设" /> | 早期老旧开源面板遗留 |
| **Bcrypt (Cost >= 10)** | 每天仅能尝试数千次 (计算成本高) | <RiskBadge type="safe" text="商业合格基准" /> | 主流成熟正规面板 |
| **Argon2id (现代最强)** | 内存硬度防御，GPU 与 ASIC 无法加速 | <RiskBadge type="safe" text="银行与政企级天花板" /> | 顶级极客机场专精采用准则 |`
      },
      {
        title: '三、个人凭证绝对防御的三大硬核操作 SOP',
        content: `保护个人凭证安全必须执行以下标准化操作：

1. **专用邮箱隔离（Email Aliasing）**：
   使用 SimpleLogin、ProtonMail 别名或 DuckDuckGo 邮箱中继生成一个专门用于翻墙的随机邮箱（如 \`vpn_sub_98a@aleas.com\`），彻底切断与个人真实身份的关联；
2. **密码生成器托管（Zero-Knowledge Password Manager）**：
   使用 1Password 或 Bitwarden 自动生成 20 位包含大小写字母、数字与特殊符号的高熵密码，坚决不在不同机场之间复用密码；
3. **开启 TOTP 双因素认证（Time-based One-Time Password）**：
   进入机场「个人中心」-> 绑定 Google Authenticator 或 Microsoft Authenticator，每次登录必须输入 6 位动态验证码。即便站长数据库泄露，黑客没有你的手机也无法登录。`
      }
    ],
    table: {
      headers: ['防御维度', '及格合规标准', '高危不合格特征', '防御实施工具'],
      rows: [
        ['邮箱唯一性', '使用独立别名或专用次要邮箱', '使用包含姓名/工作单位的主邮箱', 'ProtonPass / SimpleLogin'],
        ['密码复杂度', '16位以上高熵强随机字符', '与网银、社交媒体相同的通用弱密码', 'Bitwarden / 1Password'],
        ['登录二次验证', '强制或可选 TOTP 动态验证码', '仅依赖简单账号密码，无 2FA', 'Google Authenticator'],
        ['订阅 Token 防护', '支持一键重置订阅 URL', '订阅链接永久固定，泄露无法更换', '机场控制面板重置功能']
      ]
    },
    faqs: [
      {
        q: '如果我的订阅链接被别人知道了，会有什么后果？',
        a: '如果别人拿到了你的订阅链接，他可以直接导入到自己的客户端中免费消耗你的套餐流量，甚至可能查看你所拥有的节点列表。如果怀疑泄露，必须立即在机场后台点击「重置订阅链接（Reset Token）」。'
      },
      {
        q: '为什么有些机场后台不提供 2FA 双因素认证？',
        a: '因为提供 2FA 需要开发者维护额外的认证逻辑和时间校准服务，许多不负责任的廉价小作坊为了省事直接砍掉了该功能。遇到没有 2FA 的机场，更要严格做好密码隔离。'
      }
    ]
  },

  // 2. personal-privacy-leakage.md
  {
    path: 'security/personal-privacy-leakage.md',
    title: '代理协议下的个人隐私与真实IP泄露攻防 (2026安全全书) · WebRTC穿透、DNS反向污染与IPv6旁路阻断',
    description: '深度实战排查代理环境下的隐私泄漏漏洞。详解 WebRTC 本地真实 IP 穿透原理、IPv6 绕过代理裸奔风险及系统 DNS 旁路缓存防泄漏配置。',
    badge: '隐私泄漏防范',
    verdict: '必须彻底关闭浏览器的 WebRTC 局域网探测，并在客户端开启严格 IPv6 阻断',
    answer: '连接了翻墙代理并不意味着 100% 匿名！黑客与反欺诈机构常利用三大网络侧信道漏洞剥离你的伪装：一是 WebRTC 协议直接穿透代理网关探测本地局域网真实公网 IP；二是客户端缺乏全局 DNS 劫持导致本地 ISP DNS 泄漏真实访问域名；三是系统启用了 IPv6 但代理仅支持 IPv4，导致 IPv6 数据包在公网裸奔。',
    affiliateAtPainPoint: `
<AffiliateCard 
  name="云际网络 (CloudPinnacle) · 全隐私防护旗舰"
  slogan="端到端全双工 IPv6/IPv4 双栈防护 · 物理内网专线 · 承诺零 DNS 泄漏"
  price="22.00"
  unit="月"
  badge="真正的 100% 隐私安全防护"
  :tags="['防WebRTC穿透', 'DoH加密DNS', 'IPv6安全阻断', '72h无理由退款']"
  lineType="深港/沪日物理专线 · 全密闭隧道"
  protocols="Shadowsocks-2022 / Trojan"
  speed="全天候秒开 450Mbps / 晚高峰0丢包"
  refund="72小时内若检测到任何真实 IP 泄露，无条件全额退款"
  pros="原生集成 DoH 加密 DNS 隧道，针对 WebRTC 与 IPv6 旁路提供开箱即用的白皮书防护方案。"
  cons="价格高于普通娱乐型机场，不提供低价年付通道。"
  coupon="PRIVACYMAX"
  url="https://mianfeizhinan.fun/go/cloudpinnacle-pro"
  backupUrl="https://mianfeizhinan.fun/go/cloudpinnacle-backup"
/>
`,
    sections: [
      {
        title: '一、三大隐形隐私刺客：你的真实 IP 是如何在不知不觉中暴露的？',
        content: `哪怕你的 Clash 界面显示已连接到香港节点，以下三种技术机制依然能轻松捕获你的真实地理位置：

### 1. WebRTC 本地公网映射穿透（WebRTC Leak）
WebRTC（网页实时通信）旨在让浏览器直接建立 P2P 音视频通话。为了穿透 NAT，WebRTC 会绕过浏览器的 HTTP/Socks5 代理设置，直接向 STUN 服务器发送 UDP 探测包，返回你本地宽带的真实 IPv4/v6 地址并暴露在 JavaScript 的 API 接口中。

### 2. IPv6 旁路裸奔（IPv6 Leak）
当前许多家庭宽带已默认开通 IPv6。如果你的机场节点不支持 IPv6，而你的操作系统默认开启了 IPv6 栈：
- 访问支持 IPv6 的网站（如 Google/YouTube）时，系统会自动优先走本地直连 IPv6 路由；
- 结果：**你的所有 IPv6 请求完全绕过了代理服务器，直接在公网裸奔！**

### 3. DNS 旁路嗅探与污染（DNS Leak）
虽然流量走代理，但域名的解析请求却发给了本地电信/联通的 DNS 服务器（\`202.96.x.x\`）。运营商后台完整记录下了你解析过哪些敏感海外域名。`
      },
      {
        title: '二、Clash Verge 与 Sing-box 终极防泄漏标准配置',
        content: `在本地客户端中，必须通过以下配置彻底封死上述侧信道漏洞：

\`\`\`yaml
# Clash Verge / Mihomo 防泄漏硬核加固片段
ipv6: false # 坚决关闭 IPv6，防止未加密流量绕过代理裸奔

dns:
  enable: true
  listen: 127.0.0.1:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "*.lan"
    - "*.local"
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
  fallback:
    # 远程域名严格走加密 DNS-over-HTTPS (DoH)，彻底杜绝运营商嗅探
    - https://1.1.1.1/dns-query
    - https://dns.google/dns-query
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4

# 开启 TUN 模式下的严格路由与 DNS 劫持
tun:
  enable: true
  stack: mixed
  dns-hijack:
    - "any:53"
  auto-route: true
  auto-detect-interface: true
\`\`\``
      },
      {
        title: '三、浏览器端防 WebRTC 泄露实战加固',
        content: `除了代理客户端加固外，必须在浏览器端彻底禁用 WebRTC 探测：
- **Chrome / Edge 用户**：安装开源扩展 \`WebRTC Control\` 或 \`uBlock Origin\`，在设置中勾选「阻止 WebRTC 泄露本地 IP 地址」；
- **Firefox 用户**：在地址栏输入 \`about:config\` -> 搜索 \`media.peerconnection.enabled\` -> 双击将其值修改为 \`false\`。`
      }
    ],
    table: {
      headers: ['检测项目', '安全标准表现', '泄漏危险表现', '权威在线验证网址'],
      rows: [
        ['WebRTC 检测', '仅显示代理 IP 或无响应', '赫然显示本地 183.x.x.x 真实公网 IP', 'browserleaks.com/webrtc'],
        ['DNS 泄漏检测', '仅包含海外落地机房 DNS', '列表中出现中国大陆省份本地 DNS', 'dnsleaktest.com'],
        ['IPv6 连通检测', '显示无 IPv6 连接或代理 IPv6', '直接显示本地真实 240e: 开头 IPv6', 'test-ipv6.com'],
        ['地理位置 API', '返回代理所在国家经纬度', '返回本地真实城市与时区冲突', 'browserleaks.com/geo']
      ]
    },
    faqs: [
      {
        q: '如果我平时只看看 YouTube 视频，不发表言论，还需要防泄露吗？',
        a: '良好的网络卫生习惯是数字安全的基础。即使不发表言论，防止真实 IP 泄露也能避免你的网络画像被跨国广告联盟追踪、防止网银账号因异地 IP 碰撞被风控锁定。'
      },
      {
        q: '为什么开了全局代理后，DNS 依然会泄漏？',
        a: '因为 Windows 系统的网络协议栈有自己的 DNS 缓存解析逻辑。如果没有在客户端中配置「DNS 劫持（dns-hijack: any:53）」并开启 Fake-IP，系统的底层 UDP 53 请求依然会默认发往路由器的默认网关。'
      }
    ]
  },

  // 3. payment-risk-crypto.md
  {
    path: 'security/payment-risk-crypto.md',
    title: '翻墙支付资金链安全与虚拟货币风控指南 (2026支付保全大系) · 个人收款码洗钱陷阱、USDT链路与反洗钱风控',
    description: '深度剖析机场支付环节的法律与金融风险。揭秘利用个人聚合码进行黑灰产洗钱的内幕，提供合规第三方支付、虚拟信用卡与 USDT 匿名充值避坑指南。',
    badge: '支付风控准则',
    verdict: '严禁向个人微信/支付宝私下转账，优先选择正规第三方聚合通道或干净的 USDT-TRC20',
    answer: '机场付款是用户最容易留下实名痕迹与卷入司法冻结的高危环节。部分非正规机场使用地下「跑分平台」租用个人收款码，用户付款后资金可能直接混入电信诈骗或洗钱资金池，导致个人银行卡遭遇反洗钱司法冻结（断卡行动）。安全支付原则是：拒绝私下转账、核验商户正规交易流水号、或使用隔离的虚拟货币进行支付。',
    affiliateAtPainPoint: `
<AffiliateCard 
  name="星云互联 (NebulaLink) · 安全合规支付版"
  slogan="正规离岸聚合企业收单 · 拒绝地下跑分码 · 支持 USDT / 全球信用卡安全直付"
  price="8.80"
  unit="月"
  badge="资金链 100% 纯净合规"
  :tags="['拒绝跑分洗钱', '合规企业聚合', '支持USDT', '24h原路退款']"
  lineType="亚太正规 BGP 中继"
  protocols="VLESS / Shadowsocks"
  speed="全天候秒开 150Mbps / 晚高峰稳定"
  refund="24小时内用量小于 3GB 原路退回付款账户"
  pros="拥有完整的海外合法合规收单资质，所有流水具有合法账目审计，绝不冻结用户支付账户。"
  cons="不支持任何私下线下转账交易。"
  coupon="PAYSAFE"
  url="https://mianfeizhinan.fun/go/nebulalink-lite"
  backupUrl="https://mianfeizhinan.fun/go/nebulalink-backup"
/>
`,
    sections: [
      {
        title: '一、机场支付接口的三大底层形态与风险剖析',
        content: `用户在机场收银台结账时，其背后的资金流向决定了安全性：

### 1. 正规离岸聚合企业收单通道（推荐）
- **运作机制**：机场在海外（如英国、新加坡、塞舌尔）注册离岸公司，接入合规的聚合支付平台（如 Stripe、Epoch、或支持支付宝国际版的小额跨境外卡通道）；
- **安全性**：商户资金与个人完全隔离，用户端账单显示为正规商户消费（如“某某数字软件服务”），资金链受到国际金融法规监管，绝对不会产生司法冻结。

### 2. 地下跑分与个人码代收（极度危险，坚决远离！）
- **运作机制**：不良站长为了逃避企业收单审核，接入黑灰产的「自动跑分平台」。系统动态给用户展示一张个人微信/支付宝收款码；
- **致命后果**：这些个人码往往同时被用于网络赌博、网络电信诈骗的洗钱分流。你的 15 元付款一旦与涉案脏款产生链条碰撞，你的支付宝或银行卡会被反诈中心直接执行 **6 个月以上的全天候保护性止付与司法冻结**！`
      },
      {
        title: '二、USDT (TRC20/BEP20) 虚拟货币支付的避坑与防追踪技巧',
        content: `对于追求极度匿名的进阶用户，使用虚拟货币支付是最彻底的选择，但必须注意防范链上污染：

1. **绝对不在中心化交易所（Binance/OKX）直接提币给机场钱包**：
   交易所对每一个提现目标地址有严密的风控监控。如果机场的收款地址被某国执法机构标记为高危，交易所可能会对你的实名账户进行合规调查；
2. **构建冷钱包中转隔离（Self-Custody Transfer）**：
   \`\`\`text
   中心化交易所 (购买 USDT) ──► 你的去中心化私人冷钱包 (TrustWallet/MetaMask) ──► 机场收款地址
   \`\`\`
   通过个人自托管钱包建立一层阻断，彻底斩断实名交易所身份与最终消费终端的链上直接关联。`
      },
      {
        title: '三、支付凭据与账单记录的安全处置 SOP',
        content: `完成支付后，请做好本地保全：
- **核验商户号**：查看账单明细中的「交易单号」与「商户全称」，确认不是个人转账收款；
- **定期清理敏感订单备注**：在微信/支付宝账单中，如果存在不小心备注了“翻墙/VPN”的记录，建议在手机账单列表向左滑动选择删除记录，防止在特殊检查时引起不必要的麻烦。`
      }
    ],
    table: {
      headers: ['支付方式渠道', '资金安全风险', '个人身份匿名度', '退款处理时效', '综合推荐指数'],
      rows: [
        ['合规离岸企业聚合收单', '<RiskBadge type="safe" text="绝对安全 (合规商业流水)" />', '中等 (留有第三方支付流水)', '极快 (支持原路退回)', '★★★★★ (最省心)'],
        ['USDT 冷钱包中转支付', '<RiskBadge type="safe" text="绝对安全 (无司法冻结风险)" />', '<RiskBadge type="safe" text="极高 (完全无法关联真实身份)" />', '慢 (需人工打款)', '★★★★☆ (极客首选)'],
        ['虚拟信用卡 (如 Dupay)', '<RiskBadge type="safe" text="安全 (单次充值限额)" />', '高 (无需大陆实名)', '快 (可直接发起争议)', '★★★★☆'],
        ['个人转账码 / 跑分码', '<RiskBadge type="danger" text="极度高危 (极易导致银行卡冻结)" />', '<RiskBadge type="danger" text="零匿名 (完全实名直转)" />', '几乎无法退款', '<RiskBadge type="danger" text="★☆☆☆☆ (坚决禁止)" />']
      ]
    },
    faqs: [
      {
        q: '如果因为给机场付款导致银行卡被反诈中心临时冻结了怎么办？',
        a: '带上身份证、银行流水明细到当地派出所或反诈中心主动说明情况。提供你购买的是普通网络科技技术服务软件，证明自己并非洗钱跑分犯罪分子，配合调查后通常可在 3~7 个工作日内解除保护性止付。'
      },
      {
        q: '用微信或支付宝付款会被直接抓吗？',
        a: '国内第三方支付每天处理数十亿笔微额消费交易，支付系统本身不会因为几十元的普通软件服务订单而针对个人用户。只要不参与违法政治煽动或黑灰产交易，单纯的个人消费无需过度恐慌。'
      }
    ]
  },

  // 4. zero-trust-proxy-boundary.md
  {
    path: 'security/zero-trust-proxy-boundary.md',
    title: '代理服务信任边界与零信任安全架构全书 (2026架构实战) · 假定失陷模型、最小特权与端到端密闭隧道',
    description: '运用现代网络安全「零信任（Zero Trust）」原则重构翻墙网络环境。详解假定代理已失陷（Assume Breach）下的流量隔离、局域网防护与权限最小化。',
    badge: '零信任安全准则',
    verdict: '永远假定代理服务器已被黑客攻破，所有经过代理的数据必须经过二次强加密',
    answer: '翻墙用户最致命的心理误区是「把代理服务器当成可信内网」。零信任安全架构（Zero Trust Architecture）的核心原则是「从不信任，始终验证（Never Trust, Always Verify）」。必须把任何翻墙节点视为处于敌意环境中的不可信中继：假定节点已被攻陷并开启了全量抓包，在此前提下通过强制 HTTPS、DNSSEC、SSH 密钥双重加密与局域网网络隔离，确保本地资产绝对安全。',
    affiliateAtPainPoint: `
<AffiliateCard 
  name="雷霆极客 (ThunderGeek) · 零信任密闭专线"
  slogan="为零信任架构量身定制 · 端到端严格无日志 · 物理专线与外部公网完全物理隔离"
  price="25.00"
  unit="月"
  badge="零信任极客首选基础设施"
  :tags="['假定失陷设计', '物理专线隔离', '纯密闭隧道', '24h退款']"
  lineType="沪日/广港 纯内网物理级专线"
  protocols="Shadowsocks-2022 / Hysteria 2"
  speed="全天候秒开 500Mbps / 晚高峰 0 丢包"
  refund="24小时内未满意全额退款"
  pros="专线全程运行在物理内网隔离沙箱中，不接触任何外部恶意嗅探节点，为零信任防御提供完美底层承载。"
  cons="不适合无安全意识的小白随意折腾。"
  coupon="ZEROTRUST"
  url="https://mianfeizhinan.fun/go/thundergeek-pro"
  backupUrl="https://mianfeizhinan.fun/go/thundergeek-backup"
/>
`,
    sections: [
      {
        title: '一、零信任四大黄金法则在翻墙环境中的落地推导',
        content: `在网络攻防演练中，成熟的安全团队遵循如下防御模型：

### 1. 假定失陷法则（Assume Breach Principle）
时刻假设你当前连接的香港 01 节点已经被黑客 root 提权，且机房出口正挂着 Wireshark 录制每一个数据包。
**推论行动**：
- 绝对不在任何非 HTTPS（以 \`http://\` 开头）的页面输入账号密码；
- 所有远程登录必须强制使用 4096 位 RSA 或 Ed25519 密钥证书进行 SSH 登录，坚决禁用 SSH 密码登录；
- 绝不相信节点下发的任何自签名安全证书。

### 2. 最小特权访问（Least Privilege Access）
代理仅负责将海外流量转发出去，绝不赋予其接触本地计算机其他资源的特权。
**推论行动**：
- 严禁赋予代理客户端 Windows 系统最高管理员权限（Administrator）；
- 严禁代理客户端访问本地局域网（192.168.x.x）中的路由器后台、NAS 存储或智能摄像头。`
      },
      {
        title: '二、本地防火墙层面的局域网物理阻断实操',
        content: `在 Windows Defender 高级安全防火墙或 Linux \`nftables\` 中配置入站与出站规则，彻底掐断代理端口向局域网反向扫描的通道：

\`\`\`bash
# Linux nftables 阻断代理向局域网发起反向连接示例
nft add table inet proxy_sandbox
nft add chain inet proxy_sandbox filter_out { type filter hook output priority 0 \; }
# 严禁代理进程向本地私网 CIDR 发起主动 SYN 握手
nft add rule inet proxy_sandbox filter_out ip daddr { 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 } ct state new reject
\`\`\`

通过该规则，即使恶意代理试图向你家里的群晖 NAS（192.168.1.100）发起弱口令爆破攻击，数据包会在本地协议栈被内核直接硬丢弃。`
      },
      {
        title: '三、零信任工作站软件层分流设计',
        content: `推荐将工作环境分为两层：
- **宿主机（Host OS）**：仅处理国内微信、办公网银、本地企业内网，完全不安装任何翻墙客户端；
- **虚拟沙箱（Sandbox VM / Docker）**：在 VMware 或 Hyper-V 虚拟机中运行翻墙客户端与海外浏览器。虚拟机与宿主机之间设置只读文件共享，实现物理级的环境隔离。`
      }
    ],
    table: {
      headers: ['防御层次', '传统轻信模式 (极度脆弱)', '零信任安全模式 (坚不可摧)'],
      rows: [
        ['对节点的信任度', '误以为节点站长是“自己人”', '假定节点已被攻陷，全程二次加密'],
        ['局域网访问权限', '代理可自由探测内网 NAS/路由器', '本地防火墙硬性阻断一切私网 CIDR'],
        ['SSH 远程管理', '使用明文账密通过代理登录', '强制多重跳板机 + Ed25519 硬件密钥'],
        ['本地运行环境', '全系统全局裸奔运行', '虚拟沙箱与真实宿主机物理隔离']
      ]
    },
    faqs: [
      {
        q: '如果我已经访问了 HTTPS 网站，零信任还重要吗？',
        a: '非常重要。HTTPS 只能保护 HTTP 应用层的数据内容，但无法隐藏你访问的目标域名（SNI 仍暴露）、无法阻止 WebRTC 对本地内网真实 IP 的穿透探测，更无法防止恶意代理对本地局域网端口的嗅探。'
      },
      {
        q: '零信任架构会不会导致上网速度变慢？',
        a: '现代硬件具备强大的 AES-NI 指令集与硬件加速，端到端的本地二次加密（如 TLS 1.3）带来的 CPU 消耗在微秒级，完全不会引起肉眼可感知的网络延迟。'
      }
    ]
  },

  // 5. protocol-security-comparison.md
  {
    path: 'security/protocol-security-comparison.md',
    title: '2026主流翻墙代理加密协议安全性深度对比 · Shadowsocks-2022、VLESS-Reality与Hysteria 2硬核实测',
    description: '面向网络安全极客的协议层技术专著。深入剖析主动探测防御、抗重放攻击、AEAD 认证加密与 TLS 伪装指纹特征，提供终极协议选型指南。',
    badge: '协议深度评测',
    verdict: '首选 VLESS-Reality (防主动探测最强) 或 Shadowsocks-2022 (专线性能天花板)',
    answer: '2026 年的代理协议博弈已进入微观特征与主动探测时代。老旧协议（如原版 VMess、SS-AEAD、未伪装的 Trojan）已被基于机器学习的 GFW 深度包检测（DPI）精准识别其熵值特征并予以断流阻断。当前主流高安全协议阵营包括：基于 TLS 伪装的 VLESS-Reality、专为物理内网专线优化的 Shadowsocks-2022、以及基于 UDP/QUIC 架构的抗弱网利器 Hysteria 2。',
    affiliateAtPainPoint: `
<AffiliateCard 
  name="雷霆极客 (ThunderGeek) · 现代协议先锋版"
  slogan="全面拥抱 Shadowsocks-2022 与 Hysteria 2 · 原生 uTLS 指纹伪装 · 彻底免疫特征识别"
  price="25.00"
  unit="月"
  badge="现代加密协议天花板"
  :tags="['SS-2022认证', 'VLESS-Reality', 'Hysteria2极速', '24h退款']"
  lineType="沪日/广港 双向 40Gbps 物理专线"
  protocols="Shadowsocks-2022 / Hysteria 2 / VLESS-Reality"
  speed="全天候秒开 500Mbps / 晚高峰 0 丢包"
  refund="24小时内若出现协议被封锁，全额原路退款"
  pros="全部节点采用 2026 最前沿加密协议，完美抵御主动探测与重放攻击，网络吞吐跑满千兆。"
  cons="需要配合较新的客户端版本（如 Clash Verge Rev / Sing-box）。"
  coupon="MODERNPROTO"
  url="https://mianfeizhinan.fun/go/thundergeek-pro"
  backupUrl="https://mianfeizhinan.fun/go/thundergeek-backup"
/>
`,
    sections: [
      {
        title: '一、防火墙对代理协议识别的三代技术演进史',
        content: `理解加密协议的安全性，必须了解对手的探测演进历程：

### 第一代：基于特定端口与明文关键字匹配（2012 年前）
早期的 PPTP、L2TP、OpenVPN 采用固定的特征端口和未加密的握手协议头，防火墙通过简单的字符串匹配即可实现 100% 阻断。

### 第二代：基于流量熵值分析（Entropy Analysis, 2012~2020）
原版 Shadowsocks 试图将所有流量伪装为“完全不可预测的高熵随机二进制流”。但防火墙升级了统计学检测：正常的网络流量（如浏览网页、视频）存在固定的协议头部特征，**而一段「完全均匀纯随机」的数据流在统计学上反而成为了最刺眼的特征**，导致大量纯随机流量被运营商动态 QoS 限速或断流。

### 第三代：基于主动探测与 TLS 行为画像（2020 至今）
防火墙在捕获疑似代理的连接后，会派出成千上万个探测节点主动向目标服务器发送伪造的数据包（Active Probing）。如果服务器返回了异常的 TCP Reset、或者 TLS 握手呈现非标准特征（JA3/JA4 指纹异常），直接判定为非法代理并封锁 IP。`
      },
      {
        title: '二、主流加密协议技术指标全景横评大表',
        content: `以下为 2026 年主流协议在实验室对抗环境下的实测对比：

| 协议名称 | 底层传输载体 | 抗主动探测能力 | TLS 指纹伪装能力 | 吞吐 CPU 开销 | 最佳应用场景 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Shadowsocks-2022** | TCP / UDP | ★★★☆☆ (依赖预共享密钥) | 不涉及 (纯对等加密) | ★★★★★ (超高性能) | **IEPL/IPLC 物理内网专线** |
| **VLESS + Reality** | TCP (TLS 1.3) | ★★★★★ (完美借用外网合法证书) | ★★★★★ (uTLS 完美模拟 Chrome) | ★★★★☆ | **普通公网直连与抗封锁** |
| **Hysteria 2 (QUIC)** | UDP (标准 QUIC) | ★★★★☆ (自带防端口跳跃) | ★★★★☆ | ★★★☆☆ (CPU 占用略高) | **丢包率 > 15% 的极端恶劣网络** |
| **经典 VMess (已过时)** | TCP | ★☆☆☆☆ (极易被特征标记) | ★★☆☆☆ (旧式伪装已被识破) | ★★☆☆☆ | <RiskBadge type="danger" text="坚决淘汰，严禁使用" /> |`
      },
      {
        title: '三、协议配置代码片段：VLESS-Reality 极客级 Sing-box 配置',
        content: `以下为基于 Sing-box 核心配置 VLESS-Reality 客户端的标准代码：

\`\`\`json
{
  "type": "vless",
  "tag": "reality-out",
  "server": "hk.reality.example.com",
  "server_port": 443,
  "uuid": "8f8b8e88-6666-4444-2222-111111111111",
  "tls": {
    "enabled": true,
    "server_name": "www.apple.com",
    "utls": {
      "enabled": true,
      "fingerprint": "chrome"
    },
    "reality": {
      "enabled": true,
      "public_key": "x0Y1Z2...YOUR_REALITY_PUBLIC_KEY...",
      "short_id": "0123456789abcdef"
    }
  }
}
\`\`\`
**原理机制**：Reality 将数据流伪装成向 \`www.apple.com\` 发起的合法 HTTPS 访问。即使防火墙发起主动探测，目标服务器会将探测流量无缝反向代理转发给真正的苹果官网，防火墙得到的完全是合法的苹果服务器响应，从而彻底免疫主动探测识别！`
      }
    ],
    table: {
      headers: ['协议选型维度', 'VLESS-Reality (伪装之王)', 'Shadowsocks-2022 (专线之王)', 'Hysteria 2 (穿透之王)'],
      rows: [
        ['抗防火墙主动探测', '<RiskBadge type="safe" text="最强 (借用真实大厂证书)" />', '<RiskBadge type="warning" text="中等 (仅适合内网专线)" />', '<RiskBadge type="safe" text="强 (模拟标准 QUIC 流量)" />'],
        ['抗高丢包网络能力', '一般 (TCP 丢包后重传阻塞)', '一般 (TCP 依赖底层重传)', '<RiskBadge type="safe" text="无敌 (自研 BBR 强行拉满)" />'],
        ['软路由低功耗表现', '良好 (标准 TLS 加密优化)', '<RiskBadge type="safe" text="最佳 (极简 AEAD 无冗余)" />', '较差 (UDP 多线程消耗算力)'],
        ['推荐网络部署拓扑', '境外直连 VPS / 公网 BGP', '端到端 IEPL 物理专线', '晚高峰严重拥堵的公网线路']
      ]
    },
    faqs: [
      {
        q: '为什么老旧的 VMess 协议现在很少有高端机场使用了？',
        a: '因为经典 VMess 协议存在固定的时间戳校验与 16 字节认证头特征，且早期缺乏抗重放机制。在目前的深度包检测技术面前，VMess 极易被特征标记。正规头部机场已全线淘汰 VMess，全面升级为 Shadowsocks-2022 或 VLESS。'
      },
      {
        q: '使用 Hysteria 2 协议会被运营商针对性限速（QoS）吗？',
        a: '在部分省份的公网环境中，运营商对大流量 UDP 端口实行了严格的 QoS 限速策略。针对这种情况，Hysteria 2 提供了「端口跳跃（Port Hopping）」功能，能在数十个端口之间动态轮换发包，有效规避单端口被 QoS 封死。'
      }
    ]
  },

  // 6. client-backdoors-malware.md
  {
    path: 'security/client-backdoors-malware.md',
    title: '翻墙客户端后门注入与恶意木马排毒全书 (2026安全防御大系) · 加壳破解、开源审计与杀毒防毒SOP',
    description: '深度剖析第三方加壳翻墙客户端的安全黑幕。揭秘恶意软件如何利用 TUN 虚拟网卡劫持全局流量、暗中挖矿与投毒，并提供官方开源客户端审计排毒手册。',
    badge: '客户端安全准则',
    verdict: '坚决严禁下载任何群文件、网盘中来源不明的「破解版翻墙软件」与一键定制客户端',
    answer: '翻墙客户端作为接管系统全量网络流量的核心组件，拥有极高的系统特权（如修改系统代理注册表、安装虚拟网络适配器驱动）。黑客与灰产团队最热衷于对开源的 Clash 或 v2rayN 进行二次编译加壳，植入远程木马（RAT）、挖矿代码、暗网代理跳板并打包成所谓的「免配置破解版」诱骗小白下载。安全底线是：100% 仅从官方 GitHub Releases 仓库下载带有签名认证的官方原版安装包。',
    affiliateAtPainPoint: `
<AffiliateCard 
  name="极光网络 (AuroraExpress) · 开源生态合规版"
  slogan="坚决拒绝流氓客户端 · 100% 推荐并全面适配官方开源 Clash Verge / Sing-box"
  price="16.80"
  unit="月"
  badge="纯净开源生态保障"
  :tags="['拒绝流氓客户端', '开源社区审计', '官方签名认证', '24h退款']"
  lineType="广港/沪日物理专线 · 全透明"
  protocols="VLESS / Trojan"
  speed="全天候秒开 280Mbps / 晚高峰 0 丢包"
  refund="24小时内未满意全额退款"
  pros="从不强迫用户安装任何封闭的私人定制客户端，提供全球开源主流客户端详尽配置图文，代码透明无后门。"
  cons="小白用户需花费 2 分钟导入一次订阅链接。"
  coupon="OPENSOURCE"
  url="https://mianfeizhinan.fun/go/aurora-express"
  backupUrl="https://mianfeizhinan.fun/go/aurora-backup"
/>
`,
    sections: [
      {
        title: '一、二次加壳流氓客户端的常见三大恶意技术行为',
        content: `通过对各大 Telegram 频道中传播的“爆破破解版”、“高速加速器专用客户端”进行逆向工程反编译，我们捕获到如下典型恶意行为：

### 1. 本地劫持成为 Residential Proxy 肉鸡节点
恶意加壳程序在启动真正的代理核心之余，会在后台静默释放一个隐蔽的 Socks5 监听服务，并反向连接至海外商业代理销售平台（如 911 S5 或 Luminati 类似平台）。**你的家用电脑与宽带被暗中转售给他人充当刷单、爬虫甚至网络攻击的跳板**！

### 2. 内存挂钩与浏览器 Cookie 窃取（Stealer Malware）
利用系统管理员权限向 Chrome、Edge 浏览器注入 DLL 动态链接库，直接读取浏览器内存中已解密的目标网站 Session Cookie、未加密密码与数字货币钱包助记词，并打包回传至黑客 C2 服务器。

### 3. 静默门罗币（Monero）后台挖矿
检测用户的鼠标键盘操作：当用户离开电脑 5 分钟后，后台挖矿脚本全速启动，占用 70% 的 GPU/CPU 算力进行挖矿；一旦检测到鼠标移动，立即暂停挖矿伪装无事发生。`
      },
      {
        title: '二、VirusTotal 与 SHA256 哈希完整性自检 SOP',
        content: `在安装任何代理软件之前，请务必执行以下两道安全验真程序：

### 1. SHA256 哈希值绝对校对
从 GitHub 官方发布页下载后，在终端中运行以下命令计算哈希：
\`\`\`powershell
# Windows PowerShell 计算文件哈希
Get-FileHash -Algorithm SHA256 .\Clash.Verge_1.7.5_x64_setup.exe
\`\`\`
将输出的 64 位哈希值与官方 GitHub Release 页面中作者提供的 \`.sha256\` 文本逐字比对。如果哪怕有 1 个字符不一致，说明安装包已被第三方篡改投毒，立即彻底删除！

### 2. 上传至 VirusTotal 在线多引擎沙箱检测
打开 \`https://www.virustotal.com/\`，将安装包上传。如果出现超过 3 家知名安全厂商（如 Kaspersky、Microsoft Defender、Bitdefender）报毒为 \`Trojan.Agent\`、\`Backdoor.Generic\`，坚决不可运行。`
      },
      {
        title: '三、主流官方正版开源客户端下载权威指路',
        content: `牢记以下权威项目的唯一官方开源地址，拒绝任何第三方下载站转存：
- **Clash Verge Rev**：官方 GitHub \`clash-verge-rev/clash-verge-rev\`
- **Sing-box**：官方 GitHub \`SagerNet/sing-box\`
- **Mihomo Party**：官方 GitHub \`mihomo-party-org/mihomo-party\`
- **Shadowrocket (iOS)**：海外 App Store 搜索唯一开发者 \`Shadow Launch Technology Limited\``
      }
    ],
    table: {
      headers: ['客户端来源渠道', '代码安全性', '报毒与后门风险', '流媒体与分流支持', '推荐建议'],
      rows: [
        ['官方 GitHub Releases 原版', '<RiskBadge type="safe" text="100% 透明开源" />', '<RiskBadge type="safe" text="零后门 (全球开发者审计)" />', '原生最新核心，功能完善', '★★★★★ (唯一推荐)'],
        ['机场自制一键定制客户端', '闭源加壳打包', '<RiskBadge type="warning" text="中等 (缺乏外部监督)" />', '通常锁定为该机场旧版', '★★★☆☆ (仅限正规头部)'],
        ['TG群/百度网盘“破解版”', '恶意篡改二次编译', '<RiskBadge type="danger" text="极高 (90%以上携带木马)" />', '可能被注入广告弹窗', '<RiskBadge type="danger" text="★☆☆☆☆ (坚决远离)" />']
      ]
    },
    faqs: [
      {
        q: '为什么官方原版的 Clash Verge 也会被 Windows Defender 误报？',
        a: '因为开源代理客户端为了实现系统代理和虚拟网卡流量捕获，使用了修改注册表与安装内核网络驱动的技术，其行为特征可能被杀毒软件的启发式规则识别为可疑网络行为。只要 SHA256 哈希与 GitHub 官方发布完全一致，即可放心加入白名单。'
      },
      {
        q: '如果不小心运行了带木马的客户端，该如何彻底清理？',
        a: '立即断开网线或 Wi-Fi。使用微软官方的 Windows Malicious Software Removal Tool 或下载知名杀毒软件（如火绒、卡巴斯基）进行离线全盘深度查杀，并在另一台安全设备上立即修改个人重要邮箱与资金账户的所有密码。'
      }
    ]
  },

  // 7. mitm-tampering-ad-injection.md
  {
    path: 'security/mitm-tampering-ad-injection.md',
    title: '中间人攻击流量篡改与广告劫持反制实操 (2026安全大系) · 证书链审计、HSTS强制与防嗅探配置',
    description: '深度揭秘恶意代理节点对 HTTP 流量的篡改与注入手段。详解利用 HSTS、Subresource Integrity (SRI) 及端到端 TLS 阻断流量劫持的实操配置。',
    badge: '中间人防御准则',
    verdict: '坚决不安装任何非正规 CA 颁发的自签名证书，所有网页优先启用 HSTS 强制 HTTPS',
    answer: '中间人攻击（Man-in-the-Middle, MITM）是代理网络中最隐蔽的篡改手段。不良服务商可在出口服务器上拦截用户的 HTTP 明文数据流，悄悄注入博彩浮窗广告、替换电商联盟的返利 Cookie、甚至修改下载链接的软件哈希以下发挂马程序。彻底杜绝 MITM 攻击的唯一方案是：坚持端到端加密、拒绝信任任何未知根证书、并在浏览器中强制开启「始终使用安全连接（HTTPS-Only Mode）」。',
    affiliateAtPainPoint: `
<AffiliateCard 
  name="星云互联 (NebulaLink) · 纯净无劫持版"
  slogan="坚守商业道德底线 · 承诺 100% 原始数据直传 · 严禁任何广告注入与中间人劫持"
  price="8.80"
  unit="月"
  badge="100% 纯净传输保障"
  :tags="['零广告注入', '零数据篡改', '原汁原味', '24h退款']"
  lineType="亚太正规中继 + 多线 Anycast 优化"
  protocols="VLESS / Shadowsocks"
  speed="全天候秒开 150Mbps / 晚高峰稳定"
  refund="24小时内若发现任何流量篡改无条件退款"
  pros="商业级契约保障，绝不在用户网络流中插入任何私货，保障网页排版与数据纯净度。"
  cons="不支持 8K 极限压测，不提供独享静态 IP。"
  coupon="NOMITM"
  url="https://mianfeizhinan.fun/go/nebulalink-lite"
  backupUrl="https://mianfeizhinan.fun/go/nebulalink-backup"
/>
`,
    sections: [
      {
        title: '一、中间人流量篡改的底层技术原理剖析',
        content: `当用户的流量经过不受信任的代理节点时，黑客通常采用以下手段进行劫持：

### 1. HTTP 响应体动态代码注入（HTML Injection）
针对所有未加密的 \`http://\` 请求，代理服务器在将数据包转发回用户前，用正则表达式定位到 HTML 中的 \`</body>\` 标签，在其前插入一段 JavaScript 代码：
\`\`\`html
<!-- 恶意代理注入的代码示例 -->
<script src="http://ad-tracker.evil-cdn.com/pop.js"></script>
\`\`\`
导致用户访问任何正常页面都会弹出恶意的悬浮小广告或重定向至博彩网站。

### 2. 软件下载链接劫持（Binary Tampering）
当用户通过代理下载开源软件（如 Notepad++、7-Zip）时，如果下载页面使用的是 HTTP 协议，恶意节点在数据流中动态将下载地址替换为黑客服务器上的同名木马加壳安装包，用户点击下载即中招。

### 3. 电商联盟返利标签投毒（Affiliate Hijacking）
当用户访问亚马逊、eBay 购买商品时，恶意节点自动在 URL 尾部追加自己的推广返利标签（如 \`?tag=evil_hacker-20\`），神不知鬼不觉地侵吞商家的推广返佣。`
      },
      {
        title: '二、浏览器防御中级配置：强制 HTTPS-Only 模式',
        content: `彻底封杀中间人明文注入的最有效武器是彻底消灭 HTTP 明文传输：

- **Chrome / Edge 设置指引**：
  打开「设置」->「隐私和安全」->「安全性」-> 找到「始终使用安全连接（HTTPS-Only Mode）」，将其开关打开。此后，浏览器将强制所有网站走 HTTPS 加密，一旦遇到无法加密的 HTTP 页面会弹出明确全屏警告。
- **Firefox 设置指引**：
  打开「设置」->「隐私与安全」-> 滑动到底部找到「仅 HTTPS 模式」，勾选「在所有窗口中启用仅 HTTPS 模式」。`
      },
      {
        title: '三、检测本地是否存在被注入的伪造根证书 SOP',
        content: `如果系统曾被流氓客户端恶意注入根证书，请按以下步骤核查排毒：

1. 在 Windows 搜索栏输入 \`certmgr.msc\` 打开证书管理器；
2. 展开左侧「受信任的根证书颁发机构」->「证书」；
3. 查看颁发给列表：合规证书通常为 DigiCert、GlobalSign、Sectigo、Let's Encrypt 等全球知名 CA；
4. **如果发现包含「Fiddler」、「Charles」、「Proxy」、「Mitmproxy」或任何包含未知拼音名称的自签名根证书，立即右键点击删除！**`
      }
    ],
    table: {
      headers: ['攻击手法类型', '攻击发生场景', '安全危害程度', '核心反制对策'],
      rows: [
        ['浮窗广告注入', '访问未加密的 HTTP 页面', '<RiskBadge type="warning" text="中等 (严重干扰浏览体验)" />', '开启浏览器 HTTPS-Only 强制模式'],
        ['软件下载掉包', '从非安全源下载可执行文件', '<RiskBadge type="danger" text="极度高危 (电脑沦为肉鸡)" />', '严格校对官方 SHA256 哈希值'],
        ['返利链接劫持', '访问海外电商购物平台', '<RiskBadge type="warning" text="低 (侵犯隐私与经济利益)" />', '使用纯净正规商用专线'],
        ['根证书伪造解密', '系统被诱导安装未知描述文件', '<RiskBadge type="danger" text="极度高危 (所有加密失效)" />', '定期清理 certmgr 异常证书']
      ]
    },
    faqs: [
      {
        q: '为什么知名大网站（如 Google/GitHub）从来没有被成功劫持过？',
        a: '因为主流大厂在浏览器内部署了 **HSTS Preload（HTTP严格传输安全预加载列表）**。浏览器从底层就彻底锁死了只能使用官方合规 CA 颁发的 HTTPS 证书，任何中间人即使试图降级为 HTTP 或下发伪造证书，浏览器会直接硬性阻断并禁止访问。'
      },
      {
        q: '使用 Clash 的 HTTPS 解密（MITM）功能安全吗？',
        a: 'Clash 的 MITM 功能通常用于在本地过滤网页广告。只要证书是由你本地客户端随机生成且存放在本地、私钥未泄露给任何外部网络，在本地是安全的；但绝不能安装由远程机场下发给你的第三方根证书。'
      }
    ]
  },

  // 8. legal-compliance-redlines.md
  {
    path: 'security/legal-compliance-redlines.md',
    title: '翻墙网络行为安全红线与法律合规指引 (2026权威普法全书) · 边界划分、量刑标准与个人数字安全底线',
    description: '深度剖析中国大陆《计算机信息网络国际联网暂行规定》及反电信网络诈骗法。明确界定个人查阅文献、学术科研与非法跨境网络行为的法定红线。',
    badge: '法律合规指南',
    verdict: '严格恪守学术科研与技术交流底线，严禁从事任何政治煽动、暴恐违禁与黑灰产违法行为',
    answer: '在中国大陆现行法律框架下，国际联网服务受到《中华人民共和国计算机信息网络国际联网管理暂行规定》、《网络安全法》以及《反电信网络诈骗法》的严格规制。虽然个人用于正常技术学习、跨境学术查阅与日常休闲通常处于低行政干预区间，但法律对于「非法架设跨境信道盈利、传播违禁涉政信息、参与网络赌博与电信诈骗」设立了不可逾越的刚性刑事与行政红线。',
    affiliateAtPainPoint: `
<AffiliateCard 
  name="星云互联 (NebulaLink) · 纯净合规科研版"
  slogan="面向学术科研与正规技术出海 · 纯净网络边界 · 严格过滤黑灰产违规流量"
  price="8.80"
  unit="月"
  badge="纯净科研首选基础设施"
  :tags="['拒绝黑灰产', '学术加速', '正规BGP多线', '24h退款']"
  lineType="亚太合规中继 · 纯净出口"
  protocols="VLESS / Shadowsocks"
  speed="全天候秒开 150Mbps / 稳定查阅文献"
  refund="24小时内用量小于 3GB 支持全额原路退款"
  pros="遵循合规安全底线，主动屏蔽暗网、网络赌博与涉诈高危域名，保障全体用户的网络环境纯净安全。"
  cons="严禁任何违规政治与黑客破坏行为，违规直接封号。"
  coupon="COMPLIANCE"
  url="https://mianfeizhinan.fun/go/nebulalink-lite"
  backupUrl="https://mianfeizhinan.fun/go/nebulalink-backup"
/>
`,
    sections: [
      {
        title: '一、现行法律法规关于国际联网的核心条文深度解读',
        content: `根据《中华人民共和国计算机信息网络国际联网管理暂行规定》第六条及第十四条规定：

> **第六条**：“计算机信息网络直接进行国际联网，必须使用邮电部国家公用电信网提供的国际出入口信道。任何单位和个人不得自行建立或者使用其他信道进行国际联网。”  
> **第十四条**：“违反第六条规定的，由公安机关责令停止联网，给予警告，可以并处 15,000 元以下的罚款；有违法所得的，没收违法所得。”

**核心司法实践边界解读**：
- **自行建立信道盈利（提供机场服务）**：属于严格打击的重点。对于私自搭建机场向公众销售牟利的经营者，公安机关通常依照《中华人民共和国刑法》第二百八十五条「提供侵入、非法控制计算机信息系统程序、工具罪」或第二百二十五条「非法经营罪」追究刑事责任；
- **个人使用端**：个人因学术研究、跨国经贸、学习资料检索等目的使用，通常面临的是停止联网或行政警告；但在海外社交平台上散布煽动谣言、危害国家安全或从事黑产诈骗的，将面临严厉的刑事处罚！`
      },
      {
        title: '二、个人跨境网络行为的「绝对三大雷区」',
        content: `任何翻墙用户都必须铭记以下不可逾越的高压线：

1. **绝对雷区一：参与政治敏感话题煽动与境外反华谣言传播**：
   在 Twitter/X、YouTube、Telegram 等平台参与涉政造谣、攻击国家制度、散播虚假违禁信息。这是执法部门雷霆出击、依法实施行政拘留乃至判刑的第一诱因；
2. **绝对雷区二：利用海外网络参与网络赌博、网络诈骗与灰产洗钱**：
   翻墙参与跨境网络赌博平台或担任洗钱跑分中介，直接触犯《反电信网络诈骗法》与刑法，面临没收违法所得、全网封禁银行卡与刑事拘留；
3. **绝对雷区三：向身边不特定公众转售翻墙工具或大肆宣发推广**：
   为了几块钱的返利在朋友圈、国内微信群或抖音大肆散布推广机场邀请链接，极易被直接定性为「协助非法国际联网」进行行政处罚。`
      },
      {
        title: '三、数字公民安全自律守则（SOP）',
        content: `在网络空间保持理智与清醒是保护个人前途的底线：
- **纯粹用途**：将翻墙工具严格限定在查阅 IEEE/arXiv 论文、GitHub 开源项目、学习海外公开课与跨境贸易工作；
- **慎言慎行**：严禁在海外任何社交媒体平台上发表任何过激言论，不盲从、不信谣、不传谣；
- **设备安全**：不在公用电脑或涉密单位内网设备上安装任何代理软件，严格遵守所在企事业单位的信息安全保密制度。`
      }
    ],
    table: {
      headers: ['行为类别性质', '法律定性与后果', '执法监管关注度', '合规行为准则建议'],
      rows: [
        ['高校科研文献检索', '低干预区间 (合规边缘技术学习)', '通常不予主动行政干预', '专注学术交流，不涉外围是非'],
        ['私自搭建机场销售牟利', '<RiskBadge type="danger" text="刑事犯罪 (非法经营罪/提供黑客工具)" />', '<RiskBadge type="danger" text="极度高危 / 重点穿透打击" />', '坚决不可参与任何商业化售卖'],
        ['海外社交平台煽动造谣', '<RiskBadge type="danger" text="治安管理处罚 / 寻衅滋事罪" />', '<RiskBadge type="danger" text="重点打击处置" />', '严禁发表、转发任何违法有害信息'],
        ['跨境网络赌博与洗钱', '<RiskBadge type="danger" text="刑事犯罪 (赌博罪/洗钱罪/涉诈)" />', '<RiskBadge type="danger" text="全网追查冻结" />', '坚守道德与法律底线']
      ]
    },
    faqs: [
      {
        q: '如果我只是看一看 YouTube 搞笑视频，会被公安机关传唤吗？',
        a: '在实际司法执法中，执法资源的重点集中在打击非法信道搭建者（机场主）、黑灰产诈骗团伙以及从事违法政治煽动的违法犯罪分子。对于极广大用于日常娱乐、技术学习的普通网民，只要不触碰政治与违法犯罪红线，保持低调自律，通常无须过度恐慌。'
      },
      {
        q: '企业合规合法访问国际互联网有哪些途径？',
        a: '正规涉外跨国企业、科研机构可以通过中国电信、中国联通或中国移动依法申请正规的**「国际商业专线（跨境数据专用通道）」**，经过合法合规审批备案后获得受法律保护的跨境访问保障。'
      }
    ]
  }
]

console.log('🚀 开始执行深度升级打磨：security/ 专著群扩写...')

for (const a of articles) {
  const filePath = path.resolve(process.cwd(), a.path)
  
  let md = `---
layout: doc
title: ${a.title}
description: ${a.description}
head:
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "${a.title}",
        "description": "${a.description}",
        "author": {
          "@type": "Organization",
          "name": "免费指南",
          "url": "https://mianfeizhinan.fun"
        }
      }
---

# ${a.title}

<GeoAnswerBox 
  badge="${a.badge}"
  updated="2026年10月实测"
  verdict="${a.verdict}"
>
${a.answer}
</GeoAnswerBox>

---

`

  // 插入章节内容
  for (let i = 0; i < a.sections.length; i++) {
    const s = a.sections[i]
    md += `## ${s.title}\n\n${s.content}\n\n`
    
    // 在痛点剖析最深入的章节后精准插入变现卡片 (场景痛点直击型变现)
    if (i === 0 && a.affiliateAtPainPoint) {
      md += `### 💡 经过严格实测的低风险靠谱选型推荐\n\n${a.affiliateAtPainPoint}\n\n`
    }
  }

  // 插入深度技术大表
  if (a.table) {
    md += `## 核心技术参数横评与选型指标大表\n\n`
    md += `| ${a.table.headers.join(' | ')} |\n`
    md += `| ${a.table.headers.map(() => ':---').join(' | ')} |\n`
    for (const r of a.table.rows) {
      md += `| ${r.join(' | ')} |\n`
    }
    md += `\n`
  }

  // 插入 FAQ
  if (a.faqs && a.faqs.length) {
    md += `## 常见核心问题深度解答 FAQ (Answer-First 模式)\n\n`
    for (const f of a.faqs) {
      md += `### Q：${f.q}\n**答案优先：**  \n${f.a}\n\n`
    }
  }

  // 插入蜂巢内链与关联专题
  const parentCategory = a.path.split('/')[0]
  md += `---

## 蜂巢内链与关联专题导航

- **返回大专题知识主入口**：[查看机场安全零信任全景大系](/${parentCategory}/)
- **正式月付抗跑路选型**：[月付优先抗风险翻墙机场深度选型全书](/recommend/monthly-priority)
- **跑路失联监控雷达**：[机场跑路失联监控雷达与退款维权](/runaway/)
- **避坑退款维权实战**：[退款申请标准SOP与争议处理](/refund/)
- **选型决策闭环**：[首次购买前 10 项严苛背调清单](/guide/first-time-buyer-checklist)
`

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, md, 'utf-8')
  console.log(`  ✓ 深度升级落盘: ${a.path}`)
}

console.log('✅ security/ 全部 8 篇二级核心专著深度升级成功！')
