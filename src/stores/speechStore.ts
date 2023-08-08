import { defineStore } from 'pinia'
import {
    AudioConfig,
    SpeakerAudioDestination,
    SpeechConfig,
    SpeechSynthesisOutputFormat,
    ResultReason,
    SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";
import { useSpokenStore } from "@/stores/spokenStore";


interface VoiceConfig {
    messageId: number,
    voiceEmotion: string,
    voiceRate: number,
    language: string,
    VoiceName: string,
}


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

        // 语音合成器
        synthesizer: null
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["token"] }],
    },

    actions: {
        // 文本转语音
        async ssmlToSpeech(text: string, voiceConfig: VoiceConfig) {
            const spokenStore = useSpokenStore();
            console.log("voiceConfig", voiceConfig);

            // 语音服务配置
            const speechConfig = SpeechConfig.fromSubscription(this.subscriptionKey, this.region);

            speechConfig.speechSynthesisLanguage = voiceConfig?.language || this.speechSynthesisLanguage;
            speechConfig.speechSynthesisVoiceName = voiceConfig?.VoiceName || this.speechSynthesisVoiceName;
            speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

            // 配置监听语音的播放开始和结束
            const player = new SpeakerAudioDestination();
            player.onAudioStart = () => {
                spokenStore.startReading(voiceConfig.messageId);
                console.log("开始播放");
            };
            player.onAudioEnd = () => {
                spokenStore.endReading(voiceConfig.messageId);
                console.log("播放结束");
            };

            const audioConfig = AudioConfig.fromSpeakerOutput(player);

            // 创建语音合成器
            this.synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

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

        buildSSML(text: string, voiceConfig?: VoiceConfig) {
            return `
              <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${this.speechSynthesisLanguage}">
                <voice name="${voiceConfig?.VoiceName || this.speechSynthesisVoiceName}">
                  <mstts:express-as type="${voiceConfig?.voiceEmotion || this.voiceEmotion}">
                    <prosody rate="${voiceConfig?.voiceRate || this.voiceRate}">
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
        },

        async getVoices() {
            const speechConfig = SpeechConfig.fromSubscription(this.subscriptionKey, this.region);
            const synthesizer = new SpeechSynthesizer(speechConfig);
            const result = await synthesizer.getVoicesAsync();
            console.log("result", result);
            return result.voices;
        }
    },
})