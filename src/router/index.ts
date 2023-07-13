import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/qa",
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "app-login" */ "@/views/Login.vue"),
    },

    // this page is sample page for layout
    {
      path: "/ui",
      name: "ui",
      component: () =>
        import(/* webpackChunkName: "app-ui" */ "@/views/UI.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/qa",
      name: "qa",
      component: () =>
        import(/* webpackChunkName: "app-qa" */ "@/views/QA.vue"),
      meta: { requiresAuth: true },
    },
    // translation
    {
      path: "/translation",
      name: "translation",
      component: () =>
        import(
          /* webpackChunkName: "app-translation" */ "@/views/Translation.vue"
        ),
      meta: { requiresAuth: true },
    },
    // chat
    {
      path: "/chat",
      redirect: '/chat/1' // 默认跳转到第一个chat
    },
    // chat :id
    {
      path: "/chat/:id",
      name: "chat-id",
      component: () =>
        import(/* webpackChunkName: "app-chat-id" */ "@/views/Chat.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();

//   if (to.meta.requiresAuth) {
//     if (authStore.isLoggedIn) {
//       next();
//     } else {
//       next({ name: "login" });
//     }
//   } else {
//     next();
//   }
// });

export default router;
