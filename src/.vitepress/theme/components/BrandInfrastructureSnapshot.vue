<template>
  <div class="brand-snapshot-card">
    <div class="snapshot-header" :style="{ borderLeftColor: brand.color || '#2563eb' }">
      <div class="header-main">
        <h3 class="brand-h3">
          {{ brand.name }}
          <span class="en-name" v-if="brand.nameEn">({{ brand.nameEn }})</span>
        </h3>
        <p class="brand-summary">{{ brand.summary }}</p>
      </div>
      <div class="header-action">
        <AffButton :brandId="brand.id" :code="brand.affCode" size="md" variant="primary" text="直达官网" />
      </div>
    </div>

    <!-- 关键参数 4 宫格 -->
    <div class="params-grid">
      <div class="param-box">
        <span class="param-label">起步定价标准</span>
        <span class="param-value highlight">{{ brand.priceDisplay }}</span>
        <span class="param-sub">{{ brand.priceNote }}</span>
      </div>

      <div class="param-box">
        <span class="param-label">核心骨干线路</span>
        <span class="param-value">{{ brand.lines.join(' · ') }}</span>
        <span class="param-sub">BGP智能调度与优化出口</span>
      </div>

      <div class="param-box">
        <span class="param-label">支持代理协议</span>
        <span class="param-value">{{ brand.protocols.join(' · ') }}</span>
        <span class="param-sub">兼容现代主流分流引擎</span>
      </div>

      <div class="param-box">
        <span class="param-label">覆盖落地地区</span>
        <span class="param-value">{{ brand.regions.slice(0, 5).join(' · ') }}</span>
        <span class="param-sub">共 {{ brand.regions.length }} 个主力地区机房</span>
      </div>
    </div>

    <!-- 优缺点与适用人群 -->
    <div class="eval-section">
      <div class="eval-col pros">
        <div class="eval-title">核心优势</div>
        <ul>
          <li v-for="(pro, idx) in brand.pros" :key="idx">{{ pro }}</li>
        </ul>
      </div>

      <div class="eval-col cons">
        <div class="eval-title">已知限制与注意事项</div>
        <ul>
          <li v-for="(con, idx) in brand.cons" :key="idx">{{ con }}</li>
        </ul>
      </div>
    </div>

    <!-- 套餐价格速查表 -->
    <div class="plans-table-wrapper" v-if="brand.plans && brand.plans.length > 0">
      <div class="table-title">代表性套餐档位对比</div>
      <table class="plans-table">
        <thead>
          <tr>
            <th>套餐规格</th>
            <th>计费周期</th>
            <th>官方定价</th>
            <th>流量配额</th>
            <th>月均折算</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(plan, idx) in brand.plans" :key="idx">
            <td class="font-medium">{{ plan.name }}</td>
            <td><span class="period-badge">{{ plan.period }}</span></td>
            <td class="price-cell">{{ plan.price }}</td>
            <td>{{ plan.bandwidth }}</td>
            <td class="text-slate">{{ plan.monthlyEquivalent ? `¥${plan.monthlyEquivalent}/月` : '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 底部核验信息 -->
    <div class="snapshot-footer">
      <div class="verify-tag">
        <span>数据核实日期: <strong>{{ brand.verifyDate }}</strong></span>
        <span class="sep">|</span>
        <span>运营起始时间: {{ brand.operationStart || '待核实' }}</span>
        <span class="sep">|</span>
        <span>数据类型: <code>{{ brand.dataSource }}</code></span>
      </div>
      <div class="risk-tip" v-if="brand.riskWarning">
        <strong>提示：</strong>{{ brand.riskWarning }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Brand } from '../../../data/brands';
import AffButton from './AffButton.vue';

defineProps<{
  brand: Brand;
}>();
</script>

<style scoped>
.brand-snapshot-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 2px 8px -2px rgba(15, 23, 42, 0.06);
}

.snapshot-header {
  border-left: 4px solid #2563eb;
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.brand-h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}
.en-name {
  font-size: 0.875rem;
  font-weight: 400;
  color: #64748b;
  margin-left: 0.25rem;
}
.brand-summary {
  margin: 0.375rem 0 0 0;
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.param-box {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}
.param-label {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}
.param-value {
  display: block;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1e293b;
}
.param-value.highlight {
  color: #2563eb;
}
.param-sub {
  display: block;
  font-size: 0.6875rem;
  color: #94a3b8;
  margin-top: 0.25rem;
}

.eval-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
@media (max-width: 640px) {
  .eval-section {
    grid-template-columns: 1fr;
  }
}

.eval-col {
  border-radius: 8px;
  padding: 1rem;
}
.eval-col.pros {
  background: #f0fdf4;
  border: 1px solid #dcfce7;
}
.eval-col.cons {
  background: #fef2f2;
  border: 1px solid #fee2e2;
}

.eval-title {
  font-size: 0.8125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.pros .eval-title { color: #166534; }
.cons .eval-title { color: #991b1b; }

.eval-col ul {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8125rem;
}
.pros li { color: #15803d; margin-bottom: 0.25rem; }
.cons li { color: #b91c1c; margin-bottom: 0.25rem; }

.plans-table-wrapper {
  margin-bottom: 1.25rem;
  overflow-x: auto;
}
.table-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}
.plans-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
  text-align: left;
}
.plans-table th {
  background: #f1f5f9;
  color: #475569;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}
.plans-table td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}
.font-medium {
  font-weight: 600;
}
.price-cell {
  font-weight: 700;
  color: #2563eb;
}
.period-badge {
  background: #e2e8f0;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
}
.text-slate {
  color: #64748b;
}

.snapshot-footer {
  border-top: 1px solid #f1f5f9;
  padding-top: 0.75rem;
  font-size: 0.75rem;
  color: #64748b;
}
.verify-tag {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.verify-tag .sep {
  color: #cbd5e1;
}
.risk-tip {
  margin-top: 0.5rem;
  background: #fffbeb;
  border: 1px solid #fef3c7;
  color: #92400e;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
}
</style>
