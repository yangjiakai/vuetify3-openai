<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSpeechStore } from "@/stores/speechStore";
const speechStore = useSpeechStore();

const speak = () => {
  console.log("speak");
  speechStore.ssmlToSpeech("我真的解决不了这个问题,我该怎么办");
};

const speak2 = () => {
  console.log("speak2");
  const config = {
    voiceEmotion: "",
    voiceRate: 1.4,
    language: "zh-CN",
    VoiceName: "zh-CN-XiaoxiaoNeural",
  };
  speechStore.ssmlToSpeech("我真的解决不了这个问题,我该怎么办", config);
};

const dialog = ref(false);

const model = ref(0);

const getVoices = async () => {
  const languages = ref(["ja-JP", "en-US", "zh-CN", "zh-HK"]);
  const allVoices = await speechStore.getVoices();
  const voices = allVoices?.filter((voice) =>
    languages.value.includes(voice.locale)
  );

  console.log("voices", voices);
};
</script>

<template>
  <div class="">
    CreatorPage

    <v-btn color="success" @click="speak">text</v-btn>

    <v-btn color="success" @click="speak2">text2</v-btn>

    <v-btn color="success" @click="">text</v-btn>
    <v-btn color="success" @click="dialog = true">create new </v-btn>
    <v-btn color="success" @click="getVoices">获取声音列表 </v-btn>
    <v-dialog v-model="dialog">
      <v-card class="mx-auto" width="400" height="600">
        <v-slide-group
          v-model="model"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="n in 15"
            :key="n"
            v-slot="{ isSelected, toggle, selectedClass }"
          >
            <v-card
              color="grey-lighten-1"
              :class="['ma-2', selectedClass]"
              height="100"
              width="50"
              @click="toggle"
            >
              <div class="d-flex fill-height align-center justify-center">
                <v-scale-transition>
                  <v-icon
                    v-if="isSelected"
                    color="white"
                    size="48"
                    icon="mdi-close-circle-outline"
                  ></v-icon>
                </v-scale-transition>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
        <v-slide-group
          v-model="model"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="n in 15"
            :key="n"
            v-slot="{ isSelected, toggle, selectedClass }"
          >
            <v-card
              color="grey-lighten-1"
              :class="['ma-2', selectedClass]"
              height="100"
              width="50"
              @click="toggle"
            >
              <div class="d-flex fill-height align-center justify-center">
                <v-scale-transition>
                  <v-icon
                    v-if="isSelected"
                    color="white"
                    size="48"
                    icon="mdi-close-circle-outline"
                  ></v-icon>
                </v-scale-transition>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
