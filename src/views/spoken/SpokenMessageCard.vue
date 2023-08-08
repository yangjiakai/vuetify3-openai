<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSpeechStore } from "@/stores/speechStore";
import { type Message } from "@/types/spokenTypes";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { formatForTTS } from "@/utils/aiUtils";
import { Icon } from "@iconify/vue";
const speechStore = useSpeechStore();
interface Props {
  message: Message;
  isLoading?: boolean;
  role?: "user" | "assistant" | "system";
  dateTime?: string;
}

const props = defineProps<Props>();

const readMessage = () => {
  const config = {
    messageId: props.message.id || 0,
    voiceEmotion: "",
    voiceRate: 1.1,
    language: "zh-CN",
    VoiceName: "zh-CN-XiaoxiaoNeural",
  };

  const text = formatForTTS(props.message.body.content);

  speechStore.ssmlToSpeech(text, config);
};
</script>

<template>
  <div>
    <!-- 朋友信息 -->
    <div v-if="props.role === 'assistant'">
      <div class="pa-5 d-flex align-start flex-row">
        <v-avatar class="mr-4" rounded="sm" variant="elevated">
          <img src="@/assets/images/avatars/avatar_assistant.jpg" alt="alt" />
        </v-avatar>
        <v-card class="rounded-xl rounded-bs-0">
          <div>
            <MdPreview :modelValue="props.message.body.content" />
            <div class="toolbox px-5 pb-5">
              <v-btn
                class="mr-3"
                color="grey-lighten-1"
                variant="text"
                @click="readMessage"
                size="20"
                v-if="!props.message.isReading"
              >
                <template v-slot:prepend>
                  <v-icon class="tool-icon" size="18">mdi-volume-high</v-icon>
                </template>
              </v-btn>
              <v-btn
                class="mr-3"
                color="grey-lighten-1"
                variant="text"
                @click="readMessage"
                size="20"
                v-else
              >
                <template v-slot:prepend>
                  <Icon color="#705CF6" icon="svg-spinners:bars-scale-fade" />
                </template>
              </v-btn>

              <v-btn
                class="mr-3"
                color="grey-lighten-1"
                variant="text"
                @click=""
                size="20"
              >
                <template v-slot:prepend>
                  <v-icon class="tool-icon" size="18">mdi-translate</v-icon>
                </template>
              </v-btn>
              <v-btn variant="text" @click="" size="20" color="grey-lighten-1">
                <template v-slot:prepend>
                  <v-icon class="tool-icon" size="18">mdi-heart-outline</v-icon>
                </template>
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>
    </div>
    <!-- 用户信息 -->
    <div v-else-if="props.role === 'user'">
      <div class="pa-5 d-flex align-center flex-row-reverse">
        <v-avatar class="ml-4" rounded="lg" variant="elevated">
          <img src="@/assets/images/avatars/avatar_user.jpg" alt="alt" />
        </v-avatar>
        <v-card class="gradient gray rounded-xl rounded-be-0" theme="dark">
          <v-card-text>
            <b> {{ props.message.body.content }}</b></v-card-text
          >
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(#md-editor-v3-preview),
.user-message {
  font-size: 14px !important;
  font-weight: 600 !important;
}

.tool-icon:hover {
  color: #888;
}
</style>
