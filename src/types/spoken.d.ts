declare namespace Spoken {
    interface Message {
        id: number;
        isReading: boolean;
        body: {
            role: "user" | "assistant" | "system";
            content: string;
        }
    }


    interface VoiceConfig {
        voiceEmotion: string;
        voiceRate: number;
        language: string;
        voiceName: string;
        gender: number;
    }

    interface GptConfig {
        model: string;
        propmpt: string;
        role: string;
        proxy: string;
    }

    export interface SpokenChat {
        id: number;
        title: string;
        isMenuEdit: boolean;
        isMenuDeleteConfirm: boolean;
        messages: Message[];
        voiceConfig: VoiceConfig
        gptConfig: GptConfig;
    }

}