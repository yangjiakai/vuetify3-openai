<!--
* @Component: SubNav
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import { useChatHistoryStore } from "@/stores/chatHistoryStore";
const chatHistoryStore = useChatHistoryStore();
const router = useRouter();
const appStore = useAppStore();

const chatMenus = computed(() => {
  return chatHistoryStore.baseList.map((chat: Chat.Chat) => {
    return {
      chatId: chat.chatId,
      menuTitle: chat.menuConfig.menuTitle,
      icon: "mdi-robot-excited-outline",
      isMenuEdit: chat.menuConfig.isMenuEdit,
      isMenuDeleteConfirm: chat.menuConfig.isMenuDeleteConfirm,
      url: "/chat/" + chat.chatId,
    };
  });
});

const editTitle = ref(chatHistoryStore.activeChat?.menuConfig?.menuTitle);

const navigateTo = (id) => {
  chatHistoryStore.activeChatMenuId = id;
  router.push(`/chat/${id}`);
};

const refEditInput = ref();

// 切换编辑菜单视图
const handleEdit = (id) => {
  chatHistoryStore.updateMenuIsMenuEdit(id, true);
  nextTick(() => {
    refEditInput.value[0]?.focus();
  });
};

// 确认更新菜单标题
const editConfirm = (id) => {
  console.log("editConfirm");

  chatHistoryStore.updateMenuTitle(id, editTitle.value);
};

// 取消更新菜单标题
const editCancel = (id) => {
  chatHistoryStore.updateMenuIsMenuEdit(id, false);
};

// 切换确认删除视图
const handleDelete = (id) => {
  chatHistoryStore.updateMenuDeleteConfirm(id, true);
};

// 确认删除当前菜单
const deleteConfirm = (id) => {
  chatHistoryStore.deleteMenu(id);
};

// 取消更新菜单标题
const deleteCancel = (id) => {
  chatHistoryStore.updateMenuDeleteConfirm(id, false);
};

watch(
  () => chatHistoryStore.activeChat,
  (newVal) => {
    editTitle.value = newVal?.menuConfig?.menuTitle;
  }
);
</script>

<template>
  <v-navigation-drawer v-model="appStore.mainSidebar" width="240">
    <!-- ---------------------------------------------- -->
    <!---Nav List -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnav">
      <v-divider></v-divider>
      <v-list nav class="text-grey-darken-1" color="primary">
        <v-btn
          color="primary"
          block
          class="mb-3 text-white font-weight-bold"
          rounded="md"
          @click="chatHistoryStore.addChat(Date.now())"
        >
          <template v-slot:prepend>
            <v-icon>mdi-plus-circle</v-icon>
          </template>
          添加会话</v-btn
        >
        <transition-group name="slide-x" tag="div">
          <v-list-item
            v-for="chatMenu in chatMenus"
            class="pl-5 font-weight-bold"
            :key="chatMenu.chatId"
            :to="chatMenu.url"
            @click="navigateTo(chatMenu.chatId)"
            active-class="active-nav"
            density="compact"
            rounded="xl"
            @blur="editCancel(chatMenu.chatId)"
          >
            <template v-slot:prepend>
              <v-avatar size="avatarSize">
                <v-icon
                  :color="
                    chatMenu.chatId === chatHistoryStore.activeChatMenuId
                      ? 'primary'
                      : ''
                  "
                >
                  {{ chatMenu.icon }}
                </v-icon>
              </v-avatar>
            </template>
            <v-list-item-title v-if="chatMenu.isMenuEdit">
              <input
                class="custom-input"
                type="text"
                ref="refEditInput"
                autofocus
                v-model="editTitle"
                @keyup.enter="editConfirm(chatMenu.chatId)"
              />
            </v-list-item-title>
            <v-list-item-title v-else-if="chatMenu.isMenuDeleteConfirm">
              {{ `删除 "${chatMenu.menuTitle}"?` }}</v-list-item-title
            >
            <v-list-item-title class="font-weight-black" v-else>
              {{ chatMenu.menuTitle }}</v-list-item-title
            >
            <template v-slot:append>
              <!-- 普通状态 -->
              <div
                v-if="
                  chatMenu.chatId === chatHistoryStore.activeChatMenuId &&
                  !chatMenu.isMenuDeleteConfirm &&
                  !chatMenu.isMenuEdit
                "
                class="align-items-center d-flex"
              >
                <v-btn
                  color="grey-lighten-1"
                  variant="text"
                  @click="handleEdit(chatMenu.chatId)"
                  size="20"
                >
                  <template v-slot:prepend>
                    <v-icon size="18">mdi-file-edit-outline</v-icon>
                  </template>
                </v-btn>
                <v-btn
                  color="grey-lighten-1"
                  variant="text"
                  @click="handleDelete(chatMenu.chatId)"
                  size="20"
                >
                  <template v-slot:prepend>
                    <v-icon size="18">mdi-delete-outline</v-icon>
                  </template>
                </v-btn>
              </div>
              <!-- 编辑确认状态 -->
              <div
                v-else-if="
                  chatMenu.chatId === chatHistoryStore.activeChatMenuId &&
                  !chatMenu.isMenuDeleteConfirm &&
                  chatMenu.isMenuEdit
                "
                class="align-items-center d-flex"
              >
                <v-btn
                  color="grey-lighten-1"
                  variant="text"
                  @click="editConfirm(chatMenu.chatId)"
                  size="20"
                >
                  <template v-slot:prepend>
                    <v-icon size="18">mdi-check</v-icon>
                  </template>
                </v-btn>
                <v-btn
                  color="grey-lighten-1"
                  variant="text"
                  @click="editCancel(chatMenu.chatId)"
                  size="20"
                >
                  <template v-slot:prepend>
                    <v-icon size="18">mdi-close</v-icon>
                  </template>
                </v-btn>
              </div>
              <!--删除确认状态 -->
              <div
                v-else-if="
                  chatMenu.chatId === chatHistoryStore.activeChatMenuId &&
                  chatMenu.isMenuDeleteConfirm
                "
              >
                <v-btn
                  color="grey-lighten-1"
                  variant="text"
                  @click="deleteConfirm(chatMenu.chatId)"
                  size="20"
                >
                  <template v-slot:prepend>
                    <v-icon size="18">mdi-check</v-icon>
                  </template>
                </v-btn>
                <v-btn
                  color="grey-lighten-1"
                  variant="text"
                  @click="deleteCancel(chatMenu.chatId)"
                  size="20"
                >
                  <template v-slot:prepend>
                    <v-icon size="18">mdi-close</v-icon>
                  </template>
                </v-btn>
              </div>
            </template>
          </v-list-item>
        </transition-group>
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

.custom-input {
  width: 100px; /* 设置输入框宽度 */
  padding: 2px 5px; /* 增加内边距 */
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s; /* 添加过渡效果 */

  /* 默认状态样式 */
  color: #757575;
  font-weight: 600;
}

.custom-input:focus {
  outline: none; /* 移除默认聚焦框 */
  border-color: #6746f5; /* 聚焦时边框颜色 */
}
</style>
