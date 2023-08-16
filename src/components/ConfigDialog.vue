<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
const appStore = useAppStore();
interface Props {
  config?: Chat.GptConfig;
}

const props = defineProps<Props>();

const config = ref<Chat.GptConfig>({
  model: "gpt-3.5-turbo",
  prompt: "",
  role: "",
  proxy: "",
});
const dialog = ref(false);

watch(
  () => props.config,
  () => {
    if (props.config) {
      config.value = props.config;
    }
  }
);
</script>

<template>
  <v-dialog v-model="appStore.configDialog" width="600">
    <v-card>
      <v-card-title> 请输入您的API KEY </v-card-title>
      <hr />
      <v-card-text>
        <!-- ---------------------------------------------- -->
        <!-- Model -->
        <!-- ---------------------------------------------- -->
        <v-label class="font-weight-medium mb-2 ml-2 mt-5"> 模型 </v-label>
        <div style="width: 220px" class="flex ml-2 bg-grey-lighten-3 pa-2">
          <v-btn
            :variant="config?.model === 'gpt-3.5-turbo' ? 'flat' : 'text'"
            color="primary"
            class="flex-fill mr-3"
            @click="config.model = 'gpt-3.5-turbo'"
            >GPT-3.5</v-btn
          >
          <v-btn
            :variant="config?.model === 'gpt-4' ? 'flat' : 'text'"
            color="primary"
            class="flex-fill"
            @click="config.model = 'gpt-4'"
            >GPT-4.0</v-btn
          >
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn block color="primary" @click="dialog = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
