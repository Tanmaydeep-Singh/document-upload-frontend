import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/HomeView.vue";
import Upload from "../views/UploadView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
