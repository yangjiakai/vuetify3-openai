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