<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 语音对话对话窗口
-->
<script setup lang="ts">
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useSpokenStore } from "@/stores/spokenStore";
import { useSpeechStore } from "@/stores/speechStore";
import SidebarToggle from "@/components/SidebarToggle.vue";
import { Icon } from "@iconify/vue";
import SpokenMessageCard from "./SpokenMessageCard.vue";

import {
  scrollToBottom,
  getLanguageName,
  getLanguageNameEn,
} from "@/utils/common";
import { formatForTTS, countAndCompleteCodeBlocks } from "@/utils/aiUtils";

import { Vue3Lottie } from "vue3-lottie";
import { Gender, ReadMode } from "@/enums";

import { useCosyVice } from "@/composable/useCosyVice";

const { generateAudio, statusMessage, isLoading, isPlaying, stopPlayback } =
  useCosyVice();

const route = useRoute();
const speechStore = useSpeechStore();
const snackbarStore = useSnackbarStore();
const spokenStore = useSpokenStore();
const messages = ref<Chat.SpokenMessage[]>([]);
const currentId = ref(+route.params.id);
const voiceConfig = ref<Chat.VoiceConfig>({
  gender: Gender.Woman,
  voiceName: "",
  language: "",
  voiceRate: 1,
  voiceStyle: "",
  localName: "",
});

const promptMessage = computed(() => {
  return [
    {
      content: `I want you to act as a spoken ${getLanguageNameEn(
        voiceConfig.value.language
      )} teacher and improver. I will speak to you in ${getLanguageNameEn(
        voiceConfig.value.language
      )} and you will reply to me in ${getLanguageNameEn(
        voiceConfig.value.language
      )} to practice my spoken ${getLanguageNameEn(
        voiceConfig.value.language
      )}. I want you to keep your reply neat, limiting the reply to 100 words. I want you to strictly correct my grammar mistakes, typos, and factual errors. I want you to ask me a question in your reply. Now let's start practicing, you could ask me a question first. Remember, I want you to strictly correct my grammar mistakes, typos, and factual errors.`,
      role: "system",
    },
  ];
});

onMounted(() => {
  messages.value = spokenStore.getChatHistory(currentId.value);
  voiceConfig.value = spokenStore.getVoiceConfig(currentId.value);
});

const requestMessages = computed(() => {
  const pureMessages = messages.value.map((message) => {
    return {
      content: message.messageBody.content,
      role: message.messageBody.role,
    };
  });

  if (pureMessages.length <= 6) {
    return [...promptMessage.value, ...pureMessages];
  } else {
    // 截取最新的6条信息
    const slicedMessages = pureMessages.slice(-4);
    return [...promptMessage.value, ...slicedMessages];
  }
});

watch(
  () => route.params.id,
  (newVal) => {
    // historyId.value = newVal;
    currentId.value = +newVal;
    messages.value = spokenStore.getChatHistory(currentId.value);
    voiceConfig.value = spokenStore.getVoiceConfig(currentId.value);
  }
);

const inputRow = ref(1);
// User Input Message
const userMessage = ref("");
const sendMessage = () => {
  // 如果信息为空，则不发送
  if (userMessage.value.trim() === "") return;

  spokenStore.addHistory(currentId.value, {
    messageId: Date.now(),
    messageTime: Date.now().toString(),
    isReading: false,
    messageBody: {
      content: userMessage.value,
      role: "user",
    },
  });

  inputRow.value = 1;

  userMessage.value = "";
  createCompletion();
};

const createCompletion = async () => {
  try {
    const completion = await fetch(
      "https://api.openai-proxy.com/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          messages: requestMessages.value,
          model: "gpt-4o-mini",
          // max_tokens: 100,

          // stream: true,
        }),
      }
    );

    // 处理错误信息
    if (!completion.ok) {
      const errorData = await completion.json();
      snackbarStore.showErrorMessage(errorData.error.message);
      return;
    }

    const res = await completion.json();

    // 添加AI信息
    const msgId = Date.now();
    spokenStore.addHistory(currentId.value, {
      messageId: msgId,
      messageTime: Date.now().toString(),
      isReading: false,
      messageBody: {
        content: res.choices[0].message.content,
        role: "assistant",
      },
    });
    readMessage(msgId, res.choices[0].message.content);
  } catch (error) {
    snackbarStore.showErrorMessage(error.message);
  }
};

const readMessage = async (messageId: Chat.Id, text: string) => {
  const config = {
    ...voiceConfig.value,
  };

  const formmatedText = formatForTTS(text);

  // speechStore.ssmlToSpeech(formmatedText, config, ReadMode.Read, messageId);
  const params = {
    mode: "sft",
    text: formmatedText,
    speaker: "中文女",
    promptText: "",
    audioFile: null,
  };

  await generateAudio(params);
};

