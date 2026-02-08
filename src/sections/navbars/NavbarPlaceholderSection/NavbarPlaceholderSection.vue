<template>
  <nav class="navbar-card">
    <div class="navbar-brand">
      <div class="brand-mark"></div>
      <span>{{ brand }}</span>
    </div>
    <div class="navbar-links">
      <a v-for="link in links" :key="link.label" :href="link.href">
        {{ link.label }}
      </a>
    </div>
    <a class="navbar-cta" :href="ctaHref">{{ ctaLabel }}</a>
  </nav>
</template>

<script setup lang="ts">
import type { NavbarPlaceholderProps } from "./types";

const props = defineProps<NavbarPlaceholderProps>();
const { brand, links, ctaLabel, ctaHref } = props;
</script>

<style scoped>
.navbar-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 18px;
  padding: 16px 20px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 18px 30px rgba(15, 23, 42, 0.08);
}

.navbar-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: #0f172a;
}

.brand-mark {
  width: 28px;
  height: 28px;
  border-radius: 10px;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
}

.navbar-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  color: #475569;
}

.navbar-links a {
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  font-size: 0.95rem;
}

.navbar-links a:hover {
  color: #0f172a;
}

.navbar-cta {
  text-decoration: none;
  background: #0f172a;
  color: #f8fafc;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
