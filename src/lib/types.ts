import type { Component } from "vue";

export type CategoryId = "footers" | "heroes" | "navbars" | "social-links";
export type SectionId = string;

export type SectionVariant = {
  id: string;
  label: string;
  fixture: Record<string, unknown>;
};

export type SectionDefinition = {
  id: SectionId;
  name: string;
  categoryId: CategoryId;
  description: string;
  component: Component;
  variants: SectionVariant[];
};

export type CategoryDefinition = {
  id: CategoryId;
  name: string;
  description: string;
};
