export type BlueprintItem = {
  instanceId: string;
  sectionId: string;
  variantId: string;
  props: Record<string, unknown>;
};

export type BlueprintState = {
  items: BlueprintItem[];
  updatedAt: string;
};

export type SavedBlueprint = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: BlueprintItem[];
};
