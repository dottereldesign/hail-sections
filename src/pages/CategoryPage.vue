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
          <component
            :is="section.component"
            v-bind="getSelectedVariant(section).fixture"
          />
        </div>

        <div class="section-variants">
          <div class="variants-header">
            <p class="variants-title">Variants</p>
            <button class="add-button" type="button" @click="addToBlueprint(section)">
              Add to Blueprint
            </button>
          </div>
          <div class="variant-list">
            <button
              v-for="variant in section.variants"
              :key="variant.id"
              class="variant-pill"
              :class="{ active: variant.id === getSelectedVariant(section).id }"
              type="button"
              title="Variant switching coming soon"
              @click="selectVariant(section.id, variant.id)"
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
import { computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { getCategory, getSectionsByCategory } from "../lib/registry";
import type { CategoryId } from "../lib/types";
import { blueprintStore } from "../lib/blueprintStore";

const route = useRoute();
const categoryId = computed(() => route.params.categoryId as CategoryId);
const category = computed(() => getCategory(categoryId.value));
const sections = computed(() =>
  category.value ? getSectionsByCategory(category.value.id) : []
);

const selectedVariantIds = reactive<Record<string, string>>({});

const getSelectedVariant = (section: { id: string; variants: { id: string; fixture: Record<string, unknown> }[] }) => {
  const fallback = section.variants[0];
  const selectedId = selectedVariantIds[section.id] ?? fallback.id;
  return section.variants.find((variant) => variant.id === selectedId) ?? fallback;
};

const selectVariant = (sectionId: string, variantId: string) => {
  selectedVariantIds[sectionId] = variantId;
};

const addToBlueprint = (section: { id: string; variants: { id: string; fixture: Record<string, unknown> }[] }) => {
  const variant = getSelectedVariant(section);
  blueprintStore.addItem(section.id, variant.id, variant.fixture);
};
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

.variants-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.variants-title {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0;
}

.add-button {
  border: none;
  background: #0f172a;
  color: #f8fafc;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.add-button:hover {
  background: #1e293b;
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

.variant-pill.active {
  background: #0f172a;
  color: #f8fafc;
  border-color: #0f172a;
}
</style>
