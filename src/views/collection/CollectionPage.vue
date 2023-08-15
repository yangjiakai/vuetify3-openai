<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useCollectionStore } from "@/stores/collectionStore";
import SentenceItem from "./SentenceItem.vue";
const collectionStore = useCollectionStore();

const sentences = computed((): Collection.Sentence[] => {
  return collectionStore.getSentenceList;
});
</script>

<template>
  <div class="h-100 pa-5">
    <v-card class="h-100 mx-auto" max-width="1200">
      <v-card-title class="font-weight-bold text-grey-darken-2">
        句子收藏
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list lines="two" class="pa-1">
          <SentenceItem
            v-for="sentence in sentences"
            :key="sentence.sentenceId"
            :sentence="sentence"
          >
          </SentenceItem>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped lang="scss"></style>
