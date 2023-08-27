<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useSpeechStore } from "@/stores/speechStore";
import { Gender } from "~/src/enums";
import { readStream } from "@/utils/aiUtils";
const speechStore = useSpeechStore();
const snackbarStore = useSnackbarStore();

const props = defineProps<{
  text: string;
}>();

const speakTest = (text) => {
  const config = {
    voiceStyle: "",
    voiceRate: 1.1,
    gender: Gender.Woman,
    language: "ja-JP",
    voiceName: "ja-JP-NanamiNeural",
    localName: "七海",
  };

  speechStore.ssmlToSpeech(text, config, "test");
};

const translatedContent = ref("");

const translation = async () => {
  try {
    const completion = await fetch(
      "https://openai.wndbac.cn/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "你是一名翻译官,将内容翻译成中文,如果源文本就是中文的话,不必翻译",
            },
            { role: "user", content: props.text },
          ],
          model: "gpt-3.5-turbo-0613",
          stream: true,
        }),
      }
    );

    // Handle errors
    if (!completion.ok) {
      const errorData = await completion.json();
      snackbarStore.showErrorMessage(errorData.error.message);
      return;
    }

    // Create a reader
    const reader = completion.body?.getReader();
    if (!reader) {
      snackbarStore.showErrorMessage("Cannot read the stream.");
    }

    translatedContent.value = "";
    // Read the stream
    readStream(reader, (message) => {
      translatedContent.value = translatedContent.value += message;
    });
  } catch (error) {
    snackbarStore.showErrorMessage(error.message);
  }
};
</script>

<template>
  <v-card class="ma-5 pa-5 text-blue-grey-darken-4">
    <div class="d-flex align-center">
      <div>
        <div>{{ props.text }}</div>
        <div class="mt-2 text-body-2 text-grey">{{ translatedContent }}</div>
      </div>
      <v-spacer></v-spacer>

      <v-btn
        class="mr-2"
        color="grey-lighten-1"
        variant="text"
        @click.stop="translation"
        size="20"
      >
        <template v-slot:prepend>
          <v-icon size="20" color="primary">mdi-translate</v-icon>
        </template>
      </v-btn>
      <v-btn
        color="grey-lighten-1"
        variant="text"
        @click.stop="speakTest(props.text)"
        size="20"
      >
        <template v-slot:prepend>
          <v-icon size="20" color="primary">mdi-play-circle-outline</v-icon>
        </template>
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
:deep(#md-editor-v3-preview),
.user-message {
  font-size: 14px !important;
  font-weight: 600 !important;
}

.tool-icon:hover {
  color: #888;
}
</style>
