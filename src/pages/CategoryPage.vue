<template>
  <section class="page" v-if="category">
    <header class="page-header">
      <h1>{{ category.name }}</h1>
      <p>{{ category.description }}</p>
    </header>

    <div class="sections">
      <article v-for="section in sections" :key="section.id" class="section-card">
        <div class="section-meta">
          <h2>{{ section.name }}</h2>
          <p>{{ section.description }}</p>
        </div>

        <div class="section-preview">
          <component :is="section.component" v-bind="section.variants[0].fixture" />
        </div>

        <div class="section-variants">
          <p class="variants-title">Variants</p>
          <div class="variant-list">
            <button
              v-for="variant in section.variants"
              :key="variant.id"
              class="variant-pill"
              type="button"
              title="Variant switching coming soon"
            >
              {{ variant.label }}
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { getCategory, getSectionsByCategory } from "../lib/registry";
import type { CategoryId } from "../lib/types";

const route = useRoute();
const categoryId = computed(() => route.params.categoryId as CategoryId);
const category = computed(() => getCategory(categoryId.value));
const sections = computed(() =>
  category.value ? getSectionsByCategory(category.value.id) : []
);
</script>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.page-header {
  display: grid;
  gap: 8px;
}

.page-header h1 {
  margin: 0;
  font-size: 2rem;
}

.page-header p {
  margin: 0;
  color: #475569;
}

.sections {
  display: grid;
  gap: 24px;
}

.section-card {
  display: grid;
  gap: 18px;
  padding: 22px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.section-meta h2 {
  margin: 0 0 6px;
  font-size: 1.3rem;
}

.section-meta p {
  margin: 0;
  color: #475569;
}

.section-preview {
  padding: 16px;
  background: #f8fafc;
  border-radius: 16px;
}

.section-variants {
  display: grid;
  gap: 8px;
}

.variants-title {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0;
}

.variant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.variant-pill {
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #ffffff;
  color: #0f172a;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
}
</style>
