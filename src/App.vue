<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="header-brand">
        <RouterLink class="brand-link" to="/">
          <h1 class="header-title">
            <span class="brand-hail">Hail</span>
            <span class="brand-builder">Block Builder</span>
          </h1>
        </RouterLink>
      </div>
      <nav class="header-nav" aria-label="Workspace">
        <RouterLink class="header-link" to="/workspace">Workspace</RouterLink>
        <RouterLink class="header-link" to="/blueprints">Saved Blueprints</RouterLink>
      </nav>
      <div class="header-spacer" aria-hidden="true"></div>
    </header>

    <div class="app-body">
      <aside class="app-sidebar">
        <p class="sidebar-title">Categories</p>
        <nav class="sidebar-nav">
          <RouterLink
            v-for="category in categories"
            :key="category.id"
            class="sidebar-link"
            :to="`/category/${category.id}`"
          >
            {{ category.name }}
          </RouterLink>
        </nav>
      </aside>

      <main class="app-main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { categories } from "./lib/registry";
</script>
