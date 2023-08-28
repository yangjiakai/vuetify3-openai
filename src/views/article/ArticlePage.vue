<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSpeechStore } from "@/stores/speechStore";
import MessageCard from "./MessageCard.vue";
import { Gender } from "~/src/enums";
const speechStore = useSpeechStore();
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
              </template>
            </v-textarea>
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
  height: 95vh;
}

.message-container {
  height: 100%;
}
</style>
