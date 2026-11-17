<template>
  <nav class="breadcrumb-container" aria-label="面包屑导航">
    <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="/">
          <span itemprop="name">首页</span>
        </a>
        <meta itemprop="position" content="1" />
      </li>
      <span class="breadcrumb-separator">/</span>
      <li v-if="parentTitle && parentUrl" class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" :href="parentUrl">
          <span itemprop="name">{{ parentTitle }}</span>
        </a>
        <meta itemprop="position" content="2" />
      </li>
      <span v-if="parentTitle && parentUrl" class="breadcrumb-separator">/</span>
      <li class="breadcrumb-item active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" aria-current="page">
        <span itemprop="name">{{ currentTitle }}</span>
        <meta itemprop="position" :content="parentTitle ? '3' : '2'" />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  parentTitle?: string;
  parentUrl?: string;
  currentTitle: string;
}>();
</script>

<style scoped>
.breadcrumb-container {
  margin: 1rem 0 1.5rem 0;
  font-size: 0.875rem;
}
.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}
.breadcrumb-item a {
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s ease;
}
.breadcrumb-item a:hover {
  color: #2563eb;
}
.breadcrumb-separator {
  color: #cbd5e1;
  font-size: 0.75rem;
}
.breadcrumb-item.active {
  color: #1e293b;
  font-weight: 500;
}
</style>
