import { ChatType } from "@/enums";

export const consultantData: Chat.Chat[] = [
    // 1. 法律顾问
    {
        chatId: 1,
        chatType: ChatType.Consultant,
        menuConfig: {
            menuTitle: "法律顾问",
            isMenuEdit: false,
            isMenuDeleteConfirm: false
        },
        gptConfig: {
            model: "gpt-3.5-turbo-0613",
            prompt: "",
            role: "法律顾问",
            proxy: "",
            temperature: 0.5,
            max_tokens: 2000,
            presence_penalty: 0,
            frequency_penalty: 0,
            history_number: 6,
        },
        messages: []
    },

    // 2. 会计顾问
    {
        chatId: 2,
        chatType: ChatType.Consultant,
        menuConfig: {
            menuTitle: "会计顾问",
            isMenuEdit: false,
            isMenuDeleteConfirm: false
        },
        gptConfig: {
            model: "gpt-3.5-turbo-0613",
            prompt: "",
            role: "会计顾问",
            proxy: "",
            temperature: 0.5,
            max_tokens: 2000,
            presence_penalty: 0,
            frequency_penalty: 0,
            history_number: 6,

        },
        messages: []
    },

    // 3. 学习顾问
    {
        chatId: 3,
        chatType: ChatType.Consultant,
        menuConfig: {
            menuTitle: "学习顾问",
            isMenuEdit: false,
            isMenuDeleteConfirm: false
        },
        gptConfig: {
            model: "gpt-3.5-turbo-0613",
            prompt: "",
            role: "学习顾问",
            proxy: "",
            temperature: 0.5,
            max_tokens: 2000,
            presence_penalty: 0,
            frequency_penalty: 0,
            history_number: 6,
        },
        messages: []
    },

    // 4. 职业顾问
    {
        chatId: 4,
        chatType: ChatType.Consultant,
        menuConfig: {
            menuTitle: "职业顾问",
            isMenuEdit: false,
            isMenuDeleteConfirm: false
        },
        gptConfig: {
            model: "gpt-3.5-turbo-0613",
            prompt: "",
            role: "职业顾问",
            proxy: "",
            temperature: 0.5,
            max_tokens: 2000,
            presence_penalty: 0,
            frequency_penalty: 0,
            history_number: 6,
        },
        messages: []
    },

    // 5. 医疗顾问
    {
        chatId: 5,
        chatType: ChatType.Consultant,
        menuConfig: {
            menuTitle: "医疗顾问",
            isMenuEdit: false,
            isMenuDeleteConfirm: false
        },
        gptConfig: {
            model: "gpt-3.5-turbo-0613",
            prompt: "",
            role: "医疗顾问",
            proxy: "",
            temperature: 0.5,
            max_tokens: 2000,
            presence_penalty: 0,
            frequency_penalty: 0,
            history_number: 6,
        },
        messages: []
    },

    // 6. 心理医生
    {
        chatId: 6,
        chatType: ChatType.Consultant,
        menuConfig: {
            menuTitle: "心理医生",
            isMenuEdit: false,
            isMenuDeleteConfirm: false
        },
        gptConfig: {
            model: "gpt-3.5-turbo-0613",
            prompt: "",
            role: "心理医生",
            proxy: "",
            temperature: 0.5,
            max_tokens: 2000,
            presence_penalty: 0,
            frequency_penalty: 0,
            history_number: 6,
        },
        messages: []
    }
];



export const creationsData = [
    // 工作效率:商品文案
    {
        creationId: 1,
        title: "商品文案",
        type: "工作效率",
        description: "一键生成详细文案",
        icon: "mdi-text-box-check-outline",
        prompt: "商品文案",
        isVip: false,
        isCollected: false,
        url: "product-description",
    },

    // 工作效率:产品说明文档
    {
        creationId: 2,
        title: "产品说明文档",
        type: "工作效率",
        description: "一键生成详细文案",
        icon: "mdi-text-box-check-outline",
        prompt: "产品说明文档",
        isVip: false,
        isCollected: false,
        url: "product-document",
    },
    // 工作效率:工作总结
    {
        creationId: 3,
        title: "工作总结",
        type: "工作效率",
        description: "一键生成工作总结",
        icon: "mdi-text-box-check-outline",
        prompt: "工作总结",
        isVip: false,
        isCollected: false,
        url: "work-summary",
    },
    // 工作效率: 会议纪要
    {
        creationId: 4,
        title: "会议纪要",
        type: "工作效率",
        description: "一键生成会议纪要",
        icon: "mdi-text-box-check-outline",
        prompt: "会议纪要",
        isVip: false,
        isCollected: false,
        url: "meeting-minutes",
    },
    // 工作效率: 工作邮件
    {
        creationId: 5,
        title: "工作邮件",

        type: "工作效率",
        description: "一键生成工作邮件",
        icon: "mdi-text-box-check-outline",
        prompt: "工作邮件",
        isVip: false,
        isCollected: false,
        url: "work-email",
    },
    // 工作效率: 文章润色
    {
        creationId: 6,
        title: "文章润色",
        type: "工作效率",
        description: "一键生成文章润色",
        icon: "mdi-text-box-check-outline",
        prompt: "文章润色",
        isVip: false,
        isCollected: false,
        url: "article-polishing",
    },
    // 社媒创作: 小红书文案
    {
        creationId: 7,
        title: "小红书文案",
        type: "社媒创作",
        description: "一键生成小红书文案",
        icon: "mdi-text-box-check-outline",
        prompt: "小红书文案",
        isVip: false,
        isCollected: false,
        url: "social-media-creation",
    },
    // 社媒创作: 短视频脚本
    {
        creationId: 8,
        title: "短视频脚本",
        type: "社媒创作",
        description: "一键生成短视频脚本",
        icon: "mdi-text-box-check-outline",
        prompt: "短视频脚本",
        isVip: false,
        isCollected: false,
        url: "short-vcreationIdeo-script",
    },
    // 商品营销：商品文案
    {
        creationId: 9,
        title: "商品文案",
        type: "商品营销",
        description: "一键生成商品文案",
        icon: "mdi-text-box-check-outline",
        prompt: "商品文案",
        isVip: false,
        isCollected: false,
        url: "product-description",
    },

    // 商品营销：广告策划案
    {
        creationId: 10,
        title: "广告策划案",
        type: "商品营销",
        description: "一键生成广告策划案",
        icon: "mdi-text-box-check-outline",

        prompt: "广告策划案",
        isVip: false,
        isCollected: false,
        url: "advertising-planning",
    },
    // 商品营销：推文方案
    {
        creationId: 11,
        title: "推文方案",
        type: "商品营销",
        description: "一键生成推文方案",
        icon: "mdi-text-box-check-outline",
        prompt: "推文方案",
        isVip: false,
        isCollected: false,
        url: "tweet-plan",
    },

]