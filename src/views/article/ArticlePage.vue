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
const speechStore = useSpeechStore();
const snackbarStore = useSnackbarStore();
const sourceArticle = ref(`
そのせいで大学落ちて浪人することになったのですが、やっと受かった大学にもほとんど行かず、ずっとプログラミングのバイトをしていました。
夏休みは思いっきりプログラムを書こうと思って、バイト先に入り浸っていたら、正社員よりも給料が高くなってドン引きされたことが記憶に残っています。
`);
const targetArticle = ref<string[]>([]);
const transferArtile = (text: string) => {
  return text.split(/[。？！：\n]/).filter((item) => item.trim() !== "");
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
  <v-container class="fluid">
    <v-card class="content">
      <v-card-title class="font-weight-bold text-grey-darken-2">
        文章分析
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="sourceArticle"
              label="文章"
              variant="solo-inverted"
              placeholder="请输入文章"
              rows="30"
            >
              <template #append>
                <v-icon color="primary" @click="speakTest(sourceArticle)">
                  mdi-play-circle-outline
                </v-icon>
                <!-- translate -->
                <v-icon color="primary" @click="translation"
                  >mdi-translate</v-icon
                >
              </template>
            </v-textarea>
            <v-card height="400" class="mt-5">
              {{ translatedContent }}
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <perfect-scrollbar class="message-container">
              <MessageCard
                v-for="item in targetArticle"
                :key="item"
                :text="item"
              />
            </perfect-scrollbar>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
.content {
  height: calc(100vh - 30px);
}

.message-container {
  height: calc(100vh - 100px);
}
</style>
