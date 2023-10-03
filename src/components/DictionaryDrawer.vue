<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useSelectionStore } from "@/stores/selectionStore";
import { useAppStore } from "@/stores/appStore";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const selectionStore = useSelectionStore();
const appStore = useAppStore();
</script>

<template>
  <v-navigation-drawer
    v-model="appStore.dictionaryDrawer"
    width="400"
    permanent
    location="right"
  >
    <template v-slot:prepend>
      <v-list-item title="辞書">
        <template v-slot:prepend>
          <v-avatar size="36">
            <Icon
              class="text-primary"
              width="30"
              icon="solar:notebook-bookmark-line-duotone"
            />
          </v-avatar>
        </template>
        <template v-slot:append>
          <v-btn
            class="mr-3"
            color="grey-lighten-1"
            variant="text"
            size="24"
            rounded="xl"
            @click="appStore.dictionaryDrawer = !appStore.dictionaryDrawer"
          >
            <template v-slot:prepend>
              <Icon
                class="text-primary"
                width="24"
                icon="solar:close-circle-line-duotone"
              />
            </template>
          </v-btn>
        </template>
      </v-list-item>
    </template>

    <v-divider></v-divider>
    <div>
      <MdPreview :modelValue="selectionStore.explainedText" />
    </div>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
:deep(#md-editor-v3-preview) {
  font-size: 14px;
}
</style>
