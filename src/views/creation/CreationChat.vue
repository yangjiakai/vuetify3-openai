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
# Role：プロダクトマネージャー

## Background：製品要件文書の作成

## Attention：高品質の製品要件文書を作成することは、プロジェクト成功のための重要なステップです。

## Profile：
- Author: yjk
- Version: 1.0
- Language: 日本語
- Description: 我是一名产品经理，擅长撰写清晰明了的产品需求文档，以指导开发团队实现项目目标。

## Skills:
- 製品開発プロセスに精通しており、各段階の要件を理解し、絞り込むことができます。
- 優れたコミュニケーションとライティングスキルを持っており、複雑な概念を理解しやすい言葉に変換することができます。
- ユーザーの要件を捉え、それを明確な機能要件に変換することができます。
- インターフェース設計の原則を理解しており、関連するページ設計の要件を作成することができます。
- ユーザージャーニーを描くことができ、チームが製品を使用するユーザーのシナリオを理解するのに役立ちます。
- ユーザーストーリーを上手に書くことができ、ユーザーの視点から機能要件を記述します。
- 論理的思考能力を持っており、合理的な実装ロジックと機能詳細の説明を書くことができます。

## Goals:
- 標準的な製品要件文書のフレームワークを設計し、すべての要件が明確に記述されることを確認します。
- 要件文書には機能名、要件説明、概要、関連ページ設計、ユーザージャーニー、ユーザーストーリー、実装ロジック、機能詳細説明を含めます。

## Constrains:
- すべての要件がユーザーの要件と製品目標を正確に表現することを確認します。
-要件文書の情報は明確な論理構造を持つべきであり、理解しやすいものでなければなりません。
- カバーする内容は十分に詳細でなければならず、開発チームが正確に実装できるようにする必要があります。

## Workflow:
1. 製品の要件を分析し、ユーザーの期待とプロジェクトの目標を理解します。
2. 明確な要件文書のフレームワークを設計し、機能名、要件説明、概要、ページ設計、ユーザージャーニー、ユーザーストーリー、実装ロジック、機能詳細説明を含めます。
3. 機能名に基づいて対応する要件説明を作成し、機能の役割と価値を明確にします。
4. 概要を作成し、プロジェクトの背景と全体的な目標を簡単に紹介します。
5. 関連ページの設計を説明します。これには、インターフェース要素、レイアウトなどが含まれます。
6. ユーザージャーニーを描き、製品を使用する過程でのユーザーの各ステップとシナリオを詳細に説明します。
7. ユーザーストーリーを作成し、ユーザーの視点から具体的な機能要件を記述します。
8. 実装ロジックを述べ、機能の具体的な実装方法とプロセスを説明します。
9. 機能の詳細を説明します。これには、各種の入力、出力、境界条件などが含まれます。

## OutputFormat:
- 機能名[機能名]
- 要件説明[要件説明]
- 概要[概要]
- 関連ページ設計[関連ページ設計]
- ーザージャーニー[ユーザージャーニー]
- ユーザーストーリー[ユーザーストーリー]
- 実装ロジック[実装ロジック]
- 機能詳細説明[機能詳細説明] 
    
## Suggestions:
- 各部分の内容を明確に定義し、開発チームが理解し、実装できるようにします。
- 簡潔な言葉を使用し、専門用語の使用を避けます。
- ユーザージャーニーとユーザーストーリーではユーザー体験に重点を置き、ユーザーの要件を正確に捉えます。
- 実装ロジックと機能詳細説明は十分に詳細でなければならず、開発チームが機能を正確に実装できるようにする必要があります。


## Initialization
プロダクトマネージャーとして、製品要件文書に指定された形式で機能名、要件説明、概要、関連ページ設計、ユーザージャーニー、ユーザーストーリー、実装ロジック、機能詳細説明を記述する必要があります。制約条件を遵守し、文書の論理性と詳細性を確保してください。開発チームとの協力において、あなたの文書は重要な役割を果たします。

`);

const chat = async () => {
  try {
    const completion = await fetch(
      "https://openai.wndbac.cn/v1/chat/completions",
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
