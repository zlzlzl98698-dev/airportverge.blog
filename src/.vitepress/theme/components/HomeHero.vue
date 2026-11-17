<template>
  <div class="home-hero-wrap">
    <div class="hero-inner">
      <div class="hero-badge">
        <span class="pulse-dot"></span>
        <span>2026 中文机场与 VPN 专业评测数据库 · 持续核验</span>
      </div>

      <h1 class="hero-title">
        透明客观的机场评测、测速数据<br />
        与 Clash 跨平台配置全景指南
      </h1>

      <p class="hero-subtitle">
        拒绝虚标与盲目跟风。基于 5Gbps 真实网络环境晚高峰实测，聚合 41 家主流品牌数据、流媒体与 AI 解锁矩阵、客户端故障排查及跑路风险情报。
      </p>

      <!-- 快速入口 4 按钮 -->
      <div class="hero-actions">
        <a href="/airport/" class="btn-primary">
          <span>🚀 浏览机场推荐</span>
        </a>
        <a href="/brands/" class="btn-secondary">
          <span>📊 查阅 41 家品牌库</span>
        </a>
        <a href="/clash/verge/" class="btn-outline">
          <span>⚡ Clash Verge 教程</span>
        </a>
        <a href="/resources/risk-intel/" class="btn-ghost">
          <span>🛡 跑路与风险情报</span>
        </a>
      </div>

      <!-- 四大核心功能卡片直达 -->
      <div class="hero-pillars-grid">
        <a href="/airport/" class="pillar-card">
          <div class="pillar-icon">✈️</div>
          <div class="pillar-content">
            <div class="pillar-title">机场推荐与排行</div>
            <div class="pillar-desc">7 大细分维度：性价比、晚高峰稳定、便宜月付、免费体验</div>
          </div>
        </a>

        <a href="/vpn/" class="pillar-card">
          <div class="pillar-icon">🔒</div>
          <div class="pillar-content">
            <div class="pillar-title">VPN 与加速器评测</div>
            <div class="pillar-desc">海外商业 VPN、游戏加速器、手机移动端专线横向对比</div>
          </div>
        </a>

        <a href="/clash/" class="pillar-card">
          <div class="pillar-icon">📦</div>
          <div class="pillar-content">
            <div class="pillar-title">Clash 客户端生态</div>
            <div class="pillar-desc">Verge Rev、sing-box、小火箭、TUN模式、分流规则配置</div>
          </div>
        </a>

        <a href="/resources/" class="pillar-card">
          <div class="pillar-icon">📡</div>
          <div class="pillar-content">
            <div class="pillar-title">资源与网络情报</div>
            <div class="pillar-desc">节点检测工具、历史跑路黑名单预警、订阅更新异常解决</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-hero-wrap {
  background: radial-gradient(circle at 50% 0%, #f0f7ff 0%, #ffffff 80%);
  padding: 4rem 1.5rem 3rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: center;
}

.hero-inner {
  max-width: 1080px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #1e40af;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.35rem 0.875rem;
  border-radius: 9999px;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.25;
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.02em;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.875rem;
  }
}

.hero-subtitle {
  font-size: 1.0625rem;
  color: #475569;
  line-height: 1.6;
  max-width: 760px;
  margin: 0 auto 2rem auto;
}

.hero-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.btn-primary, .btn-secondary, .btn-outline, .btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #2563eb;
  color: #ffffff;
  border: 1px solid #1d4ed8;
}
.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: #0f172a;
  color: #ffffff;
  border: 1px solid #020617;
}
.btn-secondary:hover {
  background: #1e293b;
}

.btn-outline {
  background: #ffffff;
  color: #2563eb;
  border: 1.5px solid #2563eb;
}
.btn-outline:hover {
  background: #eff6ff;
}

.btn-ghost {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
}
.btn-ghost:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.hero-pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  text-align: left;
}

.pillar-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  gap: 0.875rem;
  text-decoration: none;
  transition: all 0.2s ease;
}
.pillar-card:hover {
  transform: translateY(-2px);
  border-color: #2563eb;
  box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.1);
}

.pillar-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
}
.pillar-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
}
.pillar-desc {
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;
}
</style>
