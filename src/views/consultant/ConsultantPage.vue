<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import ConsultantSidebar from "@/components/ConsultantSidebar.vue";
onMounted(() => {
  console.log("ConsultantPage");
});
</script>

<template>
  <div class="">
    <ConsultantSidebar />
    <RouterView />
  </div>
</template>

<style scoped lang="scss"></style>
