<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import InputArea from "@/components/InputArea.vue";
import MessageArea from "@/components/MessageArea.vue";

const target = ref();

// scroll to bottom
const scrollToBottom = () => {
  const chatArea = document.getElementById("chat-area");
  chatArea?.scrollTo({
    top: chatArea?.scrollHeight,
  });
};
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!---Header Area -->
  <!-- ---------------------------------------------- -->
  <v-toolbar elevation="10"> </v-toolbar>
  <!-- ---------------------------------------------- -->
  <!---Chat Area -->
  <!-- ---------------------------------------------- -->
  <perfect-scrollbar ref="target" id="chat-area" class="chat-area">
    <!-- ---------------------------------------------- -->
    <!---Message Area -->
    <!-- ---------------------------------------------- -->
    <v-sheet color="transparent" class="messages-area pa-5">
      <MessageArea />
    </v-sheet>
    <!-- ---------------------------------------------- -->
    <!---Input Area -->
    <!-- ---------------------------------------------- -->
  </perfect-scrollbar>
  <v-sheet class="input-area">
    <InputArea @scroll="scrollToBottom" />
  </v-sheet>
</template>

<style scoped lang="scss">
.chat-area {
  height: calc(100vh - 190px);
  background-image: url("@/assets/images/chat-bg-2.png");
  background-repeat: repeat;
  background-attachment: fixed;

  //   .messages-area {
  //     position: relative;
  //   }

  .input-area {
    position: fixed;
    width: 100%;
    height: 300px;
    bottom: 0;
    left: 0;
    background-color: #fff;
  }
}
</style>
