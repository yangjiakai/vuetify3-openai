<script setup lang="ts">
import { ref } from "vue";
import { useCosyVice } from "@/composable/useCosyVice";

const { generateAudio, statusMessage, isLoading, isPlaying, stopPlayback } =
  useCosyVice();

// 表单数据
const mode = ref<"sft" | "zero_shot">("sft");
const text = ref("一段用于生成语音的文本");
const speaker = ref("中文女");
const promptText = ref("");
const audioFile = ref<File>();

const handleSubmit = async () => {
  const params = {
    mode: mode.value,
    text: text.value,
    speaker: speaker.value,
    promptText: promptText.value,
    audioFile: audioFile.value,
  };

  await generateAudio(params);
};
</script>

<template>
  <div class="">
    {{ isLoading }}
    {{ isPlaying }}

    <v-card class="mx-auto my-5 pa-5" width="500">
      <v-text-field v-model="text" label="文本"></v-text-field>
      <v-text-field v-model="speaker" label="模型"></v-text-field>
      {{ statusMessage }}
      <v-btn @click="handleSubmit">生成</v-btn>
    </v-card>
  </div>
</template>

<style scoped lang="scss"></style>
