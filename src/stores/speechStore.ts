import { defineStore } from 'pinia'
import {
    AudioConfig,
    SpeakerAudioDestination,
    SpeechConfig,
    SpeechSynthesisOutputFormat,
    ResultReason,
    SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";

export const useSpeechStore = defineStore({
    id: 'speech',
    state: () => ({
        // 语音服务全局参数
        subscriptionKey: import.meta.env.VITE_TTS_KEY, // 语音服务Key
        region: import.meta.env.VITE_TTS_REGION || "eastus", // 语音服务区域

        // 语音转文字(speech to text)配置参数
        speechRecognitionLanguage: "zh-CN",

        // 文字转语音(text to speech)配置参数
        speechSynthesisLanguage: "zh-CN",
        speechSynthesisVoiceName: "zh-CN-XiaoxiaoNeural",
        voiceEmotion: "",
        voiceRate: 1,
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["token"] }],
    },

    actions: {
        // 文本转语音
        async ssmlToSpeak(text: string) {

            // 语音服务配置
            const speechConfig = SpeechConfig.fromSubscription(this.subscriptionKey, this.region);
            speechConfig.speechRecognitionLanguage = this.speechRecognitionLanguage;
            speechConfig.speechSynthesisLanguage = this.speechSynthesisLanguage;
            speechConfig.speechSynthesisVoiceName = this.speechSynthesisVoiceName;
            speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

            // 配置监听语音的播放开始和结束
            const player = new SpeakerAudioDestination();
            player.onAudioStart = () => {
                console.log("开始播放");
            };
            player.onAudioEnd = () => {
                console.log("播放结束");
            };

            const audioConfig = AudioConfig.fromSpeakerOutput(player);

            // 创建语音合成器
            const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

            // 构建语音合成的ssml
            const ssml = this.buildSSML(text);

            // 开始语音合成
            try {
                const result = await this.synthesizeSpeech(synthesizer, ssml);
                console.log("Text-to-speech synthesis result:", result);
            } catch (error) {
                console.error("Error during text-to-speech synthesis:", error);
            } finally {
                synthesizer.close();
            }
        },

        buildSSML(text: string) {
            return `
              <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${this.speechSynthesisLanguage}">
                <voice name="${this.speechSynthesisVoiceName}">
                  <mstts:express-as type="${this.voiceEmotion}">
                    <prosody rate="${this.voiceRate}">
                      ${text}
                    </prosody>
                  </mstts:express-as>
                </voice>
              </speak>`;
        },


        synthesizeSpeech(synthesizer: SpeechSynthesizer, ssml: string) {
            return new Promise((resolve, reject) => {
                synthesizer.speakSsmlAsync(
                    ssml,
                    speechResult => {
                        if (speechResult.reason === ResultReason.SynthesizingAudioCompleted) {
                            resolve(speechResult);
                        } else {
                            reject(new Error(`Speech synthesis failed with reason: ${speechResult.reason}`));
                        }
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        }

    },
})