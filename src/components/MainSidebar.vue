<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useSpokenStore } from "@/stores/spokenStore";
import { useChatHistoryStore } from "@/stores/chatHistoryStore";
import { useAppStore } from "@/stores/appStore";
import ContactUsCard from "@/components/ContactUsCard.vue";
import { Icon } from "@iconify/vue";
const appStore = useAppStore();
const authStore = useAuthStore();
const spokenStore = useSpokenStore();
const chatHistoryStore = useChatHistoryStore();
const router = useRouter();
const route = useRoute();
const handleLogout = () => {
  authStore.removeToken();
  router.push("/login");
};

const handleContactUsShow = () => {
  contactUsDialogShow.value = true;
};

const contactUsDialogShow = ref(false);

const menus = [
  {
    title: "GPT",
    icon: "solar:face-scan-circle-line-duotone",

    url: "/chat",
  },
  {
    title: "创作中心",
    icon: "solar:bookmark-opened-line-duotone",
    url: "/creation",
  },
  {
    title: "咨询顾问",
    icon: "solar:chat-square-check-line-duotone",
    url: "/consultant",
  },
  {
    title: "口语交流",
    icon: "solar:dialog-2-line-duotone",
    url: "/spoken",
  },
  // {
  //   title: "语句收藏",
  //   icon: "solar:book-bookmark-minimalistic-line-duotone",
  //   url: "/collection",
  // },
  {
    title: "文章分析",
    icon: "solar:infinity-line-duotone",
    url: "/article",
  },
];

const naviagteTo = (url: string) => {
  if (url === "/spoken") {
    const lastPageId = spokenStore.lastPageId;
    let newUrl = "/spoken/home";

    if (lastPageId !== 0) {
      newUrl = `/spoken/${lastPageId}`;
    }
    router.push(newUrl);
  } else if (url === "/chat") {
    const lastPageId = chatHistoryStore.lastPageId;
    let newUrl = "/chat/home";
    if (lastPageId !== 0) {
      newUrl = `/chat/${lastPageId}`;
    }
    router.push(newUrl);
  } else if (url === "/consultant") {
    const lastPageId = chatHistoryStore.lastConsultPageId;
    let newUrl = "/consultant/home";
    if (lastPageId !== 0) {
      newUrl = `/consultant/${lastPageId}`;
    }
    router.push(newUrl);
  } else {
    router.push(url);
  }
};
</script>

<template>
  <v-navigation-drawer v-model="appStore.mainSidebar" width="100">
    <v-list nav>
      <v-list-item
        v-for="item in menus"
        :key="item.title"
        :value="item.title"
        @click="naviagteTo(item.url)"
        lines="two"
        class="text-grey-darken-1"
        color="primary"
        :active="
          route.matched.some(
            (record) =>
              record.path === item.url || record.path.startsWith(item.url)
          )
        "
      >
        <div class="text-center">
          <Icon class="mx-auto" width="26" :icon="item.icon" />
        </div>
        <div class="title">
          {{ item.title }}
        </div>

        <!-- 
        <v-tooltip
          activator="parent"
          location="right"
          class="text-white"
          :text="item.title"
        ></v-tooltip> -->
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list lines="two">
        <v-list-item
          @click="handleContactUsShow"
          class="text-grey-darken-1"
          color="primary"
        >
          <div>
            <div class="text-center">
              <Icon
                class="mx-auto"
                width="26"
                icon="solar:link-square-line-duotone"
              />
            </div>

            <div class="title">联系我们</div>
            <!-- <v-tooltip activator="parent" location="right" text="联系我们">
            </v-tooltip> -->
          </div>
        </v-list-item>

        <v-list-item
          @click="handleLogout"
          class="text-grey-darken-1"
          color="primary"
        >
          <div>
            <div class="text-center">
              <Icon
                class="mx-auto"
                width="26"
                icon="solar:logout-3-line-duotone"
              />
            </div>

            <div class="title">退出登录</div>
          </div>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
  <v-dialog v-model="contactUsDialogShow">
    <ContactUsCard />
  </v-dialog>
</template>

<style scoped lang="scss">
.title {
  font-size: 11.5px;
  text-align: center;
  margin-top: 5px;
  font-weight: 600;
}
</style>
