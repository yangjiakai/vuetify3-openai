<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->

<template>
  <v-menu location="bottom end" scroll-y>
    <template v-slot:activator="{ props }">
      <v-btn width="100" class="ma-2" v-bind="props">
        <span class="text-body-2">{{ currentLocale.label }}</span>
      </v-btn>
    </template>
    <v-card>
      <div v-for="locales in availableLocales">
        <v-btn block @click="setLocale(locales.code)">{{
          locales.label
        }}</v-btn>
      </div>
    </v-card>
  </v-menu>
</template>
<script setup lang="ts">
import { useLocale } from "vuetify";
const { current } = useLocale();
const availableLocales = [
  {
    code: "en",
    flag: "us",
    label: "English",
  },
  {
    code: "zhHans",
    flag: "cn",
    label: "中文",
  },
  {
    code: "ja",
    flag: "jp",
    label: "日本語",
  },
];

const currentLocale = computed(() => {
  return availableLocales.filter((item) => item.code === current.value)[0];
});

const setLocale = (locale: any) => {
  current.value = locale;
};
</script>
