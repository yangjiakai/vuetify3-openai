<!--
* @Component: SubNav
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import { useSpokenStore } from "@/stores/spokenStore";
import { Gender } from "~/src/enums";
import { useSpeechStore } from "@/stores/speechStore";
const spokenStore = useSpokenStore();
const speechStore = useSpeechStore();
const router = useRouter();

const appStore = useAppStore();
const chatMenus = computed(() => {
  return spokenStore.spokenChatList.map((chat: Chat.SpokenChat) => {
    return {
      chatId: chat.chatId,
      menuTitle: chat.menuConfig.menuTitle,
      icon:
        chat.voiceConfig.gender === Gender.Man
          ? "mdi-face-man-shimmer"
          : "mdi-face-woman-shimmer",
      isMenuEdit: chat.menuConfig.isMenuEdit,
      isMenuDeleteConfirm: chat.menuConfig.isMenuDeleteConfirm,
      url: "/spoken/" + chat.chatId,
    };
  });
});

const editTitle = ref(spokenStore.activeChat?.menuConfig?.menuTitle);

const navigateTo = (id) => {
  spokenStore.activeChatMenuId = id;
  router.push(`/spoken/${id}`);
};

const refEditInput = ref();

// 切换编辑菜单视图
const handleEdit = (id) => {
  spokenStore.updateMenuIsMenuEdit(id, true);
  nextTick(() => {
    refEditInput.value[0]?.focus();
  });
};

// 确认更新菜单标题
const editConfirm = (id) => {
  console.log("editConfirm");

  spokenStore.updateMenuTitle(id, editTitle.value);
};

// 取消更新菜单标题
const editCancel = (id) => {
  spokenStore.updateMenuIsMenuEdit(id, false);
};

// 切换确认删除视图
const handleDelete = (id) => {
  spokenStore.updateMenuDeleteConfirm(id, true);
};

// 确认删除当前菜单
const deleteConfirm = (id) => {
  spokenStore.deleteMenu(id);
  router.push({
    name: "spoken-home",
  });
};

// 取消更新菜单标题
const deleteCancel = (id) => {
  spokenStore.updateMenuDeleteConfirm(id, false);
};

watch(
  () => spokenStore.activeChat,
  (newVal) => {
    if (newVal !== undefined) {
      editTitle.value = newVal?.menuConfig?.menuTitle;
    }
  }
);

const openDialog = async () => {
  await speechStore.getVoices();
  spokenStore.switchAddCharacterDialog();
};
</script>

<template>
  <v-navigation-drawer permanent width="240">
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
          @click="openDialog()"
        >
          <template v-slot:prepend>
            <v-icon>mdi-plus-circle</v-icon>
          </template>
          {{ $t("spoken.addFriend") }}</v-btn
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
              <v-icon class="mr-3">
                {{ chatMenu.icon }}
              </v-icon>
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
              {{
                $t("common.delete") + `${chatMenu.menuTitle}?`
              }}</v-list-item-title
            >
            <v-list-item-title class="font-weight-black" v-else>
              {{ chatMenu.menuTitle }}</v-list-item-title
            >
            <template v-slot:append>
              <!-- 普通状态 -->
              <div
                v-if="
                  chatMenu.chatId === spokenStore.activeChatMenuId &&
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
                  chatMenu.chatId === spokenStore.activeChatMenuId &&
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
                  chatMenu.chatId === spokenStore.activeChatMenuId &&
                  chatMenu.isMenuDeleteConfirm
                "
              >
                <v-btn
                  color="grey-lighten-1"
                  variant="text"
                  @click.stop.prevent="deleteConfirm(chatMenu.chatId)"
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
