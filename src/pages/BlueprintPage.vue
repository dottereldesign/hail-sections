<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Blueprint</h1>
        <p>Assemble sections into a shareable layout.</p>
      </div>
      <div class="header-actions">
        <button class="primary-button" type="button" @click="saveBlueprint">
          Save Blueprint
        </button>
        <button class="secondary-button" type="button" @click="clearBlueprint">
          Clear
        </button>
      </div>
    </header>

    <div v-if="items.length === 0" class="empty-state">
      <p>Your Blueprint is empty. Add sections from a category.</p>
      <RouterLink to="/" class="empty-link">Browse categories</RouterLink>
    </div>

    <div v-else class="blueprint-list">
      <article v-for="item in items" :key="item.instanceId" class="blueprint-card">
        <div class="card-header">
          <div>
            <p class="card-title">{{ getItemTitle(item) }}</p>
            <p class="card-subtitle">{{ getItemSubtitle(item) }}</p>
          </div>
          <div class="card-actions">
            <button class="chip" type="button" @click="moveUp(item.instanceId)">
              Up
            </button>
            <button class="chip" type="button" @click="moveDown(item.instanceId)">
              Down
            </button>
            <button class="chip danger" type="button" @click="remove(item.instanceId)">
              Remove
            </button>
          </div>
        </div>

        <div class="card-preview">
          <component
            v-if="getSection(item.sectionId)"
            :is="getSection(item.sectionId)?.component"
            v-bind="item.props"
          />
          <div v-else class="missing-card">
            <p>Missing section definition.</p>
            <button class="chip danger" type="button" @click="remove(item.instanceId)">
              Remove
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { blueprintStore } from "../lib/blueprintStore";
import { getSection } from "../lib/registry";

const router = useRouter();
const items = computed(() => blueprintStore.current.value.items);

const getItemTitle = (item: { sectionId: string }) => {
  const section = getSection(item.sectionId);
  return section ? section.name : "Unknown section";
};

const getItemSubtitle = (item: { sectionId: string; variantId: string }) => {
  const section = getSection(item.sectionId);
  const variant = section?.variants.find((entry) => entry.id === item.variantId);
  return variant ? `Variant: ${variant.label}` : "Variant: Unknown";
};

const remove = (instanceId: string) => blueprintStore.removeItem(instanceId);
const moveUp = (instanceId: string) => blueprintStore.moveItemUp(instanceId);
const moveDown = (instanceId: string) => blueprintStore.moveItemDown(instanceId);
const clearBlueprint = () => blueprintStore.clearBlueprint();

const saveBlueprint = () => {
  const name = window.prompt("Name this Blueprint");
  if (!name || !name.trim()) return;
  blueprintStore.saveCurrentBlueprint(name);
  router.push("/blueprints");
};
</script>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.page-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.page-header h1 {
  margin: 0 0 6px;
  font-size: 2rem;
}

.page-header p {
  margin: 0;
  color: #475569;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.primary-button,
.secondary-button {
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
}

.primary-button {
  background: #0f172a;
  color: #f8fafc;
}

.secondary-button {
  background: #e2e8f0;
  color: #0f172a;
}

.empty-state {
  padding: 32px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px dashed rgba(15, 23, 42, 0.2);
  display: grid;
  gap: 12px;
}

.empty-link {
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
}

.blueprint-list {
  display: grid;
  gap: 20px;
}

.blueprint-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 20px;
  display: grid;
  gap: 16px;
}

.card-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.card-subtitle {
  margin: 4px 0 0;
  color: #64748b;
}

.card-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  background: #f1f5f9;
  border: 1px solid transparent;
  color: #0f172a;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
}

.chip:hover {
  background: #e2e8f0;
}

.chip.danger {
  background: #fee2e2;
  color: #991b1b;
}

.card-preview {
  background: #f8fafc;
  border-radius: 16px;
  padding: 16px;
}

.missing-card {
  padding: 18px;
  border-radius: 12px;
  background: #fff7ed;
  color: #9a3412;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
</style>
