<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { countAndCompleteCodeBlocks } from "@/utils/aiUtils";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useSpokenStore } from "@/stores/spokenStore";
import SpokenMessageCard from "./SpokenMessageCard.vue";
import { type Message } from "@/types/spokenTypes";
import { Vue3Lottie } from "vue3-lottie";
import { scrollToBottom } from "@/utils/common";

const route = useRoute();
const snackbarStore = useSnackbarStore();
const spokenStore = useSpokenStore();
const messages = ref<Message[]>([]);
const promptMessage = computed(() => {
  return [
    {
      content: "",
      role: "system",
    },
  ];
});

const currentId = ref(+route.params.id);

onMounted(() => {
  messages.value = spokenStore.getChatHistory(currentId.value);
});

const requestMessages = computed(() => {
  const pureMessages = messages.value.map((message) => {
    return {
      content: message.body.content,
      role: message.body.role,
    };
  });

  if (pureMessages.length <= 10) {
    return [...promptMessage.value, ...pureMessages];
  } else {
    // 截取最新的10条信息
    const slicedMessages = pureMessages.slice(-8);
    return [...promptMessage.value, ...slicedMessages];
  }
});

watch(
  () => route.params.id,
  (newVal) => {
    // historyId.value = newVal;
    currentId.value = +newVal;
    messages.value = spokenStore.getChatHistory(currentId.value);
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

  spokenStore.addHistory(currentId.value, {
    id: Date.now(),
    isReading: false,
    body: {
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
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          messages: requestMessages.value,
          model: "gpt-3.5-turbo",
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

    // Add the bot message
    spokenStore.addHistory(currentId.value, {
      id: Date.now(),
      isReading: false,
      body: {
        content: "",
        role: "assistant",
      },
    });

    // Read the stream
    spokenStore.readStream(reader);
  } catch (error) {
    snackbarStore.showErrorMessage(error.message);
  }
};

const displayMessages = computed(() => {
  const messagesCopy = messages.value.slice(); // 创建原始数组的副本
  const lastMessage = messagesCopy[messagesCopy.length - 1];
  const updatedLastMessage = {
    ...lastMessage,
    content: countAndCompleteCodeBlocks(lastMessage.body.content),
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
    <div class="chat-title d-flex justify-center align-center text-deep-purple">
      <div><span class="font-weight-bold">模型:</span> gpt-3.5</div>
      <div class="ml-2"><span class="font-weight-bold">身份:</span> 默认</div>
    </div>
    <div class="message-area">
      <perfect-scrollbar v-if="messages.length > 1" class="message-container">
        <template v-for="message in displayMessages" :key="message.id">
          <SpokenMessageCard :message="message" :role="message.body.role" />
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
        <v-btn class="mb-1" variant="elevated" icon @click="">
          <v-icon size="30" class="text-primary">mdi-cog-outline</v-icon>
          <v-tooltip
            activator="parent"
            location="top"
            text="ChatGPT Config"
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
          <v-icon @click="sendMessage">mdi-send</v-icon>
        </v-btn>
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