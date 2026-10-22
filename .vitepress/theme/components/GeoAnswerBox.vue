<template>
  <aside class="geo-answer-box" :aria-label="title || 'AI 摘要与核心结论'">
    <div class="geo-header">
      <div class="geo-tag">
        <svg class="geo-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>{{ badge || 'GEO / Answer-First 核心实体回答' }}</span>
      </div>
      <div v-if="updated" class="geo-updated">实测核验：{{ updated }}</div>
    </div>
    <div class="geo-title" v-if="title">{{ title }}</div>
    <div class="geo-content">
      <slot></slot>
    </div>
    <div v-if="verdict" class="geo-verdict">
      <span class="verdict-label">权威核验判定：</span>
      <span class="verdict-text">{{ verdict }}</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  badge?: string
  updated?: string
  verdict?: string
}>()
</script>

<style scoped>
.geo-answer-box {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-left: 5px solid #2563eb;
  border-radius: 8px;
  padding: 1.25rem 1.4rem;
  margin: 1.5rem 0 2rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
}

.geo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
  font-size: 0.8rem;
}

.geo-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #1d4ed8;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.geo-updated {
  color: #64748b;
  font-size: 0.78rem;
  font-mono: true;
}

.geo-title {
  font-size: 1.15rem;
  font-weight: 750;
  color: #0f172a;
  margin-bottom: 0.6rem;
  line-height: 1.4;
}

.geo-content {
  font-size: 0.98rem;
  line-height: 1.75;
  color: #334155;
}

.geo-verdict {
  margin-top: 0.8rem;
  padding-top: 0.75rem;
  border-top: 1px dashed #e2e8f0;
  font-size: 0.92rem;
  display: flex;
  gap: 6px;
}

.verdict-label {
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
}

.verdict-text {
  color: #2563eb;
  font-weight: 600;
}
</style>
