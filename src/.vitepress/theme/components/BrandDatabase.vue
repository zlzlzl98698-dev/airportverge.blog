<template>
  <div class="brand-database-root">
    <!-- 顶部筛选控制台 -->
    <div class="filter-console">
      <div class="search-bar-row">
        <div class="search-input-wrap">
          <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索品牌名称、别名、协议、线路 (例如: 光速云, IEPL, VLESS)..."
            class="search-input"
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">✕</button>
        </div>

        <div class="sort-select-wrap">
          <label class="sort-label">排序方式:</label>
          <select v-model="sortBy" class="sort-select">
            <option value="featured">综合评级推荐</option>
            <option value="price-asc">入门价格：从低到高</option>
            <option value="price-desc">入门价格：从高到低</option>
            <option value="date">最新核验更新</option>
          </select>
        </div>
      </div>

      <!-- 多维度 Filter Chips -->
      <div class="filters-chips-container">
        <!-- 价格过滤 -->
        <div class="filter-chip-group">
          <span class="group-title">价格区间:</span>
          <button
            class="chip-btn"
            :class="{ active: priceFilter === 'all' }"
            @click="priceFilter = 'all'"
          >全部</button>
          <button
            class="chip-btn"
            :class="{ active: priceFilter === 'sub10' }"
            @click="priceFilter = 'sub10'"
          >10元以内/月</button>
          <button
            class="chip-btn"
            :class="{ active: priceFilter === '10to25' }"
            @click="priceFilter = '10to25'"
          >10-25元/月</button>
          <button
            class="chip-btn"
            :class="{ active: priceFilter === 'above25' }"
            @click="priceFilter = 'above25'"
          >25元以上高端</button>
        </div>

        <!-- 线路过滤 -->
        <div class="filter-chip-group">
          <span class="group-title">核心线路:</span>
          <button
            class="chip-btn"
            :class="{ active: lineFilter === 'all' }"
            @click="lineFilter = 'all'"
          >全部线路</button>
          <button
            class="chip-btn"
            :class="{ active: lineFilter === 'iepl' }"
            @click="lineFilter = 'iepl'"
          >IEPL/IPLC 专线</button>
          <button
            class="chip-btn"
            :class="{ active: lineFilter === 'bgp' }"
            @click="lineFilter = 'bgp'"
          >BGP 中转</button>
        </div>

        <!-- AI 解锁过滤 -->
        <div class="filter-chip-group">
          <span class="group-title">核心功能:</span>
          <button
            class="chip-btn"
            :class="{ active: featureFilter === 'all' }"
            @click="featureFilter = 'all'"
          >全部场景</button>
          <button
            class="chip-btn"
            :class="{ active: featureFilter === 'ai' }"
            @click="featureFilter = 'ai'"
          >支持 ChatGPT / Claude</button>
          <button
            class="chip-btn"
            :class="{ active: featureFilter === 'measured' }"
            @click="featureFilter = 'measured'"
          >具备独立实测报告</button>
        </div>
      </div>

      <!-- 计数条与重置 -->
      <div class="filter-summary-row">
        <span class="result-count">共检索到 <strong>{{ filteredBrands.length }}</strong> 家符合条件的品牌服务商</span>
        <button v-if="hasActiveFilters" @click="resetFilters" class="reset-link">重置所有筛选条件</button>
      </div>
    </div>

    <!-- 品牌卡片网格 -->
    <div v-if="filteredBrands.length > 0" class="brands-grid">
      <BrandCard
        v-for="brand in filteredBrands"
        :key="brand.id"
        :brand="brand"
      />
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>未找到匹配的机场品牌</h3>
      <p>没有找到符合当前搜索或筛选条件的品牌，请尝试放宽筛选或输入其他关键词。</p>
      <button @click="resetFilters" class="reset-btn">清除筛选条件</button>
    </div>

    <!-- SSR / 搜索引擎抓取静态友好备用列表 (隐藏在折叠或静态渲染中) -->
    <div class="ssr-sitemap-fallback">
      <details>
        <summary>所有已核验 41 家机场品牌全景索引表 (搜索引擎抓取目录)</summary>
        <div class="ssr-table-wrap">
          <table class="ssr-table">
            <thead>
              <tr>
                <th>品牌名称</th>
                <th>起步价格</th>
                <th>核心线路</th>
                <th>支持协议</th>
                <th>实测数据</th>
                <th>评测详情</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in BRANDS" :key="b.id">
                <td><strong>{{ b.name }}</strong> ({{ b.nameEn }})</td>
                <td>{{ b.priceDisplay }}</td>
                <td>{{ b.lines.join(', ') }}</td>
                <td>{{ b.protocols.join(', ') }}</td>
                <td>{{ b.dataSource }}</td>
                <td><a :href="`/brands/${b.id}`">{{ b.name }}深度评测</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { BRANDS, type Brand } from '../../../data/brands';
