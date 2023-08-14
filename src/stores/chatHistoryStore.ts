import { defineStore } from "pinia";
import router from "@/router";
import { readStream } from "@/utils/aiUtils";


export const useChatHistoryStore = defineStore({
    id: "chatHistory",
    state: () => ({
        // 当前激活的聊天菜单id
        activeChatMenuId: 1,
        // 聊天列表
        chatList: [

        ],
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["chatList"] }],
    },

    getters: {
        // 获取当前激活的聊天菜单
        activeChat(state) {
            return state.chatList.find((chat: Chat.Chat) => chat.chatId === state.activeChatMenuId);
        },
    },
    actions: {
        // 添加聊天菜单
        addChat(chatId: Chat.Id, title?: string,) {
            const newChat: Chat.Chat = {
                chatId: chatId,
                menuConfig: {
                    menuTitle: title || `新会话`,
                    isMenuEdit: false,
                    isMenuDeleteConfirm: false,
                },

                gptConfig: {
                    model: "gpt-3.5-turbo",
                    propmpt: "",
                    role: "",
                    proxy: ""
                },

                messages: [],
            }

            this.chatList.unshift(newChat);
            this.activeChatMenuId = chatId;
            router.push(`/chat/${chatId}`);
        },

        // 删除聊天菜单
        deleteMenu(chatId: Chat.Id) {
            // 删除聊天菜单
            this.chatList = this.chatList.filter((chat: Chat.Chat) => chat.chatId !== chatId) as Chat.Chat[];

            if (this.chatList.length > 0) {
                // 如果删除的是当前激活的聊天菜单，则激活第一个聊天菜单
                const newActiveChat = this.chatList[0];
                this.setActiveChatMenu(newActiveChat.chatId);
            } else {
                // 如果没有剩余聊天菜单，则添加一个新的
                this.addChat(1);
            }
        },



        // 更新聊天菜单标题编辑状态
        updateMenuIsMenuEdit(chatId: Chat.Id, flag: boolean) {
            const targetChat = this.chatList.find((chat: Chat.Chat) => chat.chatId === chatId) as Chat.Chat;
            if (targetChat) {
                targetChat.menuConfig.isMenuEdit = flag;
            }
        },


        // 更新聊天菜单标题
        updateMenuTitle(chatId: Chat.Id, title: string) {
            const targetChat = this.chatList.find((chat: Chat.Chat) => chat.chatId === chatId) as Chat.Chat;
            if (targetChat) {
                targetChat.menuConfig.menuTitle = title;
                targetChat.menuConfig.isMenuEdit = false;
            }
        },

        // 更新确认删除状态
        updateMenuDeleteConfirm(chatId: Chat.Id, flag: boolean) {
            const targetChat = this.chatList.find((chat: Chat.Chat) => chat.chatId === chatId) as Chat.Chat;
            if (targetChat) {
                targetChat.menuConfig.isMenuDeleteConfirm = flag;
            }
        },


        // 清空所有Chat并初始化选中第一个Chat
        clearAllChat() {
            this.chatList = [];
            this.addChat(1);
        },


        // 新增历史消息
        addHistory(chatId: Chat.Id, message: Chat.Message) {
            const currentChat = this.chatList.find((chat: Chat.Chat) => chat.chatId === chatId) as Chat.Chat;
            if (currentChat) {
                currentChat.messages.push(message);
            }
        },


        // 获取指定id的聊天的历史记录

        getChatHistory(chatId: Chat.Id) {
            const targetChat = this.chatList.find((chat: Chat.Chat) => chat.chatId === chatId);
            return targetChat ? targetChat.messages : [];
        },

        async readStream(reader) {
            const activeChat = this.chatList.find((chat: Chat.Chat) => chat.chatId === this.activeChatMenuId);
            readStream(reader, (message) => {
                if (activeChat && activeChat.messages.length > 0) {
                    activeChat.messages[activeChat.messages.length - 1].messageBody.content += message;
                }
            });
        }
    },
});
