<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSpeechStore } from "@/stores/speechStore";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useCollectionStore } from "@/stores/collectionStore";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { formatForTTS } from "@/utils/aiUtils";
import { Icon } from "@iconify/vue";
import { readStream } from "@/utils/aiUtils";
import { ReadMode } from "@/enums";
import moment from "moment";
import { useAppStore } from "@/stores/appStore";
const appStore = useAppStore();

const collectionStore = useCollectionStore();
const speechStore = useSpeechStore();
interface Props {
  message: Chat.SpokenMessage;
  isLoading?: boolean;
  role?: Chat.Role;
  dateTime?: string;
  voiceConfig: Chat.VoiceConfig;
}
const snackbarStore = useSnackbarStore();
const props = defineProps<Props>();
const content = computed(() => {
  return props.message.messageBody.content;
});

const readMessage = async () => {
  const config = {
    ...props.voiceConfig,
  };

  const text = formatForTTS(content.value);

  await speechStore.ssmlToSpeech(
    text,
    config,
    ReadMode.Read,
    props.message.messageId
  );
};

const translatedContent = ref("");
const isTranslating = ref(false);

const translation = async () => {
  isTranslating.value = true;
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
          messages: [
            {
              role: "system",
              content: appStore.localPrompt,
            },
            { role: "user", content: content.value },
          ],
          model: "gpt-4o-mini",
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
  } finally {
    isTranslating.value = false;
  }
};

// 将语句添加到句子收藏列表
const handleCollect = () => {
  const sentence = {
    sentenceId: props.message.messageId,
    text: formatForTTS(content.value),
    voiceConfig: props.voiceConfig,
  } as Collection.Sentence;

  if (collectionStore.isCollected(sentence.sentenceId)) {
    collectionStore.removeSentence(sentence.sentenceId);
    snackbarStore.showSuccessMessage("Collecte Cancelled");
  } else {
    collectionStore.addSentence(sentence);
    snackbarStore.showSuccessMessage("Collected");
  }
};

const isCollected = computed(() => {
  return collectionStore.isCollected(props.message.messageId);
});

const getDateTime = computed(() => {
  return moment(props.dateTime).format("MM/DD HH:mm");
});
</script>

<template>
  <div>
    <!-- AI信息 -->
    <div v-if="props.role === 'assistant'">
      <div class="pa-5 d-flex align-start flex-row">
        <v-avatar
          class="mr-4"
          rounded="xl"
          variant="outlined"
          color="grey-lighten-1"
        >
          <img src="@/assets/images/avatars/avatar_assistant.jpg" alt="alt" />
        </v-avatar>
        <div>
          <v-card class="rounded-xl rounded-bs-0 mr-15">
            <div>
              <MdPreview :modelValue="props.message.messageBody.content" />
              <div
                v-if="translatedContent"
                class="mx-5 mb-5 text-body-2 text-blue-grey-darken-2"
              >
                {{ translatedContent }}
              </div>
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
                  <v-tooltip activator="parent" location="bottom" text="朗读">
                  </v-tooltip>
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
                    <Icon
                      class="text-primary"
                      icon="svg-spinners:bars-scale-fade"
                    />
                  </template>
                </v-btn>

                <v-btn
                  class="mr-3"
                  color="grey-lighten-1"
                  variant="text"
                  @click="translation"
                  size="20"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="isTranslating ? 'primary' : ''"
                      class="tool-icon"
                      size="18"
                      >mdi-translate</v-icon
                    >
                    <v-tooltip activator="parent" location="bottom" text="翻译">
                    </v-tooltip>
                  </template>
                </v-btn>
                <v-btn
                  variant="text"
                  @click="handleCollect"
                  size="20"
                  color="grey-lighten-1"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="isCollected ? 'primary' : ''"
                      class="tool-icon"
                      size="18"
                      >{{
                        isCollected ? "mdi-heart" : "mdi-heart-outline"
                      }}</v-icon
                    >
                    <v-tooltip activator="parent" location="bottom" text="收藏">
                    </v-tooltip>
                  </template>
                </v-btn>
              </div>
            </div>
          </v-card>
          <div class="mt-2 ml-1 text-grey-lighten-1 text-caption">
            {{ getDateTime }}
          </div>
        </div>
      </div>
    </div>
    <!-- 用户信息 -->
    <div v-else-if="props.role === 'user'">
      <div class="pa-5 d-flex align-start flex-row-reverse">
        <v-avatar
          class="ml-4"
          rounded="xl"
          variant="outlined"
          color="grey-lighten-1"
        >
          <img src="@/assets/images/avatars/avatar_user.jpg" alt="alt" />
        </v-avatar>
        <div>
          <v-card class="gradient purple rounded-xl rounded-be-0">
            <v-card-text class="ml-1 mt-1">
              <b> {{ props.message.messageBody.content }}</b></v-card-text
            >
            <div
              v-if="translatedContent"
              class="mx-5 mb-5 text-body-2 text-blue-grey-lighten-4"
            >
              {{ translatedContent }}
            </div>
            <div class="toolbox px-5 pb-5">
              <v-btn
                class="mr-3"
                color="white"
                variant="text"
                @click="readMessage"
                size="20"
                v-if="!props.message.isReading"
              >
                <template v-slot:prepend>
                  <v-icon class="tool-icon" size="18">mdi-volume-high</v-icon>
                </template>
                <v-tooltip activator="parent" location="bottom" text="朗读">
                </v-tooltip>
              </v-btn>
              <v-btn
                class="mr-3"
                color="white"
                variant="text"
                @click="readMessage"
                size="20"
                v-else
              >
                <template v-slot:prepend>
                  <Icon icon="svg-spinners:bars-scale-fade" />
                </template>
              </v-btn>

              <v-btn
                class="mr-3"
                color="white"
                variant="text"
                @click="translation"
                size="20"
              >
                <template v-slot:prepend>
                  <v-icon
                    :color="isTranslating ? '#ccc' : ''"
                    class="tool-icon"
                    size="18"
                    >mdi-translate</v-icon
                  >
                  <v-tooltip activator="parent" location="bottom" text="翻译">
                  </v-tooltip>
                </template>
              </v-btn>
            </div>
          </v-card>
          <div class="mt-2 mr-1 text-right text-grey-lighten-1 text-caption">
            {{ getDateTime }}
          </div>
        </div>
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
