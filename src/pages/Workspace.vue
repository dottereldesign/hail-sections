<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Workspace</h1>
        <p>Assemble sections into a shareable layout.</p>
      </div>
      <div class="header-actions">
        <button class="secondary-button" type="button" @click="showFullscreen = true">
          Preview
        </button>
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
      <article
        v-for="item in items"
        :key="item.instanceId"
        class="blueprint-card"
        :class="{
          dragging: draggingId === item.instanceId,
          'drop-target': dropTargetId === item.instanceId
        }"
        draggable="true"
        @dragstart="onDragStart(item.instanceId, $event)"
        @dragend="onDragEnd"
        @dragover.prevent="onDragOver(item.instanceId)"
        @drop.prevent="onDrop(item.instanceId)"
      >
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

        <component
          v-if="getSection(item.sectionId)"
          :is="getSection(item.sectionId)?.component"
          v-bind="item.props"
          class="blueprint-component"
        />
        <div v-else class="missing-card">
          <p>Missing section definition.</p>
          <button class="chip danger" type="button" @click="remove(item.instanceId)">
            Remove
          </button>
        </div>
      </article>
    </div>

    <div v-if="showFullscreen" class="fullscreen-overlay" role="dialog" aria-modal="true">
      <div class="fullscreen-content">
        <article v-for="item in items" :key="item.instanceId" class="fullscreen-item">
          <component
            v-if="getSection(item.sectionId)"
            :is="getSection(item.sectionId)?.component"
            v-bind="item.props"
            class="blueprint-component"
          />
          <div v-else class="missing-card">
            <p>Missing section definition.</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { blueprintStore } from "../lib/blueprintStore";
import { getSection } from "../lib/registry";

const router = useRouter();
const items = computed(() => blueprintStore.current.value.items);
const showFullscreen = ref(false);
const draggingId = ref<string | null>(null);
const dropTargetId = ref<string | null>(null);

const remove = (instanceId: string) => blueprintStore.removeItem(instanceId);
const moveUp = (instanceId: string) => blueprintStore.moveItemUp(instanceId);
const moveDown = (instanceId: string) => blueprintStore.moveItemDown(instanceId);
const moveTo = (instanceId: string, targetIndex: number) =>
  blueprintStore.moveItemToIndex(instanceId, targetIndex);
const clearBlueprint = () => blueprintStore.clearBlueprint();

const saveBlueprint = () => {
  const name = window.prompt("Name this Blueprint");
  if (!name || !name.trim()) return;
  blueprintStore.saveCurrentBlueprint(name);
  router.push("/blueprints");
};

const exitOnEscape = (event: KeyboardEvent) => {
  if (event.key !== "Escape") return;
  showFullscreen.value = false;
};

const onDragStart = (instanceId: string, event: DragEvent) => {
  draggingId.value = instanceId;
  dropTargetId.value = instanceId;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", instanceId);
  }
};

const onDragOver = (instanceId: string) => {
  dropTargetId.value = instanceId;
};

const onDrop = (targetId: string) => {
  if (!draggingId.value) return;
  const dragIndex = items.value.findIndex((item) => item.instanceId === draggingId.value);
  const targetIndex = items.value.findIndex((item) => item.instanceId === targetId);
  if (dragIndex === -1 || targetIndex === -1 || dragIndex === targetIndex) {
    draggingId.value = null;
    dropTargetId.value = null;
    return;
  }
  moveTo(draggingId.value, targetIndex);
  draggingId.value = null;
  dropTargetId.value = null;
};

const onDragEnd = () => {
  draggingId.value = null;
  dropTargetId.value = null;
};

onMounted(() => {
  window.addEventListener("keydown", exitOnEscape);
});

onUnmounted(() => {
  window.removeEventListener("keydown", exitOnEscape);
});
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
  gap: 0;
}

.blueprint-card {
  position: relative;
  display: grid;
  gap: 10px;
  border: 1px solid transparent;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.blueprint-card:hover {
  border-color: var(--hail-green);
  box-shadow: 0 0 0 1px var(--hail-green);
}

.blueprint-card.dragging {
  opacity: 0.6;
  cursor: grabbing;
}

.blueprint-card.drop-target {
  border-color: var(--hail-green);
  box-shadow: 0 0 0 2px rgba(114, 175, 46, 0.35);
}

.card-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  z-index: 3;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.blueprint-card:hover .card-actions {
  opacity: 1;
  pointer-events: auto;
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

.blueprint-component {
  border-radius: 0 !important;
  position: relative;
  z-index: 1;
}

.fullscreen-overlay {
  position: fixed;
  inset: 0;
  background: #ffffff;
  z-index: 50;
  display: grid;
}

.fullscreen-content {
  overflow: auto;
  display: grid;
}

.fullscreen-item {
  display: block;
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
