<template>
  <div class="eeat-author-card" v-if="shouldShow">
    <div class="author-avatar-wrapper">
      <img src="/avatar.webp" alt="免费指南安全评测实验室" class="author-avatar" />
    </div>
    <div class="author-content">
      <div class="author-header">
        <span class="author-name">免费指南安全评测实验室</span>
        <span class="author-verified">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          已通过分布式探针客观核验
        </span>
      </div>
      <p class="author-bio">
        本站内容由免费指南网络工程与安全合规团队联合编撰。团队成员包含前 IDC 骨干网工程师与网络安全逆向分析师，长期从事跨境 BGP 路由穿透、IEPL 物理专线鉴伪与消费者维权模型研究。坚持<strong>「隐名自费购买、数据公开透明、拒绝虚假宣称」</strong>核心准则。
      </p>
      <div class="author-footer-links">
        <a href="/about" class="trust-link">关于团队背景</a>
        <span class="sep">|</span>
        <a href="/methodology" class="trust-link">评测方法论 (Methodology)</a>
        <span class="sep">|</span>
        <a href="/disclosure" class="trust-link">商业推广与利益声明 (Disclosure)</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
// Don't show on home page
const shouldShow = computed(() => {
  return route.path !== '/' && route.path !== '/index.html' && !route.path.endsWith('/404.html')
})
</script>

<style scoped>
.eeat-author-card {
  display: flex;
  gap: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #2563eb;
  border-radius: 10px;
  padding: 1.25rem 1.4rem;
  margin: 2.5rem 0 1.5rem 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.author-avatar-wrapper {
  flex-shrink: 0;
}

.author-avatar {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2563eb;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.2);
}

.author-content {
  flex: 1;
}

.author-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 0.4rem;
}

.author-name {
  font-size: 1rem;
  font-weight: 750;
  color: #0f172a;
}

.author-verified {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 0.75rem;
  font-weight: 680;
  padding: 2px 8px;
  border-radius: 12px;
}

.author-bio {
  font-size: 0.88rem;
  line-height: 1.65;
  color: #475569;
  margin: 0.3rem 0 0.6rem 0;
}

.author-bio strong {
  color: #0f172a;
}

.author-footer-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.82rem;
}

.trust-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s;
}

.trust-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.sep {
  color: #cbd5e1;
}

@media (max-width: 640px) {
  .eeat-author-card {
    flex-direction: column;
    padding: 1rem;
  }
}
</style>
