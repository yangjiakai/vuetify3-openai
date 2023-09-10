<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSpeechStore } from "@/stores/speechStore";
import MessageCard from "./MessageCard.vue";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { Gender } from "~/src/enums";
import { readStream } from "@/utils/aiUtils";
import { Icon } from "@iconify/vue";
const speechStore = useSpeechStore();
const snackbarStore = useSnackbarStore();
const sourceArticle = ref(`
そのせいで大学落ちて浪人することになったのですが、やっと受かった大学にもほとんど行かず、ずっとプログラミングのバイトをしていました。
夏休みは思いっきりプログラムを書こうと思って、バイト先に入り浸っていたら、正社員よりも給料が高くなってドン引きされたことが記憶に残っています。
`);
const targetArticle = ref<string[]>([]);
const transferArtile = (text: string) => {
  return text.split(/[。？！：\n.?!]/).filter((item) => item.trim() !== "");
};

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

watch(
  () => sourceArticle.value,
  (newVal) => {
    targetArticle.value = transferArtile(newVal);
  }
);

onMounted(() => {
  targetArticle.value = transferArtile(sourceArticle.value);
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
            { role: "user", content: sourceArticle.value },
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
            <v-app-bar-nav-icon>
              <Icon
                class="mx-auto"
                width="26"
                icon="solar:document-add-line-duotone"
              />
            </v-app-bar-nav-icon>
            <v-toolbar-title> 文章分析</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- speak button -->
            <v-btn icon @click="speakTest(sourceArticle)">
              <v-icon> mdi-play-circle-outline </v-icon>
              <!-- tooltip -->
              <v-tooltip activator="parent" location="bottom" text="阅读原文" />
            </v-btn>

            <!-- translate -->
            <v-btn icon @click="translation">
              <v-icon> mdi-translate </v-icon>
              <!-- tooltip -->
              <v-tooltip activator="parent" location="bottom" text="翻译" />
            </v-btn>
          </v-toolbar>
          <perfect-scrollbar class="message-container">
            <v-textarea
              v-model="sourceArticle"
              class="ma-5 text-grey-darken-2"
              variant="outlined"
              placeholder="请输入文章"
              rows="20"
              color="primary"
              label="原文"
              hide-details
              noResize
            >
            </v-textarea>
            <v-textarea
              v-model="translatedContent"
              class="ma-5 text-grey-darken-2"
              variant="outlined"
              placeholder="请输入文章"
              rows="20"
              color="primary"
              readonly
              label="译文"
              hide-details
              noResize
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
            <v-toolbar-title> 语句分割</v-toolbar-title>
            <v-spacer></v-spacer>
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
  </div>
</template>

<style scoped lang="scss">
.message-container {
  height: calc(100vh - 100px);
  overflow: scroll;
}
</style>
