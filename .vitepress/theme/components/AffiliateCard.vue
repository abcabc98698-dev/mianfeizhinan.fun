<template>
  <div class="affiliate-card">
    <div class="card-badge" v-if="badge">{{ badge }}</div>
    
    <div class="card-header">
      <div class="provider-info">
        <h3 class="provider-name">{{ name }}</h3>
        <p class="provider-slogan">{{ slogan }}</p>
      </div>
      <div class="price-box">
        <span class="price-currency">¥</span>
        <span class="price-val">{{ price }}</span>
        <span class="price-unit">/ {{ unit || '月' }}</span>
      </div>
    </div>

    <div class="tags-container" v-if="tags && tags.length">
      <span v-for="tag in tags" :key="tag" class="feature-tag">{{ tag }}</span>
    </div>

    <div class="metrics-grid">
      <div class="metric-item">
        <span class="m-label">线路架构</span>
        <span class="m-val">{{ lineType || 'IEPL / BGP中继' }}</span>
      </div>
      <div class="metric-item">
        <span class="m-label">协议支持</span>
        <span class="m-val">{{ protocols || 'VLESS / Hysteria2' }}</span>
      </div>
      <div class="metric-item">
        <span class="m-label">晚高峰实测</span>
        <span class="m-val highlight">{{ speed || '4K/8K 秒开' }}</span>
      </div>
      <div class="metric-item">
        <span class="m-label">退款与保障</span>
        <span class="m-val">{{ refund || '支持按比例退款' }}</span>
      </div>
    </div>

    <div class="pros-cons" v-if="pros || cons">
      <div class="pros" v-if="pros">
        <strong>✓ 优势：</strong>{{ pros }}
      </div>
      <div class="cons" v-if="cons">
        <strong>✕ 注意：</strong>{{ cons }}
      </div>
    </div>

    <div class="card-footer">
      <div class="coupon-box" v-if="coupon">
        优惠码：<code>{{ coupon }}</code>
      </div>
      <div class="action-buttons">
        <a :href="url || '#'" target="_blank" rel="noopener external nofollow sponsored" class="btn-primary">
          前往官网试用 / 购买 →
        </a>
      </div>
    </div>
    
    <div class="disclaimer">
      * 商业推广与利益声明：本卡片包含合规推广联盟链接（rel="sponsored"），若通过链接购买本站可能获得微量佣金用于探针节点维护，但绝不影响您的实付结算价格与本站客观实测立场；翻墙服务存在固有波动，建议严格死守「纯月付」底线。
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  slogan: string
  price: string | number
  unit?: string
  badge?: string
  tags?: string[]
  lineType?: string
  protocols?: string
  speed?: string
  refund?: string
  pros?: string
  cons?: string
  coupon?: string
  url?: string
  backupUrl?: string
}>()
</script>

<style scoped>
.affiliate-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.affiliate-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.08);
  border-color: #93c5fd;
}

.card-badge {
  position: absolute;
  top: -11px;
  right: 20px;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.8rem;
}

.provider-name {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.provider-slogan {
  font-size: 0.88rem;
  color: #64748b;
  margin: 0.2rem 0 0 0;
}

.price-box {
  text-align: right;
  white-space: nowrap;
}

.price-currency {
  font-size: 1rem;
  color: #2563eb;
  font-weight: 700;
}

.price-val {
  font-size: 1.75rem;
  font-weight: 900;
  color: #2563eb;
  letter-spacing: -0.02em;
}

.price-unit {
  font-size: 0.82rem;
  color: #64748b;
  margin-left: 2px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1rem;
}

.feature-tag {
  background: #f1f5f9;
  color: #334155;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  background: #f8fafc;
  padding: 0.85rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #f1f5f9;
}

@media (max-width: 640px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.metric-item {
  display: flex;
  flex-direction: column;
}

.m-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 2px;
}

.m-val {
  font-size: 0.88rem;
  font-weight: 680;
  color: #0f172a;
}

.m-val.highlight {
  color: #059669;
}

.pros-cons {
  font-size: 0.86rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  padding: 0.7rem;
  background: #fafafa;
  border-radius: 6px;
}

.pros {
  color: #065f46;
  margin-bottom: 4px;
}

.cons {
  color: #991b1b;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid #f1f5f9;
}

.coupon-box {
  font-size: 0.85rem;
  color: #334155;
}

.coupon-box code {
  background: #fee2e2;
  color: #991b1b;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-primary {
  display: inline-block;
  background: #2563eb;
  color: #ffffff !important;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 8px 18px;
  border-radius: 6px;
  text-decoration: none !important;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  display: inline-block;
  background: #f1f5f9;
  color: #334155 !important;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none !important;
  border: 1px solid #cbd5e1;
}

.disclaimer {
  font-size: 0.72rem;
  color: #94a3b8;
  margin-top: 0.8rem;
  line-height: 1.4;
}
</style>
