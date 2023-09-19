<!--
* @Component: LanguageSwitcher.vue
* @Maintainer: J.K. Yang
* @Description: 语言切换组件
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useLocale } from "vuetify";
import { useAppStore } from "@/stores/appStore";
import enMessages from "@/locales/en";
import zhHansMessages from "@/locales/zhHans";
import jaMessages from "@/locales/ja";

const { current } = useLocale();

const appStore = useAppStore();
const availableLocales = [
  {
    code: "en",
    flag: "us",
    name: "united-states",
    label: "English",
    messages: enMessages,
  },
  {
    code: "zhHans",
    flag: "cn",
    name: "china",
    label: "中文",
    messages: zhHansMessages,
  },
  {
    code: "ja",
    flag: "jp",
    name: "japan",
    label: "日本語",
    messages: jaMessages,
  },
];

onMounted(() => {
  setLocale(appStore.localCode);
});

const setLocale = (locale: string) => {
  current.value = locale;

  appStore.setLocalCode(locale);
};

const currentLocale = computed(() => {
  return availableLocales.find((locale) => locale.code === current.value);
});
</script>
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <Icon :icon="`twemoji:flag-${currentLocale?.name}`" class="mr-2" />
        {{ currentLocale?.label }}
      </v-btn>
    </template>
    <v-list nav>
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="setLocale(locale.code)"
        density="compact"
        :active="locale.code === current"
      >
        <template v-slot:prepend>
          <Icon :icon="`twemoji:flag-${locale.name}`" class="mr-2" />
        </template>
        <v-list-item-title> {{ locale.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
