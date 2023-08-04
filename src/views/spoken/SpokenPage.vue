<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import SpokenSidebar from "./SpokenSidebar.vue";
import AddCharacterCard from "./AddCharacterCard.vue";

import { useSpokenStore } from "@/stores/spokenStore";
const spokenStore = useSpokenStore();

watchEffect(() => {
  console.log("spokenStore.addCharacterDialog", spokenStore.addCharacterDialog);
});
</script>

<template>
  <div class="">
    <SpokenSidebar />
    <RouterView />
    <!-- Add Character Dialog -->
    <v-dialog v-model="spokenStore.addCharacterDialog">
      <AddCharacterCard />
    </v-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
