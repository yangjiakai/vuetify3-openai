<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import ChangeLanguage from "@/components/ChangeLanguage.vue";
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
const customizeTheme = useCustomizeThemeStore();
</script>

<template>
  <v-app-bar elevation="1">
    <template v-slot:prepend>
      <transition>
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
  </v-app-bar>
</template>

<style scoped lang="scss"></style>