import BrandCard from './BrandCard.vue';

const searchQuery = ref('');
const sortBy = ref('featured');
const priceFilter = ref('all');
const lineFilter = ref('all');
const featureFilter = ref('all');

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== '' ||
    sortBy.value !== 'featured' ||
    priceFilter.value !== 'all' ||
    lineFilter.value !== 'all' ||
    featureFilter.value !== 'all'
  );
});

const resetFilters = () => {
  searchQuery.value = '';
  sortBy.value = 'featured';
  priceFilter.value = 'all';
  lineFilter.value = 'all';
  featureFilter.value = 'all';
};

const filteredBrands = computed(() => {
  let list = [...BRANDS];

  // 1. 文本搜索
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(b => {
      return (
        b.name.toLowerCase().includes(q) ||
        b.nameEn.toLowerCase().includes(q) ||
        b.aliases.some(a => a.toLowerCase().includes(q)) ||
        b.lines.some(l => l.toLowerCase().includes(q)) ||
        b.protocols.some(p => p.toLowerCase().includes(q)) ||
        b.summary.toLowerCase().includes(q)
      );
    });
  }

  // 2. 价格筛选
  if (priceFilter.value === 'sub10') {
    list = list.filter(b => b.priceStartMonthly <= 10);
  } else if (priceFilter.value === '10to25') {
    list = list.filter(b => b.priceStartMonthly > 10 && b.priceStartMonthly <= 25);
  } else if (priceFilter.value === 'above25') {
    list = list.filter(b => b.priceStartMonthly > 25);
  }

  // 3. 线路筛选
  if (lineFilter.value === 'iepl') {
    list = list.filter(b => b.lines.some(l => /iepl|iplc|专线/i.test(l)));
  } else if (lineFilter.value === 'bgp') {
    list = list.filter(b => b.lines.some(l => /bgp|中转/i.test(l)));
  }

  // 4. 功能/测试状态筛选
  if (featureFilter.value === 'ai') {
    list = list.filter(b => b.streamingDetails.chatgpt === 'supported' || b.streamingDetails.claude === 'supported');
  } else if (featureFilter.value === 'measured') {
    list = list.filter(b => b.dataSource === 'measured');
  }

  // 5. 排序
  list.sort((a, b) => {
    if (sortBy.value === 'price-asc') {
      return a.priceStartMonthly - b.priceStartMonthly;
    }
    if (sortBy.value === 'price-desc') {
      return b.priceStartMonthly - a.priceStartMonthly;
    }
    if (sortBy.value === 'date') {
      return b.verifyDate.localeCompare(a.verifyDate);
    }
    // 默认 featured
    if (a.isPrimary) return -1;
    if (b.isPrimary) return 1;
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return a.order - b.order;
  });

  return list;
});
</script>

<style scoped>
.brand-database-root {
  margin: 1.5rem 0;
}

.filter-console {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;
}

.search-bar-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.search-input-wrap {
  flex: 1;
  min-width: 280px;
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #94a3b8;
  position: absolute;
  left: 0.875rem;
}
.search-input {
  width: 100%;
  padding: 0.625rem 2.25rem 0.625rem 2.625rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.875rem;
  background: #ffffff;
  color: #1e293b;
  outline: none;
  transition: all 0.2s ease;
}
.search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.clear-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.875rem;
}

.sort-select-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.sort-label {
  font-size: 0.8125rem;
  color: #64748b;
  white-space: nowrap;
}
.sort-select {
  padding: 0.625rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.875rem;
  background: #ffffff;
  color: #1e293b;
  cursor: pointer;
}

.filters-chips-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
}

.filter-chip-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.group-title {
  font-size: 0.8125rem;
  color: #475569;
  font-weight: 600;
  min-width: 70px;
}
.chip-btn {
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;
}
.chip-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}
.chip-btn.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
  font-weight: 600;
}

.filter-summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px dashed #e2e8f0;
  font-size: 0.8125rem;
  color: #64748b;
}
.result-count strong {
  color: #2563eb;
}
.reset-link {
  background: none;
  border: none;
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.8125rem;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
}
.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}
.empty-state h3 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}
.empty-state p {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}
.reset-btn {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
}

.ssr-sitemap-fallback {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}
.ssr-sitemap-fallback summary {
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;
}
.ssr-table-wrap {
  margin-top: 1rem;
  overflow-x: auto;
}
.ssr-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
}
.ssr-table th, .ssr-table td {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
}
.ssr-table th {
  background: #f1f5f9;
  font-weight: 600;
}
.ssr-table a {
  color: #2563eb;
  text-decoration: none;
}
</style>
