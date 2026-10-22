<template>
  <div class="hive-topology-card">
    <div class="topology-header">
      <div class="header-badge">
        <span class="pulsing-dot"></span>
        <span>蜂巢拓扑网络</span>
      </div>
      <h3 class="topology-title">免费指南 · 八大核心专题全息流转网络</h3>
      <p class="topology-desc">基于「零信任安全边界」与「防跑路风控漏斗」的专题矩阵，点击任意卡片即可穿透直达深度知识图谱</p>
    </div>

    <!-- 顶部总枢纽 -->
    <div class="hub-center">
      <div class="hub-pill">
        <div class="hub-icon">🧭</div>
        <div class="hub-text">
          <span class="hub-label">全站总中枢</span>
          <span class="hub-name">免费指南 综合知识图谱与选型大系</span>
        </div>
      </div>
      <div class="hub-connector-down"></div>
    </div>

    <!-- 第一层：防风险与源头核验流（3个核心前置专题） -->
    <div class="topology-layer layer-warning">
      <div class="layer-tag">前置防坑与核验区</div>
      <div class="nodes-grid grid-3">
        
        <a href="/free/" class="topo-node node-free">
          <div class="node-badge-free">0元白嫖核验</div>
          <div class="node-title">🛡️ 免费机场 (free)</div>
          <ul class="node-points">
            <li>• 节点可用率实测不足 15%</li>
            <li>• 蜜罐嗅探与中间人风险排查</li>
            <li>• 每日全网抓取池衰减规律</li>
          </ul>
          <div class="node-jump">进入专题全景 →</div>
        </a>

        <a href="/trial/" class="topo-node node-trial">
          <div class="node-badge-trial">极小成本验证</div>
          <div class="node-title">🎁 试用与体验 (trial)</div>
          <ul class="node-points">
            <li>• 注册即送 5G~10G 真实清单</li>
            <li>• 1元体验套餐晚高峰压测法</li>
            <li>• 阴阳节点调包计识别秘籍</li>
          </ul>
          <div class="node-jump">进入专题全景 →</div>
        </a>

        <a href="/runaway/" class="topo-node node-runaway">
          <div class="node-badge-runaway">资金安全雷达</div>
          <div class="node-title">🚨 跑路监控 (runaway)</div>
          <ul class="node-points">
            <li>• 域名污染 vs 真实跑路辨析</li>
            <li>• 十大跑路前兆清仓预警雷达</li>
            <li>• 支付宝/Stripe 48h 维权申诉</li>
          </ul>
          <div class="node-jump">进入专题全景 →</div>
        </a>

      </div>
    </div>

    <!-- 中间流转连接箭头 -->
    <div class="flow-divider">
      <div class="flow-line"></div>
      <div class="flow-badge">下沉进阶：底层协议与消费权益保障</div>
      <div class="flow-line"></div>
    </div>

    <!-- 第二层：协议技术与维权支撑（2个底层支柱） -->
    <div class="topology-layer layer-tech">
      <div class="nodes-grid grid-2">

        <a href="/security/" class="topo-node node-security">
          <div class="node-badge-security">零信任边界</div>
          <div class="node-title">🔐 机场安全 (security)</div>
          <ul class="node-points">
            <li>• 代理网络元数据暴露边界模型</li>
            <li>• 客户端后门与 SHA256 哈希校验</li>
            <li>• VLESS-Reality vs Hysteria2 协议</li>
          </ul>
          <div class="node-jump">进入专题全景 →</div>
        </a>

        <a href="/refund/" class="topo-node node-refund">
          <div class="node-badge-refund">权益仲裁保障</div>
          <div class="node-title">💰 退款政策 (refund)</div>
          <ul class="node-points">
            <li>• TOS 霸王条款与不可抗力拆解</li>
            <li>• 流量比例扣除数学模型公式</li>
            <li>• MTR 网络故障举证与客服交涉</li>
          </ul>
          <div class="node-jump">进入专题全景 →</div>
        </a>

      </div>
    </div>

    <!-- 中间流转连接箭头 -->
    <div class="flow-divider">
      <div class="flow-line"></div>
      <div class="flow-badge">终局落地：抗风险商业选型与主备容灾</div>
      <div class="flow-line"></div>
    </div>

    <!-- 第三层：推荐评测与选型闭环（3个终局落地专题） -->
    <div class="topology-layer layer-recommend">
      <div class="nodes-grid grid-3">

        <a href="/recommend/" class="topo-node node-recommend">
          <div class="node-badge-recommend">理性消费首选</div>
          <div class="node-title">⚡ 机场推荐 (recommend)</div>
          <ul class="node-points">
            <li>• 5~10元低门槛纯月付梯队</li>
            <li>• 晚高峰抗挤压 IEPL/IPLC 专线</li>
            <li>• 双 ISP 原生解锁与按量应急</li>
          </ul>
          <div class="node-jump">进入专题全景 →</div>
        </a>

        <a href="/review/" class="topo-node node-review">
          <div class="node-badge-review">硬核数据说话</div>
          <div class="node-title">📊 机场评测 (review)</div>
          <ul class="node-points">
            <li>• 晚高峰 21:00 丢包率真实压测</li>
            <li>• Scamalytics 欺诈分与原生解锁</li>
            <li>• 30+ 维度硬核参数横评大盘</li>
          </ul>
          <div class="node-jump">进入专题全景 →</div>
        </a>

        <a href="/guide/" class="topo-node node-guide">
          <div class="node-badge-guide">决策终极闭环</div>
          <div class="node-title">📘 购买指南 (guide)</div>
          <ul class="node-points">
            <li>• 首次购买 10 项严苛背调清单</li>
            <li>• 坚决纯月付三大铁律</li>
            <li>• 1主力 + 1备用高可用容灾配置</li>
          </ul>
          <div class="node-jump">进入专题全景 →</div>
        </a>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// 纯前端交互组件，支持一键点击与自适应流转
