const fs = require('fs');
const path = require('path');

const configPath = path.resolve('.vitepress/config.mts');
const content = fs.readFileSync(configPath, 'utf8');

const p1 = content.indexOf("'/review/': [");
const p2 = content.indexOf("'/guide/': [");

if (p1 === -1 || p2 === -1) {
  console.error('Could not find bounds for /review/ in config.mts');
  process.exit(1);
}

const newReviewSection = `'/review/': [
        {
          text: '🏆 2026 主流机场综合实测榜 (Top 10)',
          collapsed: false,
          items: [
            { text: '评测主入口与总榜 (Overview)', link: '/review/' },
            { text: 'No.1 光速云（IEPL专线/VLESS/永久套餐）', link: '/review/guangsucloud' },
            { text: 'No.2 飞猫云（专属客户端/新手即用）', link: '/review/feimaoyun' },
            { text: 'No.3 微风网络（平价大流量中继）', link: '/review/weifeng' },
            { text: 'No.4 暮光加速（IPLC高速/流媒体专线）', link: '/review/muguang' },
            { text: 'No.5 大佬云（企业级内网/商务协同）', link: '/review/dalaoyun' },
            { text: 'No.6 星岛梦（沪日IPLC/日新原生节点）', link: '/review/xingdaomeng' },
            { text: 'No.7 二猫云（双向隧道/极客学生首选）', link: '/review/ermaoyun' },
            { text: 'No.8 无忧链接（省心轻办公免折腾）', link: '/review/wuyoulianjie' },
            { text: 'No.9 唯兔云（轻奢专线/干净住宅IP）', link: '/review/weituyun' },
            { text: 'No.10 Firefly（跨洋骨干/欧美解锁）', link: '/review/firefly' }
          ]
        },
        {
          text: '🌐 42家机场品牌测评库 (11-28)',
          collapsed: true,
          items: [
            { text: '宇宙云（VLESS高性能并发）', link: '/review/yuzhouyun' },
            { text: 'U1S1（透明实测/高性比影音）', link: '/review/u1s1' },
            { text: '灵猫网络（低调老牌中继）', link: '/review/lingmaonet' },
            { text: '极连云（多网优化/低抖动拓扑）', link: '/review/jilianyun' },
            { text: '光年梯（平价长效年付首选）', link: '/review/guangnianti' },
            { text: '一翻云（多重负载均衡容灾）', link: '/review/yifanyun' },
            { text: 'SOGO 云（大流量包下载党首选）', link: '/review/sogoyun' },
            { text: '可信云（严选低倍率原生节点）', link: '/review/kexinyun' },
            { text: '速界（4K超高清视频串流）', link: '/review/sujie' },
            { text: '闪跃（多网络自适应穿透）', link: '/review/shanyue' },
            { text: '全球云（跨国小众冷门节点）', link: '/review/quanqiuyun' },
            { text: '闪电鼠（低门槛小额试水）', link: '/review/shandianshu' },
            { text: '云界线（按量付费应急备用）', link: '/review/yunjiexian' },
            { text: '榴莲云（小而美稳定分流）', link: '/review/liulianyun' },
            { text: '神行加速（双通道冗余保障）', link: '/review/shenxing' },
            { text: '环球梯（入门实用多节点）', link: '/review/huanqiuti' },
            { text: '隐形人（多重混淆防封锁）', link: '/review/yinxingren' },
            { text: '梯子云（极简纯净月付版）', link: '/review/tiziyun' }
          ]
        },
        {
          text: '🌐 42家机场品牌测评库 (29-42)',
          collapsed: true,
          items: [
            { text: 'WgetCloud（行业殿堂级高奢专线）', link: '/review/wgetcloud' },
            { text: '白月光（老牌平价多线中转）', link: '/review/baiyueguang' },
            { text: 'FlyingBird（全专线IPLC无倍率）', link: '/review/flyingbird' },
            { text: 'CyberGuard（高防抗封锁专线）', link: '/review/cyberguard' },
            { text: '龙猫云（海外华人团队2Gbps）', link: '/review/longmaoyun' },
            { text: 'FATCAT（胖猫IEPL/IPLC内网）', link: '/review/fatcat' },
            { text: 'TNTCloud（老牌3A分站跨境定制）', link: '/review/tntcloud' },
            { text: '青云梯（6年老牌6Gbps三网优化）', link: '/review/qingyunti' },
            { text: '山水云（平价大流量挂机下载）', link: '/review/shanshuiyun' },
            { text: '灵动云（动态智能选路专线）', link: '/review/lingdongyun' },
            { text: '浪网（全球大吞吐无上限突发）', link: '/review/langwang' },
            { text: 'EdgeNova（边缘节点算力加速）', link: '/review/edgenova' },
            { text: '萤火虫（高性价比海外媒体解锁）', link: '/review/yinghuochong' },
            { text: 'sslar（企业级IEPL自研客户端）', link: '/review/sslar' }
          ]
        },
        {
          text: '📊 硬核网络性能指标与评测白皮书',
          collapsed: false,
          items: [
            { text: '晚高峰丢包与网络抖动严苛实测', link: '/review/peak-jitter-packet-loss' },
            { text: '原生IP解锁与FraudScore风控审计', link: '/review/streaming-unlock-fraudscore' },
            { text: '真实骨干线路鉴别：BGP中继与IEPL', link: '/review/backbone-line-taxonomy' },
            { text: 'Clash/Sing-box/Surge 全平台分流适配', link: '/review/client-ecosystem-routing' },
            { text: '客户端生态兼容与内核资源占用', link: '/review/client-ecology-support' },
            { text: '节点倍率陷阱与虚标流量偷跑核算', link: '/review/multiplier-traffic-theft' },
            { text: '工单响应时效与客服技术能力评级', link: '/review/support-sla-rating' },
            { text: '每GB流量单价与性价比综合矩阵', link: '/review/cost-per-gb-matrix' },
            { text: '30天全天候连通率追踪大盘', link: '/review/thirty-day-uptime-radar' },
            { text: '年度红黑榜与防跑路黑名单', link: '/review/annual-honors-and-blacklist' }
          ]
        }
      ],
      `;

const updatedContent = content.slice(0, p1) + newReviewSection + content.slice(p2);
fs.writeFileSync(configPath, updatedContent, 'utf8');
console.log('Successfully updated .vitepress/config.mts sidebar!');
