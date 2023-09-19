<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSpeechStore } from "@/stores/speechStore";
import MessageCard from "./MessageCard.vue";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { Gender } from "@/enums";
import { readStream } from "@/utils/aiUtils";
import { Icon } from "@iconify/vue";
import ConfigCard from "./ConfigCard.vue";
import { useArticleStore } from "@/stores/articleStore";
import { getLanguageName } from "@/utils/common";
import { useAppStore } from "@/stores/appStore";
const appStore = useAppStore();
const speechStore = useSpeechStore();
const snackbarStore = useSnackbarStore();
const articleStore = useArticleStore();

const targetArticle = ref<string[]>([]);
const transferArtile = (text: string) => {
  return text.split(/[。？！：\n.?!]/).filter((item) => item.trim() !== "");
};

const speakTest = (text) => {
  const config = articleStore.voiceConfig;
  speechStore.ssmlToSpeech(text, config, "test");
};

watch(
  () => articleStore.sourceArticle,
  (newVal) => {
    targetArticle.value = transferArtile(newVal);
  }
);

onMounted(() => {
  targetArticle.value = transferArtile(articleStore.sourceArticle);
});

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
            { role: "user", content: articleStore.sourceArticle },
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
  <div class="h-100 bg-grey-lighten-5 pa-5 pb-0">
    <v-row class="h-100" align="stretch">
      <v-col cols="12" md="6">
        <v-card class="h-100" rounded="md">
          <v-toolbar rounded="md" elevation="1" color="primary" class="toolbar">
            <v-app-bar-nav-icon @click="appStore.toggleMainSidebar()">
              <Icon
                class="mx-auto"
                width="26"
                icon="solar:document-add-line-duotone"
              />
            </v-app-bar-nav-icon>
            <v-toolbar-title> {{ $t("article.title") }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- speak button -->
            <v-btn icon @click="speakTest(articleStore.sourceArticle)">
              <v-icon> mdi-play-circle-outline </v-icon>
              <!-- tooltip -->
              <v-tooltip
                activator="parent"
                location="bottom"
                :text="$t('article.read')"
              />
            </v-btn>

            <!-- translate -->
            <v-btn icon @click="translation">
              <v-icon> mdi-translate </v-icon>
              <!-- tooltip -->
              <v-tooltip
                activator="parent"
                location="bottom"
                :text="$t('article.translate')"
              />
            </v-btn>
          </v-toolbar>
          <perfect-scrollbar class="message-container">
            <v-textarea
              v-model="articleStore.sourceArticle"
              class="ma-5 text-grey-darken-2"
              variant="outlined"
              :placeholder="$t('article.originalPlaceholder')"
              rows="20"
              color="primary"
              :label="$t('article.original')"
              hide-details
              noResize
            >
            </v-textarea>
            <v-textarea
              v-model="translatedContent"
              class="ma-5 text-grey-darken-2"
              variant="outlined"
              :placeholder="$t('article.translationPlaceholder')"
              rows="20"
              color="primary"
              readonly
              :label="$t('article.translation')"
              hide-details
              noResize
              active
            >
            </v-textarea>
          </perfect-scrollbar>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="h-100">
          <v-toolbar rounded="md" elevation="1" color="primary" class="toolbar">
            <v-app-bar-nav-icon>
              <Icon
                class="mx-auto"
                width="26"
                icon="solar:documents-minimalistic-line-duotone"
              />
            </v-app-bar-nav-icon>
            <v-toolbar-title>
              {{ $t("article.sentenceSegmentation") }}</v-toolbar-title
            >
            <div class="text-body-1 font-weight-black d-flex align-center">
              <span>{{ $t("voice.voiceModel") }}:</span>
              {{ articleStore.voiceConfig.localName }}
              <v-chip
                color="white"
                size="small"
                label
                class="ml-1"
                :prepend-icon="
                  articleStore.voiceConfig.gender === Gender.Man
                    ? 'mdi-face-man-shimmer'
                    : 'mdi-face-woman-shimmer'
                "
              >
                {{ getLanguageName(articleStore.voiceConfig.language) }}</v-chip
              >
            </div>
            <v-spacer></v-spacer>

            <!-- speak button -->
            <v-btn icon @click="articleStore.showConfigDialog = true">
              <Icon
                class="mx-auto"
                width="26"
                icon="solar:settings-line-duotone"
              />
              <!-- tooltip -->
              <v-tooltip
                activator="parent"
                location="bottom"
                :text="$t('common.config')"
              />
            </v-btn>
          </v-toolbar>
          <perfect-scrollbar class="message-container">
            <MessageCard
              v-for="item in targetArticle"
              :key="item"
              :text="item"
            />
          </perfect-scrollbar>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="articleStore.showConfigDialog">
      <ConfigCard />
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
.message-container {
  height: calc(100vh - 100px);
  overflow: scroll;
}
</style>
