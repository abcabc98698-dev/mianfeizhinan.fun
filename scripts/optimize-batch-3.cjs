const fs = require('fs');

function runBatch3() {
  // 1. runaway/domain-payment-failures.md
  {
    let c = fs.readFileSync('runaway/domain-payment-failures.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*用户支付 15 元 ──► 第三方高风险收单平台[\s\S]*?机房强制断电关机\s*```/;
    const r = `| 资金流转阶段 | 节点动作与资金状态 | 触发风控与连锁反应 | 最终系统演变后果 |
| :--- | :--- | :--- | :--- |
| **1. 用户支付与沉淀** | 用户购买月付/季付套餐 (支付 15~60 元) | 款项进入第三方聚合收单平台受控资金池，执行 T+7 或 T+15 天结算账期 | 站长尚未实际收到资金，资金处于平台在途沉淀状态 |
| **2. 消费者批量投诉** | 某周内因节点偶发卡顿或失联，3~5 名用户向微信/支付宝发起交易欺诈争议投诉 | 微信/支付宝风控网关向收单机构下发违规警示，标记商户号异常 | 聚合收单平台风控系统触发**二级紧急熔断** |
| **3. 结算账户强制冻结** | 聚合收单平台扣留商户账户内全部待结算资金（常达数万至数十万元），并处以高额风控质押金 | 站长提现请求被全线驳回，后台资金池瞬间清零断流 | 站长流动现金流彻底枯竭，无力支付机房即期刚性账单 |
| **4. 机房拔线与跑路** | 无法向电信/联通及 IDC 机房续交上万元专线月租费 | 宽带运营商到达缴费宽限期后直接掐断物理机架电源与光纤接口 | **全节点瞬间飘红断线**，站长无力回天，被迫清空 TG 群弃站跑路 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('runaway/domain-payment-failures.md replaced');
    } else {
      console.log('runaway/domain-payment-failures.md match failed');
    }
    fs.writeFileSync('runaway/domain-payment-failures.md', c, 'utf8');
    console.log(`runaway/domain-payment-failures.md: ${initLen} -> ${c.length}`);
  }

  // 2. runaway/early-warning-metrics.md
  {
    let c = fs.readFileSync('runaway/early-warning-metrics.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*P < 0\.25 \[绿色安全区间\][\s\S]*?做好 48 小时争议维权准备\s*```/;
    const r = `| 风险评级区间 | 预警指数 (P) | 典型网络与运营表征 | 消费者处置与资金风控准则 |
| :--- | :--- | :--- | :--- |
| **绿色安全区间** | **P < 0.25** | 财务与运营极其稳健，晚高峰专线带宽裕量充足，客服工单 15 分钟内响应，节点动态扩容及时 | **放心使用**：可放心按月持续续费，建议保持单月订购习惯 |
| **黄色警示区间** | **0.25 ≤ P < 0.60** | 晚高峰偶尔出现轻微拥塞降速，工单响应延长至数小时，官方群开始限制新用户发言频率 | **转入观望**：暂停任何季付或半年付充值，启动备用节点探活测试 |
| **橙色高危区间** | **0.60 ≤ P < 0.75** | 突发推出“三年付 2 折/永久买断”骨折大促销，多条核心物理专线悄悄降级为公网中继 | **高度戒备**：坚决不再投入 1 分钱，立即清理个人绑定的订阅与支付授权 |
| **红色绝杀区间** | **P ≥ 0.75** | 跑路概率高达 90% 以上，官网高频 502，官方 Telegram 开启全员禁言，客服工单超时 48h 停摆 | **立即止损**：立即导出支付账单截图，在 48 小时黄金窗口向支付平台发起欺诈退款申诉 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('runaway/early-warning-metrics.md replaced');
    } else {
      console.log('runaway/early-warning-metrics.md match failed');
    }
    fs.writeFileSync('runaway/early-warning-metrics.md', c, 'utf8');
    console.log(`runaway/early-warning-metrics.md: ${initLen} -> ${c.length}`);
  }

  // 3. runaway/evidence-collection-sop.md
  {
    let c = fs.readFileSync('runaway/evidence-collection-sop.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*┌────────────────────────────────────────────────────────┐\s*│\s*完整维权电子证据链架构[\s\S]*?Telegram 被拉黑或禁言截图\s*```/;
    const r = `| 证据维度 | 核心固化材料清单 | 截取规范与不可篡改要点 | 申诉审核核心证明力 |
| :--- | :--- | :--- | :--- |
| **第一维：主体与凭证** | 微信支付/支付宝交易账单详情、商户单号、商户全称、精确扣款时间戳 | 截取完整手机账单长图，包含“电子回单”或“交易流水号”，严禁涂抹关键编号 | 证明消费者与涉案商户之间存在直接的合法消费交易事实 |
| **第二维：契约与承诺** | 机场后台「我的服务」套餐购买详情截图、生效起始时间、未消耗流量配额、官方服务协议 (ToS) | 包含个人 UID、购买的套餐等级、剩余天数与明确的 SLA 承诺描述 | 证明服务尚未到期，商家具备不可推卸的法定履约合同义务 |
| **第三维：客观违约事实** | 客户端全节点不可用报错截图、MTR/Ping 100% 丢包诊断日志、官网 HTTP 502/域名 DNS 解析失败截图 | 记录本地系统时间戳与权威测速网关报错，证明故障非本地宽带问题 | 证明商家已单方面停止提供约定服务，构成根本性违约与欺诈事实 |
| **第四维：沟通失联记录** | 提交售后工单超过 24~48 小时无任何技术人员回复截图、官方 Telegram 交流群全员禁言/拉黑证据 | 截存工单提交时间戳长图，证明消费者已穷尽一切正当合理的沟通协商途径 | 证明商家已主观恶意失联、拒绝履行售后服务，触发支付平台强制裁决机制 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('runaway/evidence-collection-sop.md replaced');
    } else {
      console.log('runaway/evidence-collection-sop.md match failed');
    }
    fs.writeFileSync('runaway/evidence-collection-sop.md', c, 'utf8');
    console.log(`runaway/evidence-collection-sop.md: ${initLen} -> ${c.length}`);
  }

  // 4. runaway/loss-recovery-disputes.md
  {
    let c = fs.readFileSync('runaway/loss-recovery-disputes.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*用户支付 30 元 ──► 聚合支付平台受控资金池[\s\S]*?直接从待结算款项中对投诉用户原路退款！\s*```/;
    const r = `| 交易结算模式 | 聚合支付风控与冻结机制 | 站长提现结算状态 | 消费者资金挽回路径 |
| :--- | :--- | :--- | :--- |
| **常规无争议结算** | 聚合收单平台设定 T+7 至 T+15 结算账期，作为日常退换货的消费者保障备用池 | 结算周期届满且无异常投诉时，平台自动扣除手续费后将资金结算划拨给站长 | 若消费者未在账期内发起投诉，资金被站长提现后将极难跨境追索 |
| **触发批量风控拦截** | 当多名用户在跑路发生后 48 小时内发起欺诈申诉，系统触发**商户资金质押池紧急冻结** | 站长提现通道被立即关停，待提现资金全量转入高危风险监管专户 | 平台直接依据履约瑕疵判定买家胜诉，**从冻结池中全额原路退还至用户账户** |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('runaway/loss-recovery-disputes.md replaced');
    } else {
      console.log('runaway/loss-recovery-disputes.md match failed');
    }
    fs.writeFileSync('runaway/loss-recovery-disputes.md', c, 'utf8');
    console.log(`runaway/loss-recovery-disputes.md: ${initLen} -> ${c.length}`);
  }

  // 5. runaway/outage-monitoring-signals.md
  {
    let c = fs.readFileSync('runaway/outage-monitoring-signals.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*\[第 1~3 天: 技术征兆\][\s\S]*?服务器断电彻底失联\s*```/;
    const r = `| 衰变演进阶段 | 异常技术指标与运营表象 | 商家后台真实困境 | 消费者黄金自救对策 |
| :--- | :--- | :--- | :--- |
| **第 1~3 天：技术微降级** | 原本丝滑的物理专线被悄悄降级为劣质公网中继，晚高峰延迟从 35ms 翻倍至 120ms，4K 出现频繁卡顿 | 商家资金链紧张，拖欠上游专线机房账单，被迫缩减昂贵专线带宽 | 提高警惕，停止任何续费与充值动作，开启备用节点备战 |
| **第 4~6 天：运营挤兑期** | 大量用户提交卡顿工单，客服不堪重负，工单响应时间从 10 分钟突破 24 小时，且多为套话敷衍回复 | 舆情开始发酵，现金流加速枯竭，站长无心继续维护技术系统 | 备份个人配置与账单凭据，做好交易争议维权准备 |
| **第 7~9 天：社交封口期** | 官方 Telegram 交流群频繁删帖，管理员开启「全员禁言」或开启极限制的 1 小时慢速发言模式 | 站长已基本放弃经营，开始实施舆论封锁，防止恐慌蔓延影响最后收割 | 立即截图存证，确认跑路进入实质阶段，准备发起支付投诉 |
| **第 10~12 天：疯狂收割期** | 官网首页疯狂弹窗宣传“机房特惠扩容，三年付 68 元再送永久 VIP”，以不可思议的超低价圈存最后资金 | 典型的跑路前“关门宰客”庞氏手法，尽可能在拔线前多捞一笔预付款 | 坚决不贪便宜，向身边圈友发出跑路预警，切勿上当 |
| **第 14 天：彻底拔线消失** | 官网域名遭遇 ICANN/注册商 ClientHold 解析暂停，TG 群解散注销，机房交换机断电，全节点彻底失联 | 物理设备拔线清退，站长携款潜逃，服务彻底终结 | 立即在 48 小时时效内向微信/支付宝/Stripe 发起欺诈原路追偿 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('runaway/outage-monitoring-signals.md replaced');
    } else {
      console.log('runaway/outage-monitoring-signals.md match failed');
    }
    fs.writeFileSync('runaway/outage-monitoring-signals.md', c, 'utf8');
    console.log(`runaway/outage-monitoring-signals.md: ${initLen} -> ${c.length}`);
  }

  // 6. security/account-credential-security.md
  {
    let c = fs.readFileSync('security/account-credential-security.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*\[渗透攻击\] 利用 V2Board[\s\S]*?Telegram 机器人上批量转售\s*```/;
    const r = `| 黑色产业链环节 | 黑客攻击手段与技术链路 | 数据流向与资产侵害 | 防御加固与反制指南 |
| :--- | :--- | :--- | :--- |
| **1. 漏洞渗透脱库** | 利用劣质机场采用的未修复开源面板（V2Board / SSPanel 历史 0-day / SQL 注入漏洞）攻破后台数据库 | 导出全量用户数据表（包含注册邮箱、散列密码、订阅 Token 与支付记录） | 坚决不选采用陈旧开源面板且无独立运维团队的野鸡机场 |
| **2. 暗网碰撞清洗** | 提取邮箱与散列密码，利用 GPU 彩虹表碰撞解密弱密码，投入黑客暗网撞库数据库 | 形成高价值「用户名-高频密码」社工库资产包，挂载自动化机器人 | 注册机场时**坚决使用独立随机密码**，杜绝与其他常用账号共用密码 |
| **3. 跨平台资产收割** | 批量自动化脚本向 Steam、币安 (Binance)、PayPal、网易邮箱、Apple ID 等核心平台发起撞库攻击 | 盗取受害者数字货币、游戏饰品、个人隐私邮件与网银权限 | 核心平台必须开启基于硬件密钥或 Authenticator 的 **双重动态验证 (2FA)** |
| **4. 订阅转卖与黑产滥用** | 提取尚未到期的高等级机场订阅链接 (Token)，打包批量挂在 Telegram 自动化发卡机器人低价倒卖 | 订阅被数十名黑客黑产共享下载，节点流量秒级被刷爆，触发多端风控封号 | 发现流量异常暴增时，立即在机场后台点击「重置订阅链接 (Reset Token)」 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('security/account-credential-security.md replaced');
    } else {
      console.log('security/account-credential-security.md match failed');
    }
    fs.writeFileSync('security/account-credential-security.md', c, 'utf8');
    console.log(`security/account-credential-security.md: ${initLen} -> ${c.length}`);
  }

  // 7. security/multi-hop-defense.md
  {
    let c = fs.readFileSync('security/multi-hop-defense.md', 'utf8');
    const initLen = c.length;
    const t = /```\s*\[你的本地电脑\][\s\S]*?\[目标网站 Google \/ 银行\]\s*```/;
    const r = `| 节点与跳数 | 承担网络功能 | 该节点可见的数据边界 (能知道什么) | 密码学隐私盲区 (绝对无法知道什么) | 核心防御价值 |
| :--- | :--- | :--- | :--- | :--- |
| **本地工作站** | 流量发起端 (Clash / Sing-box) | 发送给目标服务的真实数据与两层加密封装 | 全链路透明（完全掌握端到端数据） | 在本地完成内层与外层双重加密封装，建立严密安全隧道 |
| **第一跳：商业专线机场** | 国内 BGP 入口 ➔ 物理 IEPL 专线出境 (仅作为**高速物理中继**) | • 用户本地真实宽带公网 IP<br>• 外层数据包体积与发包频率<br>• 数据包出境目标：**自建 VPS 的 IP 地址** | • **绝对不知道用户最终访问的具体网址**（访问的是 Google 还是银行完全不可见）<br>• **绝对无法解密内层真实业务数据** | 享受大厂专线的超低延迟与 4K 高带宽，同时物理隔断机场后台对访问内容的窥探 |
| **第二跳：个人自建 VPS** | 海外独占 VPS 节点 (充当**真实出口与端到端解密终点**) | • 来源 IP：商业专线机房的出口 IP<br>• 最终访问目标：Google、AWS、银行等 | • **绝对不知道使用者的真实境内宽带 IP**（其日志中只有专线机房的 IP） | 彻底斩断境外服务商对真实物理宽带的关联，保障出口 IP 绝对独占纯净 |
| **目标海外服务** | Google / OpenAI / 跨国金融银行 | 仅记录自建 VPS 的单一纯净固定 IP | 完全无法获知境内访问者的物理身份与网络链路 | 零风控警告、零频繁验证码拦截、终身杜绝封号威胁 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('security/multi-hop-defense.md replaced');
    } else {
      console.log('security/multi-hop-defense.md match failed');
    }
    fs.writeFileSync('security/multi-hop-defense.md', c, 'utf8');
    console.log(`security/multi-hop-defense.md: ${initLen} -> ${c.length}`);
  }

  // 8. trial/anti-abuse-fraud-checks.md
  {
    let c = fs.readFileSync('trial/anti-abuse-fraud-checks.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*\[请求发起\] ──► 1\. 注册来源 IP 审计[\s\S]*?已被系统拦截」\s*```/;
    const r = `| 风控核验层级 | 审计技术手段与检测源 | 羊毛党/作弊判定标准 | 正常用户通过标准 |
| :--- | :--- | :--- | :--- |
| **1. 来源 IP 威胁情报** | IPQualityScore / MaxMind 实时 API 查询 | 属于 Hosting 机房 IP、公网代理池或近期有垃圾邮件记录 (FraudScore > 70) ➔ 判定高危 | 本地家庭宽带原生 Residential IP (FraudScore < 20) ➔ 直接放行 |
| **2. 浏览器硬件指纹比对** | Canvas / WebGL / AudioContext 硬件哈希提取 | 缺少 GPU 硬件加速特征、指纹哈希与自动化 Selenium/Puppeteer 引擎特征重合 ➔ 判定为脚本套利 | 真实物理显卡驱动渲染，浏览器环境参数与操作系统正常匹配 ➔ 放行 |
| **3. 邮箱域名有效性核验** | DNS MX 记录查询与垃圾临时邮箱黑名单库比对 | 使用 10-Minute Mail、TempMail 等免密一次性临时邮箱后缀 ➔ 立即拦截 | 使用 Gmail、Outlook、QQ、163 等正规公共邮箱服务 ➔ 放行 |
| **4. 交互行为生物动力学** | 鼠标移动轨迹曲率、键盘击键间隔与停留时间熵值分析 | 瞬间完成表单填写、鼠标直线平移或零移动直接触发提交 ➔ 判定为自动化机器人 | 具备人类自然的鼠标曲线晃动、击键停顿与页面滚动行为 ➔ 放行 |
| **5. WebRTC 真实拓扑嗅探** | 浏览器 WebRTC 本地网卡 IP 穿透嗅探 | 检测到多开指纹浏览器虚拟内网网段冲突或代理穿透暴露 ➔ 立即拦截 | 正常单一网络环境，局域网地址与系统状态吻合 ➔ 放行 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('trial/anti-abuse-fraud-checks.md replaced');
    } else {
      console.log('trial/anti-abuse-fraud-checks.md match failed');
    }
    fs.writeFileSync('trial/anti-abuse-fraud-checks.md', c, 'utf8');
    console.log(`trial/anti-abuse-fraud-checks.md: ${initLen} -> ${c.length}`);
  }

  // 9. trial/instant-credit-on-reg.md
  {
    let c = fs.readFileSync('trial/instant-credit-on-reg.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*\[实测样本\]: 50 家公开声称注册赠送流量的机场[\s\S]*?诱导充值\s*```/;
    const r = `| 试用机场类型 | 样本数量 (占比) | 真实连通表现与限制套路 | 商家底层目的分析 | 消费者避坑与应对建议 |
| :--- | :--- | :--- | :--- | :--- |
| **良心真实拓客型** | **6 家 (12.0%)** | 真实可连通且不限速，赠送 1~5GB 专线体验流量，无需绑定手机号或信用卡 | 商家对自身物理专线稳定性高度自信，通过真实体验转化长期付费用户 | **强烈推荐**：体验晚高峰 4K 播放与丢包率，满意后按月订购 |
| **虚假宣传僵尸站** | **19 家 (38.0%)** | 注册后账户显示有流量，但节点列表全红超时 (Timeout)，无论怎么刷新都无法握手 | 站长早已弃坑或节点已被墙，依靠 SEO 关键词吸引点击赚取广告点击率 | **立即放弃**：直接关闭页面并清理本地浏览器 Cookie |
| **隐私信息收集盘** | **14 家 (28.0%)** | 标榜免费试用，但强制要求输入国内手机号接收验证码、绑定国际信用卡或进群人工审核 | 收集真实个人手机号、身份信息与支付凭据用于黑产数据倒卖或精准电诈 | <RiskBadge type="danger">极高危套路</RiskBadge><br>坚决不要输入任何真实手机号与支付信息 |
| **极速限制诱导盘** | **11 家 (22.0%)** | 虽然能连通，但单连接限速 **< 1Mbps**，连文字网页都打不开，页面频繁弹充值提速弹窗 | 故意制造极度卡顿的人工恶劣体验，诱导小白用户冲动充值付费套餐 | **切勿冲动**：试用就限速的作坊，付费后晚高峰同样断流卡死 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('trial/instant-credit-on-reg.md replaced');
    } else {
      console.log('trial/instant-credit-on-reg.md match failed');
    }
    fs.writeFileSync('trial/instant-credit-on-reg.md', c, 'utf8');
    console.log(`trial/instant-credit-on-reg.md: ${initLen} -> ${c.length}`);
  }

  // 10. trial/retention-conversion-tricks.md
  {
    let c = fs.readFileSync('trial/retention-conversion-tricks.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*\[试用期结束：是否转正？\][\s\S]*?必定是资金盘】\s*```/;
    const r = `| 试用评估结果 | 转正价格体系核验 | 商家套路识别 | 最终决策与行动准则 |
| :--- | :--- | :--- | :--- |
| **体验极差 / 晚高峰卡顿** | 无论价格多么低廉 | 虚标带宽、严重超卖的小作坊，缺乏稳定线路支撑 | **立即放弃并卸载订阅**：彻底清理客户端配置，不浪费 1 分钱 |
| **体验满意 / 晚高峰丝滑** | **支持纯月付且无额外溢价** (月付 15~35 元) | 真正优质且健康的专线机场运营模式，对服务留存率有充分底气 | **果断订购 1 个月纯月付**：保持月付习惯，既享受高品质又防范跑路风险 |
| **体验满意 / 晚高峰丝滑** | **强制半年付/年付** (月付标价畸高或直接灰显不可选) | 典型的“试用引流、年付套现”资金盘模式，随时准备跑路割韭菜 | **坚决放弃！** 宁可重新挑选其他支持月付的优质专线机场 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('trial/retention-conversion-tricks.md replaced');
    } else {
      console.log('trial/retention-conversion-tricks.md match failed');
    }
    fs.writeFileSync('trial/retention-conversion-tricks.md', c, 'utf8');
    console.log(`trial/retention-conversion-tricks.md: ${initLen} -> ${c.length}`);
  }

  // 11. trial/time-limited-trials.md
  {
    let c = fs.readFileSync('trial/time-limited-trials.md', 'utf8');
    const initLen = c.length;
    const t = /```text\s*用户点击「免费试用 7 天」[\s\S]*?概不退费\"\s*```/;
    const r = `| 免费试用陷阱阶段 | 商家诱导与扣费手法 | 消费者心理盲区 | 防范措施与反制指南 |
| :--- | :--- | :--- | :--- |
| **1. 授权绑定绑卡** | 页面宣称“7 天免费试用，随时取消”，但必须输入信用卡卡号、有效期、CVV 码或完成 PayPal 周期扣款授权 | 用户以为试用期内绝对安全，往往未仔细阅读小字服务条款 (ToS) | 坚决不在无信誉背书的翻墙网站绑定主信用卡，建议使用单次限额虚拟卡 |
| **2. 隐藏取消订阅入口** | 商家故意在后台将「取消订阅 (Cancel Subscription)」按钮隐藏在深层二级菜单或灰色不可见区域，或要求发送邮件人工审核 | 用户在日常忙碌中遗忘取消，或者找不到取消入口导致拖延 | 绑定后立即在 PayPal 后台或手机银行 App 中**主动关闭该商户的自动续费扣款权限** |
| **3. 到期静默高额扣款** | 第 7 天 23:59，后台自动化系统无预警发起全额自动续费划扣，直接扣除一年甚至三年全款 (**$80 ~ $150 美元**) | 银行扣款短信弹出时，资金已经被跨境清算划拨，造成实质经济损失 | 遭遇扣款后 24 小时内立即致电发卡银行，发起未授权自动扣费争议拒付 (Chargeback) |
| **4. 售后失联拒绝退款** | 用户找客服理论，收到机器人冷冰冰回复：“根据用户服务协议第 4.2 条，自动续费不属于误购，概不退费” | 商家利用管辖权真空实施强买强卖 | 停止与商家争辩，直接向发卡行和国际卡组织提交欺诈举证材料追回款项 |`;

    if (t.test(c)) {
      c = c.replace(t, r);
      console.log('trial/time-limited-trials.md replaced');
    } else {
      console.log('trial/time-limited-trials.md match failed');
    }
    fs.writeFileSync('trial/time-limited-trials.md', c, 'utf8');
    console.log(`trial/time-limited-trials.md: ${initLen} -> ${c.length}`);
  }
}

runBatch3();
