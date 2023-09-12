<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import SidebarToggle from "@/components/SidebarToggle.vue";
</script>

<template>
  <v-toolbar color="white" class="text-grey-darken-2" border>
    <SidebarToggle />
  </v-toolbar>
  <div class="d-flex align-center justify-center h-screen bg-white">
    <div>
      <Vue3Lottie
        animationLink="https://lottie.host/03e08e80-d368-4fef-aa7e-f0910d00ea54/aYgluR3DQ2.json"
        :height="400"
        :width="400"
      />
      <h1 class="text-center font-weight-black text-grey-darken-1">有问必答</h1>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
