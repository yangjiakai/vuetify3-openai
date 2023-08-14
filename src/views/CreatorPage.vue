<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
const router = useRouter();

const jump = () => {
  router.push("/chat/1692009102713");
};
</script>

<template>
  <div class="">Creator</div>
  <v-btn color="primary">text</v-btn>
  <v-btn color="primary-lighten-1">text</v-btn>
  <v-btn color="primary-lighten-2">text</v-btn>
  <v-btn color="primary-lighten-3">text</v-btn>
  <v-btn color="primary-lighten-4">text</v-btn>
  <v-btn color="primary-lighten-5" @click="jump">text</v-btn>
</template>

<style scoped lang="scss"></style>
