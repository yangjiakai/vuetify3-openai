<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import ContactUsCard from "@/components/ContactUsCard.vue";
const authStore = useAuthStore();
const router = useRouter();
const handleLogout = () => {
  authStore.removeToken();
  router.push("/login");
};

const handleContactUsShow = () => {
  contactUsDialogShow.value = true;
  console.log("handleContactUsShow");
};

const contactUsDialogShow = ref(false);

const menus = [
  {
    title: "GPT",
    icon: "mdi-chat-processing-outline",
    url: "/chat",
  },
  {
    title: "创作中心",
    icon: "mdi-notebook",
    url: "/creator",
  },
  {
    title: "咨询顾问",
    icon: "mdi-chat-question",
    url: "/consultant",
  },
  {
    title: "口语交流",
    icon: "mdi-account-voice",
    url: "/spoken",
  },
];
</script>

<template>
  <v-navigation-drawer width="100">
    <v-list nav>
      <v-list-item
        v-for="item in menus"
        :key="item.title"
        :value="item.title"
        :to="item.url"
        lines="two"
        class="text-grey-darken-1"
        color="primary"
      >
        <div>
          <div class="text-center">
            <v-icon size="26">{{ item.icon }}</v-icon>
          </div>
          <div class="title">
            {{ item.title }}
          </div>
        </div>

        <v-tooltip
          activator="parent"
          location="right"
          class="text-white"
          :text="item.title"
        ></v-tooltip>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item @click="handleContactUsShow">
          <v-slot prepend>
            <v-icon>mdi-wechat</v-icon>
            <v-tooltip activator="parent" location="right" text="联系我们">
            </v-tooltip>
          </v-slot>
        </v-list-item>

        <v-list-item @click="handleLogout">
          <v-slot prepend>
            <v-icon>mdi-logout</v-icon>
          </v-slot>
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
