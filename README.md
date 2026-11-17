<div align="center">

# 🌐 机场订阅 (airportverge.blog)
### 中文机场评测 · 网络加速工具 · 客户端知识库

[![VitePress](https://img.shields.io/badge/SSG-VitePress%20v1.6.4-38bdf8?style=flat-square&logo=vite)](https://vitepress.dev/)
[![Vue 3](https://img.shields.io/badge/Framework-Vue%203.5-42b883?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Search](https://img.shields.io/badge/Search-Pagefind%20v1.3-f97316?style=flat-square)](https://pagefind.app/)
[![SEO](https://img.shields.io/badge/SEO-Clean%20URLs%20%7C%20JSON--LD-10b981?style=flat-square)]()
[![Pages](https://img.shields.io/badge/Indexed%20Pages-131-blue?style=flat-square)]()
[![License](https://img.shields.io/badge/License-MIT-gray?style=flat-square)]()

[🚀 访问线上正式站点](https://airportverge.blog/) · [📖 快速启动](#-快速开始) · [🏗️ 技术架构](#️-技术栈与架构设计) · [🗺️ 专题矩阵](#-内容与专题矩阵) · [🚢 生产部署](#-生产部署)

</div>

---

## 📖 项目简介

**`airportverge.blog`** 是一个专为中文出海网民打造的现代化、高可信度网络工具知识库与独立评测站点。项目采用 **VitePress 1.6 + Vue 3 SSG** 架构静态构建，基于 **珠海联通 5Gbps / 广州电信千兆物理带宽实测集群**，对中文互联网主流的 41 家机场服务商及翻墙加速工具开展长效跟踪拔测。

站点彻底杜绝虚假营销与黑箱评测，围绕**“线路真实架构、晚高峰丢包实测、倍率透明度、流媒体与 AI 解锁、跑路风险雷达”**五大核心支柱，为新手、极客与出海团队提供体系化、专著级的决策参考。

---

## ✨ 核心亮点

- ⚡ **极致性能与离线索引**：预渲染纯静态 HTML（SSG），集成 **Pagefind 毫秒级客户端轻量全文检索**，零延迟无感直达 4.2 万字正文内容。
- 🧭 **专著级内容架构**：收录 **131 篇** 结构化页面，横跨 4 大一级核心专题、21 个二级子集群、56 篇 Cluster 核心指南及 41 家品牌独立档案。
- 🎯 **白帽技术 SEO 基础设施**：
  - **Clean URLs**：全站启用语义化路径，无 `.html` 后缀与冗余动态参数。
  - **规范化 Canonical**：100% 绝对地址自引用，严格保障权值统一。
  - **全动态 Schema JSON-LD**：自动装配 `WebSite`、`Organization`、`CollectionPage`、`Article` 与多层级 `BreadcrumbList` 面包屑实体。
  - **爬虫友好矩阵**：原生 `robots.txt` 显式放行 Googlebot、bingbot、Baiduspider、yisouspider（神马/夸克/UC），配套 100% 状态码 200 的 `sitemap.xml`。
- 🎨 **现代化响应式 UI**：自适应明暗模式切换、移动端汉堡导航、多端自适应评测参数大表与可交互折叠 FAQ。

---

## 🗺️ 内容与专题矩阵

```
airportverge.blog (131 Pages Knowledge Base)
│
├── ✈️ 机场推荐系列专题 (/airport/)
│   ├── 1. 综合机场推荐      → 主流品牌横评、流媒体与 AI 大模型专线
│   ├── 2. 机场实时天梯榜    → 晚高峰速度梯队榜、服务商口碑耐用度
│   ├── 3. 性价比机场精选    → 流量单价精算（GB成本）、多人合租拼车
│   ├── 4. 稳定专线机场      → IPLC / IEPL 物理专线解析、敏感期抗封锁
│   ├── 5. 便宜平价机场      → 十元以下学生党套餐、按量计费不限时包
│   ├── 6. 免费梯子深度审计  → 试用机制全盘点、流量窥探与安全漏洞排查
│   └── 7. 科学上网全景指南  → 底层网络协议原理解析、小白零基础通关手册
│
├── 🔒 VPN 与网络加速器评测 (/vpn/)
│   ├── 1. 商业 VPN 权威测评 → 国际大厂实测、商业 VPN vs 机场中转本质剖析
│   ├── 2. 免费 VPN 风险避坑 → 揭秘限速限流套路、用户隐私日志倒卖内幕
│   ├── 3. 手机移动端配置    → iOS Shadowrocket（小火箭）、安卓 v2rayNG
│   ├── 4. VPN 软件功能测试  → Kill Switch 防断网泄漏、DNS 污染与 WebRTC
│   ├── 5. 跨境办公加速      → 亚马逊/TikTok/外贸跨境办公专属链路
│   ├── 6. 加速器横向对比    → 游戏专属加速 vs 网页代理正面碰撞
│   └── 7. 社区高分好用精选  → 支持微信/支付宝付款、全中文友好客户端
│
├── 📦 Clash 客户端全平台指南 (/clash/)
│   ├── 1. 跨平台客户端选型  → Windows / Mac / Linux / 移动端主力工具
│   ├── 2. Clash Verge 详解  → 核心参数调优、TUN 虚拟网卡模式、脚本规则扩展
│   ├── 3. Clash Verge 下载  → GitHub 官方 Release 签名校验、镜像加速分流
│   ├── 4. 订阅管理与导入    → 自动更新机制、外部订阅转换工具的隐私劫持风险
│   ├── 5. Clash Meta 内核   → Mihomo 新特性全解、旧内核迁移实操
│   ├── 6. 零基础图文通关    → 分流规则配置、GEOIP/GEOSITE、DNS 防污染
│   └── 7. 终极故障排查手册  → 节点全部超时变红排查、系统代理冲突修复
│
├── 📡 资源与情报中心 (/resources/)
│   ├── 1. 免费公开节点库    → 节点渠道搜集、可用时效性及高危嗅探分析
│   ├── 2. 机场跑路预警雷达  → 跑路前兆特征识别、止损方案与紧急迁移
│   ├── 3. 选型常见 FAQ      → 购买选购答疑、客户端报错常见问题
│   ├── 4. 法律合规与风控    → 境内法律边界与用网安全守则
│   ├── 5. 节点跑测工具推荐  → 测速脚本与工具链、伪造 IPLC 专线鉴别
│   ├── 6. 订阅问题深度排错  → 更新失败排查、各类格式互转与兼容方案
│   └── 7. 新手进阶入门词典  → 核心术语字典、从零到一配置路线图
│
└── 📊 41家主流机场品牌实测库 (/brands/)
    ├── ★ 光速云 (LightSpeed) 深度实测报告（IEPL 专线标杆 · 自研客户端）
    ├── 暮光加速 (Twilight)、微加云 (WgetCloud)、飞猫云 (CatCloud)...
    └── 覆盖 41 家品牌机房架构、协议支持、晚高峰丢包与实测天梯数据
```

---

## 🛠️ 技术栈与架构设计

| 维度 | 技术选型 | 说明 |
| :--- | :--- | :--- |
| **SSG 框架** | **[VitePress](https://vitepress.dev/) v1.6.4** | 基于 Vite + Vue 3 的极速静态站点生成器 |
| **核心前端库** | **Vue v3.5.13** | 响应式组件驱动，局部无缝挂载自定义评测模块 |
| **搜索引擎** | **[Pagefind](https://pagefind.app/) v1.3.0** | 构建时建立索引的纯静态轻量全文检索工具 |
| **样式与主题** | **VitePress Default Theme + Custom CSS** | 现代极简风格，适配桌面与移动端触摸交互 |
| **SEO 基础设施** | **JSON-LD Schema + Clean URLs + Sitemap** | 符合 Google Search Console 与 Bing Webmaster 最佳实践 |
| **类型支持** | **TypeScript 5.7+** | 配置与自定义组件全链路严格类型约束 |

---

## 🚀 快速开始

### 1. 环境准备
确保您的本地环境已安装 [Node.js](https://nodejs.org/) (推荐 `v18.0.0` 或更高版本)。

### 2. 克隆项目与安装依赖
```bash
# 克隆仓库
git clone https://github.com/zlzlzl98698-dev/airportverge.blog.git
cd airportverge.blog

# 安装依赖
npm install
```

### 3. 本地启动开发服务器
```bash
npm run docs:dev
```
启动后访问本地预览地址：`http://localhost:5173/`。

### 4. 生产环境构建与索引生成
```bash
npm run build
```
构建命令将自动执行以下流程：
1. VitePress 预渲染全站静态页面到 `src/.vitepress/dist`；
2. 自动生成规范 `sitemap.xml`（已过滤 404 页面）；
3. 复制 `robots.txt` 放行多引擎爬虫；
4. 运行 Pagefind 构建全站 131 个页面的分词索引。

### 5. 本地预览生产构建产物
```bash
npm run docs:preview
```

---

## 🚢 生产部署

项目产物位于 `src/.vitepress/dist`，完全解耦后端，可直接部署在任意现代静态托管平台：

### 方案 A：Cloudflare Pages（推荐）
1. 连接 GitHub 仓库 `zlzlzl98698-dev/airportverge.blog`；
2. **构建预设**：`VitePress`；
3. **构建命令**：`npm run build`；
4. **输出目录**：`src/.vitepress/dist`；
5. 在 DNS 选项中绑定正式域名 `airportverge.blog`。

### 方案 B：Vercel
```bash
npx vercel deploy --prebuilt
```
在 Project Settings 中设置 Output Directory 为 `src/.vitepress/dist`。

### 方案 C：Nginx / Caddy 独立服务器
将 `src/.vitepress/dist` 目录内容放置于 Web 根目录下，并在 Nginx 配置文件中开启 HTML5 历史模式支持：
```nginx
server {
    listen 80;
    server_name airportverge.blog;
    return 301 https://airportverge.blog$request_uri;
}

server {
    listen 443 ssl http2;
    server_name airportverge.blog;

    root /var/www/airportverge.blog;
    index index.html;

    # cleanUrls 支持
    location / {
        try_files $uri $uri/ $uri.html /404.html;
    }

    # 静态资产长效缓存
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 📈 SEO 与 GEO 最佳实践

- **正式主域名唯一化**：必须全局统一重定向至 `https://airportverge.blog/`，禁止混用 `http://` 或 `www`。
- **爬虫放行规则**：`robots.txt` 严格保障 `Googlebot`、`bingbot`、`Baiduspider` 与 `yisouspider` 无障碍访问全站目录。
- **JSON-LD Schema 规范**：
  - 全站具备统一的 `WebSite` 与 `Organization` 实体；
  - 各级页面均具备标准 `BreadcrumbList` 面包屑结构；
  - 核心文章具备 `Article` 结构化实体，利于搜索结果展现富摘要（Rich Snippets）。

---

## ⚖️ 免责声明 (Disclaimer)

1. 本站所有评测数据均来自网络性能测试集群在特定时间段、特定运营商环境下的客观拨测结果，受网络波动、机房调优与国际出口影响，测试数据仅供技术交流与选型参考。
2. 任何组织与个人在使用跨境网络服务时，必须严格遵守中华人民共和国各项法律法规及《计算机信息网络国际联网管理暂行规定》，切勿用于任何危害国家安全或侵犯他人合法权益之行为。

---

<div align="center">

**机场订阅 (airportverge.blog) · 评测实验室团队维护**  
© 2026 airportverge.blog. All rights reserved.

</div>
