import { defineStore } from "pinia";
import router from "@/router";
import { type Message } from "@/types/spokenTypes";
import { readStream } from "@/utils/aiUtils";

export const useSpokenStore = defineStore({
    id: "spoken",
    state: () => ({
        addCharacterDialog: false,
        // 当前激活的聊天菜单id
        activeChatMenuId: 1,
        characterList: [
            {
                id: 1,
                title: "小虾米",
                isMenuEdit: false,
                idMenuDeleteConfirm: false,
                messages: [
                    {
                        id: 1,
                        isReading: false,
                        body: {
                            role: "system",
                            content: "你是一个口语对话机器人",
                        }
                    },
                    {
                        id: 2,
                        isReading: false,
                        body: {
                            role: "assistant",
                            content: "你好,云扬",
                        }
                    },
                ],
                character: {
                    voiceName: "云扬",
                    gender: 1,
                    locale: "zh-CN",
                }
            },
        ]
    }),

    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ["characterList"] }],
    },

    getters: {
        getChatActive: (state) => () => {
            return state.characterList.find((item) => item.id === state.activeChatMenuId);
        },

        // 获取当前激活的聊天的历史记录
        getHistoryActive: (state) => () => {
            const activeChat = state.characterList.find((item) => item.id === state.activeChatMenuId);
            if (activeChat) {
                return activeChat.messages;
            }
            return [];
        },


    },
    actions: {
        // 添加聊天菜单
        addChat(id: number, voiceConfig: any, title?: string,) {

            const newChat = {
                id: id,
                title: title || `New Chat`,
                isMenuEdit: false,
                idMenuDeleteConfirm: false,
                messages: [],
                gptConfig: {
                    model: "gpt-3.5-turbo",
                    propmpt: "",
                    role: "",
                    proxy: ""
                },
                voiceConfig: {
                    voiceName: voiceConfig.voiceName,
                    language: voiceConfig.language,
                    voiceRate: voiceConfig.voiceRate,
                    voiceStyle: voiceConfig.voiceStyle,
                }
            }

            this.characterList.unshift(newChat);
            this.activeChatMenuId = id;
            router.push(`/spoken/${id}`);
        },

        // 删除聊天菜单
        deleteMenu(id: number) {
            // 删除聊天菜单
            this.characterList = this.characterList.filter((item) => item.id !== id);
            // 如果删除的是当前激活的聊天菜单，则激活第一个聊天菜单
            if (this.characterList.length > 0) {
                this.activeChatMenuId = this.characterList[0].id;
                router.push(`/spoken/${this.characterList[0].id}`);
            } else {
                this.addChat(1);
            }
        },

        // 更新聊天菜单标题编辑状态
        updateMenuIsMenuEdit(id: number, flag: boolean) {
            const editMenu = this.characterList.find((chat) => chat.id === id);
            if (editMenu) {
                editMenu.isMenuEdit = flag;
            }
        },

        // 更新聊天菜单标题
        updateMenuTitle(id: number, title: string) {
            const editMenu = this.characterList.find((chat) => chat.id === id);
            if (editMenu) {
                editMenu.title = title;
                editMenu.isMenuEdit = false;
            }
        },

        updateMenuDeleteConfirm(id: number, flag: boolean) {
            const editMenu = this.characterList.find((chat) => chat.id === id);
            if (editMenu) {
                editMenu.idMenuDeleteConfirm = flag;
            }
        },

        // 清空所有Chat并初始化选中第一个Chat
        clearAllChat() {
            this.characterList = [];
            this.addChat(1);
        },

        // 新增历史消息
        addHistory(id: any, message: Message) {
            const currentChat = this.characterList.find((item) => item.id === id);

            if (currentChat) {
                currentChat.messages.push(message);
            }
        },

        // 获取指定id的聊天的历史记录
        getChatHistory(id: number) {
            const chat = this.characterList.find((item) => item.id === id);

            if (chat) {
                return chat.messages;
            }
            return [];
        },

        // 获取当前聊天的声音配置
        getVoiceConfig(id: number) {

            const chat = this.characterList.find((item) => item.id === id);
            if (chat) {
                return chat.voiceConfig;
            }
            return {};
        },

        // 打开添加角色对话框
        showAddCharacterDialog() {
            this.addCharacterDialog = true;
        },

        // 开始阅读信息
        startReading(messageId: number) {
            const chat = this.characterList.find((item) => item.id === this.activeChatMenuId);
            if (chat) {
                chat.messages.find((message) => message.id === messageId).isReading = true;
            }
        },

        // 结束阅读信息
        endReading(messageId: number) {
            const chat = this.characterList.find((item) => item.id === this.activeChatMenuId);
            if (chat) {
                chat.messages.find((message) => message.id === messageId).isReading = false;
            }
        },

        async readStream(reader) {
            const activeChat = this.getChatActive();
            readStream(reader, (message) => {
                if (activeChat && activeChat.messages.length > 0) {
                    activeChat.messages[activeChat.messages.length - 1].body.content += message;
                }
            });
        }
    },
});
