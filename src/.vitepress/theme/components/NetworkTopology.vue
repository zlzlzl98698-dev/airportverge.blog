<template>
  <div class="network-topology-panel">
    <div class="panel-header">
      <div class="header-title">
        <span class="topo-icon">🌐</span>
        <span>{{ brandName }} 链路拓扑与数据路由可观测图</span>
      </div>
      <div class="schematic-tag" :class="{ 'is-real': !isSchematic }">
        {{ isSchematic ? '⚠ 架构概念示意图 (非物理拓扑)' : '● 专线工程架构映射 (Measured)' }}
      </div>
    </div>

    <!-- 拓扑流程图卡片 -->
    <div class="topology-flow">
      <!-- 节点 1: 用户终端 -->
      <div class="topo-node">
        <div class="node-icon">💻</div>
        <div class="node-title">用户终端设备</div>
        <div class="node-detail">Windows / Mac / iOS / Android</div>
        <div class="node-tag">客户端: {{ clientProtocol || 'VLESS / Shadowsocks' }}</div>
      </div>

      <div class="topo-line-arrow">
        <div class="line-label">本地加密流</div>
        <div class="line-wire normal"></div>
      </div>

      <!-- 节点 2: 国内中转入口 -->
      <div class="topo-node highlight">
        <div class="node-icon">🏢</div>
        <div class="node-title">国内接入入口</div>
        <div class="node-detail">华东/华南多线 BGP 服务器</div>
        <div class="node-tag">隐藏真实IP · 智能调度</div>
      </div>

      <div class="topo-line-arrow dedicated">
        <div class="line-label dedicated-label">{{ lineType || 'IEPL 专线直连' }}</div>
        <div class="line-wire dedicated-wire"></div>
        <div class="line-sublabel">抗 GFW 干扰 · 防 QoS 掐断</div>
      </div>

      <!-- 节点 3: 海外落地机房 -->
      <div class="topo-node highlight">
        <div class="node-icon">🌏</div>
        <div class="node-title">海外落地机房</div>
        <div class="node-detail">{{ egressRegion || '香港 / 日本 / 新加坡 / 美国' }}</div>
        <div class="node-tag">原生住宅/洁净机房 IP</div>
      </div>

      <div class="topo-line-arrow">
        <div class="line-label">全球目标服务</div>
        <div class="line-wire normal"></div>
      </div>

      <!-- 节点 4: 目标平台 -->
      <div class="topo-node">
        <div class="node-icon">🚀</div>
        <div class="node-title">目标互联网服务</div>
        <div class="node-detail">ChatGPT / Claude / Netflix / YouTube</div>
        <div class="node-tag">全速低时延访问</div>
      </div>
    </div>

    <!-- 拓扑参数表格与说明 -->
    <div class="topo-metrics-grid">
      <div class="metric-card">
        <span class="m-label">跨境链路形式</span>
        <span class="m-val">{{ lineType || '企业级 IEPL 内网专线' }}</span>
      </div>
      <div class="metric-card">
        <span class="m-label">国内入口调度</span>
        <span class="m-val">优质多线 BGP 智能就近接入</span>
      </div>
      <div class="metric-card">
        <span class="m-label">落地出口架构</span>
        <span class="m-val">{{ egressRegion || '主流亚太与美区原生落地' }}</span>
      </div>
      <div class="metric-card">
        <span class="m-label">传输协议安全性</span>
        <span class="m-val">强加密流量封装，阻断深度包检测 (DPI)</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    brandName: string;
    lineType?: string;
    egressRegion?: string;
    clientProtocol?: string;
    isSchematic?: boolean;
  }>(),
  {
    lineType: '企业级内网 IEPL 专线',
    egressRegion: '香港、日本、新加坡、美国',
    clientProtocol: 'VLESS / Shadowsocks',
    isSchematic: true
  }
);
</script>

<style scoped>
.network-topology-panel {
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

.schematic-tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 9999px;
  font-weight: 600;
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.3);
}
.schematic-tag.is-real {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.3);
}

.topology-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.topo-node {
  flex: 1;
  min-width: 130px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 0.75rem 0.5rem;
  text-align: center;
}
.topo-node.highlight {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
}
.node-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}
.node-title {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.25rem;
}
.node-detail {
  font-size: 0.6875rem;
  color: #94a3b8;
  margin-bottom: 0.375rem;
}
.node-tag {
  font-size: 0.625rem;
  background: rgba(255, 255, 255, 0.06);
  padding: 1px 4px;
  border-radius: 3px;
  color: #38bdf8;
  display: inline-block;
}

.topo-line-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  padding: 0 4px;
}
.line-label {
  font-size: 0.625rem;
  color: #94a3b8;
  margin-bottom: 2px;
  text-align: center;
}
.line-wire {
  width: 100%;
  height: 2px;
  background: #334155;
  position: relative;
}
.line-wire::after {
  content: '';
  position: absolute;
  right: 0;
  top: -3px;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 6px solid #334155;
}

.topo-line-arrow.dedicated .dedicated-label {
  color: #38bdf8;
  font-weight: 700;
}
.dedicated-wire {
  height: 3px !important;
  background: linear-gradient(90deg, #2563eb, #38bdf8) !important;
  box-shadow: 0 0 6px rgba(56, 189, 248, 0.5);
}
.dedicated-wire::after {
  border-left-color: #38bdf8 !important;
}
.line-sublabel {
  font-size: 0.5625rem;
  color: #64748b;
  margin-top: 2px;
  text-align: center;
}

.topo-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 0.75rem;
}
.metric-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
}
.m-label {
  display: block;
  font-size: 0.6875rem;
  color: #64748b;
  margin-bottom: 2px;
}
.m-val {
  font-size: 0.75rem;
  font-weight: 600;
  color: #cbd5e1;
}

@media (max-width: 768px) {
  .topology-flow {
    flex-direction: column;
    align-items: stretch;
  }
  .topo-line-arrow {
    margin: 0.5rem 0;
  }
  .line-wire {
    width: 2px;
    height: 20px;
    margin: 0 auto;
  }
  .line-wire::after {
    top: auto;
    bottom: 0;
    right: -3px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid #334155;
  }
  .dedicated-wire::after {
    border-top-color: #38bdf8 !important;
  }
}
</style>
