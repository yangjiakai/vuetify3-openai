<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <v-app-bar elevation="1">
    <template v-slot:prepend>
      <Icon class="mx-3" width="30" icon="logos:bubble-icon" />
    </template>
    <v-toolbar-title>Unsplash</v-toolbar-title>
    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<style scoped lang="scss"></style>
