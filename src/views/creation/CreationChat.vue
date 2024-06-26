<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useCreationStore } from "@/stores/creationStore";
import { readStream } from "@/utils/aiUtils";
import { Icon } from "@iconify/vue";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const creationStore = useCreationStore();
const snackbarStore = useSnackbarStore();
const sourceText = ref("");
const targetText = ref("");
const prompt = ref(`
# Role：产品经理

## Background：产品需求文档编写

## Attention：编写高质量的产品需求文档是确保项目成功的关键步骤。

## Profile：
- Author: nimbus
- Version: 0.1
- Language: 中文
- Description: 我是一名产品经理，擅长撰写清晰明了的产品需求文档，以指导开发团队实现项目目标。

## Skills:
- 熟悉产品开发流程，能够理解并提炼各阶段的需求。
- 具备良好的沟通和写作能力，能够将复杂的概念转化为易于理解的语言。
- 能够捕捉用户需求，将其转化为明确的功能要求。
- 了解界面设计原则，能够编写相关页面设计的需求。
- 能够描绘用户旅程，帮助团队理解用户使用产品的情景。
- 熟练编写用户故事，从用户角度描述功能需求。
- 具备逻辑思维，能够编写合理的实现逻辑和功能细节描述。

## Goals:
- 设计一个规范的产品需求文档框架，确保每个需求都得到明确描述。
- 在需求文档中包含功能名、需求描述、概述、相关页面设计、用户旅程、用户故事、实现逻辑、功能细节描述。

## Constrains:
- 确保每个需求都准确表达用户需求和产品目标。
- 需求文档中的信息应该具备清晰的逻辑结构，易于理解。
- 涵盖的内容应当充分详尽，以便开发团队准确实现。

## Workflow:
1. 分析产品需求，理解用户期望和项目目标。
2. 设计一个明确的需求文档框架，包含功能名、需求描述、概述、页面设计、用户旅程、用户故事、实现逻辑、功能细节描述。
3. 根据功能名，撰写对应的需求描述，明确功能的作用和价值。
4. 编写概述，简要介绍项目的背景和整体目标。
5. 描述相关页面的设计，包括界面元素、布局等。
6. 绘制用户旅程，详细描述用户在使用产品过程中的各个步骤和情境。
7. 编写用户故事，从用户的角度描述具体的功能需求。
8. 阐述实现逻辑，描述功能的具体实现方式和流程。
9. 描述功能细节，包括各种输入、输出、边界条件等。
   
## OutputFormat:
- 功能名：[功能名]
- 需求描述：[需求描述]
- 概述：[概述]
- 相关页面设计：[相关页面设计]
- 用户旅程：[用户旅程]
- 用户故事：[用户故事]
- 实现逻辑：[实现逻辑]
- 功能细节描述：[功能细节描述]
    
## Suggestions:
- 明确界定每个部分的内容，以便开发团队理解和实施。
- 使用简明的语言，避免使用过于专业的术语。
- 在用户旅程和用户故事中注重用户体验，以便准确捕捉用户需求。
- 实现逻辑和功能细节描述要足够详细，以便开发团队能够准确实现功能。

## Initialization
作为产品经理，您需要在产品需求文档中按照指定的格式编写功能名、需求描述、概述、相关页面设计、用户旅程、用户故事、实现逻辑、功能细节描述。请遵循约束条件，确保文档的逻辑性和详尽性。在与开发团队合作时，您的文档将起到关键作用。
`);

const chat = async () => {
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
              content: prompt.value,
            },
            {
              role: "user",

              content: sourceText.value,
            },
          ],
          model: "gpt-3.5-turbo-16k-0613",
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

    targetText.value = "";
    // Read the stream
    readStream(reader, (message) => {
      targetText.value = targetText.value += message;
    });
  } catch (error) {
    snackbarStore.showErrorMessage(error.message);
  }
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
            <v-toolbar-title>{{
              creationStore.currentCreation.title
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- recording button -->
            <v-btn icon @click="chat">
              <v-icon> mdi-send </v-icon>
              <!-- tooltip -->
              <v-tooltip activator="parent" location="bottom" text="Send" />
            </v-btn>
          </v-toolbar>
          <perfect-scrollbar class="message-container">
            <v-textarea
              v-model="sourceText"
              class="ma-5 text-grey-darken-2"
              variant="outlined"
              rows="40"
              color="primary"
              label="要求"
              :counter="5000"
              persistentCounter
              noResize
              :maxlength="5000"
            >
            </v-textarea>
          </perfect-scrollbar>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="h-100" rounded="md">
          <v-toolbar rounded="md" elevation="1" color="primary" class="toolbar">
          </v-toolbar>
          <div class="pa-5 document-container">
            <MdPreview :modelValue="targetText" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.document-container {
  height: 100%;
  max-height: 92vh;
  overflow: scroll;
}
</style>
