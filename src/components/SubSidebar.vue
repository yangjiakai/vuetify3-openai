<!--
* @Component: SubNav
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
import ApiKeyDialog from "./ApiKeyDialog.vue";
import { useChatHistoryStore } from "@/stores/chatHistoryStore";
const chatHistoryStore = useChatHistoryStore();
const router = useRouter();
const keyDialog = ref(false);

const route = useRoute();
const customizeTheme = useCustomizeThemeStore();
const channels = ref([
  {
    id: 1,
    title: "qa",
    icon: "mdi-forum",
    url: "/qa",
  },
  {
    id: 2,
    title: "modelList",
    icon: "mdi-text-box-check-outline",
    url: "/modelList",
  },
  {
    id: 3,
    title: "translation",
    icon: "mdi-translate",
    url: "/translation",
  },
  {
    id: 4,
    title: "explainCode",
    icon: "mdi-code-less-than-or-equal",
    url: "/explainCode",
  },
  {
    id: 5,
    title: "sqlTranslate",
    icon: "mdi-database-search",
    url: "/sqlTranslate",
  },
]);

const chatMenus = computed(() => {
  return chatHistoryStore.chatList.map((chat) => {
    return {
      id: chat.id,
      title: chat.title,
      icon: "mdi-chat",
      isMenuEdit: chat.isMenuEdit,
      url: "/chat/" + chat.id,
    };
  });
});

const navigateTo = (id) => {
  chatHistoryStore.activeChatMenuId = id;
  router.push(`/chat/${id}`);
};

const handleEdit = (id) => {
  chatHistoryStore.updateMenu(id);
};

const handleDelete = (id) => {
  chatHistoryStore.deleteMenu(id);
};

const editConfirm = (id) => {
  chatHistoryStore.updateMenu(id);
};

const editCancel = (id) => {
  chatHistoryStore.updateMenu(id);
};

const editTile = ref(chatHistoryStore.getChatActive.title);

watch(
  () => chatHistoryStore.activeChatMenuId,
  (newVal) => {
    editTile.value = newVal;
  }
);
</script>

<template>
  <v-navigation-drawer v-model="customizeTheme.subSidebar" theme="dark">
    <!-- ---------------------------------------------- -->
    <!---Nav List -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnav">
      <v-divider></v-divider>
      <v-list nav>
        <v-btn
          color="#705CF6"
          block
          size="large"
          class="mb-3 text-white"
          rounded="md"
          @click="chatHistoryStore.addChat(Date.now())"
        >
          <template v-slot:prepend>
            <v-icon>mdi-plus-circle</v-icon>
          </template>
          New Chat</v-btn
        >

        <v-list-item
          v-for="chatMenu in chatMenus"
          class="pl-5"
          :key="chatMenu.id"
          :prepend-icon="chatMenu.icon"
          :to="chatMenu.url"
          :active="chatMenu.id === chatHistoryStore.activeChatMenuId"
          @click="navigateTo(chatMenu.id)"
          active-class="active-nav"
          active-color="!important"
          density="compact"
          rounded="xl"
        >
          <v-list-item-title v-if="chatMenu.isMenuEdit">
            <input type="text" style="width: 100px" v-modol="editTile" />
          </v-list-item-title>
          <v-list-item-title v-else> {{ chatMenu.title }}</v-list-item-title>
          <template v-slot:append>
            <div
              v-if="
                chatMenu.id === chatHistoryStore.activeChatMenuId &&
                !chatMenu.isMenuEdit
              "
            >
              <v-btn
                color="grey-lighten-1"
                variant="text"
                @click="handleEdit(chatMenu.id)"
                size="20"
              >
                <template v-slot:prepend>
                  <v-icon size="18">mdi-file-edit-outline</v-icon>
                </template>
              </v-btn>
              <v-btn
                color="grey-lighten-1"
                variant="text"
                @click="handleDelete(menu.id)"
                size="20"
              >
                <template v-slot:prepend>
                  <v-icon size="18">mdi-delete-outline</v-icon>
                </template>
              </v-btn>
            </div>
            <div
              v-else-if="
                chatMenu.id === chatHistoryStore.activeChatMenuId &&
                chatMenu.isMenuEdit
              "
            >
              <v-btn
                color="grey-lighten-1"
                variant="text"
                @click="editConfirm(menu.id)"
                size="20"
              >
                <template v-slot:prepend>
                  <v-icon size="18">mdi-check</v-icon>
                </template>
              </v-btn>
              <v-btn
                color="grey-lighten-1"
                variant="text"
                @click="editCancel(chatMenu.id)"
                size="20"
              >
                <template v-slot:prepend>
                  <v-icon size="18">mdi-close</v-icon>
                </template>
              </v-btn>
            </div>
          </template>
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
