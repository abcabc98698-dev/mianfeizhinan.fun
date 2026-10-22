<template>
  <div class="decision-tree-container">
    <div class="tree-header">
      <div class="tree-title">🧭 智能选型决策树导航</div>
      <div class="tree-subtitle">根据您的核心诉求与风险承受力，3秒定位最佳策略</div>
    </div>

    <div class="step-box">
      <div class="step-label">第一步：选择您的核心使用场景</div>
      <div class="choice-pills">
        <button 
          v-for="item in scenarios" 
          :key="item.id" 
          :class="['pill-btn', { active: currentScenario === item.id }]"
          @click="currentScenario = item.id"
        >
          {{ item.name }}
        </button>
      </div>
    </div>

    <div class="result-box" v-if="selectedData">
      <div class="result-header">
        <span class="match-badge">匹配推荐策略</span>
        <h4>{{ selectedData.title }}</h4>
      </div>
      <p class="result-desc">{{ selectedData.desc }}</p>
      
      <div class="advice-grid">
        <div class="advice-col pro-col">
          <strong>✓ 推荐实施方案：</strong>
          <ul>
            <li v-for="(rec, idx) in selectedData.recommendations" :key="idx">{{ rec }}</li>
          </ul>
        </div>
        <div class="advice-col warn-col">
          <strong>⚠ 避坑与风险禁区：</strong>
          <ul>
            <li v-for="(warn, idx) in selectedData.warnings" :key="idx">{{ warn }}</li>
          </ul>
        </div>
      </div>

      <div class="action-link" v-if="selectedData.link">
        <a :href="selectedData.link" class="jump-btn">查看该场景深度横评与实测专题 →</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const scenarios = [
  { id: 'free', name: '极低频 / 0元白嫖查资料' },
  { id: 'trial', name: '首试避坑 / 想先低成本体验' },
  { id: 'streaming', name: '4K/8K 晚高峰刷流媒体与油管' },
  { id: 'ai-academic', name: 'ChatGPT / Claude / 学术科研' },
  { id: 'cross-border', name: '跨境电商 / 独立站纯净运营' }
]

const currentScenario = ref('free')

