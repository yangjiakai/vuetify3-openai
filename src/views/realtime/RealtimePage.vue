<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSpeechStore } from "@/stores/speechStore";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useAppStore } from "@/stores/appStore";
const speechStore = useSpeechStore();
const snackbarStore = useSnackbarStore();
const appStore = useAppStore();

const sourceArticle = ref("");
const targetArticle = ref("");
const isRecording = ref(false);

const recorder = ref<MediaRecorder | null>(null);
const startRecording = async () => {
  isRecording.value = true;
  // 调用微软语音识别，语音转文字
  try {
    const text = await speechStore.speechToText({
      language: "ja-JP",
    });

    sourceArticle.value = text;
  } catch (error) {
    console.error("Speech to text failed:", error);
  }

  // 开启麦克风，进行录音
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // 创建媒体流

      recorder.value = new MediaRecorder(stream);
      const audioChunks = <any>[];
      // 录音开始
      recorder.value.start();

      // 更改录音状态

      // 录音数据
      recorder.value.ondataavailable = (e: any) => {
        audioChunks.push(e.data);
      };
      // 录音结束
      recorder.value.onstop = async (e: any) => {
        const blob = new Blob(audioChunks, { type: "audio/wav" });
        recorder.value = null;
        console.log("blob", blob);

        speechStore.stopSpeechToText();
      };
    })
    .catch((error) => {
      snackbarStore.showErrorMessage(error.message);
    });
};

const stopRecording = () => {
  if (recorder.value) {
    recorder.value.stop();
  }
  speechStore.stopSpeechToText();
  isRecording.value = false;
};
</script>

<template>
  <div class="h-100 bg-grey-lighten-5 pa-5 pb-0">
    <v-row class="h-100" align="stretch">
      <v-col cols="12" md="6">
        <v-card class="h-100" rounded="md">
          <v-toolbar rounded="md" elevation="1" color="primary" class="toolbar">
            <v-app-bar-nav-icon @click="">
              <Icon
                class="mx-auto"
                width="26"
                icon="solar:document-add-line-duotone"
              />
            </v-app-bar-nav-icon>
            <v-toolbar-title>实时听录</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- recording button -->
            <v-btn icon @click="startRecording">
              <v-icon> mdi-microphone </v-icon>
              <!-- tooltip -->
              <v-tooltip activator="parent" location="bottom" text="录音" />
            </v-btn>
            <!-- stop reacording button -->
            <v-btn icon @click="stopRecording">
              <v-icon> mdi-stop-circle-outline </v-icon>
              <!-- tooltip -->
              <v-tooltip activator="parent" location="bottom" text="停止录音" />
            </v-btn>
            <!-- speak button -->
            <v-btn icon @click="">
              <v-icon> mdi-play-circle-outline </v-icon>
              <!-- tooltip -->
              <v-tooltip
                activator="parent"
                location="bottom"
                :text="$t('article.read')"
              />
            </v-btn>

            <!-- translate -->
            <v-btn icon @click="">
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
              v-model="speechStore.recordingText"
              class="ma-5 text-grey-darken-2"
              variant="outlined"
              :placeholder="$t('article.originalPlaceholder')"
              rows="20"
              color="primary"
              :label="$t('article.original')"
              :counter="5000"
              persistentCounter
              noResize
              :maxlength="5000"
            >
            </v-textarea>
            <v-textarea
              v-model="targetArticle"
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
    </v-row>
  </div>
</template>

<style scoped lang="scss"></style>
