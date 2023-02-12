import { defineStore } from "pinia";
import type { Photo } from "../types/unsplashTypes";

export const useUnsplashStore = defineStore({
  id: "upsplash",
  state: () => ({
    favoriteList: ref<Photo[]>([]),
    recentSearchList: ref<string[]>(["blue", "red", "green", "wall"]),
    searchKey: ref(""),
    searchResult: ref(),
    snackbar: reactive({
      isShow: false,
      timeout: 1000,
      text: "",
    }),
  }),

  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ["favoriteList", "searchResult"] },
    ],
  },

  getters: {},
  actions: {
    addToRecentSearchList() {
      // 新元素插入到数组首位
      this.recentSearchList.unshift(this.searchKey);
      // 去重
      this.recentSearchList = [...new Set(this.recentSearchList)];
      // 长度大于5的时候，截取前5位
      if (this.recentSearchList.length > 5) {
        this.recentSearchList = this.recentSearchList.slice(0, 5);
      }
    },

    clearSearchKey() {
      this.searchKey = "";
    },

    addToFavorite(payload: Photo) {
      this.favoriteList.push(payload);
    },

    removeFromFavorite(payload: Photo) {
      this.favoriteList = this.favoriteList.filter(
        (item) => item.id !== payload.id
      );
    },

    clearRecentSearchList() {
      this.recentSearchList = [];
    },
  },
});
