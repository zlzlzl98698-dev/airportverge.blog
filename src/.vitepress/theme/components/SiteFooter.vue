<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand-col">
          <div class="footer-logo">
            <span class="logo-accent">机场订阅</span> · 专业评测实验室
          </div>
          <p class="brand-bio">
            致力于为中文用户提供客观、透明、可复核的机场推荐、节点测速、流媒体与 AI 解锁测试、VPN 软件评测及 Clash 客户端教程。
          </p>
          <div class="compliance-badge">
            独立观测 · 拒绝黑箱 · 真实跑测
          </div>
        </div>

        <div class="footer-links-col">
          <div class="col-heading">四大核心专题</div>
          <ul>
            <li><a href="/airport/">机场推荐与排行中心</a></li>
            <li><a href="/vpn/">VPN 与游戏加速器评测</a></li>
            <li><a href="/clash/">Clash 客户端全平台指南</a></li>
            <li><a href="/resources/">资源情报与跑路预警</a></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <div class="col-heading">品牌数据库</div>
          <ul>
            <li><a href="/brands/">41 家品牌综合数据库</a></li>
            <li><a href="/brands/lightspeed">光速云深度实测</a></li>
            <li><a href="/brands/muguang">暮光加速深度实测</a></li>
            <li><a href="/brands/feimao">飞猫云深度实测</a></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <div class="col-heading">合规与关于</div>
          <ul>
            <li><a href="/resources/faq/">常见疑问解答 (FAQ)</a></li>
            <li><a href="/resources/risk-intel/">网络服务风险情报</a></li>
            <li><a href="/resources/node-detection/">网络连通性检测工具</a></li>
            <li><a href="/resources/runaway-warning/">历史跑路预警黑名单</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-middle">
        <div class="disclosure-box">
          <strong>商业推广与免责声明：</strong>
          本站包含部分推广链接（Affiliate Links）。当您通过本站链接注册或订阅服务时，本站可能会获得服务商支付的一定比例佣金支持运营与服务器维护，但这绝不会增加您的实际订阅费用。我们坚持以客观事实和实际跑测数据为依据进行独立分析，商业合作绝不代表虚假赞美。请用户遵守所在地区的法律法规，科学合理合规使用互联网技术。
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          © 2026 airportverge.blog · 机场订阅 评测媒体 版权所有
        </div>
        <div class="tech-stack">
          基于 VitePress & Pagefind 静态生成 · 支持深层可访问静态部署
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 3.5rem 1.5rem 2rem 1.5rem;
  border-top: 1px solid #1e293b;
  font-size: 0.875rem;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
}

@media (max-width: 860px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
@media (max-width: 540px) {
  .footer-top {
    grid-template-columns: 1fr;
  }
}

.footer-logo {
  font-size: 1.15rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.75rem;
}
.logo-accent {
  color: #38bdf8;
}

.brand-bio {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.compliance-badge {
  display: inline-block;
  font-size: 0.6875rem;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.col-heading {
  font-size: 0.875rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-links-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links-col a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.8125rem;
  transition: color 0.15s ease;
}
.footer-links-col a:hover {
  color: #38bdf8;
}

.footer-middle {
  border-top: 1px solid #1e293b;
  border-bottom: 1px solid #1e293b;
  padding: 1.25rem 0;
  margin-bottom: 1.5rem;
}

.disclosure-box {
  font-size: 0.75rem;
  line-height: 1.6;
  color: #64748b;
}
.disclosure-box strong {
  color: #94a3b8;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.75rem;
  color: #64748b;
}
</style>
