<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { Icon } from "@iconify/vue";
const emits = defineEmits(["closeDialog"]);
const closeDialog = () => {
  console.log("closeDialog");

  emits("closeDialog");
};
</script>

<template>
  <v-card width="600" height="400" class="mx-auto">
    <v-card-title>
      {{ $t("globalSetting.title") }} <v-spacer></v-spacer>
      <v-btn
        class="mr-3"
        color="grey-lighten-1"
        variant="text"
        size="20"
        @click="closeDialog"
      >
        <template v-slot:prepend>
          <Icon class="text-primary" icon="solar:close-circle-line-duotone" />
        </template>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <!-- Rate -->
      <v-row class="align-center">
        <v-col cols="12" sm="2" class="pb-sm-3 pb-0">
          <v-label class="font-weight-bold text-grey-darken-2">
            {{ $t("globalSetting.language") }}</v-label
          >
        </v-col>
        <v-col cols="12" sm="10">
          <LanguageSwitcher />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss"></style>
