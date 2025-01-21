import { defineStore } from "pinia";
import {
  AudioConfig,
  SpeakerAudioDestination,
  SpeechConfig,
  SpeechSynthesisOutputFormat,
  ResultReason,
  SpeechSynthesizer,
  SpeechRecognizer,
  NoMatchDetails,
  CancellationReason,
} from "microsoft-cognitiveservices-speech-sdk";
import SpeechWorker from "@/workers/speechWorker?worker";
import { useSpokenStore } from "@/stores/spokenStore";

export const useSpeechStore = defineStore({
  id: "speech",
  state: () => ({
    // 语音服务全局参数
    subscriptionKey: import.meta.env.VITE_TTS_KEY, // 语音服务Key
    region: import.meta.env.VITE_TTS_REGION || "eastus", // 语音服务区域

    // 语音转文字(speech to text)配置参数
    speechRecognitionLanguage: "zh-CN",

    // 文字转语音(text to speech)配置参数
    speechSynthesisLanguage: "zh-CN",
    speechSynthesisVoiceName: "zh-CN-XiaoxiaoNeural",
    voiceStyle: "",
    voiceRate: 1,

    // 语音合成器
    synthesizer: null,
    // 语音识别器
    recognizer: null,
    allVoices: [],
    recordingText: "",
  }),

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["token"] }],
  },

  getters: {
    getLocalName: (state) => () => {
      return state.speechSynthesisVoiceName;
    },
  },

  actions: {
    synthesizeSpeech(synthesizer: SpeechSynthesizer, ssml: string) {
      return new Promise((resolve, reject) => {
        synthesizer.speakSsmlAsync(
          ssml,
          (speechResult) => {
            if (
              speechResult.reason === ResultReason.SynthesizingAudioCompleted
            ) {
              resolve(speechResult);
            } else {
              reject(
                new Error(
                  `Speech synthesis failed with reason: ${speechResult.reason}`
                )
              );
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    },

    // 语音转文字
    async speechToText(voiceConfig: any): Promise<string> {
      return new Promise((resolve, reject) => {
        // 语音服务配置
        const speechConfig = SpeechConfig.fromSubscription(
          this.subscriptionKey,
          this.region
        );
        speechConfig.speechRecognitionLanguage =
          voiceConfig?.language || this.speechRecognitionLanguage;

        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        this.recognizer = new SpeechRecognizer(speechConfig, audioConfig);

        let recognizedText = "";

        // 当语音部分被识别时
        this.recognizer.recognizing = (s, e) => {
          console.log(`RECOGNIZING: Text=${e.result.text}`);
        };

        // 当一个语音段落被完全识别时
        this.recognizer.recognized = (s, e) => {
          if (e.result.reason === ResultReason.RecognizedSpeech) {
            recognizedText += e.result.text;
            this.recordingText = recognizedText;
            console.log(`RECOGNIZED: Text=${e.result.text}`);
          } else if (e.result.reason === ResultReason.NoMatch) {
            const noMatchDetail = NoMatchDetails.fromResult(e.result);
            console.log(`NoMatchReason: ${noMatchDetail.reason}`);
          }
        };

        // 会话停止时
        this.recognizer.sessionStopped = (s, e) => {
          console.log("\n    Session stopped event.");
          this.recognizer.stopContinuousRecognitionAsync(() => {
            resolve(recognizedText); // 返回识别的文本
          });
        };

        // 错误处理
        this.recognizer.canceled = (s, e) => {
          console.error(`CANCELED: Reason=${e.reason}`);

          if (e.reason === CancellationReason.Error) {
            console.error(`CANCELED: ErrorCode=${e.errorCode}`);
            console.error(`CANCELED: ErrorDetails=${e.errorDetails}`);
          }

          this.recognizer.stopContinuousRecognitionAsync();
          reject(e.errorDetails);
        };

        // 开始识别
        this.recognizer.startContinuousRecognitionAsync();
      });
    },

    // 停止语音识别
    stopSpeechToText() {
      if (this.recognizer) {
        this.recognizer.stopContinuousRecognitionAsync();
      }
    },

    // 文本转语音
    async ssmlToSpeech(
      text: string,
      voiceConfig: Chat.VoiceConfig,
      speakMode?: string,
      messageId?: Chat.Id
    ) {
      const spokenStore = useSpokenStore();

      // 初始化 Worker
      const worker = new SpeechWorker();

      // 处理 Worker 消息
      worker.onmessage = (event) => {
        if (event.data.type === "result") {
          console.log("Text-to-speech synthesis result:", event.data.result);
        } else if (event.data.type === "error") {
          console.error(
            "Error during text-to-speech synthesis:",
            event.data.error
          );
        }
      };

      // 发送数据到 Worker
      worker.postMessage({
        subscriptionKey: this.subscriptionKey,
        region: this.region,
        text,
        voiceConfig,
        speechSynthesisLanguage: this.speechSynthesisLanguage,
        speechSynthesisVoiceName: this.speechSynthesisVoiceName,
        voiceStyle: this.voiceStyle,
        voiceRate: this.voiceRate,
      });

      // 本地播放状态管理
      const player = new SpeakerAudioDestination();
      player.onAudioStart = () => {
        if (speakMode !== "test") {
          spokenStore.startReading(messageId);
          console.log("开始播放");
        }
      };

      player.onAudioEnd = () => {
        if (speakMode !== "test") {
          spokenStore.endReading(messageId);
          console.log("播放结束");
        }
        worker.terminate();
      };

      // 配置音频播放
      const audioConfig = AudioConfig.fromSpeakerOutput(player);
      this.synthesizer = new SpeechSynthesizer(
        SpeechConfig.fromSubscription(this.subscriptionKey, this.region),
        audioConfig
      );

      // 构建语音合成的ssml
      const ssml = this.buildSSML(text, voiceConfig);

      // 开始语音合成
      try {
        const result = await this.synthesizeSpeech(this.synthesizer, ssml);
        console.log("Text-to-speech synthesis result:", result);
      } catch (error) {
        console.error("Error during text-to-speech synthesis:", error);
      } finally {
        this.synthesizer.close();
      }
    },

    buildSSML(text: string, voiceConfig?: Chat.VoiceConfig) {
      return `
              <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${
                this.speechSynthesisLanguage
              }">
                <voice name="${
                  voiceConfig?.voiceName || this.speechSynthesisVoiceName
                }">
                  <mstts:express-as type="${
                    voiceConfig?.voiceStyle || this.voiceStyle
                  }">
                    <prosody rate="${voiceConfig?.voiceRate || this.voiceRate}">
                      ${text}
                    </prosody>
                  </mstts:express-as>
                </voice>
              </speak>`;
    },

    async getVoices() {
      const speechConfig = SpeechConfig.fromSubscription(
        this.subscriptionKey,
        this.region
      );
      const synthesizer = new SpeechSynthesizer(speechConfig);
      const result = await synthesizer.getVoicesAsync();
      this.allVoices = result.voices;
    },
  },
});
