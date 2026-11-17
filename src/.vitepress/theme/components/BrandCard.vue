<template>
  <div class="brand-item-card" :style="{ '--brand-accent': brand.color || '#2563eb' }">
    <div class="card-top">
      <div class="brand-avatar-box">
        <img v-if="brand.logo" :src="brand.logo" :alt="brand.name + ' Logo'" class="brand-logo-img" loading="lazy" />
        <span v-else class="brand-initial">{{ brand.name.charAt(0) }}</span>
      </div>
      <div class="brand-meta-info">
        <h4 class="brand-title-h4">
          <a :href="`/brands/${brand.id}`" class="brand-link">
            {{ brand.name }}
          </a>
          <span v-if="brand.isPrimary" class="badge-primary">第一推荐</span>
          <span v-else-if="brand.isFeatured" class="badge-featured">精选</span>
        </h4>
        <div class="brand-tags-row">
          <span class="tag-pill">{{ brand.operationStart || '2024' }}</span>
          <span class="tag-pill line-tag">{{ brand.lines[0] || '专线中转' }}</span>
          <span class="tag-pill protocol-tag">{{ brand.protocols[0] || 'VLESS' }}</span>
        </div>
      </div>
    </div>

    <p class="brand-desc">{{ brand.summary }}</p>

    <div class="card-features">
      <div class="feat-item">
        <span class="feat-label">起步价格</span>
        <span class="feat-val price">{{ brand.priceDisplay }}</span>
      </div>
      <div class="feat-item">
        <span class="feat-label">AI 支持</span>
        <span class="feat-val ai-val">{{ brand.aiUnlockSummary }}</span>
      </div>
      <div class="feat-item">
        <span class="feat-label">测试状态</span>
        <span class="feat-val status-val" :class="'status-' + brand.dataSource">
          {{ getDataSourceLabel(brand.dataSource) }}
        </span>
      </div>
    </div>

    <div class="card-actions">
      <a :href="`/brands/${brand.id}`" class="detail-btn">
        查看深度评测
      </a>
      <AffButton :brandId="brand.id" :code="brand.affCode" text="前往官网" size="sm" variant="primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Brand } from '../../../data/brands';
import AffButton from './AffButton.vue';

defineProps<{
  brand: Brand;
}>();

const getDataSourceLabel = (source?: string) => {
  switch (source) {
    case 'measured': return '● 独立实测';
    case 'historical': return '○ 历史记录';
    case 'vendor': return '△ 官方宣称';
    default: return '待核实';
  }
};
</script>

<style scoped>
.brand-item-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}
.brand-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.1);
  border-color: #cbd5e1;
}

.card-top {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 0.75rem;
}

.brand-avatar-box {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
}
.brand-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.brand-initial {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--brand-accent, #2563eb);
}

.brand-meta-info {
  flex: 1;
}
.brand-title-h4 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.brand-link {
  color: #0f172a;
  text-decoration: none;
}
.brand-link:hover {
  color: #2563eb;
}

.badge-primary {
  font-size: 0.6875rem;
  background: #fef3c7;
  color: #b45309;
  border: 1px solid #fde68a;
  padding: 1px 6px;
  border-radius: 4px;
}
.badge-featured {
  font-size: 0.6875rem;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  padding: 1px 6px;
  border-radius: 4px;
}

.brand-tags-row {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.25rem;
  flex-wrap: wrap;
}
.tag-pill {
  font-size: 0.6875rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 1px 5px;
  border-radius: 4px;
}
.line-tag {
  color: #0369a1;
  background: #f0f9ff;
  border-color: #e0f2fe;
}
.protocol-tag {
  color: #4338ca;
  background: #eef2ff;
  border-color: #e0e7ff;
}

.brand-desc {
  font-size: 0.8125rem;
  color: #475569;
  line-height: 1.45;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.375rem;
}

.card-features {
  background: #f8fafc;
  border-radius: 8px;
  padding: 0.625rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: 1rem;
}
.feat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}
.feat-label {
  color: #64748b;
}
.feat-val {
  font-weight: 600;
  color: #1e293b;
}
.feat-val.price {
  color: #2563eb;
  font-weight: 700;
}
.feat-val.ai-val {
  max-width: 140px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.status-val.status-measured {
  color: #10b981;
}
.status-val.status-historical {
  color: #3b82f6;
}
.status-val.status-vendor {
  color: #f59e0b;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}
.detail-btn {
  font-size: 0.8125rem;
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  padding: 0.375rem 0.625rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  transition: all 0.15s ease;
}
.detail-btn:hover {
  background: #f8fafc;
  color: #0f172a;
  border-color: #cbd5e1;
}
</style>
