<template>
  <section class="page" v-if="category">
    <div class="sections">
      <article
        v-for="section in sections"
        :key="section.id"
        class="section-card"
      >
        <p class="section-label">{{ section.name }}</p>

        <component
          :is="section.component"
          v-bind="getSelectedVariant(section).fixture"
          class="section-component"
        />

        <button
          class="add-button"
          :class="{ added: isAdded(section.id) }"
          type="button"
          @click="addToBlueprint(section)"
        >
          <span v-if="isAdded(section.id)" class="add-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" role="presentation">
              <path
                d="M6.2 11.3 2.9 8l1-1 2.3 2.3 5-5 1 1-6 6z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span v-else class="add-icon" aria-hidden="true">+</span>
          {{ isAdded(section.id) ? "Added" : "Add to Workspace" }}
        </button>
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
  category.value ? getSectionsByCategory(category.value.id) : [],
);

const selectedVariantIds = reactive<Record<string, string>>({});
const addedSectionIds = reactive<Record<string, boolean>>({});

const getSelectedVariant = (section: {
  id: string;
  variants: { id: string; fixture: Record<string, unknown> }[];
}) => {
  const fallback = section.variants[0];
  const selectedId = selectedVariantIds[section.id] ?? fallback.id;
  return (
    section.variants.find((variant) => variant.id === selectedId) ?? fallback
  );
};

const selectVariant = (sectionId: string, variantId: string) => {
  selectedVariantIds[sectionId] = variantId;
};

const addToBlueprint = (section: {
  id: string;
  variants: { id: string; fixture: Record<string, unknown> }[];
}) => {
  const variant = getSelectedVariant(section);
  blueprintStore.addItem(section.id, variant.id, variant.fixture);
  addedSectionIds[section.id] = true;
  window.setTimeout(() => {
    addedSectionIds[section.id] = false;
  }, 1200);
};

const isAdded = (sectionId: string) => Boolean(addedSectionIds[sectionId]);
</script>

<style scoped>
.page {
  display: grid;
  gap: 24px;
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
  border-radius: 0;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.section-label {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.7rem;
  color: #94a3b8;
}

.section-component {
  border-radius: 0 !important;
}

.add-button {
  border: none;
  background: var(--hail-green);
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.125rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-family: "Poppins", "PoppinsBlack", "PoppinsBold", sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
  width: max-content;
  height: 2.75rem;
}

.add-button:hover {
  background: #5f9526;
}

.add-button.added {
  background: #64b2ab;
  color: #fff;
}

.add-button.added:hover {
  background: #559c96;
}

.add-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  line-height: 1;
}

.add-icon svg {
  width: 16px;
  height: 16px;
}
</style>
