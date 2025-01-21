<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useChatHistoryStore } from "@/stores/chatHistoryStore";
import { countAndCompleteCodeBlocks } from "@/utils/aiUtils";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useAppStore } from "@/stores/appStore";
import MessageCard from "@/components/MessageCard.vue";
import { Vue3Lottie } from "vue3-lottie";
import { scrollToBottom } from "@/utils/common";
import SidebarToggle from "@/components/SidebarToggle.vue";
import ConfigDialog from "@/components/ConfigDialog.vue";
import { Icon } from "@iconify/vue";
const appStore = useAppStore();
const route = useRoute();
const snackbarStore = useSnackbarStore();
const chatHistoryStore = useChatHistoryStore();

const currentId = ref(+route.params.id);
const chatInfo = ref<Chat.Chat>();
const messages = ref<Chat.Message[]>([]);
const gptConfig = computed(() => {
  return (
    chatInfo.value?.gptConfig || {
      model: "gpt-4o-mini",
      temperature: 0.5,
      max_tokens: 2000,
      presence_penalty: 0,
      frequency_penalty: 0,
      history_number: 6,
      prompt: "",
      role: "",
      proxy: "",
    }
  );
});

const promptMessage = computed(() => {
  return [
    {
      content: chatInfo.value?.gptConfig.prompt,
      role: "system",
    },
  ];
});

onMounted(() => {
  chatInfo.value = chatHistoryStore.getChat(currentId.value);
  messages.value = chatHistoryStore.getChatHistory(currentId.value);
});

watch(
  () => route.params.id,
  (newVal) => {
    chatInfo.value = chatHistoryStore.getChat(currentId.value);
    messages.value = chatHistoryStore.getChatHistory(currentId.value);
  }
);

watch(
  () => chatHistoryStore.activeChat,
  (newVal) => {
    if (newVal) {
      chatInfo.value = newVal;
      messages.value = chatHistoryStore.getChatHistory(currentId.value);
    }
  },

  {
    deep: true,
  }
);

const requestMessages = computed(() => {
  const pureMessages = messages.value.map((message) => {
    return {
      content: message.messageBody.content,
      role: message.messageBody.role,
    };
  });

  if (pureMessages.length <= gptConfig.value.history_number) {
    return [...promptMessage.value, ...pureMessages];
  } else {
    // 截取最新的10条信息
    const slicedMessages = pureMessages.slice(-gptConfig.value.history_number);
    return [...promptMessage.value, ...slicedMessages];
  }
});

watch(
  () => route.params.id,
  (newVal) => {
    // historyId.value = newVal;
    currentId.value = +newVal;
    messages.value = chatHistoryStore.getChatHistory(currentId.value);
  }
);

const inputRow = ref(1);
// User Input Message
const userMessage = ref("");
const handleKeydown = (e) => {
  if (e.key === "Enter" && (e.altKey || e.shiftKey)) {
    // 当同时按下 alt或者shift 和 enter 时，插入一个换行符
    e.preventDefault();
    userMessage.value += "\n";
  } else if (e.key === "Enter") {
    // 当只按下 enter 时，发送消息
    e.preventDefault();
    sendMessage();
  }
};

const sendMessage = () => {
  // 如果信息为空，则不发送
  if (userMessage.value.trim() === "") return;

  chatHistoryStore.addHistory(currentId.value, {
    messageId: Date.now(),
    messageTime: Date.now().toString(),
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
          model: gptConfig.value.model,
          temperature: gptConfig.value.temperature,
          max_tokens: Number(gptConfig.value.max_tokens),
          presence_penalty: gptConfig.value.presence_penalty,
          frequency_penalty: gptConfig.value.frequency_penalty,
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

    // 添加AI信息
    const msgId = Date.now();
    chatHistoryStore.addHistory(currentId.value, {
      messageId: msgId,
      messageTime: Date.now().toString(),
      messageBody: {
        content: "",
        role: "assistant",
      },
    });

    // Read the stream
    chatHistoryStore.readStream(reader);
  } catch (error) {
    snackbarStore.showErrorMessage(error.message);
  }
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
      scrollToBottom(document.querySelector(".message-container"));
    }
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="chat-container">
    <v-toolbar color="white" class="text-grey-darken-2" border>
      <SidebarToggle />
      <div>
        <div class="text-body-1 font-weight-black d-flex align-center">
          <span>{{ $t("chat.theme") }}:</span>
          {{ chatInfo?.menuConfig.menuTitle }}
          <v-chip
            color="primary"
            size="small"
            label
            class="ml-1"
            prepend-icon="
            mdi-robot-excited-outline
            "
          >
            {{ chatInfo?.gptConfig.role }}</v-chip
          >
        </div>
      </div>
    </v-toolbar>
    <div class="message-area">
      <perfect-scrollbar v-if="messages.length > 1" class="message-container">
        <template v-for="message in displayMessages" :key="message.messageId">
          <MessageCard
            :content="message.messageBody.content"
            :role="message.messageBody.role"
          />
        </template>
      </perfect-scrollbar>

      <div class="no-message-container" v-else>
        <Vue3Lottie
          animationLink="https://assets4.lottiefiles.com/packages/lf20_jpxsQh.json"
          :height="200"
          :width="200"
        />
      </div>
    </div>
    <div class="input-area">
      <v-sheet
        color="transparent"
        elevation="0"
        class="input-panel d-flex align-end pa-1"
      >
        <v-btn
          class="mb-1"
          variant="elevated"
          icon
          @click="appStore.toggleConfigDialog"
        >
          <Icon
            class="text-primary"
            width="30"
            icon="solar:settings-line-duotone"
          />
          <v-tooltip
            activator="parent"
            location="top"
            :text="$t('chat.chatConfig')"
          ></v-tooltip>
        </v-btn>
        <v-btn
          class="ml-1 mb-1"
          variant="elevated"
          icon
          @click="chatHistoryStore.clearChatHistory(currentId)"
        >
          <!-- <v-icon size="30" class="text-primary">mdi-brash</v-icon> -->
          <Icon
            class="text-primary"
            width="30"
            icon="solar:notification-lines-remove-line-duotone"
          />
          <v-tooltip
            activator="parent"
            location="top"
            :text="$t('chat.clearHistory')"
          ></v-tooltip>
        </v-btn>

        <v-textarea
          class="mx-2"
          color="primary"
          type="text"
          clearable
          variant="solo"
          ref="input"
          v-model="userMessage"
          placeholder="Ask Anything"
          hide-details
          @keydown="handleKeydown"
          :rows="inputRow"
          @focus="inputRow = 3"
          @blur="inputRow = 1"
        >
        </v-textarea>

        <v-btn class="mb-1" color="primary" variant="elevated" icon>
          <Icon
            width="26"
            icon="solar:plain-bold-duotone"
            @click="sendMessage"
          />
        </v-btn>
      </v-sheet>
      <ConfigDialog v-if="chatInfo?.gptConfig" :config="chatInfo?.gptConfig" />
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

  .messsage-area {
    flex: 1;
    height: 100%;
  }

  .input-area {
    position: absolute;
    background-color: rgba(255, 255, 255, 1);
    width: 100%;
    bottom: 0;
    padding: 1rem;
    align-items: center;
    border-top: 1px dotted rgba(0, 0, 0, 0.1);

    .input-panel {
      border-radius: 5px;
      max-width: 1200px;
      margin: 0 auto;
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
