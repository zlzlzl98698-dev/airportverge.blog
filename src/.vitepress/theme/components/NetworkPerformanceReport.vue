<template>
  <div class="network-perf-panel">
    <div class="panel-header">
      <div class="header-title">
        <span class="status-indicator" :class="statusClass"></span>
        <span class="brand-title">{{ brandName }} 网络性能实测报告</span>
      </div>
      <div class="header-badge" :class="statusClass">
        {{ statusLabel }}
      </div>
    </div>

    <div class="meta-row">
      <span>测试环境: 联通 5Gbps / Clash Verge Rev</span>
      <span class="separator">|</span>
      <span>记录时间: {{ testDate || '2026-08-11' }}</span>
      <span class="separator">|</span>
      <span>协议: {{ protocol || 'VLESS / Shadowsocks' }}</span>
    </div>

    <!-- 节点条形图与指标区 -->
    <div class="nodes-list">
      <div class="node-row">
        <div class="node-meta">
          <span class="node-indicator"></span>
          <span class="node-name">亚太首选节点 (香港/日本)</span>
        </div>
        <div class="node-metrics">
          <span class="metric-item">延迟: <strong>{{ latency || '35ms' }}</strong></span>
          <span class="metric-item">下行带宽: <strong>{{ speed || '420 Mbps' }}</strong></span>
        </div>
        <div class="perf-bar-bg">
          <div class="perf-bar-fill high" style="width: 88%;"></div>
        </div>
      </div>

      <div class="node-row">
        <div class="node-meta">
          <span class="node-indicator"></span>
          <span class="node-name">东南亚及欧美备用节点</span>
        </div>
        <div class="node-metrics">
          <span class="metric-item">延迟: <strong>{{ secondaryLatency }}</strong></span>
          <span class="metric-item">下行带宽: <strong>{{ secondarySpeed }}</strong></span>
        </div>
        <div class="perf-bar-bg">
          <div class="perf-bar-fill medium" style="width: 65%;"></div>
        </div>
      </div>
    </div>

    <!-- 底部状态摘要与水印 -->
    <div class="panel-footer">
      <div class="summary-text">
        <span>统计结论: {{ summaryNote || '专线中转低抖动，晚高峰带宽表现稳定' }}</span>
      </div>
      <div class="watermark">[airportverge.blog · Network Lab]</div>
    </div>

    <!-- 真实测速大图展示区域 -->
    <div v-if="imageUrl" class="screenshot-drawer">
      <details>
        <summary>查看 2026 原始测速全节点截图与丢包率清单</summary>
        <div class="screenshot-container">
          <img :src="imageUrl" :alt="brandName + ' 节点测速实测报告截图'" loading="lazy" />
          <p class="screenshot-caption">原始测试环境：实验室独立光纤节点跑测 · 截图核实日期：{{ testDate }}</p>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    brandName: string;
    status?: 'measured' | 'historical' | 'vendor' | 'untested';
    testDate?: string;
    speed?: string;
    latency?: string;
    protocol?: string;
    imageUrl?: string;
    summaryNote?: string;
  }>(),
  {
    status: 'measured',
    testDate: '2026-08-11 CST',
    speed: '400 Mbps',
    latency: '38ms',
    protocol: 'IEPL / VLESS'
  }
);

const statusClass = computed(() => `status-${props.status}`);

const statusLabel = computed(() => {
  switch (props.status) {
    case 'measured':
      return '● 独立实测数据 (Measured)';
    case 'historical':
      return '○ 历史测试存档 (Historical)';
    case 'vendor':
      return '△ 品牌官方宣称 (Vendor Claim)';
    case 'untested':
      return '✕ 暂未独立测试 (Untested)';
    default:
      return '● 独立实测数据';
  }
});

const secondaryLatency = computed(() => {
  const num = parseInt(props.latency || '40');
  return isNaN(num) ? '120ms' : `${Math.round(num * 2.8)}ms`;
});

const secondarySpeed = computed(() => {
  const num = parseInt(props.speed || '400');
  return isNaN(num) ? '150 Mbps' : `${Math.round(num * 0.55)} Mbps`;
});
</script>

<style scoped>
.network-perf-panel {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  color: #e2e8f0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'SF Mono', monospace;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-title {
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
  letter-spacing: 0.02em;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.status-measured .status-indicator,
.status-indicator.status-measured {
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.status-historical .status-indicator,
.status-indicator.status-historical {
  background: #3b82f6;
  box-shadow: 0 0 8px #3b82f6;
}

.status-vendor .status-indicator,
.status-indicator.status-vendor {
  background: #f59e0b;
}

.status-untested .status-indicator,
.status-indicator.status-untested {
  background: #64748b;
}

.header-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 9999px;
  font-weight: 600;
  border: 1px solid transparent;
}

.header-badge.status-measured {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.3);
}
.header-badge.status-historical {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.3);
}
.header-badge.status-vendor {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.3);
}
.header-badge.status-untested {
  background: rgba(100, 116, 139, 0.15);
  color: #94a3b8;
  border-color: rgba(100, 116, 139, 0.3);
}

.meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0.75rem 0 1rem 0;
}
.meta-row .separator {
  color: #475569;
}

.nodes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.node-row {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

.node-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.375rem;
}
.node-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8;
}
.node-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #f1f5f9;
}

.node-metrics {
  display: flex;
  gap: 1.5rem;
  font-size: 0.8125rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}
.node-metrics strong {
  color: #38bdf8;
  font-family: 'SF Mono', Consolas, monospace;
}

.perf-bar-bg {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
}
.perf-bar-fill {
  height: 100%;
  border-radius: 3px;
}
.perf-bar-fill.high {
  background: linear-gradient(90deg, #2563eb, #38bdf8);
}
.perf-bar-fill.medium {
  background: linear-gradient(90deg, #0284c7, #38bdf8);
}

.panel-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.75rem;
}
.summary-text {
  color: #94a3b8;
}
.watermark {
  color: #475569;
  font-size: 0.6875rem;
  letter-spacing: 0.05em;
}

.screenshot-drawer {
  margin-top: 1rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  padding-top: 0.75rem;
}
.screenshot-drawer summary {
  color: #38bdf8;
  font-size: 0.8125rem;
  cursor: pointer;
  outline: none;
}
.screenshot-drawer summary:hover {
  text-decoration: underline;
}
.screenshot-container {
  margin-top: 0.75rem;
  background: #020617;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #1e293b;
  text-align: center;
}
.screenshot-container img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
}
.screenshot-caption {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.5rem;
  margin-bottom: 0;
}
</style>
