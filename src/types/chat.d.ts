declare namespace Chat {


    export type Id = number | string | undefined;

    export type Role = "user" | "assistant" | "system";

    interface Message {
        messageId: Id;
        messageBody: {
            role: Role;
            content: string;
        }
    }

    interface SpokenMessage extends Message {
        isReading: boolean;
    }

    export type VoiceConfig = {
        gender: number;
        language: string;
        voiceName: string;
        voiceStyle: string;
        voiceRate: number;
    }

    type GptConfig = {
        model: string;
        propmpt: string;
        role: string;
        proxy: string;
    }

    type MenuConfig = {
        menuTitle: string;
        isMenuEdit: boolean;
        isMenuDeleteConfirm: boolean;
    }

    export interface Chat {
        chatId: Id;
        menuConfig: MenuConfig;
        gptConfig: GptConfig;
        messages: Message[];
    }

    export interface SpokenChat extends Chat {
        voiceConfig: VoiceConfig
    }

}