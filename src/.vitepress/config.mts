import { defineConfig, type HeadConfig } from 'vitepress';

// ==========================================
// 搜索引擎验证代码配置（站长平台获取 Token 后可在此填入或通过环境变量注入）
// ==========================================
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION || '';
const BING_SITE_VERIFICATION = process.env.BING_SITE_VERIFICATION || process.env.MSVALIDATE_01 || '';
const SHENMA_SITE_VERIFICATION = process.env.SHENMA_SITE_VERIFICATION || '';
const BAIDU_SITE_VERIFICATION = process.env.BAIDU_SITE_VERIFICATION || '';

const sectionNameMap: Record<string, string> = {
  airport: '机场推荐',
  vpn: 'VPN与加速器',
  clash: 'Clash客户端',
  resources: '资源与情报',
  brands: '品牌数据库',
  recommend: '综合推荐',
  ranking: '机场排行',
  'cost-effective': '性价比机场',
  stable: '稳定机场',
  cheap: '便宜机场',
  'free-ladder': '免费梯子',
  'vpn-guide': '科学上网',
  free: '免费VPN',
  mobile: '手机VPN',
  'software-review': 'VPN软件评测',
  accelerator: 'VPN加速器',
  compare: '加速器对比',
  best: '好用的VPN',
  verge: 'Clash Verge',
  'verge-download': 'Clash Verge 下载',
  'verge-subscription': 'Clash Verge 订阅',
  meta: 'Clash Meta',
  tutorial: 'Clash 使用教程',
  troubleshooting: 'Clash 故障排查',
  'free-nodes': '免费节点',
  'runaway-warning': '跑路预警',
  faq: '机场 FAQ',
  'risk-intel': '机场风险情报',
  'node-detection': '节点检测',
  'subscription-issues': '订阅问题',
  beginner: '新手帮助'
};

