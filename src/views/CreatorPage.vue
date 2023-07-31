<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSpeechStore } from "@/stores/speechStore";
const speechStore = useSpeechStore();

const speak = () => {
  console.log("speak");
  speechStore.ssmlToSpeak("我真的解决不了这个问题");
};
</script>

<template>
  <div class="">
    CreatorPage

    <v-btn color="success" @click="speak">text</v-btn>

    <v-btn color="success" @click="speak">text</v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
