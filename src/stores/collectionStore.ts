import { defineStore } from 'pinia'

export const useCollectionStore = defineStore({
    id: 'collection',
    state: () => ({
        sentenceList: [],
        count: 0,
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["sentenceList"] }],
    },


    getters: {
        // doubleCount: (state) => state.count * 2,
        getSentenceList: (state) => state.sentenceList,
        doubleCount: (state) => state.count * 2,
    },

    actions: {
        // 添加句子
        addSentence(sentence: Collection.Sentence) {
            this.sentenceList.push(sentence);
        },

        // 移除句子
        removeSentence(sentenceId: Chat.Id) {
            this.sentenceList = this.sentenceList.filter((sentence: Collection.Sentence) => sentence.sentenceId !== sentenceId) as Collection.Sentence[];
        },

        // 是否已被收藏
        isCollected(sentenceId: Chat.Id) {
            return this.sentenceList.some((sentence: Collection.Sentence) => sentence.sentenceId === sentenceId);
        }

    },
})