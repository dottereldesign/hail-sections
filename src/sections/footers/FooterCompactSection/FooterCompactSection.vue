<template>
  <footer class="footer-compact">
    <div class="footer-main">
      <div>
        <p class="footer-label">Compact Footer</p>
        <p class="footer-org">{{ orgName }}</p>
        <p class="footer-tagline">{{ tagline }}</p>
      </div>
      <nav class="footer-links">
        <a v-for="link in links" :key="link.label" :href="link.href">
          {{ link.label }}
        </a>
      </nav>
    </div>
    <div class="footer-bottom">
      <span>© {{ year }} {{ orgName }}</span>
      <span>{{ legalText }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { FooterCompactProps } from "./types";

const props = defineProps<FooterCompactProps>();
const year = new Date().getFullYear();
const { orgName, tagline, links, legalText } = props;
</script>

<style scoped>
.footer-compact {
  background: #ffffff;
  border-radius: 18px;
  padding: 24px;
  display: grid;
  gap: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 18px 30px rgba(15, 23, 42, 0.08);
}

.footer-main {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  align-items: center;
  justify-content: space-between;
}

.footer-label {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.7rem;
  color: #94a3b8;
  margin: 0 0 6px;
}

.footer-org {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
}

.footer-tagline {
  margin: 6px 0 0;
  color: #475569;
  font-size: 0.95rem;
}

.footer-links {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.footer-links a {
  text-decoration: none;
  color: #0f172a;
  font-weight: 600;
  font-size: 0.9rem;
}

.footer-links a:hover {
  color: #2563eb;
}

.footer-bottom {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  padding-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  color: #64748b;
  font-size: 0.85rem;
}
</style>
