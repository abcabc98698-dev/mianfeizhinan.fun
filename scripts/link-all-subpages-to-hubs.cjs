const fs = require('fs');

const hubConfigs = {
  free: {
    file: 'free/index.md',
    missingPages: [
      {
        link: '/free/emergency-fallback-methods',
        title: '断网极端环境应急抢险救生艇搭建',
        desc: '全网主力机场全军覆没时的终极自救方案，手把手实操 Cloudflare WARP 优选 IP 与极简穿透救生艇',
        target: '遭遇大面积断网急需救命通信的用户',
        badge: '<RiskBadge type="safe" text="高可用应急" /> 独立于商业机场基础设施'
      },
      {
        link: '/free/failure-rate-tracking',
        title: '免费节点失效率与生命周期追踪报告',
        desc: '分布式探针大规模压力测试，全天候量化监控免费节点可用率从 35% 跌至 5.8% 的雪崩规律',
        target: '希望量化了解免费节点真实断流率的用户',
        badge: '<RiskBadge type="danger" text="权威量化" /> 晚高峰可用率断崖雪崩'
      },
      {
        link: '/free/free-vs-paid-cost-model',
        title: '免费与付费翻墙终极成本对比模型',
        desc: '基于时薪、时间充裕度与心理损耗精算四象限投入产出模型，彻底解答白嫖与月付的终极选择',
        target: '在每天花费时间找节点与花十几元月付间犹豫的用户',
        badge: '<RiskBadge type="verified" text="精算模型" /> 认知提升与选型指南'
      },
      {
        link: '/free/long-term-free-sources',
        title: '长期免费节点真实生态与获取全景',
        desc: '穿透全球公开公益代理真实资金与维护成本，掌握学术机构与开源组织长效存活通道',
        target: '寻找学术科研与轻量级备用通道的用户',
        badge: '<RiskBadge type="warning" text="长效公益" /> 挤兑严重，需合理预期'
      },
      {
        link: '/free/node-verification-sop',
        title: '免费节点可用性与安全性核验 SOP',
        desc: '标准化的六步探针核验全流程，建立客户端 TLS 抓包、DNS 泄漏检测与恶意注入查验屏障',
        target: '使用外部订阅源但担心被黑客监听的用户',
        badge: '<RiskBadge type="safe" text="安全规范" /> 彻底过滤恶意高危节点'
      },
      {
        link: '/free/open-source-self-built',
        title: '开源自建翻墙节点全流程成本与风险',
        desc: '海外 VPS 选购、原生 IP 申请、域名伪装、BGP 线路劣势与 IP 被阻断换 IP 的刚性隐性成本核算',
        target: '盲目相信自建最便宜、最稳定的技术极客',
        badge: '<RiskBadge type="warning" text="高技术门槛" /> 综合维护成本常超商业月付'
      },
      {
        link: '/free/public-node-harvesting',
        title: '公开节点爬取清洗与自动化筛选系统',
        desc: '基于 Python asyncio 异步协程池对 GitHub / Telegram 上万节点进行高并发探活与清洗聚合',
        target: '希望自建自动化节点池与本地分流的进阶用户',
        badge: '<RiskBadge type="safe" text="自动化架构" /> 秒级探活淘汰僵尸节点'
      },
      {
        link: '/free/security-limits-honeypots',
        title: '免费服务安全限制与黑客蜜罐识别',
        desc: '揭秘暗网黑客设置免费节点钓鱼、中间人劫持明文账号密码、注入挂马的攻击链条与反制指南',
        target: '盲目连接公开未知免费 Wi-Fi 或代理节点的小白',
        badge: '<RiskBadge type="danger" text="防钓鱼蜜罐" /> 严禁敏感资产通过未知节点'
      }
    ]
  },

  guide: {
    file: 'guide/index.md',
    missingPages: [
      {
        link: '/guide/disaster-recovery-contingency',
        title: '网络灾备与应急容灾拓扑全实操',
        desc: '从 1 主力 + 1 备用按量 + 1 直连救生艇三级容灾架构，打造全天候 99.99% 不失联的高可用网络',
        target: '外贸跨国商务、科研关键生产力用户',
        badge: '<RiskBadge type="safe" text="高可用容灾" /> 杜绝单点瘫痪断网'
      },
      {
        link: '/guide/low-price-trap-dissection',
        title: '超低价月付机场经营崩溃模型剖析',
        desc: '深度拆解 5 元以下超低价机场的入不敷出财务账本、超卖数十倍与必然卷款跑路的收割终局',
        target: '迷恋超低价白菜套餐、经常遇到断流跑路的用户',
        badge: '<RiskBadge type="danger" text="财务避坑" /> 揭秘庞氏资金盘运作'
      },
      {
        link: '/guide/monthly-vs-annual-math',
        title: '月付 vs 年付资金风险量化精算模型',
        desc: '翻墙行业平均 8~14 个月生存期概率精算，证明任何年付折扣均在数学上无法补偿本金损失',
        target: '面对年付2折促销心动冲动消费的用户',
        badge: '<RiskBadge type="verified" text="数学模型" /> 坚决死守纯月付底线'
      },
      {
        link: '/guide/node-selection-routing-rules',
        title: '节点优选与多场景分流规则实战',
        desc: 'Clash / Sing-box 针对流媒体、AI大模型、境内直连与通用外网的高级分流规则编写全解',
        target: '配置混乱经常导致国内网站变卡、海外服务被锁的用户',
        badge: '<RiskBadge type="safe" text="配置实操" /> 智能秒级分流提速'
      },
      {
        link: '/guide/payment-security-anonymity',
        title: '支付匿名化与多级隐私保护实操',
        desc: '微信/支付宝聚合代付通道穿透、虚拟卡一次性支付与去中心化匿名结算全流程防溯源指南',
        target: '高度重视在线支付隐私与身份防关联的用户',
        badge: '<RiskBadge type="safe" text="支付防风控" /> 保护个人金融凭据安全'
      },
      {
        link: '/guide/traffic-estimation-calculator',
        title: '科学计算个人真实月度流量需求',
        desc: '针对 4K 视频码率、网页浏览、代码拉取与大模型对话建立精确流量公式，拒绝盲目买大套餐',
        target: '不清楚自己该买 50G 还是 500G 套餐的新手',
        badge: '<RiskBadge type="verified" text="流量计算器" /> 避免流量过度浪费'
      }
    ]
  },

  recommend: {
    file: 'recommend/index.md',
    missingPages: [
      {
        link: '/recommend/backup-nodes',
        title: '备用节点储备与按量计费选型',
        desc: '永不过期按量计费套餐精选，平时 0 资金损耗，主力异常时 1 秒无缝承接生产力',
        target: '主力机场偶尔抽风急需无感容灾的办公人群',
        badge: '<RiskBadge type="safe" text="高可用备用" /> 不限时按量计费最佳搭档'
      },
      {
        link: '/recommend/cross-border-ecommerce',
        title: '跨境电商多店铺网络隔离架构',
        desc: '亚马逊、Shopee、TikTok 店铺防关联专属网络架构，固定独享住宅 IP 与防漂移策略',
        target: '跨境电商外贸多账号防关联运营团队',
        badge: '<RiskBadge type="verified" text="防封店隔离" /> 严格绑定独立纯净出口'
      },
      {
        link: '/recommend/high-sla-enterprise',
        title: '高SLA企业级外贸与商务专线',
        desc: '多线 BGP 独享万兆物理入口、端到端内网专线与 7×24 小时技术保障的政企高端专线推荐',
        target: '跨国会议、关键金融交易、企业级生产力团队',
        badge: '<RiskBadge type="safe" text="企业级SLA" /> 99.99% 物理专线可用率保障'
      }
    ]
  },

  refund: {
    file: 'refund/index.md',
    missingPages: [
      {
        link: '/refund/customer-support-blackholes',
        title: '客服装聋作哑与工单黑洞维权',
        desc: '针对工单超时超 48 小时不回复、TG 群单向禁言等冷暴力拖延手段的反制举证全套攻防指南',
        target: '遭遇商家客服冷处理、拒绝沟通的受害用户',
        badge: '<RiskBadge type="danger" text="反冷暴力" /> 穿透工单拖延套路'
      },
      {
        link: '/refund/dispute-chargeback-tactics',
        title: '支付网关拒付 Chargeback 绝杀秘籍',
        desc: 'Visa / Mastercard 国际信用卡 4853 争议代码与银行调单机制，利用 $25 罚金倒逼商家极速退款',
        target: '使用国际信用卡支付遭遇欺诈失联的消费者',
        badge: '<RiskBadge type="verified" text="银行拒付" /> 金融级强力资金追偿'
      },
      {
        link: '/refund/pre-purchase-verification',
        title: '购买前退款细则审核防坑全书',
        desc: '五分钟极速通读并识别服务条款（ToS）中的退款免责陷阱，识破“不可退款”霸王条款',
        target: '准备下单但对售后保障心存疑虑的谨慎买家',
        badge: '<RiskBadge type="safe" text="事前防范" /> 防患于未然消除坏账'
      },
      {
        link: '/refund/regulatory-complaints-framework',
        title: '第三方支付机构监管投诉指南',
        desc: '直击国内聚合收单平台 T+7 质押风控底线，向微信商户风控中心与支付宝发单冻结黑产资金池',
        target: '国内移动支付渠道被割韭菜的用户',
        badge: '<RiskBadge type="danger" text="监管穿透" /> 冻结非法收单商户号'
      },
      {
        link: '/refund/special-package-limits',
        title: '特价套餐退款限制破局指南',
        desc: '拆解商家所谓“活动特价款概不退款”霸王条款的法律无效性，依据实际未履约比例强力维权',
        target: '购买特惠促销套餐遭遇全线断网无法退款的用户',
        badge: '<RiskBadge type="warning" text="霸王条款破局" /> 穿透不合规免责声明'
      },
      {
        link: '/refund/step-by-step-claim-sop',
        title: '退款申诉标准化 SOP 话术全解',
        desc: '合规标准申诉模板，规避敏感情感化词汇，紧扣“技术服务未履约欺诈”直接触发人工极速退款',
        target: '不知道如何在支付后台正确填写投诉申诉理由的用户',
        badge: '<RiskBadge type="safe" text="标准SOP" /> 申诉胜诉率提升至 90% 以上'
      }
    ]
  },

  review: {
    file: 'review/index.md',
    missingPages: [
      {
        link: '/review/customer-service-sla',
        title: '客服响应时效与售后服务满意度调查',
        desc: '全网 42 家机场工单响应时间中位数与售后满意度暗访记录，识破“24小时人工客服”虚假宣称',
        target: '重视售后响应、遇到故障需要快速排查的用户',
        badge: '<RiskBadge type="verified" text="暗访调研" /> 工单平均响应时效透视'
      },
      {
        link: '/review/network-topology-audit',
        title: '网络底层拓扑架构与机房质量审计',
        desc: '利用 MTR、BGP Looking Glass 与 ASN 路由穿透技术深度解剖各家机场物理入口与机房真实成色',
        target: '注重线路物理架构、追求极致网络品质的极客',
        badge: '<RiskBadge type="safe" text="拓扑穿透" /> 物理机房与专线质量透析'
      },
      {
        link: '/review/peak-congestion-tolerance',
        title: '晚高峰拥塞耐受度与降速实测',
        desc: '晚间 20:30~22:30 骨干网溢出期间的极限吞吐测试，记录真实专线零波动与劣质作坊雪崩断流对比',
        target: '白天速度快但一到晚上就疯狂转圈卡顿的用户',
        badge: '<RiskBadge type="danger" text="极限制实测" /> 晚高峰真实抗挤压能力'
      },
      {
        link: '/review/speed-latency-stability',
        title: '速度、延迟与稳定性三大核心指标实测',
        desc: '建立标准化的三维量化评测体系，全面横评三大指标的综合方差表现与 4K 秒开率',
        target: '需要科学多维度对比机场核心技术参数的用户',
        badge: '<RiskBadge type="verified" text="三维横评" /> 科学量化综合性能'
      },
      {
        link: '/review/unlock-capabilities-matrix',
        title: '全球流媒体与AI工具解锁全景矩阵',
        desc: '覆盖 Netflix、Disney+、HBO、YouTube Premium 与 ChatGPT、Claude 3.5 的全大区解锁大盘',
        target: '追剧党、外语影音爱好者与 AI 生产力从业者',
        badge: '<RiskBadge type="safe" text="全景矩阵" /> 原生双 ISP 解锁能力大盘'
      }
    ]
  },

  runaway: {
    file: 'runaway/index.md',
    missingPages: [
      {
        link: '/runaway/announcement-compensation',
        title: '关停清算补偿公告鉴伪指南',
        desc: '识破假借“不可抗力、服务器扩容、海缆割接”为幌子的缓兵之计，揭秘跑路商家的公告话术套路',
        target: '官方公告语焉不详、怀疑机场即将失联跑路的用户',
        badge: '<RiskBadge type="warning" text="话术鉴伪" /> 识破缓兵之计争取黄金自救时机'
      },
      {
        link: '/runaway/domain-payment-failures',
        title: '支付网关暴雷引发的连环跑路',
        desc: '聚合收单商户资金池遭监管封控后的资金链断裂推演，解析站长因拖欠 IDC 账单引发的猝死',
        target: '关注机场背后运营资金链与财务健康的深度用户',
        badge: '<RiskBadge type="danger" text="资金链暴雷" /> 揭秘机房强制断电关停真相'
      },
      {
        link: '/runaway/early-warning-metrics',
        title: '跑路风险量化评分模型与预警指数',
        desc: '基于技术降级、工单响应、促销幅度与舆情封锁四大维度构建的跑路风险指数 (P值) 预警系统',
        target: '希望提前感知机场财务恶化、避免资金踩雷的用户',
        badge: '<RiskBadge type="verified" text="风险指数P" /> 四维预警雷达精准布防'
      },
      {
        link: '/runaway/emergency-rescue-fallback',
        title: '跑路断网48小时极速抢险指南',
        desc: '主力机场猝死失联后的应急处置全流程，快速切换备用按量节点、清理残留客户端与本地排毒',
        target: '突发遭遇机场跑路导致断网瘫痪急需恢复工作的用户',
        badge: '<RiskBadge type="safe" text="极速抢险" /> 48小时无损迁移业务'
      },
      {
        link: '/runaway/evidence-collection-sop',
        title: '维权证据链固定与第三方投诉 SOP',
        desc: '主体账单、契约承诺、违约故障与失联记录四维电子证据链的完整取证规范与截图留存要点',
        target: '准备向微信、支付宝或银行发起交易欺诈争议的用户',
        badge: '<RiskBadge type="safe" text="证据固定" /> 打造铁证级维权材料链'
      },
      {
        link: '/runaway/historical-brand-graveyard',
        title: '跑路品牌公墓与历史暴雷黑名单',
        desc: '整理近三年全网倒闭、卷款跑路与换皮重开的知名机场编年史，警惕黑心站长换马甲割韭菜',
        target: '选购前希望避开恶名昭彰“换皮老骗子”的买家',
        badge: '<RiskBadge type="danger" text="历史公墓" /> 严密排查黑心换皮老站长'
      },
      {
        link: '/runaway/loss-recovery-disputes',
        title: '支付冻结资金截留与退款实操',
        desc: '深入聚合收单平台 T+7 至 T+15 结算冻结窗口，在跑路发生 48 小时内发起截留原路追回资金',
        target: '刚充值即遇机场失联、急需挽回经济损失的用户',
        badge: '<RiskBadge type="verified" text="资金截留" /> 抓住黄金48小时原路返还'
      },
      {
        link: '/runaway/outage-monitoring-signals',
        title: '线路衰变与网络失联生命周期追踪',
        desc: '从技术微降级、客服挤兑、社群封口到疯狂收割与彻底拔线的 14 天完整生命周期衰变规律',
        target: '细心观察节点延迟变化、希望在暴雷前撤出资金的用户',
        badge: '<RiskBadge type="warning" text="14天衰变模型" /> 洞悉跑路全演进节点'
      }
    ]
  },

  security: {
    file: 'security/index.md',
    missingPages: [
      {
        link: '/security/account-credential-security',
        title: '数据库脱库撞库与防范指南',
        desc: '劣质面板 0-day 漏洞注入、暗网撞库收割 Steam/币安资产黑产链条揭秘与强密码防御实操',
        target: '习惯全网共用同一套邮箱与登录密码的普通网民',
        badge: '<RiskBadge type="danger" text="撞库防范" /> 杜绝核心数字资产遭黑客洗劫'
      },
      {
        link: '/security/client-backdoors-malware',
        title: '二次打包客户端木马与黑产产业链',
        desc: '搜索引擎竞价黑产篡改 Clash / v2rayN 客户端植入后门、劫持剪贴板 USDT 钱包手法揭露',
        target: '在第三方网盘、破解论坛或搜索引擎广告下载软件的小白',
        badge: '<RiskBadge type="danger" text="木马后门排查" /> 认准官方开源仓库唯一源'
      },
      {
        link: '/security/legal-compliance-redlines',
        title: '网络安全法红线与翻墙法律边界',
        desc: '权威解读《网络安全法》与《计算机信息网络国际联网管理暂行规定》，明确技术研究合规底线',
        target: '关心使用代理工具法律风险、希望恪守合规边界的网民',
        badge: '<RiskBadge type="safe" text="法律合规底线" /> 明确红线坚守合法用途'
      },
      {
        link: '/security/mitm-tampering-ad-injection',
        title: '中间人流量篡改与广告劫持反制',
        desc: '恶意代理对 HTTP 流量注入挖矿脚本与广告代码手法深度逆向，开启 HSTS 与端到端加密实战',
        target: '使用代理时网页频繁弹出低俗广告与弹窗的用户',
        badge: '<RiskBadge type="warning" text="流量防篡改" /> 强制全网 HTTPS-Only 密闭通道'
      },
      {
        link: '/security/payment-risk-crypto',
        title: '虚拟货币与链上洗钱风险防范',
        desc: '揭秘使用 USDT/TRC20 结算可能误入黑灰产黑币地址池、遭遇链上风控标记或交易所冻结的风险',
        target: '打算使用加密货币充值机场套餐的 Web3 极客',
        badge: '<RiskBadge type="warning" text="链上反洗钱" /> 隔离个人主钱包规避黑币污染'
      },
      {
        link: '/security/personal-privacy-leakage',
        title: '隐私泄漏路径与指纹追踪全防御',
        desc: '从 WebRTC 本地真实 IP 穿透、DNS 递归查询泄露到浏览器 Canvas 硬件指纹的一站式防封锁方案',
        target: '追求高度网络匿名与端到端隐私防护的用户',
        badge: '<RiskBadge type="safe" text="全栈防泄漏" /> Fake-IP + DoH 绝杀明文泄密'
      },
      {
        link: '/security/zero-trust-proxy-boundary',
        title: '零信任安全架构与代理隔离实操',
        desc: '运用假定失陷原则，通过虚拟机沙箱（VMware / Docker）物理隔离代理客户端与本地企业网银',
        target: '在同一台电脑上同时处理国内金融业务与海外访问的专业人士',
        badge: '<RiskBadge type="safe" text="零信任沙箱" /> 物理切断内网横向渗透风险'
      }
    ]
  },

  trial: {
    file: 'trial/index.md',
    missingPages: [
      {
        link: '/trial/anti-abuse-fraud-checks',
        title: '反薅羊毛与风控拦截机制解密',
        desc: '机场后台如何利用 IPQualityScore、Canvas 指纹比对与 WebRTC 探测阻断自动化批量注册脚本',
        target: '使用指纹浏览器套利但频繁被拦截报错的技术人员',
        badge: '<RiskBadge type="verified" text="风控穿透机制" /> 深入了解商业级反作弊逻辑'
      },
      {
        link: '/trial/instant-credit-on-reg',
        title: '注册即送免费流量机场核验大系',
        desc: '实测全网 50 家声称免验证试用的机场，真实兑现率仅 12%，揭开虚假僵尸站与引流盘真相',
        target: '试图寻找“不用绑手机就能直接白嫖试用”的用户',
        badge: '<RiskBadge type="warning" text="兑现率实测" /> 过滤 88% 虚假引流欺诈盘'
      },
      {
        link: '/trial/micro-payment-trials',
        title: '一元与角级微付费体验型机场横评',
        desc: '花费 1 元或几毛钱实测优质机场物理专线质量，对比免实名试用与大额套餐的技术一致性',
        target: '不愿透露真实隐私但希望低门槛真实体验专线的买家',
        badge: '<RiskBadge type="safe" text="极低试错成本" /> 1元撬动真实专线体验'
      },
      {
        link: '/trial/retention-conversion-tricks',
        title: '免费试用到正价订阅转化避坑法则',
        desc: '试用满意后的转正审核三原则：月付是否有隐形加价、是否强制绑定年付、是否支持随时退订',
        target: '试用体验良好准备掏钱正式购买的消费者',
        badge: '<RiskBadge type="verified" text="转正决策树" /> 谨防试用甜头后的年付割韭菜'
      },
      {
        link: '/trial/time-limited-trials',
        title: '限时免费试用机制与保全全书',
        desc: '拆解“免费试用 7 天但须绑信用卡”后台到期静默划扣一年全款的扣费陷阱与取消订阅攻略',
        target: '在海外 VPN 或翻墙服务绑定过信用卡的网民',
        badge: '<RiskBadge type="danger" text="防静默扣款" /> 提前解绑自动续费权限'
      },
      {
        link: '/trial/validation-metrics-speed',
        title: '试用期网络质量量化压测基准',
        desc: '掌握 24 小时黄金试用期内必须完成的四大必测指标：晚高峰压测、4K 码率抖动、丢包与解锁',
        target: '拿到试用账号不知道该怎么测试真实性能的用户',
        badge: '<RiskBadge type="safe" text="测试基准" /> 快速判断是否值得长期付费'
      },
      {
        link: '/trial/zero-cost-stacking',
        title: '零成本多平台接力试用安全边界',
        desc: '依靠合规别名邮箱与纯净网络轮流接力多家良心试用机场，探讨零成本上网的法律与技术边界',
        target: '预算极低但急需临时高质量网络通道的学生与学者',
        badge: '<RiskBadge type="safe" text="合规接力" /> 零成本应急选型方案'
      }
    ]
  }
};

