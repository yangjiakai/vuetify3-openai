import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useSpokenStore } from "@/stores/spokenStore";
import { useChatHistoryStore } from "@/stores/chatHistoryStore";

export const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/chat",
    component: () => import("@/layout/Layout.vue"),
    children: [
      // GPT
      {
        path: "/chat",
        children: [
          {
            path: "", // 空路径，对应父路由的默认子路由
            redirect: "chat/1", // 跳转到第一个子路由
          },
          {
            path: ":id",
            name: "chat-id",
            component: () => import("@/views/Chat.vue"),
            meta: { requiresAuth: true },
          },
        ],
      },


      // 创作中心
      {
        path: "/creator",
        name: "creator",
        component: () => import("@/views/CreatorPage.vue"),
        meta: { requiresAuth: true },
      },

      // 咨询顾问
      {
        path: "/consultant",
        name: "consultant",
        component: () => import("@/views/ConsultantPage.vue"),
        meta: { requiresAuth: true },
      },

      // 口语交流
      {
        path: "/spoken",
        name: "spoken",
        component: () => import("@/views/spoken/SpokenPage.vue"),
        children: [
          {
            path: "", // 空路径，对应父路由的默认子路由
            redirect: "spoken/1", // 跳转到第一个子路由
          },
          // {
          //   path: "home",
          //   name: "spoken-home",
          //   component: () => import("@/views/spoken/SpokenHome.vue"),
          // },
          {
            path: ":id",
            component: () => import("@/views/spoken/SpokenChat.vue"),
          },
        ],
        meta: { requiresAut: true },
      },

      // 语句收藏
      {
        path: "/collection",
        name: "collection",
        component: () => import("@/views/collection/CollectionPage.vue"),
        meta: { requiresAuth: true },
      },

      // this page is sample page for layout
      {
        path: "/ui",
        name: "ui",
        component: () => import("@/views/UI.vue"),
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
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },

  // register
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

// 在跳转前进行检查
router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 如果没有登录，将用户重定向到登录页面
    if (!store.token) {
      next({
        path: "/login",
      });
    } else {
      saveLastPageId(to, from);
      // 如果已经登录，正常进行导航
      next();
    }
  } else {
    // 如果不需要验证，正常进行导航
    next();
  }
});

const saveLastPageId = (to: any, from: any) => {
  const spokenStore = useSpokenStore();
  const chatHistoryStore = useChatHistoryStore();
  const fromPath = from.path;
  const toPath = to.path;
  // 如果从spoken页面跳转到其他页面，记录最后的spoken页面id
  if (fromPath.startsWith("/spoken/") && !toPath.startsWith("/spoken/")) {
    const spokenId = from.params.id;
    spokenStore.lastPageId = spokenId;

    // 如果从chat页面跳转到其他页面，记录最后的chat页面id
  } else if (fromPath.startsWith("/chat/") && !toPath.startsWith("/chat/")) {
    const chatId = from.params.id;
    chatHistoryStore.updateLastPageId(chatId);
  } else {
  }
};

export default router;
