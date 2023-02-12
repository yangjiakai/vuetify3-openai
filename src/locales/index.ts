import enMessages from "@/locales/en";
import zhHansMessages from "@/locales/zhHans";
import jaMessages from "@/locales/ja";

export default {
  // current locale
  locale: "en",

  // when translation is not available fallback to that locale
  fallbackLocale: "en",

  // availabled locales for user selection
  availableLocales: [
    {
      code: "en",
      flag: "us",
      label: "English",
      messages: enMessages,
    },
    {
      code: "zhHans",
      flag: "cn",
      label: "中文",
      messages: zhHansMessages,
    },
    {
      code: "ja",
      flag: "jp",
      label: "日本語",
      messages: jaMessages,
    },
  ],
  messages: {
    en: enMessages,
    zhHans: zhHansMessages,
    ja: jaMessages,
  },
};
