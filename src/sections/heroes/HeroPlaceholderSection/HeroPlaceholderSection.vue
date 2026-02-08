<template>
  <section class="hero" :style="{ backgroundImage: `url(${imageUrl})` }">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="hero-lead">{{ headingLead }}</p>
      <h1 class="hero-heading">{{ heading }}</h1>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroPlaceholderProps } from "./types";

const props = defineProps<HeroPlaceholderProps>();
const { headingLead, heading, imageUrl } = props;
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.6));
}

.hero-content {
  position: relative;
  padding: 32px;
  color: #f8fafc;
  z-index: 1;
}

.hero-lead {
  margin: 0 0 8px;
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-heading {
  margin: 0;
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 700;
}
</style>
