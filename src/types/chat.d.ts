declare namespace Chat {


    export type Id = number | string | undefined;

    export type Role = "user" | "assistant" | "system";

    interface Message {
        messageId: Id;
        messageTime: string;
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
        localName?: string;
    }

    type GptConfig = {
        model: string;
        prompt: string;
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
        chatType: "base" | "creation" | "consultant" | "spoken";
        menuConfig: MenuConfig;
        gptConfig: GptConfig;
        messages: Message[];
    }

    export interface SpokenChat extends Chat {
        voiceConfig: VoiceConfig
    }

}