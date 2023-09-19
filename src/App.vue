<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import { useLocale } from "vuetify";
const { current } = useLocale();
const appStore = useAppStore();

onMounted(() => {
  current.value = appStore.localCode;
});
</script>

<template>
  <v-app id="app">
    <RouterView />
  </v-app>
</template>

<style scoped></style>
