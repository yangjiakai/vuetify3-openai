<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useArticleStore } from "@/stores/articleStore";
import { useSpeechStore } from "@/stores/speechStore";

import { useDisplay } from "vuetify";
import { Gender } from "~/src/enums";
import initCharacterList from "@/data/characterData";

const speechStore = useSpeechStore();

const articleStore = useArticleStore();

const { mdAndUp } = useDisplay();

const characterList = ref<any>(initCharacterList);
const currentCharacter = ref<any>("");

onMounted(() => {
  characterList.value = initCharacterList;
  currentCharacter.value = characterList.value[0];
});

const speakTest = (voice) => {
  const config = {
    voiceStyle: "",
    voiceRate: 1,
    gender: voice.gender,
    language: voice.locale,
    voiceName: voice.modelName,
    localName: voice.localName,
  };
  console.log(config);

  const text = getTestText(voice.locale);

  speechStore.ssmlToSpeech(text, config, "test");
};

const getTestText = (lang: string) => {
  let text = "我们来聊天吧";
  if (lang === "en-US") {
    text = "Let's chat";
  } else if (lang === "ja-JP") {
    text = "話しましょう";
  } else if (lang === "ko-KR") {
    text = "대화하자";
  } else if (lang === "zh-CN") {
    text = "我们来聊天吧";
  } else if (lang === "zh-HK") {
    text = "我們來聊天吧";
  } else if (lang === "zh-TW") {
    text = "我們來聊天吧";
  }
  return text;
};

const selectCharacter = (character) => {
  currentCharacter.value = character;
};

const currentStyle = ref("");
const voiceRate = ref(1);

const currentStyleList = computed(() => {
  if (currentCharacter.value && currentCharacter.value.styleList.length > 0) {
    currentStyle.value = currentCharacter.value.styleList[0];
  } else {
    currentStyle.value = "";
  }

  return currentCharacter.value?.styleList || [];
});

// handle Cancel
const handleCancel = () => {
  articleStore.showConfigDialog = false;
};

// handle Confirm
const handleConfirm = () => {
  const voiceConfig = {
    voiceStyle: currentStyle.value,
    voiceRate: voiceRate.value,
    language: currentCharacter.value.locale,
    voiceName: currentCharacter.value.modelName,
    gender: currentCharacter.value.gender,
    localName: currentCharacter.value.localName,
  };
  articleStore.voiceConfig = voiceConfig;
  articleStore.showConfigDialog = false;
};
</script>

<template>
  <v-card
    class="mx-auto pa-2"
    :width="mdAndUp ? '500' : '100%'"
    max-height="90%"
    style="overflow: scroll"
  >
    <v-card>
      <v-card-title class="font-weight-bold text-grey-darken-2">
        语音设定
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list height="310" class="pa-1" lines="two" density="compact">
          <!-- ---------------------------------------------- -->
          <!-- Profile Area -->
          <!-- ---------------------------------------------- -->
          <v-list-item
            @click="selectCharacter(voice)"
            elevation="1"
            class="my-1"
            :active="voice.localName === currentCharacter.localName"
            v-for="voice in characterList"
            color="primary"
          >
            <template v-slot:prepend>
              <v-icon size="30">{{
                voice.gender === Gender.Man
                  ? "mdi-face-man-shimmer"
                  : "mdi-face-woman-shimmer"
              }}</v-icon>
            </template>

            <v-list-item-title class="font-weight-bold">
              {{ voice.localName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ voice.locale }}
            </v-list-item-subtitle>

            <template v-slot:append>
              <span class="text-body-2 text-grey-lighten-1 font-weight-bold">
                试听
              </span>

              <v-btn
                class="ml-1"
                color="grey-lighten-1"
                variant="text"
                @click.stop="speakTest(voice)"
                size="20"
              >
                <template v-slot:prepend>
                  <v-icon
                    size="20"
                    :color="
                      voice.localName === currentCharacter.localName
                        ? 'primary'
                        : 'primary-lighten-2'
                    "
                    >mdi-play-circle-outline</v-icon
                  >
                </template>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>

    <v-divider></v-divider>

    <v-card min-height="200" class="mt-5">
      <v-card-title class="font-weight-bold text-grey-darken-2">
        声音设定
      </v-card-title>

      <v-divider></v-divider>
      <v-card-text>
        <!-- Rate -->
        <v-row class="align-center">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0">
            <v-label class="font-weight-bold text-grey-darken-2">语速</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-slider
              color="primary"
              v-model="voiceRate"
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
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0">
            <v-label class="font-weight-bold text-grey-darken-2">风格</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-select
              color="primary"
              variant="outlined"
              v-model="currentStyle"
              hide-details
              density="compact"
              :items="currentStyleList"
              :disabled="currentStyleList.length === 0"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card-actions>
      <v-btn color="grey" class="font-weight-bold" @click="handleCancel"
        >取消</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn color="primary" class="font-weight-bold" @click="handleConfirm"
        >确认</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="scss"></style>
