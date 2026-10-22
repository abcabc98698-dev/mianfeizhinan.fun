const fs = require('fs');
const path = require('path');

const reviewIndexPath = path.resolve('review/index.md');
let currentContent = fs.readFileSync(reviewIndexPath, 'utf8');

// The Top 10 Showcase section
const top10Showcase = `
---

## 🏆 2026 年度 42 家机场综合实测排行榜（Top 10 旗舰主推）

实验室结合 **30 天持续在线监测**、**晚高峰（20:00-23:30）千次发包丢包率**、**原生 IP 解锁纯净度** 以及 **客诉工单响应时效**，对全网 42 家主流机场进行了全维度打分。以下为综合评级排名前 10 的旗舰标杆服务商：

<div class="tip custom-block" style="border-left-color: #f59e0b; background-color: rgba(245, 158, 11, 0.08); margin: 20px 0;">
  <p class="custom-block-title">🥇 2026 年度第一主推：光速云（Guangsu Cloud）</p>
  <p>
    <strong>综合评分 9.8 / 10 · 专线标杆 · 抗封锁第一梯队</strong><br>
    光速云凭借 <strong>IEPL 企业级纯内网专线 + VLESS Reality 现代高抗封协议</strong> 架构，在历次网络敏感期表现出近乎 100% 的在线率。
    独创 <strong>致敬斯诺克 147 永久套餐</strong>（147元买断 247GB 永久不过期），轻量版年付折合仅 <strong>8元/月</strong>。不论是跨境电商直播、海外 AI 生产力（ChatGPT 4o / Claude 3.5）还是日常 4K 追剧，均是全网最稳健省心的首选主力。
  </p>
  <p style="margin-top: 10px;">
    👉 <a href="/review/guangsucloud" style="font-weight: bold; color: #2563eb;">查看光速云完整深度测评报告与测速图解</a> ｜ 
    🚀 <a href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" target="_blank" rel="nofollow sponsored noopener" style="font-weight: bold; color: #059669;">立即直达光速云官网（使用专属优惠码 AMM）</a>
  </p>
</div>

### 🎖️ Top 10 机场核心性能与专属优惠速查表

| 排名 | 机场品牌 | 骨干网络拓扑 | 主力协议 | 入门资费/月起 | 晚高峰延迟 | AI/流媒体解锁 | 专属优惠码 | 深度评测报告 | 官网直达 |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **No.1** | **光速云** 🏆 | **IEPL企业双内网** | **VLESS / SS** | **¥8.00** (年付折算) | 22ms - 35ms | 🟢 完美解锁 | \`AMM\` | [光速云测评](/review/guangsucloud) | [官网直达](https://sahude.gsyvipaff.com/#/?code=keqgvT5Y){target="_blank" rel="nofollow sponsored noopener"} |
| **No.2** | **飞猫云** ⚡ | BGP多线智能中继 | SS / Trojan | ¥7.00 (年付折算) | 28ms - 42ms | 🟢 完整解锁 | \`flycat888\` | [飞猫云测评](/review/feimaoyun) | [官网直达](https://guangs.flycataff.com/#/?code=6uq0Xe9y){target="_blank" rel="nofollow sponsored noopener"} |
| **No.3** | **微风网络** 🍃 | 优质BGP公网中转 | SS / VLESS | ¥12.00 | 32ms - 48ms | 🟢 深度兼容 | \`flat888\` | [微风网络测评](/review/weifeng) | [官网直达](https://edp01.breezenetaff.com/#/?code=t3huofyI){target="_blank" rel="nofollow sponsored noopener"} |
| **No.4** | **暮光加速** 🌅 | IPLC高速专线 | Trojan / SS | ¥15.00 | 30ms - 45ms | 🟢 原生解锁 | \`muguang5555\` | [暮光加速测评](/review/muguang) | [官网直达](https://varnexa.twilightaff.com/#/?code=D1LHglg3){target="_blank" rel="nofollow sponsored noopener"} |
| **No.5** | **大佬云** 💼 | IEPL企业级内网 | SS / Hysteria2 | ¥18.00 | 35ms - 52ms | 🟢 完美支持 | \`dly888\` | [大佬云测评](/review/dalaoyun) | [官网直达](https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN){target="_blank" rel="nofollow sponsored noopener"} |
| **No.6** | **星岛梦** 🏝️ | 沪日/广港 IPLC | SS | ¥16.00 | 25ms - 38ms | 🟢 原生住宅 | \`nmw888\` | [星岛梦测评](/review/xingdaomeng) | [官网直达](https://guangs.xingdaomeng.com/#/?code=1TynBYnR){target="_blank" rel="nofollow sponsored noopener"} |
| **No.7** | **二猫云** 🐱 | BGP双向隧道优化 | SS / Trojan | ¥10.00 | 38ms - 55ms | 🟢 良好支持 | \`ermao5555\` | [二猫云测评](/review/ermaoyun) | [官网直达](https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW){target="_blank" rel="nofollow sponsored noopener"} |
| **No.8** | **无忧链接** 🛡️ | 多线优质BGP入口 | SS | ¥14.00 | 36ms - 50ms | 🟢 稳定免翻 | \`wuyou666\` | [无忧链接测评](/review/wuyoulianjie) | [官网直达](https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL){target="_blank" rel="nofollow sponsored noopener"} |
| **No.9** | **唯兔云** 🐰 | IEPL高速内网 | SS / VLESS | ¥19.00 | 30ms - 46ms | 🟢 低风控IP | \`weitu666\` | [唯兔云测评](/review/weituyun) | [官网直达](https://guangs.v2yunvipaff.com/#/?code=xIutqOBA){target="_blank" rel="nofollow sponsored noopener"} |
| **No.10** | **Firefly** 🔥 | 全球中继与跨洋专线 | SS / Trojan | ¥20.00 | 45ms - 65ms | 🟢 全球解锁 | \`firefly\` | [Firefly测评](/review/firefly) | [官网直达](https://vip02.fireflyaff.com/#/?code=2n7VURre){target="_blank" rel="nofollow sponsored noopener"} |

---

## 📚 42 家主流机场全景评测矩阵归档索引

为了让用户彻底摆脱信息不对称，我们建立了覆盖全网主流 42 家机场的独立档案。每篇测评均包含 **真实测速抓包图谱**、**价格套餐明细**、**流媒体与 AI 解锁审计** 以及 **全平台客户端配置指南**：

### 🔹 梯队一：高品质专线与老牌综合型机场（1-14）
- [【第一主推】光速云深度测评：IEPL专线、VLESS协议、147永久套餐全解析](/review/guangsucloud)
- [飞猫云深度测评：专属客户端小白免配置、高性价比入门体验](/review/feimaoyun)
- [微风网络深度测评：平价大流量中继、晚高峰抗丢包性能表现](/review/weifeng)
- [暮光加速深度测评：IPLC专线、全球高清流媒体高解锁率](/review/muguang)
- [大佬云深度测评：商务与跨境协同、高稳定性企业内网测试](/review/dalaoyun)
- [星岛梦深度测评：亚太近端低延迟专线、日新韩原生节点](/review/xingdaomeng)
- [二猫云深度测评：极客学生党高性价比中转、双向隧道优化](/review/ermaoyun)
- [无忧链接深度测评：全天候稳定免折腾、轻办公商务首选](/review/wuyoulianjie)
- [唯兔云深度测评：轻奢精品专线、低网络抖动与干净IP池](/review/weituyun)
- [Firefly（萤火虫）深度测评：跨洋高速骨干、欧美大带宽解锁](/review/firefly)
- [宇宙云深度测评：VLESS高性能协议矩阵、高并发稳定压测](/review/yuzhouyun)
- [U1S1深度测评：透明测速公开报告、高性价比流媒体套餐](/review/u1s1)
- [灵猫网络深度测评：低调老牌中转、稳定防封锁运营模型](/review/lingmaonet)
- [极连云深度测评：多网优化专线、晚高峰低抖动网络拓扑](/review/jilianyun)

### 🔹 梯队二：平价大流量与特色分流机场（15-28）
- [光年梯深度测评：平价长效年付首选、多地区节点覆盖广度](/review/guangnianti)
- [一翻云深度测评：多重负载均衡容灾、防断流多云中继](/review/yifanyun)
- [SOGO 云深度测评：超大流量包配置、下载党大吞吐实测](/review/sogoyun)
- [可信云深度测评：严选低倍率原生节点、透明化用量审计](/review/kexinyun)
- [速界深度测评：4K超高清视频串流、动态端口抗干扰技术](/review/sujie)
- [闪跃深度测评：轻巧快速穿透、移动端多网络自适应优化](/review/shanyue)
- [全球云深度测评：跨国冷门节点覆盖、本土化访问支持度](/review/quanqiuyun)
- [闪电鼠深度测评：超低门槛小额试用、随充随用零后顾之忧](/review/shandianshu)
- [云界线深度测评：无门槛按量按周期购买、应急备用首选](/review/yunjiexian)
- [榴莲云深度测评：小而美分流小站、专注日常网页流媒体](/review/liulianyun)
- [神行加速深度测评：双通道冗余保障、网络波动自动切线](/review/shenxing)
- [环球梯深度测评：入门级实用工具站、大批量备选配置方案](/review/huanqiuti)
- [隐形人深度测评：多重隐私混淆协议、深度防探测网络保护](/review/yinxingren)
- [梯子云深度测评：极简入门纯净版、月付试水零压力测评](/review/tiziyun)

### 🔹 梯队三：高端专线与行业新锐机场（29-42）
- [WgetCloud深度测评：行业殿堂级高奢专线、极客外贸大企业标配](/review/wgetcloud)
- [白月光深度测评：稳定运营多年粉丝基础雄厚、平价专线解析](/review/baiyueguang)
- [FlyingBird深度测评：全专线IPLC架构、无倍率买多少给多少](/review/flyingbird)
- [CyberGuard深度测评：高防抗封锁专线、复杂网络穿透利器](/review/cyberguard)
- [龙猫云深度测评：海外华人团队运维、2000Mbps超大带宽IPLC](/review/longmaoyun)
- [FATCAT深度测评：胖猫专线内网通道、企业级抗审查稳定性](/review/fatcat)
- [TNTCloud深度测评：老牌3A分站衍生、跨境电商TikTok直播定制](/review/tntcloud)
- [青云梯深度测评：6年老牌V4Speed底蕴、6Gbps集群三网智能负载](/review/qingyunti)
- [山水云深度测评：平价大流量中继、大文件传输与日常挂机首选](/review/shanshuiyun)
- [灵动云深度测评：动态智能选路专线、自动规避拥塞中转](/review/lingdongyun)
- [浪网深度测评：冲浪大带宽专选、全球大吞吐无上限突发带宽](/review/langwang)
- [EdgeNova深度测评：边缘节点算力加速、低时延API与AI交互](/review/edgenova)
- [萤火虫深度测评：高性价比海外中转、热门节点稳定支持海外媒体](/review/yinghuochong)
- [sslar深度测评：企业级IEPL多线BGP、自研三端客户端与远程协助](/review/sslar)

---
`;

// Insert the top 10 showcase before "## 一、国际网络性能评测总纲与「三大认知误区」粉碎"
const splitTarget = '## 一、国际网络性能评测总纲与「三大认知误区」粉碎';
if (currentContent.includes(splitTarget)) {
  const parts = currentContent.split(splitTarget);
  const newContent = parts[0] + top10Showcase + splitTarget + parts[1];
  fs.writeFileSync(reviewIndexPath, newContent, 'utf8');
  console.log('Successfully inserted Top 10 Showcase & 42 Brand Directory into review/index.md!');
} else {
  console.log('Split target not found, appending to end.');
  fs.appendFileSync(reviewIndexPath, top10Showcase, 'utf8');
}
