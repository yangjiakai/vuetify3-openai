<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useChatStore } from "@/stores/chatStore";
import { getModelsApi } from "@/api/gptApi";
import { listModelsApi } from "@/api/openAIApi";
const chatStore = useChatStore();

const models = ref<any>([]);

const getModels = async () => {
  //   const res = await getModelsApi(chatStore.apiKey);
  //   console.log(res);
  const res2 = await listModelsApi(chatStore.apiKey);
  models.value = res2.data.data.map((model: any) => model.id).sort();
};

onMounted(() => {
  getModels();
});
</script>

<template>
  <div class="">
    <perfect-scrollbar class="models-container">
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="model in models"
          :key="model"
          prepend-icon="mdi-image"
          :title="model"
          active-class="active-nav"
          to=""
        ></v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.active-nav {
  border-left: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #586ff5, #d53a9d);
  color: #705cf6;
}
.scrollnav {
  height: 800px;
}
</style>
