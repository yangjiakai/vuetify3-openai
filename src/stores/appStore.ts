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
                    return "将我发给你的语言翻译成中文，简洁直白，以 Lexile measure 800 输出";
                case "en":
                    return "将我发给你的语言翻译成英语，简洁直白，以 Lexile measure 800 输出";
                case "ja":
                    return `将我发给你的语言翻译成日语，简洁直白，以 Lexile measure 800 输出`;
                default:
                    return "将我发给你的语言翻译成英语，简洁直白，以 Lexile measure 800 输出";
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