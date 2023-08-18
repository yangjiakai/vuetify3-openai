<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useCollectionStore } from "@/stores/collectionStore";
import { readStream } from "@/utils/aiUtils";
import { useSpeechStore } from "@/stores/speechStore";
import { Gender } from "@/enums";
import { getLanguageName } from "@/utils/common";
const speechStore = useSpeechStore();
const snackbarStore = useSnackbarStore();
const collectionStore = useCollectionStore();
interface Props {
  sentence: Collection.Sentence;
}

const props = defineProps<Props>();
const { sentence } = toRefs(props);
const translatedContent = ref("");
const isTranslating = ref(false);

const translation = async () => {
  isTranslating.value = true;
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
            { role: "user", content: sentence.value.text },
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
  } finally {
    isTranslating.value = false;
  }
};

const readText = () => {
  speechStore.ssmlToSpeech(
    sentence.value.text,
    sentence.value.voiceConfig,
    "test"
  );
};

const remove = () => {
  collectionStore.removeSentence(sentence.value.sentenceId);
};
</script>

<template>
  <v-list-item elevation="1" class="ma-1" color="primary" @click="">
    <v-list-item-content>
      <v-list-item-title class="font-weight-bold text-grey-darken-1">{{
        sentence.text
      }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-subtitle v-if="translatedContent" class="py-1">{{
      translatedContent
    }}</v-list-item-subtitle>
    <template v-slot:prepend>
      <v-chip
        color="primary"
        size="small"
        label
        class="mr-4"
        :prepend-icon="
          sentence.voiceConfig.gender === Gender.Man
            ? 'mdi-face-man-shimmer'
            : 'mdi-face-woman-shimmer'
        "
      >
        {{ getLanguageName(sentence.voiceConfig.language) }}</v-chip
      >
    </template>

    <template v-slot:append>
      <v-btn
        class="mr-3"
        color="grey-lighten-1"
        variant="text"
        @click="translation"
        size="20"
      >
        <template v-slot:prepend>
          <v-icon class="tool-icon" size="18">mdi-translate</v-icon>
          <v-tooltip activator="parent" location="bottom" text="翻译">
          </v-tooltip>
        </template>
      </v-btn>
      <v-btn
        class="mr-3"
        color="grey-lighten-1"
        variant="text"
        size="20"
        @click.stop="readText"
      >
        <template v-slot:prepend>
          <v-icon class="tool-icon" size="18">mdi-volume-high</v-icon>
        </template>
        <v-tooltip activator="parent" location="bottom" text="朗读">
        </v-tooltip>
      </v-btn>
      <!-- 删除 -->
      <v-btn
        color="grey-lighten-1"
        variant="text"
        size="20"
        @click.stop="remove"
      >
        <template v-slot:prepend>
          <v-icon class="tool-icon" size="18">mdi-delete</v-icon>
        </template>
        <v-tooltip activator="parent" location="bottom" text="删除">
        </v-tooltip>
      </v-btn>
    </template>
  </v-list-item>
</template>

<style scoped lang="scss"></style>
