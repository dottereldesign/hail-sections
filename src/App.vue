<template>
  <div class="app-shell">
    <header class="app-header">
      <div>
        <p class="header-eyebrow">Component Gallery</p>
        <h1 class="header-title">Sections Library</h1>
      </div>
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
        <p class="sidebar-title">Blueprint</p>
        <nav class="sidebar-nav">
          <RouterLink class="sidebar-link" to="/blueprint">Blueprint</RouterLink>
          <RouterLink class="sidebar-link" to="/blueprints">Saved Blueprints</RouterLink>
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
