import { computed, reactive, toRaw } from "vue";
import type { BlueprintItem, BlueprintState, SavedBlueprint } from "./blueprintTypes";

const CURRENT_KEY = "sectionsLibrary.blueprint.current";
const SAVED_KEY = "sectionsLibrary.blueprints.saved";

const nowIso = () => new Date().toISOString();

const cloneProps = (value: Record<string, unknown>) => {
  const raw = toRaw(value);
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(raw) as Record<string, unknown>;
    } catch {
      return JSON.parse(JSON.stringify(raw)) as Record<string, unknown>;
    }
  }
  return JSON.parse(JSON.stringify(raw)) as Record<string, unknown>;
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `bp-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
};

const defaultCurrentState: BlueprintState = {
  items: [],
  updatedAt: nowIso()
};

const loadCurrent = (): BlueprintState => {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    if (!raw) return { ...defaultCurrentState };
    const parsed = JSON.parse(raw) as BlueprintState;
    if (!parsed || !Array.isArray(parsed.items) || typeof parsed.updatedAt !== "string") {
      return { ...defaultCurrentState };
    }
    return parsed;
  } catch {
    return { ...defaultCurrentState };
  }
};

const loadSaved = (): SavedBlueprint[] => {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedBlueprint[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => Boolean(item && item.id && item.name && item.items));
  } catch {
    return [];
  }
};

const persistCurrent = (state: BlueprintState) => {
  localStorage.setItem(CURRENT_KEY, JSON.stringify(state));
};

const persistSaved = (saved: SavedBlueprint[]) => {
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
};

const state = reactive({
  current: loadCurrent(),
  saved: loadSaved()
});

const updateCurrent = (items: BlueprintItem[]) => {
  state.current = {
    items,
    updatedAt: nowIso()
  };
  persistCurrent(state.current);
};

const updateSaved = (saved: SavedBlueprint[]) => {
  state.saved = saved;
  persistSaved(state.saved);
};

export const blueprintStore = {
  current: computed(() => state.current),
  saved: computed(() => state.saved),

  addItem(sectionId: string, variantId: string, props: Record<string, unknown>) {
    const nextItems = [
      ...state.current.items,
      {
        instanceId: createId(),
        sectionId,
        variantId,
        props: cloneProps(props)
      }
    ];
    updateCurrent(nextItems);
  },

  removeItem(instanceId: string) {
    updateCurrent(state.current.items.filter((item) => item.instanceId !== instanceId));
  },

  moveItemUp(instanceId: string) {
    const index = state.current.items.findIndex((item) => item.instanceId === instanceId);
    if (index <= 0) return;
    const next = [...state.current.items];
    const [item] = next.splice(index, 1);
    next.splice(index - 1, 0, item);
    updateCurrent(next);
  },

  moveItemDown(instanceId: string) {
    const index = state.current.items.findIndex((item) => item.instanceId === instanceId);
    if (index === -1 || index >= state.current.items.length - 1) return;
    const next = [...state.current.items];
    const [item] = next.splice(index, 1);
    next.splice(index + 1, 0, item);
    updateCurrent(next);
  },

  clearBlueprint() {
    updateCurrent([]);
  },

  loadBlueprintItems(items: BlueprintItem[]) {
    const nextItems = items.map((item) => ({
      ...item,
      instanceId: item.instanceId || createId(),
      props: cloneProps(item.props ?? {})
    }));
    updateCurrent(nextItems);
  },

  saveCurrentBlueprint(name: string): SavedBlueprint {
    const trimmed = name.trim();
    const timestamp = nowIso();
    const saved: SavedBlueprint = {
      id: createId(),
      name: trimmed,
      createdAt: timestamp,
      updatedAt: timestamp,
      items: state.current.items.map((item) => ({
        ...item,
        instanceId: createId(),
        props: cloneProps(item.props)
      }))
    };
    updateSaved([saved, ...state.saved]);
    return saved;
  },

  deleteSavedBlueprint(id: string) {
    updateSaved(state.saved.filter((item) => item.id !== id));
  },

  renameSavedBlueprint(id: string, name: string) {
    const trimmed = name.trim();
    updateSaved(
      state.saved.map((item) =>
        item.id === id
          ? { ...item, name: trimmed, updatedAt: nowIso() }
          : item
      )
    );
  },

  duplicateSavedBlueprint(id: string) {
    const existing = state.saved.find((item) => item.id === id);
    if (!existing) return;
    const timestamp = nowIso();
    const copy: SavedBlueprint = {
      id: createId(),
      name: `${existing.name} Copy`,
      createdAt: timestamp,
      updatedAt: timestamp,
      items: existing.items.map((item) => ({
        ...item,
        instanceId: createId(),
        props: cloneProps(item.props)
      }))
    };
    updateSaved([copy, ...state.saved]);
  },

  loadSavedBlueprintIntoCurrent(id: string) {
    const existing = state.saved.find((item) => item.id === id);
    if (!existing) return;
    blueprintStore.loadBlueprintItems(existing.items);
  }
};
