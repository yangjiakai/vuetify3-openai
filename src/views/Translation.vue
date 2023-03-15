<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { translationApi } from "@/api/openAIApi";

// 翻译目标语言的列表
const langs = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "zh-CN",
    name: "Chinese Simplified",
  },
  {
    code: "zh-TW",
    name: "Chinese Traditional",
  },
  {
    code: "ja",
    name: "Japanese",
  },
  {
    code: "ko",
    name: "Korean",
  },
  {
    code: "fr",
    name: "French",
  },
  {
    code: "de",
    name: "German",
  },
  {
    code: "es",
    name: "Spanish",
  },
];

const currentLang = ref({
  code: "en",
  name: "English",
});

const setLang = (lang: any) => {
  currentLang.value = lang;
};

const baseContent = ref("");
const targetContent = ref("");

const copy = () => {
  console.log("copy");
};

const prompt = computed(() => {
  {
    return `I want you to act as an ${currentLang.value.name} translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in ${currentLang.value.name}. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level ${currentLang.value.name} words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is “istanbulu cok seviyom burada olmak cok guzel”`;
  }
});

const translate = async () => {
  console.log(baseContent.value);
  console.log("----------");
  console.log(prompt.value);

  const response = await translationApi(baseContent.value, prompt.value);
  targetContent.value = response.data.choices[0].message.content?.replace(
    /\\n/g,
    ""
  );
  // 错误处理
};
</script>

<template>
  <div class="">
    <v-toolbar color="primary"> </v-toolbar>
    <v-sheet max-width="1600" class="mx-auto mt-5">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <span class="text-body-2">目标语言：</span>
              <v-menu location="bottom end" scroll-y>
                <template v-slot:activator="{ props }">
                  <v-btn append-icon="mdi-menu-down" v-bind="props">
                    <span class="text-body-2">{{ currentLang.name }}</span>
                  </v-btn>
                </template>
                <v-card>
                  <div v-for="lang in langs">
                    <v-btn block @click="setLang(lang)">{{ lang.name }}</v-btn>
                  </div>
                </v-card>
              </v-menu>
              <v-spacer></v-spacer>
              <v-btn color="blue" @click="translate">翻译</v-btn>
            </v-card-title>
            <div>
              <v-textarea
                v-model="baseContent"
                hide-details
                variant="outlined"
                rows="20"
                auto-grow
                color="grey"
              ></v-textarea>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-grey" icon
                ><v-icon>mdi-clipboard</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="ml-2">
            <v-card-title class="d-flex">
              <v-spacer></v-spacer>
              <v-btn color="blue-grey">Copy</v-btn>
            </v-card-title>
            <div>
              <v-textarea
                v-model="targetContent"
                hide-details
                variant="outlined"
                rows="20"
                auto-grow
                color="grey"
              ></v-textarea>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-grey" icon
                ><v-icon>mdi-clipboard</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card></v-col
        >
      </v-row>
    </v-sheet>
  </div>
</template>

<style scoped lang="scss"></style>