const displayMessages = computed(() => {
  const messagesCopy = messages.value.slice(); // 创建原始数组的副本
  const lastMessage = messagesCopy[messagesCopy.length - 1];
  const updatedLastMessage = {
    ...lastMessage,
    content: countAndCompleteCodeBlocks(lastMessage.messageBody.content),
  };
  messagesCopy[messagesCopy.length - 1] = updatedLastMessage;
  return messagesCopy;
});

watch(
  () => messages.value,
  (val) => {
    if (val) {
      console.log("scroll");

      scrollToBottom(document.querySelector(".message-container"));
    }
  },
  {
    deep: true,
  }
);

const isRecording = ref(false);

const recorder = ref<MediaRecorder | null>(null);
const startRecording = async () => {
  isRecording.value = true;
  // 调用微软语音识别，语音转文字
  try {
    const text = await speechStore.speechToText({
      language: voiceConfig.value.language,
    });

    userMessage.value = text;
    sendMessage();
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

        // const file = new File([blob], "recording.wav", {
        //   type: "audio/wav",
        // });
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
  <div class="chat-container">
    <v-toolbar color="white" class="text-grey-darken-2" border>
      <SidebarToggle />
      <div>
        <div class="text-body-1 font-weight-black d-flex align-center">
          <span>{{ $t("voice.voiceModel") }}:</span> {{ voiceConfig.localName }}
          <v-chip
            color="primary"
            size="small"
            label
            class="ml-1"
            :prepend-icon="
              voiceConfig.gender === Gender.Man
                ? 'mdi-face-man-shimmer'
                : 'mdi-face-woman-shimmer'
            "
          >
            {{ getLanguageName(voiceConfig.language) }}</v-chip
          >
        </div>
      </div>
    </v-toolbar>

    <div class="message-area">
      <perfect-scrollbar v-if="messages.length > 1" class="message-container">
        <template v-for="message in displayMessages" :key="message.id">
          <SpokenMessageCard
            :message="message"
            :role="message.messageBody.role"
            :voiceConfig="voiceConfig"
          />
        </template>
      </perfect-scrollbar>

      <div
        class="no-message-container d-flex justify-center flex-column"
        v-else
      >
        <div class="mb-15">
          <div class="d-flex justify-center">
            <Icon
              class="text-primary"
              width="100"
              icon="solar:emoji-funny-square-bold-duotone"
            />
          </div>
          <h2 class="mt-5 text-center font-weight-black text-grey-darken-1">
            {{ $t("spoken.startSlogan") }}
          </h2>

          <!-- <Vue3Lottie
            animationLink="https://assets4.lottiefiles.com/packages/lf20_jpxsQh.json"
            :height="200"
            :width="200"
          /> -->
        </div>
      </div>
    </div>

    <div class="input-area">
      <v-sheet
        color="transparent"
        elevation="0"
        class="input-panel d-flex align-center justify-center"
      >
        <!-- <Vue3Lottie
          animationLink="https://lottie.host/847e58b9-0ad3-4e2e-9b48-58d45f8eae1f/LAHBICt4ey.json"
          :height="200"
          :width="200"
        /> -->

        <div class="animation-box">
          <keep-alive>
            <v-btn
              @click="startRecording"
              v-if="!isRecording"
              size="67"
              color="#6746F5"
              icon
            >
              <Icon
                color="white"
                icon="solar:microphone-bold-duotone"
                width="40"
              />
            </v-btn>
            <Vue3Lottie
              @click="stopRecording"
              v-else
              animationLink="https://lottie.host/b6030738-0d4e-40f3-b9b0-fa1206503ae5/p2yVzhDDc4.json"
              :height="150"
              :width="150"
            />
          </keep-alive>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-title {
  height: 64px;

  border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
}

.chat-container {
  background-color: rgba(255, 255, 255, 1);
  background-repeat: repeat;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .message-container {
    flex: 1;

    padding-bottom: 170px;
  }

  .input-area {
    position: absolute;
    background-color: rgba(255, 255, 255, 1);
    width: 100%;
    bottom: 0;

    align-items: center;
    border-top: 1px dotted rgba(0, 0, 0, 0.1);

    .input-panel {
      border-radius: 5px;
      max-width: 1200px;
      margin: 0 auto;
      .animation-box {
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.message-container {
  padding-bottom: 100px;
  height: calc(100vh - 64px);
  background-color: rgba(255, 255, 255, 1);
}

.no-message-container {
  height: calc(100vh - 64px);
}
</style>
