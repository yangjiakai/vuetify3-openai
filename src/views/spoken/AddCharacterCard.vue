<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSpeechStore } from "@/stores/speechStore";
import { useSpokenStore } from "@/stores/spokenStore";
import { useDisplay } from "vuetify";
const speechStore = useSpeechStore();
const spokenStore = useSpokenStore();

const { mdAndUp } = useDisplay();

const getAvatar = (voice) => {
  return voice.privGender === 2
    ? "https://img.icons8.com/bubbles/50/user-male.png"
    : "https://img.icons8.com/bubbles/50/bartender-female.png";
};

const characterList = ref<any>([]);
const currentCharacter = ref<any>(null);

const getChracterList = () => {
  const languages = ["ja-JP", "en-US", "zh-CN", "zh-HK"];

  const activeVoices = speechStore.allVoices?.filter((voice: any) =>
    languages.includes(voice.locale)
  );

  characterList.value = activeVoices.map((voice: any) => {
    return {
      gender: voice.privGender,
      locale: voice.privLocale,
      localName: voice.privLocalName,
      fullName: voice.privLocaleName,
      modelName: voice.privShortName,
      styleList: voice.privStyleList,
    };
  });

  currentCharacter.value = characterList.value[0];
};

onMounted(() => {
  getChracterList();
});

const speakTest = (voice) => {
  const config = {
    voiceStyle: "",
    voiceRate: 1,
    gender: voice.gender,
    language: voice.locale,
    voiceName: voice.modelName,
  };
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
const chatTitle = ref("新会话");
const currentStyleList = computed(() => {
  if (currentCharacter.value && currentCharacter.value.styleList.length > 0) {
    currentStyle.value = currentCharacter.value.styleList[0];
  } else {
    currentStyle.value = "";
  }

  return currentCharacter.value?.styleList || [];
});

const addChat = () => {
  const id = Date.now();
  const voiceConfig = {
    voiceStyle: currentStyle.value,
    voiceRate: voiceRate.value,
    language: currentCharacter.value.locale,
    voiceName: currentCharacter.value.modelName,
    gender: currentCharacter.value.gender,
  };
  spokenStore.addChat(id, voiceConfig, chatTitle.value);
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
      <v-card-title> 角色 </v-card-title>
    </v-card>
    <v-divider></v-divider>
    <v-list height="400" class="pa-1" lines="three" densit y="compact">
      <!-- ---------------------------------------------- -->
      <!-- Profile Area -->
      <!-- ---------------------------------------------- -->
      <v-list-item
        @click="selectCharacter(voice)"
        elevation="1"
        class="my-1"
        :active="voice.localName === currentCharacter.localName"
        v-for="voice in characterList"
      >
        <template v-slot:prepend>
          <v-avatar size="50">
            <v-img :src="getAvatar(voice)"></v-img>
          </v-avatar>
        </template>

        <v-list-item-title class="font-weight-bold text-grey-darken-3">
          {{ voice.localName }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ voice.locale }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <span class="text-body-2 text-grey"> 试听 </span>

          <v-btn
            class="ml-1"
            color="grey-lighten-1"
            variant="text"
            @click="speakTest(voice)"
            size="20"
          >
            <template v-slot:prepend>
              <v-icon size="20" color="#6746F5">mdi-play-circle-outline</v-icon>
            </template>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-card min-height="200" class="mt-5">
      <v-card-title> 声音设定 </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <!-- Rate -->
        <v-row class="align-center">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0">
            <v-label class="font-weight-medium">语速</v-label>
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
            <v-label class="font-weight-medium">风格</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-select
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
      <v-btn color="gray">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="addChat">Create Chat</v-btn>
    </v-card-actions>
    <!-- <v-row>
      <v-col cols="4" v-for="voice in voices">
        <v-card>
          <v-card-title>{{ voice.privLocalName }}</v-card-title>
          <v-card-text>{{ voice.locale }}</v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
  </v-card>
</template>

<style scoped lang="scss"></style>
