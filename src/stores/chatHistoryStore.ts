import { defineStore } from "pinia";
import router from "@/router";
import { readStream } from "@/utils/aiUtils";
import { ChatType } from "@/enums";
import { consultantData } from "@/data/chatData";

export const useChatHistoryStore = defineStore({
    id: "chatHistory",

    state: () => ({
        // 最后离开的页面id
        lastPageId: 1,
        // 咨询顾问最后离开页面
        lastConsultPageId: 1,
        // 当前激活的聊天菜单id
        activeChatMenuId: 1,
        // 聊天列表
        chatList: [
            ...consultantData,
        ],
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["chatList", "activeChatMenuId", "lastPageId"] }],
    },

    getters: {
        // 获取当前激活的聊天菜单
        activeChat: (state) => state.chatList.find((chat: Chat.Chat) => chat.chatId === state.activeChatMenuId),
        consultantList: (state) => state.chatList.filter((chat: Chat.Chat) => chat.chatType === ChatType.Consultant) as Chat.Chat[],
        creationList: (state) => state.chatList.filter((chat: Chat.Chat) => chat.chatType === ChatType.Creation) as Chat.Chat[],
        baseList: (state) => state.chatList.filter((chat: Chat.Chat) => chat.chatType === ChatType.Base) as Chat.Chat[],
    },
    actions: {
        // 添加聊天菜单
        addChat(chatId: Chat.Id, title?: string,) {
            const newChat: Chat.Chat = {
                chatId: chatId,
                chatType: ChatType.Base,
                menuConfig: {
                    menuTitle: title || `新会话`,
                    isMenuEdit: false,
                    isMenuDeleteConfirm: false,
                },

                gptConfig: {
                    model: "gpt-3.5-turbo-0613",
                    prompt: "",
                    role: "默认",
                    proxy: "",
                    temperature: 0.5,
                    max_tokens: 2000,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                    history_number: 6,
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
                this.activeChatMenuId = newActiveChat.chatId;

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

        getChat(chatId: Chat.Id) {
            return this.chatList.find((chat: Chat.Chat) => chat.chatId === chatId);
        },


        // 获取指定id的聊天的历史记录

        getChatHistory(chatId: Chat.Id) {
            const targetChat = this.chatList.find((chat: Chat.Chat) => chat.chatId === chatId);
            return targetChat ? targetChat.messages : [];
        },

        // 删除指定id的聊天的历史记录
        clearChatHistory(chatId: Chat.Id) {
            const targetChat = this.chatList.find((chat: Chat.Chat) => chat.chatId === chatId);
            if (targetChat) {
                targetChat.messages = [];
            }
        },


        async readStream(reader) {
            const activeChat = this.chatList.find((chat: Chat.Chat) => chat.chatId === this.activeChatMenuId);
            readStream(reader, (message) => {
                if (activeChat && activeChat.messages.length > 0) {
                    activeChat.messages[activeChat.messages.length - 1].messageBody.content += message;
                }
            });
        },

        updateLastPageId(pageId: number) {
            this.lastPageId = pageId;
        },
        updateLastConsultPageId(pageId: number) {
            this.lastConsultPageId = pageId;
        },

        // 更新聊天配置
        updateChatConfig(config: Chat.GptConfig) {
            const targetChat = this.chatList.find((chat: Chat.Chat) => chat.chatId === this.activeChatMenuId) as Chat.Chat;
            if (targetChat) {
                targetChat.gptConfig = config;
            }
        },

    },
});
