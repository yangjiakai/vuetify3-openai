import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/qa",
    },
    // this page is a sample page for api calling
    {
      path: "/unsplash",
      component: () =>
        import(
          /* webpackChunkName: "app-unsplash" */ "@/views/UnsplashApp.vue"
        ),
    },
    // this page is sample page for layout
    {
      path: "/ui",
      name: "ui",
      component: () =>
        import(/* webpackChunkName: "app-ui" */ "@/views/UI.vue"),
    },
    {
      path: "/qa",
      name: "qa",
      component: () =>
        import(/* webpackChunkName: "app-qa" */ "@/views/QA.vue"),
    },
    // translation
    {
      path: "/translation",
      name: "translation",
      component: () =>
        import(
          /* webpackChunkName: "app-translation" */ "@/views/Translation.vue"
        ),
    },
    {
      path: "/modelList",
      name: "modelList",
      component: () =>
        import(/* webpackChunkName: "app-modelList" */ "@/views/ModelList.vue"),
    },
  ],
});

export default router;
