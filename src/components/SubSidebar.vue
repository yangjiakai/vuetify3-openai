<!--
* @Component: SubNav
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
import ApiKeyDialog from "./ApiKeyDialog.vue";

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
</script>

<template>
  <v-navigation-drawer v-model="customizeTheme.subSidebar">
    <!-- ---------------------------------------------- -->
    <!---Top Area -->
    <!-- ---------------------------------------------- -->
    <template v-slot:prepend>
      <v-card
        elevation="0"
        height="64"
        class="d-flex align-center justify-center"
      >
        <img width="200" src="@/assets/logo.svg" />
      </v-card>
    </template>
    <!-- ---------------------------------------------- -->
    <!---Control Area -->
    <!-- ---------------------------------------------- -->
    <v-divider></v-divider>
    <div class="pa-5">
      <ApiKeyDialog />
    </div>

    <!-- ---------------------------------------------- -->
    <!---Nav List -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnav">
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="channel in channels"
          :key="channel.id"
          :prepend-icon="channel.icon"
          :title="$t('nav.' + channel.title)"
          :to="channel.url"
          :active="route.path === channel.url"
          active-class="active-nav"
          active-color="!important"
        ></v-list-item>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.scrollnav {
  height: calc(100vh - 300px);
}

.active-nav {
  border-left: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #586ff5, #d53a9d);
  color: #705cf6;
}
</style>
