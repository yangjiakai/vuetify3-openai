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
        // 模型
        model: string;
        // 随机性
        temperature: number;
        // 最大token
        max_tokens: number;
        // 话题新鲜度
        presence_penalty?: number
        // 频率惩罚度
        frequency_penalty?: number;
        // 历史消息数
        history_number?: number;
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