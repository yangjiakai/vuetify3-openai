import { defineStore } from "pinia";
import router from "@/router";

interface Message {
    content: string;
    role: "user" | "assistant" | "system";
}
export const useChatHistoryStore = defineStore({
    id: "chatHistory",
    state: () => ({
        // 当前激活的聊天菜单id
        activeChatMenuId: 1,
        // 聊天列表
        chatList: [
            {
                id: 1,
                title: "New Chat",
                isMenuEdit: false,
                idMenuDeleteConfirm: false,
                messages: [
                    {
                        role: "system",
                        content: "欢迎使用聊天机器人",
                    },
                    {
                        role: "assistant",
                        content: "你好，我是聊天机器人",
                    },
                    {
                        role: "user",
                        content: "你好，我是用户",
                    },
                ]
            },
        ],
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["chatList"] }],
    },

    getters: {
        getChatActive: (state) => () => {
            return state.chatList.find((item) => item.id === state.activeChatMenuId);
        },

        // 获取当前激活的聊天的历史记录
        getHistoryActive: (state) => () => {
            const activeChat = state.chatList.find((item) => item.id === state.activeChatMenuId);
            if (activeChat) {
                return activeChat.messages;
            }
            return [];
        },


    },
    actions: {
        // 添加聊天菜单
        addChat(id: number, title?: string) {
            const newChat = {
                id: id,
                title: title || `New Chat`,
                isMenuEdit: false,
                idMenuDeleteConfirm: false,
                messages: [],
                configs: {
                    model: "gpt-3.5-turbo",
                    propmpt: "",
                    role: "",
                    proxy: ""
                }
            }

            this.chatList.unshift(newChat);
            this.activeChatMenuId = id;
            router.push(`/chat/${id}`);
        },

        // 删除聊天菜单
        deleteMenu(id: number) {
            // 删除聊天菜单
            this.chatList = this.chatList.filter((item) => item.id !== id);
            // 如果删除的是当前激活的聊天菜单，则激活第一个聊天菜单
            if (this.chatList.length > 0) {
                this.activeChatMenuId = this.chatList[0].id;
                router.push(`/chat/${this.chatList[0].id}`);
            } else {
                this.addChat(1);
            }
        },

        // 更新聊天菜单标题编辑状态
        updateMenuIsMenuEdit(id: number, flag: boolean) {
            const editMenu = this.chatList.find((chat) => chat.id === id);
            if (editMenu) {
                editMenu.isMenuEdit = flag;
            }
        },

        // 更新聊天菜单标题
        updateMenuTitle(id: number, title: string) {
            const editMenu = this.chatList.find((chat) => chat.id === id);
            if (editMenu) {
                editMenu.title = title;
                editMenu.isMenuEdit = false;
            }
        },

        updateMenuDeleteConfirm(id: number, flag: boolean) {
            const editMenu = this.chatList.find((chat) => chat.id === id);
            if (editMenu) {
                editMenu.idMenuDeleteConfirm = flag;
            }
        },

        // 清空所有Chat并初始化选中第一个Chat
        clearAllChat() {
            this.chatList = [];
            this.addChat(1);
        },

        // 新增历史消息
        addHistory(id: any, message: Message) {
            const currentChat = this.chatList.find((item) => item.id === id);

            if (currentChat) {
                currentChat.messages.push(message);
            }
        },

        // 获取指定id的聊天的历史记录
        getChatHistory(id: number) {
            const chat = this.chatList.find((item) => item.id === id);

            if (chat) {
                return chat.messages;
            }
            return [];
        }
    },
});
