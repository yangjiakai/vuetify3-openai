<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { translationApi } from "@/api/openAIApi";
import { createTranscriptionApi } from "@/api/gptApi";
import { useChatStore } from "@/stores/chatStore";
import CopyBtn from "@/components/CopyBtn.vue";
const chatStore = useChatStore();
const langs = [
  {
    code: "en",
    name: "English",
    label: "English",
  },
  {
    code: "zh-CN",
    name: "Chinese Simplified",
    label: "中文(简体)",
  },
  {
    code: "zh-TW",
    name: "Chinese Traditional",
    label: "中文(繁體)",
  },
  {
    code: "ja",
    name: "Japanese",
    label: "日本語",
  },
  {
    code: "ko",
    name: "Korean",
    label: "한국어",
  },
  {
    code: "fr",
    name: "French",
    label: "Français",
  },
  {
    code: "de",
    name: "German",
    label: "Deutsch",
  },
  {
    code: "es",
    name: "Spanish",
    label: "Español",
  },
];

const currentLang = ref({
  code: "en",
  name: "English",
  label: "English",
});

const setLang = (lang: any) => {
  currentLang.value = lang;
};

const baseContent = ref("");
const targetContent = ref("");

const prompt = computed(() => {
  return `Translate into ${currentLang.value.name}`;
  return `I want you to act as an ${currentLang.value.name} translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in ${currentLang.value.name}. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level ${currentLang.value.name} words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations.”`;
});

const isLoading = ref(false);

