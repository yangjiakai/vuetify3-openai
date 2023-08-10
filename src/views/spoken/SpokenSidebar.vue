<!--
* @Component: SubNav
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
import { useSpokenStore } from "@/stores/spokenStore";

const spokenStore = useSpokenStore();
const router = useRouter();
const customizeTheme = useCustomizeThemeStore();

const chatMenus = computed(() => {
  return spokenStore.characterList.map((chat) => {
    return {
      id: chat.id,
      title: chat.title,
      icon: "mdi-chat",
      isMenuEdit: chat.isMenuEdit,
      idMenuDeleteConfirm: chat.idMenuDeleteConfirm,
      url: "/spoken/" + chat.id,
    };
  });
});

const editTile = ref(spokenStore.getChatActive.title);

const navigateTo = (id) => {
  spokenStore.activeChatMenuId = id;
  router.push(`/chat/${id}`);
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

  spokenStore.updateMenuTitle(id, editTile.value);
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
};

// 取消更新菜单标题
const deleteCancel = (id) => {
  spokenStore.updateMenuDeleteConfirm(id, false);
};

watch(
  () => spokenStore.getChatActive(),
  (newVal) => {
    editTile.value = newVal?.title;
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
          @click="spokenStore.showAddCharacterDialog()"
        >
          <template v-slot:prepend>
            <v-icon>mdi-plus-circle</v-icon>
          </template>
          添加好友</v-btn
        >
        <transition-group name="slide-x" tag="div">
          <v-list-item
            v-for="chatMenu in chatMenus"
            class="pl-5"
            :key="chatMenu.id"
            :to="chatMenu.url"
            @click="navigateTo(chatMenu.id)"
            active-class="active-nav"
            density="compact"
            rounded="xl"
            @blur="editCancel(chatMenu.id)"
          >
            <template v-slot:prepend>
              <v-avatar size="avatarSize" color="white">
                <img
                  width="26"
                  height="26"
                  src="https://img.icons8.com/fluency/48/user-female-circle.png"
                  alt="user-female-circle"
                />
              </v-avatar>
            </template>
            <v-list-item-title v-if="chatMenu.isMenuEdit">
              <v-text-field
                ref="refEditInput"
                v-model="editTile"
                class="mr-2"
                hide-details
                autofocus
                density="compact"
                @keyup.enter="editConfirm(chatMenu.id)"
              ></v-text-field>
            </v-list-item-title>
            <v-list-item-title v-else-if="chatMenu.idMenuDeleteConfirm">
              {{ `删除 "${chatMenu.title}"?` }}</v-list-item-title
            >
            <v-list-item-title v-else> {{ chatMenu.title }}</v-list-item-title>
            <template v-slot:append>
              <!-- 普通状态 -->
              <div
                v-if="
                  chatMenu.id === spokenStore.activeChatMenuId &&
                  !chatMenu.idMenuDeleteConfirm &&
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
                  @click="handleDelete(chatMenu.id)"
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
                  chatMenu.id === spokenStore.activeChatMenuId &&
                  !chatMenu.idMenuDeleteConfirm &&
                  chatMenu.isMenuEdit
                "
              >
                <v-btn
                  color="grey-lighten-1"
                  variant="text"
                  @click="editConfirm(chatMenu.id)"
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
              <!--删除确认状态 -->
              <div
                v-else-if="
                  chatMenu.id === spokenStore.activeChatMenuId &&
                  chatMenu.idMenuDeleteConfirm
                "
              >
                <v-btn
                  color="grey-lighten-1"
                  variant="text"
                  @click="deleteConfirm(chatMenu.id)"
                  size="20"
                >
                  <template v-slot:prepend>
                    <v-icon size="18">mdi-check</v-icon>
                  </template>
                </v-btn>
                <v-btn
                  color="grey-lighten-1"
                  variant="text"
                  @click="deleteCancel(chatMenu.id)"
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
</style>
