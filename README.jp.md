<p align='center' style="margin-top:80px">
  <img src='/src/assets/logo.svg' alt='Vitesse - Opinionated Vite Starter Template' width='250'/>
</p>

<h6 align='center'>
<a href="https://marvelous-sunflower-cb8d70.netlify.app/">ライブ・デモ</a>
</h6>

<br>

<p align='center'>
<a href="https://github.com/yangjiakai/vuetify3-openai/blob/main/README.md">English</a> | <a href="https://github.com/yangjiakai/vuetify3-openai/blob/main/README.zh-CN.md">简体中文</a>| <b >日本語</b>
</p>

## 序文

これは、vuetify3 + composition api を使用し、OpenAI 公式サイトから提供される API とデモを活用した二次開発アプリです。

## 特徴

- ⚡️ [Vue 3](https://github.com/vuejs/core)
- ⚡️ [Vite](https://github.com/vitejs/vite)
- ⚡️ UI Framework [Vuetify 3](https://next.vuetifyjs.com/en/)
- ⚡️ TypeScript
- 📦 コンポーネント　自動的にインポート
- 🍍 [Pinia](https://pinia.vuejs.org/)で State 管理
- 🍍 pinia-plugin-persist State の永続性
- ⚡️ 新しい `<script setup>` 文法の使用
- ⚡️ 任意のアイコンセット [Iconify](https://icon-sets.iconify.design/)
- ⚡️ Netlify でのゼロ設定部署
- ⚡️ 18n 多言語切り替え
- ⚡️ dark light モード切り替え
- ⚡️ 主題色切り替え
- ⚡️ vue3-perfect-scrollbar スクロールバーの美化
- ☁️ レスポンシブで多プラットフォームに適応
- ☁️ openAI

<br>

## 今すぐ試す!

```
git clone https://github.com/yangjiakai/vuetify3-openai.git

cd vuetify3-openai

npm install

npm run dev
```

## api 请求

> API リクエストに関して、 openai の API を使用しました。
>
> 自分自身の`API_KEY`を申請するために、openai 開発者プラットフォームに行く必要があります。
>
> https://platform.openai.com/account/api-keys
>
> 次に、ローカルに新しい`.env.local` ファイルを作成します
>
> `VITE_OPENAI_API_KEY = 自分のApi Key`を追加します。
