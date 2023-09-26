<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSelectionStore } from "@/stores/selectionStore";
import { Icon } from "@iconify/vue";
const selectionStore = useSelectionStore();
</script>

<template>
  <v-card
    v-if="selectionStore.selectionPopupShow"
    class="position-fixed"
    style="z-index: 999"
    :style="{
      top: selectionStore.position.y - 50 + 'px',
      left: selectionStore.position.x + 'px',
    }"
  >
    <v-btn class="text-primary">
      <Icon
        class="text-primary mr-1"
        width="18"
        icon="solar:book-bookmark-line-duotone"
      />Dictionary</v-btn
    >
    <v-divider vertical></v-divider>
    <v-btn
      @click="selectionStore.selectionPopupShow = false"
      icon
      rounded="sm"
      size="30"
      color="primary"
      ><v-icon>mdi-close</v-icon></v-btn
    >
  </v-card>
</template>

<style scoped lang="scss"></style>