const scenarioData: Record<string, {
  title: string
  desc: string
  recommendations: string[]
  warnings: string[]
  link: string
}> = {
  free: {
    title: '公益/抓取节点与自建零元应急策略',
    desc: '面向仅偶尔查阅文献、查维基百科或突发失联应急的用户，严禁用于涉及账号登录与资金支付的敏感业务。',
    recommendations: [
      '优先使用已核验的公益白嫖型机场赠送额度（比无主抓取池更稳定）',
      '搭配 Cloudflare WARP 免费原生节点作为失联时的紧急救生圈',
      '使用开源自建方案（如 Oracle Cloud 终身免费机器部署 Vless-Reality）'
    ],
    warnings: [
      '严禁用公共免费节点登录银行、Google或交易所（存在明文嗅探风险）',
      '不要相信任何声称「永久免费高速不限流」的独立客户端软件（多为广告劫持或木马）',
      '免费节点存活周期一般仅 3~12 小时，随时做好失效准备'
    ],
    link: '/free/'
  },
  trial: {
    title: '1元体验 / 注册赠送额度真实试探策略',
    desc: '面向担心被骗、不敢轻易付款的新手用户，通过极小摩擦验证线路质量与客服履约。',
    recommendations: [
      '优先挑选「注册即送 5G~10G」免实名邮箱验证的服务商',
      '如果付费，单次投入必须控制在 1~3 元（1元试用套餐）',
      '进群观察 Telegram 交流群活跃度与工单回复速度，验证售后真实性'
    ],
    warnings: [
      '注意试用期限速陷阱：部分商家试用节点是假中继或限速 10Mbps，正式节点才放开',
      '坚决不勾选「自动自动续费扣款」协议',
      '试用满意后切勿直接年付，先以第一个「纯月付」周期过渡'
    ],
    link: '/trial/'
  },
  streaming: {
    title: '晚高峰抗丢包 IEPL 内网专线与多地原生解锁',
    desc: '面向重度追剧、Netflix/Disney+ 4K HDR 原生画质与晚高峰零卡顿需求。',
    recommendations: [
      '选择配备广港/沪日/沪美 IEPL 专线的服务商（避开公网跨境大塞车）',
      '节点需具备双 ISP 原生住宅 IP 或高信誉机房原生 IP 轮换解锁',
      '预算控制在每月 15 ~ 35 元，采用按月扣费模式'
    ],
    warnings: [
      '远离宣称「几块钱无限流量年付」的直连/中继小作坊，晚高峰丢包率必然超过 50%',
      '警惕虚标 10 倍率的恶意扣费节点'
    ],
    link: '/recommend/streaming-unlock'
  },
  'ai-academic': {
    title: 'OpenAI / Claude / Gemini 高风控防封纯净方案',
    desc: '面向依赖 AI 生产力与学术检索的用户，核心指标是 IP 欺诈度（FraudScore < 20）与长连接稳定性。',
    recommendations: [
      '选择节点具备独立冷门机房或纯净原生美国家宽落地 IP 的机场',
      '选用支持 Sing-box / Clash 分流的协议（如 Trojan / VLESS-Reality）保持长连接不断流',
      '配备两家不同上游的主备容灾方案，防止单点故障打断学术工作流'
    ],
    warnings: [
      '绝对避免在几万人共用的免费万人骑节点上登录付费 ChatGPT Plus 账号（极易被批量封禁）',
      '避免使用直连 Cloudflare CDN 且频繁漂移 IP 的廉价节点'
    ],
    link: '/security/ip-dirtiness-account-ban'
  },
  'cross-border': {
    title: '独立静态住宅 IP 与商业零日志专线',
    desc: '面向 Amazon、TikTok Shop、PayPal 等对 IP 纯净度和地理位置指纹极度敏感的跨境业务。',
    recommendations: [
      '严格采购专属独享静态住宅 IP（Static Residential Proxy），杜绝共享机场节点',
      '配合指纹防关联浏览器（如 AdsPower、Hubstudio）实现环境隔离',
      '确保签约提供商具备清晰的隐私与零日志合规说明'
    ],
    warnings: [
      '严禁用任何常规共享机场节点打理店铺或收款，会导致关联封号甚至资金冻结'
    ],
    link: '/recommend/ecommerce-static-ip'
  }
}

const selectedData = computed(() => scenarioData[currentScenario.value])
</script>

<style scoped>
.decision-tree-container {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
}

.tree-header {
  margin-bottom: 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;
}

.tree-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

.tree-subtitle {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 2px;
}

.step-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 0.6rem;
}

.choice-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.25rem;
}

.pill-btn {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pill-btn:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}

.pill-btn.active {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
}

.result-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.2rem;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.5rem;
}

.match-badge {
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.result-header h4 {
  font-size: 1.08rem;
  font-weight: 750;
  color: #0f172a;
  margin: 0;
}

.result-desc {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.advice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .advice-grid {
    grid-template-columns: 1fr;
  }
}

.advice-col {
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.6;
}

.advice-col strong {
  display: block;
  margin-bottom: 6px;
  font-size: 0.88rem;
}

.advice-col ul {
  margin: 0;
  padding-left: 1.2rem;
}

.advice-col li {
  margin-bottom: 4px;
}

.pro-col {
  background: #ffffff;
  border: 1px solid #d1fae5;
  color: #065f46;
}

.warn-col {
  background: #ffffff;
  border: 1px solid #fee2e2;
  color: #991b1b;
}

.action-link {
  text-align: right;
  margin-top: 0.5rem;
}

.jump-btn {
  font-size: 0.85rem;
  font-weight: 700;
  color: #2563eb !important;
  text-decoration: none !important;
}

.jump-btn:hover {
  text-decoration: underline !important;
}
</style>
