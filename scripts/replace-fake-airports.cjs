const fs = require('fs');
const path = require('path');

const cardTemplates = {
  guangsuFlagship: `
<AffiliateCard
  name="光速云 (Guangsu Cloud) · 纯内网 IEPL 旗舰"
  slogan="端到端二层 IEPL 物理专线 · 全节点 1.0x 真实倍率 · 原生双 ISP 住宅落地"
  price="8.25"
  unit="月起 (年付99元享69GB/月 或 纯月付28元起)"
  badge="2026 全网综合测评 No.1 首选推荐"
  :tags="['纯物理IEPL专线', '双ISP原生解锁', '晚高峰0丢包', 'VLESS-Reality', '自研与开源双支持']"
  lineType="深圳-香港 / 上海-日本 / 济南-首尔 端到端物理内网专线"
  protocols="VLESS-Reality, Shadowsocks-2022, Trojan"
  speed="晚高峰实测 980 Mbps · 8K 秒开 · 抖动 < 1.5ms"
  refund="支持按使用天数比例透明原路退还 / 7×24h 工单保障"
  pros="全网实测第一梯队，全国部署三网 BGP Anycast 入口，晚高峰 0 丢包；原生住宅双 ISP 落地 IP，100% 丝滑解锁 Netflix、Claude 3.5 与 ChatGPT 4o；全节点 1.0x 真实倍率不虚标。"
  cons="不参与自杀式超低价庞氏甩卖；高端专线名额需按月平稳交付。"
  coupon="AMM"
  url="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
  backupUrl="https://guangsucloud.com/#/register?code=AMM"
/>
`,

  guangsuSnooker: `
<AffiliateCard
  name="光速云 · 致敬斯诺克 147 永久套餐"
  slogan="147元一次性买断 247GB 纯内网 IEPL 专线 · 零月租持有成本 · 永不过期应急救生圈"
  price="147.00"
  unit="一次性买断 (247GB 流量永不过期)"
  badge="全网独家热备/防失联神器"
  :tags="['流量永不过期', '纯内网IEPL专线', '零月租零折旧', 'Fallback自动容灾', 'VLESS-Reality']"
  lineType="全国多线 BGP 入口 + 广港/沪日物理专线 (端到端内网)"
  protocols="企业级 VLESS-Reality 现代高抗封协议"
  speed="单节点突发高达 2.5 Gbps · 毫秒级极速容灾接管"
  refund="未激活使用支持全额退还 / 终身有效资产保障"
  pros="彻底消灭按月清零的时间倒计时！一次购买终身持有，放在 Clash Verge Rev 或 Sing-box 的 Fallback 自动容灾策略组末尾，主力机场维护或敏感期海缆波动时秒级接管，零持有成本。"
  cons="一次性买断固定额度；若日常需月耗数百 G 流量，建议搭配年付轻量版。"
  coupon="AMM"
  url="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"
  backupUrl="https://guangsucloud.com/#/register?code=AMM"
/>
`,

  feimaoBudget: `
<AffiliateCard
  name="飞猫云 (Flycat Cloud) · 专属客户端小白首选版"
  slogan="零基础小白免配置 · Windows/Android 专属软件即开即用 · 优质 BGP 专线"
  price="7.00"
  unit="月起 (年付折合仅 7元/月 享 50GB/月)"
  badge="新手免配置/平价性价比之王"
  :tags="['自研一键客户端', '免配置导订阅', 'BGP智能动态专线', '晚高峰4K秒开']"
  lineType="全国三网优质 BGP 入口 + 亚太低延迟互联"
  protocols="Shadowsocks, VLESS, 自研专用协议"
  speed="全天候秒开 360 Mbps / 晚高峰流畅播放 4K"
  refund="24小时内未满意全额退款 / 在线技术客服支持"
  pros="不用手动导订阅、不用挑客户端，Windows与Android下载专属软件登录账号即刻接入；学生党与轻度办公用户的绝佳平价主力。"
  cons="不提供极高阶规则集覆写功能；适合零基础与轻中度用户。"
  coupon="flycat888"
  url="https://guangs.flycataff.com/#/?code=6uq0Xe9y"
  backupUrl="https://feimaoyun.org/#/register?code=y4jT2sB1"
/>
`,

  weifengBulk: `
<AffiliateCard
  name="微风网络 (Weifeng Network) · 海量大吞吐下载旗舰"
  slogan="每 GB 真实持有成本低至 0.08 元 · 充沛突发大带宽 · 晚高峰抗拥塞"
  price="12.00"
  unit="月起 (超大容量流量池)"
  badge="大流量/网盘下载党标杆首选"
  :tags="['每G不到一毛钱', '海量大吞吐', '多线程满速下载', '全平台开源客户端适配']"
  lineType="公网 BGP 大带宽多线中继 + 亚太优化链路"
  protocols="Shadowsocks, Trojan, Hysteria 2"
  speed="多线程并发下载突破 600 Mbps / 蓝光大文件秒拉"
  refund="支持无理由工单退订 / 透明账单明细"
  pros="拥有极其充沛的突发带宽储备，适合海外网盘文件同步、蓝光影视资源拉取、Docker 镜像加速及长期挂机下载。"
  cons="延迟相比物理专线略高 5-10ms；核心定位为高性价比大吞吐。"
  coupon="flat888"
  url="https://edp01.breezenetaff.com/#/?code=t3huofyI"
  backupUrl="https://weifengnet.biz/#/register?code=6y1bVwI0"
/>
`,

  muguangStream: `
<AffiliateCard
  name="暮光加速 (Muguang) · 全球 4K/8K 影音专线旗舰"
  slogan="原生住宅落地 IP 储备 · 承诺解锁 Netflix 全区非自制剧 · 支持 Apple TV 原生直连"
  price="22.00"
  unit="月起 (优质流媒体优化套餐)"
  badge="影音发烧友终极首选"
  :tags="['原生双ISP住宅', 'Netflix全区非自制', 'Disney+秒开', 'Apple TV/Surge适配', '支持24h退款']"
  lineType="广港/沪美 40Gbps 优质专线 + 纯净本土住宅落地池"
  protocols="Trojan, VLESS-Reality, Shadowsocks"
  speed="单线程测速 420 Mbps / 晚高峰 4K 拖拽零等待 / 丢包率 < 0.1%"
  refund="24小时内若出现主流流媒体无法解锁支持退换保障"
  pros="美、日、港、台、新全区原生本土住宅落地，支持家庭多设备并发，提供专属 Apple TV / Surge 影音极简配置文件，彻底告别代理报错。"
  cons="主打高品质流媒体体验，不参与超低价公网中转恶性竞争。"
  coupon="muguang5555"
  url="https://muguang.me/#/register?code=B2eK6X4W"
  backupUrl="https://muguang.me/#/register?code=B2eK6X4W"
/>
`
};

