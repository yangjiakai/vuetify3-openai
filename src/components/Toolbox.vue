<!--
* @Component:
* @Maintainer: J.K. Yang
* @Description:
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";

const menu = ref([
  {
    title: "卡片模板",
    icon: "solar:library-line-duotone",
  },
  {
    title: "文本格式",
    icon: "solar:letter-opened-bold-duotone",
  },
  {
    title: "标注",
    icon: "solar:chat-unread-bold-duotone",
  },
  {
    title: "布局选项",
    icon: "solar:siderbar-bold-duotone",
  },
  {
    title: "可视化模板",
    icon: "solar:figma-bold-duotone",
  },
  // 添加图片
  {
    title: "图片",
    icon: "solar:album-bold-duotone",
  },

  {
    title: "视频",
    icon: "solar:video-frame-cut-2-bold-duotone",
  },
  {
    title: "嵌入网页和应用",
    icon: "solar:window-frame-bold-duotone",
  },
  {
    title: "表单和按钮",
    icon: "solar:password-minimalistic-input-line-duotone",
  },
]);
</script>

<template>
  <v-card rounded="md" elevation="10" class="mt-2 d-flex flex-column toolbox">
    <v-btn
      v-for="item in menu"
      :key="item.title"
      class="ma-1"
      size="40"
      rounded="sm"
      icon
      variant="text"
      color="accent"
      ><Icon width="24" :icon="item.icon" />
      <!-- tooltip -->
      <v-tooltip
        activator="parent"
        location="left"
        :text="item.title"
        class="font-weight-bold"
      ></v-tooltip>
      <!-- Menu -->
      <!-- <v-menu location="left center" activator="parent">
        <v-card class="mr-2" height="600" width="300">
          <perfect-scrollbar style="height: 600" class="pa-2">
          </perfect-scrollbar>
        </v-card>
      </v-menu> -->
    </v-btn>
  </v-card>
</template>

<style scoped lang="scss">
.toolbox {
  position: absolute;
  right: 10px;
  bottom: 100px;
}
</style>
