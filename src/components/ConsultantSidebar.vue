<!--
* @Component: SubNav
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
import { useChatHistoryStore } from "@/stores/chatHistoryStore";
const chatHistoryStore = useChatHistoryStore();
const router = useRouter();
const customizeTheme = useCustomizeThemeStore();

const chatMenus = computed(() => {
  return chatHistoryStore.chatList.map((chat) => {
    return {
      id: chat.id,
      title: chat.title,
      icon: "mdi-chat",
      isMenuEdit: chat.isMenuEdit,
      idMenuDeleteConfirm: chat.idMenuDeleteConfirm,
      url: "/chat/" + chat.id,
    };
  });
});

const menus = [
  {
    id: 1,
    title: "学习顾问",
    icon: "mdi-chat",
    url: "/consultant/1",
  },
  {
    id: 2,
    title: "医疗顾问",
    icon: "mdi-chat",
    url: "/consultant/2",
  },
  // 法律顾问
  {
    id: 3,
    title: "法律顾问",
    icon: "mdi-chat",
    url: "/consultant/3",
  },
  // 财务顾问
  {
    id: 4,
    title: "财务顾问",
    icon: "mdi-chat",
    url: "/consultant/4",
  },
  // 移民顾问
  {
    id: 5,
    title: "职业顾问",
    icon: "mdi-chat",
    url: "/consultant/5",
  },
  // 心理医生
  {
    id: 6,
    title: "心理医生",
    icon: "mdi-chat",
    url: "/consultant/6",
  },
];

const navigateTo = (id) => {
  chatHistoryStore.activeChatMenuId = id;
  router.push(`/chat/${id}`);
};
</script>

<template>
  <v-navigation-drawer v-model="customizeTheme.subSidebar" theme="dark">
    <!-- ---------------------------------------------- -->
    <!---Nav List -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnav">
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="chatMenu in menus"
          class="pl-5"
          :key="chatMenu.id"
          :prepend-icon="chatMenu.icon"
          :to="chatMenu.url"
          @click="navigateTo(chatMenu.id)"
          active-class="active-nav"
          density="compact"
          rounded="xl"
        >
          <template v-slot:prepend>
            <v-icon size="16"></v-icon>
          </template>

          <v-list-item-title> {{ chatMenu.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.scrollnav {
  height: calc(100vh - 300px);
}

// .active-nav {
//   border-left: 5px solid;
//   border-image-slice: 1;
//   border-image-source: linear-gradient(to bottom, #586ff5, #d53a9d);
//   color: #705cf6;
// }

.active-nav {
  position: relative;
}

.active-nav::before {
  content: "";
  position: absolute;
  top: 0;
  left: -8px;
  width: 4px;
  height: 100%;
  background: linear-gradient(
    180deg,
    #ff76df -18.75%,
    #9058ff 52.78%,
    #00cdfa 120.67%
  );
  border-radius: 0px 3px 3px 0px;
  transition: opacity 0.3s;
}
</style>
