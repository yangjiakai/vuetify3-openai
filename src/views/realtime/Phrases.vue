<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import phrasesData from "@/data/phrasesData.json";
const phrases = ref(phrasesData.recognizedPhrases);
</script>

<template>
  <v-card>
    <v-card class="my-3 pa-2" v-for="item in phrases">
      {{ item.nBest[0].display }}
    </v-card>
  </v-card>
</template>

<style scoped lang="scss"></style>
