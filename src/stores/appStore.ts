import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        mainSidebar: true,
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: [] }],
    },

    actions: {
        toggleMainSidebar() {
            this.mainSidebar = !this.mainSidebar;
        }
    },
})