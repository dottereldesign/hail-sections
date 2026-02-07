<template>
  <footer class="footer-card">
    <div class="footer-top">
      <div class="footer-brand">
        <p class="footer-title">Footer Placeholder</p>
        <p class="footer-org">{{ orgName }}</p>
      </div>
      <div class="footer-columns">
        <div v-for="column in columns" :key="column.heading" class="footer-column">
          <p class="column-heading">{{ column.heading }}</p>
          <ul class="column-links">
            <li v-for="link in column.links" :key="link.label">
              <a class="footer-link" :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© {{ year }} {{ orgName }}.</span>
      <span>{{ legalText }}</span>
      <span>Created by {{ orgName }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { FooterPlaceholderProps } from "./types";

const props = defineProps<FooterPlaceholderProps>();
const year = new Date().getFullYear();
const { orgName, columns, legalText } = props;
</script>

<style scoped>
.footer-card {
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 18px;
  padding: 28px;
  display: grid;
  gap: 20px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25);
}

.footer-top {
  display: grid;
  gap: 24px;
}

.footer-brand {
  display: grid;
  gap: 6px;
}

.footer-title {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(226, 232, 240, 0.7);
}

.footer-org {
  font-size: 1.4rem;
  font-weight: 600;
}

.footer-columns {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.footer-column {
  display: grid;
  gap: 8px;
}

.column-heading {
  font-size: 0.95rem;
  font-weight: 600;
}

.column-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}

.footer-link {
  color: rgba(226, 232, 240, 0.75);
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-link:hover {
  color: #f8fafc;
}

.footer-bottom {
  border-top: 1px solid rgba(226, 232, 240, 0.15);
  padding-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  font-size: 0.85rem;
  color: rgba(226, 232, 240, 0.7);
}
</style>
