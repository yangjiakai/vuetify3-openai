<!--
* @Component: SubNav
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
import { useLocale } from "vuetify";
const customizeTheme = useCustomizeThemeStore();
const { t } = useLocale();
const channels = ref([
  {
    id: 1,
    title: "qa",
    icon: "mdi-forum",
    url: "/",
    active: true,
  },
  {
    id: 2,
    title: "grammarCorrection",
    icon: "mdi-text-box-check-outline",
    url: "/",
    active: false,
  },
  {
    id: 3,
    title: "translation",
    icon: "mdi-translate",
    url: "/",
    active: false,
  },
  {
    id: 4,
    title: "explainCode",
    icon: "mdi-code-less-than-or-equal",
    url: "/",
    active: false,
  },
  {
    id: 5,
    title: "sqlTranslate",
    icon: "mdi-database-search",
    url: "/",
    active: false,
  },
]);

const subNav = ref(true);
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
    <!---Nav List -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnav">
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="channel in channels"
          :key="channel.id"
          :prepend-icon="channel.icon"
          :title="t('$vuetify.nav.' + channel.title)"
          :to="channel.url"
          :active="channel.active"
          color="primary"
        ></v-list-item>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.scrollnav {
  height: calc(100vh - 64px);
}
</style>
