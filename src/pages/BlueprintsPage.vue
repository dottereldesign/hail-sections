<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Saved Blueprints</h1>
        <p>Manage named blueprint compositions.</p>
      </div>
    </header>

    <div v-if="saved.length === 0" class="empty-state">
      <p>No saved blueprints yet. Save one from the Workspace page.</p>
      <RouterLink to="/workspace" class="empty-link">Go to Workspace</RouterLink>
    </div>

    <div v-else class="blueprint-grid">
      <article v-for="item in saved" :key="item.id" class="saved-card">
        <div>
          <h2>{{ item.name }}</h2>
          <p>Updated {{ formatDate(item.updatedAt) }}</p>
        </div>
        <div class="card-actions">
          <button class="chip" type="button" @click="load(item.id)">Load</button>
          <button class="chip" type="button" @click="rename(item.id)">
            Rename
          </button>
          <button class="chip" type="button" @click="duplicate(item.id)">
            Duplicate
          </button>
          <button class="chip danger" type="button" @click="remove(item.id)">
            Delete
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { blueprintStore } from "../lib/blueprintStore";

const router = useRouter();
const saved = computed(() => blueprintStore.saved.value);

const formatDate = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const load = (id: string) => {
  blueprintStore.loadSavedBlueprintIntoCurrent(id);
  router.push("/workspace");
};

const rename = (id: string) => {
  const name = window.prompt("Rename this Blueprint");
  if (!name || !name.trim()) return;
  blueprintStore.renameSavedBlueprint(id, name);
};

const duplicate = (id: string) => {
  blueprintStore.duplicateSavedBlueprint(id);
};

const remove = (id: string) => {
  if (!window.confirm("Delete this saved Blueprint?")) return;
  blueprintStore.deleteSavedBlueprint(id);
};
</script>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.page-header h1 {
  margin: 0 0 6px;
  font-size: 2rem;
}

.page-header p {
  margin: 0;
  color: #475569;
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

.blueprint-grid {
  display: grid;
  gap: 16px;
}

.saved-card {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 20px;
  align-items: center;
}

.saved-card h2 {
  margin: 0 0 6px;
  font-size: 1.2rem;
}

.saved-card p {
  margin: 0;
  color: #64748b;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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
</style>
