<p align='center' style="margin-top:80px">
  <img src='/src/assets/logo.svg' alt='Vitesse - Opinionated Vite Starter Template' width='250'/>
</p>

<h6 align='center'>
<a href="https://openai.vuetify3.comp">在线 Demo</a>
</h6>

<br>

<p align='center'>
<a href="https://github.com/yangjiakai/vuetify3-openai/blob/master/README.md">English</a> | <b>简体中文</b>| <a href="https://github.com/yangjiakai/vuetify3-openai/blob/master/README.jp.md">日本語</a>
</p>

## 序文

这是一个使用 vuetify3 + 组合式 api,利用 openai 官方网站提供的 api 和 demo 进行二次开发 app

## 特性

- ⚡️ [Vue 3](https://github.com/vuejs/core)
- ⚡️ [Vite](https://github.com/vitejs/vite)
- ⚡️ UI Framework [Vuetify 3](https://next.vuetifyjs.com/en/)
- ⚡️ TypeScript
- 📦 组件自动导入
- 🍍 通过 [Pinia](https://pinia.vuejs.org/)进行状态管理
- 🍍 pinia-plugin-persist 状态持久化
- ⚡️ 使用新的 `<script setup>` 语法
- ⚡️ 使用任意的图标集 [Iconify](https://icon-sets.iconify.design/)
- ⚡️ 零配置部署在 Netlify
- ⚡️ i18n 多语言切换
- ⚡️ dark light 模式切换
- ⚡️ 主题色切换
- ⚡️ vue3-perfect-scrollbar 滚动条美化
- ☁️ 响应式多平台自适应
- ☁️ openAI

<br>
## Pre-packed

### UI 框架

- [Vuetify3](https://next.vuetifyjs.com/en/) - Vuetify 是一个不要求设计能力的 Vue 界面组件框架，自带了许多自行设计实现的 Vue 组件。

### Icons

- [Iconify](https://iconify.design) - 使用任意的图标集 [🔍Icônes](https://icones.netlify.app/)
- [Pure CSS Icons via UnoCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

## 现在可以试试!

```
https://github.com/yangjiakai/vuetify3-openai.git

cd vuetify3-openai

npm install

npm run dev

```

## api 请求

> 关于 API 请求，使用了 openai 的 api
>
> 需要先前往 openai 开发者平台，申请自己的**API_KEY**
>
> https://platform.openai.com/account/api-keys
>
> 然后在本地新建`.env.local`文件
>
> 添加`VITE_OPENAI_API_KEY = 你自己的Api Key`
