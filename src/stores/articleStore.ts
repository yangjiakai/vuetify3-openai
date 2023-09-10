import { defineStore } from 'pinia'
import { Gender } from "~/src/enums";
export const useArticleStore = defineStore({
    id: 'article',
    state: () => ({
        voiceConfig: {
            voiceStyle: "",
            voiceRate: 1.1,
            gender: Gender.Woman,
            language: "en-US",
            voiceName: "en-US-AmberNeural",
            localName: "Amber",
        },
        showConfigDialog: false,
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["voiceConfig"] }],
    },

    actions: {

    },
})