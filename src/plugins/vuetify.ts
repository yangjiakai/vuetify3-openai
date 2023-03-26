import { createVuetify } from "vuetify";
import type { ThemeDefinition } from "vuetify";

// import '@mdi/font/css/materialdesignicons.css'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { useI18n } from "vue-i18n";
import i18n from "@/plugins/i18n";
const Lighttheme: ThemeDefinition = {
  dark: false,
  variables: {},
  colors: {
    primary: "#705cf6",
    secondary: "#fcfbff",
    accent: "#6386e1",
    content: "#333333",
    background: "#F8F9FA",
    error: "#ef476f",
    info: "#2196F3",
    success: "#06d6a0",
    warning: "#ffd166",
  },
};

const Darktheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#705cf6",
    secondary: "#219BE8",
    // surface:toolbar/navigation-drawer/background,
    surface: "#202225",
    title: "#e7e3FC",
    content: "#E7E3FC",
    accent: "#6386e1",
    error: "#e47171",
    info: "#24a6c5",
    background: "#36393F",
  },
};

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: Lighttheme,
      dark: Darktheme,
    },
  },
  defaults: {
    VBtn: {
      rounded: "md",
      flat: true,
      fontWeight: "400",
      letterSpacing: "0",
    },
    VCard: {
      flat: true,
      elevation: 1,
    },
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
});