export default defineConfig({
  title: '机场订阅 - 中文机场评测与网络工具数据库',
  description: '面向中文用户的机场推荐、机场排行、VPN软件评测、Clash客户端教程、网络问题解决及41家品牌独立测速数据库。',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: 'https://airportverge.blog',
    transformItems: (items) => {
      return items.filter((item) => !item.url.includes('404'));
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/images/covers/logo.png' }],
    ['meta', { name: 'keywords', content: '机场推荐,机场排行,性价比机场,稳定机场,便宜机场,免费梯子,科学上网,VPN推荐,免费VPN,手机VPN,VPN软件评测,VPN加速器,加速器对比,Clash推荐,Clash Verge,Clash Meta,免费节点,机场FAQ,跑路预警' }],
    ['meta', { name: 'author', content: '机场订阅评测团队' }],
    ['meta', { property: 'og:site_name', content: '机场订阅' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // 搜索引擎站长平台所有权验证 Meta 预留
    ...(GOOGLE_SITE_VERIFICATION ? [['meta', { name: 'google-site-verification', content: GOOGLE_SITE_VERIFICATION }]] as HeadConfig[] : []),
    ...(BING_SITE_VERIFICATION ? [['meta', { name: 'msvalidate.01', content: BING_SITE_VERIFICATION }]] as HeadConfig[] : []),
    ...(SHENMA_SITE_VERIFICATION ? [['meta', { name: 'shenma-site-verification', content: SHENMA_SITE_VERIFICATION }]] as HeadConfig[] : []),
    ...(BAIDU_SITE_VERIFICATION ? [['meta', { name: 'baidu-site-verification', content: BAIDU_SITE_VERIFICATION }]] as HeadConfig[] : []),
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://airportverge.blog/#website',
            'url': 'https://airportverge.blog/',
            'name': '机场订阅',
            'description': '专业中文机场评测媒体与网络工具知识库',
            'inLanguage': 'zh-CN',
            'publisher': {
              '@type': 'Organization',
              '@id': 'https://airportverge.blog/#organization',
              'name': '机场订阅 Lab',
              'url': 'https://airportverge.blog/',
              'logo': 'https://airportverge.blog/images/covers/logo.png'
            }
          },
          {
            '@type': 'Organization',
            '@id': 'https://airportverge.blog/#organization',
            'name': '机场订阅评测实验室',
            'url': 'https://airportverge.blog/',
            'logo': 'https://airportverge.blog/images/covers/logo.png'
          }
        ]
      })
    ]
  ],

  transformHead(context) {
    const { pageData } = context;
    const relPath = pageData.relativePath;

    // 排除首页与 404
    if (!relPath || relPath === 'index.md' || relPath === '404.md') {
      return [];
    }

    const heads: HeadConfig[] = [];
    const segments = relPath.replace(/\.md$/, '').split('/');
    const pathParts = segments.filter(s => s !== 'index');
    const isIndex = segments[segments.length - 1] === 'index' || segments.length === 1;

    // 构建 BreadcrumbList
    const breadcrumbs: { name: string; url: string }[] = [
      { name: '首页', url: 'https://airportverge.blog/' }
    ];

    let accumPath = '';
    let targetCanonical = 'https://airportverge.blog/';
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      accumPath += `/${part}`;
      const isLastPart = i === pathParts.length - 1;

      const url = (!isLastPart || isIndex) 
        ? `https://airportverge.blog${accumPath}/`
        : `https://airportverge.blog${accumPath}`;

      if (isLastPart) {
        targetCanonical = url;
      }

      const name = isLastPart && !isIndex
        ? (pageData.title || part)
        : (sectionNameMap[part] || part);

      breadcrumbs.push({ name, url });
    }

    if (breadcrumbs.length > 1) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.url
        }))
      };
      heads.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(breadcrumbSchema)
      ]);
    }

    // 构建页面级特定 Schema (Article 或 CollectionPage)
    const isBrandOrGuide = !isIndex && (relPath.includes('guide-') || relPath.startsWith('brands/'));

    if (isBrandOrGuide) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageData.title,
        description: pageData.description || '',
        mainEntityOfPage: targetCanonical,
        inLanguage: 'zh-CN',
        publisher: {
          '@type': 'Organization',
          name: '机场订阅',
          logo: {
            '@type': 'ImageObject',
            url: 'https://airportverge.blog/images/covers/logo.png'
          }
        }
      };
      heads.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(articleSchema)
      ]);
    } else if (isIndex) {
      const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageData.title,
        description: pageData.description || '',
        url: targetCanonical,
        inLanguage: 'zh-CN'
      };
      heads.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(collectionSchema)
      ]);
    }

    return heads;
  },

  themeConfig: {
    siteTitle: '机场订阅',
    logo: '/images/covers/logo.png',

    outline: {
      level: [2, 3],
      label: '本页导读目录'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索评测、客户端与品牌...',
                buttonAriaLabel: '搜索评测、客户端与品牌'
              },
              modal: {
                displayDetails: '显示详细内容',
                resetButtonTitle: '清除搜索条件',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关结果：',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    nav: [
      {
        text: '✈️ 机场推荐',
        link: '/airport/',
        activeMatch: '^/airport/',
        items: [
          { text: '专题总览', link: '/airport/' },
          { text: '机场推荐', link: '/airport/recommend/' },
          { text: '机场排行', link: '/airport/ranking/' },
          { text: '性价比机场', link: '/airport/cost-effective/' },
          { text: '稳定机场', link: '/airport/stable/' },
          { text: '便宜机场', link: '/airport/cheap/' },
          { text: '免费梯子', link: '/airport/free-ladder/' },
          { text: '科学上网指南', link: '/airport/vpn-guide/' }
        ]
      },
      {
        text: '🔒 VPN与加速器',
        link: '/vpn/',
        activeMatch: '^/vpn/',
        items: [
          { text: '专题总览', link: '/vpn/' },
          { text: 'VPN 推荐', link: '/vpn/recommend/' },
          { text: '免费 VPN', link: '/vpn/free/' },
          { text: '手机 VPN', link: '/vpn/mobile/' },
          { text: 'VPN 软件评测', link: '/vpn/software-review/' },
          { text: 'VPN 加速器', link: '/vpn/accelerator/' },
          { text: '加速器横向对比', link: '/vpn/compare/' },
          { text: '好用的 VPN', link: '/vpn/best/' }
        ]
      },
      {
        text: '📦 Clash 客户端',
        link: '/clash/',
        activeMatch: '^/clash/',
        items: [
          { text: '客户端生态总览', link: '/clash/' },
          { text: 'Clash 推荐', link: '/clash/recommend/' },
          { text: 'Clash Verge', link: '/clash/verge/' },
          { text: 'Clash Verge 下载', link: '/clash/verge-download/' },
          { text: 'Clash Verge 订阅', link: '/clash/verge-subscription/' },
          { text: 'Clash Meta (Mihomo)', link: '/clash/meta/' },
          { text: 'Clash 使用教程', link: '/clash/tutorial/' },
          { text: 'Clash 故障排查', link: '/clash/troubleshooting/' }
        ]
      },
      {
        text: '📡 资源与情报',
        link: '/resources/',
        activeMatch: '^/resources/',
        items: [
          { text: '资源情报总览', link: '/resources/' },
          { text: '免费节点', link: '/resources/free-nodes/' },
          { text: '跑路预警', link: '/resources/runaway-warning/' },
          { text: '机场 FAQ', link: '/resources/faq/' },
          { text: '机场风险情报', link: '/resources/risk-intel/' },
          { text: '节点检测工具', link: '/resources/node-detection/' },
          { text: '订阅问题解决', link: '/resources/subscription-issues/' },
          { text: '新手帮助指南', link: '/resources/beginner/' }
        ]
      },
      {
        text: '📊 品牌数据库',
        link: '/brands/',
        activeMatch: '^/brands/'
      }
    ],

    sidebar: {
      '/airport/': [
        {
          text: '✈️ 机场推荐系列专题',
          items: [
            { text: '机场推荐总览', link: '/airport/' },
            {
              text: '1. 机场推荐',
              collapsed: false,
              items: [
                { text: '专题首页', link: '/airport/recommend/' },
                { text: '主流品牌选购', link: '/airport/recommend/guide-general' },
                { text: '流媒体与AI场景', link: '/airport/recommend/guide-streaming-ai' }
              ]
            },
            {
              text: '2. 机场排行',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/airport/ranking/' },
                { text: '梯队榜单', link: '/airport/ranking/guide-speed-tier' },
                { text: '口碑与耐用度', link: '/airport/ranking/guide-reputation' }
              ]
            },
            {
              text: '3. 性价比机场',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/airport/cost-effective/' },
                { text: '流量单价精算', link: '/airport/cost-effective/guide-bandwidth-cost' },
                { text: '合租与拼车', link: '/airport/cost-effective/guide-bulk-sharing' }
              ]
            },
            {
              text: '4. 稳定机场',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/airport/stable/' },
                { text: 'IPLC与IEPL专线', link: '/airport/stable/guide-iplc-iepl' },
                { text: '敏感时期抗封锁', link: '/airport/stable/guide-anti-blocking' }
              ]
            },
            {
              text: '5. 便宜机场',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/airport/cheap/' },
                { text: '十元以下平价', link: '/airport/cheap/guide-sub-10' },
                { text: '不限时按量计费', link: '/airport/cheap/guide-pay-as-you-go' }
              ]
            },
            {
              text: '6. 免费梯子',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/airport/free-ladder/' },
                { text: '试用机制盘点', link: '/airport/free-ladder/guide-trial' },
                { text: '安全风险审计', link: '/airport/free-ladder/guide-security-audit' }
              ]
            },
            {
              text: '7. 科学上网',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/airport/vpn-guide/' },
                { text: '协议原理解析', link: '/airport/vpn-guide/guide-protocol-theory' },
                { text: '零基础入门', link: '/airport/vpn-guide/guide-beginner-onboarding' }
              ]
            }
          ]
        }
      ],

      '/vpn/': [
        {
          text: '🔒 VPN 与加速器专题',
          items: [
            { text: 'VPN专题总览', link: '/vpn/' },
            {
              text: '1. VPN 推荐',
              collapsed: false,
              items: [
                { text: '专题首页', link: '/vpn/recommend/' },
                { text: '商业品牌盘点', link: '/vpn/recommend/guide-global-brands' },
                { text: 'VPN vs 机场中转', link: '/vpn/recommend/guide-vpn-vs-airport' }
              ]
            },
            {
              text: '2. 免费 VPN',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/vpn/free/' },
                { text: '试用限制测评', link: '/vpn/free/guide-free-eval' },
                { text: '隐私陷阱规避', link: '/vpn/free/guide-free-traps' }
              ]
            },
            {
              text: '3. 手机 VPN',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/vpn/mobile/' },
                { text: 'iOS 小火箭配置', link: '/vpn/mobile/guide-ios-shadowrocket' },
                { text: '安卓 v2rayNG 实操', link: '/vpn/mobile/guide-android-v2rayng' }
              ]
            },
            {
              text: '4. VPN 软件评测',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/vpn/software-review/' },
                { text: '功能横向测试', link: '/vpn/software-review/guide-features' },
                { text: '测速与DNS泄漏', link: '/vpn/software-review/guide-speed-leak' }
              ]
            },
            {
              text: '5. VPN 加速器',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/vpn/accelerator/' },
                { text: '跨境办公加速', link: '/vpn/accelerator/guide-cross-border' },
                { text: '游戏加速与代理', link: '/vpn/accelerator/guide-gaming-vs-proxy' }
              ]
            },
            {
              text: '6. 加速器对比',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/vpn/compare/' },
                { text: '正面碰撞测试', link: '/vpn/compare/guide-head-to-head' },
                { text: '不同场景矩阵', link: '/vpn/compare/guide-scenario-matrix' }
              ]
            },
            {
              text: '7. 好用的 VPN',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/vpn/best/' },
                { text: '社区高分精选', link: '/vpn/best/guide-community-praise' },
                { text: '支持中文与支付宝', link: '/vpn/best/guide-payment-support' }
              ]
            }
          ]
        }
      ],

      '/clash/': [
        {
          text: '📦 Clash 客户端生态',
          items: [
            { text: '客户端生态总览', link: '/clash/' },
            {
              text: '1. Clash 推荐',
              collapsed: false,
              items: [
                { text: '专题首页', link: '/clash/recommend/' },
                { text: '跨平台版本选型', link: '/clash/recommend/guide-cross-platform' },
                { text: '后CFW替代方案', link: '/clash/recommend/guide-alternatives' }
              ]
            },
            {
              text: '2. Clash Verge',
              collapsed: false,
              items: [
                { text: '专题首页', link: '/clash/verge/' },
                { text: '核心设置与TUN', link: '/clash/verge/guide-core-settings' },
                { text: '规则扩展与脚本', link: '/clash/verge/guide-rules-merge' }
              ]
            },
            {
              text: '3. Clash Verge 下载',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/clash/verge-download/' },
                { text: '官方 Release 验证', link: '/clash/verge-download/guide-official-release' },
                { text: 'Win/Mac/Linux包', link: '/clash/verge-download/guide-os-specific' }
              ]
            },
            {
              text: '4. Clash Verge 订阅',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/clash/verge-subscription/' },
                { text: '导入更新指南', link: '/clash/verge-subscription/guide-import-guide' },
                { text: '订阅转换风险', link: '/clash/verge-subscription/guide-subconverter' }
              ]
            },
            {
              text: '5. Clash Meta',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/clash/meta/' },
                { text: 'Mihomo新特性', link: '/clash/meta/guide-mihomo-features' },
                { text: '旧内核迁移指南', link: '/clash/meta/guide-meta-migration' }
              ]
            },
            {
              text: '6. Clash 使用教程',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/clash/tutorial/' },
                { text: '零门槛图文通关', link: '/clash/tutorial/guide-beginner-walkthrough' },
                { text: '分流与DNS高阶配置', link: '/clash/tutorial/guide-advanced-tricks' }
              ]
            },
            {
              text: '7. Clash 故障排查',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/clash/troubleshooting/' },
                { text: '节点超时与变红', link: '/clash/troubleshooting/guide-timeout-red' },
                { text: '系统代理冲突修复', link: '/clash/troubleshooting/guide-conflict-repair' }
              ]
            }
          ]
        }
      ],

      '/resources/': [
        {
          text: '📡 资源与情报中心',
          items: [
            { text: '资源情报总览', link: '/resources/' },
            {
              text: '1. 免费节点',
              collapsed: false,
              items: [
                { text: '专题首页', link: '/resources/free-nodes/' },
                { text: '公开节点渠道', link: '/resources/free-nodes/guide-public-sources' },
                { text: '时效与安全风险', link: '/resources/free-nodes/guide-lifetime-security' }
              ]
            },
            {
              text: '2. 跑路预警',
              collapsed: false,
              items: [
                { text: '专题首页', link: '/resources/runaway-warning/' },
                { text: '跑路前兆识别', link: '/resources/runaway-warning/guide-runaway-signs' },
                { text: '止损与迁移自救', link: '/resources/runaway-warning/guide-loss-prevention' }
              ]
            },
            {
              text: '3. 机场 FAQ',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/resources/faq/' },
                { text: '购买选型答疑', link: '/resources/faq/guide-purchasing-faq' },
                { text: '日常使用故障', link: '/resources/faq/guide-daily-use-faq' }
              ]
            },
            {
              text: '4. 机场风险情报',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/resources/risk-intel/' },
                { text: '法律合规边界', link: '/resources/risk-intel/guide-legal-safety' },
                { text: '节点审计与风控', link: '/resources/risk-intel/guide-audit-rules' }
              ]
            },
            {
              text: '5. 节点检测',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/resources/node-detection/' },
                { text: '跑测工具推荐', link: '/resources/node-detection/guide-benchmarking-tools' },
                { text: '伪造专线鉴别', link: '/resources/node-detection/guide-fraud-identification' }
              ]
            },
            {
              text: '6. 订阅问题',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/resources/subscription-issues/' },
                { text: '更新失败排错', link: '/resources/subscription-issues/guide-sub-fail' },
                { text: '格式互转与兼容', link: '/resources/subscription-issues/guide-format-compat' }
              ]
            },
            {
              text: '7. 新手帮助',
              collapsed: true,
              items: [
                { text: '专题首页', link: '/resources/beginner/' },
                { text: '术语速查词典', link: '/resources/beginner/guide-terminology' },
                { text: '从零到一配置', link: '/resources/beginner/guide-zero-to-one' }
              ]
            }
          ]
        }
      ],

      '/brands/': [
        {
          text: '📊 41家机场品牌数据库',
          items: [
            { text: '品牌库检索与筛选', link: '/brands/' },
            { text: '光速云 (LightSpeed) ★主推', link: '/brands/lightspeed' },
            { text: '暮光加速 (Twilight)', link: '/brands/muguang' },
            { text: '飞猫云 (FlyCat)', link: '/brands/feimao' },
            { text: '大佬云 (DalaoCloud)', link: '/brands/dalaoyun' },
            { text: '微风网络 (Breezenet)', link: '/brands/weifeng' },
            { text: '星岛梦 (StarDream)', link: '/brands/xingdaomeng' },
            { text: '二猫云 (2Mao)', link: '/brands/ermao' },
            { text: '唯兔云 (V2Yun)', link: '/brands/weitu' },
            { text: 'Firefly (萤火虫)', link: '/brands/firefly' },
            { text: '白月光 (WhiteMoon)', link: '/brands/baiyueguang' },
            { text: 'WgetCloud (微加云)', link: '/brands/wgetcloud' },
            { text: 'CyberGuard (CG)', link: '/brands/cyberguard' }
          ]
        }
      ]
    }
  }
});
