<template>
  <div class="streaming-matrix-panel">
    <div class="panel-header">
      <div class="header-title">
        <span class="matrix-icon">⚡</span>
        <span>{{ brandName }} AI 生产力与主流流媒体解锁矩阵</span>
      </div>
      <div class="header-note">测试范围：热门亚太及美区落地节点</div>
    </div>

    <!-- AI 生产力服务板块 -->
    <div class="section-group">
      <div class="section-label">AI 生产力大模型访问支持</div>
      <div class="matrix-grid">
        <div class="matrix-cell" :class="getCellClass(details?.chatgpt)">
          <div class="cell-top">
            <span class="service-name">ChatGPT (OpenAI)</span>
            <span class="status-badge">{{ getStatusText(details?.chatgpt) }}</span>
          </div>
          <div class="cell-desc">{{ getServiceNote('chatgpt', details?.chatgpt) }}</div>
        </div>

        <div class="matrix-cell" :class="getCellClass(details?.claude)">
          <div class="cell-top">
            <span class="service-name">Claude 3.5 Sonnet</span>
            <span class="status-badge">{{ getStatusText(details?.claude) }}</span>
          </div>
          <div class="cell-desc">{{ getServiceNote('claude', details?.claude) }}</div>
        </div>

        <div class="matrix-cell" :class="getCellClass(details?.gemini)">
          <div class="cell-top">
            <span class="service-name">Google Gemini Advanced</span>
            <span class="status-badge">{{ getStatusText(details?.gemini) }}</span>
          </div>
          <div class="cell-desc">{{ getServiceNote('gemini', details?.gemini) }}</div>
        </div>
      </div>
    </div>

    <!-- 国际主流流媒体板块 -->
    <div class="section-group">
      <div class="section-label">国际主流音视频与流媒体服务</div>
      <div class="matrix-grid">
        <div class="matrix-cell" :class="getCellClass(details?.netflix)">
          <div class="cell-top">
            <span class="service-name">Netflix (网飞)</span>
            <span class="status-badge">{{ getStatusText(details?.netflix) }}</span>
          </div>
          <div class="cell-desc">{{ getServiceNote('netflix', details?.netflix) }}</div>
        </div>

        <div class="matrix-cell" :class="getCellClass(details?.disney)">
          <div class="cell-top">
            <span class="service-name">Disney+ (迪士尼)</span>
            <span class="status-badge">{{ getStatusText(details?.disney) }}</span>
          </div>
          <div class="cell-desc">{{ getServiceNote('disney', details?.disney) }}</div>
        </div>

        <div class="matrix-cell" :class="getCellClass(details?.youtube)">
          <div class="cell-top">
            <span class="service-name">YouTube Premium 4K</span>
            <span class="status-badge">{{ getStatusText(details?.youtube) }}</span>
          </div>
          <div class="cell-desc">{{ getServiceNote('youtube', details?.youtube) }}</div>
        </div>

        <div class="matrix-cell" :class="getCellClass(details?.hbo)">
          <div class="cell-top">
            <span class="service-name">Max (HBO Max)</span>
            <span class="status-badge">{{ getStatusText(details?.hbo) }}</span>
          </div>
          <div class="cell-desc">{{ getServiceNote('hbo', details?.hbo) }}</div>
        </div>

        <div class="matrix-cell" :class="getCellClass(details?.tiktok)">
          <div class="cell-top">
            <span class="service-name">TikTok 国际版</span>
            <span class="status-badge">{{ getStatusText(details?.tiktok) }}</span>
          </div>
          <div class="cell-desc">{{ getServiceNote('tiktok', details?.tiktok) }}</div>
        </div>

        <div class="matrix-cell" :class="getCellClass(details?.spotify)">
          <div class="cell-top">
            <span class="service-name">Spotify</span>
            <span class="status-badge">{{ getStatusText(details?.spotify) }}</span>
          </div>
          <div class="cell-desc">{{ getServiceNote('spotify', details?.spotify) }}</div>
        </div>
      </div>
    </div>

    <!-- 底部图例说明 -->
    <div class="panel-footer">
      <div class="legend-list">
        <span class="legend-item"><span class="dot supported"></span> 实测支持</span>
        <span class="legend-item"><span class="dot partial"></span> 部分节点/视地区而定</span>
        <span class="legend-item"><span class="dot vendor"></span> 官方宣称</span>
        <span class="legend-item"><span class="dot unsupported"></span> 不支持</span>
        <span class="legend-item"><span class="dot untested"></span> 未测试</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StreamingStatus } from '../../../data/brands';

const props = defineProps<{
  brandName: string;
  details?: StreamingStatus;
}>();

const getCellClass = (status?: string) => {
  return `status-${status || 'untested'}`;
};

const getStatusText = (status?: string) => {
  switch (status) {
    case 'supported':
      return '可用 (Supported)';
    case 'partial':
      return '部分节点 (Partial)';
    case 'vendor_claim':
      return '官方宣称 (Vendor)';
    case 'unsupported':
      return '受限 (Blocked)';
    case 'untested':
    default:
      return '未测试 (Untested)';
  }
};

const getServiceNote = (service: string, status?: string) => {
  if (status === 'supported') {
    if (service === 'chatgpt') return '原生住宅/机房洁净IP，正常交互无降级拦截';
    if (service === 'claude') return '支持美日新加坡出口，无区域黑名单阻断';
    if (service === 'netflix') return '支持非自制剧完整解锁，4K极速加载';
    if (service === 'youtube') return '免广告 Premium 顺畅，4K 60FPS 极低丢包';
    return '常规测试节点全部通过区域检验';
  }
  if (status === 'partial') {
    return '仅香港/日本/美国等特定原生落地节点支持，需手动选线';
  }
  if (status === 'vendor_claim') {
    return '品牌官方宣称支持，本站未建立长期自动化监测';
  }
  if (status === 'unsupported') {
    return '机房IP被目标平台风控识别，当前无法正常使用';
  }
  return '当前评测周期未包含该项独立抓包验证';
};
</script>

<style scoped>
.streaming-matrix-panel {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  color: #e2e8f0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
}
.header-note {
  font-size: 0.75rem;
  color: #94a3b8;
}

.section-group {
  margin-top: 1rem;
}
.section-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #38bdf8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 0.75rem;
}

.matrix-cell {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 0.75rem 0.875rem;
  transition: all 0.2s ease;
}

.cell-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.375rem;
}
.service-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #f1f5f9;
}
.status-badge {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
}

.cell-desc {
  font-size: 0.75rem;
  color: #94a3b8;
  line-height: 1.4;
}

/* 状态配色 */
.status-supported {
  border-left: 3px solid #10b981;
}
.status-supported .status-badge {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.status-partial {
  border-left: 3px solid #f59e0b;
}
.status-partial .status-badge {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}

.status-vendor_claim {
  border-left: 3px solid #3b82f6;
}
.status-vendor_claim .status-badge {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}

.status-unsupported {
  border-left: 3px solid #ef4444;
}
.status-unsupported .status-badge {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.status-untested {
  border-left: 3px solid #64748b;
}
.status-untested .status-badge {
  background: rgba(100, 116, 139, 0.2);
  color: #94a3b8;
}

.panel-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.legend-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.75rem;
  color: #94a3b8;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}
.dot.supported { background: #10b981; }
.dot.partial { background: #f59e0b; }
.dot.vendor { background: #3b82f6; }
.dot.unsupported { background: #ef4444; }
.dot.untested { background: #64748b; }
</style>
