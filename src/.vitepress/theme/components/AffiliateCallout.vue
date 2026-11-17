<template>
  <div class="aff-callout-card" :class="[variantClass]">
    <div class="callout-inner">
      <div class="callout-badge" v-if="badgeText">{{ badgeText }}</div>
      <div class="callout-content">
        <h4 class="callout-title">{{ title || currentBrand.name + ' - 官方正品注册通道' }}</h4>
        <p class="callout-desc">{{ description || currentBrand.summary }}</p>
        <div class="callout-meta">
          <span class="meta-tag">起步价格: <strong>{{ currentBrand.priceDisplay }}</strong></span>
          <span class="meta-tag">核心线路: <strong>{{ currentBrand.lines[0] || 'IEPL 专线' }}</strong></span>
          <span class="meta-tag" v-if="currentBrand.affCode">优惠码: <code>{{ currentBrand.affCode }}</code></span>
        </div>
      </div>
      <div class="callout-action">
        <AffButton
          :brandId="currentBrand.id"
          :code="currentBrand.affCode"
          :text="buttonText || '立即前往官网注册'"
          variant="primary"
          size="md"
        />
        <div class="disclosure-note">
          商业合作披露：经由此链接注册可能为本站带来推荐佣金，不影响您的购买价格。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getBrandById, getPrimaryBrand, type Brand } from '../../../data/brands';
import AffButton from './AffButton.vue';

const props = withDefaults(
  defineProps<{
    brandId?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    badgeText?: string;
    variant?: 'primary' | 'compact' | 'light';
  }>(),
  {
    variant: 'primary',
    badgeText: '官方推荐合作通道'
  }
);

const currentBrand = computed<Brand>(() => {
  if (props.brandId) {
    const found = getBrandById(props.brandId);
    if (found) return found;
  }
  return getPrimaryBrand();
});

const variantClass = computed(() => `callout-${props.variant}`);
</script>

<style scoped>
.aff-callout-card {
  margin: 1.75rem 0;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border: 1px solid #bfdbfe;
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
  box-shadow: 0 4px 12px -2px rgba(37, 99, 235, 0.08);
}

.callout-inner {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.callout-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #1d4ed8;
  background: #dbeafe;
  border: 1px solid #bfdbfe;
  padding: 2px 8px;
  border-radius: 9999px;
  letter-spacing: 0.02em;
}

.callout-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
}

.callout-desc {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  color: #334155;
  line-height: 1.5;
}

.callout-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.8125rem;
  color: #64748b;
}

.meta-tag strong {
  color: #1e293b;
}
.meta-tag code {
  color: #2563eb;
  background: #f1f5f9;
  padding: 1px 5px;
  border-radius: 4px;
  font-weight: 700;
}

.callout-action {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
}

.disclosure-note {
  font-size: 0.6875rem;
  color: #94a3b8;
  line-height: 1.4;
}

.callout-compact .callout-inner {
  padding: 1rem 1.25rem;
}
</style>
