<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="tool-bar">
    <!-- Download -->
    <span class="tool-item">
      <v-icon size="20">mdi-download</v-icon>
      <v-tooltip activator="parent" location="top" text="下载"></v-tooltip>
    </span>
    <!-- Text to Speech -->
    <span class="tool-item">
      <v-icon size="20">mdi-volume-high</v-icon>
      <v-tooltip activator="parent" location="top" text="朗读"></v-tooltip>
    </span>
    <!-- Copy -->
    <span class="tool-item">
      <v-icon size="20">mdi-content-copy</v-icon>
      <v-tooltip activator="parent" location="top" text="复制"></v-tooltip>
    </span>
    <!-- Edit -->
    <span class="tool-item">
      <v-icon size="20">mdi-book-edit-outline</v-icon>
      <v-tooltip activator="parent" location="top" text="编辑"></v-tooltip>
    </span>
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  background-color: #fff;
  border: 1px solid #ddd;
  display: inline-block;

  position: absolute;
  top: 100px;
  border-radius: 14px;
  padding: 1px 14px;
}

.tool-item {
  display: inline-block;
  background-color: #fff;
  cursor: pointer;
  color: #888;
  padding: 4px;
  transition: all 0.3s;
}

.tool-item:hover {
  background-color: #eef2ff;
  transition: all 0.3s;
}
</style>
