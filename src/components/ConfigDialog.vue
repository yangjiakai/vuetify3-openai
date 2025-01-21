<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";

import promptsJa from "@/data/prompts-ja.json";
import { useChatHistoryStore } from "@/stores/chatHistoryStore";
const chatHistoryStore = useChatHistoryStore();
const appStore = useAppStore();
interface Props {
  config: Chat.GptConfig;
}

const props = defineProps<Props>();
// const defaultConfig = ref<Chat.GptConfig>();
const currentConfig = ref<Chat.GptConfig>(props.config);

watch(
  () => props.config,
  () => {
    if (props.config) {
      currentConfig.value = { ...props.config };
    }
  }
);

const handleCancel = () => {
  currentConfig.value = { ...props.config };
  appStore.toggleConfigDialog();
};

const getRole = (prompt) => {
  const role = promptsJa.find((item) => item.prompt === prompt) || {
    act: "default",
    prompt: "",
  };
  return role.act;
};

const handleSave = () => {
  currentConfig.value.role = getRole(currentConfig.value.prompt);
  chatHistoryStore.updateChatConfig(currentConfig.value);
  appStore.toggleConfigDialog();
};
</script>

<template>
  <v-dialog v-model="appStore.configDialog" width="600">
    <v-card>
      <hr />

      <v-card-title class="font-weight-bold text-grey-darken-2">
        {{ $t("common.config") }}
      </v-card-title>

      <v-divider></v-divider>
      <v-card-text>
        <!-- Rate -->
        <v-row class="align-center">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0 text-right">
            <v-label class="font-weight-bold text-grey-darken-2">{{
              $t("gptConfig.model")
            }}</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <div
              style="width: 220px"
              class="flex ml-2 bg-grey-lighten-3 pa-2 rounded"
            >
              <v-btn
                :variant="
                  currentConfig?.model === 'gpt-4o-mini' ? 'flat' : 'text'
                "
                color="primary"
                class="flex-fill mr-3"
                @click="currentConfig.model = 'gpt-4o-mini'"
                >GPT-3.5</v-btn
              >
              <v-btn
                :variant="currentConfig?.model === 'gpt-4' ? 'flat' : 'text'"
                color="primary"
                class="flex-fill"
                @click="currentConfig.model = 'gpt-4'"
                >GPT-4.0</v-btn
              >
            </div>
          </v-col>
        </v-row>
        <!-- Emotion -->
        <v-row class="align-center mb-3">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0 text-right">
            <v-label class="font-weight-bold text-grey-darken-2">{{
              $t("gptConfig.maxTokens")
            }}</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              type="number"
              variant="outlined"
              color="primary"
              v-model="currentConfig.max_tokens"
              hide-details
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- 历史消息数 -->
        <v-row class="align-center">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0 text-right">
            <v-label class="font-weight-bold text-grey-darken-2 word-break">{{
              $t("gptConfig.historyNumber")
            }}</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-slider
              color="primary"
              v-model="currentConfig.history_number"
              thumb-label="always"
              :min="0"
              :max="64"
              :step="1"
              hide-details
            ></v-slider>
          </v-col>
        </v-row>
        <!-- 自由度 -->
        <v-row class="align-center">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0 text-right">
            <v-label class="font-weight-bold text-grey-darken-2">{{
              $t("gptConfig.temperature")
            }}</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-slider
              color="primary"
              v-model="currentConfig.temperature"
              thumb-label="always"
              :min="0"
              :max="1"
              :step="0.1"
              hide-details
            ></v-slider>
          </v-col>
        </v-row>
        <!-- 话题新鲜度 -->
        <!-- <v-row class="align-center">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0 text-right">
            <v-label class="font-weight-bold text-grey-darken-2">{{
              $t("gptConfig.presencePenalty")
            }}</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-slider
              color="primary"
              thumb-label="always"
              v-model="currentConfig.presence_penalty"
              :min="-2.0"
              :max="2.0"
              :step="0.1"
              hide-details
            ></v-slider>
          </v-col>
        </v-row> -->

        <!-- 频率惩罚度 -->
        <!-- <v-row class="align-center">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0 text-right">
            <v-label class="font-weight-bold text-grey-darken-2">{{
              $t("gptConfig.frequencyPenalty")
            }}</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-slider
              color="primary"
              thumb-label="always"
              v-model="currentConfig.frequency_penalty"
              :min="-2.0"
              :max="2.0"
              :step="0.1"
              hide-details
            ></v-slider>
          </v-col>
        </v-row> -->

        <!-- 角色 -->
        <v-row class="align-center mb-3">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0 text-right">
            <v-label class="font-weight-bold text-grey-darken-2">{{
              $t("common.title")
            }}</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-select
              color="primary"
              variant="outlined"
              v-model="currentConfig.prompt"
              hide-details
              density="compact"
              :items="promptsJa"
              item-title="act"
              item-value="prompt"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="grey" class="font-weight-bold" @click="handleCancel">{{
          $t("common.cancel")
        }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="font-weight-bold" @click="handleSave">{{
          $t("common.save")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
