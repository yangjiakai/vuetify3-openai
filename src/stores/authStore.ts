import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: "",
        session: null,
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["token"] }],
    },

    actions: {
        setToken(token: string) {
            this.token = token;
        },


        removeToken() {
            this.token = "";
        }
    },
})