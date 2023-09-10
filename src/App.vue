<script setup lang="ts">
import { useCustomizeThemeStore } from "@/stores/customizeTheme";

const customizeTheme = useCustomizeThemeStore();
</script>

<template>
  <v-app id="app" :theme="customizeTheme.darkTheme ? 'dark' : 'light'">
    <RouterView />
  </v-app>
</template>

<style scoped></style>
