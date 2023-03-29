<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useChatStore } from "@/stores/chatStore";
import {
  getModelsApi,
  getBalanceApi,
  createTranscriptionApi,
} from "@/api/gptApi";

const chatStore = useChatStore();

const models = ref<any>([]);
const balanceInfo = ref();

const getModels = async () => {
  const res = await getModelsApi();
  models.value = res.data.data.map((model: any) => model.id).sort();
};

const getBalanceInfo = async () => {
  const res = await getBalanceApi();
  balanceInfo.value = res.data;
};

const recorder = ref<any>();
const isRecording = ref(false);
const audioUrl = ref(null);

const startRecording = async () => {
  // 获取用户媒体权限，视频的话参数{audio: true, video: true}
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // 创建媒体流
      recorder.value = new MediaRecorder(stream);
      const audioChunks = <any>[];
      // 录音开始
      recorder.value.start();
      // 录音数据
      recorder.value.ondataavailable = (e: any) => {
        audioChunks.push(e.data);
        console.log("录音数据");
        console.log(e);
      };
      // 录音结束
      recorder.value.onstop = async (e: any) => {
        const audioBlob = new Blob(audioChunks);
        const blob = new Blob(audioChunks, { type: "audio/wav" });
        const file = new File([blob], "recording.wav", {
          type: "audio/wav",
        });
        const formData = new FormData();
        formData.append("file", file);
        formData.append("model", "whisper-1");

        const res = await createTranscriptionApi(formData);
        console.log(res);

        console.log("录音结束");
        console.log(e);
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

const stopRecording = () => {
  if (recorder.value) {
    recorder.value.stop();
    isRecording.value = false;
  }
};
onMounted(() => {});
</script>

<template>
  <div class="pa-5">
    <v-card class="my-10 pa-10">
      <h1 class="my-5">Control Panel</h1>
      <v-btn color="blue" class="mr-2" @click="getModels">获取ModelList</v-btn>
      <v-btn color="blue" class="mr-2" @click="getBalanceInfo"
        >获取BalanceInfo</v-btn
      >
      <v-btn color="blue" class="mr-2" @click="startRecording">开始录音</v-btn>
      <v-btn color="success" @click="stopRecording">结束录音</v-btn>
    </v-card>
    <v-row align="center">
      <v-col cols="12" md="3">
        <v-card max-width="400" height="500" class="mx-auto">
          <perfect-scrollbar class="models-container">
            <v-divider></v-divider>
            <v-list nav>
              <v-list-item
                v-for="model in models"
                :key="model"
                prepend-icon="mdi-image"
                :title="model"
                active-class="active-nav"
                to=""
              ></v-list-item>
            </v-list>
          </perfect-scrollbar>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card max-width="400" height="500" class="mx-auto">
          <perfect-scrollbar v-if="balanceInfo" class="models-container">
            <p>{{ balanceInfo.object }}</p>
            <p>{{ balanceInfo.total_granted }}</p>
            <p>{{ balanceInfo.total_used }}</p>
            <!-- {{ balanceInfo }} -->
          </perfect-scrollbar>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.active-nav {
  border-left: 5px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #586ff5, #d53a9d);
  color: #705cf6;
}
.models-container {
  height: 800px;
}
</style>
