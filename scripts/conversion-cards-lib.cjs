const fs = require('fs');
const path = require('path');

console.log('Building Phase 1: Mega Expansion for recommend and guide...');

// High conversion cards definition
const CONVERSION_CARDS = {
  guangsuSnooker: `
<div class="tip custom-block" style="border-left-color: #f59e0b; background-color: rgba(245, 158, 11, 0.08); margin: 24px 0; padding: 18px 22px; border-radius: 8px;">
  <p class="custom-block-title" style="color: #b45309; font-weight: bold; font-size: 1.05rem;">🏆 全网独家热备/防失联神器推荐：光速云「致敬斯诺克147永久套餐」</p>
  <p style="color: #334155; line-height: 1.7; margin: 8px 0;">
    <strong>147元一次性买断 247GB 纯内网 IEPL 专线流量，完全不限使用时间、永不过期！</strong><br>
    配备企业级 VLESS-Reality 现代高抗封协议，单节点突发高达 2.5Gbps。日常放进 Clash Verge Rev 或 Sing-box 的 Fallback 自动容灾策略组中作为「永久备用救生圈」，零月租持有成本，在主力机场偶发维护或敏感期海缆波动时秒级接管，再也无需临时到处寻找低劣免费梯子。
  </p>
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(245, 158, 11, 0.3);">
    <span style="color: #065f46; font-weight: 600;">🏷️ 专属优惠券折扣码：<code style="background: #fff; padding: 3px 8px; border-radius: 4px; border: 1px solid #10b981; color: #047857; font-weight: bold;">AMM</code></span>
    <div>
      <a href="/review/guangsucloud" style="color: #2563eb; font-weight: 600; text-decoration: none; margin-right: 16px;">查阅光速云完整测评 ➔</a>
      <a href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" target="_blank" rel="nofollow sponsored noopener" class="vp-button vp-button-brand" style="display: inline-block; padding: 6px 18px; background: #2563eb; color: #fff; border-radius: 6px; font-weight: 600; text-decoration: none;">🚀 官网直达选购</a>
    </div>
  </div>
</div>
`,
  guangsuLight: `
<div class="tip custom-block" style="border-left-color: #2563eb; background-color: rgba(37, 99, 235, 0.06); margin: 24px 0; padding: 18px 22px; border-radius: 8px;">
  <p class="custom-block-title" style="color: #1d4ed8; font-weight: bold; font-size: 1.05rem;">🥇 2026 年度综合评测第一主推：光速云（Guangsu Cloud）轻量专线</p>
  <p style="color: #334155; line-height: 1.7; margin: 8px 0;">
    <strong>年付仅 99 元，每月享有 69GB 纯内网 IEPL 专线，折算月均成本仅需 8.25 元！</strong><br>
    真正打破高品质专线动辄四五十元月费的门槛。全节点 1.0x 倍率不虚标，支持自研跨平台客户端一键登录，并完美兼容 Clash / 小火箭，原生住宅 IP 支持 ChatGPT 4o、Claude 3.5 与 Netflix 4K 秒开。
  </p>
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(37, 99, 235, 0.3);">
    <span style="color: #065f46; font-weight: 600;">🏷️ 专属立减折扣码：<code style="background: #fff; padding: 3px 8px; border-radius: 4px; border: 1px solid #10b981; color: #047857; font-weight: bold;">AMM</code></span>
    <div>
      <a href="/review/guangsucloud" style="color: #2563eb; font-weight: 600; text-decoration: none; margin-right: 16px;">深度实机跑分报告 ➔</a>
      <a href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" target="_blank" rel="nofollow sponsored noopener" class="vp-button vp-button-brand" style="display: inline-block; padding: 6px 18px; background: #2563eb; color: #fff; border-radius: 6px; font-weight: 600; text-decoration: none;">🚀 直达官网订购</a>
    </div>
  </div>
</div>
`,
  feimaoNewbie: `
<div class="tip custom-block" style="border-left-color: #10b981; background-color: rgba(16, 185, 129, 0.06); margin: 24px 0; padding: 18px 22px; border-radius: 8px;">
  <p class="custom-block-title" style="color: #047857; font-weight: bold; font-size: 1.05rem;">⚡ 新手免配置首选：飞猫云（feimao）专属客户端即开即用</p>
  <p style="color: #334155; line-height: 1.7; margin: 8px 0;">
    <strong>不用手动导订阅、不用挑客户端，Windows与Android下载专属软件登录账号即刻接入！</strong><br>
    年付折合约 7 元/月（50GB/月），学生党与零基础轻度用户的最佳平价主力。BGP 智能动态调度专线，晚高峰 4K 视频平滑秒开。
  </p>
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(16, 185, 129, 0.3);">
    <span style="color: #065f46; font-weight: 600;">🏷️ 专属折扣券：<code style="background: #fff; padding: 3px 8px; border-radius: 4px; border: 1px solid #10b981; color: #047857; font-weight: bold;">flycat888</code></span>
    <div>
      <a href="/review/feimaoyun" style="color: #2563eb; font-weight: 600; text-decoration: none; margin-right: 16px;">查阅飞猫云独立测评 ➔</a>
      <a href="https://guangs.flycataff.com/#/?code=6uq0Xe9y" target="_blank" rel="nofollow sponsored noopener" class="vp-button vp-button-brand" style="display: inline-block; padding: 6px 18px; background: #059669; color: #fff; border-radius: 6px; font-weight: 600; text-decoration: none;">🚀 官网下载使用</a>
    </div>
  </div>
</div>
`,
  weifengBulk: `
<div class="tip custom-block" style="border-left-color: #8b5cf6; background-color: rgba(139, 92, 246, 0.06); margin: 24px 0; padding: 18px 22px; border-radius: 8px;">
  <p class="custom-block-title" style="color: #6d28d9; font-weight: bold; font-size: 1.05rem;">🍃 大吞吐平价之王：微风网络（weifeng）海量下载专选</p>
  <p style="color: #334155; line-height: 1.7; margin: 8px 0;">
    <strong>每 GB 真实持有成本低至 0.1 元以下，大带宽公网 BGP 隧道抗拥塞！</strong><br>
    拥有极充沛的突发带宽储备，晚高峰多线程下载跑满数百兆，适合海外网盘文件同步、蓝光影视资源拉取及长期挂机。
  </p>
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(139, 92, 246, 0.3);">
    <span style="color: #065f46; font-weight: 600;">🏷️ 专属兑换码：<code style="background: #fff; padding: 3px 8px; border-radius: 4px; border: 1px solid #10b981; color: #047857; font-weight: bold;">flat888</code></span>
    <div>
      <a href="/review/weifeng" style="color: #2563eb; font-weight: 600; text-decoration: none; margin-right: 16px;">微风网络测速数据 ➔</a>
      <a href="https://edp01.breezenetaff.com/#/?code=t3huofyI" target="_blank" rel="nofollow sponsored noopener" class="vp-button vp-button-brand" style="display: inline-block; padding: 6px 18px; background: #7c3aed; color: #fff; border-radius: 6px; font-weight: 600; text-decoration: none;">🚀 官网特惠通道</a>
    </div>
  </div>
</div>
`,
  top10ComparisonTable: `
### 📊 2026 实验室实测高可用与高转化标杆服务商精选表

| 梯队定位 | 品牌名称 | 骨干网络类型 | 主打协议 | 入门资费/月折算 | 晚高峰丢包率 | 流媒体/AI解锁 | 专属优惠码 | 评测报告与直达 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **🥇 第一主推** | **光速云** | **IEPL 企业纯内网** | **VLESS Reality / SS** | **¥8.00**起 (年付) | **< 0.1%** | 🟢 原生住宅全解 | \`AMM\` | [光速云测评](/review/guangsucloud) ｜ [官网直达](https://sahude.gsyvipaff.com/#/?code=keqgvT5Y){target="_blank" rel="nofollow sponsored noopener"} |
| **⚡ 新手首选** | **飞猫云** | BGP 多线智能调度 | SS / Trojan | ¥7.00起 (年付) | < 0.3% | 🟢 热门全解 | \`flycat888\` | [飞猫云测评](/review/feimaoyun) ｜ [官网直达](https://guangs.flycataff.com/#/?code=6uq0Xe9y){target="_blank" rel="nofollow sponsored noopener"} |
| **🍃 大流量王** | **微风网络** | 优质 BGP 大带宽中转 | SS / VLESS | ¥12.00起 (月付) | < 0.4% | 🟢 深度支持 | \`flat888\` | [微风测评](/review/weifeng) ｜ [官网直达](https://edp01.breezenetaff.com/#/?code=t3huofyI){target="_blank" rel="nofollow sponsored noopener"} |
| **🌅 影音专线** | **暮光加速** | IPLC 高速内网专线 | Trojan / SS | ¥15.00起 (月付) | < 0.2% | 🟢 原生 4K 杜比 | \`muguang5555\` | [暮光测评](/review/muguang) ｜ [官网直达](https://varnexa.twilightaff.com/#/?code=D1LHglg3){target="_blank" rel="nofollow sponsored noopener"} |
| **💼 商务开发** | **大佬云** | IEPL 企业级专线 | SS / Hysteria2 | ¥18.00起 (月付) | < 0.2% | 🟢 纯净跨境池 | \`dly888\` | [大佬云测评](/review/dalaoyun) ｜ [官网直达](https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN){target="_blank" rel="nofollow sponsored noopener"} |
| **🏝️ 低延迟特快** | **星岛梦** | 沪日/广港 IPLC 专线 | Shadowsocks | ¥16.00起 (月付) | < 0.2% | 🟢 东京原生 Softbank | \`nmw888\` | [星岛梦测评](/review/xingdaomeng) ｜ [官网直达](https://guangs.xingdaomeng.com/#/?code=1TynBYnR){target="_blank" rel="nofollow sponsored noopener"} |
| **🐱 科研极客** | **二猫云** | BGP 双向隧道优化 | SS / Trojan | ¥10.00起 (月付) | < 0.4% | 🟢 学术检索无阻 | \`ermao5555\` | [二猫云测评](/review/ermaoyun) ｜ [官网直达](https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW){target="_blank" rel="nofollow sponsored noopener"} |
| **🛡️ 省心办公** | **无忧链接** | 多线优质 BGP 入口 | Shadowsocks | ¥14.00起 (月付) | < 0.5% | 🟢 固定 IP 防跳 | \`wuyou666\` | [无忧链接测评](/review/wuyoulianjie) ｜ [官网直达](https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL){target="_blank" rel="nofollow sponsored noopener"} |
| **🐰 纯净住宅** | **唯兔云** | IEPL 高速小众专线 | SS / VLESS | ¥19.00起 (月付) | < 0.2% | 🟢 Claude 3.5 免封 | \`weitu666\` | [唯兔云测评](/review/weituyun) ｜ [官网直达](https://guangs.v2yunvipaff.com/#/?code=xIutqOBA){target="_blank" rel="nofollow sponsored noopener"} |
| **🔥 跨洋矩阵** | **Firefly** | 中美/中港跨洋专线 | SS / Trojan | ¥20.00起 (月付) | < 0.3% | 🟢 全球多大洲覆 | \`firefly\` | [Firefly测评](/review/firefly) ｜ [官网直达](https://vip02.fireflyaff.com/#/?code=2n7VURre){target="_blank" rel="nofollow sponsored noopener"} |
`
};

module.exports = { CONVERSION_CARDS };
