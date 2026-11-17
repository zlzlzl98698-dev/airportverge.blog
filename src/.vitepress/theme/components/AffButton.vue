<template>
  <div class="aff-btn-wrapper">
    <a
      :href="finalUrl"
      target="_blank"
      rel="nofollow sponsored noopener"
      class="aff-button"
      :class="[variantClass, sizeClass]"
    >
      <span>{{ text || '立即前往官网注册' }}</span>
      <svg class="aff-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </a>
    <span v-if="finalCode" class="aff-code-badge" @click="copyCode" title="点击复制优惠码">
      优惠码: <code>{{ finalCode }}</code>
      <span class="copy-tip">{{ copied ? '已复制!' : '点击复制' }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { getBrandById } from '../../../data/brands';

const props = withDefaults(
  defineProps<{
    brandId?: string;
    href?: string;
    text?: string;
    code?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'amber';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    variant: 'primary',
    size: 'md'
  }
);

const brand = computed(() => (props.brandId ? getBrandById(props.brandId) : undefined));

const finalUrl = computed(() => {
  if (props.href) return props.href;
  if (brand.value?.affUrl) return brand.value.affUrl;
  return '#';
});

const finalCode = computed(() => {
  if (props.code) return props.code;
  if (brand.value?.affCode) return brand.value.affCode;
  return '';
});

const copied = ref(false);

const copyCode = () => {
  if (!finalCode.value) return;
  navigator.clipboard.writeText(finalCode.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const variantClass = computed(() => `variant-${props.variant}`);
const sizeClass = computed(() => `size-${props.size}`);
</script>

<style scoped>
.aff-btn-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.aff-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.variant-primary {
  background: #2563eb;
  color: #ffffff !important;
  border: 1px solid #1d4ed8;
}
.variant-primary:hover {
  background: #1d4ed8;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
}

.variant-secondary {
  background: #0f172a;
  color: #ffffff !important;
  border: 1px solid #020617;
}
.variant-secondary:hover {
  background: #1e293b;
}

.variant-outline {
  background: #ffffff;
  color: #2563eb !important;
  border: 1.5px solid #2563eb;
}
.variant-outline:hover {
  background: #eff6ff;
}

.variant-amber {
  background: #f59e0b;
  color: #ffffff !important;
  border: 1px solid #d97706;
}
.variant-amber:hover {
  background: #d97706;
}

.size-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
}
.size-md {
  padding: 0.5rem 1.125rem;
  font-size: 0.875rem;
}
.size-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.aff-icon {
  width: 1rem;
  height: 1rem;
}

.aff-code-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.35rem 0.65rem;
  background: #f1f5f9;
  border: 1px dashed #cbd5e1;
  border-radius: 6px;
  font-size: 0.8125rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;
}
.aff-code-badge:hover {
  background: #e2e8f0;
  border-color: #94a3b8;
}
.aff-code-badge code {
  color: #2563eb;
  font-weight: 700;
  background: transparent;
  padding: 0;
}
.copy-tip {
  font-size: 0.6875rem;
  color: #64748b;
  background: #ffffff;
  padding: 1px 4px;
  border-radius: 3px;
}
</style>