let totalAppended = 0;

Object.entries(hubConfigs).forEach(([key, config]) => {
  let content = fs.readFileSync(config.file, 'utf8');
  let appendedForHub = 0;

  // Build markdown table rows
  let rows = '';
  config.missingPages.forEach(p => {
    // Check if link already exists in file
    if (!content.includes(p.link)) {
      rows += `| **[${p.title}](${p.link})** | ${p.desc} | ${p.target} | ${p.badge} |\n`;
      appendedForHub++;
      totalAppended++;
    }
  });

  if (appendedForHub > 0) {
    // Check if there is an existing comparison/directory table
    const tableHeaderMarker = '| **专题研读入口** |';
    if (content.includes(tableHeaderMarker)) {
      // Find the table and append rows
      content = content.replace(/((\|[^\n]+\|\n)+)/, (match) => {
        return match + rows;
      });
      console.log(`Appended ${appendedForHub} subpages to existing table in ${config.file}`);
    } else {
      // Create a new dedicated section
      const newSection = `\n\n### 专题全景深度研读矩阵与技术索引 (Full Topic Index)\n\n| 专题研读入口 | 核心探索要义与技术模型 | 针对的核心痛点人群 | 安全与稳定性风控评级 |\n| :--- | :--- | :--- | :--- |\n${rows}\n`;
      content += newSection;
      console.log(`Created new subpage directory table with ${appendedForHub} links in ${config.file}`);
    }
    fs.writeFileSync(config.file, content, 'utf8');
  } else {
    console.log(`All subpages already linked in ${config.file}`);
  }
});

console.log(`\nFinished linking! Total subpage link items injected: ${totalAppended}`);
