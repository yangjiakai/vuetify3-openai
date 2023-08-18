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
  model: "gpt-3.5-turbo-0613",
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

const handleCancel = () => {
  dialog.value = false;
};

const handleSave = () => {
  //   appStore.setConfig(config.value);
  dialog.value = false;
};
</script>

<template>
  <v-dialog v-model="appStore.configDialog" width="600">
    <v-card>
      <hr />

      <v-card-title class="font-weight-bold text-grey-darken-2">
        当前对话设定
      </v-card-title>

      <v-divider></v-divider>
      <v-card-text>
        <!-- Rate -->
        <v-row class="align-center">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0 text-right">
            <v-label class="font-weight-bold text-grey-darken-2"
              >语言模型</v-label
            >
          </v-col>
          <v-col cols="12" sm="10">
            <div
              style="width: 220px"
              class="flex ml-2 bg-grey-lighten-3 pa-2 rounded"
            >
              <v-btn
                :variant="
                  config?.model === 'gpt-3.5-turbo-0613' ? 'flat' : 'text'
                "
                color="primary"
                class="flex-fill mr-3"
                @click="config.model = 'gpt-3.5-turbo-0613'"
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
          </v-col>
        </v-row>
        <!-- Rate -->
        <v-row class="align-center">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0 text-right">
            <v-label class="font-weight-bold text-grey-darken-2"
              >自由度</v-label
            >
          </v-col>
          <v-col cols="12" sm="10">
            <v-slider
              color="primary"
              value="1.0"
              thumb-label="always"
              :min="0.1"
              :max="2"
              :step="0.1"
              hide-details
            ></v-slider>
          </v-col>
        </v-row>

        <!-- Emotion -->
        <v-row class="align-center mb-3">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0 text-right">
            <v-label class="font-weight-bold text-grey-darken-2">风格</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-select
              color="primary"
              variant="outlined"
              hide-details
              density="compact"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="grey" class="font-weight-bold" @click="handleCancel"
          >取消修改</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="primary" class="font-weight-bold" @click="handleSave"
          >保存配置</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
