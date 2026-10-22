<template>
  <span :class="['risk-badge', `risk-${type}`]">
    <span class="dot"></span>
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'safe' | 'warning' | 'danger' | 'info' | 'verified'
  text?: string
}>()
</script>

<style scoped>
.risk-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  font-weight: 650;
  padding: 3px 9px;
  border-radius: 9999px;
  vertical-align: middle;
  line-height: 1.2;
  margin: 0 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.risk-safe, .risk-verified {
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}
.risk-safe .dot, .risk-verified .dot {
  background-color: #10b981;
}

.risk-warning {
  background-color: #fffbeb;
  color: #92400e;
  border: 1px solid #fde68a;
}
.risk-warning .dot {
  background-color: #f59e0b;
}

.risk-danger {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
.risk-danger .dot {
  background-color: #ef4444;
}

.risk-info {
  background-color: #eff6ff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}
.risk-info .dot {
  background-color: #3b82f6;
}
</style>
