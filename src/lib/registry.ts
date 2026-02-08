import type { CategoryDefinition, CategoryId, SectionDefinition, SectionId } from "./types";
import FooterPlaceholderSection from "../sections/footers/FooterPlaceholderSection";
import FooterCompactSection from "../sections/footers/FooterCompactSection";
import HeroPlaceholderSection from "../sections/heroes/HeroPlaceholderSection";
import NavbarPlaceholderSection from "../sections/navbars/NavbarPlaceholderSection";
import SocialLinksPlaceholderSection from "../sections/social-links/SocialLinksPlaceholderSection";
import { footerPlaceholderDefault } from "../sections/footers/FooterPlaceholderSection";
import { footerCompactDefault } from "../sections/footers/FooterCompactSection";
import { heroPlaceholderDefault } from "../sections/heroes/HeroPlaceholderSection";
import { navbarPlaceholderDefault } from "../sections/navbars/NavbarPlaceholderSection";
import { socialLinksPlaceholderDefault } from "../sections/social-links/SocialLinksPlaceholderSection";

export const categories: CategoryDefinition[] = [
  {
    id: "footers",
    name: "Footers",
    description: "Structured footer blocks with navigation and legal info."
  },
  {
    id: "heroes",
    name: "Heroes",
    description: "Large hero blocks with strong visual presence."
  },
  {
    id: "navbars",
    name: "Navbars",
    description: "Top navigation bars with branding, links, and actions."
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
    name: "Footer 1",
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
    name: "Footer 2",
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
    name: "Social Links 1",
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
  },
  {
    id: "hero-placeholder",
    name: "Hero 1",
    categoryId: "heroes",
    description: "Full-height hero with background image and bottom-left copy.",
    component: HeroPlaceholderSection,
    variants: [
      {
        id: "default",
        label: "Hero 1",
        fixture: heroPlaceholderDefault
      }
    ]
  },
  {
    id: "navbar-placeholder",
    name: "Navbar 1",
    categoryId: "navbars",
    description: "A simple navbar with a logo, links, and a primary CTA.",
    component: NavbarPlaceholderSection,
    variants: [
      {
        id: "default",
        label: "Navbar 1",
        fixture: navbarPlaceholderDefault
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
