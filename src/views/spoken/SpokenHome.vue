<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
// import { Vue3Lottie } from "vue3-lottie";
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="d-flex align-center justify-center h-screen bg-white">
    <div>
      <div class="d-flex justify-center">
        <Icon
          class="text-primary"
          width="100"
          icon="solar:multiple-forward-right-line-duotone"
        />
      </div>
      <!-- <Vue3Lottie
        animationLink="https://lottie.host/03e08e80-d368-4fef-aa7e-f0910d00ea54/aYgluR3DQ2.json"
        :height="400"
      :width="400"
      /> -->
      <h2 class="text-center font-weight-black text-grey-darken-1">
        {{ $t("spoken.slogan") }}
      </h2>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