</script>

<style scoped>
.hive-topology-card {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 1.75rem;
  margin: 2rem 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.topology-header {
  text-align: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 1rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid #bfdbfe;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.pulsing-dot {
  width: 6px;
  height: 6px;
  background: #2563eb;
  border-radius: 50%;
  animation: pulse 1.8s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.9; }
  50% { transform: scale(1.4); opacity: 0.4; }
  100% { transform: scale(0.95); opacity: 0.9; }
}

.topology-title {
  font-size: 1.35rem;
  font-weight: 850;
  color: #0f172a;
  margin: 0 0 0.3rem 0;
  letter-spacing: -0.015em;
}

.topology-desc {
  font-size: 0.88rem;
  color: #64748b;
  margin: 0;
}

/* 总中枢样式 */
.hub-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.25rem;
}

.hub-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: #ffffff;
  padding: 10px 24px;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.hub-icon {
  font-size: 1.4rem;
}

.hub-text {
  display: flex;
  flex-direction: column;
}

.hub-label {
  font-size: 0.7rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hub-name {
  font-size: 0.96rem;
  font-weight: 750;
  letter-spacing: -0.01em;
}

.hub-connector-down {
  width: 2px;
  height: 18px;
  background: #cbd5e1;
  margin-top: 4px;
}

/* 分隔线与流动指示 */
.flow-divider {
  display: flex;
  align-items: center;
  margin: 1.25rem 0;
}

.flow-line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.flow-badge {
  font-size: 0.74rem;
  color: #64748b;
  font-weight: 650;
  padding: 3px 12px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

/* 节点栅格系统 */
.topology-layer {
  position: relative;
}

.layer-tag {
  font-size: 0.72rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.nodes-grid {
  display: grid;
  gap: 12px;
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

@media (max-width: 768px) {
  .grid-3, .grid-2 {
    grid-template-columns: 1fr;
  }
}

/* 节点卡片样式 */
.topo-node {
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.1rem;
  text-decoration: none !important;
  color: inherit !important;
  transition: all 0.22s ease-in-out;
  position: relative;
}

.topo-node:hover {
  transform: translateY(-3px);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

/* 各专题高亮微调 */
.node-free:hover { border-color: #f59e0b; }
.node-trial:hover { border-color: #3b82f6; }
.node-runaway:hover { border-color: #ef4444; }
.node-security:hover { border-color: #10b981; }
.node-refund:hover { border-color: #8b5cf6; }
.node-recommend:hover { border-color: #2563eb; }
.node-review:hover { border-color: #06b6d4; }
.node-guide:hover { border-color: #475569; }

[class^="node-badge-"] {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  width: fit-content;
}

.node-badge-free { background: #fef3c7; color: #b45309; }
.node-badge-trial { background: #dbeafe; color: #1e40af; }
.node-badge-runaway { background: #fee2e2; color: #b91c1c; }
.node-badge-security { background: #d1fae5; color: #065f46; }
.node-badge-refund { background: #ede9fe; color: #6d28d9; }
.node-badge-recommend { background: #eff6ff; color: #1d4ed8; }
.node-badge-review { background: #cffafe; color: #0e7490; }
.node-badge-guide { background: #f1f5f9; color: #334155; }

.node-title {
  font-size: 1.02rem;
  font-weight: 750;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.node-points {
  margin: 0 0 0.8rem 0;
  padding: 0;
  list-style: none;
  font-size: 0.82rem;
  color: #64748b;
  line-height: 1.6;
}

.node-jump {
  margin-top: auto;
  font-size: 0.8rem;
  font-weight: 700;
  color: #2563eb;
  display: flex;
  align-items: center;
  gap: 4px;
}

.topo-node:hover .node-jump {
  text-decoration: underline;
}
</style>
