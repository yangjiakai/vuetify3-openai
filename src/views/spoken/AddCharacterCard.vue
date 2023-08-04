<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSpeechStore } from "@/stores/speechStore";
const speechStore = useSpeechStore();
const voices = ref<any>([]);
const getVoices = async () => {
  const languages = ["ja-JP", "en-US", "zh-CN", "zh-HK"];
  const allVoices = await speechStore.getVoices();
  voices.value = allVoices?.filter((voice) => languages.includes(voice.locale));

  console.log("voices", voices.value);
};

onMounted(() => {
  getVoices();
});

const getAvatar = (voice) => {
  return voice.privGender === 2
    ? "https://img.icons8.com/bubbles/50/user-male.png"
    : "https://img.icons8.com/bubbles/50/bartender-female.png";
};

const getGender = () => {};
</script>

<template>
  <v-card class="mx-auto pa-2" width="400">
    <v-card>
      <v-card-title> 角色 </v-card-title>
      <v-divider></v-divider>
    </v-card>
    <v-list height="400" class="pa-1" lines="three" density="compact">
      <!-- ---------------------------------------------- -->
      <!-- Profile Area -->
      <!-- ---------------------------------------------- -->
      <v-list-item elevation="1" class="my-1" v-for="voice in voices">
        <template v-slot:prepend>
          <v-avatar size="50">
            <v-img :src="getAvatar(voice)"></v-img>
          </v-avatar>
        </template>

        <v-list-item-title class="font-weight-bold text-primary">
          {{ voice.privLocalName }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ voice.locale }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <v-btn color="info" @click="getGender">选定</v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-card class="mt-5">
      <v-card-title> 声音设定 </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <!-- Rate -->
        <v-row class="align-center">
          <v-col cols="12" sm="2" class="pb-sm-3 pb-0">
            <v-label class="font-weight-medium">Rate</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-slider
              v-model="speechStore.voiceRate"
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
            <v-label class="font-weight-medium">Emotion</v-label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-select
              variant="outlined"
              hide-details
              density="compact"
              :items="[]"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
