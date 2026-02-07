<template>
  <section class="page">
    <div class="page-header">
      <h1>Pick a category</h1>
      <p>Browse the starter components in the Sections Library.</p>
    </div>
    <div class="card-grid">
      <RouterLink
        v-for="category in categories"
        :key="category.id"
        class="category-card"
        :to="`/category/${category.id}`"
      >
        <h2>{{ category.name }}</h2>
        <p>{{ category.description }}</p>
        <span class="card-cta">View sections</span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { categories } from "../lib/registry";
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
  font-size: 2rem;
  margin: 0;
}

.page-header p {
  margin: 0;
  color: #475569;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.category-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 30px rgba(15, 23, 42, 0.12);
}

.category-card h2 {
  margin: 0;
  font-size: 1.2rem;
}

.category-card p {
  margin: 0;
  color: #475569;
  line-height: 1.4;
}

.card-cta {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #0f172a;
}
</style>
