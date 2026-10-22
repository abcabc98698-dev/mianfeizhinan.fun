import { defineConfig } from 'vitepress'
import { pagefindPlugin, chineseSearchOptimize } from 'vitepress-plugin-pagefind'

export default defineConfig({
  title: '免费指南',
  description: '面向追求真实体验与数据透明的翻墙与代理选型指南，专注免费机场核验、防跑路监控、小额试用与网络安全。',
  lang: 'zh-CN',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/avatar.webp', type: 'image/webp' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['meta', { name: 'keywords', content: '免费机场, 机场推荐, 试用机场, 机场安全, 跑路监控, 机场退款, 机场评测, 购买指南, 节点核验, IPLC专线' }],
    ['meta', { name: 'author', content: '免费指南安全评测实验室' }],
    ['meta', { property: 'og:site_name', content: '免费指南 (mianfeizhinan.fun)' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'yandex-verification', content: '0c5bbc34b5d8e0b6' }]
  ],

  sitemap: {
    hostname: 'https://mianfeizhinan.fun',
    transformItems(items) {
      const now = new Date().toISOString()
      return items.map((item) => {
        let priority = 0.6
        if (item.url === '' || item.url === '/') priority = 1.0
        else if (item.url.endsWith('/') || !item.url.includes('/')) priority = 0.85
        return {
          ...item,
          changefreq: 'weekly',
          priority,
          lastmod: now
        }
      })
    }
  },

  transformHead(ctx) {
    const rawPath = ctx.page || ''
    const cleanPath = rawPath.replace(/index\.md$/, '').replace(/\.md$/, '')
    const canonicalUrl = `https://mianfeizhinan.fun/${cleanPath}`
    const title = ctx.title || '免费指南'
    const description = ctx.description || '面向追求真实体验与数据透明的翻墙与代理选型指南，专注免费机场核验、防跑路监控、小额试用与网络安全。'

    // Determine category breadcrumb name
    const categoryMap: Record<string, string> = {
      recommend: '机场推荐',
      free: '免费机场',
      trial: '试用与体验',
      security: '机场安全',
      runaway: '跑路监控',
      refund: '退款政策',
      review: '机场评测',
      guide: '购买指南',
      about: '关于我们',
      methodology: '评测方法论',
      privacy: '隐私政策',
      terms: '服务条款',
      disclosure: '推广披露'
    }

    const segments = cleanPath.split('/').filter(Boolean)
    const categoryKey = segments[0] || ''
    const categoryName = categoryMap[categoryKey] || '专题'

    const head: [string, Record<string, string>][] = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:image', content: 'https://mianfeizhinan.fun/avatar.webp' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: 'https://mianfeizhinan.fun/avatar.webp' }]
    ]

    if (cleanPath && cleanPath !== '/') {
      head.push(
        ['meta', { property: 'og:type', content: 'article' }],
        ['meta', { property: 'article:author', content: '免费指南安全评测实验室' }],
        ['meta', { property: 'article:section', content: categoryName }]
      )
    }

    // Search Engine verification slots from environment
    if (process.env.GOOGLE_SITE_VERIFICATION) {
      head.push(['meta', { name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION }])
    }
    if (process.env.BING_SITE_VERIFICATION) {
      head.push(['meta', { name: 'msvalidate.01', content: process.env.BING_SITE_VERIFICATION }])
    }
    if (process.env.BAIDU_SITE_VERIFICATION) {
      head.push(['meta', { name: 'baidu-site-verification', content: process.env.BAIDU_SITE_VERIFICATION }])
    }
    if (process.env.SHENMA_SITE_VERIFICATION) {
      head.push(['meta', { name: 'shenma-site-verification', content: process.env.SHENMA_SITE_VERIFICATION }])
    }

    // Build Schema.org Graph
    const schemaGraph: any[] = []

    // 1. BreadcrumbList for all subpages
    if (segments.length > 0) {
      const itemListElement: any[] = [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://mianfeizhinan.fun/' }
      ]
      if (segments.length === 1) {
        itemListElement.push({ '@type': 'ListItem', position: 2, name: categoryName, item: canonicalUrl })
      } else {
        itemListElement.push({ '@type': 'ListItem', position: 2, name: categoryName, item: `https://mianfeizhinan.fun/${categoryKey}/` })
        itemListElement.push({ '@type': 'ListItem', position: 3, name: title, item: canonicalUrl })
      }
      schemaGraph.push({
        '@type': 'BreadcrumbList',
        itemListElement
      })
    }

    // 2. Specialized Review Schema for individual airport review pages (review/*.md)
    if (categoryKey === 'review' && segments.length >= 2) {
      const brandName = title.replace(/【2026实机评测】|【2026最新评测】|好用吗.*|评测与购买建议.*|全面评测.*/g, '').trim()
      schemaGraph.push({
        '@type': 'Review',
        itemReviewed: {
          '@type': 'Product',
          name: brandName || title,
          description: description
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4.8',
          bestRating: '5'
        },
        author: {
          '@type': 'Organization',
          name: '免费指南安全评测实验室',
          url: 'https://mianfeizhinan.fun/about'
        },
        publisher: {
          '@type': 'Organization',
          name: '免费指南',
          url: 'https://mianfeizhinan.fun/'
        }
      })
    } else if (cleanPath !== '' && cleanPath !== '/') {
      // TechArticle for guides & technical deep dives
      schemaGraph.push({
        '@type': 'TechArticle',
        headline: title,
        description: description,
        author: {
          '@type': 'Organization',
          name: '免费指南安全评测实验室',
          url: 'https://mianfeizhinan.fun/about'
        },
        publisher: {
          '@type': 'Organization',
          name: '免费指南',
          url: 'https://mianfeizhinan.fun/'
        }
      })
    }

    if (schemaGraph.length > 0) {
      head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({ '@context': 'https://schema.org', '@graph': schemaGraph })
      ] as any)
    }

    return head as any
  },

  vite: {
    plugins: [
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: '全站搜索节点、评测、避坑知识...',
        holderText: '请输入搜索关键词...',
        noResultsText: '未找到相关评测或安全档案',
        heading: '共检索到 [SEARCH_RESULTS_COUNT] 篇相关权威内容'
      })
    ]
  },

  themeConfig: {
    siteTitle: '免费指南 · mianfeizhinan.fun',
    logo: '/avatar.webp',

    nav: [
      { text: '首页', link: '/' },
      { text: '机场推荐', link: '/recommend/' },
      { text: '免费机场', link: '/free/' },
      { text: '试用与体验', link: '/trial/' },
      { text: '机场安全', link: '/security/' },
      { text: '跑路监控', link: '/runaway/' },
      { text: '退款政策', link: '/refund/' },
      { text: '机场评测', link: '/review/' },
      { text: '购买指南', link: '/guide/' },
      {
        text: '关于与合规',
        items: [
          { text: '关于我们', link: '/about' },
          { text: '评测方法论', link: '/methodology' },
          { text: '推广与利益披露', link: '/disclosure' },
          { text: '隐私政策', link: '/privacy' },
          { text: '服务条款与免责', link: '/terms' }
        ]
      }
    ],

    sidebar: {
      '/recommend/': [
        {
          text: '⚡ 核心选型总谱',
          collapsed: false,
          items: [
            { text: '推荐体系主入口 (Overview)', link: '/recommend/' },
            { text: '5~10元低门槛月付机场', link: '/recommend/low-cost-tier' },
            { text: '新手免配置一键直连机场', link: '/recommend/beginner-friendly' },
            { text: '纯月付与按量计费精选', link: '/recommend/monthly-pay-as-you-go' },
            { text: '备用防失联应急专线搭建', link: '/recommend/backup-emergency' },
            { text: '4K/8K 流媒体解锁专线', link: '/recommend/streaming-unlock' },
            { text: '跨境电商与独立静态IP', link: '/recommend/ecommerce-static-ip' },
            { text: '晚高峰抗挤压 IEPL 物理专线', link: '/recommend/iepl-iplc-peak' },
            { text: '极客与学术多协议兼容型', link: '/recommend/geek-academic' }
          ]
        },
        {
          text: '🔍 进阶场景与容灾储备',
          collapsed: false,
          items: [
            { text: '备用节点储备与按量计费选型', link: '/recommend/backup-nodes' },
            { text: '跨境电商多店铺网络隔离架构', link: '/recommend/cross-border-ecommerce' },
            { text: '开发者与跨国游戏联机专线', link: '/recommend/developer-gaming' },
            { text: '高SLA企业级外贸与商务专线', link: '/recommend/high-sla-enterprise' },
            { text: '月付优先选型全景大系', link: '/recommend/monthly-priority' },
            { text: '原生住宅IP与4K流媒体解锁横评', link: '/recommend/native-ip-streaming' }
          ]
        }
      ],

      '/free/': [
        {
          text: '🛡️ 免费资源全景核验',
          collapsed: false,
          items: [
            { text: '免费资源知识图谱 (Overview)', link: '/free/' },
            { text: '长期公益免费节点全景调查', link: '/free/public-free-nodes' },
            { text: '免费节点真实可用性核验', link: '/free/connectivity-audit' },
            { text: '蜜罐与嗅探：免费节点安全陷阱', link: '/free/honeypot-threats' },
            { text: '每日更新订阅源与抓取池真相', link: '/free/subscription-pool-truth' },
            { text: '白嫖类商业机场存活周期与失效', link: '/free/free-tier-lifespan' },
            { text: '免费节点流媒体与AI解锁限制', link: '/free/unlock-limitations' },
            { text: '开源工具自建轻量免费节点', link: '/free/self-hosted-free-tier' },
            { text: '免费 vs 付费实测质量硬核横评', link: '/free/free-vs-paid-benchmark' }
          ]
        },
        {
          text: '🔬 深度攻防与应急自愈',
          collapsed: false,
          items: [
            { text: '极端环境应急抢险救生艇搭建', link: '/free/emergency-fallback-methods' },
            { text: '免费节点失效率与生命周期报告', link: '/free/failure-rate-tracking' },
            { text: '免费与付费翻墙成本对比模型', link: '/free/free-vs-paid-cost-model' },
            { text: '长期免费节点真实生态与获取全景', link: '/free/long-term-free-sources' },
            { text: '免费节点可用性与安全性核验 SOP', link: '/free/node-verification-sop' },
            { text: '开源自建节点全流程成本与风险', link: '/free/open-source-self-built' },
            { text: '公开节点爬取清洗与自动化系统', link: '/free/public-node-harvesting' },
            { text: '免费服务安全限制与黑客蜜罐识别', link: '/free/security-limits-honeypots' }
          ]
        }
      ],

      '/trial/': [
        {
          text: '🎁 试用避坑全书',
          collapsed: false,
          items: [
            { text: '试用生态知识总谱 (Overview)', link: '/trial/' },
            { text: '注册即送流量试用精选清单', link: '/trial/registration-bonus' },
            { text: '1元低价小额付费体验套餐评测', link: '/trial/one-yuan-trial' },
            { text: '限时全功能白嫖体验机制实测', link: '/trial/time-limited-full-access' },
            { text: '试用套路识别：限速与虚假节点', link: '/trial/trial-throttles-traps' },
            { text: '免实名免手机号高隐私试用渠道', link: '/trial/anonymous-privacy-trials' },
            { text: '试用转正续费防坑策略全书', link: '/trial/post-trial-renewal' },
            { text: '试用节点与正价节点一致性核对', link: '/trial/node-consistency-audit' },
            { text: '试用型机场跑路生命周期全复盘', link: '/trial/trial-provider-churn' }
          ]
        },
        {
          text: '💡 进阶套路识别与量化指标',
          collapsed: false,
          items: [
            { text: '反薅羊毛与风控拦截机制解密', link: '/trial/anti-abuse-fraud-checks' },
            { text: '注册即送免费流量机场核验大系', link: '/trial/instant-credit-on-reg' },
            { text: '一元与角级微付费体验型机场横评', link: '/trial/micro-payment-trials' },
            { text: '免费试用到正价订阅转化避坑法则', link: '/trial/retention-conversion-tricks' },
            { text: '限时免费试用机制与保全全书', link: '/trial/time-limited-trials' },
            { text: '试用节点与正价套餐阴阳线路鉴别', link: '/trial/trial-vs-formal-lines' },
            { text: '试用期网络质量量化压测基准', link: '/trial/validation-metrics-speed' },
            { text: '零成本多平台接力试用安全边界', link: '/trial/zero-cost-stacking' }
          ]
        }
      ],

      '/security/': [
        {
          text: '🔐 代理安全与隐私攻防',
          collapsed: false,
          items: [
            { text: '代理安全信任边界 (Overview)', link: '/security/' },
            { text: '客户端后门与篡改劫持检测', link: '/security/client-trojan-audit' },
            { text: '审计规则与访问日志留存策略', link: '/security/audit-rules-logging' },
            { text: '支付隐私防护与匿名结算通道', link: '/security/payment-privacy-usdt' },
            { text: '中间人攻击与伪造根证书排查', link: '/security/mitm-ca-cert-risks' },
            { text: '节点IP污染与海外账号风控封禁', link: '/security/ip-dirtiness-account-ban' },
            { text: '主流协议底层加密安全性对比', link: '/security/protocol-security-comparison' },
            { text: '个人敏感数据隔离与双层代理链', link: '/security/multi-hop-defense' }
          ]
        },
        {
          text: '🛡️ 深度防护与防溯源架构',
          collapsed: false,
          items: [
            { text: '数据库脱库撞库与防范指南', link: '/security/account-credential-security' },
            { text: '二次打包客户端木马与黑产产业链', link: '/security/client-backdoors-malware' },
            { text: '网络安全法红线与翻墙法律边界', link: '/security/legal-compliance-redlines' },
            { text: '中间人流量篡改与广告劫持反制', link: '/security/mitm-tampering-ad-injection' },
            { text: '虚拟货币与链上洗钱风险防范', link: '/security/payment-risk-crypto' },
            { text: '隐私泄漏路径与指纹追踪全防御', link: '/security/personal-privacy-leakage' },
            { text: '零信任安全架构与代理隔离实操', link: '/security/zero-trust-proxy-boundary' }
          ]
        }
      ],

      '/runaway/': [
        {
          text: '🚨 跑路预警与防暴雷',
          collapsed: false,
          items: [
            { text: '失联与跑路预警总纲 (Overview)', link: '/runaway/' },
            { text: '域名污染 vs 真实跑路精准识别', link: '/runaway/dns-hijack-vs-runaway' },
            { text: '机场跑路前兆十大征兆雷达', link: '/runaway/ten-runaway-warning-signs' },
            { text: '历史知名跑路机场编年史与复盘', link: '/runaway/historic-exit-scams' },
            { text: '频繁换支付与大降价促销陷阱', link: '/runaway/dump-sales-alert' },
            { text: 'TG群全员禁言与客服失联记录', link: '/runaway/support-blackout-tracker' },
            { text: '节点全线飘红与宕机时长监控', link: '/runaway/node-outage-duration' },
            { text: '支付通道退款申诉与追索实战', link: '/runaway/chargeback-dispute-guide' },
            { text: '机场抗风险能力与基础设施评估', link: '/runaway/infrastructure-resilience' }
          ]
        },
        {
          text: '⚖️ 资金追索与自救实战',
          collapsed: false,
          items: [
            { text: '关停清算补偿公告鉴伪指南', link: '/runaway/announcement-compensation' },
            { text: '支付网关暴雷引发的连环跑路', link: '/runaway/domain-payment-failures' },
            { text: '跑路风险量化评分模型与预警指数', link: '/runaway/early-warning-metrics' },
            { text: '跑路断网48小时极速抢险指南', link: '/runaway/emergency-rescue-fallback' },
            { text: '维权证据链固定与第三方投诉 SOP', link: '/runaway/evidence-collection-sop' },
            { text: '跑路品牌公墓与历史暴雷黑名单', link: '/runaway/historical-brand-graveyard' },
            { text: '支付冻结资金截留与退款实操', link: '/runaway/loss-recovery-disputes' },
            { text: '线路衰变与网络失联生命周期追踪', link: '/runaway/outage-monitoring-signals' }
          ]
        }
      ],

      '/refund/': [
        {
          text: '💰 退款维权与争议处理',
          collapsed: false,
          items: [
            { text: '退款条件与权益指南 (Overview)', link: '/refund/' },
            { text: '无理由退款与有条件退款条款', link: '/refund/terms-and-sla-analysis' },
            { text: '特惠套餐「不予退款」霸王条款', link: '/refund/promo-no-refund-pitfalls' },
            { text: '流量使用比例扣除计算数学模型', link: '/refund/usage-proration-model' },
            { text: '手续费扣除与原路退回周期', link: '/refund/gateway-fee-timeline' },
            { text: '支付宝/微信/Stripe 追索全流程', link: '/refund/payment-dispute-flow' },
            { text: '网络故障举证与测速工单提交规范', link: '/refund/evidence-logging-guide' },
            { text: '常见拒绝退款借口与反制维权', link: '/refund/counter-denial-tactics' },
            { text: '业内良心退款保障机场横评', link: '/refund/fair-refund-provider-index' }
          ]
        },
        {
          text: '⚔️ 金融争议与行政裁决',
          collapsed: false,
          items: [
            { text: '客服装聋作哑与工单黑洞维权', link: '/refund/customer-support-blackholes' },
            { text: '支付网关拒付 Chargeback 绝杀秘籍', link: '/refund/dispute-chargeback-tactics' },
            { text: '购买前退款细则审核防坑全书', link: '/refund/pre-purchase-verification' },
            { text: '第三方支付机构监管投诉指南', link: '/refund/regulatory-complaints-framework' },
            { text: '特价套餐退款限制破局指南', link: '/refund/special-package-limits' },
            { text: '退款申诉标准化 SOP 话术全解', link: '/refund/step-by-step-claim-sop' }
          ]
        }
      ],

      '/guide/': [
        {
          text: '📘 购买指南与防坑决策',
          collapsed: false,
          items: [
            { text: '全景选型决策指南 (Overview)', link: '/guide/' },
            { text: '首次购买翻墙机场防坑清单', link: '/guide/first-time-buyer-checklist' },
            { text: '坚决月付：年付诱惑背后的资金黑洞', link: '/guide/why-monthly-beats-annual' },
            { text: '用户画像匹配：办公/刷剧/游戏/学术', link: '/guide/user-persona-matching' },
            { text: '客户端生态配置：Clash vs Sing-box', link: '/guide/clash-vs-sing-box-guide' },
            { text: '虚标倍率与阴阳节点识别技巧', link: '/guide/multiplier-fraud-detection' },
            { text: '主备容灾组合：高可用多机场搭配', link: '/guide/dual-provider-redundancy' },
            { text: '结账安全与第三方代付避坑', link: '/guide/checkout-security-rules' },
            { text: '虚拟信用卡与海外支付合规实操', link: '/guide/virtual-card-payment' }
          ]
        },
        {
          text: '🛠️ 进阶测算与避坑实战',
          collapsed: false,
          items: [
            { text: '网络灾备与应急容灾拓扑全实操', link: '/guide/disaster-recovery-contingency' },
            { text: '超低价月付机场经营崩溃模型剖析', link: '/guide/low-price-trap-dissection' },
            { text: '月付 vs 年付资金风险量化精算模型', link: '/guide/monthly-vs-annual-math' },
            { text: '节点优选与多场景分流规则实战', link: '/guide/node-selection-routing-rules' },
            { text: '支付匿名化与多级隐私保护实操', link: '/guide/payment-security-anonymity' },
            { text: '2026 全平台主流客户端生态图谱', link: '/guide/protocol-client-setup' },
            { text: '科学计算个人真实月度流量需求', link: '/guide/traffic-estimation-calculator' }
          ]
        }
      ],

      '/review/': [
        {
          text: '📊 权威横评与选型指标',
          collapsed: false,
          items: [
            { text: '机场评测体系主入口 (Overview)', link: '/review/' },
            { text: '真实骨干线路鉴别：BGP中继与IEPL', link: '/review/backbone-line-taxonomy' },
            { text: '晚高峰丢包与网络抖动严苛实测', link: '/review/peak-jitter-packet-loss' },
            { text: '晚高峰拥塞耐受度与降速实测', link: '/review/peak-congestion-tolerance' },
            { text: '速度、延迟与稳定性三大核心指标实测', link: '/review/speed-latency-stability' },
            { text: '原生IP解锁与FraudScore风控审计', link: '/review/streaming-unlock-fraudscore' },
            { text: '全球流媒体与AI工具解锁全景矩阵', link: '/review/unlock-capabilities-matrix' },
            { text: '网络底层拓扑架构与机房质量审计', link: '/review/network-topology-audit' },
            { text: '真实套餐价格与性价比精算评估模型', link: '/review/pricing-cost-performance' },
            { text: '每GB流量单价与性价比综合矩阵', link: '/review/cost-per-gb-matrix' },
            { text: '工单响应时效与客服技术能力评级', link: '/review/support-sla-rating' },
            { text: '客服响应时效与售后服务满意度调查', link: '/review/customer-service-sla' },
            { text: '节点倍率陷阱与虚标流量偷跑核算', link: '/review/multiplier-traffic-theft' },
            { text: 'Clash/Sing-box/Surge 全平台分流适配', link: '/review/client-ecosystem-routing' },
            { text: '客户端生态兼容与内核资源占用', link: '/review/client-ecology-support' },
            { text: '30天全天候连通率追踪大盘', link: '/review/thirty-day-uptime-radar' },
            { text: '年度红黑榜与防跑路黑名单', link: '/review/annual-honors-and-blacklist' }
          ]
        },
        {
          text: '🏢 42家主流机场实测档案 (A~Z)',
          collapsed: true,
          items: [
            { text: '光速云 (Guangsu Cloud) 实测', link: '/review/guangsucloud' },
            { text: '飞猫云 (Flycat Cloud) 实测', link: '/review/feimaoyun' },
            { text: '微风网络 (Weifeng Network) 实测', link: '/review/weifeng' },
            { text: '暮光加速 (Muguang) 实测', link: '/review/muguang' },
            { text: '大佬云 (Dalaoyun) 实测', link: '/review/dalaoyun' },
            { text: '白月光 (Baiyueguang) 实测', link: '/review/baiyueguang' },
            { text: 'CyberGuard 赛博守卫 实测', link: '/review/cyberguard' },
            { text: 'EdgeNova 边缘新星 实测', link: '/review/edgenova' },
            { text: '二毛云 (Ermaoyun) 实测', link: '/review/ermaoyun' },
            { text: '肥猫云 (Fatcat) 实测', link: '/review/fatcat' },
            { text: '萤火虫 (Firefly) 实测', link: '/review/firefly' },
            { text: '飞鸟加速 (FlyingBird) 实测', link: '/review/flyingbird' },
            { text: '光年梯 (Guangnianti) 实测', link: '/review/guangnianti' },
            { text: '环球梯 (Huanqiuti) 实测', link: '/review/huanqiuti' },
            { text: '极连云 (Jilianyun) 实测', link: '/review/jilianyun' },
            { text: '可信云 (Kexinyun) 实测', link: '/review/kexinyun' },
            { text: '浪网 (Langwang) 实测', link: '/review/langwang' },
            { text: '灵动云 (Lingdongyun) 实测', link: '/review/lingdongyun' },
            { text: '灵猫网络 (Lingmaonet) 实测', link: '/review/lingmaonet' },
            { text: '榴莲云 (Liulianyun) 实测', link: '/review/liulianyun' },
            { text: '龙猫云 (Longmaoyun) 实测', link: '/review/longmaoyun' },
            { text: '青云梯 (Qingyunti) 实测', link: '/review/qingyunti' },
            { text: '全球云 (Quanqiuyun) 实测', link: '/review/quanqiuyun' },
            { text: '闪电鼠 (Shandianshu) 实测', link: '/review/shandianshu' },
            { text: '山水云 (Shanshuiyun) 实测', link: '/review/shanshuiyun' },
            { text: '闪跃 (Shanyue) 实测', link: '/review/shanyue' },
            { text: '神行加速 (Shenxing) 实测', link: '/review/shenxing' },
            { text: 'SOGO 云 (Sogoyun) 实测', link: '/review/sogoyun' },
            { text: 'sslar 实测档案', link: '/review/sslar' },
            { text: '速界 (Sujie) 实测', link: '/review/sujie' },
            { text: '梯子云 (Tiziyun) 实测', link: '/review/tiziyun' },
            { text: 'TNTCloud 实测', link: '/review/tntcloud' },
            { text: 'U1S1 真实表现实测', link: '/review/u1s1' },
            { text: '唯兔云 (Weituyun) 实测', link: '/review/weituyun' },
            { text: 'WgetCloud 深度体验', link: '/review/wgetcloud' },
            { text: '无忧链接 (Wuyoulianjie) 实测', link: '/review/wuyoulianjie' },
            { text: '星岛梦 (Xingdaomeng) 实测', link: '/review/xingdaomeng' },
            { text: '一翻云 (Yifanyun) 实测', link: '/review/yifanyun' },
            { text: '萤火虫深度测评 (Yinghuochong)', link: '/review/yinghuochong' },
            { text: '隐形人 (Yinxingren) 实测', link: '/review/yinxingren' },
            { text: '云界线 (Yunjiexian) 实测', link: '/review/yunjiexian' },
            { text: '宇宙云 (Yuzhouyun) 实测', link: '/review/yuzhouyun' }
          ]
        }
      ]
    },

    docFooter: {
      prev: '上一篇专题',
      next: '下一篇专题'
    },

    footer: {
      message: '免费指南 (mianfeizhinan.fun) · 倡导真实数据、拒绝虚假试用、严控网络风险 | <a href="/disclosure">推广披露</a> | <a href="/methodology">评测方法论</a>',
      copyright: 'Copyright © 2024-2026 mianfeizhinan.fun. All rights reserved. | <a href="/privacy">隐私政策</a> | <a href="/terms">服务条款</a>'
    },

    outline: {
      level: [2, 3],
      label: '本专题知识索引'
    }
  }
})
