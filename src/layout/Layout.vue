<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import MainSidebar from "@/components/MainSidebar.vue";

import Snackbar from "@/components/Snackbar.vue";
</script>

<template>
  <div class="h-100">
    <!-- ---------------------------------------------- -->
    <!---Main Sidebar -->
    <!-- ---------------------------------------------- -->
    <MainSidebar />

    <!---Main -->
    <!-- ---------------------------------------------- -->
    <!-- ---------------------------------------------- -->
    <v-main class="h-100">
      <RouterView />
    </v-main>

    <!-- ---------------------------------------------- -->
    <!---Snackbar -->
    <!-- ---------------------------------------------- -->
    <Snackbar />
  </div>
</template>

<style scoped lang="scss"></style>
