import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        mainSidebar: true,
        configDialog: false,
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: [] }],
    },

    actions: {
        toggleMainSidebar() {
            this.mainSidebar = !this.mainSidebar;
        },
        toggleConfigDialog() {
            this.configDialog = !this.configDialog;
        }



    },
})