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
const temp = ref(false);
</script>

<template>
  <CustomizationMenu />

  <v-navigation-drawer theme="dark" rail>
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
  <v-navigation-drawer temporary v-model="temp">
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
          v-for="i in 30"
          prepend-icon="mdi-view-dashboard"
          title="Nav Item"
          to="/"
          color="primary"
        ></v-list-item>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>

  <v-app-bar :title="t('$vuetify.common.applicationBar')" elevation="1">
    <ChangeLanguage />
  </v-app-bar>

  <v-main>
    <v-sheet height="110vh">
      <RouterView />
    </v-sheet>
  </v-main>
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
