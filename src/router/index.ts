import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

export const routes = [
  {
    path: '/',
    name: "Home",
    redirect: "/chat",
    component: () =>
      import("@/layout/Layout.vue"),
    children: [
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
      // this page is sample page for layout
      {
        path: "/ui",
        name: "ui",
        component: () =>
          import("@/views/UI.vue"),
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

    ],
    meta: { requiresAuth: true },
  },



  // login
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },

  // register
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

// 在跳转前进行检查
router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果没有登录，将用户重定向到登录页面
    if (!store.token) {
      next({
        path: '/login',
      })
    } else {
      // 如果已经登录，正常进行导航
      next()
    }
  } else {
    // 如果不需要验证，正常进行导航
    next()
  }
})


export default router;