// const completion = await fetch("https://api.openai-proxy.com/v1/chat/completions", {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${chatStore.apiKey}`,
//   },
//   method: "POST",
//   body: JSON.stringify({
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     messages: [
//       { role: "user", content: prompt.value },
//       { role: "user", content: baseContent.value },
//     ],
//     model: "gpt-4o-mini",
//     stream: true, // ここで stream を有効にする
//   }),
// });

const translate = async () => {
  if (baseContent.value === "") {
    isBaseContentEmpty.value = true;
    return;
  }
  isLoading.value = true;

  const completion = await fetch(
    "https://api.openai-proxy.com/v1/chat/completions",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatStore.apiKey}`,
      },
      method: "POST",
      body: JSON.stringify({
        messages: [
          { role: "user", content: prompt.value },
          { role: "user", content: baseContent.value },
        ],
        model: "gpt-4o-mini",
        stream: true,
      }),
    }
  );

  const reader = completion.body?.getReader();

  if (completion.status !== 200 || !reader) {
    return "error";
  }
  const decoder = new TextDecoder("utf-8");
  try {
    // この read で再起的にメッセージを待機して取得します
    const read = async (): Promise<any> => {
      const { done, value } = await reader.read();
      if (done) return reader.releaseLock();
      const chunk = decoder.decode(value, { stream: true });
      const jsons = chunk
        .split("data:")
        .map((data) => {
          const trimData = data.trim();
          if (trimData === "") return undefined;
          if (trimData === "[DONE]") return undefined;
          return JSON.parse(data.trim());
        })
        .filter((data) => data);
      const streamMessage = jsons
        .map((jn) =>
          jn.choices.map((choice: any) => choice.delta.content).join("")
        )
        .join("");
      const response = streamMessage;
      targetContent.value = targetContent.value + response;
      return read();
    };
    await read();
  } catch (e) {
    console.error(e);
  }

  reader.releaseLock();
  isLoading.value = false;
};

const isBaseContentEmpty = ref(false);

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
      isRecording.value = true;
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
        baseContent.value = res.data.text;
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

const record = () => {
  if (isRecording.value) {
    stopRecording();
  } else {
    startRecording();
  }
};

const textToSpeech = async () => {
  const googleInstance = axios.create({
    baseURL: "https://us-central1-texttospeech.googleapis.com",
    timeout: 100000,
  });

  const res = await googleInstance.post(
    "/v1/chat/completions/text:synthesize",
    {
      audioConfig: {
        audioEncoding: "LINEAR16",
        effectsProfileId: ["small-bluetooth-speaker-class-device"],
        pitch: 0,
        speakingRate: 1,
      },
      input: {
        text: "Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. It applies DeepMind’s groundbreaking research in WaveNet and Google’s powerful neural networks to deliver the highest fidelity possible. As an easy-to-use API, you can create lifelike interactions with your users, across many applications and devices.",
      },
      voice: {
        languageCode: "en-US",
        name: "en-US-Neural2-J",
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": "AIzaSyBSXdkeyAvIZX5n_bj4KsqSjJf1W-_TfCntvk",
      },
    }
  );
  console.log(res);

  // const res = await fetch(
  //   `https://us-central1-texttospeech.googleapis.com/v1beta1/text:synthesize`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "x-goog-api-key": "AIzaSyBSXdkeyAvIZX5n_bj4KsqSjJf1W-_TfCntvk",
  //     },
  //     body: JSON.stringify({
  //       audioConfig: {
  //         audioEncoding: "LINEAR16",
  //         effectsProfileId: ["small-bluetooth-speaker-class-device"],
  //         pitch: 0,
  //         speakingRate: 1,
  //       },
  //       input: {
  //         text: "Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. It applies DeepMind’s groundbreaking research in WaveNet and Google’s powerful neural networks to deliver the highest fidelity possible. As an easy-to-use API, you can create lifelike interactions with your users, across many applications and devices.",
  //       },
  //       voice: {
  //         languageCode: "en-US",
  //         name: "en-US-Neural2-J",
  //       },
  //     }),
  //   }
  // );
};
</script>

<template>
  <div class="">
    <v-sheet color="white pa-10">
      <h1>Tranlation</h1>
      <v-divider></v-divider>
      <p class="text-primary">
        Input anything and translate it into target language
      </p>
    </v-sheet>

    <v-sheet max-width="1600" color="transparent" class="mx-auto mt-5 pa-2">
      <v-alert
        v-model="isBaseContentEmpty"
        color="red"
        theme="dark"
        icon="mdi-alert"
        border
      >
        翻译内容不能为空
      </v-alert>
      <v-row justify="center" dense>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title style="height: 60px" class="d-flex align-center">
              <span class="text-body-2">检测语言</span>

              <v-spacer></v-spacer>
              <v-btn
                :loading="isLoading"
                :disabled="isLoading"
                color="primary"
                @click="translate"
                >翻译</v-btn
              >
            </v-card-title>
            <div>
              <v-textarea
                v-model="baseContent"
                hide-details
                variant="outlined"
                rows="20"
                auto-grow
                color="grey"
                @focus="isBaseContentEmpty = false"
              ></v-textarea>
            </div>
            <v-card-actions>
              <v-tooltip location="bottom" text="语音输入">
                <template #activator="{ props }">
                  <v-btn @click="record" color="primary" v-bind="props" icon>
                    <v-icon v-if="isRecording">mdi-microphone</v-icon>
                    <v-icon v-else>mdi-microphone-outline</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="bottom" text="朗读">
                <template #activator="{ props }">
                  <v-btn color="primary" v-bind="props" icon
                    ><v-icon>mdi-volume-high</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-spacer></v-spacer>
              <CopyBtn :text="baseContent" />
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title style="height: 60px" class="d-flex align-center">
              <span class="text-body-2">目标语言：</span>
              <v-menu location="bottom end" scroll-y>
                <template v-slot:activator="{ props }">
                  <v-btn append-icon="mdi-menu-down" v-bind="props">
                    <span class="text-body-2">{{ currentLang.label }}</span>
                  </v-btn>
                </template>
                <v-card>
                  <div v-for="lang in langs">
                    <v-btn block @click="setLang(lang)">{{ lang.label }}</v-btn>
                  </div>
                </v-card>
              </v-menu>
              <v-spacer></v-spacer>
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
              <v-tooltip location="bottom" text="朗读">
                <template #activator="{ props }">
                  <v-btn
                    @click="textToSpeech"
                    color="primary"
                    v-bind="props"
                    icon
                    ><v-icon>mdi-volume-high</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-spacer></v-spacer>
              <CopyBtn :text="targetContent" />
            </v-card-actions> </v-card
        ></v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<style scoped lang="scss"></style>
