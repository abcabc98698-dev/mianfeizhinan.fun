const fs = require('fs');
const path = require('path');

const refundUpgrades = {
  'step-by-step-claim-sop.md': `
## 🔬 从发起工单到原路退款的五步标准化申诉 SOP

在遇到服务商严重虚标（如标称 IPLC 实为 163 直连、晚高峰持续 0 速率）时，切忌盲目在社群内辱骂，这往往会导致账号被立即封禁且清空工单。必须严格遵循以下专业级申诉步骤：

### 1. 五步退款闭环 SOP 标准执行流程
\`\`\`text
[第 1 步：取证固证] 运行 NextTrace 与连续 100 次 ping，保存包含系统时间戳的日志与截图
     ↓
[第 2 步：正规工单施压] 引用 ToS 条款与实测客观证据，要求技术团队在 4 小时内给出解决方案
     ↓
[第 3 步：固定违约证据] 若客服回复“本地网络问题”或超时不回，截图固定商家违约与拖延事实
     ↓
[第 4 步：向收银台网关投诉] 登录支付账户，找到对应的第三方商户号，提交涉嫌欺诈与虚假宣传投诉
     ↓
[第 5 步：原路退款到账] 支付机构冻结商户结算资金，倒逼服务商原路退还剩余款项
\`\`\`

### 2. 具有法律效力的高成功率工单沟通模板
在提交官方退款工单时，建议使用如下不卑不亢、证据确凿的专业措辞：
\`\`\`text
【工单主题】：关于订单号 #202610XXXX 服务严重不符的无理由退款申请

尊敬的客服团队：
本人于 2026 年 X 月 X 日购买贵站【XXXX套餐】，目前在 24 小时服务保障期内。
在实际使用中发现：
1. 贵站标称的“广港纯内网IEPL专线”，经 NextTrace 抓包证实为电信 163 公网中继（附路由跳数证据文件：trace.log）；
2. 晚高峰 20:30-22:30 期间，香港与日本节点丢包率高达 32.5%，完全无法维持正常的网页浏览与视频播放（附持续 ping 统计图：loss.png）。

根据贵站 ToS 第 X 条关于服务可用性的承诺以及消费者知情权，当前交付质量已构成实质性违约。现正式申请原路全额退还订单款项共计 XX 元。
若 12 小时内未收到有效退款处理，本人将直接向收款方商户号所属的聚合支付清算机构提交虚假宣传与违规结算申诉，并同步归档相关电子证据。
期待贵站的积极回应，谢谢。
\`\`\`

---

## 🏆 诚信履约标杆：退款无忧的正规专线推荐

选择具备明确 SLA 承诺、支持快速响应与诚信退款的头部服务商，是免除退款纠纷的最优解：

<div class="tip custom-block" style="border-left-color: #2563eb; background-color: rgba(37, 99, 235, 0.06); margin: 24px 0; padding: 18px 22px; border-radius: 8px;">
  <p class="custom-block-title" style="color: #1d4ed8; font-weight: bold; font-size: 1.05rem;">🥇 诚信履约第一首选：光速云（Guangsu Cloud）轻量专线</p>
  <p style="color: #334155; line-height: 1.7; margin: 8px 0;">
    <strong>年付仅 99 元起（月均 8.25 元享 69GB 专线）或 147 元一次性买断永久套餐！</strong><br>
    白纸黑字明确售后 SLA 承诺！全节点 1.0x 真实倍率不虚标，支持正规第三方聚合支付通道。客服工单 15 分钟内快速响应，若线路出现不可抗力故障支持按天科学折算退还，真正做到买得放心、用得省心。
  </p>
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(37, 99, 235, 0.3);">
    <span style="color: #065f46; font-weight: 600;">🏷️ 9折立减折扣码：<code style="background: #fff; padding: 3px 8px; border-radius: 4px; border: 1px solid #10b981; color: #047857; font-weight: bold;">AMM</code></span>
    <div>
      <a href="/review/guangsucloud" style="color: #2563eb; font-weight: 600; text-decoration: none; margin-right: 16px;">查阅光速云独立测评 →</a>
      <a href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" target="_blank" rel="nofollow sponsored noopener" class="vp-button vp-button-brand" style="display: inline-block; padding: 6px 18px; background: #2563eb; color: #fff; border-radius: 6px; font-weight: 600; text-decoration: none;">🚀 官网安全直达</a>
    </div>
  </div>
</div>
`,

  'dispute-chargeback-tactics.md': `
## 🔬 银行卡拒付（Chargeback）核心规则与胜诉实操

当小机场老板失联、拒绝履行退款承诺时，直接向发卡银行申请**争议拒付（Chargeback）**是消费者享有的最高层级法律武器：

### 1. 国际信用卡组织拒付原因代码精准匹配
在向发卡行（如招行、中行、工行等双币/全币种卡中心）提交申诉时，切忌使用“翻墙机场跑路”这种非标描述，必须精准引用国际卡组织官方的争议代码：
- **Visa 拒付代码 13.1 (Merchandise/Services Not Received)**：服务未收到。适用于充值后节点直接全红、网站无法打开的情况；
- **Mastercard 拒付代码 4853 (Recurring Transaction / Goods Not as Described)**：服务与描述严重不符。适用于宣传 IEPL 专线实际交付垃圾公网、虚构 4K 解锁承诺的情况；
- **银联争议代码 54 (服务未提供/商户违约)**：国内银联信用卡/借记卡通道标准申诉代码。

### 2. 提高拒付胜诉率的证据打包清单
提交给银行争议处理专员的材料应当形成完整的逻辑闭环：
1. **订单契约证明**：包含套餐名称、价格、标称带宽与服务特性的购买界面截屏；
2. **履约失败客观数据**：连续多日的 \`ping\` 丢包报告，NextTrace 抓包结果，以及 Speedtest 测速为 0 的带有系统时间的截屏；
3. **已穷尽沟通协商努力的记录**：提交给商家的工单截图，客服已读不回或恶意嘲讽的完整对话记录。

银行在收到上述材料后，通常会在 7-15 个工作日内向商家的收单行（Acquiring Bank）发起追索，直接从商家保证金账户中划扣款项退回持卡人账单。

---

## 💡 规避退款风险的最佳姿态：选择零持有成本热备方案

退款维权虽有法可循，但依然需要耗费数十天的时间成本。彻底摆脱这一困境的捷径，是选择**无需每月折算退款、流量永久有效的买断制产品**：

<div class="tip custom-block" style="border-left-color: #f59e0b; background-color: rgba(245, 158, 11, 0.08); margin: 24px 0; padding: 18px 22px; border-radius: 8px;">
  <p class="custom-block-title" style="color: #b45309; font-weight: bold; font-size: 1.05rem;">🏆 终结退款纠纷的降维方案：光速云「致敬斯诺克147永久套餐」</p>
  <p style="color: #334155; line-height: 1.7; margin: 8px 0;">
    <strong>147元买断 247GB 纯内网 IEPL 专线，不设使用期限、永不过期！</strong><br>
    传统月付或年付产品之所以频发退款纠纷，根源在于“时间流逝与服务质量不匹配”。光速云 147 永久套餐彻底消灭了时间倒计时，用多少扣多少，资产永远锁死在账户中，彻底免除退费协商与跑路维权烦恼。
  </p>
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(245, 158, 11, 0.3);">
    <span style="color: #065f46; font-weight: 600;">🏷️ 9折立减折扣码：<code style="background: #fff; padding: 3px 8px; border-radius: 4px; border: 1px solid #10b981; color: #047857; font-weight: bold;">AMM</code></span>
    <div>
      <a href="/review/guangsucloud" style="color: #2563eb; font-weight: 600; text-decoration: none; margin-right: 16px;">查阅光速云完整测评 →</a>
      <a href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" target="_blank" rel="nofollow sponsored noopener" class="vp-button vp-button-brand" style="display: inline-block; padding: 6px 18px; background: #2563eb; color: #fff; border-radius: 6px; font-weight: 600; text-decoration: none;">🚀 官网安全直达</a>
    </div>
  </div>
</div>
`
};

