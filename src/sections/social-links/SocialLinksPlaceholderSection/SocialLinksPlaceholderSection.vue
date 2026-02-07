<template>
  <div class="social-card">
    <p class="social-heading">{{ heading }}</p>
    <div class="social-links">
      <a
        v-for="link in links"
        :key="link.platform"
        :href="link.href"
        class="social-pill"
      >
        <span class="social-icon">{{ platformIcon(link.platform) }}</span>
        <span class="social-label">{{ platformLabel(link.platform) }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SocialLinksPlaceholderProps, SocialPlatform } from "./types";

const props = defineProps<SocialLinksPlaceholderProps>();
const { heading, links } = props;

const platformLabel = (platform: SocialPlatform) => {
  const labels: Record<SocialPlatform, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    x: "X",
    linkedin: "LinkedIn",
    youtube: "YouTube"
  };

  return labels[platform];
};

const platformIcon = (platform: SocialPlatform) => {
  const icons: Record<SocialPlatform, string> = {
    facebook: "F",
    instagram: "IG",
    x: "X",
    linkedin: "in",
    youtube: "YT"
  };

  return icons[platform];
};
</script>

<style scoped>
.social-card {
  background: #fff;
  border-radius: 18px;
  padding: 24px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.1);
  display: grid;
  gap: 18px;
}

.social-heading {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #0f172a;
  text-decoration: none;
  font-size: 0.9rem;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.social-pill:hover {
  background: #e2e8f0;
  border-color: rgba(15, 23, 42, 0.15);
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #0f172a;
  color: #fff;
  font-size: 0.7rem;
  letter-spacing: 0.02em;
}
</style>
