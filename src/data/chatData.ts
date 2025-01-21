import { ChatType } from "@/enums";

export const consultantData: Chat.Chat[] = [
  // 1. 法律顾问
  {
    chatId: 1,
    chatType: ChatType.Consultant,
    menuConfig: {
      menuTitle: "法律顾问",
      isMenuEdit: false,
      isMenuDeleteConfirm: false,
    },
    gptConfig: {
      model: "gpt-4o-mini",
      prompt: "",
      role: "法律顾问",
      proxy: "",
      temperature: 0.5,
      max_tokens: 10000,
      presence_penalty: 0,
      frequency_penalty: 0,
      history_number: 6,
    },
    messages: [],
  },

  // 2. 会计顾问
  {
    chatId: 2,
    chatType: ChatType.Consultant,
    menuConfig: {
      menuTitle: "会计顾问",
      isMenuEdit: false,
      isMenuDeleteConfirm: false,
    },
    gptConfig: {
      model: "gpt-4o-mini",
      prompt: "",
      role: "会计顾问",
      proxy: "",
      temperature: 0.5,
      max_tokens: 10000,
      presence_penalty: 0,
      frequency_penalty: 0,
      history_number: 6,
    },
    messages: [],
  },

  // 3. 学习顾问
  {
    chatId: 3,
    chatType: ChatType.Consultant,
    menuConfig: {
      menuTitle: "学习顾问",
      isMenuEdit: false,
      isMenuDeleteConfirm: false,
    },
    gptConfig: {
      model: "gpt-4o-mini",
      prompt: "",
      role: "学习顾问",
      proxy: "",
      temperature: 0.5,
      max_tokens: 10000,
      presence_penalty: 0,
      frequency_penalty: 0,
      history_number: 6,
    },
    messages: [],
  },

  // 4. 职业顾问
  {
    chatId: 4,
    chatType: ChatType.Consultant,
    menuConfig: {
      menuTitle: "职业顾问",
      isMenuEdit: false,
      isMenuDeleteConfirm: false,
    },
    gptConfig: {
      model: "gpt-4o-mini",
      prompt: "",
      role: "职业顾问",
      proxy: "",
      temperature: 0.5,
      max_tokens: 10000,
      presence_penalty: 0,
      frequency_penalty: 0,
      history_number: 6,
    },
    messages: [],
  },

  // 5. 医疗顾问
  {
    chatId: 5,
    chatType: ChatType.Consultant,
    menuConfig: {
      menuTitle: "医疗顾问",
      isMenuEdit: false,
      isMenuDeleteConfirm: false,
    },
    gptConfig: {
      model: "gpt-4o-mini",
      prompt: "",
      role: "医疗顾问",
      proxy: "",
      temperature: 0.5,
      max_tokens: 10000,
      presence_penalty: 0,
      frequency_penalty: 0,
      history_number: 6,
    },
    messages: [],
  },

  // 6. 心理医生
  {
    chatId: 6,
    chatType: ChatType.Consultant,
    menuConfig: {
      menuTitle: "心理医生",
      isMenuEdit: false,
      isMenuDeleteConfirm: false,
    },
    gptConfig: {
      model: "gpt-4o-mini",
      prompt: "",
      role: "心理医生",
      proxy: "",
      temperature: 0.5,
      max_tokens: 10000,
      presence_penalty: 0,
      frequency_penalty: 0,
      history_number: 6,
    },
    messages: [],
  },
];