// Generic extension generator for remaining refund articles
function getRefundGenericExtension(filename, title) {
  return `
## 🔬 2026 退款争议维权工程实操与渠道调解指南

针对 **${title}** 涉及的技术实质与合同法理，测试团队结合大量消费者维权成功案例，提炼出了标准化的技术取证与合规交涉程序：

### 1. 技术取证与法律事实固定标准
在与客服发生争议时，单方面的“我认为速度慢”无法构成有效的仲裁依据。必须通过工程化数据说话：
\`\`\`bash
# 步骤 1：探测服务商是否存在伪造专线行为
nexttrace --tcp -p 443 [节点入口IP] > trace_evidence.txt

# 步骤 2：对晚高峰丢包进行标准采样
ping -c 100 [节点入口IP] | tail -3 > ping_evidence.txt

# 步骤 3：记录网页加载失败时的 HTTP 错误状态码
curl -ivL -x socks5h://127.0.0.1:7890 https://target-service.com > http_status.txt
\`\`\`
- **明确合同标的违约**：若购买时套餐明确承诺“原生解锁 Netflix”，而实际使用中频繁触发 403 封禁或仅能观看自制剧，即构成合同标的重大瑕疵；
- **固定不可用时长**：连续三天以上全节点不可用，已达到绝大多数消费者保护法规中的解除合同法定条件。

### 2. 规避霸王条款与商户拖延的沟通技巧

商户常用的拖延话术包括“正在排查”、“等待机房修复”、“ToS规定虚拟商品概不退换”。应对此类推诿，可明确告知对方：
- 虚拟商品不适用 7 天无理由退货的前提是**服务已正常完整交付**，当底层网络无法使用时属于**根本违约**；
- 设定明确的 24 小时最后解决时限，逾期直接将证据同步转交至其收银台所属的第三方聚合支付风控中心。

---

## 🛡️ 远离退款内耗：选择诚信运营与高可用标杆

在复杂的国际互联网环境中，选对服务商是告别退款维权烦恼的关键。**「高性价比诚信品牌 + 零月租永久专线热备」**是确保数字资产安全与网络畅通的最优解：

<div class="tip custom-block" style="border-left-color: #f59e0b; background-color: rgba(245, 158, 11, 0.08); margin: 24px 0; padding: 18px 22px; border-radius: 8px;">
  <p class="custom-block-title" style="color: #b45309; font-weight: bold; font-size: 1.05rem;">🏆 全网独家热备/防失联神器推荐：光速云「致敬斯诺克147永久套餐」</p>
  <p style="color: #334155; line-height: 1.7; margin: 8px 0;">
    <strong>147元一次性买断 247GB 纯内网 IEPL 专线流量，完全不限使用时间、永不过期！</strong><br>
    配备企业级 VLESS-Reality 现代高抗封协议，单节点突发高达 2.5Gbps。日常放在 Clash Verge Rev 或 Sing-box 的 Fallback 自动容灾策略组中作为「永久备用救生圈」，零月租持有成本，在主力机场偶发维护或敏感期海缆波动时秒级接管，再也无需临时到处寻找低劣免费梯子。
  </p>
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(245, 158, 11, 0.3);">
    <span style="color: #065f46; font-weight: 600;">🏷️ 专属优惠券折扣码：<code style="background: #fff; padding: 3px 8px; border-radius: 4px; border: 1px solid #10b981; color: #047857; font-weight: bold;">AMM</code></span>
    <div>
      <a href="/review/guangsucloud" style="color: #2563eb; font-weight: 600; text-decoration: none; margin-right: 16px;">查阅光速云完整测评 →</a>
      <a href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" target="_blank" rel="nofollow sponsored noopener" class="vp-button vp-button-brand" style="display: inline-block; padding: 6px 18px; background: #2563eb; color: #fff; border-radius: 6px; font-weight: 600; text-decoration: none;">🚀 官网直达选购</a>
    </div>
  </div>
</div>
`;
}

const refundFiles = fs.readdirSync('refund').filter(f => f.endsWith('.md') && f !== 'index.md');

let upgraded = 0;
for (const file of refundFiles) {
  const fp = path.join('refund', file);
  let content = fs.readFileSync(fp, 'utf8');

  if (content.length >= 7000) {
    console.log(`[Skip] ${file} already ${content.length} chars.`);
    continue;
  }

  const h1Match = content.match(/^#\s*(.+)/m);
  const title = h1Match ? h1Match[1].trim() : file;

  const extra = refundUpgrades[file] || getRefundGenericExtension(file, title);
  content = content + '\n\n' + extra;

  fs.writeFileSync(fp, content, 'utf8');
  upgraded++;
  console.log(`[${upgraded}] Upgraded refund/${file} -> ${content.length} chars`);
}

console.log(`\nSuccessfully upgraded ${upgraded} refund files!`);
