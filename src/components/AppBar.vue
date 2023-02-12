<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import ChangeLanguage from "@/components/ChangeLanguage.vue";
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
const customizeTheme = useCustomizeThemeStore();
const imga = ref<boolean>(true);
</script>

<template>
  <v-app-bar elevation="1">
    <template v-slot:prepend>
      <!-- icon mdi- -->
      <transition name="slide-y">
        <v-icon
          v-if="customizeTheme.subSidebar"
          @click="customizeTheme.subSidebar = !customizeTheme.subSidebar"
          >mdi-menu-open</v-icon
        >
        <v-icon
          v-else-if="!customizeTheme.subSidebar"
          @click="customizeTheme.subSidebar = !customizeTheme.subSidebar"
          >mdi-menu</v-icon
        >
      </transition>
    </template>

    <ChangeLanguage />

    <v-btn color="success" @click="imga = !imga">text</v-btn>
  </v-app-bar>
</template>

<style scoped lang="scss"></style>
