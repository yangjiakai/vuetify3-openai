<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useSpeechStore } from "@/stores/speechStore";
import { readStream } from "@/utils/aiUtils";
import { useArticleStore } from "@/stores/articleStore";
import { useAppStore } from "@/stores/appStore";
import { useSelectionStore } from "@/stores/selectionStore";
const appStore = useAppStore();
const selectionStore = useSelectionStore();

const articleStore = useArticleStore();
const speechStore = useSpeechStore();
const snackbarStore = useSnackbarStore();

const props = defineProps<{
  text: string;
}>();

const speakTest = (text) => {
  const config = articleStore.voiceConfig;
  speechStore.ssmlToSpeech(text, config, "test");
};

const translatedContent = ref("");

const translation = async () => {
  try {
    const completion = await fetch(
      "https://api.openai-proxy.com/v1/chat/completions",
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
              content: appStore.localPrompt,
            },
            { role: "user", content: props.text },
          ],
          model: "gpt-4o-mini",
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

const openDialog = (e) => {
  selectionStore.selectionText = window.getSelection()?.toString() || "";
  if (selectionStore.selectionText) {
    selectionStore.position = { x: e.clientX, y: e.clientY };
    selectionStore.selectionPopupShow = true;
  } else {
    selectionStore.selectionPopupShow = false;
  }
};

const isCollected = computed(() => {});

const handleCollect = () => {};
</script>

<template>
  <v-card
    class="ma-5 pa-5 text-blue-grey-darken-4"
    style="border-left: 5px solid #6746f5"
  >
    <div class="d-flex align-center">
      <div>
        <div class="position-relative" @mouseup="openDialog">
          {{ props.text }}
        </div>

        <div class="mt-2 text-body-2 text-grey">{{ translatedContent }}</div>
      </div>
      <v-spacer></v-spacer>

      <v-btn
        class="ml-1 mr-2"
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
        class="ml-1 mr-2"
        color="grey-lighten-1"
        variant="text"
        @click.stop="speakTest(props.text)"
        size="20"
      >
        <template v-slot:prepend>
          <v-icon size="20" color="primary">mdi-play-circle-outline</v-icon>
        </template>
      </v-btn>
      <v-btn
        color="grey-lighten-1"
        variant="text"
        @click.stop="handleCollect"
        size="20"
      >
        <template v-slot:prepend>
          <v-icon size="20" color="primary">mdi-heart-outline</v-icon>
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
