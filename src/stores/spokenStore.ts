import { defineStore } from "pinia";
import router from "@/router";
import { readStream } from "@/utils/aiUtils";

export const useSpokenStore = defineStore({
    id: "spoken",
    state: () => ({
        lastPageId: 1,
        // 是否显示添加聊天菜单对话框
        addCharacterDialog: false,
        // 当前激活的聊天菜单id
        activeChatMenuId: 1,
        // 语音会话列表
        spokenChatList: []
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["spokenChatList", "activeChatMenuId", "lastPageId"] },],
    },

    getters: {
        // 获取当前激活的聊天菜单
        activeChat(state) {
            return state.spokenChatList.find((chat: Chat.SpokenChat) => chat.chatId === state.activeChatMenuId);
        },

    },
    actions: {
        // 添加聊天菜单
        addChat(chatId: Chat.Id, voiceConfig: Chat.VoiceConfig, title?: string,) {
            const newChat: Chat.SpokenChat = {
                chatId: chatId,
                chatType: "spoken",
                menuConfig: {
                    menuTitle: title || `New Chat`,
                    isMenuEdit: false,

                    isMenuDeleteConfirm: false,
                },

                gptConfig: {
                    model: "gpt-3.5-turbo-0613",
                    prompt: "",
                    role: "",
                    proxy: "",
                    temperature: 0.5,
                    max_tokens: 2000,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                    history_number: 6,
                },
                voiceConfig: {
                    ...voiceConfig
                },
                messages: [],
            }

            this.spokenChatList.unshift(newChat);
            this.activeChatMenuId = chatId;
            router.push(`/spoken/${chatId}`);
        },

        // 删除聊天菜单
        deleteMenu(chatId: Chat.Id) {
            // 删除聊天菜单
            this.spokenChatList = this.spokenChatList.filter((chat: Chat.SpokenChat) => chat.chatId !== chatId) as Chat.SpokenChat[];

            if (this.spokenChatList.length > 0) {
                // 如果删除的是当前激活的聊天菜单，则激活第一个聊天菜单
                const newActiveChat = this.spokenChatList[0];
                this.setActiveChatMenu(newActiveChat.chatId);
            } else {
                // 如果没有剩余聊天菜单，则添加一个新的
                this.addChat(1);
            }
        },


        // 更新聊天菜单标题编辑状态
        updateMenuIsMenuEdit(chatId: Chat.Id, flag: boolean) {
            const targetChat = this.spokenChatList.find((chat: Chat.SpokenChat) => chat.chatId === chatId) as Chat.SpokenChat;
            if (targetChat) {
                targetChat.menuConfig.isMenuEdit = flag;
            }
        },

        // 更新聊天菜单标题
        updateMenuTitle(chatId: Chat.Id, title: string) {
            const targetChat = this.spokenChatList.find((chat: Chat.SpokenChat) => chat.chatId === chatId) as Chat.SpokenChat;
            if (targetChat) {
                targetChat.menuConfig.menuTitle = title;
                targetChat.menuConfig.isMenuEdit = false;
            }
        },

        // 更新确认删除状态
        updateMenuDeleteConfirm(chatId: Chat.Id, flag: boolean) {
            const targetChat = this.spokenChatList.find((chat: Chat.SpokenChat) => chat.chatId === chatId) as Chat.SpokenChat;
            if (targetChat) {
                targetChat.menuConfig.isMenuDeleteConfirm = flag;
            }
        },

        // 清空所有Chat并初始化选中第一个Chat
        clearAllChat() {
            this.spokenChatList = [];
            this.addChat(1);
        },

        // 新增历史消息
        addHistory(chatId: Chat.Id, message: Chat.SpokenMessage) {
            const currentChat = this.spokenChatList.find((chat: Chat.SpokenChat) => chat.chatId === chatId) as Chat.SpokenChat;
            if (currentChat) {
                currentChat.messages.push(message);
            }
        },

        // 获取指定id的聊天的历史记录

        getChatHistory(chatId: Chat.Id) {
            const targetChat = this.spokenChatList.find((chat: Chat.SpokenChat) => chat.chatId === chatId);
            return targetChat ? targetChat.messages : [];
        },

        // 获取当前聊天的声音配置
        getVoiceConfig(chatId: Chat.Id) {
            const targetChat = this.spokenChatList.find((chat: Chat.SpokenChat) => chat.chatId === chatId);
            return targetChat ? targetChat.voiceConfig : {};
        },

        // 打开添加角色对话框
        switchAddCharacterDialog() {
            this.addCharacterDialog = !this.addCharacterDialog;
        },

        // 开始阅读信息
        startReading(messageId: Chat.Id) {
            const targetChat = this.spokenChatList.find((chat: Chat.SpokenChat) => chat.chatId === this.activeChatMenuId);
            if (targetChat) {
                targetChat.messages.find((message: Chat.SpokenMessage) => message.messageId === messageId).isReading = true;
            }
        },

        // 结束阅读信息
        endReading(messageId: Chat.Id) {
            const targetChat = this.spokenChatList.find((chat: Chat.SpokenChat) => chat.chatId === this.activeChatMenuId);
            if (targetChat) {
                targetChat.messages.find((message: Chat.SpokenMessage) => message.messageId === messageId).isReading = false;
            }
        },

        setActiveChatMenu(id: Chat.Id) {
            this.activeChatMenuId = id;
        },

        async readStream(reader) {
            const activeChat = this.spokenChatList.find((chat: Chat.SpokenChat) => chat.chatId === this.activeChatMenuId);
            readStream(reader, (message) => {
                if (activeChat && activeChat.messages.length > 0) {
                    activeChat.messages[activeChat.messages.length - 1].messageBody.content += message;
                }
            });
        }
    },
});
