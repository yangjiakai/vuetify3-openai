import { defineStore } from 'pinia'

export const useCreationStore = defineStore({
    id: 'creation',
    state: () => ({
        currentCreation: {},
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: [] }],
    },

    actions: {

    },
})