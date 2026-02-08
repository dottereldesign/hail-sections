import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import CategoryPage from "./pages/CategoryPage.vue";
import WorkspacePage from "./pages/Workspace.vue";
import BlueprintsPage from "./pages/BlueprintsPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import { getCategory } from "./lib/registry";
import type { CategoryId } from "./lib/types";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/category/:categoryId",
      name: "category",
      component: CategoryPage,
      beforeEnter: (to) => {
        const categoryId = to.params.categoryId as CategoryId;
        return getCategory(categoryId) ? true : { name: "not-found" };
      }
    },
    {
      path: "/workspace",
      name: "workspace",
      component: WorkspacePage
    },
    {
      path: "/blueprints",
      name: "blueprints",
      component: BlueprintsPage
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundPage
    }
  ]
});

export default router;
