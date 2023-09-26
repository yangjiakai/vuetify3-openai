import { defineStore } from 'pinia'

export const useSelectionStore = defineStore({
  id: 'selection',
  state: () => ({
    selectionText: "",
    selectionPopupShow: false,
    position: { x: 0, y: 0 }
  }),

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: [""] }],
  },

  getters: {

  },
  actions: {
    setSelectionText(selectionText: string) {
      this.selectionText = selectionText;
    },
    setSelectionPopupShow(selectionPopupShow: boolean) {
      this.selectionPopupShow = selectionPopupShow;
    },

    showPopup() {

    }
  },
})