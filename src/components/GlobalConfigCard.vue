<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import LanguageSwitcher from "./LanguageSwitcher.vue";
</script>

<template>
  <v-card width="600" height="400" class="mx-auto">
    <v-card-title> {{ $t("globalSetting.title") }} </v-card-title>
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
