import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        mainSidebar: true,
        configDialog: false,
        localCode: "en",
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["localCode"] }],
    },

    getters: {
        localPrompt: (state) => {
            switch (state.localCode) {
                case "zhHans":
                    return "你是一名翻译官,将内容翻译成中文,如果源文本就是中文的话,不必翻译";
                case "en":
                    return "You are a translator, translate the content into English, if the source text is English, no translation is required";
                case "ja":
                    return "あなたは翻訳者です。コンテンツを日本語に翻訳します。ソーステキストが日本語の場合は、翻訳は必要ありません";
                default:
                    return "ou are a translator, translate the content into English, if the source text is English, no translation is required";
            }
        }
    },
    actions: {
        toggleMainSidebar() {
            this.mainSidebar = !this.mainSidebar;
        },
        toggleConfigDialog() {
            this.configDialog = !this.configDialog;
        },
        setLocalCode(localCode: string) {
            this.localCode = localCode;
        },


    },
})