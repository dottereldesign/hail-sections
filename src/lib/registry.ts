import type { CategoryDefinition, CategoryId, SectionDefinition, SectionId } from "./types";
import FooterPlaceholderSection from "../sections/footers/FooterPlaceholderSection";
import FooterCompactSection from "../sections/footers/FooterCompactSection";
import SocialLinksPlaceholderSection from "../sections/social-links/SocialLinksPlaceholderSection";
import { footerPlaceholderDefault } from "../sections/footers/FooterPlaceholderSection";
import { footerCompactDefault } from "../sections/footers/FooterCompactSection";
import { socialLinksPlaceholderDefault } from "../sections/social-links/SocialLinksPlaceholderSection";

export const categories: CategoryDefinition[] = [
  {
    id: "footers",
    name: "Footers",
    description: "Structured footer blocks with navigation and legal info."
  },
  {
    id: "social-links",
    name: "Social Links",
    description: "Horizontal link groups for social profiles and channels."
  }
];

export const sections: SectionDefinition[] = [
  {
    id: "footer-placeholder",
    name: "Footer Placeholder",
    categoryId: "footers",
    description: "A three-column footer with legal copy and brand attribution.",
    component: FooterPlaceholderSection,
    variants: [
      {
        id: "default",
        label: "Default",
        fixture: footerPlaceholderDefault
      }
    ]
  },
  {
    id: "footer-compact",
    name: "Footer Compact",
    categoryId: "footers",
    description: "A single-row footer with quick links and a short tagline.",
    component: FooterCompactSection,
    variants: [
      {
        id: "default",
        label: "Default",
        fixture: footerCompactDefault
      }
    ]
  },
  {
    id: "social-links-placeholder",
    name: "Social Links Placeholder",
    categoryId: "social-links",
    description: "Pill-style social links for common platforms.",
    component: SocialLinksPlaceholderSection,
    variants: [
      {
        id: "default",
        label: "Default",
        fixture: socialLinksPlaceholderDefault
      }
    ]
  }
];

export const getCategory = (id: CategoryId) =>
  categories.find((category) => category.id === id) ?? null;

export const getSection = (id: SectionId) =>
  sections.find((section) => section.id === id) ?? null;

export const getSectionsByCategory = (id: CategoryId) =>
  sections.filter((section) => section.categoryId === id);