// Replacement function for card blocks
function replaceCardBlock(match) {
  // Check which fake brand it is
  if (match.includes('SpareRoute') || match.includes('备用客') || match.includes('CloudShield') || match.includes('云盾应急') || match.includes('CloudResilience') || match.includes('云速备用舱')) {
    return cardTemplates.guangsuSnooker.trim();
  }
  if (match.includes('NebulaLink') || match.includes('星云互联')) {
    return cardTemplates.feimaoBudget.trim();
  }
  if (match.includes('CloudPinnacle') || match.includes('云际网络') || match.includes('ThunderGeek') || match.includes('雷霆极客')) {
    return cardTemplates.weifengBulk.trim();
  }
  if (match.includes('CineStream Pro') || match.includes('极光影音')) {
    return cardTemplates.muguangStream.trim();
  }
  if (match.includes('Aurora') || match.includes('极光')) {
    return cardTemplates.guangsuFlagship.trim();
  }
  return match;
}

// Replacement for body text mentions
const textReplacements = [
  // Names
  [/极光专线网络\s*\(Aurora Metro Express\)/g, '光速云 (Guangsu Cloud) · 纯内网 IEPL 旗舰'],
  [/极光网络\s*\(AuroraExpress\)/g, '光速云 (Guangsu Cloud)'],
  [/极光专线\s*AuroraNet/g, '光速云 (Guangsu Cloud)'],
  [/极光影音\s*\(CineStream Pro\)/g, '光速云 (Guangsu Cloud) / 暮光加速'],
  [/云盾应急双活\s*\(CloudShield Emergency\)/g, '光速云 · 致敬斯诺克 147 永久套餐'],
  [/云速备用舱\s*\(CloudResilience\)/g, '光速云 · 致敬斯诺克 147 永久套餐'],
  [/备用客\s*\(SpareRoute\)/g, '光速云 · 致敬斯诺克 147 永久套餐'],
  [/星云互联\s*\(NebulaLink[^\)]*\)/g, '飞猫云 (Flycat Cloud)'],
  [/星云互联/g, '飞猫云'],
  [/NebulaLink/g, 'Flycat Cloud'],
  [/云际网络\s*\(CloudPinnacle\)/g, '微风网络 (Weifeng Network)'],
  [/云际网络/g, '微风网络'],
  [/CloudPinnacle/g, 'Weifeng Network'],
  [/雷霆极客\s*\(ThunderGeek\)/g, '光速云 (Guangsu Cloud)'],
  [/雷霆极客/g, '光速云'],
  [/ThunderGeek/g, 'Guangsu Cloud'],
  [/极光网络/g, '光速云'],
  [/AuroraExpress/g, 'Guangsu Cloud'],
  [/aurora-express/g, 'guangsucloud'],
  [/aurora-backup/g, 'guangsu-backup'],
  [/MIANFEI_AURORA/g, 'AMM'],
  [/MIANFEI_SHIELD/g, 'AMM'],
  [/极光专线/g, '光速云专线'],
  [/极光影音/g, '光速云'],
  [/云盾应急/g, '光速云永久备用'],
  [/CloudShield/g, 'Guangsu Cloud'],
  [/备用客/g, '光速云永久备用'],
  [/SpareRoute/g, 'Guangsu Cloud'],
  [/https:\/\/example\.com\/aurora[^\"]*/g, 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y'],
  [/https:\/\/example\.com\/cloudshield[^\"]*/g, 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y'],
  [/https:\/\/mianfeizhinan\.fun\/go\/aurora[^\"]*/g, 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y'],
  [/https:\/\/mianfeizhinan\.fun\/go\/nebulalink[^\"]*/g, 'https://guangs.flycataff.com/#/?code=6uq0Xe9y'],
  [/https:\/\/mianfeizhinan\.fun\/go\/spareroute[^\"]*/g, 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y'],
  [/https:\/\/mianfeizhinan\.fun\/go\/cloudpinnacle[^\"]*/g, 'https://edp01.breezenetaff.com/#/?code=t3huofyI'],
  [/https:\/\/mianfeizhinan\.fun\/go\/thundergeek[^\"]*/g, 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y'],
  [/https:\/\/mianfeizhinan\.fun\/go\/cinestream[^\"]*/g, 'https://muguang.me/#/register?code=B2eK6X4W']
];

let modifiedCount = 0;

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.vitepress' && entry.name !== '.git' && entry.name !== 'scripts') {
        processDirectory(full);
      }
    } else if (entry.name.endsWith('.md')) {
      let content = fs.readFileSync(full, 'utf8');
      const orig = content;

      // 1. Replace <AffiliateCard ... /> blocks
      content = content.replace(/<AffiliateCard[\s\S]*?\/>/g, replaceCardBlock);

      // 2. Replace text occurrences
      for (const [pattern, replacement] of textReplacements) {
        content = content.replace(pattern, replacement);
      }

      if (content !== orig) {
        fs.writeFileSync(full, content, 'utf8');
        modifiedCount++;
        console.log(`[${modifiedCount}] Cleaned fake airports in: ${full.replace(/\\/g, '/')}`);
      }
    }
  }
}

console.log('Starting full cleanup of fake airports across site...');
processDirectory('.');
console.log(`\nSuccessfully cleaned fake airports in ${modifiedCount} files!`);