export const creationsData = [
  // // 工作效率:商品文案
  // {
  //     creationId: 1,
  //     title: "商品文案",
  //     type: "工作效率",
  //     description: "一键生成详细文案",
  //     icon: "mdi-text-box-check-outline",
  //     prompt: "商品文案",
  //     isVip: false,
  //     isCollected: false,
  //     url: "product-description",
  // },

  // // 工作效率:产品说明文档
  // {
  //     creationId: 2,
  //     title: "产品说明文档",
  //     type: "工作效率",
  //     description: "一键生成详细文案",
  //     icon: "mdi-text-box-check-outline",
  //     prompt: "产品说明文档",
  //     isVip: false,
  //     isCollected: false,
  //     url: "product-document",
  // },
  // // 工作效率:工作总结
  // {
  //     creationId: 3,
  //     title: "工作总结",
  //     type: "工作效率",
  //     description: "一键生成工作总结",
  //     icon: "mdi-text-box-check-outline",
  //     prompt: "工作总结",
  //     isVip: false,
  //     isCollected: false,
  //     url: "work-summary",
  // },
  // // 工作效率: 会议纪要
  // {
  //     creationId: 4,
  //     title: "会议纪要",
  //     type: "工作效率",
  //     description: "一键生成会议纪要",
  //     icon: "mdi-text-box-check-outline",
  //     prompt: "会议纪要",
  //     isVip: false,
  //     isCollected: false,
  //     url: "meeting-minutes",
  // },
  // // 工作效率: 工作邮件
  // {
  //     creationId: 5,
  //     title: "工作邮件",

  //     type: "工作效率",
  //     description: "一键生成工作邮件",
  //     icon: "mdi-text-box-check-outline",
  //     prompt: "工作邮件",
  //     isVip: false,
  //     isCollected: false,
  //     url: "work-email",
  // },
  // // 工作效率: 文章润色
  // {
  //     creationId: 6,
  //     title: "文章润色",
  //     type: "工作效率",
  //     description: "一键生成文章润色",
  //     icon: "mdi-text-box-check-outline",
  //     prompt: "文章润色",
  //     isVip: false,
  //     isCollected: false,
  //     url: "article-polishing",
  // },
  // // 社媒创作: 小红书文案
  // {
  //     creationId: 7,
  //     title: "小红书文案",
  //     type: "社媒创作",
  //     description: "一键生成小红书文案",
  //     icon: "mdi-text-box-check-outline",
  //     prompt: "小红书文案",
  //     isVip: false,
  //     isCollected: false,
  //     url: "social-media-creation",
  // },
  // // 社媒创作: 短视频脚本
  // {
  //     creationId: 8,
  //     title: "短视频脚本",
  //     type: "社媒创作",
  //     description: "一键生成短视频脚本",
  //     icon: "mdi-text-box-check-outline",
  //     prompt: "短视频脚本",
  //     isVip: false,
  //     isCollected: false,
  //     url: "short-vcreationIdeo-script",
  // },
  // // 商品营销：商品文案
  // {
  //     creationId: 9,
  //     title: "商品文案",
  //     type: "商品营销",
  //     description: "一键生成商品文案",
  //     icon: "mdi-text-box-check-outline",
  //     prompt: "商品文案",
  //     isVip: false,
  //     isCollected: false,
  //     url: "product-description",
  // },

  // // 商品营销：广告策划案
  // {
  //     creationId: 10,
  //     title: "广告策划案",
  //     type: "商品营销",
  //     description: "一键生成广告策划案",
  //     icon: "mdi-text-box-check-outline",

  //     prompt: "广告策划案",
  //     isVip: false,
  //     isCollected: false,
  //     url: "advertising-planning",
  // },
  // // 商品营销：推文方案
  // {
  //     creationId: 11,
  //     title: "推文方案",
  //     type: "商品营销",
  //     description: "一键生成推文方案",
  //     icon: "mdi-text-box-check-outline",
  //     prompt: "推文方案",
  //     isVip: false,
  //     isCollected: false,
  //     url: "tweet-plan",
  // },
  //　要求分析: ユーザー要求分析
  {
    creationId: 12,
    title: "ユーザー要求分析",
    type: "要求分析",
    description: "ユーザー要求分析を作成",
    icon: "mdi-text-box-check-outline",
    prompt: `
        役割：プロダクトマネージャー
背景：製品要件文書の作成
注意：高品質の製品要件文書を作成することは、プロジェクト成功のための重要なステップです。
プロフィール：
著者：nimbus
バージョン：0.1
言語：日本語
説明：私はプロダクトマネージャーで、明確でわかりやすい製品要件文書を作成し、開発チームがプロジェクト目標を達成するのを指導します。
スキル：
製品開発プロセスに精通しており、各段階の要件を理解し、絞り込むことができます。
優れたコミュニケーションとライティングスキルを持っており、複雑な概念を理解しやすい言葉に変換することができます。
ユーザーの要件を捉え、それを明確な機能要件に変換することができます。
インターフェース設計の原則を理解しており、関連するページ設計の要件を作成することができます。
ユーザージャーニーを描くことができ、チームが製品を使用するユーザーのシナリオを理解するのに役立ちます。
ユーザーストーリーを上手に書くことができ、ユーザーの視点から機能要件を記述します。
論理的思考能力を持っており、合理的な実装ロジックと機能詳細の説明を書くことができます。
目標：
標準的な製品要件文書のフレームワークを設計し、すべての要件が明確に記述されることを確認します。
要件文書には機能名、要件説明、概要、関連ページ設計、ユーザージャーニー、ユーザーストーリー、実装ロジック、機能詳細説明を含めます。
制約：
すべての要件がユーザーの要件と製品目標を正確に表現することを確認します。
要件文書の情報は明確な論理構造を持つべきであり、理解しやすいものでなければなりません。
カバーする内容は十分に詳細でなければならず、開発チームが正確に実装できるようにする必要があります。
ワークフロー：
製品の要件を分析し、ユーザーの期待とプロジェクトの目標を理解します。
明確な要件文書のフレームワークを設計し、機能名、要件説明、概要、ページ設計、ユーザージャーニー、ユーザーストーリー、実装ロジック、機能詳細説明を含めます。
機能名に基づいて対応する要件説明を作成し、機能の役割と価値を明確にします。
概要を作成し、プロジェクトの背景と全体的な目標を簡単に紹介します。
関連ページの設計を説明します。これには、インターフェース要素、レイアウトなどが含まれます。
ユーザージャーニーを描き、製品を使用する過程でのユーザーの各ステップとシナリオを詳細に説明します。
ユーザーストーリーを作成し、ユーザーの視点から具体的な機能要件を記述します。
実装ロジックを述べ、機能の具体的な実装方法とプロセスを説明します。
機能の詳細を説明します。これには、各種の入力、出力、境界条件などが含まれます。
出力形式：
機能名：[機能名]
要件説明：[要件説明]
概要：[概要]
関連ページ設計：[関連ページ設計]
ユーザージャーニー：[ユーザージャーニー]
ユーザーストーリー：[ユーザーストーリー]
実装ロジック：[実装ロジック]
機能詳細説明：[機能詳細説明]
提案：
各部分の内容を明確に定義し、開発チームが理解し、実装できるようにします。
簡潔な言葉を使用し、専門用語の使用を避けます。
ユーザージャーニーとユーザーストーリーではユーザー体験に重点を置き、ユーザーの要件を正確に捉えます。
実装ロジックと機能詳細説明は十分に詳細でなければならず、開発チームが機能を正確に実装できるようにする必要があります。
初期化
プロダクトマネージャーとして、製品要件文書に指定された形式で機能名、要件説明、概要、関連ページ設計、ユーザージャーニー、ユーザーストーリー、実装ロジック、機能詳細説明を記述する必要があります。制約条件を遵守し、文書の論理性と詳細性を確保してください。開発チームとの協力において、あなたの文書は重要な役割を果たします
        `,
    isVip: false,
    isCollected: false,
    url: "user-requirement-analysis",
  },

  //　要求分析: 機能要求分析
  {
    creationId: 13,
    title: "機能要求分析",
    type: "要求分析",
    description: "機能要求分析を作成",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "function-requirement-analysis",
  },
  // 要求分析: 性能要求分析
  {
    creationId: 14,
    title: "性能要求分析",
    type: "要求分析",
    description: "性能要求分析を作成",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "performance-requirement-analysis",
  },
  // 要求分析: 分析レポート
  {
    creationId: 15,
    title: "分析レポート",
    type: "要求分析",
    description:
      "ユーザーから提供された要求書類から重要な情報を自動的に抽出し、要求分析レポートを生成します。",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "analysis-report",
  },

  // 基本設計: アーキテクチャ設計
  {
    creationId: 16,
    title: "アーキテクチャ設計",
    type: "基本設計",
    description: "アーキテクチャ設計のアドバイス",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "architecture-design",
  },
  // 基本設計: モジュール分割
  {
    creationId: 17,
    title: "モジュール分割",
    type: "基本設計",
    description: "モジュール分割のアドバイス",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "module-split",
  },
  // 基本設計: インターフェース設計
  {
    creationId: 18,
    title: "インターフェース設計",
    type: "基本設計",
    description: "インターフェース設計のアドバイス",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "interface-design",
  },
  // 詳細設計: アルゴリズム設計
  {
    creationId: 19,
    title: "アルゴリズム設計",
    type: "詳細設計",
    description: "アルゴリズム設計",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "algorithm-design",
  },

  // 詳細設計: データ構造設計
  {
    creationId: 21,
    title: "データ構造設計",
    type: "詳細設計",
    description: "データ構造設計",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "data-structure-design",
  },

  // 開発: Vueスペシャリスト
  {
    creationId: 22,
    title: "Vueスペシャリスト",
    type: "開発",
    description: "Vueスペシャリスト",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "vue-developer",
  },

  // 開発: Sqlエキスパート
  {
    creationId: 23,
    title: "Sqlエキスパート",
    type: "開発",
    description: "Sqlエキスパート",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "sql-developer",
  },

  // テスト: テストケース作成
  {
    creationId: 24,
    title: "テストケース作成",
    type: "テスト",
    description: "テストケースとテストスクリプトを自動生成します。",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "test-case",
  },
  // 納品: 受け入れテスト（UAT）
  {
    creationId: 25,
    title: "受け入れテスト（UAT）",
    type: "テスト",
    description: "受け入れテスト（UAT）",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "uat",
  },
  // 納品レポート
  {
    creationId: 26,
    title: "納品レポート",
    type: "テスト",
    description:
      "実際の操作テストを補助し、テスト結果を自動的に記録し、受け入れ報告書を生成します。",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "report",
  },

  // 保守 : バグ解析
  {
    creationId: 27,
    title: "バグ解析",
    type: "保守",
    description: "バグ解析",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "bug-analysis",
  },

  // 保守 : システム最適化
  {
    creationId: 28,
    title: "システム最適化",
    type: "保守",
    description:
      "故障診断のサポート、システム最適化の提案、セキュリティ更新プランなどを提供します。企業がメンテナンスの効率を向上させ、故障の発生率を減らし、システムの安定性を向上させるのを支援します。",
    icon: "mdi-text-box-check-outline",
    prompt: "",
    isVip: false,
    isCollected: false,
    url: "system-optimize",
  },
  //　要求分析: ユーザー要求分析
  {
    creationId: 29,
    title: "用户需求分析",
    type: "需求分析",
    description: "用户需求分析",
    icon: "mdi-text-box-check-outline",
    prompt: `
            # Role：产品经理

            ## Background：产品需求文档编写
            
            ## Attention：编写高质量的产品需求文档是确保项目成功的关键步骤。
            
            ## Profile：
            - Author: nimbus
            - Version: 0.1
            - Language: 中文
            - Description: 我是一名产品经理，擅长撰写清晰明了的产品需求文档，以指导开发团队实现项目目标。
            
            ## Skills:
            - 熟悉产品开发流程，能够理解并提炼各阶段的需求。
            - 具备良好的沟通和写作能力，能够将复杂的概念转化为易于理解的语言。
            - 能够捕捉用户需求，将其转化为明确的功能要求。
            - 了解界面设计原则，能够编写相关页面设计的需求。
            - 能够描绘用户旅程，帮助团队理解用户使用产品的情景。
            - 熟练编写用户故事，从用户角度描述功能需求。
            - 具备逻辑思维，能够编写合理的实现逻辑和功能细节描述。
            
            ## Goals:
            - 设计一个规范的产品需求文档框架，确保每个需求都得到明确描述。
            - 在需求文档中包含功能名、需求描述、概述、相关页面设计、用户旅程、用户故事、实现逻辑、功能细节描述。
            
            ## Constrains:
            - 确保每个需求都准确表达用户需求和产品目标。
            - 需求文档中的信息应该具备清晰的逻辑结构，易于理解。
            - 涵盖的内容应当充分详尽，以便开发团队准确实现。
            
            ## Workflow:
            1. 分析产品需求，理解用户期望和项目目标。
            2. 设计一个明确的需求文档框架，包含功能名、需求描述、概述、页面设计、用户旅程、用户故事、实现逻辑、功能细节描述。
            3. 根据功能名，撰写对应的需求描述，明确功能的作用和价值。
            4. 编写概述，简要介绍项目的背景和整体目标。
            5. 描述相关页面的设计，包括界面元素、布局等。
            6. 绘制用户旅程，详细描述用户在使用产品过程中的各个步骤和情境。
            7. 编写用户故事，从用户的角度描述具体的功能需求。
            8. 阐述实现逻辑，描述功能的具体实现方式和流程。
            9. 描述功能细节，包括各种输入、输出、边界条件等。
               
            ## OutputFormat:
            - 功能名：[功能名]
            - 需求描述：[需求描述]
            - 概述：[概述]
            - 相关页面设计：[相关页面设计]
            - 用户旅程：[用户旅程]
            - 用户故事：[用户故事]
            - 实现逻辑：[实现逻辑]
            - 功能细节描述：[功能细节描述]
                
            ## Suggestions:
            - 明确界定每个部分的内容，以便开发团队理解和实施。
            - 使用简明的语言，避免使用过于专业的术语。
            - 在用户旅程和用户故事中注重用户体验，以便准确捕捉用户需求。
            - 实现逻辑和功能细节描述要足够详细，以便开发团队能够准确实现功能。
            
            ## Initialization
            作为产品经理，您需要在产品需求文档中按照指定的格式编写功能名、需求描述、概述、相关页面设计、用户旅程、用户故事、实现逻辑、功能细节描述。请遵循约束条件，确保文档的逻辑性和详尽性。在与开发团队合作时，您的文档将起到关键作用。
            `,
    isVip: false,
    isCollected: false,
    url: "user-requirement-analysis",
  },
];
