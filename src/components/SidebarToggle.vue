<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
const appStore = useAppStore();
</script>

<template>
  <v-btn icon @click="appStore.toggleMainSidebar()">
    <v-icon color="grey">mdi-menu</v-icon>
  </v-btn>
</template>

<style scoped lang="scss"></style>
