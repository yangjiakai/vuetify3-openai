<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import MainSidebar from "@/components/MainSidebar.vue";
import SubSidebar from "@/components/SubSidebar.vue";
import AppBar from "@/components/AppBar.vue";
import Snackbar from "@/components/Snackbar.vue";
</script>

<template>
  <div class="">
    <!-- ---------------------------------------------- -->
    <!---Main Sidebar -->
    <!-- ---------------------------------------------- -->
    <MainSidebar />

    <!---Main -->
    <!-- ---------------------------------------------- -->
    <!-- ---------------------------------------------- -->
    <v-main>
      <RouterView />
    </v-main>

    <!-- ---------------------------------------------- -->
    <!---Snackbar -->
    <!-- ---------------------------------------------- -->
    <Snackbar />
  </div>
</template>

<style scoped lang="scss"></style>
