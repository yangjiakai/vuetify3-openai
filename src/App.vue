<script setup lang="ts">
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
import Toolbox from "@/components/Toolbox.vue";

const customizeTheme = useCustomizeThemeStore();
</script>

<template>
  <v-app id="app" :theme="customizeTheme.darkTheme ? 'dark' : 'light'">
    <RouterView />
    <Toolbox />
  </v-app>
</template>

<style scoped></style>
