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
import GlobalConfigCard from "@/components/GlobalConfigCard.vue";
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
const globalConfig = ref(false);

const menus = [
  {
    title: "spoken.title",
    icon: "solar:dialog-2-line-duotone",
    url: "/spoken",
  },
  {
    title: "gpt.title",
    icon: "solar:face-scan-circle-line-duotone",

    url: "/chat",
  },
  {
    title: "Creation",
    icon: "solar:bookmark-opened-line-duotone",
    url: "/creation",
  },
  {
    title: "Consultant",
    icon: "solar:chat-square-check-line-duotone",
    url: "/consultant",
  },

  // {
  //   title: "语句收藏",
  //   icon: "solar:book-bookmark-minimalistic-line-duotone",
  //   url: "/collection",
  // },
  {
    title: "Article",
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
          {{ $t(item.title) }}
        </div>
      </v-list-item>
      <!-- Spoken -->
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

            <div class="title">{{ $t("common.contact") }}</div>
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

            <div class="title">{{ $t("common.logout") }}</div>
          </div>
        </v-list-item>
        <!-- Global Config -->
        <v-list-item
          @click="globalConfig = true"
          class="text-grey-darken-1"
          color="primary"
        >
          <div>
            <div class="text-center">
              <Icon
                class="mx-auto"
                width="26"
                icon="solar:settings-line-duotone"
              />
            </div>

            <div class="title">{{ $t("globalSetting.title") }}</div>
          </div>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
  <v-dialog v-model="contactUsDialogShow">
    <ContactUsCard />
  </v-dialog>
  <v-dialog v-model="globalConfig">
    <GlobalConfigCard />
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
