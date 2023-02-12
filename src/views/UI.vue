<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import CustomizationMenu from "@/components/CustomizationMenu.vue";
import ChangeLanguage from "@/components/ChangeLanguage.vue";
import { useLocale } from "vuetify";
const { t } = useLocale();
const temp = ref(true);

const channels = ref([
  {
    id: 1,
    title: "问答",
    icon: "mdi-forum",
    url: "/",
    active: true,
  },
  {
    id: 2,
    title: "语法纠正",
    icon: "mdi-text-box-check-outline",
    url: "/",
    active: false,
  },
  {
    id: 3,
    title: "翻译",
    icon: "mdi-translate",
    url: "/",
    active: false,
  },
  {
    id: 4,
    title: "解释代码",
    icon: "mdi-code-less-than-or-equal",
    url: "/",
    active: false,
  },
  {
    id: 5,
    title: "SQL查询",
    icon: "mdi-database-search",
    url: "/",
    active: false,
  },
]);
</script>

<template>
  <!-- <CustomizationMenu /> -->

  <!-- <v-navigation-drawer theme="dark" rail>
    <v-list>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        value="dashboard"
        @click="temp = !temp"
      >
        <v-tooltip
          activator="parent"
          location="bottom"
          class=""
          text="Sub-Navigation"
        ></v-tooltip>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-image"
        value="unsplash"
        to="/unsplash"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-navigation-drawer v-model="temp">
    <template v-slot:prepend>
      <v-card height="60" class="d-flex align-center">
        <v-card-title class="text-primary">
          {{ t("$vuetify.common.subNav") }}</v-card-title
        >
      </v-card>
    </template>
    <perfect-scrollbar class="scrollnav">
      <v-list nav>
        <v-list-item
          v-for="channel in channels"
          :key="channel.id"
          :prepend-icon="channel.icon"
          :title="channel.title"
          :to="channel.url"
          color="primary"
          :active="channel.active"
        ></v-list-item>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>

  <v-app-bar elevation="1">
    <v-app-bar-title
      ><img width="200" src="@/assets/logo.svg"
    /></v-app-bar-title>
    <ChangeLanguage />
  </v-app-bar>

  <v-main>
    <v-sheet>
      <RouterView />
    </v-sheet>
  </v-main> -->
</template>

<style scoped lang="scss">
.main {
  height: calc(100vh - 64px);
  overflow: scroll;
}

.scrollnav {
  height: calc(100vh - 60px);
}
</style>
