<template>
  <section class="page">
    <h1>Page not found</h1>
    <p>The category you're looking for doesn't exist yet.</p>
    <RouterLink to="/" class="home-link">Back to home</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.page {
  display: grid;
  gap: 12px;
  text-align: left;
}

h1 {
  margin: 0;
  font-size: 2rem;
}

p {
  margin: 0;
  color: #475569;
}

.home-link {
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
}
</style>
