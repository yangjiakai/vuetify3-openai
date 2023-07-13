<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
const route = useRoute();
const historyId = ref(route.params.id);
import { useChatHistoryStore } from "@/stores/chatHistoryStore";
const chatHistoryStore = useChatHistoryStore();

watch(
  () => route.params.id,
  (newVal) => {
    historyId.value = newVal;
  }
);
import SubSidebar from "@/components/SubSidebar.vue";
</script>

<template>
  <SubSidebar />
  <div class="">Chat</div>
  <div>{{ historyId }}</div>
  <div>{{ chatHistoryStore.activeChatMenuId }}</div>
</template>

<style scoped lang="scss"></style>
